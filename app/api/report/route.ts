export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { apiHandler } from '../../../lib/api-middleware';
import { apiBadRequest } from '../../../lib/api-response';
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
 *
 * Uses apiHandler for structured logging, timing, rate limiting, and error handling.
 */
export const POST = apiHandler(
  { rateLimit: { windowMs: 60000, maxRequests: 30 } },
  async (request, { log, requestId, clientIp }) => {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return apiBadRequest('Invalid JSON body');
    }

    const { nos_code, state, lang, email, tier } = body;

    // ── Input validation ─────────────────────────────────────
    const validatedNosCode = validateNOSCode(nos_code);
    if (!validatedNosCode) {
      return apiBadRequest('Invalid NOS code: must be 1-4 digits');
    }

    const validatedState = state ? validateState(state) : null;
    if (state && !validatedState) {
      return apiBadRequest('Invalid state code: must be a 2-letter US state');
    }

    const validatedLang = validateLanguage(lang);

    const validatedEmail = email ? validateEmail(email) : null;
    if (email && !validatedEmail) {
      return apiBadRequest('Invalid email address');
    }

    const validatedTier = validateEnum(tier, ['free', 'single_report', 'unlimited', 'attorney'], 'free');

    log.info('Generating report', {
      nos: validatedNosCode,
      state: validatedState,
      tier: validatedTier,
      lang: validatedLang,
    });

    const generatedAt = new Date().toISOString();
    let caseData = null;
    let outcomes: any[] = [];
    let moneyDist: any[] = [];

    // ── Supabase queries (parallel) ──────────────────────────
    let supabase: ReturnType<typeof import('../../../lib/supabase').getSupabaseAdmin> | null = null;
    try {
      const { getSupabaseAdmin } = await import('../../../lib/supabase');
      supabase = getSupabaseAdmin();
    } catch {
      // Supabase not configured
    }

    if (supabase) {
      try {

        // Run all queries in parallel for faster report generation
        const [statsResult, outcomesResult, moneyResult] = await Promise.allSettled([
          supabase
            .from('case_stats')
            .select('*')
            .eq('nos_code', validatedNosCode)
            .single(),
          supabase
            .from('outcome_distributions')
            .select('*')
            .eq('nos_code', validatedNosCode)
            .order('percentage', { ascending: false }),
          supabase
            .from('money_distributions')
            .select('*')
            .eq('nos_code', validatedNosCode)
            .order('bracket_tier', { ascending: true }),
        ]);

        if (statsResult.status === 'fulfilled' && statsResult.value.data) {
          caseData = statsResult.value.data;
        }
        if (outcomesResult.status === 'fulfilled' && outcomesResult.value.data) {
          outcomes = outcomesResult.value.data;
        }
        if (moneyResult.status === 'fulfilled' && moneyResult.value.data) {
          moneyDist = moneyResult.value.data;
        }

        // Fire-and-forget: log the report generation for analytics
        supabase.from('report_logs').insert({
          nos_code: validatedNosCode,
          state: validatedState,
          lang: validatedLang,
          email: validatedEmail,
          tier: validatedTier,
          ip: clientIp,
          request_id: requestId,
          generated_at: generatedAt,
        }).then(({ error }) => {
          if (error) log.warn('report_logs insert failed', { error: error.message });
        });
      } catch (dbError: any) {
        log.error('Supabase query failed', { error: dbError.message || dbError });
      }
    }

    const source = caseData ? 'supabase' : 'static';
    log.info('Report generated', { nos: validatedNosCode, source });

    return NextResponse.json({
      success: true,
      request_id: requestId,
      nos_code: validatedNosCode,
      state: validatedState,
      lang: validatedLang,
      tier: validatedTier,
      generated_at: generatedAt,
      data: caseData,
      outcomes,
      money_distribution: moneyDist,
      source,
    });
  }
);
