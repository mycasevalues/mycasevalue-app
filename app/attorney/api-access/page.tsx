'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_ENDPOINTS = [
  { method: 'GET', path: '/api/attorney/judge-intelligence?state={state}', desc: 'Get judge statistics for a federal district' },
  { method: 'POST', path: '/api/attorney/case-predictor', desc: 'Predict case outcomes based on factors' },
  { method: 'GET', path: '/api/attorney/venue-optimizer?nos={nos}&prioritize={metric}', desc: 'Rank venues for a case type' },
  { method: 'POST', path: '/api/attorney/bulk-analysis', desc: 'Analyze a portfolio of case types' },
  { method: 'GET', path: '/api/attorney/opposing-counsel?q={name}', desc: 'Research opposing counsel' },
  { method: 'GET', path: '/api/nos/{code}', desc: 'Get detailed case type statistics' },
  { method: 'GET', path: '/api/data?nos={code}&state={state}', desc: 'Get case data by NOS code and state' },
  { method: 'GET', path: '/api/quick-stats', desc: 'Get quick summary statistics' },
];

const CODE_EXAMPLE = `// Example: Predict case outcome
const response = await fetch('https://www.mycasevalues.com/api/attorney/case-predictor', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    caseType: '442',          // NOS code
    state: 'CA',              // Filing state
    hasAttorney: true,
    damageAmount: 'large',    // small|mid|large|xlarge|huge
    caseStrength: 'strong',   // weak|moderate|strong
    priorOffers: false,
    documentedEvidence: true
  })
});

const data = await response.json();
console.log(data.prediction.predictedWinRate);    // e.g. 67
console.log(data.prediction.settlementRange);      // { low, median, high }`;

const methodColors: Record<string, string> = {
  GET: '#16A34A',
  POST: '#2563EB',
  PUT: '#D97706',
  DELETE: '#DC2626',
};

export default function ApiAccessPage() {
  const [apiKey] = useState('mcv_live_****************************7f3a');
  const [copied, setCopied] = useState(false);

  function copyKey() {
    navigator.clipboard.writeText(apiKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'var(--font-body)' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#8B5CF6', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Attorney Mode
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" /><path d="M10 12l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#111111', margin: 0 }}>API Access</h1>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>Programmatic access to MyCaseValue data for custom integrations</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>
        {/* API Key */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          <h2 className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#111111', margin: '0 0 12px' }}>Your API Key</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, padding: '12px 14px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#111111', letterSpacing: '0.5px' }}>
              {apiKey}
            </div>
            <button onClick={copyKey} style={{ padding: '12px 20px', backgroundColor: copied ? '#16A34A' : '#8B5CF6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s', minWidth: '80px' }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '10px 0 0' }}>Include this key in the Authorization header: <code style={{ fontFamily: 'var(--font-mono)', backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: '3px' }}>Bearer YOUR_API_KEY</code></p>
        </div>

        {/* Usage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Requests Today', value: '47', limit: '/ 1,000' },
            { label: 'This Month', value: '1,234', limit: '/ 50,000' },
            { label: 'Rate Limit', value: '60', limit: 'req/min' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 6px' }}>{s.label}</p>
              <p style={{ margin: 0 }}>
                <span className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: '#111111' }}>{s.value}</span>
                <span style={{ fontSize: '13px', color: '#9CA3AF', marginLeft: '4px' }}>{s.limit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Endpoints */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB' }}>
            <h2 className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#111111', margin: 0 }}>Available Endpoints</h2>
          </div>
          {API_ENDPOINTS.map((ep, i) => (
            <div key={i} style={{ padding: '14px 24px', borderBottom: i < API_ENDPOINTS.length - 1 ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="font-mono" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: `${methodColors[ep.method]}15`, color: methodColors[ep.method], minWidth: '42px', textAlign: 'center' }}>{ep.method}</span>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#111111', flex: 1 }}>{ep.path}</code>
              <span style={{ fontSize: '12px', color: '#6B7280', flexShrink: 0 }}>{ep.desc}</span>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#111111', margin: 0 }}>Quick Start Example</h2>
            <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, padding: '3px 10px', borderRadius: '4px', backgroundColor: '#F3F4F6' }}>JavaScript</span>
          </div>
          <pre style={{ margin: 0, padding: '20px 24px', backgroundColor: '#1E1E1E', color: '#D4D4D4', fontSize: '13px', lineHeight: 1.6, fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
            {CODE_EXAMPLE}
          </pre>
        </div>
      </div>
    </div>
  );
}
