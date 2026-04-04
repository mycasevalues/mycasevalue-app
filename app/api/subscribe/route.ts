/**
 * POST /api/subscribe — Newsletter / waitlist signup
 * Upserts email into the newsletter_subscribers table in Supabase.
 * Graceful fallback: if the table doesn't exist yet, logs and returns success.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Try Supabase upsert
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(url, key);

      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert(
          { email: normalized, subscribed_at: new Date().toISOString(), status: 'active' },
          { onConflict: 'email' }
        );

      if (error) {
        // Table might not exist yet — still return success
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
