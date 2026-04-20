'use client';

/**
 * HoverPreview — Shows a mini-profile card when hovering over an entity link.
 * Supports judges, case types, and districts.
 * Displays after 300ms delay, hides on mouse leave.
 */

import { useState, useRef, useCallback, ReactNode } from 'react';

interface HoverPreviewProps {
  children: ReactNode;
  /** Preview content to show on hover */
  preview: ReactNode;
  /** Delay before showing (ms) */
  delay?: number;
}

export default function HoverPreview({ children, preview, delay = 300 }: HoverPreviewProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<'above' | 'below'>('below');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      // Check if we're near the bottom of the viewport
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition(rect.bottom > window.innerHeight - 250 ? 'above' : 'below');
      }
      setShow(true);
    }, delay);
  }, [delay]);

  const handleLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {show && (
        <div
          className={`
            absolute z-50 w-72 bg-[var(--surf,#F6F5F2)] border border-[var(--bdr, #E2DFD8)] rounded shadow-lg
            animate-fade-in pointer-events-auto
            ${position === 'above' ? 'bottom-full mb-2' : 'top-full mt-2'}
          `}
          style={{ left: '50%', transform: 'translateX(-50%)' }}
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleLeave}
        >
          {preview}
        </div>
      )}
    </div>
  );
}

/**
 * Pre-built preview cards for common entities
 */

export function JudgePreviewCard({ name, district, circuit, winRate, totalCases, party }: {
  name: string;
  district?: string;
  circuit?: string;
  winRate?: number;
  totalCases?: number;
  party?: string;
}) {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[var(--color-text-muted)]" style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
          <div className="text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>{district} {circuit ? `· ${circuit}` : ''}</div>
        </div>
        {party && (
          <span className={`text-[10px]  px-1.5 py-0.5 rounded ${
            party.includes('Democrat') ? 'bg-[var(--surf)] text-[var(--link)]' : 'bg-[var(--surf)] text-[var(--data-negative)]'
          }`}>
            {party.includes('Democrat') ? 'D' : 'R'}
          </span>
        )}
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-[var(--bdr, #E2DFD8)]">
        {winRate != null && (
          <div>
            <div className="text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>Win Rate</div>
            <div className="font-mono" style={{ color: winRate style={{ fontSize: 14, fontWeight: 700 }} >= 50 ? 'var(--data-positive, #176438)' : winRate >= 35 ? '#B45309' : '#B91C1C' }}>
              {winRate.toFixed(1)}%
            </div>
          </div>
        )}
        {totalCases != null && totalCases > 0 && (
          <div>
            <div className="text-[var(--color-text-muted)]" style={{ fontSize: 12 }}>Cases</div>
            <div className="font-mono text-[var(--color-text-muted)]" style={{ fontSize: 14, fontWeight: 700 }}>{totalCases.toLocaleString()}</div>
          </div>
        )}
      </div>
      <div className="mt-3 text-[10px] text-brand-blue" style={{ fontWeight: 500 }}>Click to view full profile →</div>
    </div>
  );
}

export function CaseTypePreviewCard({ label, nos, totalCases, winRate, settlementRate, duration }: {
  label: string;
  nos: string;
  totalCases?: number;
  winRate?: number;
  settlementRate?: number;
  duration?: number;
}) {
  return (
    <div className="p-4">
      <div className="text-[var(--color-text-muted)] mb-1" style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
      <div className="text-[var(--color-text-muted)] mb-3" style={{ fontSize: 12 }}>NOS Code: {nos}</div>
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--bdr, #E2DFD8)]">
        {totalCases != null && (
          <div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Cases</div>
            <div className="font-mono text-[var(--color-text-muted)]" style={{ fontSize: 12, fontWeight: 700 }}>{totalCases.toLocaleString()}</div>
          </div>
        )}
        {winRate != null && (
          <div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Win Rate</div>
            <div className="font-mono" style={{ color: winRate style={{ fontSize: 12, fontWeight: 700 }} >= 50 ? 'var(--data-positive, #176438)' : '#B45309' }}>
              {winRate}%
            </div>
          </div>
        )}
        {settlementRate != null && (
          <div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Settlement</div>
            <div className="font-mono text-[var(--color-text-muted)]" style={{ fontSize: 12, fontWeight: 700 }}>{settlementRate}%</div>
          </div>
        )}
        {duration != null && (
          <div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Duration</div>
            <div className="font-mono text-[var(--color-text-muted)]" style={{ fontSize: 12, fontWeight: 700 }}>{duration}mo</div>
          </div>
        )}
      </div>
      <div className="mt-3 text-[10px] text-brand-blue" style={{ fontWeight: 500 }}>Click for full analysis →</div>
    </div>
  );
}
