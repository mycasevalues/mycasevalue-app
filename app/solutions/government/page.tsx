import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Government Agencies | MyCaseValue+',
  description: 'Court performance data, policy analysis, and transparency reporting tools for federal and state agencies.',
  alternates: { canonical: `${SITE_URL}/solutions/government` },
};

const FEATURES = [
  {
    icon: '-',
    title: 'Court Performance Data',
    desc: 'Benchmark court performance metrics including case disposition time, settlement rates, verdict distributions, and caseload analysis.',
  },
  {
    icon: '-',
    title: 'Policy Analysis',
    desc: 'Evaluate policy impacts on case outcomes, judicial efficiency, and system performance with comprehensive statistical analysis.',
  },
  {
    icon: '-',
    title: 'Resource Allocation',
    desc: 'Optimize court resources and judge assignments using data on caseload, complexity distribution, and efficiency metrics.',
  },
  {
    icon: '-',
    title: 'Transparency Reporting',
    desc: 'Generate public-facing reports on court operations, judge statistics, and case outcomes supporting judicial transparency initiatives.',
  },
  {
    icon: '-',
    title: 'Compliance Tools',
    desc: 'Track compliance with performance standards, access benchmarks, and generate compliance documentation for oversight bodies.',
  },
  {
    icon: '-',
    title: 'Bulk Data Access',
    desc: 'Authorized government agencies access comprehensive case data in bulk formats for research, analysis, and archival purposes.',
  },
];

export default function GovernmentPage() {
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
            Judicial System Intelligence
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Support judicial oversight, policy analysis, and system improvement with comprehensive court performance data and transparency tools for federal and state agencies.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=government" style={{
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
              Request Information
            </Link>
            <Link href="/contact?type=government-demo" style={{
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
              Schedule Demo
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
            Improve court system performance and transparency
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            {SITE_NAME} provides federal agencies, state courts, and judicial oversight bodies with actionable insights for improving system performance and advancing judicial transparency.
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
              Research Data
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
              href="/solutions/academic"
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
                Academic Research
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Research datasets and analysis tools.
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
                REST API and bulk data endpoints.
              </p>
            </Link>
            <Link
              href="/solutions/enterprise"
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
                Enterprise Legal
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Custom dashboards and SSO.
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
