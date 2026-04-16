import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';
import dynamic from 'next/dynamic';

const CourtGuideCapture = dynamic(() => import('@/components/CourtGuideCapture'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
      Loading PDF generator…
    </div>
  ),
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Court Research Guide for Non-Lawyers',
  description: 'Free downloadable guide to federal court research, case terminology, finding resources, and navigating litigation with no legal background.',
  alternates: { canonical: `${SITE_URL}/resources/court-guide` },
  openGraph: {
    title: 'Federal Court Research Guide for Non-Lawyers',
    description: 'Learn how to research federal court cases, understand legal terminology, and navigate the court system independently.',
    type: 'website',
    url: `${SITE_URL}/resources/court-guide`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  keywords: 'federal court guide, legal research, court terminology, pro se, self-help legal, non-lawyer guide',
};

export default function CourtGuidePage() {
  return (
    <div className="min-h-screen bg-[#080d19]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Federal Court Research Guide
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            for Non-Lawyers
          </p>
          <p className="mt-6 text-blue-50">
            Everything you need to understand federal courts, research cases, and navigate litigation independently. Written in plain English with no legal jargon.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Guide Overview */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-100">
            What You'll Learn
          </h2>
          <p className="mb-6 text-lg text-gray-300">
            This comprehensive 12-page guide walks you through federal court research in plain English. No legal background required.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Court Fundamentals</h3>
              <p className="text-gray-300">
                Understand how federal courts work, why cases go to federal court, and how to find your district.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Case Documents & Data</h3>
              <p className="text-gray-300">
                Learn what complaints, motions, and judgments mean, and how to interpret win rates and settlements.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Using MyCaseValue</h3>
              <p className="text-gray-300">
                Step-by-step instructions for researching case outcomes and comparing districts.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">Taking Action</h3>
              <p className="text-gray-300">
                When to hire an attorney, how to file pro se, and where to find free legal resources.
              </p>
            </div>
          </div>
        </section>

        {/* Key Topics Section */}
        <section className="mb-12 rounded-lg bg-blue-50 p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-100">
            12 Pages of Practical Guidance
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">1.</span>
                <span>What Is Federal Court?</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">2.</span>
                <span>Finding Your Federal District</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">3.</span>
                <span>Understanding Nature of Suit Codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">4.</span>
                <span>What Case Documents Mean</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">5.</span>
                <span>How to Read Win Rates & Settlement Data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">6.</span>
                <span>How to Use MyCaseValue Step by Step</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">7.</span>
                <span>Statute of Limitations & Timing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">8.</span>
                <span>Hiring an Attorney</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">9.</span>
                <span>Pro Se Resources</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-900 font-semibold">10.</span>
                <span>Key Legal Terms Glossary</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Email Capture Component */}
        <CourtGuideCapture />

        {/* Additional Info */}
        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-100">
            About This Guide
          </h2>
          <p className="mb-4 text-gray-300">
            This guide is written for people with no legal background who want to understand federal courts and research case outcomes. We use plain English and explain every legal term.
          </p>
          <p className="mb-4 text-gray-300">
            The guide covers federal civil cases only (not criminal). It helps you understand publicly available court data and how to use tools like MyCaseValue to research cases.
          </p>
          <p className="text-sm text-gray-400">
            This guide is not legal advice. Always consult a licensed attorney for advice about your specific case.
          </p>
        </section>
      </div>
    </div>
  );
}
