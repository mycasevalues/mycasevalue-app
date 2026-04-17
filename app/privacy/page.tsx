import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MyCaseValue privacy policy. Learn how we collect, use, and protect your data when researching federal court outcomes.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Learn how MyCaseValue collects, uses, and protects your data.',
    url: `${SITE_URL}/privacy`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy',
    description: 'Learn how MyCaseValue collects, uses, and protects your data.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Privacy', item: `${SITE_URL}/privacy` },
      ],
    },
  ],
};

export default function PrivacyPage() {
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
          color: var(--link-hover, #083D7A);
          border-left-color: var(--link-hover, #083D7A);
        }

        .legal-toc-link.active {
          color: var(--link-hover, #083D7A);
          border-left-color: var(--link-hover, #083D7A);
          font-weight: 600;
        }

        .breadcrumb-home-link {
          color: var(--bdr, #E2DFD8);
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
          color: var(--link-hover, #083D7A);
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
            border-bottom-color: var(--link-hover, #083D7A);
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
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '11px', color: 'var(--bdr, #E2DFD8)' }}>
            <a href="/" className="breadcrumb-home-link">Home</a>
            <span>/</span>
            <span style={{ color: 'var(--color-surface-0)' }}>Privacy Policy</span>
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            PRIVACY
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'white',
            letterSpacing: '-1.5px',
            fontFamily: 'var(--font-ui)'
          }}>
            Privacy Policy
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
            <a href="#introduction" className="legal-toc-link">1. Introduction</a>
            <a href="#information-collect" className="legal-toc-link">2. Information We Collect</a>
            <a href="#cookies-tracking" className="legal-toc-link">3. Cookies and Tracking</a>
            <a href="#how-use-information" className="legal-toc-link">4. How We Use Your Information</a>
            <a href="#third-parties" className="legal-toc-link">5. Third Parties and Data Sharing</a>
            <a href="#data-retention" className="legal-toc-link">6. Data Retention</a>
            <a href="#rights-choices" className="legal-toc-link">7. Your Rights and Choices</a>
            <a href="#security" className="legal-toc-link">8. Security</a>
            <a href="#children-privacy" className="legal-toc-link">9. Children's Privacy</a>
            <a href="#international-users" className="legal-toc-link">10. International Users</a>
            <a href="#updates" className="legal-toc-link">11. Updates to This Policy</a>
            <a href="#contact" className="legal-toc-link">12. Contact Us</a>
            <a href="#related-legal" className="legal-toc-link">Related Legal Pages</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="legal-content" style={{ maxWidth: '768px', flex: 1 }}>
          <section id="introduction">
            <h2 className="legal-section-heading">1. Introduction</h2>
            <p className="legal-body">
              MyCaseValue ("we," "us," "our," or the "Company") operates the website https://mycasevalues.com, related mobile applications, and associated tools (collectively, the "Service").
              This Privacy Policy ("Policy") explains how we collect, use, disclose, and otherwise handle your information when you use our Service, including the types of information we gather, how we use it, and your rights regarding that information.
            </p>
            <p className="legal-body">
              We are committed to protecting your privacy and maintaining transparency about our data practices. We collect minimal personal information necessary to provide our Service and comply with applicable laws. We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>
            <p className="legal-body">
              This Policy applies to all visitors and users of MyCaseValue, regardless of how you access the Service. By using MyCaseValue, you consent to our privacy practices described in this Policy.
            </p>
          </section>

          <section id="information-collect">
            <h2 className="legal-section-heading">2. Information We Collect</h2>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)', marginTop: '24px', marginBottom: '12px' }}>
                2.1 Information You Provide Directly
              </h3>
              <p className="legal-body">
                When you use MyCaseValue, you may voluntarily provide information such as:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}><strong>Account information:</strong> Name, email address, and professional affiliation if you create an account or subscribe to services</li>
                <li style={{ marginBottom: '8px' }}><strong>Search and usage data:</strong> Case type searches, jurisdictional filters, research queries, report requests, and features you access</li>
                <li style={{ marginBottom: '8px' }}><strong>Payment information:</strong> Processed securely through Stripe (PCI-DSS compliant); we do not store full credit card numbers or sensitive payment card data</li>
                <li style={{ marginBottom: '8px' }}><strong>Communication data:</strong> Messages, emails, feedback, and inquiries sent to our support team</li>
                <li style={{ marginBottom: '8px' }}><strong>Voluntary submissions:</strong> Any information you choose to provide in surveys, feedback forms, or user research participation</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)', marginTop: '24px', marginBottom: '12px' }}>
                2.2 Information Collected Automatically
              </h3>
              <p className="legal-body">
                When you visit or use our Service, we automatically collect certain information about your interaction with us:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}><strong>Usage data:</strong> Pages visited, case types searched, reports generated, features used, time spent on Service, search queries, referral source, and click patterns</li>
                <li style={{ marginBottom: '8px' }}><strong>Device and browser information:</strong> Browser type and version, operating system, device type, unique device identifiers, and mobile network information</li>
                <li style={{ marginBottom: '8px' }}><strong>IP address:</strong> Used for geographic analytics, fraud detection, and security purposes; not personally identified or linked to your name without additional data</li>
                <li style={{ marginBottom: '8px' }}><strong>Cookies and tracking:</strong> Session cookies, authentication tokens, and analytics tracking (see Section 3 for details)</li>
                <li style={{ marginBottom: '8px' }}><strong>Federal court data sourcing:</strong> We track which PACER/FJC databases are accessed to maintain data quality; individual query data is not stored after processing</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text-primary)', marginTop: '24px', marginBottom: '12px' }}>
                2.3 Information We Do NOT Collect or Store
              </h3>
              <p className="legal-body">
                We are committed to minimizing data collection. We deliberately do not collect or store:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Full credit card numbers or payment card data (all payments processed securely by Stripe; PCI-DSS compliant)</li>
                <li style={{ marginBottom: '8px' }}>Social Security numbers, government IDs, passport numbers, or other sensitive identification</li>
                <li style={{ marginBottom: '8px' }}>Precise geolocation data (we collect IP address for analytics only; geo-targeting is approximate by region)</li>
                <li style={{ marginBottom: '8px' }}>Biometric data, genetic information, or health information</li>
                <li style={{ marginBottom: '8px' }}>Your personal legal case details, client matter information, or attorney-client privileged communications</li>
                <li style={{ marginBottom: '8px' }}>Browsing history of other websites</li>
                <li style={{ marginBottom: '8px' }}>Video or audio recordings without your explicit consent</li>
              </ul>
            </div>
          </section>

          <section id="cookies-tracking">
            <h2 className="legal-section-heading">3. Cookies and Tracking Technologies</h2>
            <p className="legal-body">
              MyCaseValue uses cookies and similar tracking technologies to provide, secure, and improve our Service. Cookies are small files stored on your device that help us recognize you and store information about your preferences and activity.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Types of Cookies We Use:</h4>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}><strong>Essential/Functional Cookies:</strong> Necessary for site functionality, session management, authentication, security, and fraud prevention. These are required for the Service to function properly.</li>
                <li style={{ marginBottom: '8px' }}><strong>Analytics Cookies:</strong> Collect aggregated data about how you use our Service (pages visited, features used, time on site) to understand user behavior and improve user experience. We use this data to identify trends and optimize content.</li>
                <li style={{ marginBottom: '8px' }}><strong>Preference Cookies:</strong> Remember your settings, preferences, and choices (e.g., display preferences, accessibility settings) across visits.</li>
                <li><strong>Performance Cookies:</strong> Monitor Service performance, load times, and technical stability.</li>
              </ul>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Cookie Management:</strong> Most browsers allow you to control cookies through browser settings. You can set your browser to reject all cookies, notify you when a cookie is sent, or delete cookies. However, disabling essential cookies may limit Service functionality and prevent you from using certain features.
            </p>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              We do not use cookies to track you across other websites or create cross-site user profiles. We only use cookies within the MyCaseValue domain for the purposes described above.
            </p>
          </section>

          <section id="how-use-information">
            <h2 className="legal-section-heading">4. How We Use Your Information</h2>
            <p className="legal-body">
              We use the information we collect for the following purposes:
            </p>
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Provide and maintain the Service:</strong> Create and manage your account, process your requests, deliver reports, and ensure Service stability and security</li>
              <li style={{ marginBottom: '8px' }}><strong>Payment processing:</strong> Process purchases, subscriptions, billing inquiries, and send transaction confirmations and invoices</li>
              <li style={{ marginBottom: '8px' }}><strong>Customer communications:</strong> Send transactional emails (account confirmations, password resets, receipts, subscription updates, support responses)</li>
              <li style={{ marginBottom: '8px' }}><strong>Service improvement:</strong> Analyze usage patterns and feature adoption to understand user behavior, identify opportunities to enhance the Service, and prioritize feature development</li>
              <li style={{ marginBottom: '8px' }}><strong>Technical support:</strong> Respond to your inquiries, troubleshoot technical issues, and provide customer service</li>
              <li style={{ marginBottom: '8px' }}><strong>Security and fraud prevention:</strong> Detect, prevent, and address fraud, abuse, security incidents, and other malicious or unintended use of the Service</li>
              <li style={{ marginBottom: '8px' }}><strong>Legal compliance:</strong> Comply with applicable laws, regulations, court orders, and legal process</li>
              <li><strong>Aggregated analytics:</strong> Create anonymized, aggregated reports on Service usage that do not identify individual users</li>
            </ul>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>What we do NOT do with your information:</strong> We do not send unsolicited promotional emails or marketing communications without your consent. We do not sell, rent, lease, or share your personal information with third parties for their marketing purposes. We do not build individual behavioral profiles for targeted advertising. We do not use your case research data or search queries for any purpose other than providing the Service and improving our analytics.
            </p>
          </section>

          <section id="third-parties">
            <h2 className="legal-section-heading">5. Third Parties and Data Sharing</h2>
            <p className="legal-body">
              We do not sell, rent, lease, or share your personal information with third parties for their marketing purposes or to build data sets for resale.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>When We Share Information:</h4>
              <p className="legal-body">
                We may share information with trusted service providers and partners who assist us in operating, maintaining, and improving our Service. All service providers are bound by confidentiality agreements and data processing agreements that limit their use of your information to providing the specific services we've contracted.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Service Providers We Work With:</h4>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}><strong>Stripe:</strong> PCI-DSS compliant payment processor; receives only payment information necessary to process transactions</li>
                <li style={{ marginBottom: '8px' }}><strong>Cloud Infrastructure Providers:</strong> AWS or other providers for data storage, hosting, and infrastructure; bound by data processing agreements</li>
                <li style={{ marginBottom: '8px' }}><strong>Analytics Services:</strong> Aggregated, anonymized usage data only; individual-level data is not shared</li>
                <li style={{ marginBottom: '8px' }}><strong>PACER/Federal Judicial Center:</strong> We access public federal court records to populate our database; data sourced is already public</li>
              </ul>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Disclosures Required by Law:</h4>
              <p className="legal-body">
                We may be required to disclose your information when:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Required by subpoena, court order, or other legal process</li>
                <li style={{ marginBottom: '8px' }}>Necessary to protect the safety, rights, or property of MyCaseValue, our users, or the public</li>
                <li style={{ marginBottom: '8px' }}>Required by law enforcement or government agencies</li>
                <li style={{ marginBottom: '8px' }}>Needed to enforce our Terms of Service or other agreements</li>
              </ul>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Business Transfer:</strong> If MyCaseValue is acquired, merged, or its assets are sold, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have regarding your information.
            </p>
          </section>

          <section id="data-retention">
            <h2 className="legal-section-heading">6. Data Retention</h2>
            <p className="legal-body">
              We retain your information for as long as necessary to provide the Service and comply with legal obligations.
            </p>
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Account data:</strong> Retained until you delete your account</li>
              <li style={{ marginBottom: '8px' }}><strong>Search history:</strong> Retained for analytics (anonymized after 90 days)</li>
              <li style={{ marginBottom: '8px' }}><strong>Payment records:</strong> Retained as required for tax/legal compliance (typically 7 years)</li>
              <li><strong>Cookies:</strong> Cleared per browser settings and cookie expiration</li>
            </ul>
          </section>

          <section id="rights-choices">
            <h2 className="legal-section-heading">7. Your Rights and Choices</h2>
            <p className="legal-body">
              You have the following rights regarding your personal information:
            </p>
            <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Access:</strong> Request what personal data we hold about you</li>
              <li style={{ marginBottom: '8px' }}><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li style={{ marginBottom: '8px' }}><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li style={{ marginBottom: '8px' }}><strong>Opt-out:</strong> Disable non-essential cookies at any time</li>
              <li><strong>Data portability:</strong> Receive your data in a portable format</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              To exercise these rights, contact us at <a href="mailto:privacy@mycasevalues.com" className="legal-contact-email">privacy@mycasevalues.com</a> with details of your request.
              We will respond within 30 days.
            </p>
          </section>

          <section id="security">
            <h2 className="legal-section-heading">8. Security</h2>
            <p className="legal-body">
              We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>However, no method of transmission over the internet is 100% secure.</strong> While we use industry-standard encryption (SSL/TLS), we cannot guarantee absolute security.
              Use a strong password, enable two-factor authentication if available, and never share your credentials.
            </p>
          </section>

          <section id="children-privacy">
            <h2 className="legal-section-heading">9. Children's Privacy</h2>
            <p className="legal-body">
              MyCaseValue is not intended for users under 13 years old. We do not knowingly collect personal information from children.
              If we become aware of data from a child under 13, we will delete it immediately.
            </p>
          </section>

          <section id="international-users">
            <h2 className="legal-section-heading">10. International Users and Data Transfers</h2>
            <p className="legal-body">
              MyCaseValue is operated from the United States and the federal court data we aggregate is from U.S. federal courts only. If you are located outside the United States, your information may be transferred to, stored in, and processed in the United States.
            </p>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Cross-border data transfers:</strong> The United States may not provide the same level of data protection as your home country. By using MyCaseValue, you expressly consent to the transfer of your information to the United States and to processing of your data according to the laws and practices of the United States, including this Privacy Policy.
            </p>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>European Union and European Economic Area Users:</h4>
              <p className="legal-body">
                If you are located in the EU/EEA, we process your personal data based on:
              </p>
              <ul style={{ paddingLeft: '24px', color: 'var(--color-text-secondary)' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Your explicit consent to our use of your information (e.g., when you create an account)</li>
                <li style={{ marginBottom: '8px' }}>Our legitimate interests in providing, maintaining, and improving the Service</li>
                <li><strong>GDPR rights:</strong> You have the right to access, rectification, erasure, data portability, and objection (see Section 7). These rights may be limited by applicable law.</li>
              </ul>

              <p className="legal-body" style={{ marginTop: '12px' }}>
                <strong>Data Protection Officer:</strong> If you are an EU resident with concerns about data processing, you have the right to file a complaint with your local data protection authority. Contact us at <a href="mailto:privacy@mycasevalues.com" className="legal-contact-email">privacy@mycasevalues.com</a> to discuss your rights or exercise GDPR requests.
              </p>
            </div>

            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>California Residents:</h4>
              <p className="legal-body">
                If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), including the right to know, delete, opt-out of sales, and understand how your data is used. Contact us at <a href="mailto:privacy@mycasevalues.com" className="legal-contact-email">privacy@mycasevalues.com</a> to exercise these rights. We will respond within 45 days.
              </p>
            </div>
          </section>

          <section id="updates">
            <h2 className="legal-section-heading">11. Updates to This Policy</h2>
            <p className="legal-body">
              We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated "Last Updated" date.
              Your continued use of MyCaseValue constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section id="contact">
            <h2 className="legal-section-heading">12. Contact Us</h2>
            <p className="legal-body">
              If you have questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights (access, correction, deletion, data portability), please contact us:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '6px',
              background: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-default)'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Privacy Requests:</strong> <a href="mailto:privacy@mycasevalues.com" className="legal-contact-email">privacy@mycasevalues.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Support & General Inquiries:</strong> <a href="mailto:support@mycasevalues.com" className="legal-contact-email">support@mycasevalues.com</a>
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Website:</strong> <a href="https://mycasevalues.com" className="legal-contact-email">https://mycasevalues.com</a>
              </p>
            </div>

            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>Response time:</strong> We will acknowledge your request within 24 hours and provide a substantive response within 30 days. If we need additional information or your request is complex, we may request an extension up to 60 days.
            </p>
          </section>

          <section id="related-legal">
            <h2 className="legal-section-heading">Related Legal Pages</h2>
            <p className="legal-body">
              This Privacy Policy is part of our comprehensive legal framework. We recommend reviewing our other legal documents:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '6px',
              background: 'var(--color-surface-0)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--border-default)'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Terms of Service:</strong> Read our <a href="/terms" className="legal-contact-email">Terms of Service</a> to understand the rules governing your use of MyCaseValue and our limitations of liability.
              </p>
              <p style={{ margin: '12px 0 0 0', fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Disclaimer:</strong> Review our <a href="/disclaimer" className="legal-contact-email">Disclaimer</a> to understand that MyCaseValue provides informational data only and is not legal advice.
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
