/**
 * SiteNav.tsx — Single universal NavBar per Section 4 of the Master Overhaul.
 *
 * One sticky white navbar with logo left, nav items + dropdowns center-left,
 * Sign In + CTA right. Mobile hamburger slides drawer in from the left.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import LanguageToggle from '../LanguageToggle';

/* ── Dropdown definitions (Section 4.4–4.6) ─────────────────────── */

interface DropdownItem {
  label: string;
  href: string;
  divider?: boolean;
}

const CASE_TYPES: DropdownItem[] = [
  { label: 'Employment & Workplace', href: '/cases/employment-workplace' },
  { label: 'Personal Injury', href: '/cases/personal-injury' },
  { label: 'Consumer Protection', href: '/cases/consumer-protection' },
  { label: 'Civil Rights', href: '/cases/civil-rights' },
  { label: 'Money & Business', href: '/cases/money-business' },
  { label: 'Housing & Property', href: '/cases/housing-property' },
  { label: 'Healthcare & Benefits', href: '/cases/healthcare-benefits' },
  { label: 'Family Law', href: '/cases/family-law' },
  { label: 'Government', href: '/cases/government' },
  { label: 'Education', href: '/cases/education' },
  { label: '', href: '', divider: true },
  { label: 'View all 84 case types', href: '/cases' },
];

const DISTRICTS: DropdownItem[] = [
  { label: 'Interactive map', href: '/map' },
  { label: '', href: '', divider: true },
  { label: '1st Circuit', href: '/districts?circuit=1' },
  { label: '2nd Circuit', href: '/districts?circuit=2' },
  { label: '3rd Circuit', href: '/districts?circuit=3' },
  { label: '4th Circuit', href: '/districts?circuit=4' },
  { label: '5th Circuit', href: '/districts?circuit=5' },
  { label: '6th Circuit', href: '/districts?circuit=6' },
  { label: '7th Circuit', href: '/districts?circuit=7' },
  { label: '8th Circuit', href: '/districts?circuit=8' },
  { label: '9th Circuit', href: '/districts?circuit=9' },
  { label: '10th Circuit', href: '/districts?circuit=10' },
  { label: '11th Circuit', href: '/districts?circuit=11' },
  { label: 'D.C. Circuit', href: '/districts?circuit=dc' },
  { label: '', href: '', divider: true },
  { label: 'View all 94 districts', href: '/districts' },
];

const TOOLS: DropdownItem[] = [
  { label: 'Settlement calculator', href: '/calculator' },
  { label: 'Case comparison', href: '/compare' },
  { label: 'Filing trends', href: '/trends' },
  { label: 'NOS code explorer', href: '/nos-explorer' },
  { label: 'Odds analyzer', href: '/odds' },
  { label: 'Jargon translator', href: '/translate' },
  { label: 'Legal glossary', href: '/glossary' },
];

/* ── Secondary nav config ────────────────────────────────────────── */

interface SecondaryNavItem {
  label: string;
  href: string;
}

const SECONDARY_NAV: SecondaryNavItem[] = [
  { label: 'Case Analytics', href: '/search' },
  { label: 'Judge Intelligence', href: '/judges' },
  { label: 'District Analysis', href: '/districts' },
  { label: 'Settlement Explorer', href: '/calculator' },
  { label: 'AI Research', href: '/attorney' },
  { label: 'Docket Tracker', href: '/trends' },
  { label: 'My Library', href: '/dashboard' },
];

const PRODUCT_ROUTES = [
  '/',
  '/search',
  '/judges',
  '/districts',
  '/calculator',
  '/attorney',
  '/trends',
  '/dashboard',
  '/compare',
  '/odds',
  '/nos',
  '/nos-explorer',
  '/translate',
  '/glossary',
  '/map',
];

/* ── Nav item config ─────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  attorney?: boolean;           // purple accent styling
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Case Types', href: '/cases', dropdown: CASE_TYPES },
  { label: 'Districts', href: '/districts', dropdown: DISTRICTS },
  { label: 'Judges', href: '/judges' },
  { label: 'Tools', href: '/calculator', dropdown: TOOLS },
  { label: 'Attorney Mode', href: '/attorney', attorney: true },
];

/* ── Chevron SVG ─────────────────────────────────────────────────── */

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ marginLeft: 2 }}>
    <path d="M2.5 4L5 6.5L7.5 4" />
  </svg>
);

/* ── Dropdown component ──────────────────────────────────────────── */

function NavDropdown({ items, open }: { items: DropdownItem[]; open: boolean }) {
  if (!open) return null;
  return (
    <div className="navbar-dropdown" style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: '240px',
      background: '#FFFFFF',
      border: '1px solid #E0DDD8',
      borderRadius: '8px',
      padding: '8px 0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      zIndex: 300,
    }}>
      {items.map((item, i) =>
        item.divider ? (
          <div key={`div-${i}`} style={{ height: 1, background: '#E0DDD8', margin: '6px 12px' }} />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="navbar-dropdown-item"
            style={{
              display: 'block',
              padding: '10px 16px',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              color: '#0f0f0f',
              textDecoration: 'none',
              transition: 'background 120ms',
            }}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
}

/* ── Main NavBar ─────────────────────────────────────────────────── */

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) { setMobileOpen(false); hamburgerRef.current?.focus(); }
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileOpen]);

  /* Focus trap in mobile drawer */
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    drawer.addEventListener('keydown', trap);
    first.focus();
    return () => drawer.removeEventListener('keydown', trap);
  }, [mobileOpen]);

  /* Close on route change */
  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }, [pathname]);

  const shouldShowSecondaryNav = useCallback(() => {
    return PRODUCT_ROUTES.some(route =>
      pathname === route || pathname.startsWith(route + '/')
    );
  }, [pathname]);

  /* Hover handlers with debounce for dropdown */
  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <nav
        className="site-navbar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          height: '52px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E0DDD8',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '4px',
        }}>
          {/* Logo */}
          <Link href="/" aria-label="MyCaseValue home" style={{ display: 'flex', alignItems: 'center', marginRight: '24px', flexShrink: 0 }}>
            <Image src="/logo.svg" alt="MyCaseValue" width={120} height={30} priority style={{ display: 'block' }} />
          </Link>

          {/* Desktop nav items */}
          <div className="navbar-desktop-items" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '0', flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href) || (item.dropdown?.some(d => !d.divider && isActive(d.href)) ?? false);

              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="navbar-dropdown-parent"
                    style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className="navbar-item"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        padding: '0 14px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: active ? '#0966C3' : '#666666',
                        textDecoration: 'none',
                        borderBottom: active ? '2px solid #0966C3' : '2px solid transparent',
                        borderRadius: '4px',
                        transition: 'color 150ms, background 150ms',
                        whiteSpace: 'nowrap',
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                      <ChevronDown />
                    </Link>
                    <NavDropdown items={item.dropdown} open={openDropdown === item.label} />
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="navbar-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 14px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: active ? '#0966C3' : '#666666',
                    textDecoration: 'none',
                    borderBottom: active ? '2px solid #0966C3' : '2px solid transparent',
                    borderRadius: '4px',
                    transition: 'color 150ms, background 150ms',
                    whiteSpace: 'nowrap',
                    ...(item.attorney ? { borderLeft: '2px solid #0966C3', marginLeft: '8px', paddingLeft: '14px' } : {}),
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', flexShrink: 0 }}>
            <LanguageToggle />
            {userEmail ? (
              <>
                <Link href="/dashboard" className="navbar-item" style={{
                  fontSize: '14px', fontWeight: 500, color: '#4B5563', textDecoration: 'none',
                  fontFamily: 'var(--font-display)', padding: '8px 16px',
                  borderRadius: '20px', border: '1px solid #E5E7EB', transition: 'all 150ms',
                }}>
                  Dashboard
                </Link>
                <button onClick={handleSignOut} style={{
                  fontSize: '14px', fontWeight: 600, color: '#FFFFFF', background: '#0966C3',
                  padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', transition: 'all 150ms',
                }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="navbar-signin" style={{
                  fontSize: '14px', fontWeight: 500, color: '#4B5563', textDecoration: 'none',
                  fontFamily: 'var(--font-display)', transition: 'color 150ms',
                }}>
                  Sign In
                </Link>
                <Link href="/search" className="navbar-cta" style={{
                  fontSize: '14px', fontWeight: 600, color: '#FFFFFF', background: '#0966C3',
                  padding: '10px 20px', borderRadius: '20px', textDecoration: 'none',
                  fontFamily: 'var(--font-display)', transition: 'background 150ms',
                  whiteSpace: 'nowrap',
                }}>
                  Start Researching
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            ref={hamburgerRef}
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              color: '#1a1a1a',
              minHeight: '44px',
              minWidth: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Secondary product navigation bar */}
      {shouldShowSecondaryNav() && (
        <nav
          className="secondary-navbar"
          style={{
            position: 'sticky',
            top: '52px',
            zIndex: 199,
            background: '#F7F6F3',
            borderBottom: '1px solid #D6D3CC',
            display: 'none',
          }}
          role="navigation"
          aria-label="Product navigation"
        >
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            gap: '24px',
          }}>
            {SECONDARY_NAV.map((item, index) => {
              const active = isActive(item.href);
              return (
                <div key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      color: active ? '#0966C3' : '#999999',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 150ms',
                    }}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                  {index < SECONDARY_NAV.length - 1 && (
                    <span style={{ color: '#D6D3CC', fontSize: '12px' }}>·</span>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, top: '52px', zIndex: 198,
            background: 'rgba(0,0,0,0.3)',
          }}
          onClick={() => { setMobileOpen(false); hamburgerRef.current?.focus(); }}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — slides from left */}
      <div
        ref={drawerRef}
        className="navbar-mobile-drawer"
        style={{
          position: 'fixed',
          top: '52px',
          left: 0,
          bottom: 0,
          width: '300px',
          zIndex: 199,
          background: '#FFFFFF',
          borderRight: '1px solid #E0DDD8',
          boxShadow: '4px 0 16px rgba(0,0,0,0.08)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '16px 0',
          display: 'none',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={mobileOpen ? true : undefined}
      >
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href={item.href}
                onClick={() => { if (!item.dropdown) setMobileOpen(false); }}
                style={{
                  display: 'block',
                  flex: 1,
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontWeight: isActive(item.href) ? 600 : 500,
                  color: isActive(item.href) ? '#0966C3' : '#1a1a1a',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  minHeight: '44px',
                  borderLeft: item.attorney ? '3px solid #0966C3' : '3px solid transparent',
                  background: isActive(item.href) ? 'rgba(139,92,246,0.06)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  aria-label={`Expand ${item.label}`}
                  style={{
                    background: 'none', border: 'none', padding: '14px 20px',
                    cursor: 'pointer', color: '#4B5563', minHeight: '44px', minWidth: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
                    <path d="M3 4.5L6 7.5L9 4.5" />
                  </svg>
                </button>
              )}
            </div>
            {/* Expanded dropdown items in mobile */}
            {item.dropdown && mobileExpanded === item.label && (
              <div style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                {item.dropdown.filter(d => !d.divider).map(d => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 24px 12px 40px',
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                      color: '#4B5563',
                      textDecoration: 'none',
                      minHeight: '44px',
                      transition: 'background 120ms',
                    }}
                    className="navbar-mobile-subitem"
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Auth section */}
        <div style={{ borderTop: '1px solid #e5e7eb', margin: '12px 0 0', padding: '16px 24px' }}>
          {userEmail ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '12px 0', fontSize: '15px', fontWeight: 500,
                color: '#1a1a1a', textDecoration: 'none', fontFamily: 'var(--font-display)', minHeight: '44px',
              }}>
                Dashboard
              </Link>
              <button onClick={() => { setMobileOpen(false); handleSignOut(); }} style={{
                display: 'block', width: '100%', padding: '12px', borderRadius: '20px',
                fontSize: '15px', fontWeight: 600, color: '#FFFFFF', background: '#0966C3',
                fontFamily: 'var(--font-display)', textAlign: 'center', minHeight: '44px',
                marginTop: '8px', border: 'none', cursor: 'pointer',
              }}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '12px 0', fontSize: '15px', fontWeight: 500,
                color: '#1a1a1a', textDecoration: 'none', fontFamily: 'var(--font-display)', minHeight: '44px',
              }}>
                Sign In
              </Link>
              <Link href="/search" onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '12px', borderRadius: '20px', marginTop: '8px',
                fontSize: '15px', fontWeight: 600, color: '#FFFFFF', background: '#0966C3',
                textDecoration: 'none', fontFamily: 'var(--font-display)', textAlign: 'center', minHeight: '44px',
              }}>
                Start Researching
              </Link>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .navbar-item:hover { color: #191919 !important; background: #F3F2EF !important; }
        .navbar-signin:hover { color: #191919 !important; }
        .navbar-cta:hover { background: #004182 !important; }
        .navbar-dropdown-item:hover { background: #F3F2EF !important; color: #191919 !important; }
        .navbar-mobile-subitem:hover { background: #F3F2EF !important; }
        .secondary-navbar a:hover { color: #0966C3 !important; }

        @media (max-width: 768px) {
          .navbar-desktop-items { display: none !important; }
          .navbar-right { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-drawer { display: flex !important; }
        }

        @media (min-width: 769px) {
          .secondary-navbar { display: flex !important; }
        }
      `}} />
    </>
  );
}
