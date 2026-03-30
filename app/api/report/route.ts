import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/report
 * Generates a case report. Currently returns acknowledgment.
 * Full implementation will query Supabase for case-specific data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nos_code, state, lang } = body;

    return NextResponse.json({
      success: true,
      message: 'Report request received',
      nos_code,
      state: state || null,
      lang: lang || 'en',
      generated_at: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
