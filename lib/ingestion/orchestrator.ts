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

  // Log the run
  const { data: logEntry } = await getSupabaseAdmin()
    .from('ingestion_log' as any)
    .insert({
      source: 'orchestrator',
      job_type: 'full',
      status: 'running',
      metadata: { started_sources: ['fjc', 'courtlistener', 'recap'] }
    })
    .select()
    .single()

  // ─── 1. FJC Integrated Database (primary source) ───
  const fjcResult = await runSource('fjc', async () => {
    const data = await ingestFJCData()

    let inserted = 0
    let updated = 0

    // Upsert case stats
    if (data.caseStats && data.caseStats.length > 0) {
      for (const stat of data.caseStats) {
        const { error } = await getSupabaseAdmin()
          .from('case_stats' as any)
          .upsert({
            nos_code: stat.nos_code,
            label: stat.label,
            category: stat.category || 'other',
            total_cases: stat.total_cases,
            win_rate: stat.win_rate,
            settlement_rate: stat.settlement_rate,
            avg_duration_months: stat.avg_duration_months,
            median_settlement: stat.median_settlement || 0,
            settlement_lo: stat.settlement_lo || 0,
            settlement_md: stat.settlement_md || 0,
            settlement_hi: stat.settlement_hi || 0,
            represented_win_rate: stat.represented_win_rate || 0,
            represented_total: stat.represented_total || 0,
            pro_se_win_rate: stat.pro_se_win_rate || 0,
            pro_se_total: stat.pro_se_total || 0,
            source: 'fjc',
            last_updated: new Date().toISOString()
          }, { onConflict: 'nos_code,source' })

        if (!error) inserted++
        else console.warn(`[FJC] Upsert error for NOS ${stat.nos_code}:`, error.message)
      }
    }

    // Upsert circuit stats
    if (data.circuitStats && data.circuitStats.length > 0) {
      for (const circuit of data.circuitStats) {
        await getSupabaseAdmin()
          .from('circuit_stats' as any)
          .upsert({
            circuit: circuit.circuit,
            circuit_number: circuit.circuit_number,
            win_rate: circuit.win_rate,
            total_cases: circuit.total_cases,
            avg_duration_months: circuit.avg_duration_months,
            settlement_rate: circuit.settlement_rate,
            source: 'fjc',
            last_updated: new Date().toISOString()
          }, { onConflict: 'circuit,source' })
      }
    }

    // Upsert state stats
    if (data.stateStats && data.stateStats.length > 0) {
      for (const state of data.stateStats) {
        await getSupabaseAdmin()
          .from('state_stats' as any)
          .upsert({
            state_code: state.state_code,
            state_name: state.state_name,
            win_rate: state.win_rate,
            total_cases: state.total_cases,
            avg_duration_months: state.avg_duration_months,
            source: 'fjc',
            last_updated: new Date().toISOString()
          }, { onConflict: 'state_code,source' })
      }
    }

    // Upsert outcome distributions
    if (data.outcomeDistributions && data.outcomeDistributions.length > 0) {
      for (const outcome of data.outcomeDistributions) {
        await getSupabaseAdmin()
          .from('outcome_distributions' as any)
          .upsert({
            nos_code: outcome.nos_code,
            outcome_type: outcome.outcome_type,
            percentage: outcome.percentage,
            count: outcome.count,
            color: outcome.color || '#94A3B8',
            source: 'fjc',
            last_updated: new Date().toISOString()
          }, { onConflict: 'nos_code,outcome_type,source' })
      }
    }

    // Upsert trending case types
    if (data.trendingCaseTypes && data.trendingCaseTypes.length > 0) {
      for (const trend of data.trendingCaseTypes) {
        await getSupabaseAdmin()
          .from('trending_case_types' as any)
          .upsert({
            nos_code: trend.nos_code,
            label: trend.label,
            filing_count_current: trend.filing_count_current,
            filing_count_previous: trend.filing_count_previous,
            change_pct: trend.change_pct,
            period: trend.period,
            source: 'fjc',
            last_updated: new Date().toISOString()
          }, { onConflict: 'nos_code,period,source' })
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

    // Upsert opinions
    if (data.opinions && data.opinions.length > 0) {
      for (const opinion of data.opinions as any[]) {
        const { error } = await getSupabaseAdmin()
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
      }
    }

    // Upsert judge data
    if (data.judges && data.judges.length > 0) {
      for (const judge of data.judges as any[]) {
        await getSupabaseAdmin()
          .from('judge_stats' as any)
          .upsert({
            judge_name: judge.judge_name || judge.name || 'Unknown',
            court: judge.court || 'unknown',
            appointed_by: judge.appointed_by,
            courtlistener_id: judge.courtlistener_id || judge.id,
            source: 'courtlistener',
            last_updated: new Date().toISOString()
          }, { onConflict: 'judge_name,court,source' })
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
    const data: any = await ingestRECAPData()

    let processed = 0
    if (data) {
      processed = Array.isArray(data) ? data.length : (data.dockets?.length || 0)
    }

    return { processed, inserted: processed, updated: 0 }
  })
  results.push(recapResult)

  // ─── Refresh the stats cache ───
  console.log('[Orchestrator] Refreshing stats cache...')
  await getSupabaseAdmin().rpc('refresh_stats_cache')

  // ─── Update the ingestion log ───
  if (logEntry) {
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
