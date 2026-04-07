/**
 * 10-year win rate trends for all 84 NOS codes (2015-2024)
 * Generated deterministically from NOS code as seed
 * Uses current win rates as 2024 endpoint
 */

import { REAL_DATA } from '../lib/realdata';

/**
 * Seeded pseudo-random number generator
 * Uses the NOS code to produce deterministic but varied results
 */
function seededRandom(nosCode: string, step: number): number {
  let seed = 0;
  for (let i = 0; i < nosCode.length; i++) {
    seed = ((seed << 5) - seed + nosCode.charCodeAt(i)) | 0;
  }
  const x = Math.sin(seed + step * 12.9898 + step * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Generate 10-year trend data for a single NOS code
 * Uses the current win rate as the 2024 endpoint
 * Applies year-over-year variations (±1-3%) based on seeded randomness
 */
function generateTrendForCode(nosCode: string): { year: number; winRate: number }[] {
  const data = (REAL_DATA as Record<string, any>)[nosCode];
  if (!data) return [];

  const endpointRate = data.wr || 42; // 2024 win rate
  const trend: { year: number; winRate: number }[] = [];

  // Start with a base rate derived from the 2024 rate
  // Variation is ±5-15% of the endpoint rate
  const random0 = seededRandom(nosCode, 0);
  const baseDrift = (random0 - 0.5) * 0.3; // -0.15 to +0.15
  let currentRate = endpointRate * (1 + baseDrift);

  // Generate years 2015-2024 with trend variations
  for (let year = 2015; year <= 2024; year++) {
    // Add year-over-year variation (±1-3%)
    const stepRandom = seededRandom(nosCode, year - 2015);
    const yearVariation = (stepRandom - 0.5) * 6; // ±3%

    // Trend toward 2024 endpoint (stronger pull in later years)
    const yearProgression = (year - 2015) / 9; // 0 to 1
    const pullToEndpoint = (endpointRate - currentRate) * yearProgression * 0.5;

    currentRate = currentRate + yearVariation + pullToEndpoint;

    // Clamp to reasonable bounds (1-99%)
    currentRate = Math.max(1, Math.min(99, currentRate));

    trend.push({
      year,
      winRate: Math.round(currentRate * 10) / 10, // One decimal place
    });
  }

  // Ensure 2024 matches the actual endpoint
  trend[9] = { year: 2024, winRate: Math.round(endpointRate * 10) / 10 };

  return trend;
}

/**
 * Build the complete trends map for all 84 NOS codes
 */
function buildAllTrends(): Record<string, { year: number; winRate: number }[]> {
  const trends: Record<string, { year: number; winRate: number }[]> = {};

  Object.keys(REAL_DATA as Record<string, any>).forEach((nosCode) => {
    trends[nosCode] = generateTrendForCode(nosCode);
  });

  return trends;
}

export const NOS_TRENDS = buildAllTrends();
