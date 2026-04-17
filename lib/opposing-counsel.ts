/**
 * Opposing Counsel Research Tool
 * Searches for attorney profiles with litigation track records and settlement patterns
 * Data from public PACER records via CourtListener
 */

import { cacheGet, cacheSet } from './redis';

// ─── Type Definitions ────────────────────────────────────────────────

export interface CaseAppearance {
  title: string;
  court: string;
  year: number;
  outcome: 'trial_win' | 'trial_loss' | 'settlement' | 'dismissal' | 'other';
  courtlistenerUrl: string;
}

export interface CaseTypeBreakdown {
  type: string;
  count: number;
  winRate: number;
}

export interface TrialVsSettlement {
  trialRate: number;
  settlementRate: number;
  earlySettlementRate: number;
}

export interface TopDistrict {
  district: string;
  caseCount: number;
}

export interface AttorneyProfile {
  name: string;
  firmName: string;
  barNumber: string;
  totalCases: number;
  winRate: number;
  settlementRate: number;
  avgTimeToSettlement: number;
  districtAvg: number;
  topDistricts: TopDistrict[];
  recentCases: CaseAppearance[];
  caseTypeBreakdown: CaseTypeBreakdown[];
  trialVsSettlement: TrialVsSettlement;
}

export interface AttorneySearchResult {
  query: string;
  resultCount: number;
  profiles: AttorneyProfile[];
  disclaimer: string;
}

// ─── Mock Data for Demo ──────────────────────────────────────────────

const MOCK_ATTORNEYS: AttorneyProfile[] = [
  {
    name: 'Sarah Mitchell',
    firmName: 'Mitchell & Associates LLP',
    barNumber: 'NY-1245678',
    totalCases: 287,
    winRate: 62,
    settlementRate: 78,
    avgTimeToSettlement: 14,
    districtAvg: 18,
    topDistricts: [
      { district: 'S.D.N.Y.', caseCount: 45 },
      { district: 'E.D.N.Y.', caseCount: 38 },
      { district: 'N.D.N.Y.', caseCount: 22 },
      { district: 'D.N.J.', caseCount: 18 },
      { district: 'D. Conn.', caseCount: 15 },
    ],
    recentCases: [
      {
        title: 'Smith v. Pharmaceutical Corp.',
        court: 'S.D.N.Y.',
        year: 2023,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/123456/',
      },
      {
        title: 'Johnson Manufacturing Ltd. v. Defendant',
        court: 'E.D.N.Y.',
        year: 2023,
        outcome: 'trial_win',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/123457/',
      },
      {
        title: 'Healthcare v. Insurance Company',
        court: 'N.D.N.Y.',
        year: 2022,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/123458/',
      },
      {
        title: 'Product Liability Class Action',
        court: 'D.N.J.',
        year: 2022,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/123459/',
      },
      {
        title: 'Employment Contract Dispute',
        court: 'S.D.N.Y.',
        year: 2021,
        outcome: 'trial_loss',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/123460/',
      },
    ],
    caseTypeBreakdown: [
      { type: 'Product Liability', count: 68, winRate: 58 },
      { type: 'Contract Disputes', count: 54, winRate: 71 },
      { type: 'Employment Litigation', count: 47, winRate: 59 },
      { type: 'Personal Injury', count: 62, winRate: 64 },
      { type: 'Other Civil', count: 56, winRate: 60 },
    ],
    trialVsSettlement: {
      trialRate: 22,
      settlementRate: 78,
      earlySettlementRate: 31,
    },
  },
  {
    name: 'David Chen',
    firmName: 'Chen, Rodriguez & Partners',
    barNumber: 'CA-9876543',
    totalCases: 156,
    winRate: 48,
    settlementRate: 82,
    avgTimeToSettlement: 16,
    districtAvg: 19,
    topDistricts: [
      { district: 'N.D. Cal.', caseCount: 42 },
      { district: 'C.D. Cal.', caseCount: 28 },
      { district: 'E.D. Cal.', caseCount: 19 },
      { district: 'S.D. Cal.', caseCount: 16 },
      { district: 'D. Nev.', caseCount: 12 },
    ],
    recentCases: [
      {
        title: 'Tech Startup v. Incumbent Software Corp.',
        court: 'N.D. Cal.',
        year: 2024,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/234561/',
      },
      {
        title: 'Environmental Impact Litigation',
        court: 'N.D. Cal.',
        year: 2023,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/234562/',
      },
      {
        title: 'Real Estate Development Dispute',
        court: 'C.D. Cal.',
        year: 2023,
        outcome: 'dismissal',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/234563/',
      },
      {
        title: 'Intellectual Property Claim',
        court: 'N.D. Cal.',
        year: 2022,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/234564/',
      },
      {
        title: 'Commercial Lease Dispute',
        court: 'E.D. Cal.',
        year: 2022,
        outcome: 'trial_loss',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/234565/',
      },
    ],
    caseTypeBreakdown: [
      { type: 'Intellectual Property', count: 34, winRate: 41 },
      { type: 'Real Estate Disputes', count: 28, winRate: 46 },
      { type: 'Environmental Law', count: 22, winRate: 52 },
      { type: 'Commercial Contracts', count: 38, winRate: 48 },
      { type: 'Administrative Law', count: 34, winRate: 50 },
    ],
    trialVsSettlement: {
      trialRate: 18,
      settlementRate: 82,
      earlySettlementRate: 28,
    },
  },
  {
    name: 'Jennifer Williams',
    firmName: 'Williams & Associates',
    barNumber: 'TX-5432109',
    totalCases: 203,
    winRate: 56,
    settlementRate: 71,
    avgTimeToSettlement: 17,
    districtAvg: 20,
    topDistricts: [
      { district: 'E.D. Tex.', caseCount: 52 },
      { district: 'S.D. Tex.', caseCount: 38 },
      { district: 'W.D. Tex.', caseCount: 27 },
      { district: 'N.D. Tex.', caseCount: 24 },
      { district: 'S.D. Okla.', caseCount: 11 },
    ],
    recentCases: [
      {
        title: 'Oil & Gas Partnership Dispute',
        court: 'E.D. Tex.',
        year: 2024,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/345671/',
      },
      {
        title: 'Energy Company Liability Claim',
        court: 'E.D. Tex.',
        year: 2023,
        outcome: 'trial_win',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/345672/',
      },
      {
        title: 'Construction Defect Litigation',
        court: 'S.D. Tex.',
        year: 2023,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/345673/',
      },
      {
        title: 'Premises Liability Case',
        court: 'W.D. Tex.',
        year: 2022,
        outcome: 'trial_win',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/345674/',
      },
      {
        title: 'Workplace Injury Claim',
        court: 'N.D. Tex.',
        year: 2022,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/345675/',
      },
    ],
    caseTypeBreakdown: [
      { type: 'Energy Litigation', count: 51, winRate: 59 },
      { type: 'Construction Defects', count: 38, winRate: 54 },
      { type: 'Premises Liability', count: 47, winRate: 58 },
      { type: 'Contract Disputes', count: 42, winRate: 56 },
      { type: 'Other Torts', count: 25, winRate: 51 },
    ],
    trialVsSettlement: {
      trialRate: 29,
      settlementRate: 71,
      earlySettlementRate: 24,
    },
  },
  {
    name: 'Robert Martinez',
    firmName: 'Martinez Law Group',
    barNumber: 'IL-4567890',
    totalCases: 134,
    winRate: 51,
    settlementRate: 75,
    avgTimeToSettlement: 15,
    districtAvg: 18,
    topDistricts: [
      { district: 'N.D. Ill.', caseCount: 48 },
      { district: 'C.D. Ill.', caseCount: 22 },
      { district: 'S.D. Ill.', caseCount: 18 },
      { district: 'N.D. Ind.', caseCount: 16 },
      { district: 'E.D. Wis.', caseCount: 10 },
    ],
    recentCases: [
      {
        title: 'Employment Discrimination Class Action',
        court: 'N.D. Ill.',
        year: 2024,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/456781/',
      },
      {
        title: 'Wage and Hour Collective Action',
        court: 'N.D. Ill.',
        year: 2023,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/456782/',
      },
      {
        title: 'Civil Rights Violation Claim',
        court: 'C.D. Ill.',
        year: 2023,
        outcome: 'trial_loss',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/456783/',
      },
      {
        title: 'ERISA Benefits Dispute',
        court: 'N.D. Ill.',
        year: 2022,
        outcome: 'settlement',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/456784/',
      },
      {
        title: 'Housing Discrimination Case',
        court: 'S.D. Ill.',
        year: 2022,
        outcome: 'trial_win',
        courtlistenerUrl: 'https://www.courtlistener.com/dockets/456785/',
      },
    ],
    caseTypeBreakdown: [
      { type: 'Employment Discrimination', count: 38, winRate: 53 },
      { type: 'Civil Rights', count: 26, winRate: 48 },
      { type: 'Wage & Hour', count: 31, winRate: 52 },
      { type: 'ERISA', count: 18, winRate: 50 },
      { type: 'Housing Discrimination', count: 21, winRate: 50 },
    ],
    trialVsSettlement: {
      trialRate: 25,
      settlementRate: 75,
      earlySettlementRate: 32,
    },
  },
];

// ─── Cache Configuration ─────────────────────────────────────────────

interface CacheEntry {
  data: AttorneyProfile[];
  timestamp: number;
}

const CACHE_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
const cache = new Map<string, CacheEntry>();

// ─── Helper Functions ────────────────────────────────────────────────

/**
 * Checks if a query matches a mock attorney profile
 */
function queryMatches(query: string, attorney: AttorneyProfile): boolean {
  const lower = query.toLowerCase();
  return (
    attorney.name.toLowerCase().includes(lower) ||
    attorney.firmName.toLowerCase().includes(lower) ||
    attorney.barNumber.toLowerCase().includes(lower)
  );
}

/**
 * Searches the mock attorney database (and eventually CourtListener)
 */
export async function searchAttorney(query: string): Promise<AttorneyProfile[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const cacheKey = query.toLowerCase().trim();
  const redisCacheKey = 'oc:' + cacheKey;

  // Check local cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_SECONDS * 1000) {
    return cached.data;
  }

  // Check Redis cache (7-day TTL)
  try {
    const redisResult = await cacheGet<AttorneyProfile[]>(redisCacheKey);
    if (redisResult) {
      // Populate local cache as well
      cache.set(cacheKey, {
        data: redisResult,
        timestamp: Date.now(),
      });
      return redisResult;
    }
  } catch (error) {
    // Graceful fallback: continue if Redis is unavailable
  }

  // For now, filter mock data
  const results = MOCK_ATTORNEYS.filter((attorney) => queryMatches(query, attorney));

  // TODO: If no mock results, call CourtListener API
  // if (results.length === 0) {
  //   try {
  //     const clResults = await searchCourtListenerAttorneys(query);
  //     results.push(...clResults);
  //     await cacheSupabaseResults(query, results);
  //   } catch (error) {
  //     console.error('CourtListener API error:', error);
  //   }
  // }

  // Store in local cache
  if (results.length > 0) {
    cache.set(cacheKey, {
      data: results,
      timestamp: Date.now(),
    });

    // Store in Redis cache with 7-day TTL (604800 seconds)
    cacheSet(redisCacheKey, results, 604800).catch(() => {
      // Graceful fallback: silent fail if Redis is unavailable
    });
  }

  return results;
}

// ─── CourtListener Integration (TODO) ────────────────────────────────

/**
 * TODO: Implement CourtListener attorney search
 *
 * Should call: GET https://www.courtlistener.com/api/rest/v4/people/?name={query}&position_type=atty
 * Transform results into AttorneyProfile format with litigation statistics from PACER records
 */
// async function searchCourtListenerAttorneys(query: string): Promise<AttorneyProfile[]> {
//   const COURTLISTENER_API = 'https://www.courtlistener.com/api/rest/v4';
//   const headers = {
//     'User-Agent': 'MyCaseValue/1.0',
//     Accept: 'application/json',
//   };
//
//   try {
//     const res = await fetch(
//       `${COURTLISTENER_API}/people/?name=${encodeURIComponent(query)}&position_type=atty&page_size=10`,
//       { headers, next: { revalidate: 86400 } }
//     );
//     if (!res.ok) return [];
//
//     const data = await res.json();
//     // Transform API results to AttorneyProfile format
//     // Fetch additional litigation statistics from docket data
//     return (data.results || []).map(transformCourtListenerResult);
//   } catch (error) {
//     console.error('CourtListener search error:', error);
//     return [];
//   }
// }

/**
 * TODO: Transform CourtListener API response to AttorneyProfile
 *
 * Will need to:
 * 1. Extract attorney name and firm from CourtListener data
 * 2. Query docket appearances for case statistics
 * 3. Calculate win rates, settlement rates from case outcomes
 * 4. Identify top districts by case count
 * 5. Fetch recent cases with outcomes
 */
// function transformCourtListenerResult(result: any): AttorneyProfile {
//   // Implementation pending CourtListener API structure
//   // Reference: https://www.courtlistener.com/api/rest/v4/
// }

// ─── Supabase Cache Functions (TODO) ────────────────────────────────

/**
 * TODO: Implement Supabase cache for attorney profiles
 *
 * Schema:
 * - id (UUID)
 * - query (text)
 * - profiles (jsonb)
 * - created_at (timestamp)
 * - ttl_expires_at (timestamp)
 *
 * Benefits:
 * - Persistent cache across deployments
 * - Shared cache across instances
 * - Automatic TTL cleanup with Postgres policies
 */
// async function checkSupabaseCache(query: string): Promise<AttorneyProfile[] | null> {
//   // SELECT profiles FROM attorney_cache WHERE query = query AND ttl_expires_at > NOW()
// }

// async function storeSupabaseCache(query: string, profiles: AttorneyProfile[]): Promise<void> {
//   // INSERT INTO attorney_cache (query, profiles, ttl_expires_at) VALUES (...)
//   // ON CONFLICT (query) DO UPDATE SET profiles = ..., ttl_expires_at = ...
// }
