/**
 * MyCaseValue Homepage — app/page.tsx
 *
 * Phase 2 Implementation: Complete marketing landing page with visitor journey:
 * 1. Hero (H1 + subheadline)
 * 2. Trust bar (stats)
 * 3. Search bar
 * 4. Audience cards (who uses it)
 * 5. How it works (3 steps)
 * 6. What's different (differentiation)
 * 7. Bottom CTA
 * 8. Disclaimer
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
  title: 'The Federal Court Record. Open to Everyone.',
  description: 'Search 5.1 million federal case outcomes — win rates, settlement ranges, judge analytics, and case timelines — sourced entirely from public records.',
  openGraph: {
    type: 'website',
    title: 'The Federal Court Record. Open to Everyone.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue - Federal Court Records' }],
    description: 'Search 5.1 million federal case outcomes — win rates, settlement ranges, judge analytics, and case timelines — sourced entirely from public records.',
    url: `${SITE_URL}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Federal Court Record. Open to Everyone.',
    images: [`${SITE_URL}/og-image.png`],
    description: 'Search 5.1 million federal case outcomes — win rates, settlement ranges, judge analytics, and case timelines — sourced entirely from public records.',
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

// ── DATA ─────────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Search the Record',
    description: 'Enter a case type, judge name, district, or keyword. We search across 5.1 million federal court outcomes sourced from the FJC Integrated Database, CourtListener, and RECAP.',
  },
  {
    number: '02',
    title: 'See Real Outcomes',
    description: 'Get win rates, dismissal rates, settlement ranges, case timelines, and judge analytics — filtered to your specific district, case type, and time period. No estimates. No guesses. Actual outcomes.',
  },
  {
    number: '03',
    title: 'Use It with Confidence',
    description: 'Understand what your case looks like statistically. Prepare clients. Evaluate venues. Research judges. Export findings. Everything built from public records, presented in plain language.',
  },
];

const DIFFERENTIATION_CARDS: DifferentiationCard[] = [
  {
    title: 'Open by Design',
    description: 'Every outcome, win rate, and statistic on this platform comes from public federal court records — the FJC Integrated Database, CourtListener, and RECAP. No proprietary database. No black box. The public record, made searchable.',
  },
  {
    title: 'Accessible to Every Budget',
    description: 'Sophisticated litigation analytics have historically been priced for large firm budgets. MyCaseValue is built on the premise that access to the public record should not require a $600/month subscription.',
  },
  {
    title: 'Designed for Humans',
    description: "Most legal data platforms assume you already know what you're looking for. We built this for the person filing their first federal complaint and the practitioner preparing their hundredth. Same data. Plain language.",
  },
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
        description: 'Search 5.1 million federal case outcomes — win rates, settlement ranges, judge analytics, and case timelines — sourced entirely from public records.',
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
          2.1 HERO: H1 & SUBHEADLINE
          ────────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-12 md:py-20 text-center">
        <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 text-balance">
          The Federal Court Record.
          <br />
          <span className="text-brand-blue">Open to Everyone.</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          Search 5.1 million federal case outcomes — win rates, settlement ranges, judge analytics, and case timelines — sourced entirely from public records. Built for everyone who needs to know, not just the people who can afford to find out.
        </p>

        {/* ──────────────────────────────────────────────────────────────────
            2.2 GLOBAL SEARCH BAR
            ────────────────────────────────────────────────────────────────── */}
        <SearchHero />

        {/* ──────────────────────────────────────────────────────────────────
            2.3 CTA BUTTONS
            ────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue text-white font-semibold transition-colors hover:bg-brand-blue/90"
          >
            Start searching free →
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-gray-300 text-gray-900 font-semibold transition-colors hover:border-gray-400"
          >
            See how it works
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Free during public beta. No account required.
        </p>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          2.4 TRUST BAR: 4 STATS
          ────────────────────────────────────────────────────────────────── */}
      <section className="w-full border-y border-gray-100 bg-white py-8 md:py-10">
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {/* Stat 1: 5.1M Cases */}
            <div className="text-center md:border-r md:border-gray-100 md:px-6">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                5.1M+
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">
                Federal Cases
              </div>
            </div>

            {/* Stat 2: 95 Districts */}
            <div className="text-center md:border-r md:border-gray-100 md:px-6">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                95
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">
                District Courts
              </div>
            </div>

            {/* Stat 3: 84 Case Types */}
            <div className="text-center md:border-r md:border-gray-100 md:px-6">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                84
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">
                Case Types
              </div>
            </div>

            {/* Stat 4: 55+ Years of Data */}
            <div className="text-center md:px-6">
              <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                55<span className="text-2xl md:text-3xl">+</span>
              </div>
              <div className="text-sm md:text-base text-gray-500 font-medium">
                Years of Data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          2.5 WHO USES IT: AUDIENCE CARDS
          ────────────────────────────────────────────────────────────────── */}
      <AudienceCards />

      {/* ──────────────────────────────────────────────────────────────────
          2.6 HOW IT WORKS: 3 STEPS
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
          2.6b PRODUCT PREVIEW
          ────────────────────────────────────────────────────────────────── */}
      <ProductPreview />

      {/* ──────────────────────────────────────────────────────────────────
          2.7 WHAT MAKES THIS DIFFERENT
          ────────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Different Kind of Legal Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The data was always public. We made it useful.
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
          2.8 BOTTOM CTA SECTION
          ────────────────────────────────────────────────────────────────── */}
      <section
        data-hide-sticky-cta
        className="px-4 md:px-8 py-16 md:py-24 bg-brand-blue text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your judge has a track record.
            <br />
            So does your district.
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            See how your assigned judge ruled on similar motions, what your district typically settles for, and how long comparable cases took — before you file. Free during public beta. No account required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cases"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-brand-blue font-semibold transition-colors hover:bg-gray-100"
            >
              Start searching free →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold transition-colors hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          2.9 DISCLAIMER
          ────────────────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-4 border-t border-gray-100 bg-white">
        <p className="text-xs text-gray-600 text-center max-w-3xl mx-auto">
          MyCaseValue provides data from public federal court records for informational purposes only. This is not legal advice. Consult a licensed attorney for legal guidance.
        </p>
      </div>
    </main>
  );
}
