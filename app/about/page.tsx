import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About MyCaseValues — Making Federal Court Data Accessible',
  description: 'MyCaseValues democratizes access to federal court outcome data from 5.1M+ public cases. Built on public records from FJC IDB, PACER, and CourtListener.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About MyCaseValues — Making Federal Court Data Accessible',
    description: 'MyCaseValues aggregates 5.1M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
    type: 'website',
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'About MyCaseValues' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MyCaseValues — Making Federal Court Data Accessible',
    description: 'MyCaseValues democratizes federal court outcome data. Free access to win rates, settlement ranges, and timelines from 5.1M+ public federal civil cases.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'MyCaseValues',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      description: 'An open-access intelligence layer on public federal court records. Making litigation data transparent and accessible.',
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
        addressRegion: 'West Virginia',
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

const audiences = [
  {
    title: 'Self-Represented Litigants (Pro Se)',
    description: 'Evaluate your legal options with real federal court outcome data. Make informed decisions about settlement or trial.',
  },
  {
    title: 'Solo & Small Firm Attorneys',
    description: 'Access the same litigation analytics large firms use for case evaluation, judge research, and settlement negotiation.',
  },
  {
    title: 'Paralegals & Case Managers',
    description: 'Build better discovery strategies and settlement timelines with historical federal court case data.',
  },
  {
    title: 'Law Students & Academics',
    description: 'Research federal civil litigation patterns, judge behavior, and case outcomes for scholarly work.',
  },
  {
    title: 'Legal Researchers',
    description: 'Explore 5.1M+ federal cases across 54 years of history. Analyze trends and build evidence-based legal arguments.',
  },
  {
    title: 'Other Legal Professionals',
    description: 'Claims adjusters, litigation funders, and legal consultants rely on our transparent, public federal court data.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <style>{`
        .about-container {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .about-header {
          background: #1C3A5E;
          color: #FFFFFF;
          padding: 3rem 1.5rem;
          text-align: left;
        }

        .about-h1 {
          font-family: var(--font-inter);
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          color: #FFFFFF;
        }

        .about-intro {
          font-family: var(--font-inter);
          font-size: 1.125rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
        }

        .main-content {
          padding: 3rem 1.5rem;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-heading {
          font-family: var(--font-inter);
          font-size: 1.5rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 1rem;
        }

        .section-text {
          font-family: var(--font-inter);
          font-size: 0.9375rem;
          line-height: 1.8;
          color: #4B5563;
          margin-bottom: 1rem;
        }

        .section-text strong {
          color: #0f0f0f;
          font-weight: 600;
        }

        .mission-box {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-left: 4px solid #0966C3;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .data-sources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .data-sources-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .source-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .source-card:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
          transform: translateY(-2px);
        }

        .source-title {
          font-family: var(--font-inter);
          font-size: 1rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 0.75rem;
        }

        .source-description {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
        }

        .audience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 768px) {
          .audience-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .audience-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .audience-card:hover {
          border-color: #0966C3;
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
        }

        .audience-title {
          font-family: var(--font-inter);
          font-size: 1rem;
          font-weight: 600;
          color: #0f0f0f;
          margin-bottom: 0.75rem;
        }

        .audience-description {
          font-family: var(--font-inter);
          font-size: 0.875rem;
          color: #4B5563;
          line-height: 1.6;
        }

        .company-info {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .company-text {
          font-family: var(--font-inter);
          font-size: 0.9375rem;
          line-height: 1.8;
          color: #4B5563;
          margin-bottom: 1rem;
        }

        .company-text:last-child {
          margin-bottom: 0;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-family: var(--font-inter);
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          background: #0966C3;
          color: #FFFFFF;
          transition: all 0.3s ease;
          margin-top: 1.5rem;
        }

        .contact-link:hover {
          background: #0855a3;
          transform: translateY(-2px);
        }

        .breadcrumb-wrapper {
          max-width: 56rem;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 0;
          font-family: var(--font-inter);
        }

        @media (max-width: 640px) {
          .about-h1 {
            font-size: 1.75rem;
          }

          .about-intro {
            font-size: 1rem;
          }

          .main-content {
            padding: 2rem 1rem;
          }

          .audience-grid {
            grid-template-columns: 1fr;
          }

          .data-sources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      {/* Header */}
      <div className="about-header">
        <div className="about-container">
          <h1 className="about-h1">About MyCaseValues</h1>
          <p className="about-intro">
            An open-access intelligence layer on public federal court records. We make litigation data transparent and accessible to everyone.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="about-container">
          {/* Mission Section */}
          <div className="section">
            <div className="mission-box">
              <p className="section-text" style={{ marginBottom: 0 }}>
                <strong>Our Mission:</strong> MyCaseValues democratizes access to federal court outcome data. We aggregate 5.1M+ cases from official public sources and transform raw court records into actionable intelligence for case evaluation, settlement negotiation, and strategic legal planning. By making outcome data transparent and accessible, we level the playing field and help people make genuinely informed decisions about their legal situations.
              </p>
            </div>
          </div>

          {/* What It Is Section */}
          <div className="section">
            <h2 className="section-heading">What It Is</h2>
            <p className="section-text">
              Federal court data exists in the public domain, yet it remains locked away in systems designed for clerks and attorneys. MyCaseValues makes outcome data—win rates, settlement ranges, timelines, and recovery patterns—accessible to everyone evaluating their legal options.
            </p>
            <p className="section-text">
              We are not a law firm. We do not provide legal advice. We are a data platform, and we operate with institutional standards around privacy, accuracy, and transparency.
            </p>
          </div>

          {/* Data Sources Section */}
          <div className="section">
            <h2 className="section-heading">Our Data Sources</h2>
            <p className="section-text">
              All data comes from official federal court records. We do not create or estimate any data—we aggregate and analyze public records only.
            </p>
            <div className="data-sources-grid">
              <div className="source-card">
                <h3 className="source-title">Federal Judicial Center (FJC IDB)</h3>
                <p className="source-description">
                  The official source for federal civil case statistics since 1970. Covers case type, disposition, duration, and outcome across all 95 districts.
                </p>
              </div>
              <div className="source-card">
                <h3 className="source-title">CourtListener / RECAP</h3>
                <p className="source-description">
                  Aggregates federal judicial opinions, oral arguments, and docket data for comprehensive case research and document analysis.
                </p>
              </div>
              <div className="source-card">
                <h3 className="source-title">PACER</h3>
                <p className="source-description">
                  The Federal Judiciary's official electronic records system. All docket sheets and filings are sourced from PACER.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Serve Section */}
          <div className="section">
            <h2 className="section-heading">Who We Serve</h2>
            <p className="section-text">
              MyCaseValues serves six core audiences in the legal ecosystem:
            </p>
            <div className="audience-grid">
              {audiences.map((audience, idx) => (
                <div key={idx} className="audience-card">
                  <h3 className="audience-title">{audience.title}</h3>
                  <p className="audience-description">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About the Company Section */}
          <div className="section">
            <h2 className="section-heading">About the Company</h2>
            <div className="company-info">
              <p className="company-text">
                <strong>MyCaseValue LLC</strong> is registered in West Virginia, United States. We are a team of legal researchers, data engineers, and technologists who believe transparency drives better decisions and empowers people to advocate for themselves effectively.
              </p>
              <p className="company-text">
                Our team is committed to accuracy (all data from official public records with rigorous quality checks), transparency (our methodology is fully documented and open to scrutiny), privacy (we never sell data or track individual research behavior), and accessibility (federal court data belongs to the public).
              </p>
              <Link href="/contact" className="contact-link">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
