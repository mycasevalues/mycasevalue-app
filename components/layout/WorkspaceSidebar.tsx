'use client';

/**
 * WorkspaceSidebar — Westlaw Precision content-type panel
 *
 * Two modes:
 * 1. RESULTS mode (/cases, /judges, /districts, /attorney):
 *    "Search within results" → Content Types → Filter sections (Outcome, Judge, Date, Motion)
 * 2. TOC mode (/districts/[code], /judges/[id]):
 *    Navigational table of contents with gold active accent
 *
 * Specs:
 * - Width: 258px (results pages), 202px (detail pages)
 * - Background: var(--sidebar) = #F9F8F6
 * - Border-right: 1px solid var(--bdr) = #E2DFD8
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ── Search icon (10px, used in search-within button) ── */

function MiniSearchIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── Content type definitions ── */

interface ContentType {
  label: string;
  href: string;
  count: number;
}

const CONTENT_TYPES: ContentType[] = [
  { label: 'Court Cases', href: '/cases', count: 5100000 },
  { label: 'Judge Profiles', href: '/judges', count: 3400 },
  { label: 'District Analytics', href: '/districts', count: 94 },
  { label: 'Settlement Records', href: '/cases', count: 890000 },
  { label: 'Attorney Records', href: '/attorney', count: 42000 },
  { label: 'Secondary Sources', href: '/methodology', count: 14 },
];

/* ── Filter section definitions ── */

interface FilterOption {
  label: string;
  count: number;
}

interface FilterSection {
  title: string;
  defaultOpen: boolean;
  options: FilterOption[];
}

const FILTER_SECTIONS: FilterSection[] = [
  {
    title: 'Outcome',
    defaultOpen: true,
    options: [
      { label: 'Active / Pending', count: 1240000 },
      { label: 'Settled', count: 890000 },
      { label: 'Plaintiff judgment', count: 420000 },
      { label: 'Defendant judgment', count: 680000 },
      { label: 'Dismissed', count: 1870000 },
    ],
  },
  {
    title: 'Judge',
    defaultOpen: false,
    options: [
      { label: 'Hon. Jed S. Rakoff', count: 4200 },
      { label: 'Hon. Vince Chhabria', count: 3800 },
      { label: 'Hon. William Alsup', count: 3600 },
      { label: 'Hon. Jesse M. Furman', count: 3100 },
      { label: 'Hon. Ronnie Abrams', count: 2900 },
    ],
  },
  {
    title: 'Date Filed',
    defaultOpen: false,
    options: [
      { label: '2026', count: 78000 },
      { label: '2025', count: 312000 },
      { label: '2024', count: 298000 },
      { label: '2023', count: 285000 },
      { label: '2022', count: 271000 },
    ],
  },
  {
    title: 'Motion Type',
    defaultOpen: false,
    options: [
      { label: 'MTD 12(b)(6)', count: 420000 },
      { label: 'Summary judgment', count: 380000 },
      { label: 'Class certification', count: 85000 },
    ],
  },
];

/* ── TOC definitions for detail pages ── */

interface TocItem {
  label: string;
  id: string;
  indent?: boolean;
}

const DISTRICT_TOC: TocItem[] = [
  { label: 'Overview', id: 'overview' },
  { label: 'Judges', id: 'judges' },
  { label: 'Case Analytics', id: 'case-analytics' },
  { label: 'Case Type Distribution', id: 'case-type-dist', indent: true },
  { label: 'Settlement Data', id: 'settlement-data' },
  { label: 'Attorneys', id: 'attorneys' },
  { label: 'Court Information', id: 'court-info' },
];

const JUDGE_TOC: TocItem[] = [
  { label: 'Intelligence Summary', id: 'intelligence-summary' },
  { label: 'Judicial Profile', id: 'judicial-profile' },
  { label: 'Career & Appointments', id: 'career', indent: true },
  { label: 'Education & Clerkships', id: 'education', indent: true },
  { label: 'Case Analytics', id: 'case-analytics' },
  { label: 'By Case Type', id: 'by-case-type', indent: true },
  { label: 'Disposition Breakdown', id: 'disposition', indent: true },
  { label: 'Settlement Data', id: 'settlement-data' },
  { label: 'Case History', id: 'case-history' },
  { label: 'CaseCite™', id: 'casecite' },
];

/* ── Format large numbers ── */

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

/* ── Checkbox component ── */

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 24,
        gap: 8,
        cursor: 'pointer',
        fontSize: 12,
        fontFamily: 'var(--font-sans, var(--font-ui))',
        color: 'var(--text2)',
      }}
      onMouseEnter={(e) => {
        const span = e.currentTarget.querySelector('.filter-label') as HTMLElement;
        if (span) span.style.color = 'var(--link)';
      }}
      onMouseLeave={(e) => {
        const span = e.currentTarget.querySelector('.filter-label') as HTMLElement;
        if (span) span.style.color = 'var(--text2)';
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 13,
          height: 13,
          border: `1px solid ${checked ? 'var(--link)' : 'var(--bdr-strong)'}`,
          borderRadius: 2,
          background: checked ? 'var(--link)' : 'var(--card, #FFFFFF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 100ms ease, border-color 100ms ease',
        }}
        onClick={(e) => { e.preventDefault(); onChange(); }}
      >
        {checked && (
          <span style={{ color: 'var(--card, #FFFFFF)', fontSize: 9, fontWeight: 700, lineHeight: 1 }}>✓</span>
        )}
      </div>
      <span className="filter-label" style={{ flex: 1, transition: 'color 100ms ease' }}>{label}</span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text3)',
      }}>
        {formatCount(count)}
      </span>
    </label>
  );
}

/* ── Filter section group ── */

function FilterSectionGroup({ section }: { section: FilterSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div style={{ borderBottom: '1px solid var(--bdr)' }}>
      {/* Section header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 36,
          padding: '0 14px',
          fontSize: 12,
          fontFamily: 'var(--font-sans, var(--font-ui))',
          fontWeight: 600,
          color: 'var(--text1)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span>{section.title}</span>
        <span style={{ fontSize: 10, color: 'var(--text3)' }}>{isOpen ? '▴' : '▾'}</span>
      </button>

      {/* Section body */}
      {isOpen && (
        <div style={{ padding: '4px 16px 8px' }}>
          {section.options.map((opt) => (
            <FilterCheckbox
              key={opt.label}
              label={opt.label}
              count={opt.count}
              checked={checked.has(opt.label)}
              onChange={() => toggle(opt.label)}
            />
          ))}
          {section.title === 'Judge' && (
            <div style={{
              fontSize: 11,
              color: 'var(--link)',
              cursor: 'pointer',
              marginTop: 4,
              fontFamily: 'var(--font-sans, var(--font-ui))',
            }}>
              + 3,395 more
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Determine sidebar mode from pathname ── */

type SidebarMode = 'results' | 'toc-district' | 'toc-judge';

function getSidebarMode(pathname: string): SidebarMode {
  if (/^\/districts\/[A-Za-z]+/.test(pathname)) return 'toc-district';
  if (/^\/judges\/[^/]+$/.test(pathname) && pathname !== '/judges') return 'toc-judge';
  return 'results';
}

/* ── Main Sidebar ── */

export default function WorkspaceSidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const mode = useMemo(() => getSidebarMode(pathname), [pathname]);
  const [activeTocId, setActiveTocId] = useState('overview');
  const isDetailPage = mode !== 'results';
  const sidebarWidth = isDetailPage ? 202 : 258;

  /* Determine which content type is active */
  const activeContentType = useMemo(() => {
    if (pathname.startsWith('/cases')) return 'Court Cases';
    if (pathname.startsWith('/judges')) return 'Judge Profiles';
    if (pathname.startsWith('/districts')) return 'District Analytics';
    if (pathname.startsWith('/attorney')) return 'Attorney Records';
    return 'Court Cases';
  }, [pathname]);

  /* Results page check for "Search within results" */
  const isResultsPage = ['/cases', '/judges', '/districts', '/attorney'].some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  ) && mode === 'results';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          transition-transform duration-200
          lg:relative lg:translate-x-0 lg:z-auto lg:h-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          flexShrink: 0,
          background: 'var(--sidebar)',
          borderRight: '1px solid var(--bdr)',
        }}
        role="navigation"
        aria-label="Workspace navigation"
      >
        <div
          className="flex flex-col h-full lg:h-[calc(100vh-94px)] lg:sticky lg:top-[94px] overflow-hidden"
        >
          {/* Mobile: Close button header */}
          <div
            className="flex items-center justify-between px-4 flex-shrink-0 lg:hidden"
            style={{
              height: 54,
              borderBottom: '1px solid var(--bdr)',
              background: 'var(--sidebar)',
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-baskerville, var(--font-legal))',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--text1)',
                textDecoration: 'none',
              }}
            >
              MyCaseValue
            </Link>
            <button
              onClick={onToggle}
              style={{
                padding: 6,
                color: 'var(--text2)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── RESULTS MODE ── */}
          {mode === 'results' && (
            <div className="flex-1 overflow-y-auto">
              {/* Search Within Results */}
              {isResultsPage && (
                <div style={{
                  padding: '8px 12px 8px',
                  borderBottom: '1px solid var(--bdr)',
                }}>
                  <div style={{
                    display: 'flex',
                    height: 28,
                    border: '1px solid var(--bdr-strong)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: 'var(--card, #FFFFFF)',
                  }}>
                    <input
                      type="text"
                      placeholder="Search within results..."
                      style={{
                        flex: 1,
                        border: 'none',
                        padding: '0 8px',
                        fontSize: 11,
                        fontFamily: 'var(--font-sans, var(--font-ui))',
                        color: 'var(--text2)',
                        outline: 'none',
                        background: 'transparent',
                      }}
                    />
                    <button
                      style={{
                        width: 30,
                        background: 'var(--link)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--card, #FFFFFF)',
                        flexShrink: 0,
                      }}
                      aria-label="Search within results"
                    >
                      <MiniSearchIcon />
                    </button>
                  </div>
                </div>
              )}

              {/* Content Types Header */}
              <div style={{
                height: 40,
                background: 'var(--tbl-hdr)',
                borderBottom: '1px solid var(--bdr)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
              }}>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: 'var(--text2)',
                }}>
                  Content Types
                </span>
                <span style={{
                  fontSize: 11,
                  color: 'var(--link)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                }}>
                  Clear all
                </span>
              </div>

              {/* Content Type List */}
              <div style={{ padding: '4px 7px', borderBottom: '1px solid var(--bdr)' }}>
                {CONTENT_TYPES.map((ct) => {
                  const isActive = ct.label === activeContentType;
                  return (
                    <Link
                      key={ct.label}
                      href={ct.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 31,
                        padding: isActive ? '0 7px 0 4px' : '0 7px',
                        borderRadius: 2,
                        cursor: 'pointer',
                        marginBottom: 1,
                        textDecoration: 'none',
                        background: isActive ? 'var(--link-light)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--link)' : '3px solid transparent',
                        transition: 'background 100ms ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(10,80,162,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span style={{
                        flex: 1,
                        fontSize: 12,
                        fontFamily: 'var(--font-sans, var(--font-ui))',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--text1)' : 'var(--link)',
                      }}>
                        {ct.label}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--text3)',
                      }}>
                        {formatCount(ct.count)}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Filter Sections */}
              {FILTER_SECTIONS.map((section) => (
                <FilterSectionGroup key={section.title} section={section} />
              ))}
            </div>
          )}

          {/* ── TOC MODE (detail pages) ── */}
          {mode !== 'results' && (
            <div className="flex-1 overflow-y-auto">
              {/* TOC Header */}
              <div style={{
                height: 40,
                background: 'var(--tbl-hdr)',
                borderBottom: '1px solid var(--bdr)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
              }}>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: 'var(--text2)',
                }}>
                  Page Contents
                </span>
                <span style={{
                  fontSize: 11,
                  color: 'var(--link)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                }}>
                  Print
                </span>
              </div>

              {/* TOC Items */}
              <div style={{ padding: '6px 0' }}>
                {(mode === 'toc-district' ? DISTRICT_TOC : JUDGE_TOC).map((item) => {
                  const isActive = activeTocId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTocId(item.id);
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: item.indent ? 28 : 32,
                        padding: item.indent ? '0 14px 0 24px' : '0 14px',
                        fontSize: item.indent ? 11 : 12,
                        fontFamily: item.indent
                          ? 'var(--font-sans, var(--font-ui))'
                          : 'var(--font-baskerville, var(--font-legal))',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--text1)' : (item.indent ? 'var(--text2)' : 'var(--link)'),
                        background: isActive ? 'var(--link-light)' : 'transparent',
                        borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                        border: 'none',
                        borderRight: 'none',
                        borderTop: 'none',
                        borderBottom: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 100ms ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(10,80,162,0.06)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Sticky Bottom ── */}
          <div
            className="flex-shrink-0"
            style={{
              position: 'sticky',
              bottom: 0,
              background: 'var(--sidebar)',
              borderTop: '1px solid var(--bdr)',
              padding: 'var(--space-3) var(--space-4)',
            }}
          >
            <Link
              href="/methodology"
              style={{
                display: 'block',
                fontSize: 12,
                fontFamily: 'var(--font-sans, var(--font-ui))',
                color: 'var(--text3)',
                textDecoration: 'none',
                padding: '3px 0',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--link)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text3)'; }}
            >
              Help &amp; Support
            </Link>
            <Link
              href="/glossary"
              style={{
                display: 'block',
                fontSize: 12,
                fontFamily: 'var(--font-sans, var(--font-ui))',
                color: 'var(--text3)',
                textDecoration: 'none',
                padding: '3px 0',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--link)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text3)'; }}
            >
              Documentation
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
