/**
 * Data Quality Check API Route
 *
 * GET /api/admin/data-quality - Run and return quality check results
 * POST /api/admin/data-quality - Run check and send email notification via Resend
 *
 * Protected: Requires admin auth header (simple token check for now)
 * Upgrade path: Verify user against Supabase 'admins' table for RBAC
 */

import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '../../../../lib/api-middleware';
import { apiUnauthorized, apiForbidden, apiSuccess } from '../../../../lib/api-response';
import { runDataQualityCheck, summarizeCheckResults } from '../../../../lib/data-quality';
import { logger } from '../../../../lib/logger';
import { getSupabaseAdmin } from '@/lib/supabase';
import { cacheGet, cacheSet } from '../../../../lib/redis';
import { sendDataQualityEmail } from '../../../../lib/email';

export const dynamic = 'force-dynamic';

// ─── Admin Auth Check ──────────────────────────────────────

/**
 * Admin auth check via Supabase or hardcoded admin email.
 * Verifies user is the admin (jvdelorenzi@gmail.com) or has admin token.
 */
async function checkAdminAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('authorization');

  // Fallback: Check bearer token if provided
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const adminToken = process.env.ADMIN_DATA_QUALITY_TOKEN;
    if (adminToken && token === adminToken) {
      return true;
    }
  }

  // Dev fallback: Allow via X-Admin-Key header for testing
  if (process.env.NODE_ENV !== 'production') {
    if (request.headers.get('x-admin-key') === 'dev-local-testing') {
      return true;
    }
  }

  // Check against hardcoded admin email for now
  const adminEmail = 'jvdelorenzi@gmail.com';
  try {
    const supabase = getSupabaseAdmin();
    // Get the user from the auth token if provided
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user?.email === adminEmail) {
        return true;
      }
    }
  } catch (error) {
    logger.warn('Error checking admin auth via Supabase', { error });
  }

  return false;
}

// ─── GET Handler ──────────────────────────────────────────────

export const GET = apiHandler({}, async (request) => {
  if (!(await checkAdminAuth(request))) {
    return apiUnauthorized('Admin authentication required');
  }

  try {
    const cacheKey = 'dq:check';

    // Try to get cached result (15-minute TTL)
    try {
      const cached = await cacheGet<any>(cacheKey);
      if (cached) {
        logger.debug('Data quality check result from cache');
        return apiSuccess(cached, { cache: 'no-store' });
      }
    } catch (error) {
      logger.warn('Cache retrieval failed, running check', { error });
    }

    // Run check if not cached
    const result = runDataQualityCheck();

    // Cache the result (15 minutes = 900 seconds)
    cacheSet(cacheKey, result, 900).catch((error) => {
      logger.warn('Failed to cache data quality check result', { error });
    });

    return apiSuccess(result, { cache: 'no-store' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Data quality check failed', { error: message });
    return NextResponse.json(
      { error: 'Data quality check failed', message },
      { status: 500 }
    );
  }
});

// ─── POST Handler (with notification) ──────────────────────

export const POST = apiHandler({}, async (request) => {
  if (!(await checkAdminAuth(request))) {
    return apiUnauthorized('Admin authentication required');
  }

  try {
    // Always run fresh check for POST (force refresh), but don't cache
    const result = runDataQualityCheck();
    const summary = summarizeCheckResults(result);

    // Build email HTML report
    const reportHtml = `
      <p><strong>Checks Run:</strong> ${result.totalChecks}</p>
      <p><strong>Anomalies Found:</strong> ${result.anomalies.length}</p>
      ${result.anomalies.length > 0 ? `<p><strong>Details:</strong> ${result.anomalies.join(', ')}</p>` : ''}
      <p><strong>Timestamp:</strong> ${result.timestamp}</p>
    `;

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || 'dev@casecheck.com';
    const emailResult = await sendDataQualityEmail(
      adminEmail,
      reportHtml,
      result.passed,
      summary
    );

    logger.info('Data quality check completed', {
      passed: result.passed,
      anomalies: result.anomalies.length,
      timestamp: result.timestamp,
      summary,
      emailSent: emailResult.success,
    });

    return apiSuccess(
      {
        ...result,
        notification: {
          sent: emailResult.success,
          message: summary,
          error: emailResult.error,
        },
      },
      { cache: 'no-store' }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Data quality check and notification failed', { error: message });
    return NextResponse.json(
      { error: 'Data quality check failed', message },
      { status: 500 }
    );
  }
});
