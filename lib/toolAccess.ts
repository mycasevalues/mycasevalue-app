/**
 * Attorney Tool Access Configuration
 *
 * Defines which attorney tools are free vs premium (Attorney tier, $29.99/mo).
 * Used by AuthGate to decide whether to show a paywall.
 */

export interface ToolAccessEntry {
  slug: string;
  label: string;
  premium: boolean;
}

const FREE_TOOL_SLUGS = new Set([
  'calculator',
  'sol-calculator',
  'deadline-calculator',
]);

const PREMIUM_TOOL_SLUGS = new Set([
  'keycite',
  'advanced-search',
  'case-predictor',
  'demand-letter',
  'negotiation',
  'deposition-prep',
  'compare-text',
  'alerts',
  'secondary-sources',
  'state-survey',
  'find-print',
  'folders',
  'fee-calculator',
  'venue-optimizer',
]);

/**
 * Full tool access config with human-readable labels.
 */
export const TOOL_ACCESS: ToolAccessEntry[] = [
  // Free tools
  { slug: 'calculator', label: 'Settlement Calculator', premium: false },
  { slug: 'sol-calculator', label: 'Statute of Limitations Calculator', premium: false },
  { slug: 'deadline-calculator', label: 'Deadline Calculator', premium: false },
  // Premium tools
  { slug: 'keycite', label: 'Citation Check', premium: true },
  { slug: 'advanced-search', label: 'Advanced Legal Search', premium: true },
  { slug: 'case-predictor', label: 'Case Outcome Predictor', premium: true },
  { slug: 'demand-letter', label: 'Demand Letter Generator', premium: true },
  { slug: 'negotiation', label: 'Negotiation Intelligence', premium: true },
  { slug: 'deposition-prep', label: 'Deposition Prep', premium: true },
  { slug: 'compare-text', label: 'Compare Text', premium: true },
  { slug: 'alerts', label: 'Case & Citation Alerts', premium: true },
  { slug: 'secondary-sources', label: 'Secondary Sources', premium: true },
  { slug: 'state-survey', label: 'State Law Survey', premium: true },
  { slug: 'find-print', label: 'Find & Print', premium: true },
  { slug: 'folders', label: 'Research Folders', premium: true },
  { slug: 'fee-calculator', label: 'Attorney Fee Calculator', premium: true },
  { slug: 'venue-optimizer', label: 'Venue Optimizer', premium: true },
];

/**
 * Check whether an attorney tool slug requires the premium Attorney tier.
 * Unknown slugs default to premium (fail-closed).
 */
export function isToolPremium(toolSlug: string): boolean {
  if (FREE_TOOL_SLUGS.has(toolSlug)) return false;
  if (PREMIUM_TOOL_SLUGS.has(toolSlug)) return true;
  // Unknown tools are treated as premium (fail-closed)
  return true;
}

/**
 * Get the display label for a tool slug, or null if unknown.
 */
export function getToolLabel(toolSlug: string): string | null {
  return TOOL_ACCESS.find((t) => t.slug === toolSlug)?.label ?? null;
}
