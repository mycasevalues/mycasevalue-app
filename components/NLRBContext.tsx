/**
 * NLRBContext — Server Component
 * Shows NLRB case activity statistics and outcome breakdown
 * Integrated on Labor/Management Relations NOS page (720)
 */

import { getNLRBData, getULPPercentage, getRepresentationPetitionPercentage, getOutcomeBreakdown } from '../lib/nlrb';
import { fmtK } from '../lib/format';

export default function NLRBContext() {
  const nlrbData = getNLRBData();
  const ulpPercentage = getULPPercentage();
  const repPetitionPercentage = getRepresentationPetitionPercentage();
  const outcomeBreakdown = getOutcomeBreakdown();

  // Calculate outcome percentages for visualization
  const totalOutcomes = nlrbData.settledCases + nlrbData.withdrawnCases + nlrbData.dismissedCases + nlrbData.complaintIssued;
  const outcomes = [
    { label: 'Settled', value: nlrbData.settledCases, percentage: Number(((nlrbData.settledCases / totalOutcomes) * 100).toFixed(1)), color: '#057642' },
    { label: 'Withdrawn', value: nlrbData.withdrawnCases, percentage: Number(((nlrbData.withdrawnCases / totalOutcomes) * 100).toFixed(1)), color: '#4B5563' },
    { label: 'Dismissed', value: nlrbData.dismissedCases, percentage: Number(((nlrbData.dismissedCases / totalOutcomes) * 100).toFixed(1)), color: '#DC3545' },
    { label: 'Complaint Issued', value: nlrbData.complaintIssued, percentage: Number(((nlrbData.complaintIssued / totalOutcomes) * 100).toFixed(1)), color: '#0A66C2' },
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
              NLRB Context
            </h2>
            <p style={{
              fontSize: '0.8125rem',
              color: '#4B5563',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
            }}>
              National labor charges and case outcomes (FY{nlrbData.year})
            </p>
          </div>

          {/* Total Charges */}
          <div style={{
            padding: '1rem',
            background: '#EDF3FB',
            borderRadius: '8px',
            marginBottom: '1rem',
            borderLeft: '4px solid #0A66C2',
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
              Total Charges Filed
            </div>
            <div className="font-mono" style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#004182',
              fontFamily: 'var(--font-mono)',
            }}>
              {fmtK(nlrbData.totalCharges)}
            </div>
          </div>

          {/* Charge Type Breakdown */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#0f0f0f',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}>
              Charge Types
            </div>

            {/* ULP Charges */}
            <div style={{ marginBottom: '0.75rem' }}>
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
                  Unfair Labor Practice (ULP)
                </span>
                <span className="font-mono" style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#004182',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {ulpPercentage}%
                </span>
              </div>
              <div style={{
                height: '20px',
                background: '#E5E7EB',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${ulpPercentage}%`,
                  background: '#0A66C2',
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
                {fmtK(nlrbData.unfairLaborPractice)} charges
              </div>
            </div>

            {/* Representation Petitions */}
            <div>
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
                  Representation Petitions
                </span>
                <span className="font-mono" style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#004182',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {repPetitionPercentage}%
                </span>
              </div>
              <div style={{
                height: '20px',
                background: '#E5E7EB',
                borderRadius: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${repPetitionPercentage}%`,
                  background: '#057642',
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
                {fmtK(nlrbData.representationPetitions)} petitions
              </div>
            </div>
          </div>

          {/* Outcome Breakdown */}
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
              Case Outcomes
            </div>

            {outcomes.map((outcome, idx) => (
              <div key={outcome.label} style={{ marginBottom: idx < outcomes.length - 1 ? '0.75rem' : 0 }}>
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
                    {outcome.label}
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: outcome.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {outcome.percentage}%
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
                    width: `${outcome.percentage}%`,
                    background: outcome.color,
                    borderRadius: '6px',
                    transition: 'width 150ms ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            paddingTop: '1rem',
            marginTop: '1rem',
            borderTop: '1px solid #E5E7EB',
          }}>
            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Board Decisions
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#004182',
                fontFamily: 'var(--font-mono)',
              }}>
                {fmtK(nlrbData.boardDecisions)}
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#4B5563',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Elections Conducted
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#004182',
                fontFamily: 'var(--font-mono)',
              }}>
                {fmtK(nlrbData.electionsConducted)}
              </div>
            </div>
          </div>

          {/* Year-over-Year Note */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#EDF3FB',
            borderRadius: '8px',
            borderLeft: '4px solid #0A66C2',
          }}>
            <p style={{
              fontSize: '0.8125rem',
              color: '#004182',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              National labor case activity showing increased ULP charges and representation petitions in recent years.
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
            Source: NLRB Annual Reports. Data includes unfair labor practice charges, representation petitions, and case outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
