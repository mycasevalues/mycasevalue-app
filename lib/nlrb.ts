/**
 * NLRB case data integration
 * Static data sourced from NLRB annual reports (2019-2023)
 *
 * Future: This will be replaced with a Supabase Edge Function pipeline
 * that fetches from nlrb.gov API and caches results daily.
 *
 * Reference: https://www.nlrb.gov/news-media/news-stories/nlrb-statistics
 */

import nlrbData from '../data/nlrb-data.json';

export interface NLRBYearData {
  year: number;
  totalCharges: number;
  unfairLaborPractice: number;
  representationPetitions: number;
  settledCases: number;
  withdrawnCases: number;
  dismissedCases: number;
  complaintIssued: number;
  boardDecisions: number;
  electionsConducted: number;
}

/**
 * Get the latest year's NLRB case data
 */
export function getNLRBData(): NLRBYearData {
  const years = nlrbData.years as NLRBYearData[];
  return years[years.length - 1];
}

/**
 * Get historical NLRB case data for all years
 */
export function getNLRBTrend(): NLRBYearData[] {
  return nlrbData.years as NLRBYearData[];
}

/**
 * Calculate percentage of charges that are ULP vs representation petitions
 */
export function getULPPercentage(): number {
  const data = getNLRBData();
  return Number(((data.unfairLaborPractice / data.totalCharges) * 100).toFixed(1));
}

/**
 * Calculate percentage of charges that are representation petitions
 */
export function getRepresentationPetitionPercentage(): number {
  const data = getNLRBData();
  return Number(((data.representationPetitions / data.totalCharges) * 100).toFixed(1));
}

/**
 * Get outcome breakdown for latest year
 */
export function getOutcomeBreakdown(): Record<string, number> {
  const data = getNLRBData();
  return {
    settled: data.settledCases,
    withdrawn: data.withdrawnCases,
    dismissed: data.dismissedCases,
    complaintIssued: data.complaintIssued,
  };
}
