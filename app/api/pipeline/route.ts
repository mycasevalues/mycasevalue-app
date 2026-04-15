/**
 * Pipeline API Route
 *
 * POST /api/pipeline
 * Body: { command: string, options?: { limit?: number, since?: string } }
 *
 * Protected by ADMIN_DATA_QUALITY_TOKEN.
 * Triggers pipeline operations from the admin dashboard or cron jobs.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ingestSource,
  ingestAll,
  enrichSummaries,
  enrichTags,
  runFullPipeline,
  seedPipelineData,
} from '@/lib/pipeline';

const ADMIN_TOKEN = process.env.ADMIN_SECRET || process.env.ADMIN_DATA_QUALITY_TOKEN;

export async function POST(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { command, options = {} } = body;

    let result: unknown;

    switch (command) {
      case 'ingest:courtlistener':
        result = await ingestSource('courtlistener', options);
        break;
      case 'ingest:all':
        result = await ingestAll(options);
        break;
      case 'enrich:summaries':
        result = await enrichSummaries(options);
        break;
      case 'enrich:tags':
        result = await enrichTags(options);
        break;
      case 'run:full':
        await runFullPipeline(options);
        result = { status: 'completed' };
        break;
      case 'seed':
        await seedPipelineData();
        result = { status: 'seeded' };
        break;
      default:
        return NextResponse.json(
          { error: `Unknown command: ${command}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ ok: true, command, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[api/pipeline] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
