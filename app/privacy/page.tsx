import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MyCaseValue',
  description: 'MyCaseValue privacy policy. Learn how we collect, use, and protect your data when researching federal court outcomes.',
  alternates: { canonical: 'https://mycasevalues.com/privacy' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy — MyCaseValue',
    description: 'Learn how MyCaseValue collects, uses, and protects your data.',
    url: 'https://mycasevalues.com/privacy',
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
        { '@type': 'ListItem', position: 2, name: 'Privacy', item: 'https://mycasevalues.com/privacy' },
      ],
    },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #131B2E 0%, #0B1221 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            PRIVACY
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Privacy Policy
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              1. Introduction
            </h2>
            <p>
              MyCaseValue ("we," "us," or "our") operates the website https://mycasevalues.com and associated tools (the "Service").
              This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our Service.
            </p>
            <p>
              We are committed to protecting your privacy. We collect minimal data and do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              2. Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#F0F2F5' }}>
                  2.1 Information You Provide Directly
                </h3>
                <p>
                  When you use MyCaseValue, you may voluntarily provide information such as:
                </p>
                <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
                  <li>Account information (name, email) if you create an account</li>
                  <li>Case type searches and research queries</li>
                  <li>Payment information (processed securely through Stripe; we do not store card details)</li>
                  <li>Communication with our support team</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#F0F2F5' }}>
                  2.2 Information Collected Automatically
                </h3>
                <p>
                  When you visit our Service, we automatically collect certain information:
                </p>
                <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
                  <li>Usage data: pages visited, case types searched, time spent on Service, referrer</li>
                  <li>Device information: browser type, operating system, device type</li>
                  <li>IP address (not personally identified; used for analytics and fraud prevention)</li>
                  <li>Cookies and similar tracking technologies (see Section 3)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#F0F2F5' }}>
                  2.3 Information We Do NOT Collect
                </h3>
                <p>
                  We do not collect or store:
                </p>
                <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
                  <li>Full credit card numbers (payments handled securely by Stripe)</li>
                  <li>Social Security numbers or government IDs</li>
                  <li>Detailed location data (IP-based location is approximate only)</li>
                  <li>Biometric data or health information</li>
                  <li>Your actual legal case details or personal case information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              3. Cookies and Tracking
            </h2>
            <p>
              MyCaseValue uses cookies and similar technologies for:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Essential cookies:</strong> Necessary for site functionality, session management, and security</li>
              <li><strong>Analytics cookies:</strong> To understand how you use our Service and improve user experience</li>
              <li><strong>Preference cookies:</strong> To remember your settings and preferences</li>
            </ul>
            <p className="mt-4">
              Most browsers allow you to control cookies through browser settings. Disabling essential cookies may limit functionality.
              We do not use cookies to track you across other websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              4. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li>Provide, maintain, and improve the Service</li>
              <li>Process purchases and send confirmations</li>
              <li>Send transactional emails (account confirmations, receipts, support responses)</li>
              <li>Understand user behavior and analyze Service usage (analytics only)</li>
              <li>Detect and prevent fraud, abuse, and technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-4">
              <strong>We do not use your information to:</strong> Send unsolicited marketing emails, sell your data to third parties, or build profiles for targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              5. Third Parties and Data Sharing
            </h2>
            <p>
              We do not sell, rent, or share your personal information with third parties for their marketing purposes.
            </p>
            <p className="mt-4">
              We may share information with trusted service providers who assist us in operating our Service, subject to confidentiality agreements:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
              <li><strong>Cloud hosting providers:</strong> Data storage and infrastructure</li>
              <li><strong>Analytics services:</strong> Aggregated usage data only</li>
              <li><strong>Legal/law enforcement:</strong> When required by law or to protect rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              6. Data Retention
            </h2>
            <p>
              We retain your information for as long as necessary to provide the Service and comply with legal obligations.
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Account data:</strong> Retained until you delete your account</li>
              <li><strong>Search history:</strong> Retained for analytics (anonymized after 90 days)</li>
              <li><strong>Payment records:</strong> Retained as required for tax/legal compliance (typically 7 years)</li>
              <li><strong>Cookies:</strong> Cleared per browser settings and cookie expiration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              7. Your Rights and Choices
            </h2>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="mt-2 space-y-2" style={{ paddingLeft: '1.5rem' }}>
              <li><strong>Access:</strong> Request what personal data we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Opt-out:</strong> Disable non-essential cookies at any time</li>
              <li><strong>Data portability:</strong> Receive your data in a portable format</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at privacy@mycasevalue.com with details of your request.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              8. Security
            </h2>
            <p>
              We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="mt-4">
              <strong>However, no method of transmission over the internet is 100% secure.</strong> While we use industry-standard encryption (SSL/TLS), we cannot guarantee absolute security.
              Use a strong password, enable two-factor authentication if available, and never share your credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              9. Children's Privacy
            </h2>
            <p>
              MyCaseValue is not intended for users under 13 years old. We do not knowingly collect personal information from children.
              If we become aware of data from a child under 13, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              10. International Users
            </h2>
            <p>
              MyCaseValue is operated from the United States. If you are located outside the U.S., your information may be transferred to, stored in, and processed in the United States.
              By using MyCaseValue, you consent to this transfer.
            </p>
            <p className="mt-4">
              <strong>EU users:</strong> If you are in the EU/EEA, our legal basis for processing is your consent or our legitimate interest in providing the Service.
              You have rights under GDPR (see Section 7). Contact us if you wish to exercise GDPR rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              11. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated "Last Updated" date.
              Your continued use of MyCaseValue constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--fg-primary)' }}>
              12. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, your data, or wish to exercise your rights, contact us:
            </p>
            <div className="mt-4 p-4 rounded-lg" style={{ background: '#131B2E', color: 'var(--fg-primary)' }}>
              <p className="m-0"><strong>Email:</strong> privacy@mycasevalue.com</p>
              <p className="m-0 mt-2"><strong>Website:</strong> https://mycasevalues.com</p>
            </div>
          </section>

        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}
