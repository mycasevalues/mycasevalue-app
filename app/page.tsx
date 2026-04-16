/**
 * MyCaseValue Homepage — Bloomberg Law design system.
 *
 * Structure:
 * 1. Search context bar (secondary, below ticker)
 * 2. 3×2 Category card grid — top case type categories
 * 3. Coverage stats row
 * 4. "Recently Updated" flat data table
 * 5. Data sources bar
 * 6. CTA strip
 * 7. Disclaimer
 *
 * No hero banner. Data-forward, light mode, institutional feel.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';
import { SearchHero } from '@/components/SearchHero';

export const metadata: Metadata = {
  title: 'MyCaseValue — Federal Court Intelligence Platform',
  description:
    'Institutional-grade litigation intelligence from public federal court records. Case outcomes, judge analytics, venue analysis, and settlement data across all 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue',
      },
    ],
    description:
      'Litigation intelligence from public federal court records.',
    url: SITE_URL,
  },
};

/* ── Static data for the category cards ── */

const CATEGORIES = [
  {
    title: 'Employment & Workplace',
    count: '1.3M+ cases',
    winRate: '50%',
    href: '/cases/employment-workplace',
    description: 'Discrimination, wrongful termination, FLSA, and more',
  },
  {
    title: 'Personal Injury',
    count: '1.5M+ cases',
    winRate: '48%',
    href: '/cases/personal-injury',
    description: 'Motor vehicle, medical malpractice, products liability',
  },
  {
    title: 'Civil Rights',
    count: '1.2M+ cases',
    winRate: '37%',
    href: '/cases/civil-rights',
    description: 'Section 1983, voting rights, ADA, housing discrimination',
  },
  {
    title: 'Consumer Protection',
    count: '2.1M+ cases',
    winRate: '45%',
    href: '/cases/consumer-protection',
    description: 'TCPA, FDCPA, fraud, deceptive practices',
  },
  {
    title: 'Business Disputes',
    count: '890K+ cases',
    winRate: '52%',
    href: '/cases/business-disputes',
    description: 'Contract, fraud, trade secrets, partnership disputes',
  },
  {
    title: 'Intellectual Property',
    count: '680K+ cases',
    winRate: '46%',
    href: '/cases/intellectual-property',
    description: 'Patent, trademark, copyright, trade dress',
  },
];

/* ── Recently Updated data ── */

const RECENT_UPDATES = [
  {
    district: 'S.D.N.Y.',
    caseType: 'Securities Fraud',
    metric: 'Median award updated',
    value: '$142,500',
    date: 'Apr 2026',
    href: '/districts/nysd',
  },
  {
    district: 'C.D. Cal.',
    caseType: 'Employment',
    metric: 'Win rate revised',
    value: '47.2%',
    date: 'Apr 2026',
    href: '/districts/cacd',
  },
  {
    district: 'N.D. Ill.',
    caseType: 'Civil Rights',
    metric: 'Settlement range updated',
    value: '$18,000–$95,000',
    date: 'Apr 2026',
    href: '/districts/ilnd',
  },
  {
    district: 'D.N.J.',
    caseType: 'Consumer Protection',
    metric: 'Case volume updated',
    value: '3,241 cases',
    date: 'Mar 2026',
    href: '/districts/njd',
  },
  {
    district: 'E.D. Pa.',
    caseType: 'Personal Injury',
    metric: 'Disposition time updated',
    value: '12.8 months',
    date: 'Mar 2026',
    href: '/districts/paed',
  },
];

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'var(--font-inter)', background: '#FFFFFF' }}>

      {/* ── 1. SEARCH CONTEXT BAR ── */}
      <section
        style={{
          background: '#F7F7F5',
          borderBottom: '1px solid #E0E0E0',
          padding: '20px 0',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                fontFamily: 'var(--font-jakarta, var(--font-inter))',
                color: '#1A1A1A',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Federal Court Intelligence
            </h1>
            <span
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#15803D',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '2px 6px',
                background: 'rgba(21,128,61,0.08)',
                borderRadius: 2,
              }}
            >
              Live
            </span>
          </div>
          <div style={{ maxWidth: 640 }}>
            <SearchHero variant="light" />
          </div>
        </div>
      </section>

      {/* ── 2. COVERAGE STATS ROW ── */}
      <section
        style={{
          borderBottom: '1px solid #E8E8E8',
          padding: '16px 0',
          background: '#FFFFFF',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px 48px',
            alignItems: 'baseline',
          }}
        >
          {[
            { value: SITE_METRICS.totalCases, label: 'Federal Cases' },
            { value: String(SITE_METRICS.districtCourts), label: 'District Courts' },
            { value: String(SITE_METRICS.caseTypes), label: 'Case Types' },
            { value: '7', label: 'Public Data Sources' },
            { value: SITE_METRICS.yearsOfData, label: 'Years of Data' },
          ].map((m) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#888888',
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. CATEGORY CARD GRID (3×2) ── */}
      <section style={{ padding: '32px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          {/* Section label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#444444',
              }}
            >
              Browse by Case Type
            </span>
            <Link
              href="/cases"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#0052CC',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              View all {SITE_METRICS.caseTypes} types
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </Link>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 12,
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                style={{
                  display: 'block',
                  padding: '16px 18px',
                  background: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: 4,
                  textDecoration: 'none',
                  transition: 'border-color 120ms, box-shadow 120ms',
                }}
                className="homepage-card"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1A1A1A',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: '#666666',
                    margin: '0 0 10px 0',
                    lineHeight: 1.4,
                  }}
                >
                  {cat.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingTop: 10,
                    borderTop: '1px solid #F0F0F0',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {cat.count}
                  </span>
                  <span style={{ color: '#E0E0E0', fontSize: 10 }}>|</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: '#15803D',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {cat.winRate} win rate
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. RECENTLY UPDATED TABLE ── */}
      <section
        style={{
          padding: '32px 0',
          background: '#F7F7F5',
          borderTop: '1px solid #E0E0E0',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#444444',
              }}
            >
              Recently Updated
            </span>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: '#888888',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              Last sync: April 2026
            </span>
          </div>

          {/* Table */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 1fr 120px 80px',
                gap: 0,
                padding: '8px 16px',
                background: '#F5F5F5',
                borderBottom: '1px solid #E8E8E8',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#666666',
              }}
            >
              <span>District</span>
              <span>Case Type</span>
              <span>Update</span>
              <span style={{ textAlign: 'right' }}>Value</span>
              <span style={{ textAlign: 'right' }}>Date</span>
            </div>

            {/* Table rows */}
            {RECENT_UPDATES.map((row, i) => (
              <Link
                key={i}
                href={row.href}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 1fr 120px 80px',
                  gap: 0,
                  padding: '10px 16px',
                  borderBottom: i < RECENT_UPDATES.length - 1 ? '1px solid #F0F0F0' : 'none',
                  textDecoration: 'none',
                  fontSize: 13,
                  color: '#1A1A1A',
                  transition: 'background 80ms',
                }}
                className="homepage-table-row"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 12,
                    color: '#E65C00',
                  }}
                >
                  {row.district}
                </span>
                <span style={{ color: '#1A1A1A', fontSize: 13 }}>{row.caseType}</span>
                <span style={{ color: '#666666', fontSize: 12 }}>{row.metric}</span>
                <span
                  style={{
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    fontSize: 12,
                    color: '#1A1A1A',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.value}
                </span>
                <span
                  style={{
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: '#888888',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CAPABILITIES (4 card row) ── */}
      <section style={{ padding: '32px 0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#444444',
              marginBottom: 16,
            }}
          >
            Intelligence Suite
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            {[
              {
                title: 'Case Outcomes',
                desc: 'Win rates, settlement ranges, and disposition analytics across 84 case types.',
                href: '/cases',
                meta: '84 case types',
              },
              {
                title: 'Judge Intelligence',
                desc: 'Ruling patterns, case duration, and outcome tendencies for federal judges.',
                href: '/judges',
                meta: '3,400+ judges',
              },
              {
                title: 'Venue Analysis',
                desc: 'Compare districts by performance, timelines, and historical outcomes.',
                href: '/districts',
                meta: '94 districts',
              },
              {
                title: 'Document Search',
                desc: 'Full-text search across opinions, regulations, and filings from 7 sources.',
                href: '/case-search',
                meta: '7 data sources',
              },
            ].map((cap) => (
              <Link
                key={cap.title}
                href={cap.href}
                style={{
                  display: 'block',
                  padding: '16px 18px',
                  background: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: 4,
                  textDecoration: 'none',
                  transition: 'border-color 120ms, box-shadow 120ms',
                }}
                className="homepage-card"
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#1A1A1A',
                    margin: '0 0 6px 0',
                  }}
                >
                  {cap.title}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: '#666666',
                    margin: '0 0 10px 0',
                    lineHeight: 1.5,
                  }}
                >
                  {cap.desc}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    borderTop: '1px solid #F0F0F0',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: '#888888',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {cap.meta}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: '#0052CC',
                      fontWeight: 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    View
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DATA SOURCES BAR ── */}
      <section
        style={{
          background: '#F7F7F5',
          borderTop: '1px solid #E0E0E0',
          borderBottom: '1px solid #E0E0E0',
          padding: '20px 0',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 24,
            }}
          >
            <div style={{ width: 160, flexShrink: 0 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#444444',
                }}
              >
                Data Sources
              </span>
              <p style={{ fontSize: 11, color: '#888888', marginTop: 4, lineHeight: 1.4 }}>
                All data from official federal court and agency records.
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '8px 24px',
              }}
            >
              {SITE_METRICS.dataSources.map((src) => (
                <div
                  key={src.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '4px 0 4px 10px',
                    borderLeft: '2px solid #E0E0E0',
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#1A1A1A' }}>
                    {src.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#888888',
                      marginTop: 1,
                    }}
                  >
                    {src.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA STRIP ── */}
      <section style={{ background: '#1A1A1A', padding: '24px 0' }}>
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 4px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Research federal litigation like institutions do.
            </h2>
            <p
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              Free during beta &middot; No account required &middot; Sub-second search
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <Link
              href="/case-search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 36,
                padding: '0 18px',
                background: '#E65C00',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 3,
                textDecoration: 'none',
                transition: 'background 120ms',
              }}
            >
              Start Searching
            </Link>
            <Link
              href="/cases"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 36,
                padding: '0 18px',
                background: 'transparent',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                transition: 'border-color 120ms',
              }}
            >
              Browse Cases
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. DISCLAIMER ── */}
      <div
        style={{
          padding: '10px 24px',
          borderTop: '1px solid #E8E8E8',
          background: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: '#888888',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Sourced from public federal court records. For informational purposes only &middot; Not legal advice.
        </p>
      </div>

      {/* Hover styles for cards and table rows */}
      <style>{`
        .homepage-card:hover {
          border-color: #0052CC !important;
          box-shadow: 0 2px 8px rgba(0,82,204,0.08) !important;
        }
        .homepage-table-row:hover {
          background: #EFF5FF !important;
        }
        @media (max-width: 640px) {
          .homepage-table-row {
            grid-template-columns: 80px 1fr 100px !important;
          }
          .homepage-table-row > span:nth-child(3),
          .homepage-table-row > span:nth-child(5) {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
