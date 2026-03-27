/**
 * CourtListener API Ingestion Service
 *
 * This module provides data ingestion services for pulling case law opinions,
 * dockets, and judge data from the CourtListener REST API (v4).
 *
 * API Documentation: https://www.courtlistener.com/api/rest/v4/
 * Rate Limit: 5,000 requests/hour for authenticated users
 */

import type { CaseStats, CircuitStats } from '../supabase';

// Configuration
const BASE_URL = 'https://www.courtlistener.com/api/rest/v4';
const API_TOKEN = process.env.COURTLISTENER_API_TOKEN;

// Rate limiting state
let requestCount = 0;
let requestWindowStart = Date.now();
const RATE_LIMIT = 5000;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Interface for CourtListener opinion data
 */
interface CourtListenerOpinion {
  id: number;
  absolute_url: string;
  resource_uri: string;
  case_name: string;
  case_name_short: string;
  judges: string[];
  docket_number: string;
  court: string;
  date_filed: string;
  date_filed_is_approximate: boolean;
  document_type: string;
  sha1: string;
  page_count: number | null;
  opinion_count: number;
  scdb_id: string | null;
}

/**
 * Interface for CourtListener judge data
 */
interface CourtListenerJudge {
  id: number;
  absolute_url: string;
  name_first: string;
  name_middle: string;
  name_last: string;
  name_suffix: string;
  date_dob: string | null;
  date_granularity_dob: number;
  date_dod: string | null;
  date_granularity_dod: number;
  gender: string;
  religion: string;
  race: string[];
  court: string;
  position_type: string;
  judicial_committee_action: string;
  political_affiliation: string;
  source: string;
  discrepancies: string;
  ba_degree_year: number | null;
  law_school_year: number | null;
}

/**
 * Interface for API search response
 */
interface APISearchResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Check and enforce rate limiting
 * @throws Error if rate limit would be exceeded
 */
function enforceRateLimit(): void {
  const now = Date.now();

  // Reset window if an hour has passed
  if (now - requestWindowStart > WINDOW_MS) {
    requestCount = 0;
    requestWindowStart = now;
  }

  if (requestCount >= RATE_LIMIT) {
    const msUntilReset = WINDOW_MS - (now - requestWindowStart);
    throw new Error(
      `CourtListener rate limit exceeded. Reset in ${Math.ceil(msUntilReset / 1000)} seconds.`
    );
  }

  requestCount++;
}

/**
 * Fetch data from CourtListener API with authentication and error handling
 *
 * @param endpoint - API endpoint path (e.g., '/search/')
 * @param params - Query parameters
 * @returns Parsed JSON response
 * @throws Error if request fails or API returns error
 */
async function fetchCourtListenerAPI<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  enforceRateLimit();

  const url = new URL(`${BASE_URL}${endpoint}`);

  // Add query parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers: HeadersInit = {
    Authorization: `Token ${API_TOKEN}`,
    'User-Agent': 'CaseCheck-Ingestion/1.0',
  };

  let retries = 3;
  let lastError: Error | null = null;

  while (retries > 0) {
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
      });

      // Handle HTTP errors
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid CourtListener API token');
        }
        if (response.status === 429) {
          throw new Error('Rate limited by CourtListener API');
        }
        if (response.status >= 500) {
          throw new Error(
            `CourtListener server error: ${response.status} ${response.statusText}`
          );
        }
        throw new Error(
          `CourtListener API error: ${response.status} ${response.statusText}`
        );
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on authentication errors
      if (lastError.message.includes('Unauthorized')) {
        throw lastError;
      }

      retries--;

      // Exponential backoff
      if (retries > 0) {
        const delayMs = Math.pow(2, 3 - retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Failed to fetch from CourtListener API');
}

/**
 * Normalize a CourtListener opinion into a structured format
 *
 * @param opinion - Raw opinion data from API
 * @returns Normalized opinion object
 */
function normalizeOpinion(opinion: CourtListenerOpinion): {
  id: string;
  case_name: string;
  court: string;
  judges: string;
  date_filed: string;
  document_type: string;
  opinion_count: number;
  page_count: number | null;
} {
  return {
    id: `courtlistener_${opinion.id}`,
    case_name: opinion.case_name || opinion.case_name_short || 'Unknown',
    court: opinion.court || 'Unknown',
    judges: (opinion.judges || []).join('; '),
    date_filed: opinion.date_filed || new Date().toISOString().split('T')[0],
    document_type: opinion.document_type || 'opinion',
    opinion_count: opinion.opinion_count || 1,
    page_count: opinion.page_count,
  };
}

/**
 * Normalize a CourtListener judge into a structured format
 *
 * @param judge - Raw judge data from API
 * @returns Normalized judge object
 */
function normalizeJudge(judge: CourtListenerJudge): {
  id: string;
  name: string;
  court: string;
  position_type: string;
  political_affiliation: string | null;
  gender: string | null;
  race: string | null;
} {
  const nameparts = [
    judge.name_first,
    judge.name_middle,
    judge.name_last,
    judge.name_suffix,
  ].filter(Boolean);

  return {
    id: `courtlistener_judge_${judge.id}`,
    name: nameparts.join(' '),
    court: judge.court || 'Unknown',
    position_type: judge.position_type || 'Unknown',
    political_affiliation: judge.political_affiliation || null,
    gender: judge.gender || null,
    race: judge.race?.length ? judge.race[0] : null,
  };
}

/**
 * Fetch recent opinions for a specific case type (NOS code)
 *
 * @param nosCode - Nature of Suit code (e.g., 'o' for opinions)
 * @param limit - Maximum number of opinions to fetch (default: 100, max: 10000)
 * @returns Array of normalized opinion data
 *
 * @example
 * const opinions = await fetchRecentOpinions('o', 100);
 */
export async function fetchRecentOpinions(
  nosCode: string = 'o',
  limit: number = 100
): Promise<
  Array<{
    id: string;
    case_name: string;
    court: string;
    judges: string;
    date_filed: string;
    document_type: string;
    opinion_count: number;
    page_count: number | null;
  }>
> {
  try {
    const actualLimit = Math.min(limit, 10000);
    const response = await fetchCourtListenerAPI<
      APISearchResponse<CourtListenerOpinion>
    >('/search/', {
      type: nosCode,
      order_by: '-date_filed',
      limit: actualLimit,
      format: 'json',
    });

    return response.results.map(normalizeOpinion);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch recent opinions: ${message}`);
  }
}

/**
 * Fetch judge data for a specific court
 *
 * @param court - Court identifier (e.g., 'ca1' for First Circuit, 'scotus' for Supreme Court)
 * @returns Array of normalized judge data
 *
 * @example
 * const judges = await fetchJudgeData('ca1');
 */
export async function fetchJudgeData(court: string): Promise<
  Array<{
    id: string;
    name: string;
    court: string;
    position_type: string;
    political_affiliation: string | null;
    gender: string | null;
    race: string | null;
  }>
> {
  try {
    const response = await fetchCourtListenerAPI<APISearchResponse<CourtListenerJudge>>(
      '/people/',
      {
        court,
        limit: 10000,
        format: 'json',
      }
    );

    return response.results.map(normalizeJudge);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch judge data for court ${court}: ${message}`);
  }
}

/**
 * Ingest comprehensive CourtListener data including opinions and judge information
 *
 * This function:
 * 1. Fetches recent opinions across multiple case types
 * 2. Fetches judge data for major circuits and courts
 * 3. Normalizes and structures the data for database insertion
 * 4. Returns organized data ready for Supabase
 *
 * @returns Object containing arrays of normalized opinions and judges
 * @throws Error if API requests fail or data cannot be fetched
 *
 * @example
 * const { opinions, judges } = await ingestCourtListenerData();
 * // opinions: Array of normalized opinion records
 * // judges: Array of normalized judge records
 */
export async function ingestCourtListenerData(): Promise<{
  opinions: Array<{
    id: string;
    case_name: string;
    court: string;
    judges: string;
    date_filed: string;
    document_type: string;
    opinion_count: number;
    page_count: number | null;
  }>;
  judges: Array<{
    id: string;
    name: string;
    court: string;
    position_type: string;
    political_affiliation: string | null;
    gender: string | null;
    race: string | null;
  }>;
}> {
  const opinions: Array<{
    id: string;
    case_name: string;
    court: string;
    judges: string;
    date_filed: string;
    document_type: string;
    opinion_count: number;
    page_count: number | null;
  }> = [];

  const judges: Array<{
    id: string;
    name: string;
    court: string;
    position_type: string;
    political_affiliation: string | null;
    gender: string | null;
    race: string | null;
  }> = [];

  // List of major federal courts to fetch judge data from
  const courts = [
    'scotus', // Supreme Court
    'ca1', // First Circuit
    'ca2', // Second Circuit
    'ca3', // Third Circuit
    'ca4', // Fourth Circuit
    'ca5', // Fifth Circuit
    'ca6', // Sixth Circuit
    'ca7', // Seventh Circuit
    'ca8', // Eighth Circuit
    'ca9', // Ninth Circuit
    'ca10', // Tenth Circuit
    'ca11', // Eleventh Circuit
    'cadc', // DC Circuit
    'cafc', // Federal Circuit
  ];

  // Fetch opinions
  console.log('Fetching recent opinions from CourtListener...');
  try {
    const recentOpinions = await fetchRecentOpinions('o', 1000);
    opinions.push(...recentOpinions);
    console.log(`Fetched ${recentOpinions.length} opinions`);
  } catch (error) {
    console.error('Error fetching opinions:', error);
    // Continue with other data even if opinions fail
  }

  // Fetch judge data for each court
  console.log(`Fetching judge data for ${courts.length} courts...`);
  for (const court of courts) {
    try {
      const courtJudges = await fetchJudgeData(court);
      judges.push(...courtJudges);
      console.log(`Fetched ${courtJudges.length} judges from ${court}`);

      // Small delay to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.warn(`Error fetching judges for ${court}:`, error);
      // Continue with other courts even if one fails
    }
  }

  console.log(
    `Ingestion complete: ${opinions.length} opinions, ${judges.length} judges`
  );

  return { opinions, judges };
}

/**
 * Get the current rate limit status
 *
 * @returns Object with request count and remaining capacity
 */
export function getRateLimitStatus(): {
  requestsUsed: number;
  requestsRemaining: number;
  resetAt: Date;
} {
  const now = Date.now();

  // Check if window has expired
  if (now - requestWindowStart > WINDOW_MS) {
    requestCount = 0;
    requestWindowStart = now;
  }

  return {
    requestsUsed: requestCount,
    requestsRemaining: Math.max(0, RATE_LIMIT - requestCount),
    resetAt: new Date(requestWindowStart + WINDOW_MS),
  };
}
