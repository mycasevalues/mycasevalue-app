'use client';

/**
 * WorkspaceShell — Product layout wrapper.
 *
 * Product routes get: compact top bar + left sidebar + main content area.
 * Public routes get: pass-through (standard Header/Footer from root layout).
 * Terminal route: has its own full-screen dark layout.
 *
 * This shell is intentionally LIGHT to match existing page content.
 * The /terminal route provides the dark enterprise experience separately.
 */

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Route Classification ──

const WORKSPACE_ROUTES = [
  '/cases', '/judges', '/districts', '/attorney', '/search',
  '/dashboard', '/legal', '/trends', '/nos-explorer', '/compare',
  '/calculator', '/map', '/odds', '/report', '/results', '/sample',
  '/account', '/settings', '/glossary', '/case-search', '/case',
];

function isWorkspaceRoute(pathname: string): boolean {
  return WORKSPACE_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));
}

function isFullScreenRoute(pathname: string): boolean {
  return pathname === '/terminal' || pathname.startsWith('/terminal/');
}

export { isWorkspaceRoute, isFullScreenRoute };

// ── Nav ──

const NAV = [
  { label: 'Search', href: '/case-search', icon: 'M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z' },
  { label: 'Cases', href: '/cases', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6' },
  { label: 'Judges', href: '/judges', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z' },
  { label: 'Districts', href: '/districts', icon: 'M3 3h18v18H3zM3 9h18M9 21V9' },
  { label: 'Attorney', href: '/attorney', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
];

// ── Shell ──

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProduct = isWorkspaceRoute(pathname);
  const [query, setQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isProduct) return <>{children}</>;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* ── TOP BAR ── */}
      <div className="flex-shrink-0 h-12 flex items-center gap-3 px-4 bg-white border-b border-gray-200">
        {/* Logo */}
        <Link href="/" className="text-sm font-bold text-gray-900 tracking-tight flex-shrink-0">
          MyCase<span className="text-brand-blue">Value</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 hidden sm:block" />

        {/* Search */}
        <form
          onSubmit={e => { e.preventDefault(); if (query.trim()) router.push(`/case-search?q=${encodeURIComponent(query)}`); }}
          className="flex-1 max-w-lg"
        >
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search cases, judges, districts..."
              className="w-full h-8 pl-8 pr-3 rounded-md text-sm border border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
            />
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/terminal" className="text-xs text-gray-500 hover:text-brand-blue transition-colors hidden md:block">
            Terminal
          </Link>
          <Link href="/pricing" className="text-xs text-gray-500 hover:text-brand-blue transition-colors hidden md:block">
            Pricing
          </Link>
          <Link href="/sign-in" className="text-xs text-gray-500 hover:text-brand-blue transition-colors">
            Sign In
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT SIDEBAR ── */}
        <div className={`flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block ${sidebarCollapsed ? 'w-12' : 'w-44'}`}>
          <nav className="py-3 space-y-0.5">
            {NAV.map(item => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? 'bg-brand-blue/5 text-brand-blue'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d={item.icon} />
                  </svg>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {!sidebarCollapsed && (
            <div className="mt-4 mx-2 pt-3 border-t border-gray-100">
              <Link href="/data-sources" className="block px-2.5 py-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors">Data Sources</Link>
              <Link href="/methodology" className="block px-2.5 py-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors">Methodology</Link>
              <Link href="/about" className="block px-2.5 py-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors">About</Link>
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Conditional wrappers (used in root layout) ──

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

export function ConditionalBanner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}
