// Caching utility — uses Upstash Redis when available, falls back to in-memory LRU
import { Redis } from '@upstash/redis';

const memoryCache = new Map<string, { value: unknown; expires: number }>();
const MAX_MEMORY_CACHE = 500;

// Lazy-init Redis — avoids build-time errors when env vars aren't set
let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

function cleanMemoryCache() {
  if (memoryCache.size > MAX_MEMORY_CACHE) {
    const now = Date.now();
    memoryCache.forEach((entry, key) => {
      if (entry.expires < now) memoryCache.delete(key);
    });
    if (memoryCache.size > MAX_MEMORY_CACHE) {
      const entries = Array.from(memoryCache.keys());
      entries.slice(0, entries.length - MAX_MEMORY_CACHE).forEach(k => memoryCache.delete(k));
    }
  }
}

export async function getCached<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 86400): Promise<T> {
  // Try Redis first
  const redis = getRedis();
  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null && cached !== undefined) {
        return cached;
      }
    } catch {
      // Redis read failed — fall through
    }
  }

  // Check in-memory cache as fallback
  const memoryCached = memoryCache.get(key);
  if (memoryCached && memoryCached.expires > Date.now()) {
    return memoryCached.value as T;
  }

  // Fetch fresh data
  const fresh = await fetcher();

  // Store in Redis
  if (redis) {
    try {
      await redis.set(key, JSON.stringify(fresh), { ex: ttlSeconds });
    } catch {
      // Redis write failed — non-fatal
    }
  }

  // Store in memory cache as fallback
  cleanMemoryCache();
  memoryCache.set(key, { value: fresh, expires: Date.now() + ttlSeconds * 1000 });

  return fresh;
}

export function invalidateCache(keyPattern: string) {
  // Clear from memory cache
  Array.from(memoryCache.keys()).forEach(key => {
    if (key.includes(keyPattern)) memoryCache.delete(key);
  });
  // Note: Redis invalidation would require pattern-based DEL which is not supported in REST API.
  // For production, use explicit key deletion via redis.del(key).
}

// Cache TTL constants
export const CACHE_TTL = {
  FJC_STATS: 86400,      // 24 hours
  COURTLISTENER: 21600,  // 6 hours
  AI_SUMMARY: 2592000,   // 30 days
  TRENDS: 43200,         // 12 hours
  JUDGE_DATA: 604800,    // 7 days
} as const;
