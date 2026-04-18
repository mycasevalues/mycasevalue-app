'use client';

/**
 * Header.tsx — Westlaw Precision-style unified top navigation bar
 *
 * Structure (left → right):
 * [Logo zone 192px: cube + "MyCaseValue" baskerville + "Advantage" sub]
 * [CENTER: Search bar with jurisdiction dropdown RIGHT + Search button + "Advanced" link]
 * [RIGHT: Folders | History | Alerts | Help | Account]
 *
 * Specs:
 * - Height: 54px
 * - Background: var(--chrome-bg) = #1B2D45 (Westlaw deep navy)
 * - Border-bottom: 3px solid var(--gold) = #C4882A
 * - Position: sticky top: 0, z-index: 1000
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

/* ── Search Autocomplete Data ── */

const SEARCH_SUGGESTIONS = [
  { label: 'Employment Discrimination', href: '/cases/employment-workplace/employment-discrimination', type: 'case' },
  { label: 'Personal Injury', href: '/cases/personal-injury', type: 'case' },
  { label: 'Southern District of New York', href: '/districts/SDNY', type: 'district' },
  { label: 'Central District of California', href: '/districts/CACD', type: 'district' },
  { label: 'Civil Rights', href: '/cases/civil-rights', type: 'case' },
  { label: 'Consumer Protection', href: '/cases/consumer-protection', type: 'case' },
  { label: 'Browse All Judges', href: '/judges', type: 'judge' },
  { label: 'Browse All Districts', href: '/districts', type: 'district' },
  { label: 'Browse All Cases', href: '/cases', type: 'case' },
  { label: 'Attorney Tools', href: '/attorney', type: 'tool' },
  { label: 'Settlement Ranges', href: '/cases', type: 'case' },
  { label: 'Win Rate Explorer', href: '/odds', type: 'tool' },
];

/* ── Nav Icon Components ── */

function FoldersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AlertsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SearchIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── Main Header ── */

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  /* Close dropdown on click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (authOpen) setAuthOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [authOpen]);

  /* Close on route change */
  useEffect(() => {
    setSearchFocused(false);
    setAuthOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setAuthOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* Search */
  const filteredSuggestions = searchQuery.length > 0
    ? SEARCH_SUGGESTIONS.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/case-search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileSearchOpen(false);
    }
  }, [searchQuery, router]);

  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : '';

  return (
    <header
      className="sticky top-0 z-[1000] w-full"
      style={{
        background: 'var(--chrome-bg)',
        borderBottom: '3px solid var(--gold)',
        height: 54,
      }}
      role="banner"
    >
      <div className="flex items-center h-[54px]" style={{ maxWidth: '100%' }}>

        {/* ── LEFT: Logo Zone (192px) ── */}
        <div
          className="flex items-center flex-shrink-0 h-full px-3"
          style={{
            width: 192,
            borderRight: '1px solid var(--chrome-active)',
          }}
        >
          <Link
            href="/"
            aria-label="MyCaseValue Advantage home"
            className="flex items-center gap-2 flex-shrink-0"
          >
            {/* Logo cube — gold background, navy mark */}
            <div
              style={{
                width: 28,
                height: 28,
                background: 'var(--gold)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="-100 -100 200 200"
              >
                <g transform="rotate(12)">
                  <polygon
                    points="0,0 -40,-69.3 40,-69.3 80,0"
                    fill="#1B2D45"
                    opacity="0.93"
                  />
                  <polygon
                    points="0,0 80,0 40,69.3 -40,69.3"
                    fill="#1B2D45"
                    opacity="0.65"
                  />
                  <polygon
                    points="0,0 -40,69.3 -80,0 -40,-69.3"
                    fill="#1B2D45"
                    opacity="0.38"
                  />
                </g>
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                style={{
                  fontFamily: 'var(--font-legal)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--card, #FFFFFF)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                MyCaseValue
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--chrome-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  lineHeight: 1,
                  marginTop: 1,
                }}
              >
                Advantage
              </span>
            </div>
          </Link>
        </div>

        {/* ── CENTER: Search Bar + "Advanced" Link ── */}
        <div className="flex-1 flex items-center gap-2 px-3 hidden md:flex" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative flex-1" style={{ maxWidth: 680 }}>
            <div className="flex items-center" style={{ height: 34, background: 'var(--card, #FFFFFF)', borderRadius: 2, overflow: 'hidden' }}>
              {/* Search input */}
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search cases, judges, districts, attorneys..."
                className="ignore-institutional"
                style={{
                  flex: 1,
                  height: 34,
                  background: 'var(--card, #FFFFFF)',
                  border: 'none',
                  padding: '0 12px',
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text2)',
                  outline: 'none',
                  borderRight: '1px solid var(--bdr)',
                }}
              />
              {/* Jurisdiction dropdown — RIGHT side of input per spec */}
              <div
                style={{
                  width: 145,
                  height: 34,
                  background: 'var(--sidebar, #F9F8F6)',
                  borderLeft: '1px solid var(--bdr)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  gap: 4,
                }}
              >
                <span style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text2)',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}>
                  All Jurisdictions
                </span>
                <span style={{ fontSize: 12, color: 'var(--text3)' }}>▾</span>
              </div>
              {/* Search button */}
              <button
                type="submit"
                style={{
                  width: 84,
                  height: 34,
                  background: 'var(--chrome-bg)',
                  color: 'var(--card, #FFFFFF)',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--chrome-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--chrome-bg)'; }}
              >
                <SearchIcon size={12} />
                Search
              </button>
            </div>

            {/* Autocomplete dropdown */}
            {searchFocused && filteredSuggestions.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--card)',
                  border: '1px solid var(--bdr-strong)',
                  borderTop: 'none',
                  borderRadius: '0 0 2px 2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 50,
                  maxHeight: 320,
                  overflowY: 'auto',
                }}
              >
                {filteredSuggestions.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => {
                      setSearchQuery('');
                      setSearchFocused(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      height: 38,
                      padding: '0 12px',
                      fontSize: 14,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--link)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--sidebar)',
                    }}
                    className="transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--tbl-hover)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                  >
                    {/* Type label */}
                    <span style={{
                      fontSize: 12,
                      color: 'var(--text4)',
                      width: 50,
                      flexShrink: 0,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      background: 'var(--sidebar)',
                      padding: '2px 4px',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}>
                      {s.type}
                    </span>
                    <span style={{ flex: 1 }}>{s.label}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--text3)',
                    }}></span>
                  </Link>
                ))}
                {/* Footer */}
                <div style={{
                  padding: '8px 12px',
                  fontSize: 12,
                  color: 'var(--text3)',
                  background: 'var(--sidebar)',
                  fontFamily: 'var(--font-ui)',
                }}>
                  Press Enter to search all results
                </div>
              </div>
            )}
          </form>
          {/* "Advanced" link — right of search button */}
          <Link
            href="/case-search"
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-sans, var(--font-ui))',
              color: 'var(--chrome-text-muted)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--chrome-text)'; e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--chrome-text-muted)'; e.currentTarget.style.textDecoration = 'none'; }}
          >
            Advanced
          </Link>
        </div>

        {/* ── RIGHT: Icons + Account Zone ── */}
        <div
          className="flex items-center h-full flex-shrink-0"
          style={{
            borderLeft: '1px solid var(--chrome-active)',
            padding: '0 14px',
          }}
        >
          {/* Nav icons — desktop only */}
          <div className="hidden lg:flex items-center gap-3.5" style={{ marginRight: 12 }}>
            {[
              { icon: <FoldersIcon />, label: 'Folders', href: '/dashboard' },
              { icon: <HistoryIcon />, label: 'History', href: '/dashboard' },
              { icon: <AlertsIcon />, label: 'Alerts', href: '/dashboard' },
              { icon: <HelpIcon />, label: 'Help', href: '/methodology' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  color: 'var(--chrome-text-muted)',
                  textDecoration: 'none',
                  opacity: 0.7,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
              >
                {item.icon}
                <span style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile search toggle */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 mr-2"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            aria-label="Search"
            style={{ color: 'var(--chrome-text-muted)' }}
          >
            <SearchIcon size={18} />
          </button>

          {/* Account section */}
          <div
            className="flex items-center h-full"
            style={{
              borderLeft: '1px solid var(--chrome-active)',
              paddingLeft: 12,
            }}
          >
            {userEmail ? (
              <div className="relative">
                <button
                  onClick={() => setAuthOpen(!authOpen)}
                  className="flex items-center gap-2"
                  style={{ cursor: 'pointer' }}
                  aria-expanded={authOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'var(--chrome-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--chrome-text-muted)',
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{
                    fontSize: 12,
                    color: 'var(--chrome-text-muted)',
                    fontFamily: 'var(--font-ui)',
                  }}>
                    {userEmail.split('@')[0]} ▾
                  </span>
                </button>
                {authOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 z-50"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--bdr-strong)',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      padding: '8px 12px',
                      borderBottom: '1px solid var(--bdr)',
                      fontSize: 12,
                      color: 'var(--text3)',
                      fontFamily: 'var(--font-ui)',
                    }}>
                      {userEmail}
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-[13px] transition-colors"
                      style={{ color: 'var(--text1)', fontFamily: 'var(--font-sans, var(--font-ui))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sidebar)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                      onClick={() => setAuthOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account"
                      className="block px-3 py-2 text-[13px] transition-colors"
                      style={{ color: 'var(--text1)', fontFamily: 'var(--font-sans, var(--font-ui))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sidebar)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                      onClick={() => setAuthOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => { setAuthOpen(false); handleSignOut(); }}
                      className="w-full text-left px-3 py-2 text-[13px] transition-colors"
                      style={{ color: 'var(--neg)', borderTop: '1px solid var(--bdr)', fontFamily: 'var(--font-sans, var(--font-ui))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sidebar)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--card, #FFFFFF)',
                    fontFamily: 'var(--font-ui)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  className="hidden sm:block"
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 28,
                    padding: '0 11px',
                    background: 'var(--gold)',
                    color: 'var(--card, #FFFFFF)',
                    borderRadius: 2,
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'var(--font-ui)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)'; }}
                >
                  Get Access
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar — slides down when toggled */}
      {mobileSearchOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--chrome-bg)',
            borderBottom: '1px solid var(--chrome-border)',
            padding: '8px 16px',
          }}
        >
          <form onSubmit={handleSearch} className="flex items-center" style={{ height: 34, borderRadius: 2, overflow: 'hidden' }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, judges, districts..."
              className="ignore-institutional"
              style={{
                flex: 1,
                height: 34,
                background: 'var(--card, #FFFFFF)',
                border: 'none',
                padding: '0 12px',
                fontSize: 12,
                fontFamily: 'var(--font-sans, var(--font-ui))',
                color: 'var(--text2)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                height: 34,
                padding: '0 14px',
                background: 'var(--chrome-bg)',
                color: 'var(--card, #FFFFFF)',
                border: 'none',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'var(--font-sans, var(--font-ui))',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <SearchIcon size={12} />
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
