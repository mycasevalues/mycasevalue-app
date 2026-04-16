import'{ Metadata } from 'next';
import'Link from 'next/link';
import'{ SITE_URL } from '../../lib/site-config';
import'{ Breadcrumbs } from '../../components/Breadcrumbs';

export'const revalidate = 0;

export'const metadata: Metadata = {
' title: 'About the Platform — Federal Court Data for All',
' description: 'Making federal court data accessible to everyone. 5.1M+ cases from FJC, PACER, CourtListener. Mission-driven legal intelligence.',
' alternates: { canonical: `${SITE_URL}/about` },
' openGraph: {
'   title: 'About the Platform — Making Federal Court Data Accessible',
'   description: 'MyCaseValue aggregates 5.1M+ federal court cases to help you research real outcomes, win rates, and settlement data.',
'   type: 'website',
'   url: `${SITE_URL}/about`,
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'About the Platform' }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'About the Platform — Making Federal Court Data Accessible',
'   description: 'MyCaseValue democratizes federal court outcome data. Free access to win rates, settlement ranges, and timelines from 5.1M+ public federal civil cases.',
'   images: [`${SITE_URL}/og-image.png`],
' },
};

const'jsonLd = {
' '@context': 'https://schema.org',
' '@graph': [
'   {
'     '@type': 'Organization',
'     name: 'MyCaseValue',
'     url: SITE_URL,
'     logo: `${SITE_URL}/icon-512.png`,
'     description: 'An open-access intelligence layer on public federal court records. Making litigation data transparent and accessible.',
'     sameAs: [
'       'https://twitter.com/mycasevalue',
'       'https://linkedin.com/company/mycasevalue',
'     ],
'     contactPoint: {
'       '@type': 'ContactPoint',
'       email: 'support@mycasevalues.com',
'       contactType: 'customer support',
'     },
'     address: {
'       '@type': 'PostalAddress',
'       addressCountry: 'US',
'       addressRegion: 'West Virginia',
'     },
'   },
'   {
'     '@type': 'BreadcrumbList',
'     itemListElement: [
'       { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
'       { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
'     ],
'   },
' ],
};

const'audiences = [
' {
'   title: 'Self-Represented Litigants (Pro Se)',
'   description: 'Evaluate your legal options with real federal court outcome data. Make informed decisions about settlement or trial.',
' },
' {
'   title: 'Solo & Small Firm Attorneys',
'   description: 'Access the same litigation analytics large firms use for case evaluation, judge research, and settlement negotiation.',
' },
' {
'   title: 'Paralegals & Case Managers',
'   description: 'Build better discovery strategies and settlement timelines with historical federal court case data.',
' },
' {
'   title: 'Law Students & Academics',
'   description: 'Research federal civil litigation patterns, judge behavior, and case outcomes for scholarly work.',
' },
' {
'   title: 'Legal Researchers',
'   description: 'Explore 5.1M+ federal cases across 55+ years of history. Analyze trends and build evidence-based legal arguments.',
' },
' {
'   title: 'Other Legal Professionals',
'   description: 'Claims adjusters, litigation funders, and legal consultants rely on our transparent, public federal court data.',
' },
];

export'default function AboutPage() {
' return (
'   <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
'     <style>{`
'       .about-container {
'         max-width: 56rem;
'         margin: 0 auto;
'         padding: 0 1.5rem;
'       }

'       .about-header {
'         background: var(--gradient-hero);
'         color: var(--color-surface-0);
'         padding: 3rem 1.5rem;
'         text-align: left;
'       }

'       .about-h1 {
'         font-family: var(--font-inter);
'         font-size: clamp(2rem, 5vw, 2.5rem);
'         font-weight: 600;
'         letter-spacing: -0.5px;
'         line-height: 1.2;
'         margin-bottom: 0.5rem;
'         color: var(--color-surface-0);
'       }

'       .about-intro {
'         font-family: var(--font-inter);
'         font-size: 1.125rem;
'         line-height: 1.8;
'         color: rgba(255, 255, 255, 0.85);
'       }

'       .main-content {
'         padding: 3rem 1.5rem;
'       }

'       .section {
'         margin-bottom: 3rem;
'       }

'       .section-heading {
'         font-family: var(--font-inter);
'         font-size: 1.5rem;
'         font-weight: 600;
'         color: var(--color-text-primary);
'         margin-bottom: 1rem;
'       }

'       .section-text {
'         font-family: var(--font-inter);
'         font-size: 0.9375rem;
'         line-height: 1.8;
'         color: var(--color-text-secondary);
'         margin-bottom: 1rem;
'       }

'       .section-text strong {
'         color: var(--color-text-primary);
'         font-weight: 600;
'       }

'       .mission-box {
'         background: var(--color-surface-0);
'         border: 1px solid var(--border-default);
'         border-left: 4px solid var(--accent-primary);
'         border-radius: 12px;
'         padding: 2rem;
'         margin-bottom: 2rem;
'       }

'       .data-sources-grid {
'         display: grid;
'         grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
'         gap: 1.5rem;
'         margin-bottom: 2rem;
'       }

'       @media (min-width: 768px) {
'         .data-sources-grid {
'           grid-template-columns: repeat(3, 1fr);
'         }
'       }

'       .source-card {
'         background: var(--color-surface-0);
'         border: 1px solid var(--border-default);
'         border-radius: 12px;
'         padding: 1.5rem;
'         transition: all 0.2s ease;
'       }

'       .source-card:hover {
'         border-color: var(--accent-primary);
'         box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
'         transform: translateY(-2px);
'       }

'       .source-title {
'         font-family: var(--font-inter);
'         font-size: 1rem;
'         font-weight: 600;
'         color: var(--color-text-primary);
'         margin-bottom: 0.75rem;
'       }

'       .source-description {
'         font-family: var(--font-inter);
'         font-size: 0.875rem;
'         color: var(--color-text-secondary);
'         line-height: 1.6;
'       }

'       .audience-grid {
'         display: grid;
'         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
'         gap: 1.5rem;
'         margin-bottom: 2rem;
'       }

'       @media (min-width: 768px) {
'         .audience-grid {
'           grid-template-columns: repeat(2, 1fr);
'         }
'       }

'       .audience-card {
'         background: var(--color-surface-0);
'         border: 1px solid var(--border-default);
'         border-radius: 12px;
'         padding: 1.5rem;
'         transition: all 0.2s ease;
'       }

'       .audience-card:hover {
'         border-color: var(--accent-primary);
'         box-shadow: 0 4px 12px rgba(10, 102, 194, 0.1);
'       }

'       .audience-title {
'         font-family: var(--font-inter);
'         font-size: 1rem;
'         font-weight: 600;
'         color: var(--color-text-primary);
'         margin-bottom: 0.75rem;
'       }

'       .audience-description {
'         font-family: var(--font-inter);
'         font-size: 0.875rem;
'         color: var(--color-text-secondary);
'         line-height: 1.6;
'       }

'       .company-info {
'         background: var(--color-surface-0);
'         border: 1px solid var(--border-default);
'         border-radius: 12px;
'         padding: 2rem;
'         margin-bottom: 2rem;
'       }

'       .company-text {
'         font-family: var(--font-inter);
'         font-size: 0.9375rem;
'         line-height: 1.8;
'         color: var(--color-text-secondary);
'         margin-bottom: 1rem;
'       }

'       .company-text:last-child {
'         margin-bottom: 0;
'       }

'       .contact-link {
'         display: inline-flex;
'         align-items: center;
'         gap: 0.5rem;
'         padding: 0.75rem 1.5rem;
'         border-radius: 9999px;
'         font-family: var(--font-inter);
'         font-size: 0.875rem;
'         font-weight: 600;
'         text-decoration: none;
'         background: var(--gradient-hero);
'         color: var(--color-surface-0);
'         transition: all 0.3s ease;
'         margin-top: 1.5rem;
'       }

'       .contact-link:hover {
'         background: #0855a3;
'         transform: translateY(-2px);
'       }

'       .breadcrumb-wrapper {
'         max-width: 56rem;
'         margin: 0 auto;
'         padding: 1.5rem 1.5rem 0;
'         font-family: var(--font-inter);
'       }

'       @media (max-width: 640px) {
'         .about-h1 {
'           font-size: 1.75rem;
'         }

'         .about-intro {
'           font-size: 1rem;
'         }

'         .main-content {
'           padding: 2rem 1rem;
'         }

'         .audience-grid {
'           grid-template-columns: 1fr;
'         }

'         .data-sources-grid {
'           grid-template-columns: 1fr;
'         }
'       }
'     `}</style>

'     <script
'       type="application/ld+json"
'       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
'     />

'     {/* Breadcrumb */}
'     <div className="breadcrumb-wrapper">
'       <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
'     </div>

'     {/* Header */}
'     <div className="about-header">
'       <div className="about-container">
'         <h1 className="about-h1">About the Platform</h1>
'         <p className="about-intro">
'           Federal court intelligence built from public records. Making litigation data accessible, transparent, and actionable.
'         </p>
'       </div>
'     </div>

'     {/* Main Content */}
'     <div className="main-content">
'       <div className="about-container">
'         {/* Mission Section */}
'         <div className="section">
'           <div className="mission-box">
'             <p className="section-text" style={{ marginBottom: 0 }}>
'               <strong>Our Mission:</strong> Empower people to make smarter legal decisions by making federal court outcome data free, transparent, and accessible to everyone. We believe that outcome research shouldn't be locked behind expensive software, legal expertise, or consulting fees. By aggregating 5.1M+ cases from official public sources, we transform raw court records into actionable intelligence—leveling the playing field between those with resources and those without.
'             </p>
'           </div>
'         </div>

'         {/* What It Is Section */}
'         <div className="section">
'           <h2 className="section-heading">What It Is</h2>
'           <p className="section-text">
'             Federal court data exists in the public domain, yet it remains locked away in expensive enterprise software designed primarily for large law firms. MyCaseValue fixes this by making outcome data—win rates, settlement ranges, timelines, and recovery patterns—searchable, understandable, and free for everyone evaluating their legal options.
'           </p>
'           <p className="section-text">
'             Unlike traditional legal databases that estimate outcomes or bury data behind paywalls, we publish everything directly from verified federal court records. We are not a law firm. We do not provide legal advice. We are a transparent data platform operating with the highest standards around privacy, accuracy, and accessibility.
'           </p>
'         </div>

'         {/* Data Sources Section */}
'         <div className="section">
'           <h2 className="section-heading">Our Data Sources</h2>
'           <p className="section-text">
'             All data comes directly from official federal court records spanning 55+ years. Unlike proprietary platforms that estimate outcomes or apply black-box algorithms, we publish every statistic from verified, auditable public sources. We do not create, estimate, or filter data—we aggregate and analyze what federal courts have already recorded.
'           </p>
'           <div className="data-sources-grid">
'             <div className="source-card">
'               <h3 className="source-title">Federal Judicial Center (FJC IDB)</h3>
'               <p className="source-description">
'                 The U.S. government's official source for federal civil case statistics since 1970. 55+ years of comprehensive data on case type, disposition, duration, and outcomes across all 95 federal districts.
'               </p>
'             </div>
'             <div className="source-card">
'               <h3 className="source-title">CourtListener / RECAP</h3>
'               <p className="source-description">
'                 Public database of federal judicial opinions, oral arguments, and real-time docket data. Provides supplementary information on case outcomes, judicial reasoning, and attorney performance data.
'               </p>
'             </div>
'             <div className="source-card">
'               <h3 className="source-title">PACER</h3>
'               <p className="source-description">
'                 Public Access to Court Electronic Records—the Federal Judiciary's official electronic system for all federal court filings, dockets, and official records. The definitive source for live case data.
'               </p>
'             </div>
'           </div>
'         </div>

'         {/* Who We Serve Section */}
'         <div className="section">
'           <h2 className="section-heading">Who We Serve</h2>
'           <p className="section-text">
'             MyCaseValue serves six core audiences in the legal ecosystem:
'           </p>
'           <div className="audience-grid">
'             {audiences.map((audience, idx) => (
'               <div key={idx} className="audience-card">
'                 <h3 className="audience-title">{audience.title}</h3>
'                 <p className="audience-description">{audience.description}</p>
'               </div>
'             ))}
'           </div>
'         </div>

'         {/* About the Company Section */}
'         <div className="section">
'           <h2 className="section-heading">About the Company</h2>
'           <div className="company-info">
'             <p className="company-text">
'               <strong>MyCaseValue LLC</strong> is registered in West Virginia, United States. We are a team of legal researchers, data engineers, and technologists built around a simple principle: federal court data is public property, and it should be accessible—not gatekept by expensive software vendors or limited to those who can afford legal consultants.
'             </p>
'             <p className="company-text">
'               We operate with four core commitments: <strong>accuracy</strong> (all data from official public records with documented methodology and rigorous quality checks), <strong>transparency</strong> (our data sources and processing are fully documented and open to scrutiny), <strong>privacy</strong> (we never sell, share, or track individual research behavior), and <strong>accessibility</strong> (free access during beta, with simple plain-English interfaces for everyone).
'             </p>
'             <Link href="/contact" className="contact-link">
'               Get in Touch
'             </Link>
'           </div>
'         </div>
'       </div>
'     </div>
'   </div>
' );
}
