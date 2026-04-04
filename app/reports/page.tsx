import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Reports | MyCaseValue',
  description: 'View and manage your saved case research reports.',
  robots: { index: false, follow: false },
};

export default function ReportsPage() {
  return (
    <div style={{ minHeight: '60vh', background: 'var(--bg-base)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'var(--accent-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: '#111111',
            margin: '0 0 12px 0',
          }}
        >
          My Reports
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: 1.6,
            margin: '0 0 32px 0',
          }}
        >
          Your saved case research reports will appear here. Run a case lookup to generate your first report.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: '#111111',
            color: '#FFFFFF',
            borderRadius: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Start a Case Lookup
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
