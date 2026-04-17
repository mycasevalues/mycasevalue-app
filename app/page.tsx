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

export const metadata: Metadata = {
  title: 'MyCaseValue Advantage — Federal Court Intelligence Platform',
  description:
    'Institutional-grade litigation intelligence from public federal court records. Case outcomes, judge analytics, venue analysis, and settlement data across all 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue Advantage | Federal Court Intelligence',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue' }],
    description: 'Litigation intelligence from public federal court records.',
    url: SITE_URL,
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
    stat: 'Updated weekly',
    href: '/outcomes',
  },
  {
    title: 'Attorneys',
    description: 'Performance analytics for attorneys appearing in federal court. Track opposing counsel, firm patterns, win rates.',
    stat: '120,000+ attorneys',
    href: '/attorney',
  },
  {
    title: 'Practice Areas',
    description: 'Navigate by claim type, statute, and outcome. 14 categories covering the full federal civil docket.',
    stat: '14 categories',
    href: '/cases',
  },
];

const RECENT_SEARCHES = [
  { terms: 'Employment discrimination, SDNY, 2023-2025', count: 342, time: '2h ago' },
  { terms: 'Patent infringement, CACD, summary judgment', count: 128, time: '5h ago' },
  { terms: 'Civil rights § 1983, NDIL, jury trial', count: 567, time: '1d ago' },
  { terms: 'Securities fraud, class action, SDNY', count: 89, time: '2d ago' },
];

const PLATFORM_STATS = [
  { label: 'Total Cases Indexed', value: '5,147,392' },
  { label: 'Federal Districts', value: '94' },
  { label: 'Active Judges', value: '3,412' },
  { label: 'Last Data Refresh', value: '02:00 UTC' },
  { label: 'Median Processing', value: '< 200ms' },
];

/* ── Inline SVG: Search icon ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M13 13L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'var(--font-ui)' }}>

      {/* ═══ 1. HERO SEARCH SECTION ═══ */}
      <section
        style={{
          background: 'var(--card, #FFFFFF)',
          borderBottom: '1px solid var(--bdr, #E2DFD8)',
          padding: '24px 32px 16px',
        }}
      >
        <div style={{ maxWidth: 824, margin: '0 auto' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--text3, #78766C)',
              margin: '0 0 8px',
            }}
          >
            MyCaseValue Advantage — Federal Court Intelligence Platform
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-legal)',
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 4px',
            }}
          >
            <span style={{ color: 'var(--text1, #18181A)' }}>The Federal Court Record.</span>
            <br />
            <span style={{ color: 'var(--gold, #C4882A)' }}>Open to Everyone.</span>
          </h1>

          {/* Body text */}
          <p
            style={{
              fontSize: 13,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text2, #42403C)',
              lineHeight: 1.65,
              maxWidth: 600,
              margin: '8px 0 14px',
            }}
          >
            5.1 million federal cases across 94 districts. Win rates, settlement ranges,
            judge analytics, and case timelines — sourced from public records for every
            litigant, every attorney, every researcher.
          </p>

          {/* 44px Search bar */}
          <div
            style={{
              display: 'flex',
              height: 44,
              maxWidth: 820,
              border: '2px solid var(--chrome-bg, #1B2D45)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Search input */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                background: 'var(--card, #FFFFFF)',
                gap: 8,
              }}
            >
              <span style={{ color: 'var(--text4, #A8A6A0)', flexShrink: 0 }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search cases, judges, districts, or legal issues..."
                aria-label="Search federal court records"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 13,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text1, #18181A)',
                  background: 'transparent',
                }}
              />
            </div>

            {/* Jurisdiction dropdown — RIGHT side */}
            <div
              style={{
                width: 152,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                background: 'var(--surf, #F6F5F2)',
                borderLeft: '1px solid var(--bdr, #E2DFD8)',
                fontSize: 11,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text2, #42403C)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <span>All Jurisdictions</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Search button */}
            <button
              type="button"
              style={{
                width: 92,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                background: 'var(--chrome-bg, #1B2D45)',
                color: 'var(--card, #FFFFFF)',
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Search
            </button>
          </div>

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
                fontSize: 10,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text3, #78766C)',
              }}
            >
              Powered by{' '}
              <span style={{ color: 'var(--link, #0A50A2)', fontWeight: 600 }}>
                FederalSearch+
              </span>
            </span>
            <Link
              href="/search"
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link, #0A50A2)',
                textDecoration: 'none',
              }}
            >
              Advanced search
            </Link>
            <Link
              href="/methodology"
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link, #0A50A2)',
                textDecoration: 'none',
              }}
            >
              Search tips
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2. GET STARTED BAR ═══ */}
      <GetStartedBar />

      {/* ═══ 3. BROWSE TABS ═══ */}
      {/* CSS-only tabs using hidden radio inputs for SSR compatibility */}
      <input type="radio" name="hometab" id="tab-precision" defaultChecked className="hp-tab-radio" />
      <input type="radio" name="hometab" id="tab-records" className="hp-tab-radio" />

      <div
        style={{
          borderBottom: '2px solid var(--bdr, #E2DFD8)',
          background: 'var(--card, #FFFFFF)',
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
              color: 'var(--text3, #78766C)',
              cursor: 'pointer',
              borderBottom: '3px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease',
              userSelect: 'none',
            }}
          >
            {tab.label}
          </label>
        ))}
        {/* Static nav-style tabs (link elsewhere) */}
        {['Federal Courts', 'Practice Areas', 'Analytics Tools'].map((t) => (
          <Link
            key={t}
            href={t === 'Federal Courts' ? '/districts' : t === 'Practice Areas' ? '/cases' : '/analytics'}
            style={{
              height: 39,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text3, #78766C)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease',
            }}
          >
            {t}
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
            color: 'var(--text3, #78766C)',
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
                color: 'var(--text2, #42403C)',
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
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text3, #78766C)',
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
                        background: 'var(--card, #FFFFFF)',
                        border: '1px solid var(--bdr, #E2DFD8)',
                        borderRadius: 2,
                        fontSize: 12,
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--text4, #A8A6A0)',
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

              {/* Run button row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <button
                  type="button"
                  style={{
                    height: 32,
                    padding: '0 20px',
                    background: 'var(--chrome-bg, #1B2D45)',
                    color: 'var(--card, #FFFFFF)',
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                >
                  Run Precision Search
                </button>
                <button
                  type="button"
                  style={{
                    height: 32,
                    padding: '0 14px',
                    background: 'transparent',
                    color: 'var(--link, #0A50A2)',
                    fontSize: 11,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    border: '1px solid var(--link, #0A50A2)',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                >
                  Save Search
                </button>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text3, #78766C)',
                  }}
                >
                  Matching <strong style={{ color: 'var(--text1)' }}>5,147,392</strong> cases
                </span>
              </div>
            </div>

            {/* Recent Precision Searches */}
            <div style={{ marginTop: 4 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    color: 'var(--text1, #18181A)',
                    margin: 0,
                  }}
                >
                  Recent Precision Searches
                </h3>
                <Link
                  href="/dashboard"
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--link, #0A50A2)',
                    textDecoration: 'none',
                  }}
                >
                  View Research Path →
                </Link>
              </div>

              {RECENT_SEARCHES.map((search, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 0',
                    borderBottom: i < RECENT_SEARCHES.length - 1 ? '1px solid var(--bdr, #E2DFD8)' : 'none',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--link, #0A50A2)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: 11,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--link, #0A50A2)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {search.terms}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text3, #78766C)',
                      flexShrink: 0,
                    }}
                  >
                    {search.count} results
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text4, #A8A6A0)',
                      flexShrink: 0,
                    }}
                  >
                    {search.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar (282px) */}
          <div style={{ width: 282, flexShrink: 0 }}>
            {/* My Alerts panel */}
            <div
              style={{
                background: 'var(--sidebar2, #F4F3EF)',
                border: '1px solid var(--bdr, #E2DFD8)',
                borderRadius: 2,
                padding: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text3, #78766C)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                MY ALERTS
              </div>
              {[
                'Employment cases, SDNY',
                'Patent filings, CACD',
                'Civil rights, all districts',
              ].map((alert, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--link, #0A50A2)',
                    lineHeight: 2,
                    cursor: 'pointer',
                  }}
                >
                  {alert}
                </div>
              ))}
              <Link
                href="/dashboard"
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text3, #78766C)',
                  textDecoration: 'none',
                  marginTop: 4,
                  display: 'block',
                }}
              >
                Manage alerts →
              </Link>
            </div>

            {/* Research Organizer */}
            <div style={{ marginBottom: 10 }}>
              <ResearchOrganizer />
            </div>

            {/* Platform Statistics */}
            <div
              style={{
                background: 'var(--sidebar2, #F4F3EF)',
                border: '1px solid var(--bdr, #E2DFD8)',
                borderRadius: 2,
                padding: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text3, #78766C)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                PLATFORM STATISTICS
              </div>
              {PLATFORM_STATS.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 0',
                    borderBottom: '1px solid var(--bdr, #E2DFD8)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text3, #78766C)',
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text1, #18181A)',
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
                fontSize: 14,
                color: 'var(--text1, #18181A)',
                margin: 0,
              }}
            >
              Browse All Content
            </h2>
            <Link
              href="/cases"
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-ui)',
                color: 'var(--link, #0A50A2)',
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
                  background: 'var(--card, #FFFFFF)',
                  border: '1px solid var(--bdr, #E2DFD8)',
                  borderRadius: 2,
                  borderTop: '3px solid var(--bdr, #E2DFD8)',
                  padding: '12px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-legal)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--chrome-bg, #1B2D45)',
                    margin: '0 0 4px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text3, #78766C)',
                    lineHeight: 1.5,
                    margin: '0 0 8px',
                  }}
                >
                  {card.description}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
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

      {/* ═══ DISCLAIMER ═══ */}
      <div
        style={{
          padding: '12px 24px',
          borderTop: '1px solid var(--bdr, #E2DFD8)',
          background: 'var(--card, #FFFFFF)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text3, #78766C)',
            margin: 0,
          }}
        >
          Federal court data sourced from FJC IDB, CourtListener, RECAP, and PACER. For
          informational purposes only · Not legal advice.
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
          color: var(--link, #0A50A2) !important;
          font-weight: 600;
          border-bottom-color: var(--link, #0A50A2) !important;
        }
        #tab-records:checked ~ div .hp-tab-generic {
          color: var(--text1, #18181A) !important;
          font-weight: 600;
          border-bottom-color: var(--link, #0A50A2) !important;
        }
        /* Reset precision active when records is checked */
        #tab-records:checked ~ div .hp-tab-precision {
          color: var(--text3, #78766C) !important;
          font-weight: 400;
          border-bottom-color: transparent !important;
        }

        /* Tab hover */
        .hp-tab-label:hover { color: var(--text1, #18181A) !important; }

        /* Browse cards hover */
        .hp-browse-card:hover {
          border-top-color: var(--gold, #C4882A) !important;
          box-shadow: var(--shadow-sm) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hp-card-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .hp-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
