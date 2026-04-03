import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Judge Intelligence: Federal Judge Profiles & Analytics | MyCaseValue',
  description: 'Access comprehensive federal judge profiles with ruling patterns, motion grant rates, case duration analysis, and outcome predictions. Unlock Judge Intelligence to make data-driven litigation decisions.',
  alternates: { canonical: 'https://www.mycasevalues.com/judges' },
  openGraph: {
    title: 'Judge Intelligence: Federal Judge Profiles & Analytics | MyCaseValue',
    description: 'Access comprehensive federal judge profiles with ruling patterns, motion grant rates, case duration analysis, and outcome predictions.',
    type: 'website',
    url: 'https://www.mycasevalues.com/judges',
  },
};

export default function JudgesPage() {
  const features = [
    'Motion Grant Rates',
    'Case Duration Patterns',
    'Settlement Tendencies',
    'Outcome by Case Type',
    'Comparison with District Average',
    'Historical Trend Data',
  ];

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-default)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ paddingTop: '64px', paddingBottom: '96px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                color: 'var(--fg-primary)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to MyCaseValue
            </Link>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                marginBottom: '16px',
                background: 'var(--accent-primary-subtle)',
                color: 'var(--fg-primary)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Judge Intelligence
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '900',
                marginBottom: '16px',
                color: 'var(--fg-primary)',
                letterSpacing: '-1.5px',
                fontFamily: 'var(--font-display)',
                lineHeight: '1.2',
              }}
            >
              Federal Judge Profiles & Analytics
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: '1.6',
                maxWidth: '640px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Research federal judges' ruling patterns, motion grant rates, and case outcomes. Make informed litigation decisions with comprehensive judge intelligence backed by court data.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* How Judge Intelligence Works */}
        <section style={{ marginBottom: '96px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '16px',
              }}
            >
              How Judge Intelligence Works
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
              Three steps to unlock powerful judge insights that shape your litigation strategy.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: '🔍',
                title: 'Research a Judge',
                description: 'Enter any federal judge\'s name to access their complete profile, including ruling history, case statistics, and judicial preferences.',
              },
              {
                icon: '📊',
                title: 'Analyze Patterns',
                description: 'Discover motion grant rates, settlement tendencies, case duration trends, and outcome patterns across different case types.',
              },
              {
                icon: '🎯',
                title: 'Predict Outcomes',
                description: 'Compare your case against historical data to understand how this judge has ruled in similar matters and benchmark against district averages.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-surface)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--fg-primary)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--fg-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Judge Profiles — Coming Soon */}
        <section style={{ marginBottom: '96px' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '16px',
              }}
            >
              Judge Profiles
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Detailed federal judge profiles with comprehensive case analytics and ruling insights.
            </p>
          </div>

          <div
            style={{
              padding: '48px 32px',
              borderRadius: '16px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'var(--accent-primary-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '12px',
              }}
            >
              Coming Soon
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              Individual judge profiles with ruling patterns, motion grant rates, and case outcome data are currently in development. Subscribe to be notified when Judge Intelligence launches.
            </p>
          </div>
        </section>

        {/* What You'll Get */}
        <section style={{ marginBottom: '96px' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '16px',
              }}
            >
              What You'll Get
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Comprehensive insights to inform your litigation strategy and improve outcomes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-default)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-base)',
                    fontWeight: '600',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--fg-primary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {feature}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: '64px 32px',
            borderRadius: '16px',
            border: '1px solid var(--border-default)',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
            textAlign: 'center',
            marginBottom: '96px',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'var(--fg-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: '16px',
            }}
          >
            Unlock Judge Intelligence
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--fg-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: '560px',
              margin: '0 auto 32px',
              lineHeight: '1.6',
            }}
          >
            Get unlimited access to federal judge profiles, ruling pattern analysis, and outcome predictions with Judge Intelligence. Included in our Unlimited+ subscription.
          </p>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-base)',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            View Pricing Plans
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>

      {/* Footer Disclaimer */}
      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            maxWidth: '640px',
            margin: '0 auto',
            color: 'var(--fg-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
          }}
        >
          Judge data is sourced from official federal court records and judicial opinions. Judge Intelligence is designed for research and case strategy purposes only. This information is not legal advice and should not be relied upon as a substitute for professional legal counsel. © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
