import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import Link from 'next/link';
import LienCalculator from '../../../components/LienCalculator';

export const metadata: Metadata = {
  title: 'Lien & Subrogation Calculator',
  description: 'Estimate Medicare, Medicaid, and workers compensation liens. Calculate net recovery to client from your settlement amount.',
  alternates: { canonical: `${SITE_URL}/calculator/liens` },
  openGraph: {
    title: 'Lien & Subrogation Calculator',
    description: 'Estimate Medicare, Medicaid, and workers compensation liens. Calculate net recovery to client from your settlement amount.',
    url: `${SITE_URL}/calculator/liens`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lien & Subrogation Calculator',
    description: 'Estimate Medicare, Medicaid, and workers compensation liens.',
  },
};

export default function LienCalculatorPage() {
  return (
    <>
      {/* Header */}
      <header style={{
        background: 'var(--card)',
        color: 'var(--color-text-inverse)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(10,80,162,0.2)',
            background: 'rgba(10,80,162,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Lien Calculator
          </div>
          <h1 style={{ color: 'var(--color-text-inverse)', fontFamily: 'var(--font-legal)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Calculate Net Recovery After Liens
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Medicare, Medicaid, and workers compensation lien estimation — see your actual settlement payout after reimbursement obligations.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: 'var(--color-surface-0)', padding: '12px 0', borderBottom: '1px solid var(--border-default)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Liens</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ background: 'var(--color-surface-1)', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <LienCalculator />
        </div>
      </div>
    </>
  );
}
