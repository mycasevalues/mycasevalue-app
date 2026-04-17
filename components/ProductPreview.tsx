'use client';

/**
 * ProductPreview — static mockup of the case analytics interface
 * displayed on the homepage. Uses sample data representative of
 * the actual product experience.
 */

import Link from 'next/link';

const SAMPLE_CATEGORIES = [
  {
    title: 'Employment & Workplace',
    cases: '1.3M+',
    winRate: '50%',
    winColor: '#16a34a',
    settlementRate: '51%',
    duration: '10 mo',
  },
  {
    title: 'Personal Injury',
    cases: '1.5M+',
    winRate: '48%',
    winColor: '#d97706',
    settlementRate: '55%',
    duration: '14 mo',
  },
  {
    title: 'Civil Rights',
    cases: '1.2M+',
    winRate: '37%',
    winColor: '#d97706',
    settlementRate: '47%',
    duration: '9 mo',
  },
];

export default function ProductPreview() {
  return (
    <section className="px-4 md:px-8 py-14 md:py-20 bg-[var(--surf,#F6F5F2)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-brand-blue uppercase tracking-widest mb-3">
            Preview
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3">
            See What the Data Looks Like
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Win rates, settlement rates, and case timelines organized by
            category from real federal court records.
          </p>
        </div>

        {/* Browser chrome mockup */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            </div>
            <div className="flex-1 ml-3">
              <div className="bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-sm font-mono">
                mycasevalues.com/cases
              </div>
            </div>
          </div>

          <div className="bg-[var(--surf,#F6F5F2)] border border-t-0 border-[#E0E0E0] rounded-b-xl p-6 md:p-8 shadow-xl">
            {/* Category cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="border border-[#E0E0E0] rounded-xl p-4 hover:shadow-sm transition-shadow"
                >
                  <h4 className="text-sm font-semibold text-gray-100 mb-3">
                    {cat.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div>
                      <div className="text-lg font-bold text-brand-blue tabular-nums">
                        {cat.cases}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Total Cases
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-lg font-bold tabular-nums"
                        style={{ color: cat.winColor }}
                      >
                        {cat.winRate}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Win Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-200 tabular-nums">
                        {cat.settlementRate}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Settlement Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-200 tabular-nums">
                        {cat.duration}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                        Avg Duration
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E0E0E0] flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Showing 3 of 84 case type categories
              </span>
              <span className="text-[11px] text-gray-400">
                Sample data from public records
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded bg-[var(--gold,#C4882A)] text-white font-semibold text-sm transition-colors hover:bg-[var(--gold-hover,#A87222)]"
          >
            Explore All Case Types &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
