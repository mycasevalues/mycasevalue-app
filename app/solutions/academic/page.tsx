import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Academic Researchers',
  description: 'Research datasets, longitudinal analysis, and citation-ready data for law school faculty and research institutions.',
  alternates: { canonical: `${SITE_URL}/solutions/academic` },
  openGraph: {
    title: 'For Academic Researchers | MyCaseValue',
    description: 'Enable empirical legal research with 5.1M+ federal cases. Free institutional licensing for law schools and research institutions.',
    url: `${SITE_URL}/solutions/academic`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Academic Researchers | MyCaseValue',
    description: 'Research datasets, longitudinal analysis, and citation-ready data for law school faculty and research institutions.',
  },
};

const FEATURES = [
  {
    iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747M9 9h.01M15 9h.01M9 15h.01M15 15h.01',
    title: 'Research Datasets',
    desc: 'Access comprehensive, cleaned datasets covering millions of cases with detailed metadata suitable for academic analysis and publication.',
  },
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Research Tools',
    desc: 'Use built-in analysis tools for statistical modeling, trend analysis, and comparative research across case types and jurisdictions.',
  },
  {
    iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747',
    title: 'Citation-Ready Data',
    desc: 'Generate properly sourced, citable datasets with full documentation for peer-reviewed publications and academic presentations.',
  },
  {
    iconPath: 'M13 2H3v20h10m0-18h8v18h-8M6 9h.01M6 13h.01M6 17h.01',
    title: 'Longitudinal Analysis',
    desc: 'Track cases across years and decades to study long-term trends, settlement evolution, and systemic changes in the legal system.',
  },
  {
    iconPath: 'M12 10v6m4-6v6m4-6v6M3 16V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    title: 'Custom Data Exports',
    desc: 'Export filtered datasets in standard formats (CSV, JSON, Parquet) for integration with R, Python, and other research platforms.',
  },
  {
    iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747M12 2l3 5-3 5-3-5 3-5z',
    title: 'Institutional Licensing',
    desc: 'Provide unlimited access across your institution with site licenses supporting research, teaching, and student projects.',
  },
];

export default function AcademicPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--accent-primary)', color: '#FAFBFC', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent-primary-hover)',
            marginBottom: '16px',
          }}>
            SOLUTIONS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Enable Empirical Legal Research with Real Federal Court Data
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Access 5.1M+ federal cases for law school research, curriculum development, student projects, and institutional scholarship. Free institutional licensing available.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=academic" style={{
              background: 'var(--accent-primary)',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Get Institutional License
            </Link>
            <Link href="/contact" style={{
              background: 'transparent',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Key Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section style={{ padding: '20px 16px', background: 'var(--color-surface-0)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Accelerate legal research and scholarship
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Leading law schools use {SITE_NAME} institutional licenses to support groundbreaking research, improve legal education, and publish in top-tier journals.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{
              background: 'var(--accent-primary)',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Explore Data
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: 'var(--color-text-primary)',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: '1.5px solid var(--border-default)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Try Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section style={{ padding: '20px 16px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/government"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Government Agencies
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Court performance data and policy analysis.
              </p>
            </Link>
            <Link
              href="/solutions/api"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                API & Integrations
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                REST API and SDK libraries.
              </p>
            </Link>
            <Link
              href="/solutions/legal-aid"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Legal Aid
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Free access for non-profits.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive grid style */}
      <style dangerouslySetInnerHTML={{ __html: `
        .related-solutions-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
          border-color: rgba(0,105,151,0.30) !important;
        }
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />
    </div>
  );
}
