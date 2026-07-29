import {
	AdditiveBlending,
	BoxGeometry,
	Color,
	ColorManagement,
	HalfFloatType,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	MeshBasicNodeMaterial,
	NoToneMapping,
	PerspectiveCamera,
	REVISION,
	Scene,
	Vector3,
	WebGPURenderer
} from 'three/webgpu';
import {
	abs,
	attribute,
	clamp as clampNode,
	float,
	fract,
	max,
	mix,
	pow,
	smoothstep,
	step,
	uniform,
	varying,
	vec3
} from 'three/tsl';
import {
	ExtendedSRGBColorSpace,
	ExtendedSRGBColorSpaceImpl
} from 'three/addons/math/ColorSpaces.js';
import { defaultWarpOptions, type WarpOptions } from './warp-engine';

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export class HdrWarpEngine {
	private readonly canvas: HTMLCanvasElement;
	private readonly renderer: WebGPURenderer;
	private readonly scene = new Scene();
	private readonly camera = new PerspectiveCamera(80, 1, 0.001, 1000);
	private readonly material: MeshBasicNodeMaterial;
	private readonly resizeObserver: ResizeObserver;
	private readonly motionQuery: MediaQueryList;
	private readonly timeNode = uniform(2.4);
	private readonly trailNode = uniform(defaultWarpOptions.trail);
	private readonly boundingBoxNode = uniform(new Vector3(30, 30, 80));
	private readonly minScaleNode = uniform(new Vector3(0.01, 0.01, 3.7));
	private readonly maxScaleNode = uniform(new Vector3(0.07, 0.07, 22.83));
	private readonly colorNode = uniform(new Color('#7c8ace'));
	private readonly alphaNode = uniform(0.05);
	private readonly brightnessNode = uniform(defaultWarpOptions.brightness);
	private readonly glowIntensityNode = uniform(defaultWarpOptions.glowIntensity);
	private mesh: Mesh<InstancedBufferGeometry, MeshBasicNodeMaterial>;
	private options: WarpOptions;
	private frame = 0;
	private lastTime = 0;
	private speedClock = 0;
	private time = 2.4;
	private visible = !document.hidden;
	private reducedMotion = false;
	private width = 1;
	private height = 1;
	private count = 0;
	private ready = false;
	private destroyed = false;

	constructor(canvas: HTMLCanvasElement, options: Partial<WarpOptions> = {}) {
		this.canvas = canvas;
		this.options = { ...defaultWarpOptions, ...options };

		if (!ColorManagement.spaces[ExtendedSRGBColorSpace]) {
			ColorManagement.define({
				[ExtendedSRGBColorSpace]: ExtendedSRGBColorSpaceImpl
			});
		}

		this.renderer = new WebGPURenderer({
			canvas,
			antialias: false,
			alpha: true,
			powerPreference: 'high-performance',
			outputType: HalfFloatType
		});
		this.renderer.outputColorSpace = ExtendedSRGBColorSpace;
		this.renderer.toneMapping = NoToneMapping;
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		this.renderer.setClearAlpha(1);

		this.canvas.dataset.engine = `three.js r${REVISION} WebGPU (initializing)`;
		this.canvas.dataset.dynamicRange = 'high';

		this.camera.position.z = 15;
		this.material = this.createMaterial();
		this.mesh = this.createMesh(this.getCount());
		this.scene.add(this.mesh);

		this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		this.reducedMotion = this.motionQuery.matches;
		this.resizeObserver = new ResizeObserver(() => this.resize());
		this.resizeObserver.observe(canvas.parentElement ?? canvas);
		this.motionQuery.addEventListener('change', this.handleMotionChange);
		document.addEventListener('visibilitychange', this.handleVisibilityChange);

		this.applyOptions();
		this.resize();
		void this.initialize();
	}

	setOptions(options: Partial<WarpOptions>) {
		if (this.destroyed) return;

		this.options = { ...this.options, ...options };
		const nextCount = this.getCount();
		if (nextCount !== this.count) this.rebuildMesh(nextCount);
		this.applyOptions();
		if (this.reducedMotion) this.render();
	}

	destroy() {
		if (this.destroyed) return;

		this.destroyed = true;
		this.ready = false;
		cancelAnimationFrame(this.frame);
		this.resizeObserver.disconnect();
		this.motionQuery.removeEventListener('change', this.handleMotionChange);
		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.renderer.dispose();
	}

	private async initialize() {
		try {
			await this.renderer.init();
			if (this.destroyed) {
				this.renderer.dispose();
				return;
			}

			this.ready = true;
			this.canvas.dataset.engine = `three.js r${REVISION} WebGPU`;
			this.resize();
			this.render();
			this.start();
		} catch (error) {
			if (this.destroyed) return;

			this.canvas.dataset.engine = `three.js r${REVISION} WebGPU (failed)`;
			this.canvas.dataset.dynamicRange = 'unavailable';
			this.canvas.dispatchEvent(new CustomEvent('hdrwarperror', { detail: error }));
			console.error('HdrWarpEngine: WebGPU initialization failed.', error);
		}
	}

	private createMaterial() {
		const randomScale = attribute<'vec4'>('randomScale', 'vec4');
		const randomVertex = attribute<'vec4'>('randomVertex', 'vec4');
		const randomSimulation = attribute<'vec4'>('randomSimulation', 'vec4');
		const randomFragment = attribute<'vec4'>('randomFragment', 'vec4');
		const position = attribute<'vec3'>('position', 'vec3');
		const geometryUv = attribute<'vec2'>('uv', 'vec2');

		const localScale = this.minScaleNode.add(
			this.maxScaleNode.sub(this.minScaleNode).mul(randomScale.xxz)
		);
		const localPosition = position.mul(localScale);
		const simulationTime = this.timeNode
			.mul(0.1)
			.mul(randomSimulation.x.add(0.5))
			.add(randomVertex.z);
		const lifeTime = fract(simulationTime);
		const lifeIn = lifeTime.mul(lifeTime).mul(2);
		const lifeOut = float(1).sub(pow(lifeTime.mul(-2).add(2), 2).mul(0.5));
		const life = mix(lifeIn, lifeOut, step(0.5, lifeTime));
		const worldPosition = vec3(
			randomVertex.x.mul(this.boundingBoxNode.x),
			randomVertex.y.mul(this.boundingBoxNode.y),
			mix(this.boundingBoxNode.z.negate(), 20, life)
		);

		const vUv = varying(geometryUv);
		const vLife = varying(life);
		const vTrail = varying(
			pow(clampNode(position.z.add(0.5), 0, 1), this.trailNode)
		);
		const vGlowSeed = varying(randomFragment.x);

		const edgeX = smoothstep(0, 0.055, vUv.x).mul(smoothstep(0, 0.055, vUv.x.oneMinus()));
		const edgeY = smoothstep(0, 0.055, vUv.y).mul(smoothstep(0, 0.055, vUv.y.oneMinus()));
		const edge = edgeX.mul(edgeY);
		const lifeAlpha = smoothstep(0, 0.2, vLife);
		const core = pow(max(0, float(1).sub(abs(vUv.x.sub(0.5)).mul(2))), 2);
		const glow = float(0.35)
			.add(core.mul(0.65))
			.mul(this.glowIntensityNode)
			.mul(vTrail);
		const hdrColor = this.colorNode
			.mul(this.brightnessNode)
			.add(vec3(glow.mul(float(0.75).add(vGlowSeed.mul(0.25)))));
		const alpha = this.alphaNode.mul(lifeAlpha).mul(vTrail).mul(edge);

		const material = new MeshBasicNodeMaterial();
		material.positionNode = worldPosition.add(localPosition);
		material.colorNode = hdrColor;
		material.opacityNode = alpha;
		material.alphaTest = 0.001;
		material.transparent = true;
		material.depthTest = true;
		material.depthWrite = false;
		material.blending = AdditiveBlending;
		material.toneMapped = false;
		return material;
	}

	private createMesh(count: number) {
		const base = new BoxGeometry(1, 1, 1);
		const geometry = new InstancedBufferGeometry();
		geometry.index = base.index;
		geometry.setAttribute('position', base.getAttribute('position'));
		geometry.setAttribute('uv', base.getAttribute('uv'));
		geometry.setAttribute('randomScale', this.randomAttribute(count, false));
		geometry.setAttribute('randomVertex', this.randomAttribute(count, true));
		geometry.setAttribute('randomSimulation', this.randomAttribute(count, false));
		geometry.setAttribute('randomFragment', this.randomAttribute(count, false));
		geometry.instanceCount = count;
		base.dispose();

		const mesh = new Mesh(geometry, this.material);
		mesh.frustumCulled = false;
		mesh.renderOrder = 2;
		mesh.position.z = 2;
		this.count = count;
		return mesh;
	}

	private randomAttribute(count: number, signed: boolean) {
		const values = new Float32Array(count * 4);
		for (let index = 0; index < values.length; index += 1) {
			values[index] = signed && index % 4 < 2 ? Math.random() - 0.5 : Math.random();
		}
		return new InstancedBufferAttribute(values, 4);
	}

	private getCount() {
		return clamp(Math.round(848 * (this.options.density / 180)), 128, 1696);
	}

	private rebuildMesh(count: number) {
		this.scene.remove(this.mesh);
		this.mesh.geometry.dispose();
		this.mesh = this.createMesh(count);
		this.scene.add(this.mesh);
	}

	private applyOptions() {
		const color = new Color('#7c8ace');
		color.offsetHSL(this.options.colorShift / 360, 0, 0);
		this.colorNode.value.copy(color);
		this.trailNode.value = clamp(this.options.trail, 0.25, 5);
		this.alphaNode.value = 0.025 + clamp(this.options.opacity, 0, 1) * 0.04;
		this.brightnessNode.value = clamp(this.options.brightness, 1, 24);
		this.glowIntensityNode.value = clamp(this.options.glowIntensity, 0, 18);
		this.scene.background = new Color(this.options.background);
		this.renderer.setClearColor(this.options.background, 1);
		this.camera.position.x = (0.5 - clamp(this.options.centerX, 0, 1)) * 6;
		this.camera.position.y = (clamp(this.options.centerY, 0, 1) - 0.5) * 6;
		this.camera.updateProjectionMatrix();
	}

	private resize() {
		if (this.destroyed) return;

		const bounds = (this.canvas.parentElement ?? this.canvas).getBoundingClientRect();
		const width = Math.max(1, Math.round(bounds.width));
		const height = Math.max(1, Math.round(bounds.height));
		if (width === this.width && height === this.height) return;

		this.width = width;
		this.height = height;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height, false);
		this.render();
	}

	private readonly handleMotionChange = (event: MediaQueryListEvent) => {
		this.reducedMotion = event.matches;
		this.start();
	};

	private readonly handleVisibilityChange = () => {
		this.visible = !document.hidden;
		this.start();
	};

	private start() {
		cancelAnimationFrame(this.frame);
		if (!this.ready || this.destroyed) return;

		this.lastTime = performance.now();
		if (this.reducedMotion) {
			this.render();
		} else if (this.visible) {
			this.frame = requestAnimationFrame(this.tick);
		}
	}

	private readonly tick = (now: number) => {
		if (!this.ready || this.destroyed || !this.visible || this.reducedMotion) return;

		const delta = Math.min(now - this.lastTime, 50);
		this.lastTime = now;
		const frameFactor = Math.min(delta / (1000 / 60), 1);
		this.speedClock += 0.005 * frameFactor;
		const modulation = 0.5 + (Math.exp(Math.sin(this.speedClock)) - Math.exp(-1));
		const speedScale = this.options.speed / defaultWarpOptions.speed;
		this.time += 0.01 * frameFactor * 3.6 * modulation * speedScale;
		this.timeNode.value = this.time;
		this.render();
		this.frame = requestAnimationFrame(this.tick);
	};

	private render() {
		if (!this.ready || this.destroyed) return;
		this.renderer.render(this.scene, this.camera);
	}
}
