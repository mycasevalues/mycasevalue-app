import Link from 'next/link';
import { Metadata } from 'next';
import React from 'react';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Attorney Mode — AI Legal Intelligence',
  description: 'AI-powered tools for attorneys. Case prediction, judge analytics, PACER monitoring, bulk analysis. $29.99/mo. 14-day free trial included.',
  alternates: { canonical: `${SITE_URL}/attorney` },
  openGraph: {
    title: 'Attorney Mode — Professional Legal Intelligence Suite',
    description: 'Advanced AI-powered tools for legal professionals. Case prediction, document analysis, opposing counsel research, and more.',
    url: `${SITE_URL}/attorney`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Attorney Mode',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attorney Mode',
    description: 'Advanced AI-powered legal intelligence for attorneys.',
    images: [`${SITE_URL}/og-image.png`],
  },
  keywords: [
    'legal intelligence',
    'case prediction',
    'document analysis',
    'opposing counsel research',
    'PACER monitoring',
    'attorney software',
    'legal tech',
    'AI legal tools',
    'litigation intelligence',
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
  badge: 'available' | 'in-development';
  href?: string;
}) => {
  const content = (
    <div
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border-default)',
        borderRadius: 4,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: 'var(--shadow-xs)',
      }}
      className="attorney-feature-card"
    >
      <div style={{ fontSize: '32px', color: 'var(--gold)', transition: 'color 0.3s ease' }}>{icon}</div>
      <div>
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: 'var(--font-ui)',
            color: 'var(--text1, #18181A)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--text2, #42403C)',
            lineHeight: '1.5',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '8px 12px',
            borderRadius: 4,
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor:
              badge === 'available' ? 'var(--data-positive)' : 'var(--surf)',
            color: badge === 'available' ? 'var(--card)' : 'var(--gold)',
            border:
              badge === 'available'
                ? 'none'
                : '1px solid var(--border-default)',
            transition: 'all 0.3s ease',
          }}
        >
          {badge === 'available' ? 'Available' : 'In Development'}
        </span>
        {href && (
          <span style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 600, transition: 'color 0.3s ease' }}>
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

const features: { icon: React.ReactNode; title: string; description: string; badge: 'available'; href?: string }[] = [
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
  {
    icon: <ScalesIcon />,
    title: 'Motion Success Rates',
    description:
      'Federal motion grant rates and success metrics by case type. Compare motion strategies across jurisdictions.',
    badge: 'available' as const,
    href: '/attorney/motion-analytics',
  },
  {
    icon: <CheckIcon />,
    title: 'Expert Witness Intelligence',
    description:
      'Expert categories, fee ranges, retention timing, and Daubert challenge success rates by case type.',
    badge: 'available' as const,
    href: '/attorney/expert-witness',
  },
  {
    icon: <DocumentIcon />,
    title: 'Demand Letter Generator',
    description:
      'AI-powered demand letter drafting with data-backed settlement figures and legal citations.',
    badge: 'available' as const,
    href: '/attorney/demand-letter',
  },
  {
    icon: <TargetIcon />,
    title: 'Statute of Limitations Calculator',
    description:
      'Calculate filing deadlines by case type and jurisdiction with tolling rules and EEOC timelines.',
    badge: 'available' as const,
    href: '/attorney/sol-calculator',
  },
  {
    icon: <ChartIcon />,
    title: 'Litigation Deadline Calculator',
    description:
      'Auto-calculate federal litigation deadlines from filing date with FRCP defaults and calendar export.',
    badge: 'available' as const,
    href: '/attorney/deadline-calculator',
  },
  {
    icon: <SearchIcon />,
    title: 'Client Intake Form Generator',
    description:
      'Generate case-type-specific intake questionnaires with conflict check fields and HTML export.',
    badge: 'available' as const,
    href: '/attorney/intake-forms',
  },
  {
    icon: <ScalesIcon />,
    title: 'Fee Schedule Calculator',
    description:
      'Compare contingency, hourly, hybrid, and lodestar fee arrangements with data-backed estimates.',
    badge: 'available' as const,
    href: '/attorney/fee-calculator',
  },
  {
    icon: <GavelIcon />,
    title: 'Case Timeline Generator',
    description:
      'Visual litigation timeline with auto-populated milestones and statistical resolution context.',
    badge: 'available' as const,
    href: '/attorney/case-timeline',
  },
  {
    icon: <AIIcon />,
    title: 'Local Court Rules Reference',
    description:
      'Quick-reference guide for local rules across all 95 federal districts, organized by circuit.',
    badge: 'available' as const,
    href: '/attorney/court-rules',
  },
  {
    icon: <SearchIcon />,
    title: 'Advanced Search',
    description: 'Dual-mode search with natural language and Boolean Terms & Connectors. West Key Number browser and faceted filtering.',
    badge: 'available' as const,
    href: '/attorney/advanced-search',
  },
  {
    icon: <CheckIcon />,
    title: 'KeyCite Citation Validator',
    description: 'Validate case citations with color-coded treatment flags. Track citing references, negative treatment, and case history.',
    badge: 'available' as const,
    href: '/attorney/keycite',
  },
  {
    icon: <DocumentIcon />,
    title: 'Secondary Sources Library',
    description: 'Browse treatises, encyclopedias, law reviews, practice guides, and restatements with jurisdiction and topic filters.',
    badge: 'available' as const,
    href: '/attorney/secondary-sources',
  },
  {
    icon: <TargetIcon />,
    title: '50-State Survey',
    description: 'Compare statutes and rules across all 50 states with interactive map, comparison tables, and export options.',
    badge: 'available' as const,
    href: '/attorney/state-survey',
  },
  {
    icon: <ScalesIcon />,
    title: 'Text Comparison & Redline',
    description: 'Side-by-side and redline comparison of legal texts with word-level diff, similarity scoring, and export.',
    badge: 'available' as const,
    href: '/attorney/compare-text',
  },
  {
    icon: <AIIcon />,
    title: 'Alerts & Notifications',
    description: 'Create custom research alerts with Boolean search terms, multi-format delivery, and flexible scheduling.',
    badge: 'available' as const,
    href: '/attorney/alerts',
  },
  {
    icon: <PeopleIcon />,
    title: 'Research Folders',
    description: 'Organize cases, statutes, and notes in hierarchical folders with annotations, sharing, and folder analysis.',
    badge: 'available' as const,
    href: '/attorney/folders',
  },
  {
    icon: <ChartIcon />,
    title: 'Find & Print',
    description: 'Batch retrieve up to 100 documents by citation. Choose format, delivery method, and merge options.',
    badge: 'available' as const,
    href: '/attorney/find-print',
  },
  {
    icon: <ScalesIcon />,
    title: 'Appeals Strategy',
    description: 'Appellate court analytics with circuit-specific success rates, opinion analysis, and strategic recommendations.',
    badge: 'available' as const,
    href: '/attorney/appeals',
  },
  {
    icon: <DocumentIcon />,
    title: 'Deposition Prep',
    description: 'AI-assisted deposition preparation with question generation, witness analysis, and exhibit management.',
    badge: 'available' as const,
    href: '/attorney/deposition-prep',
  },
  {
    icon: <SearchIcon />,
    title: 'Discovery Generator',
    description: 'Generate interrogatories, requests for production, and requests for admission tailored to your case type.',
    badge: 'available' as const,
    href: '/attorney/discovery-generator',
  },
  {
    icon: <PeopleIcon />,
    title: 'Class Action Toolkit',
    description: 'Class certification analysis, settlement benchmarks, and multi-district litigation intelligence.',
    badge: 'available' as const,
    href: '/attorney/class-action',
  },
  {
    icon: <DocumentIcon />,
    title: 'Demand Package Builder',
    description: 'Comprehensive demand package assembly with exhibits, medical summaries, and settlement calculations.',
    badge: 'available' as const,
    href: '/attorney/demand-package',
  },
  {
    icon: <GavelIcon />,
    title: 'Motion Drafting',
    description: 'AI-assisted motion drafting with jurisdiction-specific templates and success rate analytics.',
    badge: 'available' as const,
    href: '/attorney/motions',
  },
  {
    icon: <TargetIcon />,
    title: 'Negotiation Intelligence',
    description: 'Data-driven negotiation strategy with settlement ranges, timing analysis, and counteroffer modeling.',
    badge: 'available' as const,
    href: '/attorney/negotiation',
  },
  {
    icon: <AIIcon />,
    title: 'Research Memo Generator',
    description: 'AI-generated legal research memos with case analysis, statutory references, and strategic insights.',
    badge: 'available' as const,
    href: '/attorney/research-memo',
  },
  {
    icon: <ChartIcon />,
    title: 'Visual Case Timeline',
    description: 'Interactive timeline visualization of case events, deadlines, and milestones with export options.',
    badge: 'available' as const,
    href: '/attorney/timeline',
  },
];

export default function AttorneyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Attorney Mode', item: `${SITE_URL}/attorney` },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Attorney Mode',
        description: 'Advanced AI-powered legal intelligence tools for attorneys. Case prediction, document analysis, judge intelligence, opposing counsel research, and bulk analysis.',
        url: `${SITE_URL}/attorney`,
        applicationCategory: 'LegalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'AI Case Predictor',
          'Document Intelligence',
          'Judge Intelligence',
          'Opposing Counsel Analysis',
          'Venue Optimizer',
          'PACER Monitoring',
          'Bulk Case Analysis',
          'Team Workspace',
          'API Access',
          'Motion Success Rates',
          'Expert Witness Intelligence',
          'Demand Letter Generator',
          'Statute of Limitations Calculator',
          'Litigation Deadline Calculator',
          'Client Intake Form Generator',
          'Fee Schedule Calculator',
          'Case Timeline Generator',
          'Local Court Rules Reference',
          'Advanced Search',
          'KeyCite Citation Validator',
          'Secondary Sources Library',
          '50-State Survey',
          'Text Comparison & Redline',
          'Alerts & Notifications',
          'Research Folders',
          'Find & Print',
          'Appeals Strategy',
          'Deposition Prep',
          'Discovery Generator',
          'Class Action Toolkit',
          'Demand Package Builder',
          'Motion Drafting',
          'Negotiation Intelligence',
          'Research Memo Generator',
          'Visual Case Timeline',
        ],
      },
    ],
  };

  return (
    <div
      style={{
        color: 'var(--text1, #18181A)',
        fontFamily: 'var(--font-ui)',
        minHeight: '100vh',
        backgroundColor: 'var(--surf, #F6F5F2)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        .attorney-feature-card:hover {
          border-color: var(--gold) !important;
          box-shadow: var(--shadow-lg) !important;
          transform: translateY(-4px);
        }
        .attorney-feature-card:hover svg {
          color: var(--gold) !important;
        }
        .attorney-feature-card:hover h3 {
          color: var(--gold) !important;
        }
        .attorney-feature-card:hover span {
          color: var(--gold) !important;
        }
        .attorney-cta-link:hover {
          background-color: var(--gold) !important;
          box-shadow: var(--shadow-lg) !important;
          transform: translateY(-2px);
        }
        .attorney-breadcrumb-link:hover {
          color: var(--gold) !important;
        }
      `}} />
      {/* Header Section — workspace-consistent (no orange banner) */}
      <section
        style={{
          backgroundColor: 'var(--card)',
          borderBottom: '1px solid var(--bdr)',
          padding: '32px 24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px', fontFamily: 'var(--font-ui)' }}>
            <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--bdr)' }}>›</span>
            <span style={{ color: 'var(--text1, #18181A)', fontWeight: 600 }}>Attorney Tools</span>
          </nav>

          {/* Title */}
          <h1
            style={{
              margin: '0 0 8px',
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--font-legal)',
              lineHeight: '1.2',
              color: 'var(--text1, #18181A)',
              letterSpacing: '-0.5px',
            }}
          >
            Attorney Tools
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--text2, #42403C)',
              lineHeight: '1.5',
              maxWidth: '700px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            AI-powered case predictions, data-backed settlement ranges, judge intelligence, and venue optimization.
          </p>
        </div>
      </section>

      {/* Attorney Toolkit Section */}
      <section
        style={{
          padding: '60px 24px',
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
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1, #18181A)',
              }}
            >
              Intelligence Tools Enterprise Platforms Don't Build
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--text2, #42403C)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              Evaluate cases with real outcome data. Predict settlement ranges. Understand judge behavior. Identify optimal venues. Make decisions backed by 5.1M+ verified federal cases.
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
                href: '/attorney/case-timeline',
              },
            ].map((item, index) => (
              <Link key={index} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  style={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 4,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-xs)',
                    height: '100%',
                  }}
                  className="attorney-feature-card"
                >
                  <div style={{ fontSize: '32px', color: 'var(--gold)', transition: 'color 0.3s ease' }}>{item.icon}</div>
                  <div>
                    <h3
                      style={{
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--text1, #18181A)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        color: 'var(--text2, #42403C)',
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 600, transition: 'color 0.3s ease' }}>
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
          padding: '60px 24px',
          backgroundColor: 'var(--card)',
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
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1, #18181A)',
              }}
            >
              Replace Hours of Manual Research with Minutes of Data-Backed Insights
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--text2, #42403C)',
                fontFamily: 'var(--font-ui)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              From case intake to settlement negotiation, use transparent, verified federal court data to make smarter litigation decisions.
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
                description: 'Assess case viability in minutes. See win rates, settlement ranges, and outcomes for your specific case type and jurisdiction. Make better intake decisions and filter weak cases before investing resources.',
              },
              {
                title: 'Settlement Negotiation Preparation',
                description: 'Know the data before you negotiate. Access comparable settlements, judge tendencies, and historical ranges. Make anchored offers backed by transparent federal court data, not hunches.',
              },
              {
                title: 'Client Expectation Management',
                description: 'Show clients real outcomes from real federal cases. Reduce conflicts and malpractice exposure by setting expectations grounded in verified judicial data, not estimates.',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--surf, #F6F5F2)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 4,
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
                      backgroundColor: 'var(--gold)',
                      color: 'var(--card)',
                      borderRadius: 4,
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text1, #18181A)',
                    }}
                  >
                    {useCase.title}
                  </h3>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'var(--text2, #42403C)',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-ui)',
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
          padding: '60px 24px',
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
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1, #18181A)',
              }}
            >
              Built on Transparency. Powered by Real Data.
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--text2, #42403C)',
                fontFamily: 'var(--font-ui)',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              No black-box algorithms. No proprietary models. Every outcome comes from verified federal court records. Every prediction is explainable and auditable.
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
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 4,
                  padding: '32px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--gold)',
                    marginBottom: '12px',
                  }}
                >
                  {item.stat}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'var(--text2, #42403C)',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-ui)',
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
          padding: '60px 24px',
          backgroundColor: 'var(--card)',
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
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1, #18181A)',
              }}
            >
              Everything in Unlimited,
              <span
                style={{
                  display: 'block',
                  color: 'var(--gold)',
                }}
              >
                plus:
              </span>
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--text2, #42403C)',
                fontFamily: 'var(--font-ui)',
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
          padding: '60px 24px',
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
                fontSize: '28px',
                fontWeight: '600',
                fontFamily: 'var(--font-ui)',
                color: 'var(--text1, #18181A)',
              }}
            >
              Get Started
            </h2>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '16px',
                color: 'var(--text2, #42403C)',
                fontFamily: 'var(--font-ui)',
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
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 4,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-xs)',
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
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text1, #18181A)',
                  }}
                >
                  {cta.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'var(--text2, #42403C)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {cta.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
