import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Integrations — MyCaseValue | Connect Your Legal Tools',
  description: 'Integrate MyCaseValue federal court data with your existing legal tools. REST API, CSV exports, and direct connections to case management systems.',
  alternates: { canonical: 'https://www.mycasevalues.com/integrations' },
  openGraph: {
    title: 'Integrations — MyCaseValue',
    description: 'Connect federal court analytics to your legal workflow with our API, exports, and direct integrations.',
    type: 'website',
    url: 'https://www.mycasevalues.com/integrations',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Integrations', item: 'https://www.mycasevalues.com/integrations' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'MyCaseValue Integrations',
      description: 'Connect MyCaseValue federal court data with your existing legal tools.',
      url: 'https://www.mycasevalues.com/integrations',
    },
  ],
};

const INTEGRATIONS = [
  {
    name: 'REST API',
    category: 'Developer',
    description: 'Full programmatic access to case outcome data, settlement ranges, judge statistics, and predictive analytics. JSON responses, rate limiting, and comprehensive documentation.',
    features: ['JSON endpoints', 'OAuth 2.0 auth', 'Rate limiting', 'Webhooks'],
    status: 'Available',
    href: '/attorney/api-access',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'CSV & PDF Export',
    category: 'Data',
    description: 'Download case outcome reports as clean CSV files for spreadsheet analysis or branded PDF reports for client presentations and court filings.',
    features: ['CSV data export', 'Branded PDF reports', 'Batch export', 'Scheduled reports'],
    status: 'Available',
    href: '/attorney',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    name: 'Clio',
    category: 'Case Management',
    description: 'Connect MyCaseValue analytics directly to your Clio practice management workspace. Auto-attach case outcome reports to matters.',
    features: ['Matter linking', 'Auto-attach reports', 'Activity sync', 'Custom fields'],
    status: 'Coming Soon',
    href: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'MyCase',
    category: 'Case Management',
    description: 'Integrate settlement analytics and case outcome data directly into your MyCase workflow. Enrich case records with federal court intelligence.',
    features: ['Case enrichment', 'Settlement data', 'Automated reports', 'Dashboard widgets'],
    status: 'Coming Soon',
    href: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect MyCaseValue to 5,000+ apps through Zapier. Trigger workflows when new case data is available or send reports to any destination.',
    features: ['5,000+ app connections', 'Trigger-based workflows', 'Multi-step Zaps', 'Filters & paths'],
    status: 'Coming Soon',
    href: '#',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: 'Microsoft Excel',
    category: 'Data',
    description: 'Export structured case data directly into Excel-compatible formats. Pivot tables, charts, and custom analysis ready out of the box.',
    features: ['XLSX export', 'Pre-built templates', 'Pivot-ready data', 'Scheduled delivery'],
    status: 'Available',
    href: '/attorney',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
  },
];

export default function IntegrationsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F6F7', fontFamily: 'var(--font-body)' }}>
      <style>{`
        .integration-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 32px;
          transition: all 0.2s ease;
          position: relative;
        }
        .integration-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border-color: #E8171F;
        }
        .integration-card:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #E8171F;
          border-radius: 2px 4px 0 0;
        }
        .breadcrumb-link:hover {
          color: #FFFFFF !important;
        }
        .integration-link:hover {
          background: #CC1019 !important;
        }
        .feature-tag {
          background: #F8F9FA;
          border: 1px solid #D5D8DC;
          border-radius: 2px;
          padding: 4px 10px;
          font-size: 12px;
          color: #455A64;
          font-family: var(--font-body);
        }
        .cta-btn:hover {
          background: #CC1019 !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .integrations-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{ background: '#00172E', padding: '64px 24px', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
            <Link href="/" className="breadcrumb-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
              Home
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Integrations</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '2px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase' as const,
            marginBottom: '16px',
            background: 'rgba(255,255,255,0.1)',
            color: '#E8171F',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            INTEGRATIONS
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
          }}>
            Connect Your Legal Workflow
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            Integrate federal court analytics into the tools you already use. REST API, data exports, and direct connections to case management platforms.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D5D8DC', padding: '24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' as const }}>
          {[
            { label: 'Available Integrations', value: '3' },
            { label: 'API Endpoints', value: '8+' },
            { label: 'Data Points', value: '5.1M+' },
            { label: 'Uptime SLA', value: '99.9%' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' as const }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 800,
                color: '#E8171F',
                margin: '0 0 4px 0',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#455A64',
                margin: 0,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Cards */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <div
          className="integrations-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {INTEGRATIONS.map((integration) => (
            <div key={integration.name} className="integration-card">
              {/* Icon + Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '2px',
                  background: '#F8F9FA',
                  border: '1px solid #D5D8DC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {integration.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  padding: '4px 10px',
                  borderRadius: '2px',
                  background: integration.status === 'Available' ? 'rgba(7, 135, 74, 0.08)' : 'rgba(232, 23, 31, 0.06)',
                  color: integration.status === 'Available' ? '#07874A' : '#E8171F',
                }}>
                  {integration.status}
                </span>
              </div>

              {/* Category */}
              <p style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#006997',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                margin: '0 0 8px 0',
              }}>
                {integration.category}
              </p>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                color: '#212529',
                margin: '0 0 12px 0',
              }}>
                {integration.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#455A64',
                lineHeight: 1.6,
                margin: '0 0 20px 0',
              }}>
                {integration.description}
              </p>

              {/* Feature Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '24px' }}>
                {integration.features.map((feature) => (
                  <span key={feature} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {integration.status === 'Available' ? (
                <Link
                  href={integration.href}
                  className="integration-link"
                  style={{
                    display: 'inline-block',
                    padding: '10px 24px',
                    background: '#E8171F',
                    color: '#FFFFFF',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Learn More →
                </Link>
              ) : (
                <span style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: '#F8F9FA',
                  color: '#455A64',
                  borderRadius: '2px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid #D5D8DC',
                }}>
                  Notify Me
                </span>
              )}
            </div>
          ))}
        </div>

        {/* API Quick Start */}
        <div style={{
          background: '#00172E',
          borderRadius: '2px',
          padding: '48px',
          marginBottom: '48px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#FFFFFF',
            margin: '0 0 12px 0',
          }}>
            Quick Start with Our API
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 24px 0',
            lineHeight: 1.6,
          }}>
            Get started in minutes. Our REST API provides programmatic access to 5.1M+ federal court case outcomes.
          </p>

          {/* Code Block */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '2px',
            padding: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: '#D5D8DC',
            lineHeight: 1.7,
            overflowX: 'auto' as const,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ color: '#455A64', marginBottom: '8px' }}>{'// Fetch case outcome data'}</div>
            <div>
              <span style={{ color: '#E8171F' }}>const</span>{' '}
              <span style={{ color: '#FFFFFF' }}>response</span>{' '}
              <span style={{ color: '#455A64' }}>=</span>{' '}
              <span style={{ color: '#E8171F' }}>await</span>{' '}
              <span style={{ color: '#006997' }}>fetch</span>
              <span style={{ color: '#D5D8DC' }}>(</span>
            </div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: '#07874A' }}>{`'https://api.mycasevalues.com/v1/outcomes?nos=442&state=CA'`}</span>
              <span style={{ color: '#D5D8DC' }}>,</span>
            </div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: '#D5D8DC' }}>{'{ '}</span>
              <span style={{ color: '#FFFFFF' }}>headers</span>
              <span style={{ color: '#D5D8DC' }}>{': { '}</span>
              <span style={{ color: '#07874A' }}>{`'Authorization'`}</span>
              <span style={{ color: '#D5D8DC' }}>{': '}</span>
              <span style={{ color: '#07874A' }}>{`'Bearer YOUR_API_KEY'`}</span>
              <span style={{ color: '#D5D8DC' }}>{' } }'}</span>
            </div>
            <div>
              <span style={{ color: '#D5D8DC' }}>{')'}</span>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link
              href="/attorney/api-access"
              className="cta-btn"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                background: '#E8171F',
                color: '#FFFFFF',
                borderRadius: '2px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              View API Documentation →
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '2px',
          padding: '48px',
          textAlign: 'center' as const,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#212529',
            margin: '0 0 12px 0',
          }}>
            Need a Custom Integration?
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#455A64',
            margin: '0 0 24px 0',
            lineHeight: 1.6,
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Our team can build custom integrations for enterprise clients. Connect MyCaseValue data to any internal system or workflow.
          </p>
          <Link
            href="/contact"
            className="cta-btn"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#E8171F',
              color: '#FFFFFF',
              borderRadius: '2px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
            }}
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
