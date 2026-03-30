export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/email/capture
 * Captures email leads for report delivery and marketing.
 * Stores in Supabase `email_leads` table (falls back gracefully if table doesn't exist).
 */
export async function POST(request: NextRequest) {
  try {
    const { email, case_type, nos_code, state, source } = await request.json();

    if (!email || !email.includes('@') || email.length < 5) {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }

    // Sanitize
    const cleanEmail = email.toLowerCase().trim().slice(0, 255);
    const cleanCaseType = (case_type || '').slice(0, 100);
    const cleanNos = (nos_code || '').slice(0, 10);
    const cleanState = (state || '').slice(0, 2).toUpperCase();
    const cleanSource = (source || 'report').slice(0, 50);

    // Attempt to store in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('email_leads').upsert(
          {
            email: cleanEmail,
            case_type: cleanCaseType,
            nos_code: cleanNos,
            state: cleanState,
            source: cleanSource,
            ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
            user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
      } catch (dbError) {
        // Don't fail the request if DB write fails — email was still "captured"
        console.error('Email capture DB error:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
