/**
 * Pipeline Module Index
 *
 * Centralized exports for the ingestion, normalization, and enrichment pipeline.
 */

// Types
export type * from './types';

// Database operations
export {
  getOrCreateCourt,
  upsertCase,
  upsertCaseSource,
  insertParties,
  insertFilings,
  upsertOpinion,
  upsertSummary,
  upsertTags,
  createJob,
  updateJob,
  completeJob,
  ingestNormalizedRecord,
  getCasesNeedingSummary,
  getCaseForEnrichment,
  normalizeCaseName,
  buildExternalCaseKey,
} from './db';

// Runner
export {
  ingestSource,
  ingestAll,
  enrichSummaries,
  enrichTags,
  runFullPipeline,
} from './runner';

// AI Enrichment
export {
  generateSummary,
  generateTags,
  ENRICHMENT_CONFIG,
  setAIProvider,
} from './ai/enrichment';

// Source Connectors
export { courtlistenerConnector } from './sources/courtlistener';

// Data Access (frontend queries)
export {
  searchCases,
  getCaseDetail,
  getRecentCases,
  getTagDistribution,
  getIngestionHistory,
} from './data-access';

// Seed
export { seedPipelineData } from './seed';
