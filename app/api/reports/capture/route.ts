export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiHandler } from '../../../../lib/api-middleware';
import { apiBadRequest } from '../../../../lib/api-response';
import { validateEmail, sanitizeString } from '../../../../lib/sanitize';
import { getRateLimiter } from '../../../../lib/redis';
import { sendReportCaptureConfirmation } from '../../../../lib/email';

/**
 * POST /api/reports/capture
 * Captures email leads for report delivery.
 * Stores in Supabase `email_leads` table.
 *
 * Body:
 *   email: string (required)
 *   reportSlug: string (required, e.g., 'annual-report-2026')
 */
export const POST = apiHandler(
  { rateLimit: { windowMs: 60000, maxRequests: 20 } },
  async (request, { log, clientIp }) => {
    // Check Redis rate limit
    const rateLimiter = getRateLimiter();
    if (rateLimiter && clientIp) {
      try {
        const { success, pending, reset, remaining, limit } = await rateLimiter.limit(clientIp);
        if (!success) {
          return NextResponse.json(
            { error: 'Rate limit exceeded', retryAfter: reset },
            { status: 429, headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) } }
          );
        }
        log.debug('Rate limit check passed', { remaining, limit });
      } catch (error) {
        log.warn('Rate limit check failed, allowing request', { error });
        // Graceful fallback: allow request if rate limit service is down
      }
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return apiBadRequest('Invalid JSON body');
    }

    const { email, reportSlug } = body;

    const cleanEmail = validateEmail(email);
    if (!cleanEmail) {
      return apiBadRequest('Invalid email address');
    }

    const cleanSlug = sanitizeString(reportSlug || 'annual-report-2026', 100);

    log.info('Report email captured', { slug: cleanSlug });

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
            source: cleanSlug,
            case_type: 'annual-report',
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

    // Send confirmation email
    await sendReportCaptureConfirmation(cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
    });
  }
);
