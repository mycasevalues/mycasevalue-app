/**
 * Simple in-memory rate limiter for API routes
 * Uses a sliding window approach with automatic cleanup.
 * Includes a max map size cap to prevent unbounded memory growth
 * from large numbers of unique IPs (e.g., DDoS or scan attacks).
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/** Maximum number of tracked IPs. Beyond this, oldest entries are evicted. */
const MAX_MAP_SIZE = 50_000;

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

/**
 * Evict expired entries; if still over MAX_MAP_SIZE, evict oldest first.
 * Called when the map grows past the cap.
 */
function evictIfNeeded(): void {
  if (rateLimitMap.size <= MAX_MAP_SIZE) return;

  const now = Date.now();
  // First pass: remove expired entries
  const expiredKeys: string[] = [];
  rateLimitMap.forEach((value, key) => {
    if (now > value.resetTime) {
      expiredKeys.push(key);
    }
  });
  expiredKeys.forEach(key => rateLimitMap.delete(key));

  // Second pass: if still over cap, delete oldest entries (Map iterates in insertion order)
  if (rateLimitMap.size > MAX_MAP_SIZE) {
    const toDelete = rateLimitMap.size - MAX_MAP_SIZE;
    let deleted = 0;
    const keysToEvict: string[] = [];
    rateLimitMap.forEach((_, key) => {
      if (deleted < toDelete) {
        keysToEvict.push(key);
        deleted++;
      }
    });
    keysToEvict.forEach(key => rateLimitMap.delete(key));
  }
}

/**
 * Rate limit a request by identifier (e.g., IP address)
 * @param identifier Unique identifier for the client (e.g., IP address)
 * @param config Rate limit configuration
 * @returns Object with success status and remaining requests
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 10 }
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // If no record exists or window has expired, create new record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + config.windowMs });
    evictIfNeeded();
    return { success: true, remaining: config.maxRequests - 1 };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    return { success: false, remaining: 0 };
  }

  // Increment counter
  record.count++;
  return { success: true, remaining: config.maxRequests - record.count };
}

/**
 * Get client IP from request headers
 * Handles x-forwarded-for and x-real-ip headers
 */
export function getClientIp(headers: any): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || 'unknown';
}

// Clean up expired entries every minute to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];

  rateLimitMap.forEach((value, key) => {
    if (now > value.resetTime) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach(key => rateLimitMap.delete(key));
}, 60000);
