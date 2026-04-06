export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

/**
 * GET /api/nos/[code]
 * Proxy to /api/data?type=case&nos=[code]
 * Validates NOS code format before proxying.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  // Apply rate limiting: 60 req/min
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 60 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const nos = params.code;

  // Validate NOS code: must be 1-4 digits only
  if (!nos || !/^\d{1,4}$/.test(nos)) {
    return NextResponse.json(
      { error: 'Invalid NOS code. Must be 1-4 digits.' },
      { status: 400 }
    );
  }

  const origin = request.nextUrl.origin;

  try {
    const res = await fetch(`${origin}/api/data?type=case&nos=${encodeURIComponent(nos)}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch case data', status: res.status },
        { status: res.status, headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' }
    });
  } catch (fetchError: unknown) {
    const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';
    console.error('[api/nos] internal data fetch failed:', errorMessage);
    // Return cached/static data as fallback on error
    return NextResponse.json({ source: 'static', data: null, error: 'Temporarily unable to fetch live data' }, {
      status: 503,
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' }
    });
  }
}
