'use client';

/**
 * WorkspaceSidebar — Bloomberg Law-style persistent left navigation.
 *
 * Specs:
 * - Width: 220px fixed
 * - Background: #F7F7F5 (warm off-white)
 * - Right border: 1px solid #E0E0E0
 * - Section headers: 11px Inter 600 uppercase, letter-spacing 0.08em, color #444444
 * - Links: 13px Inter 400, color #0052CC, with right-chevron arrow
 * - Active link: 3px left orange border (#E65C00), font-weight 600
 * - Collapsible sections: By Circuit, By State
 * - No search box (search is in the top nav bar)
 * - No icons on links (Bloomberg uses plain text + chevron)
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ── Section / Link types ── */

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

/* ── Navigation Data ── */

const SECTIONS: SidebarSection[] = [
  {
    title: 'Search & Browse',
    links: [
      { label: 'All Cases', href: '/cases' },
      { label: 'Case Search', href: '/case-search' },
      { label: 'Judges', href: '/judges' },
      { label: 'Districts', href: '/districts' },
      { label: 'Legal Documents', href: '/legal/search' },
    ],
  },
  {
    title: 'Federal Districts',
    collapsible: true,
    defaultOpen: false,
    links: [
      { label: 'By Circuit', href: '/districts#circuits' },
      { label: 'S.D.N.Y.', href: '/districts/SDNY' },
      { label: 'C.D. Cal.', href: '/districts/CACD' },
      { label: 'N.D. Ill.', href: '/districts/NDIL' },
      { label: 'S.D. Fla.', href: '/districts/SDFL' },
      { label: 'E.D. Pa.', href: '/districts/EDPA' },
      { label: 'D.N.J.', href: '/districts/NJDN' },
      { label: 'N.D. Cal.', href: '/districts/CAND' },
      { label: 'View All Districts', href: '/districts' },
    ],
  },
  {
    title: 'Analytics',
    links: [
      { label: 'Trends', href: '/trends' },
      { label: 'Compare', href: '/compare' },
      { label: 'Win Rate Map', href: '/map' },
      { label: 'Case Odds', href: '/odds' },
      { label: 'NOS Explorer', href: '/nos-explorer' },
    ],
  },
  {
    title: 'Tools',
    collapsible: true,
    defaultOpen: true,
    links: [
      { label: 'Case Predictor', href: '/attorney/case-predictor' },
      { label: 'Judge Intelligence', href: '/attorney/judge-intelligence' },
      { label: 'Venue Optimizer', href: '/attorney/venue-optimizer' },
      { label: 'Demand Letter', href: '/attorney/demand-letter' },
      { label: 'Calculator', href: '/calculator' },
      { label: 'All Attorney Tools', href: '/attorney' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings', href: '/account' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
];

/* ── Chevron SVG (right arrow) ── */

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/* ── Expand/Collapse chevron (down arrow) ── */

function ExpandChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 150ms ease',
        transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── Single Nav Link ── */

function SidebarNavLink({ link, isActive }: { link: SidebarLink; isActive: boolean }) {
  return (
    <Link
      href={link.href}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px 6px 16px',
        fontSize: 13,
        fontFamily: 'var(--font-inter)',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? '#1A1A1A' : '#0052CC',
        textDecoration: 'none',
        borderLeft: isActive ? '3px solid #E65C00' : '3px solid transparent',
        background: isActive ? '#EEEEEB' : 'transparent',
        transition: 'background 120ms ease, border-color 120ms ease',
        lineHeight: '1.4',
      }}
      className="sidebar-link"
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {link.label}
      </span>
      <Chevron className="flex-shrink-0" />
    </Link>
  );
}

/* ── Section Group ── */

function SidebarSectionGroup({ section }: { section: SidebarSection }) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen !== false);
  const pathname = usePathname();

  return (
    <div style={{ marginBottom: 4 }}>
      {/* Section header */}
      {section.collapsible ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '8px 12px 6px 16px',
            fontSize: 11,
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#444444',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            lineHeight: '1.2',
          }}
        >
          <span>{section.title}</span>
          <ExpandChevron open={isOpen} />
        </button>
      ) : (
        <div
          style={{
            padding: '8px 12px 6px 16px',
            fontSize: 11,
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#444444',
            lineHeight: '1.2',
          }}
        >
          {section.title}
        </div>
      )}

      {/* Links */}
      {isOpen && (
        <div>
          {section.links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <SidebarNavLink key={link.href} link={link} isActive={isActive} />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Main Sidebar ── */

export default function WorkspaceSidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
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

      <style>{`
        .sidebar-link:hover {
          background: #EEEEEB !important;
        }
      `}</style>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          transition-transform duration-200
          lg:relative lg:translate-x-0 lg:z-auto lg:h-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: 220,
          minWidth: 220,
          flexShrink: 0,
          background: '#F7F7F5',
          borderRight: '1px solid #E0E0E0',
        }}
        role="navigation"
        aria-label="Workspace navigation"
      >
        <div
          className="flex flex-col h-full lg:h-[calc(100vh-80px)] lg:sticky lg:top-[80px] overflow-hidden"
        >
          {/* Mobile: Close button header */}
          <div
            className="flex items-center justify-between px-4 flex-shrink-0 lg:hidden"
            style={{
              height: 52,
              borderBottom: '1px solid #E0E0E0',
              background: '#F7F7F5',
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                fontWeight: 700,
                color: '#1A1A1A',
                textDecoration: 'none',
              }}
            >
              MyCaseValue
            </Link>
            <button
              onClick={onToggle}
              style={{
                padding: 6,
                color: '#444444',
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

          {/* Scrollable nav sections */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ paddingTop: 8, paddingBottom: 12 }}
          >
            {SECTIONS.map((section) => (
              <SidebarSectionGroup key={section.title} section={section} />
            ))}
          </div>

          {/* Bottom: Help + Methodology */}
          <div
            className="flex-shrink-0"
            style={{
              borderTop: '1px solid #E0E0E0',
              padding: '8px 0',
            }}
          >
            <Link
              href="/methodology"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 12px 6px 16px',
                fontSize: 12,
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                color: '#666666',
                textDecoration: 'none',
              }}
              className="sidebar-link"
            >
              Help & Methodology
              <Chevron />
            </Link>
            <Link
              href="/glossary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 12px 6px 16px',
                fontSize: 12,
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                color: '#666666',
                textDecoration: 'none',
              }}
              className="sidebar-link"
            >
              Glossary
              <Chevron />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
