/**
 * Format a settlement amount for display.
 * Values from REAL_DATA rng fields are stored in THOUSANDS (59 = $59,000).
 *
 * @param valueInThousands - The value in thousands (from realdata.ts rng fields)
 * @param options - Formatting options
 * @returns Formatted string like "$59,000" or "$59K" (compact)
 */
export function formatSettlementAmount(
  valueInThousands: number,
  options?: { compact?: boolean }
): string {
  const rawDollars = valueInThousands * 1000;

  if (options?.compact) {
    if (rawDollars >= 1_000_000) {
      return `$${(rawDollars / 1_000_000).toFixed(1)}M`;
    }
    if (rawDollars >= 1_000) {
      return `$${Math.round(rawDollars / 1_000)}K`;
    }
    return `$${rawDollars}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(rawDollars);
}

/**
 * Get win rate color based on value.
 * Green >= 50%, Amber 35-49%, Red < 35%
 */
export function getWinRateColor(rate: number): string {
  if (rate >= 50) return 'var(--color-data-positive)';
  if (rate >= 35) return 'var(--color-data-neutral)';
  return 'var(--color-data-negative)';
}
