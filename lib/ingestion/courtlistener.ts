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
const DEFAULT_RETRY_DELAY_MS = 5000; // 5 seconds default

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
 * Parse Retry-After header with NaN fallback
 * @param retryAfterHeader - Value of Retry-After header
 * @returns Delay in milliseconds
 */
function parseRetryAfter(retryAfterHeader: string | null): number {
  if (!retryAfterHeader) {
    return DEFAULT_RETRY_DELAY_MS;
  }

  const delaySeconds = parseInt(retryAfterHeader, 10);

  // Return default if parsing failed (NaN) or if value is invalid
  if (isNaN(delaySeconds) || delaySeconds < 0) {
    console.warn(`Invalid Retry-After header: "${retryAfterHeader}", using default delay`);
    return DEFAULT_RETRY_DELAY_MS;
  }

  return delaySeconds * 1000;
}

/**
 * Validate API response structure
 * @param data - Response data to validate
 * @returns true if valid, false otherwise
 */
function isValidSearchResponse<T>(data: unknown): data is APISearchResponse<T> {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    typeof obj.count === 'number' &&
    Array.isArray(obj.results) &&
    (obj.next === null || typeof obj.next === 'string') &&
    (obj.previous === null || typeof obj.previous === 'string')
  );
}

/**
 * Fetch data from CourtListener API with authentication and error handling
 *
 * @param endpoint - API endpoint path (e.g., '/opinions/')
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
      console.log(`Fetching from CourtListener API: ${endpoint}`);
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
          // Rate limited - check for Retry-After header
          const retryAfter = response.headers.get('Retry-After');
          const delayMs = parseRetryAfter(retryAfter);
          console.warn(`Rate limited by CourtListener API. Retry-After: ${retryAfter || 'not set'}. Waiting ${delayMs}ms`);
          throw new Error(`Rate limited by CourtListener API (${response.status})`);
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

      const data: unknown = await response.json();

      // Validate response structure
      if (!isValidSearchResponse(data)) {
        console.error('Invalid CourtListener API response structure:', data);
        throw new Error('Invalid CourtListener API response: missing required fields');
      }

      return data as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on authentication errors
      if (lastError.message.includes('Unauthorized')) {
        console.error('Authentication failed:', lastError.message);
        throw lastError;
      }

      retries--;

      // Exponential backoff
      if (retries > 0) {
        const delayMs = Math.pow(2, 3 - retries) * 1000;
        console.warn(`Request failed: ${lastError.message}. Retrying in ${delayMs}ms (${retries} retries remaining)`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.error(`Request failed after all retries: ${lastError.message}`);
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
 * Fetch opinions with pagination
 *
 * @param limit - Maximum number of opinions to fetch (default: 500 to stay within timeout)
 * @returns Array of normalized opinion data
 *
 * @example
 * const opinions = await fetchRecentOpinions(500);
 */
export async function fetchRecentOpinions(
  limit: number = 500
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

  try {
    // Use /opinions/ endpoint (correct v4 API endpoint)
    const actualLimit = Math.min(limit, 500); // Cap at 500 per run to avoid timeouts

    console.log(`Fetching up to ${actualLimit} recent opinions from CourtListener...`);

    const response = await fetchCourtListenerAPI<
      APISearchResponse<CourtListenerOpinion>
    >('/opinions/', {
      order_by: '-date_filed',
      limit: actualLimit,
    });

    if (!response.results || !Array.isArray(response.results)) {
      console.error('Invalid response structure for opinions:', response);
      throw new Error('Invalid response structure: missing results array');
    }

    const normalized = response.results.map(normalizeOpinion);
    opinions.push(...normalized);

    console.log(`Successfully fetched ${normalized.length} opinions (API returned ${response.count} total available)`);

    return opinions;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to fetch recent opinions: ${message}`);
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
    // Use /judges/ endpoint (correct v4 API endpoint)
    console.log(`Fetching judge data for court: ${court}`);

    const response = await fetchCourtListenerAPI<APISearchResponse<CourtListenerJudge>>(
      '/judges/',
      {
        court,
        limit: 500, // Fetch in reasonable batches
      }
    );

    if (!response.results || !Array.isArray(response.results)) {
      console.error(`Invalid response structure for judges in ${court}:`, response);
      throw new Error('Invalid response structure: missing results array');
    }

    const normalized = response.results.map(normalizeJudge);
    console.log(`Fetched ${normalized.length} judges from ${court} (API returned ${response.count} total available)`);

    return normalized;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to fetch judge data for court ${court}: ${message}`);
    throw new Error(`Failed to fetch judge data for court ${court}: ${message}`);
  }
}

/**
 * Ingest comprehensive CourtListener data including opinions and judge information
 *
 * This function:
 * 1. Fetches recent opinions (max 500 per run to avoid timeouts)
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

  // Validate API token is available
  if (!API_TOKEN) {
    const error = new Error('COURTLISTENER_API_TOKEN environment variable is not set');
    console.error(error.message);
    throw error;
  }

  // Fetch opinions
  console.log('Starting CourtListener data ingestion...');
  try {
    const recentOpinions = await fetchRecentOpinions(500); // Max 500 per run
    opinions.push(...recentOpinions);
    console.log(`Successfully fetched ${recentOpinions.length} opinions`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error fetching opinions: ${message}`);
    // Continue with judge data even if opinions fail
  }

  // Fetch judge data for each court
  console.log(`Fetching judge data for ${courts.length} courts...`);
  for (const court of courts) {
    try {
      const courtJudges = await fetchJudgeData(court);
      judges.push(...courtJudges);
      console.log(`Successfully added ${courtJudges.length} judges from ${court} (total: ${judges.length})`);

      // Small delay to respect rate limits and avoid overwhelming the API
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Error fetching judges for ${court}: ${message}`);
      // Continue with other courts even if one fails
    }
  }

  console.log(
    `CourtListener ingestion complete: ${opinions.length} opinions, ${judges.length} judges`
  );

  // Validate we got some data
  if (opinions.length === 0 && judges.length === 0) {
    console.warn('Warning: No data was successfully ingested from CourtListener');
  }

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
