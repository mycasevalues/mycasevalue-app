/**
 * POST /api/admin/generate-judge-analysis — Generate or refresh judge behavioral analysis
 * Protected by x-admin-secret header.
 *
 * Supports both single-judge and batch modes:
 *   Single: { judge_id: string }
 *   Batch:  { offset?: number, batch_size?: number }
 *
 * Response:
 *   {
 *     processed: number,
 *     generated: number,
 *     cached: number,
 *     errors: string[],
 *     next_offset: number | null,
 *     total_judges: number,
 *     duration_ms: number
 *   }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { generateJudgeAnalysis } from '../../../../lib/judge-ai-analysis';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

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
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured', processed: 0, generated: 0, cached: 0, errors: ['Missing Supabase credentials'], duration_ms: 0 },
        { status: 500 },
      );
    }

    // Parse request body
    let judgeId: string | undefined;
    let offset = 0;
    let batchSize = 10;

    try {
      const body = await req.json();
      judgeId = body?.judge_id;
      offset = body?.offset || 0;
      batchSize = body?.batch_size || 10;
    } catch {
      // Body might be empty
    }

    const startTime = Date.now();
    const errors: string[] = [];

    // Single judge mode
    if (judgeId) {
      const result = await generateJudgeAnalysis(judgeId, supabaseUrl, supabaseServiceKey, anthropicApiKey);
      return NextResponse.json({
        processed: 1,
        generated: result.cached ? 0 : (result.success ? 1 : 0),
        cached: result.cached ? 1 : 0,
        errors: result.errors || [],
        next_offset: null,
        total_judges: 1,
        duration_ms: Date.now() - startTime,
      });
    }

    // Batch mode: get active judges with pagination
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: judges, count: totalJudges, error: queryError } = await supabase
      .from('judges')
      .select('id', { count: 'exact' })
      .eq('is_active', true)
      .order('id')
      .range(offset, offset + batchSize - 1);

    if (queryError) {
      return NextResponse.json({
        processed: 0, generated: 0, cached: 0,
        errors: [queryError.message],
        next_offset: null, total_judges: 0,
        duration_ms: Date.now() - startTime,
      }, { status: 500 });
    }

    if (!judges || judges.length === 0) {
      return NextResponse.json({
        processed: 0, generated: 0, cached: 0, errors: [],
        next_offset: null, total_judges: totalJudges || 0,
        duration_ms: Date.now() - startTime,
      });
    }

    let generated = 0;
    let cached = 0;
    let processed = 0;

    for (const judge of judges) {
      try {
        const result = await generateJudgeAnalysis(judge.id, supabaseUrl, supabaseServiceKey, anthropicApiKey);
        if (result.success) {
          if (result.cached) {
            cached++;
          } else {
            generated++;
          }
        }
        if (result.errors && result.errors.length > 0) {
          errors.push(...result.errors.map(e => `${judge.id}: ${e}`));
        }
        processed++;
      } catch (err: any) {
        errors.push(`${judge.id}: ${err.message}`);
      }
    }

    const hasMore = (totalJudges || 0) > offset + batchSize;

    return NextResponse.json({
      processed,
      generated,
      cached,
      errors,
      next_offset: hasMore ? offset + batchSize : null,
      total_judges: totalJudges || 0,
      duration_ms: Date.now() - startTime,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/generate-judge-analysis] Error:', errorMessage);
    return NextResponse.json(
      { error: 'Internal error', processed: 0, generated: 0, cached: 0, errors: [errorMessage], duration_ms: 0 },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
