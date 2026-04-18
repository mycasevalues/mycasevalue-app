/**
 * Case Search API
 *
 * GET /api/cases/search?q=...&court=...&caseType=...&yearFrom=...&yearTo=...&status=...&sort=...&page=...&limit=...
 *
 * Searches the canonical cases table. Returns cases with court, summary preview, and tags.
 * Uses separate queries for related data to avoid FK detection issues with Supabase.
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
  const sort = params.get('sort') || 'relevance';
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(params.get('limit') || String(DEFAULT_LIMIT), 10)));
  const offset = (page - 1) * limit;

  // Validate yearFrom and yearTo
  const currentYear = new Date().getFullYear();
  if (yearFrom) {
    const yearFromNum = parseInt(yearFrom, 10);
    if (isNaN(yearFromNum) || yearFromNum < 1900 || yearFromNum > currentYear + 1) {
      return NextResponse.json({ error: `yearFrom must be a valid year between 1900 and ${currentYear + 1}` }, { status: 400 });
    }
  }
  if (yearTo) {
    const yearToNum = parseInt(yearTo, 10);
    if (isNaN(yearToNum) || yearToNum < 1900 || yearToNum > currentYear + 1) {
      return NextResponse.json({ error: `yearTo must be a valid year between 1900 and ${currentYear + 1}` }, { status: 400 });
    }
  }

  try {
    const db = getSupabaseAdmin();

    // Build the base query
    let query = db
      .from('cases')
      .select('id, case_name, docket_number, case_type, nature_of_suit, filing_date, termination_date, status, procedural_posture, court_id', { count: 'exact' });

    // Text search using PostgreSQL full-text search (tsvector)
    if (q) {
      // Convert query to tsquery format: split words, join with &
      const tsQuery = q.trim().split(/\s+/).filter(Boolean).join(' & ');
      query = query.textSearch('search_vector', tsQuery);
    }

    // Filters
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
    if (sort === 'oldest') {
      query = query.order('filing_date', { ascending: true, nullsFirst: false });
    } else {
      query = query.order('filing_date', { ascending: false, nullsFirst: false });
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: cases, error, count } = await query;

    if (error) {
      console.error('[api/cases/search] Query error:', error.message);
      return NextResponse.json({ error: 'Search failed', detail: error.message }, { status: 500 });
    }

    if (!cases || cases.length === 0) {
      return NextResponse.json({
        results: [],
        total: count ?? 0,
        page,
        limit,
        totalPages: 0,
        query: q,
        filters: { court, caseType, yearFrom, yearTo, status },
      });
    }

    // Get court data for all results
    const courtIds = Array.from(new Set(cases.map((c: any) => c.court_id).filter(Boolean)));
    const courtMap = new Map<number, any>();
    if (courtIds.length > 0) {
      const { data: courts } = await db.from('courts').select('id, name, abbreviation, circuit').in('id', courtIds);
      (courts ?? []).forEach((c: any) => courtMap.set(c.id, c));
    }

    // Filter by court abbreviation if specified (post-query since it's a join)
    let filteredCases = cases;
    if (court) {
      const upperCourt = court.toUpperCase();
      filteredCases = cases.filter((c: any) => {
        const ct = courtMap.get(c.court_id);
        return ct && ct.abbreviation === upperCourt;
      });
    }

    // Get summaries and tags for results
    const caseIds = filteredCases.map((c: any) => c.id);
    const [summariesRes, tagsRes] = await Promise.all([
      db.from('case_summaries').select('case_id, summary_text').in('case_id', caseIds),
      db.from('case_tags').select('case_id, tag, tag_category').in('case_id', caseIds),
    ]);

    const summaryMap = new Map<number, string>();
    (summariesRes.data ?? []).forEach((s: any) => summaryMap.set(s.case_id, s.summary_text));

    const tagMap = new Map<number, Array<{ tag: string; category: string }>>();
    (tagsRes.data ?? []).forEach((t: any) => {
      const existing = tagMap.get(t.case_id) ?? [];
      existing.push({ tag: t.tag, category: t.tag_category });
      tagMap.set(t.case_id, existing);
    });

    // Shape results
    const results = filteredCases.map((row: any) => {
      const ct = courtMap.get(row.court_id);
      return {
        id: row.id,
        caseName: row.case_name,
        docketNumber: row.docket_number,
        caseType: row.case_type || null,
        natureOfSuit: row.nature_of_suit || null,
        filingDate: row.filing_date || null,
        terminationDate: row.termination_date || null,
        status: row.status || null,
        proceduralPosture: row.procedural_posture || null,
        court: ct ? { name: ct.name, abbreviation: ct.abbreviation, circuit: ct.circuit } : null,
        summaryPreview: summaryMap.get(row.id)?.slice(0, 200) || null,
        tags: tagMap.get(row.id) ?? [],
      };
    });

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
