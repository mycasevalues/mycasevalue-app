import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | MyCaseValue',
  description: 'Review MyCaseValue\'s Acceptable Use Policy governing use of our platform and data.',
};

export default function AUPPage() {
  return (
    <main id="main-content" role="main">
      <article>
        {/* Header */}
        <section
          style={{
            background: 'linear-gradient(135deg, #004182 0%, #0966C3 100%)',
            color: '#FFFFFF',
            padding: '3rem 1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
                fontFamily: 'var(--font-inter)',
              }}
            >
              Acceptable Use Policy
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.5,
                margin: 0,
                opacity: 0.95,
              }}
            >
              Effective January 1, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 1.5rem 4rem 1.5rem',
            fontFamily: 'var(--font-body)',
            color: '#0f0f0f',
          }}
        >
          {/* Purpose */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Purpose
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              This Acceptable Use Policy governs the use of mycasevalue.com (the "Platform") and all services provided by MyCaseValue LLC (the "Company"). By accessing or using the Platform, you agree to comply with this policy.
            </p>
          </section>

          {/* Permitted Uses */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Permitted Uses
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1.5rem' }}>
              You may use the Platform for:
            </p>
            <ul
              style={{
                lineHeight: 1.8,
                fontSize: '1.0625rem',
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>Legal research and case evaluation</li>
              <li>Educational and academic purposes</li>
              <li>Professional development and training</li>
              <li>Informed decision-making regarding legal matters</li>
              <li>Journalistic and news reporting</li>
              <li>Comparative analysis of federal court outcomes</li>
            </ul>
          </section>

          {/* Prohibited Uses */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Prohibited Uses
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1.5rem' }}>
              You may not:
            </p>
            <ul
              style={{
                lineHeight: 1.8,
                fontSize: '1.0625rem',
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>
                <strong>Scrape or collect data:</strong> Engage in automated data collection, web scraping, or systematic extraction of data without prior written authorization
              </li>
              <li>
                <strong>Commercial redistribution:</strong> Commercially resell, republish, or redistribute Platform data or analysis
              </li>
              <li>
                <strong>Misrepresent content:</strong> Claim Platform data or analysis constitutes legal advice or establish an attorney-client relationship
              </li>
              <li>
                <strong>Harassment or intimidation:</strong> Use Platform data to harass, threaten, or intimidate any party to litigation
              </li>
              <li>
                <strong>Unauthorized access:</strong> Attempt to gain unauthorized access to restricted sections, systems, or databases
              </li>
              <li>
                <strong>Malicious activities:</strong> Transmit viruses, malware, or any code of destructive nature
              </li>
              <li>
                <strong>Platform disruption:</strong> Engage in any activity that disrupts, interferes with, or degrades the availability or functionality of the Platform
              </li>
              <li>
                <strong>Illegal activities:</strong> Use the Platform in violation of any applicable law or regulation
              </li>
            </ul>
          </section>

          {/* Data Usage */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Data Usage & Disclaimer
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              All data, analysis, and reports provided by the Platform are for informational and research purposes only. Nothing on the Platform constitutes legal advice or creates an attorney-client relationship. Case outcome data reflects historical averages and does not predict individual case results.
            </p>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Users must consult with a licensed attorney in their jurisdiction for personalized legal advice.
            </p>
          </section>

          {/* Account Responsibility */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Account Security & Responsibility
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              If you create an account, you are responsible for:
            </p>
            <ul
              style={{
                lineHeight: 1.8,
                fontSize: '1.0625rem',
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>Preventing unauthorized access to your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>All activity that occurs under your account, whether authorized or not</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Intellectual Property Rights
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              All data, analysis, visualizations, methodologies, and content on the Platform are the exclusive intellectual property of MyCaseValue LLC. You may use these materials for personal, non-commercial purposes only, subject to the restrictions in this policy.
            </p>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Unauthorized reproduction, distribution, or use of Platform content is prohibited.
            </p>
          </section>

          {/* Enforcement */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Enforcement & Remedies
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Violations of this policy may result in:
            </p>
            <ul
              style={{
                lineHeight: 1.8,
                fontSize: '1.0625rem',
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
              }}
            >
              <li>Immediate suspension or termination of account access</li>
              <li>Removal of content in violation of this policy</li>
              <li>Legal action to recover damages or seek injunctive relief</li>
              <li>Reporting to law enforcement or relevant authorities</li>
            </ul>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              The Company reserves the right to investigate complaints and take appropriate action at its discretion.
            </p>
          </section>

          {/* Changes to Policy */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Changes to This Policy
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              MyCaseValue LLC may update this Acceptable Use Policy at any time without notice. Continued use of the Platform constitutes acceptance of updated terms. We recommend reviewing this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: '#004182',
                marginBottom: '1rem',
                borderBottom: '2px solid #0966C3',
                paddingBottom: '0.75rem',
              }}
            >
              Contact Us
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              If you have questions about this Acceptable Use Policy, contact us at:
            </p>
            <p
              style={{
                fontSize: '1.0625rem',
                fontWeight: 500,
                color: '#0966C3',
                marginBottom: '0.5rem',
              }}
            >
              legal@mycasevalue.com
            </p>
          </section>

          {/* Footer note */}
          <div
            style={{
              borderTop: '1px solid #E5E7EB',
              paddingTop: '2rem',
              marginTop: '3rem',
              fontSize: '0.9375rem',
              color: '#666666',
            }}
          >
            <p style={{ lineHeight: 1.6 }}>
              This policy applies to all users of MyCaseValue and is effective as of January 1, 2026. This document is part of the larger legal framework governing use of the MyCaseValue platform, including the Terms of Service and Privacy Policy.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
