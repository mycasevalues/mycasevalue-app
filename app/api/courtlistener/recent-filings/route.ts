import { NextRequest, NextResponse } from 'next/server';
import { getRecentFilings } from '../../../../lib/courtlistener';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export const revalidate = 3600; // 1 hour cache

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 50 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '20'), 50);
  const filings = await getRecentFilings(limit);
  return NextResponse.json({ filings });
}
