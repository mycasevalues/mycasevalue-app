'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../../lib/data';

export default function ResearchMemoPage() {
  const [legalQuestion, setLegalQuestion] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [caseCategory, setCaseCategory] = useState('');
  const [caseType, setCaseType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memoText, setMemoText] = useState('');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const selectedCategory = SITS.find(s => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  useEffect(() => {
    if (loading && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [memoText, loading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalQuestion.trim()) { setError('Please enter a legal question'); return; }

    setLoading(true);
    setError('');
    setMemoText('');

    try {
      const response = await fetch('/api/attorney/research-memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legalQuestion, jurisdiction, caseType }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to generate memo');
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
        setMemoText(accumulated);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (memoText) {
      navigator.clipboard.writeText(memoText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportAsDocx = async () => {
    if (!memoText) return;
    setExporting(true);
    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');

      const children: InstanceType<typeof Paragraph>[] = [];
      memoText.split('\n').forEach(line => {
        const trimmed = line.trim();
        const isSectionHeader = /^[IVX]+\.\s/.test(trimmed) || /^#{1,3}\s/.test(trimmed);

        if (isSectionHeader) {
          children.push(new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: trimmed.replace(/^#+\s*/, ''), bold: true, font: 'Times New Roman', size: 28 })],
            spacing: { before: 240, after: 120 },
          }));
        } else {
          children.push(new Paragraph({
            children: [new TextRun({ text: line, font: 'Times New Roman', size: 24 })],
            spacing: { after: 100 },
          }));
        }
      });

      const doc = new Document({ sections: [{ properties: {}, children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'research-memo.docx';
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
    border: '1px solid var(--border-default)', borderRadius: '12px', fontSize: '14px',
    color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', fontFamily: 'var(--font-body)',
    appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        select:focus, input:focus, textarea:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }
      `}</style>

      {/* Header */}
      <div style={{ background: 'var(--gradient-hero)', padding: '18px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#FFF', fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
            Research Memos Backed by Real Court Data
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
            Generate IRAC memoranda with platform statistics showing outcome trends and settlement data
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: memoText ? '380px 1fr' : '1fr', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Research Parameters
            </h2>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Legal Question / Issue *</label>
                <textarea
                  placeholder="State the legal question or issue to research. Be as specific as possible about the factual scenario and the legal standards at issue..."
                  value={legalQuestion}
                  onChange={e => setLegalQuestion(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px', border: '1px solid var(--border-default)',
                    borderRadius: '12px', fontSize: '14px', color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-surface-0)', fontFamily: 'var(--font-body)',
                    minHeight: '140px', resize: 'vertical', boxSizing: 'border-box' as const,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Jurisdiction</label>
                <select value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} style={selectStyle}>
                  <option value="">Federal (General)</option>
                  {STATES.filter(s => s.id).map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Category (optional)</label>
                <select value={caseCategory} onChange={e => { setCaseCategory(e.target.value); setCaseType(''); }} style={selectStyle}>
                  <option value="">Select category...</option>
                  {SITS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              {caseCategory && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Type</label>
                  <select value={caseType} onChange={e => setCaseType(e.target.value)} style={selectStyle}>
                    <option value="">Select type...</option>
                    {caseOptions.map(opt => <option key={opt.label} value={opt.nos}>{opt.label}</option>)}
                  </select>
                </div>
              )}

              {error && (
                <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
                  <p style={{ fontSize: '13px', color: '#CC1016', margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !legalQuestion.trim()}
                style={{
                  width: '100%', padding: '14px',
                  backgroundColor: loading || !legalQuestion.trim() ? 'var(--border-default)' : 'var(--accent-primary)',
                  color: '#FFF', border: 'none', borderRadius: '12px',
                  fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  cursor: loading || !legalQuestion.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Generating Memo...' : 'Generate Research Memo'}
              </button>
            </form>
          </div>

          {/* Output */}
          {memoText && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Research Memorandum
                    {loading && <span style={{ fontSize: 12, color: 'var(--accent-primary)', marginLeft: 8, fontWeight: 400 }}>streaming...</span>}
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={copyToClipboard} disabled={loading} style={{ padding: '8px 12px', background: copied ? '#059669' : 'var(--accent-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button onClick={exportAsDocx} disabled={loading || exporting} style={{ padding: '8px 12px', background: 'var(--accent-primary-hover)', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: loading || exporting ? 'not-allowed' : 'pointer', opacity: loading || exporting ? 0.5 : 1 }}>
                      {exporting ? 'Exporting...' : 'Export as Word'}
                    </button>
                  </div>
                </div>

                <div ref={outputRef} style={{ maxHeight: '650px', overflowY: 'auto', padding: '16px', background: 'var(--color-surface-1)', borderRadius: '12px', border: '1px solid var(--border-default)', fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: '1.7', fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {memoText}
                  {loading && <span style={{ display: 'inline-block', width: 6, height: 16, background: 'var(--accent-primary)', marginLeft: 2, animation: 'blink 1s infinite' }} />}
                </div>
              </div>

              <div style={{ padding: '16px', background: 'rgba(234,179,8,0.1)', borderLeft: '3px solid #D97706', borderRadius: 6, fontSize: 12, color: '#78350F', lineHeight: 1.6 }}>
                <strong>Important:</strong> AI-generated research memo for attorney review only — not a substitute for primary legal research. All citations and legal standards must be independently verified through Westlaw, LexisNexis, or other authoritative legal databases.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
