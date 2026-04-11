/**
 * GET /api/legal/dashboard
 * Dashboard statistics for the legal data integration pipeline.
 * Returns ingestion stats, source health, document counts, and processing status.
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    // Run all queries in parallel
    const [
      docCountRes,
      sourceStatusRes,
      citationStatsRes,
      processingRes,
      recentDocsRes,
      embeddingRes,
    ] = await Promise.all([
      // Total document counts by source
      supabase
        .from('legal_documents')
        .select('source', { count: 'exact', head: false })
        .then(async () => {
          const { data, error } = await supabase
            .rpc('get_document_counts_by_source')
            .select('*')
          if (error) {
            const { count } = await supabase
              .from('legal_documents')
              .select('*', { count: 'exact', head: true })
            return { total: count || 0, bySource: {} }
          }
          return { total: (data || []).reduce((a: number, b: any) => a + (b.count || 0), 0), bySource: data }
        }),
      supabase.from('data_source_sync').select('*').order('last_sync_at', { ascending: false }),
      supabase.from('mv_most_cited_documents').select('*').limit(10),
      supabase.from('legal_documents').select('processing_status', { count: 'exact', head: false }),
      supabase.from('legal_documents').select('id, title, source, document_type, date_published, processing_status, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('v_documents_pending_embedding').select('*', { count: 'exact', head: true }),
    ])

    const processingBreakdown: Record<string, number> = {}
    if (processingRes.data) {
      processingRes.data.forEach((doc: any) => {
        processingBreakdown[doc.processing_status] = (processingBreakdown[doc.processing_status] || 0) + 1
      })
    }

    const dashboard = {
      overview: { totalDocuments: docCountRes.total || 0, documentsBySource: docCountRes.bySource || {}, pendingEmbeddings: embeddingRes.count || 0, processingStatus: processingBreakdown },
      sources: (sourceStatusRes.data || []).map((s: any) => ({ name: s.source_name, status: s.status, lastSync: s.last_sync_at, nextSync: s.next_sync_at, totalSynced: s.total_records_synced, lastError: s.last_error, retryCount: s.retry_count })),
      topCited: (citationStatsRes.data || []).map((c: any) => ({ documentId: c.document_id, title: c.title, citationCount: c.citation_count, source: c.source })),
      recentDocuments: (recentDocsRes.data || []).map((d: any) => ({ id: d.id, title: d.title, source: d.source, type: d.document_type, datePublished: d.date_published, status: d.processing_status, createdAt: d.created_at })),
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(dashboard, { status: 200, headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=120' } })
  } catch (err) {
    console.error('[legal/dashboard] Error:', err)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
