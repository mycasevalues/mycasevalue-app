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
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: '#F9FAFB',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '48px 32px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* 404 Number */}
        <div
          style={{
            fontFamily: '"PT Mono", monospace',
            fontSize: '96px',
            fontWeight: 700,
            color: '#E5E7EB',
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
            color: '#111111',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: '#6B7280',
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
            background: #7C3AED;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
          }
          .notfound-link-secondary:hover {
            background: #E5E7EB;
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
              background: '#8B5CF6',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
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
              background: '#F3F4F6',
              color: '#111111',
              border: 'none',
              borderRadius: '8px',
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
  );
}
