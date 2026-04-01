/**
 * Simple in-memory rate limiter for API routes
 * Uses a sliding window approach with automatic cleanup
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
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

  if (keysToDelete.length > 0) {
    console.log(`[Rate Limit Cleanup] Removed ${keysToDelete.length} expired entries`);
  }
}, 60000);
