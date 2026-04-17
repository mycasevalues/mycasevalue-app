import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Integrations — Connect Your Legal Tools',
  description: 'Integrate MyCaseValue federal court data with your existing legal tools. REST API, CSV exports, and direct connections to case management systems.',
  alternates: { canonical: `${SITE_URL}/integrations` },
  openGraph: {
    title: 'Integrations',
    description: 'Connect federal court analytics to your legal workflow with our API, exports, and direct integrations.',
    type: 'website',
    url: `${SITE_URL}/integrations`,  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations — MyCaseValue | Connect Your Legal Tools',
    description: 'Integrate MyCaseValue federal court data with your existing legal tools. REST API, CSV exports, and direct connections to case management systems.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Integrations', item: `${SITE_URL}/integrations` },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'MyCaseValue Integrations',
      description: 'Connect MyCaseValue federal court data with your existing legal tools.',
      url: `${SITE_URL}/integrations`,
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
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    status: 'Available',
    href: '/contact',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    status: 'Available',
    href: '/contact',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect MyCaseValue to 5,000+ apps through Zapier. Trigger workflows when new case data is available or send reports to any destination.',
    features: ['5,000+ app connections', 'Trigger-based workflows', 'Multi-step Zaps', 'Filters & paths'],
    status: 'Available',
    href: '/contact',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        .integration-card {
          background: var(--color-surface-0);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 32px;
          transition: all 0.2s ease;
          position: relative;
        }
        .integration-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border-color: var(--accent-primary);
        }
        .integration-card:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gold, #C4882A);
          border-radius: 12px 4px 0 0;
        }
        .breadcrumb-link:hover {
          color: var(--color-text-inverse) !important;
        }
        .integration-link:hover {
          background: #B91C1C !important;
        }
        .feature-tag {
          background: var(--color-surface-1);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          padding: 4px 10px;
          font-size: 12px;
          color: var(--color-text-secondary);
          font-family: var(--font-body);
        }
        .cta-btn:hover {
          background: #B91C1C !important;
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
      <div style={{
        background: '#FFFFFF',
        color: '#fff',
        padding: '48px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em' }}>
            <Link href="/" className="breadcrumb-link" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
              Home
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Integrations</span>
          </div>

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
            Integrations
          </div>

          <h1 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            color: '#ffffff',
          }}>
            Connect your legal workflow
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            REST API, data exports, and direct connections to case management platforms. Plug federal court analytics into the tools you already use.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: 'var(--color-surface-0)', borderBottom: '1px solid var(--border-default)', padding: '24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' as const }}>
          {[
            { label: 'Available Integrations', value: '3' },
            { label: 'API Endpoints', value: '8+' },
            { label: 'Data Points', value: '5.1M+' },
            { label: 'Uptime SLA', value: '99.9%' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' as const }}>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                margin: '0 0 4px 0',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
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
                  borderRadius: '6px',
                  background: 'var(--color-surface-1)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {integration.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: integration.status === 'Available' ? 'rgba(34,197,94,0.06)' : 'rgba(232, 23, 31, 0.06)',
                  color: integration.status === 'Available' ? '#059669' : 'var(--accent-primary)',
                  border: integration.status === 'Available' ? '1px solid #BBF7D0' : 'none',
                }}>
                  {integration.status}
                </span>
              </div>

              {/* Category */}
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                margin: '0 0 8px 0',
              }}>
                {integration.category}
              </p>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: '0 0 12px 0',
              }}>
                {integration.name}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
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
              <Link
                href={integration.href}
                className="integration-link"
                style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: 'var(--accent-primary)',
                  color: 'var(--color-text-inverse)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                }}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        {/* Platform Capabilities */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              Platform Capabilities
            </h2>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
            }} />
          </div>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Explore what you can do with MyCaseValue integrations. From API access to custom dashboards, we've built the tools legal teams need.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'API Access',
                description: 'Full programmatic access to case data, settlement ranges, and judge statistics via REST endpoints.',
                status: 'Available',
              },
              {
                title: 'Bulk Data Export',
                description: 'Download large datasets as CSV or Excel for offline analysis, pivot tables, and custom reporting.',
                status: 'Available',
              },
              {
                title: 'PDF Reports',
                description: 'Generate branded PDF reports for client presentations, court filings, and discovery packages.',
                status: 'Available',
              },
              {
                title: 'Webhook Notifications',
                description: 'Receive real-time updates when new case data becomes available or outcomes change.',
                status: 'Available',
              },
              {
                title: 'Custom Dashboards',
                description: 'Build interactive dashboards tailored to your practice area and case metrics.',
                status: 'Available',
              },
              {
                title: 'Embed Widgets',
                description: 'Embed case outcome widgets directly into your practice management platform.',
                status: 'Available',
              },
            ].map((capability) => (
              <div
                key={capability.title}
                className="capability-card"
                style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '24px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <style>{`
                  .capability-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                    border-color: var(--accent-primary-hover);
                  }
                `}</style>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 12px 0',
                }}>
                  {capability.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: '0 0 16px 0',
                }}>
                  {capability.description}
                </p>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: capability.status === 'Available' ? 'rgba(34,197,94,0.06)' : 'rgba(232, 23, 31, 0.06)',
                  color: capability.status === 'Available' ? '#059669' : 'var(--accent-primary)',
                  border: capability.status === 'Available' ? '1px solid #BBF7D0' : 'none',
                  display: 'inline-block',
                }}>
                  {capability.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources We Connect */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              Data Sources We Connect
            </h2>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
            }} />
          </div>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            We integrate with authoritative federal court data sources. Your integrations pull from verified, comprehensive datasets.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {[
              {
                name: 'Federal Judicial Center IDB',
                description: 'Civil and criminal case data from federal district courts (1970–present). 5.1M+ cases.',
                iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
              },
              {
                name: 'CourtListener',
                description: 'Full-text opinions and court documents from U.S. Courts of Appeals and District Courts.',
                iconPath: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5a2.5 2.5 0 0 1 2.5-2.5h12a2.5 2.5 0 0 1 0 5H6.5A2.5 2.5 0 0 1 4 4.5z',
              },
              {
                name: 'PACER',
                description: 'Public Access to Court Electronic Records. Real-time updates on federal case dockets.',
                iconPath: 'M9 12h6M9 16h6M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z',
              },
              {
                name: 'Bureau of Justice Statistics',
                description: 'Official statistics on federal case outcomes, sentencing, and litigation metrics.',
                iconPath: 'M3 3v18h18M3 15.5h18M3 11h18M8 7h8M8 3v4M16 3v4',
              },
            ].map((source) => (
              <div
                key={source.name}
                style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '28px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <div style={{
                  fontSize: '32px',
                  lineHeight: 1,
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={source.iconPath}/></svg>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 8px 0',
                  }}>
                    {source.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {source.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Quick Start */}
        <div style={{
          background: 'var(--accent-primary)',
          borderRadius: '6px',
          padding: '48px',
          marginBottom: '48px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--color-text-inverse)',
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
            borderRadius: '6px',
            padding: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--border-default)',
            lineHeight: 1.7,
            overflowX: 'auto' as const,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{'// Fetch case outcome data'}</div>
            <div>
              <span style={{ color: 'var(--accent-primary)' }}>const</span>{' '}
              <span style={{ color: 'var(--color-text-inverse)' }}>response</span>{' '}
              <span style={{ color: 'var(--color-text-secondary)' }}>=</span>{' '}
              <span style={{ color: 'var(--accent-primary)' }}>await</span>{' '}
              <span style={{ color: 'var(--accent-primary-hover)' }}>fetch</span>
              <span style={{ color: 'var(--border-default)' }}>(</span>
            </div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: '#34d399' }}>{`'https://api.mycasevalues.com/v1/outcomes?nos=442&state=CA'`}</span>
              <span style={{ color: 'var(--border-default)' }}>,</span>
            </div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: 'var(--border-default)' }}>{'{ '}</span>
              <span style={{ color: 'var(--color-text-inverse)' }}>headers</span>
              <span style={{ color: 'var(--border-default)' }}>{': { '}</span>
              <span style={{ color: '#34d399' }}>{`'Authorization'`}</span>
              <span style={{ color: 'var(--border-default)' }}>{': '}</span>
              <span style={{ color: '#34d399' }}>{`'Bearer YOUR_API_KEY'`}</span>
              <span style={{ color: 'var(--border-default)' }}>{' } }'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--border-default)' }}>{')'}</span>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link
              href="/attorney/api-access"
              className="cta-btn"
              style={{
                display: 'inline-block',
                padding: '12px 28px',
                background: 'var(--accent-primary)',
                color: 'var(--color-text-inverse)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              View API Documentation →
            </Link>
          </div>
        </div>

        {/* Get Started Section */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              Get Started
            </h2>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              background: 'var(--accent-primary)',
              borderRadius: '50%',
            }} />
          </div>
          <p style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Ready to integrate? Explore our API documentation or reach out to our team for custom solutions.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            <Link
              href="/solutions/api"
              style={{
                background: 'var(--color-surface-0)',
                border: '2px solid var(--accent-primary-hover)',
                borderRadius: '6px',
                padding: '32px 24px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              className="get-started-link"
            >
              <style>{`
                .get-started-link:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 20px rgba(0, 105, 151, 0.15);
                }
              `}</style>
              <div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary-hover)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 12px 0',
                }}>
                  API Documentation
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  Explore our REST API with endpoints, code samples, and interactive documentation.
                </p>
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginTop: '24px',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}>
                View Docs →
              </span>
            </Link>

            <Link
              href="/contact"
              style={{
                background: 'var(--color-surface-0)',
                border: '2px solid var(--accent-primary)',
                borderRadius: '6px',
                padding: '32px 24px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              className="get-started-link-contact"
            >
              <style>{`
                .get-started-link-contact:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 20px rgba(232, 23, 31, 0.15);
                }
              `}</style>
              <div>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '0 0 12px 0',
                }}>
                  Contact Our Team
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  Discuss custom integrations, enterprise solutions, and integration support.
                </p>
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginTop: '24px',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
              }}>
                Get in Touch →
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          padding: '48px',
          textAlign: 'center' as const,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
          }}>
            Need a Custom Integration?
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--color-text-secondary)',
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
              background: 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
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
