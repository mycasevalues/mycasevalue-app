/**
 * Data Quality Check API Route
 *
 * GET /api/admin/data-quality - Run and return quality check results
 * POST /api/admin/data-quality - Run check and send notification (TODO: Resend)
 *
 * Protected: Requires admin auth header (simple token check for now)
 */

import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '../../../../lib/api-middleware';
import { apiUnauthorized, apiForbidden, apiSuccess } from '../../../../lib/api-response';
import { runDataQualityCheck, summarizeCheckResults } from '../../../../lib/data-quality';
import { logger } from '../../../../lib/logger';

export const dynamic = 'force-dynamic';

// ─── Admin Auth Check ──────────────────────────────────────

/**
 * Simple admin token check. TODO: Replace with proper admin role check
 * when auth system is fully integrated.
 */
function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  // TODO: Implement proper admin role check via Supabase
  // For now, accept: Authorization: Bearer admin-secret-key
  if (!authHeader) return false;

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  // TODO: Load from environment variable or Supabase admin role
  const adminToken = process.env.ADMIN_DATA_QUALITY_TOKEN;
  if (!adminToken) {
    // In development without token set, allow via X-Admin-Key header for testing
    if (process.env.NODE_ENV !== 'production') {
      return request.headers.get('x-admin-key') === 'dev-local-testing';
    }
    return false;
  }

  return token === adminToken;
}

// ─── GET Handler ──────────────────────────────────────────────

export const GET = apiHandler({}, async (request) => {
  if (!checkAdminAuth(request)) {
    return apiUnauthorized('Admin authentication required');
  }

  try {
    const result = runDataQualityCheck();
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
  if (!checkAdminAuth(request)) {
    return apiUnauthorized('Admin authentication required');
  }

  try {
    const result = runDataQualityCheck();
    const summary = summarizeCheckResults(result);

    // TODO: Send notification via Resend email service
    // const emailResult = await resend.emails.send({
    //   from: 'admin@casecheck.com',
    //   to: process.env.ADMIN_EMAIL || 'dev@casecheck.com',
    //   subject: `Data Quality Check: ${result.passed ? 'PASSED' : 'FAILED'}`,
    //   html: `
    //     <h2>${summary}</h2>
    //     <p>Timestamp: ${result.timestamp}</p>
    //     <p>Checks run: ${result.totalChecks}</p>
    //     ${result.anomalies.length > 0 ? `<p>Anomalies: ${result.anomalies.length}</p>` : ''}
    //   `,
    // });

    // For now, just log the summary
    logger.info('Data quality check completed', {
      passed: result.passed,
      anomalies: result.anomalies.length,
      timestamp: result.timestamp,
      summary,
    });

    return apiSuccess(
      {
        ...result,
        notification: {
          sent: false, // TODO: Set to true when Resend integration is live
          message: summary,
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
