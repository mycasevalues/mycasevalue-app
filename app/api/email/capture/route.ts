export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { apiHandler } from '../../../../lib/api-middleware';
import { apiBadRequest } from '../../../../lib/api-response';
import { validateEmail, validateNOSCode, validateState, sanitizeString } from '../../../../lib/sanitize';

/**
 * POST /api/email/capture
 * Captures email leads for report delivery and marketing.
 * Stores in Supabase `email_leads` table (falls back gracefully if table doesn't exist).
 */
export const POST = apiHandler(
  { rateLimit: { windowMs: 60000, maxRequests: 20 } },
  async (request, { log, clientIp }) => {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return apiBadRequest('Invalid JSON body');
    }

    const { email, case_type, nos_code, state, source } = body;

    const cleanEmail = validateEmail(email);
    if (!cleanEmail) {
      return apiBadRequest('Invalid email address');
    }

    const cleanCaseType = sanitizeString(case_type, 100);
    const cleanNos = nos_code ? validateNOSCode(nos_code) || '' : '';
    const cleanState = state ? validateState(state) || '' : '';
    const cleanSource = sanitizeString(source || 'report', 50);

    log.info('Email lead captured', { nos: cleanNos, source: cleanSource });

    // Attempt to store in Supabase
    let supabase: any = null;
    try {
      const { getSupabaseAdmin } = await import('../../../../lib/supabase');
      supabase = getSupabaseAdmin();
    } catch {
      // Supabase not configured
    }

    if (supabase) {
      try {
        const { error } = await supabase.from('email_leads').upsert(
          {
            email: cleanEmail,
            case_type: cleanCaseType,
            nos_code: cleanNos,
            state: cleanState,
            source: cleanSource,
            ip: clientIp,
            user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
        if (error) {
          log.warn('email_leads upsert failed', { error: error.message });
        }
      } catch (dbError: any) {
        log.warn('email_leads DB error', { error: dbError.message || dbError });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
    });
  }
);
