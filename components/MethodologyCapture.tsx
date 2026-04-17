'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

interface FormData {
  email: string;
  organization: string;
  fullName: string;
}

interface FormErrors {
  email?: string;
  organization?: string;
  fullName?: string;
}

export default function MethodologyCapture() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    organization: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePDF = (): jsPDF => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Define fonts and colors
    const colors = {
      primary: [10, 102, 194], // var(--accent-primary)
      darkBlue: [8, 61, 122], // #083D7A (Westlaw link-hover)
      black: [15, 15, 15], // var(--color-text-primary)
      darkGray: [75, 85, 99], // var(--color-text-secondary)
      lightGray: [229, 231, 235], // var(--border-default)
    };

    let currentPage = 1;

    const addHeader = () => {
      doc.setFontSize(10);
      doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
      doc.text(`Data Methodology Whitepaper v1.0`, margin, pageHeight - 10);
      doc.text(`Page ${currentPage}`, pageWidth - margin - 20, pageHeight - 10);
    };

    const addPage = () => {
      if (currentPage > 1) {
        doc.addPage();
      }
      currentPage += 1;
      addHeader();
    };

    const addTitle = (text: string, y: number) => {
      doc.setFontSize(24);
      doc.setTextColor(colors.darkBlue[0], colors.darkBlue[1], colors.darkBlue[2]);
      doc.setFont(undefined, 'bold');
      const titleHeight = doc.getTextDimensions(text, { maxWidth: contentWidth }).h;
      doc.text(text, margin, y, { maxWidth: contentWidth });
      return y + titleHeight + 10;
    };

    const addSectionTitle = (text: string, y: number) => {
      doc.setFontSize(14);
      doc.setTextColor(colors.darkBlue[0], colors.darkBlue[1], colors.darkBlue[2]);
      doc.setFont(undefined, 'bold');
      doc.text(text, margin, y);
      return y + 10;
    };

    const addSubtitle = (text: string, y: number) => {
      doc.setFontSize(12);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'bold');
      doc.text(text, margin, y);
      return y + 8;
    };

    const addBody = (text: string, y: number, maxWidth = contentWidth) => {
      doc.setFontSize(11);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(text, maxWidth);
      const textHeight = lines.length * 5;
      if (y + textHeight > pageHeight - 20) {
        addPage();
        return addBody(text, margin + 10, maxWidth);
      }
      doc.text(lines, margin, y);
      return y + textHeight + 8;
    };

    // PAGE 1: Title Page
    addPage();
    let y = 60;
    y = addTitle('Data Methodology and Statistical Framework', y);

    y += 20;
    doc.setFontSize(13);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFont(undefined, 'bold');
    doc.text('MyCaseValue Research', margin, y);

    y += 15;
    doc.setFontSize(11);
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.setFont(undefined, 'normal');
    doc.text('Federal Court Case Analysis', margin, y);

    y += 10;
    doc.text('Version 1.0', margin, y);

    y += 10;
    doc.text('2026', margin, y);

    y = pageHeight - 50;
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.text('This whitepaper documents the comprehensive methodology employed in analyzing federal court case data,', margin, y, { maxWidth: contentWidth });
    y += 6;
    doc.text('including data sources, classification approaches, outcome coding, and statistical confidence scoring.', margin, y, { maxWidth: contentWidth });

    // PAGE 2: Abstract
    addPage();
    y = margin + 10;
    y = addSectionTitle('Abstract', y);
    y += 5;

    const abstractText = `This whitepaper presents the technical methodology underlying MyCaseValue research. We aggregate federal court case data from the Federal Judicial Center Integrated Database, CourtListener, Bureau of Justice Statistics, and Administrative Office records spanning over five decades. Our framework classifies cases using Nature of Suit codes, maps outcomes from disposition codes, and calculates settlement ranges using percentile analysis with inflation adjustment. Confidence scoring incorporates sample size thresholds and statistical significance testing. Data refresh cycles maintain quality through validation checks occurring quarterly. The system acknowledges known limitations including reporting gaps, temporal variations, and selection bias inherent to federal court populations. This document serves as the authoritative reference for methodology and is suitable for academic citation and professional analysis.`;

    y = addBody(abstractText, y);

    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(colors.darkGray[0], colors.darkGray[1], colors.darkGray[2]);
    doc.setFont(undefined, 'bold');
    doc.text('Keywords:', margin, y);
    y += 6;
    doc.setFont(undefined, 'normal');
    doc.text('federal court data, case outcomes, litigation statistics, statistical methodology, legal research', margin, y, { maxWidth: contentWidth });

    // PAGE 3-4: Data Sources
    addPage();
    y = margin + 10;
    y = addSectionTitle('Data Sources and Coverage', y);
    y += 8;

    // FJC Integrated Database
    y = addSubtitle('Federal Judicial Center Integrated Database', y);
    const fjcContent = `Coverage: All federal civil cases filed since 1970 in district courts. Currently includes over 30 million case records. Fields utilized include case number, filing date, disposition date, Nature of Suit code, disposition type, outcome category, amount in controversy, and plaintiff/defendant information. Updated quarterly with rolling publication lag of 3-6 months. Limitations include missing monetary amounts in approximately 12% of settled cases, inconsistent coding in nature of suit for complex multi-claim litigation, and historical data quality variations.`;
    y = addBody(fjcContent, y);

    y += 8;
    // CourtListener
    y = addSubtitle('CourtListener Opinion Corpus', y);
    const courListenerContent = `Coverage: Full-text opinions from federal district and appellate courts since 1923, with comprehensive coverage from 1970 forward. Approximately 10 million docketable documents indexed. API access enables querying by jurisdiction, decision date, judge, and legal topics. Limitations include variable publication delays, non-standard formatting across courts, and incomplete coverage of unpublished decisions.`;
    y = addBody(courListenerContent, y);

    y += 8;
    // BJS
    y = addSubtitle('Bureau of Justice Statistics', y);
    const bjsContent = `Coverage: Supplementary data on civil bench and jury trial statistics collected directly from federal courts. Annual publication of aggregate trial statistics. Particularly valuable for outcome distribution validation and comparing jury versus bench trial outcomes. Limitations include aggregation to annual level preventing case-level analysis and published with significant temporal lag (18+ months).`;
    y = addBody(bjsContent, y);

    y += 8;
    // AOUSC
    y = addSubtitle('Administrative Office of the U.S. Courts', y);
    const aouscContent = `Coverage: Annual statistical tables covering all federal court activity. Published timely within 12 months of reporting period. Useful for validating aggregate case counts and confirming jurisdiction-wide trends. Limitations include aggregation preventing granular analysis and historical methodology changes affecting year-to-year comparability.`;
    y = addBody(aouscContent, y);

    // PAGE 5: Case Classification
    addPage();
    y = margin + 10;
    y = addSectionTitle('Case Classification Methodology', y);
    y += 8;

    const classificationText = `Cases are classified using the Federal Judicial Center's Nature of Suit (NOS) code system. This comprehensive taxonomy groups the 500+ specific codes into analytical categories including contract disputes, torts, employment, intellectual property, civil rights, and administrative matters. Cases with multiple NOS codes are assigned to the primary code, representing the dominant claim. Ambiguous classifications are flagged for manual review when automated rules cannot determine primary nature with 95% confidence threshold. Cross-referencing with plaintiff/defendant descriptors provides disambiguation support.`;

    y = addBody(classificationText, y);

    y += 10;
    y = addSubtitle('Major Case Categories', y);
    y += 4;

    const categories = [
      'Contract disputes: breaches of service, purchase, licensing, and supply agreements',
      'Torts: negligence, product liability, professional malpractice, personal injury',
      'Employment: Title VII discrimination, wage/hour, wrongful termination, benefits disputes',
      'Intellectual Property: patent, trademark, copyright, trade secret litigation',
      'Civil Rights: constitutional claims, Section 1983 actions, discrimination statutes',
      'Administrative: appeals of agency decisions, Social Security, immigration matters',
    ];

    categories.forEach((category) => {
      doc.setFontSize(10);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'normal');
      if (y + 6 > pageHeight - 20) {
        addPage();
        y = margin + 10;
      }
      doc.text(`• ${category}`, margin + 5, y);
      y += 6;
    });

    // PAGE 6: Outcome Coding
    addPage();
    y = margin + 10;
    y = addSectionTitle('Outcome Coding Definitions', y);
    y += 8;

    const outcomesText = `Wins and losses are determined from disposition codes recorded in the Federal Judicial Center database. A win for the plaintiff/respondent occurs when judgment is rendered in their favor before or at trial, including summary judgment for plaintiff and favorable jury verdicts. Losses occur when judgment is rendered for the defendant/appellant or plaintiff voluntarily dismisses. Settlements include all dispositions recorded as settled, compromised, or transferred without judgment. Outcomes are coded dichotomously where possible, with edge cases including:`;

    y = addBody(outcomesText, y);

    y += 6;
    const edgeCases = [
      'Default judgments (coded as defendant win if plaintiff fails to appear)',
      'Dismissed without prejudice (classified as settlement range estimate)',
      'Reversed on appeal (recoded to reflect final appellate disposition)',
      'Split judgments (apportioned when amounts are severable)',
      'In forma pauperis dismissals (excluded from settlement analysis)',
    ];

    edgeCases.forEach((edge) => {
      if (y + 6 > pageHeight - 20) {
        addPage();
        y = margin + 10;
      }
      doc.setFontSize(10);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'normal');
      doc.text(`• ${edge}`, margin + 5, y);
      y += 6;
    });

    // PAGE 7: Settlement Range Calculation
    addPage();
    y = margin + 10;
    y = addSectionTitle('Settlement Range Calculation Methodology', y);
    y += 8;

    const settlementText = `Settlement ranges are computed using percentile analysis on recorded settlement amounts. For each case category and circumstance, we calculate the 25th percentile (P25), 50th percentile (P50 or median), and 75th percentile (P75) of settlement values. Missing settlement amounts (present in approximately 10-15% of settled cases) are handled through statistical imputation when case characteristics are available, or excluded from analysis when insufficient data exists. All historical amounts are adjusted to present value using the Consumer Price Index (CPI-U) to enable temporal comparison.`;

    y = addBody(settlementText, y);

    y += 10;
    y = addSubtitle('Statistical Approach', y);
    y += 4;

    const statText = `Percentile calculations employ linear interpolation where observed values fall between data points. Sample sizes below 30 cases within a category trigger alternate methodologies such as Kaplan-Meier survival analysis or bootstrapped confidence intervals. Outliers exceeding the 99th percentile are winsorized at the 99th percentile value to prevent distortion from extraordinary settlements. This ensures that settlement ranges remain representative of typical outcomes rather than reflecting exceptional cases.`;

    y = addBody(statText, y);

    // PAGE 8: Confidence Scoring
    addPage();
    y = margin + 10;
    y = addSectionTitle('Confidence Scoring System', y);
    y += 8;

    const confidenceText = `The confidence scoring system quantifies statistical reliability by incorporating sample size, outcome distribution, and temporal consistency. Scores range from 0 to 100, with interpretations as follows: 80-100 indicates high confidence (typically n>100 cases, <5% variance across years); 60-79 indicates moderate confidence (n=30-100, 5-15% variance); 40-59 indicates low confidence (n=10-29, >15% variance); below 40 indicates insufficient data for reliable estimation.`;

    y = addBody(confidenceText, y);

    y += 10;
    y = addSubtitle('Minimum Thresholds', y);
    y += 4;

    const thresholds = [
      'High confidence: minimum 100 cases, <5% annual variation',
      'Moderate confidence: minimum 30 cases, <15% annual variation',
      'Low confidence: minimum 10 cases, any annual variation',
      'Unavailable: fewer than 10 cases in category-circumstance combination',
    ];

    thresholds.forEach((threshold) => {
      if (y + 6 > pageHeight - 20) {
        addPage();
        y = margin + 10;
      }
      doc.setFontSize(10);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'normal');
      doc.text(`• ${threshold}`, margin + 5, y);
      y += 6;
    });

    // PAGE 9: Update Pipeline and Data Quality
    addPage();
    y = margin + 10;
    y = addSectionTitle('Update Pipeline and Quality Assurance', y);
    y += 8;

    const pipelineText = `The data refresh schedule operates on a quarterly cycle synchronized with Federal Judicial Center releases. Each refresh cycle initiates automated validation checks including duplicate detection, field format validation, temporal continuity verification, and statistical anomaly detection. Quality assurance procedures include manual spot checks on 5% of newly ingested records, verification of outcome code consistency, and reconciliation of aggregate counts against published judicial statistics.`;

    y = addBody(pipelineText, y);

    y += 10;
    y = addSubtitle('Validation Checks', y);
    y += 4;

    const validationChecks = [
      'Duplicate detection: Cases identified by unique case number and filing date',
      'Format validation: Nature of Suit codes, outcome codes, and dates conform to specification',
      'Temporal continuity: No unexplained gaps in filing or disposition dates',
      'Statistical anomalies: Outcome distributions flagged if >2 standard deviations from baseline',
      'Cross-source reconciliation: Counts matched against BJS and AOUSC published figures',
    ];

    validationChecks.forEach((check) => {
      if (y + 6 > pageHeight - 20) {
        addPage();
        y = margin + 10;
      }
      doc.setFontSize(10);
      doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
      doc.setFont(undefined, 'normal');
      doc.text(`• ${check}`, margin + 5, y);
      y += 6;
    });

    // PAGE 10: Limitations and Citation
    addPage();
    y = margin + 10;
    y = addSectionTitle('Known Limitations and Guidance', y);
    y += 8;

    y = addSubtitle('Known Limitations', y);
    y += 4;

    const limitations = `Selection Bias: Federal court data reflects only litigated matters that reach federal jurisdiction, excluding state court filings, arbitrated disputes, and settled matters resolved before complaint. This introduces systematic bias toward more substantial claims. Reporting Gaps: Settlement amounts are absent in 10-15% of settled cases, particularly in categories predating electronic filing. Field Completion: Nature of Suit coding exhibits variation in accuracy and consistency across districts and time periods. Temporal Effects: Pre-1980 data quality is lower and should be used with caution. Statistical Limitations: Categories with fewer than 30 cases provide unstable estimates and should not support individual case predictions.`;

    y = addBody(limitations, y);

    y += 10;
    y = addSubtitle('Citation Guidance', y);
    y += 4;

    const citationText = `Recommended format: "MyCaseValue Research, Data Methodology Whitepaper v1.0, 2026." This document should be cited when referencing methodology, data sources, classification approaches, or confidence scoring systems. For specific statistics derived from the research database, note the case category, fiscal year, and confidence level. Academic and professional users are encouraged to review limitations prior to analysis.`;

    y = addBody(citationText, y);

    y += 10;
    y = addSubtitle('Contact Information', y);
    y += 4;

    doc.setFontSize(11);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFont(undefined, 'normal');
    doc.text('research@mycasevalues.com', margin, y);

    return doc;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Generate PDF
      const pdf = generatePDF();
      const pdfBase64 = pdf.output('datauristring');

      // Send to server-side API for email and storage
      const response = await fetch('/api/whitepaper-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          organization: formData.organization,
          pdfBase64,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Also trigger PDF download
      pdf.save('MyCaseValue_Data_Methodology_Whitepaper_v1.0.pdf');

      setSubmitStatus('success');
      setFormData({
        email: '',
        organization: '',
        fullName: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <style>{`
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border-default);
          border-radius: 8px;
          font-size: 14px;
          font-family: var(--font-body);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1);
        }
        .form-input.error {
          border-color: #DC2626;
        }
        .form-button {
          width: 100%;
          padding: 12px 24px;
          background-color: var(--accent-primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .form-button:hover:not(:disabled) {
          background-color: var(--gold-hover, #A87222);
          box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
        }
        .form-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .error-message {
          color: #DC2626;
          font-size: 13px;
          margin-top: 6px;
          font-family: var(--font-body);
        }
        .success-message {
          padding: 16px;
          background-color: rgba(34, 197, 94, 0.1);
          border-left: 4px solid #22C55E;
          border-radius: 4px;
          margin-bottom: 24px;
          font-size: 14px;
          color: #166534;
          font-family: var(--font-body);
        }
        .error-message-box {
          padding: 16px;
          background-color: rgba(220, 38, 38, 0.1);
          border-left: 4px solid #DC2626;
          border-radius: 4px;
          margin-bottom: 24px;
          font-size: 14px;
          color: #991B1B;
          font-family: var(--font-body);
        }
      `}</style>

      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Download Whitepaper
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
            marginBottom: 24,
            marginTop: 0,
          }}
        >
          Enter your information to download the complete Data Methodology Whitepaper. The PDF will be generated and sent to your email address.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="success-message">
          Thank you for your interest. Your whitepaper has been generated and downloaded. A copy has also been sent to your email address.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message-box">
          An error occurred while processing your request. Please try again or contact research@mycasevalues.com for assistance.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 8,
              fontFamily: 'var(--font-body)',
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Smith"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && <div className="error-message">{errors.fullName}</div>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 8,
              fontFamily: 'var(--font-body)',
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 8,
              fontFamily: 'var(--font-body)',
            }}
          >
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Law Firm, Research Institute, etc."
            className={`form-input ${errors.organization ? 'error' : ''}`}
          />
          {errors.organization && <div className="error-message">{errors.organization}</div>}
        </div>

        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? 'Generating PDF...' : 'Download Whitepaper'}
        </button>
      </form>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          borderRadius: '4px',
          backgroundColor: 'rgba(0, 65, 130, 0.05)',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
        }}
      >
        <p style={{ marginTop: 0, marginBottom: 8 }}>
          <strong style={{ color: 'var(--accent-primary-hover)' }}>Whitepaper Details:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>10-page comprehensive technical documentation</li>
          <li>Data sources: Federal Judicial Center, CourtListener, BJS, AOUSC</li>
          <li>Classification methodology, outcome coding, settlement analysis</li>
          <li>Confidence scoring system and quality assurance procedures</li>
          <li>Known limitations and academic citation guidance</li>
        </ul>
      </div>
    </div>
  );
}
