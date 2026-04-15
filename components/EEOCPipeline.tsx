/**
 * EEOCPipeline — Server Component
 * Shows EEOC charge pipeline data with funnel visualization
 * Integrated on employment discrimination NOS pages (442, 445, 710)
 */

import { getEEOCData, getEEOCMeritResolutionRate, getEEOCRightToSueRate } from '../lib/eeoc';

interface EEOCPipelineProps {
  federalCaseWinRate?: number;
}

export default function EEOCPipeline({ federalCaseWinRate = 62 }: EEOCPipelineProps) {
  const eEOCData = getEEOCData();
  const meritRate = getEEOCMeritResolutionRate();
  const rightToSueRate = getEEOCRightToSueRate();
  const federalLawsuitRate = eEOCData.percentFederalLawsuit;

  // Calculate the number of cases at each stage
  const chargesFiled = eEOCData.totalCharges;
  const meritResolutions = eEOCData.meritResolutions;
  const rightToSueLetters = eEOCData.rightToSueIssued;
  const federalLawsuits = Math.round((chargesFiled * federalLawsuitRate) / 100);

  // Pipeline stage percentages for visualization
  const stages = [
    { label: 'Charges Filed', value: 100, count: chargesFiled },
    { label: 'Merit Resolutions', value: Number(((meritResolutions / chargesFiled) * 100).toFixed(1)), count: meritResolutions },
    { label: 'Right-to-Sue Letters', value: rightToSueRate, count: rightToSueLetters },
    { label: 'Federal Lawsuits', value: federalLawsuitRate, count: federalLawsuits },
  ];

  return (
    <section style={{ paddingLeft: '1rem', paddingRight: '1rem', marginTop: '1.5rem', marginBottom: '3rem' }}>
      <div style={{ maxWidth: '24rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{
          padding: '1.5rem',
          background: '#FAFBFC',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
        }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              marginTop: 0,
              fontFamily: 'var(--font-display)',
            }}>
              EEOC Charge Pipeline
            </h2>
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
            }}>
              National employment discrimination charges (FY{eEOCData.year})
            </p>
          </div>

          {/* Pipeline Funnel Visualization */}
          <div style={{ marginBottom: '1.5rem' }}>
            {stages.map((stage, idx) => {
              const width = stage.value;
              return (
                <div key={stage.label} style={{ marginBottom: idx < stages.length - 1 ? '0.75rem' : 0 }}>
                  {/* Stage Label and Percentage */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.375rem',
                  }}>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {stage.label}
                    </span>
                    <span className="font-mono" style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--accent-primary-hover)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {stage.value}%
                    </span>
                  </div>

                  {/* Bar */}
                  <div style={{
                    height: '24px',
                    background: 'var(--border-default)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${width}%`,
                      background: 'var(--accent-primary)',
                      borderRadius: '6px',
                      transition: 'width 150ms ease',
                    }} />
                  </div>

                  {/* Count */}
                  <div className="font-mono" style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
                    marginTop: '0.25rem',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {stage.count.toLocaleString()} charges
                  </div>
                </div>
              );
            })}
          </div>

          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-default)',
          }}>
            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Merit Resolution Rate
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--accent-primary-hover)',
                fontFamily: 'var(--font-mono)',
              }}>
                {meritRate}%
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.375rem',
                fontFamily: 'var(--font-body)',
              }}>
                Federal Lawsuit Rate
              </div>
              <div className="font-mono" style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--accent-primary-hover)',
                fontFamily: 'var(--font-mono)',
              }}>
                {federalLawsuitRate}%
              </div>
            </div>
          </div>

          {/* Comparison Note */}
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#EDF3FB',
            borderRadius: '8px',
            borderLeft: '4px solid var(--accent-primary)',
          }}>
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--accent-primary-hover)',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              Only {federalLawsuitRate}% of charges result in federal lawsuits, compared to a {federalCaseWinRate}% win rate for those that do.
            </p>
          </div>

          {/* Footer Note */}
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-secondary)',
            marginTop: '1rem',
            marginBottom: 0,
            fontFamily: 'var(--font-body)',
            lineHeight: 1.4,
          }}>
            Source: EEOC Annual Reports. Merit resolutions include settlements, conciliations, and administrative closures with benefits to charging parties.
          </p>
        </div>
      </div>
    </section>
  );
}
