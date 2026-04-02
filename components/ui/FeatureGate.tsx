'use client';

import React from 'react';
import { type Tier, type FeatureKey, canAccess, getRequiredTier, TIER_LABELS, FEATURE_DESCRIPTIONS } from '../../lib/access';

interface FeatureGateProps {
  /** Current user's tier */
  userTier: Tier;
  /** Feature being gated */
  feature: FeatureKey;
  /** Content to show when user has access */
  children: React.ReactNode;
  /** Language for localization */
  lang?: 'en' | 'es';
  /** Optional custom locked message */
  lockedMessage?: string;
}

/**
 * FeatureGate — Paper-styled inline upgrade card.
 *
 * Never shows a blank white space where gated content would be.
 * Always shows a Paper-styled upgrade card with lock icon, feature name,
 * required tier, and upgrade CTA.
 */
export default function FeatureGate({
  userTier,
  feature,
  children,
  lang = 'en',
  lockedMessage,
}: FeatureGateProps) {
  if (canAccess(userTier, feature)) {
    return <>{children}</>;
  }

  const requiredTier = getRequiredTier(feature);
  const tierLabel = TIER_LABELS[requiredTier]?.[lang] || TIER_LABELS[requiredTier]?.en || 'Premium';
  const featureDesc = FEATURE_DESCRIPTIONS[feature]?.[lang] || FEATURE_DESCRIPTIONS[feature]?.en || feature;

  return (
    <div
      className="flex items-start gap-3"
      style={{
        background: 'rgba(139,92,246,0.04)',
        border: '1px solid rgba(139,92,246,0.15)',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      {/* Lock icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>

      <div className="flex-1 min-w-0">
        {/* Feature name + tier */}
        <p
          className="text-sm leading-snug"
          style={{ color: '#6B7280', fontFamily: 'Roboto, system-ui, sans-serif' }}
        >
          {lockedMessage || (
            <>
              <span style={{ fontWeight: 600, color: '#374151' }}>{featureDesc}</span>
              {' · '}
              {lang === 'es' ? 'Disponible en ' : 'Available on '}
              <span style={{ color: '#8B5CF6', fontWeight: 600 }}>{tierLabel}</span>
            </>
          )}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-3">
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all hover:opacity-90"
            style={{
              borderRadius: '9999px',
              background: '#111111',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {lang === 'es' ? 'Actualizar' : 'Upgrade'}
          </a>
          <a
            href="/pricing"
            className="text-xs font-medium transition-colors hover:opacity-80"
            style={{
              color: '#6B7280',
              textDecoration: 'none',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {lang === 'es' ? 'Ver todos los planes' : 'See all plans'}
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact inline lock indicator for use inside tables, lists, etc.
 */
export function FeatureLockBadge({
  feature,
  lang = 'en',
}: {
  feature: FeatureKey;
  lang?: 'en' | 'es';
}) {
  const requiredTier = getRequiredTier(feature);
  const tierLabel = TIER_LABELS[requiredTier]?.[lang] || TIER_LABELS[requiredTier]?.en || 'Premium';

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
      style={{
        borderRadius: '9999px',
        background: 'rgba(139,92,246,0.10)',
        color: '#7C3AED',
        border: '1px solid rgba(139,92,246,0.20)',
        fontFamily: 'Roboto, system-ui, sans-serif',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      {tierLabel}
    </span>
  );
}
