/**
 * Judge Data Service — abstracts data source for judge pages.
 * In production, queries Supabase. In development or when Supabase
 * is unavailable, falls back to mock data from data/mock-judges.ts.
 *
 * Provides a consistent interface for:
 * - Listing judges with filtering, sorting, and pagination
 * - Fetching individual judge details
 * - Retrieving judge statistics and opinions
 * - Searching judges by name
 */

import { Judge, JudgeStatistics, JudgeOpinion, JudgeAIAnalysis, JudgeWithStats } from './supabase-judges';
import { mockJudgesData } from '@/data/mock-judges';

// ─── Types ──────────────────────────────────────────────────────────

export interface GetJudgesOptions {
  district?: string;
  circuit?: string;
  nameSearch?: string;
  nosCode?: number;
  sortBy?: 'name' | 'cases' | 'plaintiff_rate';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface JudgesResult {
  judges: JudgeWithStats[];
  total: number;
  limit: number;
  offset: number;
}

export interface StatisticsFilter {
  nosCode?: number;
  minCases?: number;
}

// ─── Internal Helpers ───────────────────────────────────────────────

/**
 * Check if Supabase is configured and available
 */
function isSupabaseAvailable(): boolean {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

/**
 * Calculate judge overall stats from all their statistics
 */
function calculateJudgeOverallStats(
  judge: Judge,
  statistics: JudgeStatistics[]
): JudgeWithStats {
  let totalCases = 0;
  let totalPWins = 0;
  let totalDWins = 0;

  statistics.forEach((stat) => {
    totalCases += stat.total_cases || 0;
    totalPWins += stat.plaintiff_wins || 0;
    totalDWins += stat.defendant_wins || 0;
  });

  const trialDecided = totalPWins + totalDWins;
  const overallRate = trialDecided > 0 ? (totalPWins / trialDecided) * 100 : null;

  return {
    ...judge,
    overall_plaintiff_win_rate: overallRate,
    total_cases_handled: totalCases,
    statistics,
  };
}

/**
 * Filter judges array by options (for mock data)
 */
function filterJudges(judges: Judge[], options: GetJudgesOptions): Judge[] {
  let filtered = judges;

  if (options.district) {
    filtered = filtered.filter((j) => j.district_id === options.district);
  }

  if (options.circuit) {
    filtered = filtered.filter((j) => j.circuit === options.circuit);
  }

  if (options.nameSearch) {
    const query = options.nameSearch.toLowerCase();
    filtered = filtered.filter(
      (j) =>
        j.full_name.toLowerCase().includes(query) ||
        j.last_name?.toLowerCase().includes(query) ||
        j.first_name?.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Sort judges array by option
 */
function sortJudges(
  judges: Judge[],
  statistics: JudgeStatistics[],
  sortBy?: string,
  order: 'asc' | 'desc' = 'asc'
): Judge[] {
  if (!sortBy) return judges;

  const sorted = [...judges].sort((a, b) => {
    let aVal: number | string = 0;
    let bVal: number | string = 0;

    if (sortBy === 'name') {
      aVal = a.full_name;
      bVal = b.full_name;
    } else if (sortBy === 'cases') {
      const aStats = statistics.filter((s) => s.judge_id === a.id);
      const bStats = statistics.filter((s) => s.judge_id === b.id);
      aVal = aStats.reduce((sum, s) => sum + (s.total_cases || 0), 0);
      bVal = bStats.reduce((sum, s) => sum + (s.total_cases || 0), 0);
    } else if (sortBy === 'plaintiff_rate') {
      const aStats = statistics.filter((s) => s.judge_id === a.id);
      const bStats = statistics.filter((s) => s.judge_id === b.id);
      const aRate =
        aStats.length > 0 ? aStats.reduce((sum, s) => sum + (s.plaintiff_win_rate || 0), 0) / aStats.length : 0;
      const bRate =
        bStats.length > 0 ? bStats.reduce((sum, s) => sum + (s.plaintiff_win_rate || 0), 0) / bStats.length : 0;
      aVal = aRate;
      bVal = bRate;
    }

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

// ─── Supabase Data Fetchers ──────────────────────────────────────

/**
 * Fetch judges from Supabase with filtering and sorting
 */
async function fetchJudgesFromSupabase(
  options: GetJudgesOptions,
  supabaseUrl: string,
  supabaseKey: string
): Promise<JudgesResult> {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase.from('judges').select('*', { count: 'exact' }).eq('is_active', true);

  if (options.district) {
    query = query.eq('district_id', options.district);
  }

  if (options.circuit) {
    query = query.eq('circuit', options.circuit);
  }

  if (options.nameSearch) {
    const search = options.nameSearch.toLowerCase();
    query = query.or(`full_name.ilike.%${search}%,last_name.ilike.%${search}%,first_name.ilike.%${search}%`);
  }

  // Apply sorting
  if (options.sortBy === 'name') {
    query = query.order('full_name', { ascending: options.order === 'asc' });
  } else if (options.sortBy === 'cases') {
    // Note: Supabase doesn't support sorting by aggregated data directly
    // In production, you'd use a view or handle client-side
    query = query.order('full_name', { ascending: true });
  }

  // Apply pagination
  const limit = options.limit || 20;
  const offset = options.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data: judges, count, error } = await query;

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  // Fetch statistics for these judges
  const judgeIds = (judges || []).map((j) => j.id);
  let allStats: JudgeStatistics[] = [];

  if (judgeIds.length > 0) {
    const { data: stats, error: statsError } = await supabase
      .from('judge_statistics')
      .select('*')
      .in('judge_id', judgeIds);

    if (statsError) {
      console.warn('Failed to fetch judge statistics:', statsError.message);
    } else {
      allStats = stats || [];
    }
  }

  // Enrich judges with stats
  const enriched = (judges || []).map((judge) => {
    const judgeStats = allStats.filter((s) => s.judge_id === judge.id);
    return calculateJudgeOverallStats(judge, judgeStats);
  });

  return {
    judges: enriched,
    total: count || 0,
    limit,
    offset,
  };
}

/**
 * Fetch single judge from Supabase by ID
 */
async function fetchJudgeByIdFromSupabase(
  judgeId: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<JudgeWithStats | null> {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: judge, error } = await supabase.from('judges').select('*').eq('id', judgeId).single();

  if (error || !judge) {
    return null;
  }

  // Fetch statistics
  const { data: stats } = await supabase.from('judge_statistics').select('*').eq('judge_id', judgeId);

  return calculateJudgeOverallStats(judge, stats || []);
}

/**
 * Fetch judge statistics from Supabase
 */
async function fetchJudgeStatisticsFromSupabase(
  judgeId: string,
  nosCode?: number,
  supabaseUrl?: string,
  supabaseKey?: string
): Promise<JudgeStatistics[]> {
  if (!supabaseUrl || !supabaseKey) return [];

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase.from('judge_statistics').select('*').eq('judge_id', judgeId);

  if (nosCode) {
    query = query.eq('nos_code', nosCode);
  }

  const { data, error } = await query;

  if (error) {
    console.warn('Failed to fetch judge statistics:', error.message);
    return [];
  }

  return data || [];
}

/**
 * Fetch judge opinions from Supabase
 */
async function fetchJudgeOpinionsFromSupabase(
  judgeId: string,
  limit: number = 10,
  supabaseUrl?: string,
  supabaseKey?: string
): Promise<JudgeOpinion[]> {
  if (!supabaseUrl || !supabaseKey) return [];

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('judge_opinions')
    .select('*')
    .eq('judge_id', judgeId)
    .order('year', { ascending: false })
    .limit(limit);

  if (error) {
    console.warn('Failed to fetch judge opinions:', error.message);
    return [];
  }

  return data || [];
}

/**
 * Fetch judge AI analysis from Supabase
 */
async function fetchJudgeAIAnalysisFromSupabase(
  judgeId: string,
  supabaseUrl?: string,
  supabaseKey?: string
): Promise<JudgeAIAnalysis | null> {
  if (!supabaseUrl || !supabaseKey) return null;

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from('judge_ai_analysis').select('*').eq('judge_id', judgeId).single();

  if (error) {
    console.warn('Failed to fetch judge AI analysis:', error.message);
    return null;
  }

  return data || null;
}

/**
 * Find top judges for a NOS code from Supabase
 */
async function fetchTopJudgesForNOSFromSupabase(
  nosCode: number,
  district?: string,
  minCases?: number,
  limit: number = 10,
  supabaseUrl?: string,
  supabaseKey?: string
): Promise<JudgeWithStats[]> {
  if (!supabaseUrl || !supabaseKey) return [];

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch statistics for this NOS code
  let statsQuery = supabase
    .from('judge_statistics')
    .select('*, judges!inner(*)')
    .eq('nos_code', nosCode)
    .eq('judges.is_active', true);

  if (minCases) {
    statsQuery = statsQuery.gte('total_cases', minCases);
  }

  const { data: stats, error } = await statsQuery.order('plaintiff_win_rate', { ascending: false }).limit(limit);

  if (error || !stats) {
    console.warn('Failed to fetch top judges for NOS:', error?.message);
    return [];
  }

  // Build result with judge data
  const result: JudgeWithStats[] = [];
  stats.forEach((stat: any) => {
    if (stat.judges && (!district || stat.judges.district_id === district)) {
      const judgeWithStats = calculateJudgeOverallStats(stat.judges, [stat]);
      result.push(judgeWithStats);
    }
  });

  return result.slice(0, limit);
}

/**
 * Fetch all judges in a district from Supabase
 */
async function fetchDistrictJudgesFromSupabase(
  districtId: string,
  supabaseUrl?: string,
  supabaseKey?: string
): Promise<JudgeWithStats[]> {
  if (!supabaseUrl || !supabaseKey) return [];

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: judges, error } = await supabase
    .from('judges')
    .select('*')
    .eq('district_id', districtId)
    .eq('is_active', true)
    .order('full_name');

  if (error || !judges) {
    console.warn('Failed to fetch district judges:', error?.message);
    return [];
  }

  const judgeIds = judges.map((j) => j.id);
  let allStats: JudgeStatistics[] = [];

  if (judgeIds.length > 0) {
    const { data: stats } = await supabase.from('judge_statistics').select('*').in('judge_id', judgeIds);
    allStats = stats || [];
  }

  return judges.map((judge) => {
    const judgeStats = allStats.filter((s) => s.judge_id === judge.id);
    return calculateJudgeOverallStats(judge, judgeStats);
  });
}

// ─── Mock Data Helpers ──────────────────────────────────────────────

/**
 * Filter and sort mock judges
 */
function getMockJudgesFiltered(options: GetJudgesOptions): JudgesResult {
  let judges = mockJudgesData.judges;
  const statistics = mockJudgesData.statistics;

  // Apply filters
  judges = filterJudges(judges, options);

  // Apply sorting
  judges = sortJudges(judges, statistics, options.sortBy, options.order || 'asc');

  // Apply pagination
  const limit = options.limit || 20;
  const offset = options.offset || 0;
  const total = judges.length;
  judges = judges.slice(offset, offset + limit);

  // Enrich with stats
  const enriched = judges.map((judge) => {
    const judgeStats = statistics.filter((s) => s.judge_id === judge.id);
    return calculateJudgeOverallStats(judge, judgeStats);
  });

  return {
    judges: enriched,
    total,
    limit,
    offset,
  };
}

// ─── Public API ──────────────────────────────────────────────────

/**
 * Get judges with filtering, sorting, and pagination
 */
export async function getJudges(options: GetJudgesOptions = {}): Promise<JudgesResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchJudgesFromSupabase(options, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  return getMockJudgesFiltered(options);
}

/**
 * Get single judge by ID
 */
export async function getJudgeById(judgeId: string): Promise<JudgeWithStats | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchJudgeByIdFromSupabase(judgeId, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  // Mock data fallback
  const judge = mockJudgesData.judges.find((j) => j.id === judgeId);
  if (!judge) return null;

  const statistics = mockJudgesData.statistics.filter((s) => s.judge_id === judgeId);
  return calculateJudgeOverallStats(judge, statistics);
}

/**
 * Get statistics for a judge, optionally filtered by NOS code
 */
export async function getJudgeStatistics(
  judgeId: string,
  nosCode?: number
): Promise<JudgeStatistics[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchJudgeStatisticsFromSupabase(judgeId, nosCode, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  // Mock data fallback
  let stats = mockJudgesData.statistics.filter((s) => s.judge_id === judgeId);
  if (nosCode) {
    stats = stats.filter((s) => s.nos_code === nosCode);
  }
  return stats;
}

/**
 * Get recent opinions for a judge
 */
export async function getJudgeOpinions(judgeId: string, limit: number = 10): Promise<JudgeOpinion[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchJudgeOpinionsFromSupabase(judgeId, limit, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  // Mock data fallback
  return mockJudgesData.opinions
    .filter((o) => o.judge_id === judgeId)
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, limit);
}

/**
 * Get cached AI analysis for a judge
 */
export async function getJudgeAIAnalysis(judgeId: string): Promise<JudgeAIAnalysis | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchJudgeAIAnalysisFromSupabase(judgeId, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, returning null:', err);
    }
  }

  // Mock data doesn't have AI analysis
  return null;
}

/**
 * Get top judges for a given NOS code
 */
export async function getTopJudgesForNOS(
  nosCode: number,
  district?: string,
  minCases?: number,
  limit: number = 10
): Promise<JudgeWithStats[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchTopJudgesForNOSFromSupabase(nosCode, district, minCases, limit, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  // Mock data fallback
  const statistics = mockJudgesData.statistics.filter(
    (s) => s.nos_code === nosCode && (!minCases || s.total_cases >= minCases)
  );

  const topStats = statistics
    .sort((a, b) => (b.plaintiff_win_rate || 0) - (a.plaintiff_win_rate || 0))
    .slice(0, limit);

  const judgeIds = new Set<string>();
  topStats.forEach((s) => {
    judgeIds.add(s.judge_id);
  });

  const result: JudgeWithStats[] = [];
  Array.from(judgeIds).forEach((judgeId) => {
    const judge = mockJudgesData.judges.find((j) => j.id === judgeId);
    if (judge && (!district || judge.district_id === district)) {
      const judgeStats = mockJudgesData.statistics.filter((s) => s.judge_id === judgeId);
      result.push(calculateJudgeOverallStats(judge, judgeStats));
    }
  });

  return result.slice(0, limit);
}

/**
 * Get all active judges in a district
 */
export async function getDistrictJudges(districtId: string): Promise<JudgeWithStats[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseAvailable() && supabaseUrl && supabaseKey) {
    try {
      return await fetchDistrictJudgesFromSupabase(districtId, supabaseUrl, supabaseKey);
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to mock data:', err);
    }
  }

  // Mock data fallback
  const judges = mockJudgesData.judges
    .filter((j) => j.district_id === districtId && j.is_active)
    .sort((a, b) => a.full_name.localeCompare(b.full_name));

  return judges.map((judge) => {
    const statistics = mockJudgesData.statistics.filter((s) => s.judge_id === judge.id);
    return calculateJudgeOverallStats(judge, statistics);
  });
}

/**
 * Search judges by name
 */
export async function searchJudges(query: string, limit: number = 10): Promise<JudgeWithStats[]> {
  const result = await getJudges({
    nameSearch: query,
    limit,
    offset: 0,
  });

  return result.judges;
}
