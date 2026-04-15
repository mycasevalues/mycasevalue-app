'use client';

/**
 * WorkspaceShell — Layout wrapper that provides the persistent sidebar
 * + main content area for research pages.
 *
 * Used on: /cases, /judges, /districts, /attorney/*, /search, /dashboard,
 * /legal/*, /trends, /nos-explorer, /compare, /calculator, /map, /odds
 *
 * NOT used on: / (homepage), /pricing, /about, /faq, /contact, /sign-in,
 * /sign-up, /for/*, /how-it-works, /methodology, /press, /solutions/*
 */

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import WorkspaceSidebar from './WorkspaceSidebar';
import ResearchBreadcrumb from '../ui/ResearchBreadcrumb';

// Routes that should show the workspace sidebar
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
];

function isWorkspaceRoute(pathname: string): boolean {
  return WORKSPACE_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

export { isWorkspaceRoute };

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = isWorkspaceRoute(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <WorkspaceSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-12 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 rounded-lg"
            aria-label="Open navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-600 truncate">
            {getPageTitle(pathname)}
          </span>
        </div>

        {/* Research breadcrumb — desktop only */}
        <div className="hidden lg:block px-4 py-1 border-b border-gray-200 bg-gray-50">
          <ResearchBreadcrumb />
        </div>

        {/* Page content */}
        <div className="min-h-[calc(100vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Client component to conditionally hide footer on workspace routes */
export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname)) return null;
  return <>{children}</>;
}

/** Client component to conditionally hide beta banner on workspace routes */
export function ConditionalBanner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname)) return null;
  return <>{children}</>;
}

function getPageTitle(pathname: string): string {
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
