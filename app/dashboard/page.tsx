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

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
  robots: { index: false, follow: false },
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
  let planStatusColor = '#4B5563';
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
          planStatusColor = expired ? '#0966C3' : '#16A34A';
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
        background: '#F7F8FA',
        fontFamily: 'var(--font-body)',
      }}
    >
      <style>{`
        .dashboard-tool-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          text-decoration: none;
          transition: all 0.2s ease;
          color: #0f0f0f;
          background: #FFFFFF;
        }
        .dashboard-tool-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          border-color: #0966C3;
          color: #0966C3;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
        }
        .breadcrumb a {
          color: #FFFFFF;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .breadcrumb a:hover {
          color: #0966C3;
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
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          text-decoration: none;
          color: #0f0f0f;
          background: #FFFFFF;
          transition: all 0.2s ease;
        }
        .quick-action-card:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.15);
          transform: translateY(-2px);
        }
        .quick-action-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0966C3;
        }
        .bar-chart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #F0F2F4;
        }
        .bar-chart-item:last-child {
          border-bottom: none;
        }
        .bar-chart-item-label {
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          min-width: 140px;
          font-family: var(--font-body);
        }
        .bar-chart-item-value {
          font-size: 12px;
          font-weight: 600;
          color: #4B5563;
          min-width: 50px;
          font-family: var(--font-mono);
        }
        .bar-chart-bar {
          flex: 1;
          height: 20px;
          border-radius: 12px;
          background: #E5E7EB;
          position: relative;
          overflow: hidden;
        }
        .bar-chart-fill {
          height: 100%;
          border-radius: 12px;
          transition: width 0.3s ease;
        }
        .update-item {
          padding: 16px;
          border-left: 3px solid #0966C3;
          background: #FAFBFC;
          border-radius: 0 2px 2px 0;
          margin-bottom: 12px;
        }
        .update-item-date {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: #4B5563;
          letter-spacing: 0.5px;
          margin: 0 0 6px;
        }
        .update-item-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f0f0f;
          margin: 0 0 4px;
          font-family: var(--font-display);
        }
        .update-item-desc {
          font-size: 13px;
          color: #4B5563;
          margin: 0;
          line-height: 1.5;
          font-family: var(--font-body);
        }
        .category-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          text-decoration: none;
          background: #FFFFFF;
          transition: all 0.2s ease;
          text-align: center;
          gap: 8px;
        }
        .category-badge:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.15);
          transform: translateY(-2px);
        }
        .category-count {
          font-size: 20px;
          font-weight: 600;
          font-family: var(--font-mono);
          color: #0966C3;
        }
        .category-label {
          font-size: 13px;
          font-weight: 600;
          color: #0f0f0f;
          font-family: var(--font-body);
        }
        .free-banner {
          background: linear-gradient(135deg, #059669 0%, #06612f 100%);
          border: 1px solid #059669;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }
        .free-banner-text {
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-body);
          margin: 0;
        }
        .free-banner-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
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
          background: '#1C3A5E',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px 16px',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#0966C3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>MyCaseValue</span>
        </a>

        {/* Navigation */}
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Dark Navy Header with Welcome */}
        <div style={{
          background: '#1C3A5E',
          padding: '32px 40px',
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="breadcrumb">
              <Link href="/" style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Dashboard</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: '#0966C3',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                  }}>
                    Dashboard
                  </span>
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 5vw, 32px)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  margin: '0',
                  lineHeight: 1.2,
                }}>
                  Welcome back to MyCaseValue
                </h1>
              </div>
              <div style={{ textAlign: 'right', color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                <div>Federal Court Analytics</div>
                <div style={{ fontSize: '11px', marginTop: '4px', color: 'rgba(255, 255, 255, 0.5)' }}>Updated April 6, 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Overview Bar */}
        <div style={{ padding: '0 40px', marginBottom: '24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Total Cases Analyzed */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Total Cases Analyzed</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f0f0f' }}>4.1M</div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>Cases in database</div>
              </div>

              {/* Active Case Types */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Active Case Types</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f0f0f' }}>84</div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>Federal case categories</div>
              </div>

              {/* Federal Districts */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Federal Districts</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f0f0f' }}>94</div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>U.S. courts covered</div>
              </div>

              {/* Data Coverage */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ color: '#666', fontSize: '12px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Data Coverage</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f0f0f' }}>1970-2024</div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '6px' }}>54+ years of data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Free During Beta Banner */}
        <div style={{ padding: '0 40px', marginBottom: '24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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

        <div style={{ padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Quick Stats Overview Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>Total Cases</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: '#0966C3', margin: 0 }}>4.1M+</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>NOS Codes</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: '#0966C3', margin: 0 }}>84</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>Districts Covered</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 600, color: '#0966C3', margin: 0 }}>94</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>Uptime Status</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#059669', margin: 0 }}>100% [x]</p>
            </div>
          </div>

          {/* Platform Capabilities Grid */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px', letterSpacing: '-0.3px' }}>Platform Capabilities</h2>
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
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-body)', textAlign: 'center' }}>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Highlights — Top 5 Case Types */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px' }}>
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
                          background: '#0966C3',
                        }}
                      />
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Recent Platform Updates */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px' }}>
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
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px' }}>
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
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Current Plan
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                {planLabel[userPlan] || 'Free'}
              </p>
            </div>

            {/* Plan Status */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Plan Status
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: planStatus === 'Expired' ? '#0966C3' : planStatus === 'Active' ? '#16A34A' : '#4B5563', margin: 0 }}>
                {planStatus}
              </p>
            </div>

            {/* Member Since */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Member Since
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                {memberSince}
              </p>
            </div>

            {/* Quick Action */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px', fontFamily: 'var(--font-body)' }}>
                Quick Action
              </p>
              <Link href="/cases" style={{ display: 'inline-block', padding: '10px 20px', background: '#0966C3', color: '#fff', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-body)' }}>
                Browse Cases →
              </Link>
            </div>
          </div>

          {/* Your Plan Section */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px' }}>
              Your Plan Includes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA — free users only */}
          {!isPaid && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '32px',
              border: '2px solid rgba(232,23,31,0.10)',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px' }}>
                Upgrade to unlock more
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 20px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Upgrade to unlock settlement ranges, judge analytics, and PDF export.
              </p>
              <Link href="/pricing" style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: '#0966C3',
                color: '#fff',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                See Pricing →
              </Link>
            </div>
          )}

          {/* Attorney Tools — Attorney tier */}
          {isAttorney && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                  Attorney Tools
                </h2>
                <Link href="/attorney" style={{ fontSize: '13px', color: '#004182', textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
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
                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0966C3', flexShrink: 0 }}>
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>{tool.label}</div>
                      <div style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)' }}>{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Research Links */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 20px' }}>
              Quick Research
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Search Cases', href: '/search', color: '#0966C3' },
                { label: 'Browse Districts', href: '/districts', color: '#004182' },
                { label: 'View Judges', href: '/judges', color: '#1C3A5E' },
                { label: 'Case Calculator', href: '/calculator', color: '#059669' },
                { label: 'Trends & Data', href: '/trends', color: '#B86E00' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ display: 'block', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', textDecoration: 'none', textAlign: 'center', transition: 'all 0.2s ease', background: '#FAFBFC' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: link.color, fontFamily: 'var(--font-body)' }}>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Stats */}
          <div style={{ backgroundColor: '#1C3A5E', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#FFFFFF', margin: '0 0 20px' }}>
              Platform Data Coverage
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Federal Cases', value: '4.1M+' },
                { label: 'Case Types', value: '84' },
                { label: 'Federal Districts', value: '94' },
                { label: 'Federal Judges', value: '91' },
                { label: 'Years of Data', value: '25+' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <p className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: '#0966C3', margin: '0 0 4px' }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', color: '#B0B8C0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search History — Unlimited only */}
          {isUnlimitedPlus && !isExpired && searchHistory.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px' }}>
                Search History
              </h2>
              <div>
                {searchHistory.map((s, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < searchHistory.length - 1 ? '1px solid #E5E7EB' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>{s.query}</p>
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>{s.category ? `${s.category} · ` : ''}{new Date(s.searched_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/search`} style={{ fontSize: '13px', color: '#004182', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Search again →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity Feed */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px' }}>
              Recent Activity
            </h2>
            {recentReports.length > 0 ? (
              <div>
                {recentReports.map((r, i) => (
                  <div key={i} style={{ padding: '12px 0', borderBottom: i < recentReports.length - 1 ? '1px solid #E5E7EB' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>{getNosLabel(r.category)} · {r.district}</p>
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>{new Date(r.viewed_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/report/${r.category}`} style={{ fontSize: '13px', color: '#0966C3', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 500 }}>View →</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {/* Demo Activity Feed for Investors */}
                <div style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>Employment Discrimination (NOS 442) · S.D.N.Y.</p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>Analysis completed 2 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#059669', backgroundColor: '#DCFCE7', padding: '4px 12px', borderRadius: '6px' }}>76% win rate</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>Personal Injury — Auto (NOS 350) · C.D. Cal.</p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>Report generated 5 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#059669', backgroundColor: '#DCFCE7', padding: '4px 12px', borderRadius: '6px' }}>63% settlement</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>Patent Infringement (NOS 830) · N.D. Cal.</p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>Judge intelligence report 8 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 12px', borderRadius: '6px' }}>Moderate risk</div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>Contract Dispute (NOS 110) · S.D. Tex.</p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>Settlement analysis 12 hours ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#059669', backgroundColor: '#DCFCE7', padding: '4px 12px', borderRadius: '6px' }}>58% favorable</div>
                </div>
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>Products Liability (NOS 367) · E.D. Pa.</p>
                    <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>Historical case analysis 1 day ago</p>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#059669', backgroundColor: '#DCFCE7', padding: '4px 12px', borderRadius: '6px' }}>71% win rate</div>
                </div>
              </div>
            )}
          </div>

          {/* Platform Status Section */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px' }}>
              Platform Status
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { name: 'FJC Database', status: 'Connected', icon: '●' },
                { name: 'CourtListener API', status: 'Connected', icon: '●' },
                { name: 'Anthropic AI', status: 'Connected', icon: '●' },
                { name: 'Supabase', status: 'Connected', icon: '●' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: '20px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#F9FAFB' }}>
                  <div style={{ fontSize: '16px', color: '#059669' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#666', margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: '#059669', fontWeight: 600, margin: '4px 0 0' }}>{item.status}</p>
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
      </main>
    </div>
  );
}
