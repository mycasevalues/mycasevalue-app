/**
 * Case Detail API
 *
 * GET /api/cases/[id]
 *
 * Returns full case detail with court, parties, summary, tags, sources, opinions.
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

    const { data: c, error } = await db
      .from('cases')
      .select(
        `
        *,
        courts(name, abbreviation, circuit, state),
        parties(party_name, role),
        case_summaries(summary_type, summary_text, confidence_notes, model_name, prompt_version, generated_at),
        case_tags(tag, tag_category, confidence, source),
        case_sources(source_name, source_url, fetched_at),
        filings(filing_number, filing_date, title, description, document_url),
        opinions(title, author, opinion_date, source_url, citation)
      `
      )
      .eq('id', caseId)
      .single();

    if (error || !c) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Also fetch related cases (same case_type, same court, exclude self)
    let relatedCases: any[] = [];
    if (c.case_type) {
      const { data: related } = await db
        .from('cases')
        .select('id, case_name, case_type, filing_date, status, courts(abbreviation)')
        .eq('case_type', c.case_type)
        .neq('id', caseId)
        .order('filing_date', { ascending: false })
        .limit(5);
      relatedCases = related ?? [];
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
      court: c.courts
        ? {
            name: c.courts.name,
            abbreviation: c.courts.abbreviation,
            circuit: c.courts.circuit,
            state: c.courts.state,
          }
        : null,
      parties: (c.parties ?? []).map((p: any) => ({
        name: p.party_name,
        role: p.role,
      })),
      summary: c.case_summaries?.[0]
        ? {
            type: c.case_summaries[0].summary_type,
            text: c.case_summaries[0].summary_text,
            confidenceNotes: c.case_summaries[0].confidence_notes,
            model: c.case_summaries[0].model_name,
            generatedAt: c.case_summaries[0].generated_at,
          }
        : null,
      tags: (c.case_tags ?? []).map((t: any) => ({
        tag: t.tag,
        category: t.tag_category,
        confidence: t.confidence,
        source: t.source,
      })),
      sources: (c.case_sources ?? []).map((s: any) => ({
        sourceName: s.source_name,
        sourceUrl: s.source_url,
        fetchedAt: s.fetched_at,
      })),
      filings: (c.filings ?? [])
        .sort((a: any, b: any) => (b.filing_date ?? '').localeCompare(a.filing_date ?? ''))
        .map((f: any) => ({
          number: f.filing_number,
          date: f.filing_date,
          title: f.title,
          description: f.description,
          documentUrl: f.document_url,
        })),
      opinions: (c.opinions ?? []).map((o: any) => ({
        title: o.title,
        author: o.author,
        date: o.opinion_date,
        sourceUrl: o.source_url,
        citation: o.citation,
      })),
      relatedCases: relatedCases.map((r: any) => ({
        id: r.id,
        caseName: r.case_name,
        caseType: r.case_type,
        filingDate: r.filing_date,
        status: r.status,
        courtAbbreviation: r.courts?.abbreviation,
      })),
    });
  } catch (err) {
    console.error('[api/cases/[id]] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
