'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

type IntakeForm = {
  sections: Array<{
    title: string;
    fields: Array<{
      label: string;
      type: 'text' | 'date' | 'email' | 'phone' | 'number' | 'textarea' | 'checkbox-group';
      required: boolean;
      placeholder?: string;
      options?: string[];
    }>;
  }>;
  disclaimer: string;
};

export default function IntakeFormsPage() {
  const [caseType, setCaseType] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [intakeForm, setIntakeForm] = useState<IntakeForm | null>(null);
  const [copied, setCopied] = useState(false);

  const caseCategories = [
    { id: 'employment', label: 'Employment', icon: '📋' },
    { id: 'personal-injury', label: 'Personal Injury', icon: '📋' },
    { id: 'civil-rights', label: 'Civil Rights', icon: '📋' },
    { id: 'contract', label: 'Contract', icon: '📋' },
    { id: 'consumer', label: 'Consumer Protection', icon: '📋' },
    { id: 'medical', label: 'Medical Malpractice', icon: '📋' },
    { id: 'money-business', label: 'Money & Business', icon: '📋' },
    { id: 'housing', label: 'Housing & Property', icon: '📋' },
  ];

  const getCaseTypesForCategory = (categoryId: string) => {
    const categoryMap: Record<string, string> = {
      employment: 'employment-workplace',
      'personal-injury': 'personal-injury',
      'civil-rights': 'civil-rights',
      contract: 'money-business',
      consumer: 'consumer-protection',
      medical: 'personal-injury',
      'money-business': 'money-business',
      housing: 'housing-property',
    };

    const sitCategory = SITS.find(s => s.id === categoryMap[categoryId]);
    return sitCategory?.opts || [];
  };

  const handleGenerateForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseType || !category) {
      setError('Please select both a category and case type');
      return;
    }

    setLoading(true);
    setError('');
    setIntakeForm(null);

    try {
      const response = await fetch('/api/attorney/intake-forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseType,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate intake form');
        return;
      }

      setIntakeForm(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadForm = () => {
    if (!intakeForm) return;

    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intake-form-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateHTML = (): string => {
    if (!intakeForm) return '';

    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Intake Form</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #0f0f0f;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 24px;
      background: #f7f8fa;
    }
    .header {
      margin-bottom: 32px;
      border-bottom: 2px solid #8B5CF6;
      padding-bottom: 16px;
    }
    .header h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 600;
      color: #1B3A5C;
    }
    .header p {
      margin: 0;
      color: #4B5563;
      font-size: 14px;
    }
    .section {
      background: white;
      margin-bottom: 24px;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #E5E7EB;
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f0f0f;
      margin: 0 0 16px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #0f0f0f;
      margin-bottom: 6px;
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }
    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #8B5CF6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .checkbox-item {
      display: flex;
      align-items: center;
    }
    .checkbox-item input {
      margin-right: 8px;
      width: auto;
    }
    .required::after {
      content: " *";
      color: #cc1019;
    }
    .disclaimer {
      background: #FEF3C7;
      border-left: 4px solid #FCD34D;
      padding: 16px;
      border-radius: 8px;
      margin-top: 32px;
    }
    .disclaimer p {
      margin: 0;
      font-size: 12px;
      color: #92400E;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      color: #4B5563;
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #E5E7EB;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Client Intake Form</h1>
    <p>Please provide complete and accurate information to help us understand your case.</p>
  </div>`;

    intakeForm.sections.forEach((section) => {
      html += `<div class="section">
        <h2 class="section-title">${section.title}</h2>`;

      section.fields.forEach((field) => {
        const isRequired = field.required ? ' required' : '';
        const requiredLabel = field.required ? 'required' : '';

        if (field.type === 'checkbox-group' && field.options) {
          html += `<div class="form-group">
            <label class="${requiredLabel}">${field.label}</label>
            <div class="checkbox-group">`;
          field.options.forEach((option) => {
            html += `<div class="checkbox-item">
              <input type="checkbox" id="${option}" name="${field.label}">
              <label for="${option}" style="margin: 0; font-weight: normal; font-size: 13px;">${option}</label>
            </div>`;
          });
          html += `</div></div>`;
        } else {
          html += `<div class="form-group">
            <label class="${requiredLabel}">${field.label}</label>
            ${
              field.type === 'textarea'
                ? `<textarea name="${field.label}" placeholder="${field.placeholder || ''}"${isRequired}></textarea>`
                : `<input type="${field.type}" name="${field.label}" placeholder="${field.placeholder || ''}"${isRequired}>`
            }
          </div>`;
        }
      });

      html += '</div>';
    });

    html += `<div class="disclaimer">
      <p><strong>Disclaimer:</strong> ${intakeForm.disclaimer}</p>
    </div>
    <div class="footer">
      <p>Generated on ${new Date().toLocaleDateString()} - Free during public beta</p>
    </div>
  </body>
</html>`;

    return html;
  };

  const copyToClipboard = () => {
    const htmlContent = generateHTML();
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#0f0f0f',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: 'auto',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f0f0f',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#8B5CF6', flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Intake Form Generator
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            Client Intake Form Generator
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Generate customized client intake questionnaires by case type to streamline case intake and client onboarding.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: intakeForm ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Form Configuration
            </h2>

            <form onSubmit={handleGenerateForm} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Category Selection */}
              <div>
                <label style={labelStyle}>Case Category *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {caseCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setCaseType('');
                        setError('');
                      }}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: `1px solid ${category === cat.id ? '#8B5CF6' : '#E5E7EB'}`,
                        backgroundColor: category === cat.id ? 'rgba(139, 92, 246, 0.08)' : '#FAFBFC',
                        color: category === cat.id ? '#8B5CF6' : '#4B5563',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Type Selection */}
              {category && getCaseTypesForCategory(category).length > 0 && (
                <div>
                  <label style={labelStyle}>Case Type *</label>
                  <select
                    value={caseType}
                    onChange={(e) => {
                      setCaseType(e.target.value);
                      setError('');
                    }}
                    style={inputStyle}
                  >
                    <option value="">Select specific case type...</option>
                    {getCaseTypesForCategory(category).map((ct: any) => (
                      <option key={ct.nos} value={ct.label}>
                        {ct.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Info Box */}
              <div style={{ background: '#F0F9FF', padding: '16px', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                <p style={{ fontSize: '12px', color: '#0369A1', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                  This tool generates a comprehensive intake questionnaire with relevant fields for your case type. You can then customize and print the form for client meetings.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '13px', color: '#8B5CF6', margin: 0, fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !caseType || !category}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: loading || !caseType || !category ? '#E5E7EB' : '#8B5CF6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: loading || !caseType || !category ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {loading ? 'Generating Form...' : 'Generate Form'}
              </button>

              <Link href="/attorney" style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    color: '#8B5CF6',
                    border: '1px solid #8B5CF6',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  Back to Tools
                </button>
              </Link>
            </form>
          </div>

          {/* Generated Form Preview */}
          {intakeForm && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Form Preview
                  </h2>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={copyToClipboard}
                      style={{
                        padding: '8px 12px',
                        background: copied ? '#059669' : '#8B5CF6',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.3s',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={(e) => {
                        if (!copied) e.currentTarget.style.background = '#6D28D9';
                      }}
                      onMouseLeave={(e) => {
                        if (!copied) e.currentTarget.style.background = '#8B5CF6';
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy HTML'}
                    </button>
                    <button
                      onClick={downloadForm}
                      style={{
                        padding: '8px 12px',
                        background: '#059669',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.3s',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#047857';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#059669';
                      }}
                    >
                      Download HTML
                    </button>
                  </div>
                </div>

                <div style={{
                  maxHeight: '600px',
                  overflowY: 'auto',
                  padding: '16px',
                  background: '#FAFBFC',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  fontSize: '12px',
                  color: '#0f0f0f',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-body)',
                }}>
                  {intakeForm.sections.map((section, idx) => (
                    <div key={idx} style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1B3A5C', margin: '0 0 12px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                        {section.title}
                      </h3>
                      <div style={{ marginLeft: '12px' }}>
                        {section.fields.map((field, fieldIdx) => (
                          <div key={fieldIdx} style={{ marginBottom: '8px', fontSize: '11px' }}>
                            <div style={{ fontWeight: 600, color: '#0f0f0f' }}>
                              {field.label} {field.required ? '*' : ''}
                            </div>
                            <div style={{ color: '#4B5563', fontSize: '10px', marginTop: '2px' }}>
                              ({field.type})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beta Badge */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                  Free during public beta
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        {!intakeForm && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                Case-Specific Fields
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Automatically generates fields relevant to your case type, from employment dates to accident details.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                Conflict Check
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Includes conflict-of-interest fields to identify opposing parties and related matters.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                Printable HTML
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Export as clean, professional HTML ready to print or send to clients digitally.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/fee-calculator" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Fee Calculator
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Calculate attorney fees
              </p>
            </div>
          </Link>
          <Link href="/attorney/demand-letter" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Demand Letter
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Generate demand letters
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Predict case outcomes
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
