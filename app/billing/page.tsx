import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Billing | MyCaseValue',
  description: 'Manage your billing information and view invoices.',
  robots: { index: false, follow: false },
};

export default function BillingPage() {
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--fg-primary)',
            margin: '0 0 12px 0',
          }}
        >
          Billing — Coming Soon
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--fg-muted)',
            lineHeight: 1.6,
            margin: '0 0 32px 0',
          }}
        >
          Billing and payment features will be available soon.
        </p>
        <Link
          href="/pricing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--fg-primary)',
            color: '#FFFFFF',
            borderRadius: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          View Plans
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
