/**
 * OSHA inspection and citation data integration
 * Static data sourced from OSHA enforcement statistics (2019-2023)
 *
 * Future: This will be replaced with a Supabase Edge Function pipeline
 * that fetches from OSHA API and caches results daily.
 *
 * Reference: https://www.osha.gov/data
 */

import oshaData from '../data/osha-data.json';

export interface OSHAStateData {
  state: string;
  inspections: number;
  citations: number;
  averagePenalty: number;
}

export interface OSHAYearData {
  year: number;
  totalInspections: number;
  totalCitations: number;
  totalPenalties: number;
  averagePenalty: number;
  seriousViolations: number;
  willfulViolations: number;
  repeatViolations: number;
  otherViolations: number;
  topStates: OSHAStateData[];
}

/**
 * Get the latest year's OSHA enforcement data
 */
export function getOSHAData(): OSHAYearData {
  const years = oshaData.years as OSHAYearData[];
  return years[years.length - 1];
}

/**
 * Get historical OSHA enforcement data for all years
 */
export function getOSHATrend(): OSHAYearData[] {
  return oshaData.years as OSHAYearData[];
}

/**
 * Calculate percentage of violations by type
 */
export function getViolationTypePercentages(): Record<string, number> {
  const data = getOSHAData();
  const total = data.totalCitations;

  return {
    serious: Number(((data.seriousViolations / total) * 100).toFixed(1)),
    willful: Number(((data.willfulViolations / total) * 100).toFixed(1)),
    repeat: Number(((data.repeatViolations / total) * 100).toFixed(1)),
    other: Number(((data.otherViolations / total) * 100).toFixed(1)),
  };
}
