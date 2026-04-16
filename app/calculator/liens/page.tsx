import'{ Metadata } from 'next';
import'{ SITE_URL } from '../../../lib/site-config';
import'Link from 'next/link';
import'LienCalculator from '../../../components/LienCalculator';

export'const metadata: Metadata = {
' title: 'Lien & Subrogation Calculator',
' description: 'Estimate Medicare, Medicaid, and workers compensation liens. Calculate net recovery to client from your settlement amount.',
' alternates: { canonical: `${SITE_URL}/calculator/liens` },
' openGraph: {
'   title: 'Lien & Subrogation Calculator',
'   description: 'Estimate Medicare, Medicaid, and workers compensation liens. Calculate net recovery to client from your settlement amount.',
'   url: `${SITE_URL}/calculator/liens`,
'   type: 'website',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Lien & Subrogation Calculator',
'   description: 'Estimate Medicare, Medicaid, and workers compensation liens.',
' },
};

export'default function LienCalculatorPage() {
' return (
'   <>
'     {/* Header */}
'     <header style={{ background: 'var(--gradient-hero)', padding: 'clamp(16px, 3vw, 32px) clamp(16px, 3vw, 24px)' }}>
'       <div style={{ maxWidth: 1200, margin: '0 auto' }}>
'         <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#FFF', padding: '4px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
'           CALCULATOR
'         </div>
'         <h1 style={{ color: '#FFF', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 600, margin: '0 0 12px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
'           Calculate Your True Net Recovery After Liens
'         </h1>
'         <p style={{ color: '#b8bcc0', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0, maxWidth: 600, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
'           Estimate Medicare, Medicaid, and workers compensation liens to understand your actual settlement payout.
'         </p>
'       </div>
'     </header>

'     {/* Breadcrumb */}
'     <nav style={{ background: '#FFF', padding: '12px 0', borderBottom: '1px solid var(--border-default)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
'       <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
'         <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
'         <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
'         <Link href="/calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Calculator</Link>
'         <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
'         <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Liens</span>
'       </div>
'     </nav>

'     {/* Main Content */}
'     <div style={{ background: 'var(--color-surface-1)', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
'       <div style={{ maxWidth: 900, margin: '0 auto' }}>
'         <LienCalculator />
'       </div>
'     </div>
'   </>
' );
}
