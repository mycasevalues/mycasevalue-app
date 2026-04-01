/**
 * Monitoring and alerting module for the ingestion pipeline
 * Tracks ingestion health, data staleness, and generates health reports
 */

import { getSupabaseAdmin } from '../supabase'
import { getDataCompleteness } from './validator'

export interface IngestionEvent {
  source: string
  event: string
  metadata?: Record<string, any>
  timestamp?: string
}

export interface IngestionStats {
  totalRuns: number
  successfulRuns: number
  failedRuns: number
  lastRun?: {
    source: string
    status: string
    completedAt: string
    recordsProcessed: number
    recordsInserted: number
    recordsUpdated: number
  }
  averageRecordsPerRun: number
  successRate: number
}

export interface HealthReport {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  checks: {
    databaseConnectivity: {
      status: 'healthy' | 'unhealthy'
      message: string
    }
    dataFreshness: {
      status: 'healthy' | 'degraded' | 'unhealthy'
      message: string
      hoursSinceLastIngestion: number | null
    }
    recordCounts: {
      status: 'healthy' | 'degraded'
      message: string
      counts: {
        caseStats: number
        opinions: number
        ingestionLogs: number
      }
    }
    dataCompleteness: {
      status: 'healthy' | 'degraded'
      message: string
      completenessPercentage: number
      qualityScore: number
    }
    externalApiReachability: {
      status: 'healthy' | 'unhealthy'
      message: string
      courtlistenerReachable: boolean
    }
  }
  overallAssessment: string
}

/**
 * Log an ingestion event to the ingestion_log table
 */
export async function logIngestionEvent(
  source: string,
  event: string,
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const supabase = getSupabaseAdmin()

    // Parse event type
    let status = 'running'
    if (event.includes('completed') || event.includes('success')) {
      status = 'completed'
    } else if (event.includes('failed') || event.includes('error')) {
      status = 'failed'
    }

    const eventData: any = {
      source,
      job_type: metadata?.jobType || 'unknown',
      status,
      started_at: metadata?.startedAt || new Date().toISOString(),
      metadata: metadata || {}
    }

    if (status === 'completed' || status === 'failed') {
      eventData.completed_at = new Date().toISOString()
      eventData.records_processed = metadata?.recordsProcessed || 0
      eventData.records_inserted = metadata?.recordsInserted || 0
      eventData.records_updated = metadata?.recordsUpdated || 0
    }

    if (status === 'failed') {
      eventData.error_message = metadata?.errorMessage || event
    }

    await supabase.from('ingestion_log').insert([eventData])
  } catch (error: any) {
    console.error('Error logging ingestion event:', error.message)
  }
}

/**
 * Check how many hours have elapsed since the last successful ingestion
 */
export async function checkDataStaleness(): Promise<number | null> {
  try {
    const supabase = getSupabaseAdmin()

    const { data: lastLog } = await supabase
      .from('ingestion_log')
      .select('completed_at')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .single()

    if (!lastLog || !lastLog.completed_at) {
      return null // No successful ingestion yet
    }

    const completedTime = new Date(lastLog.completed_at)
    const now = new Date()
    const hoursSinceCompletion = (now.getTime() - completedTime.getTime()) / (1000 * 60 * 60)

    return Math.round(hoursSinceCompletion * 10) / 10
  } catch (error: any) {
    console.error('Error checking data staleness:', error.message)
    return null
  }
}

/**
 * Get summary statistics about recent ingestion runs
 */
export async function getIngestionStats(): Promise<IngestionStats> {
  try {
    const supabase = getSupabaseAdmin()

    // Get all ingestion logs
    const { data: logs, count: totalCount } = await supabase
      .from('ingestion_log')
      .select('*', { count: 'exact' })
      .order('started_at', { ascending: false })
      .limit(100)

    if (!logs || logs.length === 0) {
      return {
        totalRuns: 0,
        successfulRuns: 0,
        failedRuns: 0,
        lastRun: undefined,
        averageRecordsPerRun: 0,
        successRate: 0
      }
    }

    const successfulRuns = logs.filter(log => log.status === 'completed')
    const failedRuns = logs.filter(log => log.status === 'failed')
    const totalRecords = logs.reduce((sum, log) => sum + (log.records_processed || 0), 0)

    const stats: IngestionStats = {
      totalRuns: totalCount || logs.length,
      successfulRuns: successfulRuns.length,
      failedRuns: failedRuns.length,
      averageRecordsPerRun: logs.length > 0 ? Math.round(totalRecords / logs.length) : 0,
      successRate: logs.length > 0 ? Math.round((successfulRuns.length / logs.length) * 1000) / 10 : 0
    }

    // Add last run details if available
    const lastRun = logs[0]
    if (lastRun) {
      stats.lastRun = {
        source: lastRun.source,
        status: lastRun.status,
        completedAt: lastRun.completed_at || lastRun.started_at,
        recordsProcessed: lastRun.records_processed || 0,
        recordsInserted: lastRun.records_inserted || 0,
        recordsUpdated: lastRun.records_updated || 0
      }
    }

    return stats
  } catch (error: any) {
    console.error('Error getting ingestion stats:', error.message)
    return {
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      lastRun: undefined,
      averageRecordsPerRun: 0,
      successRate: 0
    }
  }
}

/**
 * Test CourtListener API reachability
 */
async function testCourtListenerReachability(): Promise<boolean> {
  try {
    const response = await fetch('https://www.courtlistener.com/api/v3/', {
      method: 'HEAD',
      timeout: 5000
    })
    return response.ok || response.status === 405 // 405 = method not allowed, but API is up
  } catch (error) {
    console.error('CourtListener reachability test failed:', error)
    return false
  }
}

/**
 * Generate a comprehensive health report
 */
export async function generateHealthReport(): Promise<HealthReport> {
  const timestamp = new Date().toISOString()

  try {
    const supabase = getSupabaseAdmin()

    // 1. Database connectivity check
    let dbHealthy = false
    let dbMessage = 'Database connection failed'

    try {
      const { count } = await supabase
        .from('case_stats')
        .select('*', { count: 'exact', head: true })
      dbHealthy = true
      dbMessage = 'Database connected successfully'
    } catch (error: any) {
      dbMessage = `Database error: ${error.message}`
    }

    // 2. Data freshness check
    const hoursSinceLastIngestion = await checkDataStaleness()
    let freshnessStatus: 'healthy' | 'degraded' | 'unhealthy' = 'unhealthy'
    let freshnessMessage = 'No ingestion data available'

    if (hoursSinceLastIngestion !== null) {
      if (hoursSinceLastIngestion <= 24) {
        freshnessStatus = 'healthy'
        freshnessMessage = `Data updated ${Math.round(hoursSinceLastIngestion)}h ago`
      } else if (hoursSinceLastIngestion <= 168) {
        // 7 days
        freshnessStatus = 'degraded'
        freshnessMessage = `Data is ${Math.round(hoursSinceLastIngestion)}h old (older than 24h)`
      } else {
        freshnessStatus = 'unhealthy'
        freshnessMessage = `Data is ${Math.round(hoursSinceLastIngestion)}h old (older than 7 days)`
      }
    }

    // 3. Record counts check
    let recordCountStatus: 'healthy' | 'degraded' = 'degraded'
    let recordCountMessage = 'Some tables are empty'

    const { count: caseStatsCount } = await supabase
      .from('case_stats')
      .select('*', { count: 'exact', head: true })
    const { count: opinionsCount } = await supabase
      .from('opinions')
      .select('*', { count: 'exact', head: true })
    const { count: logsCount } = await supabase
      .from('ingestion_log')
      .select('*', { count: 'exact', head: true })

    if ((caseStatsCount || 0) > 0 && (opinionsCount || 0) > 0) {
      recordCountStatus = 'healthy'
      recordCountMessage = 'All primary tables have data'
    }

    // 4. Data completeness check
    const completeness = await getDataCompleteness()
    let completenessStatus: 'healthy' | 'degraded' = 'degraded'
    let completenessMessage = 'Data completeness is low'

    if (completeness.completenessPercentage >= 75) {
      completenessStatus = 'healthy'
      completenessMessage = `${completeness.completenessPercentage}% of case types have complete metrics`
    } else if (completeness.completenessPercentage >= 50) {
      completenessStatus = 'degraded'
      completenessMessage = `${completeness.completenessPercentage}% of case types have complete metrics`
    }

    // 5. External API reachability
    const courtlistenerReachable = await testCourtListenerReachability()
    const apiStatus = courtlistenerReachable ? 'healthy' : 'unhealthy'
    const apiMessage = courtlistenerReachable
      ? 'CourtListener API is reachable'
      : 'CourtListener API is unreachable'

    // Determine overall status
    const unhealthyChecks = [
      dbHealthy ? null : 'database',
      freshnessStatus === 'unhealthy' ? 'freshness' : null,
      !courtlistenerReachable ? 'api' : null
    ].filter(Boolean)

    const degradedChecks = [
      freshnessStatus === 'degraded' ? 'freshness' : null,
      recordCountStatus === 'degraded' ? 'records' : null,
      completenessStatus === 'degraded' ? 'completeness' : null
    ].filter(Boolean)

    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'
    let assessment = 'All systems operational'

    if (unhealthyChecks.length > 0) {
      overallStatus = 'unhealthy'
      assessment = `Critical issues detected: ${unhealthyChecks.join(', ')}`
    } else if (degradedChecks.length > 0) {
      overallStatus = 'degraded'
      assessment = `Non-critical issues detected: ${degradedChecks.join(', ')}`
    }

    return {
      status: overallStatus,
      timestamp,
      checks: {
        databaseConnectivity: {
          status: dbHealthy ? 'healthy' : 'unhealthy',
          message: dbMessage
        },
        dataFreshness: {
          status: freshnessStatus,
          message: freshnessMessage,
          hoursSinceLastIngestion
        },
        recordCounts: {
          status: recordCountStatus,
          message: recordCountMessage,
          counts: {
            caseStats: caseStatsCount || 0,
            opinions: opinionsCount || 0,
            ingestionLogs: logsCount || 0
          }
        },
        dataCompleteness: {
          status: completenessStatus,
          message: completenessMessage,
          completenessPercentage: completeness.completenessPercentage,
          qualityScore: completeness.dataQualityScore
        },
        externalApiReachability: {
          status: apiStatus as 'healthy' | 'unhealthy',
          message: apiMessage,
          courtlistenerReachable
        }
      },
      overallAssessment: assessment
    }
  } catch (error: any) {
    console.error('Error generating health report:', error.message)

    return {
      status: 'unhealthy',
      timestamp,
      checks: {
        databaseConnectivity: {
          status: 'unhealthy',
          message: `Critical error: ${error.message}`
        },
        dataFreshness: {
          status: 'unhealthy',
          message: 'Could not determine data freshness',
          hoursSinceLastIngestion: null
        },
        recordCounts: {
          status: 'degraded',
          message: 'Could not query record counts',
          counts: {
            caseStats: 0,
            opinions: 0,
            ingestionLogs: 0
          }
        },
        dataCompleteness: {
          status: 'degraded',
          message: 'Could not calculate completeness',
          completenessPercentage: 0,
          qualityScore: 0
        },
        externalApiReachability: {
          status: 'unhealthy',
          message: 'Could not test external APIs',
          courtlistenerReachable: false
        }
      },
      overallAssessment: `System check failed: ${error.message}`
    }
  }
}
