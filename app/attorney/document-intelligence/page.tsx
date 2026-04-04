'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

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
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px', fontFamily: 'var(--font-body)', minHeight: '100vh', backgroundColor: 'transparent' }}>
      <a href="/attorney" style={{ fontSize: '13px', color: 'rgba(240,242,245,0.40)', textDecoration: 'none' }}>&larr; Attorney Mode</a>
      <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '16px 0 8px', color: '#F0F2F5', fontFamily: 'var(--font-display)' }}>Document Intelligence</h1>
      <p style={{ fontSize: '15px', color: 'rgba(240,242,245,0.40)', marginBottom: '32px' }}>
        Upload a legal document — complaint, motion, or brief — to receive an AI-powered analysis including case type classification, key claims identified, relevant NOS codes, and comparable federal court outcomes.
      </p>

      <div style={{ border: '2px dashed rgba(255,255,255,0.10)', borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '24px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={e => setFile(e.target.files?.[0] || null)}
          style={{ display: 'block', margin: '0 auto 16px', fontSize: '14px' }}
        />
        {file && <p style={{ fontSize: '13px', color: 'rgba(240,242,245,0.40)', marginBottom: '16px' }}>Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={{ padding: '10px 28px', background: '#1856FF', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: file && !loading ? 'pointer' : 'not-allowed', opacity: !file || loading ? 0.5 : 1 }}
        >
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
        <p style={{ fontSize: '11px', color: 'rgba(240,242,245,0.40)', marginTop: '12px' }}>Supported: PDF, TXT, DOC, DOCX · Max 10MB</p>
      </div>

      {error && <div style={{ padding: '12px 16px', background: 'rgba(234,33,67,0.12)', border: '1px solid rgba(234,33,67,0.20)', borderRadius: '8px', color: '#EA2143', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}

      {analysis && (
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#F0F2F5', fontFamily: 'var(--font-display)' }}>Document Analysis</h2>
          <div style={{ fontSize: '14px', color: '#F0F2F5', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{analysis}</div>
        </div>
      )}

      <p style={{ fontSize: '11px', color: 'rgba(240,242,245,0.40)', marginTop: '24px', fontStyle: 'italic' }}>
        Document Intelligence uses AI to analyze legal documents. Results are informational only and not legal advice. Documents are processed securely and not stored after analysis.
      </p>
    </main>
  );
}
