'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Critical error:', error?.message || error, error?.digest);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" style={{ background: 'var(--color-surface-1)', margin: 0, padding: 0 }}>
      <head>
        <title>Error — MyCaseValue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="var(--accent-primary)" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: var(--color-surface-1);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
          }
        `}</style>
      </head>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-surface-1)',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              textAlign: 'center',
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '48px 32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '4px',
                background: 'rgba(0,105,151,0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--link, #0A50A2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 12px',
                maxWidth: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              We encountered a critical error.
            </p>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 28px',
                maxWidth: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Please try refreshing the page or contact support.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <style>{`
                .ge-btn-primary:hover { background: var(--gold-hover, #A87222) !important; }
                .ge-btn-secondary:hover { background: rgba(255,255,255,0.1) !important; }
              `}</style>
              <button
                type="button"
                onClick={reset}
                className="ge-btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 200ms',
                }}
              >
                Try again
              </button>
              <a
                href="/"
                className="ge-btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'var(--color-surface-1)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 200ms',
                  cursor: 'pointer',
                }}
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
