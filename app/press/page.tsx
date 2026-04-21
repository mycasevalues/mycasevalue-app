import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Press Kit',
  description: 'Press kit and media resources for MyCaseValue, the federal court intelligence platform making 5.1M+ case outcomes accessible to everyone. Brand assets, key facts, and press contact.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'Press Kit — MyCaseValue',
    description: 'Press kit and media resources for MyCaseValue, the federal court intelligence platform making 5.1M+ case outcomes accessible to everyone.',
    url: `${SITE_URL}/press`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — The Federal Court Record. Open to Everyone.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit — MyCaseValue',
    description: 'Press kit and media resources for MyCaseValue, the federal court intelligence platform making 5.1M+ case outcomes accessible to everyone.',
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
    foundingDate: '2026',
    slogan: 'The Federal Court Record. Open to Everyone.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Media Relations',
      email: 'press@mycasevalues.com',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Shared style helpers (Westlaw design tokens)                      */
/* ------------------------------------------------------------------ */
const h2Style: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  fontFamily: 'var(--font-ui)',
  color: 'var(--text1)',
  marginBottom: 24,
  marginTop: 0,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 16,
  fontFamily: 'var(--font-ui)',
  color: 'var(--text2)',
  lineHeight: 1.7,
  margin: 0,
};

const sectionStyle: React.CSSProperties = {
  marginBottom: 56,
};

const cardStyle: React.CSSProperties = {
  padding: 32,
  borderRadius: 4,
  border: '1px solid var(--bdr)',
  background: 'var(--card)',
  boxShadow: 'var(--shadow-xs)',
};

export default function PressPage() {
  /* ---- Section 2 data ---- */
  const keyFacts = [
    { label: 'Launch', value: '2026' },
    { label: 'Federal Cases', value: '5.1M+' },
    { label: 'Judicial Districts', value: '94' },
    { label: 'Years of Data', value: '55+' },
    { label: 'Pricing', value: '$0 \u2013 $29.99/mo' },
    { label: 'Bilingual Support', value: 'EN / ES (coming soon)' },
  ];

  /* ---- Section 4 data ---- */
  const brandColors = [
    { name: 'Navy', hex: '#1B2D45' },
    { name: 'Gold', hex: '#C4882A' },
    { name: 'Cream', hex: '#FFFFFF' },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .press-facts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .press-colors-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .press-facts-grid {
            grid-template-columns: 1fr !important;
          }
          .press-colors-grid {
            grid-template-columns: 1fr !important;
          }
          .press-header h1 {
            font-size: 24px !important;
          }
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--surf)', minHeight: '100vh' }}>
        {/* Header Banner */}
        <div style={{
          background: 'var(--card)',
          padding: '48px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--bdr)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '2px 8px', marginBottom: 16,
              borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
              color: 'var(--link)',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
              Press Kit
            </div>
            <h1
              className="press-header"
              style={{
                fontFamily: 'var(--font-legal)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--text1)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              The Federal Court Record. Open to Everyone.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'var(--text2)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.6,
                maxWidth: 640,
                margin: 0,
              }}
            >
              Press kit, brand assets, and company background for journalists and media professionals covering legal technology and access to justice.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div
          style={{
            borderBottom: '1px solid var(--bdr)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: 'var(--surf)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-ui)',
              }}
            >
              <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--text2)' }}>/</span>
              <span style={{ color: 'var(--text2)' }}>Press Kit</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>

          {/* ============================================================ */}
          {/*  Section 1 — About MyCaseValue                               */}
          {/* ============================================================ */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>About MyCaseValue</h2>

            <div style={{ ...cardStyle, display: 'grid', gap: 20 }}>
              <p style={{ ...bodyStyle, fontSize: 18, fontWeight: 600, color: 'var(--text1)' }}>
                Mission: &ldquo;The Federal Court Record. Open to Everyone.&rdquo;
              </p>

              <p style={bodyStyle}>
                MyCaseValue is a federal court intelligence platform that makes case outcome data accessible to everyone&mdash;not just BigLaw firms with enterprise budgets. It covers 5.1&nbsp;million federal cases across all 94 judicial districts, sourced from the FJC Integrated Database.
              </p>

              <p style={bodyStyle}>
                The platform was founded by a federal court litigant who built the tool they needed: a way to look up real outcome data&mdash;win rates, settlement ranges, case durations, judge tendencies&mdash;without a six-figure research subscription. That first-hand experience shapes every product decision and keeps the mission focused on accessibility over exclusivity.
              </p>

              <p style={bodyStyle}>
                By combining verified public-record data with real-time analytics and AI-powered research tools, MyCaseValue empowers pro&nbsp;se litigants, solo attorneys, law students, researchers, and insurance professionals to make decisions backed by the same data that large firms have relied on for decades.
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  Section 2 — Key Facts                                       */}
          {/* ============================================================ */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>Key Facts</h2>

            <div
              className="press-facts-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginBottom: 24,
              }}
            >
              {keyFacts.map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    ...cardStyle,
                    textAlign: 'center',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 24,
                      fontWeight: 700,
                      color: 'var(--link)',
                      marginBottom: 8,
                    }}
                  >
                    {fact.value}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--text2)',
                      fontFamily: 'var(--font-ui)',
                      margin: 0,
                    }}
                  >
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ ...cardStyle, padding: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 15 }}>
                <tbody>
                  {[
                    ['Audience', 'Pro se litigants, solo attorneys, law students, researchers, insurance professionals'],
                    ['Technology', 'Real-time analytics, AI-powered tools, bilingual EN/ES (coming soon)'],
                    ['Pricing', '$0 \u2013 $29.99/month \u2014 transparent pricing, visible on the website'],
                    ['Contact', 'press@mycasevalues.com'],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid var(--bdr)' }}>
                      <td style={{ padding: '12px 16px 12px 0', fontWeight: 600, color: 'var(--text1)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{label}</td>
                      <td style={{ padding: '12px 0', color: 'var(--text2)' }}>
                        {label === 'Contact' ? (
                          <a href="mailto:press@mycasevalues.com" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  Section 3 — What Makes Us Different                         */}
          {/* ============================================================ */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>What Makes Us Different</h2>

            <div style={{ display: 'grid', gap: 16 }}>
              {[
                {
                  heading: 'Designed for non-attorneys',
                  body: 'The only federal court analytics platform built from the ground up for people outside BigLaw\u2014pro se litigants, solo practitioners, students, and researchers.',
                },
                {
                  heading: 'Transparent pricing on the website',
                  body: 'Every plan from free to $29.99/month is published on the pricing page. No "contact sales," no hidden enterprise quotes.',
                },
                {
                  heading: 'Built by a litigant, not a corporation',
                  body: 'Founded by someone who needed this tool as a federal court litigant and could not find it anywhere else.',
                },
                {
                  heading: '"Open to Everyone"',
                  body: 'The mission is accessibility, not exclusivity. Federal court data is public record\u2014MyCaseValue makes it usable.',
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  style={{
                    ...cardStyle,
                    padding: 24,
                    borderLeft: '4px solid var(--gold, #C4882A)',
                  }}
                >
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', margin: '0 0 8px 0' }}>
                    {item.heading}
                  </p>
                  <p style={{ ...bodyStyle, fontSize: 15 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================ */}
          {/*  Section 4 — Brand Assets                                    */}
          {/* ============================================================ */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>Brand Assets</h2>

            <div style={{ ...cardStyle, marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 15 }}>
                <tbody>
                  {[
                    ['Brand Name', 'MyCaseValue (singular)'],
                    ['Website', 'mycasevalues.com'],
                    ['Tagline', '\u201CThe Federal Court Record. Open to Everyone.\u201D'],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid var(--bdr)' }}>
                      <td style={{ padding: '12px 16px 12px 0', fontWeight: 600, color: 'var(--text1)', whiteSpace: 'nowrap' }}>{label}</td>
                      <td style={{ padding: '12px 0', color: 'var(--text2)' }}>
                        {label === 'Website' ? (
                          <a href="https://mycasevalues.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Brand Colors */}
            <p style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', marginBottom: 16 }}>
              Brand Colors
            </p>
            <div
              className="press-colors-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginBottom: 24,
              }}
            >
              {brandColors.map((color) => (
                <div
                  key={color.name}
                  style={{
                    overflow: 'hidden',
                    borderRadius: 4,
                    border: '1px solid var(--bdr)',
                    background: 'var(--card)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div style={{ height: 80, background: color.hex }} />
                  <div style={{ padding: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', margin: '0 0 4px 0' }}>
                      {color.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text2)', margin: 0 }}>
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)', margin: 0 }}>
              Need logos or additional assets? Email{' '}
              <a href="mailto:press@mycasevalues.com" style={{ color: 'var(--link)', textDecoration: 'none' }}>
                press@mycasevalues.com
              </a>{' '}
              and we will send the full brand kit.
            </p>
          </section>

          {/* ============================================================ */}
          {/*  Media Contact (footer CTA)                                  */}
          {/* ============================================================ */}
          <section>
            <div
              style={{
                ...cardStyle,
                padding: 40,
                borderTop: '4px solid var(--gold, #C4882A)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 8px 0' }}>
                Media Inquiries
              </p>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>
                For press releases, interview requests, or additional information:
              </p>
              <a
                href="mailto:press@mycasevalues.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--link)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                press@mycasevalues.com
              </a>
              <p style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'var(--font-ui)', marginTop: 16, marginBottom: 0 }}>
                We aim to respond within 24 hours. Please include your publication and the nature of your inquiry.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
