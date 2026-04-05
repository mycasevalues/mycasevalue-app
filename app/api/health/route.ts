/**
 * GET /api/health
 * Health check endpoint for monitoring system health
 *
 * Returns comprehensive health status including:
 * - Database connectivity
 * - Data freshness
 * - Record counts
 * - Data completeness metrics
 * - External API reachability
 *
 * No authentication required (public read)
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { generateHealthReport } from '../../../lib/ingestion/monitor'
import { rateLimit, getClientIp } from '../../../lib/rate-limit'
import { secureCompare } from '../../../lib/sanitize'

export async function GET(request: NextRequest) {
  // Apply rate limiting: 10 req/min
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 10 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    // Check for API key authorization for detailed health info
    const apiKey = request.headers.get('x-api-key');
    const isAuthorized = apiKey && process.env.HEALTH_CHECK_API_KEY && secureCompare(apiKey, process.env.HEALTH_CHECK_API_KEY);

    // Unauthenticated requests get simple status only
    if (!isAuthorized) {
      return NextResponse.json({
        status: 'ok',
        timestamp: new Date().toISOString()
      }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    }

    // Authenticated requests get comprehensive health report
    const healthReport = await generateHealthReport()

    // Determine HTTP status code based on overall health
    let statusCode = 200
    if (healthReport.status === 'unhealthy') {
      statusCode = 503 // Service Unavailable
    } else if (healthReport.status === 'degraded') {
      statusCode = 200 // Still OK, but with warnings
    }

    return NextResponse.json(healthReport, { status: statusCode, headers: { 'Cache-Control': 'no-store' } })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    // Check for API key for detailed error info
    const apiKey = request.headers.get('x-api-key');
    const isAuthorized = apiKey && process.env.HEALTH_CHECK_API_KEY && secureCompare(apiKey, process.env.HEALTH_CHECK_API_KEY);

    if (!isAuthorized) {
      // Unauthenticated requests get generic error
      return NextResponse.json({
        status: 'error',
        timestamp: new Date().toISOString()
      }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }

    // Authenticated requests get detailed error info
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: errMsg,
        checks: {
          databaseConnectivity: {
            status: 'unhealthy',
            message: `System error: ${errMsg}`
          },
          dataFreshness: {
            status: 'unhealthy',
            message: 'Unable to check data freshness',
            hoursSinceLastIngestion: null
          },
          recordCounts: {
            status: 'degraded',
            message: 'Unable to query database',
            counts: {
              caseStats: 0,
              opinions: 0,
              ingestionLogs: 0
            }
          },
          dataCompleteness: {
            status: 'degraded',
            message: 'Unable to calculate completeness',
            completenessPercentage: 0,
            qualityScore: 0
          },
          externalApiReachability: {
            status: 'unhealthy',
            message: 'Unable to test external APIs',
            courtlistenerReachable: false
          }
        },
        overallAssessment: `Critical system failure: ${errMsg}`
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
