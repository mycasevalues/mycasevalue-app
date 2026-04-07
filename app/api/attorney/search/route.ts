export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { searchAttorney } from '../../../../lib/opposing-counsel';
import type { AttorneySearchResult } from '../../../../lib/opposing-counsel';

interface ErrorResponse {
  error: string;
  message?: string;
}

/**
 * GET /api/attorney/search?q={query}
 *
 * Searches for opposing counsel by name or firm.
 *
 * Query params:
 * - q: Attorney name, firm name, or bar number (required, min 2 chars)
 *
 * Response: JSON with attorney profiles including win rates, settlement patterns,
 * top districts, recent cases, and case type breakdown.
 */
export async function GET(request: NextRequest): Promise<NextResponse<AttorneySearchResult | ErrorResponse>> {
  // Extract query parameter
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('q');

  // Validate query
  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      {
        error: 'Invalid query',
        message: 'Query parameter "q" is required and must be at least 2 characters',
      },
      { status: 400 }
    );
  }

  try {
    // Search for attorneys
    const profiles = await searchAttorney(query.trim());

    // Build response
    const response: AttorneySearchResult = {
      query: query.trim(),
      resultCount: profiles.length,
      profiles,
      disclaimer:
        'Data from public PACER records via CourtListener. Statistical patterns only — not a characterization of any individual attorney\'s capabilities. Rates reflect historical case outcomes and may not predict future results.',
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Attorney search error:', error);
    return NextResponse.json(
      {
        error: 'Search failed',
        message: 'An unexpected error occurred while searching for attorneys',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
