import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/email/capture
 * Captures email for report delivery.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, case_type } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }
    // TODO: Store in Supabase when connected
    return NextResponse.json({ success: true, email, case_type });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
