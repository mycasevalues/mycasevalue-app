import { Metadata } from 'next';
import { ArrowRightIcon } from '../../components/ui/Icons';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About MyCaseValue — Democratizing Federal Court Data',
  description: 'MyCaseValue democratizes federal court outcome data. Explore aggregate results from 5.1M+ cases for informed legal research.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About MyCaseValue — Democratizing Federal Court Data',
    description: 'MyCaseValue aggregates 5.1M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
    type: 'website',
    url: `${SITE_URL}/about`,
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
        email: 'support@mycasevalue.com',
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
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <style>{`
        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: #FFF3F4;
          color: #E8171F;
        }

        .mission-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -1.5px;
          color: #212529;
          line-height: 1.2;
        }

        .mission-hero p {
          font-family: var(--font-body);
          font-size: 1.125rem;
          color: #455A64;
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
            background: #D5D8DC;
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
          background: #E8171F;
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          margin: 0 auto 1rem;
          box-shadow: 0 2px 8px rgba(232, 23, 31, 0.2);
          flex-shrink: 0;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .step-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #455A64;
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
          border-radius: 2px;
          border: 1px solid #D5D8DC;
          background: #FFFFFF;
          transition: all 0.2s ease;
        }

        .source-card:hover {
          border-color: #E8171F;
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.1);
          transform: translateY(-2px);
        }

        .source-icon {
          width: 48px;
          height: 48px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background: #F5F5F5;
        }

        .source-title {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .source-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #455A64;
          line-height: 1.6;
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          border-radius: 2px;
          border: 1px solid #D5D8DC;
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
          font-weight: 700;
          color: #E8171F;
          line-height: 1.2;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #455A64;
          margin-top: 0.75rem;
        }

        .team-box {
          padding: 2rem;
          border-radius: 2px;
          border: 1px solid #D5D8DC;
          background: #FFFFFF;
        }

        .team-box h3 {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          color: #212529;
        }

        .team-box ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0 0;
        }

        .team-box li {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #455A64;
          line-height: 1.8;
          margin-bottom: 0.75rem;
        }

        .team-box strong {
          color: #212529;
          font-weight: 600;
        }

        .cta-section {
          text-align: center;
          padding: 3rem 2rem;
          border-radius: 2px;
          border: 1px solid #D5D8DC;
          background: #FFFFFF;
        }

        .cta-heading {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #212529;
          margin-bottom: 1rem;
        }

        .cta-text {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #455A64;
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
          border-radius: 2px;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          background: #E8171F;
          color: #FFFFFF;
          text-decoration: none;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .cta-button:hover {
          background: #CC1019;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 23, 31, 0.3);
        }

        .section-heading {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 1.5rem;
        }

        .section-description {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #455A64;
          margin-bottom: 1.5rem;
          line-height: 1.6;
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
      <div className="border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.08)', background: '#00172E' }}>
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div style={{ marginBottom: '12px' }}>
            <a href="/" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.2s ease' }}>
              Home
            </a>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '0 8px' }}>/</span>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-body)' }}>About</span>
          </div>
          <div className="about-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5">
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
            <h1 style={{ color: '#212529' }}>Democratizing Access to Federal Court Data</h1>
            <p style={{ color: '#455A64' }}>
              Federal court data exists in the public domain, yet it remains locked away in systems designed for clerks and attorneys.
              MyCaseValue makes outcome data—win rates, settlement ranges, timelines, and recovery patterns—accessible to everyone making
              informed decisions about their legal situation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16" style={{ background: '#F5F6F7' }}>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2">
                      <path d="M12 3v18M3 12h18M3 6h18M3 18h18M6 3v18M18 3v18"/>
                    </svg>
                  ),
                },
                {
                  name: 'CourtListener',
                  description: 'Aggregates federal judicial opinions, oral arguments, and PACER filings for comprehensive case data.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#07874A" strokeWidth="2">
                      <path d="M3 12L9 6l6 6 6-6M3 12l6-6 6 6 6-6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V12z"/>
                    </svg>
                  ),
                },
                {
                  name: 'PACER',
                  description: 'The Federal Judiciary\'s official electronic records system. All docket sheets and filings are sourced from PACER.',
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="2">
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

          {/* Coverage Stats */}
          <section>
            <h2 className="section-heading">What We Cover</h2>
            <div className="stats-bar">
              {[
                { value: '5.1M+', label: 'Federal cases' },
                { value: '84', label: 'Case types' },
                { value: '94', label: 'Federal districts' },
                { value: '50+ yrs', label: 'Historical data' },
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
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#455A64', margin: '0 0 1rem 0' }}>
                MyCaseValue is built by legal researchers, data engineers, and technologists who believe transparency drives better decisions.
                We are not a law firm. We do not provide legal advice. We are a data platform.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#455A64', margin: '0 0 1rem 0' }}>
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
