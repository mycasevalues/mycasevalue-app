import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getNosLabel } from '../../lib/data';

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
  let planStatusColor = 'var(--fg-muted)';
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

  const isPaid = true; // DEV MODE: All features unlocked — Stripe integration pending
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
  const isUnlimitedPlus = true; // DEV MODE: All features unlocked — Stripe integration pending
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
        background: '#F9FAFB',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '240px',
          background: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
          padding: '24px 16px',
          flexShrink: 0,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', padding: '0 8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#8B5CF6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#111111', fontFamily: 'var(--font-display)' }}>MyCaseValue</span>
        </a>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
            { label: 'Search cases', href: '/cases', icon: '⌕' },
            { label: 'Saved reports', href: '/dashboard/reports', icon: '⊡' },
            { label: 'Billing', href: '/pricing', icon: '◇' },
            { label: 'Settings', href: '/settings', icon: '⚙' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              marginBottom: '4px',
              transition: 'background-color 0.2s',
            }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflow: 'auto' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 8px 0' }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--fg-muted)', margin: 0 }}>
              {userEmail ? `Signed in as ${userEmail}` : 'Welcome back'}
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {/* Current Plan */}
            <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)' }}>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                Current Plan
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--fg-primary)', margin: 0 }}>
                {planLabel[userPlan] || 'Free'}
              </p>
            </div>

            {/* Plan Status */}
            <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)' }}>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                Plan Status
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: planStatusColor, margin: 0 }}>
                {planStatus}
              </p>
            </div>

            {/* Member Since */}
            <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)' }}>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                Member Since
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--fg-primary)', margin: 0 }}>
                {memberSince}
              </p>
            </div>

            {/* Quick Action */}
            <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--fg-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
                Quick Action
              </p>
              <Link href="/cases" style={{ display: 'inline-block', padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>
                Browse Cases →
              </Link>
            </div>
          </div>

          {/* Your Plan Section */}
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 20px' }}>
              Your Plan Includes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: 'var(--fg-primary)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade CTA — free users only */}
          {!isPaid && (
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '12px',
              padding: '32px',
              border: '2px solid var(--accent-primary)',
              textAlign: 'center',
              marginBottom: '24px',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 8px' }}>
                Upgrade to unlock more
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--fg-muted)', margin: '0 0 20px', lineHeight: 1.6 }}>
                Upgrade to unlock settlement ranges, judge analytics, and PDF export.
              </p>
              <Link href="/pricing" style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: 'var(--accent-primary)',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
              }}>
                See Pricing →
              </Link>
            </div>
          )}

          {/* Search History — Unlimited+ only */}
          {isUnlimitedPlus && !isExpired && searchHistory.length > 0 && (
            <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 24px' }}>
                Search History
              </h2>
              <div>
                {searchHistory.map((s, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < searchHistory.length - 1 ? '1px solid var(--border-default)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--fg-primary)' }}>{s.query}</p>
                      <p style={{ fontSize: '12px', color: 'var(--fg-muted)', margin: 0 }}>{s.category ? `${s.category} · ` : ''}{new Date(s.searched_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/search`} style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none' }}>Search again →</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 24px' }}>
              Recent Activity
            </h2>
            {recentReports.length > 0 ? (
              <div>
                {recentReports.map((r, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i < recentReports.length - 1 ? '1px solid var(--border-default)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: 'var(--fg-primary)' }}>{getNosLabel(r.category)} · {r.district}</p>
                      <p style={{ fontSize: '12px', color: 'var(--fg-muted)', margin: 0 }}>{new Date(r.viewed_at).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/report/${r.category}`} style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none' }}>View →</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--fg-primary)', margin: '0 0 8px' }}>
                  No reports yet. <Link href="/search" style={{ color: 'var(--accent-primary)' }}>Start researching →</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
