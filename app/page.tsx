/**
 * MyCaseValue Homepage — app/page.tsx
 *
 * Revamped: Legal intelligence platform positioning
 * 1. Hero (H1 + subheadline) — legal intelligence angle
 * 2. Trust bar (6 stats — includes legal data)
 * 3. Search bar
 * 4. Audience cards (who uses it)
 * 5. Legal Intelligence Preview (NEW — showcase data depth)
 * 6. How it works (3 steps — updated)
 * 7. What's different (differentiation — updated)
 * 8. Bottom CTA
 * 9. Disclaimer
 */

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import { SearchHero } from '@/components/SearchHero';
import StickyCTA from '@/components/StickyCTA';
import AudienceCards from '@/components/AudienceCards';
import ProductPreview from '@/components/ProductPreview';

export const metadata: Metadata = {
  title: 'Federal Court Intelligence — Case Outcomes, Legal Research & Analytics',
  description: 'Search 5.1 million federal case outcomes alongside 127,000+ legal documents from 7 authoritative sources. Win rates, settlement data, judge analytics, regulations, and citation networks — all in one platform.',
  openGraph: {
    type: 'website',
    title: 'Federal Court Intelligence — Case Outcomes, Legal Research & Analytics',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue - Federal Court Intelligence' }],
    description: 'Search 5.1 million federal case outcomes alongside 127,000+ legal documents from 7 authoritative sources.',
    url: `${SITE_URL}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Intelligence — Case Outcomes, Legal Research & Analytics',
    images: [`${SITE_URL}/og-image.png`],
    description: 'Search 5.1 million federal case outcomes alongside 127,000+ legal documents from 7 authoritative sources.',
  },
};

// ── TYPES ────────────────────────────────────────────────────────────────────────

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

interface DifferentiationCard {
  title: string;
  description: string;
}

interface LegalSourcePreview {
  name: string;
  count: string;
  type: string;
  color: string;
}

// ── DATA ─────────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Search the Record',
    description: 'Enter a case type, judge name, district, or keyword. We search across 5.1 million federal court outcomes and 127,000+ legal documents — opinions, regulations, filings, and statutes from 7 authoritative sources.',
  },
  {
    number: '02',
    title: 'See the Full Picture',
    description: 'Get win rates, settlement ranges, and judge analytics alongside the relevant regulations, landmark precedents, and citation networks that shape outcomes. Not just data — context.',
  },
  {
    number: '03',
    title: 'Act with Confidence',
    description: 'Evaluate venues, prepare clients, research judges, and build stronger arguments. Export citation-backed reports with the legal landscape around your case type. Everything from public records, in plain language.',
  },
];

const DIFFERENTIATION_CARDS: DifferentiationCard[] = [
  {
    title: 'Outcome Analytics They Don\'t Offer',
    description: 'Enterprise platforms give you case law OR case data. MyCaseValue combines both. Get win rates, settlement ranges, judge intelligence, and AI outcome predictions—all backed by actual regulations and precedents. See the intelligence behind the outcomes, not just the outcomes.',
  },
  {
    title: 'AI Case Prediction (Not Available Elsewhere)',
    description: 'Predict case outcomes for your specific judge, district, and case type using machine learning trained on 5.1M real federal cases. No other platform combines outcome data with AI prediction at this scale and price.',
  },
  {
    title: 'A Fraction of Enterprise Pricing',
    description: 'Professional litigation intelligence that costs $300-$500/month elsewhere? MyCaseValue is $0-$29.99/mo. Start free, upgrade only if you need attorney tools. No account required. No hidden fees. Transparent pricing from day one.',
  },
];

const LEGAL_SOURCES: LegalSourcePreview[] = [
  { name: 'CourtListener', count: '500K+', type: 'Opinions', color: '#1E3A5F' },
  { name: 'Federal Register', count: 'Daily', type: 'Regulations', color: '#7C3AED' },
  { name: 'eCFR', count: '~200K', type: 'Federal Code', color: '#0D9488' },
  { name: 'EDGAR', count: 'Millions', type: 'SEC Filings', color: '#D97706' },
  { name: 'Caselaw Access', count: '6.7M', type: 'US Cases', color: '#059669' },
  { name: 'CanLII', count: '100K+', type: 'Canadian Law', color: '#DC2626' },
  { name: 'GovInfo', count: 'Millions', type: 'Gov Docs', color: '#6B7280' },
];

// ── PAGE COMPONENT ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'MyCaseValue',
        url: SITE_URL,
        description: 'Search 5.1 million federal case outcomes alongside 127,000+ legal documents from 7 authoritative sources.',
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
        sameAs: [],
      },
    ],
  };

  return (
    <main className="bg-white font-sans text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky CTA — appears after scrolling past hero, hides near footer */}
      <StickyCTA />

      {/* ──────────────────────────────────────────────────────────────────
          HERO: H1 & SUBHEADLINE
          ────────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-12 md:py-20 text-center">
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 text-balance">
          The Federal Court Intelligence
          <br />
          <span className="text-brand-blue">Enterprise Platforms Can't Match</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          Get outcome analytics, AI case prediction, and legal research — uniquely integrated in one platform. Search 5.1M federal cases and 127K+ legal documents from 7 authoritative sources. Everything traditional legal databases charge $300-$500/month to access. Free during beta.
        </p>

        {/* GLOBAL SEARCH BAR */}
        <SearchHero />

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue text-white font-semibold transition-colors hover:bg-brand-blue/90"
          >
            Start searching free →
          </Link>
          <Link
            href="/legal/search"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-gray-300 text-gray-900 font-semibold transition-colors hover:border-gray-400"
          >
            Explore legal research
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Public beta: all features free. Join 50K+ users exploring outcomes that enterprise platforms charge thousands to access.
        </p>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          TRUST BAR: 6 STATS
          ────────────────────────────────────────────────────────────────── */}
      <section className="w-full border-y border-gray-100 bg-white py-8 md:py-10">
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-0">
            {/* Stat 1: 5.1M Cases */}
            <div className="text-center lg:border-r lg:border-gray-100 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                5.1M+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Federal Cases
              </div>
            </div>

            {/* Stat 2: 95 districts */}
            <div className="text-center lg:border-r lg:border-gray-100 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                95
              </div>
              <div className="text-sm text-gray-500 font-medium">
                District Courts
              </div>
            </div>

            {/* Stat 3: 84 Case Types */}
            <div className="text-center lg:border-r lg:border-gray-100 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                84
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Case Types
              </div>
            </div>

            {/* Stat 4: 127K+ Legal Docs */}
            <div className="text-center lg:border-r lg:border-gray-100 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                127K+
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Legal Documents
              </div>
            </div>

            {/* Stat 5: 7 Data Sources */}
            <div className="text-center lg:border-r lg:border-gray-100 md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                7
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Data Sources
              </div>
            </div>

            {/* Stat 6: 55+ Years */}
            <div className="text-center md:px-4">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                55<span className="text-2xl md:text-3xl">+</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Years of Data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          WHO USES IT: AUDIENCE CARDS
          ────────────────────────────────────────────────────────────────── */}
      <AudienceCards />

      {/* ──────────────────────────────────────────────────────────────────
          LEGAL INTELLIGENCE PREVIEW (NEW SECTION)
          ────────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-sm font-semibold mb-4">
              Legal Research Hub
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Case Data Meets Legal Research
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every case type page now shows the regulations, precedents, and citation networks that shape outcomes. Seven sources, one search.
            </p>
          </div>

          {/* Data Sources Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
            {LEGAL_SOURCES.map((src) => (
              <div
                key={src.name}
                className="text-center p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
              >
                <div className="text-xl font-bold font-mono mb-1" style={{ color: src.color }}>
                  {src.count}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-0.5">
                  {src.name}
                </div>
                <div className="text-xs text-gray-500">
                  {src.type}
                </div>
              </div>
            ))}
          </div>

          {/* Three Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/legal/search"
              className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-blue hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center mb-4 text-lg">
                ⌕
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                Document Search
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Full-text and semantic search across opinions, regulations, filings, and statutes from all 7 sources.
              </p>
            </Link>

            <Link
              href="/legal/citations"
              className="group p-6 rounded-2xl border border-gray-100 hover:border-purple-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4 text-lg">
                ◉
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Citation Explorer
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Interactive network graph showing how landmark cases connect. See which precedents drive outcomes in your case type.
              </p>
            </Link>

            <Link
              href="/legal/dashboard"
              className="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 text-lg">
                ▦
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                Data Dashboard
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monitor ingestion pipeline health, source status, and document processing across all 7 data sources in real time.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          HOW IT WORKS: 3 STEPS
          ────────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="scroll-mt-[72px] px-4 md:px-8 py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MyCaseValue Works
            </h2>
            <p className="text-lg text-gray-600">
              Three steps to federal court intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={step.title} className="relative">
                {/* Step number background */}
                <div
                  aria-hidden="true"
                  className="text-6xl font-bold text-brand-blue opacity-20 mb-4 leading-none"
                >
                  {step.number}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting arrow for desktop */}
                {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-16 -right-4 text-gray-400 text-2xl"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          PRODUCT PREVIEW
          ────────────────────────────────────────────────────────────────── */}
      <ProductPreview />

      {/* ──────────────────────────────────────────────────────────────────
          WHAT MAKES THIS DIFFERENT
          ────────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Different Kind of Legal Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Case outcomes and legal research, finally in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFFERENTIATION_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          BOTTOM CTA SECTION
          ────────────────────────────────────────────────────────────────── */}
      <section
        data-hide-sticky-cta
        className="px-4 md:px-8 py-16 md:py-24 bg-brand-blue text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Paying Enterprise Prices
            <br />
            <span className="text-white/90">for Incomplete Legal Intelligence</span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get AI-powered case prediction, federal judge analytics, settlement data, outcome trends, and integrated legal research. Everything Westlaw and LexisNexis charge thousands for, at a fraction of the cost. Free during public beta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cases"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-brand-blue font-semibold transition-colors hover:bg-gray-100"
            >
              Start searching free →
            </Link>
            <Link
              href="/legal"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold transition-colors hover:bg-white/10"
            >
              Explore research hub
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          DISCLAIMER
          ────────────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-4 border-t border-gray-100 bg-white">
        <p className="text-xs text-gray-600 text-center max-w-3xl mx-auto">
          MyCaseValue provides data from public federal court records and legal documents for informational purposes only. This is not legal advice. Consult a licensed attorney for legal guidance.
        </p>
      </div>
    </main>
  );
}
