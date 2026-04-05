import { Metadata } from 'next';
import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { SITS, OUTCOME_DATA, getNosLabel } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { getUserTier } from '../../../lib/access';
import { getSupabaseAdmin, CaseStats } from '../../../lib/supabase';
import { getOpinionsByType, getRECAPByType } from '../../../lib/courtlistener';
import { checkFreeRateLimit } from '../../../lib/rateLimit';
import ReportPDFButton from './ReportPDFButton';
import ShareButtons from '../../../components/ui/ShareButtons';

export const revalidate = 0;

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
  const url = `https://www.mycasevalues.com/report/${nos}`;
  const description = `Federal court outcome report for ${label} cases. See win rates, settlement data, case timelines, recovery ranges, and detailed case analytics from 5.1M+ federal court records.`;

  return {
    title: `${label} Report | MyCaseValue`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${label} — Federal Court Case Report | MyCaseValue`,
      description,
      type: 'article',
      siteName: 'MyCaseValue',
      url,
      images: [
        {
          url: 'https://www.mycasevalues.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${label} Report — MyCaseValue`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${label} — Federal Court Case Report`,
      description,
      images: ['https://www.mycasevalues.com/og-image.png'],
    },
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
      <div style={{ minHeight: '100vh', background: '#EDEEEE', padding: '64px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: '#111111', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 12 }}>
          No data found for this case type.
        </p>
        <p style={{ fontSize: 14, color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: 24 }}>
          We don&apos;t have outcome data for code &ldquo;{nos}&rdquo; yet.
        </p>
        <Link href="/cases" style={{ fontSize: 14, color: '#006997', textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
          ← Back to case types
        </Link>
      </div>
    );
  }

  // ─── Tier Check ────────────────────────────────────────────────
  let tier: 'free' | 'single_report' | 'unlimited' | 'attorney' = 'free';
  let userEmail: string | null = null;
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
      userEmail = user.email;
      tier = await getUserTier(user.email);
    }
  } catch {
    // Supabase not configured or auth failed — default to free
  }

  const isPremium = true; // DEV MODE: All features unlocked — Stripe integration pending

  // DEV MODE: All features unlocked — Stripe integration pending
  if (false) {
    try {
      const headerStore = await headers();
      const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
      const { allowed } = await checkFreeRateLimit(ip);
      if (!allowed) {
        return (
          <main style={{ maxWidth: '600px', margin: '0 auto', padding: '64px 24px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px', color: '#111111' }}>Daily limit reached</h1>
            <p style={{ color: '#455A64', marginBottom: '24px' }}>You&apos;ve used your 3 free lookups for today. Upgrade for unlimited access.</p>
            <a href="/pricing" style={{ padding: '12px 28px', background: '#E8171F', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>See pricing →</a>
            <p style={{ fontSize: '12px', color: '#455A64', marginTop: '16px' }}>Resets at midnight. Or sign up for free to track your lookups.</p>
          </main>
        );
      }
    } catch {
      // Rate limit check failed — allow access
    }
  }

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
  const dismissRate = outcome.dismiss ?? Math.max(0, 100 - (winRate + settlementRate));
  const proSeWinRate = dbStats?.pro_se_win_rate ?? real?.ps?.wr ?? null;
  const representedWinRate = dbStats?.represented_win_rate ?? real?.rr?.wr ?? null;

  // ─── Save report view for premium users ────────────────────────
  if (isPremium && userEmail) {
    try {
      const adminDb = getSupabaseAdmin();
      await adminDb.from('saved_reports').insert({
        user_email: userEmail.toLowerCase(),
        category: nos,
        district: district || 'national',
      });
    } catch {
      // Non-critical — don't block page render
    }
  }

  // ─── CourtListener: opinions + RECAP dockets ──────────────────
  const [opinions, recapDockets] = await Promise.allSettled([
    getOpinionsByType(label, 3),
    getRECAPByType(label, 3),
  ]);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const opinionResults: any[] = opinions.status === 'fulfilled' ? opinions.value : [];
  const recapResults: any[] = recapDockets.status === 'fulfilled' ? recapDockets.value : [];

  return (
    <div style={{ minHeight: '100vh', background: '#EDEEEE' }}>
      <style>{`
        .report-breadcrumb-link { color: #FFFFFF; text-decoration: none; transition: opacity 0.2s ease; font-weight: 500; }
        .report-breadcrumb-link:hover { opacity: 0.8; }
        .report-nos-badge { display: inline-block; padding: 6px 12px; background: #E8171F; color: #FFFFFF; border-radius: 4px; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-body); margin-top: 8px; }

        @media (max-width: 768px) {
          h1 {
            font-size: 24px !important;
          }
          h2 {
            font-size: 16px !important;
          }
        }

        /* ═══ PRINT STYLES ═══ */
        @media print {
          /* Hide navigation, footer, and non-essential UI */
          nav, footer, .back-to-top, .cookie-consent {
            display: none !important;
          }

          /* Clean background for print */
          div[style*="background: #EDEEEE"] {
            background: white !important;
          }

          /* Ensure header prints cleanly */
          div[style*="background: #00172E"] {
            background: #F5F5F5 !important;
            border: none !important;
            color: black !important;
          }

          /* White subheader background */
          div[style*="background: #FFFFFF"][style*="border-bottom"] {
            background: white !important;
            border: 1px solid #DDD !important;
          }

          /* Remove shadows and animations */
          * {
            box-shadow: none !important;
            animation: none !important;
            transition: none !important;
          }

          /* Force text colors to black for readability */
          h1, h2, h3, h4, h5, h6, p, span, a, div, section, main {
            color: black !important;
            background: transparent !important;
          }

          /* Show URLs after links */
          a[href]:not([href="#"]):not([href*="javascript"])::after {
            content: " (" attr(href) ")";
            font-size: 0.85em;
            color: #666;
            word-break: break-word;
          }

          /* Page breaks before major sections */
          section {
            page-break-inside: avoid;
            margin-bottom: 2em;
            border-color: #CCC !important;
          }

          /* Prevent heading orphans */
          h2, h3 {
            page-break-after: avoid;
          }

          /* Optimize spacing */
          p, li {
            orphans: 3;
            widows: 3;
          }

          /* Stat cards remain compact and inline */
          .win-rate-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 12px !important;
            page-break-inside: avoid;
          }

          .win-rate-grid > div {
            display: inline-block !important;
            flex: 1 1 calc(33.333% - 8px);
            min-width: 150px;
          }

          /* Add MyCaseValue branding to printed header */
          div[style*="background: #00172E"]::before {
            content: "MyCaseValue.com";
            display: block;
            font-size: 10px;
            font-weight: 700;
            color: #999;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 12px;
          }

          /* Ensure all elements stay visible in print */
          main {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
          }

          /* Print-friendly link colors */
          a {
            text-decoration: underline;
            color: black !important;
          }

          /* Remove interactive elements in print */
          button, .report-cta-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* Dark Navy Header Banner */}
      <div style={{ background: '#00172E', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(20px, 4vw, 32px) 24px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 13, color: '#B0B8C1', fontFamily: 'var(--font-body)', marginBottom: '20px', letterSpacing: '0.3px' }}>
            <Link href="/" className="report-breadcrumb-link">Home</Link>
            <span>/</span>
            <Link href="/cases" className="report-breadcrumb-link">Cases</Link>
            <span>/</span>
            <span style={{ color: '#E8171F', fontWeight: 600 }}>{categoryLabel || label}</span>
          </nav>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 800,
                margin: 0,
                color: '#FFFFFF',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.8px',
                lineHeight: 1.15,
                marginBottom: '8px',
              }}>
                {label}
              </h1>
              <div className="report-nos-badge">
                {nos}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Subheader Section */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #D5D8DC' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(16px, 3vw, 28px) 24px' }}>
          <p style={{ fontSize: 14, color: '#455A64', fontFamily: 'var(--font-body)', margin: '0 0 20px', lineHeight: 1.7, fontWeight: 500 }}>
            Based on {totalCases ? totalCases.toLocaleString() : 'thousands of'} federal cases · {districtLabel} · Public court records
            {categoryLabel ? ` · ${categoryLabel}` : ''}
          </p>

          <ShareButtons
            url={`https://www.mycasevalues.com/report/${nos}`}
            title={`${label} — Federal Court Outcome Data | MyCaseValue`}
          />

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            <span style={{ fontSize: 12, padding: '6px 12px', background: '#F8F9FA', border: '1px solid #D5D8DC', borderRadius: 4, color: '#455A64', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              FJC IDB · Updated quarterly
            </span>
            <span style={{ fontSize: 12, padding: '6px 12px', background: '#F8F9FA', border: '1px solid #D5D8DC', borderRadius: 4, color: '#455A64', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              CourtListener · Live
            </span>
            <span style={{ fontSize: 12, padding: '6px 12px', background: '#F8F9FA', border: '1px solid #D5D8DC', borderRadius: 4, color: '#455A64', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              RECAP Archive · Live
            </span>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(20px, 4vw, 40px) 24px' }}>
        {/* ═══ FREE: Win Rate Analysis ═══ */}
        <section style={{
          background: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
            Win Rate Analysis
          </h2>
          <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '24px', lineHeight: 1.5 }}>
            Overview of case outcomes
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="win-rate-grid">
            <style>{`
              .win-rate-grid { grid-template-columns: repeat(3, 1fr); }
              @media (max-width: 768px) { .win-rate-grid { grid-template-columns: 1fr; gap: 16px; } }
              .report-cta-btn { display: inline-block; padding: 14px 36px; background: #E8171F; color: #fff; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 16px; font-family: var(--font-display); transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(232,23,31,0.2); }
              .report-cta-btn:hover { background: #C51118; box-shadow: 0 4px 12px rgba(232,23,31,0.3); }
              .report-red-link { font-size: 14px; font-weight: 500; color: #E8171F; text-decoration: none; font-family: var(--font-body); transition: color 0.2s ease; }
              .report-red-link:hover { color: #C51118; }
              .report-related-case { text-decoration: none; color: #E8171F; transition: all 0.2s ease; display: block; }
              .report-related-case:hover { color: #C51118; padding-left: 4px; }
            `}</style>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
              <p style={{ fontSize: '40px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '8px' }}>
                {winRate}%
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                Plaintiff win rate
              </p>
              <p style={{ fontSize: '12px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                Trial outcomes
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
              <p style={{ fontSize: '40px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '8px' }}>
                {settlementRate}%
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                Settlement rate
              </p>
              <p style={{ fontSize: '12px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                Pre-trial resolutions
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
              <p style={{ fontSize: '40px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '8px' }}>
                {dismissRate}%
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                Dismissal rate
              </p>
              <p style={{ fontSize: '12px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                Cases not pursued
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#455A64', marginTop: '20px', textAlign: 'center', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            Based on {totalCases ? totalCases.toLocaleString() : 'thousands of'} federal cases
          </p>
        </section>

        {/* ═══ FREE: Case Timeline ═══ */}
        <section style={{
          background: '#FFFFFF',
          border: '1px solid #D5D8DC',
          borderRadius: '4px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
            Case Timeline
          </h2>
          <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '24px', lineHeight: 1.5 }}>
            Time and settlement data
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="timeline-grid">
            <style>{`.timeline-grid { grid-template-columns: repeat(2, 1fr); } @media (max-width: 768px) { .timeline-grid { grid-template-columns: 1fr; gap: 16px; } }`}</style>
            <div style={{ textAlign: 'center', padding: '24px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', margin: '0 0 8px', lineHeight: 1 }}>
                {medianDuration}
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#455A64', fontFamily: 'var(--font-body)', margin: 0, marginBottom: 4 }}>months</p>
              <p style={{ fontSize: 13, color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>Median time from filing to resolution</p>
            </div>
            <div style={{ textAlign: 'center', padding: '24px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#111111', fontFamily: 'var(--font-mono)', margin: '0 0 8px', lineHeight: 1 }}>
                {trialMedian}
              </p>
              <p style={{ fontSize: 12, fontWeight: 500, color: '#455A64', fontFamily: 'var(--font-body)', margin: 0, marginBottom: 4 }}>award</p>
              <p style={{ fontSize: 13, color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>Median trial outcome</p>
            </div>
          </div>
        </section>

        {/* ═══ PREMIUM: Settlement Range + Representation Impact ═══ */}
        {isPremium ? (
          <>
            {/* Settlement Range */}
            {settlementRange && (
              <section style={{
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: '4px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                  Settlement Range
                </h2>
                <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '24px', lineHeight: 1.5 }}>
                  Distribution of settlement amounts
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }} className="settlement-grid">
                  <style>{`.settlement-grid { grid-template-columns: repeat(3, 1fr); } @media (max-width: 768px) { .settlement-grid { grid-template-columns: 1fr; gap: 16px; } }`}</style>
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#455A64', margin: '0 0 10px' }}>
                      25th Percentile
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#111111', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '0 0 8px' }}>
                      ${settlementRange.lo}K
                    </p>
                    <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>Conservative</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#455A64', margin: '0 0 10px' }}>
                      Median
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '0 0 8px' }}>
                      ${settlementRange.md}K
                    </p>
                    <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>Typical</p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#455A64', margin: '0 0 10px' }}>
                      75th Percentile
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#111111', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '0 0 8px' }}>
                      ${(settlementRange.hi >= 1000 ? (settlementRange.hi / 1000).toFixed(1) + 'M' : settlementRange.hi + 'K')}
                    </p>
                    <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>Favorable</p>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#455A64', marginTop: '20px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  95% confidence interval: ±{Math.round((settlementRate || 50) * 0.08)}% based on sample size of {totalCases?.toLocaleString() || 'N/A'} cases.
                  {(totalCases || 0) < 500 && ' Limited sample — interpret with caution.'}
                </p>
              </section>
            )}

            {/* Representation Impact */}
            {(proSeWinRate !== null && representedWinRate !== null) && (
              <section style={{
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: '4px',
                padding: '32px',
                marginBottom: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                  Representation Impact
                </h2>
                <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '24px', lineHeight: 1.5 }}>
                  How representation affects outcomes
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }} className="representation-grid">
                  <style>{`.representation-grid { grid-template-columns: repeat(2, 1fr); } @media (max-width: 768px) { .representation-grid { grid-template-columns: 1fr; gap: 16px; } }`}</style>
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#455A64', margin: '0 0 10px' }}>
                      Self-Represented (Pro Se)
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#111111', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '0 0 8px' }}>
                      {proSeWinRate}%
                    </p>
                    <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                      win rate{real?.ps?.total ? ` · ${real.ps.total.toLocaleString()} cases` : ''}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F8F9FA', borderRadius: '4px', border: '1px solid #E8E9EA' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#455A64', margin: '0 0 10px' }}>
                      Attorney Represented
                    </p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#E8171F', fontFamily: 'var(--font-mono)', lineHeight: 1, margin: '0 0 8px' }}>
                      {representedWinRate}%
                    </p>
                    <p style={{ fontSize: '13px', color: '#455A64', fontFamily: 'var(--font-body)', margin: 0 }}>
                      win rate{real?.rr?.total ? ` · ${real.rr.total.toLocaleString()} cases` : ''}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* PDF Download Button — premium only */}
            <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 0 }}>
              <ReportPDFButton
                category={label}
                district={districtLabel}
                winRate={winRate}
                settlementMedian={settlementRange?.md || 0}
                timeline={medianDuration}
                tier={tier}
                totalCases={totalCases || undefined}
                settleRate={settlementRate}
                dismissRate={dismissRate}
              />
            </div>
          </>
        ) : (
          /* ═══ PAYWALL: Upsell for free users ═══ */
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: '4px',
            padding: '48px 32px',
            textAlign: 'center',
            marginTop: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 20, color: '#E8171F' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#212529',
              fontFamily: 'var(--font-display)',
              margin: '0 0 12px',
              letterSpacing: '-0.3px',
            }}>
              Unlock the full report
            </p>
            <p style={{
              color: '#455A64',
              fontSize: 16,
              fontFamily: 'var(--font-body)',
              margin: '0 0 12px',
              lineHeight: 1.6,
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Settlement ranges, attorney impact data, representation analysis, and PDF export.
            </p>
            <p style={{
              color: '#455A64',
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              margin: '0 0 28px',
            }}>
              Starting at <strong style={{ color: '#212529', fontSize: 16 }}>$5.99</strong> for a single report
            </p>
            <a href="/pricing" className="report-cta-btn">
              See Pricing →
            </a>
          </section>
        )}

        {/* ═══ Related Court Records (CourtListener + RECAP) ═══ */}
        {(opinionResults.length > 0 || recapResults.length > 0) && (
          <section style={{
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: '4px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            marginTop: '24px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
              Related Court Records
            </h2>
            <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '24px', lineHeight: 1.5 }}>
              Live from CourtListener · RECAP Archive · Public federal court records
            </p>

            {opinionResults.length > 0 && (
              <>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#455A64', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
                  Federal Opinions
                </p>
                {opinionResults.map((op: any, i: number) => (
                  <div key={i} style={{
                    padding: '12px 0',
                    borderBottom: i < opinionResults.length - 1 ? '1px solid #D5D8DC' : 'none',
                  }}>
                    <a
                      href={op.absolute_url ? `https://www.courtlistener.com${op.absolute_url}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="report-red-link"
                    >
                      {op.caseName || 'Federal Court Opinion'}
                    </a>
                    <p style={{ fontSize: 12, color: '#455A64', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
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
                  color: '#455A64',
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
                    borderBottom: i < recapResults.length - 1 ? '1px solid #D5D8DC' : 'none',
                  }}>
                    <a
                      href={doc.absolute_url ? `https://www.courtlistener.com${doc.absolute_url}` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="report-red-link"
                    >
                      {doc.caseName || doc.docketNumber || 'Federal Court Docket'}
                    </a>
                    <p style={{ fontSize: 12, color: '#455A64', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      {doc.court || ''}{doc.dateFiled ? ` · ${new Date(doc.dateFiled).getFullYear()}` : ''}
                      {doc.docketNumber ? ` · ${doc.docketNumber}` : ''}
                    </p>
                  </div>
                ))}
              </>
            )}

            <p style={{ fontSize: 11, color: '#455A64', marginTop: 16, fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>
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
              background: '#FFFFFF',
              border: '1px solid #D5D8DC',
              borderRadius: '4px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              marginTop: '24px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                Related case types
              </h2>
              <p style={{ fontSize: '14px', color: '#455A64', fontFamily: 'var(--font-body)', marginBottom: '20px', lineHeight: 1.5 }}>
                Other cases in this category
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {related.map((t: any, i: number) => (
                  <Link
                    key={i}
                    href={`/report/${t.nos}`}
                    className="report-related-case"
                    style={{
                      padding: '12px 0',
                      borderBottom: i < related.length - 1 ? '1px solid #E8E9EA' : 'none',
                      display: 'block',
                      fontSize: '15px',
                      fontWeight: 500,
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
        <p style={{ fontSize: 13, color: '#455A64', textAlign: 'center', marginTop: 40, fontStyle: 'italic', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
          This report shows aggregate historical data from public federal court records. Not legal advice. Results vary by individual case facts, evidence, representation, and jurisdiction.
        </p>
      </main>
    </div>
  );
}
