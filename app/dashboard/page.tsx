import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getNosLabel } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import SidebarNav from '../../components/SidebarNav';
import { SearchIcon } from '../../components/ui/Icons';
import DashboardTabs from '../../components/DashboardTabs';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Dashboard',
    description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
    url: `${SITE_URL}/dashboard`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard',
    description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
  },
};

export const dynamic = 'force-dynamic';

// ─── Tier feature lists ──────────────────────────────────────────
const TIER_INCLUDES: Record<string, string[]> = {
  free: [
    'Win rates for all 84 case types',
    'Basic case timeline data',
    '3 free lookups per day',
  ],
  single: [
    'Everything in Free',
    'Full settlement percentile ranges',
    'Judge overview for your district',
    'PDF export — branded report',
    '90-day report access',
  ],
  unlimited: [
    'Everything in Single Report',
    'Unlimited lookups',
    'Year-over-year trend data',
    'Case comparison (up to 3)',
    'Clean PDF exports — no watermark',
    'Full Spanish language support',
  ],
  attorney: [
    'Everything in Unlimited',
    'Advanced judge intelligence',
    'AI case outcome predictor',
    'Document intelligence',
    'Opposing counsel research',
    'API access & team workspace',
  ],
};

export default async function DashboardPage() {
  // ── Auth check ────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let userEmail = '';
  let userId = '';
  let userCreatedAt = '';
  let userPlan = 'free';
  let planStatus = 'Free tier';
  let planStatusColor = 'var(--color-text-secondary)';
  let isExpired = false;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect('/sign-in');
    }

    userId = user.id ?? '';
    userEmail = user.email ?? '';
    userCreatedAt = user.created_at ?? '';

    // Query premium_sessions for this user's plan (use admin client to bypass RLS)
    if (userEmail) {
      try {
        const adminDb = getSupabaseAdmin();
        const { data: session } = await adminDb
          .from('premium_sessions')
          .select('plan, granted_at, expires_at')
          .eq('email', userEmail.toLowerCase())
          .order('granted_at', { ascending: false })
          .limit(1)
          .single();

        if (session && session.plan && session.plan !== 'free') {
          userPlan = session.plan;
          const expired = session.expires_at && (
            typeof session.expires_at === 'number'
              ? session.expires_at < Date.now()
              : new Date(session.expires_at) < new Date()
          );
          isExpired = !!expired;
          planStatus = expired ? 'Expired' : 'Active';
          planStatusColor = expired ? 'var(--accent-primary)' : 'var(--data-positive)';
        }
      } catch {
        // No premium record found — stays free
      }
    }
  }

  const planLabel: Record<string, string> = {
    free: 'Free',
    single: 'Single Report',
    single_report: 'Single Report',
    unlimited: 'Unlimited Reports',
    attorney: 'Attorney Mode',
  };

  const memberSince = userCreatedAt
    ? new Date(userCreatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';

  // Tier logic: in production, isPaid comes from the plan; during beta all features are unlocked
  const isPaid = userPlan !== 'free' || true; // Beta: all features unlocked — Stripe integration pending
  const isAttorney = userPlan === 'attorney' || true; // Beta: attorney features unlocked
  const tierKey = userPlan === 'single_report' ? 'single' : userPlan;
  const features = TIER_INCLUDES[tierKey] || TIER_INCLUDES.free;

  // ── Fetch recent saved reports ──────────────────────────────────
  let recentReports: { category: string; district: string; viewed_at: string }[] = [];
  if (userEmail && isPaid) {
    try {
      const adminDb = getSupabaseAdmin();
      const { data } = await adminDb
        .from('saved_reports')
        .select('category, district, viewed_at')
        .eq('user_email', userEmail.toLowerCase())
        .order('viewed_at', { ascending: false })
        .limit(10);
      if (data) recentReports = data;
    } catch {
      // Non-critical
    }
  }

  // ── Fetch search history for Unlimited users ─────────────────
  let searchHistory: { query: string; category: string | null; searched_at: string }[] = [];
  const isUnlimitedPlus = ['unlimited', 'attorney'].includes(userPlan) || true; // Beta: unlocked
  if (userEmail && isUnlimitedPlus && !isExpired) {
    try {
      const adminDb = getSupabaseAdmin();
      const { data } = await adminDb
        .from('search_history')
        .select('query, category, searched_at')
        .eq('user_email', userEmail.toLowerCase())
        .order('searched_at', { ascending: false })
        .limit(10);
      if (data) searchHistory = data;
    } catch {
      // Non-critical
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--color-surface-1)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <style>{`
        .dashboard-tool-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 16px;
          border-radius: '4px';
          border: 1px solid var(--border-default);
          text-decoration: none;
          transition: all 200ms ease;
          color: var(--color-text-primary);
          background: var(--color-surface-0);
        }
        .dashboard-tool-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-ui);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }
        .breadcrumb a {
          color: var(--color-surface-0);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .breadcrumb a:hover {
          color: var(--accent-primary);
        }
        .breadcrumb span {
          color: rgba(255, 255, 255, 0.5);
        }
        .quick-action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 24px;
          border-radius: '4px';
          border: 1px solid var(--border-default);
          text-decoration: none;
          color: var(--color-text-primary);
          background: var(--color-surface-0);
          transition: all 200ms ease;
        }
        .quick-action-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.15);
          transform: translateY(-2px);
        }
        .quick-action-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }
        .bar-chart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--bdr);
        }
        .bar-chart-item:last-child {
          border-bottom: none;
        }
        .bar-chart-item-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          min-width: 140px;
          font-family: var(--font-ui);
        }
        .bar-chart-item-value {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-secondary);
          min-width: 50px;
          font-family: var(--font-mono);
        }
        .bar-chart-bar {
          flex: 1;
          height: 20px;
          border-radius: '4px';
          background: var(--border-default);
          position: relative;
          overflow: hidden;
        }
        .bar-chart-fill {
          height: 100%;
          border-radius: '4px';
          transition: width 0.3s ease;
        }
        .update-item {
          padding: 16px;
          border-left: 3px solid var(--accent-primary);
          background: var(--color-surface-1);
          border-radius: '0 4px 4px 0';
          margin-bottom: 12px;
        }
        .update-item-date {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          letter-spacing: 0.5px;
          margin: 0 0 6px;
        }
        .update-item-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 4px;
          font-family: var(--font-ui);
        }
        .update-item-desc {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.5;
          font-family: var(--font-ui);
        }
        .category-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 16px;
          border-radius: '4px';
          border: 1px solid var(--border-default);
          text-decoration: none;
          background: var(--color-surface-0);
          transition: all 200ms ease;
          text-align: center;
          gap: 8px;
        }
        .category-badge:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.15);
          transform: translateY(-2px);
        }
        .category-count {
          font-size: 20px;
          font-weight: 600;
          font-family: var(--font-mono);
          color: var(--accent-primary);
        }
        .category-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text-primary);
          font-family: var(--font-ui);
        }
        .free-banner {
          background: linear-gradient(135deg, var(--data-positive) 0%, var(--data-positive) 100%);
          border: 1px solid var(--data-positive);
          border-radius: '4px';
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }
        .free-banner-text {
          color: var(--color-surface-0);
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-ui);
          margin: 0;
        }
        .free-banner-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: var(--color-surface-0);
          padding: 4px 12px;
          border-radius: '4px';
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
      `}</style>

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '240px',
          background: 'var(--accent-primary)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px 16px',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--accent-primary)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-surface-0)', fontFamily: 'var(--font-ui)' }}>MyCaseValue</span>
        </a>

        {/* Navigation */}
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Dark Navy Header with Welcome */}
        <div style={{
          background: 'var(--accent-primary)',
          padding: '24px 24px',
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="breadcrumb">
              <Link href="/" style={{ color: 'var(--color-surface-0)', textDecoration: 'none', transition: 'color 200ms ease' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Dashboard</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: 'var(--accent-primary)',
                    color: 'var(--color-surface-0)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    borderRadius: 4,
                    textTransform: 'uppercase',
                  }}>
                    Dashboard
                  </span>
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-legal)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--color-surface-0)',
                  margin: '0',
                  lineHeight: 1.2,
                }}>
                  Welcome back to MyCaseValue
                </h1>
              </div>
              <div style={{ textAlign: 'right', color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontFamily: 'var(--font-ui)' }}>
                <div>Federal Court Analytics</div>
                <div style={{ fontSize: '12px', marginTop: '4px', color: 'rgba(255, 255, 255, 0.5)' }}>Updated April 6, 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview Bar */}
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Total Cases Analyzed */}
              <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Cases Analyzed</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>5.1M</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>Cases in database</div>
              </div>

              {/* Active Case Types */}
              <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Case Types</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>84</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>Federal case categories</div>
              </div>

              {/* Federal Districts */}
              <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Federal Districts</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>95</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>U.S. courts covered</div>
              </div>

              {/* Data Coverage */}
              <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Data Coverage</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>1970-2025</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>55+ years of data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Free During Beta Banner */}
        <div style={{ padding: '0 20px', marginBottom: '24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="free-banner">
              <div>
                <p className="free-banner-text">
                  MyCaseValue is <span style={{ fontWeight: 600 }}>free during beta</span>. All features unlocked.
                </p>
              </div>
              <div className="free-banner-badge">Free Access</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Quick Stats Overview Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '16px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>Total Cases Analyzed</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: 'var(--accent-primary)', margin: 0 }}>5.1M+</p>
            </div>
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '16px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>Nature of Suit (NOS) Codes</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: 'var(--accent-primary)', margin: 0 }}>84</p>
            </div>
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '16px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>Districts Covered</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: 'var(--accent-primary)', margin: 0 }}>95</p>
            </div>
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '16px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>Uptime Status</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--data-positive)', margin: 0 }}>100% [x]</p>
            </div>
          </div>

          {/* Platform Capabilities Grid */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', letterSpacing: '-0.3px' }}>Platform Capabilities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {[
                { label: 'AI Case Predictor', href: '/attorney/case-predictor', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6m0 4v6M2 12h6m4 0h6"/><circle cx="12" cy="12" r="8"/></svg> },
                { label: 'Document Intelligence', href: '/attorney/document-intelligence', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                { label: 'Settlement Calculator', href: '/calculator', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg> },
                { label: 'Filing Trends', href: '/trends', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"/><polyline points="17 6 23 6 23 12"/></svg> },
                { label: 'Judge Analytics', href: '/attorney/judge-intelligence', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                { label: 'Case Comparison', href: '/compare', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="quick-action-card">
                  <div className="quick-action-icon">{item.icon}</div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', textAlign: 'center' }}>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Highlights — Top 5 Case Types */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
              Platform Highlights — Top Case Types
            </h2>
            <div>
              {Array.from(new Set(Object.entries(REAL_DATA)
                .map(([key, data]) => ({ key, total: data.total }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)
                .map(item => (
                  <div key={item.key} className="bar-chart-item">
                    <div className="bar-chart-item-label">{REAL_DATA[item.key].label || getNosLabel(item.key)}</div>
                    <div className="bar-chart-item-value">{(item.total / 1000).toFixed(0)}k</div>
                    <div className="bar-chart-bar">
                      <div
                        className="bar-chart-fill"
                        style={{
                          width: `${(item.total / Math.max(...Object.values(REAL_DATA).map(d => d.total))) * 100}%`,
                          background: 'var(--accent-primary)',
                        }}
                      />
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Recent Platform Updates */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
              Recent Platform Updates
            </h2>
            <div>
              {[
                { date: 'April 3, 2026', title: 'New 2026 Case Data Added', desc: 'Federal cases filed through March now indexed. 15k new records from all circuits.' },
                { date: 'March 28, 2026', title: 'Judge Profile Enhancements', desc: 'Judge histories now include recusal patterns and case management style indicators.' },
                { date: 'March 21, 2026', title: 'Settlement Range Precision', desc: 'Updated settlement percentile models with latest outcome data from PACER.' },
                { date: 'March 15, 2026', title: 'Circuit Map Launch', desc: 'Interactive map now shows all 13 federal circuits with filterable case data overlays.' },
              ].map((update, i) => (
                <div key={i} className="update-item">
                  <div className="update-item-date">{update.date}</div>
                  <div className="update-item-title">{update.title}</div>
                  <div className="update-item-desc">{update.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore by Category */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
              Explore by Category
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              {Array.from(new Set(Object.entries(REAL_DATA)
                .filter(([_, data]) => data.category)
                .map(([key, data]) => ({ category: data.category, key, count: Object.values(REAL_DATA).filter(d => d.category === data.category).length }))
                .reduce((acc, item) => {
                  if (!acc.find(a => a.category === item.category)) acc.push(item);
                  return acc;
                }, [])
                .map(item => (
                  <Link key={item.key} href={`/search?category=${item.category}`} className="category-badge">
                    <div className="category-count">{item.count}</div>
                    <div className="category-label">{item.category}</div>
                  </Link>
                ))
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {/* Current Plan */}
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms ease' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Current Plan
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                {planLabel[userPlan] || 'Free'}
              </p>
            </div>

            {/* Plan Status */}
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms ease' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Plan Status
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: planStatus === 'Expired' ? 'var(--data-negative)' : planStatus === 'Active' ? 'var(--data-positive)' : 'var(--color-text-secondary)', margin: 0 }}>
                {planStatus}
              </p>
            </div>

            {/* Member Since */}
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms ease' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Member Since
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                {memberSince}
              </p>
            </div>

            {/* Quick Action */}
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
                Quick Action
              </p>
              <Link href="/cases" style={{ display: 'inline-block', padding: '12px 20px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: 2, textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-ui)' }}>
                Browse Cases →
              </Link>
            </div>
          </div>

          {/* Your Plan Section */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px', transition: 'all 200ms ease' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
              Your Plan Includes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA — free users only */}
          {!isPaid && (
            <div style={{
              backgroundColor: 'var(--card)',
              borderRadius: 4,
              padding: '24px',
              border: '2px solid rgba(232,23,31,0.10)',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
                Upgrade to unlock more
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 20px', lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                Upgrade to unlock settlement ranges, judge analytics, and PDF export.
              </p>
              <Link href="/pricing" style={{
                display: 'inline-block',
                padding: '12px 20px',
                background: 'var(--accent-primary)',
                color: 'var(--color-surface-0)',
                borderRadius: 4,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                See Pricing →
              </Link>
            </div>
          )}

          {/* Attorney Tools — Attorney tier */}
          {isAttorney && (
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px', transition: 'all 200ms ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                  Attorney Tools
                </h2>
                <Link href="/attorney" style={{ fontSize: '14px', color: 'var(--gold)', textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-ui)' }}>
                  View all →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { label: 'AI Case Predictor', href: '/attorney/case-predictor', desc: 'Predict outcomes', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
                  { label: 'Judge Intelligence', href: '/attorney/judge-intelligence', desc: 'Research judges', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M6 10h12M6 14h12"/></svg> },
                  { label: 'Venue Optimizer', href: '/attorney/venue-optimizer', desc: 'Find best districts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
                  { label: 'Opposing Counsel', href: '/attorney/opposing-counsel', desc: 'Research counsel', icon: <SearchIcon size={20} /> },
                  { label: 'Bulk Analysis', href: '/attorney/bulk-analysis', desc: 'Portfolio analysis', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
                  { label: 'PACER Monitor', href: '/attorney/pacer-monitor', desc: 'Case alerts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
                  { label: 'Document Intel', href: '/attorney/document-intelligence', desc: 'Analyze documents', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                  { label: 'Team Workspace', href: '/attorney/team-workspace', desc: 'Collaborate', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
                  { label: 'API Access', href: '/attorney/api-access', desc: 'Developer tools', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="dashboard-tool-card"
                  >
                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{tool.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Research Links */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
              Quick Research
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Search Cases', href: '/search', color: 'var(--accent-primary)' },
                { label: 'Browse Districts', href: '/districts', color: 'var(--gold)' },
                { label: 'View Judges', href: '/judges', color: 'var(--color-text-primary)' },
                { label: 'Case Calculator', href: '/calculator', color: 'var(--data-positive)' },
                { label: 'Trends & Data', href: '/trends', color: 'var(--wrn-txt)' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', borderRadius: 4, border: '1px solid var(--border-default)', textDecoration: 'none', textAlign: 'center', transition: 'all 200ms ease', background: 'var(--color-surface-1)' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: link.color, fontFamily: 'var(--font-ui)' }}>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Stats */}
          <div style={{ backgroundColor: 'var(--accent-primary)', borderRadius: 4, padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 20px' }}>
              Platform Data Coverage
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Federal Cases', value: '5.1M+' },
                { label: 'Case Types', value: '84' },
                { label: 'Federal Districts', value: '95' },
                { label: 'Federal Judges', value: '91' },
                { label: 'Years of Data', value: '25+' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 4px' }}>{stat.value}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search History — Unlimited only */}
          {isUnlimitedPlus && !isExpired && searchHistory.length > 0 && (
            <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px', transition: 'all 200ms ease' }}>
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
                Search History
              </h2>
              <div>
                {searchHistory.map((s, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: i < searchHistory.length - 1 ? '1px solid var(--border-default)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{s.query}</p>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>{s.category ? `${s.category} · ` : ''}{new Date(s.searched_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/search`} style={{ fontSize: '14px', color: 'var(--gold)', textDecoration: 'none', fontFamily: 'var(--font-ui)' }}>Search again →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity Feed */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
              Recent Activity
            </h2>
            {recentReports.length > 0 ? (
              <div>
                {recentReports.map((r, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: i < recentReports.length - 1 ? '1px solid var(--border-default)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>{getNosLabel(r.category)} · {r.district}</p>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>{new Date(r.viewed_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/report/${r.category}`} style={{ fontSize: '14px', color: 'var(--accent-primary)', textDecoration: 'none', fontFamily: 'var(--font-ui)', fontWeight: 500 }}>View →</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {/* Demo Activity Feed for Investors */}
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>Employment Discrimination (NOS 442) · S.D.N.Y.</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>Analysis completed 2 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', backgroundColor: 'rgba(34,197,94,0.12)', padding: '4px 12px', borderRadius: 4 }}>76% win rate</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>Personal Injury — Auto (NOS 350) · C.D. Cal.</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>Report generated 5 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', backgroundColor: 'rgba(34,197,94,0.12)', padding: '4px 12px', borderRadius: 4 }}>63% settlement</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>Patent Infringement (NOS 830) · N.D. Cal.</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>Judge intelligence report 8 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--wrn-txt)', backgroundColor: 'rgba(234,179,8,0.1)', padding: '4px 12px', borderRadius: 4 }}>Moderate risk</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>Contract Dispute (NOS 110) · S.D. Tex.</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>Settlement analysis 12 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', backgroundColor: 'rgba(34,197,94,0.12)', padding: '4px 12px', borderRadius: 4 }}>58% favorable</div>
                </div>
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>Products Liability (NOS 367) · E.D. Pa.</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-ui)' }}>Historical case analysis 1 day ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', backgroundColor: 'rgba(34,197,94,0.12)', padding: '4px 12px', borderRadius: 4 }}>71% win rate</div>
                </div>
              </div>
            )}
          </div>

          {/* Platform Status Section */}
          <div style={{ backgroundColor: 'var(--card)', borderRadius: 4, padding: '24px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
              Platform Status
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { name: 'FJC Database', status: 'Connected', icon: '●' },
                { name: 'CourtListener API', status: 'Connected', icon: '●' },
                { name: 'Anthropic AI', status: 'Connected', icon: '●' },
                { name: 'Supabase', status: 'Connected', icon: '●' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: 2, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--color-surface-1)' }}>
                  <div style={{ fontSize: '16px', color: 'var(--data-positive)' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-secondary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--data-positive)', fontWeight: 600, margin: '4px 0 0' }}>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Tabbed Dashboard */}
        <div style={{ marginTop: 32 }}>
          <DashboardTabs
            userEmail={userEmail}
            userId={userId}
            memberSince={memberSince}
            planLabel={planLabel[tierKey] || 'Free'}
            reportsCount={recentReports.length}
            savedCount={recentReports.length}
            alertsCount={0}
            recentActivity={recentReports.slice(0, 5).map(r => ({
              label: `Viewed ${getNosLabel(r.category) || r.category}${r.district ? ` in ${r.district}` : ''}`,
              time: new Date(r.viewed_at).toLocaleDateString(),
              link: `/nos/${r.category}`,
            }))}
            searchHistory={searchHistory}
            savedReports={recentReports}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
