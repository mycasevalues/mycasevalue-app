import'{ Metadata } from 'next';
import'Link from 'next/link';
import'dynamic from 'next/dynamic';

const'AnnualReportCapture = dynamic(() => import('@/components/AnnualReportCapture'), {
' ssr: false,
' loading: () => (
'   <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
'     Loading PDF generator…
'   </div>
' ),
});

export'const metadata: Metadata = {
' title: '2026 Federal Court Statistics Annual Report',
' description: 'Comprehensive federal court statistics, settlement data, plaintiff win rates, and litigation trends for 2026. Download our data-driven annual report.',
};

export'default function AnnualReportPage() {
' return (
'   <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
'     {/* Dark Navy Hero Header */}
'     <div style={{
'       backgroundColor: 'var(--accent-primary)',
'       padding: '40px 20px',
'       color: 'var(--color-surface-0)',
'       borderBottom: '4px solid var(--accent-primary)',
'     }}>
'       <div style={{ maxWidth: '900px', margin: '0 auto' }}>
'         <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#A0C7E8', letterSpacing: '0.5px' }}>
'           FEDERAL COURT DATA REPORT
'         </div>
'         <h1 style={{
'           fontSize: '26px',
'           fontWeight: 700,
'           fontFamily: 'var(--font-display)',
'           marginBottom: '16px',
'           lineHeight: 1.2,
'         }}>
'           2026 Federal Court Statistics Annual Report
'         </h1>
'         <p style={{
'           fontSize: '18px',
'           color: '#D0E0F0',
'           lineHeight: 1.6,
'           maxWidth: '600px',
'         }}>
'           Analyze settlement trends, case outcome rates, case duration, and litigation patterns across federal courts. 20 pages of data-driven insights from 5.1M+ cases.
'         </p>
'       </div>
'     </div>

'     {/* Main Content */}
'     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
'       {/* Email Capture & Download Section */}
'       <AnnualReportCapture />
'     </div>
'   </div>
' );
}
