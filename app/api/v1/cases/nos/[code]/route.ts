export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { REAL_DATA } from '@/lib/realdata';
import { SITS } from '@/lib/data';

// Zod schema for path params
const NosCodeSchema = z.string().regex(/^\d{1,4}$/, 'NOS code must be 1-4 digits');

interface NosResponse {
  nos_code: string;
  name: string;
  total_cases: number;
  plaintiff_win_rate: number;
  settlement_rate: number;
  median_settlement: number;
  p25_settlement: number;
  p75_settlement: number;
  avg_duration_months: number;
  confidence: string;
  data_through: string;
  source: string;
}

/**
 * Validate Bearer token format
 * For now, accept any token starting with "mcv_"
 */
function validateBearerToken(authHeader: string | null): boolean {
  if (!authHeader) return false;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false;
  return parts[1].startsWith('mcv_');
}

/**
 * GET /api/v1/cases/nos/[code]
 * Returns comprehensive case statistics for a NOS code
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
  const data = (REAL_DATA as Record<string, any>)[nosCode];

  if (!data) {
    return NextResponse.json(
      { error: 'Not found', message: `No data found for NOS code ${nosCode}` },
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Find the label from SITS if available
  let label = data.label || 'Unknown Case Type';
  SITS.forEach((sit) => {
    sit.opts.forEach((opt) => {
      if (opt.nos === nosCode) {
        label = opt.label;
      }
    });
  });

  // Build response
  const response: NosResponse = {
    nos_code: nosCode,
    name: label,
    total_cases: data.total || 0,
    plaintiff_win_rate: data.wr || 0,
    settlement_rate: data.sp || 0,
    median_settlement: data.rng?.md || 0,
    p25_settlement: data.rng?.lo || 0,
    p75_settlement: data.rng?.hi || 0,
    avg_duration_months: data.mo || 0,
    confidence: 'high',
    data_through: '2024-12-31',
    source: 'CourtListener / FJC Integrated Database',
  };

  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
