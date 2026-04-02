'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B1221',
        fontFamily: "'Outfit', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 440,
          textAlign: 'center',
          padding: '48px 32px',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 16,
            color: '#EF4444',
          }}
        >
          Error
        </div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#F0F2F5',
            marginBottom: 8,
          }}
        >
          Something went wrong
        </h2>
        <p
          style={{
            fontSize: 14,
            color: '#B0BDD0',
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          We encountered an unexpected error.
        </p>
        <p
          style={{
            fontSize: 13,
            color: '#8B95A5',
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Please try again or return to the homepage.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={reset}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
              boxShadow: '0 4px 14px rgba(64, 64, 242, 0.22)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(64, 64, 242, 0.28)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(64, 64, 242, 0.22)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 32px',
              background: 'transparent',
              color: '#B0BDD0',
              border: '1px solid #1E293B',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.borderColor = '#4F46E5';
              (e.target as HTMLAnchorElement).style.color = '#F0F2F5';
              (e.target as HTMLAnchorElement).style.background = 'rgba(79, 70, 229, 0.08)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.borderColor = '#1E293B';
              (e.target as HTMLAnchorElement).style.color = '#B0BDD0';
              (e.target as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
