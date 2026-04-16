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
      background: '#F7F7F5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
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
        background: '#E65C00',
      }} />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          maxWidth: 480,
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          padding: '48px 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {/* Icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '12px',
            background: 'rgba(0,82,204,0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#1A1A1A',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}>
            Unable to load judge data
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#444444',
            lineHeight: 1.6,
            margin: '0 0 24px',
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            We encountered an issue loading the judge directory. Please try again or browse our judge analytics to research federal judges.
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
                background: '#E65C00',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
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
              href="/judges"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                background: '#F7F7F5',
                color: '#1A1A1A',
                border: '1px solid #E0E0E0',
                borderRadius: '12px',
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
              Judge directory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
