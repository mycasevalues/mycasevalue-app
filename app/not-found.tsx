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
        background: '#0B1221',
        color: '#F0F2F5',
        fontFamily: "'Outfit', system-ui, sans-serif",
        textAlign: 'center',
      }}
    >
      {/* CSS hover effects (server component — no JS handlers) */}
      <style>{`
        .nf-btn-home {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; background: linear-gradient(135deg, #4F46E5, #6366F1);
          color: #FFFFFF; border-radius: 12px; font-weight: 600; font-size: 14px;
          text-decoration: none; transition: all 200ms;
          box-shadow: 0 4px 14px rgba(64, 64, 242, 0.22);
        }
        .nf-btn-home:hover {
          box-shadow: 0 8px 28px rgba(64, 64, 242, 0.28);
          transform: translateY(-2px);
        }
        .nf-btn-cases {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; background: transparent; color: #B0BDD0;
          border-radius: 12px; font-weight: 600; font-size: 14px;
          text-decoration: none; border: 1px solid #1E293B; transition: all 200ms;
        }
        .nf-btn-cases:hover {
          border-color: #4F46E5; color: #F0F2F5;
          background: rgba(79, 70, 229, 0.08);
        }
      `}</style>

      <div
        style={{
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
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
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '12px',
          color: '#F0F2F5',
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: '16px',
          color: '#B0BDD0',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back to researching case data.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="nf-btn-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go Home
        </Link>

        <Link href="/cases" className="nf-btn-cases">
          Browse Cases
        </Link>
      </div>

      <p
        style={{
          fontSize: '12px',
          color: '#8B95A5',
          marginTop: '48px',
          maxWidth: '320px',
        }}
      >
        MyCaseValue is an informational tool. Not legal advice.
      </p>
    </div>
  );
}
