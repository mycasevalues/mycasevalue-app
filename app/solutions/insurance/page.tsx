import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Insurance Companies | MyCaseValue+',
  description: 'Settlement benchmarking, claim valuation, and litigation cost forecasting for insurers and defense counsel.',
  alternates: { canonical: `${SITE_URL}/solutions/insurance` },
};

const FEATURES = [
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Settlement Benchmarking',
    desc: 'Compare claims against industry benchmarks and historical settlement patterns to validate valuations and identify outliers.',
  },
  {
    iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    title: 'Claim Valuation Models',
    desc: 'Deploy data-driven valuation frameworks that account for injury severity, jurisdiction, defense profile, and litigation costs.',
  },
  {
    iconPath: 'M12 9v2m0 4v2m0 0v2M7 9h.01M17 9h.01M7 13h.01M17 13h.01M7 17h.01M17 17h.01',
    title: 'Risk Scoring',
    desc: 'Automatically score litigation risk based on case characteristics, judge history, and settlement probability modeling.',
  },
  {
    iconPath: 'M9 12l2 2 4-4M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0z',
    title: 'Reserve Setting',
    desc: 'Generate defensible reserve recommendations backed by settlement data and actuarial analysis for claims management.',
  },
  {
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Litigation Cost Forecasting',
    desc: 'Project defense costs, trial expenses, and likely awards to optimize settlement negotiation and budget allocation.',
  },
  {
    iconPath: 'M9 12l2 2 4-4m-7 3h6m-6 2h6',
    title: 'Defense Strategy Intelligence',
    desc: 'Research defense counsel capabilities, settlement rates, and trial success metrics to select optimal legal representation.',
  },
];

export default function InsurancePage() {
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
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Intelligent Claims Management
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Reduce claims payouts and litigation costs with data-driven valuation, risk scoring, and settlement intelligence tailored for insurance carriers and defense teams.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
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
            <Link href="/contact?type=consultation" style={{
              background: 'transparent',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Speak with Expert
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
            fontWeight: 700,
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
                borderRadius: '6px',
                padding: '32px 24px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
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
            fontWeight: 700,
            color: '#212529',
            marginBottom: '16px',
          }}>
            Optimize claim outcomes with better data
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Insurance carriers and defense counsel use {SITE_NAME} to make faster, more accurate claim valuations and reduce unnecessary payouts.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Research Cases
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: '#212529',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
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
            fontWeight: 700,
            color: '#212529',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/funders"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
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
                Litigation Funders
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Portfolio analytics and ROI projections.
              </p>
            </Link>
            <Link
              href="/solutions/enterprise"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
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
                Custom dashboards and API integration.
              </p>
            </Link>
            <Link
              href="/solutions/individuals"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
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
                Individuals
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Settlement research for plaintiffs.
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
