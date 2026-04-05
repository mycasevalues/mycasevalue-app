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
  } catch (err: any) {
    results.google = `error: ${err.message}`;
    log.warn('Google sitemap ping failed', { error: err.message });
  }

  // Ping Bing
  try {
    const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
      signal: AbortSignal.timeout(10000),
    });
    results.bing = bingRes.ok ? 'ok' : `HTTP ${bingRes.status}`;
  } catch (err: any) {
    results.bing = `error: ${err.message}`;
    log.warn('Bing sitemap ping failed', { error: err.message });
  }

  log.info('Reindex completed', results);

  return NextResponse.json({
    ok: true,
    sitemap: sitemapUrl,
    pings: results,
    timestamp: new Date().toISOString(),
  });
}
