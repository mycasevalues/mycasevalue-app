import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { SITS, OUTCOME_DATA } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { getUserTier } from '../../../lib/access';
import { getSupabaseAdmin, CaseStats } from '../../../lib/supabase';
import { getOpinionsByType, getRECAPByType } from '../../../lib/courtlistener';
import ReportPDFButton from './ReportPDFButton';
import ShareButtons from '../../../components/ui/ShareButtons';

export const revalidate = 0;

// Find a label for a NOS code by searching SITS
function getNosLabel(nos: string): string {
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      if (opt.nos === nos) return opt.label;
    }
  }
  // Check if it's a category ID instead of a NOS code
  const cat = SITS.find(c => c.id === nos);
  if (cat) return cat.label;
  return `Case Type ${nos}`;
}

// Find category label for a NOS code
function getCategoryLabel(nos: string): string {
  for (const cat of SITS) {
    for (const opt of cat.opts) {
      if (opt.nos === nos) return cat.label;
    }
  }
  return '';
}

// Get the best available data for this NOS code or category ID
function getReportData(nos: string) {
  // First check if it's a direct NOS code
  if (OUTCOME_DATA[nos]) {
    return { outcome: OUTCOME_DATA[nos], real: REAL_DATA[nos] || null };
  }
  // Check if it's a SITS category ID (e.g. "work", "injury")
  const cat = SITS.find(c => c.id === nos);
  if (cat && cat.opts.length > 0) {
    const firstNos = cat.opts[0].nos;
    return { outcome: OUTCOME_DATA[firstNos] || OUTCOME_DATA._default, real: REAL_DATA[firstNos] || null };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nos: string }>;
}): Promise<Metadata> {
  const { nos } = await params;
  const label = getNosLabel(nos);
  return {
    title: `${label} Report | MyCaseValue`,
    description: `Federal court outcome report for ${label} cases. Win rates, settlement data, timelines, and more.`,
    alternates: { canonical: `https://www.mycasevalues.com/report/${nos}` },
  };
}

export default async function ReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ nos: string }>;
  searchParams: Promise<{ district?: string }>;
}) {
  const { nos } = await params;
  const { district } = await searchParams;
  const districtLabel = district || 'National Average';

  // ─── Try Supabase case_stats first, fall back to static data ───
  let dbStats: CaseStats | null = null;
  try {
    const adminDb = getSupabaseAdmin();
    // Try matching by NOS code first
    let { data: row } = await adminDb
      .from('case_stats')
      .select('*')
      .eq('nos_code', nos)
      .single();
    if (!row) {
      // Try matching by category (SITS id)
      const cat = SITS.find(c => c.id === nos);
      if (cat && cat.opts.length > 0) {
        const result = await adminDb
          .from('case_stats')
          .select('*')
          .eq('nos_code', cat.opts[0].nos)
          .single();
        row = result.data;
      }
    }
    if (row) dbStats = row as CaseStats;
  } catch {
    // Supabase unavailable — will use static data
  }

  const data = getReportData(nos);

  if (!data && !dbStats) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '64px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 12 }}>
          No data found for this case type.
        </p>
        <p style={{ fontSize: 14, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', marginBottom: 24 }}>
          We don&apos;t have outcome data for code &ldquo;{nos}&rdquo; yet.
        </p>
        <Link href="/cases" style={{ fontSize: 14, color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
          ← Back to case types
        </Link>
      </div>
    );
  }

  // ─── Tier Check ────────────────────────────────────────────────
  let tier: 'free' | 'single_report' | 'unlimited' | 'attorney' = 'free';
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: () => {},
          remove: () => {},
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      tier = await getUserTier(user.email);
    }
  } catch {
    // Supabase not configured or auth failed — default to free
  }

  const isPremium = tier === 'single_report' || tier === 'unlimited' || tier === 'attorney';

  // Merge DB stats with static fallback
  const { outcome, real } = data || { outcome: OUTCOME_DATA._default, real: null };
  const label = dbStats?.label || getNosLabel(nos);
  const categoryLabel = dbStats?.category || getCategoryLabel(nos);
  const totalCases = dbStats?.total_cases || real?.total || null;
  const settlementRange = dbStats
    ? { lo: dbStats.settlement_lo, md: Math.round(dbStats.median_settlement), hi: dbStats.settlement_hi }
    : real?.rng || null;
  const medianDuration = dbStats?.avg_duration_months || real?.mo || outcome.set_mo || 14;
  const trialMedian = outcome.trial_med || 'N/A';
  const winRate = dbStats?.win_rate ?? outcome.trial_win;
  const settlementRate = dbStats?.settlement_rate ?? outcome.fav_set;
  const dismissRate = outcome.dismiss ?? (100 - (winRate + settlementRate));
  const proSeWinRate = dbStats?.pro_se_win_rate ?? real?.ps?.wr ?? null;
  const representedWinRate = dbStats?.represented_win_rate ?? real?.rr?.wr ?? null;

  // ─── CourtListener: opinions + RECAP dockets ──────────────────
  const [opinions, recapDockets] = await Promise.allSettled([
    getOpinionsByType(label, 3),
    getRECAPByType(label, 3),
  ]);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const opinionResults: any[] = opinions.status === 'fulfilled' ? opinions.value : [];
  const recapResults: any[] = recapDockets.status === 'fulfilled' ? recapDockets.value : [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
          <Link href="/search" style={{ fontSize: 13, color: 'var(--fg-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            ← Search cases
          </Link>

          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 8px',
            color: 'var(--fg-primary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}>
            {label} — Federal Court Outcomes
          </h1>

          <p style={{ fontSize: 15, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: '0 0 16px' }}>
            Based on {totalCases ? totalCases.toLocaleString() : 'thousands of'} federal cases · {districtLabel} · Public court records
            {categoryLabel ? ` · ${categoryLabel}` : ''}
          </p>

          <ShareButtons
            url={`https://www.mycasevalues.com/report/${nos}`}
            title={`${label} — Federal Court Outcome Data | MyCaseValue`}
          />

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, padding: '3px 8px', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 4, color: 'var(--fg-muted)' }}>
              FJC IDB · Updated quarterly
            </span>
            <span style={{ fontSize: 11, padding: '3px 8px', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 4, color: 'var(--fg-muted)' }}>
              CourtListener · Live
            </span>
            <span style={{ fontSize: 11, padding: '3px 8px', background: 'var(--bg-base)', border: '1px solid var(--border-default)', borderRadius: 4, color: 'var(--fg-muted)' }}>
              RECAP Archive · Live
            </span>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* ═══ FREE: Win Rate Analysis ═══ */}
        <section style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 12,
          padding: 24,
          marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
            Win Rate Analysis
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                {winRate}%
              </p>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>Plaintiff win rate</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                {settlementRate}%
              </p>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>Settlement rate</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                {dismissRate}%
              </p>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>Dismissal rate</p>
            </div>
          </div>
        </section>

        {/* ═══ FREE: Case Timeline ═══ */}
        <section style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 12,
          padding: 24,
          marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
            Case Timeline
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                {medianDuration} months
              </p>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>Median time from filing to resolution</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                {trialMedian}
              </p>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>Median trial award</p>
            </div>
          </div>
        </section>

        {/* ═══ PREMIUM: Settlement Range + Representation Impact ═══ */}
        {isPremium ? (
          <>
            {/* Settlement Range */}
            {settlementRange && (
              <section style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                  Settlement Range
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#DC2626', margin: '0 0 8px' }}>
                      25th Percentile
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                      ${settlementRange.lo}K
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0 }}>Conservative</p>
                  </div>
                  <div style={{ textAlign: 'center', background: 'rgba(129,140,248,0.06)', borderRadius: 8, padding: '12px 8px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#818CF8', margin: '0 0 8px' }}>
                      Median
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                      ${settlementRange.md}K
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0 }}>Typical</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#10B981', margin: '0 0 8px' }}>
                      75th Percentile
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                      ${(settlementRange.hi >= 1000 ? (settlementRange.hi / 1000).toFixed(1) + 'M' : settlementRange.hi + 'K')}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0 }}>Favorable</p>
                  </div>
                </div>
              </section>
            )}

            {/* Representation Impact */}
            {(proSeWinRate !== null && representedWinRate !== null) && (
              <section style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                  Representation Impact
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-base)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fg-muted)', margin: '0 0 8px' }}>
                      Self-Represented (Pro Se)
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg-primary)', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                      {proSeWinRate}%
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0 }}>
                      win rate{real?.ps?.total ? ` · ${real.ps.total.toLocaleString()} cases` : ''}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-base)', borderRadius: 8, border: '1px solid var(--border-default)' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fg-muted)', margin: '0 0 8px' }}>
                      Attorney Represented
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>
                      {representedWinRate}%
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0 }}>
                      win rate{real?.rr?.total ? ` · ${real.rr.total.toLocaleString()} cases` : ''}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* PDF Download Button — premium only */}
            <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 8 }}>
              <ReportPDFButton
                category={label}
                district={districtLabel}
                winRate={winRate}
                settlementMedian={settlementRange?.md || 0}
                timeline={medianDuration}
                tier={tier}
              />
            </div>
          </>
        ) : (
          /* ═══ PAYWALL: Upsell for free users ═══ */
          <section style={{
            background: 'var(--bg-surface)',
            border: '2px solid var(--accent-primary)',
            borderRadius: 12,
            padding: '40px 32px',
            textAlign: 'center',
            marginTop: 16,
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-display)',
              margin: '0 0 8px',
            }}>
              Unlock the full report
            </p>
            <p style={{
              color: 'var(--fg-muted)',
              fontSize: 15,
              fontFamily: 'var(--font-body)',
              margin: '0 0 8px',
              lineHeight: 1.6,
            }}>
              Settlement ranges, attorney impact data, representation analysis, and PDF export.
            </p>
            <p style={{
              color: 'var(--fg-muted)',
              fontSize: 13,
              fontFamily: 'var(--font-body)',
              margin: '0 0 24px',
            }}>
              Starting at <strong style={{ color: 'var(--fg-primary)' }}>$5.99</strong> for a single report
            </p>
            <a href="/pricing" style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'var(--accent-primary)',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
              See Pricing →
            </a>
          </section>
        )}

        {/* ═══ Related Court Records (CourtListener + RECAP) ═══ */}
        {(opinionResults.length > 0 || recapResults.length > 0) && (
          <section style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 12,
            padding: 24,
            marginTop: 16,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
              Related Court Records
            </h2>
            <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 20, fontFamily: 'var(--font-body)' }}>
              Live from CourtListener · RECAP Archive · Public federal court records
            </p>

            {opinionResults.length > 0 && (
              <>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
                  Federal Opinions
                </p>
                {opinionResults.map((op: any, i: number) => (
                  <div key={i} style={{
                    padding: '12px 0',
                    borderBottom: i < opinionResults.length - 1 ? '1px solid var(--border-default)' : 'none',
                  }}>
                    <a
                      href={op.absolute_url ? `https://www.courtlistener.com${op.absolute_url}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent-primary)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
                    >
                      {op.caseName || 'Federal Court Opinion'}
                    </a>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      {op.court || ''}{op.dateFiled ? ` · ${new Date(op.dateFiled).getFullYear()}` : ''}
                      {op.status ? ` · ${op.status}` : ''}
                    </p>
                  </div>
                ))}
              </>
            )}

            {recapResults.length > 0 && (
              <>
                <p style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--fg-secondary)',
                  marginBottom: 12,
                  marginTop: opinionResults.length > 0 ? 20 : 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-body)',
                }}>
                  RECAP Dockets
                </p>
                {recapResults.map((doc: any, i: number) => (
                  <div key={i} style={{
                    padding: '12px 0',
                    borderBottom: i < recapResults.length - 1 ? '1px solid var(--border-default)' : 'none',
                  }}>
                    <a
                      href={doc.absolute_url ? `https://www.courtlistener.com${doc.absolute_url}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent-primary)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
                    >
                      {doc.caseName || doc.docketNumber || 'Federal Court Docket'}
                    </a>
                    <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      {doc.court || ''}{doc.dateFiled ? ` · ${new Date(doc.dateFiled).getFullYear()}` : ''}
                      {doc.docketNumber ? ` · ${doc.docketNumber}` : ''}
                    </p>
                  </div>
                ))}
              </>
            )}

            <p style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 16, fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
              Court records provided by CourtListener.com and the RECAP Archive under open access principles.
              All documents are public federal court records.
            </p>
          </section>
        )}

        {/* ═══ Related Case Types ═══ */}
        {(() => {
          const parentCat = SITS.find(cat => cat.opts.some(opt => opt.nos === nos)) || SITS.find(cat => cat.id === nos);
          const related = parentCat?.opts
            ?.filter((opt: any) => opt.nos !== nos)
            ?.slice(0, 4)
            ?.map((opt: any) => ({ label: opt.label, nos: opt.nos })) || [];
          if (related.length === 0) return null;
          return (
            <section style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 12,
              padding: 24,
              marginTop: 16,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
                Related case types
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {related.map((t: any, i: number) => (
                  <Link
                    key={i}
                    href={`/report/${t.nos}`}
                    style={{
                      fontSize: 14,
                      color: 'var(--accent-primary)',
                      textDecoration: 'none',
                      padding: '10px 0',
                      borderBottom: i < related.length - 1 ? '1px solid var(--border-default)' : 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {t.label} →
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Disclaimer */}
        <p style={{ fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center', marginTop: 32, fontStyle: 'italic', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          This report shows aggregate historical data from public federal court records. Not legal advice. Results vary by individual case facts, evidence, representation, and jurisdiction.
        </p>
      </main>
    </div>
  );
}
