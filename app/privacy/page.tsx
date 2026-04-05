import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MyCaseValue',
  description: 'MyCaseValue privacy policy. Learn how we collect, use, and protect your data when researching federal court outcomes.',
  alternates: { canonical: 'https://www.mycasevalues.com/privacy' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy — MyCaseValue',
    description: 'Learn how MyCaseValue collects, uses, and protects your data.',
    url: 'https://www.mycasevalues.com/privacy',
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
        { '@type': 'ListItem', position: 2, name: 'Privacy', item: 'https://www.mycasevalues.com/privacy' },
      ],
    },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
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
            <span style={{ color: '#FFFFFF' }}>Privacy Policy</span>
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            PRIVACY
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'white',
            letterSpacing: '-1.5px',
            fontFamily: 'var(--font-display)'
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
          </div>
        </nav>

        {/* Main Content */}
        <div className="legal-content" style={{ maxWidth: '768px', flex: 1 }}>
          <section id="introduction">
            <h2 className="legal-section-heading">1. Introduction</h2>
            <p className="legal-body">
              MyCaseValue ("we," "us," or "our") operates the website https://mycasevalues.com and associated tools (the "Service").
              This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our Service.
            </p>
            <p className="legal-body">
              We are committed to protecting your privacy. We collect minimal data and do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section id="information-collect">
            <h2 className="legal-section-heading">2. Information We Collect</h2>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212529', marginTop: '24px', marginBottom: '12px' }}>
                2.1 Information You Provide Directly
              </h3>
              <p className="legal-body">
                When you use MyCaseValue, you may voluntarily provide information such as:
              </p>
              <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Account information (name, email) if you create an account</li>
                <li style={{ marginBottom: '8px' }}>Case type searches and research queries</li>
                <li style={{ marginBottom: '8px' }}>Payment information (processed securely through Stripe; we do not store card details)</li>
                <li>Communication with our support team</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212529', marginTop: '24px', marginBottom: '12px' }}>
                2.2 Information Collected Automatically
              </h3>
              <p className="legal-body">
                When you visit our Service, we automatically collect certain information:
              </p>
              <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Usage data: pages visited, case types searched, time spent on Service, referrer</li>
                <li style={{ marginBottom: '8px' }}>Device information: browser type, operating system, device type</li>
                <li style={{ marginBottom: '8px' }}>IP address (not personally identified; used for analytics and fraud prevention)</li>
                <li>Cookies and similar tracking technologies (see Section 3)</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212529', marginTop: '24px', marginBottom: '12px' }}>
                2.3 Information We Do NOT Collect
              </h3>
              <p className="legal-body">
                We do not collect or store:
              </p>
              <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
                <li style={{ marginBottom: '8px' }}>Full credit card numbers (payments handled securely by Stripe)</li>
                <li style={{ marginBottom: '8px' }}>Social Security numbers or government IDs</li>
                <li style={{ marginBottom: '8px' }}>Detailed location data (IP-based location is approximate only)</li>
                <li style={{ marginBottom: '8px' }}>Biometric data or health information</li>
                <li>Your actual legal case details or personal case information</li>
              </ul>
            </div>
          </section>

          <section id="cookies-tracking">
            <h2 className="legal-section-heading">3. Cookies and Tracking</h2>
            <p className="legal-body">
              MyCaseValue uses cookies and similar technologies for:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Essential cookies:</strong> Necessary for site functionality, session management, and security</li>
              <li style={{ marginBottom: '8px' }}><strong>Analytics cookies:</strong> To understand how you use our Service and improve user experience</li>
              <li><strong>Preference cookies:</strong> To remember your settings and preferences</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              Most browsers allow you to control cookies through browser settings. Disabling essential cookies may limit functionality.
              We do not use cookies to track you across other websites.
            </p>
          </section>

          <section id="how-use-information">
            <h2 className="legal-section-heading">4. How We Use Your Information</h2>
            <p className="legal-body">
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}>Provide, maintain, and improve the Service</li>
              <li style={{ marginBottom: '8px' }}>Process purchases and send confirmations</li>
              <li style={{ marginBottom: '8px' }}>Send transactional emails (account confirmations, receipts, support responses)</li>
              <li style={{ marginBottom: '8px' }}>Understand user behavior and analyze Service usage (analytics only)</li>
              <li style={{ marginBottom: '8px' }}>Detect and prevent fraud, abuse, and technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>We do not use your information to:</strong> Send unsolicited marketing emails, sell your data to third parties, or build profiles for targeted advertising.
            </p>
          </section>

          <section id="third-parties">
            <h2 className="legal-section-heading">5. Third Parties and Data Sharing</h2>
            <p className="legal-body">
              We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              We may share information with trusted service providers who assist us in operating our Service, subject to confidentiality agreements:
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
              <li style={{ marginBottom: '8px' }}><strong>Cloud hosting providers:</strong> Data storage and infrastructure</li>
              <li style={{ marginBottom: '8px' }}><strong>Analytics services:</strong> Aggregated usage data only</li>
              <li><strong>Legal/law enforcement:</strong> When required by law or to protect rights</li>
            </ul>
          </section>

          <section id="data-retention">
            <h2 className="legal-section-heading">6. Data Retention</h2>
            <p className="legal-body">
              We retain your information for as long as necessary to provide the Service and comply with legal obligations.
            </p>
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
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
            <ul style={{ paddingLeft: '24px', color: '#455A64' }} className="legal-body">
              <li style={{ marginBottom: '8px' }}><strong>Access:</strong> Request what personal data we hold about you</li>
              <li style={{ marginBottom: '8px' }}><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li style={{ marginBottom: '8px' }}><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li style={{ marginBottom: '8px' }}><strong>Opt-out:</strong> Disable non-essential cookies at any time</li>
              <li><strong>Data portability:</strong> Receive your data in a portable format</li>
            </ul>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              To exercise these rights, contact us at <a href="mailto:privacy@mycasevalue.com" className="legal-contact-email">privacy@mycasevalue.com</a> with details of your request.
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
            <h2 className="legal-section-heading">10. International Users</h2>
            <p className="legal-body">
              MyCaseValue is operated from the United States. If you are located outside the U.S., your information may be transferred to, stored in, and processed in the United States.
              By using MyCaseValue, you consent to this transfer.
            </p>
            <p className="legal-body" style={{ marginTop: '16px' }}>
              <strong>EU users:</strong> If you are in the EU/EEA, our legal basis for processing is your consent or our legitimate interest in providing the Service.
              You have rights under GDPR (see Section 7). Contact us if you wish to exercise GDPR rights.
            </p>
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
              If you have questions about this Privacy Policy, your data, or wish to exercise your rights, contact us:
            </p>
            <div style={{
              marginTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
              borderRadius: '4px',
              background: '#FFFFFF',
              color: '#212529',
              border: '1px solid #D5D8DC'
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7 }}>
                <strong>Email:</strong> <a href="mailto:privacy@mycasevalue.com" className="legal-contact-email">privacy@mycasevalue.com</a>
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
