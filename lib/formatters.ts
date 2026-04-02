/* ============================================================
   MYCASEVALUE — DATA FORMATTING STANDARDS
   All numbers must use these formatters. No exceptions.
   ============================================================ */

/** Percentage: always 1 decimal place, include % sign. e.g. "34.2%" */
export function formatPct(value: number): string {
  return `${Number(value).toFixed(1)}%`;
}

/** Large case count: comma-separated. e.g. "4,100,000" */
export function formatCount(value: number): string {
  return Number(value).toLocaleString('en-US');
}

/** Compact count: short form. e.g. "4.1M" or "12.5K" */
export function formatCountCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

/** Dollar amount display: $XK or $X.XM. e.g. "$85K", "$1.2M" */
export function formatDollar(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value.toLocaleString('en-US')}`;
}

/** Dollar full format: $1,234,567 */
export function formatDollarFull(value: number): string {
  return `$${Number(value).toLocaleString('en-US')}`;
}

/** Days: always integer, with "days" suffix. e.g. "142 days" */
export function formatDays(value: number): string {
  return `${Math.round(value)} days`;
}

/** Months: integer, with "mo" suffix. e.g. "14mo" */
export function formatMonths(value: number): string {
  return `${Math.round(value)}mo`;
}

/** Date compact: "Mar 2024" */
export function formatDateCompact(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Date full: "March 15, 2024" */
export function formatDateFull(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/** Relative time: "2h ago", "3d ago" */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDateCompact(d);
}
