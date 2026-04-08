import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Press Kit | MyCaseValue',
  description: 'Media resources, brand assets, company information, and press contact for MyCaseValue. Download logos, brand guidelines, and company overview for journalists and media professionals.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'Press Kit | MyCaseValue',
    description: 'Media resources, brand assets, company information, and press contact for MyCaseValue. Download logos, brand guidelines, and company overview for journalists and media professionals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit | MyCaseValue',
    description: 'Media resources, brand assets, company information, and press contact for MyCaseValue. Download logos, brand guidelines, and company overview for journalists and media professionals.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'MyCaseValue Press Kit',
  url: `${SITE_URL}/press`,
  mainEntity: {
    '@type': 'Organization',
    name: 'MyCaseValue',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Media Relations',
      email: 'press@mycasevalue.com',
    },
  },
};

export default function PressPage() {
  const stats = [
    { label: 'Federal Cases Analyzed', value: '5,100,000+' },
    { label: 'Case Type Categories', value: '84' },
    { label: 'Federal Judicial Districts', value: '95' },
    { label: 'Federal Circuits', value: '13' },
    { label: 'Data Points Per Case Type', value: '50+' },
    { label: 'Real-Time AI Analysis Tools', value: 'Yes' },
    { label: 'Updated from FJC', value: 'Quarterly' },
    { label: 'Free for Pro Se Litigants', value: 'Yes' },
  ];

  const brandColors = [
    { name: 'Navy', hex: '#0966C3' },
    { name: 'Primary Blue', hex: '#0966C3' },
    { name: 'Secondary Blue', hex: '#004182' },
    { name: 'Background', hex: '#F7F8FA' },
    { name: 'Text', hex: '#0f0f0f' },
    { name: 'Accent Grey', hex: '#E0DDD8' },
  ];

  const logoFormats = [
    { label: 'SVG Light', filename: 'mycasevalue-logo-light.svg' },
    { label: 'SVG Dark', filename: 'mycasevalue-logo-dark.svg' },
    { label: 'PNG Light', filename: 'mycasevalue-logo-light.png' },
    { label: 'PNG Dark', filename: 'mycasevalue-logo-dark.png' },
  ];

  const screenshots = [
    { title: 'Homepage', description: 'Main landing page experience' },
    { title: 'NOS Report Page', description: 'Nature of Suit case analysis' },
    { title: 'District Analysis', description: 'Federal district statistics' },
    { title: 'Case Calculator', description: 'Interactive case analysis tool' },
    { title: 'Compare Tool', description: 'Side-by-side case comparison' },
    { title: 'AI Research Assistant', description: 'Intelligent case research features' },
  ];

  const quotes = [
    {
      text: 'MyCaseValue democratizes access to federal court data that was previously available only to large law firms with expensive research subscriptions.',
      author: 'Company Statement',
    },
    {
      text: 'By making settlement ranges and win rates transparent, MyCaseValue helps level the playing field for pro se litigants and small firms.',
      author: 'Company Statement',
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .press-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .press-brand-colors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .press-screenshots-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .press-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .press-brand-colors-grid {
            grid-template-columns: 1fr !important;
          }
          .press-screenshots-grid {
            grid-template-columns: 1fr !important;
          }
          .press-header h1 {
            font-size: 28px !important;
          }
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
        {/* Header Banner */}
        <div style={{ background: '#0966C3', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  backgroundColor: '#0966C3',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                PRESS KIT
              </span>
            </div>
            <h1
              className="press-header"
              style={{
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 600,
                color: '#FFFFFF',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-1px',
                marginBottom: 12,
              }}
            >
              Press Kit
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}
            >
              Media resources, brand assets, and company information for journalists and media professionals.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div
          style={{
            borderBottom: '1px solid #E5E7EB',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: '#F7F8FA',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Link href="/" style={{ color: '#004182', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: '#4B5563' }}>/</span>
              <span style={{ color: '#4B5563' }}>Press Kit</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
          {/* Company Overview */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Company Overview
            </h2>
            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr' }}>
              <p
                style={{
                  fontSize: 16,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                MyCaseValue is a legal analytics platform providing data-driven insights into federal court outcomes, helping attorneys and pro se litigants make informed litigation decisions.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Founded on the principle that court data should be accessible to everyone, the platform analyzes 5.1 million+ federal court cases across 84 case types and 95 federal judicial districts.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                The platform combines FJC Integrated Database analysis, AI-powered research tools, and statistical modeling to deliver win rates, settlement ranges, and case outcome predictions.
              </p>
            </div>
          </section>

          {/* Key Statistics */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Key Statistics
            </h2>
            <div
              className="press-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 24,
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: 28,
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#0966C3',
                      marginBottom: 12,
                    }}
                  >
                    {stat.value}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#4B5563',
                      fontFamily: 'var(--font-body)',
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Assets */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Brand Assets
            </h2>

            {/* Logo Downloads */}
            <div style={{ marginBottom: 56 }}>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 20,
                }}
              >
                Logo Downloads
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                }}
              >
                {logoFormats.map((logo) => (
                  <a
                    key={logo.filename}
                    href={`/press/assets/${logo.filename}`}
                    style={{
                      padding: 24,
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    className="press-logo-download"
                    title={`Download ${logo.label}`}
                  >
                    <div
                      style={{
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 12,
                        borderRadius: '8px',
                        background: logo.label.includes('Dark')
                          ? '#0966C3'
                          : '#F7F8FA',
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={logo.label.includes('Dark') ? '#FFFFFF' : '#0f0f0f'}
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-body)',
                        margin: 0,
                        marginBottom: 4,
                      }}
                    >
                      {logo.label}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: '#4B5563',
                        fontFamily: 'var(--font-body)',
                        margin: 0,
                      }}
                    >
                      {logo.filename.endsWith('.svg')
                        ? 'Vector'
                        : 'Raster'}
                    </p>
                  </a>
                ))}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                TODO: Links point to Vercel Blob asset storage. Upload logo files and update href paths.
              </p>
            </div>

            {/* Brand Colors */}
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0f0f0f',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 20,
                }}
              >
                Brand Colors
              </h3>
              <div
                className="press-brand-colors-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                }}
              >
                {brandColors.map((color) => (
                  <div
                    key={color.hex}
                    style={{
                      overflow: 'hidden',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      style={{
                        height: 120,
                        background: color.hex,
                      }}
                    />
                    <div style={{ padding: 16 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#0f0f0f',
                          fontFamily: 'var(--font-display)',
                          margin: '0 0 8px 0',
                        }}
                      >
                        {color.name}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 13,
                          color: '#4B5563',
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {color.hex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Platform Screenshots */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Platform Screenshots
            </h2>
            <div
              className="press-screenshots-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
              }}
            >
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.title}
                  style={{
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <div
                    style={{
                      height: 180,
                      background: 'linear-gradient(135deg, #F7F8FA 0%, #E5E7EB 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid #E5E7EB',
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        color: '#4B5563',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p
                        style={{
                          fontSize: 12,
                          color: '#4B5563',
                          margin: '8px 0 0 0',
                        }}
                      >
                        Screenshot
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#0f0f0f',
                        fontFamily: 'var(--font-display)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {screenshot.title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: '#4B5563',
                        fontFamily: 'var(--font-body)',
                        margin: 0,
                      }}
                    >
                      {screenshot.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
                marginTop: 16,
                marginBottom: 0,
              }}
            >
              Screenshots showcase MyCaseValue platform features and data visualizations.
            </p>
          </section>

          {/* Press Quotes */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Approved Quotes
            </h2>
            <div
              style={{
                display: 'grid',
                gap: 24,
              }}
            >
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  style={{
                    padding: 32,
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    background: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid #0966C3',
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      color: '#0f0f0f',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.7,
                      margin: '0 0 16px 0',
                      fontStyle: 'italic',
                    }}
                  >
                    "{quote.text}"
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#4B5563',
                      fontFamily: 'var(--font-body)',
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    — {quote.author}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* In the News */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              In the News
            </h2>
            <div
              style={{
                padding: 48,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  margin: 0,
                }}
              >
                Press mentions will appear here as they are published.
              </p>
            </div>
          </section>

          {/* Media Contact */}
          <section>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#0f0f0f',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              Media Contact
            </h2>
            <div
              style={{
                padding: 40,
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: '0 0 24px 0',
                }}
              >
                For media inquiries, press releases, interview requests, or other press kit information, please contact:
              </p>
              <a
                href="mailto:press@mycasevalue.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0966C3',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 24,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                press@mycasevalue.com
              </a>
              <p
                style={{
                  fontSize: 14,
                  color: '#4B5563',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                We aim to respond to media inquiries within 24 hours. Please include details about your publication and the nature of your inquiry.
              </p>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .press-logo-download:hover {
          border-color: #0966C3 !important;
          box-shadow: 0 8px 24px rgba(10, 102, 194, 0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
