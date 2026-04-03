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
        background: 'var(--bg-base)',
        color: 'var(--fg-primary)',
        fontFamily: 'Roboto, system-ui, sans-serif',
        textAlign: 'center',
      }}
    >
      <style>{`
        .nf-btn-home {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: var(--accent-primary);
          color: #FFFFFF; border-radius: 12px; font-weight: 700; font-size: 15px;
          font-family: Montserrat, system-ui, sans-serif;
          text-decoration: none; transition: all 200ms;
          box-shadow: var(--shadow-sm);
        }
        .nf-btn-home:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .nf-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: transparent; color: var(--fg-muted);
          border-radius: 12px; font-weight: 600; font-size: 14px;
          font-family: Roboto, system-ui, sans-serif;
          text-decoration: none; border: 1px solid var(--border-default); transition: all 200ms;
        }
        .nf-btn-secondary:hover { border-color: var(--fg-muted); color: var(--fg-primary); }
      `}</style>

      {/* Icon */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'var(--accent-primary-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6" />
        </svg>
      </div>

      {/* 404 badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          borderRadius: '9999px',
          background: 'var(--accent-primary-subtle)',
          border: '1px solid var(--accent-primary-border)',
          marginBottom: '16px',
          fontSize: '12px',
          fontWeight: 700,
          color: 'var(--fg-muted)',
          fontFamily: '"PT Mono", monospace',
          letterSpacing: '0.05em',
        }}
      >
        ERROR 404
      </div>

      <h1
        style={{
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 800,
          color: 'var(--fg-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: '0 0 12px',
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: '16px',
          color: 'var(--fg-muted)',
          maxWidth: '420px',
          lineHeight: 1.6,
          margin: '0 0 32px',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to researching case data.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="nf-btn-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go Home
        </Link>

        <Link href="/search" className="nf-btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          Search Cases
        </Link>
      </div>

      {/* Helpful links */}
      <div
        style={{
          marginTop: '48px',
          padding: '24px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px',
          maxWidth: '440px',
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--fg-secondary)',
            margin: '0 0 12px',
          }}
        >
          Popular pages
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { href: '/cases', label: 'Browse all case types', desc: '84 federal case categories' },
            { href: '/districts', label: 'Federal districts', desc: 'All 94 US districts' },
            { href: '/faq', label: 'FAQ', desc: 'Common questions answered' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background 200ms',
                background: 'transparent',
              }}
            >
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-primary)' }}>{link.label}</span>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--fg-muted)', marginTop: '2px' }}>{link.desc}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      <p
        style={{
          fontSize: '12px',
          color: 'var(--fg-subtle)',
          marginTop: '32px',
          maxWidth: '320px',
        }}
      >
        MyCaseValue is an informational tool. Not legal advice.
      </p>
    </div>
  );
}
