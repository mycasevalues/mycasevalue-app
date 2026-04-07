/**
 * POST /api/admin/ingest-opinions — Trigger opinion ingestion for judges
 * Protected by x-admin-secret header.
 *
 * Request:
 *   POST /api/admin/ingest-opinions
 *   Headers: x-admin-secret: <secret>
 *   Body: { judge_id?: string, resume_from?: string, courtlistener_token?: string }
 *
 * Response:
 *   {
 *     processed: number,
 *     opinions_stored: number,
 *     summaries_generated: number,
 *     errors: string[],
 *     duration_ms: number,
 *     last_processed_judge_id?: string
 *   }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { ingestJudgeOpinions, ingestOpinionsForJudge } from '../../../../lib/courtlistener-opinions';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  // Strict rate limiting to prevent brute-force attacks on admin secret
  const ip = getClientIp(req.headers);
  const { success: rateLimitOk } = rateLimit(ip, { windowMs: 60000, maxRequests: 60 });
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
    const courtlistenerToken = process.env.COURTLISTENER_API_TOKEN;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: 'Supabase not configured',
          processed: 0,
          opinions_stored: 0,
          summaries_generated: 0,
          errors: ['Missing Supabase credentials'],
          duration_ms: 0,
        },
        { status: 500 },
      );
    }

    // Parse request body
    let judgeId: string | undefined;
    let offset: number = 0;
    let batchSize: number = 5;
    let bodyToken: string | undefined;

    try {
      const body = await req.json();
      judgeId = body?.judge_id;
      offset = body?.offset || 0;
      batchSize = body?.batch_size || 5;
      bodyToken = body?.courtlistener_token;
    } catch {
      // Body might be empty, that's fine
    }

    const token = bodyToken || courtlistenerToken;

    // If specific judge requested, process only that judge
    if (judgeId) {
      const supabase: any = createClient(supabaseUrl, supabaseServiceKey);

      try {
        const { data: judge, error: judgeError } = await supabase
          .from('judges')
          .select('id, courtlistener_id')
          .eq('id', judgeId)
          .single();

        if (judgeError || !judge) {
          return NextResponse.json(
            {
              error: 'Judge not found',
              processed: 0,
              opinions_stored: 0,
              summaries_generated: 0,
              errors: [judgeError?.message || 'Judge not found'],
              duration_ms: 0,
            },
            { status: 404 },
          );
        }

        const startTime = Date.now();
        const result = await ingestOpinionsForJudge(
          (judge as any).id,
          (judge as any).courtlistener_id,
          supabase,
          token,
          anthropicApiKey,
        );

        return NextResponse.json({
          processed: 1,
          opinions_stored: result.stored,
          summaries_generated: result.summariesGenerated,
          errors: result.errors,
          duration_ms: Date.now() - startTime,
          judge_id: judgeId,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return NextResponse.json(
          {
            error: 'Ingestion failed',
            processed: 0,
            opinions_stored: 0,
            summaries_generated: 0,
            errors: [errorMessage],
            duration_ms: 0,
          },
          { status: 500 },
        );
      }
    }

    // Otherwise run paginated batch ingestion
    const result = await ingestJudgeOpinions(
      supabaseUrl,
      supabaseServiceKey,
      token,
      anthropicApiKey,
      offset,
      batchSize,
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/ingest-opinions] Error:', errorMessage);
    return NextResponse.json(
      {
        error: 'Internal error',
        processed: 0,
        opinions_stored: 0,
        summaries_generated: 0,
        errors: [errorMessage],
        duration_ms: 0,
      },
      { status: 500 },
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
