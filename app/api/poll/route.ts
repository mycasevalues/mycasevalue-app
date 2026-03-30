import { NextRequest, NextResponse } from 'next/server';

const VALID_VOTES = ['fair', 'low', 'high', 'unsure'];

/**
 * POST /api/poll
 * Records user poll votes with input validation.
 */
export async function POST(request: NextRequest) {
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
