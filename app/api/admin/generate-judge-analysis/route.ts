/**
 * POST /api/admin/generate-judge-analysis — Generate or refresh judge behavioral analysis
 * Protected by x-admin-secret header.
 *
 * Request:
 *   POST /api/admin/generate-judge-analysis
 *   Headers: x-admin-secret: <secret>
 *   Body: { judge_id: string }
 *
 * Response:
 *   {
 *     success: boolean,
 *     analysis?: {
 *       judge_id: string,
 *       writing_style: string,
 *       plaintiff_tendencies: string,
 *       motion_approach: string,
 *       notable_patterns: string,
 *       caveats: string,
 *       opinion_count: number,
 *       last_analysis_at: string,
 *       created_at: string,
 *       updated_at: string
 *     },
 *     cached: boolean,
 *     errors: string[]
 *   }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { generateJudgeAnalysis } from '../../../../lib/judge-ai-analysis';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Strict rate limiting to prevent brute-force attacks on admin secret
  const ip = getClientIp(req.headers);
  const { success: rateLimitOk } = rateLimit(ip, { windowMs: 60000, maxRequests: 5 });
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
        {
          error: 'Supabase not configured',
          success: false,
          cached: false,
          errors: ['Missing Supabase credentials'],
        },
        { status: 500 },
      );
    }

    // Parse request body
    let judgeId: string | undefined;

    try {
      const body = await req.json();
      judgeId = body?.judge_id;
    } catch {
      // Body might be empty
    }

    if (!judgeId) {
      return NextResponse.json(
        {
          error: 'Missing judge_id in request body',
          success: false,
          cached: false,
          errors: ['judge_id is required'],
        },
        { status: 400 },
      );
    }

    // Generate or retrieve analysis
    const result = await generateJudgeAnalysis(
      judgeId,
      supabaseUrl,
      supabaseServiceKey,
      anthropicApiKey,
    );

    // Return appropriate status code
    const statusCode = result.success ? 200 : result.cached ? 200 : 500;

    return NextResponse.json(result, { status: statusCode });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/generate-judge-analysis] Error:', errorMessage);
    return NextResponse.json(
      {
        error: 'Internal error',
        success: false,
        cached: false,
        errors: [errorMessage],
      },
      { status: 500 },
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
