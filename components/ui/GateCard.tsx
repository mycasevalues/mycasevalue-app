'use client';

import React from 'react';

interface GateCardProps {
  tier: 'free' | 'single' | 'unlimited' | 'attorney';
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  features?: string[];
  icon?: React.ReactNode;
  locked?: boolean;
  className?: string;
}

const tierColors: Record<string, { border: string; badge: string; badgeText: string }> = {
  free: { border: 'var(--border-default)', badge: 'var(--accent-primary-subtle)', badgeText: 'var(--accent-primary)' },
  single: { border: 'var(--accent-secondary-border)', badge: 'var(--accent-secondary-subtle)', badgeText: 'var(--accent-secondary)' },
  unlimited: { border: 'var(--accent-secondary)', badge: 'var(--accent-secondary)', badgeText: '#FFFFFF' },
  attorney: { border: 'var(--accent-primary)', badge: 'var(--accent-primary)', badgeText: '#FFFFFF' },
};

const tierLabels: Record<string, string> = {
  free: 'Free',
  single: 'Single Report',
  unlimited: 'Unlimited',
  attorney: 'Attorney Mode',
};

export function GateCard({
  tier,
  title,
  description,
  ctaLabel,
  onCtaClick,
  features = [],
  icon,
  locked = true,
  className = '',
}: GateCardProps) {
  const colors = tierColors[tier] || tierColors.free;

  return (
    <div className={`mcv-gate-card ${className}`} style={{ borderColor: colors.border }}>
      <div className="mcv-gate-card__header">
        <span className="mcv-gate-card__badge" style={{ background: colors.badge, color: colors.badgeText }}>
          {locked && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          )}
          {tierLabels[tier]}
        </span>
        {icon && <span className="mcv-gate-card__icon" aria-hidden="true">{icon}</span>}
      </div>

      <h3 className="mcv-gate-card__title">{title}</h3>
      <p className="mcv-gate-card__desc">{description}</p>

      {features.length > 0 && (
        <ul className="mcv-gate-card__features">
          {features.map((f, i) => (
            <li key={i}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--outcome-win)" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className={`mcv-btn mcv-btn--${tier === 'attorney' ? 'primary' : 'accent'} mcv-btn--md mcv-btn--full`}
        onClick={onCtaClick}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

export default GateCard;
