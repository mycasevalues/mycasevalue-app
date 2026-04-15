/**
 * Pipeline Runner
 *
 * Top-level orchestrator for ingestion and enrichment jobs.
 * Each function can be called from scripts, API routes, or cron jobs.
 *
 * Commands:
 * - ingestSource(sourceName, options) - Fetch and normalize from a source
 * - enrichSummaries(options)          - Generate AI summaries for cases
 * - enrichTags(options)               - Generate AI tags for cases
 * - runFullPipeline(options)          - Run all stages
 */

import type { FetchOptions, PipelineCounters, CaseTagRow } from './types';
import {
  createJob,
  completeJob,
  ingestNormalizedRecord,
  getCasesNeedingSummary,
  getCaseForEnrichment,
  upsertSummary,
  upsertTags,
} from './db';
import { courtlistenerConnector } from './sources/courtlistener';
import { generateSummary, generateTags, ENRICHMENT_CONFIG } from './ai/enrichment';

// ── Source Registry ──

const SOURCES: Record<string, typeof courtlistenerConnector> = {
  courtlistener: courtlistenerConnector,
  // TODO: Add more source connectors:
  // recap: recapConnector,
  // fjc: fjcConnector,
  // edgar: edgarConnector,
  // federal_register: federalRegisterConnector,
};

// ── Ingestion ──

/**
 * Ingest records from a single source.
 * Creates a job record, fetches, normalizes, and upserts.
 */
export async function ingestSource(
  sourceName: string,
  options: FetchOptions = {}
): Promise<PipelineCounters> {
  const connector = SOURCES[sourceName];
  if (!connector) {
    throw new Error(`Unknown source: ${sourceName}. Available: ${Object.keys(SOURCES).join(', ')}`);
  }

  console.log(`[pipeline] Starting ingestion from ${sourceName}...`);

  const jobId = await createJob({
    source_name: sourceName,
    job_type: options.since ? 'incremental' : 'backfill',
  });

  const counters: PipelineCounters = {
    fetched: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    for await (const raw of connector.fetchRecords(options)) {
      counters.fetched++;

      try {
        const normalized = connector.normalize(raw);
        if (!normalized) {
          counters.skipped++;
          continue;
        }

        const { inserted } = await ingestNormalizedRecord(normalized);
        if (inserted) {
          counters.inserted++;
        } else {
          counters.updated++;
        }
      } catch (err) {
        counters.errors++;
        console.error(
          `[pipeline] Error processing record ${raw.sourceId}:`,
          err instanceof Error ? err.message : err
        );
        // Continue processing remaining records
      }

      // Log progress every 100 records
      if (counters.fetched % 100 === 0) {
        console.log(
          `[pipeline] Progress: ${counters.fetched} fetched, ${counters.inserted} inserted, ${counters.updated} updated, ${counters.errors} errors`
        );
      }
    }

    await completeJob(jobId, counters);
    console.log(`[pipeline] Ingestion from ${sourceName} completed:`, counters);
    return counters;
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    await completeJob(jobId, counters, errMsg);
    console.error(`[pipeline] Ingestion from ${sourceName} failed:`, errMsg);
    throw err;
  }
}

/**
 * Ingest from all registered sources.
 */
export async function ingestAll(options: FetchOptions = {}): Promise<Record<string, PipelineCounters>> {
  const results: Record<string, PipelineCounters> = {};

  for (const sourceName of Object.keys(SOURCES)) {
    try {
      results[sourceName] = await ingestSource(sourceName, options);
    } catch (err) {
      console.error(`[pipeline] Source ${sourceName} failed, continuing with others...`);
      results[sourceName] = { fetched: 0, inserted: 0, updated: 0, skipped: 0, errors: 1 };
    }
  }

  return results;
}

// ── AI Enrichment ──

/**
 * Generate AI summaries for cases that don't have one yet.
 */
export async function enrichSummaries(options: { limit?: number } = {}): Promise<PipelineCounters> {
  const limit = options.limit ?? 50;
  console.log(`[pipeline] Starting summary enrichment (limit: ${limit})...`);

  const jobId = await createJob({
    source_name: 'ai_enrichment',
    job_type: 'enrich_summaries',
  });

  const counters: PipelineCounters = {
    fetched: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    const cases = await getCasesNeedingSummary(ENRICHMENT_CONFIG.promptVersion, limit);
    counters.fetched = cases.length;

    for (const c of cases) {
      try {
        const fullCase = await getCaseForEnrichment(c.id);

        const input = {
          caseId: c.id,
          caseName: c.case_name,
          docketNumber: c.docket_number,
          courtName: fullCase?.courts?.name,
          caseType: c.case_type,
          filingDate: c.filing_date,
          terminationDate: c.termination_date,
          status: c.status,
          natureOfSuit: c.nature_of_suit,
          parties: (fullCase?.parties ?? []).map((p: { party_name: string; role?: string }) => ({
            name: p.party_name,
            role: p.role,
          })),
          opinionExcerpt: fullCase?.opinionExcerpt,
        };

        const summary = await generateSummary(input);

        await upsertSummary({
          case_id: c.id,
          summary_type: 'overview',
          summary_text: summary.overview,
          model_name: ENRICHMENT_CONFIG.modelName,
          prompt_version: ENRICHMENT_CONFIG.promptVersion,
          confidence_notes: summary.confidenceNotes,
          generated_at: new Date().toISOString(),
        });

        counters.inserted++;
        console.log(`[pipeline] Summary generated for case ${c.id}: ${c.case_name.slice(0, 60)}`);
      } catch (err) {
        counters.errors++;
        console.error(`[pipeline] Summary failed for case ${c.id}:`, err instanceof Error ? err.message : err);
      }
    }

    await completeJob(jobId, counters);
    console.log(`[pipeline] Summary enrichment completed:`, counters);
    return counters;
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    await completeJob(jobId, counters, errMsg);
    throw err;
  }
}

/**
 * Generate AI tags for cases that don't have tags yet.
 */
export async function enrichTags(options: { limit?: number } = {}): Promise<PipelineCounters> {
  const limit = options.limit ?? 50;
  console.log(`[pipeline] Starting tag enrichment (limit: ${limit})...`);

  const jobId = await createJob({
    source_name: 'ai_enrichment',
    job_type: 'enrich_tags',
  });

  const counters: PipelineCounters = {
    fetched: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    // Reuse the same query for now (cases without summaries likely also lack tags)
    const cases = await getCasesNeedingSummary(ENRICHMENT_CONFIG.promptVersion, limit);
    counters.fetched = cases.length;

    for (const c of cases) {
      try {
        const fullCase = await getCaseForEnrichment(c.id);

        const input = {
          caseId: c.id,
          caseName: c.case_name,
          docketNumber: c.docket_number,
          courtName: fullCase?.courts?.name,
          caseType: c.case_type,
          filingDate: c.filing_date,
          terminationDate: c.termination_date,
          status: c.status,
          natureOfSuit: c.nature_of_suit,
          parties: (fullCase?.parties ?? []).map((p: { party_name: string; role?: string }) => ({
            name: p.party_name,
            role: p.role,
          })),
          opinionExcerpt: fullCase?.opinionExcerpt,
        };

        const result = await generateTags(input);

        if (result.tags.length > 0) {
          await upsertTags(
            result.tags.map((t) => ({
              case_id: c.id,
              tag: t.tag,
              tag_category: t.category as CaseTagRow['tag_category'],
              source: 'ai' as const,
              confidence: t.confidence,
            }))
          );
          counters.inserted += result.tags.length;
        } else {
          counters.skipped++;
        }
      } catch (err) {
        counters.errors++;
        console.error(`[pipeline] Tags failed for case ${c.id}:`, err instanceof Error ? err.message : err);
      }
    }

    await completeJob(jobId, counters);
    console.log(`[pipeline] Tag enrichment completed:`, counters);
    return counters;
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    await completeJob(jobId, counters, errMsg);
    throw err;
  }
}

// ── Full Pipeline ──

export async function runFullPipeline(options: FetchOptions = {}): Promise<void> {
  console.log('[pipeline] ═══════════════════════════════════════');
  console.log('[pipeline] Starting full pipeline run');
  console.log('[pipeline] ═══════════════════════════════════════');

  // 1. Ingest from all sources
  const ingestionResults = await ingestAll(options);
  console.log('[pipeline] Ingestion results:', ingestionResults);

  // 2. Generate summaries
  const summaryResults = await enrichSummaries({ limit: options.limit ?? 50 });
  console.log('[pipeline] Summary results:', summaryResults);

  // 3. Generate tags
  const tagResults = await enrichTags({ limit: options.limit ?? 50 });
  console.log('[pipeline] Tag results:', tagResults);

  console.log('[pipeline] ═══════════════════════════════════════');
  console.log('[pipeline] Full pipeline run completed');
  console.log('[pipeline] ═══════════════════════════════════════');
}
