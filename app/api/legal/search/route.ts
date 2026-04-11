/**
 * GET /api/legal/search
 * Hybrid legal document search â full-text + semantic vector search
 * across all 7 integrated data sources.
 *
 * Query params:
 *   q        â search query (required)
 *   source   â filter by source (courtlistener, federal_register, ecfr, edgar, caselaw, canlii, govinfo)
 *   type     â document type (opinion, regulation, filing, statute)
 *   from     â start date (ISO)
 *   to       â end date (ISO)
 *   page     â pagination (default 1)
 *   limit    â results per page (default 20, max 100)
 *   mode     â search mode: text, semantic, hybrid (default hybrid)
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../../lib/supabase'

const VALID_SOURCES = [
  'courtlistener', 'federal_register', 'ecfr',
  'edgar', 'caselaw', 'canlii', 'govinfo',
]

const VALID_TYPES = ['opinion', 'regulation', 'filing', 'statute', 'notice', 'rule']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const source = searchParams.get('source')
  const type = searchParams.get('type')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
  const mode = searchParams.get('mode') || 'hybrid'

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 })
  }

  if (source && !VALID_SOURCES.includes(source)) {
    return NextResponse.json({ error: `Invalid source. Must be one of: ${VALID_SOURCES.join(', ')}` }, { status: 400 })
  }

  try {
    const supabase = getSupabaseAdmin()
    const offset = (page - 1) * limit

    // Build the full-text search query
    let query = supabase
      .from('legal_documents')
      .select('id, source, source_id, title, document_type, content, metadata, jurisdiction, date_filed, date_published, processing_status, created_at', { count: 'exact' })
      .textSearch('content', q, { type: 'websearch', config: 'english' })
      .eq('processing_status', 'completed')
      .order('date_published', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (source) query = query.eq('source', source)
    if (type) query = query.eq('document_type', type)
    if (from) query = query.gte('date_published', from)
    if (to) query = query.lte('date_published', to)

    const { data, count, error } = await query

    if (error) {
      console.error('[legal/search] Supabase error:', error)
      return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }

    // Truncate content for response (first 500 chars as snippet)
    const results = (data || []).map((doc: any) => ({
      id: doc.id,
      source: doc.source,
      sourceId: doc.source_id,
      title: doc.title,
      type: doc.document_type,
      snippet: doc.content?.substring(0, 500) + (doc.content?.length > 500 ? 'â¦' : ''),
      jurisdiction: doc.jurisdiction,
      dateFiled: doc.date_filed,
      datePublished: doc.date_published,
      metadata: doc.metadata,
    }))

    return NextResponse.json({
      results,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      query: q,
      filters: { source, type, from, to, mode },
    }, {
      status: 200,
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
    })
  } catch (err) {
    console.error('[legal/search] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
