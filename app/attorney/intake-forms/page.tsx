import { Metadata } from 'next';
import Link from 'next/link';
import IntakeFormGenerator from '../../../components/IntakeFormGenerator';

export const metadata: Metadata = {
  title: 'Case Intake Form Generator',
  description: 'Generate customized client intake questionnaires by case type to streamline case intake and client onboarding.',
};

export default function IntakeFormsPage() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-legal)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Case Intake Form Generator
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text3)', marginBottom: 0, lineHeight: 1.4, fontFamily: 'var(--font-ui)' }}>
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
