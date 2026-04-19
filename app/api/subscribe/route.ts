import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Attempt to store in Supabase — gracefully handle missing table
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase');
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from('subscribers').insert({
        email: email.trim().toLowerCase(),
        source: source || 'unknown',
        created_at: new Date().toISOString(),
      });

      // If table doesn't exist or other non-critical error, still return success
      if (error) {
        console.warn('[subscribe] Supabase insert warning:', error.message);
      }
    } catch (dbError) {
      // Supabase not configured or table missing — silently succeed
      console.warn('[subscribe] DB unavailable, skipping persist:', dbError);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
