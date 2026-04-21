'use client';

/**
 * BrowseNav.tsx — Westlaw Precision second navigation bar
 *
 * Height: 40px
 * Background: var(--chrome-bg-dark) = #121F32
 * Border-bottom: 1px solid #1A2E48
 *
 * Items: Home | Cases | Judges | Districts |
 *        Calculator | Attorney Tools [AI badge] | Methodology
 * Right-aligned: My Research
 *
 * Active item: color white, border-bottom: 3px solid var(--gold)
 * Inactive: color var(--chrome-text-muted)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ThemeToggle';

/* ── Route → active section mapping ── */

function getActiveSection(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/districts') || pathname.startsWith('/cases') || pathname.startsWith('/search') || pathname.startsWith('/nos-explorer')) return 'court';
  if (pathname.startsWith('/judges')) return 'judges';
  if (pathname.startsWith('/analytics') || pathname.startsWith('/trends') || pathname.startsWith('/compare') || pathname.startsWith('/map')) return 'districts';
  if (pathname.startsWith('/attorney')) return 'tools';
  if (pathname.startsWith('/calculator')) return 'settlement';
  // /about is a company/mission page, not a methodology page — don't highlight
  // the Methodology tab when on /about. (Glossary is still rolled up under
  // Methodology since they're conceptually the same "how the data works" cohort.)
  if (pathname.startsWith('/methodology') || pathname.startsWith('/glossary')) return 'guidance';
  if (pathname.startsWith('/account') || pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) return 'saved';
  return '';
}

/* ── Nav item definition ── */

interface BrowseNavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface BrowseNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  rightAlign?: boolean;
  separator?: boolean;
  /** When present, renders as a dropdown trigger instead of a plain link. */
  dropdown?: BrowseNavDropdownItem[];
}

const TOOLS_DROPDOWN: BrowseNavDropdownItem[] = [
  { label: 'Advanced Search', href: '/attorney/advanced-search', description: 'Multi-field case query' },
  { label: 'Citation Check', href: '/attorney/citation-check', description: 'Validate case citations' },
  { label: 'Secondary Sources', href: '/attorney/secondary-sources', description: 'Treatises & practice guides' },
  { label: '50-State Survey', href: '/attorney/state-survey', description: 'Compare state law' },
  { label: 'Compare Text', href: '/attorney/compare-text', description: 'Diff two documents' },
  { label: 'Alerts', href: '/attorney/alerts', description: 'Monitor case activity' },
  { label: 'Research Folders', href: '/attorney/folders', description: 'Organize saved work' },
  { label: 'Find & Print', href: '/attorney/find-print', description: 'Export research' },
];

const NAV_ITEMS: BrowseNavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: '_sep1', label: '', href: '', separator: true },
  { id: 'court', label: 'Cases', href: '/cases' },
  { id: 'judges', label: 'Judges', href: '/judges' },
  { id: 'districts', label: 'Districts', href: '/districts' },
  { id: 'settlement', label: 'Calculator', href: '/calculator' },
  { id: '_sep2', label: '', href: '', separator: true },
  { id: 'tools', label: 'Tools', href: '/attorney', badge: 'AI', dropdown: TOOLS_DROPDOWN },
  { id: 'guidance', label: 'Methodology', href: '/methodology' },
  { id: '_sep3', label: '', href: '', separator: true },
  { id: 'saved', label: 'My Research', href: '/dashboard', rightAlign: true },
];

/* ── BrowseNav Component ── */

export default function BrowseNav() {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = NAV_ITEMS.filter((item) => !item.separator);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-browse-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  const scheduleClose = (id: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown((prev) => (prev === id ? null : prev));
    }, 120);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  return (
    <>
      {/* Desktop nav — unchanged */}
      <nav
        className="w-full hidden md:flex"
        style={{
          height: 40,
          background: 'var(--chrome-bg-dark)',
          borderBottom: '1px solid var(--chrome-border, #2A3F58)',
        }}
        aria-label="Browse navigation"
      >
        <div
          className="flex items-stretch w-full"
          style={{ maxWidth: '100%', padding: '0 4px' }}
        >
          {NAV_ITEMS.map((item) => {
            if (item.separator) {
              return (
                <div
                  key={item.id}
                  style={{
                    width: 1,
                    background: 'var(--chrome-border, #2A3F58)',
                    margin: '8px 0',
                    flexShrink: 0,
                  }}
                />
              );
            }

            const isActive = activeSection === item.id;

            if (item.dropdown) {
              const isOpen = openDropdown === item.id;
              return (
                <div
                  key={item.id}
                  data-browse-dropdown
                  style={{ position: 'relative', display: 'flex', alignItems: 'stretch', ...(item.rightAlign ? { marginLeft: 'auto' } : {}) }}
                  onMouseEnter={() => { cancelClose(); setOpenDropdown(item.id); }}
                  onMouseLeave={() => scheduleClose(item.id)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : item.id)}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className="flex items-center"
                    style={{
                      padding: '0 14px',
                      fontSize: 12,
                      fontFamily: 'var(--font-sans, var(--font-ui))',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive || isOpen ? 'var(--chrome-text)' : 'var(--chrome-text-muted)',
                      cursor: 'pointer',
                      borderBottom: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      background: isOpen ? 'rgba(255,255,255,0.04)' : 'transparent',
                      border: 'none',
                      transition: 'color 150ms ease, background 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !isOpen) {
                        e.currentTarget.style.color = '#D0E8F8';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !isOpen) {
                        e.currentTarget.style.color = 'var(--chrome-text-muted)';
                        e.currentTarget.style.background = '';
                      }
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        style={{
                          background: 'var(--gold)',
                          color: 'var(--card, #FFFFFF)',
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 2,
                          padding: '2px 4px',
                          marginLeft: 4,
                          lineHeight: '14px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.8 }}>▾</span>
                  </button>
                  {isOpen && (
                    <div
                      role="menu"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        minWidth: 280,
                        background: 'var(--card, #FFFFFF)',
                        border: '1px solid var(--bdr-strong, #D4D2CC)',
                        borderRadius: 2,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                        padding: '6px 0',
                        zIndex: 60,
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '8px 14px',
                            textDecoration: 'none',
                            color: 'var(--text1, #333333)',
                            fontFamily: 'var(--font-sans, var(--font-ui))',
                            fontSize: 12,
                            transition: 'background 120ms ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--tbl-hover, #EBF5FF)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                        >
                          <span style={{ fontWeight: 600, color: 'var(--link, #1A73E8)' }}>{sub.label}</span>
                          {sub.description && (
                            <span style={{ fontSize: 12, color: 'var(--text3, #6B7280)', marginTop: 2 }}>
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center"
                style={{
                  padding: '0 14px',
                  fontSize: 12,
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                  fontWeight: isActive ? 600 : 400,
                  // Active tab text on the dark navy chrome bar should always be
                  // white — --chrome-text is #FFFFFF in both light and dark modes.
                  // (Using --card here broke in dark mode where --card is #242424.)
                  color: isActive ? 'var(--chrome-text)' : 'var(--chrome-text-muted)',
                  cursor: 'pointer',
                  borderBottom: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'color 150ms ease, background 150ms ease',
                  ...(item.rightAlign ? { marginLeft: 'auto' } : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#D0E8F8';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--chrome-text-muted)';
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--card, #FFFFFF)',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 2,
                      padding: '2px 4px',
                      marginLeft: 4,
                      lineHeight: '14px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          {/* Theme toggle — right side of browse nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderLeft: '1px solid var(--chrome-border, #2A3F58)',
              marginLeft: 4,
              paddingLeft: 4,
              flexShrink: 0,
            }}
          >
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile nav — visible below md (768px) */}
      <nav
        className="md:hidden"
        style={{
          background: 'var(--chrome-bg-dark, #121F32)',
          borderBottom: '1px solid var(--chrome-border, #2A3F58)',
          position: 'relative',
        }}
        aria-label="Mobile browse navigation"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="browse-nav-mobile-menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              height: 44,
              padding: '0 16px',
              background: 'transparent',
              border: 'none',
              color: 'var(--chrome-text-muted, #8AAAC8)',
              fontSize: 14,
              fontFamily: 'var(--font-sans, var(--font-ui))',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{mobileOpen ? '\u2715' : '\u2630'}</span>
            <span>Browse</span>
          </button>
          <div style={{ paddingRight: 8 }}>
            <ThemeToggle />
          </div>
        </div>

        {mobileOpen && (
          <div
            id="browse-nav-mobile-menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--chrome-bg-dark, #121F32)',
              borderTop: '1px solid var(--chrome-border, #2A3F58)',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;

              if (item.dropdown) {
                return (
                  <div key={item.id}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        minHeight: 36,
                        padding: '6px 20px 2px',
                        fontSize: 12,
                        fontFamily: 'var(--font-sans, var(--font-ui))',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: 'var(--chrome-text-muted, #8AAAC8)',
                      }}
                    >
                      {item.label}
                      {item.badge && (
                        <span
                          style={{
                            background: 'var(--gold)',
                            color: 'var(--card, #FFFFFF)',
                            fontSize: 12,
                            fontWeight: 700,
                            borderRadius: 2,
                            padding: '1px 4px',
                            lineHeight: '14px',
                            letterSpacing: 0,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block',
                          minHeight: 44,
                          padding: '10px 20px 10px 32px',
                          fontSize: 14,
                          fontFamily: 'var(--font-sans, var(--font-ui))',
                          color: 'var(--chrome-text-muted, #8AAAC8)',
                          textDecoration: 'none',
                          borderLeft: '3px solid transparent',
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    minHeight: 44,
                    padding: '0 20px',
                    fontSize: 14,
                    fontFamily: 'var(--font-sans, var(--font-ui))',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--card, #FFFFFF)' : 'var(--chrome-text-muted, #8AAAC8)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '3px solid var(--gold, #C4882A)' : '3px solid transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        background: 'var(--gold)',
                        color: 'var(--card, #FFFFFF)',
                        fontSize: 12,
                        fontWeight: 700,
                        borderRadius: 2,
                        padding: '2px 4px',
                        lineHeight: '14px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
