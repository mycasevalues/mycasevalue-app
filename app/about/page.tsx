import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About MyCaseValue — Democratizing Federal Court Data',
  description: 'MyCaseValue democratizes federal court outcome data. Free access to win rates, settlement ranges, and timelines from 5.1M+ public federal civil cases.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About MyCaseValue — Democratizing Federal Court Data',
    description: 'MyCaseValue aggregates 5.1M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
    type: 'website',
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'About MyCaseValue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MyCaseValue — Democratizing Federal Court Data',
    description: 'MyCaseValue democratizes federal court outcome data. Free access to win rates, settlement ranges, and timelines from 5.1M+ public federal civil cases.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValue',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: 'A platform democratizing access to federal court outcome data from 5.1M+ cases.',
      sameAs: [
        'https://twitter.com/mycasevalue',
        'https://linkedin.com/company/mycasevalue',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@mycasevalues.com',
        contactType: 'customer support',
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      <style>{`
        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: #FFF3F4;
          color: #0966C3;
        }

        .mission-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          letter-spacing: -1.5px;
          color: #0f0f0f;
          line-height: 1.2;
        }

        .mission-hero p {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: #4B5563;
          line-height: 1.8;
        }

        .timeline-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          position: relative;
          padding: 2rem 0;
        }

        @media (min-width: 768px) {
          .timeline-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .timeline-container::before {
            content: '';
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            height: 2px;
            background: #E5E7EB;
            z-index: 0;
          }
        }

        .timeline-step {
          position: relative;
          text-align: center;
          z-index: 1;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #0966C3;
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          margin: 0 auto 1rem;
          box-shadow: 0 2px 8px rgba(10, 102, 194, 0.2);
          flex-shrink: 0;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 0.5rem;
        }

        .step-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
        }

        .data-sources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .data-sources-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .source-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          transition: all 0.2s ease;
        }

        .source-card:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
          transform: translateY(-2px);
        }

        .source-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background: #F7F8FA;
        }

        .source-title {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 0.5rem;
        }

        .source-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
        }

        @media (min-width: 768px) {
          .stats-bar {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 600;
          color: #0966C3;
          line-height: 1.2;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #4B5563;
          margin-top: 0.75rem;
        }

        .team-box {
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
        }

        .team-box h3 {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f0f0f;
        }

        .team-box ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0 0;
        }

        .team-box li {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.8;
          margin-bottom: 0.75rem;
        }

        .team-box strong {
          color: #0f0f0f;
          font-weight: 600;
        }

        .cta-section {
          text-align: center;
          padding: 3rem 2rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
        }

        .cta-heading {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 1rem;
        }

        .cta-text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #4B5563;
          margin-bottom: 1.5rem;
          max-width: 28rem;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 48px;
          padding: 0 2rem;
          border-radius: 12px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          background: #0966C3;
          color: #FFFFFF;
          text-decoration: none;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .cta-button:hover {
          background: #B91C1C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(10, 102, 194, 0.25);
        }

        .section-heading {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 1.5rem;
        }

        .section-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .by-numbers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .by-numbers-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        .number-stat-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          text-align: center;
        }

        .number-stat-value {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 600;
          color: #0966C3;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .number-stat-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #4B5563;
        }

        .differentiators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .differentiators-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        .differentiator-card {
          padding: 1.5rem;
          border-radius: 12px;
          border-top: 3px solid #0966C3;
          border-left: 1px solid #E5E7EB;
          border-right: 1px solid #E5E7EB;
          border-bottom: 1px solid #E5E7EB;
          background: #FFFFFF;
        }

        .differentiator-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 0.75rem;
        }

        .differentiator-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .tools-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
        }

        .tool-card {
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tool-card:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
          transform: translateY(-2px);
        }

        .tool-name {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f0f0f;
        }

        .tool-description {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #4B5563;
          line-height: 1.5;
          flex: 1;
        }

        .tool-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #004182;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .tool-link:hover {
          color: #0966C3;
        }

        .contact-section {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 2rem;
        }

        .contact-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .contact-block h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 1rem;
        }

        .contact-block p {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #004182;
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          transition: color 0.2s ease;
          margin-bottom: 0.5rem;
        }

        .contact-link:hover {
          color: #0966C3;
        }

        @media (max-width: 640px) {
          .mission-hero h1 {
            font-size: 1.75rem;
          }

          .mission-hero p {
            font-size: 1rem;
          }

          .timeline-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .timeline-container::before {
            display: none;
          }

          .cta-section {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)', background: '#1C3A5E' }}>
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div style={{ marginBottom: '12px' }}>
            <a href="/" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s ease' }}>
              Home
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 8px' }}>/</span>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-body)' }}>About</span>
          </div>
          <div className="about-badge">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            ABOUT US
          </div>
        </div>
      </div>

      {/* Mission Hero Section */}
      <div className="border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)', background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
          <div className="mission-hero">
            <h1 style={{ color: '#0f0f0f' }}>Democratizing Access to Federal Court Data</h1>
            <p style={{ color: '#4B5563' }}>
              Federal court data exists in the public domain, yet it remains locked away in systems designed for clerks and attorneys.
              MyCaseValue makes outcome data—win rates, settlement ranges, timelines, and recovery patterns—accessible to everyone making
              informed decisions about their legal situation.
            </p>
          </div>
        </div>
      </div>

      {/* By the Numbers Section */}
      <div style={{ background: '#F7F8FA', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="section-heading">By the Numbers</h2>
          <div className="by-numbers-grid">
            {[
              { value: '5.1M+', label: 'Federal Cases in Database' },
              { value: '84', label: 'Case Type Categories' },
              { value: '94', label: 'Districts Covered' },
              { value: '13', label: 'Circuit Courts' },
              { value: '54 years', label: 'Historical Data (1970–2024)' },
              { value: '100%', label: 'Free During Beta' },
            ].map((stat, i) => (
              <div key={i} className="number-stat-card">
                <div className="number-stat-value">{stat.value}</div>
                <div className="number-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16" style={{ background: '#F7F8FA' }}>
        <div className="space-y-20">

          {/* How It Works Section - Timeline */}
          <section>
            <h2 className="section-heading">How It Works</h2>
            <div className="timeline-container">
              {[
                {
                  step: '1',
                  title: 'Search',
                  description: 'Select your case type from 84 federal case types. Get instant access to historical outcome data specific to your legal scenario.',
                },
                {
                  step: '2',
                  title: 'Review',
                  description: 'Explore win rates, settlement percentages, recovery ranges, and case timelines derived from 5.1M+ real federal cases.',
                },
                {
                  step: '3',
                  title: 'Research',
                  description: 'Use data-driven insights to make informed decisions. Share findings with attorneys or use them for your own evaluation.',
                },
              ].map((item) => (
                <div key={item.step} className="timeline-step">
                  <div className="step-number">{item.step}</div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What Makes Us Different Section */}
          <section>
            <h2 className="section-heading">What Makes Us Different</h2>
            <div className="differentiators-grid">
              {[
                {
                  title: 'Real Federal Data',
                  description: 'Not estimates or guesses. Every statistic comes directly from official federal court records maintained by the FJC.',
                },
                {
                  title: 'Complete Transparency',
                  description: 'We show our methodology, data sources, confidence levels, and limitations. No black boxes.',
                },
                {
                  title: 'Free Access',
                  description: 'During our launch period, every feature is free with no account required. We believe court data should be accessible to everyone.',
                },
                {
                  title: 'Purpose-Built Analytics',
                  description: 'Unlike generic legal databases, we\'re built specifically for case outcome analysis with tools tailored to that purpose.',
                },
              ].map((diff, i) => (
                <div key={i} className="differentiator-card">
                  <h3 className="differentiator-title">{diff.title}</h3>
                  <p className="differentiator-description">{diff.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Sources Section - Cards Grid */}
          <section>
            <h2 className="section-heading">Our Data Sources</h2>
            <p className="section-description">
              We aggregate outcome data from official federal court records, ensuring accuracy and transparency.
            </p>
            <div className="data-sources-grid">
              {[
                {
                  name: 'Federal Judicial Center',
                  description: 'The official source for federal civil case statistics since 1970. Covers case type, disposition, and duration.',
                  icon: (
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2">
                      <path d="M12 3v18M3 12h18M3 6h18M3 18h18M6 3v18M18 3v18"/>
                    </svg>
                  ),
                },
                {
                  name: 'CourtListener',
                  description: 'Aggregates federal judicial opinions, oral arguments, and PACER filings for comprehensive case data.',
                  icon: (
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <path d="M3 12L9 6l6 6 6-6M3 12l6-6 6 6 6-6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V12z"/>
                    </svg>
                  ),
                },
                {
                  name: 'PACER',
                  description: 'The Federal Judiciary\'s official electronic records system. All docket sheets and filings are sourced from PACER.',
                  icon: (
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2">
                      <path d="M20 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
                      <path d="M8 9h8M8 13h8"/>
                    </svg>
                  ),
                },
              ].map((source, i) => (
                <div key={i} className="source-card">
                  <div className="source-icon">{source.icon}</div>
                  <h3 className="source-title">{source.name}</h3>
                  <p className="source-description">{source.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Tools Section */}
          <section>
            <h2 className="section-heading">Our Tools</h2>
            <p className="section-description">
              A complete suite of tools designed specifically for federal court outcome analysis and legal research.
            </p>
            <div className="tools-grid">
              {[
                {
                  name: 'Case Search',
                  description: 'Search 5.1M+ federal cases by type, district, judge, and outcome.',
                },
                {
                  name: 'Settlement Calculator',
                  description: 'Estimate settlement ranges based on historical federal case data.',
                },
                {
                  name: 'Judge Analytics',
                  description: 'Analyze individual judge tendencies and case outcome patterns.',
                },
                {
                  name: 'Case Comparison',
                  description: 'Compare your case to similar federal cases with detailed metrics.',
                },
                {
                  name: 'NOS Explorer',
                  description: 'Browse case types and explore federal classification systems.',
                },
                {
                  name: 'Jargon Translator',
                  description: 'Decode legal terms and understand federal court terminology.',
                },
                {
                  name: 'Filing Trends',
                  description: 'Track patterns in federal case filings over time.',
                },
                {
                  name: 'Legal Glossary',
                  description: 'Complete reference for federal court and legal definitions.',
                },
              ].map((tool, i) => (
                <div key={i} className="tool-card">
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-description">{tool.description}</div>
                  <Link href="/search" className="tool-link">
                    Explore
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Coverage Stats */}
          <section>
            <h2 className="section-heading">What We Cover</h2>
            <div className="stats-bar">
              {[
                { value: '5.1M+', label: 'Federal cases' },
                { value: '84', label: 'Case types' },
                { value: '94', label: 'Federal districts' },
                { value: '54 yrs', label: 'Historical data (1970–2024)' },
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Team & Vision Section */}
          <section>
            <h2 className="section-heading">Team & Vision</h2>
            <div className="team-box">
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', margin: '0 0 1rem 0' }}>
                <strong>The Opportunity:</strong> Federal court data reveals how cases actually resolve in American civil litigation. Yet this critical public information remains trapped in government databases designed for attorneys and court clerks, inaccessible to litigants, small law firms, and informed citizens evaluating their legal options. This creates a massive information asymmetry: sophisticated parties with data teams make better decisions, while everyone else relies on guesswork, inflated expectations, or expensive expert consultations.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', margin: '0 0 1rem 0' }}>
                <strong>Our Mission:</strong> MyCaseValue democratizes access to verified federal court outcome data. We aggregate 5.1M+ cases from official sources—the Federal Judicial Center, PACER, and CourtListener—and transform raw court records into actionable intelligence for case evaluation, settlement negotiation, and strategic planning. By making outcome data transparent and accessible, we level the playing field and help people make genuinely informed decisions about their legal situations.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', margin: '0 0 1rem 0' }}>
                <strong>Our Approach:</strong> MyCaseValue is built as a B2C platform with embedded legal intelligence for attorneys. We serve individual case researchers, solo practitioners, and law firms with tools that combine outcome analytics, judge intelligence, and predictive modeling. Our business model—free basic access with premium tiers for professionals—ensures both broad reach and sustainable revenue. We are not a law firm. We do not provide legal advice. We are a data platform, and we operate with institutional standards around privacy, accuracy, and transparency.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', margin: '0 0 1rem 0' }}>
                MyCaseValue is built by MyCaseValue LLC, based in West Virginia. We are a team of legal researchers, data engineers, and technologists who believe transparency drives better decisions and empowers people to advocate for themselves effectively.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#4B5563', margin: '0 0 1rem 0' }}>
                Our team is committed to:
              </p>
              <ul>
                <li><strong>Accuracy:</strong> All data comes from official public records with rigorous quality checks.</li>
                <li><strong>Transparency:</strong> Our methodology is fully documented and open to scrutiny.</li>
                <li><strong>Privacy:</strong> We never sell data or track individual research behavior.</li>
                <li><strong>Accessibility:</strong> Federal court data belongs to the public; we make it accessible.</li>
              </ul>
            </div>
          </section>

          {/* Contact & Connect Section */}
          <section>
            <h2 className="section-heading">Contact & Connect</h2>
            <div className="contact-section">
              <div className="contact-content">
                <div className="contact-block">
                  <h3>Email Support</h3>
                  <p>Have questions about our data, tools, or platform?</p>
                  <a href="mailto:support@mycasevalues.com" className="contact-link">
                    support@mycasevalues.com
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
                <div className="contact-block">
                  <h3>Community & Feedback</h3>
                  <p>Help us improve. Share feedback and feature requests.</p>
                  <a href="mailto:feedback@mycasevalue.com" className="contact-link">
                    feedback@mycasevalue.com
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
                <div className="contact-block">
                  <h3>Follow Us</h3>
                  <p>Stay updated on platform improvements and new features.</p>
                  <a href="https://twitter.com/mycasevalue" target="_blank" rel="noopener noreferrer" className="contact-link">
                    Twitter
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2 className="cta-heading">Start Researching Your Case</h2>
            <p className="cta-text">
              Access aggregate federal court data for informed decision-making. Free basic reports and premium analytics available.
            </p>
            <a href="/search" className="cta-button">
              Search Cases
              <ArrowRightIcon size={16} />
            </a>
          </section>

        </div>
      </div>

    </div>
  );
}
