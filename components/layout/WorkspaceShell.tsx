'use client';

/**
 * WorkspaceShell — Westlaw Precision workspace layout wrapper
 *
 * Provides the persistent sidebar (results mode) + context bar + footer
 * for all workspace/research routes.
 *
 * Two rendering modes:
 * 1. LISTING pages (/cases, /judges, /districts, /attorney, /search, etc.):
 *    WorkspaceSidebar (258px) | Context bar + main content + WorkspaceFooter
 * 2. DETAIL pages (/districts/[code], /judges/[id], /case/[id]):
 *    Children render their own three-column layout (TOC | Main | Right rail).
 *    WorkspaceShell just provides: Context bar + children + WorkspaceFooter.
 *    No WorkspaceSidebar — detail pages embed their own.
 *
 * Used on: /cases, /judges, /districts, /attorney/*, /search, /dashboard,
 * /legal/*, /trends, /nos-explorer, /compare, /calculator, /map, /odds,
 * /case-search, /case/*
 *
 * NOT used on: / (homepage), /pricing, /about, /faq, /contact, /sign-in,
 * /sign-up, /for/*, /how-it-works, /methodology, /press, /solutions/*,
 * /terminal (has its own full-screen layout)
 *
 * Dual nav: Header 54px + BrowseNav 40px = 94px total top offset
 */

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceFooter from './WorkspaceFooter';

// Routes that should show the workspace shell
const WORKSPACE_ROUTES = [
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
  '/case-search',
  '/case',
];

function isWorkspaceRoute(pathname: string): boolean {
  return WORKSPACE_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

/** Terminal uses its own full-screen layout */
function isFullScreenRoute(pathname: string): boolean {
  return pathname === '/terminal' || pathname.startsWith('/terminal/');
}

/**
 * Detail pages have their own embedded three-column layout (TOC | Main | Rail).
 * WorkspaceShell should NOT render WorkspaceSidebar for these — it would double up.
 */
function isDetailPage(pathname: string): boolean {
  // /districts/[code] — has embedded three-column layout (Session 8)
  if (/^\/districts\/[A-Za-z]+/.test(pathname)) return true;
  // /judges/[id] — has embedded three-column layout (Session 9)
  if (/^\/judges\/[^/]+$/.test(pathname) && pathname !== '/judges') return true;
  // /case/[id] — detail view
  if (/^\/case\/[^/]+$/.test(pathname) && pathname !== '/case') return true;
  return false;
}

export { isWorkspaceRoute, isFullScreenRoute };

/* ── Breadcrumb helper ── */

interface Crumb {
  label: string;
  href: string;
}

function pathToCrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'cases') {
    crumbs.push({ label: 'Cases', href: '/cases' });
    if (segments[1]) {
      const catLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: catLabel, href: `/cases/${segments[1]}` });
      if (segments[2]) {
        const slugLabel = segments[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        crumbs.push({ label: slugLabel, href: `/cases/${segments[1]}/${segments[2]}` });
      }
    }
  } else if (segments[0] === 'judges') {
    crumbs.push({ label: 'Federal Judges', href: '/judges' });
    if (segments[1]) crumbs.push({ label: 'Judge Profile', href: pathname });
  } else if (segments[0] === 'districts') {
    crumbs.push({ label: 'Federal Districts', href: '/districts' });
    if (segments[1]) crumbs.push({ label: segments[1].toUpperCase(), href: pathname });
  } else if (segments[0] === 'attorney') {
    crumbs.push({ label: 'Attorney Tools', href: '/attorney' });
    if (segments[1]) {
      const toolLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: toolLabel, href: `/attorney/${segments[1]}` });
    }
  } else if (segments[0] === 'search' || segments[0] === 'case-search') {
    crumbs.push({ label: 'Search', href: `/${segments[0]}` });
  } else if (segments[0] === 'legal') {
    crumbs.push({ label: 'Legal Research', href: '/legal' });
    if (segments[1]) {
      const subLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: subLabel, href: `/legal/${segments[1]}` });
    }
  } else if (segments[0] === 'dashboard') {
    crumbs.push({ label: 'Dashboard', href: '/dashboard' });
  } else if (segments.length > 0) {
    const label = segments[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label, href: `/${segments[0]}` });
  }

  return crumbs;
}

/* ── Context Bar ── */

function ContextBar({ pathname }: { pathname: string }) {
  const crumbs = pathToCrumbs(pathname);
  if (crumbs.length <= 1) return null;

  return (
    <div
      style={{
        height: 32,
        display: 'flex',
        alignItems: 'center',
        background: 'var(--surf, #FFFFFF)',
        borderBottom: '1px solid var(--bdr, #E5E7EB)',
        padding: '0 16px',
        overflow: 'hidden',
      }}
    >
      <nav
        aria-label="Research breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && (
              <span style={{ color: 'var(--text4, #8A8780)', fontSize: 12 }}>›</span>
            )}
            {i === crumbs.length - 1 ? (
              <span style={{ color: 'var(--text1, #333333)', fontWeight: 500 }}>{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                style={{
                  color: 'var(--link, #1A73E8)',
                  textDecoration: 'none',
                  transition: 'color 120ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--link-hover, #1557B0)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--link, #1A73E8)'; }}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}

/* ── Page title helper for mobile ── */

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/case-search')) return 'Case Search';
  if (pathname.startsWith('/case/')) return 'Case Detail';
  if (pathname.startsWith('/cases')) return 'Cases';
  if (pathname.startsWith('/judges')) return 'Judges';
  if (pathname.startsWith('/districts')) return 'Districts';
  if (pathname.startsWith('/attorney')) return 'Attorney Tools';
  if (pathname.startsWith('/search')) return 'Search';
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/legal')) return 'Legal Research';
  if (pathname.startsWith('/trends')) return 'Trends';
  if (pathname.startsWith('/nos-explorer')) return 'NOS Explorer';
  if (pathname.startsWith('/compare')) return 'Compare';
  if (pathname.startsWith('/calculator')) return 'Calculator';
  if (pathname.startsWith('/map')) return 'Map';
  return 'MyCaseValue';
}

/* ── Main Component ── */

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showWorkspace = isWorkspaceRoute(pathname);
  const detail = useMemo(() => isDetailPage(pathname), [pathname]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!showWorkspace) {
    return <>{children}</>;
  }

  /* ── Detail pages: no WorkspaceSidebar, pages have own three-column layout ── */
  if (detail) {
    return (
      <div style={{ minHeight: 'calc(100vh - 94px)' }}>
        <ContextBar pathname={pathname} />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <WorkspaceFooter />
      </div>
    );
  }

  /* ── Listing pages: WorkspaceSidebar + context bar + content ── */
  return (
    <div className="flex">
      <WorkspaceSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile sidebar toggle */}
        <div
          className="lg:hidden sticky z-30 flex items-center gap-3 px-4"
          style={{
            top: 94,
            height: 40,
            background: 'var(--card, #FFFFFF)',
            borderBottom: '1px solid var(--bdr, #E5E7EB)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              padding: 6,
              marginLeft: -6,
              color: 'var(--text2, #525252)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Open navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text1, #333333)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {getPageTitle(pathname)}
          </span>
        </div>

        {/* Context bar — desktop */}
        <div className="hidden lg:block">
          <ContextBar pathname={pathname} />
        </div>

        {/* Page content */}
        <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 126px)' }}>
          <div className="flex-1">
            {children}
          </div>
          <WorkspaceFooter />
        </div>
      </div>
    </div>
  );
}

/** Client component to conditionally hide footer on workspace/fullscreen routes */
export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Client component to conditionally hide beta banner on workspace/fullscreen routes */
export function ConditionalBanner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Client component to conditionally hide header on fullscreen routes only */
export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}
