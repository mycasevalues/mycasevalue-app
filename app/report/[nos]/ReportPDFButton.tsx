'use client';

import { useState } from 'react';

interface ReportPDFButtonProps {
  category: string;
  district: string;
  winRate: number;
  settlementMedian: number;
  timeline: number;
  tier: string;
  totalCases?: number;
  settleRate?: number;
  dismissRate?: number;
}

export default function ReportPDFButton(props: ReportPDFButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const { generateReportPDF } = await import('../../../lib/generatePDF');
      const doc = await generateReportPDF(props);
      const filename = `MyCaseValue-${props.category.replace(/[^a-zA-Z0-9]/g, '-')}-Report.pdf`;
      doc.save(filename);
    } catch (err) {
      /* silent */
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 28px',
        background: 'var(--color-text-primary)',
        color: 'var(--color-surface-0)',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {loading ? 'Generating PDF...' : 'Download PDF Report'}
    </button>
  );
}
