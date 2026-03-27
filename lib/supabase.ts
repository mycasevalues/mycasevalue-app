/**
 * Supabase client for MyCaseValue
 * Connects to our Supabase project for real-time federal court data
 */
import { createClient } from '@supabase/supabase-js'

// Lazy-initialized clients — avoids build-time errors when env vars aren't set
let _supabase: ReturnType<typeof createClient> | null = null
let _supabaseAdmin: ReturnType<typeof createClient> | null = null

/** Client-side Supabase client (uses anon key, respects RLS) */
export function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase URL and anon key are required')
    _supabase = createClient(url, key)
  }
  return _supabase
}

/** Server-side Supabase client (uses service role key, bypasses RLS) */
export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase URL and service role key are required')
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}


export type CaseStats = {
  id: string
  nos_code: string
  label: string
  category: string
  total_cases: number
  win_rate: number
  settlement_rate: number
  avg_duration_months: number
  median_settlement: number
  settlement_lo: number
  settlement_hi: number
  represented_win_rate: number
  pro_se_win_rate: number
  class_action_pct: number
  statute_of_limitations: string
  attorney_fee_range: string
  last_updated: string
  source: string
}

export type CircuitStats = {
  id: string
  circuit: string
  win_rate: number
  total_cases: number
  avg_duration_months: number
  settlement_rate: number
  last_updated: string
}

export type StateStats = {
  id: string
  state_code: string
  state_name: string
  win_rate: number
  total_cases: number
  avg_duration_months: number
  last_updated: string
}

export type TrendingCaseType = {
  id: string
  nos_code: string
  label: string
  filing_count_current: number
  filing_count_previous: number
  change_pct: number
  period: string
  last_updated: string
}

export type OutcomeDistribution = {
  id: string
  nos_code: string
  outcome_type: string
  percentage: number
  count: number
  color: string
  last_updated: string
}

export type IngestionLog = {
  id: string
  source: string
  status: 'running' | 'completed' | 'failed'
  records_processed: number
  records_inserted: number
  records_updated: number
  error_message: string | null
  started_at: string
  completed_at: string | null
}
