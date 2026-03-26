'use client';

import { useState, useMemo } from 'react';

// Simplified US state paths (viewBox 0 0 960 600)
const STATE_PATHS: Record<string, string> = {
  AL: "M628,425 L628,466 L624,480 L636,482 L638,468 L648,467 L649,425Z",
  AK: "M161,485 L183,485 L183,510 L220,510 L220,530 L161,530Z",
  AZ: "M205,400 L270,400 L275,458 L210,458 L200,430Z",
  AR: "M570,410 L620,410 L620,448 L570,448Z",
  CA: "M120,300 L165,280 L175,340 L180,400 L160,430 L130,415 L110,370Z",
  CO: "M300,310 L375,310 L375,365 L300,365Z",
  CT: "M850,205 L870,198 L876,215 L856,220Z",
  DE: "M810,295 L822,290 L825,310 L812,312Z",
  FL: "M660,460 L720,445 L730,475 L710,510 L680,510 L660,490Z",
  GA: "M660,400 L700,400 L710,445 L660,455Z",
  HI: "M270,495 L300,490 L305,505 L275,510Z",
  ID: "M225,195 L265,195 L270,280 L235,280 L220,240Z",
  IL: "M590,280 L618,280 L620,345 L600,360 L585,340Z",
  IN: "M620,285 L650,285 L650,350 L620,350Z",
  IA: "M520,260 L580,260 L585,305 L520,305Z",
  KS: "M420,340 L510,340 L510,385 L420,385Z",
  KY: "M620,350 L700,340 L700,370 L620,380Z",
  LA: "M560,450 L610,450 L615,500 L575,500 L560,480Z",
  ME: "M870,120 L895,110 L900,160 L880,175 L865,155Z",
  MD: "M770,290 L810,280 L815,305 L775,310Z",
  MA: "M850,185 L890,180 L892,195 L855,200Z",
  MI: "M610,200 L660,195 L660,275 L630,275 L610,240Z",
  MN: "M490,160 L550,160 L555,240 L490,245Z",
  MS: "M600,410 L628,410 L628,470 L600,470Z",
  MO: "M530,330 L590,320 L600,385 L540,395 L525,365Z",
  MT: "M260,145 L370,145 L375,210 L260,215Z",
  NE: "M380,280 L470,275 L475,325 L380,330Z",
  NV: "M175,270 L220,250 L230,350 L190,370 L170,330Z",
  NH: "M860,145 L875,140 L878,180 L862,185Z",
  NJ: "M820,255 L838,248 L840,290 L825,295Z",
  NM: "M270,395 L340,395 L345,460 L270,465Z",
  NY: "M770,175 L845,165 L855,220 L810,240 L775,225Z",
  NC: "M700,365 L790,350 L795,380 L710,395Z",
  ND: "M390,155 L470,155 L472,210 L390,212Z",
  OH: "M650,270 L700,265 L705,325 L660,330Z",
  OK: "M400,385 L510,385 L515,420 L465,435 L400,430Z",
  OR: "M130,185 L220,180 L225,245 L140,250Z",
  PA: "M730,240 L810,230 L815,270 L735,280Z",
  RI: "M865,205 L878,200 L880,215 L867,218Z",
  SC: "M700,395 L750,380 L755,410 L710,420Z",
  SD: "M390,215 L470,215 L472,270 L390,272Z",
  TN: "M600,370 L700,360 L705,390 L600,400Z",
  TX: "M360,420 L465,435 L480,520 L415,540 L360,500Z",
  UT: "M240,280 L300,275 L305,355 L245,360Z",
  VT: "M845,150 L860,145 L862,185 L847,188Z",
  VA: "M710,315 L790,300 L800,350 L720,360Z",
  WA: "M145,120 L225,115 L230,180 L150,185Z",
  WV: "M710,300 L740,285 L750,330 L720,340Z",
  WI: "M545,180 L600,175 L605,250 L545,255Z",
  WY: "M280,220 L370,215 L375,280 L280,285Z",
  DC: "M788,300 L795,297 L797,305 L790,307Z",
};

// State center coordinates for labels
const STATE_CENTERS: Record<string, [number, number]> = {
  AL: [638, 445], AK: [190, 508], AZ: [237, 428], AR: [595, 429],
  CA: [148, 360], CO: [337, 337], CT: [863, 210], DE: [818, 301],
  FL: [690, 478], GA: [680, 425], HI: [288, 500], ID: [247, 238],
  IL: [603, 315], IN: [635, 318], IA: [550, 283], KS: [465, 363],
  KY: [660, 360], LA: [585, 475], ME: [882, 140], MD: [792, 295],
  MA: [870, 190], MI: [638, 235], MN: [522, 200], MS: [614, 440],
  MO: [560, 358], MT: [315, 178], NE: [427, 303], NV: [198, 310],
  NH: [868, 163], NJ: [830, 272], NM: [307, 430], NY: [810, 200],
  NC: [745, 373], ND: [430, 183], OH: [677, 298], OK: [457, 408],
  OR: [175, 215], PA: [772, 255], RI: [872, 210], SC: [727, 398],
  SD: [430, 243], TN: [650, 380], TX: [420, 478], UT: [272, 318],
  VT: [853, 168], VA: [755, 333], WA: [185, 150], WV: [725, 315],
  WI: [572, 215], WY: [325, 253], DC: [793, 303],
};

const EMPTY_RATES: Record<string, number> = {};

function getHeatColor(rate: number): string {
  if (rate >= 60) return '#059669';
  if (rate >= 55) return '#0D9488';
  if (rate >= 50) return '#34D399';
  if (rate >= 45) return '#C9A54E';
  if (rate >= 40) return '#D97706';
  if (rate >= 35) return '#E87461';
  return '#DC2626';
}

interface USMapProps {
  stateRates?: Record<string, number> | null;
  selectedState?: string;
  onStateClick?: (stateCode: string) => void;
  lang?: 'en' | 'es';
}

export default function USMap({ stateRates, selectedState, onStateClick, lang = 'en' }: USMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Use a stable empty object reference to avoid re-render loops
  const rates = stateRates && typeof stateRates === 'object' ? stateRates : EMPTY_RATES;

  const sortedStates = useMemo(() => {
    try {
      return Object.entries(rates).sort(([, a], [, b]) => b - a);
    } catch { return []; }
  }, [rates]);

  const vals = useMemo(() => {
    try { return Object.values(rates); } catch { return []; }
  }, [rates]);
  const maxRate = vals.length > 0 ? Math.max(...vals) : 1;
  const minRate = vals.length > 0 ? Math.min(...vals) : 0;

  return (
    <div className="relative">
      {/* Map */}
      <svg viewBox="0 0 960 560" className="w-full h-auto" style={{ maxHeight: 340 }}>
        <defs>
          <filter id="state-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.1)" />
          </filter>
        </defs>
        {Object.entries(STATE_PATHS).map(([code, path]) => {
          const rate = rates[code];
          const isHovered = hovered === code;
          const isSelected = selectedState === code;
          const fill = rate != null ? getHeatColor(rate) : '#E2E8F0';
          const opacity = rate != null ? (isHovered || isSelected ? 1 : 0.75) : 0.3;

          return (
            <g key={code}>
              <path
                d={path}
                fill={fill}
                fillOpacity={opacity}
                stroke={isSelected ? '#0B1221' : isHovered ? '#B8923A' : '#fff'}
                strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 0.8}
                className="cursor-pointer"
                style={{
                  transition: 'fill-opacity 0.2s, stroke-width 0.2s, transform 0.15s',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: `${STATE_CENTERS[code]?.[0]}px ${STATE_CENTERS[code]?.[1]}px`,
                  filter: isSelected ? 'url(#state-shadow)' : 'none',
                }}
                onMouseEnter={(e) => {
                  setHovered(code);
                  const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
                  if (rect) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    setTooltipPos({ x, y });
                  }
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onStateClick?.(code)}
              />
              {/* State label */}
              {STATE_CENTERS[code] && rate != null && (
                <text
                  x={STATE_CENTERS[code][0]}
                  y={STATE_CENTERS[code][1]}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="9"
                  fontWeight="700"
                  fill="#fff"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  {code}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && rates[hovered] != null && (
        <div className="absolute pointer-events-none z-10 px-3 py-2 rounded-lg text-[12px] font-semibold"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 45,
            transform: 'translateX(-50%)',
            background: '#0B1221',
            color: '#F0F2F5',
            boxShadow: '0 4px 12px rgba(0,0,0,.2)',
          }}>
          <span className="text-slate-300">{hovered}</span>
          <span className="mx-1.5">·</span>
          <span style={{ color: getHeatColor(rates[hovered]) }}>{rates[hovered].toFixed(1)}%</span>
          <span className="text-slate-400 ml-1">{lang === 'es' ? 'éxito' : 'win'}</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-1 mt-2">
        <span className="text-[9px] text-slate-400">{lang === 'es' ? 'Menor' : 'Lower'}</span>
        {['#DC2626', '#E87461', '#D97706', '#C9A54E', '#34D399', '#0D9488', '#059669'].map((c, i) => (
          <div key={i} className="w-5 h-2 rounded-sm" style={{ background: c, opacity: 0.75 }} />
        ))}
        <span className="text-[9px] text-slate-400">{lang === 'es' ? 'Mayor' : 'Higher'}</span>
      </div>

      {/* Top/Bottom states */}
      {sortedStates.length > 5 && (
        <div className="flex gap-4 mt-3 justify-center text-[11px]">
          <div>
            <span className="font-bold text-slate-400 tracking-[1px]">{lang === 'es' ? 'MEJORES' : 'TOP'}</span>
            <div className="flex gap-1.5 mt-1">
              {sortedStates.slice(0, 3).map(([code, rate]) => (
                <span key={code} className="px-2 py-0.5 rounded font-semibold" style={{ background: '#CCFBF1', color: '#059669' }}>
                  {code} {rate.toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-400 tracking-[1px]">{lang === 'es' ? 'MÁS BAJOS' : 'LOWEST'}</span>
            <div className="flex gap-1.5 mt-1">
              {sortedStates.slice(-3).map(([code, rate]) => (
                <span key={code} className="px-2 py-0.5 rounded font-semibold" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                  {code} {rate.toFixed(0)}%
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
