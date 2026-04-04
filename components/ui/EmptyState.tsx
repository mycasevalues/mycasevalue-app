/**
 * EmptyState.tsx — Reusable empty state component.
 * Paper Design System styling.
 */

import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function EmptyState({ title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '64px 24px' }}>
      <div style={{
        width: '64px',
        height: '64px',
        background: '#EDE9FE',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: '24px', maxWidth: '300px', margin: '0 auto 24px' }}>
        {description}
      </p>
      <a href={ctaHref} style={{
        padding: '10px 24px',
        background: '#8B5CF6',
        color: '#FFFFFF',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'var(--font-display)',
      }}>
        {ctaLabel}
      </a>
    </div>
  );
}
