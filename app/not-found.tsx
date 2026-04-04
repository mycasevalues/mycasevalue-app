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
        background: 'linear-gradient(135deg, rgba(5, 15, 30, 0.95) 0%, rgba(10, 20, 40, 0.95) 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          borderRadius: '12px',
          padding: '48px 32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* 404 Number */}
        <div
          style={{
            fontFamily: '"PT Mono", monospace',
            fontSize: '96px',
            fontWeight: 700,
            color: 'rgba(240, 242, 245, 0.40)',
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
            color: '#F0F2F5',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'rgba(240, 242, 245, 0.70)',
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
            background: #3D72FF;
            box-shadow: 0 8px 24px rgba(24, 86, 255, 0.4);
          }
          .notfound-link-secondary:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.20);
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
              background: '#1856FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
              boxShadow: '0 4px 12px rgba(24, 86, 255, 0.3)',
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
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#F0F2F5',
              border: '1px solid rgba(255, 255, 255, 0.10)',
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
