'use client';

/**
 * WorkspaceSidebar — Persistent left navigation for the research workspace.
 * Replaces mega-menu navigation for authenticated/research pages.
 *
 * Sections:
 * 1. Search (always at top)
 * 2. Research Hub (Cases, Judges, Districts, Documents)
 * 3. Tools (grouped attorney tools)
 * 4. Workspace (saved searches, projects)
 * 5. Account
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useResearchStore } from '@/store/research';
import { useWorkspaceStore } from '@/store/workspace';

interface NavItem {
  label: string;
  href: string;
  icon: string; // SVG path
}

interface NavSection {
  title: string;
  items: NavItem[];
  collapsible?: boolean;
}

// ── SVG icon paths (24x24 viewBox) ──
const ICONS = {
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  cases: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  judges: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  districts: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  documents: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  predictor: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  demand: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  calculator: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  venue: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  workspace: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  help: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  chevron: 'M19 9l-7 7-7-7',
  pricing: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  trends: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
};

const RESEARCH_NAV: NavSection = {
  title: 'Research',
  items: [
    { label: 'Cases', href: '/cases', icon: ICONS.cases },
    { label: 'Judges', href: '/judges', icon: ICONS.judges },
    { label: 'Districts', href: '/districts', icon: ICONS.districts },
    { label: 'Legal Documents', href: '/legal/search', icon: ICONS.documents },
    { label: 'Compare', href: '/compare', icon: ICONS.trends },
    { label: 'Calculator', href: '/calculator', icon: ICONS.calculator },
  ],
};

const TOOLS_NAV: NavSection = {
  title: 'Attorney Tools',
  collapsible: true,
  items: [
    { label: 'Case Predictor', href: '/attorney/case-predictor', icon: ICONS.predictor },
    { label: 'Judge Intelligence', href: '/attorney/judge-intelligence', icon: ICONS.judges },
    { label: 'Venue Optimizer', href: '/attorney/venue-optimizer', icon: ICONS.venue },
    { label: 'Demand Letter', href: '/attorney/demand-letter', icon: ICONS.demand },
    { label: 'Bulk Analysis', href: '/attorney/bulk-analysis', icon: ICONS.calculator },
    { label: 'Court Rules', href: '/attorney/court-rules', icon: ICONS.documents },
    { label: 'All Tools', href: '/attorney', icon: ICONS.settings },
  ],
};

const MORE_NAV: NavSection = {
  title: 'More',
  collapsible: true,
  items: [
    { label: 'Trends', href: '/trends', icon: ICONS.trends },
    { label: 'NOS Explorer', href: '/nos-explorer', icon: ICONS.cases },
    { label: 'Win Rate Map', href: '/map', icon: ICONS.districts },
    { label: 'Case Odds', href: '/odds', icon: ICONS.predictor },
    { label: 'Dashboard', href: '/dashboard', icon: ICONS.workspace },
  ],
};

function SidebarIcon({ path, size = 18 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d={path} />
    </svg>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-blue-50 text-brand-blue font-semibold'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <SidebarIcon path={item.icon} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function NavSectionGroup({ section }: { section: NavSection }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="mb-1">
      <button
        onClick={() => section.collapsible && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 ${
          section.collapsible ? 'hover:text-gray-600 cursor-pointer' : 'cursor-default'
        }`}
      >
        <span>{section.title}</span>
        {section.collapsible && (
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${isOpen ? '' : '-rotate-90'}`}
          >
            <path d={ICONS.chevron} />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="space-y-0.5">
          {section.items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkspaceSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { recentSearches } = useResearchStore();
  const { savedItems } = useWorkspaceStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, router]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full
          bg-white border-r border-gray-100
          transition-transform duration-200
          lg:relative lg:translate-x-0 lg:z-auto lg:h-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: '272px', minWidth: '272px', flexShrink: 0 }}
        role="navigation"
        aria-label="Workspace navigation"
      >
        <div className="flex flex-col h-full lg:h-[calc(100vh-120px)] lg:sticky lg:top-[80px] overflow-hidden">
          {/* Mobile only: Logo + Close */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 flex-shrink-0 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="-100 -100 200 200" className="flex-shrink-0">
                <rect x="-100" y="-100" width="200" height="200" rx="26" fill="#0966C3" />
                <g transform="rotate(12)">
                  <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
                  <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
                  <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
                </g>
              </svg>
              <span className="font-bold text-gray-900 text-sm">
                MyCase<span className="text-brand-blue">Value</span>
              </span>
            </Link>
            <button
              onClick={onToggle}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
              aria-label="Close sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-3 border-b border-gray-100 flex-shrink-0">
            <form onSubmit={handleSearch} role="search" aria-label="Search federal court records">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <SidebarIcon path={ICONS.search} size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases, judges..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                  aria-label="Search"
                />
              </div>
            </form>
            {/* Keyboard shortcut hint */}
            <div className="flex items-center gap-1 mt-1.5 px-1">
              <kbd className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 font-mono">⌘K</kbd>
              <span className="text-[10px] text-gray-400">to search</span>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
            <NavSectionGroup section={RESEARCH_NAV} />
            <NavSectionGroup section={TOOLS_NAV} />
            <NavSectionGroup section={MORE_NAV} />

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="mb-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Recent
                </div>
                <div className="space-y-0.5">
                  {recentSearches.slice(0, 5).map((search, i) => (
                    <Link
                      key={i}
                      href={`/search?q=${encodeURIComponent(search.query)}`}
                      className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-gray-400">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate text-xs">{search.query}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="mb-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Saved ({savedItems.length})
                </div>
                <div className="space-y-0.5">
                  {savedItems.slice(0, 5).map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 text-brand-blue">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <span className="truncate text-xs block">{item.label}</span>
                        {item.sublabel && <span className="truncate text-[10px] text-gray-400 block">{item.sublabel}</span>}
                      </div>
                    </Link>
                  ))}
                  {savedItems.length > 5 && (
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-brand-blue hover:bg-blue-50 transition-colors">
                      View all {savedItems.length} saved →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom section: Pricing + Help */}
          <div className="flex-shrink-0 border-t border-gray-100 px-2 py-3 space-y-0.5">
            <NavLink
              item={{ label: 'Pricing', href: '/pricing', icon: ICONS.pricing }}
              isActive={pathname === '/pricing'}
            />
            <NavLink
              item={{ label: 'Help & Methodology', href: '/methodology', icon: ICONS.help }}
              isActive={pathname === '/methodology'}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
