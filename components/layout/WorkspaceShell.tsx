'use client';

/**
 * WorkspaceShell — Unified product application shell.
 *
 * Renders the enterprise terminal-style layout for all product routes:
 * - Dark top command bar with persistent global search
 * - Collapsible left sidebar with product navigation
 * - Main workspace area for page content
 *
 * Public/marketing routes pass through without any shell.
 *
 * Product routes: /cases, /judges, /districts, /attorney/*, /search,
 * /dashboard, /legal/*, /trends, /nos-explorer, /compare, /calculator,
 * /map, /odds, /report, /results, /case-search, /case/*
 */

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Route Classification ──

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

function isFullScreenRoute(pathname: string): boolean {
  return pathname === '/terminal' || pathname.startsWith('/terminal/');
}

export { isWorkspaceRoute, isFullScreenRoute };

// ── Nav Items ──

const NAV_ITEMS = [
  { label: 'Terminal', href: '/terminal', icon: 'terminal' },
  { label: 'Search', href: '/case-search', icon: 'search' },
  { label: 'Cases', href: '/cases', icon: 'cases' },
  { label: 'Judges', href: '/judges', icon: 'judges' },
  { label: 'Districts', href: '/districts', icon: 'districts' },
  { label: 'Attorney', href: '/attorney', icon: 'attorney' },
  { label: 'Data', href: '/data-sources', icon: 'data' },
];

function NavIcon({ type, size = 14 }: { type: string; size?: number }) {
  const s = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'terminal': return <svg {...s}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
    case 'search': return <svg {...s}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
    case 'cases': return <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
    case 'judges': return <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
    case 'districts': return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
    case 'attorney': return <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'data': return <svg {...s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="1"/></svg>;
  }
}

// ── Main Shell ──

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProduct = isWorkspaceRoute(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // On mobile, collapse sidebar by default
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  // Public routes: pass through with no shell
  if (!isProduct) {
    return <>{children}</>;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/case-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0f1117' }}>
      {/* ── TOP COMMAND BAR ── */}
      <div className="flex-shrink-0 h-11 flex items-center gap-3 px-3 border-b" style={{ background: '#161822', borderColor: '#252833' }}>
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/5 text-gray-400 transition-colors lg:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-sm font-bold text-white tracking-tight flex-shrink-0">
          MCV<span className="text-blue-400">.</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl flex items-center gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search cases, dockets, parties..."
              className="w-full h-7 pl-8 pr-3 rounded text-xs text-white placeholder:text-gray-500 border outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
              style={{ background: '#1e2030', borderColor: '#303347' }}
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/terminal" className="h-7 px-2.5 rounded text-[10px] font-medium text-gray-400 border hover:text-blue-400 hover:border-blue-500/30 transition-colors flex items-center gap-1" style={{ borderColor: '#303347' }}>
            <NavIcon type="terminal" size={11} />
            <span className="hidden sm:inline">Terminal</span>
          </Link>
          <Link href="/pricing" className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors hidden md:block">
            Pricing
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT SIDEBAR ── */}
        <div
          className={`flex-shrink-0 border-r overflow-y-auto transition-all duration-200 ${sidebarOpen ? 'w-44' : 'w-0 lg:w-12'}`}
          style={{ background: '#161822', borderColor: '#252833' }}
        >
          <nav className="py-2">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-1.5 mx-1 rounded text-xs transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`}
                >
                  <NavIcon type={item.icon} size={13} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom links */}
          {sidebarOpen && (
            <div className="mt-auto pt-4 px-3 pb-3 border-t" style={{ borderColor: '#252833' }}>
              <Link href="/" className="block text-[10px] text-gray-500 hover:text-gray-300 transition-colors py-1">
                Home
              </Link>
              <Link href="/about" className="block text-[10px] text-gray-500 hover:text-gray-300 transition-colors py-1">
                About
              </Link>
              <Link href="/methodology" className="block text-[10px] text-gray-500 hover:text-gray-300 transition-colors py-1">
                Methodology
              </Link>
            </div>
          )}
        </div>

        {/* ── MAIN WORKSPACE ── */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#12141d' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Conditional Components (used in root layout) ──

/** Hide footer on product + fullscreen routes */
export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Hide banner on product + fullscreen routes */
export function ConditionalBanner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Hide global header on product + fullscreen routes (product shell has its own) */
export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}
