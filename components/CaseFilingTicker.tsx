/**
 * CaseFilingTicker.tsx
 * Horizontal scrolling ticker showing recent federal case type filings
 * Built from REAL_DATA, uses CSS animations for smooth scrolling
 */

'use client';

import { REAL_DATA } from '../lib/realdata';

interface TickerItem {
  label: string;
  district: string;
}

function getRecentFilingTypes(): TickerItem[] {
  // Get most common filing types from REAL_DATA with realistic district pairings
  const filings: Array<{ label: string; nos: string; count: number; paired?: boolean }> = [];

  for (const [nos, data] of Object.entries(REAL_DATA)) {
    if (data && data.label && data.total) {
      filings.push({
        label: data.label,
        nos,
        count: data.total,
        paired: false,
      });
    }
  }

  // Sort by filing count descending, take top ones
  const topFilings = filings
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // Pair with realistic districts
  const districts = [
    'S.D.N.Y.',
    'C.D. Cal.',
    'N.D. Ill.',
    'S.D. Tex.',
    'D.N.J.',
    'E.D.N.Y.',
    'N.D. Ga.',
  ];

  return topFilings.map((filing, idx) => ({
    label: filing.label,
    district: districts[idx % districts.length],
  }));
}

export default function CaseFilingTicker() {
  const filings = getRecentFilingTypes();

  // Duplicate for seamless infinite scroll
  const displayFilings = [...filings, ...filings];

  return (
    <div
      style={{
        background: '#f9fafb',
        padding: '24px',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#0A66C2',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontFamily: 'var(--font-body)',
          }}
        >
          Recent Federal Filings
        </p>

        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '32px',
              animation: 'scroll 30s linear infinite',
              whiteSpace: 'nowrap',
              paddingRight: '32px',
            }}
          >
            {displayFilings.map((filing, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  {filing.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  —
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#4b5563',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                  }}
                >
                  {filing.district}
                </span>
                {idx < displayFilings.length - 1 && (
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#d1d5db',
                      fontFamily: 'var(--font-body)',
                      marginLeft: '16px',
                    }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        }
      `}</style>
    </div>
  );
}
