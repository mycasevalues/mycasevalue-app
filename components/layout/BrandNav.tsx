'use client'

/**
 * BrandNav — MyCaseValue primary navigation (v2 brand system)
 *
 * Integration notes for your existing stack:
 *
 * 1. AUTH: Replace `isAuthenticated` prop / placeholder with your existing
 *    Supabase auth check. You likely already have a useUser() hook or
 *    session from @supabase/auth-helpers-nextjs. Pass it down or use
 *    useSession() directly inside this component.
 *
 * 2. LINKS: Update href values to match your existing Next.js routes.
 *    Currently using placeholder paths like '/analyze', '/judges', etc.
 *
 * 3. STRIPE: The "Get started" CTA should point to your existing Stripe
 *    checkout flow / pricing page — update href accordingly.
 *
 * 4. ACTIVE STATE: Uses pathname matching via usePathname(). Works with
 *    your App Router setup out of the box.
 *
 * 5. MOBILE: Add a mobile menu drawer — not included here to keep this
 *    focused on desktop. Recommend Headless UI Dialog or Radix Sheet.
 *
 * Drop into: components/layout/BrandNav.tsx
 */

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoLockup } from '@/components/brand/LogoMark'
import { cn } from '@/lib/utils'

// ── TYPES ─────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href?: string
  caret?: boolean
  badge?: string
  dropdown?: DropdownColumn[]
}

interface DropdownColumn {
  heading: string
  links: { name: string; description: string; href: string }[]
}

interface BrandNavProps {
  /** Pass your Supabase session user — null if not authenticated */
  user?: { email: string; full_name?: string } | null
  /** Show announcement bar */
  showAnnouncement?: boolean
}

// ── NAV DATA ──────────────────────────────────────────────────────────────
// Update hrefs to match your existing routes

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Case Analytics',
    caret: true,
    dropdown: [
      {
        heading: 'Research Tools',
        links: [
          { name: 'Case Outcome Analysis',   description: 'Win rates, settlements, timelines by case type',   href: '/analyze' },
          { name: 'Settlement Evaluator',    description: 'Percentile ranges for your exact situation',        href: '/analyze/settlement' },
          { name: 'Win Rate Calculator',     description: 'Probability scoring by district & judge',           href: '/analyze/win-rate' },
        ],
      },
      {
        heading: 'Intelligence',
        links: [
          { name: 'Judge Profiles',          description: 'MTD denial rates, judicial favorability',          href: '/judges' },
          { name: 'District Benchmarks',     description: 'Compare all 95 federal districts',                  href: '/districts' },
          { name: 'AI Research Assistant',   description: 'Natural language case analysis · Beta',             href: '/ai-research' },
        ],
      },
      {
        heading: 'Data Access',
        links: [
          { name: 'Docket Search',           description: 'PACER + RECAP + CourtListener',                     href: '/dockets' },
          { name: 'Case Timeline Modeling',  description: 'Duration forecasting by case type',                  href: '/timeline' },
          { name: 'Bulk Data Export',        description: 'CSV, JSON, and REST API access',                     href: '/api-docs' },
        ],
      },
    ],
  },
  { label: 'Judge Intelligence', href: '/judges',    caret: false },
  { label: 'Settlement Data',    href: '/settlements', caret: false },
  { label: 'Docket Search',      href: '/dockets' },
  { label: 'AI Research',        href: '/ai-research', badge: 'BETA' },
  { label: 'Pricing',            href: '/pricing' },
]

const SECONDARY_NAV = [
  { label: 'Case Analytics',       href: '/analyze' },
  { label: 'Judge Intelligence',   href: '/judges' },
  { label: 'District Analysis',    href: '/districts' },
  { label: 'Settlement Explorer',  href: '/settlements' },
  { label: 'AI Research',          href: '/ai-research' },
  { label: 'Docket Tracker',       href: '/dockets' },
  { label: 'My Library',           href: '/library' }, // ← Supabase-gated route
]

// ── COMPONENTS ────────────────────────────────────────────────────────────

function AnnouncementBar({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="h-9 bg-brand-blue-pale border-b border-[#C4D8F0] flex items-center px-7 gap-2.5 text-xs">
      <span className="font-inter font-bold text-white bg-brand-blue rounded px-1.5 py-0.5 text-[9px] uppercase tracking-[0.07em] flex-shrink-0">
        New
      </span>
      <span className="font-inter text-brand-blue-deep">
        MyCaseValue AI Research Assistant now in beta — powered by PACER + Claude
      </span>
      <span className="font-inter font-semibold text-brand-blue cursor-pointer underline underline-offset-2 whitespace-nowrap">
        Learn more →
      </span>
      <div className="ml-auto flex items-center gap-5">
        {(['Documentation', 'Contact sales', 'API'] as const).map((label) => (
          <span key={label} className="font-inter font-medium text-brand-muted cursor-pointer text-[11px]">
            {label}
          </span>
        ))}
        <button
          onClick={onDismiss}
          className="text-brand-muted hover:text-brand-gray ml-2 font-medium leading-none"
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  )
}

function MegaMenu({ columns }: { columns: DropdownColumn[] }) {
  return (
    <div className="absolute top-[calc(100%+1px)] left-0 bg-white border border-brand-rule rounded-[10px] p-5 grid gap-0 min-w-[580px] z-50 shadow-[0_10px_36px_rgba(0,0,0,.12),_0_2px_8px_rgba(0,0,0,.06)]"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((col, i) => (
        <div
          key={col.heading}
          className={cn('pr-5', i > 0 && 'border-l border-brand-rule pl-5 pr-0')}
        >
          {/* Column eyebrow — Inter 600, 10px, +0.16em, uppercase, brand-blue */}
          <p className="font-inter font-semibold text-brand-blue uppercase tracking-[0.16em] text-[10px] mb-3 pb-2 border-b border-brand-rule">
            {col.heading}
          </p>
          {col.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-1.5 group"
            >
              <p className="font-inter font-medium text-brand-ink-2 text-[13px] group-hover:text-brand-blue transition-colors">
                {link.name}
              </p>
              <p className="font-inter text-brand-muted text-[11px] mt-0.5">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

function SecondaryNav() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-brand-rule flex items-center px-7 h-[38px] overflow-x-auto scrollbar-none">
      <div className="flex h-[38px] flex-1">
        {SECONDARY_NAV.map((item) => {
          const isOn = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center h-[38px] px-3.5 font-inter font-semibold text-[11px] uppercase tracking-[0.04em] whitespace-nowrap border-b-2 -mb-px transition-colors',
                isOn
                  ? 'text-brand-blue border-brand-blue'
                  : 'text-brand-muted border-transparent hover:text-brand-slate'
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Live indicator + timestamp */}
      <div className="ml-auto flex items-center gap-3 flex-shrink-0">
        <span className="flex items-center gap-1.5 bg-[#E7F3ED] border border-[#A7D4B8] rounded-full px-2.5 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#057642] animate-pulse" />
          <span className="font-inter font-semibold text-[#057642] text-[10px] tracking-[0.04em]">
            Live data
          </span>
        </span>
        <span className="font-mono text-brand-muted text-[10px]">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────

export function BrandNav({ user, showAnnouncement = true }: BrandNavProps) {
  const pathname = usePathname()
  const [announcementVisible, setAnnouncementVisible] = useState(showAnnouncement)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close dropdown on route change
  useEffect(() => { setActiveDropdown(null) }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Announcement bar */}
      {announcementVisible && (
        <AnnouncementBar onDismiss={() => setAnnouncementVisible(false)} />
      )}

      {/* Primary nav */}
      <nav
        ref={navRef}
        className="h-[62px] bg-white border-b border-brand-rule flex items-center px-7"
      >
        {/* Logo lockup */}
        <Link href="/" className="mr-7 flex-shrink-0">
          <LogoLockup size={30} />
        </Link>

        {/* Nav links */}
        <div className="flex flex-1 h-[62px]">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href ? pathname.startsWith(item.href) : activeDropdown === item.label
            const hasDropdown = Boolean(item.dropdown)

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown ? setActiveDropdown(item.label) : undefined}
                onMouseLeave={() => hasDropdown ? setActiveDropdown(null) : undefined}
              >
                {item.href && !hasDropdown ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 font-inter font-medium text-[13px] px-3 h-[62px] border-b-2 -mb-px whitespace-nowrap transition-colors',
                      isActive
                        ? 'text-brand-blue border-brand-blue'
                        : 'text-brand-slate border-transparent hover:text-brand-ink-2'
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="font-inter font-bold text-white bg-brand-blue rounded px-1.5 py-0.5 text-[8px] uppercase tracking-[0.05em] ml-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    className={cn(
                      'flex items-center gap-1 font-inter font-medium text-[13px] px-3 h-[62px] border-b-2 -mb-px whitespace-nowrap transition-colors',
                      isActive
                        ? 'text-brand-blue border-brand-blue'
                        : 'text-brand-slate border-transparent hover:text-brand-ink-2'
                    )}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    {item.caret && (
                      <span className="text-brand-muted text-[9px] mt-0.5">▾</span>
                    )}
                    {item.badge && (
                      <span className="font-inter font-bold text-white bg-brand-blue rounded px-1.5 py-0.5 text-[8px] uppercase tracking-[0.05em] ml-1">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}

                {/* Mega dropdown */}
                {hasDropdown && activeDropdown === item.label && item.dropdown && (
                  <MegaMenu columns={item.dropdown} />
                )}
              </div>
            )
          })}
        </div>

        {/* Right: auth-aware CTAs */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="font-inter font-medium text-[12px] text-brand-muted px-2 cursor-pointer">
            Documentation
          </span>

          {user ? (
            // ── AUTHENTICATED STATE ──
            // Update these links to match your existing auth/dashboard routes
            <>
              <Link
                href="/dashboard"
                className="font-inter font-semibold text-[13px] text-brand-blue bg-brand-blue-pale border border-[#C4D8F0] px-4 py-2 rounded-[8px] hover:bg-[#deeaf9] transition-colors"
              >
                Dashboard →
              </Link>
              {/* Optional: user avatar / account menu */}
            </>
          ) : (
            // ── UNAUTHENTICATED STATE ──
            <>
              <Link
                href="/sign-in"  // ← Updated to use existing auth route
                className="font-inter font-semibold text-[13px] text-brand-blue border border-brand-blue px-4 py-2 rounded-[8px] hover:bg-brand-blue-pale transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/pricing"  // ← Update to your Stripe checkout / pricing route
                className="font-inter font-semibold text-[13px] text-white bg-brand-blue px-5 py-2 rounded-[8px] shadow-brand-btn hover:bg-brand-blue-mid transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Secondary product nav — only show on app/product pages */}
      {/* Remove this condition if you want it on all pages */}
      {(pathname.startsWith('/analyze') ||
        pathname.startsWith('/judges') ||
        pathname.startsWith('/districts') ||
        pathname.startsWith('/settlements') ||
        pathname.startsWith('/ai-research') ||
        pathname.startsWith('/dockets') ||
        pathname.startsWith('/library')) && (
        <SecondaryNav />
      )}
    </header>
  )
}
