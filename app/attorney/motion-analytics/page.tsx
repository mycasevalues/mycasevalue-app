'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CaseTypeOption = { nos: string; label: string; total: number };

type MotionStats = {
  motionType: string;
  grantRate: number;
  partialGrantRate: number;
  avgTimeToRulingMonths: number;
  strategicNotes: string;
  successColor: string;
  successLevel: 'high' | 'moderate' | 'low';
};

type MotionAnalyticsResponse = {
  nos: string;
  caseType: string;
  motions: MotionStats[];
  disclaimer: string;
};

const MOTION_TYPES = [
  'Motion to Dismiss (12(b)(6))',
  'Motion for Summary Judgment',
  'Motion to Compel Discovery',
  'Motion for Preliminary Injunction',
  'Motion to Remand',
  'Motion for Class Certification',
  'Motion in Limine',
  'Motion for Sanctions',
];

export default function MotionAnalyticsPage() {
  const focusStyle = `
    select:focus, input:focus {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08);
    }
  `;

  const [caseTypes, setCaseTypes] = useState<CaseTypeOption[]>([]);
  const [selectedNos, setSelectedNos] = useState('');
  const [selectedNos2, setSelectedNos2] = useState('');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [data, setData] = useState<MotionAnalyticsResponse | null>(null);
  const [data2, setData2] = useState<MotionAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Load case types
  useEffect(() => {
    fetch('/api/attorney/motion-analytics')
      .then((r) => r.json())
      .then((d) => setCaseTypes(d.caseTypes || []))
      .catch(() => {});
  }, []);

  async function loadMotionData(nos: string, isSecond = false) {
    if (!nos) return;

    try {
      const res = await fetch(`/api/attorney/motion-analytics?nos=${nos}`);
      if (res.ok) {
        const result = await res.json();
        if (isSecond) {
          setData2(result);
        } else {
          setData(result);
        }
      }
    } catch {
      // silent
    }
  }

  useEffect(() => {
    setLoading(true);
    if (comparisonMode) {
      Promise.all([
        selectedNos ? loadMotionData(selectedNos, false) : null,
        selectedNos2 ? loadMotionData(selectedNos2, true) : null,
      ]).then(() => setLoading(false));
    } else {
      if (selectedNos) loadMotionData(selectedNos, false);
      setData2(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNos, selectedNos2, comparisonMode]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-ui)' }}>
      <style>{focusStyle}
        {`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
        `}
      </style>

      {/* Header */}
      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Attorney Tools
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 15h6" />
              </svg>
            </div>
            <div>
              <h1 className="font-legal" style={{ fontSize: 28, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                Win More Motions with Circuit-Specific Data
              </h1>
              <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '4px 0 0 0' }}>
                Analyze federal motion grant rates by case type
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(10, 102, 194, 0.8)', margin: '12px 0 0', fontWeight: 500 }}>
            Free during public beta
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Controls */}
        <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 300px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Case Type
              </label>
              <select
                value={selectedNos}
                onChange={(e) => setSelectedNos(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', height: '48px', border: '1px solid var(--border-default)', borderRadius: '4px', fontSize: '14px', color: 'var(--color-text-primary)', background: 'var(--color-surface-0)', fontFamily: 'var(--font-ui)', transition: 'border-color 0.2s' }}
              >
                <option value="">Select case type...</option>
                {caseTypes.map((ct) => (
                  <option key={ct.nos} value={ct.nos}>
                    {ct.label} (NOS {ct.nos})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: '0 0 auto' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Comparison
              </label>
              <button
                onClick={() => setComparisonMode(!comparisonMode)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-default)',
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  backgroundColor: comparisonMode ? 'var(--accent-primary)' : 'var(--color-surface-0)',
                  color: comparisonMode ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                Compare Side by Side
              </button>
            </div>
          </div>

          {/* Second case selector in comparison mode */}
          {comparisonMode && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Compare with
              </label>
              <select
                value={selectedNos2}
                onChange={(e) => setSelectedNos2(e.target.value)}
                style={{ width: '100%', maxWidth: '400px', padding: '12px 14px', height: '48px', border: '1px solid var(--border-default)', borderRadius: '4px', fontSize: '14px', color: 'var(--color-text-primary)', background: 'var(--color-surface-0)', fontFamily: 'var(--font-ui)', transition: 'border-color 0.2s' }}
              >
                <option value="">Select second case type...</option>
                {caseTypes.map((ct) => (
                  <option key={ct.nos} value={ct.nos} disabled={ct.nos === selectedNos}>
                    {ct.label} (NOS {ct.nos})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 36, height: 36, border: '3px solid var(--border-default)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Analyzing motion data...</p>
          </div>
        )}

        {/* Single case view */}
        {!loading && data && !comparisonMode && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-legal" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
                {data.caseType} — Motion Success Rates
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
                Based on federal court data for {data.caseType} cases
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {data.motions.map((motion) => (
                <div
                  key={motion.motionType}
                  style={{
                    background: 'var(--color-surface-0)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                      {motion.motionType}
                    </h3>
                    <div
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: motion.successColor === 'green' ? 'rgba(23, 100, 56, 0.08)' : motion.successColor === 'amber' ? 'rgba(122, 88, 0, 0.08)' : 'rgba(10, 102, 194, 0.06)',
                        color: motion.successColor === 'green' ? 'var(--data-positive)' : motion.successColor === 'amber' ? 'var(--wrn-txt)' : 'var(--link)',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {motion.successColor === 'green' ? 'Strong' : motion.successColor === 'amber' ? 'Moderate' : 'Challenging'}
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const }}>Grant Rate</span>
                      <span className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: motion.successColor === 'green' ? 'var(--data-positive)' : motion.successColor === 'amber' ? 'var(--wrn-txt)' : 'var(--accent-primary)' }}>
                        {motion.grantRate}%
                      </span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bdr)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(motion.grantRate, 100)}%`,
                          background: motion.successColor === 'green' ? 'var(--data-positive)' : motion.successColor === 'amber' ? 'var(--wrn-txt)' : 'var(--accent-primary)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-default)' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 4px' }}>Partial Grant</p>
                      <p className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                        {motion.partialGrantRate}%
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 4px' }}>Avg Time to Ruling</p>
                      <p className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                        {motion.avgTimeToRulingMonths} mo
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    <strong>Strategy:</strong> {motion.strategicNotes}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '24px', padding: '16px 16px', backgroundColor: 'rgba(122,88,0,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', color: 'var(--wrn-txt)', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>
          </>
        )}

        {/* Comparison view */}
        {!loading && data && data2 && comparisonMode && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-legal" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
                Motion Success Rate Comparison
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
                {data.caseType} vs {data2.caseType}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {/* Left case */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--accent-primary)' }}>
                  {data.caseType}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data.motions.map((motion) => (
                    <div
                      key={motion.motionType}
                      style={{
                        background: 'var(--color-surface-0)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '4px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{motion.motionType}</span>
                        <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                          {motion.grantRate}%
                        </span>
                      </div>
                      <div style={{ height: '4px', background: 'var(--border-default)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(motion.grantRate, 100)}%`,
                            background: 'var(--accent-primary)',
                            borderRadius: '2px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right case */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--data-positive)' }}>
                  {data2.caseType}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {data2.motions.map((motion) => (
                    <div
                      key={motion.motionType}
                      style={{
                        background: 'var(--color-surface-0)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '4px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{motion.motionType}</span>
                        <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--data-positive)' }}>
                          {motion.grantRate}%
                        </span>
                      </div>
                      <div style={{ height: '4px', background: 'var(--border-default)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(motion.grantRate, 100)}%`,
                            background: 'var(--data-positive)',
                            borderRadius: '2px',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '24px', padding: '16px 16px', backgroundColor: 'rgba(122,88,0,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
              <p style={{ fontSize: '11px', color: 'var(--wrn-txt)', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> Motion success rates are derived from public federal court statistics (FJC IDB). Actual outcomes depend on jurisdiction, judge, opposing counsel, and case-specific factors.
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!selectedNos && !loading && (
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 15h6" />
              </svg>
            </div>
            <h2 className="font-legal" style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px' }}>
              Analyze Motion Success Rates
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              Select a case type to view federal motion grant rates, partial grant rates, and average ruling times. Compare multiple case types side by side to inform motion strategy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
