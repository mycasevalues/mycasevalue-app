/**
 * MyCaseValue Homepage — Enterprise-grade intelligence hub.
 *
 * Structure:
 * 1. ContextBar (full-width)
 * 2. Hero section (centered, search-forward)
 * 3. Browse All Content (6-card grid)
 * 4. Recently Updated (DataTable — 10 rows)
 * 5. What's Happening strip (3-col)
 * 6. Footer (handled by layout)
 *
 * No sidebar. Full-width. The data IS the design.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';

export const metadata: Metadata = {
  title: 'MyCaseValue — Federal Court Intelligence Platform',
  description:
    'Institutional-grade litigation intelligence from public federal court records. Case outcomes, judge analytics, venue analysis, and settlement data across all 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue' }],
    description: 'Litigation intelligence from public federal court records.',
    url: SITE_URL,
  },
};

/* ── Static data ── */

const BROWSE_CARDS = [
  {
    icon: 'scales',
    title: 'Federal Districts',
    description: '94 districts, 12 circuits. Filter by case load, judge roster, and case type distribution.',
    stat: '94 districts',
    href: '/districts',
  },
  {
    icon: 'person',
    title: 'Judges',
    description: 'Judicial analytics for every active and senior federal judge. Win rates, median durations, case history.',
    stat: '3,400+ judges',
    href: '/judges',
  },
  {
    icon: 'chart',
    title: 'Case Analytics',
    description: 'Disposition breakdowns, win rates, and timeline data across all case types and jurisdictions.',
    stat: `${SITE_METRICS.totalCases} cases`,
    href: '/cases',
  },
  {
    icon: 'currency',
    title: 'Settlement Ranges',
    description: 'Median and mean settlement data by case type, district, and year. Updated weekly from public records.',
    stat: 'Updated weekly',
    href: '/outcomes',
  },
  {
    icon: 'briefcase',
    title: 'Attorneys',
    description: 'Performance analytics for attorneys appearing in federal court. Track opposing counsel, firm patterns, win rates.',
    stat: '120,000+ attorneys',
    href: '/attorney',
  },
  {
    icon: 'filter',
    title: 'Practice Areas',
    description: 'Navigate by claim type, statute, and outcome. 14 categories covering the full federal civil docket.',
    stat: '14 categories',
    href: '/cases',
  },
];

const RECENT_CASES = [
  { id: '1:24-cv-08912', district: 'S.D.N.Y.', type: 'Securities Fraud', filed: 'Apr 14, 2026', status: 'Active', href: '/districts/SDNY' },
  { id: '2:24-cv-04221', district: 'C.D. Cal.', type: 'Employment', filed: 'Apr 13, 2026', status: 'Active', href: '/districts/CACD' },
  { id: '1:24-cv-01893', district: 'N.D. Ill.', type: 'Civil Rights', filed: 'Apr 12, 2026', status: 'Active', href: '/districts/NDIL' },
  { id: '3:24-cv-00741', district: 'D.N.J.', type: 'Consumer Protection', filed: 'Apr 11, 2026', status: 'Pending', href: '/districts/NJDN' },
  { id: '2:24-cv-03102', district: 'E.D. Pa.', type: 'Personal Injury', filed: 'Apr 10, 2026', status: 'Active', href: '/districts/EDPA' },
  { id: '1:24-cv-06221', district: 'S.D. Fla.', type: 'Insurance', filed: 'Apr 9, 2026', status: 'Closed', href: '/districts/SDFL' },
  { id: '4:24-cv-00892', district: 'S.D. Tex.', type: 'Patent', filed: 'Apr 8, 2026', status: 'Active', href: '/districts/SDTX' },
  { id: '1:24-cv-02341', district: 'D. Mass.', type: 'Contract', filed: 'Apr 7, 2026', status: 'Active', href: '/districts/MAD' },
  { id: '3:24-cv-01120', district: 'N.D. Cal.', type: 'Antitrust', filed: 'Apr 6, 2026', status: 'Pending', href: '/districts/CAND' },
  { id: '1:24-cv-04501', district: 'D.D.C.', type: 'Administrative', filed: 'Apr 5, 2026', status: 'Active', href: '/districts/DCD' },
];

const WHATS_HAPPENING = {
  districts: [
    { label: 'S.D.N.Y. — 1,204 new filings', href: '/districts/SDNY' },
    { label: 'C.D. Cal. — 987 new filings', href: '/districts/CACD' },
    { label: 'N.D. Ill. — 743 new filings', href: '/districts/NDIL' },
  ],
  caseTypes: [
    { label: 'Employment — up 12% this quarter', href: '/cases/employment-workplace' },
    { label: 'Consumer Protection — up 8%', href: '/cases/consumer-protection' },
    { label: 'Civil Rights — steady volume', href: '/cases/civil-rights' },
  ],
  judges: [
    { label: 'Hon. Jesse M. Furman — 142 cases', href: '/judges' },
    { label: 'Hon. Otis D. Wright II — 128 cases', href: '/judges' },
    { label: 'Hon. Matthew F. Kennelly — 119 cases', href: '/judges' },
  ],
};

/* ── SVG Icons ── */
function CardIcon({ type }: { type: string }) {
  const s = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--link)', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'scales': return <svg {...s}><path d="M12 3v18M3 7l9-4 9 4M3 7v4l9 4 9-4V7" /></svg>;
    case 'person': return <svg {...s}><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0113 0" /></svg>;
    case 'chart': return <svg {...s}><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg>;
    case 'currency': return <svg {...s}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" /></svg>;
    case 'briefcase': return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>;
    case 'filter': return <svg {...s}><path d="M3 4h18l-7 8v6l-4 2V12L3 4z" /></svg>;
    default: return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === 'Active' ? 'badge-active' : status === 'Pending' ? 'badge-pending' : 'badge-closed';
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── CONTEXT BAR ── */}
      <section
        style={{
          height: 40,
          background: 'var(--surface-secondary)',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-6)',
        }}
      >
        <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-tertiary)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>5,100,000+</span> federal cases · <span style={{ fontFamily: 'var(--font-mono)' }}>94</span> districts · Updated daily
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['All Circuits', 'All Case Types', 'All Years'].map((pill) => (
            <span
              key={pill}
              style={{
                height: 24, padding: '0 10px',
                background: 'var(--surface-primary)',
                border: '1px solid var(--surface-border-strong)',
                borderRadius: 'var(--radius-sm)',
                font: 'var(--type-label-sm)',
                color: 'var(--text-secondary)',
                display: 'inline-flex', alignItems: 'center',
                letterSpacing: '0.07em', textTransform: 'uppercase',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* ── HERO ── */}
      <section style={{ background: 'var(--surface-primary)', paddingBottom: 'var(--space-12)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: 'var(--space-16) var(--space-8) 0' }}>
          {/* Eyebrow */}
          <p style={{
            font: 'var(--type-label-sm)', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)',
          }}>
            Federal Court Intelligence Platform
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, lineHeight: 1.1,
            color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0,
          }}>
            The Federal Court Record.
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 42, lineHeight: 1.1,
            color: 'var(--accent)', letterSpacing: '-0.03em', margin: '0 0 var(--space-4)',
          }}>
            Open to Everyone.
          </p>

          {/* Body */}
          <p style={{
            font: 'var(--type-body-lg)', color: 'var(--text-secondary)', lineHeight: 1.65,
            maxWidth: 520, margin: '0 auto',
          }}>
            5.1 million federal cases across 94 districts. Win rates, settlement ranges, judge analytics, and case timelines — for every litigant, every attorney, every researcher.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Link href="/case-search" className="btn-primary" style={{ fontSize: 14 }}>
              Search All Cases
            </Link>
            <Link href="/districts" className="btn-secondary" style={{ fontSize: 14 }}>
              Browse Districts →
            </Link>
          </div>

          {/* Stats ticker */}
          <div style={{ marginTop: 'var(--space-8)' }}>
            <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', marginBottom: 'var(--space-6)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
              {[
                { value: '5,100,000+', label: 'Cases' },
                { value: '94', label: 'Districts' },
                { value: '3,400+', label: 'Judges' },
                { value: 'Updated', label: 'Daily' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500,
                    color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    font: 'var(--type-label-sm)', letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: 'var(--text-tertiary)', marginTop: 4,
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--surface-border)', marginTop: 'var(--space-6)' }} />
          </div>
        </div>
      </section>

      {/* ── BROWSE ALL CONTENT ── */}
      <section style={{ background: 'var(--surface-primary)', padding: 'var(--space-10) 0' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-8)' }}>
          {/* Heading */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
              color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0,
            }}>
              Browse All Content
            </h2>
            <Link href="/cases" style={{ font: 'var(--type-body-md)', color: 'var(--link)' }}>View all →</Link>
          </div>

          {/* 3-col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {BROWSE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="homepage-card"
                style={{
                  display: 'block', position: 'relative', overflow: 'hidden',
                  background: 'var(--surface-primary)', border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-md)', padding: 'var(--space-5)',
                  textDecoration: 'none', boxShadow: 'var(--shadow-xs)',
                  transition: 'all 150ms ease',
                }}
              >
                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: 3, height: 40,
                  background: 'var(--link)', borderRadius: '0 0 var(--radius-xs) 0',
                }} />

                <CardIcon type={card.icon} />

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
                  color: 'var(--text-primary)', marginTop: 'var(--space-3)',
                  letterSpacing: '-0.01em',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  font: 'var(--type-body-sm)', color: 'var(--text-tertiary)',
                  marginTop: 'var(--space-1)', lineHeight: 1.5,
                }}>
                  {card.description}
                </p>

                {/* Stat row */}
                <div style={{
                  marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)',
                  borderTop: '1px solid var(--surface-border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 13,
                    color: 'var(--link)', fontVariantNumeric: 'tabular-nums',
                  }}>
                    {card.stat}
                  </span>
                  <span className="card-arrow" style={{ color: 'var(--text-tertiary)', transition: 'color 150ms ease' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY UPDATED TABLE ── */}
      <section style={{ background: 'var(--surface-secondary)', padding: 'var(--space-10) 0', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17,
              color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0,
            }}>
              Recently Updated
            </h2>
            <Link href="/cases" style={{ font: 'var(--type-body-md)', color: 'var(--link)' }}>View all →</Link>
          </div>

          {/* DataTable */}
          <div style={{
            background: 'var(--surface-primary)', border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-xs)',
          }}>
            {/* Toolbar */}
            <div style={{
              height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 var(--space-4)', borderBottom: '1px solid var(--table-border)',
            }}>
              <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-tertiary)' }}>
                Showing <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>10</span> most recent updates
              </span>
            </div>

            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '140px 100px 1fr 120px 80px',
              height: 36, background: 'var(--table-header-bg)',
              borderBottom: '2px solid var(--table-border-strong)',
              alignItems: 'center', padding: '0 var(--space-3)',
            }}>
              {['Case ID', 'District', 'Case Type', 'Filed', 'Status'].map((col, i) => (
                <span key={col} style={{
                  font: 'var(--type-label-md)', letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: 'var(--text-tertiary)', whiteSpace: 'nowrap', userSelect: 'none',
                  textAlign: i === 3 ? 'right' : 'left',
                  paddingRight: i === 3 ? 'var(--space-3)' : 0,
                }}>
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            {RECENT_CASES.map((row, i) => (
              <Link
                key={row.id}
                href={row.href}
                className="homepage-table-row"
                style={{
                  display: 'grid', gridTemplateColumns: '140px 100px 1fr 120px 80px',
                  height: 44, alignItems: 'center', padding: '0 var(--space-3)',
                  borderBottom: i < RECENT_CASES.length - 1 ? `1px solid var(--table-border)` : 'none',
                  background: i % 2 === 0 ? 'var(--surface-primary)' : 'var(--table-row-alt)',
                  textDecoration: 'none', transition: 'background 100ms ease',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--link)', fontWeight: 500 }}>{row.id}</span>
                <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-primary)' }}>{row.district}</span>
                <span style={{ font: 'var(--type-body-md)', color: 'var(--text-primary)' }}>{row.type}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right', paddingRight: 'var(--space-3)', fontVariantNumeric: 'tabular-nums' }}>{row.filed}</span>
                <StatusBadge status={row.status} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S HAPPENING STRIP ── */}
      <section style={{ background: 'var(--surface-primary)', padding: 'var(--space-8) 0', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-8)' }}>
          <div style={{
            background: 'var(--surface-secondary)', border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)', padding: 'var(--space-5)',
            display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', gap: 0,
          }}>
            {[
              { heading: 'Most Active Districts', items: WHATS_HAPPENING.districts },
              null,
              { heading: 'Trending Case Types', items: WHATS_HAPPENING.caseTypes },
              null,
              { heading: 'Notable Judges', items: WHATS_HAPPENING.judges },
            ].map((col, i) => {
              if (!col) return <div key={i} style={{ background: 'var(--surface-border)' }} />;
              return (
                <div key={col.heading} style={{ padding: '0 var(--space-6)' }}>
                  <h3 style={{
                    font: 'var(--type-label-sm)', letterSpacing: '0.09em', textTransform: 'uppercase',
                    color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)',
                  }}>
                    {col.heading}
                  </h3>
                  {col.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{
                        display: 'block', height: 28,
                        font: 'var(--type-body-md)', color: 'var(--link)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        lineHeight: '28px', textDecoration: 'none',
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div style={{
        padding: '10px var(--space-6)', borderTop: '1px solid var(--surface-border)',
        background: 'var(--surface-primary)', textAlign: 'center',
      }}>
        <p style={{ fontSize: 10, color: 'var(--text-tertiary)', margin: 0, letterSpacing: '0.02em' }}>
          Federal court data sourced from FJC IDB, CourtListener, RECAP, and PACER. For informational purposes only · Not legal advice.
        </p>
      </div>

      {/* Hover styles */}
      <style>{`
        .homepage-card:hover {
          border-color: var(--link) !important;
          box-shadow: var(--shadow-sm) !important;
          transform: translateY(-1px);
        }
        .homepage-card:hover .card-arrow {
          color: var(--link) !important;
        }
        .homepage-card:active {
          transform: translateY(0);
          box-shadow: var(--shadow-xs) !important;
        }
        .homepage-table-row:hover {
          background: var(--table-row-hover) !important;
        }
        @media (max-width: 768px) {
          .homepage-card { /* handled by grid auto-fill */ }
        }
        @media (max-width: 640px) {
          .homepage-table-row {
            grid-template-columns: 100px 1fr 80px !important;
          }
          .homepage-table-row > span:nth-child(2),
          .homepage-table-row > span:nth-child(4) {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
