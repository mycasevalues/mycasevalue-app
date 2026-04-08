import { Metadata } from 'next';
import Link from 'next/link';
import { BulkAnalysisTool } from '@/components/BulkAnalysisTool';

export const metadata: Metadata = {
  title: 'Bulk Case Analysis | MyCaseValue',
  description: 'Upload and analyze CSV files of multiple cases for portfolio risk assessment and outcome trends.',
};

export default function BulkAnalysisPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <div style={{ background: '#0966C3', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link
            href="/attorney"
            style={{
              fontSize: '13px',
              color: '#0966C3',
              textDecoration: 'none',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '16px',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Home &gt; Attorney Tools &gt; Bulk Case Analysis
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(232,23,31,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0966C3"
                strokeWidth="2"
              >
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Bulk Case Analysis
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0 0' }}>
                Upload a CSV file to analyze multiple cases and discover portfolio patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <BulkAnalysisTool />
      </div>
    </div>
  );
}
