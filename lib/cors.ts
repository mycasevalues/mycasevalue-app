/**
 * CORS origin allowlist.
 *
 * Vercel preview deployments are allowed automatically so that
 * PR previews can call the same API routes without CORS errors.
 */

const VERCEL_PREVIEW_RE = /^https:\/\/mycasevalue[\w-]*\.vercel\.app$/;

export function corsHeaders(origin: string | null) {
  const allowedOrigins = [
    'https://www.mycasevalues.com',
    'https://mycasevalues.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ];

  const isAllowed =
    origin != null &&
    (allowedOrigins.includes(origin) || VERCEL_PREVIEW_RE.test(origin));

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://www.mycasevalues.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Access-Control-Max-Age': '86400',
  };
}
