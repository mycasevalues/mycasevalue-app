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
export const maxDuration = 60; // Vercel Pro allows up to 300s, but use 60s for reliable chunk processing

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

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        error: 'Supabase not configured',
        processed: 0,
        errors: ['Missing Supabase credentials'],
        duration_ms: 0,
      }, { status: 500 });
    }

    // Parse request body for optional CourtListener token, cursor, and pagination params
    let courtlistenerToken: string | undefined;
    let cursor: string | undefined;
    let mode: string = 'page'; // default to single-page mode for Hobby plan
    let offset = 0;
    let limit = 50;
    try {
      const body = await req.json();
      courtlistenerToken = body?.courtlistener_token;
      cursor = body?.cursor;
      if (body?.mode === 'full') mode = 'full';
      if (body?.offset !== undefined) offset = parseInt(String(body.offset), 10) || 0;
      if (body?.limit !== undefined) limit = Math.min(parseInt(String(body.limit), 10) || 50, 50);
    } catch {
      // Body might be empty, that's fine
    }

    // Also accept query params for offset/limit
    const url = new URL(req.url);
    const queryOffset = url.searchParams.get('offset');
    const queryLimit = url.searchParams.get('limit');
    if (queryOffset) offset = parseInt(queryOffset, 10) || offset;
    if (queryLimit) limit = Math.min(parseInt(queryLimit, 10) || limit, 50);

    if (mode === 'full') {
      // Full ingestion — will timeout on Hobby plan
      const result = await ingestJudges(supabaseUrl, supabaseServiceKey, courtlistenerToken);
      return NextResponse.json(result);
    }

    // Single-page ingestion — fits within 10s timeout
    const result = await ingestJudgesPage(supabaseUrl, supabaseServiceKey, cursor, courtlistenerToken);

    // Enhance response with pagination info
    return NextResponse.json({
      ...result,
      processed: result.processed || 0,
      total: (result.total !== undefined) ? result.total : null,
      nextOffset: offset + limit,
      done: !result.cursor, // done if no cursor returned (no more pages)
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/admin/ingest-judges] Error:', errorMessage);
    return NextResponse.json({
      error: 'Internal error',
      processed: 0,
      errors: [errorMessage],
      duration_ms: 0,
      nextOffset: 0,
      done: false,
    }, { status: 500 });
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
