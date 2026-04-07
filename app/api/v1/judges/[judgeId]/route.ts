export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getJudgeById } from '@/lib/judge-data-service';

const JudgeIdSchema = z.string().min(1);

interface JudgeProfileResponse {
  judge_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  district_id: string;
  circuit: string;
  office_address: string;
  email: string;
  phone: string;
  appointed_date: string;
  confirmation_date: string;
  appointing_president: string;
  overall_plaintiff_win_rate: number | null;
  total_cases_handled: number;
  statistics: Array<{
    nos_code: number;
    total_cases: number;
    plaintiff_wins: number;
    defendant_wins: number;
    plaintiff_win_rate: number;
  }>;
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
 * GET /api/v1/judges/[judgeId]
 * Returns judge profile and performance statistics
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { judgeId: string } }
) {
  // Check authentication
  const authHeader = request.headers.get('Authorization');
  if (!validateBearerToken(authHeader)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Missing or invalid Bearer token' },
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate judge ID
  const judgeValidation = JudgeIdSchema.safeParse(params.judgeId);
  if (!judgeValidation.success) {
    return NextResponse.json(
      { error: 'Invalid judge ID', message: 'Judge ID must be non-empty' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const judgeId = judgeValidation.data;

  try {
    // Query judge data service
    const judge = await getJudgeById(judgeId);

    if (!judge) {
      return NextResponse.json(
        { error: 'Not found', message: `No judge found with ID ${judgeId}` },
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build response
    const response: JudgeProfileResponse = {
      judge_id: judge.id,
      full_name: judge.full_name,
      first_name: judge.first_name || '',
      last_name: judge.last_name || '',
      district_id: judge.district_id || '',
      circuit: judge.circuit || '',
      office_address: judge.courtlistener_url || '',
      email: '',
      phone: '',
      appointed_date: judge.appointment_date || '',
      confirmation_date: '',
      appointing_president: judge.appointing_president || '',
      overall_plaintiff_win_rate: judge.overall_plaintiff_win_rate,
      total_cases_handled: judge.total_cases_handled || 0,
      statistics: (judge.statistics || []).map((stat: any) => ({
        nos_code: stat.nos_code,
        total_cases: stat.total_cases || 0,
        plaintiff_wins: stat.plaintiff_wins || 0,
        defendant_wins: stat.defendant_wins || 0,
        plaintiff_win_rate: stat.total_cases
          ? Math.round(((stat.plaintiff_wins || 0) / stat.total_cases) * 1000) / 10
          : 0,
      })),
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
  } catch (error) {
    console.error('[api/v1/judges] Error fetching judge:', error);
    return NextResponse.json(
      { error: 'Server error', message: 'Failed to fetch judge data' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
