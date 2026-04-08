/**
 * MyCaseValue Homepage — app/(marketing)/page.tsx
 *
 * This is the full marketing landing page using the v2 brand system.
 *
 * Integration checklist before going live:
 *
 * ✅ Auth     — Replace `user` prop stub with your Supabase session check.
 *              Use createServerComponentClient() in server components.
 *
 * ✅ Search   — Wire the search bar to your existing CourtListener/PACER
 *              search route: POST /api/search or your existing endpoint.
 *
 * ✅ Pricing  — Update "Analyze your case" CTA to your Stripe checkout.
 *              Currently points to /pricing — update to /checkout if needed.
 *
 * ✅ Stats    — Pull live counts from your Supabase DB or API instead of
 *              hardcoded values. See StatBar HOMEPAGE_STATS export.
 *
 * ✅ Trust    — Replace avatar initials + count with real Supabase user count
 *              fetched server-side.
 *
 * ✅ AI       — "AI Research" link/section points to /ai-research — make sure
 *              this is connected to your Anthropic integration.
 */

import type { Metadata } from 'next';
import React from 'react'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site-config'
import { LogoMark } from '@/components/brand/LogoMark'
import { StatBar, HOMEPAGE_STATS } from '@/components/ui/StatCardBrand'

export const metadata: Metadata = {
  title: 'Federal Court Analytics & Settlement Data',
  description: 'Research real outcomes from 5.1M+ federal court cases. Win rates, settlement data, timelines for 84 case types across 94 districts.',
  openGraph: {
    title: 'Federal Court Analytics & Settlement Data',
    description: 'Research real outcomes from 5.1M+ federal court cases. Win rates, settlement data, timelines for 84 case types across 94 districts.',
    url: `${SITE_URL}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Analytics & Settlement Data',
    description: 'Research real outcomes from 5.1M+ federal court cases. Win rates, settlement data, timelines for 84 case types across 94 districts.',
  },
};
// ── TYPES ──────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode
  title: string
  body: string
}

interface PlatformSection {
  eyebrow: string
  title: string
  body: string
  href: string
  cta: string
}

// ── DATA ───────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Win Rate Analytics',
    body:  'Case outcome rates by case type, circuit, district, and judge — filtered to your exact situation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Settlement Intelligence',
    body:  'Full percentile distributions — 10th through 90th — so you know where any offer stands in real data.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-1a8 8 0 0116 0v1" />
      </svg>
    ),
    title: 'Judge Intelligence',
    body:  'MTD denial rates, time-to-trial, and judicial favorability for 8,400+ federal judges nationwide.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
    title: 'District Benchmarks',
    body:  'Compare all 94 federal districts by settlement culture, filing velocity, and case outcomes.',
  },
]

const PLATFORM_SECTIONS: PlatformSection[] = [
  {
    eyebrow: 'Research Intelligence',
    title:   'Case Outcome Analytics',
    body:    '5.1M+ indexed federal outcomes — settlement percentiles, win rates, and durations across every case type and district.',
    href:    '/search',
    cta:     'Explore analytics',
  },
  {
    eyebrow: 'Judicial Intelligence',
    title:   'Judge & Court Profiling',
    body:    'Judicial favorability scores, MTD denial rates, and decision patterns for 8,400+ federal judges nationwide.',
    href:    '/judges',
    cta:     'Search judges',
  },
  {
    eyebrow: 'AI-Powered · Beta',
    title:   'Research Assistant',
    body:    'Ask in plain language. Get case-specific intelligence grounded in real PACER docket data with full source citations.',
    href:    '/attorney',
    cta:     'Explore Attorney Tools',
  },
]

const BRAND_VOICE = [
  { title: 'Precise',     body: 'Data first. Every claim backed by a case count. No vague estimates.' },
  { title: 'Plain',       body: 'Legal jargon translated into dollars and timelines. Anyone can understand.' },
  { title: 'Trustworthy', body: '100% public records. No proprietary data, no black boxes. Fully auditable.' },
  { title: 'Confident',   body: "Direct answers. Not 'it depends' — actual numbers, actual ranges." },
]

const DATA_SOURCES = ['PACER', 'CourtListener', 'FJC IDB', 'RECAP']
const COMPLIANCE   = ['SOC 2 Type II', 'CCPA compliant', 'Public records only', 'No attorney required']

// ── HERO SECTION ───────────────────────────────────────────────────────────

function HeroLeft() {
  return (
    <div className="bg-brand-surface px-4 md:px-7 py-8 md:py-[52px] flex flex-col justify-center md:border-r border-brand-rule">
      {/* Eyebrow — Inter 600, 10px, +0.16em, uppercase, brand-blue */}
      <span className="font-inter font-semibold text-brand-blue uppercase tracking-[0.16em] text-[10px] block mb-3">
        Federal Court Intelligence Platform
      </span>

      {/* H1 — Plus Jakarta Sans 800, 36px, -1.2px, LH 1.1 */}
      <h1 className="font-jakarta font-extrabold text-[36px] tracking-[-1.2px] leading-[1.1] text-brand-ink mb-3.5">
        Start Researching Today<br />
        before{' '}
        <em className="not-italic text-brand-blue">they make the offer.</em>
      </h1>

      {/* Body — Inter 400, 15px, LH 1.7, slate */}
      <p className="font-inter text-[15px] leading-[1.7] text-brand-slate max-w-[380px] mb-6">
        The{' '}
        <strong className="font-semibold text-brand-ink-2">
          same outcome data, judge analytics, and settlement intelligence
        </strong>{' '}
        that billion-dollar litigation firms pay thousands for — indexed across 5.1 million real federal cases.
      </p>

      {/* Search form */}
      <form
        action="/search"
        method="GET"
        className="flex bg-white border-[1.5px] border-brand-rule rounded-[8px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,.05)] mb-2.5 max-w-[460px]"
      >
        <label htmlFor="search-input" className="sr-only">Search by case type, judge name, or federal district</label>
        <div className="flex flex-1 items-center gap-2 px-3.5 py-2.5">
          <svg className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <label htmlFor="search-input" className="sr-only">Search cases by type, judge, or district</label>
          <input
            id="search-input"
            name="q"
            placeholder="Case type, judge name, or federal district…"
            className="flex-1 border-none outline-none font-inter text-[13px] text-brand-ink-2 bg-transparent placeholder:text-brand-muted"
          />
        </div>
        <button type="submit" aria-label="Search cases" className="bg-brand-blue text-white font-inter font-semibold text-[13px] px-5 flex-shrink-0 hover:bg-brand-blue-mid transition-colors">
          Search
        </button>
      </form>

      {/* Suggested searches */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="font-inter font-semibold text-[10px] text-brand-muted uppercase tracking-[0.06em] whitespace-nowrap">
          Try
        </span>
        {['Employment · SDNY', 'Judge Torres', 'FLSA · D. Mass', 'Civil Rights'].map((s) => (
          <Link
            key={s}
            href={`/search?q=${encodeURIComponent(s)}`}
            className="font-inter font-semibold text-[11px] text-brand-blue bg-brand-blue-pale border border-[#C4D8F0] rounded px-2.5 py-1 hover:bg-[#deeaf9] transition-colors"
          >
            {s}
          </Link>
        ))}
      </div>

      {/* CTAs — primary to pricing/checkout, secondary to report demo */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5">
        <Link
          href="/pricing"  // ← Update to your Stripe checkout route
          className="font-inter font-semibold text-[14px] text-white bg-brand-blue px-6 py-2.5 rounded-[8px] shadow-brand-btn-lg hover:bg-brand-blue-mid transition-colors"
        >
          Analyze your case
        </Link>
        <Link
          href="/sample"
          className="font-inter font-medium text-[13px] text-brand-slate hover:text-brand-ink-2 transition-colors"
        >
          View sample report →
        </Link>
      </div>

      {/* Trust signals */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex">
          {[
            { initials: 'JM', bg: '#0966C3' },
            { initials: 'SR', bg: '#004182' },
            { initials: 'TK', bg: '#057642' },
            { initials: 'AL', bg: '#060d1a' },
            { initials: 'RB', bg: '#378ADD' },
          ].map((av, i) => (
            <div
              key={av.initials}
              className={`w-6 h-6 rounded-full border-2 border-brand-surface flex items-center justify-center font-inter font-bold text-white text-[7px] ${i > 0 ? '-ml-1.5' : ''}`}
              style={{ backgroundColor: av.bg, zIndex: 5 - i }}
            >
              {av.initials}
            </div>
          ))}
        </div>
        <p className="font-inter text-[12px] text-brand-muted">
          Trusted by{' '}
          <strong className="font-semibold text-brand-ink-2">5,000+ litigants</strong>{' '}
          across all 94 federal districts
        </p>
      </div>

      {/* Data sources */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-inter font-semibold text-[10px] text-brand-muted uppercase tracking-[0.07em]">
          Data from
        </span>
        {DATA_SOURCES.map((src) => (
          <span
            key={src}
            className="font-inter font-medium text-[10px] text-brand-slate bg-white border border-brand-rule rounded px-2 py-0.5"
          >
            {src}
          </span>
        ))}
      </div>
    </div>
  )
}

// Placeholder for the product UI screenshot (right column of hero).
// Replace with your actual <ProductMockup /> component or a real screenshot.
function HeroRight() {
  return (
    <div className="bg-white p-5 flex items-center justify-center">
      <div className="w-full max-w-[400px] rounded-[10px] overflow-hidden border border-brand-rule shadow-brand-mock">
        {/* Browser chrome */}
        <div className="bg-[#DEDAD4] px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex-1 bg-white border border-[#C2BEB8] rounded-sm px-2 py-0.5 font-mono text-[9px] text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">
            mycasevalues.com/analyze/employment/sdny/title-vii
          </div>
        </div>

        {/* App header */}
        <div className="bg-white border-b border-brand-rule px-3 py-2 flex items-center">
          <div className="flex items-center gap-1.5">
            <LogoMark size={18} />
            <span className="font-jakarta font-extrabold text-[11px] tracking-[-0.2px] text-brand-ink">
              MyCase<em className="not-italic text-brand-blue">Value</em>
            </span>
          </div>
          <span className="text-brand-rule text-[9px] mx-1">/</span>
          <span className="font-mono text-[9px] text-brand-muted">Employment · S.D.N.Y.</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-brand-blue bg-brand-blue-pale border border-[#C4D8F0] rounded px-1.5 py-0.5">
              1,847 cases
            </span>
            <span className="flex items-center gap-1 bg-[#E7F3ED] border border-[#A7D4B8] rounded px-1.5 py-0.5">
              <span className="w-1 h-1 rounded-full bg-[#057642] animate-pulse" />
              <span className="font-inter font-bold text-[#057642] text-[8px] uppercase tracking-[0.06em]">Live</span>
            </span>
          </div>
        </div>

        {/* Placeholder for the actual analytics UI */}
        <div className="bg-brand-surface p-5 min-h-[280px] flex items-center justify-center">
          <div className="text-center">
            <p className="font-jakarta font-bold text-brand-ink-2 text-lg mb-1">
              Employment · S.D.N.Y.
            </p>
            <p className="font-mono font-semibold text-brand-blue text-[40px] leading-none tracking-[-1px] mb-1">
              $247,000
            </p>
            <p className="font-inter text-[12px] text-brand-muted mb-4">
              Median settlement · 1,847 comparable cases
            </p>
            <div className="flex gap-3 justify-center">
              {[
                { label: 'Win rate', value: '62.4%' },
                { label: 'Avg duration', value: '18 mo' },
                { label: 'Settle rate', value: '84%' },
              ].map((m) => (
                <div key={m.label} className="bg-white border border-brand-rule rounded-[8px] px-3 py-2 text-center">
                  <p className="font-mono font-semibold text-brand-ink-2 text-[15px] tracking-[-0.3px]">{m.value}</p>
                  <p className="font-inter text-brand-muted text-[8px] uppercase tracking-[0.08em] mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PLATFORM SECTION ────────────────────────────────────────────────────────

function PlatformSection() {
  return (
    <div
      className="grid"
      style={{
        background: '#060d1a',
        gridTemplateColumns: `repeat(${PLATFORM_SECTIONS.length}, 1fr)`,
      }}
    >
      {PLATFORM_SECTIONS.map((section, i) => (
        <div
          key={section.title}
          className={`px-7 py-8 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}
        >
          <p className="font-inter font-semibold text-brand-blue-sky uppercase tracking-[0.16em] text-[10px] mb-2.5">
            {section.eyebrow}
          </p>
          <h3
            className="font-jakarta font-extrabold text-white mb-2.5 leading-[1.15]"
            style={{ fontSize: 18, letterSpacing: '-0.3px' }}
          >
            {section.title}
          </h3>
          <p className="font-inter text-white/40 text-[12px] leading-[1.65]">
            {section.body}
          </p>
          <Link
            href={section.href}
            className="font-inter font-semibold text-brand-blue-sky text-[12px] flex items-center gap-1.5 mt-3.5 hover:text-white transition-colors"
          >
            {section.cta} →
          </Link>
        </div>
      ))}
    </div>
  )
}

// ── PAGE COMPONENT ─────────────────────────────────────────────────────────

export default function HomePage() {


  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'MyCaseValue',
        url: SITE_URL,
        description: 'Federal court analytics and settlement data platform. Research case outcomes, judge statistics, and settlement values.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'MyCaseValue',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [],
      },
    ],
  };

  return (
    <main className="font-inter text-brand-ink-2 bg-brand-surface">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="grid grid-cols-1 md:grid-cols-[42%_58%]"
        aria-label="Hero"
      >
        <HeroLeft />
        <div className="hidden md:block">
          <HeroRight />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <StatBar stats={HOMEPAGE_STATS} />

      {/* ── PLATFORM SECTIONS (dark) ── */}
      <div className="block md:hidden">
        <div className="bg-[#060d1a]">
          {PLATFORM_SECTIONS.map((section) => (
            <div key={section.title} className="px-5 py-6 border-b border-white/[0.06]">
              <p className="font-inter font-semibold text-brand-blue-sky uppercase tracking-[0.16em] text-[10px] mb-2.5">{section.eyebrow}</p>
              <h3 className="font-jakarta font-extrabold text-white mb-2.5 leading-[1.15] text-[18px] tracking-[-0.3px]">{section.title}</h3>
              <p className="font-inter text-white/40 text-[12px] leading-[1.65]">{section.body}</p>
              <Link href={section.href} className="font-inter font-semibold text-brand-blue-sky text-[12px] flex items-center gap-1.5 mt-3.5 hover:text-white transition-colors">{section.cta} →</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        <PlatformSection />
      </div>

      {/* ── FEATURES ── */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-brand-rule bg-brand-surface"
        aria-label="Features"
      >
        {FEATURES.map((feat, i) => (
          <div
            key={feat.title}
            className={`px-5 py-[22px] ${i < FEATURES.length - 1 ? 'border-r border-brand-rule' : ''}`}
          >
            {/* Feature icon — brand-pale bg, 8px radius (button radius) */}
            <div className="w-[34px] h-[34px] rounded-[8px] bg-brand-blue-pale border border-[#C4D8F0] flex items-center justify-center mb-2.5 text-brand-blue">
              {feat.icon}
            </div>
            {/* Title — Plus Jakarta Sans 700, H3 spec */}
            <h4
              className="font-jakarta font-bold text-brand-ink-2 mb-1.5"
              style={{ fontSize: 13, letterSpacing: '-0.1px' }}
            >
              {feat.title}
            </h4>
            {/* Body — Inter 400 */}
            <p className="font-inter text-brand-gray text-[11px] leading-[1.65]">
              {feat.body}
            </p>
          </div>
        ))}
      </section>

      {/* ── BRAND VOICE ── */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-brand-rule bg-white"
        aria-label="Brand voice"
      >
        {BRAND_VOICE.map((v, i) => (
          <div
            key={v.title}
            className={`px-5 py-[22px] ${i < BRAND_VOICE.length - 1 ? 'border-r border-brand-rule' : ''}`}
          >
            <h5
              className="font-jakarta font-extrabold text-brand-ink-2 mb-1.5"
              style={{ fontSize: 14, letterSpacing: '-0.2px' }}
            >
              {v.title}
            </h5>
            <p className="font-inter text-brand-gray text-[11px] leading-[1.65]">
              {v.body}
            </p>
          </div>
        ))}
      </section>

      {/* ── COMPLIANCE FOOTER BAND ── */}
      <div className="bg-brand-surface border-t border-brand-rule px-7 py-3.5 flex items-center justify-between flex-wrap gap-2.5">
        <p className="font-inter text-brand-muted text-[11px]">
          Indexed from{' '}
          <strong className="font-semibold text-brand-slate">
            PACER · CourtListener · FJC IDB · RECAP Archive
          </strong>{' '}
          — 100% public federal records, updated daily.
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {COMPLIANCE.map((chip) => (
            <span
              key={chip}
              className="font-inter font-semibold text-brand-slate text-[10px] bg-white border border-brand-rule rounded px-2.5 py-1"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

    </main>
  )
}
