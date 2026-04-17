import { Metadata } from 'next';
import Link from 'next/link';
import { BulkAnalysisTool } from '@/components/BulkAnalysisTool';

export const metadata: Metadata = {
  title: 'Bulk Case Analysis',
  description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
};

export default function BulkAnalysisPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)', fontFamily: 'var(--font-ui)' }}>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
            }}
          >
            Analyze Your Portfolio in Minutes
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
            Upload your case data for instant risk assessment, outcome trends, and portfolio insights across all your matters.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <BulkAnalysisTool />
      </div>
    </div>
  );
}
