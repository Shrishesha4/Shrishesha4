const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:']);

/** Returns a safe href, or '#' if the URL uses a dangerous scheme. */
export function safeHref(url: string | null | undefined): string {
	if (!url) return '#';
	const trimmed = url.trim();
	if (!trimmed) return '#';

	// Allow same-origin relative paths (reject protocol-relative //evil.com)
	if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
		return trimmed;
	}

	try {
		const parsed = new URL(trimmed);
		if (ALLOWED_PROTOCOLS.has(parsed.protocol)) {
			return trimmed;
		}
	} catch {
		// Invalid URL
	}

	return '#';
}

/** True when URL is an HTTPS Google Apps Script web app endpoint. */
export function isAllowedSpreadsheetUrl(url: string | null | undefined): boolean {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		return (
			parsed.protocol === 'https:' &&
			parsed.hostname === 'script.google.com' &&
			parsed.pathname.startsWith('/macros/')
		);
	} catch {
		return false;
	}
}

const ALLOWED_IMAGE_HOST_SUFFIXES = [
	'githubusercontent.com',
	'cloudinary.com',
	'googleusercontent.com',
	'firebasestorage.googleapis.com',
	'imgur.com',
	'images.unsplash.com'
];

/** True when URL is https and points at an allowlisted image host. */
export function isAllowedImageUrl(url: string | null | undefined): boolean {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		if (parsed.protocol !== 'https:') return false;
		const host = parsed.hostname.toLowerCase();
		return ALLOWED_IMAGE_HOST_SUFFIXES.some(
			(suffix) => host === suffix || host.endsWith(`.${suffix}`)
		);
	} catch {
		return false;
	}
}
