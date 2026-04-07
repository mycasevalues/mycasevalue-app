export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { NOS_TRENDS } from '@/data/nos-trends';

const NosCodeSchema = z.string().regex(/^\d{1,4}$/, 'NOS code must be 1-4 digits');

interface TrendDataPoint {
  year: number;
  win_rate: number;
}

interface TrendsResponse {
  nos_code: string;
  name: string;
  trend_data: TrendDataPoint[];
  confidence: string;
  data_through: string;
  source: string;
}

function validateBearerToken(authHeader: string | null): boolean {
  if (!authHeader) return false;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false;
  return parts[1].startsWith('mcv_');
}

/**
 * GET /api/v1/trends/nos/[code]
 * Returns year-by-year trend data for win rates (2015-2024)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  // Check authentication
  const authHeader = request.headers.get('Authorization');
  if (!validateBearerToken(authHeader)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Missing or invalid Bearer token' },
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate NOS code
  const codeValidation = NosCodeSchema.safeParse(params.code);
  if (!codeValidation.success) {
    return NextResponse.json(
      { error: 'Invalid NOS code', message: 'NOS code must be 1-4 digits' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const nosCode = codeValidation.data;

  // Query trends data
  const trends = (NOS_TRENDS as Record<string, any>)[nosCode];
  if (!trends || trends.length === 0) {
    return NextResponse.json(
      { error: 'Not found', message: `No trend data found for NOS code ${nosCode}` },
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const response: TrendsResponse = {
    nos_code: nosCode,
    name: `Trend Data for NOS ${nosCode}`,
    trend_data: trends.map((t: any) => ({
      year: t.year,
      win_rate: t.winRate,
    })),
    confidence: 'high',
    data_through: '2024-12-31',
    source: 'CourtListener / FJC Integrated Database',
  };

  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
    },
  });
}
