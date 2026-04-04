/**
 * SettlementTimeline.tsx — Paper Design System component.
 * Displays optimal settlement timing window with visual timeline bar and stat boxes.
 */

'use client';

import React from 'react';

interface SettlementTimelineProps {
  medianMonths: number;
  totalCases: number;
}

export function SettlementTimeline({
  medianMonths,
  totalCases,
}: SettlementTimelineProps) {
  // Calculate timing windows
  const earlyWindow = Math.round(medianMonths * 0.4);
  const peakWindow = Math.round(medianMonths * 0.7);
  const lateWindow = Math.round(medianMonths * 0.9);

  // Calculate percentages for visual positioning
  const earlyPercent = (earlyWindow / medianMonths) * 100;
  const peakPercent = (peakWindow / medianMonths) * 100;
  const latePercent = (lateWindow / medianMonths) * 100;
  const optimalStart = earlyPercent;
  const optimalEnd = latePercent;
  const optimalWidth = optimalEnd - optimalStart;
  const peakPosition = (peakPercent - optimalStart) / (optimalWidth / 100);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* Title */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--fg-primary)',
            margin: '0 0 8px 0',
          }}
        >
          Settlement Timeline
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--fg-muted)',
            margin: 0,
          }}
        >
          Based on {totalCases.toLocaleString()} cases with median duration of{' '}
          {medianMonths} months
        </p>
      </div>

      {/* Timeline visualization */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Label: Filing */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--fg-secondary)',
            }}
          >
            Filing
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--fg-secondary)',
            }}
          >
            Trial
          </span>
        </div>

        {/* Main timeline bar */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            backgroundColor: '#D1D5DB',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {/* Optimal settlement window (purple highlight) */}
          <div
            style={{
              position: 'absolute',
              left: `${optimalStart}%`,
              width: `${optimalWidth}%`,
              height: '100%',
              backgroundColor: '#8B5CF6',
              borderRadius: '4px',
            }}
          />

          {/* Peak marker (purple circle) */}
          <div
            style={{
              position: 'absolute',
              left: `${peakPercent}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '16px',
              height: '16px',
              backgroundColor: '#8B5CF6',
              borderRadius: '50%',
              border: '3px solid white',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
              zIndex: 10,
            }}
          />
        </div>

        {/* Label: Peak */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#8B5CF6',
            }}
          >
            Peak: mo. {peakWindow}
          </span>
        </div>
      </div>

      {/* Stat boxes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
        }}
      >
        {/* Early settlement box */}
        <div
          style={{
            backgroundColor: 'var(--bg-hover)',
            borderRadius: '8px',
            padding: '14px 16px',
            borderLeft: '3px solid var(--accent-secondary)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--fg-muted)',
              margin: '0 0 4px 0',
              fontWeight: 500,
            }}
          >
            Early Settlement
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: 0,
            }}
          >
            {earlyWindow}mo.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--fg-muted)',
              margin: '4px 0 0 0',
            }}
          >
            Opens early opportunities
          </p>
        </div>

        {/* Peak negotiation box */}
        <div
          style={{
            backgroundColor: '#8B5CF6',
            borderRadius: '8px',
            padding: '14px 16px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 4px 0',
              fontWeight: 500,
            }}
          >
            Peak Negotiation
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
            }}
          >
            {peakWindow}mo.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '4px 0 0 0',
            }}
          >
            Optimal window
          </p>
        </div>

        {/* Trial preparation box */}
        <div
          style={{
            backgroundColor: 'var(--bg-hover)',
            borderRadius: '8px',
            padding: '14px 16px',
            borderLeft: '3px solid var(--accent-secondary)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--fg-muted)',
              margin: '0 0 4px 0',
              fontWeight: 500,
            }}
          >
            Trial Prep Begins
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--fg-primary)',
              margin: 0,
            }}
          >
            {lateWindow}mo.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--fg-muted)',
              margin: '4px 0 0 0',
            }}
          >
            Final settlement window
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--fg-muted)',
          lineHeight: 1.6,
          margin: 0,
          fontStyle: 'italic',
        }}
      >
        These timelines represent historical medians and are not guarantees.
        Actual settlement windows vary significantly by case complexity, court
        docket, and party cooperation. Consult your attorney for guidance
        specific to your case.
      </p>
    </section>
  );
}

export default SettlementTimeline;
