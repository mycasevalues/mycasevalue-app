'use client';

import { useState, useRef, useEffect } from 'react';

/** Predefined metric explanations keyed by a short identifier. */
const METRIC_GLOSSARY: Record<string, { label: string; body: string }> = {
  winRate: {
    label: 'Win Rate',
    body: 'The percentage of cases resolved in the plaintiff\'s favor through verdict or favorable settlement. Calculated from federal court disposition data. A higher win rate suggests stronger plaintiff outcomes for this case type or jurisdiction.',
  },
  dismissalRate: {
    label: 'Dismissal Rate',
    body: 'The share of cases dismissed before reaching trial or settlement. Includes voluntary dismissals, involuntary dismissals, and remands. A high dismissal rate may indicate procedural hurdles or weak claim viability.',
  },
  medianSettlement: {
    label: 'Median Settlement',
    body: 'The middle value of reported settlement amounts — half of settlements fall above this number and half below. The median is less sensitive to extreme outliers than the average, making it a more reliable benchmark.',
  },
  settlementRange: {
    label: 'Settlement Range (25th–75th Percentile)',
    body: 'The interquartile range showing where the middle 50% of settlements fall. The lower bound is the 25th percentile and the upper bound is the 75th percentile. This range helps set realistic expectations for most claimants.',
  },
  medianDuration: {
    label: 'Median Case Duration',
    body: 'The median number of days from case filing to final disposition. Measured from the federal court docket filing date to the recorded termination date. Actual elapsed time may vary based on appeals or post-judgment motions.',
  },
  sampleSize: {
    label: 'Sample Size',
    body: 'The number of cases used to calculate the displayed statistics. Larger sample sizes produce more reliable estimates. When sample size is small (under 30), treat the figures as directional rather than definitive.',
  },
  avgAward: {
    label: 'Average Award',
    body: 'The arithmetic mean of monetary awards across resolved cases. This figure can be skewed by very large or very small outcomes. Compare with the median settlement for a more balanced view.',
  },
  trialRate: {
    label: 'Trial Rate',
    body: 'The percentage of cases that proceed to a full trial rather than being settled, dismissed, or otherwise resolved. A low trial rate is typical — most federal civil cases resolve before trial.',
  },
};

interface DataTooltipProps {
  /** A key from METRIC_GLOSSARY, or provide custom label+body via the other props. */
  metric?: string;
  /** Custom label (overrides glossary). */
  label?: string;
  /** Custom body text (overrides glossary). */
  body?: string;
  /** Icon size in pixels. Default 14. */
  size?: number;
}

export default function DataTooltip({ metric, label, body, size = 14 }: DataTooltipProps) {
  const entry = metric ? METRIC_GLOSSARY[metric] : undefined;
  const displayLabel = label || entry?.label || 'Info';
  const displayBody = body || entry?.body || '';

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Reposition tooltip so it doesn't overflow viewport
  useEffect(() => {
    if (!open || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const rect = el.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      el.style.left = 'auto';
      el.style.right = '0';
    }
    if (rect.left < 8) {
      el.style.left = '0';
      el.style.right = 'auto';
    }
  }, [open]);

  return (
    <span
      ref={ref}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(prev => !prev)}
      role="button"
      aria-label={`Learn more about ${displayLabel}`}
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(prev => !prev); } }}
    >
      {/* Info circle icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="8" cy="8" r="7" stroke="var(--text-tertiary)" strokeWidth="1.5" />
        <path d="M8 7v4" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="#9CA3AF" />
      </svg>

      {/* Tooltip */}
      {open && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            background: 'var(--text1)',
            color: 'var(--surf, #F6F5F2)',
            borderRadius: '4px',
            padding: '12px 14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            zIndex: 100,
            pointerEvents: 'auto',
          }}
          role="tooltip"
        >
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            fontSize: '14px',
            marginBottom: '6px',
            color: 'var(--bdr)',
          }}>
            {displayLabel}
          </div>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            lineHeight: 1.55,
            color: 'var(--bdr, #E2DFD8)',
            margin: 0,
          }}>
            {displayBody}
          </p>
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '10px',
            height: '10px',
            background: 'var(--text1)',
          }} />
        </div>
      )}
    </span>
  );
}
