export class CacheService {
    private static instance: CacheService;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

    static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now() + ttl
        });
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() > item.timestamp) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data as T;
    }

    clear(): void {
        this.cache.clear();
    }
}

export const cacheService = CacheService.getInstance();