import { Metadata } from 'next';
import Link from 'next/link';
import IntakeFormGenerator from '../../../components/IntakeFormGenerator';

export const metadata: Metadata = {
  title: 'Case Intake Form Generator | MyCaseValue',
  description: 'Generate customized client intake questionnaires by case type to streamline case intake and client onboarding.',
};

export default function IntakeFormsPage() {
  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#0A66C2', flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Intake Form Generator
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            Case Intake Form Generator
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Generate customized client intake questionnaires by case type to streamline case intake and client onboarding.
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
