import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userName?: string;
}

export default function WelcomeEmail({ userName = 'there' }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to MyCaseValue — Your Federal Court Intelligence Platform</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>MyCaseValue</Heading>
          </Section>

          {/* Welcome */}
          <Section style={content}>
            <Heading style={h1}>Welcome, {userName}!</Heading>
            <Text style={paragraph}>
              You now have access to the most comprehensive federal court analytics platform available.
              MyCaseValue covers all 84 federal case types with real settlement data, win rates, and
              AI-powered tools built from 4M+ court records.
            </Text>

            <Hr style={hr} />

            {/* Popular Tools */}
            <Heading as="h2" style={h2}>Get Started with These Tools</Heading>

            <Section style={toolCard}>
              <Link href="https://mycasevalues.com/search" style={toolLink}>
                <Text style={toolTitle}>Case Search</Text>
                <Text style={toolDesc}>Search any federal case type to see win rates, settlement ranges, and historical trends.</Text>
              </Link>
            </Section>

            <Section style={toolCard}>
              <Link href="https://mycasevalues.com/calculator" style={toolLink}>
                <Text style={toolTitle}>Settlement Calculator</Text>
                <Text style={toolDesc}>Estimate case value with percentile-based settlement projections from real federal data.</Text>
              </Link>
            </Section>

            <Section style={toolCard}>
              <Link href="https://mycasevalues.com/attorney" style={toolLink}>
                <Text style={toolTitle}>Attorney Tools</Text>
                <Text style={toolDesc}>AI-powered demand letters, deposition prep, discovery generators, and case predictors.</Text>
              </Link>
            </Section>

            <Hr style={hr} />

            {/* Beta Note */}
            <Section style={betaBox}>
              <Text style={betaText}>
                <strong>Beta Access:</strong> During our beta period, all premium features are
                unlocked for free. This includes unlimited lookups, attorney tools, AI analysis,
                and PDF exports.
              </Text>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Link href="https://mycasevalues.com/search" style={ctaButton}>
                Start Researching
              </Link>
            </Section>

            <Text style={footer}>
              Questions? Reply to this email or reach us at support@mycasevalues.com
            </Text>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} MyCaseValue. All data sourced from public federal court records.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: '#F7F8FA',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '580px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  overflow: 'hidden',
};

const header: React.CSSProperties = {
  backgroundColor: '#1B3A5C',
  padding: '32px 40px',
};

const logo: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: 600,
  margin: 0,
};

const content: React.CSSProperties = {
  padding: '32px 40px',
};

const h1: React.CSSProperties = {
  color: '#0f0f0f',
  fontSize: '28px',
  fontWeight: 600,
  margin: '0 0 16px',
};

const h2: React.CSSProperties = {
  color: '#0f0f0f',
  fontSize: '18px',
  fontWeight: 600,
  margin: '0 0 16px',
};

const paragraph: React.CSSProperties = {
  color: '#4B5563',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const hr: React.CSSProperties = {
  borderTop: '1px solid #E5E7EB',
  margin: '24px 0',
};

const toolCard: React.CSSProperties = {
  backgroundColor: '#FAFBFC',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  padding: '16px 20px',
  marginBottom: '12px',
};

const toolLink: React.CSSProperties = {
  textDecoration: 'none',
};

const toolTitle: React.CSSProperties = {
  color: '#0A66C2',
  fontSize: '15px',
  fontWeight: 600,
  margin: '0 0 4px',
};

const toolDesc: React.CSSProperties = {
  color: '#4B5563',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: 0,
};

const betaBox: React.CSSProperties = {
  backgroundColor: '#EDF3FB',
  borderRadius: '8px',
  padding: '16px 20px',
  marginBottom: '24px',
};

const betaText: React.CSSProperties = {
  color: '#004182',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: 0,
};

const ctaSection: React.CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#0A66C2',
  color: '#FFFFFF',
  padding: '14px 32px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 600,
  textDecoration: 'none',
};

const footer: React.CSSProperties = {
  color: '#4B5563',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0 0 8px',
};

const footerSmall: React.CSSProperties = {
  color: '#9CA3AF',
  fontSize: '11px',
  margin: 0,
};
