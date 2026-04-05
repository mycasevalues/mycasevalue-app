/**
 * MyCaseValue — API Middleware
 *
 * Reusable wrapper for API route handlers that provides:
 * - Structured request/response logging with timing
 * - Request ID generation for tracing
 * - Automatic error catching with proper responses
 * - CORS preflight handling
 * - Rate limiting integration
 *
 * Usage:
 *   import { apiHandler } from '../../../lib/api-middleware';
 *
 *   export const GET = apiHandler({
 *     rateLimit: { windowMs: 60000, maxRequests: 30 },
 *   }, async (request, { log, requestId }) => {
 *     log.info('Processing request', { nos: '442' });
 *     return apiSuccess({ data: result });
 *   });
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';
import { rateLimit as rateLimitFn, getClientIp } from './rate-limit';
import { apiRateLimited, apiInternalError } from './api-response';

// ─── Types ─────────────────────────────────────────────────────

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface ApiHandlerOptions {
  /** Rate limit config. Omit to disable rate limiting for this route. */
  rateLimit?: RateLimitConfig;
  /** Route name for logging (auto-detected from URL if omitted) */
  routeName?: string;
}

interface ApiContext {
  /** Child logger scoped to this request */
  log: ReturnType<typeof logger.child>;
  /** Unique request ID for tracing */
  requestId: string;
  /** Client IP address */
  clientIp: string;
}

type ApiRouteHandler = (
  request: NextRequest,
  context: ApiContext,
) => Promise<NextResponse> | NextResponse;

// ─── Request ID generation ─────────────────────────────────────

let reqCounter = 0;

function generateRequestId(): string {
  const ts = Date.now().toString(36);
  const count = (++reqCounter % 0xffff).toString(16).padStart(4, '0');
  const rand = Math.random().toString(36).slice(2, 6);
  return `${ts}-${count}-${rand}`;
}

// ─── Route name extraction ─────────────────────────────────────

function extractRouteName(url: string): string {
  try {
    const { pathname } = new URL(url);
    // /api/report → report, /api/attorney/judge-intelligence → attorney/judge-intelligence
    return pathname.replace('/api/', '').replace(/\/$/, '') || 'unknown';
  } catch {
    return 'unknown';
  }
}

// ─── Main handler wrapper ──────────────────────────────────────

/**
 * Wraps an API route handler with logging, timing, rate limiting, and error handling.
 */
export function apiHandler(
  options: ApiHandlerOptions,
  handler: ApiRouteHandler,
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const start = performance.now();
    const requestId = generateRequestId();
    const routeName = options.routeName || extractRouteName(request.url);
    const method = request.method;
    const clientIp = getClientIp(request.headers);

    const log = logger.child({
      route: routeName,
      requestId,
      method,
      ip: clientIp,
    });

    // ── Rate limiting ────────────────────────────────────────
    if (options.rateLimit) {
      const result = rateLimitFn(clientIp, options.rateLimit);
      if (!result.success) {
        const duration = Math.round(performance.now() - start);
        log.warn('Rate limited', { duration, remaining: 0 });
        return apiRateLimited();
      }
    }

    // ── Execute handler ──────────────────────────────────────
    try {
      const response = await handler(request, { log, requestId, clientIp });
      const duration = Math.round(performance.now() - start);
      const status = response.status;

      // Add request ID header to response for client-side tracing
      response.headers.set('x-request-id', requestId);

      // Log at appropriate level based on status code
      if (status >= 500) {
        log.error('Request completed', { status, duration });
      } else if (status >= 400) {
        log.warn('Request completed', { status, duration });
      } else if (duration > 3000) {
        // Flag slow requests
        log.warn('Slow request', { status, duration });
      } else {
        log.info('Request completed', { status, duration });
      }

      return response;
    } catch (err: unknown) {
      const duration = Math.round(performance.now() - start);
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;

      log.error('Unhandled exception', { duration, error: message, stack });

      const response = apiInternalError('An unexpected error occurred');
      response.headers.set('x-request-id', requestId);
      return response;
    }
  };
}

/**
 * Standard OPTIONS handler for CORS preflight.
 * Export this alongside GET/POST in routes that need CORS.
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      'Access-Control-Max-Age': '86400',
    },
  });
}
