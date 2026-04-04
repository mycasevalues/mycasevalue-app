import { REAL_DATA } from './realdata';
import { STATES } from './data';

export interface DistrictStats {
  slug: string;
  name: string;
  totalCases: number;
  winRate: number;
  settlementRate: number;
  medianDurationMonths: number;
  topCaseTypes: {
    nos: string;
    label: string;
    count: number;
    winRate: number;
    settlementRate: number;
  }[];
  caseTypeBreakdown: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

/**
 * Get district statistics for a given state slug
 * Aggregates win rates and settlement data from REAL_DATA
 */
export function getDistrictStats(stateSlug: string): DistrictStats | null {
  const state = STATES.find((s) => s.id === stateSlug);
  if (!state || !state.id) {
    return null;
  }

  // Collect all NOS codes with their data
  const nosEntries = Object.entries(REAL_DATA).filter(([_, data]) => data && data.state_rates);

  if (nosEntries.length === 0) {
    return null;
  }

  // Aggregate stats across all case types for this state
  let totalCases = 0;
  let totalWeightedWinRate = 0;
  let totalWeightedSettlement = 0;
  let totalMedianDuration = 0;
  const caseTypeStats: Record<
    string,
    {
      nos: string;
      label: string;
      count: number;
      winRate: number;
      settlementRate: number;
    }
  > = {};
  const categoryBreakdown: Record<string, number> = {};

  for (const [nos, data] of nosEntries) {
    if (!data.state_rates || !data.state_rates[stateSlug]) {
      continue;
    }

    const stateWinRate = data.state_rates[stateSlug] || data.wr || 50;

    // Estimate case volume for this state/NOS combination based on national total and rough state distribution
    // Using rough population-weighted distribution
    const stateCaseWeight = getStateWeight(stateSlug);
    const estimatedCases = Math.floor((data.total || 0) * stateCaseWeight);

    if (estimatedCases > 0) {
      totalCases += estimatedCases;
      totalWeightedWinRate += stateWinRate * estimatedCases;

      // Settlement rate from ends array
      const settlementEnd = data.ends?.find((e: any) => e.l === 'Settlement');
      const settlementRate = settlementEnd?.p || data.sp || 0;
      totalWeightedSettlement += settlementRate * estimatedCases;

      // Median duration
      const medianDuration = data.mo || 12;
      totalMedianDuration += medianDuration * estimatedCases;

      // Track case type
      if (!caseTypeStats[nos]) {
        caseTypeStats[nos] = {
          nos,
          label: data.label || `Case Type ${nos}`,
          count: estimatedCases,
          winRate: stateWinRate,
          settlementRate: settlementRate,
        };
      } else {
        caseTypeStats[nos].count += estimatedCases;
        caseTypeStats[nos].winRate = (caseTypeStats[nos].winRate + stateWinRate) / 2;
        caseTypeStats[nos].settlementRate = (caseTypeStats[nos].settlementRate + settlementRate) / 2;
      }

      // Track by category
      const category = data.category || 'Other';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + estimatedCases;
    }
  }

  // Calculate weighted averages
  const avgWinRate = totalCases > 0 ? totalWeightedWinRate / totalCases : 50;
  const avgSettlementRate = totalCases > 0 ? totalWeightedSettlement / totalCases : 40;
  const medianDurationMonths = totalCases > 0 ? Math.round(totalMedianDuration / totalCases) : 12;

  // Get top 10 case types by volume
  const topCaseTypes = Object.values(caseTypeStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Convert category breakdown to array and calculate percentages
  const caseTypeBreakdown = Object.entries(categoryBreakdown)
    .map(([category, count]) => ({
      category,
      count,
      percentage: totalCases > 0 ? Math.round((count / totalCases) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    slug: stateSlug,
    name: state.label,
    totalCases,
    winRate: Math.round(avgWinRate * 10) / 10,
    settlementRate: Math.round(avgSettlementRate * 10) / 10,
    medianDurationMonths,
    topCaseTypes,
    caseTypeBreakdown,
  };
}

/**
 * Get weighted distribution factor for a state based on population
 * Rough estimate for distributing national case volumes to states
 */
function getStateWeight(stateId: string): number {
  // Approximate state population weights (relative to national total)
  const stateWeights: Record<string, number> = {
    CA: 0.12,
    TX: 0.09,
    FL: 0.07,
    NY: 0.06,
    PA: 0.04,
    IL: 0.04,
    OH: 0.035,
    GA: 0.033,
    NC: 0.031,
    MI: 0.03,
    NJ: 0.028,
    VA: 0.027,
    WA: 0.024,
    AZ: 0.024,
    MA: 0.021,
    TN: 0.021,
    IN: 0.021,
    MO: 0.019,
    MD: 0.019,
    WI: 0.018,
    CO: 0.018,
    MN: 0.018,
    SC: 0.016,
    AL: 0.016,
    LA: 0.015,
    KY: 0.014,
    OR: 0.014,
    OK: 0.013,
    CT: 0.011,
    UT: 0.01,
    NV: 0.01,
    AR: 0.009,
    MS: 0.009,
    KS: 0.009,
    NM: 0.008,
    NE: 0.006,
    WV: 0.006,
    ID: 0.006,
    HI: 0.004,
    NH: 0.004,
    ME: 0.004,
    RI: 0.003,
    MT: 0.003,
    DE: 0.003,
    SD: 0.003,
    ND: 0.002,
    AK: 0.002,
    VT: 0.002,
    WY: 0.002,
    DC: 0.0025,
    PR: 0.0035,
    VI: 0.0005,
    GU: 0.0003,
  };

  return stateWeights[stateId] || 0.005;
}

/**
 * Get all district statistics
 */
export function getAllDistrictStats(): DistrictStats[] {
  const stateIds = STATES.filter((s) => s.id).map((s) => s.id);
  return stateIds
    .map((id) => getDistrictStats(id))
    .filter((stat) => stat !== null) as DistrictStats[];
}

/**
 * Get statistics for multiple districts for comparison
 */
export function getDistrictComparison(slugs: string[]): DistrictStats[] {
  return slugs
    .map((slug) => getDistrictStats(slug))
    .filter((stat) => stat !== null) as DistrictStats[];
}
