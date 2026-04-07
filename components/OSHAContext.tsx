/**
 * OSHAContext — Server Component
 * Shows OSHA regulatory context with inspection and citation data
 * Integrated on safety-related NOS page (710)
 */

import { getOSHAData, getViolationTypePercentages } from '../lib/osha';
import { fmtK } from '../lib/format';

export default function OSHAContext() {
  const oshaData = getOSHAData();
  const violationPercentages = getViolationTypePercentages();

  // Create violation type breakdown for visualization
  const violations = [
    { label: 'Serious Violations', value: oshaData.seriousViolations, percentage: violationPercentages.serious, color: '#DC3545' },
    { label: 'Willful Violations', value: oshaData.willfulViolations, percentage: violationPercentages.willful, color: '#B22222' },
    { label: 'Repeat Violations', value: oshaData.repeatViolations, percentage: violationPercentages.repeat, color: '#FF6B6B' },
    { label: 'Other Violations', value: oshaData.otherViolations, percentage: violationPercentages.other, color: '#FFA07A' },
  ];

  return (
    <section style={{ paddingLeft: '1rem', paddingRight: '1rem', marginTop: '1.5rem', marginBottom: '3rem' }}>
      <div style={{ maxWidth: '24rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{
          padding: '1.5rem',
          background: '#FAFBFC',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
        }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'var(--font-display)',
            }}>
              OSHA Regulatory Context
            </h2>
            <p style={{
              fontSize: '0.8125rem',
              color: '#4B5563',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
            }}>
              National workplace safety enforcement (FY{oshaData.year})
            </p>
          </div>

          {/* Total Inspections and Citations */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              padding: '1rem',
              background: '#EDF3FB',
              borderRadius: '8px',
              borderLeft: '4px solid #0966C3',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Total Inspections
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#004182',
                fontFamily: 'var(--font-mono)',
              }}>
                {fmtK(oshaData.totalInspections)}
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: '#EDF3FB',
              borderRadius: '8px',
              borderLeft: '4px solid #0966C3',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Total Citations
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#004182',
                fontFamily: 'var(--font-mono)',
              }}>
                {fmtK(oshaData.totalCitations)}
              </div>
            </div>
          </div>

          {/* Average Penalty */}
          <div style={{
            padding: '1rem',
            background: '#EDF3FB',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            borderLeft: '4px solid #0966C3',
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#4B5563',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '0.375rem',
              fontFamily: 'var(--font-body)',
            }}>
              Average Penalty
            </div>
            <div className="font-mono" style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#004182',
              fontFamily: 'var(--font-mono)',
            }}>
              ${oshaData.averagePenalty.toLocaleString()}
            </div>
          </div>

          {/* Violation Type Breakdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}>
              Citation Types
            </div>

            {violations.map((violation, idx) => (
              <div key={violation.label} style={{ marginBottom: idx < violations.length - 1 ? '0.75rem' : 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.375rem',
                }}>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {violation.label}
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#004182',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {violation.percentage}%
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#E5E7EB',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${violation.percentage}%`,
                    background: violation.color,
                    borderRadius: '6px',
                    transition: 'width 150ms ease',
                  }} />
                </div>
                <div className="font-mono" style={{
                  fontSize: '0.75rem',
                  color: '#4B5563',
                  marginTop: '0.25rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {fmtK(violation.value)} citations
                </div>
              </div>
            ))}
          </div>

          {/* Top States by Inspection Volume */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid #E5E7EB',
          }}>
            <div style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}>
              Top States by Inspections
            </div>

            {oshaData.topStates.map((state, idx) => (
              <div key={state.state} style={{ marginBottom: idx < oshaData.topStates.length - 1 ? '0.75rem' : 0 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.375rem',
                }}>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#0f0f0f',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {state.state}
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#004182',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {state.inspections}
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  background: '#E5E7EB',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(state.inspections / oshaData.topStates[0].inspections) * 100}%`,
                    background: '#0966C3',
                    borderRadius: '6px',
                    transition: 'width 150ms ease',
                  }} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#4B5563',
                  marginTop: '0.25rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>{fmtK(state.citations)} citations</span>
                  <span>${state.averagePenalty.toLocaleString()} avg penalty</span>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory Note */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#EDF3FB',
            borderRadius: '8px',
            borderLeft: '4px solid #0966C3',
          }}>
            <p style={{
              fontSize: '0.8125rem',
              color: '#004182',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              OSHA enforcement activity showing workplace safety citations and penalties across states. Serious violations carry the highest penalties.
            </p>
          </div>

          {/* Footer Note */}
          <p style={{
            fontSize: '0.75rem',
            color: '#4B5563',
            marginTop: '1rem',
            marginBottom: 0,
            fontFamily: 'var(--font-body)',
            lineHeight: 1.4,
          }}>
            Source: OSHA Enforcement Data. Includes inspection, citation, and penalty statistics.
          </p>
        </div>
      </div>
    </section>
  );
}
