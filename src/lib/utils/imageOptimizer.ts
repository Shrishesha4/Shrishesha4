export interface ImageOptimizationOptions {
	width?: number;
	quality?: number;
	format?: 'auto' | 'webp' | 'avif';
	blur?: boolean;
	dpr?: number;
}

const defaultOptions: ImageOptimizationOptions = {
	width: 800,
	quality: 80,
	format: 'auto',
	blur: false,
	dpr: 2
};

const ALLOWED_FETCH_HOST_SUFFIXES = [
	'githubusercontent.com',
	'googleusercontent.com',
	'firebasestorage.googleapis.com',
	'imgur.com',
	'images.unsplash.com'
];

function isSafeRemoteImage(url: string): boolean {
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== 'https:') return false;
		const host = parsed.hostname.toLowerCase();
		return ALLOWED_FETCH_HOST_SUFFIXES.some(
			(suffix) => host === suffix || host.endsWith(`.${suffix}`)
		);
	} catch {
		return false;
	}
}

export const optimizeImage = (url: string, options: Partial<ImageOptimizationOptions> = {}) => {
	if (!url) return '';

	// Already on a CDN we trust — use as-is
	if (url.includes('githubusercontent.com') || url.includes('res.cloudinary.com')) {
		return url;
	}

	// Only proxy allowlisted https image hosts through Cloudinary fetch
	if (!isSafeRemoteImage(url)) {
		return url.startsWith('/') ? url : '';
	}

	const opts = { ...defaultOptions, ...options };
	const transformations = [
		`w_${opts.width}`,
		`q_${opts.quality}`,
		`f_${opts.format}`,
		`dpr_${opts.dpr}`,
		'c_limit',
		opts.blur ? 'e_blur:1000' : null
	]
		.filter(Boolean)
		.join(',');

	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'optimage';
	return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${encodeURIComponent(url)}`;
};

export const getResponsiveImageSrcSet = (url: string, widths: number[] = [320, 640, 960, 1280]) => {
	return widths
		.map((width) => {
			const optimizedUrl = optimizeImage(url, { width });
			return optimizedUrl ? `${optimizedUrl} ${width}w` : '';
		})
		.filter(Boolean)
		.join(', ');
};
