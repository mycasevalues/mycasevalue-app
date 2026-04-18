'use client';

/**
 * HorizontalBarChart.tsx — Replaces OutcomeDonut
 *
 * Used everywhere disposition/distribution data is shown.
 * Horizontal bars with labels, animated fill, percentage readout.
 * Honors prefers-reduced-motion. Staggered entry animation.
 * Optional confidence legend and data attribution.
 */

import React, { useEffect, useRef, useState } from 'react';

interface BarDatum {
  label: string;
  percentage: number;
  color?: string;
}

interface HorizontalBarChartProps {
  data: BarDatum[];
  animate?: boolean;
  showConfidence?: boolean;
  title?: string;
  dataSources?: string;
}

/* ── Confidence Legend ── */
function ConfidenceLegend() {
  const tiers = [
    { color: 'var(--link, #0A50A2)', label: 'High confidence' },
    { color: 'var(--link)', label: 'Medium' },
    { color: 'var(--ab-border)', label: 'Limited' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
      }}
    >
      {tiers.map((t) => (
        <div
          key={t.label}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: t.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text3, #78766C)',
            }}
          >
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Single Bar Row ── */
function BarRow({
  datum,
  index,
  shouldAnimate,
}: {
  datum: BarDatum;
  index: number;
  shouldAnimate: boolean;
}) {
  const [width, setWidth] = useState(shouldAnimate ? 0 : datum.percentage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate) return;
    const delay = index * 60;
    const timer = setTimeout(() => {
      setWidth(datum.percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [shouldAnimate, datum.percentage, index]);

  const fillColor = datum.color || 'var(--link, #0A50A2)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 6,
      }}
    >
      {/* Label */}
      <div
        style={{
          width: 148,
          flexShrink: 0,
          fontSize: 12,
          color: 'var(--text2, #42403C)',
          fontFamily: 'var(--font-ui)',
          textAlign: 'right',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={datum.label}
      >
        {datum.label}
      </div>

      {/* Track */}
      <div
        ref={ref}
        style={{
          flex: 1,
          height: 13,
          background: 'var(--tbl-hdr)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${Math.min(width, 100)}%`,
            background: fillColor,
            borderRadius: 1,
            transition: shouldAnimate
              ? 'width 500ms cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        />
      </div>

      {/* Percentage */}
      <div
        style={{
          width: 35,
          flexShrink: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text1, #18181A)',
          textAlign: 'right',
        }}
      >
        {datum.percentage.toFixed(0)}%
      </div>
    </div>
  );
}

export default function HorizontalBarChart({
  data,
  animate = true,
  showConfidence,
  title,
  dataSources,
}: HorizontalBarChartProps) {
  /* Respect prefers-reduced-motion */
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setShouldAnimate(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [animate]);

  return (
    <div>
      {title && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text2, #42403C)',
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}

      {showConfidence && <ConfidenceLegend />}

      {data.map((datum, i) => (
        <BarRow
          key={datum.label}
          datum={datum}
          index={i}
          shouldAnimate={shouldAnimate}
        />
      ))}

      {dataSources && (
        <div
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text4, #A8A6A0)',
            marginTop: 6,
          }}
        >
          Data: {dataSources}
        </div>
      )}
    </div>
  );
}
