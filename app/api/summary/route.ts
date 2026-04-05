import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

export async function GET(request: NextRequest) {
  // Apply rate limiting: 30 req/min
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 30 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  return NextResponse.json({
    total_cases: 4100000,
    last_updated: '2026-03-15',
  });
}
