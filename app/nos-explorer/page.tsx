import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { REAL_DATA } from '../../lib/realdata';
import { SITS } from '../../lib/data';
const NosExplorerClient = dynamic(
  () => import('../../components/NosExplorerClient'),
  {
    loading: () => (
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontFamily: 'var(--font-ui)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>NOS Explorer</span>
          </div>

          <div style={{ paddingTop: 16, paddingBottom: 20 }}>
            <h1 style={{
              fontSize: '20px', fontWeight: 900, marginBottom: 8,
              color: 'var(--color-surface-0)', letterSpacing: '-1.5px', fontFamily: 'var(--font-legal)', lineHeight: 1.2,
            }}>
              NOS Code Explorer
            </h1>

            <p style={{
              fontSize: 14, lineHeight: 1.5, maxWidth: 640,
              color: 'var(--text-tertiary)', fontFamily: 'var(--font-ui)',
            }}>
              Search {nosData.length} federal case types with win rates and settlement data from {totalCases.toLocaleString()} cases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 48px' }}>
        <NosExplorerClient data={nosData} />

        {/* What are NOS Codes? */}
        <div style={{ marginTop: 48, padding: 32, background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 2 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-legal)', marginBottom: 12 }}>
            Understanding Federal Case Classifications
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', margin: '0 0 12px' }}>
            Nature of Suit (NOS) codes are a classification system used by federal courts to categorize civil cases by their legal subject matter. Assigned at filing, these three-digit codes enable statistical analysis of court activity and help identify trends across case types.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', margin: '0 0 12px' }}>
            The coding system is maintained by the Administrative Office of the United States Courts and covers everything from contract disputes (NOS 110–199) to civil rights cases (NOS 440–449) to intellectual property (NOS 820–840).
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)', margin: 0 }}>
            Data sourced from the Federal Judicial Center Integrated Database (FJC IDB) and public court records. MyCaseValue LLC is not a law firm.
          </p>
        </div>
      </div>
    </div>
  );
}
