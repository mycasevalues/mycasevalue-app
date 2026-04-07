// Caching utility — uses Upstash Redis when available, falls back to in-memory LRU
const memoryCache = new Map<string, { value: unknown; expires: number }>();
const MAX_MEMORY_CACHE = 500;

function cleanMemoryCache() {
  if (memoryCache.size > MAX_MEMORY_CACHE) {
    const now = Date.now();
    memoryCache.forEach((entry, key) => {
      if (entry.expires < now) memoryCache.delete(key);
    });
    // If still over limit, delete oldest entries
    if (memoryCache.size > MAX_MEMORY_CACHE) {
      const entries = Array.from(memoryCache.keys());
      entries.slice(0, entries.length - MAX_MEMORY_CACHE).forEach(k => memoryCache.delete(k));
    }
  }
}

export async function getCached<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 86400): Promise<T> {
  // Check memory cache
  const cached = memoryCache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.value as T;
  }

  // Fetch fresh data
  const fresh = await fetcher();

  // Store in memory cache
  cleanMemoryCache();
  memoryCache.set(key, { value: fresh, expires: Date.now() + ttlSeconds * 1000 });

  return fresh;
}

export function invalidateCache(keyPattern: string) {
  Array.from(memoryCache.keys()).forEach(key => {
    if (key.includes(keyPattern)) memoryCache.delete(key);
  });
}

// Cache TTL constants
export const CACHE_TTL = {
  FJC_STATS: 86400,      // 24 hours
  COURTLISTENER: 21600,  // 6 hours
  AI_SUMMARY: 2592000,   // 30 days
  TRENDS: 43200,         // 12 hours
  JUDGE_DATA: 604800,    // 7 days
} as const;
