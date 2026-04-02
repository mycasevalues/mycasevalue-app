import { Metadata } from 'next';
import { REAL_DATA } from '../../lib/realdata';

export const metadata: Metadata = {
  title: 'Federal Court Trends — MyCaseValue | Case Filing Data & Statistics',
  description: 'Explore federal court filing trends across 84 case types and 94 districts. See which cases are most common, win rates by category, and how federal litigation has evolved.',
  alternates: { canonical: 'https://mycasevalues.com/trends' },
  openGraph: {
    title: 'Federal Court Trends — MyCaseValue',
    description: 'Explore 5.1M+ federal court cases: filing volumes, win rates, settlement patterns, and duration trends across 84 case types.',
    type: 'website',
    url: 'https://mycasevalues.com/trends',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Trends', item: 'https://mycasevalues.com/trends' },
      ],
    },
    {
      '@type': 'Dataset',
      name: 'Federal Court Filing Trends',
      description: 'Aggregate statistics on federal civil litigation trends across 84 case types and 94 districts from 2000-2024.',
      creator: { '@type': 'Organization', name: 'MyCaseValue' },
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://mycasevalues.com/api/quick-stats',
      },
    },
  ],
};

// Build trend data from REAL_DATA at build time (server component)
interface TrendEntry {
  nos: string;
  label: string;
  category: string;
  total: number;
  winRate: number;
  settlementPct: number;
  months: number;
  medianLo: number;
  medianMd: number;
  medianHi: number;
}

function getTrendData(): TrendEntry[] {
  const entries: TrendEntry[] = [];
  for (const [nos, data] of Object.entries(REAL_DATA)) {
    if (!data || !data.total) continue;
    entries.push({
      nos,
      label: data.label || 'Unknown',
      category: data.category || 'other',
      total: data.total,
      winRate: data.wr || 0,
      settlementPct: data.sp || 0,
      months: data.mo || 0,
      medianLo: data.rng?.lo || 0,
      medianMd: data.rng?.md || 0,
      medianHi: data.rng?.hi || 0,
    });
  }
  return entries.sort((a, b) => b.total - a.total);
}

// Category labels and colors
const CATEGORY_META: Record<string, { label: string; color: string }> = {
  money: { label: 'Financial', color: '#F59E0B' },
  work: { label: 'Employment', color: '#111111' },
  injury: { label: 'Injury', color: '#EF4444' },
  consumer: { label: 'Consumer', color: '#0D9488' },
  rights: { label: 'Civil Rights', color: '#8B5CF6' },
  housing: { label: 'Housing', color: '#06B6D4' },
  medical: { label: 'Medical', color: '#EC4899' },
  family: { label: 'Family', color: '#F97316' },
  gov: { label: 'Government', color: '#64748B' },
  ip: { label: 'Intellectual Property', color: '#10B981' },
  other: { label: 'Other', color: '#9CA3AF' },
};

export default function TrendsPage() {
  const trends = getTrendData();
  const totalCases = trends.reduce((sum, t) => sum + t.total, 0);
  const top10 = trends.slice(0, 10);
  const maxTotal = top10[0]?.total || 1;

  // Aggregate by category
  const catAgg: Record<string, { total: number; wrSum: number; count: number }> = {};
  for (const t of trends) {
    if (!catAgg[t.category]) catAgg[t.category] = { total: 0, wrSum: 0, count: 0 };
    catAgg[t.category].total += t.total;
    catAgg[t.category].wrSum += t.winRate;
    catAgg[t.category].count += 1;
  }
  const catEntries = Object.entries(catAgg)
    .map(([cat, agg]) => ({
      cat,
      label: CATEGORY_META[cat]?.label || cat,
      color: CATEGORY_META[cat]?.color || '#9CA3AF',
      total: agg.total,
      avgWinRate: Math.round(agg.wrSum / agg.count),
    }))
    .sort((a, b) => b.total - a.total);
  const maxCatTotal = catEntries[0]?.total || 1;

  // Fastest and slowest case types
  const byDuration = [...trends].filter(t => t.months > 0).sort((a, b) => a.months - b.months);
  const fastest5 = byDuration.slice(0, 5);
  const slowest5 = byDuration.slice(-5).reverse();

  // Highest win rates
  const highWin = [...trends].filter(t => t.total > 1000).sort((a, b) => b.winRate - a.winRate).slice(0, 5);
  const lowWin = [...trends].filter(t => t.total > 1000).sort((a, b) => a.winRate - b.winRate).slice(0, 5);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div
        className="border-b"
        style={{
          borderColor: 'var(--border-default)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80"
            style={{ color: '#111111' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to MyCaseValue
          </a>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            FEDERAL COURT TRENDS
          </div>
          <h1
            className="text-3xl sm:text-4xl font-display font-extrabold mb-4"
            style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}
          >
            Federal Court Filing Trends
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Explore real statistics from {totalCases.toLocaleString()} federal civil cases across {trends.length} case types and 94 federal districts.
          </p>
        </div>
      </div>

      {/* Key Stats Bar */}
      <section className="py-10 border-b" style={{ borderColor: 'var(--border-default)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { v: totalCases.toLocaleString(), l: 'Total cases analyzed' },
              { v: `${trends.length}`, l: 'Case types tracked' },
              { v: '94', l: 'Federal districts' },
              { v: '2000–2024', l: 'Data span' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl border"
                style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}
              >
                <div className="text-2xl font-display font-extrabold" style={{ color: '#111111' }}>
                  {stat.v}
                </div>
                <div className="text-[11px] font-semibold mt-2" style={{ color: 'var(--fg-muted)' }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Top 10 Most Filed Case Types */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Most Filed Case Types
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>
            The 10 most common federal civil case types by total filings.
          </p>
          <div className="space-y-3">
            {top10.map((t, i) => {
              const pct = (t.total / maxTotal) * 100;
              return (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="block p-4 rounded-xl border transition-all hover:shadow-lg hover:shadow-indigo-500/5"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full"
                        style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>
                        {t.label}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${CATEGORY_META[t.category]?.color || '#9CA3AF'}20`,
                          color: CATEGORY_META[t.category]?.color || '#9CA3AF',
                        }}
                      >
                        {CATEGORY_META[t.category]?.label || t.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--fg-muted)' }}>
                      <span>{t.total.toLocaleString()} cases</span>
                      <span style={{ color: '#10B981' }}>{t.winRate}% win</span>
                      <span>{t.months}mo avg</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#FFFFFF' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #111111, #333333)',
                      }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Category Breakdown */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Cases by Category
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>
            Federal civil cases grouped by legal category.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {catEntries.map((c) => {
              const pct = (c.total / maxCatTotal) * 100;
              return (
                <div
                  key={c.cat}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>
                        {c.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: c.color }}>
                      {c.total.toLocaleString()} cases
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: '#FFFFFF' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c.color }} />
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                    Avg win rate: <span style={{ color: '#10B981', fontWeight: 600 }}>{c.avgWinRate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Win Rate Extremes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
              Highest Win Rates
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
              Case types with 1,000+ filings and the highest plaintiff win rates.
            </p>
            <div className="space-y-2">
              {highWin.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-green-500/30"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#10B981' }}>{t.winRate}%</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
              Lowest Win Rates
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
              Case types with 1,000+ filings and the lowest plaintiff win rates.
            </p>
            <div className="space-y-2">
              {lowWin.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-red-500/30"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#EF4444' }}>{t.winRate}%</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Duration Extremes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
              Fastest to Resolve
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
              Case types with the shortest average duration.
            </p>
            <div className="space-y-2">
              {fastest5.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-cyan-500/30"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#06B6D4' }}>{t.months} months</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
              Longest to Resolve
            </h2>
            <p className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>
              Case types with the longest average duration.
            </p>
            <div className="space-y-2">
              {slowest5.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-amber-500/30"
                  style={{
                    borderColor: 'var(--border-default)',
                    background: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--fg-primary)' }}>{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>{t.months} months</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recovery Ranges */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>
            Recovery Ranges by Case Type
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--fg-muted)' }}>
            Typical monetary recovery ranges (25th, 50th, and 75th percentile) for common case types, in thousands.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
              <thead>
                <tr className="text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>
                  <th className="px-4 py-2">Case Type</th>
                  <th className="px-4 py-2 text-right">25th %ile</th>
                  <th className="px-4 py-2 text-right">Median</th>
                  <th className="px-4 py-2 text-right">75th %ile</th>
                  <th className="px-4 py-2 text-right">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {trends.filter(t => t.medianMd > 0).slice(0, 15).map((t) => (
                  <tr key={t.nos}>
                    <td className="px-4 py-2.5 rounded-l-lg" style={{ background: '#FFFFFF', color: 'var(--fg-primary)' }}>
                      <a href={`/nos/${t.nos}`} style={{ color: 'var(--fg-primary)', textDecoration: 'none' }} className="hover:underline">
                        {t.label}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-right" style={{ background: '#FFFFFF', color: 'var(--fg-muted)' }}>
                      ${t.medianLo}K
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold" style={{ background: '#FFFFFF', color: '#F59E0B' }}>
                      ${t.medianMd}K
                    </td>
                    <td className="px-4 py-2.5 text-right" style={{ background: '#FFFFFF', color: 'var(--fg-muted)' }}>
                      ${t.medianHi}K
                    </td>
                    <td className="px-4 py-2.5 text-right rounded-r-lg font-semibold" style={{ background: '#FFFFFF', color: '#10B981' }}>
                      {t.winRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section
          className="text-center p-8 rounded-xl border"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)',
          }}
        >
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Want details for your specific case?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Select your case type and get a personalized analysis with win rates, timelines, and recovery data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/odds"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#111111', color: '#fff' }}
            >
              Check My Odds — Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all border"
              style={{ borderColor: 'var(--border-default)', color: 'var(--fg-muted)', background: 'transparent' }}
            >
              View Pricing
            </a>
          </div>
        </section>

        {/* Data Source Note */}
        <section className="text-center">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            All data sourced from the Federal Judicial Center Integrated Database (FJC IDB), PACER, and CourtListener.
            Statistics represent aggregate historical outcomes from 2000–2024 and do not predict future case results.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only.
          We are not a law firm. This is not legal advice. No attorney-client relationship is created by using this tool.
          &copy; {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
