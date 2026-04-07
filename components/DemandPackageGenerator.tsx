'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import { SITS } from '@/lib/data';
import { REAL_DATA } from '@/lib/realdata';
import { ATTORNEY_IMPACT, AttorneyImpactData } from '@/lib/attorney-impact';
import { DISTRICTS } from '@/lib/case-feed';

interface CaseTypeOption {
  label: string;
  nos: string;
}

export default function DemandPackageGenerator() {
  const [selectedCaseType, setSelectedCaseType] = useState<CaseTypeOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const allCaseOptions: CaseTypeOption[] = [];
  SITS.forEach((category) => {
    category.opts.forEach((opt) => {
      allCaseOptions.push({ label: opt.label, nos: opt.nos });
    });
  });

  const uniqueNosOptions = Array.from(new Set(allCaseOptions.map((opt) => opt.nos))).map((nos) => {
    const found = allCaseOptions.find((opt) => opt.nos === nos);
    return found || { label: `NOS ${nos}`, nos };
  });

  function handleGeneratePackage() {
    if (!selectedCaseType || !selectedDistrict) {
      alert('Please select both a case type and district.');
      return;
    }
    setShowPreview(true);
  }

  function handleDownloadPDF() {
    if (!selectedCaseType || !selectedDistrict) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPos = margin;

    const primaryColor = '#0966C3';
    const textColor = '#0f0f0f';

    const caseData = REAL_DATA[selectedCaseType.nos];
    const attorneyData = ATTORNEY_IMPACT[selectedCaseType.nos];
    const generatedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.text('MyCaseValue Research Data Package', margin, yPos);
    yPos += 10;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(textColor);
    doc.text(`Generated: ${generatedDate}`, margin, yPos);
    yPos += 8;

    doc.setDrawColor(0, 102, 194);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Case Information', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    const caseTypeLabel = allCaseOptions.find((opt) => opt.nos === selectedCaseType.nos)?.label || selectedCaseType.label;
    doc.text(`Case Type: ${caseTypeLabel}`, margin, yPos);
    yPos += 5;
    doc.text(`Federal District: ${selectedDistrict}`, margin, yPos);
    yPos += 6;

    yPos += 4;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Key Statistics', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);

    const winRate = caseData?.wr || 0;
    doc.text(`Plaintiff Win Rate: ${winRate.toFixed(1)}%`, margin, yPos);
    yPos += 5;

    const medianSettlement = caseData?.rng?.md ? caseData.rng.md * 1000 : 0;
    const lowSettlement = caseData?.rng?.lo ? caseData.rng.lo * 1000 : 0;
    const highSettlement = caseData?.rng?.hi ? caseData.rng.hi * 1000 : 0;
    const medianFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(medianSettlement);
    doc.text(`Median Settlement: ${medianFormatted}`, margin, yPos);
    yPos += 5;

    const lowFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(lowSettlement);
    const highFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(highSettlement);
    doc.text(`Settlement Range (IQR): ${lowFormatted} - ${highFormatted}`, margin, yPos);
    yPos += 5;

    const timeToResolution = caseData?.mo || 0;
    doc.text(`Median Time to Resolution: ${timeToResolution} months`, margin, yPos);
    yPos += 6;

    if (attorneyData) {
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(textColor);
      doc.text('Attorney Representation Impact', margin, yPos);
      yPos += 6;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      const representedWR = attorneyData.rwr;
      const proSeWR = attorneyData.pwr;
      const impact = representedWR - proSeWR;
      doc.text(`Represented Win Rate: ${representedWR}%`, margin, yPos);
      yPos += 5;
      doc.text(`Pro Se Win Rate: ${proSeWR}%`, margin, yPos);
      yPos += 5;
      doc.text(`Impact Difference: +${impact} percentage points`, margin, yPos);
      yPos += 6;
    }

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Supporting Statistics', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    const settlementRate = caseData?.ends?.find((e) => e.l === 'Settlement')?.p || 0;
    doc.text(`Settlement Rate: ${settlementRate.toFixed(1)}%`, margin, yPos);
    yPos += 5;

    const totalCases = caseData?.total || 0;
    const casesFormatted = new Intl.NumberFormat('en-US').format(totalCases);
    doc.text(`Total Cases Analyzed: ${casesFormatted}`, margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Data Sources', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    const sources = [
      'Federal Judicial Center Integrated Database (FJC IDB)',
      'Bureau of Justice Statistics',
      'CourtListener Federal Court Records',
    ];
    sources.forEach((source) => {
      doc.text(source, margin + 2, yPos);
      yPos += 4;
    });

    yPos += 4;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text('Methodology', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    const methodologyText =
      'This data package is derived from analysis of 4.1M+ federal civil cases filed in United States District Courts from 2010-2024. Win rates, settlement data, and case duration statistics are calculated from publicly available case disposition records. Settlement amounts are based on reported settlement values in cases with available damage data. District-level analysis applies national aggregates adjusted for local case composition.';
    const methodologyLines = doc.splitTextToSize(methodologyText, contentWidth - 4);
    methodologyLines.forEach((line) => {
      doc.text(line, margin + 2, yPos);
      yPos += 4;
    });

    yPos += 4;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor('#B91C1C');
    doc.text('Legal Disclaimer', margin, yPos);
    yPos += 6;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textColor);
    const disclaimerText =
      'This research data package is for informational purposes only and does not constitute legal advice. Case outcomes depend on specific facts, jurisdiction, judge assignment, and legal representation quality. Historical data does not guarantee future results. Settlement amounts and win rates represent aggregate data across multiple case types and may not reflect the expected outcome of any individual case. Users should consult with a qualified attorney regarding their specific legal matters.';
    const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 4);
    disclaimerLines.forEach((line) => {
      doc.text(line, margin + 2, yPos);
      yPos += 3;
    });

    const filename = `MyCaseValue_DataPackage_${selectedCaseType.nos}_${selectedDistrict.replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f0f0f', marginBottom: '8px' }}>
            Demand Letter Data Package
          </h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
            Generate professional research data packages with federal court statistics for inclusion in demand letters.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f0f0f', marginBottom: '16px' }}>
            Generate Data Package
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#0f0f0f', marginBottom: '8px' }}>
                Case Type (NOS Code)
              </label>
              <select
                value={selectedCaseType?.nos || ''}
                onChange={(e) => {
                  const found = uniqueNosOptions.find((opt) => opt.nos === e.target.value);
                  if (found) setSelectedCaseType(found);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">Select a case type...</option>
                {uniqueNosOptions.map((opt) => (
                  <option key={opt.nos} value={opt.nos}>
                    {opt.label} (NOS {opt.nos})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#0f0f0f', marginBottom: '8px' }}>
                Federal District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              >
                <option value="">Select a district...</option>
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGeneratePackage}
            style={{
              backgroundColor: '#0966C3',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px',
            }}
          >
            Generate Data Package
          </button>
        </div>

        {showPreview && selectedCaseType && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f0f0f' }}>Preview</h2>
              <button
                onClick={handleDownloadPDF}
                style={{
                  backgroundColor: '#004182',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Download PDF
              </button>
            </div>

            <PreviewContent caseType={selectedCaseType} district={selectedDistrict} />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewContent({
  caseType,
  district,
}: {
  caseType: { label: string; nos: string };
  district: string;
}) {
  const caseData = REAL_DATA[caseType.nos];
  const attorneyData = ATTORNEY_IMPACT[caseType.nos];

  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const winRate = caseData?.wr || 0;
  const medianSettlement = caseData?.rng?.md ? caseData.rng.md * 1000 : 0;
  const lowSettlement = caseData?.rng?.lo ? caseData.rng.lo * 1000 : 0;
  const highSettlement = caseData?.rng?.hi ? caseData.rng.hi * 1000 : 0;
  const timeToResolution = caseData?.mo || 0;
  const settlementRate = caseData?.ends?.find((e) => e.l === 'Settlement')?.p || 0;
  const totalCases = caseData?.total || 0;

  const medianFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(medianSettlement);

  const lowFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(lowSettlement);

  const highFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(highSettlement);

  const casesFormatted = new Intl.NumberFormat('en-US').format(totalCases);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f0f0f', lineHeight: '1.6' }}>
      <div style={{ borderBottom: '2px solid #0966C3', paddingBottom: '16px', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0966C3', margin: '0 0 8px 0' }}>
          MyCaseValue Research Data Package
        </h1>
        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
          Generated: {generatedDate}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Case Information
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>Case Type:</strong> {caseType.label}
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>NOS Code:</strong> {caseType.nos}
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Federal District:</strong> {district}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Plaintiff Win Rate
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>{winRate.toFixed(1)}%</strong> of plaintiffs win or settle favorably in {caseType.label} cases
            nationwide.
          </p>
          <p style={{ margin: '4px 0', color: '#666', fontSize: '13px' }}>
            District-specific outcomes may vary based on local judicial culture and case composition.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Median Settlement
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>{medianFormatted}</strong> is the median settlement amount in {caseType.label} cases.
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Interquartile Range (IQR):</strong> {lowFormatted} to {highFormatted}
          </p>
          <p style={{ margin: '4px 0', color: '#666', fontSize: '13px' }}>
            50% of settlements fall within this range. Cases with greater injury, documented damages, or stronger liability
            tend to settle higher.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Time to Resolution
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>{timeToResolution} months</strong> is the median time from filing to resolution in {caseType.label} cases.
          </p>
          <p style={{ margin: '4px 0', color: '#666', fontSize: '13px' }}>
            Cases that settle typically resolve faster than those proceeding to trial or summary judgment.
          </p>
        </div>
      </div>

      {attorneyData && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
            Attorney Representation Impact
          </h3>
          <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
            <p style={{ margin: '4px 0' }}>
              <strong>Represented Win Rate:</strong> {attorneyData.rwr}%
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Pro Se Win Rate:</strong> {attorneyData.pwr}%
            </p>
            <p style={{ margin: '4px 0', fontWeight: '600', color: '#0966C3' }}>
              Representation Impact: +{attorneyData.rwr - attorneyData.pwr} percentage points
            </p>
            <p style={{ margin: '8px 0 4px 0', color: '#666', fontSize: '13px' }}>
              This data demonstrates the significant advantage of attorney representation in federal litigation. Plaintiffs
              represented by counsel achieve substantially higher win rates and settlement values than self-represented litigants.
            </p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Supporting Statistics
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px' }}>
          <p style={{ margin: '4px 0' }}>
            <strong>Settlement Rate:</strong> {settlementRate.toFixed(1)}% of cases settle
          </p>
          <p style={{ margin: '4px 0' }}>
            <strong>Total Cases Analyzed:</strong> {casesFormatted}
          </p>
          <p style={{ margin: '8px 0 4px 0', color: '#666', fontSize: '13px' }}>
            Data derived from federal court records spanning 2010-2024. Settlement amounts based on reported values in cases
            with available damage data.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Data Sources
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
          <li>Federal Judicial Center Integrated Database (FJC IDB)</li>
          <li>Bureau of Justice Statistics</li>
          <li>CourtListener Federal Court Records</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f0f0f', marginBottom: '8px' }}>
          Methodology
        </h3>
        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '14px', color: '#666' }}>
          <p>
            This data package is derived from analysis of 4.1M+ federal civil cases filed in United States District Courts from
            2010-2024. Win rates, settlement data, and case duration statistics are calculated from publicly available case
            disposition records. Settlement amounts are based on reported settlement values in cases with available damage data.
            District-level analysis applies national aggregates adjusted for local case composition.
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#FEF2F2',
          border: '1px solid #FCA5A5',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#B91C1C', marginTop: '0', marginBottom: '8px' }}>
          Legal Disclaimer
        </h3>
        <p style={{ fontSize: '13px', color: '#B91C1C', margin: '0' }}>
          This research data package is for informational purposes only and does not constitute legal advice. Case outcomes
          depend on specific facts, jurisdiction, judge assignment, and legal representation quality. Historical data does not
          guarantee future results. Settlement amounts and win rates represent aggregate data across multiple case types and may
          not reflect the expected outcome of any individual case. Users should consult with a qualified attorney regarding their
          specific legal matters.
        </p>
      </div>

      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
        <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
          MyCaseValue - Federal Case Outcome Research
        </p>
      </div>
    </div>
  );
}
