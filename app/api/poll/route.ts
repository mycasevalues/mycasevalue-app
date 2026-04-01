import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

const VALID_VOTES = ['fair', 'low', 'high', 'unsure'];

/**
 * POST /api/poll
 * Records user poll votes with input validation.
 */
export async function POST(request: NextRequest) {
  // Rate limiting: 50 requests per minute per IP (high for polls)
  const ip = getClientIp(request.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 50 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const vote = typeof body.vote === 'string' ? body.vote.trim().toLowerCase().slice(0, 20) : '';
    const nos = typeof body.nos === 'string' ? body.nos.trim().slice(0, 10) : '';

    if (!vote || !VALID_VOTES.includes(vote)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vote. Must be one of: fair, low, high, unsure' },
        { status: 400 }
      );
    }

    if (nos && !/^\d{1,4}$/.test(nos)) {
      return NextResponse.json(
        { success: false, error: 'Invalid NOS code' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, vote, nos });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
