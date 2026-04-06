import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Enterprise Legal Teams | MyCaseValue+',
  description: 'API access, custom dashboards, and dedicated support for large law firms and corporate legal departments.',
  alternates: { canonical: `${SITE_URL}/solutions/enterprise` },
};

const FEATURES = [
  {
    icon: '🔌',
    title: 'REST API & Webhooks',
    desc: 'Integrate MyCaseValue+ directly into your internal systems with our comprehensive REST API and real-time webhook support.',
  },
  {
    icon: '📊',
    title: 'Custom Dashboards',
    desc: 'Build tailored analytics dashboards reflecting your firm\'s unique practice areas, KPIs, and reporting requirements.',
  },
  {
    icon: '🔐',
    title: 'Enterprise SSO',
    desc: 'Deploy with SAML 2.0 and OAuth 2.0 integration for seamless user management and enhanced security controls.',
  },
  {
    icon: '💼',
    title: 'Bulk Data Exports',
    desc: 'Export unlimited datasets in multiple formats for further analysis, reporting, and integration with your data infrastructure.',
  },
  {
    icon: '👨‍💼',
    title: 'Dedicated Support',
    desc: 'Access a dedicated success manager and priority support team committed to your firm\'s strategic initiatives.',
  },
  {
    icon: '📋',
    title: 'SLA Guarantees',
    desc: 'Benefit from 99.9% uptime guarantee, priority incident response, and contractual performance commitments.',
  },
];

export default function EnterprisePage() {
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
            Enterprise Legal Intelligence
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Deploy mission-critical case analytics infrastructure across your organization with enterprise-grade security, scalability, and dedicated support for Fortune 500 law firms and corporate legal departments.
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
              Contact Sales
            </Link>
            <Link href="/contact?type=demo" style={{
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
            Build on enterprise case intelligence
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#455A64',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Let {SITE_NAME} power your organization\'s most strategic case decisions with scaled, secure, and deeply integrated legal analytics infrastructure.
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
            Contact Sales
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
