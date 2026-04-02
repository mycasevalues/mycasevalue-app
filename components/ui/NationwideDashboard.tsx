'use client';
import React, { useState, useEffect, useRef } from 'react';

interface NationwideDashboardProps {
  lang?: string;
}

const METRICS = [
  { key: 'total', value: 5127834, label: 'Total Cases Analyzed', labelEs: 'Casos Analizados', color: '#111111', icon: 'database' },
  { key: 'settled', value: 67, label: 'Settlement Rate', labelEs: 'Tasa de Acuerdos', color: '#0D9488', icon: 'handshake', suffix: '%' },
  { key: 'median', value: 85, label: 'Median Recovery ($K)', labelEs: 'Recuperación Mediana ($K)', color: '#D97706', icon: 'dollar', prefix: '$', suffix: 'K' },
  { key: 'duration', value: 11.2, label: 'Avg Duration (months)', labelEs: 'Duración Promedio (meses)', color: '#8B5CF6', icon: 'clock', suffix: ' mo' },
];

const YEAR_DATA = [
  { year: '2019', cases: 282400, wr: 36.2 },
  { year: '2020', cases: 248100, wr: 34.8 },
  { year: '2021', cases: 301200, wr: 37.1 },
  { year: '2022', cases: 324500, wr: 38.4 },
  { year: '2023', cases: 341800, wr: 39.1 },
  { year: '2024', cases: 358200, wr: 40.2 },
];

function AnimCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }: { end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  const display = decimals > 0
    ? val.toFixed(decimals)
    : end >= 10000
      ? `${(val / 1000000).toFixed(1)}M`
      : val >= 1000
        ? `${(val / 1000).toFixed(0)}K`
        : Math.round(val).toString();

  return <span>{prefix}{display}{suffix}</span>;
}

export default function NationwideDashboard({ lang = 'en' }: NationwideDashboardProps) {
  const es = lang === 'es';
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const maxCases = Math.max(...YEAR_DATA.map(d => d.cases));

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F9F8F6 0%, #EDEAE4 100%)',
      border: '1px solid rgba(17,17,17,0.12)',
      boxShadow: '0 12px 48px rgba(255,255,255,0.3)',
    }}>
      {/* Header */}
      <div className="px-6 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-[#6B7280] tracking-[2px] mb-1">{es ? 'PANEL NACIONAL' : 'NATIONWIDE DASHBOARD'}</div>
            <div className="text-[18px] font-display font-bold text-white">{es ? 'Datos federales en tiempo real' : 'Federal Data Overview'}</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(13,148,136,0.12)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-400">{es ? 'En vivo' : 'Live'}</span>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px p-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {METRICS.map((m, i) => (
          <div key={m.key} className="p-4 text-center transition-all hover:bg-white/[0.03]" style={{ background: '#F9F8F6' }}>
            <div className="text-[18px] sm:text-[26px] font-display font-extrabold mb-1" style={{
              color: m.color,
              letterSpacing: '-1px',
              textShadow: `0 0 20px ${m.color}30`,
            }}>
              <AnimCounter end={m.value} prefix={m.key === 'median' ? '$' : ''} suffix={m.suffix || ''} decimals={m.key === 'duration' ? 1 : 0} />
            </div>
            <div className="text-[10px] font-semibold text-[#6B7280] tracking-wide">
              {es ? m.labelEs : m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Year-over-year trend chart */}
      <div className="px-6 py-5">
        <div className="text-[10px] font-bold text-[#6B7280] tracking-[1.5px] mb-3">{es ? 'TENDENCIA ANUAL DE CASOS' : 'YEARLY CASE TREND'}</div>
        <div className="flex items-end gap-1.5 sm:gap-2 h-[80px] sm:h-[100px]">
          {YEAR_DATA.map((d, i) => {
            const h = (d.cases / maxCases) * 100;
            const isHovered = hoveredYear === d.year;
            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                onMouseEnter={() => setHoveredYear(d.year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="text-[10px] font-mono text-white bg-[#E5E0D8] px-2 py-1 rounded mb-1 whitespace-nowrap" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    {(d.cases / 1000).toFixed(0)}K • {d.wr}%
                  </div>
                )}
                <div
                  className="w-full rounded-t transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    background: isHovered
                      ? 'linear-gradient(to top, #111111, #333333)'
                      : i === YEAR_DATA.length - 1
                        ? 'linear-gradient(to top, #0D9488, #14B8A6)'
                        : 'linear-gradient(to top, rgba(17,17,17,0.6), rgba(17,17,17,0.85))',
                    boxShadow: isHovered ? '0 0 20px rgba(17,17,17,0.4)' : 'none',
                    transform: isHovered ? 'scaleX(1.1)' : 'scaleX(1)',
                  }}
                />
                <span className="text-[9px] text-[#6B7280] font-mono">{d.year.slice(2)}</span>
              </div>
            );
          })}
        </div>

        {/* Win rate trend line */}
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#6B7280] tracking-[1.5px]">{es ? 'EVOLUCIÓN DE TASA DE ÉXITO' : 'WIN RATE EVOLUTION'}</span>
            <span className="text-[11px] font-mono font-semibold" style={{ color: '#0D9488' }}>
              +{(YEAR_DATA[YEAR_DATA.length - 1].wr - YEAR_DATA[0].wr).toFixed(1)}%
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#0D9488" className="inline ml-1 -mt-0.5"><path d="M5 0L9 5H1L5 0Z" /></svg>
            </span>
          </div>
          <svg width="100%" height="40" viewBox="0 0 300 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const vals = YEAR_DATA.map(d => d.wr);
              const mn = Math.min(...vals) - 2;
              const mx = Math.max(...vals) + 2;
              const rng = mx - mn;
              const pts = vals.map((v, i) => ({
                x: (i / (vals.length - 1)) * 300,
                y: 40 - ((v - mn) / rng) * 36 - 2,
              }));
              const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
              const area = `${line} L300,40 L0,40 Z`;
              return (
                <>
                  <path d={area} fill="url(#wrGrad)" />
                  <path d={line} fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0D9488" stroke="#F9F8F6" strokeWidth="1.5" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="px-6 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="text-[10px] text-center" style={{ color: '#9CA3AF' }}>
          {es ? 'Datos de fuentes públicas federales. Actualizado periódicamente.' : 'Data from public federal sources. Updated periodically.'}
        </div>
      </div>
    </div>
  );
}
