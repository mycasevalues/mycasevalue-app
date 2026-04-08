/**
 * MyCaseValue — API Response Helpers
 *
 * Standardized response builders for all API routes.
 * Enforces consistent JSON structure, status codes, CORS headers,
 * and cache control across the entire API surface.
 */

import { NextResponse } from 'next/server';

// Standard CORS headers applied to all API responses
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'X-Robots-Tag': 'noindex',
} as const;

// ─── Success Responses ──────────────────────────────────────────

/**
 * 200 OK with JSON data
 */
export function apiSuccess<T>(
  data: T,
  options?: {
    status?: number;
    cache?: string;
    rateRemaining?: number;
  }
) {
  const headers: Record<string, string> = { ...CORS_HEADERS };

  if (options?.cache) {
    headers['Cache-Control'] = options.cache;
  } else {
    headers['Cache-Control'] = 'no-store';
  }

  if (options?.rateRemaining !== undefined) {
    headers['X-RateLimit-Remaining'] = String(options.rateRemaining);
  }

  return NextResponse.json(data, {
    status: options?.status ?? 200,
    headers,
  });
}

/**
 * 201 Created
 */
export function apiCreated<T>(data: T) {
  return apiSuccess(data, { status: 201 });
}

/**
 * 204 No Content (for OPTIONS preflight)
 */
export function apiNoContent() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// ─── Error Responses ────────────────────────────────────────────

interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

function apiError(error: ApiError, status: number) {
  return NextResponse.json(error, {
    status,
    headers: CORS_HEADERS,
  });
}

/**
 * 400 Bad Request — validation failures
 */
export function apiBadRequest(message: string, code?: string) {
  return apiError({ error: 'Bad Request', message, code }, 400);
}

/**
 * 401 Unauthorized — missing or invalid auth
 */
export function apiUnauthorized(message = 'Authentication required') {
  return apiError({ error: 'Unauthorized', message }, 401);
}

/**
 * 403 Forbidden — valid auth but insufficient permissions
 */
export function apiForbidden(message = 'Insufficient permissions') {
  return apiError({ error: 'Forbidden', message }, 403);
}

/**
 * 404 Not Found
 */
export function apiNotFound(message = 'Resource not found') {
  return apiError({ error: 'Not Found', message }, 404);
}

/**
 * 429 Too Many Requests — rate limit exceeded
 */
export function apiRateLimited(message = 'Rate limit exceeded') {
  return NextResponse.json(
    { error: 'Too Many Requests', message },
    {
      status: 429,
      headers: {
        ...CORS_HEADERS,
        'X-RateLimit-Remaining': '0',
        'Retry-After': '60',
      },
    }
  );
}

/**
 * 500 Internal Server Error
 */
export function apiInternalError(message = 'An unexpected error occurred') {
  return apiError({ error: 'Internal Server Error', message }, 500);
}

/**
 * 503 Service Unavailable — dependency down
 */
export function apiUnavailable(message = 'Service temporarily unavailable') {
  return apiError({ error: 'Service Unavailable', message }, 503);
}
