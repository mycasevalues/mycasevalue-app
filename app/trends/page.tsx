import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { REAL_DATA } from '../../lib/realdata';
import { SITS } from '../../lib/data';
import { SITE_URL } from '../../lib/site-config';
import { getCircuitWinRates, getOutcomeBreakdown } from '../../lib/trends';
import CaseTypeComparison from '../../components/CaseTypeComparison';

const TrendCharts = dynamic(() => import('../../components/features/TrendCharts'), {
  ssr: false,
  loading: () => (
    <div className="p-12 text-center" style={{ color: '#4B5563' }}>
      Loading charts...
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Case Trends',
  description: 'Track federal court case outcome trends over time. Analyze year-over-year changes in win rates, settlement values, and case durations across 84 case types.',
  alternates: { canonical: `${SITE_URL}/trends` },
  openGraph: {
    title: 'Case Trends',
    description: 'Track federal court case outcome trends over time',
    url: `${SITE_URL}/trends`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Trends', item: `${SITE_URL}/trends` },
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
        contentUrl: `${SITE_URL}/api/quick-stats`,
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
  work: { label: 'Employment', color: '#0f0f0f' },
  injury: { label: 'Injury', color: '#EF4444' },
  consumer: { label: 'Consumer', color: '#6D28D9' },
  rights: { label: 'Civil Rights', color: '#8B5CF6' },
  housing: { label: 'Housing', color: '#06B6D4' },
  medical: { label: 'Medical', color: '#EC4899' },
  family: { label: 'Family', color: '#F97316' },
  gov: { label: 'Government', color: '#64748B' },
  ip: { label: 'Intellectual Property', color: '#10B981' },
  other: { label: 'Other', color: '#4B5563' },
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
      color: CATEGORY_META[cat]?.color || '#4B5563',
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
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      <style>{`
        a.lex-link { color: #6D28D9; text-decoration: none; }
        a.lex-link:hover { text-decoration: underline; }
        .lex-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; }
        .lex-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .lex-btn-primary { background: #8B5CF6; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; }
        .lex-btn-primary:hover { background: #6D28D9; }
        .lex-badge { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-radius: 12px; }
        h1 { font-family: var(--font-display); }
        h2 { font-family: var(--font-display); }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '16px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm" style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="lex-link" style={{ fontWeight: 500 }}>Home</a>
            <span style={{ color: '#E5E7EB' }}>›</span>
            <span style={{ color: '#0f0f0f', fontWeight: 500 }}>Trends</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid #E5E7EB',
          background: '#1B3A5C',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{
              background: '#8B5CF6',
              color: '#FFFFFF',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            TRENDS
          </div>
          <h1
            className="font-display font-extrabold mb-4"
            style={{
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
            }}
          >
            Federal Court Filing Trends
          </h1>
          <p className="leading-relaxed max-w-2xl" style={{ color: '#B0C4DE', fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2vw, 1.125rem)' }}>
            Explore real statistics from {totalCases.toLocaleString()} federal civil cases across {trends.length} case types and 94 federal districts.
          </p>
        </div>
      </div>

      {/* Key Stats Bar */}
      <section className="py-10 border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { v: totalCases.toLocaleString(), l: 'Total cases analyzed' },
              { v: `${trends.length}`, l: 'Case types tracked' },
              { v: '94', l: 'Federal districts' },
              { v: '2000–2024', l: 'Data span' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 lex-card"
              >
                <div className="text-2xl font-display font-extrabold" style={{ color: '#0f0f0f' }}>
                  {stat.v}
                </div>
                <div className="text-[11px] font-semibold mt-2" style={{ color: '#4B5563' }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Interactive Trend Charts */}
        <section className="pt-4">
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Interactive Visualizations
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Explore filing trends, win rates by category, and top case types with interactive charts.
          </p>
          <TrendCharts />
        </section>

        {/* Top 10 Most Filed Case Types */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Most Filed Case Types
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            The 10 most common federal civil case types by total filings.
          </p>
          <div className="space-y-3">
            {top10.map((t, i) => {
              const pct = (t.total / maxTotal) * 100;
              return (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="block p-4 lex-card transition-all"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-bold w-6 h-6 flex items-center justify-center rounded"
                        style={{ background: '#8B5CF6', color: '#FFFFFF' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                        {t.label}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 lex-badge"
                      >
                        {CATEGORY_META[t.category]?.label || t.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: '#4B5563' }}>
                      <span>{t.total.toLocaleString()} cases</span>
                      <span style={{ color: '#6D28D9' }}>{t.winRate}% win</span>
                      <span>{t.months}mo avg</span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #8B5CF6, #6D28D9)',
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
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Cases by Category
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Federal civil cases grouped by legal category.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catEntries.map((c) => {
              const pct = (c.total / maxCatTotal) * 100;
              return (
                <div
                  key={c.cat}
                  className="p-5 lex-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ background: c.color }} />
                      <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                        {c.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: c.color }}>
                      {c.total.toLocaleString()} cases
                    </span>
                  </div>
                  <div className="h-2 mb-2 overflow-hidden" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: c.color }} />
                  </div>
                  <div className="text-[11px]" style={{ color: '#4B5563' }}>
                    Avg win rate: <span style={{ color: '#6D28D9', fontWeight: 600 }}>{c.avgWinRate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Circuit Court Performance */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Circuit Court Performance
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Average plaintiff win rates by federal circuit court with comparison to national average.
          </p>
          {(() => {
            const circuitData = getCircuitWinRates();
            const nationalAvg = circuitData.reduce((sum, c) => sum + c.avgWinRate, 0) / circuitData.length;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {circuitData.map((circuit) => {
                  const isAboveAvg = circuit.avgWinRate > nationalAvg;
                  const indicatorColor = circuit.avgWinRate > 55 ? '#10B981' : circuit.avgWinRate < 45 ? '#8B5CF6' : '#6D28D9';
                  return (
                    <div
                      key={circuit.circuit}
                      className="p-4 lex-card"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                          {circuit.circuit}
                        </span>
                        <span className="text-sm font-bold" style={{ color: indicatorColor }}>
                          {circuit.avgWinRate}%
                        </span>
                      </div>
                      <div className="h-2 mb-3 overflow-hidden" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                        <div
                          className="h-full"
                          style={{
                            width: `${Math.min(circuit.avgWinRate, 100)}%`,
                            background: indicatorColor,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px]" style={{ color: '#4B5563' }}>
                        <span>{circuit.caseCount.toLocaleString()} cases</span>
                        <span style={{ color: isAboveAvg ? '#10B981' : '#8B5CF6' }}>
                          {isAboveAvg ? '+' : ''}{(circuit.avgWinRate - nationalAvg).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </section>

        {/* Win Rate Extremes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
              Highest Win Rates
            </h2>
            <p className="mb-4" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              Case types with 1,000+ filings and the highest plaintiff win rates.
            </p>
            <div className="space-y-2">
              {highWin.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 lex-card transition-all"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm lex-link">{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#6D28D9' }}>{t.winRate}%</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
              Lowest Win Rates
            </h2>
            <p className="mb-4" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              Case types with 1,000+ filings and the lowest plaintiff win rates.
            </p>
            <div className="space-y-2">
              {lowWin.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 lex-card transition-all"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm lex-link">{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#8B5CF6' }}>{t.winRate}%</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Duration Extremes */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
              Fastest to Resolve
            </h2>
            <p className="mb-4" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              Case types with the shortest average duration.
            </p>
            <div className="space-y-2">
              {fastest5.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 lex-card transition-all"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm lex-link">{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#6D28D9' }}>{t.months} months</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
              Longest to Resolve
            </h2>
            <p className="mb-4" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              Case types with the longest average duration.
            </p>
            <div className="space-y-2">
              {slowest5.map((t) => (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="flex items-center justify-between p-3 lex-card transition-all"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <span className="text-sm lex-link">{t.label}</span>
                  <span className="text-sm font-bold" style={{ color: '#8B5CF6' }}>{t.months} months</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Case Type Comparison Tool */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Compare Case Types
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Select any two federal case types for a head-to-head comparison of win rates, durations, and recovery values.
          </p>
          <CaseTypeComparison />
        </section>

        {/* Settlement Value Heatmap */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Settlement Value Heatmap
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Median recovery values across the most common federal case types. Darker shading indicates higher recovery.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {trends.filter(t => t.medianMd > 0).slice(0, 20).map((t) => {
              const maxMd = Math.max(...trends.filter(x => x.medianMd > 0).slice(0, 20).map(x => x.medianMd));
              const intensity = t.medianMd / maxMd;
              const bgColor = `rgba(0, 23, 46, ${0.05 + intensity * 0.85})`;
              const textColor = intensity > 0.5 ? '#FFFFFF' : '#0f0f0f';
              return (
                <a
                  key={t.nos}
                  href={`/nos/${t.nos}`}
                  className="p-4 transition-all hover:scale-[1.02]"
                  style={{
                    background: bgColor, borderRadius: 2, textDecoration: 'none',
                    border: '1px solid rgba(213,216,220,0.3)',
                  }}
                >
                  <div style={{ fontSize: 11, color: textColor, opacity: 0.8, fontFamily: 'var(--font-body)', marginBottom: 4, lineHeight: 1.3 }}>
                    {t.label.length > 25 ? t.label.slice(0, 25) + '…' : t.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: textColor, fontFamily: 'var(--font-mono)' }}>
                    ${t.medianMd}K
                  </div>
                  <div style={{ fontSize: 10, color: textColor, opacity: 0.7, marginTop: 2 }}>
                    {t.winRate}% win · {t.months}mo
                  </div>
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span style={{ fontSize: 11, color: '#4B5563' }}>Low</span>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'linear-gradient(90deg, rgba(0,23,46,0.05), rgba(0,23,46,0.9))' }} />
            <span style={{ fontSize: 11, color: '#4B5563' }}>High</span>
          </div>
        </section>

        {/* Recovery Ranges */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Recovery Ranges by Case Type
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Typical monetary recovery ranges (25th, 50th, and 75th percentile) for common case types, in thousands.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
              <thead>
                <tr className="text-left text-[11px] font-bold uppercase tracking-wider" style={{ color: '#4B5563' }}>
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
                    <td className="px-4 py-2.5 lex-card" style={{ borderRadius: '4px 0 0 4px' }}>
                      <a href={`/nos/${t.nos}`} className="lex-link">
                        {t.label}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-right lex-card" style={{ color: '#4B5563' }}>
                      ${t.medianLo}K
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold lex-card" style={{ color: '#8B5CF6' }}>
                      ${t.medianMd}K
                    </td>
                    <td className="px-4 py-2.5 text-right lex-card" style={{ color: '#4B5563' }}>
                      ${t.medianHi}K
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold lex-card" style={{ color: '#6D28D9', borderRadius: '0 4px 4px 0' }}>
                      {t.winRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How Cases End */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            How Cases End
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Distribution of federal civil case outcomes across all case types.
          </p>
          {(() => {
            const outcomes = getOutcomeBreakdown();
            const totalPercentage = outcomes.reduce((sum, o) => sum + o.percentage, 0);
            return (
              <div className="space-y-6">
                {/* Stacked Bar */}
                <div className="p-6 lex-card">
                  <div className="flex rounded overflow-hidden" style={{ height: '48px' }}>
                    {outcomes.map((outcome) => (
                      <div
                        key={outcome.outcome}
                        style={{
                          width: `${(outcome.percentage / totalPercentage) * 100}%`,
                          background: outcome.color,
                          position: 'relative',
                        }}
                        title={`${outcome.outcome}: ${outcome.percentage}%`}
                      />
                    ))}
                  </div>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {outcomes.map((outcome) => (
                    <div
                      key={outcome.outcome}
                      className="p-4 lex-card"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 rounded" style={{ background: outcome.color }} />
                        <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                          {outcome.outcome}
                        </span>
                      </div>
                      <div className="text-2xl font-bold font-mono" style={{ color: outcome.color, fontFamily: 'var(--font-mono)' }}>
                        {outcome.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* Win Rate by Category */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Win Rate by Category
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Average win rates across all SITS categories, sorted by performance.
          </p>
          {(() => {
            const allEntries = getTrendData();
            const categories = Array.from(new Set(allEntries.map(e => e.category)));
            const categoryWinRates = categories.map(cat => {
              const inCat = allEntries.filter(e => e.category === cat && e.winRate > 0);
              const avgWr = inCat.length > 0 ? Math.round(inCat.reduce((a, b) => a + b.winRate, 0) / inCat.length) : 0;
              return { cat, avgWr, label: CATEGORY_META[cat]?.label || cat };
            }).sort((a, b) => b.avgWr - a.avgWr);

            return (
              <div className="space-y-3">
                {categoryWinRates.map((c) => {
                  let barColor = '#059669';
                  let bgColor = 'rgba(7,135,74,0.15)';
                  if (c.avgWr < 35) {
                    barColor = '#8B5CF6';
                    bgColor = 'rgba(232,23,31,0.15)';
                  } else if (c.avgWr < 50) {
                    barColor = '#D97706';
                    bgColor = 'rgba(217,119,6,0.15)';
                  }
                  return (
                    <div
                      key={c.cat}
                      className="p-4 lex-card"
                      style={{
                        background: bgColor,
                        border: `1px solid ${barColor}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                          {c.label}
                        </span>
                        <span className="text-sm font-bold" style={{ color: barColor }}>
                          {c.avgWr}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden" style={{ background: '#E5E7EB', borderRadius: '12px' }}>
                        <div
                          className="h-full"
                          style={{
                            width: `${c.avgWr}%`,
                            background: barColor,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </section>

        {/* Case Duration by Type */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Case Duration by Type
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Fastest and longest case types by median duration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#0f0f0f', fontSize: '1rem' }}>
                Fastest Resolution
              </h3>
              <div className="space-y-3">
                {fastest5.map((t, i) => (
                  <a
                    key={t.nos}
                    href={`/nos/${t.nos}`}
                    className="block p-4 lex-card transition-all"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold lex-link">{t.label}</span>
                      <span className="text-sm font-bold" style={{ color: '#059669' }}>{t.months}mo</span>
                    </div>
                    <div className="h-1.5 overflow-hidden" style={{ background: '#E5E7EB', borderRadius: '12px' }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${(t.months / 60) * 100}%`,
                          background: '#059669',
                        }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ color: '#0f0f0f', fontSize: '1rem' }}>
                Longest Duration
              </h3>
              <div className="space-y-3">
                {slowest5.map((t) => (
                  <a
                    key={t.nos}
                    href={`/nos/${t.nos}`}
                    className="block p-4 lex-card transition-all"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold lex-link">{t.label}</span>
                      <span className="text-sm font-bold" style={{ color: '#8B5CF6' }}>{t.months}mo</span>
                    </div>
                    <div className="h-1.5 overflow-hidden" style={{ background: '#E5E7EB', borderRadius: '12px' }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min((t.months / 120) * 100, 100)}%`,
                          background: '#8B5CF6',
                        }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Settlement Rate Ranking */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Settlement Rate Ranking
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Top 10 case types by settlement rate before trial.
          </p>
          {(() => {
            const topSettlement = [...trends]
              .filter(t => t.settlementPct > 0)
              .sort((a, b) => b.settlementPct - a.settlementPct)
              .slice(0, 10);

            return (
              <div className="space-y-3">
                {topSettlement.map((t, i) => (
                  <a
                    key={t.nos}
                    href={`/nos/${t.nos}`}
                    className="block p-4 lex-card transition-all"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <span
                        className="text-sm font-bold w-7 h-7 flex items-center justify-center rounded"
                        style={{ background: '#6D28D9', color: '#FFFFFF' }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>
                          {t.label}
                        </div>
                        <div className="text-xs" style={{ color: '#4B5563' }}>
                          {t.settlementPct}% of {t.label} cases settle before trial
                        </div>
                      </div>
                      <span className="text-sm font-bold" style={{ color: '#6D28D9' }}>
                        {t.settlementPct}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden" style={{ background: '#E5E7EB', borderRadius: '12px' }}>
                      <div
                        className="h-full"
                        style={{
                          width: `${t.settlementPct}%`,
                          background: '#6D28D9',
                        }}
                      />
                    </div>
                  </a>
                ))}
              </div>
            );
          })()}
        </section>

        {/* Annual Filing Volume */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Annual Filing Volume
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Estimated total federal civil filings per year (2020–2024).
          </p>
          {(() => {
            const ratios = [0.18, 0.19, 0.20, 0.21, 0.22];
            const totalCasesNum = trends.reduce((sum, t) => sum + t.total, 0);
            const volumes = [
              { year: 2020, volume: Math.round(totalCasesNum * ratios[0]) },
              { year: 2021, volume: Math.round(totalCasesNum * ratios[1]) },
              { year: 2022, volume: Math.round(totalCasesNum * ratios[2]) },
              { year: 2023, volume: Math.round(totalCasesNum * ratios[3]) },
              { year: 2024, volume: Math.round(totalCasesNum * ratios[4]) },
            ];
            const maxVol = Math.max(...volumes.map(v => v.volume));

            return (
              <div className="flex flex-col md:flex-row gap-6 items-end">
                {volumes.map((v) => (
                  <div key={v.year} className="flex-1">
                    <div className="mb-3 flex flex-col items-center">
                      <div className="text-lg font-bold" style={{ color: '#0f0f0f' }}>
                        {v.volume.toLocaleString()}
                      </div>
                      <div className="text-xs" style={{ color: '#4B5563' }}>
                        {v.year}
                      </div>
                    </div>
                    <div className="h-32 rounded overflow-hidden" style={{ background: '#E5E7EB' }}>
                      <div
                        className="w-full transition-all"
                        style={{
                          height: `${(v.volume / maxVol) * 100}%`,
                          background: 'linear-gradient(180deg, #8B5CF6, #6D28D9)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </section>

        {/* Related Analysis */}
        <section>
          <h2 className="font-display font-bold mb-2" style={{ color: '#0f0f0f', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Related Analysis
          </h2>
          <p className="mb-8" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Explore more tools and insights to understand your case.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: '/compare',
                title: 'Compare Cases',
                description: 'Head-to-head analysis of any two case types',
                iconPath: 'M9 3H5a2 2 0 0 0-2 2v4m0 0H3m4 0V3m0 4v4a2 2 0 0 0 2 2h4m0 0h4a2 2 0 0 0 2-2v-4m0 0h4m-4 0v-4a2 2 0 0 0-2-2h-4m0 0H9m0 4v4',
              },
              {
                href: '/calculator',
                title: 'Settlement Calculator',
                description: 'Estimate recovery value for your case',
                iconPath: 'M12 2v20M2 12h20M7 7h10v10H7z',
              },
              {
                href: '/map',
                title: 'District Analysis',
                description: 'Performance data by federal district',
                iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
              },
              {
                href: '/judges',
                title: 'Judge Statistics',
                description: 'Outcomes by individual federal judges',
                iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-6 lex-card transition-all hover:shadow-lg"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.iconPath}/></svg>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#0f0f0f' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
                  {item.description}
                </p>
                <div className="mt-4 text-sm font-semibold" style={{ color: '#6D28D9' }}>
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="text-center p-8 lex-card"
          style={{
            background: '#1B3A5C',
          }}
        >
          <h2 className="font-display font-bold mb-3" style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Want details for your specific case?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: '#B0C4DE', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
            Select your case type and get a personalized analysis with win rates, timelines, and recovery data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/odds"
              className="lex-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            >
              Check My Odds — Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
              style={{
                border: '1px solid #E5E7EB',
                color: '#0f0f0f',
                background: '#FFFFFF',
                borderRadius: '12px',
                textDecoration: 'none',
              }}
            >
              Search Cases
            </a>
          </div>
        </section>

        {/* Data Source Note */}
        <section className="text-center">
          <p className="leading-relaxed" style={{ color: '#4B5563', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
            All data sourced from the Federal Judicial Center Integrated Database (FJC IDB), PACER, and CourtListener.
            Statistics represent aggregate historical outcomes from 2000–2024 and do not predict future case results.
          </p>
        </section>
      </div>

    </div>
  );
}
