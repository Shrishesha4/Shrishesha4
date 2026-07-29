import { detectWarpHdrCapabilities, type WarpDisplayMode } from './hdr';

export type FlareOptions = {
	ambient: number;
	centerX: number;
	centerY: number;
	density: number;
	intensity: number;
	opacity: number;
	progress: number;
	speed: number;
	trail: number;
};

export const defaultFlareOptions: FlareOptions = {
	ambient: 0,
	centerX: 0.5,
	centerY: 0.46,
	density: 180,
	intensity: 1,
	opacity: 1,
	progress: 0,
	speed: 1,
	trail: 2
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const WGSL = /* wgsl */ `
struct Uniforms {
	resolution: vec2f,
	center: vec2f,
	time: f32,
	progress: f32,
	intensity: f32,
	speed: f32,
	headroom: f32,
	ambient: f32,
	density: f32,
	trail: f32,
	opacity: f32,
	_pad: f32,
}

@group(0) @binding(0) var<uniform> u: Uniforms;

struct VertexOut {
	@builtin(position) position: vec4f,
	@location(0) uv: vec2f,
}

@vertex
fn vs(@builtin(vertex_index) index: u32) -> VertexOut {
	var positions = array<vec2f, 3>(
		vec2f(-1.0, -1.0),
		vec2f(3.0, -1.0),
		vec2f(-1.0, 3.0)
	);
	var out: VertexOut;
	let pos = positions[index];
	out.position = vec4f(pos, 0.0, 1.0);
	out.uv = pos * 0.5 + 0.5;
	return out;
}

fn hash21(p: vec2f) -> f32 {
	return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

@fragment
fn fs(input: VertexOut) -> @location(0) vec4f {
	let aspect = u.resolution.x / max(u.resolution.y, 1.0);
	var uv = input.uv - u.center;
	uv.x *= aspect;

	let radius = length(uv);
	let angle = atan2(uv.y, uv.x);
	let cover = smoothstep(0.04, 0.72, u.progress);
	let peak = pow(smoothstep(0.28, 1.0, u.progress), 1.35);

	var streak = 0.0;
	var chroma = 0.0;
	for (var i = 0; i < 24; i++) {
		let fi = f32(i);
		let seed = hash21(vec2f(fi * 17.13, fi * 91.7));
		let slot = (angle / 6.2831853 + seed + u.time * 0.018 * u.speed) * 64.0;
		let spoke = abs(fract(slot) - 0.5);
		let width = mix(0.009, 0.0025, seed);
		let spokeMask = 1.0 - smoothstep(0.0, width, spoke);
		let lengthMask = smoothstep(0.025, mix(0.22, 1.25, seed), radius)
			* (1.0 - smoothstep(mix(0.5, 1.65, seed), mix(0.8, 2.2, seed), radius));
		let brightness = mix(0.4, 1.65, seed);
		streak += spokeMask * lengthMask * brightness;
		chroma += (1.0 - smoothstep(0.0, width * 2.8, abs(fract(slot + 0.012 * peak) - 0.5)))
			* lengthMask * brightness;
	}

	let electricBlue = vec3f(0.3, 0.72, 1.9);
	let violet = vec3f(0.78, 0.28, 1.45);
	let hotGold = vec3f(1.75, 0.78, 0.22);
	let streakColor = electricBlue * streak * 1.15
		+ violet * chroma * 0.72
		+ hotGold * max(streak - chroma, 0.0) * 0.25;

	let transitionColor = streakColor * mix(0.65, 2.3, peak)
		* u.intensity * cover * u.headroom;
	let transitionAlpha = clamp(
		cover * (streak * 0.045 + chroma * 0.022),
		0.0,
		0.74
	);

	var ambientCore = 0.0;
	var ambientGlow = 0.0;
	var ambientHot = 0.0;
	let densityScale = clamp(u.density / 180.0, 0.35, 2.0);
	let trailScale = clamp(u.trail / 2.0, 0.3, 2.8);
	let angularPosition = fract(angle / 6.2831853 + 0.5);
	for (var layer = 0; layer < 3; layer++) {
		let fl = f32(layer);
		let laneCount = (64.0 + fl * 53.0) * densityScale;
		let lane = angularPosition * laneCount;
		let laneId = floor(lane);
		let laneDistance = abs(fract(lane) - 0.5);
		let seed = hash21(vec2f(laneId + fl * 113.0, fl * 47.0 + 9.0));
		let coreWidth = mix(0.014, 0.003, seed);
		let glowWidth = coreWidth * 4.5;
		let enabled = step(0.48, seed);
		let lineCore = (1.0 - smoothstep(0.0, coreWidth, laneDistance)) * enabled;
		let lineGlow = (1.0 - smoothstep(0.0, glowWidth, laneDistance)) * enabled;
		let velocity = (0.1 + u.speed * 0.16) * mix(0.72, 1.65, seed);
		let radialPhase = fract(
			radius * mix(2.1, 4.8, seed) - u.time * velocity + seed * 5.7
		);
		let head = 1.0 - smoothstep(0.0, 0.032, abs(radialPhase - 0.5));
		let tailWidth = clamp(0.07 + trailScale * 0.065, 0.09, 0.32);
		let tail = (1.0 - smoothstep(0.0, tailWidth, abs(radialPhase - 0.6))) * 0.28;
		let radialFade = smoothstep(0.025, 0.16, radius)
			* (1.0 - smoothstep(0.82, 1.75, radius));
		let segment = (head + tail) * radialFade * mix(0.5, 1.35, seed);
		ambientCore += lineCore * segment;
		ambientGlow += lineGlow * segment;
		ambientHot += lineCore * segment * step(0.84, seed);
	}
	let ambientColor = (
		electricBlue * ambientCore * 4.2
		+ electricBlue * ambientGlow * 0.52
		+ violet * ambientGlow * 0.28
		+ hotGold * ambientHot * 3.4
	) * u.ambient * u.headroom * u.opacity;
	let ambientAlpha = clamp(
		(ambientCore * 0.21 + ambientGlow * 0.035) * u.ambient * u.opacity,
		0.0,
		0.58
	);

	let alpha = 1.0 - (1.0 - transitionAlpha) * (1.0 - ambientAlpha);
	let premultiplied = transitionColor * transitionAlpha + ambientColor * ambientAlpha;
	return vec4f(premultiplied, alpha);
}
`;

export class FlareEngine {
	readonly mode: WarpDisplayMode;
	private readonly canvas: HTMLCanvasElement;
	private options: FlareOptions;
	private width = 1;
	private height = 1;
	private frame = 0;
	private startTime = performance.now();
	private destroyed = false;
	private readonly resizeObserver: ResizeObserver;
	private readonly motionQuery: MediaQueryList;
	private reducedMotion = false;
	private visible = !document.hidden;

	private device: GPUDevice | null = null;
	private context: GPUCanvasContext | null = null;
	private pipeline: GPURenderPipeline | null = null;
	private uniformBuffer: GPUBuffer | null = null;
	private bindGroup: GPUBindGroup | null = null;
	private uniformData = new Float32Array(14);
	private fallbackContext: CanvasRenderingContext2D | null = null;
	private headroom = 1;

	constructor(canvas: HTMLCanvasElement, options: Partial<FlareOptions> = {}) {
		this.canvas = canvas;
		this.options = { ...defaultFlareOptions, ...options };
		const capabilities = detectWarpHdrCapabilities();
		this.mode = capabilities.mode;
		this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		this.reducedMotion = this.motionQuery.matches;
		this.resizeObserver = new ResizeObserver(() => this.resize());
		this.resizeObserver.observe(canvas.parentElement ?? canvas);
		this.motionQuery.addEventListener('change', this.handleMotionChange);
		document.addEventListener('visibilitychange', this.handleVisibilityChange);
		void this.initialize(capabilities.canUseHdrCanvas);
	}

	setOptions(options: Partial<FlareOptions>) {
		this.options = { ...this.options, ...options };
		if (this.reducedMotion) this.renderFrame(performance.now());
	}

	destroy() {
		this.destroyed = true;
		cancelAnimationFrame(this.frame);
		this.resizeObserver.disconnect();
		this.motionQuery.removeEventListener('change', this.handleMotionChange);
		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		this.uniformBuffer?.destroy();
		this.device?.destroy();
		this.device = null;
		this.context = null;
		this.pipeline = null;
		this.bindGroup = null;
		this.fallbackContext = null;
	}

	private async initialize(preferHdr: boolean) {
		if (preferHdr) {
			try {
				await this.initializeWebGpu();
				this.canvas.dataset.engine = 'webgpu hdr';
				this.canvas.dataset.dynamicRange = 'high';
				this.resize();
				this.start();
				return;
			} catch {
				// Fall through to SDR canvas path.
			}
		}

		this.fallbackContext = this.canvas.getContext('2d', { alpha: true });
		if (!this.fallbackContext) throw new Error('Flare overlay requires canvas support.');
		this.canvas.dataset.engine = 'canvas2d flare';
		this.canvas.dataset.dynamicRange = 'standard';
		this.headroom = 1;
		this.resize();
		this.start();
	}

	private async initializeWebGpu() {
		const adapter = await navigator.gpu.requestAdapter();
		if (!adapter) throw new Error('No WebGPU adapter');
		const device = await adapter.requestDevice();
		const context = this.canvas.getContext('webgpu');
		if (!context) throw new Error('No WebGPU canvas context');

		context.configure({
			device,
			format: 'rgba16float',
			colorSpace: 'display-p3',
			alphaMode: 'premultiplied',
			toneMapping: { mode: 'extended' },
			usage: GPUTextureUsage.RENDER_ATTACHMENT
		});

		const module = device.createShaderModule({ code: WGSL });
		const bindGroupLayout = device.createBindGroupLayout({
			entries: [
				{
					binding: 0,
					visibility: GPUShaderStage.FRAGMENT,
					buffer: { type: 'uniform' }
				}
			]
		});
		const pipeline = device.createRenderPipeline({
			layout: device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] }),
			vertex: { module, entryPoint: 'vs' },
			fragment: {
				module,
				entryPoint: 'fs',
				targets: [
					{
						format: 'rgba16float',
						blend: {
							color: {
								srcFactor: 'one',
								dstFactor: 'one-minus-src-alpha',
								operation: 'add'
							},
							alpha: {
								srcFactor: 'one',
								dstFactor: 'one-minus-src-alpha',
								operation: 'add'
							}
						}
					}
				]
			},
			primitive: { topology: 'triangle-list' }
		});

		const uniformBuffer = device.createBuffer({
			size: this.uniformData.byteLength,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		});
		const bindGroup = device.createBindGroup({
			layout: bindGroupLayout,
			entries: [{ binding: 0, resource: { buffer: uniformBuffer } }]
		});

		this.device = device;
		this.context = context;
		this.pipeline = pipeline;
		this.uniformBuffer = uniformBuffer;
		this.bindGroup = bindGroup;
		this.headroom = 18;
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
		if (this.destroyed) return;
		if (this.reducedMotion) {
			this.renderFrame(performance.now());
			return;
		}
		if (this.visible) this.frame = requestAnimationFrame(this.tick);
	}

	private readonly tick = (now: number) => {
		this.renderFrame(now);
		if (!this.destroyed && this.visible && !this.reducedMotion) {
			this.frame = requestAnimationFrame(this.tick);
		}
	};

	private resize() {
		const bounds = (this.canvas.parentElement ?? this.canvas).getBoundingClientRect();
		const width = Math.max(1, Math.round(bounds.width));
		const height = Math.max(1, Math.round(bounds.height));
		const dpr = Math.min(window.devicePixelRatio || 1, this.mode === 'hdr' ? 2 : 1.5);
		if (width === this.width && height === this.height && this.canvas.width === Math.round(width * dpr)) {
			return;
		}

		this.width = width;
		this.height = height;
		this.canvas.width = Math.round(width * dpr);
		this.canvas.height = Math.round(height * dpr);
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;
		this.renderFrame(performance.now());
	}

	private renderFrame(now: number) {
		if (this.destroyed) return;
		const time = (now - this.startTime) / 1000;
		if (this.device && this.context && this.pipeline && this.uniformBuffer && this.bindGroup) {
			this.renderWebGpu(time);
			return;
		}
		this.renderFallback(time);
	}

	private renderWebGpu(time: number) {
		if (!this.device || !this.context || !this.pipeline || !this.uniformBuffer || !this.bindGroup) {
			return;
		}

		this.uniformData[0] = this.canvas.width;
		this.uniformData[1] = this.canvas.height;
		this.uniformData[2] = clamp(this.options.centerX, 0, 1);
		this.uniformData[3] = 1 - clamp(this.options.centerY, 0, 1);
		this.uniformData[4] = time;
		this.uniformData[5] = clamp(this.options.progress, 0, 1);
		this.uniformData[6] = clamp(this.options.intensity, 0, 4);
		this.uniformData[7] = clamp(this.options.speed, 0.1, 8);
		this.uniformData[8] = this.headroom;
		this.uniformData[9] = clamp(this.options.ambient, 0, 3);
		this.uniformData[10] = clamp(this.options.density, 24, 720);
		this.uniformData[11] = clamp(this.options.trail, 0.2, 8);
		this.uniformData[12] = clamp(this.options.opacity, 0, 1);
		this.device.queue.writeBuffer(this.uniformBuffer, 0, this.uniformData);

		const encoder = this.device.createCommandEncoder();
		const pass = encoder.beginRenderPass({
			colorAttachments: [
				{
					view: this.context.getCurrentTexture().createView(),
					clearValue: { r: 0, g: 0, b: 0, a: 0 },
					loadOp: 'clear',
					storeOp: 'store'
				}
			]
		});
		pass.setPipeline(this.pipeline);
		pass.setBindGroup(0, this.bindGroup);
		pass.draw(3);
		pass.end();
		this.device.queue.submit([encoder.finish()]);
	}

	private renderFallback(time: number) {
		const context = this.fallbackContext;
		if (!context) return;

		const width = this.canvas.width;
		const height = this.canvas.height;
		const progress = clamp(this.options.progress, 0, 1);
		const cover = smoothstep(0.04, 0.72, progress);
		const peak = Math.pow(smoothstep(0.28, 1, progress), 1.35);
		const intensity = clamp(this.options.intensity, 0, 4);
		const ambient = clamp(this.options.ambient, 0, 3);
		const opacity = clamp(this.options.opacity, 0, 1);
		const cx = clamp(this.options.centerX, 0, 1) * width;
		const cy = clamp(this.options.centerY, 0, 1) * height;
		const radius = Math.hypot(width, height) * 0.55;

		context.clearRect(0, 0, width, height);
		context.globalCompositeOperation = 'lighter';

		for (let index = 0; index < 72; index += 1) {
			const seed = hash(index * 19.7);
			const angle =
				((index / 72) * Math.PI * 2 +
					time * 0.08 * this.options.speed +
					seed +
					Math.sin(time * 2.4 + seed * 17) * 0.025 * peak) %
				(Math.PI * 2);
			const length = radius * (0.35 + seed * 0.9);
			const brightness = (0.12 + seed * 0.42) * peak * intensity * cover;
			const x2 = cx + Math.cos(angle) * length;
			const y2 = cy + Math.sin(angle) * length;
			const gradient = context.createLinearGradient(cx, cy, x2, y2);
			gradient.addColorStop(0, `rgba(255,184,92,${brightness * 0.65})`);
			gradient.addColorStop(0.16, `rgba(112,188,255,${brightness})`);
			gradient.addColorStop(0.5, `rgba(145,76,255,${brightness * 0.42})`);
			gradient.addColorStop(1, 'rgba(55,105,255,0)');
			context.strokeStyle = gradient;
			context.lineWidth = (0.5 + seed * 1.8) * (0.7 + peak);
			context.beginPath();
			context.moveTo(cx, cy);
			context.lineTo(x2, y2);
			context.stroke();
		}

		const ambientCount = Math.round(clamp(this.options.density, 24, 720));
		const trailScale = clamp(this.options.trail / 2, 0.3, 2.8);
		for (let index = 0; index < ambientCount; index += 1) {
			const seedAngle = hash(index * 41.13);
			const seedTravel = hash(index * 73.91 + 8.2);
			const velocity = (0.035 + seedTravel * 0.085) * Math.max(0.2, this.options.speed);
			const travel = (seedTravel + time * velocity) % 1;
			const angle = seedAngle * Math.PI * 2;
			const distance = radius * (0.04 + travel * 1.35);
			const trailLength =
				radius * (0.012 + travel * 0.06) * (0.7 + this.options.speed) * trailScale;
			const particleAlpha =
				ambient * opacity * (0.13 + seedTravel * 0.36) * (0.35 + travel * 0.65);
			if (particleAlpha < 0.01) continue;
			const x2 = cx + Math.cos(angle) * distance;
			const y2 = cy + Math.sin(angle) * distance;
			const x1 = cx + Math.cos(angle) * Math.max(0, distance - trailLength);
			const y1 = cy + Math.sin(angle) * Math.max(0, distance - trailLength);
			context.strokeStyle =
				seedTravel > 0.86
					? `rgba(255,174,78,${Math.min(1, particleAlpha)})`
					: `rgba(105,195,255,${Math.min(1, particleAlpha)})`;
			context.lineWidth = 0.6 + seedTravel * 1.7;
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
		}
		context.globalCompositeOperation = 'source-over';
	}
}

const hash = (value: number) => {
	const result = Math.sin(value * 127.1) * 43758.5453;
	return result - Math.floor(result);
};

const smoothstep = (edge0: number, edge1: number, value: number) => {
	const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};
