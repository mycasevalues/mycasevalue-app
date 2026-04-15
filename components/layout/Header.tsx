'use client';

/**
 * Header.tsx — Consolidated site header component
 *
 * Replaces SiteNav.tsx with improved architecture:
 * - Mega-menu for Explore (3-column: Cases, Judges, Districts)
 * - Small dropdowns for For Attorneys and Resources
 * - Sticky with scroll-triggered blur effect
 * - Full mobile drawer with collapsible sections
 * - Keyboard navigation (Tab, Arrow keys, Escape)
 * - Active page indicators (Brand Blue text + 2px underline)
 * - Supabase auth integration
 *
 * Spec: Task 1.3 of MyCaseValue Site Overhaul
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

/* ─────────────────────────────────────────────────────────────────────────
   Dropdown Data Structures
   ───────────────────────────────────────────────────────────────────────── */

interface MegaMenuColumn {
  heading: string;
  items: Array<{ label: string; href: string; highlight?: boolean }>;
}

interface DropdownItem {
  label: string;
  href: string;
  highlight?: boolean;
}

// Explore Mega-Menu: 3 columns (Cases, Judges, Districts)
const EXPLORE_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: 'CASES',
    items: [
      { label: 'Browse All Cases', href: '/cases' },
      { label: 'Employment & Workplace', href: '/cases/employment-workplace' },
      { label: 'Personal Injury', href: '/cases/personal-injury' },
      { label: 'Civil Rights', href: '/cases/civil-rights' },
      { label: 'Consumer Protection', href: '/cases/consumer-protection' },
      { label: 'Business Disputes', href: '/cases/business-disputes' },
      { label: 'Immigration', href: '/cases/immigration' },
      { label: 'Intellectual Property', href: '/cases/intellectual-property' },
      { label: 'Trends', href: '/trends' },
      { label: 'NOS Explorer', href: '/nos-explorer', highlight: true },
    ],
  },
  {
    heading: 'JUDGES',
    items: [
      { label: 'Browse All Judges', href: '/judges', highlight: true },
      { label: 'Judge Intelligence', href: '/attorney/judge-intelligence' },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  {
    heading: 'DISTRICTS',
    items: [
      { label: 'Browse All Districts', href: '/districts', highlight: true },
      { label: 'Court Rules', href: '/attorney/court-rules' },
      { label: 'Venue Optimizer', href: '/attorney/venue-optimizer' },
    ],
  },
  {
    heading: 'RESEARCH HUB',
    items: [
      { label: 'Research Hub Overview', href: '/legal', highlight: true },
      { label: 'Document Search', href: '/legal/search' },
      { label: 'Citation Explorer', href: '/legal/citations' },
      { label: 'Data Dashboard', href: '/legal/dashboard' },
    ],
  },
];

// For Attorneys Mega-Menu: 6 categories covering all attorney tools
const FOR_ATTORNEYS_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: 'CASE INTELLIGENCE',
    items: [
      { label: 'All Attorney Tools', href: '/attorney', highlight: true },
      { label: 'Case Predictor', href: '/attorney/case-predictor' },
      { label: 'Motion Analytics', href: '/attorney/motion-analytics' },
      { label: 'Bulk Analysis', href: '/attorney/bulk-analysis' },
      { label: 'Appeals', href: '/attorney/appeals' },
      { label: 'Class Action', href: '/attorney/class-action' },
    ],
  },
  {
    heading: 'DOCUMENT DRAFTING',
    items: [
      { label: 'Demand Letter', href: '/attorney/demand-letter' },
      { label: 'Demand Package', href: '/attorney/demand-package' },
      { label: 'Discovery Generator', href: '/attorney/discovery-generator' },
      { label: 'Motions', href: '/attorney/motions' },
      { label: 'Research Memo', href: '/attorney/research-memo' },
    ],
  },
  {
    heading: 'COURT & JUDGE RESEARCH',
    items: [
      { label: 'Judge Intelligence', href: '/attorney/judge-intelligence' },
      { label: 'Venue Optimizer', href: '/attorney/venue-optimizer' },
      { label: 'Court Rules', href: '/attorney/court-rules' },
      { label: 'Opposing Counsel', href: '/attorney/opposing-counsel' },
      { label: 'Expert Witness', href: '/attorney/expert-witness' },
    ],
  },
  {
    heading: 'CALCULATORS & DEADLINES',
    items: [
      { label: 'Fee Calculator', href: '/attorney/fee-calculator' },
      { label: 'Deadline Calculator', href: '/attorney/deadline-calculator' },
      { label: 'SOL Calculator', href: '/attorney/sol-calculator' },
      { label: 'Case Timeline', href: '/attorney/case-timeline' },
      { label: 'Timeline', href: '/attorney/timeline' },
    ],
  },
  {
    heading: 'LITIGATION PREP',
    items: [
      { label: 'Deposition Prep', href: '/attorney/deposition-prep' },
      { label: 'Document Intelligence', href: '/attorney/document-intelligence' },
      { label: 'Intake Forms', href: '/attorney/intake-forms' },
      { label: 'Negotiation', href: '/attorney/negotiation' },
      { label: 'PACER Monitor', href: '/attorney/pacer-monitor' },
    ],
  },
  {
    heading: 'COLLABORATION',
    items: [
      { label: 'Team Workspace', href: '/attorney/team-workspace' },
      { label: 'API Access', href: '/attorney/api-access' },
      { label: 'Case Reports', href: '/report/360' },
    ],
  },
];

// Resources Dropdown
const RESOURCES_DROPDOWN: DropdownItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ─────────────────────────────────────────────────────────────────────────
   Utility Functions
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Check if a route is active based on pathname
 * - Exact match: /pricing, /about, /contact, /methodology, /faq, /how-it-works
 * - Starts-with: /cases, /judges, /districts, /attorney, /nos-explorer
 */
function isActiveRoute(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';

  // Exact matches
  const exactMatches = [
    '/pricing',
    '/about',
    '/contact',
    '/methodology',
    '/faq',
    '/how-it-works',
    '/sign-in',
    '/sign-up',
  ];
  if (exactMatches.includes(href) && pathname === href) return true;

  // Starts-with matches
  const startsWithMatches = ['/cases', '/judges', '/districts', '/attorney', '/nos-explorer', '/report'];
  if (startsWithMatches.some(match => href === match || href.startsWith(match + '?'))) {
    return pathname === href || pathname.startsWith(href.split('?')[0] + '/');
  }

  return false;
}

/**
 * Determine active nav section based on pathname
 */
function getActiveNavSection(pathname: string): string | null {
  if (pathname.startsWith('/cases') || pathname.startsWith('/judges') || pathname.startsWith('/districts') || pathname.startsWith('/nos-explorer') || pathname.startsWith('/legal')) {
    return 'explore';
  }
  if (pathname.startsWith('/attorney') || pathname.startsWith('/report')) {
    return 'attorneys';
  }
  if (
    pathname.startsWith('/how-it-works') ||
    pathname.startsWith('/methodology') ||
    pathname.startsWith('/faq') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact')
  ) {
    return 'resources';
  }
  if (pathname === '/pricing') {
    return 'pricing';
  }
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────
   Dropdown Components
   ───────────────────────────────────────────────────────────────────────── */

/**
 * MegaMenu: flexible column layout for Explore and For Attorneys
 */
function MegaMenu({ columns, onMouseEnter, onMouseLeave, showSearch = false, footer }: {
  columns: MegaMenuColumn[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showSearch?: boolean;
  footer?: string;
}) {
  const router = useRouter();
  const [megaQuery, setMegaQuery] = useState('');
  const colCount = columns.length;
  // 4 columns for Explore, 3x2 grid for 6-column attorney tools
  const gridClass = colCount <= 4
    ? `grid grid-cols-${colCount} gap-0`
    : 'grid grid-cols-3 gap-0';

  return (
    <div className="fixed top-16 left-0 right-0 mt-0 bg-white border-b border-gray-200 shadow-lg z-40" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* Optional Search Bar */}
      {showSearch && (
        <form
          role="search"
          aria-label="Search federal court records"
          className="border-b border-gray-100 px-6 py-4 max-w-6xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            const q = megaQuery.trim();
            router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/cases');
          }}
        >
          <input
            type="text"
            value={megaQuery}
            onChange={(e) => setMegaQuery(e.target.value)}
            placeholder="Search cases, judges, districts..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-colors"
            aria-label="Search cases, judges, districts"
          />
        </form>
      )}

      {/* Columns Grid */}
      <div
        className="px-6 py-6 max-w-6xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: colCount <= 4 ? `repeat(${colCount}, 1fr)` : 'repeat(3, 1fr)',
          gap: 0,
        }}
      >
        {columns.map((col, colIndex) => {
          // For 3-col grid, add top border on second row
          const isSecondRow = colCount > 4 && colIndex >= 3;
          const needsLeftBorder = colCount <= 4 ? colIndex > 0 : colIndex % 3 !== 0;
          return (
            <div
              key={col.heading}
              className={`${needsLeftBorder ? 'border-l border-gray-100 pl-6' : ''} ${isSecondRow ? 'border-t border-gray-100 pt-6 mt-4' : ''}`}
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                {col.heading}
              </p>
              <div className="space-y-0">
                {col.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 px-3 -mx-3 rounded-md text-sm transition-colors ${
                      item.highlight
                        ? 'font-semibold text-brand-blue hover:bg-blue-50'
                        : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 max-w-6xl mx-auto">
          <p className="text-xs text-gray-500">{footer}</p>
        </div>
      )}
    </div>
  );
}

/**
 * SimpleDropdown: 1-column layout for For Attorneys and Resources
 */
function SimpleDropdown({ items }: { items: DropdownItem[] }) {
  return (
    <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg z-40 whitespace-nowrap">
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-4 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
            index !== items.length - 1 ? 'border-b border-gray-100' : ''
          } ${
            item.highlight
              ? 'font-semibold text-brand-blue hover:bg-blue-50'
              : 'text-gray-700 hover:bg-gray-50 hover:text-brand-blue'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   Main Header Component
   ───────────────────────────────────────────────────────────────────────── */

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileQuery, setMobileQuery] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeSection = getActiveNavSection(pathname);

  /* Auth */
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    supabase.auth.getUser().then(({ data: { user } }) => setUserEmail(user?.email ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push('/');
    router.refresh();
  };

  /* Scroll effect for sticky header */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Escape key to close dropdowns and drawer */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        if (mobileOpen) {
          setMobileOpen(false);
          hamburgerRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  /* Close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* Body scroll lock when mobile drawer open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 250);
  };

  const hasBlur = scrollY > 10;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          hasBlur
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'
            : 'bg-white border-b border-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" aria-label="MyCaseValue home" className="flex items-center gap-2 flex-shrink-0">
              <svg width="32" height="32" viewBox="-100 -100 200 200" className="block flex-shrink-0">
                <rect x="-100" y="-100" width="200" height="200" rx="26" fill="var(--accent-primary)" />
                <g transform="rotate(12)">
                  <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
                  <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
                  <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
                </g>
              </svg>
              <span className="font-inter text-lg font-bold text-gray-900 hidden sm:block">
                MyCase<span className="text-brand-blue">Value</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center flex-1 gap-0">
              {/* Explore */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('explore')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === 'explore'
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
                  }`}
                  aria-expanded={openDropdown === 'explore'}
                  aria-haspopup="true"
                >
                  Explore
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${openDropdown === 'explore' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L6 6L11 1" />
                  </svg>
                </button>
                {openDropdown === 'explore' && <MegaMenu columns={EXPLORE_MEGA_MENU} onMouseEnter={() => handleMouseEnter('explore')} onMouseLeave={handleMouseLeave} showSearch footer="Sourced from 5.1M+ public federal court records -- FJC IDB -- CourtListener -- RECAP" />}
              </div>

              {/* For Attorneys */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('attorneys')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === 'attorneys'
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
                  }`}
                  aria-expanded={openDropdown === 'attorneys'}
                  aria-haspopup="true"
                >
                  For Attorneys
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${openDropdown === 'attorneys' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L6 6L11 1" />
                  </svg>
                </button>
                {openDropdown === 'attorneys' && <MegaMenu columns={FOR_ATTORNEYS_MEGA_MENU} onMouseEnter={() => handleMouseEnter('attorneys')} onMouseLeave={handleMouseLeave} footer="27 professional tools for litigation, research, and case management" />}
              </div>

              {/* Resources */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === 'resources'
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
                  }`}
                  aria-expanded={openDropdown === 'resources'}
                  aria-haspopup="true"
                >
                  Resources
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L6 6L11 1" />
                  </svg>
                </button>
                {openDropdown === 'resources' && <SimpleDropdown items={RESOURCES_DROPDOWN} />}
              </div>

              {/* Pricing */}
              <Link
                href="/pricing"
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'pricing'
                    ? 'text-brand-blue'
                    : 'text-gray-700 hover:text-brand-blue'
                }`}
              >
                Pricing
              </Link>
            </div>

            {/* Auth Buttons */}
            {userEmail ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setAuthOpen(!authOpen)}
                    className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-sm flex items-center justify-center hover:bg-brand-blue/20 transition-colors"
                    aria-expanded={authOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    {userEmail.charAt(0).toUpperCase()}
                  </button>
                  {authOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors border-b border-gray-100"
                        onClick={() => setAuthOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors border-b border-gray-100"
                        onClick={() => setAuthOpen(false)}
                      >
                        My Reports
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors border-b border-gray-100"
                        onClick={() => setAuthOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setAuthOpen(false);
                          handleSignOut();
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue/90 transition-colors flex items-center gap-1"
                >
                  Get Started
                  <span>→</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-16 right-0 bottom-0 z-40 w-full max-w-sm bg-white overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={mobileOpen ? true : undefined}
      >
        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form
            role="search"
            aria-label="Search federal court records"
            onSubmit={(e) => {
              e.preventDefault();
              const q = mobileQuery.trim();
              setMobileOpen(false);
              router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/cases');
            }}
          >
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Search cases, judges, districts..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-colors"
              aria-label="Search cases, judges, districts"
            />
          </form>

          {/* Explore Section */}
          <div className="space-y-2">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'explore' ? null : 'explore')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              aria-expanded={mobileExpanded === 'explore'}
            >
              <span className="font-semibold text-gray-900">Explore</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform ${mobileExpanded === 'explore' ? 'rotate-180' : ''}`}
              >
                <path d="M3 6L8 11L13 6" />
              </svg>
            </button>
            {mobileExpanded === 'explore' && (
              <div className="space-y-1 bg-gray-50 rounded-lg p-4">
                {EXPLORE_MEGA_MENU.map((col) => (
                  <div key={col.heading} className="space-y-2 mb-4 last:mb-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.heading}</p>
                    <div className="space-y-1">
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-2 px-3 rounded transition-colors ${
                            item.highlight
                              ? 'font-semibold text-brand-blue hover:bg-white'
                              : 'text-gray-700 hover:bg-white hover:text-brand-blue'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* For Attorneys Section */}
          <div className="space-y-2">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'attorneys' ? null : 'attorneys')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              aria-expanded={mobileExpanded === 'attorneys'}
            >
              <span className="font-semibold text-gray-900">For Attorneys</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform ${mobileExpanded === 'attorneys' ? 'rotate-180' : ''}`}
              >
                <path d="M3 6L8 11L13 6" />
              </svg>
            </button>
            {mobileExpanded === 'attorneys' && (
              <div className="space-y-1 bg-gray-50 rounded-lg p-4">
                {FOR_ATTORNEYS_MEGA_MENU.map((col) => (
                  <div key={col.heading} className="space-y-2 mb-4 last:mb-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.heading}</p>
                    <div className="space-y-1">
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-2 px-3 rounded transition-colors ${
                            item.highlight
                              ? 'font-semibold text-brand-blue hover:bg-white'
                              : 'text-gray-700 hover:bg-white hover:text-brand-blue'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div className="space-y-2">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'resources' ? null : 'resources')}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              aria-expanded={mobileExpanded === 'resources'}
            >
              <span className="font-semibold text-gray-900">Resources</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform ${mobileExpanded === 'resources' ? 'rotate-180' : ''}`}
              >
                <path d="M3 6L8 11L13 6" />
              </svg>
            </button>
            {mobileExpanded === 'resources' && (
              <div className="space-y-1 bg-gray-50 rounded-lg p-4">
                {RESOURCES_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 px-3 rounded text-gray-700 hover:bg-white hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block py-3 px-4 font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Pricing
          </Link>

          {/* Divider */}
          <div className="h-px bg-gray-200" />

          {/* Auth Section */}
          {userEmail ? (
            <div className="space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="w-full py-3 px-4 rounded-lg font-semibold text-brand-blue hover:bg-blue-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-center text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-full bg-brand-blue text-white font-semibold text-center hover:bg-brand-blue/90 transition-colors"
              >
                Get Started →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
