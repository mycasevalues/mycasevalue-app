import { Metadata } from 'next';
import Link from 'next/link';
import { SITS, OUTCOME_DATA } from '../../../lib/data';

// Helper function to flatten SITS and map NOS codes to display names
function getNOSMap(): Record<string, { label: string; category: string; description?: string }> {
  const nosMap: Record<string, { label: string; category: string; description?: string }> = {};

  SITS.forEach((category: any) => {
    category.opts.forEach((option: any) => {
      const key = option.nos;
      if (!nosMap[key]) {
        nosMap[key] = { label: option.label, category: category.label, description: option.d };
      }
    });
  });

  return nosMap;
}

// Get all unique NOS codes for static generation
function getAllNOSCodes(): string[] {
  const nosSet = new Set<string>();
  SITS.forEach((category: any) => {
    category.opts.forEach((option: any) => {
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
  return codes.map((code) => ({ code }));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { code } = await params;
  const nosMap = getNOSMap();
  const nosInfo = nosMap[code];

  if (!nosInfo) {
    return {
      title: 'Case Type Not Found — MyCaseValue',
      description: 'This case type does not exist in our database.',
    };
  }

  const title = `${nosInfo.label} (NOS ${code}) — Win Rates, Timelines & Outcomes | MyCaseValue`;
  const description = `Research ${nosInfo.label} federal court outcomes. See win rates, median case duration, settlement percentages, and recovery data from real court records. NOS code ${code}.`;
  const canonical = `https://mycasevalues.com/nos/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${nosInfo.label} — Federal Court Statistics | MyCaseValue`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [{ url: 'https://mycasevalues.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${nosInfo.label} — Federal Court Statistics`,
      description,
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
          <p className="text-[#94A3B8] mb-6">NOS code {code} does not exist in our database.</p>
          <Link href="/" className="inline-block px-6 py-3 rounded-xl font-semibold text-white transition"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const outcomeData = OUTCOME_DATA[code] || OUTCOME_DATA._default;
  const totalOutcomes = (outcomeData.trial_win || 0) + (outcomeData.trial_loss || 0) + (outcomeData.dismiss || 0) + (outcomeData.fav_set || 0);
  const winRate = totalOutcomes > 0
    ? Math.round(((outcomeData.trial_win || 0) + (outcomeData.fav_set || 0)) / totalOutcomes * 100)
    : 42;
  const medianDuration = outcomeData.set_mo || 6;
  const settleRate = totalOutcomes > 0
    ? Math.round((outcomeData.fav_set || 0) / totalOutcomes * 100)
    : 30;

  // Outcome bars for visual chart
  const outcomes = [
    { label: 'Settled', value: outcomeData.fav_set || 30, color: '#0D9488' },
    { label: 'Dismissed', value: outcomeData.dismiss || 53, color: '#64748B' },
    { label: 'Trial Win', value: outcomeData.trial_win || 10, color: '#6366F1' },
    { label: 'Trial Loss', value: outcomeData.trial_loss || 7, color: '#EF4444' },
  ];
  const maxOutcome = Math.max(...outcomes.map(o => o.value));

  // Related NOS codes in same category
  const relatedCodes: { code: string; label: string }[] = [];
  SITS.forEach((cat: any) => {
    if (cat.label === nosInfo.category) {
      cat.opts.forEach((opt: any) => {
        if (opt.nos !== code && relatedCodes.length < 6) {
          relatedCodes.push({ code: opt.nos, label: opt.label });
        }
      });
    }
  });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          { '@type': 'ListItem', position: 2, name: 'Case Types', item: 'https://mycasevalues.com/nos' },
          { '@type': 'ListItem', position: 3, name: nosInfo.label, item: `https://mycasevalues.com/nos/${code}` },
        ],
      },
      {
        '@type': 'Dataset',
        name: `${nosInfo.label} Federal Court Outcome Data`,
        description: `Aggregate outcome data for ${nosInfo.label} (NOS ${code}) cases in U.S. federal courts.`,
        url: `https://mycasevalues.com/nos/${code}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        isAccessibleForFree: true,
        spatialCoverage: 'United States Federal Courts',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the win rate for ${nosInfo.label} cases?`,
            acceptedAnswer: { '@type': 'Answer', text: `Based on historical federal court data, ${nosInfo.label} cases have an approximate win rate of ${winRate}%. This includes both trial victories and favorable settlements. Individual results vary significantly.` },
          },
          {
            '@type': 'Question',
            name: `How long do ${nosInfo.label} cases typically take?`,
            acceptedAnswer: { '@type': 'Answer', text: `The median duration for ${nosInfo.label} cases is approximately ${medianDuration} months from filing to resolution. This varies based on court district, case complexity, and whether the case settles or goes to trial.` },
          },
          {
            '@type': 'Question',
            name: `What is NOS code ${code}?`,
            acceptedAnswer: { '@type': 'Answer', text: `NOS (Nature of Suit) code ${code} corresponds to ${nosInfo.label} cases in the federal court system. It falls under the ${nosInfo.category} category.` },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0B1221] text-[#F0F2F5]" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav className="border-b px-4 sm:px-6 lg:px-8 py-4" style={{ borderColor: '#1E293B', background: 'rgba(11,18,33,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[14px] font-semibold transition hover:opacity-80" style={{ color: '#A5B4FC' }}>
            ← MyCaseValue
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/nos" className="text-[13px] font-medium transition hover:opacity-80" style={{ color: '#94A3B8' }}>
              All Case Types
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.2)' }}>
              NOS {code}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={{ background: 'rgba(13,148,136,0.12)', color: '#5EEAD4', border: '1px solid rgba(13,148,136,0.2)' }}>
              {nosInfo.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4" style={{ letterSpacing: '-2px', lineHeight: 1.1 }}>
            {nosInfo.label}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl" style={{ color: '#8B9AB5', lineHeight: 1.7 }}>
            Federal court outcome data for {nosInfo.label} cases. Win rates, timelines, settlement percentages, and outcome distributions from public court records.
          </p>
        </div>
      </header>

      {/* Key Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Win + Settle Rate', value: `${winRate}%`, color: '#0D9488', icon: '⚖️' },
            { label: 'Median Duration', value: `${medianDuration}mo`, color: '#6366F1', icon: '⏱' },
            { label: 'Settlement Rate', value: `${settleRate}%`, color: '#A5B4FC', icon: '🤝' },
            { label: 'Outcomes Tracked', value: totalOutcomes > 0 ? totalOutcomes.toLocaleString() : '500+', color: '#5EEAD4', icon: '📊' },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-5 text-center" style={{
              background: 'linear-gradient(180deg, rgba(19,27,46,0.9) 0%, rgba(11,18,33,0.95) 100%)',
              border: `1px solid ${stat.color}20`,
            }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-1px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outcome Distribution */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#131B2E', border: '1px solid #1E293B' }}>
            <h2 className="text-xl font-bold mb-6">Outcome Distribution</h2>
            <div className="space-y-4">
              {outcomes.map((o, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#F0F2F5' }}>{o.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: o.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {o.value}%
                    </span>
                  </div>
                  <div style={{ height: '24px', borderRadius: '8px', background: '#1E293B', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '8px',
                      background: `linear-gradient(90deg, ${o.color}, ${o.color}BB)`,
                      width: `${(o.value / maxOutcome) * 100}%`,
                      minWidth: '20px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to know */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#131B2E', border: '1px solid #1E293B' }}>
            <h2 className="text-xl font-bold mb-4">What You Should Know</h2>
            <div className="space-y-4" style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.8 }}>
              <p>
                {nosInfo.label} cases (NOS code {code}) fall under the <strong style={{ color: '#F0F2F5' }}>{nosInfo.category}</strong> category in federal court.
                The data shown here represents aggregate historical outcomes and should be used for research purposes only.
              </p>
              <p>
                The median case duration of <strong style={{ color: '#6366F1' }}>{medianDuration} months</strong> reflects the time from filing to resolution.
                Cases that settle tend to resolve faster than those that proceed to trial.
              </p>
              <p>
                Having legal representation significantly impacts outcomes. Federal court data consistently shows that represented plaintiffs
                achieve more favorable results in {nosInfo.label.toLowerCase()} cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Types */}
      {relatedCodes.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Related Case Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedCodes.map((rel) => (
                <Link key={rel.code} href={`/nos/${rel.code}`}
                  className="rounded-xl p-4 transition-all hover:scale-[1.02]"
                  style={{ background: '#131B2E', border: '1px solid #1E293B' }}>
                  <span className="text-[11px] font-bold" style={{ color: '#64748B' }}>NOS {rel.code}</span>
                  <div className="text-[14px] font-semibold mt-1" style={{ color: '#F0F2F5' }}>{rel.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Get Your Detailed Report</h2>
        <p className="text-[#94A3B8] mb-8 max-w-2xl mx-auto">
          Use our interactive research tool to explore detailed outcomes, recovery ranges, and timeline data for {nosInfo.label} cases.
        </p>
        <Link href="/" className="inline-block px-10 py-4 rounded-xl font-semibold text-lg text-white transition hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 4px 24px rgba(79,70,229,0.3)' }}>
          Start Your Research — Free
        </Link>
      </section>

      {/* Disclaimer */}
      <section className="border-t px-4 sm:px-6 lg:px-8 py-12" style={{ borderColor: '#1E293B', background: '#131B2E' }}>
        <div className="max-w-3xl mx-auto">
          <h3 className="font-semibold mb-4 text-[14px]" style={{ color: '#F0F2F5' }}>Legal Disclaimer</h3>
          <p className="text-[13px] leading-relaxed" style={{ color: '#64748B' }}>
            This information is provided for educational and research purposes only and does not constitute legal advice.
            The statistics presented are based on publicly available federal court data and should not be used
            as the sole basis for legal decisions. Actual case outcomes depend on specific facts, jurisdiction,
            and representation. Please consult with a qualified attorney to discuss your individual case.
            MyCaseValue does not predict outcomes or provide case valuations. No attorney-client relationship is created.
          </p>
        </div>
      </section>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
