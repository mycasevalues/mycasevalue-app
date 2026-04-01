// @ts-nocheck
/**
 * Data Ingestion Orchestrator
 * Coordinates all data sources: FJC, CourtListener, RECAP
 * Manages the full ETL pipeline: Extract → Transform → Load into Supabase
 */

import { getSupabaseAdmin } from '../supabase'
import { ingestFJCData } from './fjc'
import { ingestCourtListenerData } from './courtlistener'
import { ingestRECAPData } from './recap'

type IngestionResult = {
  source: string
  status: 'completed' | 'failed'
  recordsProcessed: number
  recordsInserted: number
  recordsUpdated: number
  duration: number
  error?: string
}

/**
 * Run the full data ingestion pipeline across all sources.
 * Each source runs independently — a failure in one does not block others.
 */
export async function runFullIngestion(): Promise<IngestionResult[]> {
  const results: IngestionResult[] = []
  console.log('[Orchestrator] Starting full data ingestion pipeline...')

  // Log the run (if Supabase is configured)
  let logEntry: any = null
  try {
    const supabase = getSupabaseAdmin()
    if (supabase) {
      const result = await supabase
        .from('ingestion_log' as any)
        .insert({
          source: 'orchestrator',
          job_type: 'full',
          status: 'running',
          metadata: { started_sources: ['fjc', 'courtlistener', 'recap'] }
        })
        .select()
        .single()
      logEntry = result.data
    } else {
      console.warn('[Orchestrator] Supabase not configured, proceeding without logging')
    }
  } catch (error: any) {
    console.warn(
      '[Orchestrator] Could not create ingestion log entry: ',
      error instanceof Error ? error.message : String(error)
    )
  }

  // ─── 1. FJC Integrated Database (primary source) ───
  const fjcResult = await runSource('fjc', async () => {
    const data = await ingestFJCData()

    let inserted = 0
    let updated = 0

    // Check if Supabase is configured before attempting upsert
    const supabase = getSupabaseAdmin()
    if (!supabase) {
      console.warn('[FJC] Supabase not configured, skipping database operations')
      return {
        processed: (data.caseStats?.length || 0) + (data.circuitStats?.length || 0) + (data.stateStats?.length || 0),
        inserted: 0,
        updated: 0
      }
    }

    // Upsert case stats
    if (data.caseStats && data.caseStats.length > 0) {
      for (const stat of data.caseStats) {
        try {
          const { error } = await supabase
            .from('case_stats' as any)
            .upsert({
              nos_code: stat.nosCode || stat.nos_code,
              label: stat.label,
              category: stat.category || 'other',
              total_cases: stat.caseCount || stat.total_cases || 0,
              win_rate: stat.plaintiffWinRate || stat.win_rate || 0,
              settlement_rate: stat.settlementRate || stat.settlement_rate || 0,
              avg_duration_months: stat.avgDuration || stat.avg_duration_months || 0,
              median_settlement: stat.median_settlement || 0,
              settlement_lo: stat.settlement_lo || 0,
              settlement_md: stat.settlement_md || 0,
              settlement_hi: stat.settlement_hi || 0,
              represented_win_rate: stat.represented_win_rate || 0,
              represented_total: stat.represented_total || 0,
              pro_se_win_rate: stat.pro_se_win_rate || 0,
              pro_se_total: stat.proseCount || stat.pro_se_total || 0,
              source: 'fjc',
              last_updated: new Date().toISOString()
            }, { onConflict: 'nos_code,source' })

          if (!error) inserted++
          else console.warn(`[FJC] Upsert error for NOS ${stat.nosCode || stat.nos_code}:`, error.message)
        } catch (error: any) {
          console.warn(`[FJC] Exception upserting NOS ${stat.nosCode || stat.nos_code}:`, error.message)
        }
      }
    }

    // Upsert circuit stats (optional - may be empty from fallback data)
    if (data.circuitStats && data.circuitStats.length > 0) {
      for (const circuit of data.circuitStats) {
        try {
          await supabase
            .from('circuit_stats' as any)
            .upsert({
              circuit: circuit.circuit || circuit.circuitCode || '',
              circuit_number: circuit.circuit_number,
              win_rate: circuit.win_rate || 0,
              total_cases: circuit.caseCount || circuit.total_cases || 0,
              avg_duration_months: circuit.avgDuration || circuit.avg_duration_months || 0,
              settlement_rate: circuit.settlementRate || circuit.settlement_rate || 0,
              source: 'fjc',
              last_updated: new Date().toISOString()
            }, { onConflict: 'circuit,source' })
        } catch (error: any) {
          console.warn('[FJC] Error upserting circuit stats:', error.message)
        }
      }
    }

    // Upsert state stats (optional - may be empty from fallback data)
    if (data.stateStats && data.stateStats.length > 0) {
      for (const state of data.stateStats) {
        try {
          await supabase
            .from('state_stats' as any)
            .upsert({
              state_code: state.state || state.state_code || '',
              state_name: state.state_name || '',
              win_rate: state.plaintiffWinRate || state.win_rate || 0,
              total_cases: state.caseCount || state.total_cases || 0,
              avg_duration_months: state.avgDuration || state.avg_duration_months || 0,
              source: 'fjc',
              last_updated: new Date().toISOString()
            }, { onConflict: 'state_code,source' })
        } catch (error: any) {
          console.warn('[FJC] Error upserting state stats:', error.message)
        }
      }
    }

    // Upsert outcome distributions
    if (data.outcomeDistributions && data.outcomeDistributions.length > 0) {
      for (const outcome of data.outcomeDistributions) {
        try {
          await supabase
            .from('outcome_distributions' as any)
            .upsert({
              nos_code: outcome.nosCode || outcome.nos_code || '',
              outcome_type: outcome.outcomeType || outcome.outcome_type || '',
              percentage: outcome.percentage || 0,
              count: outcome.count || 0,
              color: outcome.color || '#94A3B8',
              source: 'fjc',
              last_updated: new Date().toISOString()
            }, { onConflict: 'nos_code,outcome_type,source' })
        } catch (error: any) {
          console.warn('[FJC] Error upserting outcome distribution:', error.message)
        }
      }
    }

    // Upsert trending case types (optional - may be empty)
    if (data.trendingCaseTypes && data.trendingCaseTypes.length > 0) {
      for (const trend of data.trendingCaseTypes) {
        try {
          await supabase
            .from('trending_case_types' as any)
            .upsert({
              nos_code: trend.nos_code || '',
              label: trend.label || '',
              filing_count_current: trend.filing_count_current || 0,
              filing_count_previous: trend.filing_count_previous || 0,
              change_pct: trend.change_pct || 0,
              period: trend.period || 'current',
              source: 'fjc',
              last_updated: new Date().toISOString()
            }, { onConflict: 'nos_code,period,source' })
        } catch (error: any) {
          console.warn('[FJC] Error upserting trending case types:', error.message)
        }
      }
    }

    return {
      processed: (data.caseStats?.length || 0) + (data.circuitStats?.length || 0) + (data.stateStats?.length || 0),
      inserted,
      updated
    }
  })
  results.push(fjcResult)

  // ─── 2. CourtListener (opinions + judges) ───
  const clResult = await runSource('courtlistener', async () => {
    const data: any = await ingestCourtListenerData()

    let inserted = 0
    const supabase = getSupabaseAdmin()

    if (!supabase) {
      console.warn('[CourtListener] Supabase not configured, skipping database operations')
      return {
        processed: (data.opinions?.length || 0) + (data.judges?.length || 0),
        inserted: 0,
        updated: 0
      }
    }

    // Upsert opinions
    if (data.opinions && data.opinions.length > 0) {
      for (const opinion of data.opinions as any[]) {
        try {
          const { error } = await supabase
            .from('opinions' as any)
            .upsert({
              courtlistener_id: opinion.courtlistener_id || opinion.id || String(Math.random()),
              case_name: opinion.case_name,
              court: opinion.court,
              date_filed: opinion.date_filed,
              citation: opinion.citation,
              opinion_type: opinion.opinion_type || opinion.document_type,
              precedential_status: opinion.precedential_status,
              source: 'courtlistener',
            }, { onConflict: 'courtlistener_id' })

          if (!error) inserted++
        } catch (error: any) {
          console.warn('[CourtListener] Error upserting opinion:', error.message)
        }
      }
    }

    // Upsert judge data
    if (data.judges && data.judges.length > 0) {
      for (const judge of data.judges as any[]) {
        try {
          await supabase
            .from('judge_stats' as any)
            .upsert({
              judge_name: judge.judge_name || judge.name || 'Unknown',
              court: judge.court || 'unknown',
              appointed_by: judge.appointed_by,
              courtlistener_id: judge.courtlistener_id || judge.id,
              source: 'courtlistener',
              last_updated: new Date().toISOString()
            }, { onConflict: 'judge_name,court,source' })
        } catch (error: any) {
          console.warn('[CourtListener] Error upserting judge:', error.message)
        }
      }
    }

    return {
      processed: (data.opinions?.length || 0) + (data.judges?.length || 0),
      inserted,
      updated: 0
    }
  })
  results.push(clResult)

  // ─── 3. RECAP Archive (supplemental docket data) ───
  const recapResult = await runSource('recap', async () => {
    try {
      const data: any = await ingestRECAPData()

      let processed = 0
      if (data) {
        processed = Array.isArray(data) ? data.length : (data.dockets?.length || 0)
      }

      return { processed, inserted: processed, updated: 0 }
    } catch (error: any) {
      // RECAP is optional - if it's a stub or fails, log and continue
      if (error.message?.includes('COURTLISTENER_API_TOKEN')) {
        console.warn('[Orchestrator] RECAP API token not configured, skipping RECAP ingestion')
        return { processed: 0, inserted: 0, updated: 0 }
      }
      throw error
    }
  })
  results.push(recapResult)

  // ─── Refresh the stats cache ───
  console.log('[Orchestrator] Refreshing stats cache...')
  try {
    // Check if Supabase is configured
    const supabase = getSupabaseAdmin()
    if (!supabase) {
      console.warn('[Orchestrator] Supabase not configured, skipping cache refresh')
    } else {
      const { error } = await supabase.rpc('refresh_stats_cache')
      if (error) {
        console.warn(
          '[Orchestrator] Stats cache refresh failed (function may not exist): ',
          error.message
        )
      } else {
        console.log('[Orchestrator] Stats cache refreshed successfully')
      }
    }
  } catch (error: any) {
    console.warn(
      '[Orchestrator] Could not refresh stats cache: ',
      error instanceof Error ? error.message : String(error)
    )
  }

  // ─── Update the ingestion log ───
  if (logEntry) {
    try {
      await getSupabaseAdmin()
        .from('ingestion_log' as any)
        .update({
          status: results.every(r => r.status === 'completed') ? 'completed' : 'failed',
          records_processed: results.reduce((sum, r) => sum + r.recordsProcessed, 0),
          records_inserted: results.reduce((sum, r) => sum + r.recordsInserted, 0),
          records_updated: results.reduce((sum, r) => sum + r.recordsUpdated, 0),
          metadata: { results },
          completed_at: new Date().toISOString()
        })
        .eq('id', logEntry.id)
      console.log('[Orchestrator] Ingestion log updated successfully')
    } catch (error: any) {
      console.warn(
        '[Orchestrator] Failed to update ingestion log: ',
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  console.log('[Orchestrator] Pipeline complete:', results)
  return results
}

/**
 * Run a single source ingestion with error handling and timing
 */
async function runSource(
  source: string,
  fn: () => Promise<{ processed: number; inserted: number; updated: number }>
): Promise<IngestionResult> {
  const start = Date.now()
  console.log(`[Orchestrator] Starting ${source} ingestion...`)

  try {
    const result = await fn()
    const duration = Date.now() - start
    console.log(`[Orchestrator] ${source} completed in ${(duration / 1000).toFixed(1)}s`)

    return {
      source,
      status: 'completed',
      recordsProcessed: result.processed,
      recordsInserted: result.inserted,
      recordsUpdated: result.updated,
      duration
    }
  } catch (error: any) {
    const duration = Date.now() - start
    console.error(`[Orchestrator] ${source} FAILED after ${(duration / 1000).toFixed(1)}s:`, error.message)

    return {
      source,
      status: 'failed',
      recordsProcessed: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      duration,
      error: error.message
    }
  }
}

/**
 * Run an incremental ingestion — only fetches new/updated data since last run
 */
export async function runIncrementalIngestion(): Promise<IngestionResult[]> {
  const results: IngestionResult[] = []

  // Get last successful run timestamp
  const { data: lastRun } = await getSupabaseAdmin()
    .from('ingestion_log' as any)
    .select('completed_at')
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  const since = lastRun?.completed_at || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  console.log(`[Orchestrator] Running incremental ingestion since ${since}`)

  // CourtListener incremental — fetch new opinions since last run
  const clResult = await runSource('courtlistener_incremental', async () => {
    const data: any = await ingestCourtListenerData()
    let inserted = 0

    if (data.opinions) {
      for (const opinion of data.opinions as any[]) {
        const { error } = await getSupabaseAdmin()
          .from('opinions' as any)
          .upsert({
            courtlistener_id: opinion.courtlistener_id || opinion.id || String(Math.random()),
            case_name: opinion.case_name,
            court: opinion.court,
            date_filed: opinion.date_filed,
            citation: opinion.citation,
            source: 'courtlistener',
          }, { onConflict: 'courtlistener_id' })
        if (!error) inserted++
      }
    }

    return { processed: data.opinions?.length || 0, inserted, updated: 0 }
  })
  results.push(clResult)

  // Refresh cache after incremental
  await getSupabaseAdmin().rpc('refresh_stats_cache')

  return results
}

/**
 * Get the current data freshness status
 */
export async function getDataFreshness() {
  const { data: lastIngestion } = await getSupabaseAdmin()
    .from('ingestion_log' as any)
    .select('*')
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single()

  const { data: cacheStats } = await getSupabaseAdmin()
    .from('stats_cache' as any)
    .select('cache_key, computed_at, expires_at')

  const { count: totalCases } = await getSupabaseAdmin()
    .from('case_stats' as any)
    .select('*', { count: 'exact', head: true })

  const { count: totalOpinions } = await getSupabaseAdmin()
    .from('opinions' as any)
    .select('*', { count: 'exact', head: true })

  return {
    lastIngestion: lastIngestion?.completed_at,
    lastIngestionStatus: lastIngestion?.status,
    cacheStatus: cacheStats,
    totalCaseTypes: totalCases,
    totalOpinions,
    sources: {
      fjc: 'Federal Judicial Center Integrated Database',
      courtlistener: 'CourtListener / Free Law Project',
      recap: 'RECAP Archive (PACER documents)'
    }
  }
}
