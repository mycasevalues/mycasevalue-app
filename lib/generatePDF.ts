/**
 * MyCaseValue — PDF Report Generator
 * Uses jsPDF to create branded case reports for premium users.
 */

export interface ReportPDFData {
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

export async function generateReportPDF(data: ReportPDFData) {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();

    // Brand colors: #1B3A5C (navy), #004182 (red), #212529 (headings), #4B5563 (body)
    // ─── Header bar ──────────────────────────────────────
    doc.setFillColor(0, 23, 46); // #1B3A5C dark navy
    doc.rect(0, 0, w, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('MyCaseValue', 15, 10);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Federal Court Outcome Report', 15, 17);
    doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), w - 15, 17, { align: 'right' });

    // ─── Title ───────────────────────────────────────────
    doc.setTextColor(33, 37, 41); // #212529
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(`${data.category} Cases`, 15, 40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(69, 90, 100); // #4B5563
    doc.text(`${data.district} · Based on ${data.totalCases ? data.totalCases.toLocaleString() : 'thousands of'} federal cases`, 15, 48);

    // ─── Stats boxes ─────────────────────────────────────
    const stats = [
      { label: 'Plaintiff win rate', value: `${data.winRate}%` },
      { label: 'Settlement rate', value: data.settleRate !== undefined ? `${data.settleRate}%` : 'N/A' },
      { label: 'Dismissal rate', value: data.dismissRate !== undefined ? `${data.dismissRate}%` : 'N/A' },
      { label: 'Median timeline', value: `${data.timeline} mo` },
    ];

    doc.setFillColor(248, 249, 250); // #F8F9FA
    stats.forEach((s, i) => {
      const x = 15 + (i % 2) * 90;
      const y = 60 + Math.floor(i / 2) * 30;
      doc.rect(x, y, 85, 25, 'F');
      doc.setFontSize(9);
      doc.setTextColor(69, 90, 100); // #4B5563
      doc.setFont('helvetica', 'normal');
      doc.text(s.label, x + 5, y + 9);
      doc.setFontSize(16);
      doc.setTextColor(232, 23, 31); // #004182 brand red
      doc.setFont('helvetica', 'bold');
      doc.text(s.value, x + 5, y + 20);
    });

    // ─── Settlement line ─────────────────────────────────
    if (data.settlementMedian > 0) {
      doc.setTextColor(33, 37, 41); // #212529
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Median Settlement', 15, 132);
      doc.setFontSize(16);
      doc.setTextColor(232, 23, 31); // #004182
      doc.text(`$${data.settlementMedian.toLocaleString()}K`, 70, 132);
    }

    // ─── Disclaimer ──────────────────────────────────────
    const disclaimer = 'This report contains aggregate historical data from public federal court records (FJC IDB, PACER, CourtListener). Not legal advice. Individual case outcomes vary. Always consult a licensed attorney. \u00A9 2026 MyCaseValue LLC.';
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(disclaimer, w - 30);
    doc.text(lines, 15, 270);

    // ─── Footer line ─────────────────────────────────────
    doc.setDrawColor(0, 23, 46); // #1B3A5C
    doc.line(15, 265, w - 15, 265);
    doc.setTextColor(232, 23, 31); // #004182
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('mycasevalues.com', w / 2, 268, { align: 'center' });

    return doc;
  } catch (err) {
    console.error('[generatePDF] Failed to generate report:', err instanceof Error ? err.message : err);
    throw new Error('PDF generation failed. Please try again or contact support.');
  }
}
