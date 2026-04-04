import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Attorney Mode - Professional Legal Intelligence Suite | MyCaseValue',
  description: 'Advanced AI-powered tools for legal professionals. Case prediction, document analysis, opposing counsel research, and more.',
  alternates: { canonical: 'https://www.mycasevalues.com/attorney' },
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

// SVG Icon Components
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 10h.01M16 10h.01" />
    <path d="M9 16c1-1 3-1 6 0" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ScalesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
    <line x1="12" y1="10" x2="12" y2="18" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const APIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
    <path d="M10 12l2 2 4-4" />
  </svg>
);

const GavelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M14.5 2l5 5-7.5 7.5-5-5z" />
    <path d="M2 22l5.5-5.5" />
    <path d="M7 14l-3 3" />
    <path d="M17 7l3-3" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const FeatureCard = ({
  icon,
  title,
  description,
  badge,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: 'coming-soon' | 'available';
  href?: string;
}) => {
  const content = (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
      }}
      className="attorney-feature-card"
    >
      <div style={{ fontSize: '32px', color: '#8B5CF6' }}>{icon}</div>
      <div>
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'var(--font-display)',
            color: '#111111',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: '1.5',
            fontFamily: 'var(--font-body)',
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              badge === 'available' ? '#8B5CF6' : 'var(--bg-base)',
            color: badge === 'available' ? '#ffffff' : '#6B7280',
            border:
              badge === 'available'
                ? 'none'
                : '1px solid var(--border-default)',
          }}
        >
          {badge === 'available' ? 'Available' : 'Expected Q3 2026'}
        </span>
        {href && (
          <span style={{ fontSize: '13px', color: '#8B5CF6', fontWeight: 600 }}>
            Try it →
          </span>
        )}
      </div>
    </div>
  );
  if (href) {
    return <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</Link>;
  }
  return content;
};

const features: { icon: React.ReactNode; title: string; description: string; badge: 'coming-soon' | 'available'; href?: string }[] = [
  {
    icon: <AIIcon />,
    title: 'AI Case Predictor',
    description:
      'Machine learning outcome predictions based on case factors, historical data, and legal precedents.',
    badge: 'available' as const,
    href: '/attorney/case-predictor',
  },
  {
    icon: <DocumentIcon />,
    title: 'Document Intelligence',
    description:
      'Upload and analyze legal documents with AI insights, risk assessment, and compliance checking.',
    badge: 'available' as const,
    href: '/attorney/document-intelligence',
  },
  {
    icon: <GavelIcon />,
    title: 'Judge Intelligence',
    description:
      'Research federal judges by district — ruling patterns, settlement tendencies, and case statistics.',
    badge: 'available' as const,
    href: '/attorney/judge-intelligence',
  },
  {
    icon: <SearchIcon />,
    title: 'Opposing Counsel Analysis',
    description:
      'Research opposing counsel\'s track record, strategies, and settlement patterns instantly.',
    badge: 'coming-soon' as const,
  },
  {
    icon: <TargetIcon />,
    title: 'Venue Optimizer',
    description:
      'Find the optimal filing district based on case type, judge data, and success rates.',
    badge: 'available' as const,
    href: '/attorney/venue-optimizer',
  },
  {
    icon: <ScalesIcon />,
    title: 'PACER Monitoring',
    description:
      'Real-time alerts on case developments, filings, and motions across federal courts.',
    badge: 'coming-soon' as const,
  },
  {
    icon: <ChartIcon />,
    title: 'Bulk Case Analysis',
    description:
      'Analyze portfolios of cases for pattern recognition, risk clustering, and outcome trends.',
    badge: 'coming-soon' as const,
  },
  {
    icon: <PeopleIcon />,
    title: 'Team Workspace',
    description:
      'Collaborate with colleagues, share reports, annotations, and case insights seamlessly.',
    badge: 'coming-soon' as const,
  },
  {
    icon: <APIIcon />,
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
        color: '#111111',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .attorney-feature-card:hover { border-color: #8B5CF6 !important; box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-4px); }
        .attorney-cta-link:hover { background-color: #7C3AED !important; box-shadow: 0 8px 20px rgba(0,0,0,0.2) !important; transform: translateY(-2px); }
      `}} />
      {/* Header Section */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
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
                backgroundColor: '#7C3AED',
                color: '#111111',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Attorney Mode
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
              color: '#111111',
            }}
          >
            Professional Legal Intelligence Suite
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B7280',
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
                color: '#111111',
              }}
            >
              Everything in Unlimited,
              <span
                style={{
                  display: 'block',
                  color: '#8B5CF6',
                }}
              >
                plus:
              </span>
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#6B7280',
                fontFamily: 'var(--font-body)',
              }}
            >
              Unlock the full power of legal intelligence with exclusive attorney-grade features.
            </p>
          </div>

          {/* Available Now Features */}
          <div>
            <h3
              style={{
                margin: '0 0 24px 0',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'var(--font-display)',
                color: '#111111',
              }}
            >
              Available Now
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {features.filter((f) => f.badge === 'available').map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} badge={feature.badge} href={feature.href} />
              ))}
            </div>
          </div>

          {/* In Development Features */}
          <div>
            <h3
              style={{
                margin: '0 0 24px 0',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'var(--font-display)',
                color: '#111111',
              }}
            >
              In Development
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {features.filter((f) => f.badge === 'coming-soon').map((feature, index) => (
                <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} badge={feature.badge} href={feature.href} />
              ))}
            </div>
          </div>
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
                color: '#111111',
              }}
            >
              <span style={{ color: '#8B5CF6' }}>$29.99</span>
              <span style={{ fontSize: '0.5em', color: '#6B7280' }}>
                {' '}
                / month
              </span>
            </h2>
            <p
              style={{
                margin: '16px 0 0 0',
                fontSize: '16px',
                color: '#6B7280',
                fontFamily: 'var(--font-body)',
              }}
            >
              Save 16% with annual billing
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/pricing#attorney"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#8B5CF6',
              color: '#FFFFFF',
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
            className="attorney-cta-link"
          >
            See Attorney Mode Pricing →
          </Link>

          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '12px',
              color: '#6B7280',
              fontFamily: 'var(--font-body)',
            }}
          >
            No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

    </div>
  );
}
