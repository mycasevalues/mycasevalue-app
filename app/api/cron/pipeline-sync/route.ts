/**
 * Daily Pipeline Sync Cron
 *
 * GET /api/cron/pipeline-sync
 *
 * Runs daily at 7am UTC via Vercel Cron.
 * 1. Ingests recent cases from CourtListener (last 7 days, limit 100)
 * 2. Generates AI summaries for new cases (limit 20)
 * 3. Generates AI tags for new cases (limit 20)
 *
 * Protected by CRON_SECRET header (Vercel injects this automatically).
 */

import { NextRequest, NextResponse } from 'next/server';
import { ingestSource, enrichSummaries, enrichTags } from '@/lib/pipeline';

export const maxDuration = 300; // 5 minute timeout for cron

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, unknown> = {};
  const startTime = Date.now();

  try {
    // 1. Ingest recent cases from CourtListener
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    try {
      results.ingestion = await ingestSource('courtlistener', {
        since: sevenDaysAgo,
        limit: 100,
      });
    } catch (err) {
      results.ingestion = { error: err instanceof Error ? err.message : String(err) };
      console.error('[cron/pipeline-sync] Ingestion error:', err);
    }

    // 2. Generate summaries for cases without them
    try {
      results.summaries = await enrichSummaries({ limit: 20 });
    } catch (err) {
      results.summaries = { error: err instanceof Error ? err.message : String(err) };
      console.error('[cron/pipeline-sync] Summary error:', err);
    }

    // 3. Generate tags for cases without them
    try {
      results.tags = await enrichTags({ limit: 20 });
    } catch (err) {
      results.tags = { error: err instanceof Error ? err.message : String(err) };
      console.error('[cron/pipeline-sync] Tag error:', err);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    return NextResponse.json({
      ok: true,
      elapsed: `${elapsed}s`,
      results,
    });
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`[cron/pipeline-sync] Failed after ${elapsed}s:`, err);
    return NextResponse.json(
      { error: 'Pipeline sync failed', elapsed: `${elapsed}s` },
      { status: 500 }
    );
  }
}
