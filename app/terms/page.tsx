import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MyCaseValue Terms of Service. Read our service agreement, disclaimers, and user responsibilities.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'Read MyCaseValue Terms of Service, including our service agreement and user responsibilities.',
    url: `${SITE_URL}/terms`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service',
    description: 'Read MyCaseValue Terms of Service, including our service agreement and user responsibilities.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Terms', item: `${SITE_URL}/terms` },
      ],
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
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
          color: var(--color-text-secondary);
          text-decoration: none;
          border-left: 2px solid transparent;
          padding-left: 16px;
          transition: all 0.2s ease;
          line-height: 1.5;
        }

        .legal-toc-link:hover {
          color: #1e40af;
          border-left-color: #1e40af;
        }

        .legal-toc-link.active {
          color: #1e40af;
          border-left-color: #1e40af;
          font-weight: 600;
        }

        .breadcrumb-home-link {
          color: #CCCCCC;
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-home-link:hover {
          color: var(--color-surface-0);
        }

        .legal-section-heading {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 16px;
          margin-top: 48px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-default);
        }

        .legal-section-heading:first-of-type {
          margin-top: 0;
        }

        .legal-body {
          font-size: 15px;
          color: var(--color-text-secondary);
          line-height: 1.7;
          font-weight: 300;
        }

        .legal-contact-email {
          color: #1e40af;
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
            border-bottom-color: #1e40af;
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
      <div style={{ borderColor: 'var(--border-default)', background: 'var(--accent-primary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '48px', paddingBottom: '48px' }}>
          {/* Breadcrumb Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '11px', color: '#CCCCCC' }}>
            <a href="/" className="breadcrumb-home-link">Home</a>
            <span>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>Terms of Service</span>
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
            background: 'rgba(239,68,68,0.08)',
            color: 'var(--accent-primary)'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5">
              <path d="M7 7h10v10H7z M7 7v3 M7 10h10 M7 13h10 M7 16h10 M17 7v10" />
            </svg>
            TERMS
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
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
            Last updated: April 2026
          </p>
          <p style={{
            fontSize: '13px',
            lineHeight: '1.5',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '8px'
          }}>
            This page is print-friendly. Use your browser's print function (Ctrl+P / Cmd+P) for a formatted PDF.
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
            <a href="#governing-law" className="legal-toc-link">12. Governing Law & Arbitration</a>
            <a href="#privacy" className="legal-toc-link">13. Privacy</a>
            <a href="#contact" className="legal-toc-link">14. Contact Us</a>
            <a href="#related-legal" className="legal-toc-link">Related Legal Pages</a>
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
            borderRadius: '12px',
            borderLeft: '4px solid #D97706',
            background: 'rgba(239,68,68,0.08)',
            color: 'var(--color-text-primary)',
            marginBottom: '32px'
          }}>
            <p style={{ margin: 0, fontWeight: '600', color: 'var(--accent-primary)', fontSize: '15px', lineHeight: 1.7 }}>
              IMPORTANT: By using MyCaseValue, you agree that this Service provides informational data only and is NOT legal advice.
              MyCaseValue does not create an attorney-client relationship. Always consult a licensed attorney for legal matters.
            </p>
          </div>

          <section id="acceptance">
            <h2 className="legal-section-heading">1. Acceptance of Terms</h2>
            <p className="legal-body">
              These Terms of Service ("Terms," "Agreement") govern your access to and use of MyCaseValue, including our website at https://mycasevalues.com, mobile applications, APIs, and all related services (collectively, the "Service").
              By accessing, browsing, using, or registering for an account on MyCaseValue, you acknowledge that you have read, understand, and agree to be bound by these Terms in their entirety.
            </p>
            <p className="legal-body">
              If you do not agree to these Terms or any part thereof, you must immediately cease use of the Service and contact us at <a href="mailto:support@mycasevalues.com" className="legal-contact-email">support@mycasevalues.com</a> if you have questions.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Modifications to Terms</h4>
              <p className="legal-body">
                We may modify these Terms at any time, in our sole discretion, including but not limited to changes to Service features, pricing, or policies. All modifications are effective immediately upon posting to this page. Your continued use of MyCaseValue after any modification constitutes your acceptance of the updated Terms. We encourage you to review this page periodically for changes. If you do not accept any modification, your exclusive remedy is to cease using the Service.
              </p>
            </div>
          </section>

          <section id="description">
            <h2 className="legal-section-heading">2. Description of Service</h2>
            <p className="legal-body">
              MyCaseValue is a federal court data analytics and research tool that aggregates, categorizes, and displays historical outcome data from millions of federal civil court cases spanning multiple decades.
              The Service provides aggregate statistics on case outcomes, win/loss rates, settlement percentages, case timelines, recovery ranges, judge analytics, and trends analyzed by case type, federal circuit, judicial district, judge, and other filters.
            </p>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Data sources:</strong> We aggregate publicly available federal court data from the Federal Judicial Center Integrated Database (FJC IDB), Public Access to Court Electronic Records (PACER), CourtListener, and other official federal court databases. The underlying court data is in the public domain.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Service Scope and Limitations</h4>
              <p className="legal-body">
                The Service is provided "AS-IS" for informational, research, and due diligence purposes only. It is NOT:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>A legal service, legal advice, or legal counsel of any kind</li>
                <li style={{ marginBottom: '8px' }}>A substitute for consultation with a qualified, licensed attorney</li>
                <li style={{ marginBottom: '8px' }}>Predictive of any individual case outcome</li>
                <li style={{ marginBottom: '8px' }}>An endorsement of any specific attorney, firm, or legal strategy</li>
                <li>A comprehensive source of all federal court data (data is aggregated from public records)</li>
              </ul>
            </div>
          </section>

          <section id="not-legal-advice">
            <h2 className="legal-section-heading">3. NOT Legal Advice — Critical Disclaimer</h2>
            <p className="legal-body">
              <strong>IMPORTANT: MyCaseValue is not a law firm, and nothing on this Service constitutes legal advice, legal counsel, a legal opinion, or legal analysis of any kind.</strong> We do not provide legal advice to any person or entity under any circumstances.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>No Attorney-Client Relationship</h4>
              <p className="legal-body">
                Use of MyCaseValue does not create, establish, or imply an attorney-client relationship, professional relationship, or duty of care between you and MyCaseValue, any of its employees, operators, or affiliates. We are not your lawyer and cannot provide legal advice specific to your situation.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>What MyCaseValue Data Does NOT Do:</h4>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}><strong>Predict case outcomes:</strong> Aggregate historical win rates do not predict what will happen in your specific case. Every case is unique with different facts, law, judge, and representation.</li>
                <li style={{ marginBottom: '8px' }}><strong>Evaluate your case:</strong> We cannot assess the strength, merit, likelihood of success, or settlement value of your specific case.</li>
                <li style={{ marginBottom: '8px' }}><strong>Provide valuations:</strong> Settlement ranges shown are historical averages from past cases, not valuations of your claim. They are not reliable predictors of what your case might settle for.</li>
                <li style={{ marginBottom: '8px' }}><strong>Advise on strategy:</strong> We do not recommend litigation strategies, settlement decisions, or legal approaches.</li>
                <li style={{ marginBottom: '8px' }}><strong>Guarantee results:</strong> Past win rates, settlement ranges, or trial outcomes do not guarantee any particular result for your case.</li>
                <li><strong>Replace attorney consultation:</strong> You must consult with a licensed attorney before taking any legal action, making settlement decisions, or relying on any information from this Service.</li>
              </ul>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>You are solely and exclusively responsible for obtaining independent legal advice from a qualified, licensed attorney in your jurisdiction before taking any legal action or making any decisions based on information from MyCaseValue.</strong>
            </p>
          </section>

          <section id="limitations">
            <h2 className="legal-section-heading">4. Limitations of Liability and Disclaimers</h2>
            <p className="legal-body">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</strong>
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Disclaimer of Warranties</h4>
              <p className="legal-body">
                MyCaseValue is provided on an "AS-IS" and "AS-AVAILABLE" basis. We disclaim all warranties, express, implied, statutory, or otherwise, including but not limited to:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li style={{ marginBottom: '8px' }}>Warranties regarding accuracy, completeness, timeliness, or reliability of data</li>
                <li style={{ marginBottom: '8px' }}>Warranties that the Service will be uninterrupted, error-free, or secure</li>
                <li style={{ marginBottom: '8px' }}>Warranties that any defects or errors will be corrected</li>
              </ul>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Limitation of Liability</h4>
              <p className="legal-body">
                <strong>In no event shall MyCaseValue be liable for:</strong>
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Any errors, omissions, inaccuracies, or gaps in data or analysis</li>
                <li style={{ marginBottom: '8px' }}>Any decisions you make or actions you take based on information from the Service</li>
                <li style={{ marginBottom: '8px' }}>Any losses, damages, or costs resulting from reliance on our data or statistics</li>
                <li style={{ marginBottom: '8px' }}>Indirect, incidental, consequential, special, or punitive damages</li>
                <li style={{ marginBottom: '8px' }}>Lost profits, lost revenue, lost data, or business interruption</li>
              </ul>
              <p className="legal-body" style={{ marginTop: '12px' }}>
                <strong>Cap on liability:</strong> To the extent permitted by law, MyCaseValue's total liability for any claim arising out of or relating to these Terms, the Service, or your use thereof shall not exceed the lesser of: (i) the amount you paid MyCaseValue in the 12 months preceding the claim, or (ii) $100 USD. This limitation applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise).
              </p>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>You acknowledge and accept that you use MyCaseValue entirely at your own risk.</strong> If you are dissatisfied with the Service or these Terms, your exclusive remedy is to cease using the Service.
            </p>
          </section>

          <section id="data-accuracy">
            <h2 className="legal-section-heading">5. Data Accuracy & Disclaimers</h2>
            <p className="legal-body">
              MyCaseValue aggregates data from official federal court records. While we employ quality checks, we do not guarantee:
            </p>
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
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
            <h2 className="legal-section-heading">6. Acceptable Use and User Responsibilities</h2>
            <p className="legal-body">
              By using MyCaseValue, you agree to comply with all applicable laws and these Terms. You are responsible for your use of the Service. You specifically agree to:
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Permitted Uses</h4>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Use the Service only for lawful, legitimate research, due diligence, and informational purposes</li>
                <li style={{ marginBottom: '8px' }}>Use the Service in compliance with all applicable federal, state, and local laws</li>
                <li style={{ marginBottom: '8px' }}>Respect the intellectual property rights of MyCaseValue and third parties</li>
                <li>Report any security vulnerabilities to us at <a href="mailto:security@mycasevalues.com" className="legal-contact-email">security@mycasevalues.com</a></li>
              </ul>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Prohibited Activities</h4>
              <p className="legal-body">
                You agree NOT to:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Engage in any illegal activity or violate any laws or regulations</li>
                <li style={{ marginBottom: '8px' }}>Harass, abuse, defame, threaten, or intimidate other users or MyCaseValue personnel</li>
                <li style={{ marginBottom: '8px' }}>Disrupt, overload, or attack the Service or MyCaseValue's infrastructure</li>
                <li style={{ marginBottom: '8px' }}>Attempt to hack, reverse-engineer, or gain unauthorized access to the Service or systems</li>
                <li style={{ marginBottom: '8px' }}>Scrape, bulk-download, systematically extract, or make unauthorized copies of data without written permission</li>
                <li style={{ marginBottom: '8px' }}>Automate data collection beyond what is needed for your individual use</li>
                <li style={{ marginBottom: '8px' }}>Create derivative products or competing services based on MyCaseValue data or methodology</li>
                <li style={{ marginBottom: '8px' }}>Distribute, sell, or redistribute MyCaseValue data or reports</li>
                <li style={{ marginBottom: '8px' }}>Use the Service to provide legal advice or represent yourself as providing such</li>
              </ul>
            </div>
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
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
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
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Single Report:</strong> $5.99 (one-time)</li>
              <li style={{ marginBottom: '8px' }}><strong>Unlimited Reports:</strong> $9.99/month (recurring)</li>
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
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
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

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Governing Law</h4>
              <p className="legal-body">
                These Terms and any dispute arising out of or related to these Terms or the Service shall be governed by and construed in accordance with the laws of the State of West Virginia, without regard to its conflict of law provisions.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Binding Arbitration</h4>
              <p className="legal-body">
                Any dispute, claim, or controversy arising out of or relating to these Terms, the Service, or your use thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by binding arbitration administered in the State of West Virginia. The arbitration shall be conducted by a single arbitrator in accordance with the rules of the American Arbitration Association (AAA) then in effect. The arbitrator&apos;s decision shall be final and binding, and judgment on the award rendered by the arbitrator may be entered in any court having jurisdiction thereof.
              </p>
              <p className="legal-body" style={{ marginTop: '12px' }}>
                You agree that any arbitration under these Terms will take place on an individual basis; class arbitrations and class actions are not permitted, and you are agreeing to give up the ability to participate in a class action.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Forum and Venue</h4>
              <p className="legal-body">
                To the extent that any dispute is not subject to arbitration as described above, or if a court of competent jurisdiction determines that the arbitration provision is unenforceable, you agree that any such dispute shall be brought exclusively in the state or federal courts located in the State of West Virginia. You consent to the personal jurisdiction of and venue in such courts and waive any objection as to inconvenient forum.
              </p>
            </div>

            {/* TODO: Have legal counsel review this arbitration/forum clause before final publication. */}
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(234,179,8,0.08)',
              borderLeft: '3px solid #D97706',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}>
              <strong>Notice:</strong> This section contains a binding arbitration clause and class action waiver. Please read it carefully, as it affects your legal rights regarding disputes with MyCaseValue.
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              Before initiating arbitration or litigation, we encourage good-faith negotiation. Contact us at <a href="mailto:support@mycasevalues.com" className="legal-contact-email">support@mycasevalues.com</a> to resolve disputes informally.
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
              If you have questions about these Terms of Service, dispute resolution matters, or other inquiries, please contact us:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '12px',
              background: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-default)'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>General Support:</strong> <a href="mailto:support@mycasevalues.com" className="legal-contact-email">support@mycasevalues.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Legal Inquiries:</strong> <a href="mailto:legal@mycasevalues.com" className="legal-contact-email">legal@mycasevalues.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Website:</strong> <a href="https://mycasevalues.com" className="legal-contact-email">https://mycasevalues.com</a>
              </p>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              We will acknowledge your inquiry within 24 hours and provide a substantive response within 30 days, unless otherwise required by law.
            </p>
          </section>

          <section id="related-legal">
            <h2 className="legal-section-heading">Related Legal Pages</h2>
            <p className="legal-body">
              These Terms are part of MyCaseValue's complete legal framework. We recommend reviewing our other legal documents to fully understand your rights and responsibilities:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '12px',
              background: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-default)'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Privacy Policy:</strong> Review our <a href="/privacy" className="legal-contact-email">Privacy Policy</a> to understand how we collect, use, and protect your data.
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Disclaimer:</strong> Read our <a href="/disclaimer" className="legal-contact-email">Disclaimer</a> for important information about the limitations and proper use of MyCaseValue data.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '24px', paddingBottom: '24px', textAlign: 'center' }}>
        <p style={{
          fontSize: '11px',
          maxWidth: '400px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          color: 'var(--color-text-secondary)'
        }}>
          © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
