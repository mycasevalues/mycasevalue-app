// Types used internally — matches Supabase schema

const RECAP_API_BASE = 'https://www.courtlistener.com/api/rest/v4';
const API_TOKEN = process.env.COURTLISTENER_API_TOKEN;

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 1000; // 1 second

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
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : INITIAL_BACKOFF * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < MAX_RETRIES - 1) {
        const delay = INITIAL_BACKOFF * Math.pow(2, attempt);
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
 * Fetches docket data and extracts filing dates, termination data, and disposition info
 */
export async function ingestRECAPData(nosCode?: string): Promise<ProcessedDocketData[]> {
  if (!API_TOKEN) {
    throw new Error('COURTLISTENER_API_TOKEN environment variable is not set');
  }

  const processedDockets: ProcessedDocketData[] = [];

  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('page_size', '100');
    if (nosCode) {
      params.append('nos_code', nosCode);
    }

    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      params.set('page', page.toString());

      const response = await fetchWithRetry(`/dockets/?${params.toString()}`);
      const data = (await response.json()) as { results: RECAPDocket[]; next: string | null };

      if (!data.results || data.results.length === 0) {
        hasMorePages = false;
        break;
      }

      // Process each docket
      for (const docket of data.results) {
        try {
          // Fetch docket entries for this docket
          const entriesResponse = await fetchWithRetry(
            `/docket-entries/?docket=${docket.id}&page_size=1000`
          );
          const entriesData = (await entriesResponse.json()) as {
            results: RECAPDocketEntry[];
          };

          const entries = entriesData.results || [];

          // Determine case status
          const status = determineCaseStatus(entries);

          // Extract timeline events
          const timelineEvents = extractTimelineEvents(entries);

          // Calculate days to termination
          let daysToTermination: number | null = null;
          if (docket.date_filed && docket.date_terminated) {
            const filedDate = new Date(docket.date_filed);
            const terminatedDate = new Date(docket.date_terminated);
            daysToTermination = Math.floor(
              (terminatedDate.getTime() - filedDate.getTime()) / (1000 * 60 * 60 * 24)
            );
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
    }
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
    const docket = (await docketResponse.json()) as RECAPDocket;

    // Fetch all docket entries
    const entriesResponse = await fetchWithRetry(
      `/docket-entries/?docket=${docketId}&page_size=1000`
    );
    const entriesData = (await entriesResponse.json()) as {
      results: RECAPDocketEntry[];
    };

    const entries = entriesData.results || [];

    // Determine case status
    const status = determineCaseStatus(entries);

    // Extract timeline events
    const timelineEvents = extractTimelineEvents(entries);

    // Calculate days to termination
    let daysToTermination: number | null = null;
    if (docket.date_filed && docket.date_terminated) {
      const filedDate = new Date(docket.date_filed);
      const terminatedDate = new Date(docket.date_terminated);
      daysToTermination = Math.floor(
        (terminatedDate.getTime() - filedDate.getTime()) / (1000 * 60 * 60 * 24)
      );
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

    while (hasMorePages) {
      params.set('page', page.toString());

      const response = await fetchWithRetry(`/dockets/?${params.toString()}`);
      const data = (await response.json()) as {
        results: RECAPDocket[];
        next: string | null;
      };

      if (!data.results || data.results.length === 0) {
        hasMorePages = false;
        break;
      }

      // Process search results
      for (const docket of data.results) {
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
    }
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
    const data = (await response.json()) as { results: RECAPDocument[] };

    return data.results || [];
  } catch (error) {
    console.error(`Error fetching documents for entry ${entryId}:`, error);
    throw error;
  }
}
