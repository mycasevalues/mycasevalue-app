import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist. Return to MyCaseValue to research federal court outcome data.',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        background: 'var(--color-surface-1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Dark navy header bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'var(--accent-primary)',
        }}
      />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: 560,
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '48px 32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* 404 Number */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '96px',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              lineHeight: 1,
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            404
          </div>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}
          >
            Page not found
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-text-secondary)',
              maxWidth: '460px',
              lineHeight: 1.6,
              margin: '0 0 32px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to researching federal court data.
          </p>

          <style>{`
            .notfound-link-primary {
              transition: all 200ms ease;
            }
            .notfound-link-primary:hover {
              background: var(--gold-hover, #A87222) !important;
              box-shadow: 0 4px 12px rgba(204, 79, 0, 0.3);
            }
            .notfound-link-secondary {
              transition: all 200ms ease;
            }
            .notfound-link-secondary:hover {
              background: rgba(255,255,255,0.1) !important;
              border-color: var(--bdr, #E2DFD8) !important;
            }
            .notfound-link-tertiary {
              transition: all 200ms ease;
            }
            .notfound-link-tertiary:hover {
              background: rgba(255,255,255,0.05) !important;
              border-color: var(--bdr, #E2DFD8) !important;
            }
          `}</style>

          {/* Primary actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
            <Link
              href="/"
              className="notfound-link-primary"
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
                textDecoration: 'none',
                boxShadow: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Go home
            </Link>

            <Link
              href="/cases"
              className="notfound-link-secondary"
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
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Browse cases
            </Link>
          </div>

          {/* Suggested links */}
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid var(--border-default)',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: '0 0 16px',
              }}
            >
              Popular pages
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px',
              }}
            >
              <Link
                href="/cases"
                className="notfound-link-tertiary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  background: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                Search cases
              </Link>
              <Link
                href="/districts"
                className="notfound-link-tertiary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  background: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                </svg>
                Districts
              </Link>
              <Link
                href="/pricing"
                className="notfound-link-tertiary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  background: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Pricing
              </Link>
              <Link
                href="/attorney"
                className="notfound-link-tertiary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 12px',
                  background: 'var(--color-surface-0)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                For attorneys
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
