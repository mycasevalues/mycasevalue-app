/**
 * Case Search API
 *
 * GET /api/cases/search?q=...&court=...&caseType=...&yearFrom=...&yearTo=...&status=...&sort=...&page=...&limit=...
 *
 * Searches the canonical cases table using PostgreSQL full-text search.
 * Returns cases with court info, AI summary preview, and tags.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const q = params.get('q')?.trim() || '';
  const court = params.get('court') || '';
  const caseType = params.get('caseType') || '';
  const yearFrom = params.get('yearFrom') || '';
  const yearTo = params.get('yearTo') || '';
  const status = params.get('status') || '';
  const sort = params.get('sort') || 'relevance'; // relevance, newest, oldest
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(params.get('limit') || String(DEFAULT_LIMIT), 10)));
  const offset = (page - 1) * limit;

  try {
    const db = getSupabaseAdmin();

    let query = db
      .from('cases')
      .select(
        `
        id,
        case_name,
        docket_number,
        case_type,
        nature_of_suit,
        filing_date,
        termination_date,
        status,
        procedural_posture,
        courts(name, abbreviation, circuit),
        case_summaries(summary_text),
        case_tags(tag, tag_category)
      `,
        { count: 'exact' }
      );

    // Text search on case name
    if (q) {
      // Use ilike for simple substring matching (works without FTS setup)
      // If the query looks like a docket number, search that field too
      const isDocketLike = /\d+.*-.*-\d+/.test(q);
      if (isDocketLike) {
        query = query.or(`case_name.ilike.%${q}%,docket_number.ilike.%${q}%`);
      } else {
        query = query.ilike('case_name', `%${q}%`);
      }
    }

    // Filters
    if (court) {
      query = query.eq('courts.abbreviation', court.toUpperCase());
    }
    if (caseType) {
      query = query.ilike('case_type', `%${caseType}%`);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (yearFrom) {
      query = query.gte('filing_date', `${yearFrom}-01-01`);
    }
    if (yearTo) {
      query = query.lte('filing_date', `${yearTo}-12-31`);
    }

    // Sorting
    if (sort === 'newest') {
      query = query.order('filing_date', { ascending: false, nullsFirst: false });
    } else if (sort === 'oldest') {
      query = query.order('filing_date', { ascending: true, nullsFirst: false });
    } else {
      // Default: newest first (relevance sorting would need pg_trgm or FTS rank)
      query = query.order('filing_date', { ascending: false, nullsFirst: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('[api/cases/search] Query error:', error.message);
      return NextResponse.json(
        { error: 'Search failed', detail: error.message },
        { status: 500 }
      );
    }

    // Shape results
    const results = (data ?? []).map((row: any) => ({
      id: row.id,
      caseName: row.case_name,
      docketNumber: row.docket_number,
      caseType: row.case_type || null,
      natureOfSuit: row.nature_of_suit || null,
      filingDate: row.filing_date || null,
      terminationDate: row.termination_date || null,
      status: row.status || null,
      proceduralPosture: row.procedural_posture || null,
      court: row.courts
        ? {
            name: row.courts.name,
            abbreviation: row.courts.abbreviation,
            circuit: row.courts.circuit,
          }
        : null,
      summaryPreview: row.case_summaries?.[0]?.summary_text?.slice(0, 200) || null,
      tags: (row.case_tags ?? []).map((t: any) => ({
        tag: t.tag,
        category: t.tag_category,
      })),
    }));

    return NextResponse.json({
      results,
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
      query: q,
      filters: { court, caseType, yearFrom, yearTo, status },
    });
  } catch (err) {
    console.error('[api/cases/search] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
