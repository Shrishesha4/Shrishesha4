const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const cachedFetch = async (url: string) => {
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
};