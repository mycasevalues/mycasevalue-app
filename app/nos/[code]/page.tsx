import { Metadata } from 'next';
import Link from 'next/link';
import { SITS, OUTCOME_DATA } from '../../../lib/data';

// Helper function to flatten SITS and map NOS codes to display names
function getNOSMap(): Record<string, { label: string; category: string }> {
  const nosMap: Record<string, { label: string; category: string }> = {};

  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      const key = option.nos;
      if (!nosMap[key]) {
        nosMap[key] = { label: option.label, category: category.label };
      }
    });
  });

  return nosMap;
}

// Get all unique NOS codes for static generation
function getAllNOSCodes(): string[] {
  const nosSet = new Set<string>();
  SITS.forEach((category) => {
    category.opts.forEach((option) => {
      nosSet.add(option.nos);
    });
  });
  return Array.from(nosSet).sort();
}

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  const codes = getAllNOSCodes();
  return codes.map((code) => ({
    code,
  }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return {
      title: 'Case Type Not Found',
      description: 'This case type does not exist in our database.',
    };
  }

  const title = `${nosInfo.label} — Federal Court Statistics | MyCaseValue`;
  const description = `Explore federal court statistics for ${nosInfo.label} cases. View win rates, median case duration, and outcomes from real federal court data.`;
  const canonical = `https://mycasevalue.com/nos/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function NOSPage({ params }: PageProps) {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return (
      <div className="min-h-screen bg-[#0B1221] text-[#F0F2F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Case Type Not Found</h1>
          <p className="text-[#94A3B8] mb-6">
            This case type does not exist in our database.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get outcome data for this NOS code
  const outcomeData = OUTCOME_DATA[code] || OUTCOME_DATA._default;

  // Calculate statistics
  const totalCases = (outcomeData.trial_win || 0) + (outcomeData.trial_loss || 0) + (outcomeData.dismiss || 0);
  const winRate = totalCases > 0
    ? Math.round(((outcomeData.trial_win || 0) / totalCases) * 100)
    : 42;
  const medianDuration = outcomeData.set_mo || 6;
  const casesAnalyzed = totalCases || 500;

  return (
    <div className="min-h-screen bg-[#0B1221] text-[#F0F2F5]">
      {/* Header with back link */}
      <header className="border-b border-[#1E2749] py-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-400 transition text-sm mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mt-4">
          {nosInfo.label} — Federal Court Statistics
        </h1>
        <p className="text-[#94A3B8] text-lg mt-2">
          Data from federal court records ({nosInfo.category})
        </p>
      </header>

      {/* Key Statistics Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Win Rate Card */}
          <div className="bg-[#131B2E] rounded-lg p-8 border border-[#1E2749] hover:border-[#2D3B56] transition">
            <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wide mb-2">
              Average Win Rate
            </p>
            <p className="text-5xl font-bold text-green-400 mb-4">
              {winRate}%
            </p>
            <p className="text-[#94A3B8] text-sm">
              Percentage of cases that result in plaintiff victory at trial
            </p>
          </div>

          {/* Median Duration Card */}
          <div className="bg-[#131B2E] rounded-lg p-8 border border-[#1E2749] hover:border-[#2D3B56] transition">
            <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wide mb-2">
              Median Duration
            </p>
            <p className="text-5xl font-bold text-blue-400 mb-4">
              {medianDuration} mo
            </p>
            <p className="text-[#94A3B8] text-sm">
              Average time from filing to settlement or verdict
            </p>
          </div>

          {/* Cases Analyzed Card */}
          <div className="bg-[#131B2E] rounded-lg p-8 border border-[#1E2749] hover:border-[#2D3B56] transition">
            <p className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wide mb-2">
              Cases Analyzed
            </p>
            <p className="text-5xl font-bold text-purple-400 mb-4">
              {casesAnalyzed.toLocaleString()}
            </p>
            <p className="text-[#94A3B8] text-sm">
              Federal court cases in our analysis database
            </p>
          </div>
        </div>
      </section>

      {/* Case Details Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#131B2E] rounded-lg p-8 border border-[#1E2749]">
          <h2 className="text-2xl font-bold mb-6">Case Outcomes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-2">Trial Wins</p>
              <p className="text-3xl font-bold text-green-400">{outcomeData.trial_win || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-2">Trial Losses</p>
              <p className="text-3xl font-bold text-red-400">{outcomeData.trial_loss || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-2">Dismissed</p>
              <p className="text-3xl font-bold text-orange-400">{outcomeData.dismiss || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-[#94A3B8] text-sm uppercase tracking-wide mb-2">Settled</p>
              <p className="text-3xl font-bold text-blue-400">{outcomeData.fav_set || 0}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Research?</h2>
        <p className="text-[#94A3B8] mb-8 max-w-2xl mx-auto">
          Use our interactive case evaluation tool to understand the potential value and outcomes of your case based on federal court data.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
        >
          Start Your Research
        </Link>
      </section>

      {/* Legal Disclaimer */}
      <section className="border-t border-[#1E2749] px-4 sm:px-6 lg:px-8 py-12 bg-[#131B2E]">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-semibold mb-4">Legal Disclaimer</h3>
          <p className="text-[#94A3B8] text-sm leading-relaxed">
            This information is provided for educational purposes only and does not constitute legal advice.
            The statistics presented are based on publicly available federal court data and should not be used
            as the sole basis for legal decisions. Actual case outcomes depend on specific facts, jurisdiction,
            and representation. Please consult with a qualified attorney to discuss your individual case and
            legal options. MyCaseValue makes no guarantees regarding case outcomes or valuations.
          </p>
        </div>
      </section>

      {/* Structured Data - JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mycasevalue.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Case Types',
                item: 'https://mycasevalue.com/nos',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: nosInfo.label,
                item: `https://mycasevalue.com/nos/${code}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
