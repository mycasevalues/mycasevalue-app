import Link from 'next/link';
import LienCalculator from '../../../components/LienCalculator';

export const metadata = {
  title: 'Lien & Subrogation Calculator | MyCaseValue',
  description: 'Estimate Medicare, Medicaid, and workers compensation liens. Calculate net recovery to client from your settlement amount.',
};

export default function LienCalculatorPage() {
  return (
    <>
      {/* Header */}
      <header style={{ background: '#1B3A5C', padding: 'clamp(32px, 6vw, 56px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#0A66C2', color: '#FFF', padding: '4px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            CALCULATOR
          </div>
          <h1 style={{ color: '#FFF', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 600, margin: '0 0 12px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
            Lien & Subrogation Calculator
          </h1>
          <p style={{ color: '#b8bcc0', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0, maxWidth: 600, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
            Estimate Medicare, Medicaid, and workers compensation liens to calculate your net recovery.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: '#FFF', padding: '12px 0', borderBottom: '1px solid #E5E7EB', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: '#0A66C2', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: '#E5E7EB', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: '#0A66C2', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: '#E5E7EB', margin: '0 8px' }}>/</span>
          <span style={{ color: '#0f0f0f', fontWeight: 600 }}>Liens</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ background: '#F7F8FA', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <LienCalculator />
        </div>
      </main>
    </>
  );
}
