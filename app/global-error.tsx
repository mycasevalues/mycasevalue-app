'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Critical error:', error?.message || error, error?.digest);
  }, [error]);

  return (
    <html style={{ background: '#F7F8FA', margin: 0, padding: 0 }}>
      <head>
        <title>Error — MyCaseValue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B3A5C" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: #F7F8FA;
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
            background: '#F7F8FA',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              textAlign: 'center',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '2px',
              padding: '48px 32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '2px',
                background: 'rgba(0,105,151,0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#212529',
                margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: '#4B5563',
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
                color: '#4B5563',
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
              <button
                type="button"
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#7C3AED';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#7C3AED';
                  (e.target as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: '#F5F5F5',
                  color: '#212529',
                  border: '1px solid #E5E7EB',
                  borderRadius: '2px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 200ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.background = '#EEEEEE';
                  (e.target as HTMLAnchorElement).style.borderColor = '#E5E7EB';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.background = '#F5F5F5';
                  (e.target as HTMLAnchorElement).style.borderColor = '#E5E7EB';
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
