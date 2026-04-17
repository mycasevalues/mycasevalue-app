'use client';

/**
 * LiveTicker — Westlaw-style scrolling ticker strip below the nav.
 * Charcoal background matching the nav bar.
 */

import { memo } from 'react';

type TickerItem = {
  label: string;
  value: string;
  delta?: string;
  direction?: 'up' | 'down' | 'flat';
};

const DEFAULT_ITEMS: TickerItem[] = [
  { label: 'S.D.N.Y.', value: '1,847 new cases YTD', delta: '+3.2%', direction: 'up' },
  { label: 'C.D.Cal.', value: 'median award $47,230', delta: '−1.1%', direction: 'down' },
  { label: 'N.D.Ill.', value: 'settlement rate 68.4%', delta: '+0.8%', direction: 'up' },
  { label: 'D.D.C.', value: 'avg time-to-disposition 14.2mo', delta: '−2.1%', direction: 'down' },
  { label: 'E.D.Va.', value: 'employment wins 52.1%', delta: '+4.7%', direction: 'up' },
  { label: 'S.D.Fla.', value: 'civil rights awards ↑', delta: '+12.3%', direction: 'up' },
  { label: 'N.D.Cal.', value: 'IP median $285k', delta: '+1.9%', direction: 'up' },
  { label: 'D.N.J.', value: 'consumer wins 44.8%', delta: 'flat', direction: 'flat' },
  { label: 'E.D.Tex.', value: 'patent win rate 58.2%', delta: '+2.4%', direction: 'up' },
  { label: 'W.D.Wash.', value: 'median time 11.8mo', delta: '−0.6%', direction: 'down' },
];

function dirColor(dir?: 'up' | 'down' | 'flat') {
  if (dir === 'up') return 'var(--data-positive, #176438)';
  if (dir === 'down') return '#B91C1C';
  return 'var(--text4, #A8A6A0)';
}

function dirArrow(dir?: 'up' | 'down' | 'flat') {
  if (dir === 'up') return '▲';
  if (dir === 'down') return '▼';
  return '◆';
}

function TickerRow({ items, ariaHidden = false }: { items: TickerItem[]; ariaHidden?: boolean }) {
  return (
    <div className="ticker-row" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span className="ticker-item" key={`${item.label}-${i}`}>
          <span className="ticker-label">{item.label}</span>
          <span className="ticker-separator">·</span>
          <span className="ticker-value">{item.value}</span>
          {item.delta && (
            <>
              <span className="ticker-separator">·</span>
              <span className="ticker-delta" style={{ color: dirColor(item.direction) }}>
                <span className="ticker-arrow">{dirArrow(item.direction)}</span>
                {item.delta}
              </span>
            </>
          )}
          <span className="ticker-dot" aria-hidden>·</span>
        </span>
      ))}
    </div>
  );
}

function LiveTicker({ items = DEFAULT_ITEMS }: { items?: TickerItem[] } = {}) {
  return (
    <div
      className="live-ticker-strip"
      role="region"
      aria-label="Live federal court data feed"
    >
      <style>{`
        .live-ticker-strip {
          position: relative;
          overflow: hidden;
          background: var(--chrome-bg-dark);
          border-bottom: 1px solid var(--chrome-border);
          height: 28px;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .live-ticker-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #222222 0%,
            transparent 4%,
            transparent 96%,
            #222222 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        .live-ticker-badge {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 12px;
          background: var(--chrome-bg-dark);
          border-right: 1px solid var(--chrome-border);
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--data-positive);
          white-space: nowrap;
        }
        .live-ticker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--data-positive);
        }
        .ticker-track {
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          padding-left: 120px;
          animation: tickerScroll 80s linear infinite;
          will-change: transform;
        }
        .ticker-row {
          display: inline-flex;
          align-items: center;
          gap: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          color: rgba(255,255,255,0.75);
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
        }
        .ticker-label {
          color: var(--gold, #C4882A);
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .ticker-value {
          color: rgba(255,255,255,0.7);
        }
        .ticker-delta {
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .ticker-arrow {
          font-size: 8px;
        }
        .ticker-separator {
          color: rgba(255,255,255,0.2);
          margin: 0 2px;
        }
        .ticker-dot {
          color: rgba(255,255,255,0.15);
          margin-left: 16px;
          font-weight: 400;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
        @media (max-width: 640px) {
          .live-ticker-strip { height: 26px; }
          .live-ticker-badge { padding: 0 8px; font-size: 9px; }
          .ticker-track { padding-left: 100px; }
          .ticker-row { font-size: 8px; }
        }
      `}</style>

      <div className="live-ticker-badge" aria-hidden>
        <span className="animate-pulse live-ticker-dot" />
        <span>Live</span>
      </div>

      <div className="ticker-track">
        <TickerRow items={items} />
        <TickerRow items={items} ariaHidden />
      </div>
    </div>
  );
}

export default memo(LiveTicker);
