'use client';

import { useState, useMemo, useCallback, useRef } from 'react';

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
  // Blue-teal palette matching brand
  if (rate >= 58) return '#059669';  // Emerald
  if (rate >= 54) return '#0D9488';  // Teal
  if (rate >= 50) return '#14B8A6';  // Light teal
  if (rate >= 46) return '#4F46E5';  // Brand blue
  if (rate >= 42) return '#D97706';  // Amber
  if (rate >= 38) return '#E87461';  // Coral
  return '#DC2626';                   // Red
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
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

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

  const handleMouseMove = useCallback((e: React.MouseEvent, code: string) => {
    setHovered(code);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  return (
    <div className="relative select-none">
      {/* Header */}
      {vals.length > 0 && (
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#94A3B8' }}>
            {lang === 'es' ? 'MAPA DE TASAS POR ESTADO' : 'WIN RATES BY STATE'}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">{lang === 'es' ? 'Promedio nacional' : 'National avg'}:</span>
            <span className="text-[12px] font-bold font-data" style={{ color: getHeatColor(avgRate) }}>{avgRate.toFixed(1)}%</span>
          </div>
        </div>
      )}

      {/* Map container with gradient border */}
      <div className="relative rounded-xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(64,64,242,0.05), rgba(13,148,136,0.05))',
        padding: '2px',
      }}>
        <div className="rounded-xl overflow-hidden" style={{ background: '#131B2E' }}>
          <svg ref={svgRef} viewBox="0 0 960 560" className="w-full h-auto" style={{ maxHeight: 420 }}>
            <defs>
              <filter id="state-glow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(64,64,242,0.2)" />
              </filter>
              <filter id="state-selected-glow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(64,64,242,0.35)" />
              </filter>
              <linearGradient id="empty-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Background water effect */}
            <rect width="960" height="560" fill="transparent" />

            {Object.entries(STATE_PATHS).map(([code, path]) => {
              const rate = rates[code];
              const isHovered = hovered === code;
              const isSelected = selectedState === code;
              const hasData = rate != null;
              const fill = hasData ? getHeatColor(rate) : 'url(#empty-fill)';

              return (
                <g key={code}>
                  <path
                    d={path}
                    fill={fill}
                    fillOpacity={hasData ? (isHovered || isSelected ? 1 : 0.8) : 0.25}
                    stroke={isSelected ? '#4F46E5' : isHovered ? '#F0F2F5' : hasData ? 'rgba(255,255,255,0.6)' : 'rgba(30,41,59,0.5)'}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 0.8}
                    className="cursor-pointer"
                    style={{
                      transition: 'all 0.2s ease',
                      transform: isHovered ? 'scale(1.04)' : isSelected ? 'scale(1.02)' : 'scale(1)',
                      transformOrigin: `${STATE_CENTERS[code]?.[0]}px ${STATE_CENTERS[code]?.[1]}px`,
                      filter: isSelected ? 'url(#state-selected-glow)' : isHovered ? 'url(#state-glow)' : 'none',
                    }}
                    onMouseMove={(e) => handleMouseMove(e, code)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onStateClick?.(code)}
                  />
                  {/* State label */}
                  {STATE_CENTERS[code] && hasData && (
                    <text
                      x={STATE_CENTERS[code][0]}
                      y={STATE_CENTERS[code][1]}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={isHovered || isSelected ? '10' : '9'}
                      fontWeight="700"
                      fontFamily="'JetBrains Mono', monospace"
                      fill="#fff"
                      className="pointer-events-none select-none"
                      style={{
                        textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                        transition: 'font-size 0.2s',
                      }}
                    >
                      {code}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && rates[hovered] != null && (
        <div className="absolute pointer-events-none z-20 rounded-xl"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 70,
            transform: 'translateX(-50%)',
            background: 'rgba(15,23,42,0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,.25), 0 2px 8px rgba(0,0,0,.15)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '10px 14px',
          }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: getHeatColor(rates[hovered]) }} />
            <span className="text-[13px] font-bold text-white">{STATE_NAMES[hovered] || hovered}</span>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[18px] font-extrabold font-data" style={{ color: getHeatColor(rates[hovered]), letterSpacing: '-0.5px' }}>
                {rates[hovered].toFixed(1)}%
              </div>
              <div className="text-[9px] text-slate-400 font-semibold">{lang === 'es' ? 'TASA DE ÉXITO' : 'WIN RATE'}</div>
            </div>
            <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div className="text-[11px] font-semibold" style={{ color: getHeatColor(rates[hovered]) }}>
                {lang === 'es' ? (rates[hovered] >= 50 ? 'Sobre promedio' : 'Bajo promedio') : getRateLabel(rates[hovered])}
              </div>
              <div className="text-[9px] text-slate-400">{lang === 'es' ? 'Clic para seleccionar' : 'Click to select'}</div>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45"
            style={{ background: 'rgba(15,23,42,0.95)', borderRight: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="text-[9px] text-slate-400 font-semibold">{lang === 'es' ? 'Menor' : 'Lower'}</span>
        <div className="flex h-2 rounded-full overflow-hidden" style={{ width: 120 }}>
          <div className="flex-1" style={{ background: '#DC2626' }} />
          <div className="flex-1" style={{ background: '#E87461' }} />
          <div className="flex-1" style={{ background: '#D97706' }} />
          <div className="flex-1" style={{ background: '#4F46E5' }} />
          <div className="flex-1" style={{ background: '#14B8A6' }} />
          <div className="flex-1" style={{ background: '#0D9488' }} />
          <div className="flex-1" style={{ background: '#059669' }} />
        </div>
        <span className="text-[9px] text-slate-400 font-semibold">{lang === 'es' ? 'Mayor' : 'Higher'}</span>
      </div>

      {/* Top/Bottom states with improved layout */}
      {sortedStates.length > 5 && (
        <div className="flex gap-6 mt-4 justify-center">
          <div className="text-center">
            <div className="text-[9px] font-bold text-slate-400 tracking-[1.5px] mb-1.5">
              {lang === 'es' ? '▲ MEJORES' : '▲ HIGHEST'}
            </div>
            <div className="flex gap-1">
              {sortedStates.slice(0, 3).map(([code, rate]) => (
                <button key={code}
                  onClick={() => onStateClick?.(code)}
                  className="px-2.5 py-1 rounded-lg font-semibold text-[11px] cursor-pointer border-none transition-all hover:scale-105"
                  style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}>
                  <span className="font-data font-bold">{code}</span> <span className="font-data">{rate.toFixed(0)}%</span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #1E293B, transparent)' }} />
          <div className="text-center">
            <div className="text-[9px] font-bold text-slate-400 tracking-[1.5px] mb-1.5">
              {lang === 'es' ? '▼ MÁS BAJOS' : '▼ LOWEST'}
            </div>
            <div className="flex gap-1">
              {sortedStates.slice(-3).map(([code, rate]) => (
                <button key={code}
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
