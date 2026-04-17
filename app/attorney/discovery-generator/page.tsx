'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';

type DiscoveryType = 'interrogatories' | 'production' | 'admissions';

const TABS: { key: DiscoveryType; label: string; rule: string }[] = [
  { key: 'interrogatories', label: 'Interrogatories', rule: 'FRCP 33' },
  { key: 'production', label: 'Requests for Production', rule: 'FRCP 34' },
  { key: 'admissions', label: 'Requests for Admissions', rule: 'FRCP 36' },
];

export default function DiscoveryGeneratorPage() {
  const [caseCategory, setCaseCategory] = useState('');
  const [caseType, setCaseType] = useState('');
  const [partyRole, setPartyRole] = useState('plaintiff');
  const [claimsDefenses, setClaimsDefenses] = useState('');
  const [activeTab, setActiveTab] = useState<DiscoveryType>('interrogatories');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [texts, setTexts] = useState<Record<DiscoveryType, string>>({
    interrogatories: '', production: '', admissions: '',
  });
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const selectedCategory = SITS.find(s => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  useEffect(() => {
    if (loading && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [texts, loading]);

  const generateTab = async (tab: DiscoveryType) => {
    if (!caseType) { setError('Please select a case type'); return; }

    setActiveTab(tab);
    setLoading(true);
    setError('');
    setTexts(prev => ({ ...prev, [tab]: '' }));

    try {
      const response = await fetch('/api/attorney/discovery-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseType, partyRole, claimsDefenses, discoveryType: tab }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to generate');
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
        setTexts(prev => ({ ...prev, [tab]: accumulated }));
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generateTab(activeTab);
  };

  const copyToClipboard = () => {
    const text = texts[activeTab];
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportAsDocx = async () => {
    const text = texts[activeTab];
    if (!text) return;
    setExporting(true);
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      const paragraphs = text.split('\n').map(line =>
        new Paragraph({
          children: [new TextRun({ text: line, font: 'Times New Roman', size: 24 })],
          spacing: { after: 100 },
        })
      );
      const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `discovery-${activeTab}.docx`;
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
    border: '1px solid var(--border-default)', borderRadius: '4px', fontSize: '14px',
    color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', fontFamily: 'var(--font-body)',
    appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  const currentText = texts[activeTab];
  const hasAnyText = texts.interrogatories || texts.production || texts.admissions;

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        select:focus, input:focus, textarea:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }
      `}</style>

      {/* Header */}
      <div style={{
        background: 'var(--card, #FFFFFF)',
        color: 'var(--card, #FFFFFF)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#FFF', fontFamily: 'var(--font-ui)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Draft Discovery Requests in Minutes, Not Hours
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
            Generate compliant interrogatories, production requests, and admissions in FRCP format instantly
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: hasAnyText ? '340px 1fr' : '1fr', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
              Case Details
            </h2>
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Category</label>
                <select value={caseCategory} onChange={e => { setCaseCategory(e.target.value); setCaseType(''); }} style={selectStyle}>
                  <option value="">Select category...</option>
                  {SITS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              {caseCategory && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Type *</label>
                  <select value={caseType} onChange={e => setCaseType(e.target.value)} style={selectStyle}>
                    <option value="">Select type...</option>
                    {caseOptions.map(opt => <option key={opt.label} value={opt.nos}>{opt.label}</option>)}
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Party Role *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['plaintiff', 'defendant'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setPartyRole(role)}
                      style={{
                        flex: 1, padding: '8px', borderRadius: '4px',
                        border: `1px solid ${partyRole === role ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                        backgroundColor: partyRole === role ? 'rgba(10,102,194,0.08)' : 'var(--color-surface-1)',
                        color: partyRole === role ? 'var(--accent-primary)' : 'var(--color-text-secondary)',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Claims or Defenses (optional)</label>
                <textarea
                  placeholder="Describe the key claims or defenses to tailor the discovery requests..."
                  value={claimsDefenses}
                  onChange={e => setClaimsDefenses(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 14px', border: '1px solid var(--border-default)',
                    borderRadius: '4px', fontSize: '14px', color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-surface-0)', fontFamily: 'var(--font-body)',
                    minHeight: '80px', resize: 'vertical', boxSizing: 'border-box' as const,
                  }}
                />
              </div>

              {error && (
                <div style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
                  <p style={{ fontSize: '13px', color: 'var(--data-negative, #B01E1E)', margin: 0 }}>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !caseType}
                style={{
                  width: '100%', padding: '16px',
                  backgroundColor: loading || !caseType ? 'var(--border-default)' : 'var(--accent-primary)',
                  color: '#FFF', border: 'none', borderRadius: '4px',
                  fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-ui)',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  cursor: loading || !caseType ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Generating...' : `Generate ${TABS.find(t => t.key === activeTab)?.label}`}
              </button>
            </form>
          </div>

          {/* Output */}
          {hasAnyText && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface-0)', borderRadius: '4px', padding: '4px', border: '1px solid var(--border-default)' }}>
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      if (!texts[tab.key] && !loading) generateTab(tab.key);
                    }}
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: '4px', border: 'none',
                      background: activeTab === tab.key ? 'var(--accent-primary)' : 'transparent',
                      color: activeTab === tab.key ? '#FFF' : 'var(--color-text-secondary)',
                      fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                    }}
                  >
                    {tab.label}
                    <span style={{ display: 'block', fontSize: '10px', fontWeight: 400, opacity: 0.8, marginTop: 2 }}>
                      {tab.rule}
                    </span>
                    {texts[tab.key] && (
                      <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: activeTab === tab.key ? '#FFF' : 'var(--data-positive, #176438)', marginLeft: 6, verticalAlign: 'middle' }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '4px', padding: '32px', border: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                    {TABS.find(t => t.key === activeTab)?.label}
                    {loading && activeTab && <span style={{ fontSize: 12, color: 'var(--accent-primary)', marginLeft: 8, fontWeight: 400 }}>streaming...</span>}
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={copyToClipboard}
                      disabled={loading || !currentText}
                      style={{
                        padding: '8px 12px', background: copied ? 'var(--data-positive, #176438)' : 'var(--accent-primary)',
                        color: '#FFF', border: 'none', borderRadius: '4px',
                        fontSize: '12px', fontWeight: 600,
                        cursor: loading || !currentText ? 'not-allowed' : 'pointer',
                        opacity: loading || !currentText ? 0.5 : 1,
                      }}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={exportAsDocx}
                      disabled={loading || exporting || !currentText}
                      style={{
                        padding: '8px 12px', background: 'var(--accent-primary-hover)',
                        color: '#FFF', border: 'none', borderRadius: '4px',
                        fontSize: '12px', fontWeight: 600,
                        cursor: loading || exporting || !currentText ? 'not-allowed' : 'pointer',
                        opacity: loading || exporting || !currentText ? 0.5 : 1,
                      }}
                    >
                      {exporting ? 'Exporting...' : 'Export as Word'}
                    </button>
                  </div>
                </div>

                {currentText ? (
                  <div
                    ref={outputRef}
                    style={{
                      maxHeight: '600px', overflowY: 'auto', padding: '16px',
                      background: 'var(--color-surface-1)', borderRadius: '4px', border: '1px solid var(--border-default)',
                      fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: '1.7',
                      fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap', wordWrap: 'break-word',
                    }}
                  >
                    {currentText}
                    {loading && <span style={{ display: 'inline-block', width: 6, height: 16, background: 'var(--accent-primary)', marginLeft: 2, animation: 'blink 1s infinite' }} />}
                  </div>
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                    {loading ? 'Generating...' : 'Click "Generate" or switch to this tab to generate content.'}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '16px', background: 'rgba(234,179,8,0.1)', borderLeft: '3px solid #D97706', borderRadius: 4, fontSize: 12, color: '#fde68a', lineHeight: 1.6 }}>
                <strong>Important:</strong> Must be reviewed by a licensed attorney and conformed to local court rules before filing. Discovery requests may need to be modified based on local rules regarding number limits, format requirements, and meet-and-confer obligations.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
