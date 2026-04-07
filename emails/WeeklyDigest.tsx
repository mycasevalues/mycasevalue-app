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

interface DigestItem {
  title: string;
  description: string;
  link: string;
}

interface WeeklyDigestProps {
  userName?: string;
  weekOf?: string;
  caseTypeUpdates?: DigestItem[];
  recentOpinions?: DigestItem[];
  platformUpdates?: string[];
}

export default function WeeklyDigest({
  userName = 'there',
  weekOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  caseTypeUpdates = [],
  recentOpinions = [],
  platformUpdates = [],
}: WeeklyDigestProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Weekly Federal Court Intelligence Digest — {weekOf}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>MyCaseValue</Heading>
            <Text style={headerSub}>Weekly Intelligence Digest</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Week of {weekOf}</Heading>
            <Text style={paragraph}>Hi {userName}, here&apos;s your personalized federal court intelligence summary.</Text>

            {/* Case Type Updates */}
            {caseTypeUpdates.length > 0 && (
              <>
                <Heading as="h2" style={h2}>Case Type Updates</Heading>
                {caseTypeUpdates.map((item, i) => (
                  <Section key={i} style={itemCard}>
                    <Link href={item.link} style={itemTitle}>{item.title}</Link>
                    <Text style={itemDesc}>{item.description}</Text>
                  </Section>
                ))}
                <Hr style={hr} />
              </>
            )}

            {/* Recent Opinions */}
            {recentOpinions.length > 0 && (
              <>
                <Heading as="h2" style={h2}>Notable Recent Opinions</Heading>
                {recentOpinions.map((item, i) => (
                  <Section key={i} style={itemCard}>
                    <Link href={item.link} style={itemTitle}>{item.title}</Link>
                    <Text style={itemDesc}>{item.description}</Text>
                  </Section>
                ))}
                <Hr style={hr} />
              </>
            )}

            {/* Platform Updates */}
            {platformUpdates.length > 0 && (
              <>
                <Heading as="h2" style={h2}>Platform Updates</Heading>
                {platformUpdates.map((update, i) => (
                  <Text key={i} style={paragraph}>• {update}</Text>
                ))}
                <Hr style={hr} />
              </>
            )}

            <Section style={{ textAlign: 'center' as const, margin: '24px 0' }}>
              <Link href="https://mycasevalues.com/dashboard" style={ctaButton}>View Your Dashboard</Link>
            </Section>

            <Text style={footer}>
              You&apos;re receiving this because you subscribed to the MyCaseValue weekly digest.
            </Text>
            <Link href="https://mycasevalues.com/dashboard?tab=account" style={unsubLink}>
              Unsubscribe from weekly digest
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: '#F7F8FA',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '580px',
  margin: '0 auto',
  backgroundColor: '#FFF',
  borderRadius: '12px',
  overflow: 'hidden',
};

const header: React.CSSProperties = { backgroundColor: '#1C3A5E', padding: '24px 40px' };
const logo: React.CSSProperties = { color: '#FFF', fontSize: '20px', fontWeight: 600, margin: '0 0 4px' };
const headerSub: React.CSSProperties = { color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 };
const content: React.CSSProperties = { padding: '32px 40px' };
const h1: React.CSSProperties = { color: '#0f0f0f', fontSize: '24px', fontWeight: 600, margin: '0 0 8px' };
const h2: React.CSSProperties = { color: '#0f0f0f', fontSize: '16px', fontWeight: 600, margin: '0 0 12px' };
const paragraph: React.CSSProperties = { color: '#4B5563', fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px' };
const hr: React.CSSProperties = { borderTop: '1px solid #E5E7EB', margin: '24px 0' };
const itemCard: React.CSSProperties = { backgroundColor: '#FAFBFC', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '12px 16px', marginBottom: '8px' };
const itemTitle: React.CSSProperties = { color: '#0966C3', fontSize: '14px', fontWeight: 600, textDecoration: 'none' };
const itemDesc: React.CSSProperties = { color: '#4B5563', fontSize: '12px', lineHeight: '1.5', margin: '4px 0 0' };
const ctaButton: React.CSSProperties = { display: 'inline-block', backgroundColor: '#0966C3', color: '#FFF', padding: '12px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' };
const footer: React.CSSProperties = { color: '#9CA3AF', fontSize: '11px', margin: '16px 0 4px' };
const unsubLink: React.CSSProperties = { color: '#9CA3AF', fontSize: '11px', textDecoration: 'underline' };
