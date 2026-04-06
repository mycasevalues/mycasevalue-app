import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Academic Researchers | MyCaseValue+',
  description: 'Research datasets, longitudinal analysis, and citation-ready data for law school faculty and research institutions.',
  alternates: { canonical: `${SITE_URL}/solutions/academic` },
};

const FEATURES = [
  {
    icon: '-',
    title: 'Research Datasets',
    desc: 'Access comprehensive, cleaned datasets covering millions of cases with detailed metadata suitable for academic analysis and publication.',
  },
  {
    icon: '-',
    title: 'Research Tools',
    desc: 'Use built-in analysis tools for statistical modeling, trend analysis, and comparative research across case types and jurisdictions.',
  },
  {
    icon: '-',
    title: 'Citation-Ready Data',
    desc: 'Generate properly sourced, citable datasets with full documentation for peer-reviewed publications and academic presentations.',
  },
  {
    icon: '-',
    title: 'Longitudinal Analysis',
    desc: 'Track cases across years and decades to study long-term trends, settlement evolution, and systemic changes in the legal system.',
  },
  {
    icon: '-',
    title: 'Custom Data Exports',
    desc: 'Export filtered datasets in standard formats (CSV, JSON, Parquet) for integration with R, Python, and other research platforms.',
  },
  {
    icon: '-',
    title: 'Institutional Licensing',
    desc: 'Provide unlimited access across your institution with site licenses supporting research, teaching, and student projects.',
  },
];

export default function AcademicPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#1B3A5C', color: '#FAFBFC', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#6D28D9',
            marginBottom: '16px',
          }}>
            SOLUTIONS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Legal Research Infrastructure for Academia
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Empower law school faculty and researchers with comprehensive case datasets, research tools, and institutional licensing to advance legal scholarship and education.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=academic" style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
              borderRadius: '2px',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
      <section style={{ padding: '80px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#212529',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Key Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                padding: '32px 24px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#212529',
                  marginBottom: '8px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#4B5563',
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
      <section style={{ padding: '64px 24px', background: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#212529',
            marginBottom: '16px',
          }}>
            Accelerate legal research and scholarship
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Leading law schools use {SITE_NAME} institutional licenses to support groundbreaking research, improve legal education, and publish in top-tier journals.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Explore Data
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: '#212529',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              border: '1.5px solid #E5E7EB',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
      <section style={{ padding: '64px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#212529',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/government"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                padding: '32px 24px',
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
                fontWeight: 700,
                color: '#212529',
                marginBottom: '8px',
              }}>
                Government Agencies
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Court performance data and policy analysis.
              </p>
            </Link>
            <Link
              href="/solutions/api"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                padding: '32px 24px',
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
                fontWeight: 700,
                color: '#212529',
                marginBottom: '8px',
              }}>
                API & Integrations
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                REST API and SDK libraries.
              </p>
            </Link>
            <Link
              href="/solutions/legal-aid"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '2px',
                padding: '32px 24px',
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
                fontWeight: 700,
                color: '#212529',
                marginBottom: '8px',
              }}>
                Legal Aid
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
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
    </main>
  );
}
