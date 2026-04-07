/**
 * POST /api/admin/calculate-judge-stats — Trigger judge statistics calculation
 * Protected by x-admin-secret header.
 * Calls the Supabase RPC function to calculate_judge_statistics().
 *
 * Request:
 *   POST /api/admin/calculate-judge-stats
 *   Headers: x-admin-secret: <secret>
 *   Body: (optional) { judge_id?: string }
 *
 * Response:
 *   { updated_rows: number, duration_ms: number }
 *   or if specific judge: { judge_id: string, statistics_count: number, duration_ms: number }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Strict rate limiting to prevent brute-force attacks on admin secret
  const ip = getClientIp(req.headers);
  const { success: rateLimitOk } = rateLimit(ip, { windowMs: 60000, maxRequests: 5 });
  if (!rateLimitOk) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Verify admin secret with timing-safe comparison
  const secret = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || !secret || !secureCompare(secret, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: 'Supabase not configured',
          updated_rows: 0,
          duration_ms: 0,
        },
        { status: 500 }
      );
    }

    // Parse optional judge_id from request body
    let targetJudgeId: string | null = null;
    try {
      const body = await req.json();
      if (body?.judge_id && typeof body.judge_id === 'string') {
        targetJudgeId = body.judge_id;
      }
    } catch {
      // Body might be empty, that's fine
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const startTime = Date.now();

    // Call the appropriate RPC function
    if (targetJudgeId) {
      // Calculate for a single judge
      const { data, error } = await supabase.rpc('calculate_judge_statistics_by_id', {
        p_judge_id: targetJudgeId,
      });

      if (error) {
        console.error('[api/admin/calculate-judge-stats] RPC error:', error);
        return NextResponse.json(
          {
            error: 'Failed to calculate statistics',
            details: error.message,
            duration_ms: Date.now() - startTime,
          },
          { status: 500 }
        );
      }

      const duration = Date.now() - startTime;
      const statsCount = Array.isArray(data) ? data.length : 0;

      return NextResponse.json({
        judge_id: targetJudgeId,
        statistics_count: statsCount,
        duration_ms: duration,
      });
    } else {
      // Calculate for all judges
      const { data, error } = await supabase.rpc('calculate_judge_statistics');

      if (error) {
        console.error('[api/admin/calculate-judge-stats] RPC error:', error);
        return NextResponse.json(
          {
            error: 'Failed to calculate statistics',
            details: error.message,
            duration_ms: Date.now() - startTime,
          },
          { status: 500 }
        );
      }

      const duration = Date.now() - startTime;
      const updatedRows = Array.isArray(data) ? data.length : 0;

      return NextResponse.json({
        updated_rows: updatedRows,
        duration_ms: duration,
      });
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/calculate-judge-stats] Error:', errorMessage);
    return NextResponse.json(
      {
        error: 'Internal error',
        details: errorMessage,
        duration_ms: 0,
      },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
