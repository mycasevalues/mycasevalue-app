/**
 * POST /api/ingest
 * Triggers a data ingestion run. Protected by API key.
 * Called by Vercel cron jobs or manually for data refresh.
 *
 * Headers:
 *   Authorization: Bearer <INGEST_API_KEY>
 *
 * Body (optional):
 *   { "mode": "full" | "incremental" }
 */

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server'
import { runFullIngestion, runIncrementalIngestion } from '../../../lib/ingestion/orchestrator'

export const maxDuration = 300 // Allow 5 minutes for ingestion

export async function POST(request: NextRequest) {
  // Verify API key
  const authHeader = request.headers.get('authorization')
  const expectedKey = process.env.INGEST_API_KEY

  if (!expectedKey) {
    return NextResponse.json({ error: 'INGEST_API_KEY not configured' }, { status: 500 })
  }

  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const mode = (body as any)?.mode || 'incremental'
    const source = (body as any)?.source || null // Optional: 'fjc', 'courtlistener', 'recap'

    console.log(`[Ingest API] Starting ${mode} ingestion...${source ? ` (source: ${source})` : ''}`)

    let results
    if (source) {
      // Run a single source only — avoids timeout
      const { runSingleSource } = await import('../../../lib/ingestion/orchestrator')
      results = await runSingleSource(source)
    } else if (mode === 'full') {
      results = await runFullIngestion()
    } else {
      results = await runIncrementalIngestion()
    }

    const allSucceeded = results.every(r => r.status === 'completed')

    return NextResponse.json({
      status: allSucceeded ? 'completed' : 'partial_failure',
      mode,
      source: source || 'all',
      results,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('[Ingest API] Fatal error:', error.message)
    return NextResponse.json({
      status: 'failed',
      error: error.message
    }, { status: 500 })
  }
}

// GET endpoint for Vercel cron
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expectedKey = process.env.CRON_SECRET

  // Vercel cron sends the CRON_SECRET in Authorization header
  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[Ingest API] Cron-triggered incremental ingestion...')
    const results = await runIncrementalIngestion()

    return NextResponse.json({
      status: 'completed',
      mode: 'incremental',
      results,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'failed',
      error: error.message
    }, { status: 500 })
  }
}
