import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { REAL_DATA } from '../../lib/realdata';
import { SITS } from '../../lib/data';
import NosExplorerClient from '../../components/NosExplorerClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'NOS Code Explorer — All Federal Civil Case Types',
  description: 'Explore all 84 Nature of Suit (NOS) codes used in federal civil litigation. Search, filter, and compare win rates, settlement data, duration, and recovery ranges.',
  alternates: { canonical: `${SITE_URL}/nos-explorer` },
  openGraph: {
    title: 'NOS Code Explorer — Federal Court Case Types',
    description: 'Interactive explorer for all 84 federal NOS codes with win rates, settlement data, and recovery ranges.',
    url: `${SITE_URL}/nos-explorer`,
    type: 'website',
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

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E7EB', background: '#1B3A5C' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>NOS Explorer</span>
          </div>

          <div style={{ paddingTop: 40, paddingBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600,
              letterSpacing: '1.5px', marginBottom: 16, background: '#8B5CF6',
              color: '#FFFFFF', textTransform: 'uppercase',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              DATABASE
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 16,
              color: '#FFFFFF', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              NOS Code Explorer
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6, maxWidth: 640,
              color: '#C7D1D8', fontFamily: 'var(--font-body)',
            }}>
              Every federal civil case is assigned a Nature of Suit (NOS) code. Explore all {nosData.length} NOS codes with real outcome data from {totalCases.toLocaleString()} cases.
            </p>

            <div style={{ display: 'flex', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'NOS Codes', value: String(nosData.length) },
                { label: 'Total Cases', value: `${(totalCases / 1000000).toFixed(1)}M+` },
                { label: 'Data Span', value: '2000–2024' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: '#FFFFFF' }}>{s.value}</div>
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
        <div style={{ marginTop: 48, padding: 32, background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 2 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
            What Are NOS Codes?
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4B5563', fontFamily: 'var(--font-body)', margin: '0 0 12px' }}>
            Nature of Suit (NOS) codes are a classification system used by federal courts to categorize civil cases by their legal subject matter. Assigned at filing, these three-digit codes enable statistical analysis of court activity and help identify trends across case types.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#4B5563', fontFamily: 'var(--font-body)', margin: '0 0 12px' }}>
            The coding system is maintained by the Administrative Office of the United States Courts and covers everything from contract disputes (NOS 110–199) to civil rights cases (NOS 440–449) to intellectual property (NOS 820–840).
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
            Data sourced from the Federal Judicial Center Integrated Database (FJC IDB) and public court records. MyCaseValue LLC is not a law firm.
          </p>
        </div>
      </div>
    </div>
  );
}
