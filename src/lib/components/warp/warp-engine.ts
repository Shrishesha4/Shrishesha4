import {
	AdditiveBlending,
	BoxGeometry,
	Color,
	HalfFloatType,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	PerspectiveCamera,
	REVISION,
	Scene,
	ShaderMaterial,
	Vector3,
	WebGLRenderer,
	WebGLRenderTarget
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

export interface WarpOptions {
	background: string;
	brightness: number;
	centerX: number;
	centerY: number;
	colorShift: number;
	density: number;
	glowIntensity: number;
	opacity: number;
	speed: number;
	trail: number;
}

export const defaultWarpOptions: WarpOptions = {
	background: '#141516',
	brightness: 6,
	centerX: 0.5,
	centerY: 0.46,
	colorShift: 0,
	density: 180,
	glowIntensity: 4,
	opacity: 0.78,
	speed: 0.34,
	trail: 2
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const vertexShader = /* glsl */ `
	precision highp float;

	attribute vec4 randomScale;
	attribute vec4 randomVertex;
	attribute vec4 randomSimulation;
	attribute vec4 randomFragment;

	uniform float uTime;
	uniform float uTrail;
	uniform vec3 uBoundingBox;
	uniform vec3 uMinScale;
	uniform vec3 uMaxScale;

	varying vec2 vUv;
	varying float vLife;
	varying float vTrail;
	varying float vGlowSeed;

	float easeInOutQuad(float t) {
		return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) * 0.5;
	}

	void main() {
		vec3 localScale = mix(uMinScale, uMaxScale, randomScale.xxz);
		vec3 localPosition = position * localScale;
		vec3 worldPosition = vec3(
			randomVertex.x * uBoundingBox.x,
			randomVertex.y * uBoundingBox.y,
			0.0
		);

		float time = uTime * 0.1 * (randomSimulation.x + 0.5) + randomVertex.z;
		float life = easeInOutQuad(fract(time));
		worldPosition.z = mix(-uBoundingBox.z, 20.0, life);

		vUv = uv;
		vLife = life;
		vTrail = pow(clamp(position.z + 0.5, 0.0, 1.0), uTrail);
		vGlowSeed = randomFragment.x;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPosition + localPosition, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;

	uniform vec3 uColor;
	uniform float uAlpha;
	uniform float uBrightness;
	uniform float uGlowIntensity;

	varying vec2 vUv;
	varying float vLife;
	varying float vTrail;
	varying float vGlowSeed;

	void main() {
		float edgeX = smoothstep(0.0, 0.055, vUv.x) * smoothstep(0.0, 0.055, 1.0 - vUv.x);
		float edgeY = smoothstep(0.0, 0.055, vUv.y) * smoothstep(0.0, 0.055, 1.0 - vUv.y);
		float edge = edgeX * edgeY;
		float lifeAlpha = smoothstep(0.0, 0.2, vLife);
		float core = pow(max(0.0, 1.0 - abs(vUv.x - 0.5) * 2.0), 2.0);
		float glow = (0.35 + core * 0.65) * uGlowIntensity * vTrail;
		vec3 color = uColor * uBrightness + vec3(glow * (0.75 + vGlowSeed * 0.25));
		float alpha = uAlpha * lifeAlpha * vTrail * edge;

		if (alpha < 0.001) discard;
		gl_FragColor = vec4(color, alpha);
	}
`;

const grainShader = {
	uniforms: {
		tDiffuse: { value: null },
		time: { value: 0 },
		intensity: { value: 0.05 }
	},
	vertexShader: /* glsl */ `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	fragmentShader: /* glsl */ `
		precision highp float;
		uniform sampler2D tDiffuse;
		uniform float time;
		uniform float intensity;
		varying vec2 vUv;

		float random(vec2 point) {
			return fract(sin(dot(point, vec2(12.9898, 78.233)) + time) * 43758.5453);
		}

		void main() {
			vec4 source = texture2D(tDiffuse, vUv);
			float noise = (random(gl_FragCoord.xy) - 0.5) * intensity;
			gl_FragColor = vec4(source.rgb + noise, source.a);
		}
	`
};

export class WarpEngine {
	private readonly canvas: HTMLCanvasElement;
	private readonly renderer: WebGLRenderer;
	private readonly scene = new Scene();
	private readonly camera = new PerspectiveCamera(80, 1, 0.001, 1000);
	private readonly material: ShaderMaterial;
	private readonly composer: EffectComposer;
	private readonly grainPass: ShaderPass;
	private readonly resizeObserver: ResizeObserver;
	private readonly motionQuery: MediaQueryList;
	private mesh: Mesh<InstancedBufferGeometry, ShaderMaterial>;
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

	constructor(canvas: HTMLCanvasElement, options: Partial<WarpOptions> = {}) {
		this.canvas = canvas;
		this.options = { ...defaultWarpOptions, ...options };
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: false,
			depth: false,
			alpha: true,
			powerPreference: 'high-performance'
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		this.renderer.setClearAlpha(1);
		this.canvas.dataset.engine = `three.js r${REVISION}`;

		this.camera.position.z = 15;
		this.material = this.createMaterial();
		this.mesh = this.createMesh(this.getCount());
		this.scene.add(this.mesh);

		const target = new WebGLRenderTarget(1, 1, {
			type: HalfFloatType,
			depthBuffer: false,
			stencilBuffer: false
		});
		this.composer = new EffectComposer(this.renderer, target);
		this.composer.addPass(new RenderPass(this.scene, this.camera));
		this.grainPass = new ShaderPass(grainShader);
		this.composer.addPass(this.grainPass);
		this.composer.addPass(new OutputPass());

		this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		this.reducedMotion = this.motionQuery.matches;
		this.resizeObserver = new ResizeObserver(() => this.resize());
		this.resizeObserver.observe(canvas.parentElement ?? canvas);
		this.motionQuery.addEventListener('change', this.handleMotionChange);
		document.addEventListener('visibilitychange', this.handleVisibilityChange);

		this.applyOptions();
		this.resize();
		this.start();
	}

	setOptions(options: Partial<WarpOptions>) {
		this.options = { ...this.options, ...options };
		const nextCount = this.getCount();
		if (nextCount !== this.count) this.rebuildMesh(nextCount);
		this.applyOptions();
		if (this.reducedMotion) this.render();
	}

	destroy() {
		cancelAnimationFrame(this.frame);
		this.resizeObserver.disconnect();
		this.motionQuery.removeEventListener('change', this.handleMotionChange);
		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.composer.dispose();
		this.renderer.dispose();
	}

	private createMaterial() {
		return new ShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true,
			depthTest: true,
			depthWrite: false,
			blending: AdditiveBlending,
			uniforms: {
				uTime: { value: this.time },
				uTrail: { value: this.options.trail },
				uBoundingBox: { value: new Vector3(30, 30, 80) },
				uMinScale: { value: new Vector3(0.01, 0.01, 3.7) },
				uMaxScale: { value: new Vector3(0.07, 0.07, 22.83) },
				uColor: { value: new Color('#7c8ace') },
				uAlpha: { value: 0.05 },
				uBrightness: { value: this.options.brightness },
				uGlowIntensity: { value: this.options.glowIntensity }
			}
		});
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
		this.material.uniforms.uColor.value.copy(color);
		this.material.uniforms.uTrail.value = clamp(this.options.trail, 0.25, 5);
		this.material.uniforms.uAlpha.value = 0.025 + clamp(this.options.opacity, 0, 1) * 0.04;
		this.material.uniforms.uBrightness.value = clamp(this.options.brightness, 1, 24);
		this.material.uniforms.uGlowIntensity.value = clamp(this.options.glowIntensity, 0, 18);
		this.scene.background = new Color(this.options.background);
		this.renderer.setClearColor(this.options.background, 1);
		this.camera.position.x = (0.5 - clamp(this.options.centerX, 0, 1)) * 6;
		this.camera.position.y = (clamp(this.options.centerY, 0, 1) - 0.5) * 6;
		this.camera.updateProjectionMatrix();
	}

	private resize() {
		const bounds = (this.canvas.parentElement ?? this.canvas).getBoundingClientRect();
		const width = Math.max(1, Math.round(bounds.width));
		const height = Math.max(1, Math.round(bounds.height));
		if (width === this.width && height === this.height) return;

		this.width = width;
		this.height = height;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height, false);
		this.composer.setSize(width, height);
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
		this.lastTime = performance.now();
		if (this.reducedMotion) {
			this.render();
		} else if (this.visible) {
			this.frame = requestAnimationFrame(this.tick);
		}
	}

	private readonly tick = (now: number) => {
		const delta = Math.min(now - this.lastTime, 50);
		this.lastTime = now;
		const frameFactor = Math.min(delta / (1000 / 60), 1);
		this.speedClock += 0.005 * frameFactor;
		const modulation = 0.5 + (Math.exp(Math.sin(this.speedClock)) - Math.exp(-1));
		const speedScale = this.options.speed / defaultWarpOptions.speed;
		this.time += 0.01 * frameFactor * 3.6 * modulation * speedScale;
		this.material.uniforms.uTime.value = this.time;
		this.grainPass.uniforms.time.value += 0.001;
		this.render();
		this.frame = requestAnimationFrame(this.tick);
	};

	private render() {
		this.composer.render();
	}
}
