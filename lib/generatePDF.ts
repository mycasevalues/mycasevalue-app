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
}

export async function generateReportPDF(data: ReportPDFData) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  // ─── Header ──────────────────────────────────────────
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('MyCaseValue', 20, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Federal Court Outcome Report', 20, 28);

  doc.setFontSize(9);
  doc.text(`Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, 35);

  // ─── Case Info ───────────────────────────────────────
  doc.setTextColor(17, 17, 17);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(data.category, 20, 56);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`District: ${data.district}`, 20, 64);
  doc.text(`Tier: ${data.tier.charAt(0).toUpperCase() + data.tier.slice(1)}`, 20, 71);

  // ─── Divider ─────────────────────────────────────────
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 78, 190, 78);

  // ─── Key Statistics ──────────────────────────────────
  doc.setTextColor(17, 17, 17);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Statistics', 20, 90);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const stats = [
    { label: 'Plaintiff Win Rate', value: `${data.winRate}%` },
    { label: 'Median Settlement', value: data.settlementMedian > 0 ? `$${data.settlementMedian.toLocaleString()}K` : 'N/A' },
    { label: 'Typical Timeline', value: `${data.timeline} months` },
  ];

  let y = 100;
  for (const stat of stats) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(67, 56, 202); // accent color
    doc.text(stat.value, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(stat.label, 70, y);
    y += 10;
  }

  // ─── Disclaimer ──────────────────────────────────────
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 260, 190, 260);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Not legal advice. MyCaseValue provides aggregate public federal court data for informational purposes only.',
    20,
    268,
    { maxWidth: 170 }
  );
  doc.text(
    `© ${new Date().getFullYear()} MyCaseValue LLC. All rights reserved.`,
    20,
    276
  );

  return doc;
}
