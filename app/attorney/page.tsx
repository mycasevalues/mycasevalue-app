import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attorney Mode - Professional Legal Intelligence Suite | CaseCheck',
  description: 'Advanced AI-powered tools for legal professionals. Case prediction, document analysis, opposing counsel research, and more.',
  keywords: [
    'legal intelligence',
    'case prediction',
    'document analysis',
    'opposing counsel research',
    'PACER monitoring',
    'attorney software',
    'legal tech',
  ],
};

const FeatureCard = ({
  icon,
  title,
  description,
  badge,
}: {
  icon: string;
  title: string;
  description: string;
  badge: 'coming-soon' | 'available';
}) => (
  <div
    style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-default)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = 'var(--accent-primary)';
      el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
      el.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = 'var(--border-default)';
      el.style.boxShadow = 'none';
      el.style.transform = 'translateY(0)';
    }}
  >
    <div style={{ fontSize: '32px' }}>{icon}</div>
    <div>
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: 'var(--font-display)',
          color: 'var(--fg-primary)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          color: 'var(--fg-muted)',
          lineHeight: '1.5',
          fontFamily: 'var(--font-body)',
        }}
      >
        {description}
      </p>
    </div>
    <div style={{ marginTop: 'auto' }}>
      <span
        style={{
          display: 'inline-block',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          backgroundColor:
            badge === 'available' ? 'var(--accent-primary)' : 'var(--bg-base)',
          color: badge === 'available' ? '#ffffff' : 'var(--fg-muted)',
          border:
            badge === 'available'
              ? 'none'
              : '1px solid var(--border-default)',
        }}
      >
        {badge === 'available' ? 'Available' : 'Coming Soon'}
      </span>
    </div>
  </div>
);

const features = [
  {
    icon: '🤖',
    title: 'AI Case Predictor',
    description:
      'Machine learning outcome predictions based on case factors, historical data, and legal precedents.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '📄',
    title: 'Document Intelligence',
    description:
      'Upload and analyze legal documents with AI insights, risk assessment, and compliance checking.',
    badge: 'available' as const,
  },
  {
    icon: '🔍',
    title: 'Opposing Counsel Analysis',
    description:
      'Research opposing counsel\'s track record, strategies, and settlement patterns instantly.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '🎯',
    title: 'Venue Optimizer',
    description:
      'Find the optimal filing district based on case type, judge data, and success rates.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '⚖️',
    title: 'PACER Monitoring',
    description:
      'Real-time alerts on case developments, filings, and motions across federal courts.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '📊',
    title: 'Bulk Case Analysis',
    description:
      'Analyze portfolios of cases for pattern recognition, risk clustering, and outcome trends.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '👥',
    title: 'Team Workspace',
    description:
      'Collaborate with colleagues, share reports, annotations, and case insights seamlessly.',
    badge: 'coming-soon' as const,
  },
  {
    icon: '⚙️',
    title: 'API Access',
    description:
      'Programmatic access to MyCaseValue data via REST API for custom integrations.',
    badge: 'coming-soon' as const,
  },
];

export default function AttorneyPage() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--fg-primary)',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
      }}
    >
      {/* Header Section */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-default)',
          padding: '48px 20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Badge */}
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: 'var(--accent-secondary)',
                color: 'var(--fg-primary)',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ⚡ Attorney Mode
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: '1.2',
              color: 'var(--fg-primary)',
            }}
          >
            Professional Legal Intelligence Suite
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'var(--fg-muted)',
              lineHeight: '1.6',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Advanced AI-powered tools designed for legal professionals. Predict case outcomes,
            analyze documents, research opposing counsel, and manage your entire practice with
            confidence.
          </p>
        </div>
      </section>

      {/* Everything In Unlimited Plus Section */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--bg-base)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          {/* Section Title */}
          <div>
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: 'var(--fg-primary)',
              }}
            >
              Everything in Unlimited,
              <span
                style={{
                  display: 'block',
                  color: 'var(--accent-primary)',
                }}
              >
                plus:
              </span>
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Unlock the full power of legal intelligence with exclusive attorney-grade features.
            </p>
          </div>

          {/* Features Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section
        style={{
          padding: '32px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--fg-muted)',
              fontWeight: '500',
              fontFamily: 'var(--font-body)',
            }}
          >
            ✓ Trusted by attorneys in all 94 federal districts
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: 'var(--bg-base)',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: '800',
                fontFamily: 'var(--font-display)',
                color: 'var(--fg-primary)',
              }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>$29.99</span>
              <span style={{ fontSize: '0.5em', color: 'var(--fg-muted)' }}>
                {' '}
                / month
              </span>
            </h2>
            <p
              style={{
                margin: '16px 0 0 0',
                fontSize: '16px',
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Save 16% with annual billing
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/sign-up"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-secondary)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start 14-day Free Trial
          </Link>

          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '12px',
              color: 'var(--fg-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer
        style={{
          padding: '40px 20px',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-default)',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--fg-muted)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 12px 0' }}>
            <strong>Disclaimer:</strong> CaseCheck's AI tools provide analytical insights and
            information to assist legal professionals in their research and decision-making
            processes. These tools are not a substitute for professional legal judgment or
            advice. Always consult with qualified legal counsel and conduct independent
            verification of all information. Case value and outcome predictions are based on
            historical data and are subject to change.
          </p>
          <p style={{ margin: 0 }}>
            © 2026 CaseCheck. All rights reserved. | Attorney Mode is a premium feature.
          </p>
        </div>
      </footer>
    </div>
  );
}
