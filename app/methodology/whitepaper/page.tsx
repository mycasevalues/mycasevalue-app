import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SITE_URL } from '../../../lib/site-config';

const MethodologyCapture = dynamic(() => import('@/components/MethodologyCapture'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24, textAlign: 'center', color: '#9CA3AF', fontFamily: 'var(--font-body)', fontSize: 14 }}>
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
    title: 'Data Methodology Whitepaper | MyCaseValue',
    description: 'Comprehensive technical documentation of research methodology and statistical framework.',
    url: `${SITE_URL}/methodology/whitepaper`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
};

export default function WhitepaperPage() {
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header Banner */}
      <div style={{ background: '#0966C3', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#0966C3',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '12px',
                fontFamily: 'var(--font-display)',
              }}
            >
              TECHNICAL DOCUMENTATION
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1px',
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            Data Methodology Whitepaper
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.7,
              maxWidth: 600,
            }}
          >
            Comprehensive documentation of research methodology, data sources, and statistical framework for federal court case analysis.
          </p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div style={{ borderBottom: '1px solid #E5E7EB', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: '#004182', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: '#4B5563' }}>/</span>
            <Link href="/methodology" style={{ color: '#004182', textDecoration: 'none' }}>
              Methodology
            </Link>
            <span style={{ color: '#4B5563' }}>/</span>
            <span style={{ color: '#4B5563' }}>Whitepaper</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
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
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            backgroundColor: 'rgba(10, 102, 194, 0.05)',
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#004182',
              fontFamily: 'var(--font-display)',
              marginBottom: 12,
              marginTop: 0,
            }}
          >
            Document Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Version
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-body)' }}>
                1.0
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Published
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-body)' }}>
                2026
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 4px 0', fontFamily: 'var(--font-body)' }}>
                Contact
              </p>
              <a
                href="mailto:research@mycasevalues.com"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#0966C3',
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
              color: '#0966C3',
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
