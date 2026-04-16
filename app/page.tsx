/**
 * MyCaseValue Homepage
 *
 * Institutional legal intelligence aesthetic.
 * Dark hero, restrained typography, confident positioning.
 * Modeled after Bloomberg Law, vLex, and Thomson Reuters.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';
import { SearchHero } from '@/components/SearchHero';

export const metadata: Metadata = {
  title: 'MyCaseValue | Federal Court Intelligence',
  description:
    'Litigation intelligence from public federal court records. Case outcomes, judge analytics, and settlement data across 94 federal districts.',
  openGraph: {
    type: 'website',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue' }],
    description: 'Litigation intelligence from public federal court records.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyCaseValue | Federal Court Intelligence',
    images: [`${SITE_URL}/og-image.png`],
    description: 'Litigation intelligence from public federal court records.',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'MyCaseValue',
        url: SITE_URL,
        description: 'Federal court intelligence platform built from public records.',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/cases?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      { '@type': 'Organization', name: 'MyCaseValue', url: SITE_URL, logo: `${SITE_URL}/logo.png` },
    ],
  };

  return (
    <main className="font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO: Dark institutional ── */}
      <section style={{ background: 'linear-gradient(170deg, #0a1628 0%, #0f2240 40%, #122a4e 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-blue-300/70 mb-6">
            Federal Court Intelligence Platform
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.12] tracking-tight mb-6">
            Litigation intelligence from
            <br />
            public court records.
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mb-10">
            Case outcomes, judge analytics, and settlement data across {SITE_METRICS.districtCourts} federal
            districts. Built entirely from public federal court and agency records.
          </p>

          {/* Search */}
          <div className="max-w-xl">
            <SearchHero variant="dark" />
          </div>

          {/* Metrics row */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-12">
            {[
              { value: SITE_METRICS.totalCases, label: 'Federal Cases' },
              { value: String(SITE_METRICS.districtCourts), label: 'District Courts' },
              { value: String(SITE_METRICS.caseTypes), label: 'Case Types' },
              { value: '7', label: 'Data Sources' },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-xl md:text-2xl font-bold text-white tabular-nums">{m.value}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES: Compact institutional grid ── */}
      <section className="border-b border-gray-100" style={{ background: '#fafbfc' }}>
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-start md:gap-16">
            <div className="md:w-72 flex-shrink-0 mb-8 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Sources</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                All data comes from official federal court and agency records.
                No proprietary sources.
              </p>
              <Link href="/data-sources" className="inline-block mt-3 text-xs font-medium text-brand-blue hover:underline">
                View documentation
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {SITE_METRICS.dataSources.map((src) => (
                <div key={src.name} className="flex items-baseline gap-2 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium text-gray-900">{src.name}</span>
                  <span className="text-xs text-gray-400">{src.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES: Clean two-column ── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">Platform Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Case Outcome Analytics',
                desc: 'Win rates, settlement ranges, and disposition data across 84 federal case types.',
              },
              {
                title: 'Judge Intelligence',
                desc: 'Ruling patterns, case duration, and outcome tendencies for federal judges.',
              },
              {
                title: 'Venue Analysis',
                desc: 'Compare districts by case type performance, timelines, and historical outcomes.',
              },
              {
                title: 'Legal Document Search',
                desc: 'Full-text search across opinions, regulations, and filings from 7 public data sources.',
              },
            ].map((cap) => (
              <div key={cap.title} className="border-l-2 border-gray-200 pl-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{cap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA: Restrained ── */}
      <section className="border-t border-gray-100" style={{ background: '#0f2240' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Start researching federal court data.
          </h2>
          <p className="text-sm text-gray-400 mb-8 max-w-lg mx-auto">
            Free during beta. No account required.
          </p>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center h-11 px-8 bg-white text-gray-900 font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
          >
            Browse Case Types
          </Link>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white">
        <p className="text-[11px] text-gray-400 text-center max-w-2xl mx-auto">
          MyCaseValue provides data from public federal court records for informational purposes only.
          This is not legal advice. Consult a licensed attorney for legal guidance.
        </p>
      </div>
    </main>
  );
}
