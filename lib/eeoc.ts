/**
 * EEOC charge data integration
 * Static data sourced from EEOC annual reports (2019-2023)
 *
 * Future: This will be replaced with a Supabase Edge Function pipeline
 * that fetches from data.eeoc.gov API and caches results daily.
 *
 * Reference: https://www.eeoc.gov/statistics/charge-statistics
 */

import eeocData from '../data/eeoc-charges.json';

export interface EEOCBasisBreakdown {
  race: number;
  sex: number;
  disability: number;
  retaliation: number;
  age: number;
  religion: number;
  national_origin: number;
  color: number;
  equal_pay: number;
  genetic_info: number;
}

export interface EEOCYearData {
  year: number;
  totalCharges: number;
  basisBreakdown: EEOCBasisBreakdown;
  meritResolutions: number;
  rightToSueIssued: number;
  percentFederalLawsuit: number;
}

/**
 * Get the latest year's EEOC charge data
 */
export function getEEOCData(): EEOCYearData {
  const years = eeocData.years as EEOCYearData[];
  return years[years.length - 1];
}

/**
 * Get historical EEOC charge data for all years
 */
export function getEEOCTrend(): EEOCYearData[] {
  return eeocData.years as EEOCYearData[];
}

/**
 * Calculate percentage of charges resulting in merit resolutions
 */
export function getEEOCMeritResolutionRate(): number {
  const data = getEEOCData();
  return Number(((data.meritResolutions / data.totalCharges) * 100).toFixed(1));
}

/**
 * Calculate percentage of charges resulting in right-to-sue letters
 */
export function getEEOCRightToSueRate(): number {
  const data = getEEOCData();
  return Number(((data.rightToSueIssued / data.totalCharges) * 100).toFixed(1));
}

/**
 * Get the most common bases for charges
 */
export function getTopBases(limit: number = 5): Array<{ basis: string; count: number; percentage: number }> {
  const data = getEEOCData();
  const basesArray = Object.entries(data.basisBreakdown).map(([basis, count]) => ({
    basis: basis.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count: count as number,
    percentage: Number((((count as number) / data.totalCharges) * 100).toFixed(1)),
  }));

  return basesArray.sort((a, b) => b.count - a.count).slice(0, limit);
}
