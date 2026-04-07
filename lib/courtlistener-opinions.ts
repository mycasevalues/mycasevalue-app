/**
 * CourtListener Opinion Ingestion Pipeline
 * Fetches published opinions authored by federal judges and stores them
 * with AI-generated summaries for behavioral analysis.
 *
 * Rate limited to 10 requests per minute.
 * Supports resumable ingestion by tracking last processed judge_id.
 */

import { createClient } from '@supabase/supabase-js';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const CL_BASE = 'https://www.courtlistener.com/api/rest/v4';
const RATE_LIMIT_DELAY = 6000; // 10 requests per minute = 6s between requests
const TOP_OPINIONS_LIMIT = 20;

// ─── Type Definitions ────────────────────────────────────────────────

export interface CourtListenerOpinion {
  id: number;
  case_name: string;
  case_name_full?: string;
  caseName?: string;
  court: string;
  court_id?: string;
  date_filed: string;
  dateFiled?: string;
  plain_text?: string;
  html?: string;
  opinion_text?: string;
  snippet?: string;
  citation?: string[];
  citations?: string[];
  absolute_url?: string;
  cite_count?: number;
  citeCount?: number;
  judges?: string[];
  author?: string;
  per_curiam?: boolean;
}

export interface StoredOpinion {
  id: string;
  judge_id: string;
  courtlistener_opinion_id: number;
  case_name: string;
  court: string;
  date_filed: string;
  citation: string;
  ai_summary?: string;
  snippet?: string;
  opinion_url: string;
  created_at: string;
  updated_at: string;
}

export interface IngestionResult {
  processed: number;
  opinions_stored: number;
  summaries_generated: number;
  errors: string[];
  duration_ms: number;
  last_processed_judge_id?: string;
}

// ─── Mock Judges for Fallback ────────────────────────────────────────

const MOCK_JUDGES = [
  { id: 'john-smith-sdny', courtlistener_id: 1234, full_name: 'John Smith', district_id: 'new-york-southern' },
  { id: 'jane-doe-cand', courtlistener_id: 5678, full_name: 'Jane Doe', district_id: 'california-northern' },
  { id: 'robert-johnson-ilnd', courtlistener_id: 9101, full_name: 'Robert Johnson', district_id: 'illinois-northern' },
];

const MOCK_OPINIONS = [
  {
    id: 1,
    case_name: 'Smith v. State Bank Corp',
    court: 'sdny',
    date_filed: '2023-06-15',
    citation: '987 F.3d 654',
    snippet: 'This court finds that the defendant failed to exercise proper care in managing the account.',
    absolute_url: '/opinion/1/smith-v-state-bank/',
  },
  {
    id: 2,
    case_name: 'Johnson Industries v. EPA',
    court: 'ndca',
    date_filed: '2023-05-10',
    citation: '456 F.3d 789',
    snippet: 'The environmental impact assessment was thorough and complied with all statutory requirements.',
    absolute_url: '/opinion/2/johnson-v-epa/',
  },
  {
    id: 3,
    case_name: 'Williams Trust v. Federal Reserve',
    court: 'ilnd',
    date_filed: '2023-04-20',
    citation: '321 F.3d 456',
    snippet: 'The monetary policy decision was within the Board of Governors discretionary authority.',
    absolute_url: '/opinion/3/williams-v-fed/',
  },
];

// ─── Opinion Fetching ─────────────────────────────────────────────────

/**
 * Fetch opinions for a judge using CL v4 search endpoint.
 * The search endpoint returns cluster-level data (case_name, court, date_filed, etc.)
 * which the /opinions/ endpoint does not include.
 * Uses judge last name + court to match opinions.
 */
export async function fetchJudgeOpinions(
  clJudgeId: number,
  courtlistenerToken?: string,
  judgeName?: string,
): Promise<CourtListenerOpinion[]> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'User-Agent': 'MyCaseValue/1.0',
    };
    if (courtlistenerToken) {
      headers['Authorization'] = `Token ${courtlistenerToken}`;
    }

    // Strategy 1: Use search endpoint with judge name (returns cluster-level data)
    if (judgeName) {
      // Extract last name for search
      const nameParts = judgeName.trim().split(/\s+/);
      const lastName = nameParts[nameParts.length - 1];

      const searchParams = new URLSearchParams({
        type: 'o',
        judge: lastName,
        court_jurisdiction: 'FD', // Federal District courts
        page_size: TOP_OPINIONS_LIMIT.toString(),
        format: 'json',
      });

      const searchUrl = `${CL_BASE}/search/?${searchParams}`;
      const searchRes = await fetch(searchUrl, { headers });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const results = searchData.results || [];

        // Map search results to our CourtListenerOpinion interface
        return results.map((r: any) => ({
          id: r.cluster_id || r.id,
          case_name: r.caseName || r.case_name || 'Unknown Case',
          court: r.court || '',
          court_id: r.court_id || '',
          date_filed: r.dateFiled || r.date_filed || '',
          snippet: r.opinions?.[0]?.snippet || '',
          absolute_url: r.absolute_url || '',
          cite_count: r.citeCount || 0,
          judges: r.judge ? [r.judge] : [],
          author: r.opinions?.[0]?.author_id?.toString() || '',
        }));
      }
    }

    // Strategy 2: Fallback to REST opinions endpoint with author filter
    const params = new URLSearchParams({
      author: clJudgeId.toString(),
      order_by: '-date_created',
      page_size: TOP_OPINIONS_LIMIT.toString(),
      format: 'json',
    });

    const url = `${CL_BASE}/opinions/?${params}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.warn(`CourtListener API error for judge ${clJudgeId}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching opinions for judge ${clJudgeId}:`, error);
    return [];
  }
}

// ─── AI Summary Generation ────────────────────────────────────────────

/**
 * Generate a one-sentence AI summary of an opinion using Claude Haiku
 * Falls back to empty string if API not available
 */
export async function generateOpinionSummary(
  caseName: string,
  court: string,
  year: number,
  opinionText?: string,
  anthropicApiKey?: string,
): Promise<string> {
  try {
    // Check if API key is available (from env or parameter)
    if (!process.env.ANTHROPIC_API_KEY && !anthropicApiKey) {
      // API key not provided, return empty
      return '';
    }

    const textToAnalyze = opinionText
      ? opinionText.slice(0, 1000) // First 1000 chars for cost efficiency
      : `${caseName} from ${court} court in ${year}`;

    const result = await generateText({
      model: anthropic('claude-3-5-haiku-20241022'),
      system:
        'You are a legal analyst. Generate a concise one-sentence summary of a court opinion in under 20 words.',
      prompt: `Summarize this opinion: ${textToAnalyze}`,
      maxOutputTokens: 150,
    });

    return result.text.trim();
  } catch (error) {
    console.warn('Error generating AI summary:', error);
    return '';
  }
}

// ─── Ingestion Functions ──────────────────────────────────────────────

/**
 * Ingest opinions for a single judge — fetches from CourtListener and upserts to Supabase
 */
export async function ingestOpinionsForJudge(
  judgeId: string,
  clJudgeId: number,
  supabase: any,
  courtlistenerToken?: string,
  anthropicApiKey?: string,
  judgeName?: string,
): Promise<{ stored: number; summariesGenerated: number; errors: string[] }> {
  const errors: string[] = [];
  let stored = 0;
  let summariesGenerated = 0;

  try {
    // Fetch opinions from CourtListener (using search endpoint with judge name)
    const opinions = await fetchJudgeOpinions(clJudgeId, courtlistenerToken, judgeName);

    if (opinions.length === 0) {
      return { stored: 0, summariesGenerated: 0, errors };
    }

    // Process and upsert each opinion to judge_opinions table
    for (const opinion of opinions) {
      try {
        const opinionId = opinion.id;
        if (!opinionId) continue;

        const caseName = opinion.case_name || opinion.caseName || 'Unknown Case';
        const court = opinion.court || opinion.court_id || 'Unknown Court';
        const dateFiled = opinion.date_filed || opinion.dateFiled || new Date().toISOString();
        const year = new Date(dateFiled).getFullYear();
        const citeCount = opinion.cite_count || opinion.citeCount || 0;
        const absoluteUrl = opinion.absolute_url || '';

        // Map to judge_opinions table schema
        const record: Record<string, any> = {
          judge_id: judgeId,
          courtlistener_opinion_id: opinionId,
          case_name: caseName,
          court: court,
          year: year,
          citation_count: citeCount,
          courtlistener_url: absoluteUrl ? `https://www.courtlistener.com${absoluteUrl}` : null,
        };

        // Upsert to Supabase (unique on judge_id + courtlistener_opinion_id)
        const { error: upsertError } = await supabase
          .from('judge_opinions')
          .upsert(record, {
            onConflict: 'judge_id,courtlistener_opinion_id',
            ignoreDuplicates: false,
          });

        if (upsertError) {
          // If unique constraint doesn't exist, try insert with conflict handling
          const { error: insertError } = await supabase
            .from('judge_opinions')
            .insert(record);

          if (insertError && !insertError.message?.includes('duplicate')) {
            errors.push(`Upsert error for opinion ${opinionId}: ${insertError.message}`);
            continue;
          }
        }

        stored++;
      } catch (err: any) {
        errors.push(`Opinion processing error: ${err.message}`);
      }
    }

    return { stored, summariesGenerated, errors };
  } catch (error: any) {
    errors.push(`Judge opinion ingestion error: ${error.message}`);
    return { stored: 0, summariesGenerated: 0, errors };
  }
}

/**
 * Main ingestion function — processes a batch of active judges with pagination support
 * @param offset - Starting offset for judge batch (default 0)
 * @param batchSize - Number of judges to process per call (default 5)
 */
export async function ingestJudgeOpinions(
  supabaseUrl: string,
  supabaseServiceKey: string,
  courtlistenerToken?: string,
  anthropicApiKey?: string,
  offset: number = 0,
  batchSize: number = 5,
): Promise<IngestionResult & { next_offset?: number | null; total_judges?: number }> {
  const startTime = Date.now();
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const errors: string[] = [];
  let processed = 0;
  let opinionsStored = 0;
  let summariesGenerated = 0;
  let lastProcessedJudgeId: string | undefined;

  try {
    // Get batch of active judges with courtlistener_id from database
    const { data: judges, count, error: queryError } = await supabase
      .from('judges')
      .select('id, courtlistener_id, full_name', { count: 'exact' })
      .eq('is_active', true)
      .not('courtlistener_id', 'is', null)
      .gt('courtlistener_id', 0)
      .order('id')
      .range(offset, offset + batchSize - 1);

    if (queryError) {
      errors.push(`Query error: ${queryError.message}`);
      return {
        processed: 0,
        opinions_stored: 0,
        summaries_generated: 0,
        errors,
        duration_ms: Date.now() - startTime,
        next_offset: null,
        total_judges: 0,
      };
    }

    const totalJudges = count || 0;
    const judgeList = judges || [];

    if (judgeList.length === 0) {
      return {
        processed: 0,
        opinions_stored: 0,
        summaries_generated: 0,
        errors,
        duration_ms: Date.now() - startTime,
        next_offset: null,
        total_judges: totalJudges,
      };
    }

    // Process each judge in the batch
    for (let i = 0; i < judgeList.length; i++) {
      const judge = judgeList[i];

      try {
        const judgeId = judge.id;
        const clJudgeId = judge.courtlistener_id;

        if (!clJudgeId || clJudgeId === 0) {
          continue;
        }

        const result = await ingestOpinionsForJudge(
          judgeId,
          clJudgeId,
          supabase,
          courtlistenerToken,
          undefined, // anthropicApiKey not needed for batch
          judge.full_name,
        );

        opinionsStored += result.stored;
        summariesGenerated += result.summariesGenerated;
        if (result.errors.length > 0) errors.push(...result.errors);
        processed++;
        lastProcessedJudgeId = judgeId;

        // Rate limit between CourtListener requests
        if (i < judgeList.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_DELAY));
        }
      } catch (err: any) {
        errors.push(`Judge ${judge.id} failed: ${err.message}`);
      }
    }

    // Determine if there are more judges to process
    const nextOffset = offset + batchSize < totalJudges ? offset + batchSize : null;

    return {
      processed,
      opinions_stored: opinionsStored,
      summaries_generated: summariesGenerated,
      errors,
      duration_ms: Date.now() - startTime,
      last_processed_judge_id: lastProcessedJudgeId,
      next_offset: nextOffset,
      total_judges: totalJudges,
    };
  } catch (err: any) {
    errors.push(`Fatal ingestion error: ${err.message}`);
    return {
      processed: 0,
      opinions_stored: 0,
      summaries_generated: 0,
      errors,
      duration_ms: Date.now() - startTime,
      next_offset: null,
      total_judges: 0,
    };
  }
}
