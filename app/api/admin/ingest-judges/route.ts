/**
 * POST /api/admin/ingest-judges — Trigger manual judge data ingestion
 * Protected by x-admin-secret header.
 * Calls the CourtListener judges ingestion pipeline.
 *
 * Request:
 *   POST /api/admin/ingest-judges
 *   Headers: x-admin-secret: <secret>
 *   Body: { courtlistener_token?: string }
 *
 * Response:
 *   { processed: number, errors: string[], duration_ms: number }
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { ingestJudges, ingestJudgesPage } from '../../../../lib/courtlistener-judges';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro allows up to 300s

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

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        error: 'Supabase not configured',
        processed: 0,
        errors: ['Missing Supabase credentials'],
        duration_ms: 0,
      }, { status: 500 });
    }

    // Parse request body for optional CourtListener token and cursor
    let courtlistenerToken: string | undefined;
    let cursor: string | undefined;
    let mode: string = 'page'; // default to single-page mode for Hobby plan
    try {
      const body = await req.json();
      courtlistenerToken = body?.courtlistener_token;
      cursor = body?.cursor;
      if (body?.mode === 'full') mode = 'full';
    } catch {
      // Body might be empty, that's fine
    }

    if (mode === 'full') {
      // Full ingestion — will timeout on Hobby plan
      const result = await ingestJudges(supabaseUrl, supabaseServiceKey, courtlistenerToken);
      return NextResponse.json(result);
    }

    // Single-page ingestion — fits within 10s timeout
    const result = await ingestJudgesPage(supabaseUrl, supabaseServiceKey, cursor, courtlistenerToken);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/ingest-judges] Error:', errorMessage);
    return NextResponse.json({
      error: 'Internal error',
      processed: 0,
      errors: [errorMessage],
      duration_ms: 0,
    }, { status: 500 });
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
