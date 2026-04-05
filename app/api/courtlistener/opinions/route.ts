import { NextRequest, NextResponse } from 'next/server';
import { searchOpinions } from '../../../../lib/courtlistener';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 20 });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  const query = req.nextUrl.searchParams.get('q') || '';
  const court = req.nextUrl.searchParams.get('court') || undefined;
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchOpinions(query, court, 5);
  return NextResponse.json({ results });
}
