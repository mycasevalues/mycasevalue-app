#!/usr/bin/env npx tsx
/**
 * Pipeline CLI
 *
 * Usage:
 *   npx tsx scripts/pipeline.ts <command> [options]
 *
 * Commands:
 *   ingest:courtlistener [--limit N] [--since YYYY-MM-DD]   Ingest from CourtListener
 *   ingest:all [--limit N] [--since YYYY-MM-DD]             Ingest from all sources
 *   enrich:summaries [--limit N]                             Generate AI summaries
 *   enrich:tags [--limit N]                                  Generate AI tags
 *   enrich:all [--limit N]                                   Generate summaries + tags
 *   run:full [--limit N] [--since YYYY-MM-DD]                Full pipeline
 *   seed                                                     Insert sample development data
 *
 * Environment:
 *   Requires .env.local with Supabase and API credentials.
 *   Load with: npx dotenv-cli -e .env.local -- npx tsx scripts/pipeline.ts <command>
 *
 *   Or export vars directly before running.
 */

import {
  ingestSource,
  ingestAll,
  enrichSummaries,
  enrichTags,
  runFullPipeline,
} from '../lib/pipeline/runner';
import { seedPipelineData } from '../lib/pipeline/seed';

// ── Arg parsing ──

const args = process.argv.slice(2);
const command = args[0];

function getFlag(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
}

const limit = getFlag('limit') ? parseInt(getFlag('limit')!, 10) : undefined;
const since = getFlag('since');

// ── Command dispatch ──

async function main() {
  console.log(`[pipeline-cli] Command: ${command}`);
  console.log(`[pipeline-cli] Options: limit=${limit ?? 'default'}, since=${since ?? 'none'}`);
  console.log('');

  const startTime = Date.now();

  try {
    switch (command) {
      case 'ingest:courtlistener':
        await ingestSource('courtlistener', { limit, since });
        break;

      case 'ingest:all':
        await ingestAll({ limit, since });
        break;

      case 'enrich:summaries':
        await enrichSummaries({ limit });
        break;

      case 'enrich:tags':
        await enrichTags({ limit });
        break;

      case 'enrich:all':
        await enrichSummaries({ limit });
        await enrichTags({ limit });
        break;

      case 'run:full':
        await runFullPipeline({ limit, since });
        break;

      case 'seed':
        await seedPipelineData();
        break;

      default:
        console.error(`Unknown command: ${command}`);
        console.error('');
        console.error('Available commands:');
        console.error('  ingest:courtlistener  Ingest from CourtListener API');
        console.error('  ingest:all            Ingest from all sources');
        console.error('  enrich:summaries      Generate AI case summaries');
        console.error('  enrich:tags           Generate AI case tags');
        console.error('  enrich:all            Generate summaries + tags');
        console.error('  run:full              Full pipeline (ingest + enrich)');
        console.error('  seed                  Insert sample development data');
        console.error('');
        console.error('Options:');
        console.error('  --limit N             Max records to process');
        console.error('  --since YYYY-MM-DD    Only fetch records modified after date');
        process.exit(1);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n[pipeline-cli] Completed in ${elapsed}s`);
  } catch (err) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`\n[pipeline-cli] Failed after ${elapsed}s:`, err);
    process.exit(1);
  }
}

main();
