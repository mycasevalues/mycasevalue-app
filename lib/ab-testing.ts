/**
 * A/B Testing Infrastructure
 * Provides deterministic experiment variant assignment using hash-based bucketing
 * Uses cookies or in-memory state (no localStorage/sessionStorage)
 */

export interface Experiment {
  id: string;
  name: string;
  variants: string[];
  weights?: number[];
  description?: string;
}

/**
 * Simple hash function for deterministic variant assignment
 * Converts a string to a number between 0 and 1
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) / 2147483647;
}

/**
 * Get weighted random index based on weights
 * If no weights provided, uses uniform distribution
 */
function getWeightedIndex(hash: number, weights?: number[]): number {
  if (!weights || weights.length === 0) {
    // Uniform distribution
    return Math.floor(hash * 10); // 0-9
  }

  // Normalize weights to sum to 1
  const sum = weights.reduce((a, b) => a + b, 0);
  const normalized = weights.map((w) => w / sum);

  // Determine which variant based on cumulative weight
  let cumulative = 0;
  for (let i = 0; i < normalized.length; i++) {
    cumulative += normalized[i];
    if (hash < cumulative) {
      return i;
    }
  }

  return normalized.length - 1;
}

/**
 * Assign a user to an experiment variant
 * Uses deterministic hash-based bucketing for consistent assignment across sessions
 * @param experimentId - The experiment ID
 * @param userId - Optional user ID; if not provided, generates a random assignment
 * @returns The assigned variant
 */
export function getVariant(experimentId: string, userId?: string): string {
  const experiment = EXPERIMENTS[experimentId as keyof typeof EXPERIMENTS];

  if (!experiment) {
    return experiment?.variants[0] || 'control';
  }

  // Use userId if provided, otherwise use a random value
  // In a real app, you'd use a persistent user ID from authentication
  const bucketing = userId || Math.random().toString();

  // Create a deterministic hash from experiment ID + user ID
  const hash = hashString(`${experimentId}:${bucketing}`);

  // Get the index of the variant
  const index = getWeightedIndex(hash % 1, experiment.weights);

  // Return the variant (clamped to valid range)
  return experiment.variants[Math.min(index % experiment.variants.length, experiment.variants.length - 1)];
}

/**
 * Check if a user is assigned to a specific variant
 */
export function isVariant(
  experimentId: string,
  variantName: string,
  userId?: string
): boolean {
  return getVariant(experimentId, userId) === variantName;
}

/**
 * Initial experiments configuration
 * Add new experiments here as { [experimentId]: { id, name, variants, weights?, description? } }
 */
export const EXPERIMENTS = {
  hero_cta_text: {
    id: 'hero_cta_text',
    name: 'Hero CTA Button Text',
    description: 'Test different hero button copy for conversion',
    variants: ['Check my case type', 'See my odds', 'Get my free report'],
    weights: [0.33, 0.33, 0.34], // Equal split
  },
  pricing_layout: {
    id: 'pricing_layout',
    name: 'Pricing Page Layout',
    description: 'Test card vs table layout for pricing section',
    variants: ['cards', 'table'],
    weights: [0.5, 0.5], // Equal split
  },
  report_depth: {
    id: 'report_depth',
    name: 'Report Display Order',
    description: 'Test whether showing summary first converts better',
    variants: ['summary_first', 'deep_dive_first'],
    weights: [0.5, 0.5], // Equal split
  },
  premium_badge: {
    id: 'premium_badge',
    name: 'Premium Badge Text',
    description: 'Test different premium feature messaging',
    variants: ['premium', 'pro', 'professional'],
    weights: [0.33, 0.33, 0.34],
  },
  report_style: {
    id: 'report_style',
    name: 'Report Display Style',
    description: 'Test different report presentation styles',
    variants: ['minimalist', 'detailed', 'visual'],
    weights: [0.33, 0.33, 0.34],
  },
} as const satisfies Record<string, Experiment>;

/**
 * Type-safe experiment IDs
 */
export type ExperimentId = keyof typeof EXPERIMENTS;

/**
 * Get all active experiments
 */
export function getActiveExperiments(): Experiment[] {
  return Object.values(EXPERIMENTS);
}

/**
 * Get experiment by ID with type safety
 */
export function getExperiment(id: ExperimentId): Experiment {
  return EXPERIMENTS[id];
}
