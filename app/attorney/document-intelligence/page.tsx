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
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px', fontFamily: 'var(--font-body)', minHeight: '100vh', backgroundColor: '#EDEEEE' }}>
      <a href="/attorney" style={{ fontSize: '13px', color: '#006997', textDecoration: 'none' }}>&larr; Attorney Mode</a>
      <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '16px 0 8px', color: '#212529', fontFamily: 'var(--font-display)' }}>Document Intelligence</h1>
      <p style={{ fontSize: '15px', color: '#666666', marginBottom: '32px' }}>
        Upload a legal document — complaint, motion, or brief — to receive an AI-powered analysis including case type classification, key claims identified, relevant NOS codes, and comparable federal court outcomes.
      </p>

      <div style={{ border: '2px dashed #D5D8DC', borderRadius: '4px', padding: '40px', textAlign: 'center', marginBottom: '24px', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={e => setFile(e.target.files?.[0] || null)}
          style={{ display: 'block', margin: '0 auto 16px', fontSize: '14px' }}
        />
        {file && <p style={{ fontSize: '13px', color: '#666666', marginBottom: '16px' }}>Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={{ padding: '10px 28px', background: '#006997', color: '#fff', border: 'none', borderRadius: '0px', fontWeight: 600, fontSize: '14px', cursor: file && !loading ? 'pointer' : 'not-allowed', opacity: !file || loading ? 0.5 : 1 }}
        >
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
        <p style={{ fontSize: '11px', color: '#666666', marginTop: '12px' }}>Supported: PDF, TXT, DOC, DOCX · Max 10MB</p>
      </div>

      {error && <div style={{ padding: '12px 16px', background: 'rgba(204,16,25,0.08)', border: '1px solid #D5D8DC', borderRadius: '4px', color: '#CC1019', fontSize: '14px', marginBottom: '16px' }}>{error}</div>}

      {analysis && (
        <div style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#212529', fontFamily: 'var(--font-display)' }}>Document Analysis</h2>
          <div style={{ fontSize: '14px', color: '#212529', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{analysis}</div>
        </div>
      )}

      <p style={{ fontSize: '11px', color: '#666666', marginTop: '24px', fontStyle: 'italic' }}>
        Document Intelligence uses AI to analyze legal documents. Results are informational only and not legal advice. Documents are processed securely and not stored after analysis.
      </p>
    </main>
  );
}
