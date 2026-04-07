'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

const DEPONENT_ROLES = [
  { value: 'plaintiff', label: 'Plaintiff' },
  { value: 'defendant', label: 'Defendant' },
  { value: 'expert', label: 'Expert Witness' },
  { value: 'third-party', label: 'Third-Party Witness' },
];

export default function DepositionPrepPage() {
  const [caseCategory, setCaseCategory] = useState('');
  const [caseType, setCaseType] = useState('');
  const [deponentRole, setDeponentRole] = useState('');
  const [deponentPosition, setDeponentPosition] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [outlineText, setOutlineText] = useState('');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const selectedCategory = SITS.find(s => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  // Auto-scroll during streaming
  useEffect(() => {
    if (loading && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outlineText, loading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseType || !deponentRole) {
      setError('Please select case type and deponent role');
      return;
    }

    setLoading(true);
    setError('');
    setOutlineText('');

    try {
      const response = await fetch('/api/attorney/deposition-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseType, deponentRole, deponentPosition }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to generate outline');
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) { setError('Streaming not supported'); setLoading(false); return; }

      const decoder = new TextDecoder();
      let accumulated = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setOutlineText(accumulated);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (outlineText) {
      navigator.clipboard.writeText(outlineText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportAsDocx = async () => {
    if (!outlineText) return;
    setExporting(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

      const children: InstanceType<typeof Paragraph>[] = [];
      const lines = outlineText.split('\n');

      lines.forEach(line => {
        const trimmed = line.trim();
        const isHeading = /^#{1,3}\s/.test(trimmed) || /^[A-Z][A-Z\s]{5,}/.test(trimmed) || /^\d+\.\s+[A-Z]/.test(trimmed);

        if (isHeading) {
          children.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: trimmed.replace(/^#+\s*/, ''), bold: true, font: 'Times New Roman', size: 28 })],
            spacing: { before: 240, after: 120 },
          }));
        } else {
          children.push(new Paragraph({
            children: [new TextRun({ text: line, font: 'Times New Roman', size: 24 })],
            spacing: { after: 80 },
          }));
        }
      });

      const doc = new Document({ sections: [{ properties: {}, children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deposition-outline.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to export document.');
    } finally {
      setExporting(false);
    }
  };

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', height: '48px',
    border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px',
    color: '#0f0f0f', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s', appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: 600,
    color: '#0f0f0f', marginBottom: '6px', fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        select:focus, input:focus, textarea:focus { outline: none; border-color: #0966C3; box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }
      `}</style>

      {/* Header */}
      <div style={{ background: '#1C3A5E', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0966C3', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Deposition Preparation
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            AI Deposition Prep Tool
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Generate structured deposition outlines with numbered questions organized by topic.
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: outlineText ? '380px 1fr' : '1fr', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Deposition Details
            </h2>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Case Category</label>
                <select value={caseCategory} onChange={e => { setCaseCategory(e.target.value); setCaseType(''); }} style={selectStyle}>
                  <option value="">Select category...</option>
                  {SITS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              {caseCategory && (
                <div>
                  <label style={labelStyle}>Case Type *</label>
                  <select value={caseType} onChange={e => setCaseType(e.target.value)} style={selectStyle}>
                    <option value="">Select type...</option>
                    {caseOptions.map(opt => <option key={opt.label} value={opt.nos}>{opt.label}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label style={labelStyle}>Deponent Role *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {DEPONENT_ROLES.map(role => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setDeponentRole(role.value)}
                      style={{
                        padding: '10px', borderRadius: '12px',
                        border: `1px solid ${deponentRole === role.value ? '#0966C3' : '#E5E7EB'}`,
                        backgroundColor: deponentRole === role.value ? 'rgba(10,102,194,0.08)' : '#FAFBFC',
                        color: deponentRole === role.value ? '#0966C3' : '#4B5563',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Deponent&apos;s Position (optional)</label>
                <textarea
                  placeholder="Brief description of deponent's role or position in the case..."
                  value={deponentPosition}
                  onChange={e => setDeponentPosition(e.target.value.slice(0, 200))}
                  style={{
                    width: '100%', padding: '12px 14px', border: '1px solid #E5E7EB',
                    borderRadius: '12px', fontSize: '14px', color: '#0f0f0f',
                    backgroundColor: '#FFFFFF', fontFamily: 'var(--font-body)',
                    minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' as const,
                  }}
                />
                <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0' }}>
                  {deponentPosition.length}/200 characters
                </p>
              </div>

              {error && (
                <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '13px', color: '#CC1016', margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !caseType || !deponentRole}
                style={{
                  width: '100%', padding: '14px',
                  backgroundColor: loading || !caseType || !deponentRole ? '#E5E7EB' : '#0966C3',
                  color: '#FFFFFF', border: 'none', borderRadius: '12px',
                  fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  cursor: loading || !caseType || !deponentRole ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Generating Outline...' : 'Generate Deposition Outline'}
              </button>
            </form>
          </div>

          {/* Output */}
          {outlineText && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Deposition Outline
                    {loading && <span style={{ fontSize: 12, color: '#0966C3', marginLeft: 8, fontWeight: 400 }}>streaming...</span>}
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={copyToClipboard}
                      disabled={loading}
                      style={{
                        padding: '8px 12px', background: copied ? '#059669' : '#0966C3',
                        color: '#FFF', border: 'none', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.5 : 1, fontFamily: 'var(--font-body)',
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={exportAsDocx}
                      disabled={loading || exporting}
                      style={{
                        padding: '8px 12px', background: '#004182',
                        color: '#FFF', border: 'none', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 600,
                        cursor: loading || exporting ? 'not-allowed' : 'pointer',
                        opacity: loading || exporting ? 0.5 : 1, fontFamily: 'var(--font-body)',
                      }}
                    >
                      {exporting ? 'Exporting...' : 'Export as Word'}
                    </button>
                  </div>
                </div>

                <div
                  ref={outputRef}
                  style={{
                    maxHeight: '600px', overflowY: 'auto', padding: '16px',
                    background: '#FAFBFC', borderRadius: '12px', border: '1px solid #E5E7EB',
                    fontSize: '13px', color: '#0f0f0f', lineHeight: '1.7',
                    fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap', wordWrap: 'break-word',
                  }}
                >
                  {outlineText}
                  {loading && <span style={{ display: 'inline-block', width: 6, height: 16, background: '#0966C3', marginLeft: 2, animation: 'blink 1s infinite' }} />}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '16px', background: '#FEF3C7', borderLeft: '3px solid #D97706', borderRadius: 6, fontSize: 12, color: '#78350F', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                <strong>Important:</strong> AI-generated template — requires attorney review and customization. Do not use this outline as-is in a deposition. Questions must be adapted to the specific facts, exhibits, and strategy of your case.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/demand-letter" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 4px' }}>Demand Letter</p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>Generate demand letters</p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 4px' }}>Case Predictor</p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>Predict outcomes</p>
            </div>
          </Link>
          <Link href="/attorney/venue-optimizer" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 4px' }}>Venue Optimizer</p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>Find optimal districts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
