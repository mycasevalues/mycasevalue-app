/**
 * useData — React hook for fetching live data from the MyCaseValue API
 * Falls back to static data from realdata.ts when the database is unavailable.
 *
 * This is the bridge between the frontend and the data layer. Components
 * call this hook and get data regardless of whether it comes from Supabase
 * or the static fallback.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { REAL_DATA, TOTAL_REAL_CASES, REAL_OUTCOME_DATA } from './realdata'

const API_BASE = '/api/data'

type DataSource = 'live' | 'static' | 'loading'

interface UseDataResult<T> {
  data: T | null
  source: DataSource
  loading: boolean
  error: string | null
  refetch: () => void
}

const MAX_RETRIES = 2
const RETRY_DELAYS = [1000, 3000] // exponential backoff: 1s, 3s

// ─── Request deduplication + stale cache ────────────────────────
// Prevents multiple components from firing identical requests,
// and serves stale data while revalidating in the background.
const inflight = new Map<string, Promise<any>>()
const staleCache = new Map<string, { data: any; source: DataSource; ts: number }>()
const STALE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Generic data fetcher with retry + exponential backoff + static fallback
 */
function useDataFetch<T>(url: string, fallback: T | null = null): UseDataResult<T> {
  const [data, setData] = useState<T | null>(fallback)
  const [source, setSource] = useState<DataSource>('loading')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    // Serve stale data immediately while revalidating
    const cached = staleCache.get(url)
    if (cached && Date.now() - cached.ts < STALE_TTL) {
      setData(cached.data as T)
      setSource(cached.source)
      setLoading(false)
      // Still revalidate in the background (don't return yet)
    } else {
      setLoading(true)
    }

    // Request deduplication: if another component already fired this request, reuse it
    const doFetch = async () => {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), 8000) // 8s timeout

          const res = await fetch(url, { signal: controller.signal })
          clearTimeout(timeout)

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`)
          }

          const json = await res.json()

          if (json.source === 'live' && json.data) {
            staleCache.set(url, { data: json.data, source: 'live', ts: Date.now() })
            return { data: json.data, source: 'live' as DataSource, error: null }
          } else {
            return { data: fallback, source: 'static' as DataSource, error: null }
          }
        } catch (err: any) {
          if (attempt === MAX_RETRIES) {
            console.warn(`[useData] All ${MAX_RETRIES + 1} attempts failed for ${url}:`, err.message)
            return { data: fallback, source: 'static' as DataSource, error: err.message }
          }
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt]))
        }
      }
      return { data: fallback, source: 'static' as DataSource, error: 'Unknown error' }
    }

    // Deduplicate: reuse inflight request if one exists for this URL
    let promise = inflight.get(url)
    if (!promise) {
      promise = doFetch()
      inflight.set(url, promise)
    }

    try {
      const result = await promise
      setData(result.data as T)
      setSource(result.source)
      setError(result.error)
    } finally {
      inflight.delete(url)
      setLoading(false)
    }
  }, [url, fallback])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, source, loading, error, refetch: fetchData }
}

/**
 * Hook: Get homepage aggregate stats
 * Returns total cases, case types count, avg win rate
 */
export function useHomepageStats() {
  const fallback = {
    total_cases: TOTAL_REAL_CASES,
    case_types: Object.keys(REAL_DATA).length,
    avg_win_rate: (() => {
      const rates = Object.values(REAL_DATA).map((d: any) => d.wr)
      return Math.round((rates.reduce((a: number, b: number) => a + b, 0) / rates.length) * 10) / 10
    })(),
    last_updated: new Date().toISOString()
  }

  return useDataFetch(`${API_BASE}?type=stats`, fallback)
}

/**
 * Hook: Get case stats for a specific NOS code
 */
export function useCaseStats(nosCode: string) {
  const staticData = REAL_DATA[nosCode]
  const fallback = staticData ? {
    nos_code: nosCode,
    label: staticData.label,
    total_cases: staticData.total,
    win_rate: staticData.wr,
    settlement_rate: staticData.sp,
    avg_duration_months: staticData.mo,
    settlement_lo: staticData.rng?.lo,
    settlement_md: staticData.rng?.md,
    settlement_hi: staticData.rng?.hi,
    represented_win_rate: staticData.rr?.wr,
    pro_se_win_rate: staticData.ps?.wr,
    outcomes: staticData.ends || [],
    money_distribution: staticData.money || [],
    outcome_data: staticData.outcome_data
  } : null

  return useDataFetch(`${API_BASE}?type=case&nos=${nosCode}`, fallback)
}

/**
 * Hook: Get all circuit court stats
 */
export function useCircuitStats() {
  // No static fallback for circuits in the current data format
  return useDataFetch<any[]>(`${API_BASE}?type=circuits`, [])
}

/**
 * Hook: Get all state-level stats
 */
export function useStateStats() {
  // Build fallback from AGGREGATE_STATE_RATES if available
  return useDataFetch<any[]>(`${API_BASE}?type=states`, [])
}

/**
 * Hook: Get trending case types
 */
export function useTrendingCaseTypes() {
  return useDataFetch<any[]>(`${API_BASE}?type=trending`, [])
}

/**
 * Hook: Get outcome distribution for a NOS code
 */
export function useOutcomeDistribution(nosCode: string) {
  const staticData = REAL_DATA[nosCode]
  const fallback = staticData?.ends || []

  return useDataFetch(`${API_BASE}?type=outcomes&nos=${nosCode}`, fallback)
}

/**
 * Hook: Get data freshness info
 */
export function useDataFreshness() {
  return useDataFetch(`${API_BASE}?type=freshness`, null)
}

/**
 * Utility: Get static data for a NOS code (synchronous, no API call)
 * Use this when you need instant data without waiting for the API
 */
export function getStaticCaseData(nosCode: string) {
  return REAL_DATA[nosCode] || null
}

/**
 * Utility: Get all NOS codes available in static data
 */
export function getAvailableNOSCodes(): string[] {
  return Object.keys(REAL_DATA)
}

/**
 * Utility: Get total real cases count from static data
 */
export function getTotalCasesStatic(): number {
  return TOTAL_REAL_CASES
}
