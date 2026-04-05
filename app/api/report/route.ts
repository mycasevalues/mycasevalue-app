export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

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

    if (!nos_code) {
      return NextResponse.json({ success: false, error: 'nos_code is required' }, { status: 400 });
    }

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
          .eq('nos_code', nos_code)
          .single();

        if (stats) caseData = stats;

        // Log the report generation for analytics
        try {
          await supabase.from('report_logs').insert({
            nos_code,
            state: state || null,
            lang: lang || 'en',
            email: email || null,
            tier: tier || 'free',
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
      nos_code,
      state: state || null,
      lang: lang || 'en',
      generated_at: generatedAt,
      data: caseData,
      source: caseData ? 'supabase' : 'static',
    });
  } catch (err) {
    console.error('[api/report] request parsing failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
