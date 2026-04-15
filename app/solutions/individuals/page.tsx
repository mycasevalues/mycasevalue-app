import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Individuals',
  description: 'Research your case value, settlement ranges, and timeline estimates. Free access to case analytics for personal injury claims.',
  alternates: { canonical: `${SITE_URL}/solutions/individuals` },
  openGraph: {
    title: 'For Individuals | MyCaseValue',
    description: 'Research your case value, settlement ranges, and timeline estimates. Free access to case analytics for personal injury claims.',
    url: `${SITE_URL}/solutions/individuals`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Individuals | MyCaseValue',
    description: 'Research your case value, settlement ranges, and timeline estimates. Free access to case analytics for personal injury claims.',
  },
};

const FEATURES = [
  {
    iconPath: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
    title: 'Case Value Lookup',
    desc: 'Instantly discover settlement ranges and verdict data for cases similar to yours across all 50 states.',
  },
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Settlement Benchmarks',
    desc: 'Compare your claim against thousands of settled cases to understand realistic compensation expectations.',
  },
  {
    iconPath: 'M12 8v4m0 4v4M8 12h4m4 0h4',
    title: 'Judge Statistics',
    desc: 'Review individual judge track records, award trends, and historical verdicts in your jurisdiction.',
  },
  {
    iconPath: 'M12 8v4m0 4v4M8 12h4m4 0h4',
    title: 'Timeline Estimates',
    desc: 'Get data-driven projections for case resolution time based on injury type, venue, and complexity.',
  },
  {
    iconPath: 'M3 21h18M3 7v14M21 7v14M6 21V10M10 21V10M14 21V10M18 21V10',
    title: 'District Comparisons',
    desc: 'Understand how different courts and jurisdictions handle similar claims in your case category.',
  },
  {
    iconPath: 'M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.209 0-4 1.791-4 4v2h8v-2c0-2.209-1.791-4-4-4z',
    title: 'Free Tier Access',
    desc: 'Start exploring case data immediately with our free plan. No credit card required to get started.',
  },
];

export default function IndividualsPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--accent-primary)', color: '#FAFBFC', padding: '80px 24px 64px' }}>
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
            Understand Your Case Value
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Make informed decisions about your personal injury claim with real settlement data, judge analytics, and realistic timeline projections based on thousands of similar cases.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sign-up" style={{
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
              Start Researching
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
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', background: 'var(--color-surface-1)' }}>
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
                padding: '32px 24px',
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
      <section style={{ padding: '64px 24px', background: 'var(--color-surface-0)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Ready to research your claim?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Start searching free — no account required. Understand your case value and make confident decisions about settlement negotiations.
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
              Search Cases
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

      {/* Share This Research Section */}
      <section style={{ padding: '64px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '24px',
          }}>
            Share this research
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Found helpful case data? Share widget links with your attorney to support settlement negotiations. Embed real-time case value data on shared documents and give your legal team the context they need to evaluate your claim objectively.
          </p>
          <div style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <div style={{
              fontSize: '14px',
              color: '#374151',
              fontWeight: 500,
              marginBottom: '12px',
            }}>
              Example: Share widget link with your attorney
            </div>
            <code style={{
              display: 'block',
              background: '#F9FAFB',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--accent-primary)',
              fontFamily: '"Courier New", monospace',
              overflowX: 'auto',
              wordBreak: 'break-all',
            }}>
              {'https://mycasevalues.com/widget/3001/all'}
            </code>
            <p style={{
              fontSize: '12px',
              color: '#6B7280',
              marginTop: '12px',
              margin: '12px 0 0 0',
            }}>
              Share this link in emails, documents, or messages to embed live case data
            </p>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section style={{ padding: '64px 24px', background: 'var(--color-surface-1)' }}>
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
              href="/solutions/small-firms"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
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
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Small Law Firms
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Case analytics and opposing counsel intelligence for solo practitioners.
              </p>
            </Link>
            <Link
              href="/solutions/legal-aid"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
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
                Free access programs for non-profits and pro-bono attorneys.
              </p>
            </Link>
            <Link
              href="/solutions/insurance"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
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
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Insurance
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Settlement benchmarking and risk scoring for claims teams.
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
