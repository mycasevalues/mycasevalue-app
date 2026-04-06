/**
 * GET /api/feed/batch
 * REST endpoint for fetching initial batch of feed items
 *
 * Returns 20 recent feed items as JSON for:
 * - Initial page load
 * - Server-side rendering (SSR)
 * - SSE client reconnection with fallback
 *
 * Query parameters:
 * - count: number of items to return (default: 20, max: 100)
 * - offset: number of items to skip for pagination (default: 0)
 */

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { generateFeedBatch } from '../../../../lib/case-feed';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, {
    windowMs: 60000,
    maxRequests: 30,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Maximum 30 per minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    // Parse query parameters
    const searchParams = new URL(request.url).searchParams;
    const countStr = searchParams.get('count') || '20';
    const offsetStr = searchParams.get('offset') || '0';

    const count = Math.min(Math.max(parseInt(countStr) || 20, 1), 100); // 1-100 items
    const offset = Math.max(parseInt(offsetStr) || 0, 0);

    // Generate feed batch
    const items = generateFeedBatch(count);

    // Apply offset for pagination
    const paginatedItems = items.slice(offset, offset + count);

    return NextResponse.json(
      {
        success: true,
        count: paginatedItems.length,
        total: items.length,
        offset,
        items: paginatedItems,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
      }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate feed batch',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
