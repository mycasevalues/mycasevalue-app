'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function DocumentIntelligencePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/attorney/document-intelligence', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setAnalysis(data.analysis);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      <style>{`
        input:focus { border-color: var(--accent-primary) !important; outline: none; box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08); }
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
      `}</style>
      {/* Header */}
      <div style={{ background: 'var(--accent-primary)', padding: '18px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 600, color: 'var(--color-surface-0)', margin: '0 0 4px 0' }}>Document Intelligence</h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>AI-powered legal document analysis for case classification and insights</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
          Upload a legal document — complaint, motion, or brief — to receive an AI-powered analysis including case type classification, key claims identified, relevant NOS codes, and comparable federal court outcomes.
        </p>

        <div style={{ border: '2px dashed var(--border-default)', borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '24px', background: 'var(--color-surface-0)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={e => setFile(e.target.files?.[0] || null)}
            style={{ display: 'block', margin: '0 auto 16px', fontSize: '14px' }}
          />
          {file && <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            style={{ padding: '0 28px', height: '48px', background: !file || loading ? 'var(--border-default)' : 'var(--accent-primary)', color: 'var(--color-surface-0)', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: file && !loading ? 'pointer' : 'not-allowed', textTransform: 'uppercase', letterSpacing: '0.04em' }}
          >
            {loading ? 'Analyzing...' : 'Analyze Document'}
          </button>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '12px' }}>Supported: PDF, TXT, DOC, DOCX · Max 10MB</p>
        </div>

        {error && <div style={{ padding: '12px 16px', background: 'rgba(10, 102, 194, 0.12)', border: '1px solid var(--border-default)', borderRadius: '12px', color: 'var(--accent-primary)', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}

        {analysis && (
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Document Analysis</h2>
            <div style={{ fontSize: '14px', color: 'var(--color-text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{analysis}</div>
          </div>
        )}

        <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '24px', fontStyle: 'italic' }}>
          Document Intelligence uses AI to analyze legal documents. Results are informational only and not legal advice. Documents are processed securely and not stored after analysis.
        </p>
      </div>
    </div>
  );
}
