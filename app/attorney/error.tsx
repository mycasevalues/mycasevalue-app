'use client';

import { useEffect } from 'react';

export default function AttorneyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Attorney Error]', error?.message || error, error?.digest);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surf, #FFFFFF)',
        fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Top chrome accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'var(--chrome-bg, #1B2D45)',
        }}
      />

      <div
        style={{
          padding: '48px 24px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
            background: 'var(--card)',
            border: '1px solid var(--bdr, #E2DFD8)',
            borderRadius: 4,
            padding: '48px 36px',
            boxShadow: '0 2px 8px rgba(27, 45, 69, 0.07)',
            position: 'relative',
          }}
        >
          {/* Card top gold accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'var(--gold, #C4882A)',
              borderRadius: '4px 4px 0 0',
            }}
          />

          {/* Alert icon */}
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 4,
              background: 'rgba(176, 30, 30, 0.06)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 22,
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--data-negative, #B01E1E)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--chrome-bg, #1B2D45)',
              margin: '0 0 10px',
              fontFamily: "var(--font-legal, 'Libre Baskerville', serif)",
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            Unable to load attorney tool
          </h1>

          <p
            style={{
              fontSize: 14,
              color: 'var(--text-tertiary)',
              lineHeight: 1.65,
              margin: '0 0 12px',
              fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            This tool encountered an error. Please try refreshing, or return to
            the attorney dashboard to access other resources.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: 12,
                color: 'var(--text-placeholder)',
                margin: '0 0 24px',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
              }}
            >
              Reference: {error.digest}
            </p>
          )}

          {!error.digest && <div style={{ marginBottom: 24 }} />}

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                background: 'var(--chrome-bg, #1B2D45)',
                color: 'var(--chrome-text)',
                border: 'none',
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                cursor: 'pointer',
                transition: 'background 150ms ease',
                letterSpacing: '0.01em',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
              Try Again
            </button>
            <a
              href="/attorney"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                background: 'transparent',
                color: 'var(--chrome-bg, #1B2D45)',
                border: '1px solid var(--bdr, #E2DFD8)',
                borderRadius: 2,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
                letterSpacing: '0.01em',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Attorney Dashboard
            </a>
          </div>

          <p
            style={{
              fontSize: 12,
              color: 'var(--text-placeholder)',
              marginTop: 24,
              marginBottom: 0,
              fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
            }}
          >
            If this persists,{' '}
            <a
              href="mailto:support@mycasevalues.com?subject=Attorney%20Tool%20Error"
              style={{
                color: 'var(--link, #1A73E8)',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              report the issue
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
