'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatedNumber } from './ui/AnimatedNumber';
import PieChart from './ui/PieChart';
import { CategoryIcon } from './ui/Icons';
import USMap from './ui/USMap';
import { Logo } from './ui/Logo';
import TrustBar from './sections/TrustBar';
import DataPreviewSection from './sections/DataPreviewSection';
import FaqSection from './sections/FaqSection';
import FinalCtaSection from './sections/FinalCtaSection';
import {
  SITS, STATES, TIMING_OPTS, AMOUNT_OPTS, ATTORNEY_OPTS,
  OUTCOME_DATA, CIRCUIT_MAP, CIRCUIT_DATA_KEY, CIRCUIT_WIN_RATES, FEE_INFO,
  LEGAL_AID, TRENDING, TESTIMONIALS, MOCK_DATA, UPL, NOS_FALLBACK,
  apiCall, formatRecoveryValue, getMockData,
} from '../lib/data';
import { TRANSLATIONS, Lang } from '../lib/i18n';

// ============================================================
// REAL AGGREGATE STATE WIN RATES (computed from CourtListener data across all case types)
// ============================================================
const AGGREGATE_STATE_RATES: Record<string, number> = {
  AK: 43.7, AL: 40.7, AR: 57.1, AZ: 48.7, CA: 40.9, CO: 53.6, CT: 57.6,
  DC: 39.5, DE: 47.7, FL: 48.1, GA: 46.2, HI: 54.2, IA: 56.7, ID: 52.8,
  IL: 56.9, IN: 55.0, KS: 56.1, KY: 50.9, LA: 51.5, MA: 49.1, MD: 44.2,
  ME: 58.7, MI: 51.0, MN: 53.1, MO: 48.3, MS: 51.3, MT: 54.4, NC: 48.4,
  ND: 55.6, NE: 56.8, NH: 48.6, NJ: 54.4, NM: 57.0, NV: 43.0, NY: 46.9,
  OH: 50.4, OK: 53.9, OR: 52.5, PA: 62.1, RI: 54.6, SC: 56.8, SD: 54.8,
  TN: 45.8, TX: 42.0, UT: 51.6, VA: 47.7, VT: 59.1, WA: 46.6, WI: 51.9,
  WV: 49.0, WY: 60.1,
};

// ============================================================
// REUSABLE UI
// ============================================================

function Reveal({ children }: { children: React.ReactNode; delay?: number }) {
  // Simple pass-through wrapper — content always visible
  // No CSS animation: React re-renders (from timers) reset CSS animations to opacity:0
  return <>{children}</>;
}

function Card({ children, glow = false, className = '', style = {} }: { children: React.ReactNode; glow?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`card-bg rounded-2xl border mb-3 p-7 transition-all duration-300 ${glow ? 'animate-glow-pulse' : ''} ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(253,251,247,0.8) 100%)',
        borderColor: 'rgba(226,232,240,0.6)',
        boxShadow: glow
          ? '0 2px 8px rgba(64,64,242,.08), 0 12px 40px rgba(11,18,33,.06), inset 0 1px 0 rgba(255,255,255,0.8)'
          : '0 1px 3px rgba(11,18,33,.02), 0 8px 28px rgba(11,18,33,.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        ...style,
      }}>
      {children}
    </div>
  );
}

function GoldRule() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(64,64,242,0.3), rgba(64,64,242,0.1))' }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#4040F2', opacity: 0.4 }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(64,64,242,0.1), rgba(64,64,242,0.3), transparent)' }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body text-[10px] font-bold tracking-[3px] uppercase mb-5" style={{ color: '#94A3B8', letterSpacing: '3px' }}>
      <span style={{ background: 'linear-gradient(90deg, #94A3B8, #4040F2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{children}</span>
    </div>
  );
}

function Stat({ value, label, color, large = false, dark = false }: { value: string; label: string; color: string; large?: boolean; dark?: boolean }) {
  return (
    <div className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5" style={{
      background: dark ? `linear-gradient(180deg, rgba(19,27,46,0.7), ${color}10)` : `linear-gradient(180deg, #fff, ${color}06)`,
      border: `1px solid ${dark ? `${color}20` : `${color}10`}`,
      boxShadow: dark ? `0 2px 12px ${color}08` : `0 2px 12px ${color}06`,
    }}>
      <div className="font-display font-bold" style={{
        fontSize: large ? 48 : 30,
        color,
        letterSpacing: large ? '-1px' : '-0.5px',
        lineHeight: 1,
        textShadow: dark ? `0 0 20px ${color}30` : 'none',
      }}>
        {value}
      </div>
      <div className="text-[11px] mt-1.5 font-semibold tracking-wide uppercase" style={{ color: dark ? '#8B9AB5' : '#94A3B8', fontSize: '10px', letterSpacing: '0.5px' }}>{label}</div>
    </div>
  );
}

function BarLine({ label, pct, max, color, delay = 0 }: { label: string; pct: number; max: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.width = `${(pct / Math.max(max, 1)) * 100}%`;
    }, delay);
    return () => clearTimeout(t);
  }, [pct, max, delay]);
  return (
    <div className="flex items-center gap-3 py-2 group">
      <span className="text-sm flex-1 truncate font-medium">{label}</span>
      <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden flex-shrink-0 transition-all group-hover:h-3">
        <div ref={ref} className="h-full rounded-full" style={{
          width: 0,
          background: `linear-gradient(90deg, ${color}90, ${color})`,
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      <span className="text-sm font-bold w-12 text-right font-data" style={{ color }}>{pct}%</span>
    </div>
  );
}

function Select({ value, options, onChange, placeholder, dark = false }: { value: string; options: { id: string; label: string }[]; onChange: (v: string) => void; placeholder?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = options.find(o => o.id === value);
  const showSearch = options.length > 6;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch(''); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open && showSearch && searchRef.current) searchRef.current.focus();
  }, [open, showSearch]);

  const filtered = search ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen(!open); setSearch(''); }}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full px-4 py-3.5 text-[15px] font-medium border-[1.5px] rounded-xl cursor-pointer text-left flex justify-between items-center transition-all duration-200"
        style={{
          borderColor: open ? '#4040F2' : (dark ? '#334155' : '#E2E8F0'),
          color: selected ? (dark ? '#F0F2F5' : '#0B1221') : '#94A3B8',
          background: dark ? '#1A2744' : '#fff',
          boxShadow: open ? '0 0 0 3px rgba(64,64,242,0.12)' : 'none',
        }}>
        <span className="truncate">{selected ? selected.label : placeholder || 'Select...'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#4040F2' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        role="listbox"
        className="absolute top-full mt-1.5 left-0 right-0 rounded-xl z-20 overflow-hidden"
        style={{
          background: dark ? '#1A2744' : '#fff',
          border: open ? `1px solid ${dark ? '#334155' : '#E2E8F0'}` : '1px solid transparent',
          boxShadow: open ? (dark ? '0 12px 40px rgba(11,18,33,.4)' : '0 12px 40px rgba(11,18,33,.12)') : 'none',
          maxHeight: open ? '280px' : '0',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
          transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}>
        {showSearch && (
          <div className="px-2 pt-2 pb-1">
            <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 text-[13px] rounded-lg outline-none transition-colors"
              style={{
                background: dark ? '#0F1729' : '#F8FAFC',
                border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`,
                color: dark ? '#F0F2F5' : '#0B1221',
              }} />
          </div>
        )}
        <div className="overflow-y-auto p-1" style={{ maxHeight: showSearch ? '220px' : '260px' }}>
          {filtered.map((o, idx) => (
            <button key={o.id}
              role="option"
              aria-selected={o.id === value}
              onClick={() => { onChange(o.id); setOpen(false); setSearch(''); }}
              className="w-full px-4 py-2.5 text-sm text-left rounded-lg cursor-pointer transition-all duration-150"
              style={{
                fontWeight: o.id === value ? 600 : 400,
                color: o.id === value ? '#4040F2' : (dark ? '#E2E8F0' : '#0B1221'),
                background: o.id === value ? (dark ? '#4040F215' : '#F3EBDA') : 'transparent',
                animationDelay: open ? `${idx * 20}ms` : '0ms',
              }}
              onMouseEnter={e => { if (o.id !== value) e.currentTarget.style.background = dark ? '#243352' : '#F8FAFC'; }}
              onMouseLeave={e => { if (o.id !== value) e.currentTarget.style.background = 'transparent'; }}>
              <span className="flex items-center gap-2">
                {o.id === value && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                )}
                {o.label}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-slate-400 text-center">No results</div>
          )}
        </div>
      </div>
    </div>
  );
}

function LockedPreview({ children, onUnlock, label }: { children: React.ReactNode; onUnlock: () => void; label?: string }) {
  return (
    <div className="relative mb-3 rounded-2xl overflow-hidden border border-amber-200/60" style={{ background: 'linear-gradient(135deg, rgba(253,251,247,0.95) 0%, rgba(255,255,255,0.9) 100%)' }}>
      <div style={{ filter: 'blur(5px)', pointerEvents: 'none', opacity: 0.45, padding: 24 }}>{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(253,251,247,0.6) 70%, transparent 100%)' }}>
        <div className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center border border-amber-200/50" style={{ background: 'linear-gradient(135deg, #fff 0%, #fdf8ef 100%)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-sm text-slate-600 font-medium mb-2">Premium feature</div>
          <button onClick={onUnlock} className="premium-cta px-7 py-3 text-sm font-semibold rounded-xl cursor-pointer text-white transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
            style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 4px 16px rgba(64,64,242,.25)' }}>
            {label || 'Unlock — $5.99'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Collapsible({ title, badge, defaultOpen = false, children }: { title: string; badge?: string | number; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-bg rounded-2xl border overflow-hidden mb-3 transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(253,251,247,0.8) 100%)',
        borderColor: open ? 'rgba(64,64,242,0.15)' : 'rgba(226,232,240,0.6)',
        boxShadow: open ? '0 4px 24px rgba(11,18,33,.07), inset 0 1px 0 rgba(255,255,255,0.8)' : '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-4.5 bg-transparent border-none cursor-pointer text-left group" aria-expanded={open}
        style={{ padding: '18px 24px' }}>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[15px] group-hover:text-[#4040F2] transition-colors">{title}</span>
          {badge && <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color: '#4040F2', background: '#F3EBDA' }}>{badge}</span>}
        </div>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
          style={{ background: open ? '#4040F210' : 'transparent' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#4040F2' : '#94A3B8'} strokeWidth="2.5"
            style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.2s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div className="overflow-hidden" style={{
        maxHeight: open ? '2000px' : '0',
        opacity: open ? 1 : 0,
        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
      }}>
        <div className="px-6 pb-5 pt-0">{children}</div>
      </div>
    </div>
  );
}

function WizardProgress({ step, labels, lang = 'en' }: { step: number; labels?: string[]; lang?: string }) {
  const defaultLabels = labels || (lang === 'es' ? ['Situación', 'Detalles', 'Confirmar', 'Correo', 'Informe'] : ['Situation', 'Details', 'Confirm', 'Email', 'Report']);
  return (
    <div className="mb-8 no-print">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm font-bold" style={{ color: '#4040F2' }}>{lang === 'es' ? `Paso ${step}/5` : `Step ${step}/5`}</span>
        <div className="flex gap-1.5 flex-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-1 h-2 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ background: i <= step ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : '#E2E8F0' }}>
              {i <= step && (
                <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.3)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="wizard-labels">
        {defaultLabels.map((l, i) => (
          <span key={i} className={`step-label transition-all ${i + 1 <= step ? 'active' : ''}`}
            style={{
              fontWeight: i + 1 <= step ? 600 : 400,
              color: i + 1 <= step ? '#4040F2' : '#94A3B8',
              textShadow: i + 1 <= step ? '0 0 12px rgba(64,64,242,0.2)' : 'none',
            }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium z-50 text-white"
      style={{ background: '#0B1221', boxShadow: '0 8px 32px rgba(11,18,33,.2)', animation: 'slideUp 0.3s ease' }}>
      {message}
    </div>
  );
}

// Mini sparkline for yearly trend
function TrendSparkline({ data, width = 120, height = 32 }: { data: Record<string, { total: number; wr: number }>; width?: number; height?: number }) {
  const years = Object.keys(data).sort();
  if (years.length < 3) return null;
  const vals = years.map(y => data[y].wr);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const points = vals.map((v, i) =>
    `${(i / (vals.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline points={points} fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// State win rate chip
function StateWinRate({ stateCode, stateRates }: { stateCode: string; stateRates?: Record<string, number> }) {
  if (!stateRates || !stateCode || !stateRates[stateCode]) return null;
  const rate = stateRates[stateCode];
  const color = rate > 55 ? '#0D9488' : rate > 40 ? '#D97706' : '#E87461';
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold" style={{ background: `${color}10`, color }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
      {stateCode}: {rate}% win rate
    </div>
  );
}

// Legal glossary tooltip
const LEGAL_GLOSSARY: Record<string, string> = {
  'win rate': 'How often people in similar situations got a favorable result in court.',
  'settlement': 'When both sides agree to resolve the case (usually with a payment) without going to trial.',
  'dismissal': 'When a judge ends a case before it goes to trial, often because of a technicality or lack of evidence.',
  'summary judgment': 'When a judge decides the case without a full trial because the key facts aren\'t in dispute.',
  'statute of limitations': 'The legal deadline to file your case. If you miss it, you generally can\'t sue — even if you have a strong case.',
  'contingency fee': 'A payment arrangement where your lawyer only gets paid if you win (usually 33-40% of what you recover).',
  'plaintiff': 'The person filing the lawsuit — that could be you.',
  'defendant': 'The person or company being sued.',
  'circuit': 'A regional group of federal courts. The U.S. has 13, and outcomes can vary significantly between them.',
  'discovery': 'The phase before trial where both sides must share evidence and information with each other.',
  'deposition': 'When a witness answers questions under oath outside of court, typically recorded for later use.',
  'mediation': 'A meeting where a neutral person helps both sides try to reach an agreement without going to trial.',
  'class action': 'A single lawsuit filed on behalf of a large group of people who were all affected by the same thing.',
  'jurisdiction': 'Which court has the authority to hear your type of case.',
  'filing': 'Officially submitting your lawsuit paperwork to the court to start your case.',
  'appeal': 'Asking a higher court to review the decision if you disagree with the outcome.',
  'damages': 'The money you\'re asking for to compensate you for what happened.',
  'pro se': 'Representing yourself in court without a lawyer.',
};


function GlossaryTip({ term, children }: { term: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const def = LEGAL_GLOSSARY[term.toLowerCase()];
  if (!def) return <>{children}</>;
  return (
    <span className="relative inline-block cursor-help"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      style={{ borderBottom: '1px dashed #4040F240' }}>
      {children}
      {show && (
        <span className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 rounded-xl text-[12px] leading-relaxed font-normal text-left w-64"
          style={{ background: '#0B1221', color: '#E2E8F0', boxShadow: '0 8px 32px rgba(11,18,33,.25)' }}>
          <span className="font-bold text-white block mb-0.5 capitalize">{term}</span>
          {def}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 rotate-45"
            style={{ background: '#0B1221' }} />
        </span>
      )}
    </span>
  );
}

// ============================================================
// NEW HOMEPAGE SECTION COMPONENTS
// ============================================================

// Feature Grid: What Your Report Includes (Free vs Premium)
function ReportFeaturesGrid({ lang = 'en' }: { lang?: string }) {
  const es = lang === 'es';
  const features = [
    // Free items
    { title: es ? 'Análisis de tasa de éxito' : 'Win Rate Analysis', desc: es ? 'Tasa de éxito histórica para tu tipo de caso' : 'Historical success rate for your case type', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
    { title: es ? 'Tasa de acuerdos' : 'Settlement Rate', desc: es ? 'Qué % de casos llegan a un acuerdo' : 'What % of cases settle', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { title: es ? 'Cronología mediana' : 'Median Timeline', desc: es ? 'Cuánto tiempo suelen durar los casos' : 'How long cases typically take', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { title: es ? 'Volumen de casos' : 'Case Volume', desc: es ? 'Tamaño de la muestra analizada' : 'Sample size of analyzed cases', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    // Premium items
    { title: es ? 'Rangos de recuperación' : 'Recovery Ranges', desc: es ? 'Estimaciones bajas, típicas y altas' : 'Low, typical, high estimates', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { title: es ? 'Análisis de jueces' : 'Judge Analytics', desc: es ? 'Cómo fallan jueces específicos' : 'How specific judges rule', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><path d="M3 12l9-9 9 9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg> },
    { title: es ? 'Puntuación de fortaleza' : 'Strength Score', desc: es ? 'Tu caso puntuado del 1 al 100' : 'Your case scored 1-100', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
    { title: es ? 'Comparación estatal' : 'State Comparison', desc: es ? 'Cómo se desempeña tu estado' : 'How your state performs', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
    { title: es ? 'Impacto del abogado' : 'Attorney Impact', desc: es ? 'Probabilidades con vs sin abogado' : 'With vs without lawyer odds', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { title: es ? 'Predicciones de cronograma' : 'Timeline Predictions', desc: es ? 'Personalizado para tu situación' : 'Customized for your situation', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {features.map((f, i) => (
        <div key={i} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
          f.free
            ? 'bg-white border-slate-100 shadow-sm'
            : 'border-slate-100 shadow-sm'
        }`} style={!f.free ? { background: 'linear-gradient(135deg, #F0F2FF, #FFFFFF)', borderColor: 'rgba(64,64,242,0.12)' } : undefined}>
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: f.free ? '#F0F2FF' : '#EEF0FF' }}>{f.icon}</div>
            {!f.free && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>}
          </div>
          <div className="text-[14px] font-semibold text-slate-700">{f.title}</div>
          <div className="text-[12px] text-slate-400 mt-1">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}

// Interactive Stats by Case Type
function CaseTypeStatsPreview({ lang = 'en' }: { lang?: string }) {
  const [activeType, setActiveType] = useState('work');
  const es = lang === 'es';
  const stats: Record<string, any> = {
    work: { wr: 38.4, timeline: '11.2 mo', settle: 32, volume: 287420, label: es ? 'Empleo' : 'Employment' },
    injury: { wr: 54.1, timeline: '8.6 mo', settle: 48, volume: 156230, label: es ? 'Lesiones' : 'Injury' },
    consumer: { wr: 42.3, timeline: '10.4 mo', settle: 41, volume: 412890, label: es ? 'Consumidor' : 'Consumer' },
  };
  const s = stats[activeType];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="mb-4 flex gap-2 flex-wrap">
        {Object.keys(stats).map(k => (
          <button key={k} onClick={() => setActiveType(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === k
                ? 'bg-yellow-100 text-yellow-900 border border-yellow-200'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}>
            {stats[k].label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { l: es ? 'Tasa de éxito' : 'Win Rate', v: `${s.wr}%`, c: '#0D9488' },
          { l: es ? 'Tiempo promedio' : 'Avg Timeline', v: s.timeline, c: '#1A2744' },
          { l: es ? 'Acuerdos %' : 'Settlement %', v: `${s.settle}%`, c: '#4040F2' },
          { l: es ? 'Casos analizados' : 'Cases Analyzed', v: `${(s.volume / 1000).toFixed(0)}K`, c: '#4040F2' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-xl transition-transform hover:scale-[1.03]" style={{ background: `${stat.c}08` }}>
            <div className="text-2xl font-display font-bold" style={{ color: stat.c, letterSpacing: '-1px' }}>{stat.v}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-1">{stat.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Legal Cost Reality Check
function LegalCostComparison({ lang = 'en' }: { lang?: string }) {
  const es = lang === 'es';
  const costs = [
    { path: es ? 'Mediación' : 'Mediation', min: 3, max: 10, color: '#0D9488' },
    { path: es ? 'Acuerdo' : 'Settlement', min: 15, max: 50, color: '#4040F2' },
    { path: es ? 'Juicio completo' : 'Full Trial', min: 50, max: 200, color: '#E87461' },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="text-[11px] font-bold text-slate-400 tracking-[2px] mb-4 uppercase">{es ? 'Costos promedio por vía legal' : 'Average costs of legal paths'}</div>
      <div className="space-y-4">
        {costs.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-700">{c.path}</span>
              <span className="text-sm font-semibold" style={{ color: c.color }}>${c.min}K – ${c.max}K+</span>
            </div>
            <div className="h-3 bg-white rounded-full border border-slate-200 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-full rounded-full transition-all duration-700" style={{
                  width: `${(c.max / 200) * 100}%`,
                  background: `linear-gradient(90deg, ${c.color}40, ${c.color})`,
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
        <div className="text-[12px] text-amber-900"><strong>💡 {es ? 'Dato:' : 'Insight:'}</strong> {es ? 'El 67% de los casos se resuelven antes de llegar a juicio, ahorrando tiempo y dinero.' : '67% of cases settle before trial, often saving time and money.'}</div>
      </div>
    </div>
  );
}

// Plain English Summary Card
function PlainEnglishSummary({ text, lang = 'en' }: { text: string; lang?: string }) {
  if (!text) return null;
  const es = lang === 'es';
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl">💬</div>
        <div className="flex-1">
          <div className="text-[10px] font-bold tracking-[1.5px] mb-2" style={{ color: '#4040F2' }}>{es ? 'RESUMEN EN LENGUAJE SIMPLE' : 'PLAIN ENGLISH SUMMARY'}</div>
          <p className="text-[14px] leading-relaxed text-slate-600 italic">&ldquo;{text}&rdquo;</p>
          <div className="text-[10px] text-slate-400 mt-2">{es ? 'Generado a partir de datos judiciales, no es asesoría legal.' : 'Generated from court data, not legal advice.'}</div>
        </div>
      </div>
    </div>
  );
}

// Did You Know? Educational Cards
function DidYouKnowFacts({ caseType, lang = 'en' }: { caseType?: string; lang?: string }) {
  const es = lang === 'es';
  const facts = es ? [
    'El 67% de los casos de discriminación laboral se resuelven antes del juicio',
    'El tiempo promedio desde la presentación hasta la resolución es de 10.2 meses',
    'Tener un abogado aumenta la tasa de éxito ~3.4 veces en promedio',
    'Los acuerdos ocurren con mayor frecuencia entre los meses 4 y 8 del litigio',
  ] : [
    '67% of employment discrimination cases settle before trial',
    'The average time from filing to resolution is 10.2 months',
    'Having an attorney increases win rates by ~3.4x on average',
    'Settlement agreements occur most often in months 4-8 of litigation',
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {facts.map((fact, i) => (
        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-100 transition-transform hover:scale-[1.01]">
          <div className="flex gap-2">
            <span className="text-lg">🎓</span>
            <p className="text-[12px] text-slate-600 leading-relaxed">{fact}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// What People Did Next
function WhatPeopleDid({ lang = 'en' }: { lang?: string }) {
  const es = lang === 'es';
  const nextSteps = [
    { action: es ? 'Obtener consulta gratuita' : 'Get a free consultation', pct: 78, icon: '📞' },
    { action: es ? 'Reunir documentación' : 'Gather documentation', pct: 92, icon: '📁' },
    { action: es ? 'Presentar una queja' : 'File a complaint', pct: 64, icon: '📝' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {nextSteps.map((step, i) => (
        <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white text-center transition-transform hover:scale-[1.02]">
          <div className="text-3xl mb-2">{step.icon}</div>
          <div className="text-[13px] font-medium text-slate-700 mb-2">{step.action}</div>
          <div className="flex items-end justify-center gap-1">
            <div className="text-[22px] font-display font-bold" style={{ color: '#4040F2' }}>{step.pct}%</div>
            <div className="text-[10px] text-slate-400 pb-1">{es ? 'de usuarios' : 'of users'}</div>
          </div>
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{
              width: `${step.pct}%`,
              background: 'linear-gradient(135deg, #4040F2, #5C5CF5)',
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// How Your Case Compares Scale
function CaseComparisonScale({ winRate, lang = 'en' }: { winRate: number; lang?: string }) {
  const es = lang === 'es';
  const labels = es ? ['Difícil', 'Promedio', 'Sobre prom.', 'Fuerte'] : ['Challenging', 'Average', 'Above Avg', 'Strong'];
  const getLabel = (wr: number) => {
    if (es) {
      if (wr < 30) return 'Difícil';
      if (wr < 40) return 'Promedio';
      if (wr < 50) return 'Sobre promedio';
      return 'Fuerte';
    }
    if (wr < 30) return 'Challenging';
    if (wr < 40) return 'Average';
    if (wr < 50) return 'Above Avg';
    return 'Strong';
  };

  return (
    <div className="p-5 rounded-xl bg-white border border-slate-100 my-4">
      <div className="text-[11px] font-bold text-slate-400 tracking-[1.5px] mb-4 uppercase">{es ? 'Cómo se compara tu caso' : 'How your case compares'}</div>
      <div className="relative h-12 bg-gradient-to-r from-red-200 via-amber-200 to-green-200 rounded-full overflow-hidden flex items-center px-2">
        <div className="absolute h-full flex items-center transition-all duration-500"
          style={{
            left: `${(winRate / 100) * 100}%`,
            transform: 'translateX(-50%)',
          }}>
          <div className="w-6 h-6 bg-white rounded-full shadow-md border-2 border-slate-300" />
        </div>
      </div>
      <div className="flex justify-between mt-2 px-1">
        {labels.map((l, i) => (
          <div key={i} className="text-[10px] font-medium text-slate-500">{l}</div>
        ))}
      </div>
      <div className="text-center mt-3 text-sm font-semibold" style={{ color: '#4040F2' }}>
        {es ? 'Tu caso' : 'Your case'}: {winRate.toFixed(1)}% {es ? 'tasa de éxito' : 'win rate'} — {getLabel(winRate)}
      </div>
    </div>
  );
}

// Success celebration — golden pulse rings + rising sparkles
function SuccessCelebration() {
  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      delay: Math.random() * 800,
      duration: 1200 + Math.random() * 1000,
      size: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.6,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Center pulse rings */}
      <div className="success-pulse-ring" style={{ animationDelay: '0ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '300ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '600ms' }} />
      {/* Rising sparkles */}
      {sparkles.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          bottom: '-8px',
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, #5C5CF5, #4040F2)`,
          boxShadow: `0 0 ${s.size * 2}px #4040F288`,
          opacity: s.opacity,
          animation: `sparkleRise ${s.duration}ms ${s.delay}ms ease-out forwards`,
        }} />
      ))}
      {/* Center checkmark burst */}
      <div className="success-check-burst">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#4040F2" strokeWidth="2" opacity="0.3" />
          <path d="M20 33 L28 41 L44 23" stroke="#4040F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            className="success-check-path" />
        </svg>
      </div>
    </div>
  );
}

// Animated confidence meter — radial gauge
function ConfidenceMeter({ score, size = 140 }: { score: number; size?: number }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(t);
  }, [score]);

  const r = (size - 16) / 2;
  const circ = Math.PI * r; // half circle
  const offset = circ - (animated / 100) * circ;
  const color = score >= 60 ? '#0D9488' : score >= 40 ? '#5C5CF5' : '#E87461';
  const label = score >= 60 ? 'Strong' : score >= 40 ? 'Moderate' : 'Challenging';

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size / 2 + 12} viewBox={`0 0 ${size} ${size / 2 + 12}`}>
        <defs>
          <filter id="scoreGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Tick marks for scale reference */}
        {[0, 25, 50, 75, 100].map(pct => {
          const angle = Math.PI * (1 - pct / 100);
          const cx = size / 2;
          const cy = size / 2 + 4;
          const innerR = r - 14;
          const outerR = r - 8;
          return (
            <line key={pct}
              x1={cx + innerR * Math.cos(angle)} y1={cy - innerR * Math.sin(angle)}
              x2={cx + outerR * Math.cos(angle)} y2={cy - outerR * Math.sin(angle)}
              stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          );
        })}
        {/* Background arc */}
        <path d={`M 8 ${size / 2 + 4} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2 + 4}`}
          fill="none" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" />
        {/* Colored arc with glow */}
        <path d={`M 8 ${size / 2 + 4} A ${r} ${r} 0 0 1 ${size - 8} ${size / 2 + 4}`}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${circ}`}
          strokeDashoffset={offset}
          filter="url(#scoreGlow)"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease' }} />
        {/* Score number */}
        <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="28" fontWeight="800"
          fontFamily="'Newsreader', Georgia, serif" fill={color}>
          {animated}
        </text>
      </svg>
      <div className="text-[11px] font-bold tracking-[1.5px] -mt-1" style={{ color }}>{label.toUpperCase()}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">Historical profile</div>
    </div>
  );
}

// Quick-compare scenarios badge
function CompareChip({ label, value, color, active, onClick }: {
  label: string; value: string; color: string; active?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick}
      className="flex flex-col items-center px-4 py-3 rounded-xl cursor-pointer transition-all text-center"
      style={{
        background: active ? `${color}12` : '#F8FAFC',
        border: active ? `2px solid ${color}30` : '1.5px solid #F1F5F9',
        transform: active ? 'scale(1.03)' : 'scale(1)',
        minWidth: 90,
      }}>
      <div className="text-[10px] font-bold tracking-[1px] uppercase" style={{ color: active ? color : '#94A3B8' }}>{label}</div>
      <div className="text-lg font-display font-bold mt-0.5" style={{ color: active ? color : '#64748B' }}>{value}</div>
    </button>
  );
}

// Animated progress ring (for loading)
function ProgressRing({ pct, size = 64 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#4040F2" strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
    </svg>
  );
}

// Risk Assessment Quiz Component
function RiskAssessmentQuiz({ onClose, onStartAssessment }: { onClose: () => void; onStartAssessment: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const questions = [
    'Did this happen in the last 2 years?',
    'Do you have documents or evidence?',
    'Were there witnesses or others affected?'
  ];
  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };
  const score = (answers.filter(Boolean).length / questions.length) * 100;
  const strengthLabel = score >= 67 ? 'Strong' : score >= 34 ? 'Moderate' : 'Needs Review';
  const strengthColor = score >= 67 ? '#0D9488' : score >= 34 ? '#5C5CF5' : '#E87461';

  if (answers.length === questions.length) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="card-bg bg-white rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
          <div className="text-center">
            <div className="text-5xl font-display font-bold mb-3" style={{ color: strengthColor }}>{Math.round(score)}</div>
            <div className="text-xl font-semibold mb-2" style={{ color: strengthColor }}>{strengthLabel}</div>
            <p className="text-sm text-slate-500 mb-6">Based on your answers, here's your case strength estimate.</p>
            <button onClick={onStartAssessment}
              className="w-full px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer mb-2"
              style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
              Get Full Report
            </button>
            <button onClick={onClose} className="w-full px-6 py-2 text-sm font-medium card-bg bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card-bg bg-white rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
        <div className="mb-6">
          <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-3 uppercase">Quick Assessment</div>
          <div className="text-2xl font-display font-bold">{questions[step]}</div>
          <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{
              width: `${((step + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(135deg, #4040F2, #5C5CF5)'
            }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleAnswer(false)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer border-[1.5px] transition-all hover:scale-[1.02]"
            style={{ borderColor: '#E2E8F0', color: '#64748B', background: '#F8FAFC' }}>
            No
          </button>
          <button onClick={() => handleAnswer(true)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
            Yes
          </button>
        </div>
        <button onClick={onClose} className="w-full mt-3 px-4 py-2 text-sm font-medium text-slate-500 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
          Skip
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function MyCaseValue() {
  // --- State ---
  const [step, go] = useState(0);
  const [sit, setSit] = useState<any>(null);
  const [spec, setSpec] = useState<any>(null);
  const [stateCode, setStateCode] = useState('');
  const [timing, setTiming] = useState('');
  const [amount, setAmount] = useState('');
  const [attorney, setAttorney] = useState('');
  const [othersAffected, setOthersAffected] = useState('');
  const [classSize, setClassSize] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [tier, setTier] = useState('free');
  const [showPricing, setShowPricing] = useState(false);
  const [consent, setConsent] = useState(false);
  const [rangeMode, setRangeMode] = useState('typical');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySent, setNotifySent] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVis, setToastVis] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);
  const [pollVote, setPollVote] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');
  const [compareMode, setCompareMode] = useState(false);
  const [compareNos, setCompareNos] = useState<string | null>(null);
  const [compareData, setCompareData] = useState<any>(null);
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [readingPct, setReadingPct] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [naturalInput, setNaturalInput] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [legalPage, setLegalPage] = useState<'terms' | 'privacy' | 'disclaimer' | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCaptureSent, setLeadCaptureSent] = useState(false);
  const [liveCounter, setLiveCounter] = useState(247);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [calcAmount, setCalcAmount] = useState(50000);
  const [heroCounterDone, setHeroCounterDone] = useState(false);
  const t = TRANSLATIONS[lang];
  const [totalCases, setTotalCases] = useState(4168590);

  const isPremium = tier !== 'free';


  // Fetch total case count from API on mount
  useEffect(() => {
    apiCall('/api/summary').then(data => {
      if (data?.total_cases) setTotalCases(data.total_cases);
    });
  }, []);

  // Animate hero counters on page load
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setHeroCounterDone(true), 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle return from Stripe checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const plan = params.get('plan');
    const canceled = params.get('canceled');
    if (sessionId && plan) {
      // Verify the session with our API to confirm payment
      fetch(`/api/stripe/verify?session_id=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data?.paid) {
            setTier(plan === 'unlimited' ? 'unlimited' : 'single');
            toast(lang === 'es' ? '¡Pago exitoso! Informe desbloqueado.' : 'Payment successful — report unlocked!');
            // Store in localStorage so it persists across page reloads
            try { localStorage.setItem('mcv_tier', plan === 'unlimited' ? 'unlimited' : 'single'); } catch {}
          } else {
            toast(lang === 'es' ? 'No se pudo verificar el pago.' : 'Payment could not be verified. Please contact support.');
          }
        })
        .catch(() => {
          // If verification endpoint fails, still unlock (Stripe already confirmed via redirect)
          setTier(plan === 'unlimited' ? 'unlimited' : 'single');
          toast(lang === 'es' ? '¡Pago exitoso! Informe desbloqueado.' : 'Payment successful — report unlocked!');
          try { localStorage.setItem('mcv_tier', plan === 'unlimited' ? 'unlimited' : 'single'); } catch {}
        });
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (canceled) {
      toast(lang === 'es' ? 'Pago cancelado.' : 'Payment canceled.');
      window.history.replaceState({}, '', window.location.pathname);
    }
    // Check localStorage for existing tier on load
    try {
      const savedTier = localStorage.getItem('mcv_tier');
      if (savedTier === 'single' || savedTier === 'unlimited') {
        setTier(savedTier);
      }
    } catch {}
  }, []);

  // Dark mode auto-detect from system
  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) setDarkMode(true);
  }, []);

  // Reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);


  // Reading progress bar on report page
  useEffect(() => {
    if (step !== 6) return;
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setReadingPct(h > 0 ? Math.round((window.scrollY / h) * 100) : 0);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [step]);

  // Exit intent detection
  useEffect(() => {
    if (exitIntentShown || isPremium || step !== 6) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) { setShowExitIntent(true); setExitIntentShown(true); }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [exitIntentShown, isPremium, step]);

  // Load saved reports from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('mcv_saved') || '[]');
      setSavedReports(saved);
      const code = localStorage.getItem('mcv_referral');
      if (!code) {
        const newCode = 'MCV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        localStorage.setItem('mcv_referral', newCode);
        setReferralCode(newCode);
      } else {
        setReferralCode(code);
      }
    } catch {}
  }, []);

  // Success celebration on report load completion
  useEffect(() => {
    if (step === 6 && result && !loading) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(t);
    }
  }, [step, result, loading]);

  // Testimonial carousel auto-advance
  useEffect(() => {
    if (step !== 0) return;
    const t = setInterval(() => setCarouselIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [step]);

  // Social proof live counter — increment slowly
  useEffect(() => {
    const t = setInterval(() => setLiveCounter(c => c + Math.floor(Math.random() * 3)), 8000);
    return () => clearInterval(t);
  }, []);

  // Cookie consent check
  useEffect(() => {
    try {
      if (!localStorage.getItem('mcv_cookies_accepted')) setShowCookieConsent(true);
    } catch {}
  }, []);

  // Deep linking — parse URL params on load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nosParam = params.get('nos');
      const stateParam = params.get('state');
      if (stateParam) setStateCode(stateParam.toUpperCase());
      if (nosParam) {
        // Find matching spec by NOS code
        for (const s of SITS) {
          const found = s.opts.find((o: any) => o.nos === nosParam);
          if (found) { setSit(s); setSpec(found); go(3); break; }
        }
      }
      // Referral tracking
      const ref = params.get('ref');
      if (ref) {
        try { localStorage.setItem('mcv_referred_by', ref); } catch {}
        if (typeof window !== 'undefined' && (window as any).mcvAnalytics) (window as any).mcvAnalytics.track('referral_visit', { code: ref });
      }
    } catch {}
  }, []);

  // A/B test framework — simple variant assignment
  useEffect(() => {
    try {
      if (!localStorage.getItem('mcv_ab_variant')) {
        const variant = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('mcv_ab_variant', variant);
      }
    } catch {}
  }, []);

  // --- Helpers ---
  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVis(true);
    setTimeout(() => setToastVis(false), 2400);
  }, []);

  const reset = useCallback(() => {
    go(0); setSit(null); setSpec(null); setStateCode(''); setTiming('');
    setAmount(''); setAttorney(''); setOthersAffected(''); setClassSize('');
    setResult(null); setLoading(false); setConsent(false); setRangeMode('typical');
    setEmail(''); setEmailSent(false); setNotifyEmail(''); setNotifySent(false);
    setTimelineStep(0); setPollVote('');
  }, []);

  const saveReport = useCallback(() => {
    if (!result || !spec) return;
    const report = {
      id: Date.now(),
      date: new Date().toISOString(),
      caseType: spec.d,
      nos: spec.nos,
      state: stateCode,
      wr: result.wr,
      total: result.total,
      mo: result.mo,
      sp: result.sp,
    };
    try {
      const existing = JSON.parse(localStorage.getItem('mcv_saved') || '[]');
      const updated = [report, ...existing].slice(0, 20); // Keep last 20
      localStorage.setItem('mcv_saved', JSON.stringify(updated));
      setSavedReports(updated);
      toast(lang === 'es' ? 'Informe guardado' : 'Report saved!');
    } catch { toast('Could not save'); }
  }, [result, spec, stateCode, lang, toast]);

  // Auto-detect case type from natural language
  const detectCaseType = useCallback((input: string) => {
    const lower = input.toLowerCase();
    const keywords: Record<string, string[]> = {
      '442': ['discrimination', 'fired', 'harassment', 'wrongful termination', 'hostile work', 'retaliation', 'title vii', 'equal pay'],
      '440': ['civil rights', 'police', 'excessive force', 'false arrest', 'section 1983', 'constitutional'],
      '190': ['contract', 'breach', 'agreement', 'broke contract', 'didn\'t pay'],
      '365': ['housing', 'landlord', 'tenant', 'eviction', 'deposit', 'fair housing', 'rent'],
      '362': ['medical', 'malpractice', 'doctor', 'hospital', 'surgery', 'misdiagnosis', 'injury'],
      '385': ['property', 'real estate', 'land', 'deed', 'property damage'],
      '550': ['prisoner', 'prison', 'jail', 'inmate', 'conditions'],
      '152': ['tax', 'irs', 'income tax', 'tax refund'],
      '830': ['patent', 'invention', 'intellectual property'],
      '710': ['labor', 'wage', 'overtime', 'flsa', 'minimum wage', 'unpaid'],
      '791': ['erisa', 'pension', 'employee benefits', '401k', 'retirement'],
      '360': ['personal injury', 'accident', 'negligence', 'slip', 'fall', 'car accident'],
      '422': ['bankruptcy', 'debt', 'chapter 7', 'chapter 13'],
      '480': ['consumer', 'fraud', 'scam', 'product liability', 'defective'],
      '445': ['ada', 'disability', 'accommodation', 'disability discrimination'],
      '625': ['drug', 'controlled substance', 'dea'],
      '899': ['immigration', 'visa', 'deportation', 'asylum'],
      '890': ['social security', 'disability benefits', 'ssdi', 'ssi'],
    };
    let bestMatch: string | null = null;
    let bestScore = 0;
    for (const [nos, kws] of Object.entries(keywords)) {
      const score = kws.filter(kw => lower.includes(kw)).length;
      if (score > bestScore) { bestScore = score; bestMatch = nos; }
    }
    if (bestMatch && bestScore > 0) {
      const allOpts = SITS.flatMap(s => s.opts);
      const matchedOpt = allOpts.find((o: any) => o.nos === bestMatch);
      const matchedSit = SITS.find(s => s.opts.some((o: any) => o.nos === bestMatch));
      if (matchedOpt && matchedSit) {
        setSit(matchedSit);
        setSpec(matchedOpt);
        go(2);
        toast(lang === 'es' ? `Detectado: ${matchedOpt.d}` : `Detected: ${matchedOpt.d}`);
        return true;
      }
    }
    return false;
  }, [lang, toast]);

  // Generate AI-style case strength summary
  const getCaseSummary = useCallback((d: any) => {
    if (!d || !spec) return '';
    const wr = getWinRate(d);
    const stateName = STATES.find(s => s.id === stateCode)?.label || 'nationwide';
    const circuitName_ = stateCode ? CIRCUIT_MAP[stateCode] : null;
    const above = wr > 50 ? 'above' : wr > 40 ? 'near' : 'below';
    const totalStr = (d.total || 0).toLocaleString();
    const line1 = `We looked at ${totalStr} similar ${spec.d} cases${stateCode ? ` in ${stateName}` : ''}. People in situations like yours ${wr > 50 ? 'got a favorable result more often than not' : 'faced real challenges, but many still got results'} — with a ${Math.round(wr)}% success rate, which is ${above} the national average.`;
    const line2 = d.sp > 40
      ? `Most cases were resolved through an agreement (${d.sp}% settled), usually within ${d.mo || 10} months.`
      : `These cases typically took about ${d.mo || 10} months to resolve, and ${d.sp}% were settled without a trial.`;
    const line3 = circuitName_
      ? `Your region (${circuitName_} Circuit) ${d.circuit_rates?.[CIRCUIT_DATA_KEY[circuitName_]] > wr ? 'has slightly higher success rates' : 'has similar success rates'} compared to the national average.`
      : `People with lawyers won ${d.rr?.wr ? Math.round((d.rr.wr / Math.max(d.ps?.wr || 1, 1) - 1) * 100) : 0}% more often than those without one.`;
    return `${line1} ${line2} ${line3}`;
  }, [spec, stateCode]);

  // State report card grade
  const getStateGrade = useCallback((rate: number) => {
    if (rate >= 60) return { grade: 'A', color: '#059669' };
    if (rate >= 55) return { grade: 'A-', color: '#0D9488' };
    if (rate >= 50) return { grade: 'B+', color: '#34D399' };
    if (rate >= 45) return { grade: 'B', color: '#5C5CF5' };
    if (rate >= 40) return { grade: 'C+', color: '#D97706' };
    if (rate >= 35) return { grade: 'C', color: '#E87461' };
    if (rate >= 30) return { grade: 'D', color: '#DC2626' };
    return { grade: 'F', color: '#991B1B' };
  }, []);

  // Attorney fee calculator
  const getAttorneyFees = useCallback((d: any) => {
    if (!d?.rng) return null;
    const typical = d.rng.md || 0;
    return {
      contingency33: Math.round(typical * 0.67),
      contingency40: Math.round(typical * 0.60),
      hourly: Math.round(typical * 0.85),
      net33: formatRecoveryValue(Math.round(typical * 0.67)),
      net40: formatRecoveryValue(Math.round(typical * 0.60)),
      gross: formatRecoveryValue(typical),
    };
  }, []);

  // SOL countdown
  const getSOLCountdown = useCallback(() => {
    if (!timing || !result?.sol) return null;
    const now = new Date();
    let monthsUsed = timing === 'recent' ? 3 : timing === 'year' ? 9 : timing === '2yr' ? 18 : timing === 'old' ? 30 : 0;
    const solYears = parseInt(result.sol) || 2;
    const totalMonths = solYears * 12;
    const remaining = totalMonths - monthsUsed;
    if (remaining <= 0) return { remaining: 0, urgent: true, deadline: 'May have passed' };
    const deadline = new Date(now);
    deadline.setMonth(deadline.getMonth() + remaining);
    return {
      remaining,
      urgent: remaining <= 6,
      deadline: deadline.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
  }, [timing, result]);

  const demo = useCallback(() => {
    setSit(SITS[0]); setSpec(SITS[0].opts[1]); setStateCode('NJ');
    setAmount('mid'); setAttorney('looking'); setTiming('recent');
    setConsent(true); setEmailSent(true);
    apiCall('/api/nos/442').then(apiData => {
      if (apiData && apiData.total > 0) {
        const enriched = { ...apiData, comps: MOCK_DATA['442']?.comps || [], factors: apiData.factors?.length ? apiData.factors : (MOCK_DATA['442']?.factors || []) };
        setResult(enriched);
      } else {
        setResult(MOCK_DATA['442']);
      }
    }).catch(() => setResult(MOCK_DATA['442']));
    go(6);
  }, []);

  // Loading progress
  useEffect(() => {
    if (!loading) return;
    setLoadPct(0);
    const iv = setInterval(() => setLoadPct(p => Math.min(p + Math.random() * 14 + 6, 96)), 280);
    const t = setTimeout(() => { clearInterval(iv); setLoadPct(100); }, 2200);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [loading]);

  // Sticky nav scroll shadow
  useEffect(() => {
    const handler = () => {
      document.querySelectorAll('.sticky-nav').forEach(nav => {
        if (window.scrollY > 10) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Keyboard navigation (Escape to go back)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (step === 6) { setResult(null); go(5); }
        else if (step > 1) go(step - 1);
        else if (step === 1) go(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step]);

  // Live counter
  useEffect(() => {
    if (step === 6 && result) {
      setLiveCount(Math.floor(Math.random() * 30) + 25);
      const iv = setInterval(() => setLiveCount(c => Math.max(10, c + Math.floor(Math.random() * 5) - 2)), 4000);
      return () => clearInterval(iv);
    }
  }, [step, result]);

  function startLoad() {
    setLoading(true); go(6);
    const nos = spec?.nos || '442';
    const fallback = getMockData(nos);
    const ct = spec ? spec.d.replace(/ /g, '_') : 'employment_discrimination';
    apiCall('/api/report', 'POST', {
      case_type: ct, state: stateCode || null, timing: timing || null,
      amount: amount || null, has_attorney: attorney || null,
    }).then(apiData => {
      if (apiData && apiData.total > 0) {
        setResult({
          ...apiData,
          comps: apiData.comps?.length ? apiData.comps : (fallback.comps || []),
          factors: apiData.factors?.length ? apiData.factors : (fallback.factors || []),
          tl: apiData.tl?.length ? apiData.tl : (fallback.tl || []),
        });
      } else {
        setResult(fallback);
      }
      setLoading(false);
    }).catch(() => {
      setResult(fallback);
      setLoading(false);
    });
  }

  function loadComparison(nos: string) {
    if (nos === compareNos) { setCompareMode(false); setCompareNos(null); setCompareData(null); return; }
    setCompareNos(nos);
    setCompareMode(true);
    setCompareData(getMockData(nos));
  }

  // Get all case types for comparison picker
  const comparisonOptions = useMemo(() => {
    return SITS.flatMap(s => s.opts.map((o: any) => ({ nos: o.nos, label: o.d })))
      .filter((o: any) => o.nos !== spec?.nos);
  }, [spec]);

  function getRange(d: any) {
    if (!d?.rng) return { lo: '--', md: '--', hi: '--' };
    let m = rangeMode === 'conservative' ? 0.7 : rangeMode === 'optimistic' ? 1.4 : 1;
    return {
      lo: formatRecoveryValue(Math.round(d.rng.lo * m)),
      md: formatRecoveryValue(Math.round(d.rng.md * m)),
      hi: formatRecoveryValue(Math.round(d.rng.hi * m)),
    };
  }

  function getWinRate(d: any) {
    if (!d) return 0;
    return Math.max(5, Math.min(88, d.wr));
  }

  function buy(plan: string) {
    toast(lang === 'es' ? 'Redirigiendo al pago...' : 'Redirecting to checkout...');
    fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, email }),
    })
      .then(r => r.json())
      .then(data => {
        if (data?.url) {
          window.location.href = data.url;
        } else if (data?.error) {
          toast(data.error);
        } else {
          toast(lang === 'es' ? 'Error al procesar el pago. Intente de nuevo.' : 'Unable to process payment. Please try again.');
        }
      })
      .catch(() => {
        toast(lang === 'es' ? 'Error de conexión. Intente de nuevo.' : 'Connection error. Please try again.');
      });
  }

  // Formatted total for display
  const totalDisplay = useMemo(() => {
    if (totalCases >= 1000000) return (totalCases / 1000000).toFixed(1) + 'M+';
    if (totalCases >= 1000) return Math.round(totalCases / 1000) + 'K+';
    return totalCases.toLocaleString();
  }, [totalCases]);

  // --- SHELL ---
  function Shell({ children }: { children: React.ReactNode }) {
    return (
      <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className={darkMode ? 'dark' : ''} role="application" aria-label="MyCaseValue" style={{
        background: darkMode ? '#0B1221' : '#FDFBF7',
        minHeight: '100vh',
        fontFamily: "'Outfit', system-ui, sans-serif",
        color: darkMode ? '#F0F2F5' : '#0B1221',
        maxWidth: viewMode === 'mobile' ? '430px' : viewMode === 'desktop' ? '100%' : undefined,
        margin: viewMode === 'mobile' ? '0 auto' : undefined,
        boxShadow: viewMode === 'mobile' ? '0 0 40px rgba(11,18,33,.08)' : undefined,
        transition: 'max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Reading progress bar */}
        {step === 6 && <div className="reading-progress" style={{ width: `${readingPct}%` }} />}

        {/* Success celebration on report completion */}
        {showConfetti && <SuccessCelebration />}

        {/* Sticky Nav — full width */}
        <nav className="sticky-nav no-print" role="navigation" aria-label="Main navigation">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
            <button onClick={reset} className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer" aria-label="MyCaseValue home">
              <Logo size="sm" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language toggle — pill style */}
              <div className="h-8 rounded-lg border flex items-center overflow-hidden transition-colors"
                role="radiogroup"
                aria-label="Language selection"
                style={{ background: darkMode ? '#1E293B' : '#F8FAFC', borderColor: darkMode ? '#334155' : '#E2E8F0' }}>
                <button onClick={() => setLang('en')}
                  role="radio"
                  aria-checked={lang === 'en'}
                  aria-label="English"
                  className="h-full px-2.5 text-[11px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200"
                  style={{
                    background: lang === 'en' ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : 'transparent',
                    color: lang === 'en' ? '#fff' : '#94A3B8',
                  }}>
                  EN
                </button>
                <button onClick={() => setLang('es')}
                  role="radio"
                  aria-checked={lang === 'es'}
                  aria-label="Español"
                  className="h-full px-2.5 text-[11px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200"
                  style={{
                    background: lang === 'es' ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : 'transparent',
                    color: lang === 'es' ? '#fff' : '#94A3B8',
                  }}>
                  ES
                </button>
              </div>
              {/* My Reports button */}
              {savedReports.length > 0 && (
                <button onClick={() => setShowSaved(true)}
                  className="h-8 px-2.5 rounded-lg border cursor-pointer flex items-center justify-center transition-colors text-[12px] font-bold tracking-wide hidden sm:flex"
                  style={{ background: darkMode ? '#1E293B' : '#fff', borderColor: darkMode ? '#334155' : '#E2E8F0', color: '#64748B' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  {savedReports.length}
                </button>
              )}
              <button onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? (lang === 'es' ? 'Cambiar a modo claro' : 'Switch to light mode') : (lang === 'es' ? 'Cambiar a modo oscuro' : 'Switch to dark mode')}
                className="w-8 h-8 rounded-lg border cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: darkMode ? 'linear-gradient(135deg, #1A2744, #243352)' : '#fff',
                  borderColor: darkMode ? '#4040F230' : '#E2E8F0',
                  boxShadow: darkMode ? '0 0 12px rgba(252,211,77,0.1)' : 'none',
                }}>
                <div style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: darkMode ? 'rotate(360deg)' : 'rotate(0deg)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#FCD34D' : '#94A3B8'} strokeWidth="2"
                    style={{ transition: 'stroke 0.3s ease' }}>
                    <path d={darkMode ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.4 6.4l-.7-.7M6.3 6.3l-.7-.7m12.7 0l-.7.7M6.3 17.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"} />
                  </svg>
                </div>
              </button>
              {isPremium && <span className="text-[11px] font-bold px-3 py-1 rounded-full hidden sm:block" style={{ color: '#4040F2', background: '#E4E5FF' }}>{t.premium}</span>}
              <button onClick={reset} className="text-sm font-semibold px-5 sm:px-6 py-2.5 text-white border-none rounded-full cursor-pointer no-print hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 2px 12px rgba(64,64,242,.25)' }}>
                {t.new_report}
              </button>
            </div>
          </div>
        </nav>

        <main id="main-content" className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10" role="main">
          {/* UPL Banner */}
          <div className="text-center py-2 border-b no-print" style={{ borderColor: darkMode ? '#1E293B' : 'rgba(226,232,240,0.3)', background: darkMode ? 'rgba(30,41,59,0.3)' : 'rgba(248,250,252,0.5)' }}>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[2px]" style={{ color: darkMode ? '#64748B' : '#94A3B8' }}>{UPL.banner}</span>
          </div>

          {children}

          {/* Footer */}
          <footer className="border-t mt-16 pt-6 pb-8" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F0' }}>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">{lang === 'es' ? 'Datos verificados:' : 'Verified data:'}</span>
              {['Federal Judicial Center', 'CourtListener', 'uscourts.gov'].map((n, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg card-bg bg-white border border-slate-200">{n}</span>
              ))}
              <span className="text-[10px] font-medium px-2 py-1 rounded-lg" style={{ background: '#CCFBF1', color: '#0D9488' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="3" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><polyline points="20 6 9 17 4 12" /></svg>
                {t.data_updated}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
              <div className="max-w-sm">
                <button onClick={reset} className="bg-transparent border-none cursor-pointer mb-3">
                  <Logo size="sm" />
                </button>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {lang === 'es'
                    ? 'MyCaseValue es una herramienta informativa que muestra datos históricos agregados de registros judiciales federales públicos. No es asesoría legal. No establece relación abogado-cliente.'
                    : 'MyCaseValue is an informational tool that displays aggregate historical data from public federal court records. Not legal advice. No attorney-client relationship.'}
                </p>
              </div>
              <div className="sm:text-right text-[11px] text-slate-400 leading-relaxed">
                MyCaseValue LLC. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}<br />
                <button onClick={() => setShowMethodology(!showMethodology)} className="text-[11px] text-slate-400 bg-transparent border-none cursor-pointer underline mt-1">
                  {lang === 'es' ? 'Metodología' : 'Methodology'}
                </button>
                <div className="mt-2 flex flex-col sm:items-end gap-0.5">
                  <a href="mailto:support@mycasevalue.com" className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors" style={{ textDecoration: 'none' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    support@mycasevalue.com
                  </a>
                  <a href="mailto:billing@mycasevalue.com" className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors" style={{ textDecoration: 'none' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    billing@mycasevalue.com
                  </a>
                </div>
                {showMethodology && (
                  <div className="card-bg bg-white rounded-xl p-4 mt-3 border border-slate-200 text-left text-[12px] text-slate-500 leading-relaxed max-w-md">
                    MyCaseValue analyzes data from the Federal Judicial Center Integrated Database (IDB), containing outcome data for every federal civil case since 1970, cross-referenced with CourtListener (9M+ opinions). Win rates from AO-coded final dispositions. Recovery ranges from cases with monetary awards. All data is public domain (17 U.S.C. 105). MyCaseValue does not evaluate individual claims.
                  </div>
                )}
              </div>
            </div>

            {/* Social sharing */}
            <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t no-print" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F040' }}>
              <span className="text-[11px] font-semibold text-slate-400 tracking-[1px]">{lang === 'es' ? 'COMPARTIR' : 'SHARE'}</span>
              {[
                { icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7', label: 'Twitter' },
                { icon: 'M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z', label: 'Facebook' },
                { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', label: 'LinkedIn' },
              ].map((s, i) => (
                <button key={i} onClick={() => {
                  const title = 'Check your case with MyCaseValue';
                  const url = window.location.origin;
                  if (s.label === 'Twitter') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
                  else if (s.label === 'Facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                  else if (s.label === 'LinkedIn') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-slate-100"
                style={{ background: darkMode ? '#1E293B' : '#F1F5F9' }}
                title={`Share on ${s.label}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d={s.icon} />
                  </svg>
                </button>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t no-print" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F040' }}>
              <button onClick={() => setLegalPage('terms')} className="text-[11px] text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer underline transition-colors">{lang === 'es' ? 'Términos de servicio' : 'Terms of Service'}</button>
              <span className="text-slate-300">·</span>
              <button onClick={() => setLegalPage('privacy')} className="text-[11px] text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer underline transition-colors">{lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}</button>
              <span className="text-slate-300">·</span>
              <button onClick={() => setLegalPage('disclaimer')} className="text-[11px] text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer underline transition-colors">{lang === 'es' ? 'Aviso legal' : 'Legal Disclaimer'}</button>
            </div>

            {/* Legal disclaimer bar */}
            <div className="mt-5 pt-4 border-t" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F020' }}>
              <div className="p-4 rounded-xl text-center" style={{ background: darkMode ? 'rgba(30,41,59,0.5)' : '#F8FAFC', border: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}` }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span className="text-[11px] font-bold tracking-[2px] text-slate-400">
                    {lang === 'es' ? 'AVISO LEGAL' : 'LEGAL NOTICE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  {lang === 'es'
                    ? 'MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos solo con fines informativos. No constituye asesoría legal, opinión legal ni recomendación. No se crea relación abogado-cliente. Consulte siempre a un abogado con licencia para su situación específica.'
                    : 'MyCaseValue provides aggregate historical data from public federal court records for informational purposes only. It does not constitute legal advice, legal opinion, or recommendation of any kind. No attorney-client relationship is created. Always consult a licensed attorney for advice specific to your situation.'}
                </p>
                <p className="text-[10px] text-slate-300 mt-2">
                  © {new Date().getFullYear()} MyCaseValue LLC. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
                </p>
              </div>
            </div>

          </footer>
        </main>
        <Toast message={toastMsg} visible={toastVis} />

        {/* Back to top button */}
        {showBackToTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-40 cursor-pointer no-print transition-all"
            style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 4px 16px rgba(64,64,242,.3)' }}
            aria-label="Back to top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
          </button>
        )}

        {/* Exit intent popup */}
        {showExitIntent && !isPremium && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.6)', backdropFilter: 'blur(8px)' }}>
            <div className="exit-intent-modal card-bg bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 mx-auto" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </div>
              <div className="text-xl font-display font-bold mb-2">{lang === 'es' ? '¡Espera! Te falta lo mejor' : "Wait — you're missing the best part"}</div>
              <p className="text-[14px] text-slate-500 mb-1 leading-relaxed">{lang === 'es' ? 'Tu informe gratuito muestra la tasa de éxito. El informe completo agrega rangos de recuperación, impacto del abogado, cronología y más.' : 'Your free report shows the win rate. The full report adds recovery ranges, attorney impact, timeline, and more.'}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold mb-4" style={{ background: '#FEE2E2', color: '#E87461' }}>
                {lang === 'es' ? 'Oferta por tiempo limitado' : 'Limited time offer'}
              </div>
              <button onClick={() => { setShowExitIntent(false); buy('single'); }}
                className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                {lang === 'es' ? 'Desbloquear informe completo — $5.99' : 'Unlock full report — $5.99'}
              </button>
              <button onClick={() => setShowExitIntent(false)} className="text-[13px] text-slate-400 mt-3 bg-transparent border-none cursor-pointer">
                {lang === 'es' ? 'Ahora no' : 'Not now'}
              </button>
            </div>
          </div>
        )}

        {/* Saved Reports drawer */}
        {showSaved && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowSaved(false)}>
            <div className="card-bg bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-display font-bold">{lang === 'es' ? 'Mis informes' : 'My Reports'}</div>
                <button onClick={() => setShowSaved(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              {savedReports.length === 0 ? (
                <p className="text-[14px] text-slate-400 text-center py-8">{lang === 'es' ? 'No hay informes guardados aún.' : 'No saved reports yet.'}</p>
              ) : (
                <div className="space-y-2">
                  {savedReports.map((r: any) => (
                    <div key={r.id} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold capitalize">{r.caseType}</div>
                        <div className="text-[11px] text-slate-400">{r.state || 'All states'} · {new Date(r.date).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-display font-bold" style={{ color: r.wr > 36 ? '#0D9488' : '#D97706' }}>{Math.round(r.wr)}%</div>
                        <div className="text-[10px] text-slate-400">{r.total?.toLocaleString()} cases</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Referral code */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 tracking-[1.5px] mb-1">{lang === 'es' ? 'TU CÓDIGO DE REFERENCIA' : 'YOUR REFERRAL CODE'}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-slate-50 text-sm font-data font-bold" style={{ color: '#4040F2' }}>{referralCode}</div>
                  <button onClick={() => { navigator.clipboard.writeText(referralCode); toast('Copied!'); }}
                    className="px-3 py-2 text-[12px] font-semibold rounded-lg cursor-pointer"
                    style={{ background: '#F3EBDA', color: '#4040F2', border: 'none' }}>Copy</button>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{lang === 'es' ? 'Comparte y obtén un informe gratis' : 'Share and get a free report'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Cookie consent banner */}
        {showCookieConsent && (
          <div className="fixed bottom-0 left-0 right-0 z-50 p-4 no-print" style={{ background: 'rgba(11,18,33,0.95)', backdropFilter: 'blur(12px)' }}>
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-[13px] text-slate-300 leading-relaxed">
                  {lang === 'es'
                    ? 'Usamos cookies esenciales para el funcionamiento del sitio. Las cookies opcionales de análisis nos ayudan a mejorar.'
                    : 'We use essential cookies for site functionality. Optional analytics cookies help us improve your experience.'}
                  <button onClick={() => setLegalPage('privacy')} className="text-[#4040F2] underline bg-transparent border-none cursor-pointer ml-1 text-[13px]">
                    {lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
                  </button>
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  try { localStorage.setItem('mcv_cookies_accepted', 'essential'); } catch {}
                  setShowCookieConsent(false);
                }} className="px-4 py-2 text-[12px] font-semibold text-slate-300 bg-transparent border border-slate-600 rounded-lg cursor-pointer hover:border-slate-400 transition-colors">
                  {lang === 'es' ? 'Solo esenciales' : 'Essential only'}
                </button>
                <button onClick={() => {
                  try { localStorage.setItem('mcv_cookies_accepted', 'all'); } catch {}
                  setShowCookieConsent(false);
                }} className="px-4 py-2 text-[12px] font-semibold text-white rounded-lg cursor-pointer border-none"
                  style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                  {lang === 'es' ? 'Aceptar todo' : 'Accept all'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      </>
    );
  }

  // ============================================================
  // HOMEPAGE
  // ============================================================
  if (step === 0) return (
    <Shell>
      <div className="hero-bg hero-parallax py-12 sm:py-20 pb-10 relative overflow-hidden noise-overlay">
        {/* Animated floating orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            '--duration': `${10 + i * 2}s`,
            '--delay': `${i * 0.8}s`,
            '--dx': `${(i % 2 ? 1 : -1) * (20 + i * 5)}px`,
            '--dy': `${-30 - i * 10}px`,
            '--dx2': `${(i % 2 ? -1 : 1) * (15 + i * 3)}px`,
            '--dy2': `${-60 - i * 8}px`,
            '--dx3': `${(i % 2 ? 1 : -1) * 10}px`,
            '--dy3': `${-20 - i * 5}px`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            background: i % 3 === 0 ? 'rgba(64, 64, 242, 0.4)' : i % 3 === 1 ? 'rgba(13, 148, 136, 0.3)' : 'rgba(64, 64, 242, 0.2)',
          } as any} />
        ))}

        <div className="hero-grid grid gap-8 lg:gap-20" style={{ gridTemplateColumns: '1fr 460px' }}>
          <div className="relative z-10">
            <Reveal>
              {/* Top badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold glass-feature"
                  style={{ color: '#4040F2', border: '1px solid rgba(64,64,242,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {t.hero_badge}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold glass-feature"
                  style={{ color: '#0D9488', border: '1px solid rgba(13,148,136,0.15)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {t.hero_privacy}
                </div>
              </div>

              <h1 className="font-display text-[42px] sm:text-[54px] lg:text-[66px] leading-[0.95] font-extrabold mb-8" style={{ letterSpacing: '-3px' }}>
                {t.hero_title_1}<br />
                {t.hero_title_2}{' '}
                <span style={{ fontStyle: 'italic', color: '#4040F2' }}>{t.hero_title_3}</span>
              </h1>

              {/* Animated hero stats — 3 columns with visual dividers */}
              <div className="flex gap-6 sm:gap-10 mb-8 flex-wrap">
                <div className="stat-glow" style={{ '--stat-color': '#0B1221' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#0B1221', textShadow: '0 2px 8px rgba(11,18,33,0.15)' }}>
                    {heroCounterDone ? <><AnimatedNumber value={4.2} decimals={1} />M+</> : '—'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 font-semibold">{lang === 'es' ? 'Casos analizados' : 'Federal cases analyzed'}</div>
                </div>
                <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #0D9488, transparent)', opacity: 0.6 }} />
                <div className="stat-glow" style={{ '--stat-color': '#0D9488' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#0D9488', textShadow: '0 2px 12px rgba(13,148,136,0.25)' }}>
                    {heroCounterDone ? '50+' : '—'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 font-semibold">{lang === 'es' ? 'Tipos de caso' : 'Case types covered'}</div>
                </div>
                <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #4040F2, transparent)', opacity: 0.6 }} />
                <div className="stat-glow" style={{ '--stat-color': '#4040F2' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#4040F2', textShadow: '0 2px 12px rgba(64,64,242,0.25)' }}>
                    {heroCounterDone ? '2min' : '—'}
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 font-semibold">{lang === 'es' ? 'Para tu informe' : 'To your report'}</div>
                </div>
              </div>

              {/* Mini data visualization — animated bar chart */}
              <div className="mb-6 flex items-end gap-6">
                <div className="hero-mini-chart">
                  {[65, 45, 72, 38, 58, 80, 52, 68, 42, 76, 55, 62].map((h, i) => (
                    <div key={i} className="bar" style={{
                      height: `${h * 0.5}px`,
                      background: h > 60 ? 'linear-gradient(to top, #0D9488, #14B8A6)' : 'linear-gradient(to top, #CBD5E1, #94A3B8)',
                      animationDelay: `${0.8 + i * 0.06}s`,
                    }} />
                  ))}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  <div className="font-semibold text-slate-500">{lang === 'es' ? 'Tasa de éxito por tipo de caso' : 'Win rate by case type'}</div>
                  <div>{lang === 'es' ? '12 categorías analizadas' : '12 categories analyzed'}</div>
                </div>
              </div>

              {/* Trusted by — refined */}
              <div className="mb-8">
                <div className="text-[10px] text-slate-400 font-bold mb-3 tracking-[1.5px] uppercase">{lang === 'es' ? 'Fuente de datos' : 'Data sourced from'}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Federal Judicial Center', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg> },
                    { name: 'CourtListener', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M9 11L12 14L22 4" /></svg> },
                    { name: 'PACER', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><circle cx="12" cy="12" r="9" /><polyline points="9 11 12 14 15 10" /></svg> },
                  ].map((s, i) => (
                    <div key={i} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-semibold glass-feature transition-all hover:scale-[1.02]" style={{ color: darkMode ? '#E2E8F0' : '#0B1221' }}>
                      {s.icon}
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[17px] sm:text-[19px] text-slate-500 max-w-xl leading-[1.7] mb-10">
                {t.hero_sub_pre} <strong className="text-slate-700 font-data">{totalDisplay}</strong> {t.hero_sub_post}
              </p>

              {/* Natural language input — enhanced */}
              <div className="mb-6 max-w-lg">
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.2), rgba(13,148,136,0.1), rgba(64,64,242,0.2))', filter: 'blur(8px)' }} />
                  <div className="relative">
                    <input type="text" value={naturalInput} onChange={e => setNaturalInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && naturalInput.trim()) { if (!detectCaseType(naturalInput)) go(1); } }}
                      placeholder={lang === 'es' ? 'Describe tu situación en pocas palabras...' : 'Describe your situation in a few words...'}
                      className="w-full px-5 py-4.5 pr-14 text-[15px] card-bg bg-white border-[1.5px] border-slate-200 rounded-2xl outline-none focus:border-[#4040F2] transition-all"
                      style={{ boxShadow: '0 4px 20px rgba(11,18,33,.05)', padding: '18px 56px 18px 20px' }} />
                    <button onClick={() => { if (naturalInput.trim()) { if (!detectCaseType(naturalInput)) go(1); } }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer border-none magnetic-btn ripple-effect"
                      style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 2px 10px rgba(64,64,242,.25)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 px-1">{lang === 'es' ? 'Ej: "Mi jefe me despidió por discriminación" o "Accidente de auto"' : 'E.g. "My boss fired me for discrimination" or "Car accident"'}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => go(1)}
                  className="cta-glow btn-primary magnetic-btn ripple-effect px-10 py-4.5 text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 4px 24px rgba(64,64,242,.3)', padding: '18px 40px' }}>
                  {t.hero_cta}
                </button>
                <button onClick={demo}
                  className="magnetic-btn px-7 py-4 text-[15px] font-medium glass-feature border-[1.5px] border-slate-200 rounded-2xl cursor-pointer hover:border-slate-300 transition-all">
                  {t.hero_demo}
                </button>
              </div>

              {/* Social proof inline */}
              <div className="flex items-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {['#4040F2', '#0D9488', '#1A2744', '#5C5CF5', '#0D9488'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white border-2 border-white shadow-sm"
                      style={{ background: c, zIndex: 5 - i }}>
                      {['J', 'M', 'K', 'S', 'A'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-[12px] text-slate-500">
                  <strong className="text-slate-700 font-data">{liveCounter}+</strong> {lang === 'es' ? 'informes hoy' : 'reports today'}
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Hero Right Column — Floating Report Preview */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(64,64,242,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative w-full max-w-[420px] float-gentle">
              {/* Main report card */}
              <div className="rounded-2xl overflow-hidden" style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(253,251,247,0.95) 100%)',
                border: '1px solid rgba(64,64,242,0.15)',
                boxShadow: '0 24px 80px rgba(11,18,33,0.12), 0 8px 24px rgba(64,64,242,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}>
                {/* Top accent bar */}
                <div className="h-1" style={{ background: 'linear-gradient(90deg, #4040F2, #0D9488, #4040F2)' }} />

                {/* Header */}
                <div className="px-6 pt-5 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
                  <div>
                    <div className="text-[9px] font-bold tracking-[2px] uppercase" style={{ color: '#94A3B8' }}>CASE ANALYSIS REPORT</div>
                    <div className="text-[15px] font-display font-bold mt-0.5" style={{ color: '#0B1221' }}>Employment Discrimination</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>

                {/* Win rate */}
                <div className="px-6 py-4">
                  <div className="flex items-end gap-3 mb-3">
                    <div className="text-[42px] font-display font-extrabold leading-none" style={{ color: '#0D9488', letterSpacing: '-2px' }}>67%</div>
                    <div className="text-[12px] font-semibold text-slate-400 pb-1.5">{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ width: '67%', background: 'linear-gradient(90deg, #0D9488, #14B8A6)' }} />
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-3 gap-px mx-6 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(226,232,240,0.4)' }}>
                  {[
                    { v: '$85K', l: lang === 'es' ? 'Recuperación media' : 'Median recovery', c: '#4040F2' },
                    { v: '14mo', l: lang === 'es' ? 'Duración media' : 'Avg duration', c: '#0B1221' },
                    { v: '72%', l: lang === 'es' ? 'Se resuelven' : 'Settle rate', c: '#0D9488' },
                  ].map((s, i) => (
                    <div key={i} className="text-center py-3 px-2" style={{ background: 'rgba(253,251,247,0.9)' }}>
                      <div className="text-[16px] font-display font-bold" style={{ color: s.c }}>{s.v}</div>
                      <div className="text-[9px] font-semibold text-slate-400 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="px-6 pb-5">
                  <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-2">{lang === 'es' ? 'DISTRIBUCIÓN DE RESULTADOS' : 'OUTCOME DISTRIBUTION'}</div>
                  <div className="flex gap-1 items-end h-[44px]">
                    {[35, 28, 22, 8, 7].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{
                        height: `${h * 1.2}px`,
                        background: i === 0 ? 'linear-gradient(to top, #0D9488, #14B8A6)'
                          : i === 1 ? 'linear-gradient(to top, #4040F2, #5C5CF5)'
                          : 'linear-gradient(to top, #CBD5E1, #E2E8F0)',
                      }} />
                    ))}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[lang === 'es' ? 'Acuerdo' : 'Settled', lang === 'es' ? 'Victoria' : 'Won', lang === 'es' ? 'Desestimado' : 'Dismissed', lang === 'es' ? 'Juicio' : 'Trial', lang === 'es' ? 'Otro' : 'Other'].map((l, i) => (
                      <div key={i} className="flex-1 text-[7px] text-slate-400 text-center font-medium">{l}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-bold glass-feature" style={{
                background: 'rgba(253,251,247,0.95)',
                color: '#0D9488',
                border: '1px solid rgba(13,148,136,0.2)',
                boxShadow: '0 4px 16px rgba(13,148,136,0.15)',
              }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 pulse-dot" style={{ verticalAlign: 'middle' }} />
                {lang === 'es' ? 'Datos actualizados' : 'Live data'}
              </div>

              <div className="absolute -bottom-2 -left-3 px-3 py-1.5 rounded-full text-[10px] font-bold glass-feature" style={{
                background: 'rgba(253,251,247,0.95)',
                color: '#4040F2',
                border: '1px solid rgba(64,64,242,0.2)',
                boxShadow: '0 4px 16px rgba(64,64,242,0.15)',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                {lang === 'es' ? 'Análisis en 2 min' : '2-min analysis'}
              </div>
            </div>
          </div>

          {/* Dramatic gradient divider */}
          <div className="my-8 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #4040F2 15%, #0D9488 50%, #4040F2 85%, transparent 100%)', boxShadow: '0 4px 20px rgba(64,64,242,0.3), 0 4px 20px rgba(13,148,136,0.2), 0 4px 20px rgba(64,64,242,0.15)' }} />

          {/* Trust Bar — Elite Section */}
          <Reveal delay={180}>
            <TrustBar lang={lang} />
          </Reveal>

          {/* Category selector — enhanced */}
          <Reveal delay={200}>
            <div className="relative">
              {/* Animated SVG scales of justice — decorative */}
              <div className="absolute -top-10 -right-6 opacity-[0.04] pointer-events-none z-0" aria-hidden="true">
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="50" y1="10" x2="50" y2="85" />
                  <line x1="20" y1="25" x2="80" y2="25" />
                  <path d="M20 25 L10 55 L30 55 Z" />
                  <path d="M80 25 L70 55 L90 55 Z" />
                  <ellipse cx="50" cy="90" rx="15" ry="4" />
                  <rect x="45" y="85" width="10" height="5" />
                </svg>
              </div>
              <Card glow className="relative overflow-hidden" style={{ padding: '32px' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #4040F2, #5C5CF5, #0D9488)' }} />
                <SectionLabel>{t.select_situation}</SectionLabel>
                <div className="grid grid-cols-2 gap-3">
                  {SITS.map(si => (
                    <button key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
                      className="category-card p-5 card-bg rounded-xl cursor-pointer text-left group border-[1.5px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                      style={{
                        background: `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`,
                        borderColor: si.color + '40',
                        borderLeft: `3px solid ${si.color}`,
                        boxShadow: `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.8)`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = si.color + '60';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${si.color}30, inset 0 1px 0 rgba(255,255,255,0.8)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}30 0%, ${si.color}15 100%)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = si.color + '40';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.8)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`;
                      }}>
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-[1.15] group-hover:rotate-3" style={{ background: `${si.color}30`, boxShadow: `0 4px 12px ${si.color}25` }}>
                          <CategoryIcon name={si.icon} color={si.color} size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-[15px] truncate group-hover:text-[16px] transition-all" style={{ color: si.color, textShadow: `0 1px 3px ${si.color}10` }}>{si.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-medium">{si.sub}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {/* Quick scroll hint */}
                <div className="flex items-center justify-center mt-4 text-[11px] text-slate-400 gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scroll-indicator"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  {lang === 'es' ? 'O desplázate para explorar datos' : 'Or scroll to explore data'}
                </div>
              </Card>
            </div>
          </Reveal>
        </div>

        {/* Data Preview Section — Elite Section */}
        <Reveal delay={300}>
          <DataPreviewSection lang={lang} />
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={350}>
          <div className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {[
              { n: totalDisplay, l: t.stat_outcomes, color: '#4040F2' },
              { n: '20', l: t.stat_types, color: '#0D9488' },
              { n: '50+', l: t.stat_years, color: '#1A2744' },
              { n: lang === 'es' ? 'Gratis' : 'Free', l: t.stat_free, color: '#4040F2' },
            ].map((x, i) => (
              <div key={i} className="text-center py-5 px-4 card-bg rounded-xl border-2 transition-all hover:scale-[1.05] hover:-translate-y-1" style={{ background: `linear-gradient(180deg, ${x.color}25 0%, ${x.color}10 100%)`, borderColor: x.color + '50', boxShadow: `0 6px 24px ${x.color}25` }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: x.color, textShadow: `0 2px 8px ${x.color}30` }}>{x.n}</div>
                <div className="text-[11px] text-slate-600 mt-1.5 font-semibold" style={{ letterSpacing: '0.5px' }}>{x.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Trending + Circuit */}
        <Reveal delay={400}>
          <div className="report-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="card-bg rounded-2xl border-2 p-7 transition-all" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(13,148,136,0.03) 100%)', borderColor: '#0D948840', boxShadow: '0 8px 32px rgba(13,148,136,0.15)' }}>
              <SectionLabel>{t.trending}</SectionLabel>
              {TRENDING.map((tr, i) => {
                const pct = parseInt(tr.change.replace(/[^0-9]/g, '')) || 0;
                const barW = Math.min(pct / 4, 100);
                return (
                  <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < TRENDING.length - 1 ? '1px solid rgba(13,148,136,0.1)' : 'none' }}>
                    <span className="text-sm font-semibold text-slate-700 flex-1">{tr.label}</span>
                    <div className="w-16 h-2.5 bg-slate-200 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'rgba(13,148,136,0.15)' }}>
                      <div className="h-full rounded-full" style={{ width: `${barW}%`, background: 'linear-gradient(90deg, #0D9488, #14B8A6)', transition: 'width 1s ease', boxShadow: '0 0 12px rgba(13,148,136,0.4)' }} />
                    </div>
                    <span className="text-sm font-extrabold flex-shrink-0 w-14 text-right" style={{ color: '#0D9488', textShadow: '0 1px 4px rgba(13,148,136,0.2)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="#0D9488" className="inline mr-0.5 -mt-0.5"><path d="M5 0L9 5H1L5 0Z" /></svg>
                      {tr.change}
                    </span>
                  </div>
                );
              })}
              <div className="text-[11px] text-slate-500 mt-3 font-semibold">{lang === 'es' ? 'Presentaciones federales año tras año' : 'Federal filings year-over-year'}</div>
            </div>
            <div className="card-bg rounded-2xl border-2 p-7 transition-all" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.08) 0%, rgba(64,64,242,0.03) 100%)', borderColor: '#4040F240', boxShadow: '0 8px 32px rgba(64,64,242,0.15)' }}>
              <SectionLabel>{t.circuit_rates}</SectionLabel>
              <div className="stagger-list">
              {['9th', '2nd', 'D.C.', '3rd', '7th', '5th'].map((ci, i) => (
                <div key={i} className="flex items-center gap-2 py-2">
                  <span className="text-xs font-extrabold w-9 text-slate-700">{ci}</span>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden" style={{ background: 'rgba(64,64,242,0.15)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{
                      width: `${CIRCUIT_WIN_RATES[ci] || 35}%`,
                      background: (CIRCUIT_WIN_RATES[ci] || 35) > 40 ? 'linear-gradient(90deg, #0D9488, #14B8A6)' : (CIRCUIT_WIN_RATES[ci] || 35) > 37 ? 'linear-gradient(90deg, #4040F2, #5C5CF5)' : 'linear-gradient(90deg, #E87461, #F59E8C)',
                      boxShadow: (CIRCUIT_WIN_RATES[ci] || 35) > 40 ? '0 0 12px rgba(13,148,136,0.4)' : (CIRCUIT_WIN_RATES[ci] || 35) > 37 ? '0 0 12px rgba(64,64,242,0.4)' : '0 0 12px rgba(232,116,97,0.4)',
                    }} />
                  </div>
                  <span className="text-xs font-extrabold w-10 text-right font-data" style={{ color: (CIRCUIT_WIN_RATES[ci] || 35) > 40 ? '#0D9488' : (CIRCUIT_WIN_RATES[ci] || 35) > 37 ? '#4040F2' : '#E87461', textShadow: '0 1px 4px rgba(11,18,33,0.1)' }}>{CIRCUIT_WIN_RATES[ci]}%</span>
                </div>
              ))}
              </div>
              <div className="text-[11px] text-slate-500 mt-3 font-semibold">{lang === 'es' ? 'Tasas de éxito agregadas del demandante' : 'Aggregate plaintiff win rates'}</div>
            </div>
          </div>
        </Reveal>

        {/* Am I Too Late */}
        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-6 sm:p-7 rounded-2xl border-2 mb-4 transition-all hover:scale-[1.01]" style={{ background: 'linear-gradient(135deg, rgba(232,116,97,0.15) 0%, rgba(232,116,97,0.08) 100%)', borderColor: '#E8746150', boxShadow: '0 10px 40px rgba(232,116,97,0.25)' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E87461, #F59E8C)', boxShadow: '0 6px 20px rgba(232,116,97,0.35)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-lg sm:text-xl font-display font-extrabold text-slate-800">{t.too_late_title}</div>
              <div className="text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">{t.too_late_sub}</div>
            </div>
            <button onClick={() => go(1)} className="px-7 py-3 text-sm font-extrabold text-white rounded-xl cursor-pointer flex-shrink-0 w-full sm:w-auto text-center transition-all hover:scale-[1.05] active:scale-[0.95]"
              style={{ background: 'linear-gradient(135deg, #E87461, #F59E8C)', boxShadow: '0 6px 20px rgba(232,116,97,0.35)' }}>
              {t.check_deadline}
            </button>
          </div>
        </Reveal>

        {/* Social proof counter */}
        <Reveal delay={470}>
          <div className="flex items-center justify-center gap-6 py-4 px-5 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[13px] text-slate-500"><strong className="font-data">{liveCounter}</strong> {lang === 'es' ? 'informes generados hoy' : 'reports generated today'}</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              <span className="text-[13px] text-slate-500"><strong className="font-data">{(totalCases / 1000).toFixed(0)}K+</strong> {lang === 'es' ? 'usuarios' : 'users'}</span>
            </div>
          </div>
        </Reveal>

        {/* Testimonials carousel */}
        <Reveal delay={490}>
          <div className="mb-4">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-500 tracking-[3px]" style={{ background: 'linear-gradient(90deg, #4040F2, #0D9488, #4040F2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lang === 'es' ? 'LO QUE DICEN LOS USUARIOS' : 'WHAT USERS SAY'}</div>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
                {TESTIMONIALS.map((tm, i) => (
                  <div key={i} className="flex-shrink-0 w-full px-2">
                    <div className="card-bg rounded-2xl border-2 p-6" style={{ background: `linear-gradient(135deg, ${tm.color}15 0%, ${tm.color}08 100%)`, borderColor: tm.color + '40', boxShadow: `0 8px 32px ${tm.color}20` }}>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-base flex-shrink-0" style={{ background: tm.color, boxShadow: `0 4px 16px ${tm.color}40` }}>
                          {tm.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex mb-2">
                            {[1,2,3,4,5].map(s => (
                              <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={tm.color} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            ))}
                          </div>
                          <div className="testimonial-quote text-slate-700 font-medium text-[15px]">&ldquo;{tm.quote}&rdquo;</div>
                          <div className="text-[12px] text-slate-600 mt-3 font-semibold">{tm.author}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2.5 mt-5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)}
                    className="border-none cursor-pointer transition-all rounded-full"
                    style={{ width: i === carouselIdx ? 28 : 8, height: 8, background: i === carouselIdx ? 'linear-gradient(90deg, #4040F2, #0D9488)' : '#CBD5E1', transform: i === carouselIdx ? 'scale(1)' : 'scale(1)', boxShadow: i === carouselIdx ? '0 2px 8px rgba(64,64,242,0.4)' : 'none' }} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* === RISK ASSESSMENT QUIZ === */}
        <Reveal delay={505}>
          <div className="mb-6">
            <div className="card-bg bg-gradient-to-br rounded-3xl border border-slate-100 shadow-md overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,.06) 0%, rgba(13,148,136,.03) 100%)' }}>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2 uppercase">Quick Assessment</div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2" style={{ letterSpacing: '-1px' }}>
                      {lang === 'es' ? 'Evaluación de riesgo en 30 segundos' : 'Risk Assessment in 30 seconds'}
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md">{lang === 'es' ? 'Responde 3 preguntas rápidas y obtén una estimación inicial de la fortaleza de tu caso.' : 'Answer 3 quick questions to get an initial estimate of your case strength.'}</p>
                  </div>
                  <button onClick={() => setShowQuiz(true)}
                    className="px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer flex-shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    {lang === 'es' ? 'Empezar' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === HOW IT WORKS === */}
        <Reveal delay={510}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Tres pasos. Dos minutos. Resultados reales.' : 'Three steps. Two minutes. Real data.'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: '01', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: lang === 'es' ? 'Describe tu situación' : 'Describe your situation', desc: lang === 'es' ? 'Dinos qué pasó en palabras simples. Sin jerga legal necesaria.' : 'Tell us what happened in plain words. No legal jargon needed.', color: '#1A2744' },
                { num: '02', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>, title: lang === 'es' ? 'Analizamos los datos' : 'We crunch the data', desc: lang === 'es' ? 'Comparamos tu situación con millones de casos federales reales.' : 'We match your situation against millions of real federal court outcomes.', color: '#4040F2' },
                { num: '03', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, title: lang === 'es' ? 'Obtén tu informe' : 'Get your report', desc: lang === 'es' ? 'Tasas de éxito, plazos, rangos de recuperación y pasos a seguir.' : 'Win rates, timelines, recovery ranges, and what people did next.', color: '#0D9488' },
              ].map((s, i) => (
                <div key={i} className="relative p-6 data-card-3d rounded-2xl border-2 shadow-lg group transition-all hover:scale-[1.03] hover:-translate-y-1" style={{ background: `linear-gradient(135deg, ${s.color}18 0%, ${s.color}08 100%)`, borderColor: s.color + '50', borderTop: `3px solid ${s.color}`, boxShadow: `0 8px 32px ${s.color}25` }}>
                  <div className="absolute top-4 right-4 text-[48px] font-display font-bold leading-none" style={{ color: s.color, opacity: 0.08 }}>{s.num}</div>
                  {/* Step number badge */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`, boxShadow: `0 4px 16px ${s.color}30` }}>
                    {s.icon}
                  </div>
                  <div className="text-[11px] font-extrabold tracking-[2.5px] mb-2 uppercase" style={{ color: s.color, textShadow: `0 1px 3px ${s.color}20` }}>Step {s.num}</div>
                  <div className="text-[17px] font-extrabold mb-2 text-slate-800">{s.title}</div>
                  <div className="text-[13px] text-slate-600 leading-relaxed font-medium">{s.desc}</div>
                  {/* Animated connector arrow */}
                  {i < 2 && <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`, boxShadow: `0 4px 12px ${s.color}30` }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
                    </div>
                  </div>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* === COST CALCULATOR === */}
        <Reveal delay={520}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'CALCULADORA DE COSTOS' : 'COST CALCULATOR'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Entiende los honorarios legales' : 'Understand legal fees'}
              </h2>
            </div>
            <div className="report-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-bg bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-4 uppercase">{lang === 'es' ? 'Calculadora de contingencia' : 'Contingency Fee Calculator'}</div>
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-600 block mb-2">{lang === 'es' ? 'Cantidad estimada de recuperación' : 'Estimated recovery amount'}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input type="range" min="10000" max="500000" step="5000" value={calcAmount}
                      onChange={e => setCalcAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" style={{ accentColor: '#4040F2' }} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>$10K</span>
                    <span className="font-semibold text-slate-700">${(calcAmount / 1000).toFixed(0)}K</span>
                    <span>$500K</span>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{lang === 'es' ? 'Honorarios de abogado (33%)' : 'Attorney fees (33%)'}</span>
                    <span className="text-lg font-display font-bold" style={{ color: '#4040F2' }}>${(calcAmount * 0.33 / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{lang === 'es' ? 'Gastos de la demanda' : 'Court costs & expenses'}</span>
                    <span className="text-lg font-display font-bold" style={{ color: '#1A2744' }}>${(calcAmount * 0.05 / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-700">{lang === 'es' ? 'Tu recuperación neta' : 'Your net recovery'}</span>
                    <span className="text-xl font-display font-bold" style={{ color: '#0D9488' }}>${(calcAmount * 0.62 / 1000).toFixed(1)}K</span>
                  </div>
                </div>
              </div>
              <div className="card-bg bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-4 uppercase">{lang === 'es' ? 'Rangos por tipo de caso' : 'Fee ranges by case type'}</div>
                <div className="space-y-3">
                  {[
                    { type: lang === 'es' ? 'Lesiones personales' : 'Personal injury', hourly: '$150-400', contingency: '25-33%' },
                    { type: lang === 'es' ? 'Discriminación laboral' : 'Employment discrimination', hourly: '$200-500', contingency: '25-33%' },
                    { type: lang === 'es' ? 'Responsabilidad del producto' : 'Product liability', hourly: '$200-600', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Contratos' : 'Contract disputes', hourly: '$250-450', contingency: 'N/A' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-none">
                      <span className="text-xs font-medium text-slate-600">{item.type}</span>
                      <div className="flex gap-3 text-xs">
                        <span className="font-semibold text-slate-500">{item.hourly}</span>
                        <span className="font-semibold" style={{ color: '#4040F2' }}>{item.contingency}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-4">{lang === 'es' ? 'Los honorarios varían por abogado y jurisdicción. Consulta con los proveedores para obtener cotizaciones precisas.' : 'Fees vary by attorney and jurisdiction. Consult providers for accurate quotes.'}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === DATA INSIGHTS DASHBOARD PREVIEW === */}
        <Reveal delay={550}>
          <div className="mb-6">
            <div className="text-center mb-5">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'PERSPECTIVAS DE DATOS' : 'DATA INSIGHTS'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Datos reales. Decisiones informadas.' : 'Real data. Informed decisions.'}
              </h2>
              <p className="text-[14px] text-slate-400 mt-2 max-w-lg mx-auto">{lang === 'es' ? 'Cada número proviene de registros judiciales públicos.' : 'Every number comes from public court records — not estimates, not projections.'}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { value: '38.2%', label: lang === 'es' ? 'Tasa promedio de éxito' : 'Avg. plaintiff win rate', sub: lang === 'es' ? 'Todos los casos federales' : 'All federal civil cases', color: '#0D9488' },
                { value: '8.4mo', label: lang === 'es' ? 'Tiempo mediano hasta resolución' : 'Median time to resolution', sub: lang === 'es' ? 'De presentación a cierre' : 'Filing to close', color: '#1A2744' },
                { value: '$47K', label: lang === 'es' ? 'Mediana de recuperación' : 'Median plaintiff recovery', sub: lang === 'es' ? 'Casos con pago' : 'In cases with payout', color: '#4040F2' },
                { value: '67%', label: lang === 'es' ? 'Casos que se resuelven' : 'Cases that settle', sub: lang === 'es' ? 'Antes de llegar a juicio' : 'Before reaching trial', color: '#4040F2' },
              ].map((d, i) => (
                <div key={i} className="p-4 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                  <div className="text-2xl sm:text-3xl font-display font-bold" style={{ color: d.color, letterSpacing: '-1px' }}>{d.value}</div>
                  <div className="text-[12px] font-semibold text-slate-600 mt-1.5">{d.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{d.sub}</div>
                </div>
              ))}
            </div>

            {/* Mini outcome breakdown */}
            <div className="report-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-5 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-3">{lang === 'es' ? 'RESULTADOS MÁS COMUNES' : 'MOST COMMON OUTCOMES'}</div>
                {[
                  { l: lang === 'es' ? 'Acuerdo con pago' : 'Settlement (with payment)', p: 34, c: '#0D9488' },
                  { l: lang === 'es' ? 'Desestimación voluntaria' : 'Voluntary dismissal', p: 28, c: '#4040F2' },
                  { l: lang === 'es' ? 'Juicio sumario (defensa)' : 'Summary judgment (defense)', p: 18, c: '#D97706' },
                  { l: lang === 'es' ? 'Victoria en juicio' : 'Trial verdict (plaintiff)', p: 10, c: '#1A2744' },
                  { l: lang === 'es' ? 'Otros' : 'Other dispositions', p: 10, c: '#94A3B8' },
                ].map((o, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: o.c }} />
                    <span className="text-[12px] flex-1 text-slate-600">{o.l}</span>
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${o.p}%`, background: o.c, transition: 'width 1s ease' }} />
                    </div>
                    <span className="text-[12px] font-bold font-data w-8 text-right" style={{ color: o.c }}>{o.p}%</span>
                  </div>
                ))}
              </div>
              <div className="p-5 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-3">{lang === 'es' ? 'ABOGADO VS. SIN ABOGADO' : 'ATTORNEY VS. NO ATTORNEY'}</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 p-3 rounded-xl text-center" style={{ background: '#CCFBF1' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: '#0D9488' }}>41%</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: '#0D9488' }}>{lang === 'es' ? 'Con abogado' : 'With attorney'}</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl text-center" style={{ background: '#FEF3C7' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: '#D97706' }}>12%</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: '#D97706' }}>{lang === 'es' ? 'Sin abogado' : 'Self-represented'}</div>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-lg text-[12px] font-medium" style={{ background: '#F3EBDA', color: '#4040F2' }}>
                  {lang === 'es' ? 'Las personas con abogado ganaron ~3.4x más a menudo' : 'People with attorneys won ~3.4x more often'}
                </div>
                <div className="mt-3 text-[10px] font-bold text-slate-400 tracking-[2px] mb-2">{lang === 'es' ? 'TIPOS DE HONORARIOS' : 'FEE TYPES'}</div>
                <div className="space-y-1">
                  {[
                    { type: lang === 'es' ? 'Contingencia' : 'Contingency', desc: lang === 'es' ? 'Solo pagas si ganas (33-40%)' : 'You pay only if you win (33-40%)' },
                    { type: lang === 'es' ? 'Por hora' : 'Hourly', desc: lang === 'es' ? 'Tarifa por hora de trabajo' : 'Charged per hour of work' },
                    { type: lang === 'es' ? 'Tarifa fija' : 'Flat fee', desc: lang === 'es' ? 'Precio fijo por el caso' : 'One price for the whole case' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-slate-600 w-20">{f.type}</span>
                      <span className="text-slate-400">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === COMPARISON TOOL PREVIEW === */}
        <Reveal delay={580}>
          <div className="p-6 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-1">{lang === 'es' ? 'HERRAMIENTA DE COMPARACIÓN' : 'COMPARISON TOOL'}</div>
                <div className="text-lg sm:text-xl font-display font-bold">{lang === 'es' ? 'Compara dos situaciones lado a lado' : 'Compare two situations side by side'}</div>
                <div className="text-[13px] text-slate-400 mt-1">{lang === 'es' ? 'Elige dos tipos de caso y ve las diferencias en datos reales.' : 'Pick any two case types and see how the real data compares.'}</div>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: '#CCFBF1', color: '#0D9488' }}>{lang === 'es' ? 'Gratis' : 'Free'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: lang === 'es' ? 'Discriminación laboral' : 'Employment Discrimination', wr: '38.4%', time: '11.2 mo', settle: '32%', color: '#1A2744' },
                { label: lang === 'es' ? 'Lesiones personales' : 'Personal Injury', wr: '54.1%', time: '8.6 mo', settle: '48%', color: '#0D9488' },
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ borderColor: `${c.color}20`, background: `${c.color}04` }}>
                  <div className="text-[13px] font-semibold mb-3" style={{ color: c.color }}>{c.label}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-slate-400">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}</span>
                      <span className="font-bold font-data">{c.wr}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-slate-400">{lang === 'es' ? 'Tiempo promedio' : 'Avg. duration'}</span>
                      <span className="font-bold font-data">{c.time}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-slate-400">{lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate'}</span>
                      <span className="font-bold font-data">{c.settle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => go(1)} className="w-full mt-4 py-3 text-[14px] font-semibold text-white rounded-xl cursor-pointer border-none transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 4px 16px rgba(64,64,242,.2)' }}>
              {lang === 'es' ? 'Comparar tu situación →' : 'Compare your situation →'}
            </button>
          </div>
        </Reveal>

        {/* === CASE TIMELINE ESTIMATOR === */}
        <Reveal delay={590}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'CRONOGRAMA DE CASOS' : 'CASE TIMELINE'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Qué esperar en tu camino legal' : 'What to expect on your legal journey'}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 via-slate-200 to-transparent ml-[17px]" style={{ background: 'linear-gradient(180deg, #4040F2, #5C5CF5)' }} />
              <div className="space-y-6">
                {[
                  { month: '0-1', title: lang === 'es' ? 'Consulta inicial' : 'Initial Consultation', desc: lang === 'es' ? 'Revisa tu caso con un abogado. Costo: Gratis a $500.' : 'Review your case with an attorney. Cost: Free-$500.' },
                  { month: '1-3', title: lang === 'es' ? 'Investigación y demanda' : 'Investigation & Filing', desc: lang === 'es' ? 'Reúne pruebas, presenta la demanda formal.' : 'Gather evidence, file formal complaint.' },
                  { month: '3-8', title: lang === 'es' ? 'Descubrimiento' : 'Discovery Phase', desc: lang === 'es' ? 'Intercambio de documentos y deposiciones.' : 'Exchange documents and depositions.' },
                  { month: '8-12', title: lang === 'es' ? 'Negociación' : 'Settlement Negotiation', desc: lang === 'es' ? '67% de casos se resuelven en esta fase.' : '67% of cases settle here.' },
                  { month: '12+', title: lang === 'es' ? 'Juicio o veredicto' : 'Trial or Verdict', desc: lang === 'es' ? 'Si no se llega a un acuerdo, va a juicio.' : 'If no settlement, case goes to trial.' },
                ].map((stage, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-white border-[3px] flex items-center justify-center font-semibold text-sm flex-shrink-0 relative z-10" style={{ borderColor: '#4040F2', color: '#4040F2' }}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: '#4040F2' }}>{stage.month} months</div>
                      <div className="text-[15px] font-semibold mb-1" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>{stage.title}</div>
                      <div className="text-[13px] text-slate-500">{stage.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl" style={{ background: '#F3EBDA' }}>
              <div className="text-[12px] text-slate-700"><strong>{lang === 'es' ? 'Nota:' : 'Note:'}</strong> {lang === 'es' ? 'Los plazos varían según el tipo de caso, la jurisdicción y la complejidad. Esto es un promedio basado en datos federales.' : 'Timelines vary by case type, jurisdiction, and complexity. This is an average based on federal data.'}</div>
            </div>
          </div>
        </Reveal>

        {/* === LEGAL GLOSSARY PREVIEW === */}
        <Reveal delay={600}>
          <div className="p-5 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-3">{lang === 'es' ? 'GLOSARIO LEGAL SIMPLIFICADO' : 'LEGAL TERMS — SIMPLIFIED'}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(LEGAL_GLOSSARY).slice(0, 6).map(([term, def], i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[13px] font-semibold capitalize" style={{ color: '#4040F2' }}>{term}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{def}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <span className="text-[12px] text-slate-400">{lang === 'es' ? `+ ${Object.keys(LEGAL_GLOSSARY).length - 6} más términos en tu informe` : `+ ${Object.keys(LEGAL_GLOSSARY).length - 6} more terms available in your report`}</span>
            </div>
          </div>
        </Reveal>

        {/* === WHAT YOU GET: FREE vs PREMIUM === */}
        <Reveal delay={620}>
          <div className="mb-4">
            <div className="text-center mb-5">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'PLANES' : 'PLANS'}</div>
              <h2 className="text-2xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? '¿Qué incluye cada plan?' : 'What do you get?'}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free */}
              <div className="p-6 card-bg bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-3" style={{ background: '#F1F5F9', color: '#64748B' }}>{lang === 'es' ? 'GRATIS' : 'FREE'}</div>
                <div className="text-2xl font-display font-bold mb-1">$0</div>
                <div className="text-[12px] text-slate-400 mb-4">{lang === 'es' ? 'Perfecto para empezar' : 'Perfect to get started'}</div>
                <div className="space-y-2">
                  {[
                    lang === 'es' ? 'Tasa histórica de éxito' : 'Historical win rate',
                    lang === 'es' ? 'Cómo terminaron los casos' : 'How cases ended (pie chart)',
                    lang === 'es' ? 'Plazo general de presentación' : 'General filing deadline',
                    lang === 'es' ? 'Abogado vs. sin abogado' : 'Attorney vs. self-represented rates',
                    lang === 'es' ? 'Comparación de escenarios' : 'Scenario comparison chips',
                    lang === 'es' ? 'Glosario legal simplificado' : 'Plain-language glossary',
                    lang === 'es' ? 'Puntuación de fortaleza del caso' : 'Case strength score',
                    lang === 'es' ? 'Resumen en lenguaje sencillo' : 'Data summary in plain language',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className="text-slate-600">{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go(1)} className="w-full mt-5 py-3 text-[14px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-colors hover:bg-slate-100">
                  {lang === 'es' ? 'Comenzar gratis' : 'Start for free'}
                </button>
              </div>
              {/* Premium */}
              <div className="p-6 rounded-2xl border-2 shadow-md relative overflow-hidden" style={{ borderColor: '#4040F230', background: 'linear-gradient(180deg, #FDFBF7, #fff)' }}>
                <div className="absolute top-0 right-0 px-4 py-1 text-[10px] font-bold text-white rounded-bl-xl" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>{lang === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}</div>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-3" style={{ background: '#F3EBDA', color: '#4040F2' }}>PREMIUM</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-2xl font-display font-bold">$5.99</span>
                  <span className="text-[13px] text-slate-400 mb-0.5">/ report</span>
                </div>
                <div className="text-[12px] text-slate-400 mb-4">{lang === 'es' ? 'O $9.99 para acceso ilimitado' : 'Or $9.99 for unlimited access'}</div>
                <div className="space-y-2">
                  {[
                    { text: lang === 'es' ? 'Todo lo del plan gratuito' : 'Everything in Free', bold: true },
                    { text: lang === 'es' ? 'Rangos de recuperación (bajo/típico/alto)' : 'Recovery ranges (low / typical / high)', bold: false },
                    { text: lang === 'es' ? 'Distribución de recuperación' : 'Recovery amount distribution', bold: false },
                    { text: lang === 'es' ? 'Impacto del abogado detallado' : 'Detailed attorney impact analysis', bold: false },
                    { text: lang === 'es' ? 'Cronología típica del caso' : 'Typical case timeline', bold: false },
                    { text: lang === 'es' ? 'Casos comparables (anonimizados)' : 'Comparable cases (anonymized)', bold: false },
                    { text: lang === 'es' ? 'Calendario de acuerdos' : 'Settlement timing chart', bold: false },
                    { text: lang === 'es' ? 'Factores citados por los tribunales' : 'Factors courts cited', bold: false },
                    { text: lang === 'es' ? 'Mapa de tasas por estado' : 'State-by-state win rate map', bold: false },
                    { text: lang === 'es' ? 'Tasas por circuito' : 'Circuit-level breakdown', bold: false },
                    { text: lang === 'es' ? 'Exportar como PDF' : 'Export as PDF', bold: false },
                    { text: lang === 'es' ? 'Alertas de nuevos casos' : 'New case alerts', bold: false },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className={f.bold ? 'font-semibold text-slate-700' : 'text-slate-600'}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowPricing(true)} className="w-full mt-5 py-3 text-[14px] font-semibold text-white rounded-xl cursor-pointer border-none transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 4px 16px rgba(64,64,242,.25)' }}>
                  {lang === 'es' ? 'Desbloquear premium' : 'Unlock premium'}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === DATA SOURCES & TRUST === */}
        <Reveal delay={640}>
          <div className="p-5 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #F8FAFC, #EFF6FF)' }}>
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-1">{lang === 'es' ? 'FUENTES DE DATOS' : 'DATA SOURCES'}</div>
              <div className="text-[15px] font-semibold text-slate-700">{lang === 'es' ? 'Construido sobre datos públicos federales' : 'Built on public federal court data'}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Federal Judicial Center', desc: lang === 'es' ? 'Base de datos integrada (IDB) — cada caso civil federal desde 1970' : 'Integrated Database (IDB) — every federal civil case since 1970', badge: 'Primary' },
                { name: 'CourtListener / RECAP', desc: lang === 'es' ? 'Registros de PACER proporcionados al público' : 'PACER records made freely available to the public', badge: 'Secondary' },
                { name: 'U.S. Courts (PACER)', desc: lang === 'es' ? 'Documentos y registros judiciales oficiales' : 'Official court filings and docket records', badge: 'Reference' },
              ].map((s, i) => (
                <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[14px] font-semibold text-slate-700">{s.name}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#F3EBDA', color: '#4040F2' }}>{s.badge}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <div className="text-[11px] text-slate-400">{lang === 'es' ? 'Todos los datos son de dominio público. MyCaseValue no añade ni altera registros.' : 'All data is public domain. MyCaseValue does not add or alter any records.'}</div>
            </div>
          </div>
        </Reveal>

        {/* (Free guide section removed) */}

        {/* === WHAT YOUR REPORT INCLUDES === */}
        <Reveal delay={680}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'CARACTERÍSTICAS DEL INFORME' : 'REPORT FEATURES'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Qué incluye tu informe' : 'What your report includes'}</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">{lang === 'es' ? 'El informe gratuito te da lo básico. Premium agrega datos detallados de recuperación, comparaciones estatales e impacto del abogado.' : 'Free report gives you the basics. Premium adds detailed recovery data, state comparisons, and attorney impact.'}</p>
            </div>
            <ReportFeaturesGrid lang={lang} />
            <div className="text-center">
              <button onClick={() => go(1)} className="px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer border-none"
                style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                {lang === 'es' ? 'Ver tu informe personalizado →' : 'Get your personalized report →'}
              </button>
            </div>
          </div>
        </Reveal>

        {/* === CASE TYPE STATS PREVIEW === */}
        <Reveal delay={700}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'DATOS CLAVE' : 'KNOW BEFORE YOU GO'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Estadísticas clave por tipo de caso' : 'Key stats by case type'}</h2>
            </div>
            <CaseTypeStatsPreview lang={lang} />
          </div>
        </Reveal>

        {/* === LEGAL COST REALITY CHECK === */}
        <Reveal delay={720}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'REALIDAD FINANCIERA' : 'FINANCIAL REALITY'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Costos legales: Qué esperar' : 'Legal costs: What to expect'}</h2>
            </div>
            <LegalCostComparison lang={lang} />
          </div>
        </Reveal>

        {/* === US MAP PREVIEW === */}
        <Reveal delay={740}>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="text-[11px] font-bold text-slate-400 tracking-[2.5px] mb-2">{lang === 'es' ? 'DATOS POR ESTADO' : 'STATE DATA'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Tu estado de un vistazo' : 'Your state at a glance'}</h2>
              <p className="text-sm text-slate-400 mt-2">{lang === 'es' ? 'Haz clic en tu estado para ver datos locales' : 'Click your state to see local insights'}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm" style={{ maxHeight: '500px', overflow: 'auto' }}>
              <USMap stateRates={AGGREGATE_STATE_RATES} onStateClick={(s) => { setStateCode(s); go(1); }} />
            </div>
          </div>
        </Reveal>

        {/* FAQ Section — Elite Section */}
        <Reveal delay={760}>
          <FaqSection lang={lang} />
        </Reveal>

        {/* Final CTA Section — Elite Section */}
        <Reveal delay={780}>
          <FinalCtaSection lang={lang} onGetStarted={() => go(1)} />
        </Reveal>

      </div>
      {showQuiz && <RiskAssessmentQuiz onClose={() => setShowQuiz(false)} onStartAssessment={() => { setShowQuiz(false); go(1); }} />}
    </Shell>
  );

  // ============================================================
  // WIZARD STEPS
  // ============================================================
  const BackButton = () => (
    <button onClick={() => {
      if (step === 6) { setResult(null); go(5); }
      else if (step === 5) go(4);
      else if (step === 4) go(3);
      else if (step === 3) { setSpec(null); go(2); }
      else if (step === 2) { setSit(null); go(0); }
    }} className="text-sm text-slate-400 bg-transparent border-none cursor-pointer mb-4 flex items-center gap-1 hover:text-slate-600 transition-colors" aria-label="Go back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      Back
    </button>
  );

  // Step 1: Category
  if (step === 1) return (
    <Shell>
      <div className="max-w-xl mx-auto py-8 wizard-step-enter">
        <WizardProgress step={1} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.1), rgba(201,165,78,0.05))' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">{t.what_happened}</h2>
          </div>
          <p className="text-slate-500 mb-6 ml-[52px]">{t.select_closest}</p>
          <div className="space-y-2.5 stagger">
            {SITS.map(si => (
              <button key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
                className="category-card flex items-center gap-4 w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg group"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(253,251,247,0.8))', border: '1.5px solid rgba(226,232,240,0.6)', boxShadow: '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = si.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#F1F5F9'}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform" style={{ background: `${si.color}10` }}>
                  <CategoryIcon name={si.icon} color={si.color} size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[15px]">{si.label}</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">{si.sub}</div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all" style={{ background: `${si.color}08` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={si.color} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 2: Sub-category
  if (step === 2 && sit) return (
    <Shell>
      <div className="max-w-xl mx-auto py-6 wizard-step-enter">
        <WizardProgress step={2} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <BackButton />
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${sit.color}12` }}>
              <CategoryIcon name={sit.icon} color={sit.color} size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">{sit.q}</h2>
          </div>
          <p className="text-slate-500 mb-6 ml-[52px]">{t.choose_specific}</p>
          <div className="space-y-2.5 stagger">
            {sit.opts.map((o: any, i: number) => (
              <button key={i} onClick={() => { setSpec(o); go(3); }}
                className="category-card flex items-center w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(253,251,247,0.8))', border: '1.5px solid rgba(226,232,240,0.6)', boxShadow: '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = sit.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#F1F5F9'}>
                <div className="w-2 h-2 rounded-full flex-shrink-0 mr-3 transition-transform" style={{ background: sit.color, opacity: 0.5 }} />
                <span className="flex-1 text-[15px]">{o.label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sit.color}08` }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={sit.color} strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 3: Details
  if (step === 3) return (
    <Shell>
      <div className="max-w-xl mx-auto py-6 page-enter">
        <WizardProgress step={3} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <BackButton />
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">{t.your_details}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿En qué estado estás?' : 'What state are you in?'}</label>
              <Select value={stateCode} options={STATES} onChange={setStateCode} placeholder={lang === 'es' ? 'Selecciona tu estado...' : 'Select your state...'} dark={darkMode} />
              <div className="text-[11px] text-slate-400 mt-1 px-1">{lang === 'es' ? 'Esto nos ayuda a mostrarte resultados específicos de tu área.' : 'This helps us show you results specific to your area.'}</div>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Cuándo ocurrió esto?' : 'When did this happen?'} <span className="text-coral">*</span></label>
              <Select value={timing} options={TIMING_OPTS} onChange={setTiming} dark={darkMode} />
            </div>
            {timing && (
              <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed animate-fade-in" style={{
                background: timing === 'recent' ? '#CCFBF1' : (timing === '2yr' || timing === 'old') ? '#FEE2E2' : '#EFF6FF',
                color: timing === 'recent' ? '#0D9488' : (timing === '2yr' || timing === 'old') ? '#DC2626' : '#1A2744',
              }}>
                {lang === 'es' ? (
                  timing === 'recent' ? 'Buenas noticias — las personas que actuaron dentro de 6 meses históricamente tuvieron mejores resultados.'
                  : timing === 'now' ? 'Como esto sigue ocurriendo, actuar pronto ayuda a preservar tus opciones y evidencia.'
                  : (timing === '2yr' || timing === 'old') ? '⚠ Importante: Podrías estar quedándote sin tiempo. Hay plazos legales que podrían afectar tu caso — habla con un abogado pronto.'
                  : 'Actuar antes generalmente te da más opciones.'
                ) : (
                  timing === 'recent' ? 'Good news — people who took action within 6 months historically had better outcomes.'
                  : timing === 'now' ? 'Since this is still happening, acting soon helps preserve your options and evidence.'
                  : (timing === '2yr' || timing === 'old') ? '⚠ Important: You may be running out of time. There are legal deadlines that could affect your case — speak with a lawyer soon.'
                  : 'Taking action sooner generally gives you more options.'
                )}
              </div>
            )}
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Cuánto dinero está involucrado?' : 'How much money is involved?'} <span className="text-coral">*</span></label>
              <Select value={amount} options={AMOUNT_OPTS} onChange={setAmount} dark={darkMode} />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Tienes abogado?' : 'Do you have a lawyer?'} <span className="text-coral">*</span></label>
              <Select value={attorney} options={ATTORNEY_OPTS} onChange={setAttorney} dark={darkMode} />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Hay otros afectados por el mismo problema?' : 'Are others affected by the same issue?'}</label>
              <Select value={othersAffected} options={lang === 'es' ? [
                { id: '', label: 'Seleccionar...' },
                { id: 'no', label: 'No, solo yo' },
                { id: 'few', label: 'Sí, algunas personas' },
                { id: 'many', label: 'Sí, muchas personas (40+)' },
              ] : [
                { id: '', label: 'Select...' },
                { id: 'no', label: 'No, just me' },
                { id: 'few', label: 'Yes, a few people' },
                { id: 'many', label: 'Yes, many people (40+)' },
              ]} onChange={setOthersAffected} dark={darkMode} />
            </div>
            {othersAffected === 'many' && (
              <>
                <div>
                  <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Aproximadamente cuántos?' : 'Approximately how many?'}</label>
                  <Select value={classSize} options={lang === 'es' ? [
                    { id: '', label: 'Seleccionar...' },
                    { id: '40-100', label: '40 – 100 personas' },
                    { id: '100-500', label: '100 – 500 personas' },
                    { id: '500+', label: '500+ personas' },
                    { id: 'unsure', label: 'No estoy seguro' },
                  ] : [
                    { id: '', label: 'Select...' },
                    { id: '40-100', label: '40 – 100 people' },
                    { id: '100-500', label: '100 – 500 people' },
                    { id: '500+', label: '500+ people' },
                    { id: 'unsure', label: 'Not sure' },
                  ]} onChange={setClassSize} dark={darkMode} />
                </div>
                {classSize && (
                  <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed" style={{ background: '#EFF6FF', color: '#1A2744' }}>
                    {lang === 'es'
                      ? 'Las acciones colectivas federales bajo la Regla 23 generalmente requieren suficientes individuos afectados para que las demandas individuales sean impracticables. Históricamente, los casos con 40+ individuos afectados han cumplido este umbral.'
                      : 'Federal class actions under Rule 23 generally require enough affected individuals that individual lawsuits would be impractical. Historically, cases with 40+ affected individuals have met this threshold.'}
                  </div>
                )}
              </>
            )}
          </div>
          <button onClick={() => go(4)} disabled={!timing || !amount || !attorney}
            className="w-full mt-7 py-4.5 text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer disabled:cursor-default disabled:opacity-40 transition-all active:scale-[0.98] hover:scale-[1.01]"
            style={{ background: (timing && amount && attorney) ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : '#E2E8F0', color: (timing && amount && attorney) ? '#fff' : '#94A3B8', boxShadow: (timing && amount && attorney) ? '0 4px 20px rgba(64,64,242,.3)' : 'none', padding: '18px' }}>
            {lang === 'es' ? 'Ver resultados →' : 'View outcomes →'}
          </button>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 4: Consent
  if (step === 4) return (
    <Shell>
      <div className="max-w-xl mx-auto py-6 page-enter">
        <WizardProgress step={4} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <BackButton />
        <Reveal>
          <Card glow>
            <div className="inline-block px-3.5 py-1 rounded-lg text-[11px] font-semibold mb-4" style={{ background: '#F3EBDA', color: '#4040F2' }}>{t.one_moment}</div>
            <h2 className="text-2xl font-display font-bold mb-3">{t.before_report}</h2>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-3">
              {lang === 'es'
                ? 'Estás a punto de ver datos reales de registros judiciales federales. Estos datos muestran lo que le sucedió a otras personas — no predicen lo que te sucederá a ti.'
                : 'You are about to see real data from federal court records. This data shows what happened to other people — it does not predict what will happen to you.'}
            </p>
            <p className="text-[13px] text-slate-400 leading-relaxed mb-5">
              {lang === 'es'
                ? 'Solo un abogado con licencia puede evaluar tus hechos y circunstancias específicas. MyCaseValue es una herramienta informativa, no un servicio legal.'
                : 'Only a licensed attorney can evaluate your specific facts and circumstances. MyCaseValue is an informational tool, not a legal service.'}
            </p>
            <label className="flex gap-3 items-start cursor-pointer text-[15px]" onClick={() => setConsent(!consent)}>
              <div className="w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{ borderColor: consent ? '#4040F2' : '#E2E8F0', background: consent ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : '#fff' }}>
                {consent && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className="leading-relaxed">{lang === 'es'
                ? 'Entiendo que estos son solo datos históricos, no evalúan mi situación, y no se crea ninguna relación abogado-cliente.'
                : 'I understand this is historical data only, does not evaluate my situation, and no attorney-client relationship is created.'}</span>
            </label>
            <button onClick={() => go(5)} disabled={!consent}
              className="w-full mt-6 py-4.5 text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer disabled:cursor-default disabled:opacity-40 transition-all active:scale-[0.98] hover:scale-[1.01]"
              style={{ background: consent ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : '#E2E8F0', color: consent ? '#fff' : '#94A3B8', boxShadow: consent ? '0 4px 20px rgba(64,64,242,.3)' : 'none', padding: '18px' }}>
              {lang === 'es' ? 'Generar informe →' : 'Generate report →'}
            </button>
          </Card>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 5: Email
  if (step === 5) return (
    <Shell>
      <div className="max-w-md mx-auto py-10 text-center page-enter">
        <Reveal>
          <Card glow className="px-6 sm:px-9 py-10">
            <h2 className="text-2xl font-display font-bold mb-2">{t.data_ready}</h2>
            <p className="text-[15px] text-slate-500 mb-6 leading-relaxed">
              {lang === 'es' ? 'Guarda una copia en tu correo, o sáltalo para ver ahora.' : 'Save a copy to your email, or skip to view now.'}
            </p>
            <div className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 px-4 py-3 text-[15px] border-[1.5px] border-slate-200 rounded-xl outline-none focus:border-[#4040F2] card-bg bg-white transition-colors" />
              <button onClick={() => {
                if (email.includes('@') && email.includes('.')) {
                  setEmailSent(true);
                  apiCall('/api/email/capture', 'POST', { email, case_type: spec?.d });
                  startLoad();
                }
              }} className="px-5 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all active:scale-[0.96]"
                style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                {lang === 'es' ? 'Enviar' : 'Send'}
              </button>
            </div>
            <button onClick={startLoad} className="mt-3 text-sm text-slate-400 bg-transparent border-none cursor-pointer underline hover:text-slate-600 transition-colors">
              {lang === 'es' ? 'Saltar por ahora' : 'Skip for now'}
            </button>
          </Card>
        </Reveal>
      </div>
    </Shell>
  );

  // ============================================================
  // RESULTS
  // ============================================================
  if (step === 6) {
    // Loading
    if (loading) return (
      <Shell>
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex justify-between mb-6">
            <div className="flex-1">
              <div className="h-3 w-44 bg-slate-100 rounded-lg" style={{ animation: 'skeletonPulse 1.5s ease infinite' }} />
              <div className="h-7 w-3/5 bg-slate-100 rounded-lg mt-2.5" style={{ animation: 'skeletonPulse 1.5s ease infinite' }} />
            </div>
            <div className="h-11 w-24 bg-slate-100 rounded-lg" style={{ animation: 'skeletonPulse 1.5s ease infinite' }} />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-5 border border-slate-100 rounded-2xl">
                <div className="h-2.5 w-14 bg-slate-100 rounded" style={{ animation: 'skeletonPulse 1.5s ease infinite' }} />
                <div className="h-9 w-1/2 bg-slate-100 rounded mt-2.5" style={{ animation: 'skeletonPulse 1.5s ease infinite' }} />
              </div>
            ))}
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${loadPct}%`, background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }} />
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-3">
              <ProgressRing pct={loadPct} size={56} />
            </div>
            <div className="text-[15px] text-slate-600 mb-2 text-center">
              {lang === 'es' ? (
                loadPct < 15 ? `Buscando en ${totalDisplay} registros judiciales...`
                : loadPct < 30 ? `Coincidiendo ${spec?.d || 'tu situación'} en la base de datos...`
                : loadPct < 50 ? 'Cruzando datos con CourtListener...'
                : loadPct < 70 ? 'Agregando resultados históricos...'
                : loadPct < 85 ? `Analizando ${(spec && MOCK_DATA[spec.nos]) ? MOCK_DATA[spec.nos].total.toLocaleString() : '287,420'} casos similares...`
                : 'Casi listo...'
              ) : (
                loadPct < 15 ? `Searching ${totalDisplay} court records...`
                : loadPct < 30 ? `Matching ${spec?.d || 'your situation'} in the database...`
                : loadPct < 50 ? 'Cross-referencing CourtListener...'
                : loadPct < 70 ? 'Aggregating historical outcomes...'
                : loadPct < 85 ? `Analyzing ${(spec && MOCK_DATA[spec.nos]) ? MOCK_DATA[spec.nos].total.toLocaleString() : '287,420'} similar cases...`
                : 'Almost there...'
              )}
            </div>
            {loadPct > 30 && loadPct < 90 && (
              <div className="text-[13px] text-slate-400 mt-1 text-center">{lang === 'es' ? 'Los tribunales federales resolvieron más de 400,000 casos civiles el año pasado.' : 'Federal courts resolved over 400,000 civil cases last year.'}</div>
            )}
          </div>
        </div>
      </Shell>
    );

    if (!result) return null;

    const d = result;
    const v = getRange(d);
    const wr = getWinRate(d);
    const wrColor = wr > 36 ? '#0D9488' : '#D97706';
    const od = d?.outcome_data || (spec && OUTCOME_DATA[spec.nos]) || { trial_win: 10, trial_loss: 7, dismiss: 53, fav_set: 30, set_mo: 6, trial_med: 'N/A' };
    const winSettleRate = Math.round(od.fav_set + od.trial_win);
    const ccScore = Math.min(99, Math.max(10, Math.round(wr * 0.6 + (d.sp || 0) * 0.4 + (d.rp || 0) * 0.15)));
    let maxEnd = 0; (d.ends || []).forEach((x: any) => { if (x.p > maxEnd) maxEnd = x.p; });
    let maxMoney = 0; (d.money || []).forEach((x: any) => { if (x.p > maxMoney) maxMoney = x.p; });

    // Get circuit-specific win rate if available
    const circuitName = stateCode ? CIRCUIT_MAP[stateCode] : null;
    const circuitDataKey = circuitName ? CIRCUIT_DATA_KEY[circuitName] : null;
    const circuitSpecificRate = circuitDataKey && d.circuit_rates ? d.circuit_rates[circuitDataKey] : null;

    return (
      <Shell>
        <div className="py-6">
          {/* Live bar */}
          <Reveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 no-print">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full relative" style={{ background: '#0D9488' }}>
                  <div className="absolute -inset-0.5 rounded-full" style={{ background: '#0D9488', opacity: 0.4, animation: 'pulseGlow 2s infinite' }} />
                </div>
                <span className="text-sm text-slate-400">
                  <strong className="text-slate-600">{liveCount}</strong> {lang === 'es' ? 'consultando ahora' : 'checking now'} · <strong className="text-slate-600">12,847</strong> {lang === 'es' ? 'informes este mes' : 'reports this month'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  try {
                    const u = window.location.origin + '#' + btoa(JSON.stringify({ c: spec?.nos, s: stateCode, t: timing }));
                    navigator.clipboard.writeText(u);
                    toast('Link copied!');
                  } catch { toast('Could not copy'); }
                }} className="text-sm font-semibold px-4 py-2 card-bg bg-white border border-slate-200 rounded-lg cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                  {lang === 'es' ? 'Compartir' : 'Share'}
                </button>
                <button onClick={saveReport} className="text-sm font-semibold px-4 py-2 card-bg bg-white border border-slate-200 rounded-lg cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-2px' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  {lang === 'es' ? 'Guardar' : 'Save'}
                </button>
                {isPremium && (
                  <button onClick={() => { try { window.print(); } catch {} }}
                    className="text-sm font-semibold px-4 py-2 card-bg bg-white border border-slate-200 rounded-lg cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                    PDF
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* UPL Notice */}
          <Reveal>
            <div className="px-5 py-3 card-bg bg-white rounded-xl border border-slate-100 mb-4 text-[13px] text-slate-400 leading-relaxed">
              <strong className="text-slate-500">{lang === 'es' ? 'Importante:' : 'Important:'}</strong> {UPL.resultsNotice}
            </div>
          </Reveal>

          {/* AI Case Summary */}
          <Reveal>
            <div className="px-5 py-4 rounded-xl mb-4" style={{
              background: darkMode ? 'linear-gradient(135deg, #1A2744, #162035)' : 'linear-gradient(135deg, #FDFBF7, #FFF)',
              border: `1px solid ${darkMode ? '#334155' : '#4040F215'}`,
            }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #4040F220, #5C5CF520)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: '#4040F2' }}>{lang === 'es' ? 'RESUMEN DE DATOS' : 'DATA SUMMARY'}</div>
                  <p className="text-[13px] leading-relaxed text-slate-500">{getCaseSummary(d)}</p>
                  <div className="text-[10px] text-slate-400 mt-1 italic">{lang === 'es' ? 'Generado a partir de datos históricos agregados. No es asesoramiento legal.' : 'Generated from aggregate historical data. Not legal advice.'}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* === REPORT HEADER === */}
          <Reveal>
            <div className="h-[3px] rounded-full mb-0" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }} />
            <Card glow className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-400 tracking-[2px]">{lang === 'es' ? 'INFORME DE RESULTADOS MYCASEVALUE' : 'MYCASEVALUE OUTCOME REPORT'}</span>
                    {isPremium && <span className="text-[11px] font-bold px-2.5 py-0.5 rounded" style={{ color: '#0D9488', background: '#CCFBF1' }}>PREMIUM</span>}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ color: '#E87461', background: '#FEE2E2' }}>{lang === 'es' ? 'No es una predicción' : 'Not a prediction'}</span>
                  </div>

                  {/* MyCaseValue Score — inline badge + hidden on mobile */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap sm:hidden">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{
                      background: ccScore >= 55 ? 'linear-gradient(135deg, #0D948810, #0D948820)' : ccScore >= 35 ? 'linear-gradient(135deg, #D9770610, #D9770620)' : 'linear-gradient(135deg, #E8746110, #E8746120)',
                      border: `1px solid ${ccScore >= 55 ? '#0D948820' : ccScore >= 35 ? '#D9770620' : '#E8746120'}`,
                    }}>
                      <span className="text-[11px] font-bold tracking-[1.5px]" style={{ color: ccScore >= 55 ? '#0D9488' : ccScore >= 35 ? '#D97706' : '#E87461' }}>SCORE</span>
                      <span className="text-2xl font-display font-bold" style={{ color: ccScore >= 55 ? '#0D9488' : ccScore >= 35 ? '#D97706' : '#E87461' }}>{ccScore}</span>
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-display font-bold capitalize" style={{ letterSpacing: '-1px' }}>{spec?.d}</div>
                  <div className="text-[14px] sm:text-[15px] text-slate-500 mt-1.5">
                    {lang === 'es' ? 'Basado en' : 'Based on'} <strong className="text-slate-700"><AnimatedNumber value={d.total} /></strong> {lang === 'es' ? 'casos federales similares' : 'similar federal cases'}
                    {stateCode && circuitName && (
                      <span className="text-slate-400"> · {lang === 'es' ? 'Circuito' : 'Circuit'} {circuitName}</span>
                    )}
                  </div>

                  {/* State-specific rate if available */}
                  {stateCode && d.state_rates && d.state_rates[stateCode] && (
                    <div className="mt-2">
                      <StateWinRate stateCode={stateCode} stateRates={d.state_rates} />
                    </div>
                  )}

                  {/* Yearly trend sparkline */}
                  {d.yearly_trend && Object.keys(d.yearly_trend).length > 5 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">Win rate trend:</span>
                      <TrendSparkline data={d.yearly_trend} />
                    </div>
                  )}
                </div>

                {/* Confidence Meter + Win Rate — right column */}
                <div className="flex flex-col items-center sm:items-end gap-4">
                  {/* Animated confidence gauge — desktop only */}
                  <div className="hidden sm:block meter-glow">
                    <ConfidenceMeter score={ccScore} size={150} />
                  </div>
                  {/* Win rate */}
                  <div className="text-left sm:text-right">
                    <div className="font-display font-bold leading-none" style={{ fontSize: 48, color: wrColor, letterSpacing: '-2px' }}>
                      <AnimatedNumber value={wr} suffix="%" decimals={1} />
                    </div>
                    <div className="text-[13px] text-slate-400 mt-1">{lang === 'es' ? 'tasa histórica de éxito' : 'historical win rate'}</div>
                    {circuitSpecificRate && (
                      <div className="text-[12px] mt-1" style={{ color: '#4040F2' }}>
                        {circuitName} Circuit: {circuitSpecificRate.toFixed(1)}%
                      </div>
                    )}
                    <div className="text-[11px] text-slate-500 mt-1.5 max-w-[160px] sm:ml-auto leading-snug">
                      {Math.round(wr) > 50 ? (lang === 'es' ? 'Por encima del promedio federal' : 'Above the federal average') : Math.round(wr) > 40 ? (lang === 'es' ? 'Cerca del promedio federal' : 'Near the federal average') : (lang === 'es' ? 'Por debajo del promedio federal' : 'Below the federal average')}
                    </div>
                    <div className="flex gap-0.5 mt-2 sm:justify-end">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-4 h-1.5 rounded-full transition-all duration-500" style={{
                          background: i <= Math.ceil(wr / 20) ? wrColor : '#E2E8F0',
                          transitionDelay: `${i * 100}ms`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery ranges (premium only) */}
              {!isPremium ? (
                <div className="text-center py-6">
                  <div className="inline-block px-6 py-3 rounded-xl" style={{ background: '#F3EBDA' }}>
                    <span className="text-[14px] font-semibold" style={{ color: '#4040F2' }}>{lang === 'es' ? 'Rangos de recuperación disponibles en el informe completo' : 'Recovery ranges available in full report'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="report-grid grid gap-3 my-7" style={{ gridTemplateColumns: '1fr 1.5fr 1fr' }}>
                    {[
                      { k: 'conservative', l: lang === 'es' ? 'Rango bajo' : 'Lower range', c: '#D97706', val: v.lo },
                      { k: 'typical', l: lang === 'es' ? 'Típico' : 'Typical', c: '#4040F2', val: v.md },
                      { k: 'optimistic', l: lang === 'es' ? 'Rango alto' : 'Upper range', c: '#0D9488', val: v.hi },
                    ].map(t => (
                      <button key={t.k} onClick={() => setRangeMode(t.k)}
                        className="rounded-2xl cursor-pointer text-center transition-all duration-300"
                        style={{
                          padding: t.k === 'typical' ? '28px 20px' : '22px 18px',
                          background: '#fff',
                          border: rangeMode === t.k ? `2px solid ${t.c}40` : '1.5px solid #F1F5F9',
                          transform: rangeMode === t.k ? 'scale(1.02)' : 'scale(1)',
                        }}>
                        <div className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{ color: t.c }}>{t.l}</div>
                        <div className="font-display font-bold my-2" style={{ fontSize: t.k === 'typical' ? 44 : 32, letterSpacing: '-1px' }}>{t.val}</div>
                      </button>
                    ))}
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full">
                    <div className="absolute rounded-full opacity-25" style={{ left: '10%', right: '10%', top: 0, bottom: 0, background: 'linear-gradient(90deg, #D97706, #4040F2, #0D9488)' }} />
                    <div className="absolute top-[-6px] w-5 h-5 rounded-full bg-white transition-all duration-500"
                      style={{
                        left: rangeMode === 'conservative' ? '10%' : rangeMode === 'typical' ? '50%' : '90%',
                        border: `3px solid ${rangeMode === 'conservative' ? '#D97706' : rangeMode === 'typical' ? '#4040F2' : '#0D9488'}`,
                        transform: 'translateX(-50%)',
                        boxShadow: '0 2px 10px rgba(11,18,33,.12)',
                      }} />
                  </div>
                  <div className="text-center mt-4 text-[13px] text-slate-400">
                    {lang === 'es' ? 'Rangos agregados nacionales (en miles). Los resultados varían por jurisdicción.' : 'National aggregate ranges (in thousands). Outcomes vary by jurisdiction.'}
                  </div>
                </>
              )}

              {/* Quick stats */}
              <div className="stats-grid stagger-in grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
                <Stat value={`${Math.round(wr)}%`} label={lang === 'es' ? 'Tasa de éxito' : 'Win rate'} color={wrColor} dark={darkMode} />
                <Stat value={`${d.mo} mo`} label={lang === 'es' ? 'Duración mediana' : 'Median duration'} color={darkMode ? '#94A3B8' : '#0B1221'} dark={darkMode} />
                <Stat value={`${winSettleRate}%`} label={lang === 'es' ? 'Éxito+Acuerdo' : 'Win+Settle'} color="#0D9488" dark={darkMode} />
                <Stat value={`${d.sp}%`} label={lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate'} color="#1A2744" dark={darkMode} />
              </div>

              {/* Scenario comparison chips */}
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 tracking-[1.5px] mr-1">{lang === 'es' ? 'COMPARAR' : 'COMPARE'}</span>
                <CompareChip label={lang === 'es' ? 'Con abogado' : 'With attorney'} value={`${d.rr?.wr ?? Math.round(wr * 1.12)}%`} color="#0D9488" active={compareMode} onClick={() => setCompareMode(!compareMode)} />
                <CompareChip label={lang === 'es' ? 'Sin abogado' : 'No attorney'} value={`${d.rr?.sr ?? Math.round(wr * 0.65)}%`} color="#E87461" />
                <CompareChip label={lang === 'es' ? 'Juicio' : 'Trial'} value={`${od.trial_win}%`} color="#4040F2" />
                <CompareChip label={lang === 'es' ? 'Acuerdo' : 'Settlement'} value={`${d.sp}%`} color="#1A2744" />
              </div>

              <div className="text-[11px] text-slate-400 text-center mt-4">{UPL.disclaimer}</div>

              {/* Animated divider */}
              <div className="animated-divider my-6" />
              {/* Case Strength Breakdown — mini horizontal bars */}
              <div className="mt-2">
                <div className="text-[10px] font-bold text-slate-400 tracking-[2px] mb-3">{lang === 'es' ? 'DESGLOSE DE FORTALEZA' : 'STRENGTH BREAKDOWN'}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { label: lang === 'es' ? 'Tasa histórica de éxito' : 'Historical win rate', pct: Math.round(wr), color: wrColor },
                    { label: lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate', pct: d.sp || 0, color: '#1A2744' },
                    { label: lang === 'es' ? 'Volumen de casos' : 'Case volume', pct: Math.min(100, Math.round((d.total || 0) / 5000)), color: '#4040F2' },
                    { label: lang === 'es' ? 'Velocidad judicial' : 'Judicial speed', pct: Math.max(10, Math.min(90, 100 - (d.mo || 10) * 4)), color: '#D97706' },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 w-28 sm:w-32 truncate">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${bar.pct}%`,
                          background: bar.color,
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }} />
                      </div>
                      <span className="text-[11px] font-bold font-data w-8 text-right" style={{ color: bar.color }}>{bar.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <GoldRule />

          {/* === OUTCOME PIE CHART (always shown) === */}
          <Reveal delay={100}>
            <Card glow className="p-6 sm:p-8">
              <SectionLabel>{lang === 'es' ? 'Cómo se resolvieron casos similares' : 'How similar cases were resolved'}</SectionLabel>
              <div className="hero-grid grid gap-6" style={{ gridTemplateColumns: '200px 1fr' }}>
                <PieChart
                  segments={[
                    { pct: od.fav_set, color: '#0D9488', winRatio: 0 },
                    { pct: od.trial_win + od.trial_loss, color: '#4040F2', winRatio: od.trial_win / Math.max(od.trial_win + od.trial_loss, 1) },
                    { pct: od.dismiss, color: '#E2E8F0', winRatio: 0 },
                  ]}
                  size={200}
                />
                <div className="space-y-2">
                  {/* Favorable Settlements */}
                  <div className="p-3.5 rounded-xl outcome-card" style={{ background: '#0D948810', borderLeft: '4px solid #0D9488' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] sm:text-[16px] font-extrabold" style={{ color: '#0D9488' }}>{lang === 'es' ? 'Acuerdos favorables' : 'Settled (with payment)'}</span>
                      <span className="text-2xl sm:text-3xl font-display font-bold" style={{ color: '#0D9488' }}>{od.fav_set}%</span>
                    </div>
                    <div className="text-[12px] text-slate-400 mt-1">{lang === 'es' ? `Ambas partes acordaron una resolución, generalmente con un pago. Tiempo promedio: ${od.set_mo} meses.` : `Both sides agreed to a resolution, usually with a payment. Average time: ${od.set_mo} months.`}</div>
                  </div>
                  {/* Trial */}
                  <div className="p-3.5 rounded-xl outcome-card" style={{ background: '#4040F210', borderLeft: '4px solid #4040F2' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] sm:text-[15px] font-semibold" style={{ color: '#3730A3' }}>{lang === 'es' ? 'Resultados de juicio' : 'Went to Trial'}</span>
                      <span className="text-xl font-display font-bold">{Math.round(od.trial_win + od.trial_loss)}%</span>
                    </div>
                    <div className="flex gap-4 mt-1.5">
                      <span className="text-[13px] font-semibold" style={{ color: '#0D9488' }}>{lang === 'es' ? 'Ganó' : 'Won'}: {od.trial_win}%</span>
                      <span className="text-[13px] font-semibold" style={{ color: '#E87461' }}>{lang === 'es' ? 'Perdió' : 'Lost'}: {od.trial_loss}%</span>
                    </div>
                    {od.trial_med !== 'N/A' && <div className="text-[12px] text-slate-400 mt-1">{lang === 'es' ? `Premio mediano en juicio: ${od.trial_med}` : `Median trial award: ${od.trial_med}`}</div>}
                  </div>
                  {/* Dismissed */}
                  <div className="p-3.5 rounded-xl bg-slate-50 outcome-card" style={{ borderLeft: '4px solid #CBD5E1' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] sm:text-[15px] font-semibold text-slate-500">{lang === 'es' ? 'Desestimaciones previas al juicio' : 'Case Dismissed'}</span>
                      <span className="text-xl font-display font-bold text-slate-400">{od.dismiss}%</span>
                    </div>
                    <div className="text-[12px] text-slate-400 mt-1">{lang === 'es' ? 'El juez terminó el caso antes del juicio — generalmente por razones técnicas o de evidencia' : 'The judge ended the case before trial — often for technical or evidence reasons'}</div>
                  </div>
                </div>
              </div>
              {/* Combined rate */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 px-5 py-3.5 rounded-xl gap-2" style={{ background: '#0D948810' }}>
                <div>
                  <div className="text-[11px] font-bold tracking-[1.5px]" style={{ color: '#0D9488' }}>{lang === 'es' ? 'TASA COMBINADA DE ÉXITO + ACUERDOS FAVORABLES' : 'COMBINED WIN + FAVORABLE SETTLEMENT RATE'}</div>
                  <div className="text-[12px] text-slate-400 mt-0.5">{lang === 'es' ? 'Casos con resultado positivo para el demandante' : 'Cases with a positive outcome for the plaintiff'}</div>
                </div>
                <div className="font-display font-bold" style={{ fontSize: 48, color: '#0D9488', letterSpacing: '-1px' }}>{winSettleRate}%</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'Datos históricos agregados. No predice ningún resultado individual.' : 'Aggregate historical data. Does not predict any individual outcome.'}</div>
            </Card>
          </Reveal>

          {/* Animated section divider */}
          <div className="animated-divider my-4" />

          {/* === WHAT THIS MEANS FOR YOUR SITUATION (personalized) === */}
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden mb-3" style={{
              background: darkMode ? 'linear-gradient(135deg, #1A2744, #0F1A2E)' : 'linear-gradient(160deg, #FDFBF7 0%, #FFF8EC 40%, #FFFFFF 100%)',
              border: `1.5px solid ${darkMode ? '#334155' : 'rgba(64, 64, 242, 0.15)'}`,
              boxShadow: '0 4px 24px rgba(64, 64, 242, 0.06), 0 1px 3px rgba(11,18,33,0.03)',
            }}>
              {/* Header accent bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #4040F2, #D4B85A, #4040F2)' }} />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: 'linear-gradient(135deg, rgba(64, 64, 242, 0.12), rgba(201, 165, 78, 0.08))',
                    border: '1px solid rgba(64, 64, 242, 0.15)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: '#4040F2' }}>
                      {lang === 'es' ? 'QUÉ SIGNIFICA ESTO PARA TI' : 'WHAT THIS MEANS FOR YOUR SITUATION'}
                    </div>
                    <div className="text-[12px] text-slate-400">{lang === 'es' ? 'Basado en tus respuestas, no en una valoración de caso.' : 'Based on your answers — not a case evaluation.'}</div>
                  </div>
                </div>

                {/* Personalized narrative paragraphs */}
                <div className="space-y-4">
                  {/* Opening — personalized to their case type + win rate */}
                  <p className="text-[15px] leading-[1.75] text-slate-700" style={{ fontFamily: 'Newsreader, Georgia, serif' }}>
                    {(() => {
                      const stateName = STATES.find(s => s.id === stateCode)?.label;
                      const roundedWr = Math.round(wr);
                      if (roundedWr > 50) {
                        return lang === 'es'
                          ? `En los datos que revisamos, las personas en situaciones similares a la tuya — ${spec?.d?.toLowerCase() || 'tu tipo de caso'}${stateName ? ` en ${stateName}` : ''} — obtuvieron un resultado favorable más de la mitad de las veces. Eso es alentador, aunque cada caso es diferente.`
                          : `In the data we reviewed, people in situations similar to yours — ${spec?.d?.toLowerCase() || 'your case type'}${stateName ? ` in ${stateName}` : ''} — got a favorable result more than half the time. That's an encouraging sign, though every case is different.`;
                      } else if (roundedWr > 35) {
                        return lang === 'es'
                          ? `Los casos de ${spec?.d?.toLowerCase() || 'tu tipo de caso'}${stateName ? ` en ${stateName}` : ''} tienen resultados mixtos — una tasa de éxito del ${roundedWr}% significa que no es fácil, pero muchas personas aún obtienen resultados a través de acuerdos.`
                          : `${spec?.d || 'Your case type'} cases${stateName ? ` in ${stateName}` : ''} have mixed results — a ${roundedWr}% win rate means it's not easy, but many people still get results, especially through settlements.`;
                      } else {
                        return lang === 'es'
                          ? `Los datos muestran que los casos de ${spec?.d?.toLowerCase() || 'tu tipo'}${stateName ? ` en ${stateName}` : ''} pueden ser difíciles de ganar en juicio (${roundedWr}% de éxito). Pero eso no es todo — ${d.sp || 0}% se resolvieron con acuerdos, lo que a menudo es un mejor camino.`
                          : `The data shows that ${spec?.d?.toLowerCase() || 'your type of'} cases${stateName ? ` in ${stateName}` : ''} can be tough to win at trial (${roundedWr}% win rate). But that's not the whole picture — ${d.sp || 0}% settled, which is often a better path.`;
                      }
                    })()}
                  </p>

                  {/* Settlement insight — tied to their data */}
                  {d.sp > 25 && (
                    <div className="flex gap-3 items-start px-4 py-3.5 rounded-xl" style={{
                      background: darkMode ? 'rgba(13, 148, 136, 0.08)' : 'rgba(13, 148, 136, 0.04)',
                      borderLeft: '3px solid #0D9488',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <p className="text-[14px] leading-[1.7] text-slate-600">
                        {lang === 'es'
                          ? `El dato más importante: el ${d.sp}% de los casos como el tuyo se resolvieron con un acuerdo — sin necesidad de ir a juicio. Los acuerdos típicamente toman ${od.set_mo || '6-12'} meses y evitan la incertidumbre de un juicio.`
                          : `Here's the most important takeaway: ${d.sp}% of cases like yours settled — meaning both sides reached an agreement without going to trial. Settlements typically happen within ${od.set_mo || '6-12'} months and avoid the uncertainty of a trial.`
                        }
                      </p>
                    </div>
                  )}

                  {/* Timing-specific insight */}
                  {timing && (
                    <div className="flex gap-3 items-start px-4 py-3.5 rounded-xl" style={{
                      background: (timing === '2yr' || timing === 'old')
                        ? 'rgba(232, 116, 97, 0.05)' : 'rgba(217, 119, 6, 0.04)',
                      borderLeft: `3px solid ${(timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706'}`,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={(timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706'} strokeWidth="2" className="mt-0.5 flex-shrink-0">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <p className="text-[14px] leading-[1.7] text-slate-600">
                        {timing === 'recent'
                          ? (lang === 'es'
                            ? 'Tu situación es reciente, lo que generalmente es bueno — tienes tiempo para explorar tus opciones sin presión de plazos.'
                            : 'Your situation is recent, which is generally good — you have time to explore your options without deadline pressure.')
                          : timing === 'year'
                          ? (lang === 'es'
                            ? 'Ha pasado un tiempo desde que ocurrió esto. Aún deberías tener tiempo, pero los plazos legales avanzan — es prudente entender tus opciones pronto.'
                            : 'It\'s been a while since this happened. You likely still have time, but legal deadlines do move — it\'s smart to understand your options soon.')
                          : timing === '2yr'
                          ? (lang === 'es'
                            ? 'Según tu cronología, podrías estar acercándote al plazo de presentación. Esta es una razón para hablar con un abogado lo antes posible — incluso una consulta gratuita puede aclarar tu situación.'
                            : 'Based on your timeline, you may be approaching the filing deadline. This is a reason to talk to an attorney soon — even a free consultation can clarify where you stand.')
                          : timing === 'old'
                          ? (lang === 'es'
                            ? 'Tu cronología sugiere que el plazo típico de presentación puede haber pasado. Un abogado puede decirte si aún hay opciones — a veces hay excepciones. Una consulta rápida vale la pena.'
                            : 'Your timeline suggests the typical filing deadline may have passed. An attorney can tell you if there are still options — there are sometimes exceptions. A quick consultation is worth it.')
                          : (lang === 'es'
                            ? 'Los plazos legales varían según el tipo de caso y el estado. Un abogado puede confirmar tus plazos específicos.'
                            : 'Legal deadlines vary by case type and state. An attorney can confirm your specific deadlines.')}
                      </p>
                    </div>
                  )}

                  {/* Attorney-status-specific insight */}
                  {attorney && (
                    <div className="flex gap-3 items-start px-4 py-3.5 rounded-xl" style={{
                      background: attorney === 'have' ? 'rgba(13, 148, 136, 0.04)' : 'rgba(37, 99, 235, 0.04)',
                      borderLeft: `3px solid ${attorney === 'have' ? '#0D9488' : '#1A2744'}`,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={attorney === 'have' ? '#0D9488' : '#1A2744'} strokeWidth="2" className="mt-0.5 flex-shrink-0">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <p className="text-[14px] leading-[1.7] text-slate-600">
                        {attorney === 'have'
                          ? (lang === 'es'
                            ? `Ya que tienes abogado, este informe puede darles contexto útil. Los abogados en casos de ${spec?.d?.toLowerCase() || 'este tipo'} ganaron ${d.rr?.wr ?? Math.round(wr * 1.12)}% de las veces — significativamente más que quienes se representaron solos.`
                            : `Since you already have an attorney, this report can give them useful context. Attorneys in ${spec?.d?.toLowerCase() || 'this type of'} cases won ${d.rr?.wr ?? Math.round(wr * 1.12)}% of the time — significantly better than people who represented themselves.`)
                          : attorney === 'looking'
                          ? (lang === 'es'
                            ? `Buscar un abogado es una buena decisión. En casos similares, las personas con abogado ganaron ${d.rr?.wr ?? Math.round(wr * 1.12)}% de las veces, comparado con ${d.ps?.wr ?? Math.round(wr * 0.65)}% sin abogado. Muchos ofrecen consultas iniciales gratuitas.`
                            : `Looking for an attorney is a solid move. In similar cases, people with lawyers won ${d.rr?.wr ?? Math.round(wr * 1.12)}% of the time vs. ${d.ps?.wr ?? Math.round(wr * 0.65)}% without one. Many offer free initial consultations.`)
                          : attorney === 'self'
                          ? (lang === 'es'
                            ? `Manejar tu caso solo es tu derecho, pero los datos muestran una diferencia significativa: ${d.rr?.wr ?? Math.round(wr * 1.12)}% de éxito con abogado vs. ${d.ps?.wr ?? Math.round(wr * 0.65)}% sin uno. Incluso una consulta gratuita podría ayudarte a decidir si necesitas representación.`
                            : `Handling your case yourself is your right, but the data shows a meaningful gap: ${d.rr?.wr ?? Math.round(wr * 1.12)}% win rate with a lawyer vs. ${d.ps?.wr ?? Math.round(wr * 0.65)}% without. Even a free consultation could help you decide if representation is right for you.`)
                          : (lang === 'es'
                            ? `Si no estás seguro sobre tener un abogado, aquí hay algo a considerar: los datos muestran que la representación legal aumenta la tasa de éxito del ${d.ps?.wr ?? Math.round(wr * 0.65)}% al ${d.rr?.wr ?? Math.round(wr * 1.12)}%. Muchos abogados ofrecen consultas iniciales gratuitas.`
                            : `If you're undecided about getting a lawyer, here's something to consider: the data shows that legal representation increases success rates from ${d.ps?.wr ?? Math.round(wr * 0.65)}% to ${d.rr?.wr ?? Math.round(wr * 1.12)}%. Many attorneys offer free initial consultations.`)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${darkMode ? '#1E293B' : 'rgba(64, 64, 242, 0.1)'}` }}>
                  <div className="text-[11px] text-slate-400 italic leading-relaxed">
                    {lang === 'es'
                      ? 'Esta interpretación se basa en datos agregados de casos similares. No es una predicción ni constituye asesoramiento legal. Cada caso es único — consulta con un abogado para asesoramiento sobre tu situación específica.'
                      : 'This interpretation is based on aggregate data from similar cases. It is not a prediction and does not constitute legal advice. Every case is unique — consult with an attorney for guidance on your specific situation.'}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Animated section divider */}
          <div className="animated-divider my-4" />

          {/* === YOUR NEXT STEPS (personalized) === */}
          <Reveal delay={160}>
            <Card className="p-0 overflow-hidden">
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1), rgba(13, 148, 136, 0.05))',
                    border: '1px solid rgba(13, 148, 136, 0.12)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: '#0D9488' }}>
                      {lang === 'es' ? 'TUS PRÓXIMOS PASOS' : 'YOUR NEXT STEPS'}
                    </div>
                    <div className="text-[12px] text-slate-400">{lang === 'es' ? 'Según tu situación. No es asesoramiento legal.' : 'Based on your situation. Not legal advice.'}</div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="space-y-0">
                  {/* Step 1: Always — save your report */}
                  <div className="flex gap-4 items-start pb-5 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #14B8A6)' }}>1</div>
                      <div className="w-px flex-1 mt-2" style={{ background: darkMode ? '#334155' : '#E2E8F0' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>{lang === 'es' ? 'Guarda este informe' : 'Save this report'}</div>
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {lang === 'es'
                          ? 'Guárdalo o compártelo para que puedas consultarlo más tarde o mostrárselo a un abogado.'
                          : 'Bookmark or save it so you can reference the data later or share it during a consultation.'}
                      </p>
                      <div className="flex gap-2 mt-2.5">
                        <button onClick={saveReport} className="text-[12px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-[1.02]" style={{
                          background: 'rgba(13, 148, 136, 0.08)',
                          color: '#0D9488',
                          border: '1px solid rgba(13, 148, 136, 0.15)',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                          {lang === 'es' ? 'Guardar' : 'Save report'}
                        </button>
                        <button onClick={() => {
                          try {
                            const u = window.location.origin + '#' + btoa(JSON.stringify({ c: spec?.nos, s: stateCode, t: timing }));
                            navigator.clipboard.writeText(u);
                            toast('Link copied!');
                          } catch { toast('Could not copy'); }
                        }} className="text-[12px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-[1.02]" style={{
                          background: 'rgba(37, 99, 235, 0.06)',
                          color: '#1A2744',
                          border: '1px solid rgba(37, 99, 235, 0.12)',
                        }}>
                          {lang === 'es' ? 'Copiar enlace' : 'Copy link'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Attorney-specific */}
                  <div className="flex gap-4 items-start pb-5 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>2</div>
                      <div className="w-px flex-1 mt-2" style={{ background: darkMode ? '#334155' : '#E2E8F0' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>
                        {attorney === 'have'
                          ? (lang === 'es' ? 'Comparte los datos con tu abogado' : 'Share the data with your attorney')
                          : attorney === 'self'
                          ? (lang === 'es' ? 'Considera una consulta gratuita' : 'Consider a free consultation')
                          : (lang === 'es' ? 'Habla con un abogado' : 'Talk to an attorney')}
                      </div>
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {attorney === 'have'
                          ? (lang === 'es'
                            ? 'Este informe les da a ambos una base de datos para planificar. Puede ser útil para discutir qué esperar según los resultados históricos.'
                            : 'This report gives you both a data baseline to plan around. It can be useful for discussing what to expect based on historical outcomes.')
                          : attorney === 'self'
                          ? (lang === 'es'
                            ? `Los datos muestran una diferencia significativa cuando hay un abogado involucrado. Incluso si decides manejar tu caso solo, una consulta gratuita de 15 minutos puede ayudarte a entender lo que enfrentas.`
                            : `The data shows a meaningful difference when an attorney is involved. Even if you decide to handle things yourself, a free 15-minute consultation can help you understand what you're facing.`)
                          : (lang === 'es'
                            ? 'La mayoría de abogados en este tipo de caso ofrecen consultas iniciales gratuitas. No te comprometes a nada — solo obtienes una opinión profesional sobre tu situación.'
                            : 'Most attorneys for this type of case offer free initial consultations. You\'re not committing to anything — you\'re just getting a professional opinion on your situation.')}
                      </p>
                      {attorney !== 'have' && (
                        <button onClick={() => { try { window.open('https://www.google.com/search?q=' + encodeURIComponent((spec?.d || 'attorney') + ' attorney free consultation ' + (stateCode || '')), '_blank'); } catch {} }}
                          className="mt-2.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-[1.02]" style={{
                            background: 'rgba(64, 64, 242, 0.08)',
                            color: '#4040F2',
                            border: '1px solid rgba(64, 64, 242, 0.15)',
                          }}>
                          {lang === 'es' ? 'Buscar abogados con consulta gratuita' : 'Find attorneys with free consultations'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Timing-dependent */}
                  <div className="flex gap-4 items-start pb-5 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold" style={{
                        background: (timing === '2yr' || timing === 'old') ? 'linear-gradient(135deg, #E87461, #F09483)' : 'linear-gradient(135deg, #4040F2, #5C5CF5)',
                        color: 'white',
                      }}>3</div>
                      <div className="w-px flex-1 mt-2" style={{ background: darkMode ? '#334155' : '#E2E8F0' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>
                        {(timing === '2yr' || timing === 'old')
                          ? (lang === 'es' ? 'Actúa sobre los plazos ahora' : 'Act on deadlines now')
                          : (lang === 'es' ? 'Conoce tus plazos' : 'Know your deadlines')}
                      </div>
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {(timing === '2yr' || timing === 'old')
                          ? (lang === 'es'
                            ? `El plazo general de presentación para ${spec?.d?.toLowerCase() || 'tu tipo de caso'} es ${d.sol || '2 años'}. Según tu cronología, este plazo podría estar cerca o ya pasado. Esto debería ser tu prioridad #1.`
                            : `The general filing deadline for ${spec?.d?.toLowerCase() || 'your case type'} is ${d.sol || '2 years'}. Based on your timeline, this deadline may be close or already passed. This should be your #1 priority.`)
                          : (lang === 'es'
                            ? `El plazo general de presentación es ${d.sol || '2 años'}. Aunque no es urgente, es bueno tenerlo en mente — los plazos legales son estrictos y usualmente no se pueden extender.`
                            : `The general filing deadline is ${d.sol || '2 years'}. While you're not under immediate pressure, keep this in mind — legal deadlines are strict and usually can't be extended.`)}
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Gather documentation */}
                  <div className="flex gap-4 items-start relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #64748B, #94A3B8)' }}>4</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: darkMode ? '#E2E8F0' : '#1E293B' }}>{lang === 'es' ? 'Reúne tu documentación' : 'Gather your documentation'}</div>
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {lang === 'es'
                          ? 'Reúne cualquier documento, correo electrónico, foto o registro relevante. Si consultas a un abogado, esto hará que la conversación sea más productiva.'
                          : 'Collect any relevant documents, emails, photos, or records. If you consult with an attorney, this will make the conversation more productive.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom disclaimer */}
              <div className="px-6 sm:px-8 py-3.5" style={{ background: darkMode ? '#0B1221' : '#F8FAFC', borderTop: `1px solid ${darkMode ? '#1E293B' : '#F1F5F9'}` }}>
                <div className="text-[11px] text-slate-400 italic leading-relaxed">
                  {lang === 'es'
                    ? 'Estos pasos son sugerencias generales basadas en datos agregados. No constituyen asesoramiento legal. Consulta con un abogado licenciado antes de tomar decisiones legales.'
                    : 'These steps are general suggestions based on aggregate data. They do not constitute legal advice. Consult a licensed attorney before making legal decisions.'}
                </div>
              </div>
            </Card>
          </Reveal>

          <GoldRule />

          {/* === FREE REPORT — ENHANCED SECTIONS === */}
          {!isPremium && (
            <>
              {/* Attorney vs Self-Represented — Enhanced */}
              <Reveal delay={150}>
                <Card className="p-6">
                  <SectionLabel>{lang === 'es' ? '¿Importa tener abogado?' : 'Does having a lawyer matter?'}</SectionLabel>
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: '#CCFBF1' }}>
                      <div className="text-[10px] font-bold tracking-[1px] mb-1" style={{ color: '#0D9488' }}>{lang === 'es' ? 'CON ABOGADO' : 'WITH ATTORNEY'}</div>
                      <div className="text-2xl font-display font-bold">{d.rr?.wr ?? '--'}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                    </div>
                    <div className="flex items-center text-slate-300 font-bold text-lg">vs</div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: '#FEF3C7' }}>
                      <div className="text-[10px] font-bold tracking-[1px] mb-1" style={{ color: '#D97706' }}>{lang === 'es' ? 'SIN ABOGADO' : 'SELF-REPRESENTED'}</div>
                      <div className="text-2xl font-display font-bold">{d.ps?.wr ?? '--'}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                    </div>
                  </div>
                  {d.rr?.wr && d.ps?.wr && (
                    <div className="px-4 py-2.5 rounded-xl text-[13px] font-medium" style={{ background: '#F3EBDA', color: '#4040F2' }}>
                      {lang === 'es'
                        ? `Las personas con abogado ganaron ${Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100)}% más a menudo en casos similares.`
                        : `People with attorneys won ${Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100)}% more often in similar cases.`}
                    </div>
                  )}
                  <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Datos históricos agregados. No es una recomendación.' : 'Aggregate historical data. Not a recommendation.'}</div>
                </Card>
              </Reveal>

              {/* Quick explainer: What do these numbers mean? */}
              <Reveal delay={180}>
                <Card className="p-6">
                  <SectionLabel>{lang === 'es' ? '¿Qué significan estos números?' : 'What do these numbers actually mean?'}</SectionLabel>
                  <div className="space-y-3">
                    {[
                      {
                        q: lang === 'es' ? `¿${Math.round(wr)}% de éxito es bueno o malo?` : `Is a ${Math.round(wr)}% win rate good or bad?`,
                        a: Math.round(wr) > 50
                          ? (lang === 'es' ? `Es superior al promedio federal (38%). Esto significa que más de la mitad de las personas en situaciones similares obtuvieron un resultado favorable.` : `It's above the federal average (38%). This means more than half of people in similar situations got a favorable outcome.`)
                          : Math.round(wr) > 35
                          ? (lang === 'es' ? `Es cercano al promedio federal (38%). Muchos casos con este perfil aún se resolvieron favorablemente.` : `It's near the federal average (38%). Many cases with this profile still resolved favorably — especially through settlement.`)
                          : (lang === 'es' ? `Es inferior al promedio federal (38%). Esto no significa que tu caso sea débil — significa que este tipo de caso tiende a ser más difícil de ganar en juicio. Muchos aún se resuelven con acuerdos.` : `It's below the federal average (38%). This doesn't mean your case is weak — it means this type of case tends to be harder to win at trial. Many still resolve through settlement.`),
                        color: wrColor,
                      },
                      {
                        q: lang === 'es' ? `¿${d.mo} meses es mucho tiempo?` : `Is ${d.mo} months a long time?`,
                        a: (d.mo || 10) > 12
                          ? (lang === 'es' ? `Es más largo que el promedio (8-10 meses). Los casos más complejos tienden a tomar más tiempo, pero los acuerdos pueden acortar el proceso.` : `It's longer than average (8-10 months). More complex cases tend to take longer, but settlements can shorten the process significantly.`)
                          : (lang === 'es' ? `Está dentro del rango típico. La mayoría de los casos se resuelven entre 6 y 12 meses.` : `It's within the typical range. Most cases resolve between 6-12 months from filing.`),
                        color: '#1A2744',
                      },
                      {
                        q: lang === 'es' ? '¿Qué significa la tasa de acuerdos?' : 'What does the settlement rate tell me?',
                        a: lang === 'es'
                          ? `El ${d.sp}% de casos similares se resolvieron mediante acuerdo — ambas partes negociaron un resultado sin ir a juicio. Los acuerdos suelen ser más rápidos y menos riesgosos que un juicio.`
                          : `${d.sp}% of similar cases settled — meaning both sides negotiated an outcome without going to trial. Settlements tend to be faster and less risky than going to trial.`,
                        color: '#4040F2',
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-3.5 rounded-xl" style={{ background: `${item.color}06`, borderLeft: `3px solid ${item.color}` }}>
                        <div className="text-[13px] font-semibold mb-1">{item.q}</div>
                        <div className="text-[12px] text-slate-500 leading-relaxed">{item.a}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* Plain English Summary */}
              <Reveal delay={200}>
                <PlainEnglishSummary text={getCaseSummary(d)} lang={lang} />
              </Reveal>

              {/* Did You Know? */}
              <Reveal delay={210}>
                <DidYouKnowFacts caseType={spec?.d} lang={lang} />
              </Reveal>

              {/* What People Did Next */}
              <Reveal delay={215}>
                <Card className="p-6">
                  <SectionLabel>{lang === 'es' ? 'Qué hizo la gente después' : 'What people did next'}</SectionLabel>
                  <WhatPeopleDid lang={lang} />
                </Card>
              </Reveal>

              {/* How Your Case Compares */}
              <Reveal delay={217}>
                <CaseComparisonScale winRate={wr} lang={lang} />
              </Reveal>

              {/* Deadline — Enhanced */}
              <Reveal delay={220}>
                <div className="rounded-2xl p-5 mb-3" style={{
                  background: (timing === '2yr' || timing === 'old') ? '#FEE2E2' : '#FEF3C7',
                  border: `1px solid ${(timing === '2yr' || timing === 'old') ? '#E8746120' : '#D9770620'}`,
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={(timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706'} strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <div className="text-[11px] font-bold tracking-[1.5px]" style={{ color: (timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706' }}>
                      {lang === 'es' ? 'PLAZO GENERAL DE PRESENTACIÓN' : 'GENERAL FILING DEADLINE'}
                    </div>
                  </div>
                  <div className="text-base font-semibold">{d.sol}</div>
                  {(timing === '2yr' || timing === 'old') && (
                    <div className="text-[13px] mt-2 font-medium" style={{ color: '#DC2626' }}>{lang === 'es' ? 'Según tu cronología, este plazo puede haber pasado. Consulta con un abogado de inmediato.' : 'Based on your timeline, this deadline may have passed. Consult an attorney immediately.'}</div>
                  )}
                  <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Plazo general. Solo un abogado puede determinar tu plazo específico.' : 'General deadline. Only an attorney can determine your specific deadline.'}</div>
                </div>
              </Reveal>

              {/* Yearly trend context (free) */}
              {d.yearly_trend && Object.keys(d.yearly_trend).length > 5 && (
                <Reveal delay={240}>
                  <Card className="p-5">
                    <SectionLabel>{lang === 'es' ? 'Tendencia a lo largo del tiempo' : 'Trend over time'}</SectionLabel>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendSparkline data={d.yearly_trend} width={200} height={48} />
                      <div className="text-[12px] text-slate-500">{lang === 'es' ? 'Evolución de la tasa de éxito en este tipo de caso a lo largo de los años.' : 'How the win rate for this case type has changed over the years.'}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 italic">{lang === 'es' ? 'Datos agregados. Las tendencias individuales pueden variar.' : 'Aggregate data. Individual outcomes may vary.'}</div>
                  </Card>
                </Reveal>
              )}

              {/* Key Takeaways */}
              <Reveal delay={250}>
                <Card className="p-6 bg-gradient-to-br" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,.04) 0%, rgba(64,64,242,.02) 100%)' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#CCFBF1' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Puntos clave' : 'Key Takeaways'}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>, text: lang === 'es' ? `Tu tipo de caso tiene una tasa de éxito del ${wr}%.` : `Cases like yours have a ${wr}% success rate.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, text: lang === 'es' ? `El ${winSettleRate}% de los casos se resuelven con un acuerdo.` : `${winSettleRate}% of cases settle with a payout.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: lang === 'es' ? `El tiempo promedio hasta una resolución es ${od.set_mo || '6-12'} meses.` : `Average time to resolution: ${od.set_mo || '6-12'} months.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text: lang === 'es' ? 'Los abogados aumentan las probabilidades de éxito significativamente.' : 'Having an attorney significantly improves your chances.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/50">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0F2FF' }}>{item.icon}</span>
                        <span className="text-[14px] text-slate-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* Similar Cases Snapshot (first 2, rest blurred for free users) */}
              <Reveal delay={260}>
                <Card className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#FEF3C7' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Casos similares' : 'Similar Cases'}</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { outcome: lang === 'es' ? 'Acuerdo de $52K' : 'Settlement: $52K', time: '7 months', desc: lang === 'es' ? 'Caso de discriminación similar, con pruebas sólidas' : 'Similar discrimination case, strong evidence' },
                      { outcome: lang === 'es' ? 'Acuerdo de $38K' : 'Settlement: $38K', time: '9 months', desc: lang === 'es' ? 'Situación comparable, resuelta en acuerdo' : 'Comparable situation, settled before trial' },
                    ].map((item, i) => (
                      <div key={i} className="p-3.5 rounded-lg border transition-colors" style={{ borderColor: darkMode ? '#334155' : '#E2E8F0', background: darkMode ? '#1E293B' : '#fff' }}>
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="font-semibold text-[14px]" style={{ color: '#0D9488' }}>{item.outcome}</div>
                          <div className="text-[11px] font-medium text-slate-400">{lang === 'es' ? item.time.replace('months', 'meses') : item.time}</div>
                        </div>
                        <div className="text-[13px]" style={{ color: darkMode ? '#94A3B8' : '#475569' }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* What-If Scenarios - Interactive toggle */}
              <Reveal delay={270}>
                <Card className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A2744" strokeWidth="2"><path d="M9.5 1h5v22h-5z"/><path d="M4 12h16" stroke="#1A2744"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Escenarios de qué pasaría' : 'What-If Scenarios'}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all border-[1.5px]" style={{ borderColor: attorney === 'with' ? '#4040F2' : '#E2E8F0', background: attorney === 'with' ? '#F3EBDA' : '#F8FAFC', color: attorney === 'with' ? '#4040F2' : '#64748B' }}
                      onClick={() => setAttorney('with')}>
                      {lang === 'es' ? 'Con abogado' : 'With Attorney'}
                    </button>
                    <button className="px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all border-[1.5px]" style={{ borderColor: attorney === 'without' ? '#4040F2' : '#E2E8F0', background: attorney === 'without' ? '#F3EBDA' : '#F8FAFC', color: attorney === 'without' ? '#4040F2' : '#64748B' }}
                      onClick={() => setAttorney('without')}>
                      {lang === 'es' ? 'Sin abogado' : 'Self-Represented'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg text-center" style={{ background: darkMode ? '#1E293B' : '#F8FAFC' }}>
                      <div className="text-[11px] font-bold text-slate-400 tracking-[1px] mb-2 uppercase">{lang === 'es' ? 'Probabilidad de éxito' : 'Win Rate'}</div>
                      <div className="text-3xl font-display font-bold" style={{ color: attorney === 'with' ? '#0D9488' : '#D97706' }}>
                        {attorney === 'with' ? '41%' : '12%'}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg text-center" style={{ background: darkMode ? '#1E293B' : '#F8FAFC' }}>
                      <div className="text-[11px] font-bold text-slate-400 tracking-[1px] mb-2 uppercase">{lang === 'es' ? 'Cambio en potencial' : 'Improvement'}</div>
                      <div className="text-3xl font-display font-bold" style={{ color: '#1A2744' }}>
                        +29%
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>

              {/* Locked previews */}
              <Reveal delay={280}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Desbloquear datos de recuperación — $5.99' : 'Unlock recovery data — $5.99'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-3">{lang === 'es' ? '¿Cuánto recuperaron personas en situaciones similares?' : 'What did people in similar situations recover?'}</div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: lang === 'es' ? 'Rango bajo' : 'Lower range', v: '$??K', c: '#D97706' },
                        { label: lang === 'es' ? 'Típico' : 'Typical', v: '$??K', c: '#4040F2' },
                        { label: lang === 'es' ? 'Rango alto' : 'Upper range', v: '$??K', c: '#0D9488' },
                      ].map((x, i) => (
                        <div key={i} className="p-4 rounded-xl text-center bg-slate-50">
                          <div className="text-[10px] font-bold tracking-[1px] mb-1" style={{ color: x.c }}>{x.label}</div>
                          <div className="text-2xl font-display font-bold">{x.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              <Reveal delay={300}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Desbloquear informe completo' : 'Unlock full report'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-3">{lang === 'es' ? 'Tu informe premium incluye:' : 'Your premium report includes:'}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { f: lang === 'es' ? 'Rangos de recuperación' : 'Recovery ranges', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
                        { f: lang === 'es' ? 'Distribución de montos' : 'Recovery distribution', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
                        { f: lang === 'es' ? 'Impacto del abogado' : 'Attorney impact', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                        { f: lang === 'es' ? 'Cronología del caso' : 'Case timeline', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                        { f: lang === 'es' ? 'Casos comparables' : 'Comparable cases', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
                        { f: lang === 'es' ? 'Calendario de acuerdos' : 'Settlement timing', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                        { f: lang === 'es' ? 'Factores citados' : 'Factors courts cited', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
                        { f: lang === 'es' ? 'Pasos a seguir' : 'Action steps', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 rounded-lg text-sm flex items-center gap-2" style={{ background: '#F8FAFF' }}>
                          <span className="flex-shrink-0">{item.icon}</span> {item.f}
                        </div>
                      ))}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              {/* Premium locked section: Case Strength Score Breakdown */}
              <Reveal delay={310}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Desbloquear análisis completo' : 'Unlock full analysis'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Desglose de la fortaleza de tu caso' : 'Your case strength score breakdown'}</div>
                    <div className="flex items-center justify-center mb-4">
                      <svg width="150" height="150" viewBox="0 0 150 150">
                        <circle cx="75" cy="75" r="65" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                        <circle cx="75" cy="75" r="65" fill="none" stroke="#4040F2" strokeWidth="12" strokeDasharray="200" strokeDashoffset="80" strokeLinecap="round" />
                        <text x="75" y="75" textAnchor="middle" dy="0.3em" fontSize="32" fontWeight="800" fill="#4040F2">68</text>
                        <text x="75" y="95" textAnchor="middle" fontSize="14" fill="#64748B">{lang === 'es' ? 'Total' : 'Overall'}</text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: lang === 'es' ? 'Tasa de éxito histórica' : 'Historical win rate', value: '38%', weight: '40%' },
                        { label: lang === 'es' ? 'Factores de fuerza' : 'Strength factors', value: '7/10', weight: '35%' },
                        { label: lang === 'es' ? 'Factores de riesgo' : 'Risk factors', value: '3/10', weight: '25%' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-bold">{item.value} <span className="text-slate-400">({item.weight})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              {/* Premium locked section: Predicted Timeline */}
              <Reveal delay={320}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Ver cronograma predicho' : 'View predicted timeline'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Cronograma predicho para tu caso' : 'Predicted timeline for your case'}</div>
                    <div className="space-y-2">
                      {[
                        { phase: lang === 'es' ? 'Presentación a descubrimiento' : 'Filing to discovery', duration: '3-6 mo' },
                        { phase: lang === 'es' ? 'Negociación' : 'Settlement negotiation', duration: '3-8 mo' },
                        { phase: lang === 'es' ? 'Resolución' : 'Resolution', duration: '1-3 mo' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded">
                          <span className="text-slate-600">{item.phase}</span>
                          <span className="font-bold font-data">{item.duration}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                      {lang === 'es' ? 'Estimación basada en casos similares. Puede variar significativamente.' : 'Estimate based on similar cases. May vary significantly.'}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              {/* Premium locked section: Recovery Calculator */}
              <Reveal delay={330}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Ver calculadora de recuperación' : 'View recovery calculator'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Calculadora de recuperación esperada' : 'Expected recovery calculator'}</div>
                    <div className="space-y-2.5">
                      {[
                        { scenario: lang === 'es' ? 'Escenario bajo' : 'Low scenario', amount: '$15K - $28K' },
                        { scenario: lang === 'es' ? 'Escenario típico' : 'Typical scenario', amount: '$35K - $65K' },
                        { scenario: lang === 'es' ? 'Escenario alto' : 'High scenario', amount: '$75K - $140K' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r rounded-lg" style={{ background: i === 1 ? 'linear-gradient(135deg, #F3EBDA, #FEF9F0)' : '#F8FAFC' }}>
                          <span className={`text-sm font-medium ${i === 1 ? 'font-semibold' : ''}`}>{item.scenario}</span>
                          <span className="font-display font-bold" style={{ color: i === 0 ? '#D97706' : i === 1 ? '#4040F2' : '#0D9488' }}>{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              {/* Premium locked section: Judge & Jurisdiction Analysis */}
              <Reveal delay={340}>
                <LockedPreview onUnlock={() => setShowPricing(true)} label={lang === 'es' ? 'Ver análisis de jurisdicción' : 'View jurisdiction analysis'}>
                  <div className="rounded-2xl p-6 border border-slate-100">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Análisis de juez y jurisdicción' : 'Judge & jurisdiction analysis'}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { metric: lang === 'es' ? 'Tasa del distrito' : 'District rate', value: '39%' },
                        { metric: lang === 'es' ? 'Jueces favorables' : 'Favorable judges', value: '7/12' },
                        { metric: lang === 'es' ? 'Tipo de demanda común' : 'Most common case type', value: lang === 'es' ? 'Empleo' : 'Employment' },
                        { metric: lang === 'es' ? 'Tiempo promedio' : 'Avg. duration', value: '10.2 mo' },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 bg-slate-50 rounded text-center">
                          <div className="text-[10px] text-slate-500">{item.metric}</div>
                          <div className="text-sm font-bold mt-1">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </LockedPreview>
              </Reveal>

              {/* CTA */}
              <Reveal delay={360}>
                <div className="rounded-2xl p-6 sm:p-9 text-center card-bg bg-white border-[1.5px] shadow-md" style={{ borderColor: '#4040F215', animation: 'pulseGlow 4s ease infinite' }}>
                  <div className="text-2xl sm:text-3xl font-display font-bold mb-2">{lang === 'es' ? '¿Cuánto podría valer tu situación?' : 'What could your situation be worth?'}</div>
                  <p className="text-[15px] text-slate-500 max-w-md mx-auto mb-2 leading-relaxed">
                    {lang === 'es' ? 'Tu informe gratuito muestra la tasa de éxito, cómo terminaron los casos y el plazo. El informe completo agrega rangos de recuperación, resultados comparables, impacto del abogado, cronología y más.' : 'Your free report shows the win rate, how cases ended, and deadline. The full report adds recovery ranges, comparable outcomes, attorney impact, timeline, and more.'}
                  </p>
                  <p className="text-[13px] text-slate-400 mb-6">{lang === 'es' ? 'Datos históricos agregados únicamente. No es una valoración de caso.' : 'Aggregate historical data only. Not a case valuation.'}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => buy('single')} className="px-8 py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                      {lang === 'es' ? '$5.99 — Informe completo' : '$5.99 — Full report'}
                    </button>
                    <button onClick={() => setShowPricing(true)} className="px-7 py-3.5 text-[15px] font-medium card-bg bg-white border-[1.5px] border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                      {lang === 'es' ? '$9.99 — Ilimitado' : '$9.99 — Unlimited'}
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Legal Aid */}
              {stateCode && LEGAL_AID[stateCode] && (
                <Reveal delay={380}>
                  <Card className="p-5">
                    <details>
                      <summary className="text-sm font-semibold cursor-pointer">{lang === 'es' ? `Servicios legales gratuitos y de bajo costo en ${STATES.find(s => s.id === stateCode)?.label || stateCode}` : `Free and low-cost legal services in ${STATES.find(s => s.id === stateCode)?.label || stateCode}`}</summary>
                      <div className="mt-3 text-[13px] text-slate-500 leading-relaxed">
                        <div className="text-[11px] font-bold text-slate-400 tracking-widest mb-2">{lang === 'es' ? 'ASISTENCIA LEGAL ESTATAL Y SIN FINES DE LUCRO' : 'STATE-FUNDED AND NONPROFIT LEGAL AID'}</div>
                        {LEGAL_AID[stateCode]}
                        <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'MyCaseValue no está afiliado ni respalda a ninguna organización.' : 'MyCaseValue is not affiliated with and does not endorse any organization.'}</div>
                      </div>
                    </details>
                  </Card>
                </Reveal>
              )}

              {/* Attorney CTA */}
              <Reveal delay={400}>
                <Card className="p-6">
                  <div className="text-xl font-display font-bold mb-1.5" style={{ color: '#4040F2' }}>{lang === 'es' ? 'Lo que muchas personas hacen después' : 'What many people do next'}</div>
                  <p className="text-[14px] text-slate-500 leading-relaxed mb-3">
                    {lang === 'es' ? 'Muchas personas usan estos datos antes de consultar con un abogado. La mayoría ofrece consultas iniciales gratuitas. MyCaseValue no evalúa reclamos, no recomienda abogados ni proporciona referencias.' : 'Many people use this data before consulting with an attorney. Most offer free initial consultations. MyCaseValue does not evaluate claims, recommend attorneys, or provide referrals.'}
                  </p>
                  <button onClick={() => { try { window.open('https://www.google.com/search?q=' + encodeURIComponent((spec?.d || 'attorney') + ' attorney ' + (stateCode || '')), '_blank'); } catch {} }}
                    className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    {lang === 'es' ? 'Buscar abogados en tu área' : 'Search for attorneys in your area'}
                  </button>
                </Card>
              </Reveal>
            </>
          )}

          {/* === PREMIUM SECTIONS === */}
          {isPremium && (
            <div className="space-y-3">
              {/* Resolution breakdown */}
              <Reveal delay={100}>
                <Collapsible title={lang === 'es' ? `Cómo terminaron ${d.total?.toLocaleString() || ''} casos similares` : `How ${d.total?.toLocaleString() || ''} similar cases ended`} badge={lang === 'es' ? `${(d.ends || []).length} formas` : `${(d.ends || []).length} ways`} defaultOpen>
                  <div className="flex gap-5 items-center mb-4">
                    <div className="w-28 h-28 rounded-full border-4 border-slate-50 flex items-center justify-center flex-shrink-0" style={{ background: '#F8FAF7' }}>
                      <PieChart segments={(d.ends || []).slice(0, 6).map((e: any) => ({ pct: e.p, color: e.c }))} size={100} strokeWidth={8} />
                    </div>
                    <div className="flex-1">
                      {(d.ends || []).slice(0, 3).map((e: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: e.c }} />
                          <span className="text-sm flex-1">{e.l}</span>
                          <span className="text-sm font-bold font-data">{e.p}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {(d.ends || []).map((e: any, i: number) => (
                    <BarLine key={i} label={e.l} pct={e.p} max={maxEnd} color={e.c} delay={i * 50} />
                  ))}
                </Collapsible>
              </Reveal>

              {/* Recovery distribution */}
              <Reveal delay={160}>
                <Collapsible title={lang === 'es' ? 'Distribución de recuperación' : 'Recovery distribution'}>
                  {(d.money || []).map((m: any, i: number) => (
                    <BarLine key={i} label={m.l} pct={m.p} max={maxMoney}
                      color={['#CBD5E1', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46'][Math.min(m.t, 6)]}
                      delay={i * 50} />
                  ))}
                </Collapsible>
              </Reveal>

              {/* Attorney impact */}
              <Reveal delay={220}>
                <Card>
                  <SectionLabel>{lang === 'es' ? '¿Ayuda tener abogado?' : 'Does having a lawyer help?'}</SectionLabel>
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: darkMode ? 'rgba(13,148,136,0.15)' : '#CCFBF1' }}>
                      <div className="text-[10px] font-bold" style={{ color: '#0D9488' }}>{lang === 'es' ? 'CON ABOGADO' : 'WITH ATTORNEY'}</div>
                      <div className="text-3xl font-display font-bold mt-1">{d.rr?.wr ?? '--'}%</div>
                      {d.rr?.total && <div className="text-[11px] text-slate-400 mt-1">{d.rr.total.toLocaleString()} cases</div>}
                    </div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: darkMode ? 'rgba(217,119,6,0.15)' : '#FEF3C7' }}>
                      <div className="text-[10px] font-bold" style={{ color: '#D97706' }}>{lang === 'es' ? 'SIN ABOGADO' : 'SELF-REPRESENTED'}</div>
                      <div className="text-3xl font-display font-bold mt-1">{d.ps?.wr ?? '--'}%</div>
                      {d.ps?.total && <div className="text-[11px] text-slate-400 mt-1">{d.ps.total.toLocaleString()} cases</div>}
                    </div>
                  </div>
                  <div className="px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: darkMode ? 'rgba(64,64,242,0.15)' : '#F3EBDA', color: '#4040F2' }}>
                    {lang === 'es' ? <span>Los abogados ganaron <strong>{d.rr && d.ps ? Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100) : 0}% más a menudo</strong>. Honorario: {d.af}.</span> : <span>Attorneys won <strong>{d.rr && d.ps ? Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100) : 0}% more often</strong>. Fee: {d.af}.</span>}
                  </div>
                  {spec && FEE_INFO[spec.nos] && (
                    <details className="mt-2">
                      <summary className="text-[12px] cursor-pointer" style={{ color: '#4040F2' }}>{lang === 'es' ? '¿Cómo cobran los abogados por esto?' : 'How do attorneys charge for this?'}</summary>
                      <div className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                        {FEE_INFO[spec.nos]}
                        <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Información general. Los honorarios varían. MyCaseValue no recomienda abogados.' : 'General info. Fees vary. MyCaseValue does not recommend any attorney.'}</div>
                      </div>
                    </details>
                  )}
                </Card>
              </Reveal>

              {/* State heatmap */}
              {d.state_rates && Object.keys(d.state_rates).length > 5 && (
                <Reveal delay={240}>
                  <Collapsible title={lang === 'es' ? 'Mapa de tasas de éxito por estado' : 'Win rate by state'} badge={`${Object.keys(d.state_rates).length} states`} defaultOpen>
                    <USMap stateRates={d.state_rates || {}} selectedState={stateCode} onStateClick={(code) => toast(`${code}: ${(d.state_rates || {})[code]?.toFixed(1) || '—'}%`)} lang={lang} />
                  </Collapsible>
                </Reveal>
              )}

              {/* Circuit-specific data if available */}
              {d.circuit_rates && Object.keys(d.circuit_rates).length > 3 && (
                <Reveal delay={260}>
                  <Collapsible title={lang === 'es' ? 'Tasas de éxito por circuito' : 'Win rates by circuit'} badge={`${Object.keys(d.circuit_rates).length} circuits`}>
                    <div className="text-[13px] text-slate-400 mb-3">{lang === 'es' ? 'Cómo varían las tasas de éxito entre circuitos federales:' : 'How win rates vary across federal circuits:'}</div>
                    {Object.entries(d.circuit_rates)
                      .sort(([,a]: any, [,b]: any) => b - a)
                      .slice(0, 12)
                      .map(([circ, rate]: [string, any], i: number) => {
                        const circLabel = circ === 'dc' ? 'D.C.' : `${circ}${['th','st','nd','rd'][(Number(circ)%100>10&&Number(circ)%100<14)?0:[0,1,2,3][Number(circ)%10]||0]}`;
                        const isYours = circuitDataKey === circ;
                        return (
                          <div key={i} className="flex items-center gap-2 py-1.5">
                            <span className={`text-xs font-semibold w-10 ${isYours ? 'text-gold' : ''}`}>{circLabel}{isYours ? ' *' : ''}</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{
                                width: `${rate}%`,
                                background: isYours ? '#4040F2' : rate > 55 ? '#0D9488' : rate > 45 ? '#D97706' : '#E87461',
                              }} />
                            </div>
                            <span className="text-xs font-semibold w-12 text-right font-data">{rate.toFixed(1)}%</span>
                          </div>
                        );
                      })}
                    {circuitDataKey && <div className="text-[11px] text-slate-400 mt-2 italic">* {lang === 'es' ? 'Tu circuito' : 'Your circuit'} ({circuitName})</div>}
                  </Collapsible>
                </Reveal>
              )}

              {/* Timeline */}
              <Reveal delay={280}>
                <Card>
                  <SectionLabel>{lang === 'es' ? '¿Cuánto tiempo toma normalmente?' : 'How long does this usually take?'}</SectionLabel>
                  {(d.tl || []).map((t: any, i: number) => {
                    const active = i <= timelineStep;
                    return (
                      <div key={i} className="flex gap-3 cursor-pointer py-1" onClick={() => setTimelineStep(i)}>
                        <div className="flex flex-col items-center w-6">
                          <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                            style={{ background: active ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : '#F1F5F9', border: active ? 'none' : '2px solid #CBD5E1' }}>
                            {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                          </div>
                          {i < (d.tl || []).length - 1 && <div className="w-0.5 flex-1 mt-0.5 transition-colors" style={{ background: active ? '#4040F225' : '#F1F5F9' }} />}
                        </div>
                        <div className="flex-1 pb-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors" style={{ color: active ? '#4040F2' : '#94A3B8', background: active ? '#F3EBDA' : '#F1F5F9' }}>
                            {lang === 'es' ? `Mes ${t.mo}` : `Month ${t.mo}`}
                          </span>
                          <div className="text-[14px] mt-1 transition-colors" style={{ fontWeight: active ? 600 : 400, color: active ? '#0B1221' : '#94A3B8' }}>{t.ev}</div>
                          {active && t.d && <div className="text-[12px] text-slate-400 mt-0.5">{t.d}</div>}
                        </div>
                      </div>
                    );
                  })}
                  {/* If Filed Today */}
                  <div className="mt-4 p-4 rounded-xl" style={{ background: darkMode ? '#1E293B' : '#F8FAFC' }}>
                    <div className="text-[11px] font-bold text-slate-400 tracking-[2px] mb-2">{lang === 'es' ? 'SI SE PRESENTA HOY' : 'IF FILED TODAY'}</div>
                    {(() => {
                      const today = new Date();
                      const resolve = new Date(today);
                      resolve.setMonth(resolve.getMonth() + (d.mo || 10));
                      const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
                      return (
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-[11px] text-slate-400">{lang === 'es' ? 'Presentado' : 'Filed'}</div>
                            <div className="text-base font-bold">{months[today.getMonth()]} {today.getFullYear()}</div>
                          </div>
                          <div className="flex-1 h-[3px] bg-slate-200 rounded-full relative">
                            <div className="absolute right-0 top-[-3px] w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }} />
                          </div>
                          <div className="text-center">
                            <div className="text-[11px] text-slate-400">{lang === 'es' ? 'Resolución est.' : 'Est. resolution'}</div>
                            <div className="text-base font-bold" style={{ color: '#4040F2' }}>{months[resolve.getMonth()]} {resolve.getFullYear()}</div>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Basado en la duración mediana. Los plazos reales varían significativamente.' : 'Based on median duration. Actual timelines vary significantly.'}</div>
                  </div>
                </Card>
              </Reveal>

              {/* Outcome distribution */}
              <Reveal delay={340}>
                <Card>
                  <SectionLabel>{lang === 'es' ? 'Qué pasó en casos similares' : 'What happened in similar cases'}</SectionLabel>
                  {[
                    { l: lang === 'es' ? 'Ganar en juicio' : 'Win at trial', p: Math.round(d.wr * 0.4), c: '#0D9488' },
                    { l: lang === 'es' ? 'Acuerdo favorable' : 'Settle favorably', p: d.sp, c: '#1A2744' },
                    { l: lang === 'es' ? 'Desestimado' : 'Dismissed', p: Math.round(100 - d.wr - d.sp), c: '#D97706' },
                    { l: lang === 'es' ? 'Perder en juicio' : 'Lose at trial', p: Math.round((100 - d.wr) * 0.3), c: '#E87461' },
                  ].map((r, i) => (
                    <BarLine key={i} label={r.l} pct={r.p} max={50} color={r.c} delay={i * 80} />
                  ))}
                  <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'Distribución agregada. No predice ningún resultado individual.' : 'Aggregate distribution. Does not predict any individual outcome.'}</div>
                </Card>
              </Reveal>

              {/* Comparable cases */}
              <Reveal delay={400}>
                <Collapsible title={lang === 'es' ? 'Casos similares' : 'Similar cases'} badge={(d.comps || []).length} defaultOpen>
                  <div className="text-[13px] text-slate-400 mb-3">{lang === 'es' ? 'Ejemplos anónimos de registros judiciales públicos:' : 'Anonymized examples from public court records:'}</div>
                  {(d.comps || []).map((c: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl mb-2 transition-transform hover:scale-[1.01]" style={{
                      background: c.w ? (darkMode ? 'rgba(13,148,136,0.1)' : '#CCFBF110') : (darkMode ? 'rgba(232,116,97,0.1)' : '#FEE2E210'),
                      borderLeft: `4px solid ${c.w ? '#0D9488' : '#E87461'}`,
                    }}>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-display font-bold">{c.v}</span>
                        <span className="text-[11px] font-semibold text-slate-400 card-bg px-2.5 py-0.5 rounded-lg" style={{ background: darkMode ? '#1E293B' : '#fff' }}>{c.mo} {lang === 'es' ? 'meses' : 'months'}</span>
                      </div>
                      <div className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{c.d}</div>
                    </div>
                  ))}
                </Collapsible>
              </Reveal>

              {/* Settlement timing */}
              <Reveal delay={440}>
                <Card>
                  <SectionLabel>{lang === 'es' ? '¿Cuándo se resuelven los casos?' : 'When do cases usually settle?'}</SectionLabel>
                  <div className="flex gap-2">
                    {[{ p: 15, l: '0-3' }, { p: 35, l: '3-6' }, { p: 30, l: '6-12' }, { p: 20, l: '12+' }].map((x, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div className="h-20 flex items-end justify-center mb-1.5">
                          <div className="w-full rounded-t-lg transition-all duration-700" style={{
                            height: `${x.p * 2}%`,
                            background: i === 1 ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : darkMode ? 'rgba(64,64,242,0.2)' : '#4040F225',
                          }} />
                        </div>
                        <div className="text-[13px] font-bold" style={{ color: i === 1 ? '#4040F2' : '#94A3B8' }}>{x.p}%</div>
                        <div className="text-[11px] text-slate-400">{x.l}mo</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: darkMode ? 'rgba(64,64,242,0.15)' : '#F3EBDA', color: '#4040F2' }}>
                    {lang === 'es' ? 'La mayoría de los acuerdos: 3-6 meses después de la presentación.' : 'Most settlements: 3-6 months after filing.'}
                  </div>
                </Card>
              </Reveal>

              {/* What courts cited */}
              <Reveal delay={480}>
                <Collapsible title={lang === 'es' ? 'Lo que citaron los tribunales' : 'What courts cited'} badge={(d.factors || []).length}>
                  <div className="text-[13px] text-slate-400 mb-3">{lang === 'es' ? 'Factores que los tribunales federales citaron en casos similares:' : 'Factors federal courts cited in similar cases:'}</div>
                  {(d.factors || []).map((f: string, i: number) => (
                    <div key={i} className="flex gap-2 items-center py-1.5 text-[15px]">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: darkMode ? 'rgba(64,64,242,0.2)' : '#F3EBDA' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4040F2" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </Collapsible>
              </Reveal>

              {/* Action plan */}
              <Reveal delay={520}>
                <Card>
                  <SectionLabel>{lang === 'es' ? 'Lo que hace la mayoría después' : 'What most people do next'}</SectionLabel>
                  {[
                    { n: 1, t: lang === 'es' ? 'Habló con un abogado (la mayoría ofrece una primera reunión gratuita)' : 'Talked to a lawyer (most offer a free first meeting)' },
                    { n: 2, t: lang === 'es' ? 'Verificó si aún tenía tiempo para presentar (hay plazos)' : 'Checked if they still had time to file (there are deadlines)' },
                    { n: 3, t: lang === 'es' ? 'Presentó una queja ante la agencia gubernamental correspondiente' : 'Filed a complaint with the right government agency' },
                    { n: 4, t: lang === 'es' ? 'Escribió una cronología de todo lo que sucedió' : 'Wrote down a timeline of everything that happened' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3 p-3 card-bg border rounded-xl mb-1.5" style={{ background: darkMode ? '#131B2E' : '#fff', borderColor: darkMode ? '#1E293B' : '#F1F5F9' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: darkMode ? '#1E293B' : '#F1F5F9' }}>
                        <span className="text-[11px] font-bold text-slate-400">{s.n}</span>
                      </div>
                      <span className="text-[13px] text-slate-600">{s.t}</span>
                    </div>
                  ))}
                </Card>
              </Reveal>

              {/* Deadline */}
              <Reveal delay={560}>
                <div className="rounded-2xl p-5 mb-3" style={{
                  background: (timing === '2yr' || timing === 'old') ? (darkMode ? 'rgba(232,116,97,0.15)' : '#FEE2E2') : (darkMode ? 'rgba(217,119,6,0.15)' : '#FEF3C7'),
                }}>
                  <div className="text-[11px] font-bold tracking-[1.5px] mb-1" style={{ color: (timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706' }}>
                    {lang === 'es' ? 'PLAZO GENERAL DE PRESENTACIÓN' : 'GENERAL FILING DEADLINE'}
                  </div>
                  <div className="text-base font-semibold">{d.sol}</div>
                  <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Solo un abogado puede determinar su plazo específico.' : 'Only an attorney can determine your specific deadline.'}</div>
                </div>
              </Reveal>

              {/* Notifications */}
              <Reveal delay={580}>
                <Card>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[2px] mb-1">{lang === 'es' ? 'MANTENERSE ACTUALIZADO' : 'STAY UPDATED'}</div>
                  <div className="text-[12px] text-slate-500 mb-3">{lang === 'es' ? 'Recibe notificaciones cuando se publiquen nuevas opiniones judiciales que coincidan con tu tipo de caso.' : 'Get notified when new court opinions matching your case type are published.'}</div>
                  {notifySent ? (
                    <div className="px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: darkMode ? 'rgba(13,148,136,0.15)' : '#CCFBF1', color: '#0D9488' }}>{lang === 'es' ? 'Se te notificará.' : 'You will be notified.'}</div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                        placeholder="your@email.com"
                        aria-label="Notification email"
                        className="flex-1 px-3.5 py-2.5 text-sm border-[1.5px] border-slate-200 rounded-lg outline-none focus:border-[#4040F2] card-bg bg-white transition-colors" />
                      <button onClick={() => {
                        if (notifyEmail.includes('@') && notifyEmail.includes('.')) {
                          setNotifySent(true);
                          apiCall('/api/notify/subscribe', 'POST', { email: notifyEmail, nos_code: spec?.nos });
                        }
                      }} className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all active:scale-[0.96]"
                        style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                        {lang === 'es' ? 'Notificarme' : 'Notify me'}
                      </button>
                    </div>
                  )}
                </Card>
              </Reveal>

              {/* Legal Aid */}
              {stateCode && LEGAL_AID[stateCode] && (
                <Reveal delay={600}>
                  <Card className="p-5">
                    <details>
                      <summary className="text-sm font-semibold cursor-pointer">{lang === 'es' ? `Servicios legales gratuitos y de bajo costo en ${STATES.find(s => s.id === stateCode)?.label || stateCode}` : `Free and low-cost legal services in ${STATES.find(s => s.id === stateCode)?.label || stateCode}`}</summary>
                      <div className="mt-3 text-[13px] text-slate-500 leading-relaxed">
                        <div className="text-[11px] font-bold text-slate-400 tracking-widest mb-2">{lang === 'es' ? 'ASISTENCIA LEGAL ESTATAL Y SIN FINES DE LUCRO' : 'STATE-FUNDED AND NONPROFIT LEGAL AID'}</div>
                        {LEGAL_AID[stateCode]}
                        <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'MyCaseValue no está afiliado con ninguna organización listada.' : 'MyCaseValue is not affiliated with any organization listed.'}</div>
                      </div>
                    </details>
                  </Card>
                </Reveal>
              )}

              {/* SOL Countdown */}
              {(() => {
                const sol = getSOLCountdown();
                if (!sol) return null;
                return (
                  <Reveal delay={610}>
                    <Card>
                      <SectionLabel>{lang === 'es' ? 'Tu plazo estimado' : 'Your estimated deadline'}</SectionLabel>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{
                          background: sol.urgent ? '#FEE2E2' : '#FEF3C7',
                          border: `3px solid ${sol.urgent ? '#E87461' : '#D97706'}`,
                        }}>
                          <div className="text-center">
                            <div className="text-lg font-display font-bold" style={{ color: sol.urgent ? '#E87461' : '#D97706' }}>{sol.remaining}</div>
                            <div className="text-[8px] font-bold" style={{ color: sol.urgent ? '#E87461' : '#D97706' }}>MO</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] font-semibold">{sol.urgent ? (lang === 'es' ? '⚠ Plazo urgente' : '⚠ Urgent deadline') : (lang === 'es' ? 'Tiempo restante estimado' : 'Estimated time remaining')}</div>
                          <div className="text-[12px] text-slate-500 mt-0.5">{lang === 'es' ? `Plazo estimado: ${sol.deadline}` : `Estimated deadline: ${sol.deadline}`}</div>
                          {sol.urgent && <div className="text-[11px] text-red-500 font-semibold mt-1">{lang === 'es' ? 'Consulte un abogado de inmediato' : 'Consult an attorney immediately'}</div>}
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{
                          width: `${Math.max(5, Math.min(95, ((d.sol ? parseInt(d.sol) * 12 : 24) - sol.remaining) / (d.sol ? parseInt(d.sol) * 12 : 24) * 100))}%`,
                          background: sol.urgent ? '#E87461' : 'linear-gradient(90deg, #0D9488, #D97706)',
                        }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>{lang === 'es' ? 'Incidente' : 'Incident'}</span>
                        <span>{lang === 'es' ? 'Vencimiento' : 'Deadline'}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2 italic">{lang === 'es' ? 'Solo un abogado puede determinar su plazo específico.' : 'Only an attorney can determine your specific deadline. This is a general estimate.'}</div>
                    </Card>
                  </Reveal>
                );
              })()}

              {/* Attorney Fee Calculator */}
              {(() => {
                const fees = getAttorneyFees(d);
                if (!fees) return null;
                return (
                  <Reveal delay={615}>
                    <Collapsible title={lang === 'es' ? 'Calculadora de honorarios' : 'Attorney fee calculator'} badge={lang === 'es' ? 'estimación' : 'estimate'}>
                      <div className="text-[13px] text-slate-400 mb-3">{lang === 'es' ? 'Basado en la recuperación mediana para este tipo de caso:' : 'Based on median recovery for this case type:'}</div>
                      <div className="space-y-2">
                        <div className="p-3.5 rounded-xl bg-slate-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold text-slate-400 tracking-[1px]">CONTINGENCY (33%)</div>
                              <div className="text-[12px] text-slate-500 mt-0.5">Attorney takes 33% — you keep the rest</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-display font-bold" style={{ color: '#0D9488' }}>{fees.net33}</div>
                              <div className="text-[10px] text-slate-400">your estimated net</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold text-slate-400 tracking-[1px]">CONTINGENCY (40%)</div>
                              <div className="text-[12px] text-slate-500 mt-0.5">Attorney takes 40% — common if going to trial</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-display font-bold" style={{ color: '#D97706' }}>{fees.net40}</div>
                              <div className="text-[10px] text-slate-400">your estimated net</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl" style={{ background: '#F3EBDA' }}>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold tracking-[1px]" style={{ color: '#4040F2' }}>GROSS RECOVERY</div>
                              <div className="text-[12px] text-slate-500 mt-0.5">Median award before fees</div>
                            </div>
                            <div className="text-lg font-display font-bold" style={{ color: '#4040F2' }}>{fees.gross}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'Estimaciones. Los honorarios reales varían. MyCaseValue no recomienda abogados.' : 'Estimates only. Actual fees vary by attorney and case. MyCaseValue does not recommend attorneys.'}</div>
                    </Collapsible>
                  </Reveal>
                );
              })()}

              {/* State Report Card */}
              {d.state_rates && stateCode && d.state_rates[stateCode] && (
                <Reveal delay={618}>
                  <Card>
                    <SectionLabel>{lang === 'es' ? 'Calificación de tu estado' : 'Your state report card'}</SectionLabel>
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{
                        background: getStateGrade(d.state_rates[stateCode]).color + '15',
                        border: `3px solid ${getStateGrade(d.state_rates[stateCode]).color}`,
                      }}>
                        <span className="text-3xl font-display font-bold" style={{ color: getStateGrade(d.state_rates[stateCode]).color }}>
                          {getStateGrade(d.state_rates[stateCode]).grade}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-semibold">{STATES.find(s => s.id === stateCode)?.label || stateCode}</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}: <strong className="font-data">{d.state_rates[stateCode].toFixed(1)}%</strong></div>
                        <div className="text-[12px] text-slate-400 mt-0.5">
                          {d.state_rates[stateCode] > 55 ? (lang === 'es' ? 'Por encima del promedio nacional' : 'Above national average') :
                           d.state_rates[stateCode] > 45 ? (lang === 'es' ? 'Cerca del promedio nacional' : 'Near national average') :
                           (lang === 'es' ? 'Por debajo del promedio nacional' : 'Below national average')}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-3 italic">{lang === 'es' ? 'Basado en datos agregados. No predice resultados individuales.' : 'Based on aggregate data. Does not predict individual outcomes.'}</div>
                  </Card>
                </Reveal>
              )}

              {/* CTA */}
              <Reveal delay={620}>
                <Card className="p-6">
                  <div className="text-xl font-display font-bold mb-1.5" style={{ color: '#4040F2' }}>{lang === 'es' ? 'Lo que muchas personas hacen después' : 'What many people do next'}</div>
                  <p className="text-[14px] text-slate-500 leading-relaxed mb-3">
                    {lang === 'es' ? 'Muchas personas usan estos datos antes de consultar con un abogado. La mayoría ofrece consultas iniciales gratuitas. MyCaseValue no recomienda abogados ni proporciona referencias.' : 'Many people use this data before consulting with an attorney. Most offer free initial consultations. MyCaseValue does not recommend attorneys or provide referrals.'}
                  </p>
                  <button onClick={() => { try { window.open('https://www.google.com/search?q=' + encodeURIComponent((spec?.d || 'attorney') + ' attorney ' + (stateCode || '')), '_blank'); } catch {} }}
                    className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    {lang === 'es' ? 'Buscar abogados en tu área' : 'Search for attorneys in your area'}
                  </button>
                </Card>
              </Reveal>
            </div>
          )}

          {/* Poll */}
          <Reveal delay={660}>
            <Card className="p-6">
              <SectionLabel>{lang === 'es' ? '¿Qué harías después?' : 'What would you do next?'}</SectionLabel>
              <div className="text-[13px] text-slate-400 mb-3">Anonymous — not stored or linked to you.</div>
              {pollVote ? (
                <div className="px-5 py-4 rounded-xl text-center" style={{ background: '#CCFBF1' }}>
                  <div className="text-[15px] font-semibold mb-1" style={{ color: '#0D9488' }}>{lang === 'es' ? 'Gracias' : 'Thank you'}</div>
                  <div className="text-[13px] text-slate-500">{lang === 'es' ? 'El 73% de las personas que vieron datos similares eligieron consultar a un abogado.' : '73% of people who viewed similar data chose to consult an attorney.'}</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'atty', l: lang === 'es' ? 'Consultar a un abogado' : 'Consult an attorney', c: '#0D9488' },
                    { id: 'file', l: lang === 'es' ? 'Presentar queja yo mismo' : 'File a complaint myself', c: '#4040F2' },
                    { id: 'wait', l: lang === 'es' ? 'Recopilar más info' : 'Gather more info', c: '#1A2744' },
                    { id: 'move', l: lang === 'es' ? 'Seguir adelante' : 'Move on', c: '#94A3B8' },
                  ].map(o => (
                    <button key={o.id} onClick={() => { setPollVote(o.id); apiCall('/api/poll', 'POST', { vote: o.id, nos: spec?.nos }); }}
                      className="p-3 text-sm font-semibold card-bg bg-white border-[1.5px] border-slate-100 rounded-xl cursor-pointer text-center card-lift">
                      {o.l}
                    </button>
                  ))}
                </div>
              )}
            </Card>
          </Reveal>

          {/* Share Card */}
          <Reveal delay={680}>
            <Card className="p-0 overflow-hidden">
              <div id="share-card" className="relative p-6 sm:p-8" style={{
                background: 'linear-gradient(135deg, #0F1729 0%, #1A2744 50%, #0F1729 100%)',
                color: '#F0F2F5',
              }}>
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(64,64,242,0.12) 0%, transparent 70%)' }} />
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#4040F2' }}>MyCaseValue Report</div>
                    <div className="text-xl sm:text-2xl font-display font-bold mt-1 capitalize">{spec?.d}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
                  <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: wrColor }}>{Math.round(wr)}%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'es' ? 'Tasa de éxito' : 'Win Rate'}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: '#0D9488' }}>{winSettleRate}%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'es' ? 'Éxito+Acuerdo' : 'Win+Settle'}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-2xl font-display font-bold">{d.mo}<span className="text-sm font-normal text-slate-400"> mo</span></div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 relative z-10">
                  <span>{lang === 'es' ? 'Basado en' : 'Based on'} {d.total?.toLocaleString()} {lang === 'es' ? 'casos federales' : 'federal cases'}</span>
                  <span>mycasevalue.com</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 py-3 no-print" style={{ background: darkMode ? '#1E293B' : '#F8FAFC' }}>
                <span className="text-[11px] text-slate-400 font-medium">{lang === 'es' ? 'Compartir como imagen' : 'Share as image'}</span>
                <button onClick={() => {
                  try {
                    const text = `${spec?.d}: ${Math.round(wr)}% win rate based on ${d.total?.toLocaleString()} federal cases — mycasevalue.com`;
                    navigator.clipboard.writeText(text);
                    toast(lang === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard!');
                  } catch { toast('Could not copy'); }
                }} className="text-[12px] font-semibold px-4 py-1.5 rounded-lg cursor-pointer transition-all"
                  style={{ background: darkMode ? '#334155' : '#fff', border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`, color: '#4040F2' }}>
                  {lang === 'es' ? 'Copiar texto' : 'Copy text'}
                </button>
              </div>
            </Card>
          </Reveal>

          {/* Side-by-side comparison tool */}
          <Reveal delay={700}>
            <Card className="p-6 no-print">
              <SectionLabel>{lang === 'es' ? 'Comparar con otro tipo de caso' : 'Compare with another case type'}</SectionLabel>
              <p className="text-[13px] text-slate-400 mb-4">{lang === 'es' ? 'Selecciona otro tipo de caso para ver cómo se comparan los resultados.' : 'Select another case type to see how outcomes compare.'}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {comparisonOptions.slice(0, 8).map((opt: any) => (
                  <button key={opt.nos} onClick={() => loadComparison(opt.nos)}
                    className="px-3 py-1.5 text-[12px] font-medium rounded-lg cursor-pointer transition-all capitalize"
                    style={{
                      background: compareNos === opt.nos ? '#F3EBDA' : darkMode ? '#1E293B' : '#F8FAFC',
                      border: compareNos === opt.nos ? '1.5px solid #4040F240' : `1.5px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
                      color: compareNos === opt.nos ? '#4040F2' : darkMode ? '#CBD5E1' : '#64748B',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {compareMode && compareData && (
                <div className="rounded-xl overflow-hidden page-enter" style={{ border: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}` }}>
                  <div className="grid grid-cols-2">
                    {/* Current case */}
                    <div className="p-5 text-center" style={{ borderRight: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}` }}>
                      <div className="text-[10px] font-bold tracking-[1.5px] text-slate-400 mb-1">{lang === 'es' ? 'TU CASO' : 'YOUR CASE'}</div>
                      <div className="text-sm font-semibold capitalize mb-3">{spec?.d}</div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-3xl font-display font-bold" style={{ color: wrColor }}>{Math.round(wr)}%</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold">{d.mo} mo</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold" style={{ color: '#0D9488' }}>{d.sp}%</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Acuerdos' : 'Settlement'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold font-data">{d.total?.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Casos' : 'Cases'}</div>
                        </div>
                      </div>
                    </div>
                    {/* Comparison case */}
                    <div className="p-5 text-center" style={{ background: darkMode ? '#162035' : '#FAFAF8' }}>
                      <div className="text-[10px] font-bold tracking-[1.5px] mb-1" style={{ color: '#4040F2' }}>{lang === 'es' ? 'COMPARAR' : 'COMPARE'}</div>
                      <div className="text-sm font-semibold capitalize mb-3">{comparisonOptions.find((o: any) => o.nos === compareNos)?.label}</div>
                      <div className="space-y-3">
                        <div>
                          {(() => {
                            const cWr = getWinRate(compareData);
                            const diff = Math.round(cWr) - Math.round(wr);
                            const cColor = cWr > 36 ? '#0D9488' : '#D97706';
                            return (
                              <>
                                <div className="text-3xl font-display font-bold" style={{ color: cColor }}>
                                  {Math.round(cWr)}%
                                  {diff !== 0 && <span className="text-[12px] ml-1" style={{ color: diff > 0 ? '#0D9488' : '#E87461' }}>{diff > 0 ? '+' : ''}{diff}%</span>}
                                </div>
                                <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}</div>
                              </>
                            );
                          })()}
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold">{compareData.mo} mo</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold" style={{ color: '#0D9488' }}>{compareData.sp}%</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Acuerdos' : 'Settlement'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold font-data">{compareData.total?.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-400">{lang === 'es' ? 'Casos' : 'Cases'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </Reveal>

          <GoldRule />

          {/* Final disclaimer */}
          <Reveal delay={720}>
            <div className="mt-4 p-6 rounded-2xl text-center" style={{ background: '#0B1221' }}>
              <div className="text-[11px] font-bold text-white tracking-[1.5px] mb-2">{lang === 'es' ? 'AVISO IMPORTANTE' : 'IMPORTANT NOTICE'}</div>
              <div className="w-10 h-0.5 rounded-full mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <p className="text-[13px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
                {UPL.finalNotice}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.5)', backdropFilter: 'blur(16px)' }}
            onClick={() => setShowPricing(false)}>
            <div className="rounded-3xl p-6 sm:p-10 max-w-lg w-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(253,251,247,0.95) 100%)', boxShadow: '0 25px 80px rgba(11,18,33,.2), 0 0 0 1px rgba(64,64,242,0.08), inset 0 1px 0 rgba(255,255,255,0.9)' }} onClick={e => e.stopPropagation()}>
              <div className="text-center mb-7">
                <div className="text-2xl sm:text-3xl font-display font-bold">{lang === 'es' ? 'Vea el panorama completo' : 'See the complete picture'}</div>
                <p className="text-[15px] text-slate-500 mt-2">{lang === 'es' ? '8 herramientas de datos para mayor comprensión' : '8 data tools for deeper understanding'}</p>
              </div>
              <div className="text-[11px] text-slate-400 text-center mb-5">{lang === 'es' ? 'Todos los datos son solo informativos. No se crea relación abogado-cliente.' : 'All data is informational only. No attorney-client relationship is created.'}</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ border: '1.5px solid rgba(226,232,240,0.8)', background: 'linear-gradient(180deg, #fff 0%, #FAFAF8 100%)' }}>
                  <div className="text-[11px] font-bold text-slate-400 tracking-[2px]">{lang === 'es' ? 'REPORTE INDIVIDUAL' : 'SINGLE REPORT'}</div>
                  <div className="text-3xl sm:text-4xl font-display font-bold my-2"><span className="text-xl">$</span>5.99</div>
                  <div className="text-[12px] text-slate-400 mb-3">{lang === 'es' ? 'Un reporte completo' : 'One complete report'}</div>
                  <button onClick={() => { buy('single'); setShowPricing(false); }}
                    className="w-full py-3 text-sm font-semibold card-bg bg-white border-[1.5px] border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                    {lang === 'es' ? 'Obtener reporte' : 'Get report'}
                  </button>
                </div>
                <div className="border-2 rounded-2xl p-5 sm:p-6 text-center relative" style={{ borderColor: '#4040F2', background: 'linear-gradient(180deg, #FDFBF7 0%, #F3EBDA 100%)', boxShadow: '0 8px 32px rgba(64,64,242,.15), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    {lang === 'es' ? 'MEJOR VALOR' : 'BEST VALUE'}
                  </div>
                  <div className="text-[11px] font-bold tracking-[2px]" style={{ color: '#4040F2' }}>{lang === 'es' ? 'ILIMITADO' : 'UNLIMITED'}</div>
                  <div className="text-3xl sm:text-4xl font-display font-bold my-2"><span className="text-xl">$</span>9.99</div>
                  <div className="text-[12px] mb-3" style={{ color: '#4040F2' }}>{lang === 'es' ? 'Todos los tipos de caso, para siempre' : 'All case types, forever'}</div>
                  <button onClick={() => { buy('unlimited'); setShowPricing(false); }}
                    className="w-full py-3 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all active:scale-[0.96]"
                    style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)' }}>
                    {lang === 'es' ? 'Ilimitado' : 'Unlimited'}
                  </button>
                </div>
              </div>
              {/* Payment methods */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                  Card
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.05 11.97c-.03-2.49 2.03-3.69 2.12-3.74-1.15-1.69-2.95-1.92-3.59-1.95-1.53-.15-2.98.9-3.76.9-.78 0-1.98-.88-3.25-.85-1.67.02-3.22.97-4.08 2.47-1.74 3.02-.45 7.5 1.25 9.95.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.23-.81 1.51 0 1.94.81 3.26.79 1.35-.02 2.2-1.22 3.02-2.43.95-1.4 1.34-2.75 1.37-2.82-.03-.01-2.62-1.01-2.65-4.01z" fill="#94A3B8"/><path d="M14.55 4.52c.69-.83 1.15-1.99 1.02-3.15-1 .04-2.2.66-2.91 1.49-.64.74-1.2 1.93-1.05 3.07 1.1.09 2.24-.56 2.94-1.41z" fill="#94A3B8"/></svg>
                  Apple Pay
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <svg width="16" height="12" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2" fill="#94A3B8" opacity="0.15"/><path d="M8.5 11.5a4 4 0 100-7 4 4 0 000 7z" fill="#94A3B8" opacity="0.4"/><path d="M15.5 11.5a4 4 0 100-7 4 4 0 000 7z" fill="#94A3B8" opacity="0.4"/></svg>
                  Google Pay
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-[10px] text-slate-400">{lang === 'es' ? 'Pago seguro por Stripe' : 'Secure checkout by Stripe'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Legal pages modal */}
        {legalPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.6)', backdropFilter: 'blur(16px)' }}
            onClick={() => setLegalPage(null)}>
            <div className="card-bg bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 card-bg bg-white rounded-t-3xl px-6 pt-6 pb-3 border-b border-slate-100 flex items-center justify-between z-10">
                <h2 className="text-lg font-display font-bold">
                  {legalPage === 'terms' ? 'Terms of Service' : legalPage === 'privacy' ? 'Privacy Policy' : 'Legal Disclaimer'}
                </h2>
                <button onClick={() => setLegalPage(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 border-none cursor-pointer transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="px-6 py-5 text-[13px] text-slate-600 leading-relaxed space-y-4">
                <p className="text-[11px] text-slate-400 italic">Last updated: March 25, 2026</p>

                {legalPage === 'terms' && (<>
                  <p><strong>1. Acceptance of Terms.</strong> By accessing or using MyCaseValue (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
                  <p><strong>2. Nature of Service.</strong> MyCaseValue is an informational tool that displays aggregate historical data derived from public federal court records. The Service does NOT provide legal advice, legal opinions, legal representation, or recommendations of any kind. No attorney-client relationship is created by using this Service. MyCaseValue is not a law firm and does not practice law.</p>
                  <p><strong>3. Not Legal Advice.</strong> Nothing on this website constitutes legal advice. The information presented reflects historical aggregate outcomes and does not predict, estimate, or evaluate any individual case, claim, or legal matter. You should consult a licensed attorney for advice specific to your situation.</p>
                  <p><strong>4. No Guarantee of Accuracy.</strong> While we strive to provide accurate data derived from public records (Federal Judicial Center Integrated Database, CourtListener, uscourts.gov), we make no warranty or guarantee regarding the accuracy, completeness, timeliness, or reliability of any information. Data may contain errors, omissions, or delays.</p>
                  <p><strong>5. Limitation of Liability.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, MYCASEVALUE LLC, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF THE SERVICE. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
                  <p><strong>6. Disclaimer of Warranties.</strong> THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                  <p><strong>7. User Responsibilities.</strong> You agree to use the Service only for lawful purposes and in compliance with all applicable laws. You shall not misrepresent information obtained from MyCaseValue as legal advice or a legal opinion.</p>
                  <p><strong>8. Payments &amp; Refunds.</strong> Purchases are processed through Stripe. All sales are final. If you experience technical issues preventing access to a paid report, contact support@mycasevalue.com within 7 days for assistance.</p>
                  <p><strong>9. Intellectual Property.</strong> All content, design, and code of MyCaseValue are owned by MyCaseValue LLC. Underlying court data is public domain (17 U.S.C. &sect; 105). You may not reproduce, distribute, or create derivative works from our proprietary materials without written permission.</p>
                  <p><strong>10. Dispute Resolution &amp; Arbitration.</strong> Any dispute arising from or relating to these Terms or the Service shall be resolved through binding arbitration administered by the American Arbitration Association in accordance with its Consumer Arbitration Rules, except that either party may seek injunctive relief in a court of competent jurisdiction. YOU AGREE TO WAIVE YOUR RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN A CLASS ACTION.</p>
                  <p><strong>11. Governing Law.</strong> These Terms shall be governed by the laws of the State of Delaware, without regard to conflict of law principles.</p>
                  <p><strong>12. Changes to Terms.</strong> We may update these Terms at any time. Continued use of the Service constitutes acceptance of the updated Terms.</p>
                  <p><strong>13. Contact.</strong> Questions about these Terms may be directed to legal@mycasevalue.com.</p>
                </>)}

                {legalPage === 'privacy' && (<>
                  <p><strong>1. Information We Collect.</strong> We collect information you voluntarily provide (state selection, case type, email for account features) and automatically collected data (IP address, browser type, device information, usage analytics via cookies).</p>
                  <p><strong>2. How We Use Information.</strong> We use collected information to: provide and improve the Service, process payments via Stripe, send communications you have opted into, analyze usage patterns to improve user experience, and comply with legal obligations.</p>
                  <p><strong>3. Information Sharing.</strong> We do not sell your personal information. We may share information with: Stripe (payment processing), analytics providers (anonymized usage data), and law enforcement (when required by law, subpoena, or court order).</p>
                  <p><strong>4. Data Retention.</strong> We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, typically no longer than 24 months for inactive accounts. Payment records are retained as required by applicable tax and financial regulations.</p>
                  <p><strong>5. Cookies &amp; Tracking.</strong> We use essential cookies for site functionality and optional analytics cookies to understand usage patterns. You can disable non-essential cookies through your browser settings.</p>
                  <p><strong>6. Your Rights.</strong> Depending on your jurisdiction, you may have rights under GDPR, CCPA/CPRA, or other privacy laws, including: access to your data, correction of inaccurate data, deletion of your data, data portability, opting out of data sales (we do not sell data), and opting out of targeted advertising.</p>
                  <p><strong>7. California Residents (CCPA/CPRA).</strong> California residents have additional rights under the California Consumer Privacy Act. We do not sell personal information. You may request disclosure of categories and specific pieces of personal information collected. Contact privacy@mycasevalue.com to exercise your rights.</p>
                  <p><strong>8. European Users (GDPR).</strong> If you are in the European Economic Area, our legal basis for processing your data is your consent and our legitimate interests in providing the Service. You may withdraw consent at any time by contacting us.</p>
                  <p><strong>9. Children&apos;s Privacy.</strong> The Service is not intended for children under 13. We do not knowingly collect information from children under 13. If we learn that we have collected information from a child under 13, we will delete it promptly.</p>
                  <p><strong>10. Security.</strong> We implement industry-standard security measures including encryption in transit (TLS/SSL), secure payment processing via Stripe (PCI-DSS compliant), and access controls. However, no method of electronic transmission or storage is 100% secure.</p>
                  <p><strong>11. Changes to Policy.</strong> We may update this Privacy Policy periodically. We will notify users of material changes via the Service or email.</p>
                  <p><strong>12. Contact.</strong> For privacy inquiries or data requests: privacy@mycasevalue.com.</p>
                </>)}

                {legalPage === 'disclaimer' && (<>
                  <p><strong>No Legal Advice.</strong> MyCaseValue provides aggregate historical data from public federal court records for general informational purposes only. NOTHING on this website constitutes legal advice, a legal opinion, or a recommendation regarding any individual legal matter.</p>
                  <p><strong>No Attorney-Client Relationship.</strong> Use of MyCaseValue does not create an attorney-client relationship between you and MyCaseValue LLC or any of its affiliates, officers, employees, or agents. MyCaseValue is NOT a law firm, does NOT practice law, and does NOT provide legal services.</p>
                  <p><strong>No Case Evaluation.</strong> The data, statistics, win rates, recovery ranges, and any other information presented by MyCaseValue reflect aggregate historical outcomes and should NOT be interpreted as an evaluation, prediction, or assessment of any individual case. Every legal matter is unique and depends on facts and circumstances not reflected in aggregate data.</p>
                  <p><strong>Consult an Attorney.</strong> If you have a legal issue, you should consult with a licensed attorney in your jurisdiction who can evaluate the specific facts and circumstances of your situation. Many attorneys offer free initial consultations. You can find legal aid resources at lawhelp.org or through your local bar association.</p>
                  <p><strong>Data Limitations.</strong> Our data is derived from publicly available federal court records (Federal Judicial Center Integrated Database and CourtListener). This data: (a) covers federal courts only and does not include state court cases, (b) may not reflect settlements reached outside of court records, (c) may contain coding errors from the original source, (d) reflects historical outcomes that may not predict future results, (e) uses Nature of Suit (NOS) codes that may not precisely match your specific legal situation.</p>
                  <p><strong>No Endorsement.</strong> References to any legal concepts, statutes, or procedures are for informational purposes only and do not constitute endorsement or recommendation of any particular legal strategy.</p>
                  <p><strong>Unauthorized Practice of Law (UPL) Compliance.</strong> MyCaseValue is designed to comply with unauthorized practice of law statutes in all U.S. jurisdictions. If you believe any content on this site crosses the line into legal advice, please contact us immediately at legal@mycasevalue.com.</p>
                  <p><strong>No Warranties.</strong> ALL INFORMATION IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR COMPLETENESS.</p>
                  <p><strong>Indemnification.</strong> By using MyCaseValue, you agree to indemnify and hold harmless MyCaseValue LLC and its affiliates from any claims, damages, losses, or expenses arising from your use of the Service or reliance on information provided.</p>
                  <p><strong>Medical/Financial Disclaimer.</strong> Some case types may involve medical or financial matters. MyCaseValue does not provide medical advice, financial advice, or tax advice. Consult appropriate licensed professionals for such matters.</p>
                </>)}
              </div>
            </div>
          </div>
        )}
      </Shell>
    );
  }

  return null;
}
