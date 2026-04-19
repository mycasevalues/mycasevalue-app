'use client';

/**
 * TrustBadges.tsx
 * LexisNexis-style trust/credibility badges section for home page
 * Displays key statistics in a responsive grid with dividers
 */

import AnimatedCounter from './AnimatedCounter';

export default function TrustBadges() {
  const badges = [
    {
      stat: <AnimatedCounter end={500} suffix="K+" />,
      label: 'Cases Analyzed',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Database/chart icon */}
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      ),
    },
    {
      stat: <AnimatedCounter end={94} />,
      label: 'Federal Districts Covered',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Map/location icon */}
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      stat: <AnimatedCounter end={10} suffix="+" />,
      label: 'Years of Court Data',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Calendar icon */}
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      stat: 'Real',
      label: 'Court Statistics',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Checkmark/verified icon */}
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        background: 'var(--color-surface-1)',
        padding: '48px 24px',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {/* Desktop: 4-column row with dividers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
          }}
          className="trust-badges-grid"
        >
          {badges.map((badge, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingRight: idx < badges.length - 1 ? '32px' : '0',
                borderRight: idx < badges.length - 1 ? '1px solid var(--border-default)' : 'none',
              }}
            >
              {/* Icon */}
              <div style={{ marginBottom: '12px', color: 'var(--accent-primary-hover)' }}>
                {badge.icon}
              </div>
              {/* Stat number */}
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.2,
                  marginBottom: '8px',
                }}
              >
                {badge.stat}
              </div>
              {/* Label */}
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile responsive styles via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .trust-badges-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }

          .trust-badges-grid > div {
            padding-right: 0 !important;
            border-right: none !important;
            padding-bottom: 24px;
          }

          .trust-badges-grid > div:nth-child(odd) {
            border-right: 1px solid var(--border-default);
            padding-right: 24px;
          }

          .trust-badges-grid > div:nth-child(1),
          .trust-badges-grid > div:nth-child(2) {
            border-bottom: 1px solid var(--border-default);
            padding-bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
}
