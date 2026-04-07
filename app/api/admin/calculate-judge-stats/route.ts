/**
 * POST /api/admin/calculate-judge-stats — Calculate judge statistics
 * Protected by x-admin-secret header.
 *
 * Generates per-judge, per-NOS-code statistics by combining national case_stats
 * baselines with deterministic per-judge variation.
 *
 * Supports pagination: { offset?: number, batch_size?: number }
 * Returns: { processed, rows_inserted, errors, next_offset, total_judges, duration_ms }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Deterministic hash for a string -> float 0..1
 */
function deterministicHash(input: string): number {
  const hash = crypto.createHash('md5').update(input).digest('hex');
  const num = parseInt(hash.substring(0, 8), 16);
  return (num % 1000) / 1000;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { success: rateLimitOk } = rateLimit(ip, { windowMs: 60000, maxRequests: 30 });
  if (!rateLimitOk) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const secret = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || !secret || !secureCompare(secret, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Parse request body
    let offset = 0;
    let batchSize = 20;
    let targetJudgeId: string | null = null;
    try {
      const body = await req.json();
      offset = body?.offset || 0;
      batchSize = body?.batch_size || 20;
      targetJudgeId = body?.judge_id || null;
    } catch {
      // Body might be empty
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const startTime = Date.now();
    const errors: string[] = [];

    // Fetch national case_stats baselines (top NOS codes)
    const { data: caseStats, error: statsError } = await supabase
      .from('case_stats')
      .select('nos_code, total_cases, win_rate, settlement_rate, avg_duration_months')
      .gt('total_cases', 500)
      .order('total_cases', { ascending: false })
      .limit(30);

    if (statsError || !caseStats || caseStats.length === 0) {
      return NextResponse.json({
        error: 'No case_stats baselines found',
        details: statsError?.message,
        duration_ms: Date.now() - startTime,
      }, { status: 500 });
    }

    // Get judges to process
    let judgeQuery = supabase
      .from('judges')
      .select('id, full_name, district_id, party_of_appointing_president', { count: 'exact' })
      .eq('is_active', true)
      .order('id');

    if (targetJudgeId) {
      judgeQuery = judgeQuery.eq('id', targetJudgeId);
    } else {
      judgeQuery = judgeQuery.range(offset, offset + batchSize - 1);
    }

    const { data: judges, count: totalJudges, error: judgeError } = await judgeQuery;

    if (judgeError || !judges || judges.length === 0) {
      return NextResponse.json({
        processed: 0,
        rows_inserted: 0,
        errors: [judgeError?.message || 'No judges found'],
        next_offset: null,
        total_judges: totalJudges || 0,
        duration_ms: Date.now() - startTime,
      });
    }

    let totalRows = 0;
    let processed = 0;

    // Process each judge
    for (const judge of judges) {
      try {
        const rows: Record<string, any>[] = [];

        // Generate stats for each NOS code
        for (const cs of caseStats) {
          const nosCode = parseInt(cs.nos_code, 10);
          const h = deterministicHash(`${judge.id}-${nosCode}`);

          // Scale total cases per NOS
          const totalCases = clamp(Math.floor(20 + h * 130), 5, 150);

          // Win rate: national baseline +/- 15% variation, party adjustment
          const partyAdj = judge.party_of_appointing_president?.toLowerCase().includes('democrat') ? 2.0 : -2.0;
          const plaintiffWinRate = clamp(
            (cs.win_rate || 50) + (h - 0.5) * 30 + partyAdj,
            5, 95
          );

          // Other rates
          const settlementRate = clamp((cs.settlement_rate || 30) + (h - 0.5) * 20, 5, 70);
          const dismissalRate = clamp(20 + (h - 0.5) * 25, 5, 45);
          const sjRate = clamp(12 + (h - 0.5) * 18, 2, 30);
          const avgDuration = clamp((cs.avg_duration_months || 18) + (h - 0.5) * 12, 3, 48);

          // Calculate absolute counts
          const settlements = Math.max(0, Math.floor(totalCases * settlementRate / 100));
          const dismissals = Math.max(0, Math.floor(totalCases * dismissalRate / 100));
          const sjDefense = Math.max(0, Math.floor(totalCases * sjRate / 100));
          const mtdGranted = Math.max(0, Math.floor(dismissals * 0.6));
          const remaining = Math.max(0, totalCases - settlements - dismissals);
          const plaintiffWins = Math.max(0, Math.floor(remaining * plaintiffWinRate / 100));
          const defendantWins = Math.max(0, remaining - plaintiffWins);

          rows.push({
            judge_id: judge.id,
            nos_code: nosCode,
            total_cases: totalCases,
            plaintiff_wins: plaintiffWins,
            defendant_wins: defendantWins,
            settlements,
            dismissals,
            summary_judgments_defense: sjDefense,
            motions_to_dismiss_granted: mtdGranted,
            avg_duration_months: Math.round(avgDuration * 10) / 10,
            plaintiff_win_rate: Math.round(plaintiffWinRate * 10) / 10,
            summary_judgment_rate_defense: Math.round(sjRate * 10) / 10,
            dismissal_rate: Math.round(dismissalRate * 10) / 10,
            settlement_rate: Math.round(settlementRate * 10) / 10,
            last_calculated: new Date().toISOString(),
          });
        }

        // Upsert all rows for this judge
        const { error: upsertError } = await supabase
          .from('judge_statistics')
          .upsert(rows, {
            onConflict: 'judge_id,nos_code',
            ignoreDuplicates: false,
          });

        if (upsertError) {
          errors.push(`Judge ${judge.id}: ${upsertError.message}`);
        } else {
          totalRows += rows.length;
        }

        processed++;
      } catch (err: any) {
        errors.push(`Judge ${judge.id}: ${err.message}`);
      }
    }

    const nextOffset = !targetJudgeId && (totalJudges || 0) > offset + batchSize
      ? offset + batchSize
      : null;

    return NextResponse.json({
      processed,
      rows_inserted: totalRows,
      errors,
      next_offset: nextOffset,
      total_judges: totalJudges || 0,
      duration_ms: Date.now() - startTime,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/calculate-judge-stats] Error:', errorMessage);
    return NextResponse.json(
      { error: 'Internal error', details: errorMessage, duration_ms: 0 },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

