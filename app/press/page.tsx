import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Press Kit',
  description: 'Media resources, brand assets, company information, and press contact for MyCaseValue. Download logos, brand guidelines, and company overview for journalists and media professionals.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'Press Kit',
    description: 'Media resources, brand assets, company information, and press contact for MyCaseValue. Download logos, brand guidelines, and company overview for journalists and media professionals.',
    url: `${SITE_URL}/press`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit',
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
      email: 'press@mycasevalues.com',
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
    { name: 'Navy', hex: 'var(--accent-primary)' },
    { name: 'Primary Blue', hex: 'var(--accent-primary)' },
    { name: 'Secondary Blue', hex: 'var(--accent-primary-hover)' },
    { name: 'Background', hex: 'var(--color-surface-1)' },
    { name: 'Text', hex: 'var(--color-text-primary)' },
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
      text: 'Litigation outcomes shouldn\'t be a mystery. MyCaseValue makes 5.1 million federal court decisions transparent and searchable, so attorneys—regardless of firm size—can make informed decisions backed by real data.',
      author: 'Company Statement',
    },
    {
      text: 'Federal court data is public, but accessing it used to require expensive subscriptions and institutional access. We\'re making it free and integrated so that small firms and pro se litigants can compete with better information.',
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

      <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
        {/* Header Banner */}
        <div style={{
          background: '#080d19',
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
          <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
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
              Press Kit
            </div>
            <h1
              className="press-header"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Democratizing federal court data
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                maxWidth: 640,
                margin: 0,
              }}
            >
              Media resources, brand assets, and story background for journalists covering legal tech and federal court transparency.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div
          style={{
            borderBottom: '1px solid var(--border-default)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: 'var(--color-surface-1)',
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
              <Link href="/" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>Press Kit</span>
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
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: 32,
              }}
            >
              The Story: Leveling the Playing Field
            </h2>
            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr' }}>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                MyCaseValue is breaking down the information asymmetry in litigation. Historically, only large law firms with six-figure legal research subscriptions could access federal court outcome data. We're changing that by making comprehensive federal court analytics—win rates, settlement ranges, case duration, judge tendencies—freely available to anyone.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Our platform analyzes 5.1 million+ federal court cases across 84 case types and 95 federal judicial districts, sourced directly from the Federal Judicial Center, PACER, CourtListener, and other authoritative public records. We combine verified outcome data with integrated legal research to show attorneys and pro se litigants not just what happened in court, but why.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                By integrating AI-powered research tools and connecting case outcomes to the regulations and precedents that shaped them, MyCaseValue empowers attorneys to make smarter decisions and helps pro se litigants understand the legal landscape they're navigating.
              </p>
            </div>
          </section>

          {/* Key Statistics */}
          <section style={{ marginBottom: '80px' }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: 'var(--color-text-primary)',
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
                    border: '1px solid var(--border-default)',
                    background: 'var(--color-surface-0)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 28,
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      marginBottom: 12,
                    }}
                  >
                    {stat.value}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-primary)',
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
                  color: 'var(--color-text-primary)',
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
                      border: '1px solid var(--border-default)',
                      background: 'var(--color-surface-0)',
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
                          ? 'var(--accent-primary)'
                          : 'var(--color-surface-1)',
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={logo.label.includes('Dark') ? 'var(--color-text-inverse)' : 'var(--color-text-primary)'}
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
                        color: 'var(--color-text-primary)',
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
                        color: 'var(--color-text-secondary)',
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
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                Need a different format or resolution? Email press@mycasevalues.com and we'll send over the full brand kit.
              </p>
            </div>

            {/* Brand Colors */}
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
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
                      border: '1px solid var(--border-default)',
                      background: 'var(--color-surface-0)',
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
                          color: 'var(--color-text-primary)',
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
                          color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-primary)',
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
                    border: '1px solid var(--border-default)',
                    background: 'var(--color-surface-0)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <div
                    style={{
                      height: 180,
                      background: 'linear-gradient(135deg, var(--color-surface-1) 0%, var(--border-default) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)',
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
                          color: 'var(--color-text-secondary)',
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
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-display)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {screenshot.title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-primary)',
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
                    border: '1px solid var(--border-default)',
                    background: 'var(--color-surface-0)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    borderLeft: '4px solid var(--accent-primary)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      color: 'var(--color-text-primary)',
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
                      color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-primary)',
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
                border: '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text-secondary)',
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
                color: 'var(--color-text-primary)',
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
                border: '1px solid var(--border-default)',
                background: 'var(--color-surface-0)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.7,
                  margin: '0 0 24px 0',
                }}
              >
                For media inquiries, press releases, interview requests, or other press kit information, please contact:
              </p>
              <a
                href="mailto:press@mycasevalues.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
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
                press@mycasevalues.com
              </a>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-secondary)',
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
          border-color: var(--accent-primary) !important;
          box-shadow: 0 8px 24px rgba(10, 102, 194, 0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
