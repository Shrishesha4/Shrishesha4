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

export const optimizeImage = (url: string, options: Partial<ImageOptimizationOptions> = {}) => {
    if (!url) return '';

    if (url.includes('githubusercontent.com') || url.includes('res.cloudinary.com')) {
        return url;
    }

    const opts = { ...defaultOptions, ...options };
    const transformations = [
        `w_${opts.width}`,
        `q_${opts.quality}`,
        `f_${opts.format}`,
        `dpr_${opts.dpr}`,
        'c_limit',
        opts.blur ? 'e_blur:1000' : null
    ].filter(Boolean).join(',');

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'optimage';
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${encodeURIComponent(url)}`;
};

export const getResponsiveImageSrcSet = (url: string, widths: number[] = [320, 640, 960, 1280]) => {
    return widths
        .map(width => {
            const optimizedUrl = optimizeImage(url, { width });
            return `${optimizedUrl} ${width}w`;
        })
        .join(', ');
};