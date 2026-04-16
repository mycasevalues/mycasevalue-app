'use client';

/**
 * Header.tsx — Site header with streamlined navigation
 *
 * Simplified nav structure:
 * - Search (top-level link)
 * - Explore (mega-menu: Cases, Judges, Districts)
 * - For Attorneys (mega-menu: organized tools)
 * - Data Sources (top-level link)
 * - Pricing (top-level link)
 *
 * Removed clutter, dead-end links, and non-functional features.
 * Case Reports removed (feature not built out).
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

/* ── Types ── */

interface MegaMenuColumn {
  heading: string;
  items: Array<{ label: string; href: string; highlight?: boolean }>;
}

interface DropdownItem {
  label: string;
  href: string;
  highlight?: boolean;
}

/* ── Nav Data ── */

const EXPLORE_COLUMNS: MegaMenuColumn[] = [
  {
    heading: 'CASES',
    items: [
      { label: 'Browse All Case Types', href: '/cases', highlight: true },
      { label: 'Search Cases', href: '/case-search' },
      { label: 'Employment & Workplace', href: '/cases/employment-workplace' },
      { label: 'Personal Injury', href: '/cases/personal-injury' },
      { label: 'Civil Rights', href: '/cases/civil-rights' },
      { label: 'Consumer Protection', href: '/cases/consumer-protection' },
      { label: 'Business Disputes', href: '/cases/business-disputes' },
      { label: 'Intellectual Property', href: '/cases/intellectual-property' },
    ],
  },
  {
    heading: 'JUDGES',
    items: [
      { label: 'Browse All Judges', href: '/judges', highlight: true },
      { label: 'Judge Intelligence', href: '/attorney/judge-intelligence' },
    ],
  },
  {
    heading: 'DISTRICTS',
    items: [
      { label: 'Browse All Districts', href: '/districts', highlight: true },
      { label: 'Venue Optimizer', href: '/attorney/venue-optimizer' },
    ],
  },
];

const ATTORNEY_COLUMNS: MegaMenuColumn[] = [
  {
    heading: 'CASE INTELLIGENCE',
    items: [
      { label: 'All Attorney Tools', href: '/attorney', highlight: true },
      { label: 'Case Predictor', href: '/attorney/case-predictor' },
      { label: 'Motion Analytics', href: '/attorney/motion-analytics' },
      { label: 'Bulk Analysis', href: '/attorney/bulk-analysis' },
    ],
  },
  {
    heading: 'DOCUMENT DRAFTING',
    items: [
      { label: 'Demand Letter', href: '/attorney/demand-letter' },
      { label: 'Discovery Generator', href: '/attorney/discovery-generator' },
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
    ],
  },
  {
    heading: 'CALCULATORS',
    items: [
      { label: 'Fee Calculator', href: '/attorney/fee-calculator' },
      { label: 'Deadline Calculator', href: '/attorney/deadline-calculator' },
      { label: 'SOL Calculator', href: '/attorney/sol-calculator' },
    ],
  },
];

const RESOURCES_ITEMS: DropdownItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ── Helpers ── */

function getActiveSection(pathname: string): string | null {
  if (
    pathname.startsWith('/cases') ||
    pathname.startsWith('/judges') ||
    pathname.startsWith('/districts') ||
    pathname.startsWith('/legal')
  )
    return 'explore';
  if (pathname.startsWith('/attorney') || pathname.startsWith('/report'))
    return 'attorneys';
  if (
    ['/how-it-works', '/methodology', '/faq', '/about', '/contact'].some((p) =>
      pathname.startsWith(p)
    )
  )
    return 'resources';
  if (pathname === '/pricing') return 'pricing';
  if (pathname === '/data-sources') return 'data-sources';
  return null;
}

/* ── Dropdown Components ── */

function MegaMenu({
  columns,
  onMouseEnter,
  onMouseLeave,
}: {
  columns: MegaMenuColumn[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const colCount = Math.min(columns.length, 4);

  return (
    <div
      className="fixed top-14 left-0 right-0 border-b shadow-lg z-40"
      style={{ background: '#0c1220', borderColor: 'rgba(255,255,255,0.06)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="px-6 py-6 max-w-5xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          gap: 0,
        }}
      >
        {columns.map((col, i) => (
          <div
            key={col.heading}
            className={i > 0 ? 'border-l border-white/5 pl-6' : ''}
          >
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-white/5">
              {col.heading}
            </p>
            <div className="space-y-0.5">
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-1.5 px-2 -mx-2 rounded-md text-sm transition-colors ${
                    item.highlight
                      ? 'font-semibold text-blue-400 hover:bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleDropdown({ items }: { items: DropdownItem[] }) {
  return (
    <div className="absolute top-full left-0 mt-0 rounded-lg shadow-lg z-40 whitespace-nowrap min-w-[180px]" style={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.06)' }}>
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block px-4 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors ${
            i === 0 ? 'rounded-t-lg' : ''
          } ${i === items.length - 1 ? 'rounded-b-lg' : 'border-b border-white/5'}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/* ── Chevron ── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1L5 5L9 1" />
    </svg>
  );
}

/* ── Main Header ── */

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const activeSection = getActiveSection(pathname);

  // Workspace routes use sidebar nav instead
  const WORKSPACE_PREFIXES = [
    '/cases',
    '/judges',
    '/districts',
    '/attorney',
    '/search',
    '/dashboard',
    '/legal',
    '/trends',
    '/nos-explorer',
    '/compare',
    '/calculator',
    '/map',
    '/odds',
    '/report',
    '/results',
    '/sample',
    '/account',
    '/settings',
    '/glossary',
  ];
  const isWorkspace = WORKSPACE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  /* Auth */
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => setUserEmail(user?.email ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

  /* Scroll */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Escape */
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

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
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
  const isHome = pathname === '/';

  // Dark header everywhere — matches dark mode site
  const headerTransparent = isHome && !hasBlur;

  const navLinkClass = (section: string) =>
    `relative flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-[-0.005em] transition-colors ${
      activeSection === section
        ? 'text-white after:absolute after:-bottom-[1px] after:left-3 after:right-3 after:h-[2px] after:bg-blue-500'
        : 'text-gray-400 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          headerTransparent
            ? 'bg-transparent border-b border-white/5'
            : 'border-b border-white/5'
        }`}
        style={{ background: headerTransparent ? 'transparent' : '#0c1220' }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/"
                aria-label="MyCaseValue home"
                className="flex items-center gap-2 flex-shrink-0"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="-100 -100 200 200"
                  className="block flex-shrink-0"
                >
                  <rect
                    x="-100"
                    y="-100"
                    width="200"
                    height="200"
                    rx="26"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <g transform="rotate(12)">
                    <polygon
                      points="0,0 -40,-69.3 40,-69.3 80,0"
                      fill="white"
                      opacity="0.93"
                    />
                    <polygon
                      points="0,0 80,0 40,69.3 -40,69.3"
                      fill="white"
                      opacity="0.52"
                    />
                    <polygon
                      points="0,0 -40,69.3 -80,0 -40,-69.3"
                      fill="white"
                      opacity="0.24"
                    />
                  </g>
                </svg>
                <span className="font-inter text-sm font-bold hidden sm:block tracking-tight text-white/90">
                  MyCase<span className="text-white">Value</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5 ml-1 px-1.5 py-0.5 rounded-[3px] border border-white/5 bg-white/[0.02]" aria-label="Live data">
                  <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                  <span className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">Live</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav
              className={`hidden ${isWorkspace ? '' : 'lg:flex'} items-center gap-0`}
            >
              {/* Explore */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('explore')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navLinkClass('explore')}
                  aria-expanded={openDropdown === 'explore'}
                  aria-haspopup="true"
                >
                  Explore
                  <ChevronDown open={openDropdown === 'explore'} />
                </button>
                {openDropdown === 'explore' && (
                  <MegaMenu
                    columns={EXPLORE_COLUMNS}
                    onMouseEnter={() => handleMouseEnter('explore')}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
              </div>

              {/* For Attorneys */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('attorneys')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navLinkClass('attorneys')}
                  aria-expanded={openDropdown === 'attorneys'}
                  aria-haspopup="true"
                >
                  For Attorneys
                  <ChevronDown open={openDropdown === 'attorneys'} />
                </button>
                {openDropdown === 'attorneys' && (
                  <MegaMenu
                    columns={ATTORNEY_COLUMNS}
                    onMouseEnter={() => handleMouseEnter('attorneys')}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
              </div>

              {/* Data Sources */}
              <Link href="/data-sources" className={navLinkClass('data-sources')}>
                Data Sources
              </Link>

              {/* Resources */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={navLinkClass('resources')}
                  aria-expanded={openDropdown === 'resources'}
                  aria-haspopup="true"
                >
                  Resources
                  <ChevronDown open={openDropdown === 'resources'} />
                </button>
                {openDropdown === 'resources' && (
                  <SimpleDropdown items={RESOURCES_ITEMS} />
                )}
              </div>

              {/* Pricing */}
              <Link href="/pricing" className={navLinkClass('pricing')}>
                Pricing
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {userEmail ? (
                <div className="relative">
                  <button
                    onClick={() => setAuthOpen(!authOpen)}
                    className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-xs flex items-center justify-center hover:bg-brand-blue/20 transition-colors"
                    aria-expanded={authOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    {userEmail.charAt(0).toUpperCase()}
                  </button>
                  {authOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 rounded-lg shadow-lg z-40" style={{ background: '#0c1220', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors rounded-t-lg border-b border-white/5"
                        onClick={() => setAuthOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setAuthOpen(false);
                          handleSignOut();
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors rounded-b-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-1.5 rounded text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              aria-label={
                mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileOpen}
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

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-14 right-0 bottom-0 z-40 w-full max-w-sm overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#0c1220' }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={mobileOpen ? true : undefined}
      >
        <div className="p-6 space-y-4">
          {/* Mobile nav sections */}
          {[
            { key: 'explore', label: 'Explore', columns: EXPLORE_COLUMNS },
            {
              key: 'attorneys',
              label: 'For Attorneys',
              columns: ATTORNEY_COLUMNS,
            },
          ].map(({ key, label, columns }) => (
            <div key={key}>
              <button
                onClick={() =>
                  setMobileExpanded(mobileExpanded === key ? null : key)
                }
                className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                aria-expanded={mobileExpanded === key}
              >
                <span className="font-semibold text-gray-200 text-sm">
                  {label}
                </span>
                <ChevronDown open={mobileExpanded === key} />
              </button>
              {mobileExpanded === key && (
                <div className="bg-white/5 rounded-lg p-4 space-y-4">
                  {columns.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        {col.heading}
                      </p>
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-1.5 px-3 rounded text-sm transition-colors ${
                            item.highlight
                              ? 'font-semibold text-brand-blue'
                              : 'text-gray-400 hover:text-brand-blue'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/data-sources"
            onClick={() => setMobileOpen(false)}
            className="block py-3 px-4 font-semibold text-gray-200 text-sm hover:bg-white/5 rounded-lg transition-colors"
          >
            Data Sources
          </Link>

          {/* Resources */}
          <div>
            <button
              onClick={() =>
                setMobileExpanded(
                  mobileExpanded === 'resources' ? null : 'resources'
                )
              }
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
              aria-expanded={mobileExpanded === 'resources'}
            >
              <span className="font-semibold text-gray-200 text-sm">
                Resources
              </span>
              <ChevronDown open={mobileExpanded === 'resources'} />
            </button>
            {mobileExpanded === 'resources' && (
              <div className="bg-white/5 rounded-lg p-4">
                {RESOURCES_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 px-3 rounded text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block py-3 px-4 font-semibold text-gray-200 text-sm hover:bg-white/5 rounded-lg transition-colors"
          >
            Pricing
          </Link>

          <div className="h-px bg-white/10" />

          {/* Auth */}
          {userEmail ? (
            <div className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="w-full py-3 px-4 rounded-lg font-semibold text-sm text-brand-blue hover:bg-blue-50 transition-colors text-left"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded-lg text-center text-sm text-gray-300 hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-4 rounded bg-brand-blue text-white font-semibold text-sm text-center hover:bg-brand-blue-dark transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
