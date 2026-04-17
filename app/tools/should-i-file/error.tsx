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
      fontFamily: 'var(--font-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif)',
      padding: '24px',
      position: 'relative',
    }}>
      {/* Light header bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: 'var(--gold, #C4882A)',
      }} />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          maxWidth: 480,
          textAlign: 'center',
          background: 'var(--card, #FFFFFF)',
          border: '1px solid var(--bdr, #E2DFD8)',
          borderRadius: '4px',
          padding: '48px 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {/* Icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '4px',
            background: 'rgba(10,80,162,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--link, #0A50A2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
            Unable to load filing decision tool
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--text3, #5F5C57)',
            lineHeight: 1.6,
            margin: '0 0 24px',
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            We encountered an issue loading the filing decision tool. Please try again or explore other tools.
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
                background: 'var(--gold, #C4882A)',
                color: 'var(--card, #FFFFFF)',
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
              href="/tools"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: 'var(--surf, #F6F5F2)',
                color: 'var(--text1, #18181A)',
                border: '1px solid var(--bdr, #E2DFD8)',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 200ms',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              All tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
