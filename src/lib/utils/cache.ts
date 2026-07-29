const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

const ALLOWED_HOSTS = new Set(['api.github.com']);

function isAllowedFetchUrl(url: string): boolean {
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'https:' && ALLOWED_HOSTS.has(parsed.hostname);
	} catch {
		return false;
	}
}

/** Fetch JSON from an allowlisted HTTPS host with a short in-memory cache. */
export const cachedFetch = async (url: string) => {
	if (!isAllowedFetchUrl(url)) {
		throw new Error('URL is not allowlisted for cachedFetch');
	}

	const cached = cache.get(url);
	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.data;
	}

	const response = await fetch(url);
	const data = await response.json();
	cache.set(url, { data, timestamp: Date.now() });
	return data;
};
