import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'MyCaseValue is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility standards, efforts, and how to provide feedback.',
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  fontFamily: 'var(--font-legal)',
  color: 'var(--text-primary)',
  marginTop: 32,
  marginBottom: 12,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: 15,
  fontFamily: 'var(--font-ui)',
  color: 'var(--text-secondary)',
  lineHeight: 1.7,
  marginBottom: 16,
};

export default function AccessibilityPage() {
  return (
    <div
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '48px 24px 64px',
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          fontFamily: 'var(--font-legal)',
          color: 'var(--text-primary)',
          marginBottom: 24,
        }}
      >
        Accessibility Statement
      </h1>

      <p style={paragraphStyle}>
        MyCaseValue is committed to ensuring digital accessibility for people with
        disabilities. We continually improve the user experience for everyone.
      </p>

      <h2 style={sectionHeadingStyle}>Our Standards</h2>
      <p style={paragraphStyle}>
        We aim to conform to WCAG 2.1 Level AA. This includes sufficient color
        contrast (all text tokens meet 4.5:1 minimum), keyboard navigability,
        screen reader compatibility, and responsive design.
      </p>

      <h2 style={sectionHeadingStyle}>What We've Done</h2>
      <p style={paragraphStyle}>
        We have undertaken the following accessibility work: all color contrast
        tokens verified to WCAG AA, focus indicators on all interactive elements,
        semantic HTML structure, proper form labels, and responsive layouts with
        44px minimum touch targets.
      </p>

      <h2 style={sectionHeadingStyle}>Feedback</h2>
      <p style={paragraphStyle}>
        If you encounter any accessibility barriers, please contact us at{' '}
        <a
          href="mailto:support@mycasevalues.com"
          style={{
            color: 'var(--link)',
            textDecoration: 'underline',
          }}
        >
          support@mycasevalues.com
        </a>
        . We take accessibility feedback seriously and will respond within 2
        business days.
      </p>

      <h2 style={sectionHeadingStyle}>Third-Party Content</h2>
      <p style={paragraphStyle}>
        While we strive to ensure accessibility of MyCaseValue, some third-party
        content may not be fully accessible.
      </p>
    </div>
  );
}
