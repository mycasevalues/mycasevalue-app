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

const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
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
        border: '1px solid #D5D8DC',
        borderRadius: '4px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
      className="attorney-feature-card"
    >
      <div style={{ fontSize: '32px', color: '#006997', transition: 'color 0.3s ease' }}>{icon}</div>
      <div>
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'var(--font-display)',
            color: '#212529',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#666666',
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
            borderRadius: '0px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor:
              badge === 'available' ? '#E8171F' : '#FAFBFC',
            color: badge === 'available' ? '#ffffff' : '#006997',
            border:
              badge === 'available'
                ? 'none'
                : '1px solid #D5D8DC',
            transition: 'all 0.3s ease',
          }}
        >
          {badge === 'available' ? 'Available' : 'Expected Q3 2026'}
        </span>
        {href && (
          <span style={{ fontSize: '13px', color: '#006997', fontWeight: 600, transition: 'color 0.3s ease' }}>
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
    badge: 'available' as const,
    href: '/attorney/opposing-counsel',
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
    badge: 'available' as const,
    href: '/attorney/pacer-monitor',
  },
  {
    icon: <ChartIcon />,
    title: 'Bulk Case Analysis',
    description:
      'Analyze portfolios of cases for pattern recognition, risk clustering, and outcome trends.',
    badge: 'available' as const,
    href: '/attorney/bulk-analysis',
  },
  {
    icon: <PeopleIcon />,
    title: 'Team Workspace',
    description:
      'Collaborate with colleagues, share reports, annotations, and case insights seamlessly.',
    badge: 'available' as const,
    href: '/attorney/team-workspace',
  },
  {
    icon: <APIIcon />,
    title: 'API Access',
    description:
      'Programmatic access to MyCaseValue data via REST API for custom integrations.',
    badge: 'available' as const,
    href: '/attorney/api-access',
  },
];

export default function AttorneyPage() {
  return (
    <div
      style={{
        color: '#212529',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
        backgroundColor: '#EDEEEE',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .attorney-feature-card:hover {
          border-color: #006997 !important;
          box-shadow: 0 8px 24px rgba(0, 23, 46, 0.12) !important;
          transform: translateY(-4px);
        }
        .attorney-feature-card:hover svg {
          color: #00172E !important;
        }
        .attorney-feature-card:hover h3 {
          color: #006997 !important;
        }
        .attorney-feature-card:hover span {
          color: #006997 !important;
        }
        .attorney-cta-link:hover {
          background-color: #CC1019 !important;
          box-shadow: 0 8px 24px rgba(232, 23, 31, 0.24) !important;
          transform: translateY(-2px);
        }
      `}} />
      {/* Header Section */}
      <section
        style={{
          backgroundColor: '#00172E',
          border: 'none',
          padding: '48px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left', marginBottom: '16px' }}>
          <Link href="/dashboard" style={{ fontSize: '13px', color: '#FFFFFF', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <BackIcon />
            Dashboard
          </Link>
        </div>
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
                backgroundColor: 'rgba(0,105,151,0.15)',
                color: '#FFFFFF',
                borderRadius: '0px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-mono)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Attorney Mode
            </span>
          </div>

          {/* Badge before Title */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', color: '#E8171F', width: 'fit-content' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.083V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-4.917c0-.767.251-1.521.84-2.505L12 14z"/></svg>
            ATTORNEY TOOLS
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              lineHeight: '1.2',
              color: '#FFFFFF',
            }}
          >
            Professional Legal Intelligence Suite
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255,255,255,0.7)',
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
                color: '#212529',
              }}
            >
              Everything in Unlimited,
              <span
                style={{
                  display: 'block',
                  color: '#E8171F',
                }}
              >
                plus:
              </span>
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'var(--font-body)',
              }}
            >
              Unlock the full power of legal intelligence with exclusive attorney-grade features.
            </p>
          </div>

          {/* All Features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} badge={feature.badge} href={feature.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: '#FFFFFF',
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
                color: '#212529',
              }}
            >
              <span style={{ color: '#E8171F' }}>$29.99</span>
              <span style={{ fontSize: '0.5em', color: '#666666' }}>
                {' '}
                / month
              </span>
            </h2>
            <p
              style={{
                margin: '16px 0 0 0',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'var(--font-body)',
              }}
            >
              Save 16% with annual billing
            </p>
          </div>

          {/* Beta Banner */}
          <div style={{ padding: '12px 20px', backgroundColor: 'rgba(0,105,151,0.08)', borderRadius: '0px', border: '1px solid #D5D8DC' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#006997', fontWeight: 600 }}>
              Beta Access — All attorney features are currently free during our preview period.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#E8171F',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '0px',
              fontWeight: '700',
              fontSize: '16px',
              fontFamily: 'var(--font-display)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
            className="attorney-cta-link"
          >
            Go to Dashboard →
          </Link>

          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '12px',
              color: '#666666',
              fontFamily: 'var(--font-body)',
            }}
          >
            No credit card required during beta.
          </p>
        </div>
      </section>

    </div>
  );
}
