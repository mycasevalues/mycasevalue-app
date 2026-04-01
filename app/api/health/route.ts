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

export async function GET(request: NextRequest) {
  try {
    // Generate comprehensive health report
    const healthReport = await generateHealthReport()

    // Determine HTTP status code based on overall health
    let statusCode = 200
    if (healthReport.status === 'unhealthy') {
      statusCode = 503 // Service Unavailable
    } else if (healthReport.status === 'degraded') {
      statusCode = 200 // Still OK, but with warnings
    }

    return NextResponse.json(healthReport, { status: statusCode })
  } catch (error: any) {
    console.error('[API /health] Fatal error:', error.message)

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        checks: {
          databaseConnectivity: {
            status: 'unhealthy',
            message: `System error: ${error.message}`
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
        overallAssessment: `Critical system failure: ${error.message}`
      },
      { status: 503 }
    )
  }
}
