import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'MyCaseValue solutions for individuals, law firms, enterprise legal teams, insurance companies, litigation funders, legal aid, academia, and government agencies.',
  alternates: { canonical: `${SITE_URL}/solutions` },
  openGraph: {
    title: 'Solutions',
    description: 'MyCaseValue solutions for individuals, law firms, enterprise legal teams, insurance companies, litigation funders, legal aid, academia, and government agencies.',
    url: `${SITE_URL}/solutions`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions',
    description: 'MyCaseValue solutions for individuals, law firms, enterprise legal teams, insurance companies, litigation funders, legal aid, academia, and government agencies.',
  },
};

const SEGMENTS = [
  {
    slug: 'individuals',
    label: 'Individuals',
    iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    blurb: 'Research your case value with real federal court outcome data.',
  },
  {
    slug: 'small-firms',
    label: 'Small Law Firms',
    iconPath: 'M3 21h18M3 7v14M21 7v14M6 21V10M10 21V10M14 21V10M18 21V10M3 7l9-4 9 4',
    blurb: 'Case analytics built for solo practitioners and boutique practices.',
  },
  {
    slug: 'enterprise',
    label: 'Enterprise Legal',
    iconPath: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 0 3-3h7z',
    blurb: 'API access, custom dashboards, and SSO for large legal teams.',
  },
  {
    slug: 'insurance',
    label: 'Insurance Companies',
    iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    blurb: 'Settlement benchmarking and risk scoring for claims teams.',
  },
  {
    slug: 'legal-aid',
    label: 'Legal Aid',
    iconPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
    blurb: 'Free access programs for non-profits and pro-bono attorneys.',
  },
  {
    slug: 'funders',
    label: 'Litigation Funders',
    iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    blurb: 'Portfolio analytics and due diligence for litigation finance.',
  },
  {
    slug: 'academic',
    label: 'Academic Research',
    iconPath: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 3 4 6 4s6-2 6-4v-5',
    blurb: 'Datasets, analysis tools, and institutional licensing for scholars.',
  },
  {
    slug: 'api',
    label: 'API & Integrations',
    iconPath: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    blurb: 'REST API, webhooks, SDKs, and sandbox for developers.',
  },
  {
    slug: 'government',
    label: 'Government Agencies',
    iconPath: 'M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3',
    blurb: 'Court performance data and policy analysis for public institutions.',
  },
];

export default function SolutionsPage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'var(--accent-primary)',
          color: 'var(--color-surface-1)',
          padding: '40px 24px 32px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-primary-hover)',
              marginBottom: '16px',
            }}
          >
            Solutions
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '2.5rem',
              fontWeight: 600,
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
            From individual litigants to enterprise legal departments, MyCaseValue
            delivers data-driven insights tailored to your workflow.
          </p>

          {/* Hero Stats Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary-hover)',
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
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary-hover)',
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
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary-hover)',
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
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
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
                During Beta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free During Beta Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary) 100%)',
          color: 'var(--color-surface-1)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Free During Beta — All features included for qualifying users
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
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
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '20px 16px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'box-shadow 200ms ease, border-color 200ms ease',
                }}
                className="solutions-card"
              >
                <div style={{ marginBottom: '12px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.iconPath}/></svg>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {s.label}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
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
          padding: '32px 24px',
          background: 'var(--color-surface-0)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
            }}
          >
            Not sure which plan fits?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Start Researching — no account required — and explore the
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
                  'var(--accent-primary)',
                color: 'var(--color-surface-1)',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
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
                color: 'var(--color-text-primary)',
                padding: '0.875rem 2rem',
                borderRadius: '4px',
                border: '1.5px solid var(--border-default)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
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
    </div>
  );
}
