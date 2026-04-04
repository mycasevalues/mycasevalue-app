import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getNosLabel } from '../../lib/data';
import SidebarNav from '../../components/SidebarNav';

export const metadata: Metadata = {
  title: 'Dashboard | MyCaseValue',
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
  let userCreatedAt = '';
  let userPlan = 'free';
  let planStatus = 'Free tier';
  let planStatusColor = '#455A64';
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
          planStatusColor = expired ? '#DC2626' : '#16A34A';
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

  // ── Fetch search history for Unlimited+ users ─────────────────
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
        background: '#EDEEEE',
        fontFamily: 'var(--font-body)',
      }}
    >
      <style>{`
        .dashboard-tool-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 4px;
          border: 1px solid #D5D8DC;
          text-decoration: none;
          transition: all 0.2s ease;
          color: #212529;
          background: #FFFFFF;
        }
        .dashboard-tool-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          border-color: #E8171F;
          color: #E8171F;
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
          color: #E8171F;
        }
        .breadcrumb span {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '240px',
          background: '#00172E',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px 16px',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#E8171F', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>MyCaseValue</span>
        </a>

        {/* Navigation */}
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Dark Navy Header */}
        <div style={{
          background: '#00172E',
          padding: '32px 40px',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="breadcrumb">
              <Link href="/" style={{ color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: '#E8171F',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}>
                Dashboard
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0',
              lineHeight: 1.2,
            }}>
              Your Case Research Hub
            </h1>
          </div>
        </div>

        <div style={{ padding: '0 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {/* Current Plan */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '24px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#999999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Current Plan
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#212529', margin: 0 }}>
                {planLabel[userPlan] || 'Free'}
              </p>
            </div>

            {/* Plan Status */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '24px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#999999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Plan Status
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: planStatus === 'Expired' ? '#E8171F' : planStatus === 'Active' ? '#16A34A' : '#455A64', margin: 0 }}>
                {planStatus}
              </p>
            </div>

            {/* Member Since */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '24px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s ease' }}>
              <p style={{ fontSize: '12px', color: '#999999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                Member Since
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: '#212529', margin: 0 }}>
                {memberSince}
              </p>
            </div>

            {/* Quick Action */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '24px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '12px', color: '#999999', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px', fontFamily: 'var(--font-body)' }}>
                Quick Action
              </p>
              <Link href="/cases" style={{ display: 'inline-block', padding: '10px 20px', background: '#E8171F', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 700, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-body)' }}>
                Browse Cases →
              </Link>
            </div>
          </div>

          {/* Your Plan Section */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '32px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 20px' }}>
              Your Plan Includes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#212529', fontFamily: 'var(--font-body)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA — free users only */}
          {!isPaid && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              padding: '32px',
              border: '2px solid rgba(232,23,31,0.10)',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 8px' }}>
                Upgrade to unlock more
              </h3>
              <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 20px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Upgrade to unlock settlement ranges, judge analytics, and PDF export.
              </p>
              <Link href="/pricing" style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: '#E8171F',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 700,
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
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '32px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#212529', margin: 0 }}>
                  Attorney Tools
                </h2>
                <Link href="/attorney" style={{ fontSize: '13px', color: '#006997', textDecoration: 'none', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                  View all →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { label: 'AI Case Predictor', href: '/attorney/case-predictor', desc: 'Predict outcomes', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
                  { label: 'Judge Intelligence', href: '/attorney/judge-intelligence', desc: 'Research judges', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M6 10h12M6 14h12"/></svg> },
                  { label: 'Venue Optimizer', href: '/attorney/venue-optimizer', desc: 'Find best districts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg> },
                  { label: 'Opposing Counsel', href: '/attorney/opposing-counsel', desc: 'Research counsel', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
                  { label: 'Bulk Analysis', href: '/attorney/bulk-analysis', desc: 'Portfolio analysis', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
                  { label: 'PACER Monitor', href: '/attorney/pacer-monitor', desc: 'Case alerts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m0 8.48l-4.24 4.24M19.78 4.22l-4.24 4.24m0 8.48l4.24 4.24"/></svg> },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="dashboard-tool-card"
                  >
                    <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8171F', flexShrink: 0 }}>
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#212529', fontFamily: 'var(--font-body)' }}>{tool.label}</div>
                      <div style={{ fontSize: '12px', color: '#999999', fontFamily: 'var(--font-body)' }}>{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search History — Unlimited+ only */}
          {isUnlimitedPlus && !isExpired && searchHistory.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '32px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '24px', transition: 'all 0.2s ease' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px' }}>
                Search History
              </h2>
              <div>
                {searchHistory.map((s, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < searchHistory.length - 1 ? '1px solid #E5EBF0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#212529', fontFamily: 'var(--font-body)' }}>{s.query}</p>
                      <p style={{ fontSize: '12px', color: '#999999', margin: 0, fontFamily: 'var(--font-body)' }}>{s.category ? `${s.category} · ` : ''}{new Date(s.searched_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/search`} style={{ fontSize: '13px', color: '#006997', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Search again →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '32px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px' }}>
              Recent Activity
            </h2>
            {recentReports.length > 0 ? (
              <div>
                {recentReports.map((r, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < recentReports.length - 1 ? '1px solid #E5EBF0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#212529', fontFamily: 'var(--font-body)' }}>{getNosLabel(r.category)} · {r.district}</p>
                      <p style={{ fontSize: '12px', color: '#999999', margin: 0, fontFamily: 'var(--font-body)' }}>{new Date(r.viewed_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/report/${r.category}`} style={{ fontSize: '13px', color: '#006997', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>View →</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#212529', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
                  No reports yet. <Link href="/search" style={{ color: '#006997', textDecoration: 'none' }}>Start researching →</Link>
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
