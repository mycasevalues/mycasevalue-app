import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — MyCaseValue',
  description: 'MyCaseValue Terms of Service. Read our service agreement, disclaimers, and user responsibilities.',
  alternates: { canonical: 'https://www.mycasevalues.com/terms' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service — MyCaseValue',
    description: 'Read MyCaseValue Terms of Service, including our service agreement and user responsibilities.',
    url: 'https://www.mycasevalues.com/terms',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
        { '@type': 'ListItem', position: 2, name: 'Terms', item: 'https://www.mycasevalues.com/terms' },
      ],
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <style>{`
        .legal-toc {
          position: sticky;
          top: 130px;
          width: 240px;
          flex-shrink: 0;
          max-height: calc(100vh - 160px);
          overflow-y: auto;
        }

        .legal-toc-link {
          display: block;
          padding: 10px 0;
          font-size: 14px;
          color: #455A64;
          text-decoration: none;
          border-left: 2px solid transparent;
          padding-left: 16px;
          transition: all 0.2s ease;
          line-height: 1.5;
        }

        .legal-toc-link:hover {
          color: #006997;
          border-left-color: #006997;
        }

        .legal-toc-link.active {
          color: #006997;
          border-left-color: #006997;
          font-weight: 600;
        }

        .breadcrumb-home-link {
          color: #CCCCCC;
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-home-link:hover {
          color: #FFFFFF;
        }

        .legal-section-heading {
          font-size: 20px;
          font-weight: 600;
          color: #212529;
          margin-bottom: 16px;
          margin-top: 48px;
          padding-bottom: 16px;
          border-bottom: 1px solid #D5D8DC;
        }

        .legal-section-heading:first-of-type {
          margin-top: 0;
        }

        .legal-body {
          font-size: 15px;
          color: #455A64;
          line-height: 1.7;
          font-weight: 300;
        }

        .legal-contact-email {
          color: #006997;
          text-decoration: none;
        }

        .legal-contact-email:hover {
          text-decoration: underline;
        }

        @media (max-width: 767px) {
          .legal-layout {
            flex-direction: column;
          }

          .legal-toc {
            position: relative;
            top: 0;
            width: 100%;
            max-height: none;
            margin-bottom: 32px;
            overflow-x: auto;
            display: flex;
            gap: 8px;
          }

          .legal-toc-link {
            padding: 8px 16px;
            border-left: none;
            border-bottom: 2px solid transparent;
            white-space: nowrap;
          }

          .legal-toc-link:hover,
          .legal-toc-link.active {
            border-left: none;
            border-bottom-color: #006997;
          }

          .legal-content {
            max-width: 100% !important;
          }
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{ borderColor: '#D5D8DC', background: '#00172E' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '48px', paddingBottom: '48px' }}>
          {/* Breadcrumb Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '11px', color: '#CCCCCC' }}>
            <a href="/" className="breadcrumb-home-link">Home</a>
            <span>/</span>
            <span style={{ color: '#FFFFFF' }}>Terms of Service</span>
          </nav>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '6px',
            paddingBottom: '6px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            background: '#FFF3F4',
            color: '#E8171F'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5">
              <path d="M7 7h10v10H7z M7 7v3 M7 10h10 M7 13h10 M7 16h10 M17 7v10" />
            </svg>
            TERMS
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'white',
            letterSpacing: '-1.5px',
            fontFamily: 'var(--font-display)'
          }}>
            Terms of Service
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            maxWidth: '500px',
            color: 'rgba(255,255,255,0.7)',
            margin: 0
          }}>
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '48px',
        paddingBottom: '48px',
        display: 'flex',
        gap: '48px'
      }} className="legal-layout">

        {/* Table of Contents */}
        <nav className="legal-toc">
          <div style={{ marginBottom: '8px' }}>
            <a href="#acceptance" className="legal-toc-link">1. Acceptance of Terms</a>
            <a href="#description" className="legal-toc-link">2. Description of Service</a>
            <a href="#not-legal-advice" className="legal-toc-link">3. NOT Legal Advice</a>
            <a href="#limitations" className="legal-toc-link">4. Limitations of Liability</a>
            <a href="#data-accuracy" className="legal-toc-link">5. Data Accuracy</a>
            <a href="#user-responsibilities" className="legal-toc-link">6. User Responsibilities</a>
            <a href="#intellectual-property" className="legal-toc-link">7. Intellectual Property</a>
            <a href="#payment-refunds" className="legal-toc-link">8. Payment & Refunds</a>
            <a href="#termination" className="legal-toc-link">9. Termination of Use</a>
            <a href="#third-party" className="legal-toc-link">10. Third-Party Links</a>
            <a href="#indemnification" className="legal-toc-link">11. Indemnification</a>
            <a href="#governing-law" className="legal-toc-link">12. Governing Law</a>
            <a href="#privacy" className="legal-toc-link">13. Privacy</a>
            <a href="#contact" className="legal-toc-link">14. Contact Us</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="legal-content" style={{ maxWidth: '768px', flex: 1 }}>
          {/* Important Notice */}
          <div style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #D97706',
            background: '#FFF3F4',
            color: '#212529',
            marginBottom: '32px'
          }}>
            <p style={{ margin: 0, fontWeight: '600', color: '#E8171F', fontSize: '15px', lineHeight: 1.7 }}>
              IMPORTANT: By using MyCaseValue, you agree that this Service provides informational data only and is NOT legal advice.
              MyCaseValue does not create an attorney-client relationship. Always consult a licensed attorney for legal matters.
            </p>
          </div>

          <section id="acceptance">
            <h2 className="legal-section-heading">1. Acceptance of Terms</h2>
            <p className="legal-body">
              These Terms of Service ("Terms") govern your access to and use of MyCaseValue (the "Service").
              By accessing, browsing, or using MyCaseValue, you accept and agree to be bound by these Terms.
              If you do not agree, do not use the Service.
            </p>
            <p className="legal-body">
              We may modify these Terms at any time. Changes are effective immediately upon posting.
              Your continued use constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section id="description">
            <h2 className="legal-section-heading">2. Description of Service</h2>
            <p className="legal-body">
              MyCaseValue is a research tool that aggregates and displays historical outcome data from 5.1M+ federal civil court cases.
              The Service provides aggregate statistics on case outcomes, win rates, settlement percentages, timelines, and recovery ranges
              by case type, circuit, and jurisdiction.
            </p>
            <p className="legal-body">
              The Service is provided "as-is" for informational and research purposes only. It is not a legal service, does not provide legal advice,
              and does not replace consultation with a licensed attorney.
            </p>
          </section>

          <section id="not-legal-advice">
            <h2 className="legal-section-heading">3. NOT Legal Advice — Disclaimer</h2>
            <p className="legal-body">
              <strong>MyCaseValue is not a law firm. We do not provide legal advice, legal opinions, or legal analysis of individual cases.</strong>
            </p>
            <p className="legal-body">
              Specifically:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>No attorney-client relationship is created by using MyCaseValue</li>
              <li style={{ marginBottom: '8px' }}>Aggregate data cannot evaluate your specific case</li>
              <li style={{ marginBottom: '8px' }}>Historical outcomes do not predict your case outcome</li>
              <li style={{ marginBottom: '8px' }}>We do not evaluate case strength, liability, or damages</li>
              <li style={{ marginBottom: '8px' }}>Past win rates do not guarantee future results</li>
              <li>Settlement ranges are historical averages, not valuations</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>You are solely responsible for consulting with a licensed attorney before taking legal action.</strong>
            </p>
          </section>

          <section id="limitations">
            <h2 className="legal-section-heading">4. Limitations of Liability</h2>
            <p className="legal-body">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>MyCaseValue is provided "AS-IS" without warranties of any kind</li>
              <li style={{ marginBottom: '8px' }}>We disclaim all implied warranties (merchantability, fitness for purpose)</li>
              <li style={{ marginBottom: '8px' }}>We are not liable for errors, omissions, or inaccuracies in data</li>
              <li style={{ marginBottom: '8px' }}>We are not liable for decisions made based on our data</li>
              <li style={{ marginBottom: '8px' }}>In no event shall MyCaseValue be liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount you paid us (if any)</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              You use MyCaseValue entirely at your own risk.
            </p>
          </section>

          <section id="data-accuracy">
            <h2 className="legal-section-heading">5. Data Accuracy & Disclaimers</h2>
            <p className="legal-body">
              MyCaseValue aggregates data from official federal court records. While we employ quality checks, we do not guarantee:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>100% accuracy of historical data or statistical calculations</li>
              <li style={{ marginBottom: '8px' }}>That outcome coding captures all nuances (e.g., partial victories, consent decrees)</li>
              <li style={{ marginBottom: '8px' }}>That settlement amounts are systematically reported (most are confidential)</li>
              <li style={{ marginBottom: '8px' }}>That future cases will follow historical patterns</li>
              <li>That data is free from errors, gaps, or anomalies</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              Always verify critical information independently and consult a licensed attorney.
            </p>
          </section>

          <section id="user-responsibilities">
            <h2 className="legal-section-heading">6. User Responsibilities</h2>
            <p className="legal-body">
              By using MyCaseValue, you agree to:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>Use the Service only for lawful purposes</li>
              <li style={{ marginBottom: '8px' }}>Not engage in harassment, abuse, or illegal activity</li>
              <li style={{ marginBottom: '8px' }}>Not attempt to disrupt or hack the Service</li>
              <li style={{ marginBottom: '8px' }}>Not scrape or bulk-download data without permission</li>
              <li style={{ marginBottom: '8px' }}>Not reverse-engineer or copy our software</li>
              <li style={{ marginBottom: '8px' }}>Not use the Service for automated data collection</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section id="intellectual-property">
            <h2 className="legal-section-heading">7. Intellectual Property</h2>
            <p className="legal-body">
              MyCaseValue's aggregation, categorization, presentation, and analytical methods are protected by copyright.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              The underlying federal court data is public domain under 17 U.S.C. § 105. You may use, cite, and reference this data,
              but you must attribute MyCaseValue when using our aggregations or statistics.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              You may not:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>Copy, reproduce, or distribute MyCaseValue's presentation or analysis</li>
              <li style={{ marginBottom: '8px' }}>Create competing products based on our methodology</li>
              <li>Claim ownership of our data or analysis</li>
            </ul>
          </section>

          <section id="payment-refunds">
            <h2 className="legal-section-heading">8. Payment & Refunds</h2>
            <p className="legal-body">
              MyCaseValue offers free basic reports and premium paid reports.
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Single Report:</strong> $5.99 (one-time)</li>
              <li style={{ marginBottom: '8px' }}><strong>Unlimited Reports:</strong> $9.99 (one-time)</li>
              <li><strong>Attorney Mode:</strong> $29.99/month (recurring)</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Refund Policy:</strong> Reports are delivered immediately upon purchase and are non-refundable unless there is a technical error.
              Subscription cancellations take effect at the end of the current billing period.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              Payments are processed securely via Stripe. We do not store full credit card information.
            </p>
          </section>

          <section id="termination">
            <h2 className="legal-section-heading">9. Termination of Use</h2>
            <p className="legal-body">
              We may suspend or terminate your access to MyCaseValue at any time, with or without cause, if you:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>Violate these Terms or applicable laws</li>
              <li style={{ marginBottom: '8px' }}>Engage in abusive or disruptive behavior</li>
              <li style={{ marginBottom: '8px' }}>Attempt to hack or disrupt the Service</li>
              <li>Violate intellectual property rights</li>
            </ul>
          </section>

          <section id="third-party">
            <h2 className="legal-section-heading">10. Third-Party Links & Services</h2>
            <p className="legal-body">
              MyCaseValue may contain links to third-party websites (PACER, CourtListener, Federal Judicial Center, etc.).
              We are not responsible for the content, accuracy, or practices of third-party sites.
              Your use of third-party sites is governed by their own terms and privacy policies.
            </p>
          </section>

          <section id="indemnification">
            <h2 className="legal-section-heading">11. Indemnification</h2>
            <p className="legal-body">
              You agree to indemnify and hold harmless MyCaseValue, its owners, employees, and service providers from any claims,
              damages, or costs arising from your use of the Service, violation of these Terms, or infringement of rights.
            </p>
          </section>

          <section id="governing-law">
            <h2 className="legal-section-heading">12. Governing Law & Dispute Resolution</h2>
            <p className="legal-body">
              These Terms are governed by the laws of the United States without regard to conflict of law principles.
              Any disputes shall be subject to exclusive jurisdiction of the federal and state courts located in the United States.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              Before litigation, we encourage good-faith negotiation. Contact us at <a href="mailto:support@mycasevalue.com" className="legal-contact-email">support@mycasevalue.com</a> to resolve disputes.
            </p>
          </section>

          <section id="privacy">
            <h2 className="legal-section-heading">13. Privacy</h2>
            <p className="legal-body">
              Your use of MyCaseValue is also governed by our <a href="https://mycasevalues.com/privacy" className="legal-contact-email">Privacy Policy</a>.
              Please review it to understand our data practices.
            </p>
          </section>

          <section id="contact">
            <h2 className="legal-section-heading">14. Contact Us</h2>
            <p className="legal-body">
              For questions about these Terms, contact us:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#212529',
              border: '1px solid #D5D8DC'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Email:</strong> <a href="mailto:support@mycasevalue.com" className="legal-contact-email">support@mycasevalue.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Website:</strong> <a href="https://mycasevalues.com" className="legal-contact-email">https://mycasevalues.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div style={{ borderTop: '1px solid #D5D8DC', paddingTop: '24px', paddingBottom: '24px', textAlign: 'center' }}>
        <p style={{
          fontSize: '11px',
          maxWidth: '400px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          color: '#455A64'
        }}>
          © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
