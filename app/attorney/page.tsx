import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Attorney Mode - Professional Legal Intelligence Suite',
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
        border: '1px solid #E5E7EB',
        borderRadius: '6px',
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
      <div style={{ fontSize: '32px', color: '#6D28D9', transition: 'color 0.3s ease' }}>{icon}</div>
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
            color: '#4B5563',
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
              badge === 'available' ? '#7C3AED' : '#FAFBFC',
            color: badge === 'available' ? '#ffffff' : '#6D28D9',
            border:
              badge === 'available'
                ? 'none'
                : '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
          }}
        >
          {badge === 'available' ? 'Available' : 'Expected Q3 2026'}
        </span>
        {href && (
          <span style={{ fontSize: '13px', color: '#6D28D9', fontWeight: 600, transition: 'color 0.3s ease' }}>
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
        backgroundColor: '#F7F8FA',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .attorney-feature-card:hover {
          border-color: #6D28D9 !important;
          box-shadow: 0 8px 24px rgba(27, 58, 92, 0.12) !important;
          transform: translateY(-4px);
        }
        .attorney-feature-card:hover svg {
          color: #1B3A5C !important;
        }
        .attorney-feature-card:hover h3 {
          color: #6D28D9 !important;
        }
        .attorney-feature-card:hover span {
          color: #6D28D9 !important;
        }
        .attorney-cta-link:hover {
          background-color: #7C3AED !important;
          box-shadow: 0 8px 24px rgba(232, 23, 31, 0.24) !important;
          transform: translateY(-2px);
        }
        .attorney-breadcrumb-link:hover {
          color: #FFFFFF !important;
        }
      `}} />
      {/* Header Section */}
      <section
        style={{
          backgroundColor: '#1B3A5C',
          border: 'none',
          padding: '48px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left', marginBottom: '24px' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            <a href="/" className="attorney-breadcrumb-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Find an Attorney</span>
          </div>
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
                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                color: '#FFFFFF',
                borderRadius: '6px',
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

          {/* Red Accent Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', color: '#7C3AED', width: 'fit-content' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            ATTORNEY MODE
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

      {/* Attorney Toolkit Section */}
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
              Attorney Toolkit
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
              }}
            >
              Essential tools to evaluate cases, prepare negotiations, and gain competitive intelligence.
            </p>
          </div>

          {/* Toolkit Features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: <ChartIcon />,
                title: 'Case Evaluation Data',
                description: 'Rapid assessment of case strength with win rates, settlement patterns, and comparable outcomes.',
                href: '/search',
              },
              {
                icon: <ScalesIcon />,
                title: 'Settlement Benchmarking',
                description: 'Evidence-based settlement ranges and historical patterns to inform negotiation strategy.',
                href: '/calculator',
              },
              {
                icon: <GavelIcon />,
                title: 'Judge Intelligence',
                description: 'Research judges by district — ruling patterns, settlement tendencies, and case statistics.',
                href: '/attorney/judge-intelligence',
              },
              {
                icon: <PeopleIcon />,
                title: 'Client Counseling Support',
                description: 'Data-backed insights to educate clients on realistic outcomes and set proper expectations.',
                href: '/search',
              },
              {
                icon: <SearchIcon />,
                title: 'Opposing Counsel Research',
                description: 'Track opposing counsel track records, strategies, and settlement negotiation patterns.',
                href: '/attorney/opposing-counsel',
              },
              {
                icon: <TargetIcon />,
                title: 'Case Timeline Projections',
                description: 'Historical duration data by case type and district to forecast case resolution timelines.',
                href: '/search',
              },
            ].map((item, index) => (
              <Link key={index} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    height: '100%',
                  }}
                  className="attorney-feature-card"
                >
                  <div style={{ fontSize: '32px', color: '#6D28D9', transition: 'color 0.3s ease' }}>{item.icon}</div>
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
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#4B5563',
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#6D28D9', fontWeight: 600, transition: 'color 0.3s ease' }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Attorneys Use MyCaseValue Section */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: '#FFFFFF',
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
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#212529',
              }}
            >
              How Attorneys Use MyCaseValue
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Real-world applications for case evaluation, settlement preparation, and client management.
            </p>
          </div>

          {/* Use Cases */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Pre-litigation Evaluation',
                description: 'Before accepting a case, assess its viability and potential value using real federal court data. Compare case type outcomes across districts to determine whether to take the matter.',
              },
              {
                title: 'Settlement Negotiation Preparation',
                description: 'Enter settlement discussions armed with comparable case data, win rates, and historical settlement ranges. Make data-backed offers supported by federal court precedent.',
              },
              {
                title: 'Client Expectation Management',
                description: 'Educate clients on realistic outcomes with actual federal court statistics. Reduce surprises and disputes by setting expectations grounded in verified judicial data.',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#F7F8FA',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      backgroundColor: '#7C3AED',
                      color: '#FFFFFF',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-display)',
                      color: '#212529',
                    }}
                  >
                    {useCase.title}
                  </h3>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#4B5563',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data-Driven Advantage Stats Section */}
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
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#212529',
              }}
            >
              Data-Driven Advantage
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Leverage verified federal court data for competitive intelligence and client confidence.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                stat: '23%',
                label: 'Higher settlements with data-backed negotiations',
              },
              {
                stat: '5.1M+',
                label: 'Federal cases analyzed',
              },
              {
                stat: '84',
                label: 'Case types supported',
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  padding: '32px',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: '800',
                    fontFamily: 'var(--font-display)',
                    color: '#7C3AED',
                    marginBottom: '12px',
                  }}
                >
                  {item.stat}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#4B5563',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything In Unlimited Plus Section */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: '#FFFFFF',
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
                  color: '#7C3AED',
                }}
              >
                plus:
              </span>
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
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

      {/* Get Started CTA Section */}
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
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: '#212529',
              }}
            >
              Get Started
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Access powerful attorney tools to elevate your legal practice. Start free today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              maxWidth: '800px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {[
              {
                href: '/search',
                label: 'Search Cases',
                description: 'Research case outcomes and settlement data.',
              },
              {
                href: '/calculator',
                label: 'Calculate Settlement',
                description: 'Estimate case value with data-backed projections.',
              },
              {
                href: '/attorney/judge-intelligence',
                label: 'Judge Intelligence',
                description: 'Research federal judges and ruling patterns.',
              },
            ].map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                style={{
                  padding: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: 'center',
                }}
                className="attorney-feature-card"
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-display)',
                    color: '#212529',
                  }}
                >
                  {cta.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#4B5563',
                    lineHeight: '1.5',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cta.description}
                </p>
              </Link>
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
              <span style={{ color: '#7C3AED' }}>$29.99</span>
              <span style={{ fontSize: '0.5em', color: '#4B5563' }}>
                {' '}
                / month
              </span>
            </h2>
            <p
              style={{
                margin: '16px 0 0 0',
                fontSize: '16px',
                color: '#4B5563',
                fontFamily: 'var(--font-body)',
              }}
            >
              Save 16% with annual billing
            </p>
          </div>

          {/* Beta Banner */}
          <div style={{ padding: '12px 20px', backgroundColor: 'rgba(0,105,151,0.08)', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#6D28D9', fontWeight: 600 }}>
              Beta Access — All attorney features are currently free during our preview period.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              textDecoration: 'none',
              borderRadius: '6px',
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
              color: '#4B5563',
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
