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
        padding: '24px',
        background: 'var(--bg-base)',
        color: 'var(--fg-primary)',
        fontFamily: "'Outfit', system-ui, sans-serif",
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '16px',
        }}
      >
        404
      </div>

      <h1
        style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          marginBottom: '12px',
          color: 'var(--fg-primary)',
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--fg-muted)',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to researching case data.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--accent-primary)',
            color: '#FFFFFF',
            borderRadius: 'var(--r-lg)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            textDecoration: 'none',
            transition: 'background 200ms',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go Home
        </Link>

        <Link
          href="/cases"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--bg-elevated)',
            color: 'var(--fg-secondary)',
            borderRadius: 'var(--r-lg)',
            fontWeight: 600,
            fontSize: 'var(--text-sm)',
            textDecoration: 'none',
            border: '1px solid var(--border-default)',
            transition: 'background 200ms',
          }}
        >
          Browse Cases
        </Link>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontSize: 'var(--text-2xs)',
          color: 'var(--fg-subtle)',
          marginTop: '48px',
          maxWidth: '320px',
        }}
      >
        MyCaseValue is an informational tool. Not legal advice.
      </p>
    </div>
  );
}
