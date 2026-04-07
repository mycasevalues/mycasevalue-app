import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting: 30 req/min
    const clientIp = getClientIp(request.headers);
    const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 30 });
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    return NextResponse.json({
      total_cases: 4100000,
      last_updated: '2026-03-15',
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' }
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[api/summary] error:', errorMessage);
    return NextResponse.json(
      {
        error: 'Summary retrieval failed',
        message: 'An unexpected error occurred while retrieving summary data.'
      },
      { status: 500 }
    );
  }
}
