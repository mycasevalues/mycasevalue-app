'use client';

import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Root Error]', error?.message || error, error?.digest);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surf, #F6F5F2)',
        fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
        padding: 0,
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
          {/* Card top accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'var(--chrome-bg, #1B2D45)',
              borderRadius: '4px 4px 0 0',
            }}
          />

          {/* Alert icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 4,
              background: 'rgba(176, 30, 30, 0.06)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <svg
              width="32"
              height="32"
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
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--chrome-bg, #1B2D45)',
              margin: '0 0 10px',
              fontFamily: "var(--font-legal, 'Libre Baskerville', serif)",
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            Something went wrong
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
            We encountered an unexpected issue loading this page. Your data is
            safe. Please try again, or return to the homepage if the problem
            persists.
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
              Error ID: {error.digest}
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
              href="/"
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
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go Home
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
              href="mailto:support@mycasevalues.com?subject=Error%20Report"
              style={{
                color: 'var(--link, #0A50A2)',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
