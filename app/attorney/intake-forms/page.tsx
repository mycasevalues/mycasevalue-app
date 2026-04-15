import { Metadata } from 'next';
import Link from 'next/link';
import IntakeFormGenerator from '../../../components/IntakeFormGenerator';

export const metadata: Metadata = {
  title: 'Case Intake Form Generator',
  description: 'Generate customized client intake questionnaires by case type to streamline case intake and client onboarding.',
};

export default function IntakeFormsPage() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: 'var(--accent-primary)', borderBottom: '1px solid var(--border-default)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-surface-0)', fontFamily: 'var(--font-display)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Case Intake Form Generator
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>
            Generate customized client intake questionnaires by case type
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <IntakeFormGenerator />
      </div>
    </div>
  );
}
