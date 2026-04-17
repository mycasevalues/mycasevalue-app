'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CaseTypeInfo {
  id: string;
  label: string;
  code: number;
  sections: string[];
}

const CASE_TYPES: Record<string, CaseTypeInfo> = {
  employment_discrimination: {
    id: 'employment_discrimination',
    label: 'Employment Discrimination (442)',
    code: 442,
    sections: [
      'Client Information',
      'Employer Information',
      'Employment History',
      'Protected Characteristic',
      'Adverse Action',
      'Comparator Employees',
      'Witnesses',
      'Documents Preserved',
      'EEOC Charge Status',
      'Prior Litigation History',
      'Medical Treatment',
      'Income and Damages',
      'Attorney Contacts',
    ],
  },
  ada: {
    id: 'ada',
    label: 'ADA (445)',
    code: 445,
    sections: [
      'Client Information',
      'Disability Information',
      'Employer Information',
      'Employment History',
      'Accommodation Requests',
      'Adverse Action',
      'Witnesses',
      'Medical Documentation',
      'Income and Damages',
      'Prior Litigation History',
    ],
  },
  personal_injury: {
    id: 'personal_injury',
    label: 'Personal Injury (360)',
    code: 360,
    sections: [
      'Client Information',
      'Accident Details',
      'Injuries Sustained',
      'Medical Treatment',
      'Medical Providers',
      'Insurance Information',
      'Witnesses',
      'Property Damage',
      'Prior Medical History',
      'Income and Damages',
    ],
  },
  product_liability: {
    id: 'product_liability',
    label: 'Product Liability (365)',
    code: 365,
    sections: [
      'Client Information',
      'Product Information',
      'Incident Details',
      'Injuries Sustained',
      'Medical Treatment',
      'Product Defect Description',
      'Witnesses',
      'Product Documentation',
      'Prior Similar Incidents',
      'Income and Damages',
    ],
  },
  medical_malpractice: {
    id: 'medical_malpractice',
    label: 'Medical Malpractice (362)',
    code: 362,
    sections: [
      'Client Information',
      'Medical Provider Information',
      'Treatment Details',
      'Standard of Care Deviation',
      'Injuries and Damages',
      'Medical Records',
      'Witnesses',
      'Prior Medical History',
      'Causation',
      'Income and Damages',
    ],
  },
  contract: {
    id: 'contract',
    label: 'Contract (190)',
    code: 190,
    sections: [
      'Client Information',
      'Contracting Parties',
      'Contract Details',
      'Performance Issues',
      'Breach Description',
      'Damages Claimed',
      'Witnesses',
      'Contract Documentation',
      'Prior Disputes',
      'Remedies Sought',
    ],
  },
  flsa_wage: {
    id: 'flsa_wage',
    label: 'FLSA/Wage (710)',
    code: 710,
    sections: [
      'Client Information',
      'Employer Information',
      'Employment History',
      'Wage Information',
      'Overtime Details',
      'Work Schedule',
      'Misclassification Details',
      'Witnesses',
      'Pay Records',
      'Damages Calculation',
    ],
  },
  motor_vehicle: {
    id: 'motor_vehicle',
    label: 'Motor Vehicle (350)',
    code: 350,
    sections: [
      'Client Information',
      'Accident Details',
      'Vehicle Information',
      'Injuries Sustained',
      'Medical Treatment',
      'Insurance Information',
      'Witnesses',
      'Police Report',
      'Property Damage',
      'Income and Damages',
    ],
  },
};

interface FormField {
  label: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'textarea' | 'checkbox';
}

function generateSectionFields(sectionTitle: string): FormField[] {
  const fieldsMap: Record<string, FormField[]> = {
    'Client Information': [
      { label: 'Full Name', type: 'text' },
      { label: 'Address', type: 'text' },
      { label: 'City, State, ZIP', type: 'text' },
      { label: 'Phone Number', type: 'phone' },
      { label: 'Email Address', type: 'email' },
      { label: 'Date of Birth', type: 'date' },
      { label: 'Last Four Digits of SSN', type: 'text' },
    ],
    'Employer Information': [
      { label: 'Employer Name', type: 'text' },
      { label: 'Number of Employees', type: 'text' },
      { label: 'Industry', type: 'text' },
      { label: 'Employer Location', type: 'text' },
      { label: 'Supervisor Name', type: 'text' },
      { label: 'HR Contact', type: 'text' },
    ],
    'Employment History': [
      { label: 'Start Date', type: 'date' },
      { label: 'End Date (if applicable)', type: 'date' },
      { label: 'Position/Title', type: 'text' },
      { label: 'Department', type: 'text' },
      { label: 'Salary', type: 'text' },
      { label: 'Job Duties and Responsibilities', type: 'textarea' },
    ],
    'Protected Characteristic': [
      { label: 'Race/Ethnicity', type: 'text' },
      { label: 'Sex/Gender', type: 'text' },
      { label: 'Age', type: 'text' },
      { label: 'Religion', type: 'text' },
      { label: 'Disability', type: 'text' },
      { label: 'National Origin', type: 'text' },
      { label: 'Other Protected Status', type: 'textarea' },
    ],
    'Disability Information': [
      { label: 'Disability Description', type: 'textarea' },
      { label: 'Functional Limitations', type: 'textarea' },
      { label: 'Required Accommodations', type: 'textarea' },
      { label: 'Medical Diagnosis', type: 'text' },
      { label: 'Onset Date', type: 'date' },
    ],
    'Adverse Action': [
      { label: 'Type of Adverse Action', type: 'text' },
      { label: 'Date of Action', type: 'date' },
      { label: 'Stated Reason for Action', type: 'textarea' },
      { label: 'Prior Warnings or Issues', type: 'textarea' },
      { label: 'Notice Given to Employee', type: 'text' },
    ],
    'Comparator Employees': [
      { label: 'Names of Comparable Employees', type: 'textarea' },
      { label: 'Their Protected Status', type: 'textarea' },
      { label: 'Treatment Differences', type: 'textarea' },
      { label: 'Qualifications Comparison', type: 'textarea' },
    ],
    'Accident Details': [
      { label: 'Date and Time of Accident', type: 'date' },
      { label: 'Location', type: 'text' },
      { label: 'Description of Incident', type: 'textarea' },
      { label: 'Cause of Accident', type: 'textarea' },
      { label: 'Fault Assessment', type: 'textarea' },
    ],
    'Injuries Sustained': [
      { label: 'Type of Injuries', type: 'textarea' },
      { label: 'Severity', type: 'text' },
      { label: 'Current Condition', type: 'textarea' },
      { label: 'Permanent Disability', type: 'text' },
    ],
    'Medical Treatment': [
      { label: 'Hospital or Clinic Name', type: 'text' },
      { label: 'Emergency Room Visit', type: 'checkbox' },
      { label: 'Admission Date', type: 'date' },
      { label: 'Treatment Provided', type: 'textarea' },
      { label: 'Ongoing Treatment Needed', type: 'checkbox' },
    ],
    'Medical Providers': [
      { label: 'Provider Names and Specialties', type: 'textarea' },
      { label: 'Contact Information', type: 'textarea' },
      { label: 'Treatment Dates', type: 'text' },
      { label: 'Current Provider', type: 'text' },
    ],
    'Insurance Information': [
      { label: 'Defendant Insurance Company', type: 'text' },
      { label: 'Policy Number', type: 'text' },
      { label: 'Policy Limits', type: 'text' },
      { label: 'Adjuster Name and Contact', type: 'text' },
      { label: 'Claim Number', type: 'text' },
    ],
    'Witnesses': [
      { label: 'Witness Names', type: 'textarea' },
      { label: 'Contact Information', type: 'textarea' },
      { label: 'What They Observed', type: 'textarea' },
      { label: 'Relationship to Parties', type: 'textarea' },
    ],
    'Documents Preserved': [
      { label: 'Performance Reviews', type: 'checkbox' },
      { label: 'Email Communications', type: 'checkbox' },
      { label: 'Termination Letter', type: 'checkbox' },
      { label: 'Employee Handbook', type: 'checkbox' },
      { label: 'Other Documents', type: 'textarea' },
    ],
    'EEOC Charge Status': [
      { label: 'EEOC Charge Filed', type: 'checkbox' },
      { label: 'Date of Filing', type: 'date' },
      { label: 'Charge Number', type: 'text' },
      { label: 'Right to Sue Received', type: 'checkbox' },
      { label: 'Date of Right to Sue', type: 'date' },
    ],
    'Prior Litigation History': [
      { label: 'Prior Lawsuits', type: 'checkbox' },
      { label: 'Case Details', type: 'textarea' },
      { label: 'Outcomes', type: 'textarea' },
      { label: 'Pending Litigation', type: 'textarea' },
    ],
    'Income and Damages': [
      { label: 'Current Annual Salary', type: 'text' },
      { label: 'Lost Wages (Total)', type: 'text' },
      { label: 'Benefits Lost', type: 'textarea' },
      { label: 'Other Economic Damages', type: 'textarea' },
      { label: 'Non-Economic Damages', type: 'textarea' },
    ],
    'Attorney Contacts': [
      { label: 'Prior Attorneys Consulted', type: 'textarea' },
      { label: 'Reasons for Change (if applicable)', type: 'textarea' },
      { label: 'Prior Fee Agreements', type: 'textarea' },
    ],
    'Product Information': [
      { label: 'Product Name and Model', type: 'text' },
      { label: 'Manufacturer', type: 'text' },
      { label: 'Purchase Date', type: 'date' },
      { label: 'Product Serial Number', type: 'text' },
      { label: 'Warranty Information', type: 'textarea' },
    ],
    'Incident Details': [
      { label: 'Date and Time of Incident', type: 'date' },
      { label: 'Location', type: 'text' },
      { label: 'Description of Incident', type: 'textarea' },
      { label: 'How Product Was Being Used', type: 'textarea' },
    ],
    'Product Defect Description': [
      { label: 'Alleged Defect', type: 'textarea' },
      { label: 'Type of Defect (Design/Manufacturing/Warning)', type: 'text' },
      { label: 'How Defect Caused Injury', type: 'textarea' },
    ],
    'Medical Provider Information': [
      { label: 'Provider Name and Specialty', type: 'text' },
      { label: 'Facility/Hospital Name', type: 'text' },
      { label: 'License Number', type: 'text' },
      { label: 'Contact Information', type: 'text' },
    ],
    'Treatment Details': [
      { label: 'Type of Treatment', type: 'textarea' },
      { label: 'Dates of Treatment', type: 'text' },
      { label: 'Procedures Performed', type: 'textarea' },
      { label: 'Medications Prescribed', type: 'textarea' },
    ],
    'Standard of Care Deviation': [
      { label: 'How Care Deviated from Standard', type: 'textarea' },
      { label: 'Expected Standard of Care', type: 'textarea' },
      { label: 'Professional Opinions', type: 'textarea' },
    ],
    'Contracting Parties': [
      { label: 'Other Party Name', type: 'text' },
      { label: 'Business Type', type: 'text' },
      { label: 'Contact Information', type: 'text' },
      { label: 'Address', type: 'text' },
    ],
    'Contract Details': [
      { label: 'Date Contract Entered', type: 'date' },
      { label: 'Contract Type', type: 'text' },
      { label: 'Contract Value', type: 'text' },
      { label: 'Key Terms', type: 'textarea' },
    ],
    'Performance Issues': [
      { label: 'Description of Non-Performance', type: 'textarea' },
      { label: 'Date Issues Began', type: 'date' },
      { label: 'Notice Given', type: 'text' },
      { label: 'Response from Other Party', type: 'textarea' },
    ],
    'Breach Description': [
      { label: 'How Contract Was Breached', type: 'textarea' },
      { label: 'Impact of Breach', type: 'textarea' },
      { label: 'Mitigation Attempts', type: 'textarea' },
    ],
    'Damages Claimed': [
      { label: 'Total Damages Claimed', type: 'text' },
      { label: 'Breakdown of Damages', type: 'textarea' },
      { label: 'Supporting Documentation', type: 'textarea' },
    ],
    'Accommodation Requests': [
      { label: 'Specific Accommodations Requested', type: 'textarea' },
      { label: 'Date Request Made', type: 'date' },
      { label: 'Employer Response', type: 'textarea' },
      { label: 'Reason Accommodation Denied', type: 'textarea' },
    ],
    'Wage Information': [
      { label: 'Hourly Rate', type: 'text' },
      { label: 'Hours Worked Per Week', type: 'text' },
      { label: 'Pay Period', type: 'text' },
      { label: 'Salary (if applicable)', type: 'text' },
    ],
    'Overtime Details': [
      { label: 'Hours Worked Exceeding 40/week', type: 'text' },
      { label: 'Overtime Compensation Provided', type: 'checkbox' },
      { label: 'Overtime Compensation Amount', type: 'text' },
      { label: 'Period of Non-Payment', type: 'text' },
    ],
    'Work Schedule': [
      { label: 'Regular Work Hours', type: 'text' },
      { label: 'Days of Week Worked', type: 'text' },
      { label: 'Off-Duty Hours Worked', type: 'textarea' },
      { label: 'Meal and Break Policies', type: 'textarea' },
    ],
    'Misclassification Details': [
      { label: 'Current Classification', type: 'text' },
      { label: 'Why Classification is Improper', type: 'textarea' },
      { label: 'Correct Classification', type: 'text' },
      { label: 'Impact on Wages', type: 'textarea' },
    ],
    'Pay Records': [
      { label: 'Available Pay Stubs', type: 'checkbox' },
      { label: 'Time Records Kept', type: 'checkbox' },
      { label: 'Pay Period Documentation', type: 'textarea' },
    ],
    'Damages Calculation': [
      { label: 'Total Unpaid Wages', type: 'text' },
      { label: 'Calculation Method', type: 'textarea' },
      { label: 'Time Period Affected', type: 'text' },
    ],
    'Vehicle Information': [
      { label: 'Vehicle Make, Model, Year', type: 'text' },
      { label: 'License Plate', type: 'text' },
      { label: 'VIN', type: 'text' },
      { label: 'Insurance Company', type: 'text' },
    ],
    'Police Report': [
      { label: 'Police Report Number', type: 'text' },
      { label: 'Responding Officer', type: 'text' },
      { label: 'Police Department', type: 'text' },
      { label: 'Report Date', type: 'date' },
    ],
    'Property Damage': [
      { label: 'Description of Damage', type: 'textarea' },
      { label: 'Estimated Repair Cost', type: 'text' },
      { label: 'Repair Vendor', type: 'text' },
      { label: 'Photos Available', type: 'checkbox' },
    ],
    'Prior Medical History': [
      { label: 'Pre-Existing Conditions', type: 'textarea' },
      { label: 'Prior Injuries', type: 'textarea' },
      { label: 'Current Medications', type: 'textarea' },
    ],
    'Causation': [
      { label: 'How Medical Care Caused Injury', type: 'textarea' },
      { label: 'Expert Medical Opinion', type: 'textarea' },
      { label: 'Scientific Support for Causation', type: 'textarea' },
    ],
    'Injuries and Damages': [
      { label: 'Nature of Injuries', type: 'textarea' },
      { label: 'Current Health Status', type: 'textarea' },
      { label: 'Life Impact', type: 'textarea' },
    ],
    'Medical Records': [
      { label: 'Records Available', type: 'checkbox' },
      { label: 'Providers to Contact for Records', type: 'textarea' },
      { label: 'Treatment Timeline', type: 'textarea' },
    ],
    'Medical Documentation': [
      { label: 'Medical Records Available', type: 'checkbox' },
      { label: 'Diagnostic Test Results', type: 'textarea' },
      { label: 'Treatment Documentation', type: 'textarea' },
      { label: 'Specialist Reports', type: 'textarea' },
    ],
    'Remedies Sought': [
      { label: 'Specific Remedies Desired', type: 'textarea' },
      { label: 'Preferred Resolution', type: 'textarea' },
      { label: 'Willingness to Settle', type: 'text' },
    ],
    'Contract Documentation': [
      { label: 'Contract Available', type: 'checkbox' },
      { label: 'Amendments or Modifications', type: 'textarea' },
      { label: 'Related Communications', type: 'textarea' },
    ],
    'Prior Disputes': [
      { label: 'Previous Disputes with Party', type: 'textarea' },
      { label: 'How Previous Issues Were Resolved', type: 'textarea' },
    ],
    'Product Documentation': [
      { label: 'Product Manual Available', type: 'checkbox' },
      { label: 'Warnings or Instructions', type: 'textarea' },
      { label: 'Prior Complaints About Product', type: 'textarea' },
    ],
    'Prior Similar Incidents': [
      { label: 'Known Prior Injuries from Product', type: 'textarea' },
      { label: 'Recalls or Warnings Issued', type: 'textarea' },
      { label: 'Manufacturer Knowledge of Defect', type: 'textarea' },
    ],
  };

  return fieldsMap[sectionTitle] || [{ label: sectionTitle + ' Details', type: 'textarea' }];
}

export default function IntakeFormGenerator() {
  const [selectedCaseType, setSelectedCaseType] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerateForm = async () => {
    if (!selectedCaseType) return;

    setLoading(true);
    try {
      const caseTypeInfo = CASE_TYPES[selectedCaseType];
      if (!caseTypeInfo) {
        console.error('Invalid case type');
        return;
      }

      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

      const children: InstanceType<typeof Paragraph>[] = [];

      children.push(
        new Paragraph({
          text: `Client Intake Questionnaire - ${caseTypeInfo.label}`,
          heading: HeadingLevel.HEADING_1,
          thematicBreak: false,
        })
      );

      children.push(new Paragraph({ text: '' }));

      caseTypeInfo.sections.forEach((sectionTitle) => {
        const fields = generateSectionFields(sectionTitle);

        children.push(
          new Paragraph({
            text: sectionTitle,
            heading: HeadingLevel.HEADING_2,
          })
        );

        children.push(new Paragraph({ text: '' }));

        fields.forEach((field, idx) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${idx + 1}. ${field.label}`,
                  bold: true,
                  font: 'Times New Roman',
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
            })
          );

          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: '_____________________________________________________________________',
                  font: 'Times New Roman',
                  size: 22,
                }),
              ],
              spacing: { after: 200 },
            })
          );
        });

        children.push(new Paragraph({ text: '' }));
      });

      children.push(new Paragraph({ text: '' }));
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Customize this template to your firm\'s requirements before use.',
              italics: true,
              font: 'Times New Roman',
              size: 20,
              color: '666666',
            }),
          ],
        })
      );

      const doc = new Document({
        sections: [
          {
            properties: {},
            children,
            footers: {
              default: {
                options: {
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Customize this template to your firm\'s requirements before use.',
                          italics: true,
                          size: 18,
                          color: '999999',
                        }),
                      ],
                    }),
                  ],
                },
              },
            },
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `intake-form-${caseTypeInfo.label.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating form:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedInfo = selectedCaseType ? CASE_TYPES[selectedCaseType] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selectedInfo ? '1fr 1fr' : '1fr', gap: '24px' }}>
      <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
          Form Configuration
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
              Case Type *
            </label>
            <select
              value={selectedCaseType}
              onChange={(e) => setSelectedCaseType(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface-0)',
                fontFamily: 'var(--font-ui)',
                outline: 'none',
              }}
            >
              <option value="">Select a case type...</option>
              {Object.entries(CASE_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.06)', padding: '16px', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
            <p style={{ fontSize: '12px', color: 'var(--link)', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-ui)' }}>
              This tool generates a comprehensive intake questionnaire with relevant fields for your case type. You can customize and print the form for client meetings.
            </p>
          </div>

          <button
            onClick={handleGenerateForm}
            disabled={!selectedCaseType || loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: !selectedCaseType || loading ? 'var(--border-default)' : 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              border: 'none',
              borderRadius: '2px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: !selectedCaseType || loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Generating Form...' : 'Generate Intake Form (.docx)'}
          </button>

          <Link href="/attorney" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--color-surface-0)',
                color: 'var(--accent-primary)',
                border: '1px solid var(--accent-primary)',
                borderRadius: '2px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
              }}
            >
              Back to Tools
            </button>
          </Link>
        </div>
      </div>

      {selectedInfo && (
        <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', fontFamily: 'var(--font-ui)' }}>
            Preview
          </h2>

          <div style={{ maxHeight: '600px', overflowY: 'auto', padding: '16px', background: 'var(--color-surface-1)', borderRadius: '4px', border: '1px solid var(--border-default)' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '8px' }}>
              Form Sections:
            </h3>
            <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: '1.8', fontFamily: 'var(--font-ui)' }}>
              {selectedInfo.sections.map((section, idx) => (
                <li key={idx}>{section}</li>
              ))}
            </ul>

            <div style={{ marginTop: '24px', padding: '12px', background: 'rgba(234,179,8,0.1)', borderRadius: '4px', border: '1px solid var(--wrn-bg, #FCD34D)' }}>
              <p style={{ fontSize: '12px', color: 'var(--wrn-txt, #7A5800)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                <strong>Note:</strong> Each section contains numbered fields with blank lines formatted for printing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
