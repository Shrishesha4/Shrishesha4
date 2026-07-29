<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { detectWarpHdrCapabilities } from './hdr';
	import { HdrWarpEngine } from './hdr-warp-engine';
	import { defaultWarpOptions, WarpEngine, type WarpOptions } from './warp-engine';

	type Props = Omit<Partial<WarpOptions>, 'hdrParticles' | 'hdrParticleIntensity'> &
		Omit<HTMLAttributes<HTMLDivElement>, 'aria-hidden' | 'class'> & {
			class?: HTMLAttributes<HTMLDivElement>['class'];
			hdrParticles?: boolean;
			hdrParticleIntensity?: number;
		};

	let {
		background = defaultWarpOptions.background,
		brightness = defaultWarpOptions.brightness,
		centerX = defaultWarpOptions.centerX,
		centerY = defaultWarpOptions.centerY,
		colorShift = defaultWarpOptions.colorShift,
		density = defaultWarpOptions.density,
		glowIntensity = defaultWarpOptions.glowIntensity,
		hdrParticles = false,
		hdrParticleIntensity = 1,
		opacity = defaultWarpOptions.opacity,
		speed = defaultWarpOptions.speed,
		trail = defaultWarpOptions.trail,
		class: className,
		...attributes
	}: Props = $props();

	const attachWarpRenderer: Attachment<HTMLCanvasElement> = (canvas) => {
		const useHdrEngine = hdrParticles && detectWarpHdrCapabilities().canUseHdrCanvas;
		const engine = useHdrEngine ? new HdrWarpEngine(canvas) : new WarpEngine(canvas);
		const updater = {
			set options({
				options,
				hdrIntensity
			}: {
				options: WarpOptions;
				hdrIntensity: number;
			}) {
				engine.setOptions({
					...options,
					brightness: useHdrEngine
						? Math.min(24, Math.max(0, options.brightness * hdrIntensity))
						: options.brightness
				});
			}
		};

		$effect(() => {
			updater.options = {
				options: {
					background,
					brightness,
					centerX,
					centerY,
					colorShift,
					density,
					glowIntensity,
					opacity,
					speed,
					trail
				},
				hdrIntensity: hdrParticleIntensity
			};
		});

		return () => engine.destroy();
	};
</script>

<div
	{...attributes}
	class={['warp-background', className]}
	aria-hidden="true"
	style:background
>
	<canvas class="warp-canvas" {@attach attachWarpRenderer}></canvas>
</div>

<style>
	.warp-background {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.warp-canvas {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
