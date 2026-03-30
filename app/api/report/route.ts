import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/report
 * Generates a case report. Queries Supabase for case-specific data
 * and logs the request for analytics.
 */
export async function POST(request: NextRequest) {
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
        } catch { /* ignore logging failures */ }
      } catch (dbError) {
        console.error('Report DB error:', dbError);
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
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
