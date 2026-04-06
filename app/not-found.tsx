import Link from 'next/link';
import { Metadata } from 'next';
import { SearchIcon } from '../components/ui/Icons';

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
        background: '#F7F8FA',
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
          background: '#1B3A5C',
        }}
      />
      <div style={{ padding: '48px 24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          maxWidth: 480,
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '48px 32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {/* 404 Number */}
        <div
          style={{
            fontFamily: '"PT Mono", monospace',
            fontSize: '96px',
            fontWeight: 600,
            color: '#4B5563',
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
            color: '#0f0f0f',
            margin: '0 0 12px',
            letterSpacing: '-0.01em',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: '#4B5563',
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
            background: #8B5CF6;
            box-shadow: none;
          }
          .notfound-link-secondary:hover {
            background: #EEEEEE;
            border-color: #E5E7EB;
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
              borderRadius: '12px',
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
              background: '#F7F8FA',
              color: '#0f0f0f',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms',
            }}
          >
            <SearchIcon size={16} />
            Search cases
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
