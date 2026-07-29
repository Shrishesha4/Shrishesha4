export type WarpDisplayMode = 'sdr' | 'hdr';

export type WarpHdrCapabilities = {
	displayHdr: boolean;
	webgpu: boolean;
	float16: boolean;
	canUseHdrCanvas: boolean;
	mode: WarpDisplayMode;
};

const hasWebGpu = () =>
	typeof navigator !== 'undefined' && typeof navigator.gpu !== 'undefined';

const hasFloat16 = () => typeof Float16Array !== 'undefined';

export function detectWarpHdrCapabilities(): WarpHdrCapabilities {
	if (typeof window === 'undefined') {
		return {
			displayHdr: false,
			webgpu: false,
			float16: false,
			canUseHdrCanvas: false,
			mode: 'sdr'
		};
	}

	const displayHdr = window.matchMedia('(dynamic-range: high)').matches;
	const webgpu = hasWebGpu();
	const float16 = hasFloat16();
	const canUseHdrCanvas = displayHdr && webgpu && float16;

	return {
		displayHdr,
		webgpu,
		float16,
		canUseHdrCanvas,
		mode: canUseHdrCanvas ? 'hdr' : 'sdr'
	};
}
