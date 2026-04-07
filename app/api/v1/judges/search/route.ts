export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getJudges } from '@/lib/judge-data-service';

const SearchQuerySchema = z.string().min(2).max(100);

interface JudgeSearchResult {
  judge_id: string;
  full_name: string;
  district_id: string;
  circuit: string;
  overall_plaintiff_win_rate: number | null;
  total_cases_handled: number;
}

function validateBearerToken(authHeader: string | null): boolean {
  if (!authHeader) return false;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false;
  return parts[1].startsWith('mcv_');
}

/**
 * GET /api/v1/judges/search?q=name
 * Searches judges by name, returns array of matching judges
 */
export async function GET(request: NextRequest) {
  // Check authentication
  const authHeader = request.headers.get('Authorization');
  if (!validateBearerToken(authHeader)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Missing or invalid Bearer token' },
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Get search query
  const query = request.nextUrl.searchParams.get('q');
  if (!query) {
    return NextResponse.json(
      { error: 'Missing parameter', message: 'Query parameter "q" is required' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const queryValidation = SearchQuerySchema.safeParse(query);
  if (!queryValidation.success) {
    return NextResponse.json(
      { error: 'Invalid query', message: 'Query must be 2-100 characters' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const searchQuery = queryValidation.data;

    // Search judges
    const result = await getJudges({
      nameSearch: searchQuery,
      limit: 20,
      offset: 0,
    });

    const judges: JudgeSearchResult[] = result.judges.map((judge) => ({
      judge_id: judge.id,
      full_name: judge.full_name,
      district_id: judge.district_id,
      circuit: judge.circuit || '',
      overall_plaintiff_win_rate: judge.overall_plaintiff_win_rate,
      total_cases_handled: judge.total_cases_handled || 0,
    }));

    return NextResponse.json(
      {
        results: judges,
        total: result.total,
        limit: result.limit,
        offset: result.offset,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('[api/v1/judges/search] Error searching judges:', error);
    return NextResponse.json(
      { error: 'Server error', message: 'Failed to search judges' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
