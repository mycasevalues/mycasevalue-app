import { Metadata } from 'next';
import Link from 'next/link';
import { BulkAnalysisTool } from '@/components/BulkAnalysisTool';

export const metadata: Metadata = {
  title: 'Bulk Case Analysis',
  description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
};

export default function BulkAnalysisPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <div style={{ background: 'var(--gradient-hero)', padding: '18px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px',
              fontWeight: 600,
              color: 'var(--color-surface-0)',
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <BulkAnalysisTool />
      </div>
    </div>
  );
}
