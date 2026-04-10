/**
 * Legal Data API Clients
 *
 * Unified API client layer for accessing legal data sources with built-in:
 * - Rate limiting via Upstash Redis
 * - Error handling and retry logic
 * - Pagination support
 * - Response caching
 * - Full TypeScript typing
 */

import { Redis } from "@upstash/redis";

// ============================================================================
// Types & Interfaces
// ============================================================================

/** Generic page result type for paginated responses */
export interface PageResult<T> {
  results: T[];
  next?: string; // Cursor or URL for next page
  previous?: string;
  count?: number; // Total count if available
}

/** Generic search query interface */
export interface SearchQuery {
  q: string;
  limit?: number;
  offset?: number;
  cursor?: string;
}

/** Rate limiter configuration */
export interface RateLimitConfig {
  requestsPerSecond: number;
  requestsPerDay?: number;
  burstCapacity?: number; // Allow burst of N extra requests
}

/** Retry configuration */
export interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterFactor: number;
}

// ============================================================================
// Rate Limiter Utility
// ============================================================================

/**
 * Distributed rate limiter using Upstash Redis with token bucket algorithm
 */
export class RateLimiter {
  private redis: Redis;
  private config: RateLimitConfig;

  constructor(redis: Redis, config: RateLimitConfig) {
    this.redis = redis;
    this.config = config;
  }

  /**
   * Check if request is allowed under rate limit
   * Returns true if allowed, false if rate limit exceeded
   */
  async checkLimit(key: string): Promise<boolean> {
    try {
      const now = Math.floor(Date.now() / 1000);
      const bucketKey = `${key}:${now}`;

      // Get current token count (default to max)
      const current = (await this.redis.get<number>(bucketKey)) ?? 0;

      // Allow request if under limit
      if (current < this.config.requestsPerSecond) {
        await this.redis.incr(bucketKey);
        // Set expiration to 2 seconds (to account for bucket transitions)
        await this.redis.expire(bucketKey, 2);
        return true;
      }

      return false;
    } catch (error) {
      // If Redis fails, fail open (allow request)
      console.warn(`Rate limiter error for key ${key}:`, error);
      return true;
    }
  }

  /**
   * Wait until request is allowed (blocking with backoff)
   */
  async waitForLimit(key: string, maxWaitMs: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
      if (await this.checkLimit(key)) {
        return;
      }
      // Exponential backoff: start at 10ms, cap at 1s
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(1000, 10 * Math.pow(1.5, 3)))
      );
    }

    throw new Error(`Rate limit wait timeout for key ${key}`);
  }
}

// ============================================================================
// Retry Logic Utility
// ============================================================================

/**
 * Execute function with exponential backoff retry logic
 */
async function executeWithRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {
    maxAttempts: 3,
    baseDelayMs: 1000,
    maxDelayMs: 30000,
    jitterFactor: 0.1,
  }
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if error is retryable
      const isRetryable = isRetryableError(error);
      if (!isRetryable) {
        throw error;
      }

      if (attempt < config.maxAttempts - 1) {
        // Calculate delay with exponential backoff and jitter
        const delay = Math.min(
          config.maxDelayMs,
          Math.floor(
            config.baseDelayMs *
              Math.pow(2, attempt) *
              (1 + Math.random() * config.jitterFactor)
          )
        );

        console.warn(
          `Retry attempt ${attempt + 1}/${config.maxAttempts} after ${delay}ms:`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

/**
 * Determine if error should trigger a retry
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    // HTTP status codes that should be retried
    const retryableStatuses = [408, 429, 500, 502, 503, 504];

    // Check if error message contains HTTP status
    const statusMatch = error.message.match(/\b(404|403|401|429|5\d{2})\b/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1]);
      return retryableStatuses.includes(status);
    }

    // Timeout errors are retryable
    if (error.message.includes("timeout") || error.message.includes("ECONNRESET")) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// CourtListener Client
// ============================================================================

/**
 * CourtListener API types
 * @see https://www.courtlistener.com/api/rest/v4/
 */
export interface CourtListenerOpinion {
  id: number;
  url: string;
  cluster: number;
  absolute_url: string;
  opinion_type: string;
  date_filed: string;
  local_path: string | null;
  plain_text: string | null;
  html: string | null;
  html_lawbox: string | null;
  html_columbia: string | null;
  html_anon_2020: string | null;
  judges: string;
  nature_of_suit: string | null;
  posture: string | null;
  syllabus: string | null;
  headnotes: string | null;
  summary: string | null;
  disposition: string | null;
  citations: Array<{
    id: number;
    volume: number;
    reporter: string;
    page: number;
  }>;
}

export interface CourtListenerDocket {
  id: number;
  url: string;
  court: string;
  case_name: string;
  case_number: string;
  date_filed: string;
  date_last_filing: string | null;
  date_terminated: string | null;
  assigned_to: number | null;
  assigned_to_str: string | null;
  referred_to: number | null;
  referred_to_str: string | null;
  nature_of_suit: string | null;
  cause: string | null;
  jury_demand: string | null;
  jurisdiction: string | null;
  pacer_case_id: string | null;
  source: number;
  parties: Array<{
    id: number;
    name: string;
    party_type: number;
    extra_info: string | null;
  }>;
}

export class CourtListenerClient {
  private baseUrl = "https://www.courtlistener.com/api/rest/v4";
  private apiKey: string;
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(apiKey: string, redis: Redis) {
    this.apiKey = apiKey;
    this.redis = redis;
    // CourtListener: 5000 requests/hour = ~1.39 req/sec, use 1 req/sec to be safe
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 1,
      requestsPerDay: 5000,
      burstCapacity: 10,
    });
  }

  /**
   * Search opinions by query
   */
  async searchOpinions(
    query: string,
    options: {
      limit?: number;
      offset?: number;
      cursor?: string;
      courtIds?: string[];
      dateFiledAfter?: string;
      dateFiledBefore?: string;
    } = {}
  ): Promise<PageResult<CourtListenerOpinion>> {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("format", "json");

    if (options.limit) params.append("limit", options.limit.toString());
    if (options.offset) params.append("offset", options.offset.toString());
    if (options.courtIds?.length) {
      params.append("court__id", options.courtIds.join(","));
    }
    if (options.dateFiledAfter) {
      params.append("date_filed__gte", options.dateFiledAfter);
    }
    if (options.dateFiledBefore) {
      params.append("date_filed__lte", options.dateFiledBefore);
    }

    const cacheKey = `cl:search:${query}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/opinions/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get opinion by ID
   */
  async getOpinion(id: number): Promise<CourtListenerOpinion> {
    const cacheKey = `cl:opinion:${id}`;

    return this.fetchWithCache(
      `${this.baseUrl}/opinions/${id}/?format=json`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Get docket by ID
   */
  async getDocket(id: number): Promise<CourtListenerDocket> {
    const cacheKey = `cl:docket:${id}`;

    return this.fetchWithCache(
      `${this.baseUrl}/dockets/${id}/?format=json`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Search dockets
   */
  async searchDockets(
    query: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<PageResult<CourtListenerDocket>> {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("format", "json");

    if (options.limit) params.append("limit", options.limit.toString());
    if (options.offset) params.append("offset", options.offset.toString());

    const cacheKey = `cl:docket-search:${query}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/dockets/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get citation by ID
   */
  async getCitation(id: number): Promise<any> {
    const cacheKey = `cl:citation:${id}`;

    return this.fetchWithCache(
      `${this.baseUrl}/citations/${id}/?format=json`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Get judge by ID
   */
  async getJudge(id: number): Promise<any> {
    const cacheKey = `cl:judge:${id}`;

    return this.fetchWithCache(
      `${this.baseUrl}/judges/${id}/?format=json`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Fetch with automatic rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    // Check cache first
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    // Rate limit
    await this.rateLimiter.waitForLimit("courtlistener");

    // Fetch from API
    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`CourtListener API error: ${response.status}`);
      }

      const data = (await response.json()) as T;

      // Cache result
      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// Federal Register Client
// ============================================================================

export interface FederalRegisterDocument {
  id: string;
  document_number: string;
  type: string;
  title: string;
  abstract: string;
  publication_date: string;
  effective_date: string | null;
  agencies: Array<{ id: number; name: string; slug: string }>;
  documents: Array<{ pdf_url: string; full_text_xml_url: string }>;
  html_url: string;
  json_url: string;
}

export class FederalRegisterClient {
  private baseUrl = "https://www.federalregister.gov/api/v1";
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
    // Federal Register: No auth, 1000 req/hour typical limit
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 1,
      requestsPerDay: 10000,
      burstCapacity: 5,
    });
  }

  /**
   * Search documents
   */
  async searchDocuments(
    options: {
      q?: string;
      agencies?: string[];
      type?: string[];
      daysBack?: number;
      pageSize?: number;
      page?: number;
    } = {}
  ): Promise<PageResult<FederalRegisterDocument>> {
    const params = new URLSearchParams();

    if (options.q) params.append("conditions[full_text]", options.q);
    if (options.agencies?.length) {
      params.append("conditions[agencies][]", options.agencies.join(","));
    }
    if (options.type?.length) {
      params.append("conditions[type][]", options.type.join(","));
    }

    // If daysBack specified, filter by publication date
    if (options.daysBack) {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - options.daysBack);
      params.append(
        "conditions[publication_date][gte]",
        fromDate.toISOString().split("T")[0]
      );
    }

    params.append("per_page", (options.pageSize ?? 100).toString());
    params.append("page", (options.page ?? 1).toString());
    params.append("order", "newest");

    const cacheKey = `fr:search:${params.toString()}`;
    return this.fetchWithCache(
      `${this.baseUrl}/documents.json?${params.toString()}`,
      cacheKey,
      3600 // 1 hour
    );
  }

  /**
   * Get document by number
   */
  async getDocument(documentNumber: string): Promise<FederalRegisterDocument> {
    const cacheKey = `fr:doc:${documentNumber}`;

    return this.fetchWithCache(
      `${this.baseUrl}/documents/${documentNumber}.json`,
      cacheKey,
      2592000 // 30 days (documents don't change)
    );
  }

  /**
   * Get agencies
   */
  async getAgencies(): Promise<any[]> {
    const cacheKey = `fr:agencies`;

    return this.fetchWithCache(
      `${this.baseUrl}/agencies.json`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    // Check cache
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    // Rate limit
    await this.rateLimiter.waitForLimit("federalregister");

    // Fetch
    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Federal Register API error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as T;

      // Cache
      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// eCFR Client
// ============================================================================

export interface eCFRTitle {
  number: number;
  name: string;
}

export interface eCFRPart {
  title: number;
  part: number;
  name: string;
  reserved: boolean;
}

export interface eCFRSection {
  title: number;
  part: number;
  section: string;
  heading: string;
  contents: string;
}

export class ECFRClient {
  private baseUrl = "https://www.ecfr.gov/api/versioner/v1";
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
    // eCFR: No auth, generous limits
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 2,
      requestsPerDay: 50000,
      burstCapacity: 20,
    });
  }

  /**
   * Get all titles
   */
  async getTitles(): Promise<eCFRTitle[]> {
    const cacheKey = `ecfr:titles`;

    return this.fetchWithCache(
      `${this.baseUrl}/titles.json`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Get parts for a title
   */
  async getParts(title: number): Promise<eCFRPart[]> {
    const cacheKey = `ecfr:parts:${title}`;

    return this.fetchWithCache(
      `${this.baseUrl}/titles/${title}/parts.json`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Get versions for a title-part
   */
  async getVersions(title: number, part: number): Promise<any[]> {
    const cacheKey = `ecfr:versions:${title}:${part}`;

    return this.fetchWithCache(
      `${this.baseUrl}/titles/${title}/parts/${part}/versions.json`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Get section
   */
  async getSection(
    title: number,
    part: number,
    section: string
  ): Promise<eCFRSection> {
    const cacheKey = `ecfr:section:${title}:${part}:${section}`;

    return this.fetchWithCache(
      `${this.baseUrl}/titles/${title}/parts/${part}/sections/${section}.json`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    await this.rateLimiter.waitForLimit("ecfr");

    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`eCFR API error: ${response.status}`);
      }

      const data = (await response.json()) as T;

      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// EDGAR Client (SEC Filings)
// ============================================================================

export interface EDGARCompanyFiling {
  cik: string;
  company: string;
  type: string;
  dateB: string;
  accessionNumber: string;
  actionDt: string;
}

export class EdgarClient {
  private baseUrl = "https://www.sec.gov/cgi-bin";
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
    // SEC: 5 requests per second limit
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 4,
      requestsPerDay: 100000,
      burstCapacity: 10,
    });
  }

  /**
   * Search company filings
   */
  async searchCompany(
    query: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<PageResult<EDGARCompanyFiling>> {
    const params = new URLSearchParams();
    params.append("action", "getcompany");
    params.append("company", query);
    params.append("type", "");
    params.append("dateb", "");
    params.append("owner", "exclude");
    params.append("count", (options.limit ?? 100).toString());
    params.append("output", "json");

    const cacheKey = `edgar:company:${query}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/browse-edgar?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get filings for a company (by CIK)
   */
  async getFilings(
    cik: string,
    options: {
      type?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<PageResult<EDGARCompanyFiling>> {
    const params = new URLSearchParams();
    params.append("action", "getcompany");
    params.append("CIK", cik);
    if (options.type) params.append("type", options.type);
    params.append("dateb", "");
    params.append("owner", "exclude");
    params.append("count", (options.limit ?? 100).toString());
    params.append("output", "json");

    const cacheKey = `edgar:filings:${cik}:${options.type || "all"}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/browse-edgar?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    await this.rateLimiter.waitForLimit("edgar");

    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "MyCaseValue (support@mycasevalue.com)",
        },
      });

      if (!response.ok) {
        throw new Error(`EDGAR API error: ${response.status}`);
      }

      const data = (await response.json()) as T;

      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// case.law Client (Harvard Caselaw Access Project)
// ============================================================================

export interface CaseLawCase {
  id: number;
  url: string;
  name: string;
  name_abbreviation: string;
  decision_date: string;
  docket_number: string;
  first_page: number;
  last_page: number;
  reporter: {
    id: number;
    volume: number;
    series: string;
  };
  court: {
    id: number;
    slug: string;
    name: string;
    name_abbreviation: string;
  };
  jurisdiction: {
    id: number;
    slug: string;
    name: string;
    name_abbreviation: string;
  };
  opinion_count: number;
}

export class CaseLawClient {
  private baseUrl = "https://api.case.law/v1";
  private apiKey: string;
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(apiKey: string, redis: Redis) {
    this.apiKey = apiKey;
    this.redis = redis;
    // case.law: 10000 requests per day
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 0.5,
      requestsPerDay: 10000,
      burstCapacity: 5,
    });
  }

  /**
   * Search cases
   */
  async searchCases(
    query: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<PageResult<CaseLawCase>> {
    const params = new URLSearchParams();
    params.append("search", query);
    params.append("limit", (options.limit ?? 100).toString());
    if (options.offset) params.append("offset", options.offset.toString());

    const cacheKey = `caselaw:search:${query}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/cases/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get case by ID
   */
  async getCase(id: number): Promise<CaseLawCase> {
    const cacheKey = `caselaw:case:${id}`;

    return this.fetchWithCache(
      `${this.baseUrl}/cases/${id}/`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Get cases by jurisdiction
   */
  async getCasesByJurisdiction(
    jurisdictionSlug: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<PageResult<CaseLawCase>> {
    const params = new URLSearchParams();
    params.append("jurisdiction", jurisdictionSlug);
    params.append("limit", (options.limit ?? 100).toString());
    if (options.offset) params.append("offset", options.offset.toString());

    const cacheKey = `caselaw:jurisdiction:${jurisdictionSlug}:${options.offset ?? 0}`;

    return this.fetchWithCache(
      `${this.baseUrl}/cases/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    await this.rateLimiter.waitForLimit("caselaw");

    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${this.apiKey}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `case.law API error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as T;

      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// CanLII Client (Canadian Legal Information)
// ============================================================================

export interface CanLIIDecision {
  databaseId: string;
  citationId: string;
  title: string;
  citation: string;
  url: string;
  decisionDate: string;
  court: {
    id: string;
    name: string;
  };
  language: string;
}

export class CanLIIClient {
  private baseUrl = "https://api.canlii.org/v1";
  private apiKey: string;
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(apiKey: string, redis: Redis) {
    this.apiKey = apiKey;
    this.redis = redis;
    // CanLII: 5000 requests per hour
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 1,
      requestsPerDay: 5000,
      burstCapacity: 10,
    });
  }

  /**
   * Search cases
   */
  async searchCases(
    query: string,
    options: {
      limit?: number;
      offset?: number;
      database?: string;
      language?: "en" | "fr";
    } = {}
  ): Promise<PageResult<CanLIIDecision>> {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("limit", (options.limit ?? 100).toString());
    if (options.offset) params.append("offset", options.offset.toString());
    if (options.database) params.append("database", options.database);
    params.append("language", options.language || "en");

    const cacheKey = `canlii:search:${query}:${options.offset ?? 0}:${options.language || "en"}`;

    return this.fetchWithCache(
      `${this.baseUrl}/search/decisions/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Search legislation
   */
  async searchLegislation(
    query: string,
    options: {
      limit?: number;
      offset?: number;
      language?: "en" | "fr";
    } = {}
  ): Promise<PageResult<any>> {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("limit", (options.limit ?? 100).toString());
    if (options.offset) params.append("offset", options.offset.toString());
    params.append("language", options.language || "en");

    const cacheKey = `canlii:legislation:${query}:${options.offset ?? 0}:${options.language || "en"}`;

    return this.fetchWithCache(
      `${this.baseUrl}/search/legislation/?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get decision by database ID and citation ID
   */
  async getDecision(databaseId: string, citationId: string): Promise<any> {
    const cacheKey = `canlii:decision:${databaseId}:${citationId}`;

    return this.fetchWithCache(
      `${this.baseUrl}/${databaseId}/${citationId}?lang=en`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    await this.rateLimiter.waitForLimit("canlii");

    return executeWithRetry(async () => {
      const response = await fetch(`${url}&api_key=${this.apiKey}`, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `CanLII API error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as T;

      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// GovInfo Client (Government Publishing Office)
// ============================================================================

export interface GovInfoDocument {
  docClass: string;
  docType: string;
  docNumber: string;
  pageCount: number;
  pages: Array<{
    pageNum: number;
    pdf: string;
  }>;
  packageId: string;
  title: string;
  summary: string;
  granuleId: string;
  lastModified: string;
}

export class GovInfoClient {
  private baseUrl = "https://www.govinfo.gov/api";
  private rateLimiter: RateLimiter;
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
    // GovInfo: 1000 requests per hour typical
    this.rateLimiter = new RateLimiter(redis, {
      requestsPerSecond: 1,
      requestsPerDay: 10000,
      burstCapacity: 10,
    });
  }

  /**
   * Search across collections
   */
  async search(
    query: string,
    options: {
      pageSize?: number;
      pageNumber?: number;
      collectionId?: string;
      fromDate?: string;
      toDate?: string;
    } = {}
  ): Promise<PageResult<GovInfoDocument>> {
    const params = new URLSearchParams();
    params.append("query", query);
    params.append("pageSize", (options.pageSize ?? 100).toString());
    params.append("pageNumber", (options.pageNumber ?? 1).toString());
    if (options.collectionId) {
      params.append("collection", options.collectionId);
    }
    if (options.fromDate) params.append("dateRange[fromDate]", options.fromDate);
    if (options.toDate) params.append("dateRange[toDate]", options.toDate);

    const cacheKey = `govinfo:search:${query}:${options.pageNumber ?? 1}`;

    return this.fetchWithCache(
      `${this.baseUrl}/documents?${params.toString()}`,
      cacheKey,
      86400 // 24 hours
    );
  }

  /**
   * Get collections
   */
  async getCollections(): Promise<any[]> {
    const cacheKey = `govinfo:collections`;

    return this.fetchWithCache(
      `${this.baseUrl}/collections/all`,
      cacheKey,
      2592000 // 30 days
    );
  }

  /**
   * Get package by ID
   */
  async getPackage(packageId: string): Promise<GovInfoDocument> {
    const cacheKey = `govinfo:package:${packageId}`;

    return this.fetchWithCache(
      `${this.baseUrl}/documents/${packageId}`,
      cacheKey,
      604800 // 7 days
    );
  }

  /**
   * Fetch with rate limiting and caching
   */
  private async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    ttl: number
  ): Promise<T> {
    try {
      const cached = await this.redis.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    } catch (error) {
      console.warn(`Cache read error for ${cacheKey}:`, error);
    }

    await this.rateLimiter.waitForLimit("govinfo");

    return executeWithRetry(async () => {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `GovInfo API error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as T;

      try {
        await this.redis.setex(cacheKey, ttl, JSON.stringify(data));
      } catch (error) {
        console.warn(`Cache write error for ${cacheKey}:`, error);
      }

      return data;
    });
  }
}

// ============================================================================
// Export Factory Function
// ============================================================================

/**
 * Factory to initialize all clients with shared Redis connection
 */
export function initializeLegalClients(redis: Redis) {
  const courtListener = new CourtListenerClient(
    process.env.COURTLISTENER_API_KEY || "",
    redis
  );
  const federalRegister = new FederalRegisterClient(redis);
  const ecfr = new ECFRClient(redis);
  const edgar = new EdgarClient(redis);
  const caseLaw = new CaseLawClient(
    process.env.CASELAW_API_KEY || "",
    redis
  );
  const canLii = new CanLIIClient(process.env.CANLII_API_KEY || "", redis);
  const govInfo = new GovInfoClient(redis);

  return {
    courtListener,
    federalRegister,
    ecfr,
    edgar,
    caseLaw,
    canLii,
    govInfo,
  };
}
