/**
 * MyCaseValue Homepage
 *
 * Bloomberg Law / Thomson Reuters institutional aesthetic.
 * Dark hero with subtle grid pattern, product-forward, data-dense.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';
import { SearchHero } from '@/components/SearchHero';

export const metadata: Metadata = {
  title: 'MyCaseValue | Federal Court Intelligence',
  description: 'Litigation intelligence from public federal court records. Case outcomes, judge analytics, and settlement data across 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue' }],
    description: 'Litigation intelligence from public federal court records.',
    url: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <main className="font-sans">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: '#080d19' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(26,86,219,0.08) 0%, transparent 70%)',
        }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-blue-400/60 mb-5">
                Federal Court Intelligence
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight mb-5">
                Litigation intelligence
                <br />
                from public court records.
              </h1>
              <p className="text-[15px] text-gray-400 leading-relaxed max-w-md mb-8">
                Case outcomes, judge analytics, and settlement data across {SITE_METRICS.districtCourts} federal
                districts. Sourced from public federal court and agency records.
              </p>

              <div className="max-w-md mb-8">
                <SearchHero variant="dark" />
              </div>

              <div className="flex items-center gap-8">
                <Link href="/cases" className="inline-flex h-10 items-center px-6 bg-transparent text-gray-300 border border-white/20 text-sm font-semibold rounded hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  Browse Cases
                </Link>
                <Link href="/judges" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Judge Intelligence &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Live data preview */}
            <div className="hidden lg:block">
              <div className="rounded-lg border overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                {/* Mini header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <span className="ml-2 text-[10px] text-gray-600 font-mono">mycasevalues.com/cases</span>
                </div>
                {/* Data rows */}
                <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  {[
                    { name: 'Employment & Workplace', cases: '1.3M+', rate: '50%', color: '#22c55e' },
                    { name: 'Personal Injury', cases: '1.5M+', rate: '48%', color: '#eab308' },
                    { name: 'Civil Rights', cases: '1.2M+', rate: '37%', color: '#eab308' },
                    { name: 'Consumer Protection', cases: '2.1M+', rate: '45%', color: '#eab308' },
                    { name: 'Business Disputes', cases: '890K+', rate: '52%', color: '#22c55e' },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
                      <span className="text-xs text-gray-300">{row.name}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-xs text-gray-500 tabular-nums">{row.cases}</span>
                        <span className="text-xs font-medium tabular-nums" style={{ color: row.color }}>{row.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-[10px] text-gray-400">
                  Showing 5 of 84 case types &middot; Source: FJC IDB, CourtListener
                </div>
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 mt-16 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {[
              { value: SITE_METRICS.totalCases, label: 'Federal Cases' },
              { value: String(SITE_METRICS.districtCourts), label: 'District Courts' },
              { value: String(SITE_METRICS.caseTypes), label: 'Case Types' },
              { value: '7', label: 'Public Data Sources' },
              { value: SITE_METRICS.yearsOfData, label: 'Years of Data' },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-lg font-bold text-white tabular-nums">{m.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES ── */}
      <section style={{ background: '#0c1220' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-start md:gap-16">
            <div className="md:w-56 flex-shrink-0 mb-6 md:mb-0">
              <h2 className="text-sm font-semibold text-white mb-1.5">Data Sources</h2>
              <p className="text-xs text-gray-500 leading-relaxed">
                All data from official federal court and agency records.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
              {SITE_METRICS.dataSources.map((src) => (
                <div key={src.name}>
                  <span className="text-xs font-medium text-gray-300">{src.name}</span>
                  <span className="text-[10px] text-gray-600 ml-1.5">{src.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section style={{ background: '#f8f9fb' }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-base font-semibold text-gray-100 mb-8">Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Case Outcomes', desc: 'Win rates, settlement ranges, and disposition analytics across 84 case types.' },
              { title: 'Judge Intelligence', desc: 'Ruling patterns, case duration, and outcome tendencies for federal judges.' },
              { title: 'Venue Analysis', desc: 'Compare districts by performance, timelines, and historical outcomes.' },
              { title: 'Document Search', desc: 'Full-text search across opinions, regulations, and filings from 7 sources.' },
            ].map((cap) => (
              <div key={cap.title}>
                <h3 className="text-sm font-semibold text-gray-100 mb-1.5">{cap.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#080d19' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Start researching.</h2>
            <p className="text-sm text-gray-500">Free during beta. No account required.</p>
          </div>
          <Link href="/cases" className="inline-flex h-10 items-center px-6 bg-transparent text-gray-300 border border-white/20 text-sm font-semibold rounded hover:bg-[rgba(255,255,255,0.04)] transition-colors flex-shrink-0">
            Browse Cases
          </Link>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="px-6 py-3" style={{ background: '#060a14' }}>
        <p className="text-[10px] text-gray-600 text-center">
          Data from public federal court records for informational purposes only. Not legal advice.
        </p>
      </div>
    </main>
  );
}
