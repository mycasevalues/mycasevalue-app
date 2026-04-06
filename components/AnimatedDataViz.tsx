/**
 * AnimatedDataViz.tsx
 * Compact animated data preview for hero section
 * Shows miniature horizontal bar chart with CSS animations
 */

'use client';

import { useEffect, useState } from 'react';

interface DataVizProps {
  district?: string;
  caseType?: string;
  data?: Array<{
    label: string;
    value: number;
  }>;
}

export default function AnimatedDataViz({
  district = 'S.D.N.Y.',
  caseType = 'Employment Discrimination',
  data,
}: DataVizProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Default data for Employment Discrimination S.D.N.Y.
  const defaultData = [
    { label: 'Win Rate', value: 42.2 },
    { label: 'Settlement Rate', value: 38.1 },
    { label: 'Avg Duration (months)', value: 14 },
  ];

  const displayData = data || defaultData;

  // Find max value for scaling
  const maxValue = Math.max(...displayData.map((d) => d.value));
  const displayMax = displayData[0].label === 'Avg Duration (months)' ? 36 : 100;

  return (
    <div
      style={{
        marginTop: '32px',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: isVisible ? 'fadeInUp 0.6s ease-out' : 'none',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '0 0 4px 0',
            fontFamily: 'var(--font-body)',
          }}
        >
          {caseType} · {district}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayData.map((item, idx) => (
          <div key={idx}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <label
                style={{
                  fontSize: '12px',
                  color: '#4b5563',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </label>
              <span
                style={{
                  fontFamily: '"PT Mono", monospace',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  animation: isVisible ? `slideInRight 0.6s ease-out ${idx * 0.1}s both` : 'none',
                }}
              >
                {item.value}
                {item.label === 'Avg Duration (months)' ? ' mo' : '%'}
              </span>
            </div>

            {/* Animated bar */}
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: '4px',
                height: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: '#8B5CF6',
                  width: '0%',
                  animation: isVisible
                    ? `fillBar 1s ease-out ${idx * 0.15}s forwards`
                    : 'none',
                  '--target-width': `${(item.value / displayMax) * 100}%`,
                } as React.CSSProperties & { '--target-width': string }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
      `}</style>
    </div>
  );
}
