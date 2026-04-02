'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';

// Tile grid cartogram layout — [col, row] positions on an 11x8 grid
const TILE_GRID: Record<string, [number, number]> = {
  AK: [0, 0], ME: [10, 0],
  WI: [5, 1], VT: [9, 1], NH: [10, 1],
  WA: [0, 2], ID: [1, 2], MT: [2, 2], ND: [3, 2], MN: [4, 2], IL: [5, 2], MI: [6, 2], NY: [8, 2], MA: [9, 2], CT: [10, 2],
  OR: [0, 3], NV: [1, 3], WY: [2, 3], SD: [3, 3], IA: [4, 3], IN: [5, 3], OH: [6, 3], PA: [7, 3], NJ: [8, 3], RI: [9, 3],
  CA: [0, 4], UT: [1, 4], CO: [2, 4], NE: [3, 4], MO: [4, 4], KY: [5, 4], WV: [6, 4], VA: [7, 4], MD: [8, 4], DE: [9, 4],
  AZ: [1, 5], NM: [2, 5], KS: [3, 5], AR: [4, 5], TN: [5, 5], NC: [6, 5], SC: [7, 5], DC: [8, 5],
  OK: [3, 6], LA: [4, 6], MS: [5, 6], AL: [6, 6], GA: [7, 6],
  HI: [0, 7], TX: [3, 7], FL: [7, 7],
};

// Full state names
const STATE_NAMES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
  CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',
  IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',
  ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',
  MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
  NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',
  OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',
  TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
  WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',DC:'Washington DC',
};

const EMPTY_RATES: Record<string, number> = {};

function getHeatColor(rate: number): string {
  if (rate >= 58) return '#059669';
  if (rate >= 54) return '#0D9488';
  if (rate >= 50) return '#14B8A6';
  if (rate >= 46) return '#111111';
  if (rate >= 42) return '#D97706';
  if (rate >= 38) return '#E87461';
  return '#DC2626';
}

function getRateLabel(rate: number): string {
  if (rate >= 58) return 'Very High';
  if (rate >= 50) return 'Above Average';
  if (rate >= 45) return 'Average';
  if (rate >= 40) return 'Below Average';
  return 'Low';
}

interface USMapProps {
  stateRates?: Record<string, number> | null;
  selectedState?: string;
  onStateClick?: (stateCode: string) => void;
  lang?: 'en' | 'es';
}

export default function USMap({ stateRates, selectedState, onStateClick, lang = 'en' }: USMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const rates = stateRates && typeof stateRates === 'object' ? stateRates : EMPTY_RATES;

  const sortedStates = useMemo(() => {
    try {
      return Object.entries(rates).sort(([, a], [, b]) => b - a);
    } catch { return []; }
  }, [rates]);

  const vals = useMemo(() => {
    try { return Object.values(rates); } catch { return []; }
  }, [rates]);

  const avgRate = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;

  // Responsive cell sizing
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setContainerWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const COLS = 11;
  const ROWS = 8;
  const availableWidth = containerWidth > 0 ? containerWidth - 24 : 612; // 24px padding
  const CELL = Math.min(52, Math.floor((availableWidth - 10 * 3) / COLS));
  const GAP = Math.max(2, Math.min(4, Math.floor(CELL * 0.07)));
  const step = CELL + GAP;
  const fontSize = CELL >= 40 ? 10 : CELL >= 30 ? 8 : 7;
  const rateFontSize = CELL >= 40 ? 8 : CELL >= 30 ? 7 : 6;

  return (
    <div className="relative select-none" ref={containerRef}>
      {/* Header */}
      {vals.length > 0 && (
        <div className="flex items-center justify-between mb-3 px-1 flex-wrap gap-1">
          <div className="font-bold tracking-[2px] uppercase" style={{ color: '#6B7280', fontSize: Math.max(8, fontSize) }}>
            {lang === 'es' ? 'MAPA DE TASAS POR ESTADO' : 'WIN RATES BY STATE'}
          </div>
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#6B7280', fontSize: Math.max(8, fontSize) }}>{lang === 'es' ? 'Promedio nacional' : 'National avg'}:</span>
            <span className="font-bold font-data" style={{ color: getHeatColor(avgRate), fontSize: Math.max(10, fontSize + 2) }}>{avgRate.toFixed(1)}%</span>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="relative rounded-xl overflow-hidden" style={{
        background: '#FFFFFF',
        padding: CELL >= 40 ? '20px 12px' : '12px 8px',
      }}>
        <div className="relative mx-auto" style={{ width: COLS * step - GAP, height: ROWS * step - GAP }}>
          {Object.entries(TILE_GRID).map(([code, [col, row]]) => {
            const rate = rates[code];
            const hasData = rate != null;
            const isHovered = hovered === code;
            const isSelected = selectedState === code;
            const bg = hasData ? getHeatColor(rate) : '#E5E0D8';

            return (
              <button type="button"
                key={code}
                aria-label={`${code}${hasData ? `, ${rate!.toFixed(0)}% win rate` : ', no data'}`}
                aria-pressed={isSelected}
                className="absolute cursor-pointer rounded-md flex flex-col items-center justify-center transition-all duration-150 focus-ring"
                style={{
                  left: col * step,
                  top: row * step,
                  width: CELL,
                  height: CELL,
                  background: bg,
                  opacity: hasData ? (isHovered || isSelected ? 1 : 0.85) : 0.3,
                  border: isSelected ? '2px solid #8B5CF6' : isHovered ? '2px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.1)',
                  transform: isHovered ? 'scale(1.12)' : isSelected ? 'scale(1.05)' : 'scale(1)',
                  zIndex: isHovered ? 10 : isSelected ? 5 : 1,
                  boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,.3)' : isSelected ? '0 2px 8px rgba(17,17,17,0.3)' : 'none',
                  padding: 0,
                }}
                onMouseEnter={() => setHovered(code)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(code)}
                onBlur={() => setHovered(null)}
                onClick={() => onStateClick?.(code)}
              >
                <span className="font-bold text-white leading-none" style={{ fontSize, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{code}</span>
                {hasData && (
                  <span className="font-data text-white/80 leading-none mt-0.5" style={{ fontSize: rateFontSize }}>{rate.toFixed(0)}%</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tooltip */}
        {hovered && rates[hovered] != null && (() => {
          const [col, row] = TILE_GRID[hovered] || [0, 0];
          const x = col * step + CELL / 2;
          const y = row * step;
          return (
            <div className="absolute pointer-events-none z-30 rounded-lg"
              style={{
                left: x,
                top: y - 8,
                transform: 'translate(-50%, -100%)',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px',
                whiteSpace: 'nowrap',
              }}>
              <div className="text-[12px] font-bold text-white">{STATE_NAMES[hovered]}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[16px] font-extrabold font-data" style={{ color: getHeatColor(rates[hovered]) }}>
                  {rates[hovered].toFixed(1)}%
                </span>
                <span className="text-[9px] font-semibold" style={{ color: getHeatColor(rates[hovered]) }}>
                  {lang === 'es' ? (rates[hovered] >= 50 ? 'Sobre promedio' : 'Bajo promedio') : getRateLabel(rates[hovered])}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-[9px] font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Menor' : 'Lower'}</span>
        <div className="flex h-2 rounded-full overflow-hidden" style={{ width: 120 }}>
          <div className="flex-1" style={{ background: '#DC2626' }} />
          <div className="flex-1" style={{ background: '#E87461' }} />
          <div className="flex-1" style={{ background: '#D97706' }} />
          <div className="flex-1" style={{ background: '#111111' }} />
          <div className="flex-1" style={{ background: '#14B8A6' }} />
          <div className="flex-1" style={{ background: '#0D9488' }} />
          <div className="flex-1" style={{ background: '#059669' }} />
        </div>
        <span className="text-[9px] font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Mayor' : 'Higher'}</span>
      </div>

      {/* Top/Bottom states */}
      {sortedStates.length > 5 && (
        <div className="flex gap-6 mt-4 justify-center">
          <div className="text-center">
            <div className="text-[9px] font-bold tracking-[1.5px] mb-1.5" style={{ color: '#6B7280' }}>
              {lang === 'es' ? '▲ MEJORES' : '▲ HIGHEST'}
            </div>
            <div className="flex gap-1">
              {sortedStates.slice(0, 3).map(([code, rate]) => (
                <button type="button" key={code}
                  onClick={() => onStateClick?.(code)}
                  className="px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer border-none transition-all hover:scale-105"
                  style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}>
                  <span className="font-data font-bold">{code}</span> <span className="font-data">{rate.toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #E5E0D8, transparent)' }} />
          <div className="text-center">
            <div className="text-[9px] font-bold tracking-[1.5px] mb-1.5" style={{ color: '#6B7280' }}>
              {lang === 'es' ? '▼ MÁS BAJOS' : '▼ LOWEST'}
            </div>
            <div className="flex gap-1">
              {sortedStates.slice(-3).map(([code, rate]) => (
                <button type="button" key={code}
                  onClick={() => onStateClick?.(code)}
                  className="px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer border-none transition-all hover:scale-105"
                  style={{ background: 'rgba(220,38,38,0.08)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.15)' }}>
                  <span className="font-data font-bold">{code}</span> <span className="font-data">{rate.toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
