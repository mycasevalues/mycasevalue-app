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

interface AlertTriggeredProps {
  userName?: string;
  alertType?: string;
  caseName?: string;
  caseNumber?: string;
  triggerDescription?: string;
  docketUrl?: string;
  caseTypeUrl?: string;
  triggeredAt?: string;
}

export default function AlertTriggered({
  userName = 'there',
  alertType = 'Docket Activity',
  caseName = 'Case Name',
  caseNumber = '1:24-cv-01234',
  triggerDescription = 'New docket entry filed',
  docketUrl = 'https://www.courtlistener.com',
  caseTypeUrl = 'https://mycasevalues.com/search',
  triggeredAt = new Date().toLocaleString(),
}: AlertTriggeredProps) {
  return (
    <Html>
      <Head />
      <Preview>Alert Triggered: {caseName} ({caseNumber})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>MyCaseValue</Heading>
            <Text style={headerBadge}>ALERT TRIGGERED</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Alert: {alertType}</Heading>
            <Text style={paragraph}>Hi {userName}, an alert you set up has been triggered.</Text>

            <Section style={alertBox}>
              <Text style={alertLabel}>What Triggered This Alert</Text>
              <Text style={alertValue}>{triggerDescription}</Text>
            </Section>

            <Section style={detailsBox}>
              <Text style={detailRow}><strong>Case Name:</strong> {caseName}</Text>
              <Text style={detailRow}><strong>Case Number:</strong> {caseNumber}</Text>
              <Text style={detailRow}><strong>Triggered At:</strong> {triggeredAt}</Text>
            </Section>

            <Hr style={hr} />

            <Section style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Link href={docketUrl} style={ctaButton}>View Docket on CourtListener</Link>
            </Section>

            <Section style={{ textAlign: 'center' as const, marginTop: '12px' }}>
              <Link href={caseTypeUrl} style={secondaryLink}>View Case Type Data on MyCaseValue</Link>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              Manage your alerts in your <Link href="https://mycasevalues.com/dashboard?tab=alerts" style={footerLink}>dashboard</Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main: React.CSSProperties = {
  backgroundColor: 'var(--color-surface-1)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: '580px', margin: '0 auto', backgroundColor: '#FFF',
  borderRadius: '6px', overflow: 'hidden',
};

const header: React.CSSProperties = { backgroundColor: 'var(--accent-primary)', padding: '24px 40px' };
const logo: React.CSSProperties = { color: '#FFF', fontSize: '20px', fontWeight: 600, margin: '0 0 4px' };
const headerBadge: React.CSSProperties = { color: '#FCD34D', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', margin: 0 };
const content: React.CSSProperties = { padding: '32px 40px' };
const h1: React.CSSProperties = { color: 'var(--color-text-primary)', fontSize: '22px', fontWeight: 600, margin: '0 0 8px' };
const paragraph: React.CSSProperties = { color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' };
const hr: React.CSSProperties = { borderTop: '1px solid var(--border-default)', margin: '24px 0' };

const alertBox: React.CSSProperties = {
  backgroundColor: '#FEF3C7', borderRadius: '4px', border: '1px solid #D97706',
  padding: '16px 24px', marginBottom: '16px',
};
const alertLabel: React.CSSProperties = { color: '#78350F', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 4px' };
const alertValue: React.CSSProperties = { color: '#78350F', fontSize: '15px', fontWeight: 600, margin: 0 };

const detailsBox: React.CSSProperties = {
  backgroundColor: '#FAFBFC', borderRadius: '4px', border: '1px solid var(--border-default)',
  padding: '16px 24px',
};
const detailRow: React.CSSProperties = { color: 'var(--color-text-primary)', fontSize: '13px', lineHeight: '1.8', margin: 0 };

const ctaButton: React.CSSProperties = {
  display: 'inline-block', backgroundColor: 'var(--accent-primary)', color: '#FFF',
  padding: '12px 28px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
};
const secondaryLink: React.CSSProperties = { color: 'var(--accent-primary)', fontSize: '13px', textDecoration: 'underline' };
const footer: React.CSSProperties = { color: 'var(--color-text-muted)', fontSize: '11px', margin: 0 };
const footerLink: React.CSSProperties = { color: 'var(--color-text-muted)', textDecoration: 'underline' };
