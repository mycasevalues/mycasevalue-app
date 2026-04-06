/**
 * SiteNav.tsx — Two-tier navigation with white top bar and dark navy sub-nav.
 *
 * Tier 1 (White, 64px): MyCaseValue logo left, auth buttons right
 * Tier 2 (Dark navy #1B3A5C, 48px): "MyCaseValue+" text left, FREE TRIAL button, nav links right
 *
 * Both sticky; sub-nav hides on mobile (<768px) and shows hamburger menu instead.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { SearchIcon } from '../ui/Icons';

const NAV_LINKS = [
  { href: '/search', label: 'Search' },
  { href: '/cases', label: 'Case Types', mega: true },
  { href: '/districts', label: 'Districts', mega: true },
  { href: '/judges', label: 'Judges' },
  { href: '/solutions', label: 'Solutions', mega: true },
  { href: '/nos-explorer', label: 'NOS Codes' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/compare', label: 'Compare' },
  { href: '/trends', label: 'Trends' },
  { href: '/attorney', label: 'Attorney Mode', mega: true },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Check auth state
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    const supabase = createBrowserClient(url, key);
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });

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

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    drawer.addEventListener('keydown', trapFocus);
    first.focus();
    return () => drawer.removeEventListener('keydown', trapFocus);
  }, [mobileOpen]);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search overlay on Escape key
  useEffect(() => {
    if (!searchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <>
      {/* TIER 1: WHITE TOP NAV (64px) */}
      <nav
        className="site-nav-top"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          height: '64px',
          background: '#FFFFFF',
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          borderBottom: '1px solid #E5E7EB',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="site-nav-logo-link"
            aria-label="MyCaseValue home"
          >
            <Image
              src="/logo.svg"
              alt="MyCaseValue"
              width={120}
              height={30}
              priority
              style={{ display: 'block' }}
            />
          </Link>

          {/* Right: Auth buttons (desktop) + Search + Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search icon button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="site-nav-search-btn"
              aria-label="Open search"
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                color: '#4B5563',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
                minWidth: '44px',
                transition: 'color 150ms',
              }}
            >
              <SearchIcon size={20} />
            </button>

            <div
              className="site-nav-auth"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {userEmail ? (
                <>
                  <Link
                    href="/dashboard"
                    className="site-nav-link"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#4B5563',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      borderRadius: '2px',
                      border: '1px solid #E5E7EB',
                      transition: 'all 150ms ease',
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="site-nav-link"
                    style={{
                      padding: '8px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#7C3AED',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-body)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="site-nav-link"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#4B5563',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      borderRadius: '2px',
                      border: '1px solid #E5E7EB',
                      transition: 'all 150ms',
                    }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FAFBFC',
                      background: '#7C3AED',
                      borderRadius: '0.25rem',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 150ms',
                    }}
                  >
                    Start Researching
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger button */}
            <button
              ref={hamburgerRef}
              className="site-nav-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                color: '#212529',
                minHeight: '44px',
                minWidth: '44px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
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
      </nav>

      {/* TIER 2: DARK NAVY SUB-NAV (48px) */}
      <nav
        className="site-nav-sub"
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 199,
          height: '48px',
          background: '#1B3A5C',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        role="navigation"
        aria-label="Secondary navigation"
      >
        <div
          style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            gap: '24px',
          }}
        >
          {/* Left: MyCaseValue+ brand text */}
          <div style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            letterSpacing: '-0.01em',
          }}>
            MyCaseValue
          </div>

          {/* Center-Left: FREE TRIAL button */}
          <button
            style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              padding: '8px 20px',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 150ms',
              fontFamily: 'var(--font-body)',
            }}
            onClick={() => router.push('/search')}
          >
            Start researching
          </button>

          {/* Right: Nav links */}
          <div
            className="site-nav-sub-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
              marginLeft: 'auto',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            {NAV_LINKS.map((link) => {
              if (!link.mega) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="site-nav-sub-link"
                    style={{
                      padding: '0 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isActive(link.href) ? '#FFFFFF' : '#E6E6E6',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: isActive(link.href) ? '2px solid #7C3AED' : '2px solid transparent',
                      transition: 'all 150ms',
                      position: 'relative',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              }

              /* Mega-menu content per section */
              let megaClass = 'nav-mega';
              let megaContent = null;

              if (link.label === 'Case Types') {
                megaClass = 'nav-mega nav-mega--wide';
                megaContent = (
                  <div className="nav-mega-grid nav-mega-grid--3col">
                    <div>
                      <div className="nav-mega-heading">Employment</div>
                      <a href="/report/442">Employment Discrimination</a>
                      <a href="/report/445">Americans with Disabilities</a>
                      <a href="/report/710">Fair Labor Standards</a>
                      <a href="/report/720">Labor/Management Relations</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Torts &amp; Injury</div>
                      <a href="/report/360">Personal Injury</a>
                      <a href="/report/350">Motor Vehicle</a>
                      <a href="/report/365">Product Liability</a>
                      <a href="/report/368">Medical Malpractice</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Civil Rights &amp; Contract</div>
                      <a href="/report/440">Civil Rights — Other</a>
                      <a href="/report/443">Housing/Accommodations</a>
                      <a href="/report/190">Contract — Other</a>
                      <a href="/report/110">Insurance</a>
                    </div>
                    <div className="nav-mega-footer-row">
                      <a href="/cases" className="nav-mega-footer-link">View All Case Types →</a>
                    </div>
                  </div>
                );
              } else if (link.label === 'Districts') {
                megaClass = 'nav-mega nav-mega--wide';
                megaContent = (
                  <div className="nav-mega-grid nav-mega-grid--4col">
                    <div>
                      <div className="nav-mega-heading">Eastern Circuits</div>
                      <a href="/districts?circuit=1">1st Circuit</a>
                      <a href="/districts?circuit=2">2nd Circuit</a>
                      <a href="/districts?circuit=3">3rd Circuit</a>
                      <a href="/districts?circuit=4">4th Circuit</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Central Circuits</div>
                      <a href="/districts?circuit=5">5th Circuit</a>
                      <a href="/districts?circuit=6">6th Circuit</a>
                      <a href="/districts?circuit=7">7th Circuit</a>
                      <a href="/districts?circuit=8">8th Circuit</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Western Circuits</div>
                      <a href="/districts?circuit=9">9th Circuit</a>
                      <a href="/districts?circuit=10">10th Circuit</a>
                      <a href="/districts?circuit=11">11th Circuit</a>
                      <a href="/districts?circuit=dc">D.C. Circuit</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Quick Links</div>
                      <a href="/districts/california-central">C.D. California</a>
                      <a href="/districts/new-york-southern">S.D. New York</a>
                      <a href="/districts/texas-southern">S.D. Texas</a>
                      <a href="/map">Interactive Map</a>
                    </div>
                    <div className="nav-mega-footer-row">
                      <a href="/districts" className="nav-mega-footer-link">View All 94 Districts →</a>
                    </div>
                  </div>
                );
              } else if (link.label === 'Solutions') {
                megaClass = 'nav-mega nav-mega--wide';
                megaContent = (
                  <div className="nav-mega-grid nav-mega-grid--3col">
                    <div>
                      <div className="nav-mega-heading">For Legal Professionals</div>
                      <a href="/solutions/individuals">Individuals</a>
                      <a href="/solutions/small-firms">Small Law Firms</a>
                      <a href="/solutions/enterprise">Enterprise Legal</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">For Organizations</div>
                      <a href="/solutions/insurance">Insurance Companies</a>
                      <a href="/solutions/legal-aid">Legal Aid</a>
                      <a href="/solutions/government">Government Agencies</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Data &amp; Research</div>
                      <a href="/solutions/funders">Litigation Funders</a>
                      <a href="/solutions/academic">Academic Research</a>
                      <a href="/solutions/api">API &amp; Integrations</a>
                    </div>
                    <div className="nav-mega-footer-row">
                      <a href="/solutions" className="nav-mega-footer-link">View All Solutions →</a>
                    </div>
                  </div>
                );
              } else if (link.label === 'Attorney Mode') {
                megaContent = (
                  <div className="nav-mega-grid nav-mega-grid--2col">
                    <div>
                      <div className="nav-mega-heading">Analysis Tools</div>
                      <a href="/attorney/case-predictor">Case Predictor</a>
                      <a href="/attorney/judge-intelligence">Judge Intelligence</a>
                      <a href="/attorney/venue-optimizer">Venue Optimizer</a>
                      <a href="/attorney/opposing-counsel">Opposing Counsel</a>
                    </div>
                    <div>
                      <div className="nav-mega-heading">Workflow</div>
                      <a href="/attorney/bulk-analysis">Bulk Analysis</a>
                      <a href="/attorney/document-intelligence">Document Intelligence</a>
                      <a href="/attorney/team-workspace">Team Workspace</a>
                      <a href="/attorney/api-access">API Access</a>
                    </div>
                    <div className="nav-mega-footer-row">
                      <a href="/attorney" className="nav-mega-footer-link">View All Attorney Tools →</a>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={link.href}
                  className="nav-mega-parent"
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    href={link.href}
                    className="site-nav-sub-link nav-mega-trigger"
                    style={{
                      padding: '0 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: isActive(link.href) ? '#FFFFFF' : '#E6E6E6',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderBottom: isActive(link.href) ? '2px solid #7C3AED' : '2px solid transparent',
                      transition: 'all 150ms',
                      position: 'relative',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginTop: '1px' }}>
                      <path d="M2.5 4L5 6.5L7.5 4" />
                    </svg>
                  </Link>
                  <div className={megaClass}>
                    {megaContent}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="site-nav-search-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            zIndex: 197,
            background: 'rgba(0,0,0,0.30)',
            backdropFilter: undefined,
            WebkitBackdropFilter: undefined,
          }}
          onClick={() => setSearchOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Search panel — slides down from nav */}
      <div
        className="site-nav-search-panel"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 198,
          background: '#1B3A5C',
          borderBottom: '1px solid #E5E7EB',
          padding: '32px 24px',
          maxHeight: searchOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 300ms ease, padding 300ms ease',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Search input */}
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search case types, districts, judges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
            className="site-nav-search-input"
            style={{
              flex: 1,
              height: '48px',
              padding: '12px 16px',
              fontSize: '16px',
              fontFamily: 'var(--font-body)',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '2px',
              transition: 'border-color 150ms',
              outline: 'none',
            }}
          />

          {/* Search button */}
          <button
            onClick={handleSearchSubmit}
            className="site-nav-search-submit"
            style={{
              height: '48px',
              padding: '0 24px',
              background: '#7C3AED',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 150ms',
            }}
          >
            Search
          </button>

          {/* Close button */}
          <button
            onClick={() => setSearchOpen(false)}
            className="site-nav-search-close"
            aria-label="Close search"
            style={{
              height: '48px',
              width: '48px',
              padding: '0',
              background: 'transparent',
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 300,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 150ms',
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="site-nav-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            zIndex: 198,
            background: 'rgba(0,23,46,0.40)',
            backdropFilter: undefined,
            WebkitBackdropFilter: undefined,
          }}
          onClick={() => { setMobileOpen(false); hamburgerRef.current?.focus(); }}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — frosted glass */}
      <div
        ref={drawerRef}
        className="site-nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: '64px',
          right: 0,
          bottom: 0,
          width: '280px',
          zIndex: 199,
          background: '#1B3A5C',
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          borderLeft: '1px solid #E5E7EB',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '24px',
          display: 'none',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto',
        }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={mobileOpen ? true : undefined}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '12px 16px',
              borderRadius: '2px',
              fontSize: '16px',
              fontWeight: isActive(link.href) ? 600 : 500,
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              background: isActive(link.href) ? '#7C3AED' : 'transparent',
              transition: 'all 150ms ease',
            }}
            className="site-nav-mobile-link"
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '12px 0', padding: '12px 0' }}>
          {userEmail ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  minHeight: '44px',
                  transition: 'all 150ms ease',
                }}
                className="site-nav-mobile-link"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setMobileOpen(false); handleSignOut(); }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#7C3AED',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                  minHeight: '44px',
                  marginTop: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  minHeight: '44px',
                  transition: 'all 150ms ease',
                }}
                className="site-nav-mobile-link"
              >
                Sign In
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#7C3AED',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                  minHeight: '44px',
                  marginTop: '8px',
                  transition: 'all 150ms ease',
                }}
              >
                Search Cases
              </Link>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-nav-logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .site-nav-search-btn:hover { color: #212529 !important; }
        .site-nav-search-input:focus { border-color: #7C3AED !important; }
        .site-nav-search-submit:hover { background: #6D28D9 !important; }
        .site-nav-search-close:hover { color: #7C3AED !important; }
        .site-nav-link:hover { color: #212529 !important; }
        .site-nav-sub-link:hover { color: #FFFFFF !important; }
        .site-nav-mobile-link:hover { background: rgba(124,58,237,0.15) !important; }

        /* ── MEGA-MENU ─────────────────────────────────────── */
        .nav-mega {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 280px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-top: 3px solid #7C3AED;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.14);
          padding: 24px 0 16px;
          z-index: 300;
        }
        .nav-mega--wide {
          min-width: 560px;
          left: 50%;
          transform: translateX(-50%);
        }
        .nav-mega-parent:hover .nav-mega {
          display: block;
        }
        .nav-mega-grid {
          display: grid;
          gap: 0 32px;
          padding: 0 24px;
        }
        .nav-mega-grid--2col { grid-template-columns: 1fr 1fr; }
        .nav-mega-grid--3col { grid-template-columns: 1fr 1fr 1fr; }
        .nav-mega-grid--4col { grid-template-columns: 1fr 1fr 1fr 1fr; }
        .nav-mega-heading {
          font-size: 11px;
          font-weight: 700;
          color: #4B5563;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-body);
          padding-bottom: 10px;
          margin-bottom: 4px;
          border-bottom: 1px solid #E5E7EB;
        }
        .nav-mega a {
          display: block;
          padding: 6px 0;
          font-size: 13px;
          color: #4B5563;
          text-decoration: none;
          font-family: var(--font-body);
          transition: color 120ms;
        }
        .nav-mega a:hover { color: #7C3AED; }
        .nav-mega-footer-row {
          grid-column: 1 / -1;
          border-top: 1px solid #E5E7EB;
          margin-top: 12px;
          padding-top: 12px;
        }
        .nav-mega-footer-link {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #7C3AED !important;
        }
        .nav-mega-footer-link:hover {
          color: #6D28D9 !important;
        }
        .nav-mega-trigger svg {
          opacity: 0.6;
          transition: transform 150ms;
        }
        .nav-mega-parent:hover .nav-mega-trigger svg {
          transform: rotate(180deg);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .site-nav-sub { display: none !important; }
          .site-nav-auth { display: none !important; }
          .site-nav-hamburger { display: flex !important; }
          .site-nav-mobile-drawer { display: flex !important; }
          .nav-mega { display: none !important; }
        }
        @media (max-width: 1100px) {
          .nav-mega--wide {
            min-width: 400px !important;
          }
          .nav-mega-grid--4col {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}} />
    </>
  );
}
