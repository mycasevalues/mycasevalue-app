'use client';

import { useState } from 'react';
import type { ExpertType } from '@/lib/expert-witness';

interface ExpertWitnessExplorerProps {
  experts: ExpertType[];
}

export default function ExpertWitnessExplorer({ experts }: ExpertWitnessExplorerProps) {
  const [selectedExpertTypes, setSelectedExpertTypes] = useState<Set<string>>(new Set());
  const [selectedCircuit, setSelectedCircuit] = useState<string>('');
  const [selectedCaseType, setSelectedCaseType] = useState<string>('');
  const [expandedCircuits, setExpandedCircuits] = useState<Set<string>>(new Set());

  const allCircuits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'DC', 'Federal'];
  const allCaseTypes = Array.from(new Set(experts.flatMap((e) => e.caseTypes))).sort();

  const filteredExperts = experts.filter((expert) => {
    const typeMatch = selectedExpertTypes.size === 0 || selectedExpertTypes.has(expert.type);
    const circuitMatch = !selectedCircuit || expert.byCircuit[selectedCircuit];
    const caseTypeMatch = !selectedCaseType || expert.caseTypes.includes(selectedCaseType);
    return typeMatch && circuitMatch && caseTypeMatch;
  });

  const toggleExpertType = (type: string) => {
    const newSet = new Set(selectedExpertTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedExpertTypes(newSet);
  };

  const toggleCircuit = (circuit: string) => {
    const newSet = new Set(expandedCircuits);
    if (newSet.has(circuit)) {
      newSet.delete(circuit);
    } else {
      newSet.add(circuit);
    }
    setExpandedCircuits(newSet);
  };

  const clearFilters = () => {
    setSelectedExpertTypes(new Set());
    setSelectedCircuit('');
    setSelectedCaseType('');
  };

  const getSuccessRate = (expert: ExpertType): number => {
    return Math.round(100 - expert.challengeSuccessRate);
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            Expert Type
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {experts.map((expert) => (
              <label key={expert.type} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={selectedExpertTypes.has(expert.type)}
                  onChange={() => toggleExpertType(expert.type)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: 'var(--accent-primary)',
                  }}
                />
                <span style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>
                  {expert.type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Circuit
            </label>
            <select
              value={selectedCircuit}
              onChange={(e) => setSelectedCircuit(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                height: '40px',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                background: 'var(--color-surface-0)',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
            >
              <option value="">All Circuits</option>
              {allCircuits.map((circuit) => (
                <option key={circuit} value={circuit}>
                  Circuit {circuit === 'DC' ? 'D.C.' : circuit === 'Federal' ? 'Federal' : circuit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              Case Type (NOS)
            </label>
            <select
              value={selectedCaseType}
              onChange={(e) => setSelectedCaseType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                height: '40px',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                background: 'var(--color-surface-0)',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
            >
              <option value="">All Case Types</option>
              {allCaseTypes.map((caseType) => (
                <option key={caseType} value={caseType}>
                  NOS {caseType}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedExpertTypes.size > 0 || selectedCircuit || selectedCaseType) && (
          <button
            onClick={clearFilters}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--accent-primary)',
              background: 'transparent',
              border: '1px solid var(--accent-primary)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Expert Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {filteredExperts.map((expert) => {
          const successRate = getSuccessRate(expert);
          const topExclusions = expert.exclusionGrounds.slice(0, 3);
          const topAdmissions = expert.admissionGrounds.slice(0, 3);

          return (
            <div
              key={expert.type}
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
                  {expert.type}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {expert.description}
                </p>
              </div>

              {/* Key Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border-default)' }}>
                <div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 6px' }}>
                    Total Opinions
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                    {expert.totalOpinions}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 6px' }}>
                    Daubert Challenge Rate
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                    {expert.daubertChallengeRate}%
                  </p>
                </div>
              </div>

              {/* Daubert Success Rate Bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Survival Rate (Post-Challenge)
                  </span>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: successRate >= 85 ? 'var(--data-positive, #176438)' : successRate >= 75 ? 'var(--accent-primary)' : '#C37D16',
                  }}>
                    {successRate}%
                  </span>
                </div>
                <div style={{ height: '8px', background: 'var(--border-default)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(successRate, 100)}%`,
                      background: successRate >= 85 ? 'var(--data-positive, #176438)' : successRate >= 75 ? 'var(--accent-primary)' : '#C37D16',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '6px 0 0', lineHeight: 1.4 }}>
                  {expert.challengeSuccessRate}% of challenged opinions excluded
                </p>
              </div>

              {/* Exclusion Grounds */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Top Exclusion Grounds
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {topExclusions.map((ground, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        {ground.reason}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {ground.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admission Grounds */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Top Admission Grounds
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {topAdmissions.map((ground, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        {ground.reason}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive, #176438)' }}>
                        {ground.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Opinions */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  Sample Opinions
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {expert.sampleOpinions.map((opinion, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        background: opinion.outcome === 'admitted' ? 'rgba(5, 118, 66, 0.08)' : 'rgba(200, 55, 70, 0.08)',
                        borderRadius: '4px',
                        borderLeft: `3px solid ${opinion.outcome === 'admitted' ? 'var(--data-positive, #176438)' : '#C83746'}`,
                      }}
                    >
                      <div style={{ marginBottom: '6px' }}>
                        <a
                          href={opinion.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            wordBreak: 'break-word',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          {opinion.title}
                        </a>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0, fontStyle: 'italic' }}>
                          {opinion.citation}
                        </p>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: opinion.outcome === 'admitted' ? 'rgba(5, 118, 66, 0.2)' : 'rgba(200, 55, 70, 0.2)',
                          color: opinion.outcome === 'admitted' ? 'var(--data-positive, #176438)' : '#C83746',
                        }}>
                          {opinion.outcome === 'admitted' ? 'Admitted' : 'Excluded'} ({opinion.year})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circuit Breakdown */}
              <div>
                <button
                  onClick={() => toggleCircuit(expert.type)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    background: 'transparent',
                    border: '1px solid var(--border-default)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>Circuit Breakdown</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: expandedCircuits.has(expert.type) ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {expandedCircuits.has(expert.type) && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-default)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                      {allCircuits.map((circuit) => {
                        const circuitData = expert.byCircuit[circuit];
                        const total = circuitData.challenged;
                        const survivalRate = total > 0 ? Math.round(((total - circuitData.excluded) / total) * 100) : 0;

                        return (
                          <div key={circuit} style={{ fontSize: '12px', color: 'var(--color-text-primary)', padding: '8px 10px', background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontWeight: 600 }}>
                                Circuit {circuit === 'DC' ? 'D.C.' : circuit === 'Federal' ? 'Federal' : circuit}
                              </span>
                              <span style={{ color: 'var(--color-text-secondary)' }}>
                                {survivalRate}%
                              </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                              {circuitData.admitted} admitted, {circuitData.excluded} excluded of {total}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredExperts.length === 0 && (
        <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', margin: '0 0 12px' }}>
            No experts match the selected filters.
          </p>
          <button
            onClick={clearFilters}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent-primary)',
              background: 'transparent',
              border: '1px solid var(--accent-primary)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{ marginTop: '24px', padding: '16px 24px', backgroundColor: 'rgba(232,149,88,0.12)', border: '1px solid rgba(232,149,88,0.30)', borderRadius: '4px' }}>
        <p style={{ fontSize: '12px', color: '#C37D16', margin: 0, lineHeight: 1.6 }}>
          <strong>Disclaimer:</strong> This database provides analytical data on Daubert challenges and expert witness outcomes from federal court opinions. The statistics reflect historical trends and should not be construed as legal advice or guarantees of outcomes. Actual success rates vary significantly based on specific facts, jurisdiction, expert qualifications, and case circumstances. Counsel should conduct independent research and consult with qualified experts when making retention and strategy decisions.
        </p>
      </div>
    </div>
  );
}
