import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'MyCaseValue solutions for individuals, law firms, enterprise legal teams, insurance companies, litigation funders, legal aid, academia, and government agencies.',
  alternates: { canonical: `${SITE_URL}/solutions` },
};

const SEGMENTS = [
  {
    slug: 'individuals',
    label: 'Individuals',
    icon: '-',
    blurb: 'Research your case value with real federal court outcome data.',
  },
  {
    slug: 'small-firms',
    label: 'Small Law Firms',
    icon: '-',
    blurb: 'Case analytics built for solo practitioners and boutique practices.',
  },
  {
    slug: 'enterprise',
    label: 'Enterprise Legal',
    icon: '-',
    blurb: 'API access, custom dashboards, and SSO for large legal teams.',
  },
  {
    slug: 'insurance',
    label: 'Insurance Companies',
    icon: '-',
    blurb: 'Settlement benchmarking and risk scoring for claims teams.',
  },
  {
    slug: 'legal-aid',
    label: 'Legal Aid',
    icon: '-',
    blurb: 'Free access programs for non-profits and pro-bono attorneys.',
  },
  {
    slug: 'funders',
    label: 'Litigation Funders',
    icon: '-',
    blurb: 'Portfolio analytics and due diligence for litigation finance.',
  },
  {
    slug: 'academic',
    label: 'Academic Research',
    icon: '-',
    blurb: 'Datasets, analysis tools, and institutional licensing for scholars.',
  },
  {
    slug: 'api',
    label: 'API & Integrations',
    icon: '-',
    blurb: 'REST API, webhooks, SDKs, and sandbox for developers.',
  },
  {
    slug: 'government',
    label: 'Government Agencies',
    icon: '-',
    blurb: 'Court performance data and policy analysis for public institutions.',
  },
];

export default function SolutionsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: '#1B3A5C',
          color: '#FAFBFC',
          padding: '80px 24px 64px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#6D28D9',
              marginBottom: '16px',
            }}
          >
            Solutions
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            Built for Every Legal Professional
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '640px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            From individual plaintiffs to enterprise legal departments, MyCaseValue
            delivers data-driven insights tailored to your workflow.
          </p>

          {/* Hero Stats Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap',
              marginTop: '40px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#6D28D9',
                  marginBottom: '4px',
                }}
              >
                5.1M+
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                }}
              >
                Cases Analyzed
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#6D28D9',
                  marginBottom: '4px',
                }}
              >
                84
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                }}
              >
                Case Types
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#6D28D9',
                  marginBottom: '4px',
                }}
              >
                94
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                }}
              >
                Federal Districts
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#7C3AED',
                  marginBottom: '4px',
                }}
              >
                Free
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.6)',
                  margin: 0,
                }}
              >
                During Launch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free During Launch Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #7C3AED 100%)',
          color: '#FAFBFC',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Free During Launch — All features included for qualifying users
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '80px 24px', background: '#F7F8FA' }}>
        <div
          className="solutions-grid-wrap"
          style={{ maxWidth: '1120px', margin: '0 auto' }}
        >
          <div
            className="solutions-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {SEGMENTS.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  padding: '32px 24px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'box-shadow 200ms ease, border-color 200ms ease',
                }}
                className="solutions-card"
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {s.icon}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#212529',
                    marginBottom: '8px',
                  }}
                >
                  {s.label}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: '#4B5563',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {s.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: '64px 24px',
          background: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#212529',
              marginBottom: '16px',
            }}
          >
            Not sure which plan fits?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#4B5563',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Start researching — no account required — and explore the
            full platform before choosing a plan.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/search"
              style={{
                background:
                  '#7C3AED',
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
              }}
            >
              Start Now
            </Link>
            <Link
              href="/pricing"
              style={{
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
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .solutions-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
          border-color: rgba(0,105,151,0.30) !important;
        }
        @media (max-width: 768px) {
          .solutions-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .solutions-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `,
        }}
      />
    </main>
  );
}
