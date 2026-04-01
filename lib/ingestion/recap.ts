// Types used internally — matches Supabase schema

const RECAP_API_BASE = 'https://www.courtlistener.com/api/rest/v4';
const API_TOKEN = process.env.COURTLISTENER_API_TOKEN;

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second
const MAX_PAGES = 100; // Prevent infinite pagination
const DAYS_TO_FETCH = 30; // Only fetch dockets from last 30 days

let lastRequestTime = 0;

/**
 * Applies rate limiting to API requests
 */
async function applyRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
}

/**
 * Parses Retry-After header safely, handling NaN
 */
function parseRetryAfter(retryAfterHeader: string | null): number {
  if (!retryAfterHeader) {
    return INITIAL_BACKOFF;
  }

  const parsed = parseInt(retryAfterHeader, 10);

  // Handle NaN - return default backoff
  if (isNaN(parsed) || parsed <= 0) {
    return INITIAL_BACKOFF;
  }

  return parsed * 1000; // Convert seconds to milliseconds
}

/**
 * Validates RECAP docket data
 */
function validateDocket(docket: unknown): docket is RECAPDocket {
  if (!docket || typeof docket !== 'object') {
    return false;
  }

  const d = docket as Record<string, unknown>;
  return (
    typeof d.id === 'number' &&
    typeof d.docket_number === 'string' &&
    typeof d.case_name === 'string' &&
    typeof d.court === 'string' &&
    typeof d.date_filed === 'string'
  );
}

/**
 * Validates RECAP docket entry data
 */
function validateDocketEntry(entry: unknown): entry is RECAPDocketEntry {
  if (!entry || typeof entry !== 'object') {
    return false;
  }

  const e = entry as Record<string, unknown>;
  return (
    typeof e.id === 'number' &&
    typeof e.docket === 'number' &&
    typeof e.date_filed === 'string' &&
    typeof e.entry_number === 'number' &&
    typeof e.description === 'string'
  );
}

/**
 * Validates RECAP document data
 */
function validateDocument(document: unknown): document is RECAPDocument {
  if (!document || typeof document !== 'object') {
    return false;
  }

  const doc = document as Record<string, unknown>;
  return (
    typeof doc.id === 'number' &&
    typeof doc.docket_entry === 'number' &&
    typeof doc.pages === 'number' &&
    typeof doc.file_size === 'number'
  );
}

/**
 * Makes a request to the RECAP API with retry logic and exponential backoff
 */
async function fetchWithRetry(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await applyRateLimit();

      const url = `${RECAP_API_BASE}${endpoint}`;
      const headers = {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Check if we hit rate limit
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = parseRetryAfter(retryAfter);
        console.warn(`Rate limited. Retrying after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(
          `API error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
        );
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES - 1) {
        const delay = INITIAL_BACKOFF * Math.pow(2, attempt);
        console.error(`Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, lastError.message);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Failed to fetch from RECAP API after retries');
}

/**
 * Represents a RECAP docket from the API
 */
interface RECAPDocket {
  id: number;
  docket_number: string;
  case_name: string;
  court: string;
  date_filed: string;
  date_last_filing: string;
  date_terminated: string | null;
  source: number; // 0=RECAP, 1=PACER, 2=Bot
}

/**
 * Represents a RECAP docket entry
 */
interface RECAPDocketEntry {
  id: number;
  docket: number;
  date_filed: string;
  entry_number: number;
  description: string;
  document_number: string | null;
}

/**
 * Represents a RECAP document
 */
interface RECAPDocument {
  id: number;
  docket_entry: number;
  document_type: string;
  document_number: string;
  attachment_number: string | null;
  pages: number;
  file_size: number;
}

/**
 * Processed docket data for storage in Supabase
 */
interface ProcessedDocketData {
  docket_id: number;
  docket_number: string;
  case_name: string;
  court: string;
  date_filed: string;
  date_terminated: string | null;
  days_to_termination: number | null;
  status: 'filed' | 'answered' | 'discovery' | 'motion' | 'trial' | 'judgment' | 'terminated';
  timeline_events: TimelineEvent[];
  document_count: number;
  last_filing_date: string;
}

interface TimelineEvent {
  date: string;
  type: 'filed' | 'answered' | 'discovery' | 'motion' | 'trial' | 'judgment' | 'termination';
  description: string;
  entry_number?: number;
}

/**
 * Determines case status based on docket entries and dates
 */
function determineCaseStatus(entries: RECAPDocketEntry[]): 'filed' | 'answered' | 'discovery' | 'motion' | 'trial' | 'judgment' | 'terminated' {
  if (entries.length === 0) return 'filed';

  const descriptions = entries.map((e) => e.description.toLowerCase());

  // Check for termination-related entries
  if (
    descriptions.some((d) =>
      d.includes('judgment') || d.includes('dismissed') || d.includes('settled')
    )
  ) {
    return 'judgment';
  }

  // Check for trial-related entries
  if (
    descriptions.some((d) =>
      d.includes('trial') || d.includes('hearing') || d.includes('oral argument')
    )
  ) {
    return 'trial';
  }

  // Check for motion entries
  if (descriptions.some((d) => d.includes('motion'))) {
    return 'motion';
  }

  // Check for discovery entries
  if (
    descriptions.some((d) =>
      d.includes('discovery') ||
      d.includes('interrogator') ||
      d.includes('deposition') ||
      d.includes('document request')
    )
  ) {
    return 'discovery';
  }

  // Check for answer/responsive pleadings
  if (
    descriptions.some((d) =>
      d.includes('answer') || d.includes('response') || d.includes('reply')
    )
  ) {
    return 'answered';
  }

  return 'filed';
}

/**
 * Extracts timeline events from docket entries
 */
function extractTimelineEvents(entries: RECAPDocketEntry[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const processedIds = new Set<number>();

  // Sort entries by date
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date_filed).getTime() - new Date(b.date_filed).getTime()
  );

  for (const entry of sortedEntries) {
    if (processedIds.has(entry.id)) continue;

    const description = entry.description.toLowerCase();
    let type: TimelineEvent['type'] | null = null;

    if (
      description.includes('judgment') ||
      description.includes('dismissed') ||
      description.includes('settled')
    ) {
      type = 'judgment';
    } else if (
      description.includes('trial') ||
      description.includes('hearing') ||
      description.includes('oral argument')
    ) {
      type = 'trial';
    } else if (description.includes('motion')) {
      type = 'motion';
    } else if (
      description.includes('discovery') ||
      description.includes('interrogator') ||
      description.includes('deposition') ||
      description.includes('document request')
    ) {
      type = 'discovery';
    } else if (
      description.includes('answer') ||
      description.includes('response') ||
      description.includes('reply')
    ) {
      type = 'answered';
    }

    if (type) {
      events.push({
        date: entry.date_filed,
        type,
        description: entry.description,
        entry_number: entry.entry_number,
      });
      processedIds.add(entry.id);
    }
  }

  return events;
}

/**
 * Ingests RECAP docket data for specified case types
 * Fetches docket data from the last 30 days and extracts filing dates, termination data, and disposition info
 * Limited to 100 pages max to prevent infinite pagination
 */
export async function ingestRECAPData(nosCode?: string): Promise<ProcessedDocketData[]> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  const processedDockets: ProcessedDocketData[] = [];

  try {
    // Calculate date range - last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - DAYS_TO_FETCH);
    const dateFiltered = thirtyDaysAgo.toISOString().split('T')[0];

    // Build query parameters
    const params = new URLSearchParams();
    params.append('page_size', '100');
    params.append('date_filed__gte', dateFiltered); // Filter to recent dockets
    if (nosCode) {
      params.append('nos_code', nosCode);
    }

    let page = 1;
    let hasMorePages = true;

    while (hasMorePages && page <= MAX_PAGES) {
      params.set('page', page.toString());

      try {
        const response = await fetchWithRetry(`/dockets/?${params.toString()}`);
        const data = (await response.json()) as { results: unknown[]; next: string | null };

        if (!data.results || data.results.length === 0) {
          console.log(`No more dockets found at page ${page}`);
          hasMorePages = false;
          break;
        }

        // Validate and process each docket
        for (const docketData of data.results) {
          if (!validateDocket(docketData)) {
            console.warn('Invalid docket data received:', docketData);
            continue;
          }

          const docket = docketData;

          try {
            // Fetch docket entries for this docket
            const entriesResponse = await fetchWithRetry(
              `/docket-entries/?docket=${docket.id}&page_size=1000`
            );
            const entriesData = (await entriesResponse.json()) as {
              results: unknown[];
            };

            const entries = (entriesData.results || []).filter(validateDocketEntry);

            if (entries.length === 0) {
              console.warn(`No valid entries found for docket ${docket.id}`);
              continue;
            }

            // Determine case status
            const status = determineCaseStatus(entries);

            // Extract timeline events
            const timelineEvents = extractTimelineEvents(entries);

            // Calculate days to termination
            let daysToTermination: number | null = null;
            if (docket.date_filed && docket.date_terminated) {
              try {
                const filedDate = new Date(docket.date_filed);
                const terminatedDate = new Date(docket.date_terminated);

                if (!isNaN(filedDate.getTime()) && !isNaN(terminatedDate.getTime())) {
                  daysToTermination = Math.floor(
                    (terminatedDate.getTime() - filedDate.getTime()) / (1000 * 60 * 60 * 24)
                  );
                }
              } catch (error) {
                console.warn(`Error calculating termination days for docket ${docket.id}:`, error);
              }
            }

            // Add termination event if applicable
            if (docket.date_terminated && status === 'judgment') {
              timelineEvents.push({
                date: docket.date_terminated,
                type: 'termination',
                description: 'Case terminated',
              });
            }

            processedDockets.push({
              docket_id: docket.id,
              docket_number: docket.docket_number,
              case_name: docket.case_name,
              court: docket.court,
              date_filed: docket.date_filed,
              date_terminated: docket.date_terminated,
              days_to_termination: daysToTermination,
              status,
              timeline_events: timelineEvents,
              document_count: entries.length,
              last_filing_date: docket.date_last_filing,
            });
          } catch (error) {
            console.error(`Error processing docket ${docket.id}:`, error);
            // Continue with next docket on error
          }
        }

        hasMorePages = !!data.next;
        page++;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        throw error;
      }
    }

    if (page > MAX_PAGES) {
      console.warn(`Reached maximum page limit (${MAX_PAGES}), stopping ingestion`);
    }

    console.log(`Successfully ingested ${processedDockets.length} dockets`);
  } catch (error) {
    console.error('Error ingesting RECAP data:', error);
    throw error;
  }

  return processedDockets;
}

/**
 * Fetches full docket details and timeline events for a specific case
 */
export async function fetchDocketDetails(docketId: string): Promise<{
  docket: ProcessedDocketData;
  entries: RECAPDocketEntry[];
}> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  try {
    // Fetch docket details
    const docketResponse = await fetchWithRetry(`/dockets/${docketId}/`);
    const docketData = (await docketResponse.json()) as unknown;

    if (!validateDocket(docketData)) {
      throw new Error(`Invalid docket data received for docket ${docketId}`);
    }

    const docket = docketData;

    // Fetch all docket entries
    const entriesResponse = await fetchWithRetry(
      `/docket-entries/?docket=${docketId}&page_size=1000`
    );
    const entriesData = (await entriesResponse.json()) as {
      results: unknown[];
    };

    const entries = (entriesData.results || []).filter(validateDocketEntry);

    if (entries.length === 0) {
      throw new Error(`No valid docket entries found for docket ${docketId}`);
    }

    // Determine case status
    const status = determineCaseStatus(entries);

    // Extract timeline events
    const timelineEvents = extractTimelineEvents(entries);

    // Calculate days to termination
    let daysToTermination: number | null = null;
    if (docket.date_filed && docket.date_terminated) {
      try {
        const filedDate = new Date(docket.date_filed);
        const terminatedDate = new Date(docket.date_terminated);

        if (!isNaN(filedDate.getTime()) && !isNaN(terminatedDate.getTime())) {
          daysToTermination = Math.floor(
            (terminatedDate.getTime() - filedDate.getTime()) / (1000 * 60 * 60 * 24)
          );
        }
      } catch (error) {
        console.warn(`Error calculating termination days for docket ${docketId}:`, error);
      }
    }

    // Add termination event if applicable
    if (docket.date_terminated && status === 'judgment') {
      timelineEvents.push({
        date: docket.date_terminated,
        type: 'termination',
        description: 'Case terminated',
      });
    }

    const processedDocket: ProcessedDocketData = {
      docket_id: docket.id,
      docket_number: docket.docket_number,
      case_name: docket.case_name,
      court: docket.court,
      date_filed: docket.date_filed,
      date_terminated: docket.date_terminated,
      days_to_termination: daysToTermination,
      status,
      timeline_events: timelineEvents,
      document_count: entries.length,
      last_filing_date: docket.date_last_filing,
    };

    return {
      docket: processedDocket,
      entries,
    };
  } catch (error) {
    console.error(`Error fetching docket details for ${docketId}:`, error);
    throw error;
  }
}

/**
 * Interface for search results
 */
interface SearchResult {
  docket_id: number;
  docket_number: string;
  case_name: string;
  court: string;
  date_filed: string;
  date_terminated: string | null;
  relevance_score?: number;
}

/**
 * Searches RECAP for cases matching a query
 * Limited to 100 pages max to prevent infinite pagination
 * Returns matching docket summaries with key metadata
 */
export async function searchRECAPCases(
  query: string,
  court?: string
): Promise<SearchResult[]> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  const results: SearchResult[] = [];

  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('search', query);
    params.append('page_size', '100');

    if (court) {
      params.append('court', court);
    }

    let page = 1;
    let hasMorePages = true;

    while (hasMorePages && page <= MAX_PAGES) {
      params.set('page', page.toString());

      try {
        const response = await fetchWithRetry(`/dockets/?${params.toString()}`);
        const data = (await response.json()) as {
          results: unknown[];
          next: string | null;
        };

        if (!data.results || data.results.length === 0) {
          console.log(`No more search results at page ${page}`);
          hasMorePages = false;
          break;
        }

        // Process and validate search results
        for (const docketData of data.results) {
          if (!validateDocket(docketData)) {
            console.warn('Invalid docket data in search results:', docketData);
            continue;
          }

          const docket = docketData;
          results.push({
            docket_id: docket.id,
            docket_number: docket.docket_number,
            case_name: docket.case_name,
            court: docket.court,
            date_filed: docket.date_filed,
            date_terminated: docket.date_terminated,
          });
        }

        hasMorePages = !!data.next;
        page++;
      } catch (error) {
        console.error(`Error fetching search results page ${page}:`, error);
        throw error;
      }
    }

    if (page > MAX_PAGES) {
      console.warn(`Reached maximum page limit (${MAX_PAGES}) during search, stopping pagination`);
    }

    console.log(`Search found ${results.length} matching dockets`);
  } catch (error) {
    console.error('Error searching RECAP cases:', error);
    throw error;
  }

  return results;
}

/**
 * Fetches documents for a specific docket entry
 */
export async function fetchDocketEntryDocuments(
  entryId: string
): Promise<RECAPDocument[]> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  try {
    const response = await fetchWithRetry(
      `/recap-documents/?docket_entry=${entryId}&page_size=1000`
    );
    const data = (await response.json()) as { results: unknown[] };

    const documents = (data.results || []).filter(validateDocument);

    if (documents.length === 0) {
      console.warn(`No valid documents found for entry ${entryId}`);
      return [];
    }

    console.log(`Fetched ${documents.length} documents for entry ${entryId}`);
    return documents;
  } catch (error) {
    console.error(`Error fetching documents for entry ${entryId}:`, error);
    throw error;
  }
}
