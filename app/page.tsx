/**
 * MyCaseValue Homepage
 *
 * Redesigned for premium legal intelligence positioning.
 * Structure:
 * 1. Hero with search bar + example queries
 * 2. Trust metrics bar
 * 3. Data sources (premium grid)
 * 4. Product preview (browser mockup)
 * 5. Platform capabilities
 * 6. How it works
 * 7. Bottom CTA
 * 8. Disclaimer
 */

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SITE_METRICS } from '@/lib/site-metrics';
import { SearchHero } from '@/components/SearchHero';
import StickyCTA from '@/components/StickyCTA';
import ProductPreview from '@/components/ProductPreview';

export const metadata: Metadata = {
  title: 'Federal Court Intelligence | MyCaseValue',
  description:
    'Search millions of federal court records for case outcomes, judge analytics, settlement data, and litigation intelligence. Built entirely from public federal court and agency records.',
  openGraph: {
    type: 'website',
    title: 'Federal Court Intelligence | MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MyCaseValue — Federal Court Intelligence',
      },
    ],
    description:
      'Search millions of federal court records for case outcomes, judge analytics, and litigation intelligence.',
    url: `${SITE_URL}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Intelligence | MyCaseValue',
    images: [`${SITE_URL}/og-image.png`],
    description:
      'Search millions of federal court records for case outcomes, judge analytics, and litigation intelligence.',
  },
};

// ── DATA ──

const CAPABILITIES = [
  {
    icon: '⚖',
    title: 'Case Outcome Analytics',
    description:
      'Win rates, settlement ranges, and disposition data across 84 federal case types and 94 districts.',
  },
  {
    icon: '👤',
    title: 'Judge Intelligence',
    description:
      'Ruling patterns, case duration, and outcome tendencies for federal judges.',
  },
  {
    icon: '📊',
    title: 'Venue Analysis',
    description:
      'Compare districts by case type performance, timelines, and historical outcomes.',
  },
  {
    icon: '🔍',
    title: 'Legal Research',
    description:
      'Full-text search across opinions, regulations, and filings from 7 public data sources.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Search',
    description:
      'Enter a case type, judge, district, or keyword. Search across millions of federal court records and legal documents.',
  },
  {
    step: '02',
    title: 'Analyze',
    description:
      'Review win rates, settlement ranges, judge analytics, and the regulations and precedents that shape outcomes.',
  },
  {
    step: '03',
    title: 'Act',
    description:
      'Evaluate venues, prepare clients, and build stronger arguments with data-backed intelligence from public records.',
  },
];

// ── COMPONENT ──

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'MyCaseValue',
        url: SITE_URL,
        description:
          'Federal court intelligence platform built from public records.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/cases?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'MyCaseValue',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
      },
    ],
  };

  return (
    <main className="bg-white font-sans text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyCTA />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(9,102,195,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="relative px-4 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] text-gray-900 mb-5 text-balance">
            Federal Court Intelligence,
            <br />
            <span className="text-brand-blue">Built from Public Records</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 leading-relaxed mb-10">
            Search millions of federal court outcomes for win rates, settlement
            data, judge analytics, and litigation intelligence. Sourced entirely
            from public federal court and agency records.
          </p>

          {/* Search bar */}
          <SearchHero />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/terminal"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-brand-blue text-white font-semibold text-sm transition-all hover:bg-brand-blue-dark hover:shadow-lg"
            >
              Open Intelligence Terminal
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm transition-all hover:border-brand-blue hover:text-brand-blue"
            >
              Browse Case Types
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm transition-all hover:border-brand-blue hover:text-brand-blue"
            >
              View Pricing
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-5 tracking-wide">
            FREE DURING BETA · NO ACCOUNT REQUIRED
          </p>
        </div>
      </section>

      {/* ── TRUST METRICS BAR ── */}
      <section className="w-full border-y border-gray-100 bg-gray-50/60 py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            <div className="text-center md:border-r md:border-gray-200/60">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tabular-nums">
                {SITE_METRICS.totalCases}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Federal Cases
              </div>
            </div>
            <div className="text-center md:border-r md:border-gray-200/60">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tabular-nums">
                {SITE_METRICS.districtCourts}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                District Courts
              </div>
            </div>
            <div className="text-center md:border-r md:border-gray-200/60">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tabular-nums">
                {SITE_METRICS.caseTypes}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Case Types
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                7
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Public Data Sources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES ── */}
      <section className="px-4 md:px-8 py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-3">
              Transparency
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Public Records, Organized
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Every data point comes from official federal court and agency
              sources. No proprietary black boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_METRICS.dataSources.map((src) => (
              <div
                key={src.name}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-brand-blue mt-2 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {src.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {src.description}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {src.category} · Updated {src.updateFrequency.toLowerCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/data-sources"
              className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              View full data source documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ── */}
      <ProductPreview />

      {/* ── CAPABILITIES ── */}
      <section className="px-4 md:px-8 py-14 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-3">
              Platform
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What You Can Do
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Turn fragmented federal records into actionable litigation
              intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-lg flex-shrink-0">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="scroll-mt-[72px] px-4 md:px-8 py-14 md:py-20 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-base text-gray-500">
              Three steps to federal court intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={item.step} className="relative text-center md:text-left">
                <div className="text-5xl font-bold text-brand-blue/10 mb-2 leading-none">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-8 -right-4 text-gray-300 text-xl"
                  >
                    &rarr;
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        data-hide-sticky-cta
        className="px-4 md:px-8 py-14 md:py-20 text-white"
        style={{
          background:
            'linear-gradient(135deg, #0966C3 0%, #064B8A 50%, #0E3B6D 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start Researching Federal Court Data
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Case outcomes, judge analytics, settlement data, and litigation
            intelligence from public records. Free during beta.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cases"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-brand-blue font-semibold text-sm transition-colors hover:bg-gray-100"
            >
              Start Searching Free
            </Link>
            <Link
              href="/attorney"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/30 text-white font-semibold text-sm transition-colors hover:bg-white/10"
            >
              Attorney Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="px-4 md:px-8 py-4 border-t border-gray-100 bg-white">
        <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto">
          MyCaseValue provides data from public federal court records for
          informational purposes only. This is not legal advice. Consult a
          licensed attorney for legal guidance.
        </p>
      </div>
    </main>
  );
}
