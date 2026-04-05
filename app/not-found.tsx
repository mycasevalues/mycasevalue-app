import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | MyCaseValue',
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
        background: '#F5F6F7',
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
          background: '#00172E',
        }}
      />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          maxWidth: 480,
          background: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
          padding: '48px 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {/* 404 Number */}
        <div
          style={{
            fontFamily: '"PT Mono", monospace',
            fontSize: '96px',
            fontWeight: 700,
            color: '#455A64',
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
            color: '#212529',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: '#455A64',
            maxWidth: '420px',
            lineHeight: 1.6,
            margin: '0 0 32px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to researching case data.
        </p>

        <style>{`
          .notfound-link-primary:hover {
            background: #E8171F;
            box-shadow: none;
          }
          .notfound-link-secondary:hover {
            background: #EEEEEE;
            border-color: #D5D8DC;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            className="notfound-link-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: '#E8171F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
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
            href="/search"
            className="notfound-link-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: '#F5F5F5',
              color: '#212529',
              border: '1px solid #D5D8DC',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search cases
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
