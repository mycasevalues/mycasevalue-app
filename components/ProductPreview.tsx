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
    <section className="px-4 md:px-8 py-14 md:py-20 bg-[var(--surf,#FFFFFF)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-blue uppercase tracking-widest mb-3" style={{ fontSize: 12, fontWeight: 600 }}>
            Preview
          </p>
          <h2 className="md: text-[var(--color-text-muted)] mb-3" style={{ fontSize: 20, fontWeight: 700 }}>
            See What the Data Looks Like
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto" style={{ fontSize: 14 }}>
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
              <div className="bg-gray-700 rounded-md px-3 py-1 text-[var(--color-text-muted)] max-w-sm font-mono" style={{ fontSize: 12 }}>
                mycasevalues.com/cases
              </div>
            </div>
          </div>

          <div className="bg-[var(--surf,#FFFFFF)] border border-t-0 border-[var(--bdr, #E5E7EB)] rounded-b-xl p-6 md:p-8 shadow-xl">
            {/* Category cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="border border-[var(--bdr, #E5E7EB)] rounded p-4 hover:shadow-sm transition-shadow"
                >
                  <h4 className="text-[var(--color-text-muted)] mb-3" style={{ fontSize: 14, fontWeight: 600 }}>
                    {cat.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div>
                      <div className="text-brand-blue tabular-nums" style={{ fontSize: 16, fontWeight: 700 }}>
                        {cat.cases}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        Total Cases
                      </div>
                    </div>
                    <div>
                      <div
 className="tabular-nums"
 style={{ color: cat.winColor, fontSize: 16, fontWeight: 700 }}
 >
                        {cat.winRate}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        Win Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)] tabular-nums" style={{ fontSize: 14, fontWeight: 600 }}>
                        {cat.settlementRate}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        Settlement Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-[var(--color-text-muted)] tabular-nums" style={{ fontSize: 14, fontWeight: 600 }}>
                        {cat.duration}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        Avg Duration
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--bdr, #E5E7EB)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Showing 3 of 84 case type categories
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Sample data from public records
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
 href="/cases"
 className="inline-flex items-center justify-center px-6 py-2.5 rounded bg-[var(--gold,#C4882A)] text-white transition-colors hover:bg-[var(--gold-hover,#A87222)]" style={{ fontSize: 14, fontWeight: 600 }}
 >
            Explore All Case Types &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
