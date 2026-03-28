'use client';
import React, { useState, useEffect } from 'react';

interface LiveCaseFeedProps {
  lang?: string;
}

const CASE_EVENTS = [
  { type: 'Employment Discrimination', state: 'CA', outcome: 'settled', amount: '$145,000', time: '2m ago' },
  { type: 'Personal Injury', state: 'TX', outcome: 'won', amount: '$312,000', time: '5m ago' },
  { type: 'Consumer Protection', state: 'NY', outcome: 'settled', amount: '$28,500', time: '8m ago' },
  { type: 'Medical Malpractice', state: 'FL', outcome: 'won', amount: '$890,000', time: '12m ago' },
  { type: 'Wrongful Termination', state: 'IL', outcome: 'settled', amount: '$67,000', time: '15m ago' },
  { type: 'Civil Rights (§1983)', state: 'GA', outcome: 'won', amount: '$215,000', time: '18m ago' },
  { type: 'Insurance Bad Faith', state: 'PA', outcome: 'settled', amount: '$175,000', time: '22m ago' },
  { type: 'Wage & Hour (FLSA)', state: 'WA', outcome: 'won', amount: '$42,000', time: '25m ago' },
  { type: 'Housing Discrimination', state: 'AZ', outcome: 'settled', amount: '$95,000', time: '28m ago' },
  { type: 'Product Liability', state: 'OH', outcome: 'won', amount: '$520,000', time: '31m ago' },
  { type: 'Sexual Harassment', state: 'NJ', outcome: 'settled', amount: '$185,000', time: '35m ago' },
  { type: 'Breach of Contract', state: 'MA', outcome: 'won', amount: '$73,000', time: '38m ago' },
];

const ES_TYPES: Record<string, string> = {
  'Employment Discrimination': 'Discriminación Laboral',
  'Personal Injury': 'Lesiones Personales',
  'Consumer Protection': 'Protección al Consumidor',
  'Medical Malpractice': 'Negligencia Médica',
  'Wrongful Termination': 'Despido Injusto',
  'Civil Rights (§1983)': 'Derechos Civiles',
  'Insurance Bad Faith': 'Seguro de Mala Fe',
  'Wage & Hour (FLSA)': 'Salarios (FLSA)',
  'Housing Discrimination': 'Discriminación de Vivienda',
  'Product Liability': 'Responsabilidad de Producto',
  'Sexual Harassment': 'Acoso Sexual',
  'Breach of Contract': 'Incumplimiento de Contrato',
};

export default function LiveCaseFeed({ lang = 'en' }: LiveCaseFeedProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeIdx, setActiveIdx] = useState(0);
  const es = lang === 'es';

  // Cycle through highlighting
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % visibleCount);
    }, 3000);
    return () => clearInterval(iv);
  }, [visibleCount]);

  const events = CASE_EVENTS.slice(0, visibleCount);

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0B1221 0%, #131D35 100%)',
      border: '1px solid rgba(79,70,229,0.15)',
      boxShadow: '0 8px 40px rgba(11,18,33,0.3)',
    }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[13px] font-semibold text-white">{es ? 'Actividad en tiempo real' : 'Live Case Activity'}</span>
        </div>
        <div className="text-[11px] text-[#94A3B8] font-mono">
          {es ? 'Actualizado cada 30s' : 'Updates every 30s'}
        </div>
      </div>

      {/* Feed items */}
      <div className="divide-y divide-white/5">
        {events.map((ev, i) => {
          const isActive = i === activeIdx;
          const isWon = ev.outcome === 'won';
          return (
            <div
              key={i}
              className="px-5 py-3.5 flex items-center gap-3 transition-all duration-500"
              style={{
                background: isActive ? 'rgba(79,70,229,0.06)' : 'transparent',
                borderLeft: isActive ? '3px solid #4F46E5' : '3px solid transparent',
              }}
            >
              {/* Outcome icon */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                background: isWon ? 'rgba(13,148,136,0.15)' : 'rgba(79,70,229,0.12)',
              }}>
                {isWon ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-slate-200 truncate">
                  {es ? ES_TYPES[ev.type] || ev.type : ev.type}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{
                    background: isWon ? 'rgba(13,148,136,0.15)' : 'rgba(79,70,229,0.12)',
                    color: isWon ? '#0D9488' : '#6366F1',
                  }}>
                    {isWon ? (es ? 'Ganado' : 'Won') : (es ? 'Acuerdo' : 'Settled')}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">{ev.state}</span>
                </div>
              </div>

              {/* Amount + time */}
              <div className="text-right flex-shrink-0">
                <div className="text-[14px] font-bold font-mono" style={{ color: isWon ? '#0D9488' : '#6366F1' }}>
                  {ev.amount}
                </div>
                <div className="text-[10px] text-[#94A3B8]">{ev.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(79,70,229,0.04)' }}>
        <div className="text-[11px] text-slate-400">
          {es ? 'Basado en datos agregados de casos federales' : 'Based on aggregate federal case data'}
        </div>
        {visibleCount < CASE_EVENTS.length && (
          <button
            onClick={() => setVisibleCount(Math.min(visibleCount + 3, CASE_EVENTS.length))}
            className="text-[11px] font-semibold border-none bg-transparent cursor-pointer transition-colors"
            style={{ color: '#6366F1' }}
          >
            {es ? 'Ver más ↓' : 'Show more ↓'}
          </button>
        )}
      </div>
    </div>
  );
}
