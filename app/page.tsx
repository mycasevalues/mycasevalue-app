/**
 * MyCaseValue Homepage — Westlaw Precision search hub pattern.
 *
 * Layout (top → bottom):
 * 1. Hero Search Section (white card, serif headline, 44px search bar)
 * 2. GetStartedBar (42px shortcut pills)
 * 3. Browse Tabs (Precision Analytics default — CSS-only switching)
 *    - Precision Analytics: 2-col (form + sidebar)
 *    - All Records: 3×2 browse cards
 * 4. Disclaimer
 *
 * No hero images. No testimonials. No marketing above fold.
 * Search IS the hero. Data IS the design.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';
import GetStartedBar from '@/components/ui/GetStartedBar';
import ResearchOrganizer from '@/components/ui/ResearchOrganizer';
import Onboarding from '@/components/Onboarding';
import JsonLd from '@/components/JsonLd';
import HomeHeroSearch from '@/components/ui/HomeHeroSearch';
import HomePrecisionButtons from '@/components/ui/HomePrecisionButtons';
import FreeReportCTA from '@/components/FreeReportCTA';
import EmailCapture from '@/components/EmailCapture';
import TrustSection from '@/components/TrustSection';
import TrustSignals from '@/components/TrustSignals';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  // Use absolute so the rendered <title> is exactly this string, unaffected by
  // the parent layout's title.template ('%s — MyCaseValue'). Without this, the
  // homepage tab rendered as just 'Federal Court Intelligence Platform' with
  // the brand suffix missing — confirmed via `curl`.
  title: {
    absolute: 'MyCaseValue — Federal Court Intelligence Platform',
  },
  description:
    'Litigation intelligence from public federal court records. Case outcomes, judge analytics, venue analysis, and settlement data across all 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [{ url: `${SITE_URL}/api/og?type=generic&title=${encodeURIComponent('Federal Court Data — Open to Everyone')}`, width: 1200, height: 630, alt: 'MyCaseValue' }],
    description: 'Litigation intelligence from public federal court records.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue | Federal Court Intelligence',
    description: 'Litigation intelligence from public federal court records.',
    images: [`${SITE_URL}/api/og?type=generic&title=${encodeURIComponent('Federal Court Data — Open to Everyone')}`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/* ── Static data ── */

const BROWSE_CARDS = [
  {
    title: 'Federal Districts',
    description: '94 districts, 12 circuits. Filter by case load, judge roster, and case type distribution.',
    stat: '94 districts',
    href: '/districts',
  },
  {
    title: 'Judges',
    description: 'Judicial analytics for every active and senior federal judge. Win rates, median durations, case history.',
    stat: '3,400+ judges',
    href: '/judges',
  },
  {
    title: 'Case Analytics',
    description: 'Disposition breakdowns, win rates, and timeline data across all case types and jurisdictions.',
    stat: `${SITE_METRICS.totalCases} cases`,
    href: '/cases',
  },
  {
    title: 'Settlement Ranges',
    description: 'Median and mean settlement data by case type, district, and year. Updated weekly from public records.',
    stat: '84 case types',
    href: '/cases',
  },
  {
    title: 'Attorneys',
    description: 'Performance analytics for attorneys appearing in federal court. Track opposing counsel, firm patterns, win rates.',
    stat: '120,000+ attorneys',
    href: '/attorney',
  },
  {
    title: 'Research Tools',
    description: 'Advanced legal research including citation checking, secondary sources, 50-state surveys, and document comparison.',
    stat: '8 research tools',
    href: '/attorney',
  },
];

/* Recent searches removed — shown only for authenticated users */

const PLATFORM_STATS = [
  { label: 'Total Cases Indexed', value: '5,147,392' },
  { label: 'Federal Districts', value: '94' },
  { label: 'Active Judges', value: '3,412' },
  { label: 'Data Source', value: 'FJC IDB' },
  { label: 'Median Processing', value: '< 200ms' },
];

// Structured data for homepage
const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: 'Federal court case analytics and outcome data for legal professionals',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalues.com',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'MyCaseValue',
      description: 'Federal court case analytics and outcome data for legal professionals',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/cases?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <Onboarding />
      <main style={{ fontFamily: 'var(--font-ui)' }}>

      {/* ═══ 1. HERO SEARCH SECTION ═══ */}
      <section
        className="home-hero"
        style={{
          background: 'var(--card)',
          borderBottom: '1px solid var(--bdr)',
          padding: '32px 32px 24px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'var(--text3, #4A4940)',
              margin: '0 0 8px',
            }}
          >
            FEDERAL COURT DATA
          </p>

          {/* Headline */}
          <h1
            className="home-hero-h1"
            style={{
              fontFamily: 'var(--font-legal)',
              fontWeight: 700,
              fontSize: 38,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '0 0 4px',
            }}
          >
            <span style={{ color: 'var(--text1, #333333)' }}>The Federal Court Record.</span>
            <br />
            <span style={{ color: 'var(--gold, #C4882A)' }}>Open to Everyone.</span>
          </h1>

          {/* Body text */}
          <p
            style={{
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text2, #525252)',
              lineHeight: 1.6,
              maxWidth: 600,
              margin: '8px 0 12px',
            }}
          >
            5.1 million federal cases across 94 districts. Win rates, settlement ranges,
            judge analytics, and case timelines — sourced from public records for every
            litigant, every attorney, every researcher.
          </p>

          {/* 44px Search bar — client component with navigation */}
          <HomeHeroSearch />

          {/* Attribution row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text3, #4A4940)',
              }}
            >
              Searching{' '}
              <span style={{ color: 'var(--link)', fontWeight: 600 }}>
                94 federal districts
              </span>
            </span>
            <Link
              href="/search"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                textDecoration: 'none',
              }}
            >
              Advanced search
            </Link>
            <Link
              href="/methodology"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                textDecoration: 'none',
              }}
            >
              Search tips
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST SIGNALS ═══ */}
      <div style={{ padding: '16px 24px', maxWidth: 800, margin: '0 auto' }}>
        <TrustSignals />
      </div>

      {/* ═══ 2. GET STARTED BAR ═══ */}
      <GetStartedBar />

      {/* ═══ 3. BROWSE TABS ═══ */}
      {/* CSS-only tabs using hidden radio inputs for SSR compatibility */}
      <input type="radio" name="hometab" id="tab-precision" defaultChecked className="hp-tab-radio" />
      <input type="radio" name="hometab" id="tab-records" className="hp-tab-radio" />

      <div
        style={{
          borderBottom: '2px solid var(--bdr)',
          background: 'var(--card)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'tab-precision', label: 'Precision Analytics', special: true },
          { id: 'tab-records', label: 'All Records', special: false },
        ].map((tab) => (
          <label
            key={tab.id}
            htmlFor={tab.id}
            className={`hp-tab-label ${tab.special ? 'hp-tab-precision' : 'hp-tab-generic'}`}
            style={{
              height: 39,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text3, #4A4940)',
              cursor: 'pointer',
              borderBottom: '3px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'color 150ms ease',
              userSelect: 'none',
            }}
          >
            {tab.label}
          </label>
        ))}
        {/* Static nav links (navigate to other pages — styled differently from tabs) */}
        {['Districts', 'Cases', 'Attorney Tools'].map((t) => (
          <Link
            key={t}
            href={t === 'Districts' ? '/districts' : t === 'Cases' ? '/cases' : '/attorney'}
            className="hp-nav-link"
            style={{
              height: 39,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text3, #4A4940)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 150ms ease',
              borderLeft: '1px solid var(--bdr)',
            }}
          >
            {t}
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{ opacity: 0.5 }}>
              <path d="M1 7L7 1M7 1H2.5M7 1V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
        <Link
          href="/dashboard"
          style={{
            height: 39,
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text3, #4A4940)',
            textDecoration: 'none',
            marginLeft: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          My Research
        </Link>
      </div>

      {/* ═══ 4. PRECISION ANALYTICS TAB CONTENT (DEFAULT) ═══ */}
      <div className="hp-panel hp-panel-precision">
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            gap: 24,
          }}
        >
          {/* Left: form + recent searches */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text2, #525252)',
                lineHeight: 1.6,
                margin: '0 0 12px',
              }}
            >
              Build a structured search across federal court data. Select parameters below
              to find matching cases, outcomes, and analytics.
            </p>

            {/* Form panel */}
            <div
              style={{
                background: 'var(--gold-light, #FAF3E6)',
                border: '1px solid var(--gold-border, #E8D09C)',
                borderRadius: 2,
                padding: '16px',
                marginBottom: 16,
              }}
            >
              {/* 2×3 grid of form fields */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px 12px',
                }}
              >
                {[
                  { label: 'District', placeholder: 'All Districts' },
                  { label: 'Case Type', placeholder: 'All Case Types' },
                  { label: 'Legal Issue', placeholder: 'Any Issue' },
                  { label: 'Outcome', placeholder: 'Any Outcome' },
                  { label: 'Motion Type', placeholder: 'Any Motion' },
                  { label: 'Judge', placeholder: 'Any Judge' },
                ].map((field) => (
                  <div key={field.label}>
                    <div
                      style={{
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: 'var(--text3, #4A4940)',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      {field.label}
                    </div>
                    <div
                      style={{
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 8px',
                        background: 'var(--card)',
                        border: '1px solid var(--bdr)',
                        borderRadius: 2,
                        fontSize: 12,
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--text4, #8A8780)',
                        cursor: 'pointer',
                      }}
                    >
                      <span>{field.placeholder}</span>
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
                        <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Run button row — client component with navigation */}
              <HomePrecisionButtons />
            </div>

            {/* Recent Searches — empty state for unauthenticated users */}
            <div style={{ marginTop: 4 }}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text3, #4A4940)',
                  marginBottom: 8,
                }}
              >
                Recent Searches
              </div>
              <div
                style={{
                  padding: '16px',
                  background: 'var(--sidebar2, #F7F8FA)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text3, #4A4940)',
                    margin: '0 0 8px',
                    lineHeight: 1.5,
                  }}
                >
                  Your recent searches will appear here.
                </p>
                <Link
                  href="/sign-in"
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--link)',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign in to save your research →
                </Link>
              </div>
            </div>
          </div>

          {/* Right sidebar (282px) */}
          <div style={{ width: 282, flexShrink: 0 }}>
            {/* My Alerts panel */}
            <div
              style={{
                background: 'var(--sidebar2, #F7F8FA)',
                border: '1px solid var(--bdr)',
                borderRadius: 2,
                padding: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text3, #4A4940)',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                My Alerts
              </div>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text3, #4A4940)',
                  lineHeight: 1.5,
                  margin: '0 0 6px',
                }}
              >
                Set up alerts to track new filings, rulings, and case outcomes.
              </p>
              <Link
                href="/sign-in"
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--link)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign in to create alerts →
              </Link>
            </div>

            {/* Research Organizer */}
            <div style={{ marginBottom: 10 }}>
              <ResearchOrganizer />
            </div>

            {/* Platform Statistics */}
            <div
              style={{
                background: 'var(--sidebar2, #F7F8FA)',
                border: '1px solid var(--bdr)',
                borderRadius: 2,
                padding: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text3, #4A4940)',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Platform Statistics
              </div>
              {PLATFORM_STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 0',
                    borderBottom: '1px solid var(--bdr)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text3, #4A4940)',
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text1, #333333)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 5. ALL RECORDS TAB CONTENT ═══ */}
      <div className="hp-panel hp-panel-records">
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '16px 24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 20,
                color: 'var(--text1, #333333)',
                margin: 0,
              }}
            >
              Browse All Content
            </h2>
            <Link
              href="/cases"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link)',
                textDecoration: 'none',
              }}
            >
              View all →
            </Link>
          </div>

          {/* 3×2 browse cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
            className="hp-card-grid"
          >
            {BROWSE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="hp-browse-card"
                style={{
                  display: 'block',
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: 2,
                  borderTop: '3px solid var(--bdr)',
                  padding: '12px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 150ms ease, box-shadow 150ms ease',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-legal)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--chrome-bg)',
                    margin: '0 0 4px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text3, #4A4940)',
                    lineHeight: 1.5,
                    margin: '0 0 8px',
                  }}
                >
                  {card.description}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--gold, #C4882A)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {card.stat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FREE REPORT CTA ═══ */}
      <div
        style={{
          padding: '32px 24px',
          borderTop: '1px solid var(--bdr)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FreeReportCTA />
        </div>
      </div>

      {/* ═══ TESTIMONIALS ═══ */}
      <div
        style={{
          padding: '32px 24px',
          borderTop: '1px solid var(--bdr)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--text1, #333333)',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            What Our Users Say
          </h2>
          <Testimonials />
        </div>
      </div>

      {/* ═══ STAY UPDATED — EMAIL CAPTURE ═══ */}
      <div
        style={{
          padding: '32px 24px',
          borderTop: '1px solid var(--bdr)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <EmailCapture
            heading="Stay Updated"
            subtext="Get notified when new court data is available."
            source="homepage"
            variant="inline"
          />
        </div>
      </div>

      {/* ═══ OUR STORY ═══ */}
      <section
        style={{
          padding: '32px 24px',
          borderTop: '1px solid var(--bdr)',
          background: 'var(--surf, var(--sidebar2, #F7F8FA))',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--text1, #333333)',
              margin: '0 0 12px',
            }}
          >
            Built by a Litigant, for Everyone.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'var(--text2, #525252)',
              margin: '0 0 14px',
              maxWidth: 560,
            }}
          >
            MyCaseValue started when our founder faced a federal lawsuit and couldn&#39;t find
            accessible court data. Every platform was enterprise-priced, designed for BigLaw,
            and locked behind paywalls. So we built the tool we needed — and made it open to everyone.
          </p>
          <Link
            href="/about"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--link)',
              textDecoration: 'none',
            }}
          >
            Read our story →
          </Link>
        </div>
      </section>

      {/* ═══ DISCLAIMER ═══ */}
      <div
        style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--bdr)',
          background: 'var(--card)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text3, #4A4940)',
            margin: 0,
          }}
        >
          Federal court data sourced from FJC IDB, CourtListener, RECAP, and PACER. For informational purposes only. Not legal advice.
        </p>
      </div>

      {/* ═══ CSS-ONLY TAB SWITCHING + HOVER STYLES ═══ */}
      <style>{`
        /* Hide radio inputs */
        .hp-tab-radio { display: none; }

        /* Default: show precision, hide records */
        .hp-panel-precision { display: block; }
        .hp-panel-records { display: none; }

        /* When All Records radio is checked */
        #tab-records:checked ~ .hp-panel-precision { display: none; }
        #tab-records:checked ~ .hp-panel-records { display: block; }

        /* Tab active states */
        #tab-precision:checked ~ div .hp-tab-precision {
          color: var(--link) !important;
          font-weight: 600;
          border-bottom-color: var(--link) !important;
        }
        #tab-records:checked ~ div .hp-tab-generic {
          color: var(--text1, #333333) !important;
          font-weight: 600;
          border-bottom-color: var(--link) !important;
        }
        /* Reset precision active when records is checked */
        #tab-records:checked ~ div .hp-tab-precision {
          color: var(--text3, #4A4940) !important;
          font-weight: 400;
          border-bottom-color: transparent !important;
        }

        /* Tab hover */
        .hp-tab-label:hover { color: var(--text1, #333333) !important; }

        /* Browse cards hover */
        .hp-browse-card:hover {
          border-top-color: var(--gold, #C4882A) !important;
          box-shadow: var(--shadow-sm) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hp-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .home-hero-h1 { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .hp-card-grid { grid-template-columns: 1fr !important; }
          .home-hero { padding: 16px 16px 12px !important; }
          .home-hero-h1 { font-size: 24px !important; }
        }
      `}</style>
    </main>
    </>
  );
}
