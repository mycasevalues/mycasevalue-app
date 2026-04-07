'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

export default function DemandLetterPage() {
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');
  const [briefFacts, setBriefFacts] = useState('');
  const [partyRole, setPartyRole] = useState('plaintiff');
  const [economicDamages, setEconomicDamages] = useState('');
  const [painSuffering, setPainSuffering] = useState('');
  const [lostWages, setLostWages] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [letterText, setLetterText] = useState('');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const allCaseTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      nos: opt.nos,
      category: cat.label,
    }))
  ).sort((a, b) => a.label.localeCompare(b.label));

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseType || !briefFacts.trim() || !partyRole) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    setLetterText('');

    try {
      const response = await fetch('/api/attorney/demand-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseType,
          district,
          briefFacts,
          partyRole,
          economicDamages: economicDamages ? parseInt(economicDamages) : 0,
          painSuffering: painSuffering ? parseInt(painSuffering) : 0,
          lostWages: lostWages ? parseInt(lostWages) : 0,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to generate demand letter');
        setLoading(false);
        return;
      }

      // Stream the response
      const reader = response.body?.getReader();
      if (!reader) {
        setError('Streaming not supported');
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setLetterText(accumulated);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (letterText) {
      navigator.clipboard.writeText(letterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportAsDocx = async () => {
    if (!letterText) return;
    setExporting(true);
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('docx');

      const paragraphs = letterText.split('\n').map(line =>
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              font: 'Times New Roman',
              size: 24,
            }),
          ],
          spacing: { after: 120 },
        })
      );

      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'demand-letter.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to export document. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const totalDemand = (parseInt(economicDamages) || 0) + (parseInt(painSuffering) || 0) + (parseInt(lostWages) || 0);

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
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        select:focus, input:focus, textarea:focus { outline: none; border-color: #0A66C2; box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }
      `}</style>
      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#0A66C2', flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0A66C2', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Settlement Demand Letter
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            AI Demand Letter Generator
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Generate a professional settlement demand letter template with AI analysis of comparable cases and settlement data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: letterText ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Case Information
            </h2>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Case Type */}
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
                  <option value="">Select case type...</option>
                  {allCaseTypes.map((ct) => (
                    <option key={ct.nos} value={ct.nos}>
                      {ct.label} ({ct.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label style={labelStyle}>Federal District (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Southern District of New York"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Party Role */}
              <div>
                <label style={labelStyle}>Your Role *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { val: 'plaintiff', label: 'Plaintiff' },
                    { val: 'defendant', label: 'Defendant' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => {
                        setPartyRole(opt.val);
                        setError('');
                      }}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '12px',
                        border: `1px solid ${partyRole === opt.val ? '#0A66C2' : '#E5E7EB'}`,
                        backgroundColor: partyRole === opt.val ? 'rgba(10, 102, 194, 0.08)' : '#FAFBFC',
                        color: partyRole === opt.val ? '#0A66C2' : '#4B5563',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brief Facts */}
              <div>
                <label style={labelStyle}>Case Facts & Circumstances *</label>
                <textarea
                  placeholder="Describe the key facts, timeline, and circumstances that support your claim. Include relevant details about liability, damages, and any prior settlement discussions."
                  value={briefFacts}
                  onChange={(e) => {
                    setBriefFacts(e.target.value);
                    setError('');
                  }}
                  style={{
                    ...inputStyle,
                    minHeight: '140px',
                    resize: 'vertical',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                  {briefFacts.length}/3000 characters
                </p>
              </div>

              {/* Damages Section */}
              <div style={{ background: '#F7F8FA', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px', fontFamily: 'var(--font-body)' }}>
                  Damages Breakdown
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Economic Damages ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={economicDamages}
                      onChange={(e) => setEconomicDamages(e.target.value)}
                      style={inputStyle}
                    />
                    <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      Medical bills, lost income, property damage
                    </p>
                  </div>

                  <div>
                    <label style={labelStyle}>Pain & Suffering ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={painSuffering}
                      onChange={(e) => setPainSuffering(e.target.value)}
                      style={inputStyle}
                    />
                    <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      Emotional distress, physical pain, reduced quality of life
                    </p>
                  </div>

                  <div>
                    <label style={labelStyle}>Lost Wages ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={lostWages}
                      onChange={(e) => setLostWages(e.target.value)}
                      style={inputStyle}
                    />
                    <p style={{ fontSize: '11px', color: '#4B5563', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                      Lost earnings and reduced earning capacity
                    </p>
                  </div>

                  {(economicDamages || painSuffering || lostWages) && (
                    <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>
                          Total Demand:
                        </span>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#0A66C2', fontFamily: 'var(--font-mono)' }}>
                          ${((parseInt(economicDamages) || 0) + (parseInt(painSuffering) || 0) + (parseInt(lostWages) || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid #E5E7EB' }}>
                  <p style={{ fontSize: '13px', color: '#0A66C2', margin: 0, fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !caseType || !briefFacts.trim() || !partyRole}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: loading || !caseType || !briefFacts.trim() ? '#E5E7EB' : '#0A66C2',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: loading || !caseType || !briefFacts.trim() ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {loading ? 'Generating Letter...' : 'Generate Demand Letter'}
              </button>
            </form>
          </div>

          {/* Generated Letter */}
          {letterText && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0, fontFamily: 'var(--font-display)' }}>
                    Generated Demand Letter
                    {loading && <span style={{ fontSize: 12, color: '#0A66C2', marginLeft: 8, fontWeight: 400 }}>streaming...</span>}
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={copyToClipboard}
                      disabled={loading}
                      style={{
                        padding: '8px 12px',
                        background: copied ? '#059669' : '#0A66C2',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s',
                        fontFamily: 'var(--font-body)',
                        opacity: loading ? 0.5 : 1,
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={exportAsDocx}
                      disabled={loading || exporting}
                      style={{
                        padding: '8px 12px',
                        background: '#004182',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: loading || exporting ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s',
                        fontFamily: 'var(--font-body)',
                        opacity: loading || exporting ? 0.5 : 1,
                      }}
                    >
                      {exporting ? 'Exporting...' : 'Export as Word'}
                    </button>
                  </div>
                </div>

                <div
                  ref={letterRef}
                  style={{
                    maxHeight: '600px',
                    overflowY: 'auto',
                    padding: '16px',
                    background: '#FAFBFC',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    fontSize: '13px',
                    color: '#0f0f0f',
                    lineHeight: '1.7',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                  }}
                >
                  {letterText}
                  {loading && <span style={{ display: 'inline-block', width: 6, height: 16, background: '#0A66C2', marginLeft: 2, animation: 'blink 1s infinite' }} />}
                </div>

                {/* Total Demand Display */}
                {totalDemand > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                        Total Demand Amount:
                      </span>
                      <span style={{ fontSize: '20px', fontWeight: '700', color: '#0A66C2', fontFamily: 'var(--font-mono)' }}>
                        ${totalDemand.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FEE2BE 100%)', borderRadius: '12px', padding: '16px', border: '1px solid #FCD34D' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#B86E00', flexShrink: 0, marginTop: '2px' }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: '#B86E00', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>
                      Important Disclaimer
                    </p>
                    <p style={{ fontSize: '12px', color: '#92400E', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                      AI-generated template — must be reviewed and modified by a licensed attorney before use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        {!letterText && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                AI-Powered Analysis
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Our AI references historical settlement data from 4M+ federal cases to strengthen your demand.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                Professional Template
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Get a complete, customizable template ready for attorney review and modification.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
                Case-Specific
              </h3>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Each letter is tailored to your specific case type, jurisdiction, and damages breakdown.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E5E7EB', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Predict case outcomes
              </p>
            </div>
          </Link>
          <Link href="/search" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Search
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Find case data
              </p>
            </div>
          </Link>
          <Link href="/translate" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Jargon Translator
              </p>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
                Translate legal terms
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
