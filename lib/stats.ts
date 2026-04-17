/**
 * stats.ts — Statistical utility functions for case analysis.
 * Includes confidence range calculations for win rates and settlement analysis.
 */

/**
 * Calculate a confidence range for a win rate based on sample size.
 * Uses 95% confidence interval (z-score 1.96) by default.
 * Returns low, high, and formatted display string.
 *
 * @param winRate - The win rate as a percentage (0-100)
 * @param sampleSize - Number of cases in sample
 * @param confidence - Z-score for confidence level (default 1.96 = 95%)
 * @returns Object with low, high, and display string
 */
export function confidenceRange(
  winRate: number,
  sampleSize: number,
  confidence = 1.96
): {
  low: number;
  high: number;
  display: string;
} {
  // For small samples (<30), don't calculate margin of error
  if (!sampleSize || sampleSize < 30) {
    return { low: winRate, high: winRate, display: `${winRate}%` };
  }

  // Convert percentage to proportion
  const p = winRate / 100;

  // Calculate margin of error using standard error formula
  const margin = confidence * Math.sqrt((p * (1 - p)) / sampleSize) * 100;

  // Clamp to 0-100 range and round
  const low = Math.max(0, Math.round(winRate - margin));
  const high = Math.min(100, Math.round(winRate + margin));

  return {
    low,
    high,
    display: `${low}–${high}%`,
  };
}

/**
 * Calculate settlement timing windows based on median case duration.
 *
 * @param medianMonths - Median case duration in months
 * @returns Object with early, peak, and late window months
 */
export function settlementWindows(medianMonths: number) {
  return {
    earlyWindow: Math.round(medianMonths * 0.4),
    peakWindow: Math.round(medianMonths * 0.7),
    lateWindow: Math.round(medianMonths * 0.9),
  };
}

/**
 * Format a percentage with optional confidence range.
 *
 * @param value - Numeric percentage value
 * @param includeConfidence - Whether to calculate confidence range
 * @param sampleSize - Sample size for confidence calculation
 * @returns Formatted string
 */
export function formatPercentage(
  value: number,
  includeConfidence = false,
  sampleSize = 0
): string {
  if (!includeConfidence) {
    return `${Math.round(value)}%`;
  }

  const range = confidenceRange(value, sampleSize);
  return range.display;
}

/**
 * Format a dollar amount for display.
 * - Values >= 1,000,000 → "$1.2M"
 * - Values >= 1,000 → "$187,200"
 * - Values < 1,000 → "$500"
 */
export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

/**
 * Format a duration in months for display.
 * - Whole months → "12 months"
 * - Fractional → "8.3 months"
 * - 1 month → "1 month"
 */
export function formatDuration(months: number): string {
  const formatted = months % 1 === 0 ? months.toFixed(0) : months.toFixed(1);
  return `${formatted} ${months === 1 ? 'month' : 'months'}`;
}
