'use client';

/**
 * ProductPreview — a static mockup of the case search results,
 * displayed on the homepage to give visitors a taste of what the
 * actual product looks like. Uses hardcoded sample data.
 */

import Link from 'next/link';

const SAMPLE_CASES = [
  {
    title: 'Employment & Workplace',
    subtitle: 'Fired, harassed, underpaid, discrimination',
    totalCases: '1,319,929',
    winRate: '50%',
    winRateColor: '#16a34a',
    settlementRate: '51%',
    avgDuration: '10mo',
    badge: 'Favorable',
    badgeColor: '#16a34a',
  },
  {
    title: 'Personal Injury',
    subtitle: 'Accident, medical, product, wrongful death',
    totalCases: '1,530,537',
    winRate: '48%',
    winRateColor: '#d97706',
    settlementRate: '55%',
    avgDuration: '14mo',
    badge: 'Moderate',
    badgeColor: '#d97706',
  },
  {
    title: 'Civil Rights',
    subtitle: 'Police, discrimination, voting, free speech',
    totalCases: '1,174,922',
    winRate: '37%',
    winRateColor: '#d97706',
    settlementRate: '47%',
    avgDuration: '9mo',
    badge: 'Moderate',
    badgeColor: '#d97706',
  },
];

function CaseCard({ c }: { c: typeof SAMPLE_CASES[number] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
      <h4 className="text-base font-semibold text-gray-900 mb-1">{c.title}</h4>
      <p className="text-xs text-gray-500 mb-4">{c.subtitle}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-lg font-bold text-brand-blue">{c.totalCases}</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wide">Total Cases</div>
        </div>
        <div>
          <div className="text-lg font-bold" style={{ color: c.winRateColor }}>
            {c.winRate} <span className="inline-block w-1.5 h-1.5 rounded-full align-middle" style={{ backgroundColor: c.winRateColor }} />
          </div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wide">Avg Win Rate</div>
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900">{c.settlementRate}</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wide">Settlement Rate</div>
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900">{c.avgDuration}</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wide">Avg Duration</div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
          style={{
            color: c.badgeColor,
            borderColor: c.badgeColor,
          }}
        >
          {c.winRate} · {c.badge}
        </span>
        <span className="text-[11px] text-gray-400">{c.totalCases} cases</span>
      </div>
    </div>
  );
}

export default function ProductPreview() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See What the Data Looks Like
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real federal court outcome data — win rates, settlement rates, and case timelines — organized by category.
          </p>
        </div>

        {/* Browser window mockup */}
        <div className="max-w-4xl mx-auto">
          {/* Browser chrome */}
          <div className="bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 ml-3">
              <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-md">
                mycasevalues.com/cases
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-6 md:p-8 shadow-lg">
            {/* Mini stat bar */}
            <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">5.1M+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">Cases Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-blue">84</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">Case Types</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">11</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">89%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">Avg Win Rate</div>
              </div>
            </div>

            {/* Case cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_CASES.map((c) => (
                <CaseCard key={c.title} c={c} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA below the preview */}
        <div className="text-center mt-10">
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue text-white font-semibold transition-colors hover:bg-brand-blue/90"
          >
            Explore all 84 case types →
          </Link>
        </div>
      </div>
    </section>
  );
}
