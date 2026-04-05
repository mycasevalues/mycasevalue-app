/**
 * GET /api/data
 * Main data API — serves all dynamic case data to the frontend.
 * Queries Supabase and falls back to static data if DB is unavailable.
 *
 * Query params:
 *   ?type=stats         → Homepage aggregate stats
 *   ?type=case&nos=442  → Case stats for a specific NOS code
 *   ?type=circuits      → All circuit court stats
 *   ?type=states        → All state-level stats
 *   ?type=trending      → Trending case types
 *   ?type=outcomes&nos=442 → Outcome distribution for a NOS code
 *   ?type=freshness     → Data freshness info
 */

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { rateLimit, getClientIp } from '../../../lib/rate-limit'
import {
  validateEnum,
  validateNOSCode,
  validateDistrict,
} from '../../../lib/sanitize'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function GET(request: NextRequest) {
  // Apply rate limiting: 60 req/min (read-heavy public endpoint)
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 60 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url)
  const typeParam = searchParams.get('type') || 'stats'
  const nosParam = searchParams.get('nos')
  const courtParam = searchParams.get('court')

  // Validate type against allowed values from switch statement
  const VALID_TYPES = ['stats', 'case', 'circuits', 'states', 'trending', 'outcomes', 'judges', 'freshness'] as const;
  const type = validateEnum(typeParam, VALID_TYPES, 'stats');

  // Validate nos when present
  let nos: string | null = null;
  if (nosParam) {
    const validatedNos = validateNOSCode(nosParam);
    if (!validatedNos) {
      return NextResponse.json({ error: 'Invalid NOS code: must be 1-4 digits' }, { status: 400 });
    }
    nos = validatedNos;
  }

  // Validate court when present
  let court: string | null = null;
  if (courtParam) {
    const validatedCourt = validateDistrict(courtParam);
    if (!validatedCourt) {
      return NextResponse.json({ error: 'Invalid court name' }, { status: 400 });
    }
    court = validatedCourt;
  }

  const supabase = getSupabase()

  // If Supabase is not configured, return fallback signal
  if (!supabase) {
    return NextResponse.json({
      source: 'static',
      message: 'Database not configured. Using static data.',
      data: null
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
    })
  }

  try {
    switch (type) {
      case 'stats': {
        // Try cache first
        const { data: cached } = await supabase
          .from('stats_cache' as any)
          .select('data, computed_at')
          .eq('cache_key', 'homepage_stats')
          .single()

        if (cached && cached.data) {
          return NextResponse.json({
            source: 'live',
            cached: true,
            computed_at: cached.computed_at,
            data: cached.data
          }, {
            headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
          })
        }

        // Compute live
        const { data: caseStats } = await supabase
          .from('case_stats' as any)
          .select('total_cases, win_rate, nos_code')

        const totalCases = caseStats?.reduce((sum, c) => sum + (c.total_cases || 0), 0) || 0
        const caseTypes = caseStats?.length || 0
        const avgWinRate = caseStats && caseStats.length > 0
          ? caseStats.reduce((sum, c) => sum + (c.win_rate || 0), 0) / caseStats.length
          : 0

        return NextResponse.json({
          source: 'live',
          cached: false,
          data: {
            total_cases: totalCases,
            case_types: caseTypes,
            avg_win_rate: Math.round(avgWinRate * 10) / 10,
            last_updated: new Date().toISOString()
          }
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'case': {
        if (!nos) {
          return NextResponse.json({ error: 'nos parameter required for case type' }, { status: 400 })
        }

        const { data: caseData } = await supabase
          .from('case_stats' as any)
          .select('*')
          .eq('nos_code', nos)
          .single()

        const { data: outcomes } = await supabase
          .from('outcome_distributions' as any)
          .select('*')
          .eq('nos_code', nos)
          .order('percentage', { ascending: false })

        const { data: moneyDist } = await supabase
          .from('money_distributions' as any)
          .select('*')
          .eq('nos_code', nos)
          .order('bracket_tier', { ascending: true })

        return NextResponse.json({
          source: caseData ? 'live' : 'static',
          data: caseData ? {
            ...caseData,
            outcomes: outcomes || [],
            money_distribution: moneyDist || []
          } : null
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'circuits': {
        const { data: circuits } = await supabase
          .from('circuit_stats' as any)
          .select('*')
          .order('win_rate', { ascending: false })

        return NextResponse.json({
          source: circuits && circuits.length > 0 ? 'live' : 'static',
          data: circuits || []
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'states': {
        const { data: states } = await supabase
          .from('state_stats' as any)
          .select('*')
          .order('state_code')

        return NextResponse.json({
          source: states && states.length > 0 ? 'live' : 'static',
          data: states || []
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'trending': {
        const { data: trending } = await supabase
          .from('trending_case_types' as any)
          .select('*')
          .order('change_pct', { ascending: false })
          .limit(10)

        return NextResponse.json({
          source: trending && trending.length > 0 ? 'live' : 'static',
          data: trending || []
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'outcomes': {
        if (!nos) {
          return NextResponse.json({ error: 'nos parameter required for outcomes type' }, { status: 400 })
        }

        const { data: outcomes } = await supabase
          .from('outcome_distributions' as any)
          .select('*')
          .eq('nos_code', nos)
          .order('percentage', { ascending: false })

        return NextResponse.json({
          source: outcomes && outcomes.length > 0 ? 'live' : 'static',
          data: outcomes || []
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'judges': {
        let query = supabase
          .from('judge_stats' as any)
          .select('*')
          .order('total_opinions', { ascending: false })
          .limit(50)

        if (court) query = query.eq('court', court)

        const { data: judges } = await query

        return NextResponse.json({
          source: judges && judges.length > 0 ? 'live' : 'static',
          data: judges || []
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      case 'freshness': {
        const { data: lastLog } = await supabase
          .from('ingestion_log' as any)
          .select('*')
          .eq('status', 'completed')
          .order('completed_at', { ascending: false })
          .limit(1)
          .single()

        const { count: totalStats } = await supabase
          .from('case_stats' as any)
          .select('*', { count: 'exact', head: true })

        const { count: totalOpinions } = await supabase
          .from('opinions' as any)
          .select('*', { count: 'exact', head: true })

        return NextResponse.json({
          source: 'live',
          data: {
            last_ingestion: lastLog?.completed_at,
            last_status: lastLog?.status,
            records_in_db: {
              case_types: totalStats,
              opinions: totalOpinions
            },
            sources: [
              { name: 'Federal Judicial Center', type: 'CSV bulk download', frequency: 'quarterly' },
              { name: 'CourtListener', type: 'REST API', frequency: 'daily' },
              { name: 'RECAP Archive', type: 'REST API', frequency: 'daily' }
            ]
          }
        }, {
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
        })
      }

      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 })
    }
  } catch (error: any) {
    console.error('[api/data] query execution failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({
      source: 'static',
      error: error.message,
      data: null
    }, { status: 500 })
  }
}
