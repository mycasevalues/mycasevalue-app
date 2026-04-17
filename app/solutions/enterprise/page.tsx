import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';
import EnterpriseDemoForm from '@/components/EnterpriseDemoForm';

export const metadata: Metadata = {
  title: 'Enterprise — API, Dashboards & Dedicated Support',
  description: 'Enterprise-grade case analytics with API access, custom dashboards, white-label reports, SSO integration, and dedicated support for law firms, insurance companies, and law schools.',
  alternates: { canonical: `${SITE_URL}/solutions/enterprise` },
  openGraph: {
    title: 'MyCaseValue for Enterprise',
    description: 'Enterprise-grade case analytics infrastructure for institutional buyers.',
    type: 'website',
    url: `${SITE_URL}/solutions/enterprise`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
};

const FEATURES = [
  {
    iconPath: 'M10 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5m-4 4h4m0 0V4m0 4V4',
    title: 'API Access',
    desc: 'Integrate MyCaseValue directly into your internal systems with comprehensive REST APIs, webhooks, and real-time data delivery.',
  },
  {
    iconPath: 'M4 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm12 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5z',
    title: 'Custom Dashboards',
    desc: 'Build analytics dashboards tailored to your firm\'s practice areas, KPIs, and executive reporting requirements.',
  },
  {
    iconPath: 'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 0 0-4.898-4.142M9 20H4v-2a3 3 0 0 1 5.356-1.857m0 0A5.002 5.002 0 0 1 13.75 12',
    title: 'Team Workspaces',
    desc: 'Collaborate securely with role-based access control, shared annotations, and audit trails for institutional governance.',
  },
  {
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z',
    title: 'White-Label Reports',
    desc: 'Generate branded reports with your firm\'s logo, colors, and custom terminology for client delivery.',
  },
  {
    iconPath: 'M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z',
    title: 'SSO & Directory Integration',
    desc: 'Deploy with SAML 2.0, OAuth 2.0, and LDAP integration for seamless enterprise authentication.',
  },
  {
    iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    title: 'Dedicated Support',
    desc: 'Access a dedicated success manager, priority support channel, and strategic consulting for your legal team.',
  },
];

const USE_CASES = [
  {
    title: 'Law Firms',
    points: [
      'Portfolio-level case analytics and risk scoring',
      'Revenue optimization through data-driven settlement strategies',
      'Associate training with benchmark comparison data',
      'Client reporting with white-label insights',
    ],
  },
  {
    title: 'Insurance Companies',
    points: [
      'Litigation cost prediction and case valuation',
      'Claims decision support with historical outcome data',
      'Opposing counsel intelligence and litigation trends',
      'Reserve adequacy assessment across claim portfolios',
    ],
  },
  {
    title: 'Litigation Funders',
    points: [
      'Portfolio risk stratification and ROI projections',
      'Case selection and due diligence frameworks',
      'Litigation cost benchmarking across practice areas',
      'Outcome probability modeling for deal underwriting',
    ],
  },
  {
    title: 'Law Schools',
    points: [
      'Empirical legal research and curriculum development',
      'Law clinic case selection and outcome tracking',
      'Student research projects with real data access',
      'Published scholarship with primary case outcome data',
    ],
  },
];

const PRICING_TIERS = [
  {
    name: 'Team',
    users: '5-50 users',
    apiCalls: '100K calls/month',
    dashboards: 'Custom: 2-5',
    whiteLabel: 'Limited',
    sso: 'Basic (OAuth)',
  },
  {
    name: 'Department',
    users: '50-500 users',
    apiCalls: '1M calls/month',
    dashboards: 'Custom: 5-10',
    whiteLabel: 'Full',
    sso: 'Full (SAML + OAuth)',
  },
  {
    name: 'Institution',
    users: 'Unlimited',
    apiCalls: 'Unlimited',
    dashboards: 'Unlimited custom',
    whiteLabel: 'Full + Licensing',
    sso: 'Full (SAML + OAuth + LDAP)',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What makes MyCaseValue suitable for enterprise deployment?',
    answer: 'MyCaseValue is built on a scalable cloud infrastructure with 99.9% uptime SLA, role-based access control, enterprise-grade security compliance (GDPR, CCPA), and comprehensive audit logging. We support unlimited concurrent users, high-volume API access, and custom integrations with your existing legal technology stack.',
  },
  {
    question: 'Can we white-label MyCaseValue for our clients?',
    answer: 'Yes. Our white-label solution allows you to rebrand the entire platform with your firm\'s logo, colors, domain, and custom terminology. Reports, dashboards, and communications all display your branding. Available on Department and Institution tiers.',
  },
  {
    question: 'How does API access work for enterprise customers?',
    answer: 'We provide comprehensive REST APIs for case outcome queries, judge analytics, verdict data, and custom report generation. API access includes webhooks for real-time data delivery, comprehensive documentation, SDK libraries, and dedicated technical support. Rate limits are based on your tier (100K-unlimited calls per month).',
  },
  {
    question: 'What security and compliance standards do you meet?',
    answer: 'We maintain enterprise-grade security with GDPR compliance, CCPA compliance, and HIPAA readiness. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We provide detailed security audit reports, penetration testing cooperation, and custom data processing agreements (DPAs) for institutional clients.',
  },
  {
    question: 'Can you integrate with our existing legal technology?',
    answer: 'Yes. We support integration with major legal tech platforms including practice management systems, document automation, e-discovery tools, and business intelligence platforms. Our APIs and webhooks enable custom integration patterns. Our technical team works directly with your IT department on implementation.',
  },
  {
    question: 'What is included in the dedicated support tier?',
    answer: 'Dedicated support includes a named success manager, priority response times (1-hour SLA for critical issues), quarterly business reviews, custom training for your team, API integration assistance, and strategic consulting on deploying case analytics across your organization.',
  },
];

export default function EnterprisePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'var(--card, #FFFFFF)',
        color: 'var(--card, #FFFFFF)',
        padding: '56px 24px 48px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#60a5fa',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            Enterprise
          </div>
          <h1 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            color: 'var(--card, #FFFFFF)',
          }}>
            Enterprise-grade litigation analytics
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 15,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 640,
            margin: '0 auto 32px',
            lineHeight: 1.65,
          }}>
            API access, custom dashboards, SSO integration, white-label reports, and dedicated support for large legal teams, carriers, and capital allocators.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Enterprise Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '24px 16px',
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

      {/* Use Cases */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-0)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Built for Your Industry
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {USE_CASES.map(useCase => (
              <div key={useCase.title} style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '32px 24px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                }}>
                  {useCase.title}
                </h3>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: '24px',
                }}>
                  {useCase.points.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            Pricing
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            All enterprise pricing is custom. Contact us for a demo and detailed quote.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--color-surface-0)',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid var(--border-default)',
            }}>
              <thead>
                <tr style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-1)' }}>
                  <th style={{ padding: '24px 24px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}>Feature</th>
                  {PRICING_TIERS.map(tier => (
                    <th key={tier.name} style={{ padding: '24px 24px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}>
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Users</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {tier.users}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid var(--border-default)', background: 'var(--color-surface-1)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>API Calls/Month</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {tier.apiCalls}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Custom Dashboards</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {tier.dashboards}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid var(--border-default)', background: 'var(--color-surface-1)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>White-Label Reports</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {tier.whiteLabel}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid var(--border-default)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>SSO & Directory Integration</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {tier.sso}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid var(--border-default)', background: 'var(--color-surface-1)' }}>
                  <td style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Price</td>
                  {PRICING_TIERS.map(tier => (
                    <td key={tier.name} style={{ padding: '16px 24px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Contact us
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '24px 16px', background: 'var(--color-surface-0)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.8,
          }}>
            Trusted by legal professionals at leading law firms, insurance companies, and law schools for mission-critical case analytics and litigation support.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <details key={idx} style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '24px',
              }}>
                <summary style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  listStyle: 'none',
                }}>
                  {item.question}
                </summary>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginTop: '16px',
                  marginBottom: 0,
                }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Form */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-0)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            Request a Demo
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>
            Schedule a personalized demo with our enterprise team. We will walk through your use case and discuss custom solutions for your organization.
          </p>
          <EnterpriseDemoForm />
        </div>
      </section>

      {/* Responsive grid style */}
      <style dangerouslySetInnerHTML={{ __html: `
        summary::marker { color: var(--accent-primary); }
        summary::-webkit-details-marker { color: var(--accent-primary); }
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          section div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />
    </div>
  );
}
