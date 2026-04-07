/**
 * Rate limiting with Upstash Redis fallback to in-memory
 * Supports different tier-based rate limits for API endpoints
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory fallback for development
interface InMemoryRateLimitRecord {
  count: number;
  resetTime: number;
}

const inMemoryStore = new Map<string, InMemoryRateLimitRecord>();
const MAX_MAP_SIZE = 50_000;

/**
 * In-memory rate limiter fallback
 */
class InMemoryRateLimiter {
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async limit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const record = inMemoryStore.get(identifier);

    if (!record || now > record.resetTime) {
      inMemoryStore.set(identifier, { count: 1, resetTime: now + this.windowMs });
      this.evictIfNeeded();
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  private evictIfNeeded(): void {
    if (inMemoryStore.size <= MAX_MAP_SIZE) return;

    const now = Date.now();
    const expiredKeys: string[] = [];

    inMemoryStore.forEach((value, key) => {
      if (now > value.resetTime) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach((key) => inMemoryStore.delete(key));

    if (inMemoryStore.size > MAX_MAP_SIZE) {
      const toDelete = inMemoryStore.size - MAX_MAP_SIZE;
      let deleted = 0;
      const keysToEvict: string[] = [];

      inMemoryStore.forEach((_, key) => {
        if (deleted < toDelete) {
          keysToEvict.push(key);
          deleted++;
        }
      });

      keysToEvict.forEach((key) => inMemoryStore.delete(key));
    }
  }
}

// Clean up expired in-memory entries every minute
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];

  inMemoryStore.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach((key) => inMemoryStore.delete(key));
}, 60000);

/**
 * Create a Upstash Redis-backed rate limiter with fallback
 */
function createRateLimiter(maxRequests: number, windowMs: number) {
  // Try to use Upstash Redis if configured
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs}ms`),
        analytics: false,
        prefix: 'ratelimit',
      });
    } catch (error) {
      console.warn('Failed to initialize Upstash Redis, falling back to in-memory:', error);
    }
  }

  // Return in-memory fallback
  return new InMemoryRateLimiter(windowMs, maxRequests);
}

// Create rate limiters for different tiers
export const apiRateLimit = createRateLimiter(60, 60000); // 60 requests per minute
export const aiRateLimit = createRateLimiter(10, 60000); // 10 requests per minute
export const authRateLimit = createRateLimiter(5, 60000); // 5 requests per minute

/**
 * Check rate limit for an identifier
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param limiter - Rate limiter to use (defaults to apiRateLimit)
 * @returns true if request is allowed, false if rate limit exceeded
 */
export async function checkRateLimit(
  identifier: string,
  limiter: any = apiRateLimit
): Promise<boolean> {
  try {
    // Check if it's using Upstash Ratelimit or InMemoryRateLimiter
    if (limiter instanceof Ratelimit) {
      const result = await limiter.limit(identifier);
      return result.success;
    } else if (limiter instanceof InMemoryRateLimiter) {
      return await limiter.limit(identifier);
    }
    return true;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open - allow request if rate limiting fails
    return true;
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || 'unknown';
}
