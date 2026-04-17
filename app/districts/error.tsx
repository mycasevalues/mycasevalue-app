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
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surf, #F6F5F2)',
      fontFamily: 'var(--font-ui)',
      padding: '24px',
      position: 'relative',
    }}>
      {/* Dark navy header bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: 'var(--accent-primary)',
      }} />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          maxWidth: 480,
          textAlign: 'center',
          background: 'var(--card)',
          border: '1px solid var(--bdr)',
          borderRadius: '4px',
          padding: '48px 32px',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '4px',
            background: 'rgba(0,105,151,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--text1, #18181A)',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}>
            Something went wrong
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--text2, #42403C)',
            lineHeight: 1.6,
            margin: '0 0 24px',
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            We encountered an unexpected error loading this page. Please try again.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'var(--accent-primary)',
                color: 'var(--card)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 200ms',
                boxShadow: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
              Try again
            </button>
            <a
              href="/districts"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'var(--surf, #F6F5F2)',
                color: 'var(--text1, #18181A)',
                border: '1px solid var(--bdr)',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 200ms',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
              </svg>
              Back to districts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
