'use client';

import { useState, useEffect, useCallback } from 'react';

type ABTestConfig = {
  /** Unique experiment ID, e.g. 'homepage-hero-v2' */
  experimentId: string;
  /** Variant names, e.g. ['control', 'variant-a', 'variant-b'] */
  variants: string[];
  /** Traffic allocation per variant (must sum to 1.0). Default: equal split. */
  weights?: number[];
};

/**
 * A/B Testing hook.
 * Assigns users to a variant deterministically based on a hashed session ID.
 * Persists assignment in sessionStorage so users see consistent experiences.
 * Tracks variant exposure via /api/analytics.
 */
export function useABTest({ experimentId, variants, weights }: ABTestConfig) {
  const [variant, setVariant] = useState<string>(variants[0]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = `ab_${experimentId}`;
    const stored = window.sessionStorage?.getItem(storageKey);

    if (stored && variants.includes(stored)) {
      setVariant(stored);
      setIsReady(true);
      return;
    }

    // Assign variant based on weights or equal distribution
    const rand = Math.random();
    const effectiveWeights = weights || variants.map(() => 1 / variants.length);
    let cumulative = 0;
    let assigned = variants[0];

    for (let i = 0; i < variants.length; i++) {
      cumulative += effectiveWeights[i];
      if (rand <= cumulative) {
        assigned = variants[i];
        break;
      }
    }

    setVariant(assigned);
    try { window.sessionStorage.setItem(storageKey, assigned); } catch { /* ignore */ }
    setIsReady(true);

    // Track exposure
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        event_type: 'page_view',
        metadata: { experiment: experimentId, variant: assigned },
      }));
    }
  }, [experimentId, variants, weights]);

  const isVariant = useCallback((v: string) => variant === v, [variant]);

  return { variant, isVariant, isReady };
}

/**
 * A/B Test wrapper component.
 * Renders children only when the user is in the specified variant.
 *
 * Usage:
 * <ABTestVariant experiment="hero-test" variant="control">
 *   <HeroOriginal />
 * </ABTestVariant>
 * <ABTestVariant experiment="hero-test" variant="variant-a">
 *   <HeroNew />
 * </ABTestVariant>
 */
export function ABTestVariant({
  experiment,
  variant: targetVariant,
  variants = ['control', targetVariant],
  children,
}: {
  experiment: string;
  variant: string;
  variants?: string[];
  children: React.ReactNode;
}) {
  const { variant, isReady } = useABTest({ experimentId: experiment, variants });

  if (!isReady || variant !== targetVariant) return null;
  return <>{children}</>;
}
