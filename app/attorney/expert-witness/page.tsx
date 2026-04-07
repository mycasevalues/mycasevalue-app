'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CaseTypeOption = { nos: string; label: string; total: number };

type ExpertCategory = {
  name: string;
  feeRangeLow: number;
  feeRangeHigh: number;
  commonQualifications: string;
  retentionTiming: string;
  daubertChallengeSuccessRate: number;
  retentionTimingLabel: string;
};

type ExpertWitnessResponse = {
  nos: string;
  caseType: string;
  experts: ExpertCategory[];
  estimatedTotalCostLow: number;
  estimatedTotalCostHigh: number;
  disclaimer: string;
};

export default function ExpertWitnessPage() {
  const focusStyle = `
    select:focus, input:focus {
      outline: none;
      border-color: #0A66C2;
      box-shadow: 0 0 0 2px rgba(10, 102, 194, 0.08);
    }
  `;

  const [caseTypes, setCaseTypes] = useState<CaseTypeOption[]>([]);
  const [selectedNos, setSelectedNos] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState<number | string>('');
  const [data, setData] = useState<ExpertWitnessResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Load case types
  useEffect(() => {
    fetch('/api/attorney/expert-witness')
      .then((r) => r.json())
      .then((d) => setCaseTypes(d.caseTypes || []))
      .catch(() => {});
  }, []);

  async function loadExpertData() {
    if (!selectedNos) return;
    setLoading(true);

    try {
      const params = new URLSearchParams({ nos: selectedNos });
      if (estimatedDuration) {
        params.append('duration', estimatedDuration.toString());
      }
      const res = await fetch(`/api/attorney/expert-witness?${params}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // silent
    }
    setLoading(false);
  }

  useEffect(() => {
    if (selectedNos) {
      loadExpertData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNos, estimatedDuration]);

  const durationMonths = estimatedDuration ? parseInt(estimatedDuration.toString()) : 12;

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      <style>{focusStyle}
        {`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
        `}
      </style>

      {/* Header */}
      <div style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#0A66C2', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Attorney Tools
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                Expert Witness Intelligence
              </h1>
              <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '4px 0 0 0' }}>
                Expert categories, fees, and retention strategy by case type
              </p>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(10, 102, 194, 0.8)', margin: '12px 0 0', fontWeight: 500 }}>
            Free during public beta
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Controls */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Case Type
              </label>
              <select
                value={selectedNos}
                onChange={(e) => setSelectedNos(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', height: '48px', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#0f0f0f', background: '#FFFFFF', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
              >
                <option value="">Select case type...</option>
                {caseTypes.map((ct) => (
                  <option key={ct.nos} value={ct.nos}>
                    {ct.label} (NOS {ct.nos})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
                Estimated Duration (months)
              </label>
              <input
                type="number"
                min="6"
                max="120"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="12"
                style={{ width: '100%', padding: '12px 14px', height: '48px', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#0f0f0f', background: '#FFFFFF', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
              />
            </div>
          </div>

          {estimatedDuration && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                Cost estimates are based on {durationMonths}-month engagement
              </p>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 36, height: 36, border: '3px solid #E5E7EB', borderTopColor: '#0A66C2', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '14px', color: '#4B5563' }}>Retrieving expert witness data...</p>
          </div>
        )}

        {/* Expert data */}
        {!loading && data && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px' }}>
                Expert Witness Categories for {data.caseType}
              </h2>
              <p style={{ fontSize: '14px', color: '#4B5563', margin: 0 }}>
                {data.experts.length} common expert categories used in {data.caseType} cases
              </p>
            </div>

            {/* Cost estimate summary */}
            {estimatedDuration && (
              <div style={{ background: 'rgba(10, 102, 194, 0.08)', border: '1px solid rgba(10, 102, 194, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 8px' }}>
                  Estimated Total Expert Costs ({durationMonths} months)
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '20px', fontWeight: 600, color: '#0A66C2' }}>
                    ${(data.estimatedTotalCostLow / 1000).toFixed(0)}K
                  </span>
                  <span style={{ fontSize: '14px', color: '#4B5563' }}>
                    to ${(data.estimatedTotalCostHigh / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {data.experts.map((expert) => (
                <div
                  key={expert.name}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 16px' }}>
                    {expert.name}
                  </h3>

                  {/* Fee Range */}
                  <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
                    <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 6px' }}>
                      Typical Fee Range
                    </p>
                    <p className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: '#0f0f0f', margin: 0 }}>
                      ${expert.feeRangeLow}/hr to ${expert.feeRangeHigh}/hr
                    </p>
                    {durationMonths && (
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: '6px 0 0' }}>
                        Estimated {durationMonths}mo: ${((expert.feeRangeLow + expert.feeRangeHigh) / 2 * 160 * durationMonths / 12 / 1000).toFixed(0)}K
                      </p>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 6px' }}>
                      Common Qualifications
                    </p>
                    <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>
                      {expert.commonQualifications}
                    </p>
                  </div>

                  {/* Retention Timing */}
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600, textTransform: 'uppercase' as const, margin: '0 0 6px' }}>
                      Retention Timing
                    </p>
                    <p style={{ fontSize: '13px', color: '#0f0f0f', lineHeight: 1.5, margin: 0 }}>
                      {expert.retentionTimingLabel}
                    </p>
                  </div>

                  {/* Daubert Success */}
                  <div style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase' as const }}>Daubert Survives</span>
                      <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: expert.daubertChallengeSuccessRate >= 70 ? '#10B981' : expert.daubertChallengeSuccessRate >= 50 ? '#E89558' : '#0A66C2' }}>
                        {expert.daubertChallengeSuccessRate}%
                      </span>
                    </div>
                    <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.min(expert.daubertChallengeSuccessRate, 100)}%`,
                          background: expert.daubertChallengeSuccessRate >= 70 ? '#10B981' : expert.daubertChallengeSuccessRate >= 50 ? '#E89558' : '#0A66C2',
                          borderRadius: '3px',
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '11px', color: '#4B5563', margin: '6px 0 0', lineHeight: 1.4 }}>
                      Likelihood of surviving Daubert challenge
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: 'rgba(232,149,88,0.12)', border: '1px solid rgba(232,149,88,0.30)', borderRadius: '12px' }}>
              <p style={{ fontSize: '11px', color: '#E89558', margin: 0, lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> {data.disclaimer}
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!selectedNos && !loading && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px' }}>
              Find Expert Witness Guidance
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
              Select a case type to view expert witness categories, typical fee ranges, retention timing, and Daubert challenge success rates. Estimate total expert costs for your case duration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
