import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how MyCaseValue uses cookies and how to manage your cookie preferences.',
  openGraph: {
    title: 'Cookie Policy | MyCaseValue',
    description: 'Learn about how MyCaseValue uses cookies and how to manage your cookie preferences.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | MyCaseValue',
    description: 'Learn about how MyCaseValue uses cookies and how to manage your cookie preferences.',
  },
};

export default function CookiePolicyPage() {
  return (
    <div>
      <article>
        {/* Header */}
        <section
          style={{
            background: 'linear-gradient(135deg, #004182 0%, var(--accent-primary) 100%)',
            color: 'var(--color-surface-0)',
            padding: '1.5rem 1.5rem',
            marginBottom: '1.5rem',
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
              Cookie Policy
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
            padding: '0 1.5rem 2rem 1.5rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-primary)',
          }}
        >
          {/* What Are Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              What Are Cookies?
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They allow websites to remember information about you and your preferences, enabling a better browsing experience.
            </p>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              MyCaseValue uses cookies to enhance functionality, improve security, and understand how users interact with our platform.
            </p>
          </section>

          {/* Essential Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Essential Cookies
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              These cookies are necessary for the Platform to function properly. They are always active and cannot be disabled without affecting site functionality.
            </p>
            <div
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <ul
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                  paddingLeft: '1.5rem',
                  margin: '0 0 1rem 0',
                }}
              >
                <li>
                  <strong>Session cookies:</strong> Maintain user session and login state
                </li>
                <li>
                  <strong>Authentication tokens:</strong> Verify user identity and secure access
                </li>
                <li>
                  <strong>CSRF protection:</strong> Prevent cross-site request forgery attacks
                </li>
                <li>
                  <strong>Security cookies:</strong> Detect suspicious activity and fraud prevention
                </li>
              </ul>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.5rem 0 0 0',
                  fontStyle: 'italic',
                }}
              >
                Duration: Session or up to 1 year
              </p>
            </div>
          </section>

          {/* Analytics Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Analytics Cookies
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              These cookies help us understand how you use the Platform so we can improve functionality and user experience. They collect anonymized, aggregated data only.
            </p>
            <div
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <ul
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                  paddingLeft: '1.5rem',
                  margin: '0 0 1rem 0',
                }}
              >
                <li>
                  <strong>Google Analytics:</strong> Track page views, user behavior, and traffic patterns
                </li>
                <li>
                  <strong>Vercel Analytics:</strong> Monitor application performance and user experience
                </li>
                <li>
                  <strong>Usage tracking:</strong> Understand feature adoption and user engagement
                </li>
              </ul>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.5rem 0 0 0',
                  fontStyle: 'italic',
                }}
              >
                Duration: 1-2 years | Requires explicit consent
              </p>
            </div>
          </section>

          {/* Preference Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Preference & Functional Cookies
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              These cookies remember your choices and preferences to enhance your user experience on future visits.
            </p>
            <div
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <ul
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                  paddingLeft: '1.5rem',
                  margin: '0 0 1rem 0',
                }}
              >
                <li>
                  <strong>Language preference:</strong> Remember selected language (English/Spanish)
                </li>
                <li>
                  <strong>Theme preference:</strong> Store light/dark mode selection
                </li>
                <li>
                  <strong>User preferences:</strong> Remember display settings and personalized options
                </li>
              </ul>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.5rem 0 0 0',
                  fontStyle: 'italic',
                }}
              >
                Duration: 1 year | Generally functional and not consent-required
              </p>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Third-Party Cookies
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Third-party services we use may set their own cookies on your device. These include:
            </p>
            <div
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <ul
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                  paddingLeft: '1.5rem',
                  margin: '0 0 1rem 0',
                }}
              >
                <li>
                  <strong>Vercel:</strong> Analytics and performance monitoring
                </li>
                <li>
                  <strong>Google Analytics:</strong> User behavior and traffic analysis (analytics cookie)
                </li>
                <li>
                  <strong>Potential partners:</strong> Additional third-party integrations may be added in the future
                </li>
              </ul>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  margin: '0.5rem 0 0 0',
                  fontStyle: 'italic',
                }}
              >
                Duration: Varies by provider | Requires explicit consent for analytics
              </p>
            </div>
          </section>

          {/* Cookie Consent */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Cookie Consent
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              When you first visit MyCaseValue, you will see a cookie consent banner. You can:
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
                <strong>Accept All:</strong> Enable all cookies including analytics and third-party tracking
              </li>
              <li>
                <strong>Essential Only:</strong> Use only essential cookies required for Platform functionality
              </li>
              <li>
                <strong>Manage Preferences:</strong> Customize which cookie categories you allow
              </li>
            </ul>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Essential cookies cannot be disabled as they are required for the Platform to function. Your consent choice is saved in localStorage and persists across sessions.
            </p>
          </section>

          {/* Managing Cookies */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              How to Manage Cookies in Your Browser
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1.5rem' }}>
              You can control cookies through your browser settings. Instructions vary by browser:
            </p>
            <div
              style={{
                background: 'var(--color-surface-1)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <ul
                style={{
                  lineHeight: 1.8,
                  fontSize: '1.0625rem',
                  paddingLeft: '1.5rem',
                  margin: '0',
                }}
              >
                <li>
                  <strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Preferences &gt; Privacy &amp; Security &gt; Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data
                </li>
                <li>
                  <strong>Edge:</strong> Settings &gt; Privacy &gt; Cookies and other site permissions
                </li>
              </ul>
            </div>
            <p
              style={{
                lineHeight: 1.7,
                fontSize: '1.0625rem',
                marginTop: '1.5rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              Disabling cookies may impact Platform functionality and your user experience.
            </p>
          </section>

          {/* Cookie Duration Table */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Cookie Duration Reference
            </h2>
            <div
              style={{
                overflowX: 'auto',
                marginBottom: '1.5rem',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                <thead>
                  <tr style={{ background: '#F0F4F8', borderBottom: '2px solid var(--accent-primary)' }}>
                    <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--accent-primary-hover)' }}>
                      Cookie Type
                    </th>
                    <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--accent-primary-hover)' }}>
                      Category
                    </th>
                    <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--accent-primary-hover)' }}>
                      Duration
                    </th>
                    <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 600, color: 'var(--accent-primary-hover)' }}>
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>Session Token</td>
                    <td style={{ padding: '1rem' }}>Essential</td>
                    <td style={{ padding: '1rem' }}>Session</td>
                    <td style={{ padding: '1rem' }}>User authentication</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>Authentication</td>
                    <td style={{ padding: '1rem' }}>Essential</td>
                    <td style={{ padding: '1rem' }}>1 year</td>
                    <td style={{ padding: '1rem' }}>Account security</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>CSRF Protection</td>
                    <td style={{ padding: '1rem' }}>Essential</td>
                    <td style={{ padding: '1rem' }}>Session</td>
                    <td style={{ padding: '1rem' }}>Security</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>Google Analytics</td>
                    <td style={{ padding: '1rem' }}>Analytics</td>
                    <td style={{ padding: '1rem' }}>2 years</td>
                    <td style={{ padding: '1rem' }}>User behavior tracking</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>Vercel Analytics</td>
                    <td style={{ padding: '1rem' }}>Analytics</td>
                    <td style={{ padding: '1rem' }}>1 year</td>
                    <td style={{ padding: '1rem' }}>Performance monitoring</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem' }}>Language Preference</td>
                    <td style={{ padding: '1rem' }}>Preference</td>
                    <td style={{ padding: '1rem' }}>1 year</td>
                    <td style={{ padding: '1rem' }}>Language selection</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem' }}>Theme Preference</td>
                    <td style={{ padding: '1rem' }}>Preference</td>
                    <td style={{ padding: '1rem' }}>1 year</td>
                    <td style={{ padding: '1rem' }}>Dark/light mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Updates to Policy */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Updates to This Policy
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              MyCaseValue may update this Cookie Policy as our services evolve or in response to changes in regulations. We recommend reviewing this policy periodically.
            </p>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              Significant changes will be communicated via email or prominent notification on the Platform.
            </p>
          </section>

          {/* Contact */}
          <section style={{ marginBottom: '1.5rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--accent-primary-hover)',
                marginBottom: '1rem',
                borderBottom: '2px solid var(--accent-primary)',
                paddingBottom: '0.75rem',
              }}
            >
              Questions About Cookies?
            </h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1rem' }}>
              If you have questions about how MyCaseValue uses cookies or want to understand more about our privacy practices, please contact us:
            </p>
            <p
              style={{
                fontSize: '1.0625rem',
                fontWeight: 500,
                color: 'var(--accent-primary)',
                marginBottom: '0.5rem',
              }}
            >
              privacy@mycasevalues.com
            </p>
          </section>

          {/* Footer note */}
          <div
            style={{
              borderTop: '1px solid var(--border-default)',
              paddingTop: '1rem',
              marginTop: '1.5rem',
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            <p style={{ lineHeight: 1.6 }}>
              This Cookie Policy is part of MyCaseValue's commitment to transparency and data privacy. For complete information about how we handle your personal data, please review our Privacy Policy.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
