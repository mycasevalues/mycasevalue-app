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
    console.error('Global error:', error);
  }, [error]);

  return (
    <html style={{ background: '#F9F8F6' }}>
      <head>
        <title>Error — MyCaseValue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F9F8F6" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F9F8F6' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F9F8F6',
            fontFamily: "'Roboto', system-ui, sans-serif",
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
                color: '#111827',
                marginBottom: 8,
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: 14,
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              We encountered a critical error.
            </p>
            <p
              style={{
                fontSize: 13,
                color: '#9CA3AF',
                lineHeight: 1.6,
                marginBottom: 32,
              }}
            >
              Please try refreshing the page or contact support.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 32px',
                  background: 'linear-gradient(135deg, #111111, #333333)',
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
                  color: '#6B7280',
                  border: '1px solid #E5E0D8',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 200ms',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.borderColor = '#111111';
                  (e.target as HTMLAnchorElement).style.color = '#111827';
                  (e.target as HTMLAnchorElement).style.background = 'rgba(79, 70, 229, 0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.borderColor = '#E5E0D8';
                  (e.target as HTMLAnchorElement).style.color = '#6B7280';
                  (e.target as HTMLAnchorElement).style.background = 'transparent';
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
