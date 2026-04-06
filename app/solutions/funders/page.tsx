import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Litigation Funders | MyCaseValue+',
  description: 'Portfolio analytics, case evaluation, and ROI projections for litigation finance companies and alternative funders.',
  alternates: { canonical: `${SITE_URL}/solutions/funders` },
};

const FEATURES = [
  {
    icon: '📈',
    title: 'Portfolio Analytics',
    desc: 'Monitor case-level metrics across your entire portfolio with real-time dashboards tracking probability of success and projected ROI.',
  },
  {
    icon: '🔬',
    title: 'Case Evaluation',
    desc: 'Evaluate incoming opportunities against historical data to assess litigation risk, settlement probability, and expected recovery.',
  },
  {
    icon: '⚖️',
    title: 'Risk Assessment',
    desc: 'Score litigation risk across judge tendencies, opposing counsel tactics, and case-type complexity using predictive modeling.',
  },
  {
    icon: '💹',
    title: 'ROI Projections',
    desc: 'Model expected returns with multiple settlement scenarios, trial outcomes, and litigation cost forecasts for underwriting decisions.',
  },
  {
    icon: '🔍',
    title: 'Market Intelligence',
    desc: 'Track settlement trends, verdict patterns, and market conditions to identify emerging opportunities and avoid deteriorating positions.',
  },
  {
    icon: '📋',
    title: 'Due Diligence Data',
    desc: 'Generate comprehensive due diligence reports with comparative analytics and benchmark data for investor presentations and reporting.',
  },
];

export default function FundersPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#00172E', color: '#FAFBFC', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#006997',
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
            Litigation Finance Intelligence
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Make faster, smarter funding decisions with case-level analytics, risk scoring, and ROI projections backed by millions of data points across all case types and jurisdictions.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)',
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
              Request Demo
            </Link>
            <Link href="/contact?type=partnership" style={{
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
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', background: '#F5F6F7' }}>
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
                border: '1px solid #E5EBF0',
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
                  color: '#455A64',
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

      {/* Bottom CTA */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#212529',
            marginBottom: '16px',
          }}>
            Optimize funding decisions with litigation intelligence
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#455A64',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Leading litigation finance firms use {SITE_NAME} to improve case selection, reduce risk exposure, and maximize portfolio returns.
          </p>
          <Link href="/contact" style={{
            background: 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)',
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
            Request Demo
          </Link>
        </div>
      </section>

      {/* Responsive grid style */}
      <style dangerouslySetInnerHTML={{ __html: `
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
