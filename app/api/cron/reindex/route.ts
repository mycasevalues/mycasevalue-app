export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { logger } from '../../../../lib/logger';

const log = logger.child({ route: 'cron/reindex' });

/**
 * GET /api/cron/reindex
 * Pings Google and Bing with updated sitemap URL.
 * Called weekly by Vercel Cron (vercel.json).
 */
export async function GET(request: NextRequest) {
  // Verify cron secret to prevent unauthorized triggers
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && (!authHeader || !secureCompare(authHeader.replace('Bearer ', ''), cronSecret))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sitemapUrl = 'https://www.mycasevalues.com/sitemap.xml';
  const results: Record<string, string> = {};

  // Ping Google
  try {
    const googleRes = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
      signal: AbortSignal.timeout(10000),
    });
    results.google = googleRes.ok ? 'ok' : `HTTP ${googleRes.status}`;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    results.google = `error: ${errorMessage}`;
    log.warn('Google sitemap ping failed', { error: errorMessage });
  }

  // Ping Bing
  try {
    const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
      signal: AbortSignal.timeout(10000),
    });
    results.bing = bingRes.ok ? 'ok' : `HTTP ${bingRes.status}`;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    results.bing = `error: ${errorMessage}`;
    log.warn('Bing sitemap ping failed', { error: errorMessage });
  }

  log.info('Reindex completed', results);

  return NextResponse.json({
    ok: true,
    sitemap: sitemapUrl,
    pings: results,
    timestamp: new Date().toISOString(),
  });
}
