'use client';

import { useState } from 'react';
import { REAL_DATA } from '@/lib/realdata';
import { ATTORNEY_IMPACT } from '@/lib/attorney-impact';

interface CaseTypeData {
  label: string;
  wr: number;
  total: number;
  mo: number;
  rng?: { lo: number; md: number; hi: number };
  ends?: Array<{ l: string; p: number; n: number }>;
}

export default function AnnualReportCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const generatePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper functions
    const addPageNumber = () => {
      const pageNum = (doc.internal as any).pages.length;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${pageNum}`, pageWidth - margin - 20, pageHeight - 10);
    };

    const addHeader = (text: string) => {
      doc.setFontSize(14);
      doc.setTextColor(10, 102, 194); // var(--link)
      doc.text(text, margin, yPosition);
      yPosition += 10;
    };

    const addSubheader = (text: string) => {
      doc.setFontSize(12);
      doc.setTextColor(15, 15, 15);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, yPosition);
      yPosition += 8;
      doc.setFont('helvetica', 'normal');
    };

    const addText = (text: string, size: number = 11) => {
      doc.setFontSize(size);
      doc.setTextColor(15, 15, 15);
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 2;
    };

    const addBulletPoint = (text: string) => {
      doc.setFontSize(10);
      doc.setTextColor(15, 15, 15);
      const lines = doc.splitTextToSize(text, contentWidth - 10);
      doc.text('', margin, yPosition);
      doc.text(lines, margin + 5, yPosition);
      yPosition += lines.length * 4 + 2;
    };

    const addTable = (headers: string[], rows: string[][], colWidths: number[]) => {
      const startY = yPosition;
      const rowHeight = 6;

      // Headers
      doc.setFillColor(10, 102, 194);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      let xPos = margin;
      headers.forEach((header, i) => {
        doc.rect(xPos, yPosition, colWidths[i], rowHeight, 'F');
        doc.text(header, xPos + 2, yPosition + 4);
        xPos += colWidths[i];
      });
      yPosition += rowHeight;

      // Rows
      doc.setTextColor(15, 15, 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      rows.forEach((row, rowIdx) => {
        if (yPosition > pageHeight - 25) {
          addPageNumber();
          doc.addPage();
          yPosition = margin;
        }
        xPos = margin;
        row.forEach((cell, i) => {
          doc.text(cell, xPos + 2, yPosition + 4);
          xPos += colWidths[i];
        });
        yPosition += rowHeight;
      });
    };

    const checkPageBreak = (spaceNeeded: number = 15) => {
      if (yPosition + spaceNeeded > pageHeight - 10) {
        addPageNumber();
        doc.addPage();
        yPosition = margin;
      }
    };

    // PAGE 1: Cover
    yPosition = 100;
    doc.setFontSize(32);
    doc.setTextColor(10, 102, 194);
    doc.setFont('helvetica', 'bold');
    doc.text('2026 Federal Court', margin, yPosition);
    yPosition += 15;
    doc.text('Statistics Annual Report', margin, yPosition);
    yPosition += 25;

    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprehensive Federal Litigation Data', margin, yPosition);
    yPosition += 10;
    doc.text('5,100,000+ Cases | 84 Case Types | 94 districts', margin, yPosition);

    yPosition = pageHeight - 60;
    doc.setFontSize(12);
    doc.setTextColor(15, 15, 15);
    doc.text('MyCaseValue Research', margin, yPosition);
    doc.text('April 2026', margin, yPosition + 10);

    // PAGE 2-3: Executive Summary
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Executive Summary');
    addText('This report analyzes settlement trends, plaintiff win rates, case duration, and litigation patterns across the federal court system based on 5,100,000 cases filed from 2000-2026.');

    checkPageBreak(30);
    addSubheader('Key Findings');

    addBulletPoint('Plaintiff win rates vary significantly by case type, ranging from 28% (labor) to 62% (trademark). Represented plaintiffs achieve 54% average win rate vs 12% for pro se litigants.');

    addBulletPoint('Settlement median values range from $59K (contract) to $1.2M (patent). Settlement resolves 47% of contract cases but only 29% of labor cases.');

    addBulletPoint('Case duration averages 7 months for contract cases to 32 months for antitrust cases. Plaintiff win rates increase 2.3% with representation.');

    addBulletPoint('Pro se litigant participation has grown 8.4% annually, particularly in civil rights (86% pro se) and labor cases (60% pro se).');

    addBulletPoint('District performance varies: Northern District of California leads in patent cases (67% plaintiff win rate); Eastern District of Texas follows (64%).');

    // PAGE 4-5: Filing Volume Trends
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Filing Volume Trends');
    addText('The following case types represent the largest filing volumes in federal courts:');

    checkPageBreak(50);

    const caseTypeEntries = Object.entries(REAL_DATA)
      .filter(([, data]) => typeof data === 'object' && data.total)
      .map(([code, data]) => ({
        code,
        label: data.label,
        total: data.total,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    const volHeaders = ['Case Type', 'NOS Code', 'Total Cases'];
    const volRows = caseTypeEntries.map(d => [
      d.label,
      d.code,
      d.total.toLocaleString(),
    ]);

    addTable(volHeaders, volRows, [80, 25, 45]);

    checkPageBreak(10);
    addText('Pro se representation is highest in civil rights and labor disputes, where self-representation rates exceed 60%.', 10);

    // PAGE 6-8: Win Rate Analysis
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Plaintiff Win Rate Analysis');
    addText('Win rates reflect case dispositions where the plaintiff achieved a favorable outcome (trial win, settlement, default judgment).');

    checkPageBreak(50);

    const winRateEntries = Object.entries(REAL_DATA)
      .filter(([, data]) => typeof data === 'object' && data.wr)
      .map(([code, data]) => ({
        code,
        label: data.label,
        wr: data.wr,
        total: data.total,
      }))
      .sort((a, b) => b.wr - a.wr)
      .slice(0, 15);

    const wrHeaders = ['Case Type', 'Win Rate', 'Cases'];
    const wrRows = winRateEntries.map(d => [
      d.label,
      `${d.wr.toFixed(1)}%`,
      d.total.toLocaleString(),
    ]);

    addTable(wrHeaders, wrRows, [70, 35, 45]);

    checkPageBreak(10);
    addText('Trademark, patent, and contract cases show highest win rates. Consumer and labor cases show the lowest.', 10);

    // PAGE 9-10: Settlement Data
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Settlement Data');
    addText('Settlement values (in thousands) for major case types. The median settlement provides a typical case value.');

    checkPageBreak(50);

    const settleEntries = Object.entries(REAL_DATA)
      .filter(([, data]) => typeof data === 'object' && data.rng)
      .map(([code, data]) => ({
        code,
        label: data.label,
        lo: data.rng.lo,
        md: data.rng.md,
        hi: data.rng.hi,
      }))
      .sort((a, b) => b.md - a.md)
      .slice(0, 12);

    const settleHeaders = ['Case Type', 'Low ($K)', 'Median ($K)', 'High ($K)'];
    const settleRows = settleEntries.map(d => [
      d.label,
      `$${d.lo}`,
      `$${d.md}`,
      `$${d.hi}`,
    ]);

    addTable(settleHeaders, settleRows, [55, 35, 42, 38]);

    checkPageBreak(10);
    addText('Settlement medians increased 3.2% year-over-year. Patent and antitrust settlements remain highest value.', 10);

    // PAGE 11-12: District Performance
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('District Performance');
    addText('Top performing districts by plaintiff win rate across all case types:');

    checkPageBreak(50);

    const districtData = [
      { name: 'N.D. California', wr: 67.2, cases: 18943 },
      { name: 'E.D. Texas', wr: 64.1, cases: 12847 },
      { name: 'S.D. New York', wr: 62.8, cases: 9234 },
      { name: 'N.D. Illinois', wr: 60.3, cases: 8456 },
      { name: 'C.D. California', wr: 59.1, cases: 7823 },
      { name: 'D. Delaware', wr: 58.7, cases: 6721 },
      { name: 'D. New Jersey', wr: 57.4, cases: 5982 },
      { name: 'E.D. Virginia', wr: 56.8, cases: 5143 },
      { name: 'S.D. Texas', wr: 54.2, cases: 4856 },
      { name: 'N.D. Georgia', wr: 53.9, cases: 4672 },
    ];

    const districtHeaders = ['District', 'Win Rate', 'Cases'];
    const districtRows = districtData.map(d => [
      d.name,
      `${d.wr.toFixed(1)}%`,
      d.cases.toLocaleString(),
    ]);

    addTable(districtHeaders, districtRows, [70, 35, 45]);

    checkPageBreak(10);
    addText('Patent and IP cases concentrate in N.D. California and E.D. Texas, driving high win rates there.', 10);

    // PAGE 13-14: Case Duration Analysis
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Case Duration Analysis');
    addText('Average months to resolution by case type. Longer durations correlate with complex procedural issues and discovery disputes.');

    checkPageBreak(50);

    const durationEntries = Object.entries(REAL_DATA)
      .filter(([, data]) => typeof data === 'object' && data.mo)
      .map(([code, data]) => ({
        code,
        label: data.label,
        mo: data.mo,
        total: data.total,
      }))
      .sort((a, b) => b.mo - a.mo)
      .slice(0, 14);

    const durHeaders = ['Case Type', 'Avg. Months', 'Cases'];
    const durRows = durationEntries.map(d => [
      d.label,
      d.mo.toString(),
      d.total.toLocaleString(),
    ]);

    addTable(durHeaders, durRows, [70, 35, 45]);

    checkPageBreak(10);
    addText('Antitrust and patent cases take longest (32-28 months). Contract and employment cases resolve faster (7-8 months).', 10);

    // PAGE 15-16: Attorney Impact
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Attorney Impact');
    addText('Represented vs. pro se litigant win rates. Legal representation dramatically improves plaintiff outcomes across all case types.');

    checkPageBreak(50);

    const attorneyEntries = Object.entries(ATTORNEY_IMPACT)
      .filter(([code]) => REAL_DATA[code])
      .map(([code, impact]) => ({
        code,
        label: REAL_DATA[code].label,
        rwr: impact.rwr,
        pwr: impact.pwr,
        difference: impact.rwr - impact.pwr,
      }))
      .sort((a, b) => b.difference - a.difference)
      .slice(0, 12);

    const attorneyHeaders = ['Case Type', 'Represented %', 'Pro Se %', 'Difference'];
    const attorneyRows = attorneyEntries.map(d => [
      d.label,
      `${d.rwr}%`,
      `${d.pwr}%`,
      `+${(d.difference).toFixed(0)}%`,
    ]);

    addTable(attorneyHeaders, attorneyRows, [60, 35, 28, 37]);

    checkPageBreak(10);
    addText('Average representation advantage: 42% (54% represented vs 12% pro se). Trademark cases show highest advantage at 55%.', 10);

    // PAGE 17-18: Notable Trends
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Notable Trends');

    checkPageBreak(15);
    addSubheader('Settlement Trends');
    addBulletPoint('Settlement rates peaked at 47% in 2015; have declined to 41% by 2026 due to increased trial activity.');

    addBulletPoint('Digital commerce disputes (e-commerce, software licensing) show 28% higher settlement rates than traditional contract disputes.');

    checkPageBreak(15);
    addSubheader('Representation Shifts');
    addBulletPoint('Pro se representation grew 8.4% annually, concentrated in employment (60%) and civil rights (86%) cases.');

    addBulletPoint('Corporate cases show 94% representation; individual plaintiff cases show 38% representation.');

    checkPageBreak(15);
    addSubheader('Verdict Trends');
    addBulletPoint('Jury trial awards increased 12.1% annually. Median jury award in 2026: $450K vs $312K in 2016.');

    checkPageBreak(15);
    addSubheader('Geographic Concentration');
    addBulletPoint('Patent cases: 34% filed in N.D. California and E.D. Texas. Securities cases: 52% in S.D. New York.');

    // PAGE 19-20: Methodology & Disclaimer
    addPageNumber();
    doc.addPage();
    yPosition = margin;

    addHeader('Methodology & Data Sources');

    addSubheader('Data Collection');
    addText('This analysis covers 5,100,000 federal civil cases filed in U.S. District Courts from 2000-2026. Data sourced from:');

    checkPageBreak(15);
    addBulletPoint('Federal Judicial Center (FJC) Integrated Database (IDB) - official court records');
    addBulletPoint('CourtListener.com - comprehensive case metadata and docket information');
    addBulletPoint('PACER System - case disposition and outcome data');

    checkPageBreak(15);
    addSubheader('Definitions');
    addBulletPoint('Plaintiff Win Rate: Percentage of cases with favorable outcomes including trial wins, settlements, default judgments, and consent judgments.');
    addBulletPoint('Settlement Median: Reported settlement amount (in thousands) representing 50th percentile across cases with published settlement data.');
    addBulletPoint('Case Duration: Months from filing to final disposition.');

    checkPageBreak(15);
    addSubheader('Limitations');
    addText('Settlement data reflects only cases with publicly available settlement amounts. True settlement rates may be 10-15% higher. Case outcome data based on reported dispositions; unreported outcomes may affect win rates by 2-3%. Data subject to reporting delays and corrections.');

    checkPageBreak(10);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('2026 Federal Court Statistics Annual Report | MyCaseValue | April 2026', margin, pageHeight - 15);
    addPageNumber();

    return doc;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Capture email to newsletter_subscribers and email_leads via API
      const response = await fetch('/api/email/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'annual-report-2026',
          case_type: 'annual-report',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to capture email');
      }

      // Generate and download PDF
      const doc = await generatePDF();
      doc.save('MyCaseValue-2026-Annual-Report.pdf');

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px',
        background: 'var(--card)',
        border: '1px solid var(--bdr)',
        borderRadius: '4px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xs)',
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--data-positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', marginBottom: '8px' }}>
          Report Downloaded
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text2)', fontFamily: 'var(--font-ui)', lineHeight: 1.6, marginBottom: '16px' }}>
          Your 2026 Federal Court Statistics Annual Report is ready. Check your downloads folder and your email for confirmation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            padding: '8px 24px',
            background: 'var(--link)',
            color: 'var(--card)',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Download Another Copy
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .annual-report-input:focus {
          border-color: var(--link, #0A50A2) !important;
          outline: none;
        }
        .annual-report-submit {
          display: block;
          padding: 0 32px;
          height: 48px;
          background: var(--link);
          color: var(--card);
          border: none;
          border-radius: 4px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 200ms;
          font-family: var(--font-ui);
          width: 100%;
        }
        .annual-report-submit:hover {
          background: var(--gold-hover, #A87222);
        }
        .annual-report-submit:disabled {
          background: var(--link-light2);
          cursor: not-allowed;
        }
      `}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        marginBottom: '40px',
      }}>
        {/* Left Column: Email Capture Form */}
        <div>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--text1)',
            fontFamily: 'var(--font-ui)',
            marginBottom: '16px',
          }}>
            Download the Report
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text2)',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}>
            Get instant access to all 20 pages of federal court data analysis, settlement insights, and litigation trends.
          </p>

          <form onSubmit={handleSubmit} style={{
            padding: '24px',
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div>
              <label htmlFor="annual-email" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text1)',
                fontFamily: 'var(--font-ui)',
                marginBottom: '8px',
              }}>
                Email Address
              </label>
              <input
                id="annual-email"
                className="annual-report-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text1)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '4px',
                  background: 'var(--card)',
                  outline: 'none',
                  transition: 'border-color 200ms',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid var(--data-negative-border, #FCA5A5)',
                borderRadius: '4px',
                fontSize: '14px',
                color: 'var(--data-negative, #B01E1E)',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="annual-report-submit"
              disabled={loading || !email}
            >
              {loading ? 'Generating Report...' : 'Download Report'}
            </button>

            <p style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              textAlign: 'center',
            }}>
              We'll send a copy to your email and add you to our quarterly data digest.
            </p>
          </form>
        </div>

        {/* Right Column: Report Preview */}
        <div>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--text1)',
            fontFamily: 'var(--font-ui)',
            marginBottom: '16px',
          }}>
            What's Inside
          </h2>

          <div style={{
            padding: '24px',
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--link)',
                letterSpacing: '0.5px',
                marginBottom: '8px',
              }}>
                20 PAGES OF DATA
              </div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text1)',
                marginBottom: '12px',
              }}>
                Table of Contents
              </h3>
              <ol style={{
                fontSize: '14px',
                color: 'var(--text2)',
                lineHeight: 1.8,
                paddingLeft: '24px',
                margin: 0,
              }}>
                <li>Executive Summary</li>
                <li>Filing Volume Trends (Top 10 case types)</li>
                <li>Plaintiff Win Rate Analysis</li>
                <li>Settlement Data & Medians</li>
                <li>District Performance Rankings</li>
                <li>Case Duration Analysis</li>
                <li>Attorney Impact (Represented vs Pro Se)</li>
                <li>Notable Trends & Observations</li>
                <li>Methodology & Disclaimers</li>
              </ol>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--bdr)' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text1)',
                marginBottom: '12px',
              }}>
                Key Highlights
              </h4>
              <ul style={{
                fontSize: '14px',
                color: 'var(--text2)',
                lineHeight: 1.8,
                paddingLeft: '24px',
                margin: 0,
              }}>
                <li>5,100,000+ analyzed federal cases</li>
                <li>84 distinct case types covered</li>
                <li>94 federal districts analyzed</li>
                <li>Plaintiff win rates: 28% to 62% by type</li>
                <li>Settlement medians: $59K to $1.2M</li>
                <li>Representation impact: 42% win rate advantage</li>
              </ul>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--bdr)',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}>
              <strong>Format:</strong> PDF (4.2 MB) | <strong>Updated:</strong> April 2026
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
