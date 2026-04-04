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
    /* silent */
  }, [error]);

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        padding: '48px 24px',
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

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#F0F2F5',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'rgba(240, 242, 245, 0.70)',
            lineHeight: 1.6,
            margin: '0 0 24px',
            maxWidth: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          We hit an issue loading this page. This is usually temporary.
        </p>

        {error.digest && (
          <p
            style={{
              fontFamily: '"PT Mono", monospace',
              fontSize: '12px',
              color: 'rgba(240, 242, 245, 0.30)',
              margin: '0 0 24px',
              wordBreak: 'break-all',
            }}
          >
            Error ID: {error.digest}
          </p>
        )}

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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
