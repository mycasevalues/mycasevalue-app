/**
 * Case Detail API
 *
 * GET /api/cases/[id]
 *
 * Returns full case detail with court, parties, summary, tags, sources, opinions.
 * Uses separate queries instead of nested selects to avoid FK detection issues.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caseId = parseInt(params.id, 10);
  if (isNaN(caseId)) {
    return NextResponse.json({ error: 'Invalid case ID' }, { status: 400 });
  }

  try {
    const db = getSupabaseAdmin();

    // Fetch case
    const { data: c, error: caseError } = await db
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .single();

    if (caseError || !c) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Fetch court
    let court = null;
    if (c.court_id) {
      const { data: courtData } = await db
        .from('courts')
        .select('name, abbreviation, circuit, state')
        .eq('id', c.court_id)
        .single();
      court = courtData;
    }

    // Fetch related data in parallel
    const [partiesRes, summariesRes, tagsRes, sourcesRes, filingsRes, opinionsRes] = await Promise.all([
      db.from('parties').select('party_name, role').eq('case_id', caseId),
      db.from('case_summaries').select('summary_type, summary_text, confidence_notes, model_name, generated_at').eq('case_id', caseId),
      db.from('case_tags').select('tag, tag_category, confidence, source').eq('case_id', caseId),
      db.from('case_sources').select('source_name, source_url, fetched_at').eq('case_id', caseId),
      db.from('filings').select('filing_number, filing_date, title, description, document_url').eq('case_id', caseId).order('filing_date', { ascending: false }),
      db.from('opinions').select('title, author, opinion_date, source_url, citation').eq('case_id', caseId),
    ]);

    // Fetch related cases (same case_type, exclude self)
    let relatedCases: any[] = [];
    if (c.case_type) {
      const { data: related } = await db
        .from('cases')
        .select('id, case_name, case_type, filing_date, status, court_id')
        .eq('case_type', c.case_type)
        .neq('id', caseId)
        .order('filing_date', { ascending: false })
        .limit(5);

      if (related && related.length > 0) {
        // Get court abbreviations for related cases
        const courtIds = Array.from(new Set(related.map((r: any) => r.court_id).filter(Boolean)));
        const { data: relCourts } = await db.from('courts').select('id, abbreviation').in('id', courtIds);
        const courtMap = new Map((relCourts ?? []).map((c: any) => [c.id, c.abbreviation]));

        relatedCases = related.map((r: any) => ({
          id: r.id,
          caseName: r.case_name,
          caseType: r.case_type,
          filingDate: r.filing_date,
          status: r.status,
          courtAbbreviation: courtMap.get(r.court_id) || null,
        }));
      }
    }

    return NextResponse.json({
      id: c.id,
      caseName: c.case_name,
      docketNumber: c.docket_number,
      caseType: c.case_type,
      natureOfSuit: c.nature_of_suit,
      filingDate: c.filing_date,
      terminationDate: c.termination_date,
      status: c.status,
      proceduralPosture: c.procedural_posture,
      court: court
        ? { name: court.name, abbreviation: court.abbreviation, circuit: court.circuit, state: court.state }
        : null,
      parties: (partiesRes.data ?? []).map((p: any) => ({ name: p.party_name, role: p.role })),
      summary: summariesRes.data?.[0]
        ? {
            type: summariesRes.data[0].summary_type,
            text: summariesRes.data[0].summary_text,
            confidenceNotes: summariesRes.data[0].confidence_notes,
            model: summariesRes.data[0].model_name,
            generatedAt: summariesRes.data[0].generated_at,
          }
        : null,
      tags: (tagsRes.data ?? []).map((t: any) => ({
        tag: t.tag,
        category: t.tag_category,
        confidence: t.confidence,
        source: t.source,
      })),
      sources: (sourcesRes.data ?? []).map((s: any) => ({
        sourceName: s.source_name,
        sourceUrl: s.source_url,
        fetchedAt: s.fetched_at,
      })),
      filings: (filingsRes.data ?? []).map((f: any) => ({
        number: f.filing_number,
        date: f.filing_date,
        title: f.title,
        description: f.description,
        documentUrl: f.document_url,
      })),
      opinions: (opinionsRes.data ?? []).map((o: any) => ({
        title: o.title,
        author: o.author,
        date: o.opinion_date,
        sourceUrl: o.source_url,
        citation: o.citation,
      })),
      relatedCases,
    });
  } catch (err) {
    console.error('[api/cases/[id]] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
