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
        background: 'var(--bg-base)',
        fontFamily: 'Roboto, system-ui, sans-serif',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: 'rgba(239, 68, 68, 0.08)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Error badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 14px',
            borderRadius: 9999,
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            marginBottom: 16,
            fontSize: 12,
            fontWeight: 700,
            color: '#EF4444',
            fontFamily: '"PT Mono", monospace',
            letterSpacing: '0.05em',
          }}
        >
          SOMETHING WENT WRONG
        </div>

        <h1
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}
        >
          Unexpected error
        </h1>
        <p
          style={{
            fontSize: 15,
            color: '#6B7280',
            lineHeight: 1.6,
            margin: '0 0 8px',
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
              fontSize: 12,
              color: 'var(--fg-subtle)',
              margin: '0 0 28px',
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        {!error.digest && <div style={{ height: 20 }} />}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              background: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              fontFamily: 'Montserrat, system-ui, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 200ms',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              padding: '14px 28px',
              background: 'transparent',
              color: '#6B7280',
              border: '1px solid var(--border-default)',
              borderRadius: 12,
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </a>
        </div>

        <p
          style={{
            fontSize: 12,
            color: 'var(--fg-subtle)',
            marginTop: 40,
          }}
        >
          If this keeps happening, please <a href="/contact" style={{ color: '#8B5CF6', textDecoration: 'underline' }}>contact support</a>.
        </p>
      </div>
    </div>
  );
}
