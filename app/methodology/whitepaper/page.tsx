import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SITE_URL } from '../../../lib/site-config';

const MethodologyCapture = dynamic(() => import('@/components/MethodologyCapture'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
      Loading PDF generator…
    </div>
  ),
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Data Methodology Whitepaper',
  description: 'Comprehensive technical documentation of MyCaseValue research methodology, data sources, and statistical framework for federal court case analysis.',
  alternates: { canonical: `${SITE_URL}/methodology/whitepaper` },
  openGraph: {
    title: 'Data Methodology Whitepaper',
    description: 'Comprehensive technical documentation of research methodology and statistical framework.',
    url: `${SITE_URL}/methodology/whitepaper`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
};

export default function WhitepaperPage() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--card, #FFFFFF)',
        padding: '48px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
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
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link, #0A50A2)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
            Technical Whitepaper
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--card, #FFFFFF)',
              letterSpacing: '-0.025em',
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Data methodology whitepaper
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
              maxWidth: 640,
              margin: 0,
            }}
          >
            Complete documentation of research methodology, data sources, and statistical framework for federal court case analysis.
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div style={{ borderBottom: '1px solid var(--border-default)', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
            <Link href="/methodology" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
              Methodology
            </Link>
            <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>Whitepaper</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <div
          style={{
            background: 'var(--color-surface-0)',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            padding: '48px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <MethodologyCapture />
        </div>

        {/* Document Info */}
        <div
          style={{
            marginTop: 48,
            padding: '24px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            backgroundColor: 'rgba(10, 102, 194, 0.05)',
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--accent-primary-hover)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Document Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Version
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                1.0
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Published
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                2026
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Contact
              </p>
              <a
                href="mailto:research@mycasevalues.com"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
              >
                research@mycasevalues.com
              </a>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link
            href="/methodology"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Methodology
          </Link>
        </div>
      </div>
    </div>
  );
}
