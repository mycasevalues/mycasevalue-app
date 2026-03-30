import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/poll
 * Records user poll votes.
 */
export async function POST(request: NextRequest) {
  try {
    const { vote, nos } = await request.json();
    return NextResponse.json({ success: true, vote, nos });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
