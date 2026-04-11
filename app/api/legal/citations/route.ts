/**
 * GET /api/legal/citations
 * Citation network data for the Citation Explorer.
 * Returns nodes (documents) and edges (citations) for graph visualization.
 *
 * Query params:
 *   documentId â center the graph on this document
 *   depth      â traversal depth (1-3, default 1)
 *   limit      â max nodes (default 50, max 200)
 *   source     â filter by source
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const documentId = searchParams.get('documentId')
  const depth = Math.min(3, Math.max(1, parseInt(searchParams.get('depth') || '1', 10)))
  const limit = Math.min(200, Math.max(10, parseInt(searchParams.get('limit') || '50', 10)))
  const source = searchParams.get('source')

  try {
    const supabase = getSupabaseAdmin()

    if (documentId) {
      // Get citation network centered on a specific document
      const { data: citations, error: citError } = await supabase
        .from('legal_citations')
        .select(`
          id,
          citing_document_id,
          cited_document_id,
          citation_text,
          citation_type,
          normalized_cite,
          context
        `)
        .or(`citing_document_id.eq.${documentId},cited_document_id.eq.${documentId}`)
        .limit(limit)

      if (citError) throw citError

      // Collect all unique document IDs
      const docIds = new Set<string>()
      docIds.add(documentId)
      ;(citations || []).forEach((c: any) => {
        docIds.add(c.citing_document_id)
        docIds.add(c.cited_document_id)
      })

      // Fetch document details for all nodes
      const { data: docs, error: docError } = await supabase
        .from('legal_documents')
        .select('id, title, source, document_type, jurisdiction, date_published')
        .in('id', Array.from(docIds))

      if (docError) throw docError

      const nodes = (docs || []).map((d: any) => ({
        id: d.id,
        label: d.title?.substring(0, 80) || 'Untitled',
        source: d.source,
        type: d.document_type,
        jurisdiction: d.jurisdiction,
        date: d.date_published,
        isCentral: d.id === documentId,
      }))

      const edges = (citations || []).map((c: any) => ({
        id: c.id,
        source: c.citing_document_id,
        target: c.cited_document_id,
        type: c.citation_type,
        cite: c.normalized_cite,
        text: c.citation_text?.substring(0, 200),
      }))

      return NextResponse.json({ nodes, edges, centerDocumentId: documentId, depth }, {
        status: 200,
        headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=600' },
      })
    }

    // No documentId: return most-cited documents and their connections
    let topCitedQuery = supabase
      .from('mv_most_cited_documents')
      .select('*')
      .limit(limit)

    const { data: topCited, error: topError } = await topCitedQuery
    if (topError) throw topError

    // Get citation edges between top documents
    const topDocIds = (topCited || []).map((d: any) => d.document_id)

    let citationsQuery = supabase
      .from('legal_citations')
      .select('id, citing_document_id, cited_document_id, citation_type, normalized_cite')
      .in('citing_document_id', topDocIds)
      .in('cited_document_id', topDocIds)
      .limit(limit * 3)

    const { data: edges, error: edgeError } = await citationsQuery
    if (edgeError) throw edgeError

    // Get document details
    const { data: docs } = await supabase
      .from('legal_documents')
      .select('id, title, source, document_type, jurisdiction, date_published')
      .in('id', topDocIds)

    const nodes = (docs || []).map((d: any) => {
      const citedEntry = (topCited || []).find((t: any) => t.document_id === d.id)
      return {
        id: d.id,
        label: d.title?.substring(0, 80) || 'Untitled',
        source: d.source,
        type: d.document_type,
        jurisdiction: d.jurisdiction,
        date: d.date_published,
        citationCount: citedEntry?.citation_count || 0,
      }
    })

    const formattedEdges = (edges || []).map((e: any) => ({
      id: e.id,
      source: e.citing_document_id,
      target: e.cited_document_id,
      type: e.citation_type,
      cite: e.normalized_cite,
    }))

    return NextResponse.json({
      nodes,
      edges: formattedEdges,
      mode: 'top-cited',
    }, {
      status: 200,
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=900' },
    })
  } catch (err) {
    console.error('[legal/citations] Error:', err)
    return NextResponse.json({ error: 'Failed to fetch citation data' }, { status: 500 })
  }
}
