import { Metadata } from 'next';
import Link from 'next/link';
import { SITS } from '../../lib/data';

export const metadata: Metadata = {
  title: 'All Federal Case Types — MyCaseValue',
  description:
    'Browse all federal case types with real court statistics. Explore win rates, case duration, and outcomes for employment, injury, consumer, civil rights, and more.',
  alternates: { canonical: 'https://www.mycasevalues.com/nos' },
  openGraph: {
    title: 'All Federal Case Types — MyCaseValue',
    description:
      'Browse all federal case types with real court statistics. Explore win rates, case duration, and outcomes for employment, injury, consumer, civil rights, and more.',
    url: 'https://www.mycasevalues.com/nos',
    type: 'website',
  },
};

// Helper to get all unique NOS codes and their details
interface NOSDetail {
  code: string;
  label: string;
  category: string;
  categoryColor?: string;
}

function getAllNOSDetails(): { byCategory: Record<string, NOSDetail[]> } {
  const byCategory: Record<string, NOSDetail[]> = {};

  SITS.forEach((category) => {
    const categoryKey = category.label;
    byCategory[categoryKey] = [];

    const seenCodes = new Set<string>();

    category.opts.forEach((option) => {
      if (!seenCodes.has(option.nos)) {
        seenCodes.add(option.nos);
        byCategory[categoryKey].push({
          code: option.nos,
          label: option.label,
          category: category.label,
          categoryColor: category.color,
        });
      }
    });
  });

  return { byCategory };
}

export default function NOSIndexPage() {
  const { byCategory } = getAllNOSDetails();
  const categories = Object.keys(byCategory).sort();

  return (
    <div className="min-h-screen text-[#111827]" style={{ background: 'var(--bg-base)', color: '#111111' }}>
      {/* Header */}
      <header className="py-12 px-4 sm:px-6 lg:px-8" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <Link
          href="/"
          className="text-[#E8171F] hover:text-[#E8171F] transition text-sm mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mt-4">
          Federal Case Types Directory
        </h1>
        <p className="text-lg mt-2 max-w-2xl" style={{ color: '#6B7280' }}>
          Explore all case types in our federal court database. Each case type includes real statistics
          on win rates, case duration, and outcomes based on actual court records.
        </p>
      </header>

      {/* Categories */}
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((categoryName) => (
          <section key={categoryName} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-xl mr-3">📂</span>
              {categoryName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {byCategory[categoryName].map((item) => (
                <Link
                  key={item.code}
                  href={`/nos/${item.code}`}
                  className="group bg-[#FFFFFF] rounded-lg p-6 border hover:border-[#111111] hover:shadow-lg transition-all"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-[#E8171F] transition">
                        {item.label}
                      </h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>NOS Code: {item.code}</p>
                    </div>
                    <span className="text-[#E8171F] text-xl group-hover:translate-x-1 transition">
                      →
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    View court statistics and case outcomes for this type
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-[#FFFFFF]" style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">What are NOS Codes?</h2>
          <p className="mb-4" style={{ color: '#6B7280' }}>
            Nature of Suit (NOS) codes are standardized federal court classifications that categorize
            cases by their legal nature. Each code corresponds to a specific type of civil case filed in
            U.S. District Courts.
          </p>
          <p className="mb-4" style={{ color: '#6B7280' }}>
            The statistics on these pages are derived from actual federal court data, including case
            outcomes, settlement rates, and case duration. This information can help you understand
            how similar cases have performed in federal court.
          </p>
          <p style={{ color: '#6B7280' }}>
            For legal advice specific to your situation, please consult with a qualified attorney in
            your jurisdiction.
          </p>
        </div>
      </section>

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Federal Case Types Directory',
            description:
              'Browse all federal case types with real court statistics and outcomes.',
            url: 'https://www.mycasevalues.com/nos',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: Object.entries(byCategory)
                .flatMap(([categoryName, items]) =>
                  items.map((item, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    name: item.label,
                    url: `https://mycasevalues.com/nos/${item.code}`,
                    description: `Federal court statistics for ${item.label} cases`,
                  }))
                ),
            },
          }),
        }}
      />
    </div>
  );
}
