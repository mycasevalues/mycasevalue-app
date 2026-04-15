import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { REAL_DATA } from '../../lib/realdata';
import { SITS } from '../../lib/data';
const NosExplorerClient = dynamic(
  () => import('../../components/NosExplorerClient'),
  {
    loading: () => (
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
        Loading explorer...
      </div>
    ),
    ssr: false,
  }
);
import dynamic from 'next/dynamic';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'NOS Code Explorer — All 84 Federal Case Types',
  description: 'Explore all 84 Nature of Suit (NOS) codes used in federal civil litigation. Search, filter, and compare win rates, settlement data, duration, and recovery ranges.',
  alternates: { canonical: `${SITE_URL}/nos-explorer` },
  openGraph: {
    title: 'NOS Code Explorer — All 84 Federal Case Types',
    description: 'Interactive explorer for all 84 federal NOS codes with win rates, settlement data, timelines, and recovery ranges.',
    url: `${SITE_URL}/nos-explorer`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'NOS Code Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOS Code Explorer',
    description: 'Explore all 84 federal NOS codes with case outcome data.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

interface NosRow {
  nos: string;
  label: string;
  category: string;
  categoryLabel: string;
  total: number;
  wr: number;
  sp: number;
  mo: number;
  rngLo: number;
  rngMd: number;
  rngHi: number;
}

function buildNosData(): NosRow[] {
  const rows: NosRow[] = [];
  const catMap: Record<string, string> = {};
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      catMap[opt.nos] = cat.id;
    }
  }
  const catLabels: Record<string, string> = {};
  for (const cat of SITS) {
    catLabels[cat.id] = cat.label;
  }

  for (const [nos, data] of Object.entries(REAL_DATA)) {
    if (!data || !data.total) continue;
    rows.push({
      nos,
      label: (data as any).label || `NOS ${nos}`,
      category: catMap[nos] || 'other',
      categoryLabel: catLabels[catMap[nos]] || 'Other',
      total: data.total,
      wr: data.wr || 0,
      sp: data.sp || 0,
      mo: data.mo || 0,
      rngLo: data.rng?.lo || 0,
      rngMd: data.rng?.md || 0,
      rngHi: data.rng?.hi || 0,
    });
  }

  return rows.sort((a, b) => b.total - a.total);
}

export default function NosExplorerPage() {
  const nosData = buildNosData();
  const totalCases = nosData.reduce((s, r) => s + r.total, 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'NOS Explorer', item: `${SITE_URL}/nos-explorer` },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'NOS Code Explorer - MyCaseValue',
        url: `${SITE_URL}/nos-explorer`,
        applicationCategory: 'LegalApplication',
        description: 'Interactive explorer for federal court Nature of Suit (NOS) codes with case statistics and settlement data.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--accent-primary)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>NOS Explorer</span>
          </div>

          <div style={{ paddingTop: 40, paddingBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600,
              letterSpacing: '1.5px', marginBottom: 16, background: 'var(--accent-primary)',
              color: 'var(--color-surface-0)', textTransform: 'uppercase',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              DATABASE
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 16,
              color: 'var(--color-surface-0)', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              Find Your Case Type. See Real Outcomes.
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6, maxWidth: 640,
              color: '#C7D1D8', fontFamily: 'var(--font-body)',
            }}>
              Search all {nosData.length} federal case types with actual win rates, settlement ranges, and case duration from {totalCases.toLocaleString()} real federal cases. No predictions, no guesses—just data.
            </p>

            <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'NOS Codes', value: String(nosData.length) },
                { label: 'Total Cases', value: `${(totalCases / 1000000).toFixed(1)}M+` },
                { label: 'Data Span', value: '2000–2024' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: 'var(--color-surface-0)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 48px' }}>
        <NosExplorerClient data={nosData} />

        {/* What are NOS Codes? */}
        <div style={{ marginTop: 48, padding: 32, background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 2 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
            Understanding Federal Case Classifications
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', margin: '0 0 12px' }}>
            Nature of Suit (NOS) codes are a classification system used by federal courts to categorize civil cases by their legal subject matter. Assigned at filing, these three-digit codes enable statistical analysis of court activity and help identify trends across case types.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', margin: '0 0 12px' }}>
            The coding system is maintained by the Administrative Office of the United States Courts and covers everything from contract disputes (NOS 110–199) to civil rights cases (NOS 440–449) to intellectual property (NOS 820–840).
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', margin: 0 }}>
            Data sourced from the Federal Judicial Center Integrated Database (FJC IDB) and public court records. MyCaseValue LLC is not a law firm.
          </p>
        </div>
      </div>
    </div>
  );
}
