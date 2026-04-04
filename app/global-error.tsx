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
    /* silent */
  }, [error]);

  return (
    <html style={{ background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%)', margin: 0, padding: 0 }}>
      <head>
        <title>Error — MyCaseValue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e27" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%);
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
            background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%)',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 480,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: '12px',
              padding: '48px 32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(24, 86, 255, 0.12)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1856FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#F0F2F5',
                margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: 'rgba(240, 242, 245, 0.70)',
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
                color: 'rgba(240, 242, 245, 0.30)',
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
                  background: '#1856FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  boxShadow: '0 4px 12px rgba(24, 86, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#3D72FF';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(24, 86, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#1856FF';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(24, 86, 255, 0.3)';
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
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#F0F2F5',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 200ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.background = 'rgba(255, 255, 255, 0.12)';
                  (e.target as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.20)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.background = 'rgba(255, 255, 255, 0.06)';
                  (e.target as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.10)';
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
