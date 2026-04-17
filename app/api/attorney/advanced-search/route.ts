export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SearchMode = 'natural' | 'boolean';

interface SearchRequestBody {
  query: string;
  filters?: {
    jurisdiction?: string;
    dateRange?: { start: string; end: string };
    caseType?: string;
    court?: string;
    keyNumber?: string;
    docType?: ('case' | 'statute' | 'regulation' | 'secondary' | 'brief' | 'docket' | 'news')[];
  };
  mode: SearchMode;
  page?: number;
  pageSize?: number;
}

interface SearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  relevance: number;
  snippet: string;
  type: 'case' | 'statute' | 'regulation' | 'secondary' | 'brief' | 'docket' | 'news';
}

interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  page: number;
  pageSize: number;
  query: string;
  mode: SearchMode;
  searchTimeMs: number;
}

interface ErrorResponse {
  error: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// CORS & rate-limit helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function withRateLimitHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...CORS_HEADERS,
    // TODO: Replace static values with real rate-limit tracking (e.g. Upstash Redis)
    'X-RateLimit-Limit': '100',
    'X-RateLimit-Remaining': '99',
    'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
    ...headers,
  };
}

// ---------------------------------------------------------------------------
// Mock data — mirrors the SearchResult shape used in advanced-search page
// ---------------------------------------------------------------------------

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'McDonnell Douglas Corp. v. Green',
    citation: '411 U.S. 792 (1973)',
    court: 'U.S. Supreme Court',
    date: '1973-06-29',
    relevance: 98,
    snippet:
      'Established the burden-shifting framework for Title VII employment discrimination claims. Plaintiff need only establish a prima facie case of discrimination by showing membership in a protected class...',
    type: 'case',
  },
  {
    id: '2',
    title: 'Texas Department of Housing v. Inclusive Communities',
    citation: '576 U.S. 521 (2015)',
    court: 'U.S. Supreme Court',
    date: '2015-06-25',
    relevance: 94,
    snippet:
      'Extends the disparate impact theory of discrimination to the Fair Housing Act. Demonstrates that facially neutral policies can constitute illegal discrimination if they have a disproportionate effect...',
    type: 'case',
  },
  {
    id: '3',
    title: 'Employment Discrimination: Civil Rights Laws § 3.01',
    citation: 'Wright & Miller Federal Practice § 3.01',
    court: 'Secondary Source',
    date: '2024-01-01',
    relevance: 92,
    snippet:
      'Comprehensive treatment of Title VII of the Civil Rights Act of 1964. Covers protected classes including race, color, religion, sex, and national origin...',
    type: 'secondary',
  },
  {
    id: '4',
    title: '42 U.S.C. § 2000e et seq.',
    citation: '42 U.S.C. § 2000e',
    court: 'Federal Statute',
    date: '1964-07-02',
    relevance: 88,
    snippet:
      'The foundational federal statute prohibiting employment discrimination based on race, color, religion, sex, or national origin. Applies to employers with 15 or more employees.',
    type: 'statute',
  },
];

// ---------------------------------------------------------------------------
// POST /api/attorney/advanced-search
// ---------------------------------------------------------------------------

/**
 * POST /api/attorney/advanced-search
 *
 * Advanced legal search endpoint supporting natural language and boolean modes.
 *
 * Body (JSON):
 *   query   — search query string (required, min 2 chars)
 *   mode    — 'natural' | 'boolean' (default: 'natural')
 *   filters — optional filter object (jurisdiction, dateRange, caseType, court, docType[])
 *   page    — pagination page (default: 1)
 *   pageSize — results per page (default: 20, max 100)
 *
 * Response: SearchResponse with results, pagination, and timing info.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<SearchResponse | ErrorResponse>> {
  const startTime = Date.now();

  try {
    const body: SearchRequestBody = await request.json();

    // --- Validation ---
    if (!body.query || body.query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Invalid query', message: 'Query must be at least 2 characters' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    const mode: SearchMode = body.mode === 'boolean' ? 'boolean' : 'natural';
    const page = Math.max(1, body.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, body.pageSize ?? 20));

    // TODO: Integrate with CourtListener API for real case search
    // - POST to https://www.courtlistener.com/api/rest/v4/search/
    // - Map filters to CourtListener query parameters
    // - Handle pagination via cursor-based API
    // See: https://www.courtlistener.com/help/api/rest/

    // TODO: Integrate with Google Scholar API for secondary sources
    // TODO: Integrate with Anthropic Claude for natural-language query expansion
    // TODO: Integrate with Supabase full-text search for local case_stats data

    // Filter mock results by docType if specified
    let results = [...MOCK_RESULTS];
    if (body.filters?.docType && body.filters.docType.length > 0) {
      results = results.filter((r) => body.filters!.docType!.includes(r.type));
    }

    // Simple relevance scoring mock — boost if query keywords appear in title
    const queryLower = body.query.toLowerCase();
    results = results
      .map((r) => ({
        ...r,
        relevance: r.title.toLowerCase().includes(queryLower) ? r.relevance + 2 : r.relevance,
      }))
      .sort((a, b) => b.relevance - a.relevance);

    const totalResults = results.length;
    const paginatedResults = results.slice((page - 1) * pageSize, page * pageSize);

    const response: SearchResponse = {
      results: paginatedResults,
      totalResults,
      page,
      pageSize,
      query: body.query.trim(),
      mode,
      searchTimeMs: Date.now() - startTime,
    };

    return NextResponse.json(response, {
      headers: withRateLimitHeaders({
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }),
    });
  } catch (err: unknown) {
    console.error('[api/attorney/advanced-search] error:', err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    return NextResponse.json(
      { error: 'Search failed', message: 'An unexpected error occurred' },
      { status: 500, headers: withRateLimitHeaders() },
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}
