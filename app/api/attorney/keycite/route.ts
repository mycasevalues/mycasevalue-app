export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TreatmentFlag = 'green' | 'yellow' | 'red' | 'blue';

interface CitingReference {
  citation: string;
  caseName: string;
  court: string;
  year: number;
  depthStars: number;
  treatment: string;
  headnotes: number[];
}

interface NegativeHistory {
  citation: string;
  caseName: string;
  court: string;
  year: number;
  flag: TreatmentFlag;
  type: string;
  headnotes: number[];
  rationale: string;
}

interface HistoryEvent {
  year: number;
  type: string;
  description: string;
  status: string;
}

interface KeyCiteResponse {
  citation: string;
  caseName: string;
  courtName: string;
  decisionDate: string;
  treatmentFlag: TreatmentFlag;
  treatmentLabel: string;
  treatmentCount: number;
  historyTimeline: HistoryEvent[];
  citingReferences: CitingReference[];
  negativeHistory: NegativeHistory[];
  disclaimer: string;
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
    'X-RateLimit-Limit': '60',
    'X-RateLimit-Remaining': '59',
    'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
    ...headers,
  };
}

// ---------------------------------------------------------------------------
// Mock data — matches the shape used in the keycite page component
// ---------------------------------------------------------------------------

const MOCK_KEYCITE_DATA: Record<string, Omit<KeyCiteResponse, 'disclaimer'>> = {
  '347 U.S. 483': {
    citation: '347 U.S. 483',
    caseName: 'Brown v. Board of Education',
    courtName: 'U.S. Supreme Court',
    decisionDate: '1954-05-17',
    treatmentFlag: 'green',
    treatmentLabel: 'Followed',
    treatmentCount: 12847,
    historyTimeline: [
      { year: 1954, type: 'Decided', description: 'Brown v. Board of Education', status: 'landmark' },
      { year: 1955, type: 'Implementation', description: 'Brown II - Implementation guidance', status: 'followed' },
      { year: 1971, type: 'Applied', description: 'Swann v. Charlotte-Mecklenburg', status: 'followed' },
      { year: 2007, type: 'Restricted', description: 'Parents Involved in Community Schools v. Seattle', status: 'negative' },
    ],
    citingReferences: [
      { citation: '391 U.S. 430', caseName: 'Green v. County School Board', court: 'U.S. Supreme Court', year: 1968, depthStars: 4, treatment: 'followed', headnotes: [1, 2] },
      { citation: '402 U.S. 1', caseName: 'Swann v. Charlotte-Mecklenburg', court: 'U.S. Supreme Court', year: 1971, depthStars: 4, treatment: 'followed', headnotes: [1, 2, 3] },
      { citation: '438 U.S. 265', caseName: 'Regents of Univ. of California v. Bakke', court: 'U.S. Supreme Court', year: 1978, depthStars: 4, treatment: 'followed', headnotes: [1] },
    ],
    negativeHistory: [
      {
        citation: '545 U.S. 469',
        caseName: 'Parents Involved in Community Schools v. Seattle School District No. 1',
        court: 'U.S. Supreme Court',
        year: 2007,
        flag: 'red',
        type: 'limited',
        headnotes: [1, 2],
        rationale: 'Restricted application to intentional de jure segregation',
      },
      {
        citation: '597 U.S. 507',
        caseName: 'Students for Fair Admissions v. President and Fellows of Harvard College',
        court: 'U.S. Supreme Court',
        year: 2023,
        flag: 'red',
        type: 'overruled_in_part',
        headnotes: [1],
        rationale: 'Race-based classifications held unconstitutional in admissions',
      },
    ],
  },
  '411 U.S. 792': {
    citation: '411 U.S. 792',
    caseName: 'McDonnell Douglas Corp. v. Green',
    courtName: 'U.S. Supreme Court',
    decisionDate: '1973-05-14',
    treatmentFlag: 'green',
    treatmentLabel: 'Followed',
    treatmentCount: 48210,
    historyTimeline: [
      { year: 1973, type: 'Decided', description: 'McDonnell Douglas Corp. v. Green', status: 'landmark' },
      { year: 1981, type: 'Applied', description: 'Texas Dept. of Community Affairs v. Burdine', status: 'followed' },
      { year: 1993, type: 'Clarified', description: 'St. Mary\'s Honor Center v. Hicks', status: 'followed' },
    ],
    citingReferences: [
      { citation: '450 U.S. 248', caseName: 'Texas Dept. of Community Affairs v. Burdine', court: 'U.S. Supreme Court', year: 1981, depthStars: 4, treatment: 'followed', headnotes: [1, 2] },
    ],
    negativeHistory: [],
  },
};

// Default fallback for unknown citations
function buildDefaultResponse(citation: string): Omit<KeyCiteResponse, 'disclaimer'> {
  return {
    citation,
    caseName: 'Unknown Case',
    courtName: 'Unknown Court',
    decisionDate: '',
    treatmentFlag: 'blue',
    treatmentLabel: 'No Treatment Data',
    treatmentCount: 0,
    historyTimeline: [],
    citingReferences: [],
    negativeHistory: [],
  };
}

// ---------------------------------------------------------------------------
// POST /api/attorney/keycite
// ---------------------------------------------------------------------------

/**
 * POST /api/attorney/keycite
 *
 * Citation validation and treatment analysis endpoint.
 *
 * Body (JSON):
 *   citation — legal citation string (required, e.g. "347 U.S. 483")
 *
 * Returns treatment flag (green/yellow/red), citing references,
 * case history timeline, and negative history alerts.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<KeyCiteResponse | ErrorResponse>> {
  try {
    const body = await request.json();
    const { citation } = body;

    // --- Validation ---
    if (!citation || typeof citation !== 'string' || citation.trim().length < 3) {
      return NextResponse.json(
        {
          error: 'Invalid citation',
          message: 'A valid legal citation string is required (minimum 3 characters)',
        },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    const normalizedCitation = citation.trim();

    // TODO: Integrate with CourtListener Opinions API for real citation data
    // - GET https://www.courtlistener.com/api/rest/v4/search/?type=o&citation={citation}
    // - Parse citing opinions and build treatment graph
    // See: https://www.courtlistener.com/help/api/rest/

    // TODO: Integrate with Westlaw KeyCite API (requires commercial license)
    // - Verify citation validity
    // - Fetch treatment flags and depth-of-treatment stars
    // - Retrieve negative treatment alerts

    // TODO: Integrate with Casetext / CoCounsel API as alternative data source

    // TODO: Build local citation graph in Supabase for frequently queried cases
    // - Store citation relationships in a graph table
    // - Cache treatment flags for faster lookups

    const data = MOCK_KEYCITE_DATA[normalizedCitation] ?? buildDefaultResponse(normalizedCitation);

    const response: KeyCiteResponse = {
      ...data,
      disclaimer:
        'Citation treatment data is derived from publicly available court records. This analysis is not a substitute for professional legal research. Treatment flags are algorithmic assessments and may not reflect all recent developments.',
    };

    return NextResponse.json(response, {
      headers: withRateLimitHeaders({
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
      }),
    });
  } catch (err: unknown) {
    console.error('[api/attorney/keycite] error:', err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    return NextResponse.json(
      { error: 'KeyCite lookup failed', message: 'An unexpected error occurred' },
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
