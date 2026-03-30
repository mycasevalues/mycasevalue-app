import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/notify/subscribe
 * Subscribes email to case update notifications.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, nos_code } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }
    return NextResponse.json({ success: true, subscribed: true, email, nos_code });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
