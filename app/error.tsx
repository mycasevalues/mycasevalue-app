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
        background: '#F9FAFB',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          textAlign: 'center',
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '48px 32px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#111111',
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: '#6B7280',
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
              color: '#9CA3AF',
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
              background: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#7C3AED';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = '#8B5CF6';
              (e.target as HTMLButtonElement).style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
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
              background: '#F3F4F6',
              color: '#111111',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#F3F4F6';
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
