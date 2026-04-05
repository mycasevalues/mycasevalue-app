export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';
import {
  validateNOSCode,
  validateState,
  validateLanguage,
  validateEmail,
  validateEnum,
} from '../../../lib/sanitize';

/**
 * POST /api/report
 * Generates a case report. Queries Supabase for case-specific data
 * and logs the request for analytics.
 */
export async function POST(request: NextRequest) {
  // Rate limiting: 30 requests per minute per IP
  const ip = getClientIp(request.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 30 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { nos_code, state, lang, email, tier } = body;

    // Validate NOS code
    const validatedNosCode = validateNOSCode(nos_code);
    if (!validatedNosCode) {
      return NextResponse.json(
        { success: false, error: 'Invalid NOS code: must be 1-4 digits' },
        { status: 400 }
      );
    }

    // Validate optional state
    const validatedState = state ? validateState(state) : null;
    if (state && !validatedState) {
      return NextResponse.json(
        { success: false, error: 'Invalid state code: must be a 2-letter US state' },
        { status: 400 }
      );
    }

    // Validate optional language
    const validatedLang = validateLanguage(lang);

    // Validate optional email
    const validatedEmail = email ? validateEmail(email) : null;
    if (email && !validatedEmail) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate optional tier
    const validatedTier = validateEnum(tier, ['free', 'single_report', 'unlimited'], 'free');

    const generatedAt = new Date().toISOString();
    let caseData = null;

    // Try to fetch real data from Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch case stats
        const { data: stats } = await supabase
          .from('case_stats')
          .select('*')
          .eq('nos_code', validatedNosCode)
          .single();

        if (stats) caseData = stats;

        // Log the report generation for analytics
        try {
          await supabase.from('report_logs').insert({
            nos_code: validatedNosCode,
            state: validatedState,
            lang: validatedLang,
            email: validatedEmail,
            tier: validatedTier,
            ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
            generated_at: generatedAt,
          });
        } catch (logError) {
          console.error('[api/report] report_logs insert failed:', logError instanceof Error ? logError.message : logError);
        }
      } catch (dbError) {
        console.error('[api/report] Supabase query failed:', dbError instanceof Error ? dbError.message : dbError);
      }
    }

    return NextResponse.json({
      success: true,
      nos_code: validatedNosCode,
      state: validatedState,
      lang: validatedLang,
      generated_at: generatedAt,
      data: caseData,
      source: caseData ? 'supabase' : 'static',
    });
  } catch (err) {
    console.error('[api/report] request parsing failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
