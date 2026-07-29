<script module lang="ts">
	export type WarpTransitionEasing =
		| 'linear'
		| 'ease-in-cubic'
		| 'ease-out-cubic'
		| 'ease-in-out-cubic';

	export type WarpTransitionKeyframe = {
		offset: number;
		speed: number;
		trail: number;
		opacity: number;
		brightness?: number;
		glowIntensity?: number;
		flareIntensity?: number;
		easing?: WarpTransitionEasing;
	};

	export const defaultWarpTransitionKeyframes: readonly WarpTransitionKeyframe[] = [
		{
			offset: 0,
			speed: 0.34,
			trail: 1.5,
			opacity: 0.45,
			brightness: 6,
			glowIntensity: 4,
			flareIntensity: 0,
			easing: 'ease-in-cubic'
		},
		{
			offset: 0.22,
			speed: 0.58,
			trail: 2.2,
			opacity: 0.75,
			brightness: 10,
			glowIntensity: 7,
			flareIntensity: 0.6,
			easing: 'ease-in-out-cubic'
		},
		{
			offset: 0.68,
			speed: 1.1,
			trail: 4.8,
			opacity: 1,
			brightness: 16,
			glowIntensity: 12,
			flareIntensity: 1.4,
			easing: 'ease-out-cubic'
		},
		{
			offset: 1,
			speed: 0.34,
			trail: 1.8,
			opacity: 0.96,
			brightness: 16,
			glowIntensity: 12,
			flareIntensity: 1.4
		}
	];
</script>

<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import type { TransitionConfig } from 'svelte/transition';

	import WarpBackground from './WarpBackground.svelte';
	import { defaultWarpOptions, type WarpOptions } from './warp-engine';

	type SampledWarpTransitionKeyframe = Required<
		Pick<
			WarpTransitionKeyframe,
			| 'offset'
			| 'speed'
			| 'trail'
			| 'opacity'
			| 'brightness'
			| 'glowIntensity'
			| 'flareIntensity'
		>
	> & {
		easing?: WarpTransitionEasing;
	};

	type Props = Partial<WarpOptions> & {
		active: boolean;
		duration?: number;
		keyframes?: readonly WarpTransitionKeyframe[];
		oncovered?: () => void | Promise<void>;
		variant?: 'classic' | 'flare';
		zIndex?: number;
	};

	let {
		active,
		duration = 650,
		keyframes = defaultWarpTransitionKeyframes,
		oncovered,
		variant = 'flare',
		zIndex = 2147483647,
		...warpOptions
	}: Props = $props();

	const clamp = (value: number, min: number, max: number, fallback: number) =>
		Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

	const normalizeKeyframes = (
		frames: readonly WarpTransitionKeyframe[]
	): readonly SampledWarpTransitionKeyframe[] => {
		const source = frames.length > 0 ? frames : defaultWarpTransitionKeyframes;

		return source
			.map((frame) => ({
				offset: clamp(frame.offset, 0, 1, 0),
				speed: clamp(frame.speed, 0, 10, 0),
				trail: clamp(frame.trail, 0.25, 5, 0.25),
				opacity: clamp(frame.opacity, 0, 1, 0),
				brightness: clamp(frame.brightness ?? 6, 1, 24, 6),
				glowIntensity: clamp(frame.glowIntensity ?? 4, 0, 18, 4),
				flareIntensity: clamp(frame.flareIntensity ?? 0, 0, 4, 0),
				easing: frame.easing
			}))
			.sort((a, b) => a.offset - b.offset);
	};

	const ease = (easing: WarpTransitionEasing | undefined, t: number) => {
		switch (easing) {
			case 'ease-in-cubic':
				return t * t * t;
			case 'ease-out-cubic':
				return 1 - Math.pow(1 - t, 3);
			case 'ease-in-out-cubic':
				return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
			default:
				return t;
		}
	};

	const sampleTimeline = (
		frames: readonly SampledWarpTransitionKeyframe[],
		progress: number
	): SampledWarpTransitionKeyframe => {
		const first = frames[0];
		if (frames.length === 1 || progress <= first.offset) return first;

		let startIndex = 0;
		while (startIndex < frames.length - 1 && frames[startIndex + 1].offset <= progress) {
			startIndex += 1;
		}

		const start = frames[startIndex];
		const end = frames[Math.min(startIndex + 1, frames.length - 1)];
		if (start === end) return start;

		const span = end.offset - start.offset;
		const segmentProgress = span > 0 ? (progress - start.offset) / span : 1;
		const t = ease(start.easing, clamp(segmentProgress, 0, 1, 0));

		return {
			offset: progress,
			speed: start.speed + (end.speed - start.speed) * t,
			trail: start.trail + (end.trail - start.trail) * t,
			opacity: start.opacity + (end.opacity - start.opacity) * t,
			brightness: start.brightness + (end.brightness - start.brightness) * t,
			glowIntensity: start.glowIntensity + (end.glowIntensity - start.glowIntensity) * t,
			flareIntensity: start.flareIntensity + (end.flareIntensity - start.flareIntensity) * t
		};
	};

	const normalizedKeyframes = $derived.by(() => normalizeKeyframes(keyframes));
	let sampledSpeed = $state(defaultWarpTransitionKeyframes[0].speed);
	let sampledTrail = $state(defaultWarpTransitionKeyframes[0].trail);
	let sampledOpacity = $state(defaultWarpTransitionKeyframes[0].opacity);
	let sampledBrightness = $state(defaultWarpOptions.brightness);
	let sampledGlowIntensity = $state(defaultWarpOptions.glowIntensity);
	let sampledFlareIntensity = $state(0);
	const transitionDuration = $derived(
		prefersReducedMotion.current ? 0 : clamp(duration, 0, 60_000, 650)
	);

	function warpTransition(_node: Element): TransitionConfig {
		return {
			duration: transitionDuration,
			css: (t) => `opacity: ${t}`,
			tick: (t) => {
				const sample = sampleTimeline(normalizedKeyframes, clamp(t, 0, 1, 0));
				sampledSpeed = sample.speed;
				sampledTrail = sample.trail;
				sampledOpacity = sample.opacity;
				sampledBrightness = sample.brightness;
				sampledGlowIntensity = sample.glowIntensity;
				sampledFlareIntensity = sample.flareIntensity;
			}
		};
	}
</script>

{#if active}
	<div
		class={['warp-page-transition', variant === 'flare' && 'flare-active']}
		data-variant={variant}
		data-flare-active={variant === 'flare' ? 'true' : undefined}
		style:pointer-events={active ? 'auto' : 'none'}
		style:z-index={zIndex}
		transition:warpTransition
		onintroend={() => void oncovered?.()}
	>
		<WarpBackground
			{...warpOptions}
			speed={sampledSpeed}
			trail={sampledTrail}
			opacity={sampledOpacity}
			brightness={sampledBrightness}
			glowIntensity={sampledGlowIntensity}
			hdrParticles={variant === 'flare'}
			hdrParticleIntensity={0.9 + sampledFlareIntensity * 0.35}
		/>
	</div>
{/if}

<style>
	.warp-page-transition {
		position: fixed;
		inset: 0;
		overflow: hidden;
	}
</style>
