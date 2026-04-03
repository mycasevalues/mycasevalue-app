import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';

export const metadata: Metadata = {
  title: 'Dashboard | MyCaseValue',
  description: 'Your MyCaseValue dashboard with case reports, research activity, and subscription information.',
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

    // Query premium_sessions for this user's plan
    if (userEmail) {
      try {
        const { data: session } = await supabase
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

  const isPaid = userPlan !== 'free' && !isExpired;
  const tierKey = userPlan === 'single_report' ? 'single' : userPlan;
  const features = TIER_INCLUDES[tierKey] || TIER_INCLUDES.free;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        display: 'flex',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '240px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-default)',
          padding: '24px 0',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: '0 0 32px 0',
            }}
          >
            MyCaseValue
          </h1>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: 'var(--fg-primary)', fontSize: '14px', fontWeight: 500, background: 'var(--bg-base)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Dashboard
            </Link>
            <Link href="/cases" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: 'var(--fg-primary)', fontSize: '14px', fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              Browse Cases
            </Link>
            <Link href="/pricing" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: 'var(--fg-primary)', fontSize: '14px', fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              Billing
            </Link>
            <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: 'var(--fg-primary)', fontSize: '14px', fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.97 2.97l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.97-2.97l4.24-4.24" /></svg>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 20px', overflow: 'auto' }}>
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

          {/* Recent Activity */}
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-primary)', margin: '0 0 24px' }}>
              Recent Activity
            </h2>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--fg-primary)', margin: '0 0 8px' }}>
                Your recent lookups will appear here as you research cases
              </p>
              <Link href="/cases" style={{
                display: 'inline-block',
                marginTop: '16px',
                padding: '10px 20px',
                background: 'var(--fg-primary)',
                color: 'var(--bg-surface)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}>
                Browse Cases →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
