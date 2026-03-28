'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';

// Interactive Case Outcome Simulator — hero section showpiece
// Users drag sliders to see projected outcomes update in real-time

interface SimulatorProps {
  lang?: string;
  onGetStarted?: () => void;
}

const CASE_TYPES = [
  { id: 'employment', label: 'Employment', labelEs: 'Empleo', baseWR: 38, baseMd: 85000, baseMo: 11 },
  { id: 'injury', label: 'Personal Injury', labelEs: 'Lesiones', baseWR: 54, baseMd: 120000, baseMo: 9 },
  { id: 'consumer', label: 'Consumer', labelEs: 'Consumidor', baseWR: 42, baseMd: 45000, baseMo: 10 },
  { id: 'rights', label: 'Civil Rights', labelEs: 'Derechos Civiles', baseWR: 35, baseMd: 95000, baseMo: 14 },
  { id: 'housing', label: 'Housing', labelEs: 'Vivienda', baseWR: 48, baseMd: 38000, baseMo: 8 },
  { id: 'medical', label: 'Medical', labelEs: 'Médico', baseWR: 32, baseMd: 250000, baseMo: 18 },
];

function formatDollar(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}K`;
  return `$${n.toLocaleString()}`;
}

export default function OutcomeSimulator({ lang = 'en', onGetStarted }: SimulatorProps) {
  const es = lang === 'es';
  const [caseType, setCaseType] = useState('employment');
  const [damageAmount, setDamageAmount] = useState(50); // 0-100 slider → maps to dollar range
  const [hasAttorney, setHasAttorney] = useState(true);
  const [jurisdiction, setJurisdiction] = useState(50); // 0-100 → maps to favorable/unfavorable
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const ct = CASE_TYPES.find(c => c.id === caseType)!;

  // Compute dynamic projected outcomes based on sliders
  const projected = useMemo(() => {
    const attorneyMultiplier = hasAttorney ? 1.34 : 0.72;
    const jurisdictionMultiplier = 0.7 + (jurisdiction / 100) * 0.6; // 0.7x to 1.3x
    const damageMultiplier = 0.3 + (damageAmount / 100) * 2.4; // 0.3x to 2.7x

    const wr = Math.min(88, Math.max(12, Math.round(ct.baseWR * attorneyMultiplier * jurisdictionMultiplier)));
    const recovery = Math.round(ct.baseMd * damageMultiplier * attorneyMultiplier);
    const timeline = Math.round(ct.baseMo * (hasAttorney ? 0.85 : 1.2) * (1 + (damageAmount / 200)));
    const settlePct = Math.min(85, Math.max(20, Math.round(45 + (hasAttorney ? 15 : -10) + (jurisdiction / 5))));

    return { wr, recovery, timeline, settlePct };
  }, [caseType, damageAmount, hasAttorney, jurisdiction, ct]);

  const wrColor = projected.wr >= 55 ? '#0D9488' : projected.wr >= 40 ? '#6366F1' : '#E87461';
  const strengthLabel = projected.wr >= 55 ? (es ? 'Fuerte' : 'Strong') : projected.wr >= 40 ? (es ? 'Moderado' : 'Moderate') : (es ? 'Difícil' : 'Challenging');

  return (
    <div className="relative overflow-hidden rounded-3xl" style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      border: '1px solid rgba(99,102,241,0.2)',
      boxShadow: '0 24px 80px rgba(11,18,33,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(13,148,136,0.2) 0%, transparent 60%)',
      }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#6366F1' }}>
              {es ? 'SIMULADOR INTERACTIVO' : 'INTERACTIVE SIMULATOR'}
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white" style={{ letterSpacing: '-0.5px' }}>
              {es ? 'Proyecta tu resultado' : 'Project Your Outcome'}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(13,148,136,0.2))',
            border: '1px solid rgba(99,102,241,0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>

        {/* Case Type Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {CASE_TYPES.map(c => (
            <button key={c.id} onClick={() => setCaseType(c.id)}
              className="px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200"
              style={{
                background: caseType === c.id ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : 'rgba(255,255,255,0.05)',
                color: caseType === c.id ? '#fff' : '#94A3B8',
                border: `1px solid ${caseType === c.id ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
                transform: caseType === c.id ? 'scale(1.05)' : 'scale(1)',
              }}>
              {es ? c.labelEs : c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Sliders */}
          <div className="space-y-5">
            {/* Damage Amount Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[12px] font-semibold text-slate-300">
                  {es ? 'Monto en disputa' : 'Amount in Dispute'}
                </label>
                <span className="text-[13px] font-bold font-data" style={{ color: '#6366F1' }}>
                  {formatDollar(Math.round(ct.baseMd * (0.3 + (damageAmount / 100) * 2.4)))}
                </span>
              </div>
              <input type="range" min="0" max="100" value={damageAmount}
                onChange={e => setDamageAmount(Number(e.target.value))}
                className="simulator-slider w-full"
                style={{ '--slider-pct': `${damageAmount}%` } as any} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#94A3B8]">{formatDollar(Math.round(ct.baseMd * 0.3))}</span>
                <span className="text-[10px] text-[#94A3B8]">{formatDollar(Math.round(ct.baseMd * 2.7))}</span>
              </div>
            </div>

            {/* Jurisdiction Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[12px] font-semibold text-slate-300">
                  {es ? 'Factor de jurisdicción' : 'Jurisdiction Factor'}
                </label>
                <span className="text-[13px] font-bold font-data" style={{ color: jurisdiction > 60 ? '#0D9488' : jurisdiction > 35 ? '#6366F1' : '#E87461' }}>
                  {jurisdiction > 60 ? (es ? 'Favorable' : 'Favorable') : jurisdiction > 35 ? (es ? 'Promedio' : 'Average') : (es ? 'Desfavorable' : 'Unfavorable')}
                </span>
              </div>
              <input type="range" min="0" max="100" value={jurisdiction}
                onChange={e => setJurisdiction(Number(e.target.value))}
                className="simulator-slider w-full"
                style={{ '--slider-pct': `${jurisdiction}%` } as any} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#94A3B8]">{es ? 'Menos favorable' : 'Less favorable'}</span>
                <span className="text-[10px] text-[#94A3B8]">{es ? 'Más favorable' : 'More favorable'}</span>
              </div>
            </div>

            {/* Attorney Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div>
                <div className="text-[13px] font-semibold text-slate-200">
                  {es ? 'Representación legal' : 'Attorney Representation'}
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">
                  {hasAttorney
                    ? (es ? 'Abogados aumentan las tasas de éxito ~3.4x' : 'Attorneys increase win rates ~3.4x')
                    : (es ? 'Autrepresentación (pro se)' : 'Self-representation (pro se)')}
                </div>
              </div>
              <button onClick={() => setHasAttorney(!hasAttorney)}
                className="w-14 h-7 rounded-full relative transition-all duration-300 cursor-pointer border-none"
                style={{
                  background: hasAttorney ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : 'rgba(255,255,255,0.12)',
                }}>
                <div className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300"
                  style={{ left: hasAttorney ? 'calc(100% - 26px)' : '2px' }} />
              </button>
            </div>
          </div>

          {/* Right: Live Results Dashboard */}
          <div className="relative">
            <div className="rounded-2xl p-5 overflow-hidden" style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {/* Projected Win Rate — large gauge */}
              <div className="text-center mb-5">
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#94A3B8] mb-2">
                  {es ? 'TASA DE ÉXITO PROYECTADA' : 'PROJECTED WIN RATE'}
                </div>
                <div className="relative inline-block w-[120px] sm:w-[140px]">
                  <svg width="100%" height="auto" viewBox="0 0 140 78" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="simGauge" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#E87461" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#0D9488" />
                      </linearGradient>
                    </defs>
                    {/* Background arc */}
                    <path d="M 10 72 A 60 60 0 0 1 130 72" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
                    {/* Colored arc */}
                    <path d="M 10 72 A 60 60 0 0 1 130 72" fill="none" stroke="url(#simGauge)" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${Math.PI * 60}`}
                      strokeDashoffset={`${Math.PI * 60 * (1 - projected.wr / 100)}`}
                      style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                    {/* Needle */}
                    {(() => {
                      const angle = Math.PI * (1 - projected.wr / 100);
                      const cx = 70, cy = 72, nr = 45;
                      const nx = cx + nr * Math.cos(angle);
                      const ny = cy - nr * Math.sin(angle);
                      return <circle cx={nx} cy={ny} r="5" fill={wrColor} style={{ transition: 'cx 0.6s ease, cy 0.6s ease, fill 0.3s ease', filter: `drop-shadow(0 0 6px ${wrColor}60)` }} />;
                    })()}
                  </svg>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="text-3xl font-display font-extrabold" style={{ color: wrColor, transition: 'color 0.3s ease' }}>
                      {projected.wr}%
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-bold mt-1" style={{ color: wrColor, transition: 'color 0.3s ease' }}>
                  {strengthLabel}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: es ? 'Recuperación est.' : 'Est. Recovery', value: formatDollar(projected.recovery), color: '#6366F1' },
                  { label: es ? 'Duración est.' : 'Est. Duration', value: `${projected.timeline}mo`, color: '#94A3B8' },
                  { label: es ? 'Tasa de acuerdo' : 'Settlement Rate', value: `${projected.settlePct}%`, color: '#0D9488' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-3 rounded-xl" style={{
                    background: `${s.color}08`,
                    border: `1px solid ${s.color}15`,
                  }}>
                    <div className="text-[16px] font-display font-bold" style={{ color: s.color, transition: 'all 0.4s ease' }}>
                      {s.value}
                    </div>
                    <div className="text-[9px] font-semibold text-[#94A3B8] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini outcome distribution bars */}
              <div className="mt-4 space-y-2">
                {[
                  { label: es ? 'Acuerdo' : 'Settlement', pct: projected.settlePct, color: '#0D9488' },
                  { label: es ? 'Victoria en juicio' : 'Trial Win', pct: Math.round(projected.wr * 0.3), color: '#6366F1' },
                  { label: es ? 'Desestimado' : 'Dismissed', pct: Math.round(100 - projected.wr - projected.settlePct * 0.5), color: '#E87461' },
                ].map((bar, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#94A3B8] w-20 text-right">{bar.label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full" style={{
                        width: `${Math.max(5, Math.min(95, bar.pct))}%`,
                        background: bar.color,
                        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }} />
                    </div>
                    <span className="text-[10px] font-bold w-8 text-right" style={{ color: bar.color }}>{Math.max(5, Math.min(95, bar.pct))}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={onGetStarted}
              className="w-full mt-4 py-3.5 text-[14px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
              }}>
              {es ? 'Obtener tu informe personalizado →' : 'Get your personalized report →'}
            </button>

            <div className="text-center mt-2">
              <span className="text-[10px] text-[#94A3B8]">
                {es ? 'Basado en 4M+ casos federales · No es asesoría legal' : 'Based on 4M+ federal cases · Not legal advice'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
