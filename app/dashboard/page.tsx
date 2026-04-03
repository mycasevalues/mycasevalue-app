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

export default async function DashboardPage() {
  // ── Auth check ────────────────────────────────────────────────────
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let userEmail = '';

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Server Components cannot set cookies — handled by middleware
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/sign-in');
    }

    userEmail = user.email ?? '';
  }

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
            {/* Dashboard Link */}
            <Link
              href="/dashboard"
              className="auth-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </Link>

            {/* My Reports Link */}
            <Link
              href="/reports"
              className="auth-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
              My Reports
            </Link>

            {/* Account Link */}
            <Link
              href="/account"
              className="auth-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Account
            </Link>

            {/* Billing Link */}
            <Link
              href="/billing"
              className="auth-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              Billing
            </Link>

            {/* Settings Link */}
            <Link
              href="/settings"
              className="auth-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s, color 0.2s',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.97 2.97l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.97-2.97l4.24-4.24"></path>
              </svg>
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: '240px',
          padding: '40px 20px',
          overflow: 'auto',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                margin: '0 0 8px 0',
                lineHeight: 1.2,
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--accent-secondary)',
                margin: 0,
              }}
            >
              {userEmail ? `Signed in as ${userEmail}` : 'Welcome back to MyCaseValue'}
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {/* Reports Generated */}
            <div
              className="mcv-stat-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-default)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--accent-secondary)',
                  fontWeight: 600,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Reports Generated
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--fg-primary)',
                  margin: 0,
                }}
              >
                0
              </p>
            </div>

            {/* Lookups This Month */}
            <div
              className="mcv-stat-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-default)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--accent-secondary)',
                  fontWeight: 600,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Lookups This Month
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--fg-primary)',
                  margin: 0,
                }}
              >
                0
              </p>
            </div>

            {/* Saved Items */}
            <div
              className="mcv-stat-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-default)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--accent-secondary)',
                  fontWeight: 600,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Saved Items
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--fg-primary)',
                  margin: 0,
                }}
              >
                0
              </p>
            </div>

            {/* Days on Plan */}
            <div
              className="mcv-stat-card"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-default)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--accent-secondary)',
                  fontWeight: 600,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Days on Plan
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: 700,
                  color: 'var(--fg-primary)',
                  margin: 0,
                }}
              >
                0
              </p>
            </div>
          </div>

          {/* Recent Searches Section */}
          <div
            className="mcv-card"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-default)',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                margin: '0 0 24px 0',
              }}
            >
              Recent Searches
            </h2>

            {/* Empty State */}
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'var(--bg-base)',
                  borderRadius: '12px',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    color: 'var(--fg-muted)',
                  }}
                >
                  📋
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--fg-primary)',
                  margin: '0 0 8px 0',
                }}
              >
                No searches yet
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--fg-muted)',
                  margin: '0 0 20px 0',
                }}
              >
                Start by searching for a case type to get federal court outcome data.
              </p>
              <Link
                href="/cases"
                className="auth-link"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: 'var(--fg-primary)',
                  color: 'var(--bg-surface)',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'background-color 0.2s',
                }}
              >
                Browse Cases →
              </Link>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div
            className="mcv-card"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              border: '2px solid var(--accent-secondary)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--fg-primary)',
                margin: '0 0 8px 0',
              }}
            >
              Upgrade Your Plan
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--fg-muted)',
                margin: '0 0 20px 0',
              }}
            >
              Unlock premium reports with detailed settlement data, judge analytics, and cost insights.
            </p>
            <Link
              href="/pricing"
              className="auth-btn"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'var(--accent-secondary)',
                color: 'var(--bg-surface)',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                cursor: 'pointer',
              }}
            >
              See Pricing
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
