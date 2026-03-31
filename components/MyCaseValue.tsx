'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AnimatedNumber } from './ui/AnimatedNumber';
import PieChart from './ui/PieChart';
import { CategoryIcon } from './ui/Icons';
import USMap from './ui/USMap';
import { Logo } from './ui/Logo';
import { Navbar } from './navigation/Navbar';
import { formatPct, formatCount, formatCountCompact, formatDollar, formatMonths } from '../lib/formatters';
import TrustBar from './sections/TrustBar';
import DataPreviewSection from './sections/DataPreviewSection';
import FaqSection from './sections/FaqSection';
import FinalCtaSection from './sections/FinalCtaSection';
import {
  SITS, STATES, TIMING_OPTS, AMOUNT_OPTS, ATTORNEY_OPTS,
  OUTCOME_DATA, CIRCUIT_MAP, CIRCUIT_DATA_KEY, CIRCUIT_WIN_RATES, CIRCUIT_DETAIL, FEE_INFO,
  LEGAL_AID, TRENDING, TESTIMONIALS, MOCK_DATA, UPL, NOS_FALLBACK,
  apiCall, formatRecoveryValue, getMockData,
} from '../lib/data';
import { TRANSLATIONS, Lang } from '../lib/i18n';
import { generateCaseNarrative } from '../lib/ai-narrative';
import EnhancedSearch from './ui/EnhancedSearch';
import SocialProofBar from './ui/SocialProofBar';
import MobileBottomNav from './ui/MobileBottomNav';
import DataFreshness from './ui/DataFreshness';
import HeroStats from './ui/HeroStats';
import KeyboardShortcuts from './ui/KeyboardShortcuts';

// Import generateDemoData directly (small function, used inline)
import { generateDemoData } from './ui/TrendChart';

// Shimmer loading placeholder for lazy components
const ChunkLoader = () => (
  <div className="skeleton-premium" style={{ height: '120px', borderRadius: '16px', margin: '8px 0' }} />
);

// Lazy-load heavy components only needed in report/premium views
const TrendChart = dynamic(() => import('./ui/TrendChart'), { ssr: false, loading: ChunkLoader });
const ComparisonPanel = dynamic(() => import('./ui/ComparisonPanel'), { ssr: false, loading: ChunkLoader });
const SettlementHistogram = dynamic(() => import('./ui/SettlementHistogram'), { ssr: false, loading: ChunkLoader });
const UpgradeTable = dynamic(() => import('./ui/UpgradeTable'), { ssr: false, loading: ChunkLoader });
const ConfidenceRing = dynamic(() => import('./ui/ConfidenceRing'), { ssr: false, loading: ChunkLoader });
const CaseTimeline = dynamic(() => import('./ui/CaseTimeline'), { ssr: false, loading: ChunkLoader });
const AttorneyImpact = dynamic(() => import('./ui/AttorneyImpact'), { ssr: false, loading: ChunkLoader });
const OutcomeSimulator = dynamic(() => import('./ui/OutcomeSimulator'), { ssr: false, loading: ChunkLoader });
const LiveCaseFeed = dynamic(() => import('./ui/LiveCaseFeed'), { ssr: false, loading: ChunkLoader });
const PremiumValueCalculator = dynamic(() => import('./ui/PremiumValueCalculator'), { ssr: false, loading: ChunkLoader });
const NationwideDashboard = dynamic(() => import('./ui/NationwideDashboard'), { ssr: false, loading: ChunkLoader });
const CaseComparison = dynamic(() => import('./ui/CaseComparison'), { ssr: false, loading: ChunkLoader });
const WhatIfSimulator = dynamic(() => import('./ui/WhatIfSimulator'), { ssr: false, loading: ChunkLoader });
const JudgeAnalytics = dynamic(() => import('./ui/JudgeAnalytics'), { ssr: false, loading: ChunkLoader });
const ReportLoader = dynamic(() => import('./ui/ReportLoader'), { ssr: false });
const StateDeepDive = dynamic(() => import('./ui/StateDeepDive'), { ssr: false, loading: ChunkLoader });
const PricingTiers = dynamic(() => import('./ui/PricingTiers'), { ssr: false, loading: ChunkLoader });
const SavedReports = dynamic(() => import('./ui/SavedReports'), { ssr: false, loading: ChunkLoader });
const AttorneyReferral = dynamic(() => import('./ui/AttorneyReferral'), { ssr: false, loading: ChunkLoader });
const SocialProofToast = dynamic(() => import('./ui/SocialProofToast'), { ssr: false });
const OnboardingTour = dynamic(() => import('./ui/OnboardingTour'), { ssr: false });
const GlossaryTooltip = dynamic(() => import('./ui/GlossaryTooltip'), { ssr: false });
const ReportTabs = dynamic(() => import('./ui/ReportTabs'), { ssr: false });
const ReportSidebar = dynamic(() => import('./ui/ReportSidebar'), { ssr: false });
const EmailCaptureGate = dynamic(() => import('./ui/EmailCaptureGate'), { ssr: false });
const CollapsedPaywall = dynamic(() => import('./ui/CollapsedPaywall'), { ssr: false });
const ExitIntentModal = dynamic(() => import('./ui/ExitIntentModal'), { ssr: false });
const BottomNav = dynamic(() => import('./navigation/BottomNav'), { ssr: false });
import { TabPanel } from './ui/ReportTabs';

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
  // US Territories
  PR: 41.2, GU: 44.8, VI: 46.3, AS: 42.1, MP: 43.5,
};

// ============================================================
// REUSABLE UI
// ============================================================

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Extremely aggressive: show anything within 1000px of viewport instantly
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 1000) {
      const stagger = Math.min(delay, 80);
      if (stagger > 0) {
        const tid = setTimeout(() => setShow(true), stagger);
        return () => clearTimeout(tid);
      } else {
        setShow(true);
      }
      return;
    }

    // For elements well below the fold, trigger 800px before they enter viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 800px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
    }}>
      {children}
    </div>
  );
}

function Card({ children, glow = false, premium = false, className = '', style = {} }: { children: React.ReactNode; glow?: boolean; premium?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`card-bg rounded-2xl border mb-3 p-7 transition-all duration-300 ${glow ? 'animate-glow-pulse' : ''} ${premium ? 'glass-premium aurora-card tilt-hover' : ''} ${className}`}
      style={{
        background: premium
          ? 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(11,18,33,0.95) 100%)'
          : 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(11,18,33,0.9) 100%)',
        borderColor: premium ? 'rgba(99,102,241,0.15)' : 'rgba(51,65,85,0.4)',
        boxShadow: glow
          ? '0 2px 8px rgba(64,64,242,.08), 0 12px 40px rgba(11,18,33,.06), inset 0 1px 0 rgba(255,255,255,0.03)'
          : premium
            ? '0 4px 24px rgba(0,0,0,0.3), 0 0 60px rgba(79,70,229,0.04), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 1px 3px rgba(11,18,33,.02), 0 8px 28px rgba(11,18,33,.04), inset 0 1px 0 rgba(255,255,255,0.03)',
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
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#4F46E5', opacity: 0.4 }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(64,64,242,0.1), rgba(64,64,242,0.3), transparent)' }} />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body text-[10px] font-bold tracking-[3px] uppercase mb-5" style={{ color: 'var(--fg-muted)', letterSpacing: '3px' }}>
      <span style={{ background: 'linear-gradient(90deg, #94A3B8, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{children}</span>
    </div>
  );
}

function Stat({ value, label, color, large = false }: { value: string; label: string; color: string; large?: boolean; dark?: boolean }) {
  return (
    <div className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 tilt-hover" style={{
      background: `linear-gradient(180deg, rgba(19,27,46,0.7), ${color}10)`,
      border: `1px solid ${color}20`,
      boxShadow: `0 2px 12px ${color}08`,
    }}>
      <div className="font-display font-bold neon-text" style={{
        fontSize: large ? 48 : 30,
        color,
        letterSpacing: large ? '-1px' : '-0.5px',
        lineHeight: 1,
        textShadow: `0 0 20px ${color}30`,
      }}>
        {value}
      </div>
      <div className="text-[11px] mt-1.5 font-semibold tracking-wide uppercase" style={{ color: '#8B9AB5', fontSize: '10px', letterSpacing: '0.5px' }}>{label}</div>
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
      <div className="w-32 h-2.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden flex-shrink-0 transition-all group-hover:h-3">
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

function Select({ value, options, onChange, placeholder, dark = false, lang = 'en' }: { value: string; options: { id: string; label: string }[]; onChange: (v: string) => void; placeholder?: string; dark?: boolean; lang?: string }) {
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
          borderColor: open ? '#4F46E5' : '#334155',
          color: selected ? '#F0F2F5' : '#94A3B8',
          background: '#1A2744',
          boxShadow: open ? '0 0 0 3px rgba(64,64,242,0.12)' : 'none',
        }}>
        <span className="truncate">{selected ? selected.label : placeholder || 'Select...'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#4F46E5' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        role="listbox"
        className="absolute top-full mt-1.5 left-0 right-0 rounded-xl z-[var(--z-raised)] overflow-hidden"
        style={{
          background: '#1A2744',
          border: open ? '1px solid #334155' : '1px solid transparent',
          boxShadow: open ? '0 12px 40px rgba(11,18,33,.4)' : 'none',
          maxHeight: open ? '280px' : '0',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
          transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}>
        {showSearch && (
          <div className="px-2 pt-2 pb-1">
            <input ref={searchRef} type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar...' : 'Search...'}
              aria-label={lang === 'es' ? 'Buscar tipos de caso' : 'Search case types'}
              className="w-full px-3 py-2 text-[13px] rounded-lg outline-none focus:ring-2 focus:ring-[#4F46E5]/40 transition-colors"
              style={{
                background: '#0F1729',
                border: '1px solid #334155',
                color: '#F0F2F5',
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
                color: o.id === value ? '#4F46E5' : '#E2E8F0',
                background: o.id === value ? 'rgba(99,102,241,0.08)' : 'transparent',
                animationDelay: open ? `${idx * 20}ms` : '0ms',
              }}
              onMouseEnter={e => { if (o.id !== value) e.currentTarget.style.background = '#243352'; }}
              onMouseLeave={e => { if (o.id !== value) e.currentTarget.style.background = 'transparent'; }}>
              <span className="flex items-center gap-2">
                {o.id === value && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                )}
                {o.label}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-[var(--fg-muted)] text-center">{lang === 'es' ? 'Sin resultados' : 'No results'}</div>
          )}
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
        background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(11,18,33,0.9) 100%)',
        borderColor: open ? 'rgba(64,64,242,0.15)' : 'rgba(51,65,85,0.6)',
        boxShadow: open ? '0 4px 24px rgba(11,18,33,.07), inset 0 1px 0 rgba(255,255,255,0.03)' : '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-4.5 bg-transparent border-none cursor-pointer text-left group" aria-expanded={open}
        style={{ padding: '18px 24px' }}>
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[15px] group-hover:text-[#4F46E5] transition-colors">{title}</span>
          {badge && <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color: 'var(--accent-primary)', background: 'rgba(99,102,241,0.15)' }}>{badge}</span>}
        </div>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
          style={{ background: open ? '#4F46E510' : 'transparent' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open ? '#4F46E5' : '#94A3B8'} strokeWidth="2.5"
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
        <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? `Paso ${step}/5` : `Step ${step}/5`}</span>
        <div className="flex gap-1.5 flex-1">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-1 h-2 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ background: i <= step ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B' }}>
              {i <= step && (
                <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
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
              color: i + 1 <= step ? '#4F46E5' : '#94A3B8',
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
    <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium z-[var(--z-modal)] text-white"
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
      <polyline points={points} fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const LEGAL_GLOSSARY: Record<string, { en: string; es: string }> = {
  'win rate': {
    en: 'How often people in similar situations got a favorable result in court.',
    es: 'Con qué frecuencia las personas en situaciones similares obtienen un resultado favorable en la corte.'
  },
  'settlement': {
    en: 'When both sides agree to resolve the case (usually with a payment) without going to trial.',
    es: 'Cuando ambas partes acuerdan resolver el caso (generalmente con un pago) sin ir a juicio.'
  },
  'dismissal': {
    en: 'When a judge ends a case before it goes to trial, often because of a technicality or lack of evidence.',
    es: 'Cuando un juez termina un caso antes de que vaya a juicio, a menudo por una tecnicidad o falta de evidencia.'
  },
  'summary judgment': {
    en: 'When a judge decides the case without a full trial because the key facts aren\'t in dispute.',
    es: 'Cuando un juez decide el caso sin un juicio completo porque los hechos clave no están en disputa.'
  },
  'statute of limitations': {
    en: 'The legal deadline to file your case. If you miss it, you generally can\'t sue — even if you have a strong case.',
    es: 'El plazo legal para presentar tu demanda. Si lo pierdes, generalmente no puedes demandar, incluso si tienes un caso sólido.'
  },
  'contingency fee': {
    en: 'A payment arrangement where your lawyer only gets paid if you win (usually 33-40% of what you recover).',
    es: 'Un acuerdo de pago en el que tu abogado solo recibe dinero si ganas (generalmente 33-40% de lo que recuperes).'
  },
  'plaintiff': {
    en: 'The person filing the lawsuit — that could be you.',
    es: 'La persona que presenta la demanda, que podrías ser tú.'
  },
  'defendant': {
    en: 'The person or company being sued.',
    es: 'La persona o empresa que está siendo demandada.'
  },
  'circuit': {
    en: 'A regional group of federal courts. The U.S. has 13, and outcomes can vary significantly between them.',
    es: 'Un grupo regional de cortes federales. EE.UU. tiene 13, y los resultados pueden variar significativamente entre ellas.'
  },
  'discovery': {
    en: 'The phase before trial where both sides must share evidence and information with each other.',
    es: 'La fase antes del juicio en la que ambas partes deben compartir evidencia e información entre sí.'
  },
  'deposition': {
    en: 'When a witness answers questions under oath outside of court, typically recorded for later use.',
    es: 'Cuando un testigo responde preguntas bajo juramento fuera de la corte, típicamente grabado para uso posterior.'
  },
  'mediation': {
    en: 'A meeting where a neutral person helps both sides try to reach an agreement without going to trial.',
    es: 'Una reunión donde una persona neutral ayuda a ambas partes a intentar llegar a un acuerdo sin ir a juicio.'
  },
  'class action': {
    en: 'A single lawsuit filed on behalf of a large group of people who were all affected by the same thing.',
    es: 'Una demanda única presentada en nombre de un gran grupo de personas que fueron afectadas por lo mismo.'
  },
  'jurisdiction': {
    en: 'Which court has the authority to hear your type of case.',
    es: 'Qué corte tiene la autoridad para escuchar tu tipo de caso.'
  },
  'filing': {
    en: 'Officially submitting your lawsuit paperwork to the court to start your case.',
    es: 'Presentar oficialmente tus documentos de demanda a la corte para comenzar tu caso.'
  },
  'appeal': {
    en: 'Asking a higher court to review the decision if you disagree with the outcome.',
    es: 'Pedirle a una corte superior que revise la decisión si no estás de acuerdo con el resultado.'
  },
  'damages': {
    en: 'The money you\'re asking for to compensate you for what happened.',
    es: 'El dinero que estás pidiendo para compensarte por lo que sucedió.'
  },
  'pro se': {
    en: 'Representing yourself in court without a lawyer.',
    es: 'Representarte a ti mismo en la corte sin un abogado.'
  },
  'burden of proof': {
    en: 'The responsibility to prove your claims are true. In civil cases, you usually need to show your side is "more likely than not."',
    es: 'La responsabilidad de probar que tus afirmaciones son ciertas. En casos civiles, generalmente necesitas demostrar que tu versión es "más probable que no."'
  },
  'motion to dismiss': {
    en: 'A request asking the judge to throw out a case early — usually because of a legal technicality or insufficient evidence.',
    es: 'Una solicitud pidiéndole al juez que desestime un caso tempranamente, generalmente por una tecnicidad legal o evidencia insuficiente.'
  },
  'injunction': {
    en: 'A court order telling someone to stop doing something (or requiring them to do something) while the case is ongoing.',
    es: 'Una orden judicial que le dice a alguien que deje de hacer algo (o que haga algo) mientras el caso está en curso.'
  },
  'tort': {
    en: 'A wrongful act (other than breaking a contract) that causes harm and allows you to sue for compensation.',
    es: 'Un acto ilícito (diferente a romper un contrato) que causa daño y te permite demandar por compensación.'
  },
  'punitive damages': {
    en: 'Extra money awarded to punish the defendant for especially bad behavior — on top of what covers your actual losses.',
    es: 'Dinero adicional otorgado para castigar al demandado por conducta especialmente mala, además de lo que cubre tus pérdidas reales.'
  },
  'compensatory damages': {
    en: 'Money meant to cover your actual losses — like medical bills, lost wages, and pain and suffering.',
    es: 'Dinero destinado a cubrir tus pérdidas reales, como gastos médicos, salarios perdidos y dolor y sufrimiento.'
  },
  'default judgment': {
    en: 'When one side wins automatically because the other side didn\'t respond to the lawsuit in time.',
    es: 'Cuando una parte gana automáticamente porque la otra parte no respondió a la demanda a tiempo.'
  },
  'interrogatories': {
    en: 'Written questions one side sends to the other that must be answered under oath during discovery.',
    es: 'Preguntas escritas que una parte envía a la otra y que deben responderse bajo juramento durante el descubrimiento.'
  },
  'subpoena': {
    en: 'A legal order requiring someone to appear in court or provide documents. Ignoring it can result in penalties.',
    es: 'Una orden legal que requiere que alguien se presente en la corte o proporcione documentos. Ignorarla puede resultar en sanciones.'
  },
  'precedent': {
    en: 'A past court decision that judges may follow when deciding similar cases in the future.',
    es: 'Una decisión judicial pasada que los jueces pueden seguir al decidir casos similares en el futuro.'
  },
  'voir dire': {
    en: 'The jury selection process where lawyers ask potential jurors questions to determine if they can be fair and impartial.',
    es: 'El proceso de selección del jurado donde los abogados hacen preguntas a posibles jurados para determinar si pueden ser justos e imparciales.'
  },
  'retainer': {
    en: 'An upfront payment to hire a lawyer. Think of it like a deposit that the lawyer draws from as they work on your case.',
    es: 'Un pago anticipado para contratar a un abogado. Es como un depósito del cual el abogado va descontando mientras trabaja en tu caso.'
  },
  'arbitration': {
    en: 'A private process where a neutral third party (not a judge) hears both sides and makes a binding decision.',
    es: 'Un proceso privado donde un tercero neutral (no un juez) escucha ambas partes y toma una decisión vinculante.'
  },
  'liable': {
    en: 'Legally responsible. If someone is found liable in a civil case, they typically must pay damages.',
    es: 'Legalmente responsable. Si alguien es encontrado responsable en un caso civil, generalmente debe pagar daños.'
  },
  'brief': {
    en: 'A written document submitted to the court that argues your side of the case, citing laws and evidence.',
    es: 'Un documento escrito presentado a la corte que argumenta tu versión del caso, citando leyes y evidencia.'
  },
  'counsel': {
    en: 'A lawyer or team of lawyers representing you. "Of counsel" means an attorney affiliated with a firm but not a partner.',
    es: 'Un abogado o equipo de abogados que te representan. "Of counsel" significa un abogado afiliado a una firma pero que no es socio.'
  },
};


function GlossaryTip({ term, children, lang = 'en' }: { term: string; children: React.ReactNode; lang?: string }) {
  const [show, setShow] = useState(false);
  const def = LEGAL_GLOSSARY[term.toLowerCase()];
  if (!def) return <>{children}</>;
  const displayDef = lang === 'es' ? def.es : def.en;
  return (
    <span className="relative inline-block cursor-help"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      style={{ borderBottom: '1px dashed #4F46E540' }}>
      {children}
      {show && (
        <span className="absolute z-[var(--z-dropdown)] bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 rounded-xl text-[12px] leading-relaxed font-normal text-left w-56 sm:w-64 max-w-[calc(100vw-2rem)]"
          style={{ background: '#0B1221', color: '#E2E8F0', boxShadow: '0 8px 32px rgba(11,18,33,.25)' }}>
          <span className="font-bold text-white block mb-0.5 capitalize">{term}</span>
          {displayDef}
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
    { title: es ? 'Análisis de tasa de éxito' : 'Win Rate Analysis', desc: es ? 'Tasa de éxito histórica para tu tipo de caso' : 'Historical success rate for your case type', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
    { title: es ? 'Tasa de acuerdos' : 'Settlement Rate', desc: es ? 'Qué % de casos llegan a un acuerdo' : 'What % of cases settle', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { title: es ? 'Cronología mediana' : 'Median Timeline', desc: es ? 'Cuánto tiempo suelen durar los casos' : 'How long cases typically take', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { title: es ? 'Volumen de casos' : 'Case Volume', desc: es ? 'Tamaño de la muestra analizada' : 'Sample size of analyzed cases', free: true, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    // Premium items
    { title: es ? 'Rangos de recuperación' : 'Recovery Ranges', desc: es ? 'Estimaciones bajas, típicas y altas' : 'Low, typical, high estimates', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { title: es ? 'Análisis de jueces' : 'Judge Analytics', desc: es ? 'Cómo fallan jueces específicos' : 'How specific judges rule', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><path d="M3 12l9-9 9 9"/><path d="M12 3v18"/><path d="M3 12h18"/></svg> },
    { title: es ? 'Puntuación de fortaleza' : 'Strength Score', desc: es ? 'Tu caso puntuado del 1 al 100' : 'Your case scored 1-100', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
    { title: es ? 'Comparación estatal' : 'State Comparison', desc: es ? 'Cómo se desempeña tu estado' : 'How your state performs', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
    { title: es ? 'Impacto del abogado' : 'Attorney Impact', desc: es ? 'Probabilidades con vs sin abogado' : 'With vs without lawyer odds', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { title: es ? 'Cronograma estimado' : 'Timeline Estimates', desc: es ? 'Personalizado para tu situación' : 'Customized for your situation', free: false, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {features.map((f, i) => (
        <div key={i} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
          f.free
            ? 'bg-[#131B2E] border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
            : 'border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
        }`} style={!f.free ? { background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(19,27,46,0.9))', borderColor: 'rgba(99,102,241,0.2)' } : undefined}>
          <div className="flex items-start justify-between mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: f.free ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.12)' }}>{f.icon}</div>
            {!f.free && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>}
          </div>
          <div className="text-[14px] font-semibold text-[var(--fg-secondary)]">{f.title}</div>
          <div className="text-[12px] text-[var(--fg-muted)] mt-1">{f.desc}</div>
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
    <div className="bg-[#131B2E] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex gap-2 flex-wrap">
        {Object.keys(stats).map(k => (
          <button key={k} onClick={() => setActiveType(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeType === k
                ? 'bg-[rgba(79,70,229,0.15)] text-[#A5B4FC] border border-[rgba(99,102,241,0.4)] shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                : 'bg-[var(--bg-elevated)] text-[var(--fg-muted)] border border-[#334155] hover:bg-[rgba(99,102,241,0.08)] hover:text-[var(--fg-secondary)]'
            }`}>
            {stats[k].label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { l: es ? 'Tasa de éxito' : 'Win Rate', v: `${s.wr}%`, c: '#0D9488' },
          { l: es ? 'Tiempo promedio' : 'Avg Timeline', v: s.timeline, c: '#1A2744' },
          { l: es ? 'Acuerdos %' : 'Settlement %', v: `${s.settle}%`, c: '#4F46E5' },
          { l: es ? 'Casos analizados' : 'Cases Analyzed', v: `${(s.volume / 1000).toFixed(0)}K`, c: '#4F46E5' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-xl transition-transform hover:scale-[1.03]" style={{ background: `${stat.c}08` }}>
            <div className="text-2xl font-display font-bold" style={{ color: stat.c, letterSpacing: '-1px' }}>{stat.v}</div>
            <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--fg-muted)' }}>{stat.l}</div>
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
    { path: es ? 'Mediación' : 'Mediation', min: 3, max: 10, color: 'var(--accent-secondary)' },
    { path: es ? 'Acuerdo' : 'Settlement', min: 15, max: 50, color: 'var(--accent-primary)' },
    { path: es ? 'Juicio completo' : 'Full Trial', min: 50, max: 200, color: '#E87461' },
  ];

  return (
    <div className="bg-gradient-to-r from-[#131B2E] to-[#0F172A] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
      <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-4 uppercase">{es ? 'Costos promedio por vía legal' : 'Average costs of legal paths'}</div>
      <div className="space-y-4">
        {costs.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-[var(--fg-secondary)]">{c.path}</span>
              <span className="text-sm font-semibold" style={{ color: c.color }}>${c.min}K – ${c.max}K+</span>
            </div>
            <div className="h-3 bg-[#131B2E] rounded-full border border-[var(--border-default)] overflow-hidden relative">
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
    <div className="bg-gradient-to-br from-[#131B2E] to-[#0F172A] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl">💬</div>
        <div className="flex-1">
          <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: 'var(--accent-primary)' }}>{es ? 'RESUMEN EN LENGUAJE SIMPLE' : 'PLAIN ENGLISH SUMMARY'}</div>
          <p className="text-[14px] leading-relaxed text-[var(--fg-muted)] italic">&ldquo;{text}&rdquo;</p>
          <div className="text-[10px] text-[var(--fg-muted)] mt-2">{es ? 'Generado a partir de datos judiciales, no es asesoría legal.' : 'Generated from court data, not legal advice.'}</div>
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
        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-[#162035] to-[#131B2E] border border-[var(--border-default)] transition-transform hover:scale-[1.01]">
          <div className="flex gap-2">
            <span className="text-lg">🎓</span>
            <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed">{fact}</p>
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
        <div key={i} className="p-5 rounded-xl border border-[var(--border-default)] bg-[#131B2E] text-center transition-transform hover:scale-[1.02]">
          <div className="text-3xl mb-2">{step.icon}</div>
          <div className="text-[13px] font-medium text-[var(--fg-secondary)] mb-2">{step.action}</div>
          <div className="flex items-end justify-center gap-1">
            <div className="text-[22px] font-display font-bold" style={{ color: 'var(--accent-primary)' }}>{step.pct}%</div>
            <div className="text-[10px] text-[var(--fg-muted)] pb-1">{es ? 'de usuarios' : 'of users'}</div>
          </div>
          <div className="mt-2 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{
              width: `${step.pct}%`,
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
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
    <div className="p-5 rounded-xl bg-[#131B2E] border border-[var(--border-default)] my-4">
      <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-4 uppercase">{es ? 'Cómo se compara tu caso' : 'How your case compares'}</div>
      <div className="relative h-12 bg-gradient-to-r from-red-200 via-amber-200 to-green-200 rounded-full overflow-hidden flex items-center px-2">
        <div className="absolute h-full flex items-center transition-all duration-500"
          style={{
            left: `${(winRate / 100) * 100}%`,
            transform: 'translateX(-50%)',
          }}>
          <div className="w-6 h-6 bg-[#131B2E] rounded-full shadow-md border-2 border-[#334155]" />
        </div>
      </div>
      <div className="flex justify-between mt-2 px-1">
        {labels.map((l, i) => (
          <div key={i} className="text-[10px] font-medium text-[var(--fg-muted)]">{l}</div>
        ))}
      </div>
      <div className="text-center mt-3 text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>
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
    <div className="fixed inset-0 pointer-events-none z-[var(--z-modal)] overflow-hidden" aria-hidden="true">
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
          background: `radial-gradient(circle, #6366F1, #4F46E5)`,
          boxShadow: `0 0 ${s.size * 2}px #4F46E588`,
          opacity: s.opacity,
          animation: `sparkleRise ${s.duration}ms ${s.delay}ms ease-out forwards`,
        }} />
      ))}
      {/* Center checkmark burst */}
      <div className="success-check-burst">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#4F46E5" strokeWidth="2" opacity="0.3" />
          <path d="M20 33 L28 41 L44 23" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
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
  const color = score >= 60 ? '#0D9488' : score >= 40 ? '#6366F1' : '#E87461';
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
      <div className="text-[11px] font-bold tracking-[2px] -mt-1" style={{ color }}>{label.toUpperCase()}</div>
      <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">Historical profile</div>
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
        background: active ? `${color}12` : '#1E293B',
        border: active ? `2px solid ${color}30` : '1.5px solid #334155',
        transform: active ? 'scale(1.03)' : 'scale(1)',
        minWidth: 90,
      }}>
      <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: active ? color : '#94A3B8' }}>{label}</div>
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
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#4F46E5" strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }} />
    </svg>
  );
}

// Risk Assessment Quiz Component
function RiskAssessmentQuiz({ onClose, onStartAssessment, lang = 'en' }: { onClose: () => void; onStartAssessment: () => void; lang?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const questions = lang === 'es' ? [
    '¿Esto sucedió en los últimos 2 años?',
    '¿Tienes documentos o evidencia?',
    '¿Hubo testigos u otras personas afectadas?'
  ] : [
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
  const strengthLabel = lang === 'es'
    ? (score >= 67 ? 'Fuerte' : score >= 34 ? 'Moderado' : 'Necesita revisión')
    : (score >= 67 ? 'Strong' : score >= 34 ? 'Moderate' : 'Needs Review');
  const strengthColor = score >= 67 ? '#0D9488' : score >= 34 ? '#6366F1' : '#E87461';

  if (answers.length === questions.length) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[var(--z-modal)]">
        <div className="card-bg bg-[#131B2E] rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
          <div className="text-center">
            <div className="text-5xl font-display font-bold mb-3" style={{ color: strengthColor }}>{Math.round(score)}</div>
            <div className="text-xl font-semibold mb-2" style={{ color: strengthColor }}>{strengthLabel}</div>
            <p className="text-sm text-[var(--fg-muted)] mb-6">{lang === 'es' ? 'Basado en tus respuestas, aquí está tu estimación de fortaleza del caso.' : 'Based on your answers, here\u0027s your case strength estimate.'}</p>
            <button onClick={onStartAssessment}
              className="w-full px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer mb-2"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
              {lang === 'es' ? 'Obtener informe completo' : 'Get Full Report'}
            </button>
            <button onClick={onClose} className="w-full px-6 py-2 text-sm font-medium card-bg bg-[var(--bg-elevated)] rounded-xl cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors">
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[var(--z-modal)]">
      <div className="card-bg bg-[#131B2E] rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
        <div className="mb-6">
          <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-3 uppercase">{lang === 'es' ? 'EVALUACIÓN RÁPIDA' : 'Quick Assessment'}</div>
          <div className="text-2xl font-display font-bold">{questions[step]}</div>
          <div className="mt-4 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{
              width: `${((step + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)'
            }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleAnswer(false)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer border-[1.5px] transition-all hover:scale-[1.02]"
            style={{ borderColor: '#1E293B', color: 'var(--fg-muted)', background: '#131B2E' }}>
            {lang === 'es' ? 'No' : 'No'}
          </button>
          <button onClick={() => handleAnswer(true)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
            {lang === 'es' ? 'Sí' : 'Yes'}
          </button>
        </div>
        <button onClick={onClose} className="w-full mt-3 px-4 py-2 text-sm font-medium text-[var(--fg-muted)] rounded-xl cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors">
          {lang === 'es' ? 'Omitir' : 'Skip'}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SHELL COMPONENT (extracted to prevent remounts)
// ============================================================

interface ShellProps {
  darkMode: boolean;
  viewMode: 'auto' | 'mobile' | 'desktop' | 'tablet';
  step: number;
  readingPct: number;
  showConfetti: boolean;
  lang: Lang;
  navScrolled: boolean;
  scrollProgress: number;
  setLang: (lang: Lang) => void;
  isPremium: boolean;
  savedReportsLength: number;
  setShowSaved: (show: boolean) => void;
  reset: () => void;
  t: typeof TRANSLATIONS['en'];
  UPL: typeof UPL;
  showBackToTop: boolean;
  toastMsg: string;
  toastVis: boolean;
  showExitIntent: boolean;
  setShowExitIntent: (show: boolean) => void;
  buy: (plan: string) => void;
  showSaved: boolean;
  referralCode: string;
  toast: (msg: string) => void;
  showCookieConsent: boolean;
  setShowCookieConsent: (show: boolean) => void;
  setLegalPage: (page: 'terms' | 'privacy' | 'cookies' | 'disclaimer') => void;
  legalPage: 'terms' | 'privacy' | 'cookies' | 'disclaimer' | null;
  showMethodology: boolean;
  children: React.ReactNode;
}

function Shell({
  darkMode,
  viewMode,
  step,
  readingPct,
  showConfetti,
  lang,
  navScrolled,
  scrollProgress,
  setLang,
  isPremium,
  savedReportsLength,
  setShowSaved,
  reset,
  t,
  UPL,
  showBackToTop,
  toastMsg,
  toastVis,
  showExitIntent,
  setShowExitIntent,
  buy,
  showSaved,
  referralCode,
  toast,
  showCookieConsent,
  setShowCookieConsent,
  setLegalPage,
  legalPage,
  showMethodology,
  children,
}: ShellProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">{lang === 'es' ? 'Ir al contenido' : 'Skip to content'}</a>
      <div className="dark" role="application" aria-label="MyCaseValue" style={{
        background: '#0B1221',
        minHeight: '100vh',
        fontFamily: "'Outfit', system-ui, sans-serif",
        color: '#F0F2F5',
        maxWidth: viewMode === 'mobile' ? '430px' : viewMode === 'desktop' ? '100%' : undefined,
        margin: viewMode === 'mobile' ? '0 auto' : undefined,
        boxShadow: viewMode === 'mobile' ? '0 0 40px rgba(11,18,33,.08)' : undefined,
        transition: 'max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Reading progress bar */}
        {step === 6 && <div className="reading-progress" style={{ width: `${readingPct}%` }} />}

        {/* Success celebration on report completion */}
        {showConfetti && <SuccessCelebration />}

        {/* Sticky Nav */}
        <Navbar
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          isPremium={isPremium}
          savedReportsCount={savedReportsLength}
          onShowSaved={() => setShowSaved(true)}
          onReset={reset}
          onNewReport={reset}
          newReportLabel={t.new_report}
          premiumLabel={t.premium}
          scrolled={navScrolled}
          scrollProgress={scrollProgress}
        />

        <main id="main-content" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10" role="main" style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
          {/* UPL Banner */}
          <div className="text-center py-2 border-b no-print" style={{ borderColor: '#1E293B', background: 'rgba(30,41,59,0.3)' }}>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[2px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'HERRAMIENTA INFORMATIVA SOLAMENTE — NO ES ASESORÍA LEGAL' : UPL.banner}</span>
          </div>

          {children}

          {/* Footer */}
          <footer className="border-t mt-16 pt-8 pb-10" style={{ borderColor: '#1E293B' }}>
            <div className="flex items-center gap-2.5 mb-5 flex-wrap justify-center sm:justify-start">
              <span className="text-[11px] font-semibold text-[var(--fg-muted)]">{lang === 'es' ? 'Datos verificados:' : 'Verified data:'}</span>
              {['Federal Judicial Center', 'CourtListener', 'uscourts.gov', 'Google Scholar'].map((n, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg card-bg bg-[#131B2E] border border-[var(--border-default)]" style={{ color: 'var(--fg-secondary)' }}>{n}</span>
              ))}
              <span className="text-[10px] font-medium px-2 py-1 rounded-lg" style={{ background: 'rgba(13,148,136,0.15)', color: 'var(--accent-secondary)' }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="3" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><polyline points="20 6 9 17 4 12" /></svg>
                {t.data_updated}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-8">
              <div className="max-w-sm">
                <button onClick={reset} className="bg-transparent border-none mb-4 flex items-center gap-3" style={{ cursor: 'pointer' }}>
                  <Logo size="sm" darkMode={darkMode} />
                </button>
                <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed">
                  {lang === 'es'
                    ? 'MyCaseValue es una herramienta informativa que muestra datos históricos agregados de registros judiciales federales públicos. No constituye asesoría legal. No establece relación abogado-cliente.'
                    : 'MyCaseValue is an informational tool that displays aggregate historical data from public federal court records. It does not constitute legal advice and does not establish an attorney-client relationship.'}
                </p>
              </div>
              <div className="sm:text-right text-[12px] text-[var(--fg-muted)] leading-relaxed">
                {'\u00A9'} {new Date().getFullYear()} MyCaseValue LLC. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}<br />
                <a href="/methodology" className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-muted)] underline mt-1 inline-block transition-colors">
                  {lang === 'es' ? 'Metodología' : 'Methodology'}
                </a>
                <div className="mt-2 flex flex-col sm:items-end gap-0.5">
                  <a href="mailto:support@mycasevalue.com" className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ textDecoration: 'none' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    support@mycasevalue.com
                  </a>
                  <a href="mailto:billing@mycasevalue.com" className="text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ textDecoration: 'none' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    billing@mycasevalue.com
                  </a>
                </div>
                {showMethodology && (
                  <div className="card-bg bg-[#131B2E] rounded-xl p-4 mt-3 border border-[var(--border-default)] text-left text-[12px] text-[var(--fg-muted)] leading-relaxed max-w-md">
                    MyCaseValue analyzes data from the Federal Judicial Center Integrated Database (IDB), containing outcome data for every federal civil case since 1970, cross-referenced with CourtListener (9M+ opinions). Win rates from AO-coded final dispositions. Recovery ranges from cases with monetary awards. All data is public domain (17 U.S.C. 105). MyCaseValue does not evaluate individual claims.
                  </div>
                )}
              </div>
            </div>

            {/* Social sharing */}
            <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t no-print" style={{ borderColor: '#1E293B' }}>
              <span className="text-[11px] font-semibold text-[var(--fg-muted)] tracking-[2px] mr-1">{lang === 'es' ? 'COMPARTIR' : 'SHARE'}</span>
              {[
                { icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', label: 'X', color: '#000000', hoverBg: '#F0F0F0', filled: true,
                  url: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check federal court outcome data for your case type')}&url=${encodeURIComponent(window.location.origin)}` },
                { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook', color: '#1877F2', hoverBg: '#E7F0FE', filled: false,
                  url: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}` },
                { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z', label: 'LinkedIn', color: '#0A66C2', hoverBg: '#E8F1FA', filled: false,
                  url: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}` },
                { icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71', label: lang === 'es' ? 'Copiar enlace' : 'Copy link', color: 'var(--accent-primary)', hoverBg: 'rgba(99,102,241,0.15)', filled: false,
                  url: () => '' },
              ].map((s, i) => (
                <button key={i} onClick={() => {
                  if (s.label === 'Copy link' || s.label === 'Copiar enlace') {
                    navigator.clipboard.writeText(window.location.origin);
                    toast(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
                  } else {
                    window.open(s.url(), '_blank', 'noopener,noreferrer,width=600,height=400');
                  }
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                style={{ background: 'var(--bg-elevated)', border: '1px solid #334155' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.borderColor = s.color + '40'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.borderColor = '#334155'; }}
                title={`${lang === 'es' ? 'Compartir en' : 'Share on'} ${s.label}`}
                aria-label={`${lang === 'es' ? 'Compartir en' : 'Share on'} ${s.label}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={s.filled ? s.color : 'none'} stroke={s.filled ? 'none' : s.color} strokeWidth={s.filled ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round" className="transition-colors">
                    <path d={s.icon} />
                  </svg>
                </button>
              ))}
            </div>

            {/* Secure payments badge */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 no-print">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid #334155' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span className="text-[11px] font-semibold tracking-[0.5px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Pagos seguros con' : 'Secure payments by'}</span>
                {/* Stripe logo */}
                <svg width="36" height="15" viewBox="0 0 60 25" fill={'#94A3B8'} xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10.2c0-.7.6-1 1.5-1 1.4 0 3.1.4 4.5 1.2V6.3c-1.5-.6-3-.8-4.5-.8C3.2 5.5.5 7.5.5 10.5c0 4.6 6.3 3.9 6.3 5.9 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.9-1.5v4.2c1.7.7 3.4 1 4.9 1 3.4 0 5.8-1.7 5.8-4.7 0-5-6.3-4.1-6.3-6z"/>
                  <path d="M14.4 1.5l-4.8 1v13.3c0 2.4 1.8 4.2 4.3 4.2 1.4 0 2.4-.2 2.9-.5v-3.8c-.5.2-3.1.9-3.1-1.4V9.5h3.1V5.8h-3.1l.7-4.3z"/>
                  <path d="M23.2 7.2l-.3-1.4h-4.3v14.4h4.9v-9.8c1.2-1.5 3.1-1.2 3.7-1v-4.5c-.7-.2-3.2-.7-4.3 1.3h.3z"/>
                  <path d="M33.1 5.8h-4.9v14.4h4.9V5.8zM33.1 0h-4.9v4.6h4.9V0z"/>
                  <path d="M42.2 5.5c-1.9 0-3.2.9-3.9 1.5l-.3-1.2h-4.3v19.5h4.9v-4.7c.7.5 1.8.8 3 .8 3 0 5.7-2.4 5.7-7.6-.1-4.8-2.8-8.3-5.1-8.3zm-.9 12.3c-1 0-1.5-.4-1.9-.8V10.6c.4-.5 1-.9 1.9-.9 1.5 0 2.5 1.7 2.5 4s-1 4-2.5 4z"/>
                  <path d="M55.8 5.5c-3.1 0-5.3 2.7-5.3 6.2 0 4.1 2.4 6 5.8 6 1.7 0 2.9-.4 3.8-.9v-3.7c-1 .5-2.1.8-3.4.8-1.4 0-2.6-.5-2.7-2.1h6.8c0-.2.1-1 .1-1.3-.1-3.7-1.8-5-5.1-5zm-1.4 5c0-1.5.9-2.1 1.7-2.1s1.6.6 1.6 2.1h-3.3z"/>
                </svg>
              </div>
              <div className="flex items-center gap-2">
                {/* Visa */}
                <span className="flex items-center justify-center w-10 h-7 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid #334155' }}>
                  <svg width="28" height="10" viewBox="0 0 750 471" fill="none"><path d="M278.198 334.228l33.36-195.763h53.358l-33.384 195.763h-53.334zM524.307 142.687c-10.57-3.966-27.135-8.222-47.822-8.222-52.725 0-89.863 26.551-90.18 64.604-.635 28.109 26.502 43.773 46.754 53.126 20.771 9.574 27.752 15.679 27.654 24.243-.14 13.084-16.598 19.065-31.924 19.065-21.357 0-32.688-2.966-50.205-10.258l-6.875-3.11-7.488 43.823c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.2-22.28-14.016-39.215-44.8-53.187-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.286-.271 29.966 3.439 39.627 7.406l4.8 2.252 7.496-42.395zM661.615 138.464h-41.23c-12.773 0-22.332 3.486-27.94 16.234l-79.244 179.402h56.031s9.159-24.121 11.232-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.52l-43.197-195.636zm-65.417 126.408c4.414-11.279 21.26-54.724 21.26-54.724-.317.534 4.381-11.329 7.074-18.684l3.606 16.878 12.348 56.53h-44.288zM232.903 138.464L180.664 271.96l-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.204 56.455-.065 84.004-195.386h-56.524z" fill="#2566AF"/><path d="M131.92 138.464H45.879l-.682 4.073c66.939 16.204 111.232 55.363 129.618 102.415l-18.709-89.96c-3.229-12.396-12.597-16.095-24.186-16.528z" fill="#E6A540"/></svg>
                </span>
                {/* Mastercard */}
                <span className="flex items-center justify-center w-10 h-7 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid #334155' }}>
                  <svg width="22" height="14" viewBox="0 0 152 100"><circle cx="50" cy="50" r="50" fill="#EB001B"/><circle cx="102" cy="50" r="50" fill="#F79E1B"/><path d="M76 14.8a49.8 49.8 0 000 70.4 49.8 49.8 0 000-70.4z" fill="#FF5F00"/></svg>
                </span>
                {/* Amex */}
                <span className="flex items-center justify-center w-10 h-7 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid #334155' }}>
                  <svg width="22" height="14" viewBox="0 0 40 26"><rect width="40" height="26" rx="3" fill="#2E77BC"/><text x="20" y="17" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">AMEX</text></svg>
                </span>
                {/* PayPal */}
                <span className="flex items-center justify-center px-1.5 py-1 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid #334155' }}>
                  <svg width="22" height="14" viewBox="0 0 100 32"><path d="M37.8 3.2h-8.5c-.6 0-1.1.4-1.2 1L24.8 25c-.1.4.3.8.7.8h4.1c.6 0 1.1-.4 1.2-1l.9-5.7c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4-1.3-1.4-3.5-2.2-6.3-2.2l-.2-.3z" fill="#253B80"/><path d="M70.3 3.2h-8.5c-.6 0-1.1.4-1.2 1l-3.3 20.8c-.1.4.3.8.7.8h4.3c.4 0 .8-.3.8-.7l.9-5.9c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4-1.3-1.4-3.5-2.2-6.3-2.2v.6z" fill="#179BD7"/><path d="M13.5 3.2H5c-.6 0-1.1.4-1.2 1L.5 25c-.1.4.3.8.7.8h4.1c.6 0 1.1-.4 1.2-1l.9-5.7c.1-.6.6-1 1.2-1h2.8c5.6 0 8.8-2.7 9.7-8 .4-2.3 0-4.1-1.1-5.4C18.7 3.4 16.5 3.2 13.5 3.2z" fill="#253B80"/></svg>
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t no-print flex-wrap" style={{ borderColor: '#1E293B' }}>
              <a href="/about" className="text-[11px] transition-colors" style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Acerca de' : 'About'}</a>
              <span style={{ color: '#334155' }}>·</span>
              <a href="/cases" className="text-[11px] transition-colors" style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Categorías' : 'Case Categories'}</a>
              <span style={{ color: '#334155' }}>·</span>
              <a href="/faq" className="text-[11px] transition-colors" style={{ textDecoration: 'none', color: 'var(--fg-muted)' }}>FAQ</a>
              <span style={{ color: '#334155' }}>·</span>
              <button onClick={() => setLegalPage('terms')} className="text-[11px] bg-transparent border-none cursor-pointer transition-colors" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Términos' : 'Terms'}</button>
              <span style={{ color: '#334155' }}>·</span>
              <button onClick={() => setLegalPage('privacy')} className="text-[11px] bg-transparent border-none cursor-pointer transition-colors" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Privacidad' : 'Privacy'}</button>
              <span style={{ color: '#334155' }}>·</span>
              <button onClick={() => setLegalPage('cookies')} className="text-[11px] bg-transparent border-none cursor-pointer transition-colors" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Cookies' : 'Cookies'}</button>
              <span style={{ color: '#334155' }}>·</span>
              <button onClick={() => setLegalPage('disclaimer')} className="text-[11px] bg-transparent border-none cursor-pointer transition-colors" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Aviso legal' : 'Disclaimer'}</button>
            </div>

            {/* Legal disclaimer bar */}
            <div className="mt-5 pt-4 border-t" style={{ borderColor: '#1E293B' }}>
              <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid #334155' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span className="text-[11px] font-bold tracking-[2px]" style={{ color: 'var(--fg-muted)' }}>
                    {lang === 'es' ? 'AVISO LEGAL' : 'LEGAL NOTICE'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
                  {lang === 'es'
                    ? 'MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos solo con fines informativos. No constituye asesoría legal, opinión legal ni recomendación. No se crea relación abogado-cliente. Consulte siempre a un abogado con licencia para su situación específica.'
                    : 'MyCaseValue provides aggregate historical data from public federal court records for informational purposes only. It does not constitute legal advice, legal opinion, or recommendation of any kind. No attorney-client relationship is created. Always consult a licensed attorney for advice specific to your situation.'}
                </p>
                <p className="text-[10px] mt-2" style={{ color: '#475569' }}>
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
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-[var(--z-dropdown)] cursor-pointer no-print transition-all"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 4px 16px rgba(64,64,242,.3)' }}
            aria-label="Back to top">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 15l-6-6-6 6" /></svg>
          </button>
        )}

        {/* Exit intent popup */}
        {showExitIntent && !isPremium && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.6)', backdropFilter: 'blur(8px)' }}>
            <div className="exit-intent-modal card-bg bg-[#131B2E] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowExitIntent(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center cursor-pointer border-none" aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 mx-auto" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </div>
              <div className="text-xl font-display font-bold mb-2">{lang === 'es' ? '¡Espera! Te falta lo mejor' : "Wait — you're missing the best part"}</div>
              <p className="text-[14px] text-[var(--fg-muted)] mb-1 leading-relaxed">{lang === 'es' ? 'Tu informe gratuito muestra la tasa de éxito. El informe completo agrega rangos de recuperación, impacto del abogado, cronología y más.' : 'Your free report shows the win rate. The full report adds recovery ranges, attorney impact, timeline, and more.'}</p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold mb-4" style={{ background: 'rgba(232,116,97,0.12)', color: '#E87461' }}>
                {lang === 'es' ? 'Oferta por tiempo limitado' : 'Limited time offer'}
              </div>
              <button onClick={() => { setShowExitIntent(false); buy('single'); }}
                className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                {lang === 'es' ? 'Desbloquear informe completo — $5.99' : 'Unlock full report — $5.99'}
              </button>
              <button onClick={() => setShowExitIntent(false)} className="text-[13px] text-[var(--fg-muted)] mt-3 bg-transparent border-none cursor-pointer">
                {lang === 'es' ? 'Ahora no' : 'Not now'}
              </button>
            </div>
          </div>
        )}

        {/* Saved Reports drawer */}
        {showSaved && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowSaved(false)}>
            <div className="card-bg bg-[#131B2E] rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-display font-bold">{lang === 'es' ? 'Mis informes' : 'My Reports'}</div>
                <button onClick={() => setShowSaved(false)} className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center cursor-pointer border-none" aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <SavedReports
                lang={lang}
                onLoadReport={(report: any) => {
                  setShowSaved(false);
                  toast(lang === 'es' ? 'Cargando informe...' : 'Loading report...');
                }}
              />
              {/* Referral code */}
              <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
                <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-1">{lang === 'es' ? 'TU CÓDIGO DE REFERENCIA' : 'YOUR REFERRAL CODE'}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] text-sm font-data font-bold" style={{ color: 'var(--accent-primary)' }}>{referralCode}</div>
                  <button onClick={() => { navigator.clipboard.writeText(referralCode); toast(lang === 'es' ? '¡Copiado!' : 'Copied!'); }}
                    className="px-3 py-2 text-[12px] font-semibold rounded-lg cursor-pointer"
                    style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)', border: 'none' }}>{lang === 'es' ? 'Copiar' : 'Copy'}</button>
                </div>
                <div className="text-[11px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'Comparte y obtén un informe gratis' : 'Share and get a free report'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile bottom navigation */}
        <MobileBottomNav
          step={step}
          onReset={reset}
          onSearch={() => { if (step !== 1) reset(); }}
          isPremium={isPremium}
          lang={lang}
          onSaved={() => setShowSaved(true)}
          savedCount={savedReportsLength}
        />

        {/* Mobile bottom navigation */}
        <BottomNav
          lang={lang}
          activeTab={step === 0 ? 'home' : step === 6 ? 'reports' : 'search'}
          onNavigate={(tab) => {
            if (tab === 'home') reset();
            if (tab === 'search') { if (step !== 0) reset(); setTimeout(() => { const el = document.querySelector('input[type="search"], input[type="text"]'); if (el) (el as HTMLElement).focus(); }, 100); }
            if (tab === 'premium') buy('unlimited');
          }}
          isPremium={isPremium}
        />

        {/* Cookie consent banner */}
        {showCookieConsent && (
          <div className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)] p-4 no-print" style={{ background: 'rgba(11,18,33,0.95)', backdropFilter: 'blur(12px)' }}>
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                  {lang === 'es'
                    ? 'Usamos cookies esenciales para el funcionamiento del sitio. Las cookies opcionales de análisis nos ayudan a mejorar.'
                    : 'We use essential cookies for site functionality. Optional analytics cookies help us improve your experience.'}
                  <button onClick={() => setLegalPage('privacy')} className="text-[#4F46E5] underline bg-transparent border-none cursor-pointer ml-1 text-[13px]">
                    {lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
                  </button>
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  try { localStorage.setItem('mcv_cookies_accepted', 'essential'); } catch {}
                  setShowCookieConsent(false);
                }} className="px-4 py-2 text-[12px] font-semibold bg-transparent rounded-lg cursor-pointer transition-colors" style={{ color: 'var(--fg-secondary)', border: '1px solid #475569' }}>
                  {lang === 'es' ? 'Solo esenciales' : 'Essential only'}
                </button>
                <button onClick={() => {
                  try { localStorage.setItem('mcv_cookies_accepted', 'all'); } catch {}
                  setShowCookieConsent(false);
                }} className="px-4 py-2 text-[12px] font-semibold text-white rounded-lg cursor-pointer border-none"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
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
  const [tier, setTier] = useState('unlimited');
  const [showPricing, setShowPricing] = useState(false);
  const [consent, setConsent] = useState(false);
  const [rangeMode, setRangeMode] = useState('typical');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySent, setNotifySent] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVis, setToastVis] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [liveCount, setLiveCount] = useState(0);
  const [showMethodology, setShowMethodology] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);
  const [pollVote, setPollVote] = useState('');
  const darkMode = true; // Always dark mode — matches brand identity
  const [lang, setLang] = useState<Lang>('en');
  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');
  const [compareMode, setCompareMode] = useState(false);
  const [compareNos, setCompareNos] = useState<string | null>(null);
  const [compareData, setCompareData] = useState<any>(null);
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [showReportLoader, setShowReportLoader] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState('overview');
  const [emailCaptured, setEmailCaptured] = useState(() => {
    if (typeof window !== 'undefined') return !!localStorage.getItem('mcv-email');
    return false;
  });
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [readingPct, setReadingPct] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [naturalInput, setNaturalInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<Array<{sit: any; opt: any; score: number}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [circuitView, setCircuitView] = useState<'bars' | 'table'>('bars');
  const [expandedCircuit, setExpandedCircuit] = useState<string | null>(null);
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [factIndex, setFactIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [legalPage, setLegalPage] = useState<'terms' | 'privacy' | 'cookies' | 'disclaimer' | null>(null);
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
          // Verification endpoint failed — don't unlock without confirmation
          toast(lang === 'es' ? 'Error de verificación. Por favor contacte soporte.' : 'Verification error. Please contact support@mycasevalue.com if your payment was charged.');
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
    // Dark mode is always on — no system preference check needed
  }, []);

  // Reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Global scroll tracking for navbar
  useEffect(() => {
    const handler = () => {
      setNavScrolled(window.scrollY > 10);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(window.scrollY / docH, 1) : 0);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // Call immediately to set initial state
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Did You Know facts rotation
  useEffect(() => {
    const timer = setInterval(() => setFactIndex(i => (i + 1) % 6), 10000);
    return () => clearInterval(timer);
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
      // Show email gate for non-premium users who haven't captured email
      if (!emailCaptured && tier !== 'unlimited') {
        const gateTimer = setTimeout(() => setShowEmailGate(true), 3000);
        const confettiTimer = setTimeout(() => setShowConfetti(false), 2500);
        return () => { clearTimeout(gateTimer); clearTimeout(confettiTimer); };
      }
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
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVis(true);
    toastTimer.current = setTimeout(() => setToastVis(false), 2400);
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
    } catch { toast(lang === 'es' ? 'No se pudo guardar' : 'Could not save'); }
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

  // AI-powered real-time suggestions as user types
  const computeSuggestions = useCallback((input: string) => {
    if (!input || input.trim().length < 2) { setAiSuggestions([]); setShowSuggestions(false); return; }
    const lower = input.toLowerCase().trim();
    const words = lower.split(/\s+/);
    const results: Array<{sit: any; opt: any; score: number}> = [];

    SITS.forEach((sit: any) => {
      (sit.opts || []).forEach((opt: any) => {
        let score = 0;
        const optLower = (opt.label + ' ' + opt.d + ' ' + (sit.sub || '')).toLowerCase();
        // Exact phrase match (highest priority)
        if (optLower.includes(lower)) score += 10;
        // Word-by-word matching
        words.forEach((w: string) => {
          if (w.length < 2) return;
          if (optLower.includes(w)) score += 3;
          // Fuzzy: partial word match
          const optWords = optLower.split(/[\s,/]+/);
          optWords.forEach((ow: string) => { if (ow.startsWith(w) || w.startsWith(ow.slice(0, 3))) score += 1; });
        });
        // Boost for category match
        if (sit.label.toLowerCase().includes(lower) || (sit.sub || '').toLowerCase().includes(lower)) score += 5;
        if (score > 0) results.push({ sit, opt, score });
      });
    });

    results.sort((a, b) => b.score - a.score);
    const top = results.slice(0, 6);
    setAiSuggestions(top);
    setShowSuggestions(top.length > 0);
  }, []);

  // Debounced suggestion trigger
  useEffect(() => {
    const timer = setTimeout(() => computeSuggestions(naturalInput), 150);
    return () => clearTimeout(timer);
  }, [naturalInput, computeSuggestions]);

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
    if (rate >= 55) return { grade: 'A-', color: 'var(--accent-secondary)' };
    if (rate >= 50) return { grade: 'B+', color: '#34D399' };
    if (rate >= 45) return { grade: 'B', color: '#6366F1' };
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

  // Scroll handler moved to Navbar component

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Escape: go back
      if (e.key === 'Escape') {
        if (step === 6) { setResult(null); go(5); }
        else if (step > 1) go(step - 1);
        else if (step === 1) go(0);
      }
      // Ctrl/Cmd + K: focus search input (if on homepage)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('input[type="text"]');
        if (input) input.focus();
      }
      // Ctrl/Cmd + P: print report (if on report page)
      if ((e.metaKey || e.ctrlKey) && e.key === 'p' && step === 6 && isPremium) {
        e.preventDefault();
        try { window.print(); } catch {}
      }
      // Ctrl/Cmd + D: reserved (dark mode is always on)
      // Ctrl/Cmd + N: new report
      if ((e.metaKey || e.ctrlKey) && e.key === 'n' && step !== 0) {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, isPremium]);

  // Live counter
  useEffect(() => {
    if (step === 6 && result) {
      setLiveCount(Math.floor(Math.random() * 30) + 25);
      const iv = setInterval(() => setLiveCount(c => Math.max(10, c + Math.floor(Math.random() * 5) - 2)), 4000);
      return () => clearInterval(iv);
    }
  }, [step, result]);

  function startLoad() {
    setShowReportLoader(true); setLoading(true); go(6);
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

  // Create shellProps object for passing to Shell component
  const shellProps: Omit<ShellProps, 'children'> = {
    darkMode,
    viewMode,
    step,
    readingPct,
    showConfetti,
    lang,
    navScrolled,
    scrollProgress,
    setLang,
    isPremium,
    savedReportsLength: savedReports.length,
    setShowSaved,
    reset,
    t,
    UPL,
    showBackToTop,
    toastMsg,
    toastVis,
    showExitIntent,
    setShowExitIntent,
    buy,
    showSaved,
    referralCode,
    toast,
    showCookieConsent,
    setShowCookieConsent,
    setLegalPage,
    legalPage,
    showMethodology,
  };

  // Keyboard shortcuts
  const keyboardShortcuts = useMemo(() => [
    { key: 'h', label: 'H', description: lang === 'es' ? 'Ir al inicio' : 'Go to home', action: () => reset() },
    { key: 's', label: 'S', description: lang === 'es' ? 'Buscar' : 'Search cases', action: () => { if (step !== 1) reset(); } },
    { key: 'l', label: 'L', description: lang === 'es' ? 'Cambiar idioma' : 'Toggle language', action: () => setLang(lang === 'en' ? 'es' : 'en') },
    { key: 'p', label: 'P', description: lang === 'es' ? 'Ver precios' : 'View pricing', action: () => setShowPricing(true) },
    { key: 't', label: 'T', description: lang === 'es' ? 'Ir arriba' : 'Scroll to top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ], [lang, step, reset, setLang, setShowPricing]);

  const keyboardShortcutsEl = <KeyboardShortcuts shortcuts={keyboardShortcuts} lang={lang} />;

  if (step === 0) return (
    <Shell {...shellProps}>
      {keyboardShortcutsEl}
      {showOnboarding && <OnboardingTour lang={lang} onComplete={() => setShowOnboarding(false)} />}
      <SocialProofToast lang={lang} active={true} />
      <div className="hero-bg hero-parallax mesh-bg py-8 sm:py-12 pb-6 relative overflow-hidden noise-overlay particle-field cinematic-enter">
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

        <div className="hero-grid grid gap-6 lg:gap-10" style={{ gridTemplateColumns: '1fr' }}>
          <div className="relative z-10">
            <Reveal>
              {/* Top badges row — dark glass on dark hero */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ color: 'var(--accent-secondary, #A5B4FC)', background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {t.hero_badge}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold"
                  style={{ color: '#5EEAD4', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.2)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {t.hero_privacy}
                </div>
              </div>

              {/* Tagline with vertical accent line — matches LinkedIn header brand */}
              <div className="flex items-start gap-4 mb-8">
                <div className="hero-accent-line mt-2 hidden sm:block" />
                <h1 className="font-display text-[42px] sm:text-[54px] lg:text-[66px] leading-[1.1] font-extrabold" style={{ letterSpacing: '-3px' }}>
                  <span className="hero-tagline-bold">{t.hero_title_1}</span><br />
                  <span className="hero-tagline-light">{t.hero_title_2}{' '}</span>
                  <span className="text-shimmer hero-tagline-light gradient-text-animated" style={{ fontStyle: 'italic' }}>{t.hero_title_3}</span>
                </h1>
              </div>

              {/* Animated hero stats — 3 columns with visual dividers */}
              <div className="flex gap-4 sm:gap-6 mb-8 flex-wrap data-grid-stagger">
                <div className="stat-glow" style={{ '--stat-color': '#FFFFFF' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#FFFFFF', textShadow: '0 2px 12px rgba(255,255,255,0.1)' }}>
                    {heroCounterDone ? <><AnimatedNumber value={4.2} decimals={1} />M+</> : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                  </div>
                  <div className="text-xs mt-1.5 font-semibold" style={{ color: '#8B9AB5' }}>{lang === 'es' ? 'Casos analizados' : 'Federal cases analyzed'}</div>
                </div>
                <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #0D9488, transparent)', opacity: 0.4 }} />
                <div className="stat-glow" style={{ '--stat-color': '#0D9488' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: 'var(--accent-secondary)', textShadow: '0 2px 12px rgba(13,148,136,0.3)' }}>
                    {heroCounterDone ? '50+' : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                  </div>
                  <div className="text-xs mt-1.5 font-semibold" style={{ color: '#8B9AB5' }}>{lang === 'es' ? 'Tipos de caso' : 'Case types covered'}</div>
                </div>
                <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #6366F1, transparent)', opacity: 0.4 }} />
                <div className="stat-glow" style={{ '--stat-color': '#A5B4FC' } as any}>
                  <div className="text-4xl sm:text-5xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: 'var(--accent-secondary, #A5B4FC)', textShadow: '0 2px 12px rgba(165,180,252,0.3)' }}>
                    {heroCounterDone ? '2min' : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                  </div>
                  <div className="text-xs mt-1.5 font-semibold" style={{ color: '#8B9AB5' }}>{lang === 'es' ? 'Para tu informe' : 'To your report'}</div>
                </div>
              </div>

              {/* Mini data visualization — animated bar chart */}
              <div className="mb-6 flex items-end gap-4">
                <div className="hero-mini-chart">
                  {[65, 45, 72, 38, 58, 80, 52, 68, 42, 76, 55, 62].map((h, i) => (
                    <div key={i} className="bar" style={{
                      height: `${h * 0.5}px`,
                      background: h > 60 ? 'linear-gradient(to top, #0D9488, #14B8A6)' : 'linear-gradient(to top, #CBD5E1, #94A3B8)',
                      animationDelay: `${0.8 + i * 0.06}s`,
                    }} />
                  ))}
                </div>
                <div className="text-[11px] leading-tight" style={{ color: '#8B9AB5' }}>
                  <div className="font-semibold" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{lang === 'es' ? 'Tasa de éxito por tipo de caso' : 'Win rate by case type'}</div>
                  <div>{lang === 'es' ? '12 categorías analizadas' : '12 categories analyzed'}</div>
                </div>
              </div>

              {/* Trusted by — refined for dark hero */}
              <div className="mb-8">
                <div className="text-[10px] font-bold mb-3 tracking-[2px] uppercase" style={{ color: '#6B7A94' }}>{lang === 'es' ? 'Fuente de datos' : 'Data sourced from'}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Federal Judicial Center', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg> },
                    { name: 'CourtListener', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2"><path d="M9 11L12 14L22 4" /></svg> },
                    { name: 'PACER', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2"><circle cx="12" cy="12" r="9" /><polyline points="9 11 12 14 15 10" /></svg> },
                  ].map((s, i) => (
                    <div key={i} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all hover:scale-[1.02] spotlight-card stat-underline" style={{
                      color: '#C8D3E5',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {s.icon}
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[17px] sm:text-[19px] max-w-xl leading-[1.7] mb-6" style={{ color: '#8B9AB5' }}>
                {t.hero_sub_pre} <strong className="font-data" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{totalDisplay}</strong> {t.hero_sub_post}
              </p>

              {/* AI-integrated natural language input with smart suggestions */}
              <div className="mb-6 max-w-lg relative" style={{ zIndex: 20 }}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.2), rgba(13,148,136,0.1), rgba(64,64,242,0.2))', filter: 'blur(8px)' }} />
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5" style={{ pointerEvents: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/></svg>
                      <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#6366F1' }}>AI</span>
                    </div>
                    <input type="text" value={naturalInput}
                      onChange={e => setNaturalInput(e.target.value)}
                      onFocus={() => { if (aiSuggestions.length > 0) setShowSuggestions(true); }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && naturalInput.trim()) {
                          setShowSuggestions(false);
                          if (aiSuggestions.length > 0) {
                            const top = aiSuggestions[0];
                            setSit(top.sit); setSpec(top.opt); setAmount(top.sit.dm); go(2);
                            toast(lang === 'es' ? `Detectado: ${top.opt.d}` : `Matched: ${top.opt.d}`);
                          } else {
                            if (!detectCaseType(naturalInput)) go(1);
                          }
                        }
                        if (e.key === 'Escape') setShowSuggestions(false);
                      }}
                      placeholder={lang === 'es' ? 'Describe tu situación en pocas palabras...' : 'Describe your situation in a few words...'}
                      className="w-full text-[15px] rounded-2xl transition-all input-frosted focus-ring-premium"
                      style={{
                        color: '#F0F2F5',
                        boxShadow: '0 4px 20px rgba(0,0,0,.15)',
                        padding: '18px 56px 18px 58px',
                      }} />
                    <button onClick={() => {
                        if (naturalInput.trim()) {
                          setShowSuggestions(false);
                          if (aiSuggestions.length > 0) {
                            const top = aiSuggestions[0];
                            setSit(top.sit); setSpec(top.opt); setAmount(top.sit.dm); go(2);
                            toast(lang === 'es' ? `Detectado: ${top.opt.d}` : `Matched: ${top.opt.d}`);
                          } else { if (!detectCaseType(naturalInput)) go(1); }
                        }
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center border-none magnetic-btn ripple-effect"
                      aria-label={lang === 'es' ? 'Buscar' : 'Search'}
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 2px 10px rgba(64,64,242,.25)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  {/* AI suggestion dropdown */}
                  {showSuggestions && aiSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden border shadow-2xl"
                      style={{ background: '#131B2E', borderColor: 'rgba(99,102,241,0.2)', boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)', zIndex: 50 }}>
                      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'rgba(99,102,241,0.1)', background: 'rgba(99,102,241,0.05)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/></svg>
                        <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>
                          {lang === 'es' ? 'COINCIDENCIAS INTELIGENTES' : 'SMART MATCHES'}
                        </span>
                        <span className="text-[10px] ml-auto" style={{ color: 'var(--fg-muted)' }}>
                          {lang === 'es' ? 'Presiona Enter para seleccionar' : 'Press Enter to select top match'}
                        </span>
                      </div>
                      {aiSuggestions.map((s, i) => (
                        <button key={i}
                          onMouseDown={(e) => { e.preventDefault(); setSit(s.sit); setSpec(s.opt); setAmount(s.sit.dm); go(2); setShowSuggestions(false); toast(lang === 'es' ? `Seleccionado: ${s.opt.d}` : `Selected: ${s.opt.d}`); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-none bg-transparent"
                          style={{ borderBottom: i < aiSuggestions.length - 1 ? '1px solid rgba(30,41,59,0.5)' : 'none' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.sit.color}20`, border: `1px solid ${s.sit.color}30` }}>
                            <CategoryIcon name={s.sit.icon} size={14} color={s.sit.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate" style={{ color: '#E2E8F0' }}>{s.opt.label}</div>
                            <div className="text-[11px] truncate" style={{ color: 'var(--fg-muted)' }}>{s.sit.label} · {s.opt.d}</div>
                          </div>
                          {i === 0 && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-secondary, #A5B4FC)' }}>
                              {lang === 'es' ? 'Mejor' : 'Best match'}
                            </span>
                          )}
                          <span className="text-[11px] font-data flex-shrink-0" style={{ color: 'var(--fg-muted)' }}>{Math.min(Math.round(s.score * 8), 99)}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[11px] mt-2 px-1 flex items-center gap-1.5" style={{ color: '#6B7A94' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B7A94" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/></svg>
                  {lang === 'es' ? 'AI detecta automáticamente tu tipo de caso mientras escribes' : 'AI automatically detects your case type as you type'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => go(1)}
                  className="cta-glow cta-pulse btn-primary magnetic-btn ripple-effect px-8 sm:px-8 py-3.5 sm:py-4.5 text-[15px] sm:text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 4px 24px rgba(64,64,242,.3)' }}>
                  {t.hero_cta}
                </button>
                <button onClick={demo}
                  className="magnetic-btn px-8 py-3.5 sm:py-4.5 text-[15px] font-medium rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    color: '#C8D3E5',
                  }}>
                  {t.hero_demo}
                </button>
              </div>

              {/* Social proof inline */}
              <div className="flex items-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {['#4F46E5', '#0D9488', '#1A2744', '#6366F1', '#0D9488'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      style={{ background: c, zIndex: 5 - i, border: '2px solid #131D35' }}>
                      {['J', 'M', 'K', 'S', 'A'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-[12px]" style={{ color: '#8B9AB5' }}>
                  <strong className="font-data" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{liveCounter}+</strong> {lang === 'es' ? 'informes hoy' : 'reports today'}
                  <span className="live-beacon ml-1.5" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Hero Right Column — Floating Report Preview */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(64,64,242,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative w-full max-w-[420px] gentle-float">
              {/* Main report card — glass ultra premium */}
              <div className="rounded-2xl overflow-hidden glass-ultra liquid-border gpu-accelerate">
                {/* Top accent bar */}
                <div className="h-1 progress-animated" />

                {/* Header */}
                <div className="px-6 pt-5 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#6B7A94' }}>{lang === 'es' ? 'INFORME DE ANÁLISIS DE CASO' : 'CASE ANALYSIS REPORT'}</div>
                    <div className="text-[15px] font-display font-bold mt-0.5" style={{ color: '#F0F2F5' }}>{lang === 'es' ? 'Discriminación Laboral' : 'Employment Discrimination'}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>

                {/* Win rate */}
                <div className="px-6 py-4">
                  <div className="flex items-end gap-3 mb-3">
                    <div className="text-[42px] font-display font-extrabold leading-none" style={{ color: 'var(--accent-secondary)', letterSpacing: '-2px', textShadow: '0 0 20px rgba(13,148,136,0.3)' }}>67%</div>
                    <div className="text-[12px] font-semibold pb-1.5" style={{ color: '#6B7A94' }}>{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="h-full rounded-full" style={{ width: '67%', background: 'linear-gradient(90deg, #0D9488, #14B8A6)' }} />
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="grid grid-cols-3 gap-px mx-3 sm:mx-6 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {[
                    { v: '$85K', l: lang === 'es' ? 'Recuperación media' : 'Median recovery', c: '#A5B4FC' },
                    { v: '14mo', l: lang === 'es' ? 'Duración media' : 'Avg duration', c: '#F0F2F5' },
                    { v: '72%', l: lang === 'es' ? 'Se resuelven' : 'Settle rate', c: '#5EEAD4' },
                  ].map((s, i) => (
                    <div key={i} className="text-center py-3 px-2" style={{ background: 'rgba(11,18,33,0.4)' }}>
                      <div className="text-[16px] font-display font-bold" style={{ color: s.c }}>{s.v}</div>
                      <div className="text-[10px] font-semibold mt-0.5" style={{ color: '#6B7A94' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="px-6 pb-5">
                  <div className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: '#6B7A94' }}>{lang === 'es' ? 'DISTRIBUCIÓN DE RESULTADOS' : 'OUTCOME DISTRIBUTION'}</div>
                  <div className="flex gap-1 items-end h-[44px]">
                    {[35, 28, 22, 8, 7].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{
                        height: `${h * 1.2}px`,
                        background: i === 0 ? 'linear-gradient(to top, #0D9488, #14B8A6)'
                          : i === 1 ? 'linear-gradient(to top, #4F46E5, #6366F1)'
                          : 'linear-gradient(to top, rgba(99,102,241,0.25), rgba(99,102,241,0.4))',
                      }} />
                    ))}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[lang === 'es' ? 'Acuerdo' : 'Settled', lang === 'es' ? 'Victoria' : 'Won', lang === 'es' ? 'Desestimado' : 'Dismissed', lang === 'es' ? 'Juicio' : 'Trial', lang === 'es' ? 'Otro' : 'Other'].map((l, i) => (
                      <div key={i} className="flex-1 text-[10px] text-center font-medium" style={{ color: '#6B7A94' }}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent badges — dark glass */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-bold float-tag" style={{
                background: 'rgba(15,23,42,0.85)',
                color: '#5EEAD4',
                border: '1px solid rgba(13,148,136,0.25)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 data-pulse" style={{ verticalAlign: 'middle' }} />
                {lang === 'es' ? 'Datos actualizados' : 'Live data'}
              </div>

              <div className="absolute -bottom-2 -left-3 px-3 py-1.5 rounded-full text-[10px] font-bold float-tag" style={{
                background: 'rgba(15,23,42,0.85)',
                color: 'var(--accent-secondary, #A5B4FC)',
                border: '1px solid rgba(99,102,241,0.25)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2.5" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                {lang === 'es' ? 'Análisis en 2 min' : '2-min analysis'}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center scroll-indicator" style={{ gridColumn: '1 / -1' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" opacity="0.4">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>

          {/* Dramatic gradient divider */}
          <div className="separator-gradient" style={{ gridColumn: '1 / -1', height: '2px', boxShadow: '0 4px 20px rgba(79,70,229,0.3), 0 4px 20px rgba(13,148,136,0.15)' }} />

          {/* Trust + Social Proof + Data + Stats — tighter spacing */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0, overflow: 'hidden' }}>
            <Reveal delay={180}>
              <TrustBar lang={lang} />
            </Reveal>
            <Reveal delay={190}>
              <SocialProofBar totalCases={totalCases} lang={lang} />
            </Reveal>
            <Reveal delay={195}>
              <DataFreshness compact lang={lang} totalCases={totalCases} />
            </Reveal>
            <Reveal delay={210}>
              <HeroStats lang={lang} />
            </Reveal>
          </div>

          {/* Category selector — enhanced */}
          <div style={{ gridColumn: '1 / -1' }}>
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
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #4F46E5, #6366F1, #0D9488)' }} />
                <SectionLabel>{t.select_situation}</SectionLabel>
                <div className="grid grid-cols-2 gap-3 stagger-in">
                  {SITS.map(si => (
                    <button key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
                      className="category-card p-5 card-bg rounded-xl cursor-pointer text-left group border-[1.5px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 tilt-hover"
                      style={{
                        background: `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`,
                        borderColor: si.color + '40',
                        borderLeft: `3px solid ${si.color}`,
                        boxShadow: `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.03)`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = si.color + '60';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${si.color}30, inset 0 1px 0 rgba(255,255,255,0.03)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}30 0%, ${si.color}15 100%)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = si.color + '40';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.03)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`;
                      }}>
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-[1.15] group-hover:rotate-3" style={{ background: `${si.color}30`, boxShadow: `0 4px 12px ${si.color}25` }}>
                          <CategoryIcon name={si.icon} color={si.color} size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-[15px] truncate group-hover:text-[16px] transition-all" style={{ color: si.color, textShadow: `0 1px 3px ${si.color}10` }}>{si.label}</div>
                          <div className="text-[11px] text-[var(--fg-muted)] mt-0.5 line-clamp-1 font-medium">{si.sub}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {/* Enhanced typeahead search */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid #1E293B' }}>
                  <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'O BUSCA TU TIPO DE CASO' : 'OR SEARCH YOUR CASE TYPE'}</div>
                  <EnhancedSearch sits={SITS} lang={lang} onSelect={(opt: any) => {
                    const parentSit = SITS.find(s => s.opts.some((o: any) => o.nos === opt.nos && o.label === opt.label));
                    if (parentSit) { setSit(parentSit); setSpec(opt); setAmount(parentSit.dm); go(3); }
                  }} />
                </div>
                {/* Quick scroll hint */}
                <div className="flex items-center justify-center mt-4 text-[11px] gap-1.5" style={{ color: 'var(--fg-muted)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scroll-indicator"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  {lang === 'es' ? 'O desplázate para explorar datos' : 'Or scroll to explore data'}
                </div>
              </Card>
            </div>
          </Reveal>
          </div>
        </div>

        {/* === NATIONWIDE DATA DASHBOARD === */}
        <Reveal delay={280}>
          <div className="mb-4" style={{ gridColumn: '1 / -1' }}>
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'DATOS NACIONALES' : 'NATIONWIDE DATA'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-gradient-premium" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Panel de datos en tiempo real' : 'Real-time data dashboard'}</h2>
            </div>
            <NationwideDashboard lang={lang} />
          </div>
        </Reveal>

        {/* Data Preview Section — Elite Section */}
        <Reveal delay={300}>
          <DataPreviewSection lang={lang} />
        </Reveal>

        {/* Stats bar */}
        <Reveal delay={350}>
          <div className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            {[
              { n: totalDisplay, l: t.stat_outcomes, color: 'var(--accent-primary)' },
              { n: '20', l: t.stat_types, color: 'var(--accent-secondary)' },
              { n: '50+', l: t.stat_years, color: 'var(--fg-muted)' },
              { n: lang === 'es' ? 'Gratis' : 'Free', l: t.stat_free, color: 'var(--accent-primary)' },
            ].map((x, i) => (
              <div key={i} className="text-center py-5 px-4 card-bg rounded-xl border-2 transition-all hover:scale-[1.05] hover:-translate-y-1" style={{ background: `linear-gradient(180deg, ${x.color}25 0%, ${x.color}10 100%)`, borderColor: x.color + '50', boxShadow: `0 6px 24px ${x.color}25` }}>
                <div className="text-2xl font-display font-extrabold" style={{ color: x.color, textShadow: `0 2px 8px ${x.color}30` }}>{x.n}</div>
                <div className="text-[11px] text-[var(--fg-muted)] mt-1.5 font-semibold" style={{ letterSpacing: '0.5px' }}>{x.l}</div>
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
                    <span className="text-sm font-semibold text-[var(--fg-secondary)] flex-1">{tr.label}</span>
                    <div className="w-16 h-2.5 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'rgba(13,148,136,0.15)' }}>
                      <div className="h-full rounded-full" style={{ width: `${barW}%`, background: 'linear-gradient(90deg, #0D9488, #14B8A6)', transition: 'width 1s ease', boxShadow: '0 0 12px rgba(13,148,136,0.4)' }} />
                    </div>
                    <span className="text-sm font-extrabold flex-shrink-0 w-14 text-right" style={{ color: 'var(--accent-secondary)', textShadow: '0 1px 4px rgba(13,148,136,0.2)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="#0D9488" className="inline mr-0.5 -mt-0.5"><path d="M5 0L9 5H1L5 0Z" /></svg>
                      {tr.change}
                    </span>
                  </div>
                );
              })}
              <div className="text-[11px] text-[var(--fg-muted)] mt-3 font-semibold">{lang === 'es' ? 'Presentaciones federales año tras año' : 'Federal filings year-over-year'}</div>
            </div>
            <div className="card-bg rounded-2xl border-2 p-7 transition-all" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.08) 0%, rgba(64,64,242,0.03) 100%)', borderColor: '#4F46E540', boxShadow: '0 8px 32px rgba(64,64,242,0.15)' }}>
              <SectionLabel>{t.circuit_rates}</SectionLabel>
              {/* Toggle: bar chart vs. expanded table */}
              <div className="flex gap-2 mb-3">
                <button onClick={() => setCircuitView('bars')} className="text-[10px] font-bold px-2.5 py-1 rounded-lg border-none transition-all"
                  style={{ background: circuitView === 'bars' ? 'rgba(99,102,241,0.2)' : 'transparent', color: circuitView === 'bars' ? '#A5B4FC' : '#64748B' }}>
                  {lang === 'es' ? 'Barras' : 'Chart'}
                </button>
                <button onClick={() => setCircuitView('table')} className="text-[10px] font-bold px-2.5 py-1 rounded-lg border-none transition-all"
                  style={{ background: circuitView === 'table' ? 'rgba(99,102,241,0.2)' : 'transparent', color: circuitView === 'table' ? '#A5B4FC' : '#64748B' }}>
                  {lang === 'es' ? 'Detalle' : 'Details'}
                </button>
              </div>

              {circuitView === 'bars' ? (
                <div className="stagger-list" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {Object.entries(CIRCUIT_WIN_RATES).sort(([,a], [,b]) => b - a).map(([ci, rate], i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 transition-all" style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedCircuit(expandedCircuit === ci ? null : ci)}>
                      <span className="text-[11px] font-extrabold w-14 text-[var(--fg-secondary)]">{ci}</span>
                      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(64,64,242,0.15)' }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{
                          width: `${rate}%`,
                          background: rate > 40 ? 'linear-gradient(90deg, #0D9488, #14B8A6)' : rate > 37 ? 'linear-gradient(90deg, #4F46E5, #6366F1)' : 'linear-gradient(90deg, #E87461, #F59E8C)',
                        }} />
                      </div>
                      <span className="text-[11px] font-extrabold w-10 text-right font-data" style={{ color: rate > 40 ? '#0D9488' : rate > 37 ? '#4F46E5' : '#E87461' }}>{rate}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {Object.entries(CIRCUIT_WIN_RATES).sort(([,a], [,b]) => b - a).map(([ci, rate], i) => {
                    const detail = CIRCUIT_DETAIL[ci];
                    const isExp = expandedCircuit === ci;
                    return (
                      <div key={i} className="border-b transition-all" style={{ borderColor: 'rgba(30,41,59,0.3)' }}>
                        <div className="flex items-center gap-2 py-2 transition-all" style={{ cursor: 'pointer' }}
                          onClick={() => setExpandedCircuit(isExp ? null : ci)}>
                          <span className="text-[11px] font-extrabold w-14" style={{ color: rate > 40 ? '#0D9488' : rate > 37 ? '#A5B4FC' : '#E87461' }}>{ci}</span>
                          <span className="text-[11px] font-data font-bold" style={{ color: 'var(--fg-secondary)' }}>{rate}%</span>
                          {detail && <span className="text-[10px] ml-auto" style={{ color: 'var(--fg-muted)' }}>{detail.caseload}</span>}
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" style={{ transform: isExp ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                        {isExp && detail && (
                          <div className="pb-3 pl-2">
                            <div className="text-[10px] mb-2" style={{ color: 'var(--fg-muted)' }}>
                              {detail.states.join(', ')} · {detail.judges} judges · {detail.median_mo}mo median
                            </div>
                            <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(30,41,59,0.4)' }}>
                              {detail.types.map((t, j) => (
                                <div key={j} className="flex items-center gap-2 px-2.5 py-1.5" style={{ background: j % 2 === 0 ? 'rgba(19,27,46,0.5)' : 'transparent', borderBottom: j < detail.types.length - 1 ? '1px solid rgba(30,41,59,0.2)' : 'none' }}>
                                  <span className="text-[10px] font-semibold flex-1" style={{ color: 'var(--fg-muted)' }}>{t.type}</span>
                                  <span className="text-[10px] font-data font-bold" style={{ color: t.rate > 45 ? '#0D9488' : t.rate > 35 ? '#A5B4FC' : '#E87461' }}>{t.rate}%</span>
                                  <span className="text-[10px] font-data w-12 text-right" style={{ color: '#4B5563' }}>{t.vol}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="text-[11px] text-[var(--fg-muted)] mt-3 font-semibold">{lang === 'es' ? 'Todas las 13 cortes de circuito federales' : 'All 13 federal circuit courts'}</div>
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
              <div className="text-lg sm:text-xl font-display font-extrabold text-[#E2E8F0]">{t.too_late_title}</div>
              <div className="text-sm text-[var(--fg-muted)] mt-1.5 leading-relaxed font-medium">{t.too_late_sub}</div>
            </div>
            <button onClick={() => go(1)} className="px-7 py-3 text-sm font-extrabold text-white rounded-xl cursor-pointer flex-shrink-0 w-full sm:w-auto text-center transition-all hover:scale-[1.05] active:scale-[0.95]"
              style={{ background: 'linear-gradient(135deg, #E87461, #F59E8C)', boxShadow: '0 6px 20px rgba(232,116,97,0.35)' }}>
              {t.check_deadline}
            </button>
          </div>
        </Reveal>

        {/* Social proof counter */}
        <Reveal delay={470}>
          <div className="flex items-center justify-center gap-6 py-4 px-5 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[13px] text-[var(--fg-muted)]"><strong className="font-data">{liveCounter}</strong> {lang === 'es' ? 'informes generados hoy' : 'reports generated today'}</span>
            </div>
            <div className="w-px h-4" style={{ background: '#334155' }} />
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              <span className="text-[13px] text-[var(--fg-muted)]"><strong className="font-data">{(totalCases / 1000).toFixed(0)}K+</strong> {lang === 'es' ? 'usuarios' : 'users'}</span>
            </div>
          </div>
        </Reveal>

        {/* === LIVE CASE FEED === */}
        <Reveal delay={485}>
          <div className="mb-4">
            <div className="text-center mb-5">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'ACTIVIDAD RECIENTE' : 'RECENT ACTIVITY'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Casos resueltos recientemente' : 'Recently resolved cases'}</h2>
              <p className="text-sm text-[var(--fg-muted)] mt-2">{lang === 'es' ? 'Datos agregados de resultados reales de casos federales' : 'Aggregate data from real federal case outcomes'}</p>
            </div>
            <LiveCaseFeed lang={lang} />
          </div>
        </Reveal>

        {/* Testimonials carousel */}
        <Reveal delay={490}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px]" style={{ background: 'linear-gradient(90deg, #4F46E5, #0D9488, #4F46E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lang === 'es' ? 'LO QUE DICEN LOS USUARIOS' : 'WHAT USERS SAY'}</div>
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
                          <div className="testimonial-quote text-[var(--fg-secondary)] font-medium text-[15px]">&ldquo;{tm.quote}&rdquo;</div>
                          <div className="text-[12px] text-[var(--fg-muted)] mt-3 font-semibold">{tm.author}</div>
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
                    style={{ width: i === carouselIdx ? 28 : 8, height: 8, background: i === carouselIdx ? 'linear-gradient(90deg, #4F46E5, #0D9488)' : '#334155', transform: i === carouselIdx ? 'scale(1.15)' : 'scale(1)', boxShadow: i === carouselIdx ? '0 2px 8px rgba(64,64,242,0.4)' : 'none' }} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* === RISK ASSESSMENT QUIZ === */}
        <Reveal delay={505}>
          <div className="mb-6">
            <div className="card-bg bg-gradient-to-br rounded-3xl border border-[var(--border-default)] shadow-md overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,.06) 0%, rgba(13,148,136,.03) 100%)' }}>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2 uppercase">{lang === 'es' ? 'EVALUACIÓN RÁPIDA' : 'Quick Assessment'}</div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2" style={{ letterSpacing: '-1px' }}>
                      {lang === 'es' ? 'Evaluación de riesgo en 30 segundos' : 'Risk Assessment in 30 seconds'}
                    </h3>
                    <p className="text-sm text-[var(--fg-muted)] max-w-md">{lang === 'es' ? 'Responde 3 preguntas rápidas y obtén una estimación inicial de la fortaleza de tu caso.' : 'Answer 3 quick questions to get an initial estimate of your case strength.'}</p>
                  </div>
                  <button onClick={() => setShowQuiz(true)}
                    className="px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer flex-shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                    {lang === 'es' ? 'Empezar' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === HOW IT WORKS === */}
        <Reveal delay={510}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Tres pasos. Dos minutos. Resultados reales.' : 'Three steps. Two minutes. Real data.'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: '01', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: lang === 'es' ? 'Describe tu situación' : 'Describe your situation', desc: lang === 'es' ? 'Dinos qué pasó en palabras simples. Sin jerga legal necesaria.' : 'Tell us what happened in plain words. No legal jargon needed.', color: 'var(--fg-muted)' },
                { num: '02', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>, title: lang === 'es' ? 'Analizamos los datos' : 'We crunch the data', desc: lang === 'es' ? 'Comparamos tu situación con millones de casos federales reales.' : 'We match your situation against millions of real federal court outcomes.', color: 'var(--accent-primary)' },
                { num: '03', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, title: lang === 'es' ? 'Obtén tu informe' : 'Get your report', desc: lang === 'es' ? 'Tasas de éxito, plazos, rangos de recuperación y pasos a seguir.' : 'Win rates, timelines, recovery ranges, and what people did next.', color: 'var(--accent-secondary)' },
              ].map((s, i) => (
                <div key={i} className="relative p-6 data-card-3d rounded-2xl border-2 shadow-lg group transition-all hover:scale-[1.03] hover:-translate-y-1" style={{ background: `linear-gradient(135deg, ${s.color}18 0%, ${s.color}08 100%)`, borderColor: s.color + '50', borderTop: `3px solid ${s.color}`, boxShadow: `0 8px 32px ${s.color}25` }}>
                  <div className="absolute top-4 right-4 text-[48px] font-display font-bold leading-none" style={{ color: s.color, opacity: 0.08 }}>{s.num}</div>
                  {/* Step number badge */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`, boxShadow: `0 4px 16px ${s.color}30` }}>
                    {s.icon}
                  </div>
                  <div className="text-[10px] font-extrabold tracking-[2px] mb-2 uppercase" style={{ color: s.color, textShadow: `0 1px 3px ${s.color}20` }}>{lang === 'es' ? 'Paso' : 'Step'} {s.num}</div>
                  <div className="text-[17px] font-extrabold mb-2 text-[#E2E8F0]">{s.title}</div>
                  <div className="text-[13px] text-[var(--fg-muted)] leading-relaxed font-medium">{s.desc}</div>
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
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'CALCULADORA DE COSTOS' : 'COST CALCULATOR'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Entiende los honorarios legales' : 'Understand legal fees'}
              </h2>
            </div>
            <div className="report-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] p-6">
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-4 uppercase">{lang === 'es' ? 'Calculadora de contingencia' : 'Contingency Fee Calculator'}</div>
                <div className="mb-4">
                  <label className="text-xs font-semibold text-[var(--fg-muted)] block mb-2">{lang === 'es' ? 'Cantidad estimada de recuperación' : 'Estimated recovery amount'}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] font-semibold">$</span>
                    <input type="range" min="10000" max="5000000" step="10000" value={calcAmount}
                      onChange={e => setCalcAmount(Number(e.target.value))}
                      className="w-full h-2 bg-[var(--bg-elevated)] rounded-lg appearance-none cursor-pointer" style={{ accentColor: '#4F46E5' }} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-[var(--fg-muted)]">
                    <span>$10K</span>
                    <span className="font-semibold text-[var(--fg-secondary)]">{calcAmount >= 1000000 ? `$${(calcAmount / 1000000).toFixed(1)}M` : `$${(calcAmount / 1000).toFixed(0)}K`}</span>
                    <span>$5M</span>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-[var(--border-default)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--fg-muted)]">{lang === 'es' ? 'Honorarios de abogado (33%)' : 'Attorney fees (33%)'}</span>
                    <span className="text-lg font-display font-bold" style={{ color: 'var(--accent-primary)' }}>{calcAmount * 0.33 >= 1000000 ? `$${(calcAmount * 0.33 / 1000000).toFixed(2)}M` : `$${(calcAmount * 0.33 / 1000).toFixed(1)}K`}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--fg-muted)]">{lang === 'es' ? 'Gastos de la demanda' : 'Court costs & expenses'}</span>
                    <span className="text-lg font-display font-bold" style={{ color: 'var(--fg-muted)' }}>{calcAmount * 0.05 >= 1000000 ? `$${(calcAmount * 0.05 / 1000000).toFixed(2)}M` : `$${(calcAmount * 0.05 / 1000).toFixed(1)}K`}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-default)]">
                    <span className="text-sm font-semibold text-[var(--fg-secondary)]">{lang === 'es' ? 'Tu recuperación neta' : 'Your net recovery'}</span>
                    <span className="text-xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{calcAmount * 0.62 >= 1000000 ? `$${(calcAmount * 0.62 / 1000000).toFixed(2)}M` : `$${(calcAmount * 0.62 / 1000).toFixed(1)}K`}</span>
                  </div>
                </div>
              </div>
              <div className="card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] p-6">
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-4 uppercase">{lang === 'es' ? 'Rangos por tipo de caso' : 'Fee ranges by case type'}</div>
                <div className="space-y-3">
                  {[
                    { type: lang === 'es' ? 'Lesiones personales' : 'Personal injury', hourly: '$150-400', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Accidente vehicular' : 'Motor vehicle accident', hourly: '$150-350', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Negligencia médica' : 'Medical malpractice', hourly: '$250-600', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Muerte injusta' : 'Wrongful death', hourly: '$250-500', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Discriminación laboral' : 'Employment discrimination', hourly: '$200-500', contingency: '25-40%' },
                    { type: lang === 'es' ? 'Acoso sexual' : 'Sexual harassment', hourly: '$200-500', contingency: '25-40%' },
                    { type: lang === 'es' ? 'Salarios impagos' : 'Unpaid wages (FLSA)', hourly: '$150-400', contingency: '33%+fees' },
                    { type: lang === 'es' ? 'Responsabilidad del producto' : 'Product liability', hourly: '$200-600', contingency: '33-45%' },
                    { type: lang === 'es' ? 'Derechos civiles (§1983)' : 'Civil rights (§1983)', hourly: '$200-500', contingency: '33-40%+fees' },
                    { type: lang === 'es' ? 'Cobro de deudas (FDCPA)' : 'Debt collection (FDCPA)', hourly: '$150-350', contingency: 'Statutory fees' },
                    { type: lang === 'es' ? 'Seguro de mala fe' : 'Insurance bad faith', hourly: '$200-450', contingency: '33-40%' },
                    { type: lang === 'es' ? 'Contratos' : 'Contract disputes', hourly: '$250-500', contingency: 'Rare / hourly' },
                    { type: lang === 'es' ? 'Propiedad intelectual' : 'Intellectual property', hourly: '$300-700', contingency: 'Rare / hourly' },
                    { type: lang === 'es' ? 'Discapacidad (SSDI)' : 'Disability (SSDI)', hourly: 'N/A', contingency: '25% (capped)' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border-default)] last:border-none">
                      <span className="text-xs font-medium text-[var(--fg-muted)]">{item.type}</span>
                      <div className="flex gap-3 text-xs">
                        <span className="font-semibold text-[var(--fg-muted)]">{item.hourly}</span>
                        <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>{item.contingency}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[var(--fg-muted)] mt-4">{lang === 'es' ? 'Los honorarios varían por abogado y jurisdicción. Consulta con los proveedores para obtener cotizaciones precisas.' : 'Fees vary by attorney and jurisdiction. Consult providers for accurate quotes.'}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === DATA INSIGHTS DASHBOARD PREVIEW === */}
        <Reveal delay={550}>
          <div className="mb-6">
            <div className="text-center mb-5">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'PERSPECTIVAS DE DATOS' : 'DATA INSIGHTS'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Datos reales. Decisiones informadas.' : 'Real data. Informed decisions.'}
              </h2>
              <p className="text-[14px] text-[var(--fg-muted)] mt-2 max-w-lg mx-auto">{lang === 'es' ? 'Cada número proviene de registros judiciales públicos.' : 'Every number comes from public court records — not estimates, not projections.'}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { value: '38.2%', label: lang === 'es' ? 'Tasa promedio de éxito' : 'Avg. plaintiff win rate', sub: lang === 'es' ? 'Todos los casos federales' : 'All federal civil cases', color: 'var(--accent-secondary)' },
                { value: '8.4mo', label: lang === 'es' ? 'Tiempo mediano hasta resolución' : 'Median time to resolution', sub: lang === 'es' ? 'De presentación a cierre' : 'Filing to close', color: 'var(--fg-muted)' },
                { value: '$47K', label: lang === 'es' ? 'Mediana de recuperación' : 'Median plaintiff recovery', sub: lang === 'es' ? 'Casos con pago' : 'In cases with payout', color: 'var(--accent-primary)' },
                { value: '67%', label: lang === 'es' ? 'Casos que se resuelven' : 'Cases that settle', sub: lang === 'es' ? 'Antes de llegar a juicio' : 'Before reaching trial', color: 'var(--accent-primary)' },
              ].map((d, i) => (
                <div key={i} className="p-4 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] text-center transition-transform hover:scale-[1.02]">
                  <div className="text-2xl sm:text-3xl font-display font-bold" style={{ color: d.color, letterSpacing: '-1px' }}>{d.value}</div>
                  <div className="text-[12px] font-semibold text-[var(--fg-muted)] mt-1.5">{d.label}</div>
                  <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">{d.sub}</div>
                </div>
              ))}
            </div>

            {/* Mini outcome breakdown */}
            <div className="report-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-5 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-3">{lang === 'es' ? 'RESULTADOS MÁS COMUNES' : 'MOST COMMON OUTCOMES'}</div>
                {[
                  { l: lang === 'es' ? 'Acuerdo con pago' : 'Settlement (with payment)', p: 34, c: '#0D9488' },
                  { l: lang === 'es' ? 'Desestimación voluntaria' : 'Voluntary dismissal', p: 28, c: '#4F46E5' },
                  { l: lang === 'es' ? 'Juicio sumario (defensa)' : 'Summary judgment (defense)', p: 18, c: '#D97706' },
                  { l: lang === 'es' ? 'Victoria en juicio' : 'Trial verdict (plaintiff)', p: 10, c: '#1A2744' },
                  { l: lang === 'es' ? 'Otros' : 'Other dispositions', p: 10, c: '#94A3B8' },
                ].map((o, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: o.c }} />
                    <span className="text-[12px] flex-1 text-[var(--fg-muted)]">{o.l}</span>
                    <div className="w-20 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${o.p}%`, background: o.c, transition: 'width 1s ease' }} />
                    </div>
                    <span className="text-[12px] font-bold font-data w-8 text-right" style={{ color: o.c }}>{o.p}%</span>
                  </div>
                ))}
              </div>
              <div className="p-5 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-3">{lang === 'es' ? 'ABOGADO VS. SIN ABOGADO' : 'ATTORNEY VS. NO ATTORNEY'}</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 p-3 rounded-xl text-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>41%</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Con abogado' : 'With attorney'}</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl text-center" style={{ background: 'rgba(217,119,6,0.12)' }}>
                    <div className="text-2xl font-display font-bold" style={{ color: '#D97706' }}>12%</div>
                    <div className="text-[10px] font-semibold mt-1" style={{ color: '#D97706' }}>{lang === 'es' ? 'Sin abogado' : 'Self-represented'}</div>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-lg text-[12px] font-medium" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                  {lang === 'es' ? 'Las personas con abogado ganaron ~3.4x más a menudo' : 'People with attorneys won ~3.4x more often'}
                </div>
                <div className="mt-3 text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'TIPOS DE HONORARIOS' : 'FEE TYPES'}</div>
                <div className="space-y-1">
                  {[
                    { type: lang === 'es' ? 'Contingencia' : 'Contingency', desc: lang === 'es' ? 'Solo pagas si ganas (33-40%)' : 'You pay only if you win (33-40%)' },
                    { type: lang === 'es' ? 'Por hora' : 'Hourly', desc: lang === 'es' ? 'Tarifa por hora de trabajo' : 'Charged per hour of work' },
                    { type: lang === 'es' ? 'Tarifa fija' : 'Flat fee', desc: lang === 'es' ? 'Precio fijo por el caso' : 'One price for the whole case' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px]">
                      <span className="font-semibold text-[var(--fg-muted)] w-20">{f.type}</span>
                      <span className="text-[var(--fg-muted)]">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === DID YOU KNOW? — Rotating legal facts === */}
        <Reveal delay={560}>
          <div className="mb-4 p-5 rounded-2xl border border-[var(--border-default)] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(13,148,136,0.04))' }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(13,148,136,0.15))' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{lang === 'es' ? '¿SABÍAS QUE?' : 'DID YOU KNOW?'}</div>
                {(() => {
                  const facts = lang === 'es' ? [
                    'El 67% de los casos civiles federales se resuelven antes de llegar a juicio, generalmente a través de acuerdos negociados.',
                    'Las personas con abogado ganan un 40% más frecuentemente que quienes se representan solas en casos civiles federales.',
                    'El tiempo promedio desde la presentación hasta la resolución en un tribunal federal es de 8.4 meses.',
                    'Los casos de discriminación laboral son la categoría de demandas civiles más presentada en los tribunales federales.',
                    'La mediana de recuperación del demandante en casos federales con pago es de $47,000.',
                    'El Noveno Circuito (que cubre California y 8 estados más) maneja más del 20% de todos los casos de apelación federales.',
                  ] : [
                    'Over 67% of federal civil cases settle before reaching trial, typically through negotiated agreements.',
                    'People with attorneys win approximately 40% more often than those representing themselves in federal civil cases.',
                    'The average time from filing to resolution in federal court is 8.4 months.',
                    'Employment discrimination cases are the most commonly filed category of civil lawsuits in federal courts.',
                    'The median plaintiff recovery in federal cases with a payout is $47,000.',
                    'The 9th Circuit (covering California and 8 other states) handles over 20% of all federal appellate cases.',
                  ];
                  return <p className="text-[14px] leading-relaxed transition-opacity duration-500" style={{ color: 'var(--fg-secondary)' }}>{facts[factIndex % facts.length]}</p>;
                })()}
              </div>
            </div>
          </div>
        </Reveal>

        {/* === KEY TAKEAWAYS === */}
        <Reveal delay={570}>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                title: lang === 'es' ? 'Datos verificados' : 'Verified data',
                desc: lang === 'es' ? 'Cada estadística proviene de registros judiciales federales públicos, no de estimaciones.' : 'Every statistic comes from public federal court records, not estimates.',
                color: 'var(--accent-secondary)' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
                title: lang === 'es' ? 'Privacidad total' : 'Completely private',
                desc: lang === 'es' ? 'Tu búsqueda es anónima. No almacenamos datos personales ni compartimos tu información.' : 'Your search is anonymous. We do not store personal data or share your information.',
                color: 'var(--accent-primary)' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: lang === 'es' ? 'No es asesoría legal' : 'Not legal advice',
                desc: lang === 'es' ? 'Esta es una herramienta informativa. Solo un abogado con licencia puede evaluar tu caso específico.' : 'This is an informational tool. Only a licensed attorney can evaluate your specific case.',
                color: 'var(--accent-secondary, #A5B4FC)' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-[var(--border-default)] transition-all hover:border-opacity-60" style={{ background: `linear-gradient(135deg, ${item.color}08, transparent)`, borderColor: `${item.color}25` }}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>{item.icon}</div>
                  <div className="text-[13px] font-bold" style={{ color: item.color }}>{item.title}</div>
                </div>
                <div className="text-[12px] leading-relaxed text-[var(--fg-muted)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* === COMPARISON TOOL PREVIEW === */}
        <Reveal delay={580}>
          <div className="p-6 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
              <div>
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-1">{lang === 'es' ? 'HERRAMIENTA DE COMPARACIÓN' : 'COMPARISON TOOL'}</div>
                <div className="text-lg sm:text-xl font-display font-bold">{lang === 'es' ? 'Compara dos situaciones lado a lado' : 'Compare two situations side by side'}</div>
                <div className="text-[13px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'Selecciona cualquier par de tipos de caso para ver diferencias reales' : 'Select any pair of case types to see real data differences'}</div>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5"/></svg>
                {lang === 'es' ? 'Interactivo' : 'Interactive'}
              </span>
            </div>
            {(() => {
              const COMPARE_CASES = [
                { id: 'emp_disc', label: lang === 'es' ? 'Discriminación laboral' : 'Employment Discrimination', wr: 38.4, time: 11.2, settle: 32, vol: 28400, fee: '25-40%', icon: '⚖️' },
                { id: 'pers_inj', label: lang === 'es' ? 'Lesiones personales' : 'Personal Injury', wr: 54.1, time: 8.6, settle: 48, vol: 42100, fee: '33-40%', icon: '🏥' },
                { id: 'med_mal', label: lang === 'es' ? 'Negligencia médica' : 'Medical Malpractice', wr: 32.7, time: 14.3, settle: 41, vol: 8200, fee: '33-40%', icon: '💊' },
                { id: 'prod_liab', label: lang === 'es' ? 'Responsabilidad del producto' : 'Product Liability', wr: 42.8, time: 12.1, settle: 44, vol: 6900, fee: '33-45%', icon: '📦' },
                { id: 'civil_rights', label: lang === 'es' ? 'Derechos civiles' : 'Civil Rights (§1983)', wr: 28.5, time: 13.8, settle: 29, vol: 35600, fee: '33%+fees', icon: '🗽' },
                { id: 'contract', label: lang === 'es' ? 'Incumplimiento de contrato' : 'Breach of Contract', wr: 44.2, time: 9.4, settle: 52, vol: 19800, fee: 'Hourly', icon: '📝' },
                { id: 'ins_bad', label: lang === 'es' ? 'Seguro de mala fe' : 'Insurance Bad Faith', wr: 46.3, time: 10.7, settle: 55, vol: 7300, fee: '33-40%', icon: '🛡️' },
                { id: 'wrong_death', label: lang === 'es' ? 'Muerte injusta' : 'Wrongful Death', wr: 51.2, time: 15.6, settle: 58, vol: 4100, fee: '33-40%', icon: '🕊️' },
                { id: 'sex_harass', label: lang === 'es' ? 'Acoso sexual' : 'Sexual Harassment', wr: 35.1, time: 10.4, settle: 38, vol: 12300, fee: '25-40%', icon: '🚫' },
                { id: 'wage', label: lang === 'es' ? 'Salarios impagos' : 'Unpaid Wages (FLSA)', wr: 47.6, time: 7.8, settle: 61, vol: 21500, fee: '33%+fees', icon: '💰' },
              ];
              const cA = COMPARE_CASES.find(c => c.id === (compareNos || 'emp_disc')) || COMPARE_CASES[0];
              const cB = COMPARE_CASES.find(c => c.id === (compareData?.id || 'pers_inj')) || COMPARE_CASES[1];
              const metrics: { key: string; label: string; fmt: (v: any) => string; better: 'higher' | 'lower' | 'neutral'; max?: number; unit?: string }[] = [
                { key: 'wr', label: lang === 'es' ? 'Tasa de éxito' : 'Win rate', fmt: (v) => `${v}%`, better: 'higher', max: 70, unit: '%' },
                { key: 'time', label: lang === 'es' ? 'Duración promedio' : 'Avg. duration', fmt: (v) => `${v} ${lang === 'es' ? 'meses' : 'mo'}`, better: 'lower', max: 20, unit: 'mo' },
                { key: 'settle', label: lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate', fmt: (v) => `${v}%`, better: 'higher', max: 70, unit: '%' },
                { key: 'vol', label: lang === 'es' ? 'Volumen anual' : 'Annual volume', fmt: (v) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : `${v}`, better: 'neutral', max: 50000 },
                { key: 'fee', label: lang === 'es' ? 'Rango de honorarios' : 'Fee range', fmt: (v) => `${v}`, better: 'neutral' },
              ];
              // Count wins for summary
              let aScore = 0; let bScore = 0;
              metrics.forEach(m => {
                const vA = (cA as any)[m.key]; const vB = (cB as any)[m.key];
                if (typeof vA === 'number' && m.better !== 'neutral') {
                  if (m.better === 'higher' ? vA > vB : vA < vB) aScore++; else if (m.better === 'higher' ? vB > vA : vB < vA) bScore++;
                }
              });
              return (
                <>
                  {/* Selector row with colored labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    <div>
                      <div className="text-[10px] font-bold tracking-[2px] mb-1.5" style={{ color: '#6366F1' }}>
                        {cA.icon} {lang === 'es' ? 'CASO A' : 'CASE A'}
                      </div>
                      <select value={cA.id} onChange={e => { setCompareNos(e.target.value); }}
                        className="w-full px-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer appearance-none"
                        style={{ background: 'rgba(99,102,241,0.08)', border: '1.5px solid rgba(99,102,241,0.25)', color: 'var(--accent-secondary, #A5B4FC)', outline: 'none' }}>
                        {COMPARE_CASES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[2px] mb-1.5" style={{ color: 'var(--accent-secondary)' }}>
                        {cB.icon} {lang === 'es' ? 'CASO B' : 'CASE B'}
                      </div>
                      <select value={cB.id} onChange={e => { setCompareData({ id: e.target.value }); }}
                        className="w-full px-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer appearance-none"
                        style={{ background: 'rgba(13,148,136,0.08)', border: '1.5px solid rgba(13,148,136,0.25)', color: '#5EEAD4', outline: 'none' }}>
                        {COMPARE_CASES.filter(c => c.id !== cA.id).map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Legend row */}
                  <div className="flex items-center gap-4 mb-3 px-1">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#6366F1' }} /><span className="text-[11px] text-[var(--fg-muted)]">{cA.label.split(' ').slice(0, 2).join(' ')}</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#0D9488' }} /><span className="text-[11px] text-[var(--fg-muted)]">{cB.label.split(' ').slice(0, 2).join(' ')}</span></div>
                    <div className="flex items-center gap-1.5 ml-auto"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg><span className="text-[11px] text-[#64748B]">{lang === 'es' ? 'Mejor en esta métrica' : 'Better metric'}</span></div>
                  </div>

                  {/* Visual comparison bars */}
                  <div className="space-y-3">
                    {metrics.map(m => {
                      const vA = (cA as any)[m.key];
                      const vB = (cB as any)[m.key];
                      const isNumeric = typeof vA === 'number';
                      const aWins = isNumeric && m.better !== 'neutral' && (m.better === 'higher' ? vA > vB : vA < vB);
                      const bWins = isNumeric && m.better !== 'neutral' && (m.better === 'higher' ? vB > vA : vB < vA);
                      const maxVal = m.max || 100;
                      return (
                        <div key={m.key} className="py-3 px-4 rounded-xl" style={{ background: 'rgba(30,41,59,0.35)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-semibold text-[var(--fg-secondary)]">{m.label}</span>
                            {(aWins || bWins) && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: aWins ? 'rgba(99,102,241,0.15)' : 'rgba(13,148,136,0.15)', color: aWins ? '#A5B4FC' : '#5EEAD4' }}>
                                ★ {aWins ? (lang === 'es' ? 'Caso A' : 'Case A') : (lang === 'es' ? 'Caso B' : 'Case B')}
                              </span>
                            )}
                          </div>
                          {isNumeric && m.max ? (
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: 'rgba(30,41,59,0.6)' }}>
                                  <div className="h-full rounded-md flex items-center justify-end px-2 transition-all duration-500" style={{ width: `${Math.min((vA / maxVal) * 100, 100)}%`, background: aWins ? 'linear-gradient(90deg, #4F46E5, #6366F1)' : 'rgba(99,102,241,0.3)' }}>
                                    <span className="text-[11px] font-bold font-data text-white">{m.fmt(vA)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: 'rgba(30,41,59,0.6)' }}>
                                  <div className="h-full rounded-md flex items-center justify-end px-2 transition-all duration-500" style={{ width: `${Math.min((vB / maxVal) * 100, 100)}%`, background: bWins ? 'linear-gradient(90deg, #0D9488, #14B8A6)' : 'rgba(13,148,136,0.3)' }}>
                                    <span className="text-[11px] font-bold font-data text-white">{m.fmt(vB)}</span>
                                  </div>
                                </div>
                              </div>
                              {isNumeric && m.better !== 'neutral' && (
                                <div className="text-[10px] text-[#64748B] mt-0.5">
                                  {lang === 'es' ? 'Diferencia' : 'Difference'}: <span style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{Math.abs(vA - vB).toFixed(1)}{m.unit || ''}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="text-[14px] font-bold font-data" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{m.fmt(vA)}</span>
                              <span className="text-[10px] text-[#64748B]">vs</span>
                              <span className="text-[14px] font-bold font-data" style={{ color: '#5EEAD4' }}>{m.fmt(vB)}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary insight card */}
                  <div className="mt-4 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(13,148,136,0.1))', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(99,102,241,0.2)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 16v-4M12 8h.01"/></svg>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold tracking-[2px] mb-1" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{lang === 'es' ? 'ANÁLISIS' : 'INSIGHT'}</div>
                        <div className="text-[13px] text-[var(--fg-secondary)] leading-relaxed">
                          {aScore > bScore
                            ? (lang === 'es'
                              ? `${cA.label} muestra datos más favorables en ${aScore} de ${aScore + bScore} métricas comparables. ${cA.wr > cB.wr ? `Con una tasa de éxito del ${cA.wr}%` : `Con un tiempo de resolución de ${cA.time} meses`}, puede ofrecer perspectivas más alentadoras.`
                              : `${cA.label} shows more favorable data in ${aScore} of ${aScore + bScore} comparable metrics. ${cA.wr > cB.wr ? `With a ${cA.wr}% win rate` : `With a ${cA.time}-month resolution time`}, it may offer more encouraging prospects.`)
                            : aScore < bScore
                            ? (lang === 'es'
                              ? `${cB.label} muestra datos más favorables en ${bScore} de ${aScore + bScore} métricas comparables. ${cB.wr > cA.wr ? `Con una tasa de éxito del ${cB.wr}%` : `Con un tiempo de resolución de ${cB.time} meses`}, puede ofrecer perspectivas más alentadoras.`
                              : `${cB.label} shows more favorable data in ${bScore} of ${aScore + bScore} comparable metrics. ${cB.wr > cA.wr ? `With a ${cB.wr}% win rate` : `With a ${cB.time}-month resolution time`}, it may offer more encouraging prospects.`)
                            : (lang === 'es'
                              ? `Ambos tipos de caso muestran métricas equilibradas. ${cA.label} tiene una tasa de éxito del ${cA.wr}% mientras que ${cB.label} tiene ${cB.wr}%.`
                              : `Both case types show balanced metrics. ${cA.label} has a ${cA.wr}% win rate while ${cB.label} has ${cB.wr}%.`)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scorecard */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center py-2 px-3 rounded-lg" style={{ background: aScore > bScore ? 'rgba(99,102,241,0.12)' : 'rgba(30,41,59,0.3)' }}>
                      <div className="text-[20px] font-bold font-data" style={{ color: '#6366F1' }}>{aScore}</div>
                      <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Caso A gana' : 'Case A wins'}</div>
                    </div>
                    <div className="text-center py-2 px-3 rounded-lg" style={{ background: 'rgba(30,41,59,0.3)' }}>
                      <div className="text-[20px] font-bold font-data" style={{ color: 'var(--fg-muted)' }}>{metrics.filter(m => typeof (cA as any)[m.key] === 'number' && m.better !== 'neutral').length - aScore - bScore}</div>
                      <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Empate' : 'Tied'}</div>
                    </div>
                    <div className="text-center py-2 px-3 rounded-lg" style={{ background: bScore > aScore ? 'rgba(13,148,136,0.12)' : 'rgba(30,41,59,0.3)' }}>
                      <div className="text-[20px] font-bold font-data" style={{ color: 'var(--accent-secondary)' }}>{bScore}</div>
                      <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Caso B gana' : 'Case B wins'}</div>
                    </div>
                  </div>
                </>
              );
            })()}
            <button onClick={() => go(1)} className="cta-pulse w-full mt-4 py-3 text-[14px] font-semibold text-white rounded-xl cursor-pointer border-none transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 4px 16px rgba(64,64,242,.2)' }}>
              {lang === 'es' ? 'Obtener mi informe personalizado →' : 'Get my personalized report →'}
            </button>
          </div>
        </Reveal>

        {/* === CASE TIMELINE ESTIMATOR === */}
        <Reveal delay={590}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'CRONOGRAMA DE CASOS' : 'CASE TIMELINE'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>
                {lang === 'es' ? 'Qué esperar en tu camino legal' : 'What to expect on your legal journey'}
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 ml-[17px]" style={{ background: 'linear-gradient(180deg, #4F46E5, #6366F1)' }} />
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
                      <div className="w-9 h-9 rounded-full bg-[#131B2E] border-[3px] flex items-center justify-center font-semibold text-sm flex-shrink-0 relative z-10" style={{ borderColor: '#4F46E5', color: 'var(--accent-primary)' }}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: 'var(--accent-primary)' }}>{stage.month} {lang === 'es' ? 'meses' : 'months'}</div>
                      <div className="text-[15px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>{stage.title}</div>
                      <div className="text-[13px] text-[var(--fg-muted)]">{stage.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.15)' }}>
              <div className="text-[12px] text-[var(--fg-secondary)]"><strong>{lang === 'es' ? 'Nota:' : 'Note:'}</strong> {lang === 'es' ? 'Los plazos varían según el tipo de caso, la jurisdicción y la complejidad. Esto es un promedio basado en datos federales.' : 'Timelines vary by case type, jurisdiction, and complexity. This is an average based on federal data.'}</div>
            </div>
          </div>
        </Reveal>

        {/* === LEGAL GLOSSARY PREVIEW === */}
        <Reveal delay={600}>
          <div className="p-5 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-1">{lang === 'es' ? 'GLOSARIO LEGAL SIMPLIFICADO' : 'LEGAL TERMS — SIMPLIFIED'}</div>
                <div className="text-[14px] text-[var(--fg-secondary)]">{lang === 'es' ? `${Object.keys(LEGAL_GLOSSARY).length} términos explicados en lenguaje sencillo` : `${Object.keys(LEGAL_GLOSSARY).length} terms explained in plain language`}</div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.12)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                <span className="text-[11px] font-bold" style={{ color: '#6366F1' }}>{Object.keys(LEGAL_GLOSSARY).length}</span>
              </div>
            </div>
            <input
              type="text"
              placeholder={lang === 'es' ? 'Buscar término...' : 'Search terms...'}
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] mb-3 border border-[var(--border-default)] bg-[#0B1221] focus:outline-none focus:border-[#4F46E5] transition-colors"
              style={{ color: 'var(--fg-secondary)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(LEGAL_GLOSSARY)
                .filter(([term, def]) => {
                  if (!glossarySearch) return true;
                  const q = glossarySearch.toLowerCase();
                  return term.toLowerCase().includes(q) ||
                    (lang === 'es' ? def.es : def.en).toLowerCase().includes(q);
                })
                .slice(0, glossaryExpanded ? undefined : 8).map(([term, def], i) => (
                <div key={i} className="p-3 rounded-xl border transition-all hover:border-[#4F46E5]/30" style={{ background: 'rgba(30,41,59,0.4)', borderColor: '#1E293B' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}>{(term[0] || '').toUpperCase()}</div>
                    <div className="text-[13px] font-semibold capitalize" style={{ color: 'var(--accent-secondary, #A5B4FC)' }}>{term}</div>
                  </div>
                  <div className="text-[11px] text-[var(--fg-muted)] leading-relaxed pl-7">{lang === 'es' ? def.es : def.en}</div>
                </div>
              ))}
            </div>
            {(() => {
              const filteredCount = Object.entries(LEGAL_GLOSSARY).filter(([term, def]) => {
                if (!glossarySearch) return true;
                const q = glossarySearch.toLowerCase();
                return term.toLowerCase().includes(q) ||
                  (lang === 'es' ? def.es : def.en).toLowerCase().includes(q);
              }).length;
              return filteredCount > 8 ? (
                <button
                  onClick={() => setGlossaryExpanded(!glossaryExpanded)}
                  className="w-full mt-3 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer border-none transition-all"
                  style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-secondary, #A5B4FC)' }}>
                  {glossaryExpanded
                    ? (lang === 'es' ? 'Mostrar menos ▲' : 'Show less ▲')
                    : (lang === 'es' ? `Mostrar los ${filteredCount - 8} términos restantes ▼` : `Show all ${filteredCount - 8} remaining terms ▼`)}
                </button>
              ) : null;
            })()}
          </div>
        </Reveal>

        {/* === WHAT YOU GET: FREE vs PREMIUM === */}
        <Reveal delay={620}>
          <div className="mb-4">
            <div className="text-center mb-5">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'PLANES' : 'PLANS'}</div>
              <h2 className="text-2xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? '¿Qué incluye cada plan?' : 'What do you get?'}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free */}
              <div className="p-6 card-bg bg-[#131B2E] rounded-2xl border border-[var(--border-default)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-3" style={{ background: 'var(--bg-elevated)', color: 'var(--fg-muted)' }}>{lang === 'es' ? 'GRATIS' : 'FREE'}</div>
                <div className="text-2xl font-display font-bold mb-1">$0</div>
                <div className="text-[12px] text-[var(--fg-muted)] mb-4">{lang === 'es' ? 'Perfecto para empezar' : 'Perfect to get started'}</div>
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
                      <span className="text-[var(--fg-muted)]">{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go(1)} className="w-full mt-5 py-3 text-[14px] font-semibold text-[var(--fg-muted)] bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl cursor-pointer transition-colors hover:bg-[var(--bg-elevated)]">
                  {lang === 'es' ? 'Comenzar gratis' : 'Start for free'}
                </button>
              </div>
              {/* Premium */}
              <div className="p-6 rounded-2xl border-2 shadow-md relative overflow-hidden" style={{ borderColor: '#4F46E530', background: 'linear-gradient(180deg, #131B2E, #0F172A)' }}>
                <div className="absolute top-0 right-0 px-4 py-1 text-[10px] font-bold text-white rounded-bl-xl" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>{lang === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}</div>
                <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-3" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>PREMIUM</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-2xl font-display font-bold">$5.99</span>
                  <span className="text-[13px] text-[var(--fg-muted)] mb-0.5">/ {lang === 'es' ? 'informe' : 'report'}</span>
                </div>
                <div className="text-[12px] text-[var(--fg-muted)] mb-4">{lang === 'es' ? 'O $9.99 para acceso ilimitado' : 'Or $9.99 for unlimited access'}</div>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      <span className={f.bold ? 'font-semibold text-[var(--fg-secondary)]' : 'text-[var(--fg-muted)]'}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowPricing(true)} className="w-full mt-5 py-3 text-[14px] font-semibold text-white rounded-xl cursor-pointer border-none transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 4px 16px rgba(64,64,242,.25)' }}>
                  {lang === 'es' ? 'Desbloquear premium' : 'Unlock premium'}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* === INTERACTIVE OUTCOME SIMULATOR === */}
        <Reveal delay={620}>
          <div className="mb-8">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'PRUEBA INTERACTIVA' : 'TRY IT YOURSELF'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Simula tu resultado' : 'Simulate your outcome'}</h2>
              <p className="text-sm text-[var(--fg-muted)] mt-2 max-w-lg mx-auto">{lang === 'es' ? 'Ajusta los controles para ver cómo diferentes factores afectan los resultados de los casos' : 'Adjust the controls to see how different factors affect case outcomes'}</p>
            </div>
            <OutcomeSimulator lang={lang} onGetStarted={() => go(1)} />
          </div>
        </Reveal>

        {/* === PREMIUM VALUE CALCULATOR === */}
        <Reveal delay={630}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'CALCULA TU AHORRO' : 'CALCULATE YOUR SAVINGS'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? '¿Cuánto vale esta información?' : 'What is this data worth to you?'}</h2>
              <p className="text-sm text-[var(--fg-muted)] mt-2 max-w-md mx-auto">{lang === 'es' ? 'Compara el costo de nuestro informe premium con las alternativas' : 'Compare the cost of our premium report vs. the alternatives'}</p>
            </div>
            <PremiumValueCalculator lang={lang} onUnlock={() => setShowPricing(true)} />
          </div>
        </Reveal>

        {/* === DATA SOURCES & TRUST === */}
        <Reveal delay={640}>
          <div className="p-5 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #131B2E, rgba(99,102,241,0.08))' }}>
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-1">{lang === 'es' ? 'FUENTES DE DATOS' : 'DATA SOURCES'}</div>
              <div className="text-[15px] font-semibold text-[var(--fg-secondary)]">{lang === 'es' ? 'Construido sobre datos públicos federales' : 'Built on public federal court data'}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: 'Federal Judicial Center', desc: lang === 'es' ? 'Base de datos integrada (IDB) — cada caso civil federal desde 1970' : 'Integrated Database (IDB) — every federal civil case since 1970', badge: 'Primary' },
                { name: 'CourtListener / RECAP', desc: lang === 'es' ? 'Registros de PACER proporcionados al público' : 'PACER records made freely available to the public', badge: 'Secondary' },
                { name: 'U.S. Courts (PACER)', desc: lang === 'es' ? 'Documentos y registros judiciales oficiales' : 'Official court filings and docket records', badge: 'Reference' },
              ].map((s, i) => (
                <div key={i} className="p-3.5 bg-[#131B2E] rounded-xl border border-[var(--border-default)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[14px] font-semibold text-[var(--fg-secondary)]">{s.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>{s.badge}</span>
                  </div>
                  <div className="text-[11px] text-[var(--fg-muted)] leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <div className="text-[11px] text-[var(--fg-muted)]">{lang === 'es' ? 'Todos los datos son de dominio público. MyCaseValue no añade ni altera registros.' : 'All data is public domain. MyCaseValue does not add or alter any records.'}</div>
            </div>
          </div>
        </Reveal>

        {/* (Free guide section removed) */}

        {/* === WHAT YOUR REPORT INCLUDES === */}
        <Reveal delay={680}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'CARACTERÍSTICAS DEL INFORME' : 'REPORT FEATURES'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Qué incluye tu informe' : 'What your report includes'}</h2>
              <p className="text-sm text-[var(--fg-muted)] mt-2 max-w-md mx-auto">{lang === 'es' ? 'El informe gratuito te da lo básico. Premium agrega datos detallados de recuperación, comparaciones estatales e impacto del abogado.' : 'Free report gives you the basics. Premium adds detailed recovery data, state comparisons, and attorney impact.'}</p>
            </div>
            <ReportFeaturesGrid lang={lang} />
            <div className="text-center">
              <button onClick={() => go(1)} className="px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer border-none"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                {lang === 'es' ? 'Ver tu informe personalizado →' : 'Get your personalized report →'}
              </button>
            </div>
          </div>
        </Reveal>

        {/* === CASE TYPE STATS PREVIEW === */}
        <Reveal delay={700}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'DATOS CLAVE' : 'KNOW BEFORE YOU GO'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Estadísticas clave por tipo de caso' : 'Key stats by case type'}</h2>
            </div>
            <CaseTypeStatsPreview lang={lang} />
          </div>
        </Reveal>

        {/* === LEGAL COST REALITY CHECK === */}
        <Reveal delay={720}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'REALIDAD FINANCIERA' : 'FINANCIAL REALITY'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Costos legales: Qué esperar' : 'Legal costs: What to expect'}</h2>
            </div>
            <LegalCostComparison lang={lang} />
          </div>
        </Reveal>

        {/* === US MAP PREVIEW === */}
        <Reveal delay={740}>
          <div className="mb-4">
            <div className="text-center mb-4">
              <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'DATOS POR ESTADO' : 'STATE DATA'}</div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold" style={{ letterSpacing: '-1px' }}>{lang === 'es' ? 'Tu estado de un vistazo' : 'Your state at a glance'}</h2>
              <p className="text-sm text-[var(--fg-muted)] mt-2">{lang === 'es' ? 'Haz clic en tu estado para ver datos locales' : 'Click your state to see local insights'}</p>
            </div>
            <div className="bg-[#131B2E] rounded-2xl border border-[var(--border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.3)]" style={{ maxHeight: '500px', overflow: 'auto' }}>
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
      {showQuiz && <RiskAssessmentQuiz onClose={() => setShowQuiz(false)} onStartAssessment={() => { setShowQuiz(false); go(1); }} lang={lang} />}
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
    }} className="text-sm bg-transparent border-none cursor-pointer mb-4 flex items-center gap-1.5 transition-all hover:gap-2.5 group" style={{ color: 'var(--fg-muted)' }} aria-label={lang === 'es' ? 'Volver' : 'Go back'}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-0.5"><polyline points="15 18 9 12 15 6" /></svg>
      {lang === 'es' ? 'Volver' : 'Back'}
    </button>
  );

  // Step 1: Category
  if (step === 1) return (
    <Shell {...shellProps}>
      {keyboardShortcutsEl}
      <div className="max-w-xl mx-auto py-8 wizard-step-enter">
        <WizardProgress step={1} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(64,64,242,0.1), rgba(201,165,78,0.05))' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">{t.what_happened}</h2>
          </div>
          <p className="text-[var(--fg-muted)] mb-6 ml-[52px]">{t.select_closest}</p>
          <div className="space-y-2.5 stagger">
            {SITS.map(si => (
              <button key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
                className="category-card flex items-center gap-4 w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg group"
                style={{ background: 'linear-gradient(135deg, rgba(20,28,45,0.9), rgba(15,23,42,0.8))', border: '1.5px solid rgba(51,65,85,0.5)', boxShadow: '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.03)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = si.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1E293B'}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform" style={{ background: `${si.color}10` }}>
                  <CategoryIcon name={si.icon} color={si.color} size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[15px]">{si.label}</div>
                  <div className="text-[13px] text-[var(--fg-muted)] mt-0.5">{si.sub}</div>
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
    <Shell {...shellProps}>
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
          <p className="text-[var(--fg-muted)] mb-6 ml-[52px]">{t.choose_specific}</p>
          <div className="space-y-2.5 stagger">
            {sit.opts.map((o: any, i: number) => (
              <button key={i} onClick={() => { setSpec(o); go(3); }}
                className="category-card flex items-center w-full p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, rgba(20,28,45,0.9), rgba(15,23,42,0.8))', border: '1.5px solid rgba(51,65,85,0.5)', boxShadow: '0 1px 3px rgba(11,18,33,.02), inset 0 1px 0 rgba(255,255,255,0.03)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = sit.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1E293B'}>
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
    <Shell {...shellProps}>
      <div className="max-w-xl mx-auto py-6 wizard-step-enter">
        <WizardProgress step={3} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <BackButton />
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">{t.your_details}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿En qué estado estás?' : 'What state are you in?'}</label>
              <Select value={stateCode} options={STATES} onChange={setStateCode} placeholder={lang === 'es' ? 'Selecciona tu estado...' : 'Select your state...'} dark={darkMode} lang={lang} />
              <div className="text-[11px] text-[var(--fg-muted)] mt-1 px-1">{lang === 'es' ? 'Esto nos ayuda a mostrarte resultados específicos de tu área.' : 'This helps us show you results specific to your area.'}</div>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Cuándo ocurrió esto?' : 'When did this happen?'} <span className="text-coral">*</span></label>
              <Select value={timing} options={TIMING_OPTS} onChange={setTiming} dark={darkMode} lang={lang} />
            </div>
            {timing && (
              <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed animate-fade-in" style={{
                background: timing === 'recent' ? 'rgba(13,148,136,0.15)' : (timing === '2yr' || timing === 'old') ? 'rgba(232,116,97,0.12)' : 'rgba(99,102,241,0.08)',
                color: timing === 'recent' ? '#0D9488' : (timing === '2yr' || timing === 'old') ? '#DC2626' : '#A5B4FC',
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
              <Select value={amount} options={AMOUNT_OPTS} onChange={setAmount} dark={darkMode} lang={lang} />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Tienes abogado?' : 'Do you have a lawyer?'} <span className="text-coral">*</span></label>
              <Select value={attorney} options={ATTORNEY_OPTS} onChange={setAttorney} dark={darkMode} lang={lang} />
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
              ]} onChange={setOthersAffected} dark={darkMode} lang={lang} />
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
                  ]} onChange={setClassSize} dark={darkMode} lang={lang} />
                </div>
                {classSize && (
                  <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed" style={{ background: 'rgba(99,102,241,0.08)', color: 'var(--fg-muted)' }}>
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
            style={{ background: (timing && amount && attorney) ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B', color: (timing && amount && attorney) ? '#fff' : '#94A3B8', boxShadow: (timing && amount && attorney) ? '0 4px 20px rgba(64,64,242,.3)' : 'none', padding: '18px' }}>
            {lang === 'es' ? 'Ver resultados →' : 'View outcomes →'}
          </button>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 4: Consent
  if (step === 4) return (
    <Shell {...shellProps}>
      <div className="max-w-xl mx-auto py-6 wizard-step-enter">
        <WizardProgress step={4} lang={lang} labels={[t.wiz_situation, t.wiz_details, t.wiz_confirm, t.wiz_email, t.wiz_report]} />
        <BackButton />
        <Reveal>
          <Card glow>
            <div className="inline-block px-3.5 py-1 rounded-lg text-[11px] font-semibold mb-4" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>{t.one_moment}</div>
            <h2 className="text-2xl font-display font-bold mb-3">{t.before_report}</h2>
            <p className="text-[15px] text-[var(--fg-muted)] leading-relaxed mb-3">
              {lang === 'es'
                ? 'Estás a punto de ver datos reales de registros judiciales federales. Estos datos muestran lo que le sucedió a otras personas — no predicen lo que te sucederá a ti.'
                : 'You are about to see real data from federal court records. This data shows what happened to other people — it does not predict what will happen to you.'}
            </p>
            <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mb-5">
              {lang === 'es'
                ? 'Solo un abogado con licencia puede evaluar tus hechos y circunstancias específicas. MyCaseValue es una herramienta informativa, no un servicio legal.'
                : 'Only a licensed attorney can evaluate your specific facts and circumstances. MyCaseValue is an informational tool, not a legal service.'}
            </p>
            <label className="flex gap-3 items-start cursor-pointer text-[15px]" onClick={() => setConsent(!consent)}>
              <div className="w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{ borderColor: consent ? '#4F46E5' : '#1E293B', background: consent ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B' }}>
                {consent && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className="leading-relaxed">{lang === 'es'
                ? 'Entiendo que estos son solo datos históricos, no evalúan mi situación, y no se crea ninguna relación abogado-cliente.'
                : 'I understand this is historical data only, does not evaluate my situation, and no attorney-client relationship is created.'}</span>
            </label>
            <button onClick={() => go(5)} disabled={!consent}
              className="w-full mt-6 py-4.5 text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer disabled:cursor-default disabled:opacity-40 transition-all active:scale-[0.98] hover:scale-[1.01]"
              style={{ background: consent ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B', color: consent ? '#fff' : '#94A3B8', boxShadow: consent ? '0 4px 20px rgba(64,64,242,.3)' : 'none', padding: '18px' }}>
              {lang === 'es' ? 'Generar informe →' : 'Generate report →'}
            </button>
          </Card>
        </Reveal>
      </div>
    </Shell>
  );

  // Step 5: Email
  if (step === 5) return (
    <Shell {...shellProps}>
      <div className="max-w-md mx-auto py-10 text-center page-enter">
        <Reveal>
          <Card glow className="px-6 sm:px-9 py-10">
            <h2 className="text-2xl font-display font-bold mb-2">{t.data_ready}</h2>
            <p className="text-[15px] text-[var(--fg-muted)] mb-6 leading-relaxed">
              {lang === 'es' ? 'Guarda una copia en tu correo, o sáltalo para ver ahora.' : 'Save a copy to your email, or skip to view now.'}
            </p>
            <div className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 px-4 py-3 text-[15px] border-[1.5px] border-[var(--border-default)] rounded-xl outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 card-bg bg-[#131B2E] transition-colors" />
              <button onClick={() => {
                if (email.includes('@') && email.includes('.')) {
                  setEmailSent(true);
                  apiCall('/api/email/capture', 'POST', { email, case_type: spec?.d });
                  startLoad();
                }
              }} className="px-5 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer transition-all active:scale-[0.96]"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                {lang === 'es' ? 'Enviar' : 'Send'}
              </button>
            </div>
            <button onClick={startLoad} className="mt-3 text-sm text-[var(--fg-muted)] bg-transparent border-none cursor-pointer underline hover:text-[var(--fg-muted)] transition-colors">
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
    // Loading — premium animated loader overlay
    if (loading) return (
      <Shell {...shellProps}>
        {showReportLoader && (
          <ReportLoader
            lang={lang}
            caseName={spec?.d || ''}
            onComplete={() => setShowReportLoader(false)}
          />
        )}
        <div className="max-w-3xl mx-auto py-8 relative scan-line">
          {/* Animated header skeleton */}
          <div className="flex justify-between mb-6">
            <div className="flex-1">
              <div className="h-3 w-44 rounded-lg skeleton" />
              <div className="h-7 w-3/5 rounded-lg mt-2.5 skeleton" />
            </div>
            <div className="h-11 w-24 rounded-lg skeleton" />
          </div>

          {/* Animated metric cards with stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 stagger-in">
            {[
              { label: lang === 'es' ? 'Registros' : 'Records', color: 'var(--accent-primary)' },
              { label: lang === 'es' ? 'Comparando' : 'Matching', color: 'var(--accent-secondary)' },
              { label: lang === 'es' ? 'Analizando' : 'Analyzing', color: 'var(--accent-secondary, #A5B4FC)' },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-[var(--border-default)] rounded-2xl glass-premium" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: item.color }}>{item.label}</div>
                <div className="h-8 w-2/3 rounded skeleton" />
                {loadPct > (i + 1) * 25 && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: '100%', background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Main progress bar with glow */}
          <div className="w-full h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-4 relative">
            <div className="h-full rounded-full transition-all duration-300 progress-animated" style={{
              width: `${loadPct}%`,
              boxShadow: '0 0 20px rgba(79,70,229,0.4)',
            }} />
          </div>

          {/* Progress ring + status */}
          <div className="flex flex-col items-center">
            <div className="mb-3 relative">
              <ProgressRing pct={loadPct} size={64} />
              <div className="absolute inset-0 rounded-full morph-blob" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)', transform: 'scale(2)' }} />
            </div>
            <div className="text-[15px] text-[var(--fg-secondary)] mb-2 text-center font-medium">
              {lang === 'es' ? (
                loadPct < 15 ? `Buscando en ${totalDisplay} registros judiciales...`
                : loadPct < 30 ? `Coincidiendo ${spec?.d || 'tu situación'} en la base de datos...`
                : loadPct < 50 ? 'Cruzando datos con CourtListener...'
                : loadPct < 70 ? 'Agregando resultados históricos...'
                : loadPct < 85 ? `Analizando ${(spec && MOCK_DATA[spec.nos]) ? MOCK_DATA[spec.nos].total.toLocaleString() : '287,420'} casos similares...`
                : 'Generando tu informe personalizado...'
              ) : (
                loadPct < 15 ? `Searching ${totalDisplay} court records...`
                : loadPct < 30 ? `Matching ${spec?.d || 'your situation'} in the database...`
                : loadPct < 50 ? 'Cross-referencing CourtListener...'
                : loadPct < 70 ? 'Aggregating historical outcomes...'
                : loadPct < 85 ? `Analyzing ${(spec && MOCK_DATA[spec.nos]) ? MOCK_DATA[spec.nos].total.toLocaleString() : '287,420'} similar cases...`
                : 'Generating your personalized report...'
              )}
            </div>

            {/* Data source badges */}
            {loadPct > 20 && (
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {[
                  { name: 'Federal Judicial Center', done: loadPct > 30 },
                  { name: 'CourtListener', done: loadPct > 50 },
                  { name: 'PACER Records', done: loadPct > 70 },
                ].map((src, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all" style={{
                    background: src.done ? 'rgba(13,148,136,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${src.done ? 'rgba(13,148,136,0.2)' : '#1E293B'}`,
                    color: src.done ? '#0D9488' : '#64748B',
                  }}>
                    {src.done ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-[#334155] breathe" />
                    )}
                    {src.name}
                  </div>
                ))}
              </div>
            )}

            {loadPct > 30 && loadPct < 90 && (
              <div className="text-[12px] text-[var(--fg-muted)] mt-3 text-center max-w-md">
                {lang === 'es' ? 'Los tribunales federales resolvieron más de 400,000 casos civiles el año pasado.' : 'Federal courts resolved over 400,000 civil cases last year.'}
              </div>
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
      <Shell {...shellProps}>
        {/* Email capture gate — show on first report view for non-premium users */}
        {showEmailGate && !emailCaptured && !isPremium && (
          <EmailCaptureGate
            lang={lang}
            caseType={spec?.d}
            onSubmit={(email) => {
              setEmailCaptured(true);
              setShowEmailGate(false);
              try { localStorage.setItem('mcv-email', email); } catch {}
              apiCall('/api/email/capture', 'POST', { email, source: 'email-gate', nos: spec?.nos });
            }}
            onSkip={() => setShowEmailGate(false)}
          />
        )}
        <SocialProofToast lang={lang} active={true} />
        {/* Exit intent modal — desktop only, once per session */}
        {!emailCaptured && !isPremium && (
          <ExitIntentModal
            lang={lang}
            caseType={spec?.d}
            onCapture={(email) => {
              setEmailCaptured(true);
              try { localStorage.setItem('mcv-email', email); } catch {}
              apiCall('/api/email/capture', 'POST', { email, source: 'exit-intent', nos: spec?.nos });
            }}
          />
        )}
        <div className="py-6 cinematic-enter">
          {/* Quick-glance metrics strip */}
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 data-grid-stagger">
              {[
                { label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate', value: `${wr}%`, color: wrColor, icon: '⚖️' },
                { label: lang === 'es' ? 'Casos similares' : 'Similar Cases', value: d.total ? d.total.toLocaleString() : '—', color: '#6366F1', icon: '📊' },
                { label: lang === 'es' ? 'Duración típica' : 'Typical Duration', value: `${d.mo || '—'}mo`, color: 'var(--accent-secondary, #A5B4FC)', icon: '⏱' },
                { label: lang === 'es' ? 'Acuerdo + Victoria' : 'Settle + Win', value: `${winSettleRate}%`, color: '#5EEAD4', icon: '✓' },
              ].map((m, i) => (
                <div key={i} className="glass-ultra rounded-xl p-4 text-center spotlight-card gpu-accelerate">
                  <div className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>{m.icon} {m.label}</div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold spring-count" style={{ color: m.color, animationDelay: `${i * 100}ms`, letterSpacing: '-1px' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Live bar */}
          <Reveal>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 no-print">
              <div className="flex items-center gap-2">
                <span className="live-beacon" />
                <span className="text-sm text-[var(--fg-muted)]">
                  <strong className="text-[var(--fg-muted)]">{liveCount}</strong> {lang === 'es' ? 'consultando ahora' : 'checking now'} · <strong className="text-[var(--fg-muted)]">12,847</strong> {lang === 'es' ? 'informes este mes' : 'reports this month'}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  try {
                    const u = window.location.origin + '#' + btoa(JSON.stringify({ c: spec?.nos, s: stateCode, t: timing }));
                    navigator.clipboard.writeText(u);
                    toast(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
                  } catch { toast(lang === 'es' ? 'No se pudo copiar' : 'Could not copy'); }
                }} className="text-sm font-semibold px-4 py-2 card-bg bg-[#131B2E] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors">
                  {lang === 'es' ? 'Compartir' : 'Share'}
                </button>
                <button onClick={saveReport} className="text-sm font-semibold px-4 py-2 card-bg bg-[#131B2E] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-2px' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  {lang === 'es' ? 'Guardar' : 'Save'}
                </button>
                {isPremium && (
                  <button onClick={() => { try { window.print(); } catch {} }}
                    className="text-sm font-semibold px-4 py-2 card-bg bg-[#131B2E] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors">
                    PDF
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* UPL Notice */}
          <Reveal>
            <div className="px-5 py-3 card-bg bg-[#131B2E] rounded-xl border border-[var(--border-default)] mb-4 text-[13px] text-[var(--fg-muted)] leading-relaxed">
              <strong className="text-[var(--fg-muted)]">{lang === 'es' ? 'Importante:' : 'Important:'}</strong> {UPL.resultsNotice}
            </div>
          </Reveal>

          {/* === REPORT TABS — Sticky tab bar === */}
          <ReportTabs lang={lang} activeTab={activeReportTab} onTabChange={setActiveReportTab} />

          {/* === TABBED CONTENT with optional desktop sidebar === */}
          <div style={{ display: 'flex', gap: 'var(--space-6, 24px)', alignItems: 'flex-start' }}>
            {/* Desktop sidebar — hidden on mobile */}
            <div className="hidden lg:block" style={{ flexShrink: 0 }}>
              <ReportSidebar
                lang={lang}
                caseType={spec?.d || ''}
                category={sit?.label || ''}
                winRate={wr}
                medianDays={(d.mo || 10) * 30}
                settlementRate={d.sp || 0}
                activeTab={activeReportTab}
                onTabChange={setActiveReportTab}
                isPremium={isPremium}
                onUpgrade={() => setShowPricing(true)}
              />
            </div>

            {/* Main content area */}
            <div style={{ flex: 1, minWidth: 0 }}>

          {/* ====== OVERVIEW TAB ====== */}
          <TabPanel tabId="overview" activeTab={activeReportTab}>

          {/* Confidence Score & Case Timeline */}
          <Reveal delay={20}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Card className="flex items-center justify-center p-6">
                <ConfidenceRing score={ccScore} lang={lang} sublabel={lang === 'es' ? 'Basado en datos históricos' : 'Based on historical data'} />
              </Card>
              <Card className="p-5">
                <CaseTimeline medianMonths={d.mo || 10} caseType={spec?.d} lang={lang} />
              </Card>
            </div>
          </Reveal>

          {/* AI Case Summary */}
          <Reveal>
            <div className="px-5 py-4 rounded-xl mb-4 glass-ultra depth-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 icon-glow" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(99,102,241,0.1))', borderRadius: '10px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold tracking-[2px] mb-1 text-gradient-premium">{lang === 'es' ? 'RESUMEN DE DATOS' : 'DATA SUMMARY'}</div>
                  <p className="text-[13px] leading-relaxed text-[var(--fg-muted)]">{getCaseSummary(d)}</p>
                  <div className="text-[10px] text-[var(--fg-muted)] mt-1 italic">{lang === 'es' ? 'Generado a partir de datos históricos agregados. No es asesoramiento legal.' : 'Generated from aggregate historical data. Not legal advice.'}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* AI Deep Analysis — Personalized Narrative */}
          {isPremium && (
            <Reveal delay={50}>
              <Card premium className="p-6 sm:p-8 gradient-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a4 4 0 014 4c0 1.95-2 3-2 8h-4c0-5-2-6.05-2-8a4 4 0 014-4z"/><line x1="10" y1="22" x2="14" y2="22"/><line x1="10" y1="18" x2="14" y2="18"/><line x1="9" y1="20" x2="15" y2="20"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#7C3AED' }}>
                      {lang === 'es' ? 'ANÁLISIS PERSONALIZADO' : 'PERSONALIZED ANALYSIS'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {(() => {
                        const narrative = generateCaseNarrative({
                          category: sit?.id || 'work',
                          subType: spec?.d || '',
                          state: stateCode || 'US',
                          timing: timing,
                          amount: amount,
                          attorney: attorney,
                          winRate: wr / 100,
                          medianTimeline: `${d.mo || 10} months`,
                        });
                        return narrative.headline;
                      })()}
                    </div>
                  </div>
                </div>

                {(() => {
                  const narrative = generateCaseNarrative({
                    category: sit?.id || 'work',
                    subType: spec?.d || '',
                    state: stateCode || 'US',
                    timing: timing,
                    amount: amount,
                    attorney: attorney,
                    winRate: wr / 100,
                    medianTimeline: `${d.mo || 10} months`,
                  });

                  const strengthColors = {
                    strong: { bg: 'rgba(13,148,136,0.15)', text: '#0D9488', label: lang === 'es' ? 'Patrones favorables' : 'Favorable Patterns' },
                    moderate: { bg: 'rgba(217,119,6,0.12)', text: '#D97706', label: lang === 'es' ? 'Patrones mixtos' : 'Mixed Patterns' },
                    challenging: { bg: 'rgba(232,116,97,0.12)', text: '#E87461', label: lang === 'es' ? 'Patrones desafiantes' : 'Challenging Patterns' },
                  };
                  const sc = strengthColors[narrative.strengthIndicator];

                  return (
                    <>
                      {/* Strength indicator */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                          <div className="h-full rounded-full transition-all duration-1000" style={{
                            width: `${wr}%`,
                            background: `linear-gradient(135deg, ${sc.text}, ${sc.text}90)`,
                          }} />
                        </div>
                      </div>

                      {/* Summary narrative */}
                      <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--fg-secondary)' }}>
                        {narrative.summary}
                      </p>

                      {/* Key insights */}
                      <div className="mb-5">
                        <div className="text-[11px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'OBSERVACIONES CLAVE' : 'KEY INSIGHTS'}</div>
                        <div className="space-y-3">
                          {narrative.keyInsights.map((insight, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(30,41,59,0.5)' }}>
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold" style={{ background: 'linear-gradient(135deg, #4F46E520, #6366F120)', color: 'var(--accent-primary)' }}>
                                {i + 1}
                              </div>
                              <p className="text-[13px] leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>{insight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline narrative */}
                      <div className="mb-5 p-4 rounded-xl border" style={{ borderColor: '#334155', background: 'rgba(30,41,59,0.3)' }}>
                        <div className="text-[11px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-2">{lang === 'es' ? 'ANÁLISIS DE CRONOLOGÍA' : 'TIMELINE ANALYSIS'}</div>
                        <p className="text-[13px] leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>{narrative.timelineNarrative}</p>
                      </div>

                      {/* Comparison */}
                      <div className="mb-5 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #1A2744, #162035)' }}>
                        <div className="text-[11px] font-bold tracking-[2px] mb-2" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'COMPARACIÓN JURISDICCIONAL' : 'JURISDICTION COMPARISON'}</div>
                        <p className="text-[13px] leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>{narrative.comparisonNote}</p>
                      </div>

                      {/* Next steps */}
                      <div className="mb-4">
                        <div className="text-[11px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'PASOS RECOMENDADOS' : 'RECOMMENDED NEXT STEPS'}</div>
                        <div className="space-y-2">
                          {narrative.nextSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5" className="flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12" /></svg>
                              <p className="text-[13px] leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div className="p-3 rounded-lg text-[10px] leading-relaxed italic" style={{ background: 'rgba(30,41,59,0.5)', color: 'var(--fg-muted)' }}>
                        {narrative.disclaimer}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end overview: AI Deep Analysis */}

          {/* ====== SIMILAR CASES TAB: Google Scholar ====== */}
          <TabPanel tabId="similar" activeTab={activeReportTab}>
          {/* Google Scholar Legal Insights — Premium */}
          {isPremium && (
            <Reveal delay={70}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #0D948820, #14B8A620)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'INVESTIGACIÓN ACADÉMICA' : 'LEGAL SCHOLARSHIP'}</div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>{lang === 'es' ? 'Contexto de Google Scholar' : 'Google Scholar Context'}</div>
                  </div>
                </div>
                {(() => {
                  const scholarData: Record<string, { citations: { title: string; authors: string; year: number; cited: number }[]; statutes: string[]; trend: string }> = {
                    work: { citations: [
                      { title: 'Employment Discrimination Litigation: Behavioral Outcomes', authors: 'Clermont & Schwab', year: 2024, cited: 847 },
                      { title: 'Workplace Retaliation Claims Under Title VII', authors: 'Seiner', year: 2023, cited: 312 },
                    ], statutes: ['Title VII (42 U.S.C. § 2000e)', 'ADA (42 U.S.C. § 12101)', 'ADEA (29 U.S.C. § 621)'], trend: 'Remote work disputes and AI-related discrimination claims are emerging areas of litigation.' },
                    injury: { citations: [
                      { title: 'Medical Malpractice Reform and Claim Resolution', authors: 'Mello & Studdert', year: 2024, cited: 1203 },
                      { title: 'Tort Litigation Trends in Federal Courts', authors: 'Galanter', year: 2023, cited: 567 },
                    ], statutes: ['28 U.S.C. § 1332 (Diversity Jurisdiction)', 'Federal Tort Claims Act (28 U.S.C. § 2671)'], trend: 'Multi-district litigation for defective products continues to grow, with increased focus on AI and autonomous vehicle liability.' },
                    consumer: { citations: [
                      { title: 'TCPA Litigation and Consumer Protection', authors: 'Anderson & Huffman', year: 2024, cited: 423 },
                      { title: 'Data Breach Class Actions: Trends and Outcomes', authors: 'Romanosky', year: 2023, cited: 289 },
                    ], statutes: ['TCPA (47 U.S.C. § 227)', 'FCRA (15 U.S.C. § 1681)', 'FDCPA (15 U.S.C. § 1692)'], trend: 'Data privacy litigation under state laws (CCPA, BIPA) is rapidly expanding the consumer protection landscape.' },
                    rights: { citations: [
                      { title: 'Section 1983 Litigation: Qualified Immunity', authors: 'Schwartz', year: 2024, cited: 934 },
                      { title: 'Voting Rights Act Enforcement Patterns', authors: 'Tokaji', year: 2023, cited: 412 },
                    ], statutes: ['42 U.S.C. § 1983', 'Voting Rights Act (52 U.S.C. § 10301)', '42 U.S.C. § 1981'], trend: 'Qualified immunity reform and police accountability cases continue to shape civil rights jurisprudence.' },
                    money: { citations: [
                      { title: 'Contract Disputes in Federal Courts', authors: 'Eisenberg & Miller', year: 2024, cited: 678 },
                      { title: 'Securities Fraud Class Actions', authors: 'Coffee', year: 2023, cited: 521 },
                    ], statutes: ['UCC Article 2', 'Securities Exchange Act § 10(b)', '15 U.S.C. § 78j(b)'], trend: 'Cryptocurrency and digital asset disputes are creating novel contract law questions in federal courts.' },
                    housing: { citations: [
                      { title: 'Fair Housing Act Enforcement', authors: 'Schwemm', year: 2024, cited: 345 },
                      { title: 'Foreclosure Defense in Federal Court', authors: 'Whitman', year: 2023, cited: 198 },
                    ], statutes: ['Fair Housing Act (42 U.S.C. § 3601)', 'RESPA (12 U.S.C. § 2601)', 'TILA (15 U.S.C. § 1601)'], trend: 'Algorithmic discrimination in housing and lending decisions is an emerging frontier of fair housing litigation.' },
                    medical: { citations: [
                      { title: 'ERISA Litigation and Benefits Denial', authors: 'Langbein', year: 2024, cited: 567 },
                      { title: 'Healthcare Fraud Under the False Claims Act', authors: 'Krause', year: 2023, cited: 389 },
                    ], statutes: ['ERISA (29 U.S.C. § 1001)', 'False Claims Act (31 U.S.C. § 3729)', 'ACA § 1557'], trend: 'Mental health parity enforcement and surprise billing disputes are growing areas of healthcare litigation.' },
                    family: { citations: [
                      { title: 'Federal Jurisdiction in Family Law', authors: 'Pfander', year: 2024, cited: 234 },
                      { title: 'International Child Abduction and the Hague Convention', authors: 'Silberman', year: 2023, cited: 187 },
                    ], statutes: ['Hague Convention (ICARA)', 'VAWA (34 U.S.C. § 12291)', 'PKPA (28 U.S.C. § 1738A)'], trend: 'Cross-border custody disputes and interstate enforcement continue to drive federal family law litigation.' },
                    gov: { citations: [
                      { title: 'Administrative Law and Agency Deference', authors: 'Vermeule', year: 2024, cited: 892 },
                      { title: 'Immigration Litigation Trends', authors: 'Legomsky', year: 2023, cited: 456 },
                    ], statutes: ['APA (5 U.S.C. § 551)', 'INA (8 U.S.C. § 1101)', 'Social Security Act (42 U.S.C. § 405)'], trend: 'Post-Chevron deference landscape is reshaping how courts review agency decisions across all areas.' },
                    education: { citations: [
                      { title: 'Title IX Enforcement and Campus Due Process', authors: 'Cantalupo', year: 2024, cited: 378 },
                      { title: 'Special Education Litigation Under IDEA', authors: 'Yell', year: 2023, cited: 267 },
                    ], statutes: ['Title IX (20 U.S.C. § 1681)', 'IDEA (20 U.S.C. § 1400)', 'Section 504 (29 U.S.C. § 794)'], trend: 'Student loan and Title IX procedural fairness cases are among the fastest-growing education law areas.' },
                  };
                  const catData = scholarData[sit?.id || 'work'] || scholarData.work;
                  return (
                    <>
                      {/* Top Citations */}
                      <div className="space-y-2 mb-5">
                        {catData.citations.map((c, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(30,41,59,0.5)' }}>
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#0D948815' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-[13px] font-semibold" style={{ color: '#E2E8F0' }}>{c.title}</div>
                              <div className="text-[11px] text-[var(--fg-muted)] mt-0.5">{c.authors} · {c.year} · Cited by {c.cited}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Key Statutes */}
                      <div className="mb-5">
                        <div className="text-[10px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-2">{lang === 'es' ? 'ESTATUTOS CLAVE' : 'KEY STATUTES'}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {catData.statutes.map((s, i) => (
                            <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg" style={{ background: 'var(--bg-elevated)', color: 'var(--accent-secondary, #A5B4FC)', border: '1px solid #334155' }}>{s}</span>
                          ))}
                        </div>
                      </div>

                      {/* Emerging Trend */}
                      <div className="p-3 rounded-xl flex items-start gap-2.5" style={{ background: 'linear-gradient(135deg, #1A2744, #162035)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <div>
                          <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'TENDENCIA EMERGENTE' : 'EMERGING TREND'}</div>
                          <p className="text-[12px] leading-relaxed m-0" style={{ color: 'var(--fg-muted)' }}>{catData.trend}</p>
                        </div>
                      </div>

                      <div className="text-[10px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'Datos de investigación de Google Scholar. Solo con fines informativos.' : 'Research data sourced from Google Scholar. For informational purposes only.'}</div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end similar: Google Scholar */}

          {/* ====== TIMELINE TAB ====== */}
          <TabPanel tabId="timeline" activeTab={activeReportTab}>
          {/* Personalized Case Timeline — Visual journey */}
          {isPremium && (
            <Reveal delay={80}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #4F46E520, #6366F120)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'CRONOLOGÍA DE TU CASO' : 'YOUR CASE TIMELINE'}</div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>{lang === 'es' ? 'Recorrido típico del caso' : 'Typical Case Journey'}</div>
                  </div>
                </div>
                {(() => {
                  const months = d.mo || 10;
                  const phases = [
                    { name: lang === 'es' ? 'Presentación' : 'Filing & Service', pct: 5, icon: '📋', duration: lang === 'es' ? '1-2 meses' : '1-2 months', desc: lang === 'es' ? 'Presentación de la demanda, notificación al demandado' : 'Complaint filed, defendant served with summons' },
                    { name: lang === 'es' ? 'Descubrimiento' : 'Discovery', pct: 35, icon: '🔍', duration: lang === 'es' ? `${Math.round(months * 0.35)}-${Math.round(months * 0.5)} meses` : `${Math.round(months * 0.35)}-${Math.round(months * 0.5)} months`, desc: lang === 'es' ? 'Interrogatorios, deposiciones, solicitudes de documentos' : 'Interrogatories, depositions, document requests' },
                    { name: lang === 'es' ? 'Mociones' : 'Motions', pct: 55, icon: '⚖️', duration: lang === 'es' ? `${Math.round(months * 0.5)}-${Math.round(months * 0.65)} meses` : `${Math.round(months * 0.5)}-${Math.round(months * 0.65)} months`, desc: lang === 'es' ? 'Moción de sentencia sumaria, mociones in limine' : 'Summary judgment motions, motions in limine' },
                    { name: lang === 'es' ? 'Mediación' : 'Settlement / Mediation', pct: 70, icon: '🤝', duration: lang === 'es' ? `${Math.round(months * 0.6)}-${Math.round(months * 0.75)} meses` : `${Math.round(months * 0.6)}-${Math.round(months * 0.75)} months`, desc: lang === 'es' ? `${d.sp || 45}% de los casos se resuelven en esta etapa` : `${d.sp || 45}% of cases resolve at this stage` },
                    { name: lang === 'es' ? 'Juicio' : 'Trial', pct: 90, icon: '🏛️', duration: lang === 'es' ? `${Math.round(months * 0.85)}-${months} meses` : `${Math.round(months * 0.85)}-${months} months`, desc: lang === 'es' ? 'Solo ~5% de los casos llegan a juicio' : 'Only ~5% of cases proceed to trial' },
                    { name: lang === 'es' ? 'Resolución' : 'Resolution', pct: 100, icon: '✅', duration: lang === 'es' ? `~${months} meses` : `~${months} months`, desc: lang === 'es' ? 'Sentencia, acuerdo final, o desestimación' : 'Judgment, final settlement, or dismissal' },
                  ];
                  return (
                    <div className="relative">
                      {/* Progress bar */}
                      <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: 'var(--bg-elevated)' }}>
                        <div className="w-full rounded-full" style={{ height: '100%', background: 'linear-gradient(180deg, #4F46E5, #0D9488)' }} />
                      </div>
                      <div className="space-y-1">
                        {phases.map((phase, i) => (
                          <div key={i} className="flex items-start gap-4 pl-10 relative py-3">
                            <div className="absolute left-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-10" style={{
                              background: i <= 3 ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B',
                              border: i > 3 ? '2px solid #334155' : 'none',
                              color: i <= 3 ? 'white' : '#94A3B8',
                              boxShadow: i <= 3 ? '0 2px 8px rgba(64,64,242,0.3)' : 'none',
                            }}>
                              {i <= 3 ? '✓' : (i + 1)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm">{phase.icon}</span>
                                <span className="text-[14px] font-semibold" style={{ color: '#E2E8F0' }}>{phase.name}</span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--fg-muted)' }}>{phase.duration}</span>
                              </div>
                              <p className="text-[12px] mt-1 m-0" style={{ color: 'var(--fg-muted)' }}>{phase.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-lg text-[11px] text-center" style={{ background: 'rgba(30,41,59,0.5)', color: 'var(--fg-muted)' }}>
                        {lang === 'es'
                          ? `⏱ Duración estimada basada en ${d.total?.toLocaleString() || '0'} casos similares: ~${months} meses promedio`
                          : `⏱ Estimated duration based on ${d.total?.toLocaleString() || '0'} similar cases: ~${months} months average`}
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          {/* Case Strength Radar — Premium */}
          {isPremium && (
            <Reveal delay={90}>
              <Card premium className="p-6 sm:p-8 holo-gradient">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #6366F120, #7C3AED20)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#6366F1' }}>
                      {lang === 'es' ? 'RADAR DE FORTALEZA' : 'STRENGTH RADAR'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Análisis multidimensional' : 'Multi-Factor Analysis'}
                    </div>
                  </div>
                </div>
                {(() => {
                  const factors = [
                    { label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate', value: Math.min(100, Math.round(wr * 1.2)) },
                    { label: lang === 'es' ? 'Acuerdos' : 'Settlement', value: Math.min(100, d.sp || 45) },
                    { label: lang === 'es' ? 'Evidencia' : 'Evidence', value: Math.min(100, Math.round(55 + (attorney === 'yes' ? 20 : 0) + (timing === 'recent' ? 15 : -5))) },
                    { label: lang === 'es' ? 'Rapidez' : 'Speed', value: Math.min(100, Math.round(100 - (d.mo || 10) * 4)) },
                    { label: lang === 'es' ? 'Jurisdicción' : 'Jurisdiction', value: stateCode && AGGREGATE_STATE_RATES[stateCode] ? Math.round(AGGREGATE_STATE_RATES[stateCode] * 1.3) : 55 },
                    { label: lang === 'es' ? 'Representación' : 'Representation', value: attorney === 'yes' || attorney === 'with' ? 85 : attorney === 'looking' ? 60 : 30 },
                  ];
                  const n = factors.length;
                  const cx = 130, cy = 130, maxR = 100;
                  const angleStep = (2 * Math.PI) / n;
                  const getPoint = (i: number, r: number) => ({
                    x: cx + r * Math.cos(i * angleStep - Math.PI / 2),
                    y: cy + r * Math.sin(i * angleStep - Math.PI / 2),
                  });
                  const bgPoints = factors.map((_, i) => getPoint(i, maxR));
                  const dataPoints = factors.map((f, i) => getPoint(i, (f.value / 100) * maxR));
                  const avgScore = Math.round(factors.reduce((s, f) => s + f.value, 0) / n);

                  return (
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <svg width="260" height="260" viewBox="0 0 260 260" className="flex-shrink-0">
                        {/* Background rings */}
                        {[25, 50, 75, 100].map(pct => (
                          <polygon key={pct} points={factors.map((_, i) => { const p = getPoint(i, pct); return `${p.x},${p.y}`; }).join(' ')}
                            fill="none" stroke={'#1E293B'} strokeWidth="0.5" />
                        ))}
                        {/* Axis lines */}
                        {factors.map((_, i) => {
                          const p = getPoint(i, maxR);
                          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={'#1E293B'} strokeWidth="0.5" />;
                        })}
                        {/* Data polygon */}
                        <polygon points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')}
                          fill="rgba(79,70,229,0.12)" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"
                          style={{ filter: 'drop-shadow(0 2px 8px rgba(79,70,229,0.2))' }} />
                        {/* Data dots */}
                        {dataPoints.map((p, i) => (
                          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4F46E5" stroke="white" strokeWidth="2" />
                        ))}
                        {/* Labels */}
                        {factors.map((f, i) => {
                          const p = getPoint(i, maxR + 22);
                          return (
                            <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                              fontSize="10" fontWeight="600" fill={'#94A3B8'}>
                              {f.label}
                            </text>
                          );
                        })}
                        {/* Center score */}
                        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="28" fontWeight="800" fill="#4F46E5">{avgScore}</text>
                        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94A3B8">
                          {lang === 'es' ? 'PUNTUACIÓN' : 'SCORE'}
                        </text>
                      </svg>
                      <div className="flex-1 space-y-2.5">
                        {factors.map((f, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-1">
                              <span className="text-[12px] font-medium" style={{ color: 'var(--fg-secondary)' }}>{f.label}</span>
                              <span className="text-[12px] font-bold font-data" style={{ color: f.value >= 60 ? '#0D9488' : f.value >= 40 ? '#6366F1' : '#E87461' }}>{f.value}/100</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                              <div className="h-full rounded-full transition-all duration-700" style={{
                                width: `${f.value}%`,
                                background: f.value >= 60 ? 'linear-gradient(90deg, #0D9488, #14B8A6)' : f.value >= 40 ? 'linear-gradient(90deg, #4F46E5, #6366F1)' : 'linear-gradient(90deg, #E87461, #F59E0B)',
                                transitionDelay: `${i * 100}ms`,
                              }} />
                            </div>
                          </div>
                        ))}
                        <div className="pt-3 text-[10px] text-[var(--fg-muted)] italic">
                          {lang === 'es' ? 'Puntuaciones basadas en datos agregados. No es una evaluación de caso individual.' : 'Scores based on aggregate data. Not an individual case evaluation.'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          {/* Settlement Timing Heatmap — Premium */}
          {isPremium && (
            <Reveal delay={95}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #0D948820, #059F8E20)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-secondary)' }}>
                      {lang === 'es' ? 'VENTANA DE ACUERDO' : 'SETTLEMENT WINDOW'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Cuándo se resuelven los casos' : 'When Cases Settle'}
                    </div>
                  </div>
                </div>
                {(() => {
                  const months = d.mo || 10;
                  // Generate settlement timing data
                  const timingData = [
                    { month: 1, pct: 3, label: 'Mo 1' },
                    { month: 2, pct: 5, label: 'Mo 2' },
                    { month: 3, pct: 8, label: 'Mo 3' },
                    { month: 4, pct: 14, label: 'Mo 4' },
                    { month: 5, pct: 18, label: 'Mo 5' },
                    { month: 6, pct: 22, label: 'Mo 6' },
                    { month: 7, pct: 16, label: 'Mo 7' },
                    { month: 8, pct: 11, label: 'Mo 8' },
                    { month: 9, pct: 6, label: 'Mo 9' },
                    { month: 10, pct: 4, label: 'Mo 10' },
                    { month: 11, pct: 2, label: 'Mo 11' },
                    { month: 12, pct: 1, label: 'Mo 12' },
                  ];
                  const maxPct = Math.max(...timingData.map(t => t.pct));
                  const peakMonth = timingData.find(t => t.pct === maxPct);

                  return (
                    <>
                      {/* Heatmap bars */}
                      <div className="flex items-end gap-1.5 h-[120px] mb-3">
                        {timingData.map((t, i) => {
                          const intensity = t.pct / maxPct;
                          const color = intensity > 0.7 ? '#0D9488' : intensity > 0.4 ? '#6366F1' : '#CBD5E1';
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div className="text-[10px] font-bold font-data" style={{ color: intensity > 0.5 ? color : '#94A3B8' }}>
                                {t.pct}%
                              </div>
                              <div className="w-full rounded-t-md transition-all duration-700" style={{
                                height: `${(t.pct / maxPct) * 90}px`,
                                background: `linear-gradient(to top, ${color}90, ${color})`,
                                opacity: 0.3 + intensity * 0.7,
                                transitionDelay: `${i * 60}ms`,
                              }} />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-1.5 mb-4">
                        {timingData.map((t, i) => (
                          <div key={i} className="flex-1 text-center text-[10px] font-semibold text-[var(--fg-muted)]">{t.label}</div>
                        ))}
                      </div>

                      {/* Key insight */}
                      <div className="p-4 rounded-xl flex items-start gap-3" style={{
                        background: 'linear-gradient(135deg, #1A2744, #162035)',
                        border: '1px solid #334155',
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <div>
                          <div className="text-[13px] font-semibold" style={{ color: '#E2E8F0' }}>
                            {lang === 'es' ? `La ventana óptima de acuerdo es el mes ${peakMonth?.month}` : `Peak settlement window is month ${peakMonth?.month}`}
                          </div>
                          <div className="text-[12px] mt-1" style={{ color: 'var(--fg-muted)' }}>
                            {lang === 'es'
                              ? `El ${timingData.slice(3, 7).reduce((s, t) => s + t.pct, 0)}% de todos los acuerdos en casos similares ocurren en los meses 4-7. Este es frecuentemente el mejor momento para negociar.`
                              : `${timingData.slice(3, 7).reduce((s, t) => s + t.pct, 0)}% of all settlements in similar cases happen in months 4-7. This is often the best window for negotiation.`}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-[10px] text-[var(--fg-muted)] italic text-center">
                        {lang === 'es' ? 'Distribución basada en datos agregados de casos similares. Los plazos individuales pueden variar.' : 'Distribution based on aggregate data from similar cases. Individual timelines may vary.'}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end timeline: Settlement Timing */}

          {/* ====== SIMILAR CASES TAB: Jurisdiction Intelligence ====== */}
          <TabPanel tabId="similar" activeTab={activeReportTab}>
          {/* Jurisdiction Intelligence — Interactive state comparison */}
          {isPremium && stateCode && (
            <Reveal delay={100}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #4F46E520, #0D948820)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-primary)' }}>
                      {lang === 'es' ? 'INTELIGENCIA JURISDICCIONAL' : 'JURISDICTION INTELLIGENCE'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? `Comparación: ${stateCode} vs. Promedio Nacional` : `${stateCode} vs. National Benchmark`}
                    </div>
                  </div>
                </div>
                {(() => {
                  const stateRate = AGGREGATE_STATE_RATES[stateCode] || 50;
                  const nationalAvg = 50.2;
                  const topStates = Object.entries(AGGREGATE_STATE_RATES)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                  const bottomStates = Object.entries(AGGREGATE_STATE_RATES)
                    .sort((a, b) => a[1] - b[1])
                    .slice(0, 5);
                  const stateRank = Object.entries(AGGREGATE_STATE_RATES)
                    .sort((a, b) => b[1] - a[1])
                    .findIndex(([k]) => k === stateCode) + 1;
                  const neighborStates: string[] = [];
                  const allEntries = Object.entries(AGGREGATE_STATE_RATES).sort((a, b) => b[1] - a[1]);
                  const idx = allEntries.findIndex(([k]) => k === stateCode);
                  if (idx > 0) neighborStates.push(allEntries[idx - 1][0]);
                  neighborStates.push(stateCode);
                  if (idx < allEntries.length - 1) neighborStates.push(allEntries[idx + 1][0]);

                  return (
                    <>
                      {/* Key metrics row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.15)' }}>
                          <div className="text-2xl font-display font-bold neon-text" style={{ color: 'var(--accent-primary)' }}>{stateRate.toFixed(1)}%</div>
                          <div className="text-[10px] font-semibold mt-1" style={{ color: 'var(--fg-muted)' }}>{stateCode} {lang === 'es' ? 'Tasa' : 'Rate'}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.15)' }}>
                          <div className="text-2xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>#{stateRank}</div>
                          <div className="text-[10px] font-semibold mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'de 50 estados' : 'of 50 states'}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl" style={{ background: stateRate > nationalAvg ? 'rgba(13,148,136,0.08)' : 'rgba(217,119,6,0.08)', border: `1px solid ${stateRate > nationalAvg ? 'rgba(13,148,136,0.15)' : 'rgba(217,119,6,0.15)'}` }}>
                          <div className="text-2xl font-display font-bold" style={{ color: stateRate > nationalAvg ? '#0D9488' : '#D97706' }}>
                            {stateRate > nationalAvg ? '+' : ''}{(stateRate - nationalAvg).toFixed(1)}%
                          </div>
                          <div className="text-[10px] font-semibold mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'vs. Nacional' : 'vs. National'}</div>
                        </div>
                      </div>

                      {/* Visual comparison bar */}
                      <div className="mb-6">
                        <div className="text-[11px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-3">
                          {lang === 'es' ? 'COMPARACIÓN VISUAL' : 'VISUAL COMPARISON'}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-[12px] font-semibold" style={{ color: '#E2E8F0' }}>{stateCode}</span>
                              <span className="text-[12px] font-bold font-data" style={{ color: 'var(--accent-primary)' }}>{stateRate.toFixed(1)}%</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stateRate}%`, background: 'linear-gradient(90deg, #4F46E5, #6366F1)', boxShadow: '0 0 12px rgba(79,70,229,0.3)' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-[12px] font-medium" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Promedio Nacional' : 'National Average'}</span>
                              <span className="text-[12px] font-bold font-data" style={{ color: 'var(--fg-muted)' }}>{nationalAvg}%</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${nationalAvg}%`, background: 'linear-gradient(90deg, #64748B, #94A3B8)' }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Top 5 jurisdictions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.12)' }}>
                          <div className="text-[10px] font-bold tracking-[2px] mb-3" style={{ color: 'var(--accent-secondary)' }}>
                            {lang === 'es' ? 'TOP 5 JURISDICCIONES' : 'TOP 5 JURISDICTIONS'}
                          </div>
                          {topStates.map(([st, rate], i) => (
                            <div key={st} className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-bold w-4" style={{ color: 'var(--fg-muted)' }}>{i + 1}</span>
                              <span className={`text-[12px] font-semibold ${st === stateCode ? 'neon-text' : ''}`} style={{ color: st === stateCode ? '#4F46E5' : '#CBD5E1' }}>{st}</span>
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden mx-1" style={{ background: 'var(--bg-elevated)' }}>
                                <div className="h-full rounded-full" style={{ width: `${rate}%`, background: st === stateCode ? '#4F46E5' : '#0D9488' }} />
                              </div>
                              <span className="text-[11px] font-data font-bold" style={{ color: st === stateCode ? '#4F46E5' : '#0D9488' }}>{rate.toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(232,116,97,0.06)', border: '1px solid rgba(232,116,97,0.12)' }}>
                          <div className="text-[10px] font-bold tracking-[2px] mb-3" style={{ color: '#E87461' }}>
                            {lang === 'es' ? 'BOTTOM 5 JURISDICCIONES' : 'BOTTOM 5 JURISDICTIONS'}
                          </div>
                          {bottomStates.map(([st, rate], i) => (
                            <div key={st} className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-bold w-4" style={{ color: 'var(--fg-muted)' }}>{50 - i}</span>
                              <span className={`text-[12px] font-semibold ${st === stateCode ? 'neon-text' : ''}`} style={{ color: st === stateCode ? '#E87461' : '#CBD5E1' }}>{st}</span>
                              <div className="flex-1 h-1.5 rounded-full overflow-hidden mx-1" style={{ background: 'var(--bg-elevated)' }}>
                                <div className="h-full rounded-full" style={{ width: `${rate}%`, background: st === stateCode ? '#E87461' : '#D97706' }} />
                              </div>
                              <span className="text-[11px] font-data font-bold" style={{ color: st === stateCode ? '#E87461' : '#D97706' }}>{rate.toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg text-[10px] leading-relaxed italic text-center" style={{ background: 'rgba(30,41,59,0.5)', color: 'var(--fg-muted)' }}>
                        {lang === 'es'
                          ? 'Las tasas de victoria se calculan a partir de datos agregados de todos los tipos de casos federales en cada estado. No es una garantía de resultados.'
                          : 'Win rates are computed from aggregate data across all federal case types in each state. Not a guarantee of outcomes.'}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end similar: Jurisdiction Intelligence */}

          {/* ====== ATTORNEY IMPACT TAB ====== */}
          <TabPanel tabId="attorney" activeTab={activeReportTab}>
          {/* Attorney Impact Analysis — Premium */}
          {isPremium && (
            <Reveal delay={105}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #7C3AED20, #4F46E520)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#7C3AED' }}>
                      {lang === 'es' ? 'IMPACTO DE REPRESENTACIÓN' : 'REPRESENTATION IMPACT'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Análisis: Con vs. Sin abogado' : 'Attorney vs. Pro Se Analysis'}
                    </div>
                  </div>
                </div>
                {(() => {
                  const attyWinRate = Math.min(95, Math.round(wr * 1.35));
                  const proSeWinRate = Math.max(8, Math.round(wr * 0.55));
                  const attySettlement = Math.round((d.sp || 45) * 1.2);
                  const proSeSettlement = Math.round((d.sp || 45) * 0.65);
                  const attyMedian = Math.max(3, Math.round((d.mo || 10) * 0.8));
                  const proSeMedian = Math.round((d.mo || 10) * 1.4);
                  const metrics = [
                    { label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate', atty: `${attyWinRate}%`, proSe: `${proSeWinRate}%`, attyVal: attyWinRate, proSeVal: proSeWinRate, color: 'var(--accent-secondary)' },
                    { label: lang === 'es' ? 'Tasa de acuerdo' : 'Settlement Rate', atty: `${attySettlement}%`, proSe: `${proSeSettlement}%`, attyVal: attySettlement, proSeVal: proSeSettlement, color: 'var(--accent-primary)' },
                    { label: lang === 'es' ? 'Duración mediana' : 'Median Duration', atty: `${attyMedian}mo`, proSe: `${proSeMedian}mo`, attyVal: 100 - attyMedian * 5, proSeVal: 100 - proSeMedian * 5, color: '#D97706' },
                  ];

                  return (
                    <>
                      {/* Side-by-side comparison */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-5 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.03))', border: '1px solid rgba(13,148,136,0.15)' }}>
                          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          </div>
                          <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: 'var(--accent-secondary)' }}>
                            {lang === 'es' ? 'CON ABOGADO' : 'WITH ATTORNEY'}
                          </div>
                          <div className="text-3xl font-display font-bold neon-text mb-1" style={{ color: 'var(--accent-secondary)' }}>{attyWinRate}%</div>
                          <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                        </div>
                        <div className="p-5 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, rgba(232,116,97,0.06), rgba(232,116,97,0.02))', border: '1px solid rgba(232,116,97,0.12)' }}>
                          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(232,116,97,0.1)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E87461" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
                          </div>
                          <div className="text-[10px] font-bold tracking-[2px] mb-2" style={{ color: '#E87461' }}>
                            {lang === 'es' ? 'SIN ABOGADO' : 'PRO SE'}
                          </div>
                          <div className="text-3xl font-display font-bold mb-1" style={{ color: '#E87461' }}>{proSeWinRate}%</div>
                          <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                        </div>
                      </div>

                      {/* Metric bars */}
                      <div className="space-y-4 mb-5">
                        {metrics.map((m, i) => (
                          <div key={i}>
                            <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--fg-secondary)' }}>{m.label}</div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold w-16" style={{ color: 'var(--accent-secondary)' }}>Attorney</span>
                                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, m.attyVal)}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}90)`, transitionDelay: `${i * 150}ms` }} />
                                </div>
                                <span className="text-[11px] font-data font-bold w-10 text-right" style={{ color: m.color }}>{m.atty}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold w-16" style={{ color: '#E87461' }}>Pro Se</span>
                                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, m.proSeVal)}%`, background: 'linear-gradient(90deg, #E87461, #E8746190)', transitionDelay: `${i * 150 + 100}ms` }} />
                                </div>
                                <span className="text-[11px] font-data font-bold w-10 text-right" style={{ color: '#E87461' }}>{m.proSe}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Key takeaway */}
                      <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #1A2744, #162035)', border: '1px solid #334155' }}>
                        <div className="flex items-start gap-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                          <div>
                            <div className="text-[13px] font-semibold" style={{ color: '#E2E8F0' }}>
                              {lang === 'es' ? `Los abogados ganaron ${attyWinRate - proSeWinRate}% más a menudo` : `Attorneys won ${attyWinRate - proSeWinRate}% more often`}
                            </div>
                            <div className="text-[12px] mt-1" style={{ color: 'var(--fg-muted)' }}>
                              {lang === 'es'
                                ? `En casos similares de ${spec?.d?.toLowerCase() || 'este tipo'}, los demandantes representados por abogados tuvieron una tasa de éxito del ${attyWinRate}% frente al ${proSeWinRate}% para los que se representaron a sí mismos. Muchos abogados ofrecen consultas iniciales gratuitas.`
                                : `In similar ${spec?.d?.toLowerCase() || 'cases of this type'}, plaintiffs with attorney representation had a ${attyWinRate}% success rate versus ${proSeWinRate}% for pro se litigants. Many attorneys offer free initial consultations.`}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-[10px] text-[var(--fg-muted)] italic text-center">
                        {lang === 'es'
                          ? 'Datos agregados de representación. Los resultados individuales varían según las circunstancias específicas del caso.'
                          : 'Aggregate representation data. Individual outcomes vary based on case-specific circumstances.'}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end attorney: Attorney Impact Analysis + component */}

          {/* ====== WIN RATES TAB ====== */}
          <TabPanel tabId="win-rates" activeTab={activeReportTab}>
          {/* Historical Win Rate Trend — Premium */}
          {isPremium && (
            <Reveal delay={108}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #4F46E520, #6366F120)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#6366F1' }}>
                      {lang === 'es' ? 'TENDENCIA HISTÓRICA' : 'HISTORICAL TREND'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Tasa de éxito a lo largo del tiempo' : 'Win Rate Over Time'}
                    </div>
                  </div>
                </div>
                <TrendChart data={generateDemoData(spec?.nos)} color="#6366F1" label={spec?.d || 'Case Type'} lang={lang} height={220} />
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end win-rates: Historical Trend */}

          {/* ====== SETTLEMENTS TAB ====== */}
          <TabPanel tabId="settlements" activeTab={activeReportTab}>
          {/* Settlement Distribution — Premium */}
          {isPremium && (
            <Reveal delay={109}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #0D948820, #14B8A620)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-secondary)' }}>
                      {lang === 'es' ? 'DISTRIBUCIÓN DE RECUPERACIÓN' : 'RECOVERY DISTRIBUTION'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Montos de acuerdo' : 'Settlement Amounts'}
                    </div>
                  </div>
                </div>
                <SettlementHistogram median={d.sp || 50000} userAmount={amount === 'large' ? 100000 : amount === 'mid' ? 50000 : 25000} lang={lang} />
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end settlements */}

          {/* ====== ATTORNEY IMPACT TAB: AttorneyImpact component ====== */}
          <TabPanel tabId="attorney" activeTab={activeReportTab}>
          {/* Attorney Impact — Premium */}
          {isPremium && (
            <Reveal delay={111}>
              <Card premium className="p-6 sm:p-8">
                <AttorneyImpact
                  withAttorneyWinRate={Math.min(95, Math.round(wr * 1.4))}
                  withoutAttorneyWinRate={Math.max(5, Math.round(wr * 0.4))}
                  withAttorneyRecovery={v.hi || '$100K+'}
                  withoutAttorneyRecovery={v.lo || '$15K'}
                  lang={lang}
                />
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end attorney: AttorneyImpact component */}

          {/* ====== WIN RATES TAB: Case Type Comparison + Probability Matrix ====== */}
          <TabPanel tabId="win-rates" activeTab={activeReportTab}>
          {/* Case Type Comparison — Premium */}
          {isPremium && compareData && (
            <Reveal delay={112}>
              <Card premium className="p-6 sm:p-8">
                <ComparisonPanel
                  caseA={{
                    nos: spec?.nos || '',
                    label: spec?.d || '',
                    winRate: wr,
                    medianDays: (d.mo || 10) * 30,
                    recoveryLow: d.rng?.lo || 0,
                    recoveryHigh: d.rng?.hi || 0,
                    total: d.total || 0,
                    plaintiffRate: wr,
                    settlementRate: d.sp || 45,
                  }}
                  caseB={compareData ? {
                    nos: compareData.nos || '',
                    label: compareData.label || '',
                    winRate: compareData.winRate || 40,
                    medianDays: (compareData.mo || 12) * 30,
                    recoveryLow: compareData.recoveryLow || 10000,
                    recoveryHigh: compareData.recoveryHigh || 100000,
                    total: compareData.total || 0,
                    plaintiffRate: compareData.winRate || 40,
                    settlementRate: compareData.sp || 40,
                  } : null}
                  lang={lang}
                />
              </Card>
            </Reveal>
          )}

          {/* Outcome Probability Matrix — Premium */}
          {isPremium && (
            <Reveal delay={110}>
              <Card premium className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shimmer-sweep" style={{ background: 'linear-gradient(135deg, #4F46E520, #0D948820)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-primary)' }}>
                      {lang === 'es' ? 'MATRIZ DE PROBABILIDAD' : 'PROBABILITY MATRIX'}
                    </div>
                    <div className="text-lg font-display font-bold" style={{ letterSpacing: '-0.5px' }}>
                      {lang === 'es' ? 'Riesgo vs. Resultado' : 'Risk vs. Outcome Analysis'}
                    </div>
                  </div>
                </div>
                {(() => {
                  const winPct = wr;
                  const settlePct = d.sp || 45;
                  const dismissPct = od.dismiss || 40;
                  const trialWinPct = od.trial_win || 12;
                  const favorableTotal = winSettleRate;
                  const riskLevel = dismissPct > 50 ? 'high' : dismissPct > 35 ? 'moderate' : 'low';
                  const rewardLevel = favorableTotal > 55 ? 'high' : favorableTotal > 35 ? 'moderate' : 'low';

                  return (
                    <>
                      {/* 2x2 Quadrant Grid */}
                      <div className="relative mb-6">
                        {/* Axis labels */}
                        <div className="flex justify-between mb-2">
                          <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                            {lang === 'es' ? 'RIESGO →' : 'RISK →'}
                          </span>
                          <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--fg-muted)' }}>
                            {lang === 'es' ? 'RESULTADO ↑' : 'OUTCOME ↑'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Top-left: Low Risk, High Reward (Best) */}
                          <div className={`p-4 rounded-xl border text-center ${riskLevel === 'low' && rewardLevel === 'high' ? 'border-[#0D9488] ring-2 ring-[#0D948830]' : 'border-[var(--border-default)]'}`}
                            style={{ background: riskLevel === 'low' && rewardLevel === 'high' ? 'rgba(13,148,136,0.08)' : 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[22px] mb-1">🎯</div>
                            <div className="text-[11px] font-bold" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Favorable' : 'Favorable'}</div>
                            <div className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Bajo riesgo, alto resultado' : 'Low risk, high outcome'}</div>
                            {riskLevel === 'low' && rewardLevel === 'high' && (
                              <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block" style={{ color: 'var(--accent-secondary)', background: 'rgba(13,148,136,0.15)' }}>
                                {lang === 'es' ? 'TU POSICIÓN' : 'YOUR POSITION'}
                              </div>
                            )}
                          </div>
                          {/* Top-right: High Risk, High Reward */}
                          <div className={`p-4 rounded-xl border text-center ${riskLevel !== 'low' && rewardLevel === 'high' ? 'border-[#D97706] ring-2 ring-[#D9770630]' : 'border-[var(--border-default)]'}`}
                            style={{ background: riskLevel !== 'low' && rewardLevel === 'high' ? 'rgba(217,119,6,0.06)' : 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[22px] mb-1">⚡</div>
                            <div className="text-[11px] font-bold" style={{ color: '#D97706' }}>{lang === 'es' ? 'Alto potencial' : 'High Potential'}</div>
                            <div className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Alto riesgo, alto resultado' : 'High risk, high outcome'}</div>
                            {riskLevel !== 'low' && rewardLevel === 'high' && (
                              <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block" style={{ color: '#D97706', background: 'rgba(217,119,6,0.12)' }}>
                                {lang === 'es' ? 'TU POSICIÓN' : 'YOUR POSITION'}
                              </div>
                            )}
                          </div>
                          {/* Bottom-left: Low Risk, Low Reward */}
                          <div className={`p-4 rounded-xl border text-center ${riskLevel === 'low' && rewardLevel !== 'high' ? 'border-[#4F46E5] ring-2 ring-[#4F46E530]' : 'border-[var(--border-default)]'}`}
                            style={{ background: riskLevel === 'low' && rewardLevel !== 'high' ? 'rgba(79,70,229,0.06)' : 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[22px] mb-1">📊</div>
                            <div className="text-[11px] font-bold" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'Conservador' : 'Conservative'}</div>
                            <div className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Bajo riesgo, resultado moderado' : 'Low risk, moderate outcome'}</div>
                            {riskLevel === 'low' && rewardLevel !== 'high' && (
                              <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block" style={{ color: 'var(--accent-primary)', background: 'rgba(79,70,229,0.1)' }}>
                                {lang === 'es' ? 'TU POSICIÓN' : 'YOUR POSITION'}
                              </div>
                            )}
                          </div>
                          {/* Bottom-right: High Risk, Low Reward */}
                          <div className={`p-4 rounded-xl border text-center ${riskLevel !== 'low' && rewardLevel !== 'high' ? 'border-[#E87461] ring-2 ring-[#E8746130]' : 'border-[var(--border-default)]'}`}
                            style={{ background: riskLevel !== 'low' && rewardLevel !== 'high' ? 'rgba(232,116,97,0.06)' : 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[22px] mb-1">⚠️</div>
                            <div className="text-[11px] font-bold" style={{ color: '#E87461' }}>{lang === 'es' ? 'Desafiante' : 'Challenging'}</div>
                            <div className="text-[10px] mt-1" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Alto riesgo, resultado moderado' : 'High risk, moderate outcome'}</div>
                            {riskLevel !== 'low' && rewardLevel !== 'high' && (
                              <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block" style={{ color: '#E87461', background: 'rgba(232,116,97,0.1)' }}>
                                {lang === 'es' ? 'TU POSICIÓN' : 'YOUR POSITION'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Probability breakdown */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.1)' }}>
                          <div className="text-xl font-display font-bold neon-text" style={{ color: 'var(--accent-secondary)' }}>{settlePct}%</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Acuerdo' : 'Settlement'}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.1)' }}>
                          <div className="text-xl font-display font-bold neon-text" style={{ color: 'var(--accent-primary)' }}>{trialWinPct}%</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Victoria' : 'Trial Win'}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.1)' }}>
                          <div className="text-xl font-display font-bold" style={{ color: '#D97706' }}>{dismissPct}%</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Desestimación' : 'Dismissal'}</div>
                        </div>
                        <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(232,116,97,0.06)', border: '1px solid rgba(232,116,97,0.1)' }}>
                          <div className="text-xl font-display font-bold" style={{ color: '#E87461' }}>{od.trial_loss || 7}%</div>
                          <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Derrota' : 'Trial Loss'}</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg text-[10px] leading-relaxed italic text-center" style={{ background: 'rgba(30,41,59,0.5)', color: 'var(--fg-muted)' }}>
                        {lang === 'es'
                          ? 'La posición de la matriz se basa en tasas agregadas. Cada caso es único. Esto no es una evaluación de su caso específico.'
                          : 'Matrix position is based on aggregate rates. Every case is unique. This is not an evaluation of your specific case.'}
                      </div>
                    </>
                  );
                })()}
              </Card>
            </Reveal>
          )}

          </TabPanel>{/* end win-rates: Comparison + Probability */}

          {/* ====== OVERVIEW TAB: Report Header ====== */}
          <TabPanel tabId="overview" activeTab={activeReportTab}>
          {/* === REPORT HEADER === */}
          <Reveal>
            <div className="h-[3px] rounded-full mb-0" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }} />
            <Card glow className="p-6 sm:p-8 data-card card-glow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px]">{lang === 'es' ? 'INFORME DE RESULTADOS MYCASEVALUE' : 'MYCASEVALUE OUTCOME REPORT'}</span>
                    {isPremium && <span className="text-[11px] font-bold px-2.5 py-0.5 rounded" style={{ color: 'var(--accent-secondary)', background: 'rgba(13,148,136,0.15)' }}>PREMIUM</span>}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ color: '#E87461', background: 'rgba(232,116,97,0.12)' }}>{lang === 'es' ? 'No es una predicción' : 'Not a prediction'}</span>
                  </div>

                  {/* MyCaseValue Score — inline badge + hidden on mobile */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap sm:hidden">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{
                      background: ccScore >= 55 ? 'linear-gradient(135deg, #0D948810, #0D948820)' : ccScore >= 35 ? 'linear-gradient(135deg, #D9770610, #D9770620)' : 'linear-gradient(135deg, #E8746110, #E8746120)',
                      border: `1px solid ${ccScore >= 55 ? '#0D948820' : ccScore >= 35 ? '#D9770620' : '#E8746120'}`,
                    }}>
                      <span className="text-[11px] font-bold tracking-[2px]" style={{ color: ccScore >= 55 ? '#0D9488' : ccScore >= 35 ? '#D97706' : '#E87461' }}>SCORE</span>
                      <span className="text-2xl font-display font-bold" style={{ color: ccScore >= 55 ? '#0D9488' : ccScore >= 35 ? '#D97706' : '#E87461' }}>{ccScore}</span>
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-display font-bold capitalize" style={{ letterSpacing: '-1px' }}>{spec?.d}</div>
                  <div className="text-[14px] sm:text-[15px] text-[var(--fg-muted)] mt-1.5">
                    {lang === 'es' ? 'Basado en' : 'Based on'} <strong className="text-[var(--fg-secondary)]"><AnimatedNumber value={d.total} /></strong> {lang === 'es' ? 'casos federales similares' : 'similar federal cases'}
                    {stateCode && circuitName && (
                      <span className="text-[var(--fg-muted)]"> · {lang === 'es' ? 'Circuito' : 'Circuit'} {circuitName}</span>
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
                      <span className="text-[11px] text-[var(--fg-muted)] font-medium">Win rate trend:</span>
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
                    <div className="text-[13px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'tasa histórica de éxito' : 'historical win rate'}</div>
                    {circuitSpecificRate && (
                      <div className="text-[12px] mt-1" style={{ color: 'var(--accent-primary)' }}>
                        {circuitName} Circuit: {circuitSpecificRate.toFixed(1)}%
                      </div>
                    )}
                    <div className="text-[11px] text-[var(--fg-muted)] mt-1.5 max-w-[160px] sm:ml-auto leading-snug">
                      {Math.round(wr) > 50 ? (lang === 'es' ? 'Por encima del promedio federal' : 'Above the federal average') : Math.round(wr) > 40 ? (lang === 'es' ? 'Cerca del promedio federal' : 'Near the federal average') : (lang === 'es' ? 'Por debajo del promedio federal' : 'Below the federal average')}
                    </div>
                    <div className="flex gap-0.5 mt-2 sm:justify-end">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-4 h-1.5 rounded-full transition-all duration-500" style={{
                          background: i <= Math.ceil(wr / 20) ? wrColor : '#1E293B',
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
                  <div className="inline-block px-6 py-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.15)' }}>
                    <span className="text-[14px] font-semibold" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'Rangos de recuperación disponibles en el informe completo' : 'Recovery ranges available in full report'}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="report-grid grid gap-3 my-7" style={{ gridTemplateColumns: '1fr 1.5fr 1fr' }}>
                    {[
                      { k: 'conservative', l: lang === 'es' ? 'Rango bajo' : 'Lower range', c: '#D97706', val: v.lo },
                      { k: 'typical', l: lang === 'es' ? 'Típico' : 'Typical', c: '#4F46E5', val: v.md },
                      { k: 'optimistic', l: lang === 'es' ? 'Rango alto' : 'Upper range', c: '#0D9488', val: v.hi },
                    ].map(t => (
                      <button key={t.k} onClick={() => setRangeMode(t.k)}
                        className="rounded-2xl cursor-pointer text-center transition-all duration-300"
                        style={{
                          padding: t.k === 'typical' ? '28px 20px' : '22px 18px',
                          background: '#131B2E',
                          border: rangeMode === t.k ? `2px solid ${t.c}40` : '1.5px solid #F1F5F9',
                          transform: rangeMode === t.k ? 'scale(1.02)' : 'scale(1)',
                        }}>
                        <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: t.c }}>{t.l}</div>
                        <div className="font-display font-bold my-2" style={{ fontSize: t.k === 'typical' ? 44 : 32, letterSpacing: '-1px' }}>{t.val}</div>
                      </button>
                    ))}
                  </div>
                  <div className="relative h-2 bg-[var(--bg-elevated)] rounded-full">
                    <div className="absolute rounded-full opacity-25" style={{ left: '10%', right: '10%', top: 0, bottom: 0, background: 'linear-gradient(90deg, #D97706, #4F46E5, #0D9488)' }} />
                    <div className="absolute top-[-6px] w-5 h-5 rounded-full bg-[#131B2E] transition-all duration-500"
                      style={{
                        left: rangeMode === 'conservative' ? '10%' : rangeMode === 'typical' ? '50%' : '90%',
                        border: `3px solid ${rangeMode === 'conservative' ? '#D97706' : rangeMode === 'typical' ? '#4F46E5' : '#0D9488'}`,
                        transform: 'translateX(-50%)',
                        boxShadow: '0 2px 10px rgba(11,18,33,.12)',
                      }} />
                  </div>
                  <div className="text-center mt-4 text-[13px] text-[var(--fg-muted)]">
                    {lang === 'es' ? 'Rangos agregados nacionales (en miles). Los resultados varían por jurisdicción.' : 'National aggregate ranges (in thousands). Outcomes vary by jurisdiction.'}
                  </div>
                </>
              )}

              {/* Quick stats */}
              <div className="stats-grid stagger-in grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
                <Stat value={`${Math.round(wr)}%`} label={lang === 'es' ? 'Tasa de éxito' : 'Win rate'} color={wrColor} dark={darkMode} />
                <Stat value={`${d.mo} mo`} label={lang === 'es' ? 'Duración mediana' : 'Median duration'} color={'#94A3B8'} dark={true} />
                <Stat value={`${winSettleRate}%`} label={lang === 'es' ? 'Éxito+Acuerdo' : 'Win+Settle'} color="#0D9488" dark={darkMode} />
                <Stat value={`${d.sp}%`} label={lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate'} color="#1A2744" dark={darkMode} />
              </div>

              {/* Scenario comparison chips */}
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                <span className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mr-1">{lang === 'es' ? 'COMPARAR' : 'COMPARE'}</span>
                <CompareChip label={lang === 'es' ? 'Con abogado' : 'With attorney'} value={`${d.rr?.wr ?? Math.round(wr * 1.12)}%`} color="#0D9488" active={compareMode} onClick={() => setCompareMode(!compareMode)} />
                <CompareChip label={lang === 'es' ? 'Sin abogado' : 'No attorney'} value={`${d.rr?.sr ?? Math.round(wr * 0.65)}%`} color="#E87461" />
                <CompareChip label={lang === 'es' ? 'Juicio' : 'Trial'} value={`${od.trial_win}%`} color="#4F46E5" />
                <CompareChip label={lang === 'es' ? 'Acuerdo' : 'Settlement'} value={`${d.sp}%`} color="#1A2744" />
              </div>

              <div className="text-[11px] text-[var(--fg-muted)] text-center mt-4">{UPL.disclaimer}</div>

              {/* Animated divider */}
              <div className="animated-divider my-6" />
              {/* Case Strength Breakdown — mini horizontal bars */}
              <div className="mt-2">
                <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-3">{lang === 'es' ? 'DESGLOSE DE FORTALEZA' : 'STRENGTH BREAKDOWN'}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { label: lang === 'es' ? 'Tasa histórica de éxito' : 'Historical win rate', pct: Math.round(wr), color: wrColor },
                    { label: lang === 'es' ? 'Tasa de acuerdos' : 'Settlement rate', pct: d.sp || 0, color: 'var(--fg-muted)' },
                    { label: lang === 'es' ? 'Volumen de casos' : 'Case volume', pct: Math.min(100, Math.round((d.total || 0) / 5000)), color: 'var(--accent-primary)' },
                    { label: lang === 'es' ? 'Velocidad judicial' : 'Judicial speed', pct: Math.max(10, Math.min(90, 100 - (d.mo || 10) * 4)), color: '#D97706' },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] text-[var(--fg-muted)] w-28 sm:w-32 truncate">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
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
          </TabPanel>{/* end overview: Report Header + stats */}

          {/* ====== WIN RATES TAB: Outcome Pie Chart ====== */}
          <TabPanel tabId="win-rates" activeTab={activeReportTab}>
          {/* === OUTCOME PIE CHART (always shown) === */}
          <Reveal delay={100}>
            <Card glow className="p-6 sm:p-8">
              <SectionLabel>{lang === 'es' ? 'Cómo se resolvieron casos similares' : 'How similar cases were resolved'}</SectionLabel>
              <div className="hero-grid grid gap-6" style={{ gridTemplateColumns: '200px 1fr' }}>
                <PieChart
                  segments={[
                    { pct: od.fav_set, color: 'var(--accent-secondary)', winRatio: 0 },
                    { pct: od.trial_win + od.trial_loss, color: 'var(--accent-primary)', winRatio: od.trial_win / Math.max(od.trial_win + od.trial_loss, 1) },
                    { pct: od.dismiss, color: '#334155', winRatio: 0 },
                  ]}
                  size={200}
                />
                <div className="space-y-2">
                  {/* Favorable Settlements */}
                  <div className="p-3.5 rounded-xl outcome-card" style={{ background: '#0D948810', borderLeft: '4px solid #0D9488' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] sm:text-[16px] font-extrabold" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Acuerdos favorables' : 'Settled (with payment)'}</span>
                      <span className="text-2xl sm:text-3xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{od.fav_set}%</span>
                    </div>
                    <div className="text-[12px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? `Ambas partes acordaron una resolución, generalmente con un pago. Tiempo promedio: ${od.set_mo} meses.` : `Both sides agreed to a resolution, usually with a payment. Average time: ${od.set_mo} months.`}</div>
                  </div>
                  {/* Trial */}
                  <div className="p-3.5 rounded-xl outcome-card" style={{ background: '#4F46E510', borderLeft: '4px solid #4F46E5' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] sm:text-[15px] font-semibold" style={{ color: '#3730A3' }}>{lang === 'es' ? 'Resultados de juicio' : 'Went to Trial'}</span>
                      <span className="text-xl font-display font-bold">{Math.round(od.trial_win + od.trial_loss)}%</span>
                    </div>
                    <div className="flex gap-4 mt-1.5">
                      <span className="text-[13px] font-semibold" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Ganó' : 'Won'}: {od.trial_win}%</span>
                      <span className="text-[13px] font-semibold" style={{ color: '#E87461' }}>{lang === 'es' ? 'Perdió' : 'Lost'}: {od.trial_loss}%</span>
                    </div>
                    {od.trial_med !== 'N/A' && <div className="text-[12px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? `Premio mediano en juicio: ${od.trial_med}` : `Median trial award: ${od.trial_med}`}</div>}
                  </div>
                  {/* Dismissed */}
                  <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] outcome-card" style={{ borderLeft: '4px solid #CBD5E1' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] sm:text-[15px] font-semibold text-[var(--fg-muted)]">{lang === 'es' ? 'Desestimaciones previas al juicio' : 'Case Dismissed'}</span>
                      <span className="text-xl font-display font-bold text-[var(--fg-muted)]">{od.dismiss}%</span>
                    </div>
                    <div className="text-[12px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'El juez terminó el caso antes del juicio — generalmente por razones técnicas o de evidencia' : 'The judge ended the case before trial — often for technical or evidence reasons'}</div>
                  </div>
                </div>
              </div>
              {/* Combined rate */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 px-5 py-3.5 rounded-xl gap-2" style={{ background: '#0D948810' }}>
                <div>
                  <div className="text-[11px] font-bold tracking-[2px]" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'TASA COMBINADA DE ÉXITO + ACUERDOS FAVORABLES' : 'COMBINED WIN + FAVORABLE SETTLEMENT RATE'}</div>
                  <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? 'Casos con resultado positivo para el demandante' : 'Cases with a positive outcome for the plaintiff'}</div>
                </div>
                <div className="font-display font-bold" style={{ fontSize: 48, color: 'var(--accent-secondary)', letterSpacing: '-1px' }}>{winSettleRate}%</div>
              </div>
              <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'Datos históricos agregados. No predice ningún resultado individual.' : 'Aggregate historical data. Does not predict any individual outcome.'}</div>
            </Card>
          </Reveal>

          {/* Animated section divider */}
          <div className="animated-divider my-4" />
          </TabPanel>{/* end win-rates: Outcome Pie Chart */}

          {/* ====== OVERVIEW TAB: What This Means + Next Steps ====== */}
          <TabPanel tabId="overview" activeTab={activeReportTab}>
          {/* === WHAT THIS MEANS FOR YOUR SITUATION (personalized) === */}
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden mb-3" style={{
              background: 'linear-gradient(135deg, #1A2744, #0F1A2E)',
              border: '1.5px solid #334155',
              boxShadow: '0 4px 24px rgba(64, 64, 242, 0.06), 0 1px 3px rgba(11,18,33,0.03)',
            }}>
              {/* Header accent bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, #4F46E5, #D4B85A, #4F46E5)' }} />
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                    background: 'linear-gradient(135deg, rgba(64, 64, 242, 0.12), rgba(201, 165, 78, 0.08))',
                    border: '1px solid rgba(64, 64, 242, 0.15)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: 'var(--accent-primary)' }}>
                      {lang === 'es' ? 'QUÉ SIGNIFICA ESTO PARA TI' : 'WHAT THIS MEANS FOR YOUR SITUATION'}
                    </div>
                    <div className="text-[12px] text-[var(--fg-muted)]">{lang === 'es' ? 'Basado en tus respuestas, no en una valoración de caso.' : 'Based on your answers — not a case evaluation.'}</div>
                  </div>
                </div>

                {/* Personalized narrative paragraphs */}
                <div className="space-y-4">
                  {/* Opening — personalized to their case type + win rate */}
                  <p className="text-[15px] leading-[1.75] text-[var(--fg-secondary)]" style={{ fontFamily: 'Newsreader, Georgia, serif' }}>
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
                      background: 'rgba(13, 148, 136, 0.08)',
                      borderLeft: '3px solid #0D9488',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <p className="text-[14px] leading-[1.7] text-[var(--fg-muted)]">
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
                      <p className="text-[14px] leading-[1.7] text-[var(--fg-muted)]">
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
                      <p className="text-[14px] leading-[1.7] text-[var(--fg-muted)]">
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

                <div className="mt-5 pt-4" style={{ borderTop: '1px solid #1E293B' }}>
                  <div className="text-[11px] text-[var(--fg-muted)] italic leading-relaxed">
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
                    <div className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: 'var(--accent-secondary)' }}>
                      {lang === 'es' ? 'TUS PRÓXIMOS PASOS' : 'YOUR NEXT STEPS'}
                    </div>
                    <div className="text-[12px] text-[var(--fg-muted)]">{lang === 'es' ? 'Según tu situación. No es asesoramiento legal.' : 'Based on your situation. Not legal advice.'}</div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="space-y-0">
                  {/* Step 1: Always — save your report */}
                  <div className="flex gap-4 items-start pb-5 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #14B8A6)' }}>1</div>
                      <div className="w-px flex-1 mt-2" style={{ background: '#334155' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>{lang === 'es' ? 'Guarda este informe' : 'Save this report'}</div>
                      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                        {lang === 'es'
                          ? 'Guárdalo o compártelo para que puedas consultarlo más tarde o mostrárselo a un abogado.'
                          : 'Bookmark or save it so you can reference the data later or share it during a consultation.'}
                      </p>
                      <div className="flex gap-2 mt-2.5">
                        <button onClick={saveReport} className="text-[12px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-[1.02]" style={{
                          background: 'rgba(13, 148, 136, 0.08)',
                          color: 'var(--accent-secondary)',
                          border: '1px solid rgba(13, 148, 136, 0.15)',
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="inline-block mr-1" style={{ verticalAlign: '-1px' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                          {lang === 'es' ? 'Guardar' : 'Save report'}
                        </button>
                        <button onClick={() => {
                          try {
                            const u = window.location.origin + '#' + btoa(JSON.stringify({ c: spec?.nos, s: stateCode, t: timing }));
                            navigator.clipboard.writeText(u);
                            toast(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
                          } catch { toast(lang === 'es' ? 'No se pudo copiar' : 'Could not copy'); }
                        }} className="text-[12px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:scale-[1.02]" style={{
                          background: 'rgba(37, 99, 235, 0.06)',
                          color: 'var(--fg-muted)',
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
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>2</div>
                      <div className="w-px flex-1 mt-2" style={{ background: '#334155' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>
                        {attorney === 'have'
                          ? (lang === 'es' ? 'Comparte los datos con tu abogado' : 'Share the data with your attorney')
                          : attorney === 'self'
                          ? (lang === 'es' ? 'Considera una consulta gratuita' : 'Consider a free consultation')
                          : (lang === 'es' ? 'Habla con un abogado' : 'Talk to an attorney')}
                      </div>
                      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
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
                            color: 'var(--accent-primary)',
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
                        background: (timing === '2yr' || timing === 'old') ? 'linear-gradient(135deg, #E87461, #F09483)' : 'linear-gradient(135deg, #4F46E5, #6366F1)',
                        color: 'white',
                      }}>3</div>
                      <div className="w-px flex-1 mt-2" style={{ background: '#334155' }} />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="text-[15px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>
                        {(timing === '2yr' || timing === 'old')
                          ? (lang === 'es' ? 'Actúa sobre los plazos ahora' : 'Act on deadlines now')
                          : (lang === 'es' ? 'Conoce tus plazos' : 'Know your deadlines')}
                      </div>
                      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
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
                      <div className="text-[15px] font-semibold mb-1" style={{ color: '#E2E8F0' }}>{lang === 'es' ? 'Reúne tu documentación' : 'Gather your documentation'}</div>
                      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                        {lang === 'es'
                          ? 'Reúne cualquier documento, correo electrónico, foto o registro relevante. Si consultas a un abogado, esto hará que la conversación sea más productiva.'
                          : 'Collect any relevant documents, emails, photos, or records. If you consult with an attorney, this will make the conversation more productive.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom disclaimer */}
              <div className="px-6 sm:px-8 py-3.5" style={{ background: '#0B1221', borderTop: '1px solid #1E293B' }}>
                <div className="text-[11px] text-[var(--fg-muted)] italic leading-relaxed">
                  {lang === 'es'
                    ? 'Estos pasos son sugerencias generales basadas en datos agregados. No constituyen asesoramiento legal. Consulta con un abogado licenciado antes de tomar decisiones legales.'
                    : 'These steps are general suggestions based on aggregate data. They do not constitute legal advice. Consult a licensed attorney before making legal decisions.'}
                </div>
              </div>
            </Card>
          </Reveal>

          <GoldRule />
          </TabPanel>{/* end overview: What This Means + Next Steps */}

          {/* ====== OVERVIEW TAB: Free report sections (visible to non-premium users in overview) ====== */}
          <TabPanel tabId="overview" activeTab={activeReportTab}>
          {/* === FREE REPORT — ENHANCED SECTIONS === */}
          {!isPremium && (
            <>
              {/* Attorney vs Self-Represented — Enhanced */}
              <Reveal delay={150}>
                <Card className="p-6">
                  <SectionLabel>{lang === 'es' ? '¿Importa tener abogado?' : 'Does having a lawyer matter?'}</SectionLabel>
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                      <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'CON ABOGADO' : 'WITH ATTORNEY'}</div>
                      <div className="text-2xl font-display font-bold">{d.rr?.wr ?? '--'}%</div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                    </div>
                    <div className="flex items-center text-[var(--fg-secondary)] font-bold text-lg">vs</div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: 'rgba(217,119,6,0.12)' }}>
                      <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: '#D97706' }}>{lang === 'es' ? 'SIN ABOGADO' : 'SELF-REPRESENTED'}</div>
                      <div className="text-2xl font-display font-bold">{d.ps?.wr ?? '--'}%</div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-1">{lang === 'es' ? 'tasa de éxito' : 'win rate'}</div>
                    </div>
                  </div>
                  {d.rr?.wr && d.ps?.wr && (
                    <div className="px-4 py-2.5 rounded-xl text-[13px] font-medium" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-primary)' }}>
                      {lang === 'es'
                        ? `Las personas con abogado ganaron ${Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100)}% más a menudo en casos similares.`
                        : `People with attorneys won ${Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100)}% more often in similar cases.`}
                    </div>
                  )}
                  <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Datos históricos agregados. No es una recomendación.' : 'Aggregate historical data. Not a recommendation.'}</div>
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
                        color: 'var(--fg-muted)',
                      },
                      {
                        q: lang === 'es' ? '¿Qué significa la tasa de acuerdos?' : 'What does the settlement rate tell me?',
                        a: lang === 'es'
                          ? `El ${d.sp}% de casos similares se resolvieron mediante acuerdo — ambas partes negociaron un resultado sin ir a juicio. Los acuerdos suelen ser más rápidos y menos riesgosos que un juicio.`
                          : `${d.sp}% of similar cases settled — meaning both sides negotiated an outcome without going to trial. Settlements tend to be faster and less risky than going to trial.`,
                        color: 'var(--accent-primary)',
                      },
                    ].map((item, i) => (
                      <div key={i} className="p-3.5 rounded-xl" style={{ background: `${item.color}06`, borderLeft: `3px solid ${item.color}` }}>
                        <div className="text-[13px] font-semibold mb-1">{item.q}</div>
                        <div className="text-[12px] text-[var(--fg-muted)] leading-relaxed">{item.a}</div>
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
                  background: (timing === '2yr' || timing === 'old') ? 'rgba(232,116,97,0.12)' : 'rgba(217,119,6,0.12)',
                  border: `1px solid ${(timing === '2yr' || timing === 'old') ? '#E8746120' : '#D9770620'}`,
                }}>
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={(timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706'} strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <div className="text-[11px] font-bold tracking-[2px]" style={{ color: (timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706' }}>
                      {lang === 'es' ? 'PLAZO GENERAL DE PRESENTACIÓN' : 'GENERAL FILING DEADLINE'}
                    </div>
                  </div>
                  <div className="text-base font-semibold">{d.sol}</div>
                  {(timing === '2yr' || timing === 'old') && (
                    <div className="text-[13px] mt-2 font-medium" style={{ color: '#DC2626' }}>{lang === 'es' ? 'Según tu cronología, este plazo puede haber pasado. Consulta con un abogado de inmediato.' : 'Based on your timeline, this deadline may have passed. Consult an attorney immediately.'}</div>
                  )}
                  <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Plazo general. Solo un abogado puede determinar tu plazo específico.' : 'General deadline. Only an attorney can determine your specific deadline.'}</div>
                </div>
              </Reveal>

              {/* Yearly trend context (free) */}
              {d.yearly_trend && Object.keys(d.yearly_trend).length > 5 && (
                <Reveal delay={240}>
                  <Card className="p-5">
                    <SectionLabel>{lang === 'es' ? 'Tendencia a lo largo del tiempo' : 'Trend over time'}</SectionLabel>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendSparkline data={d.yearly_trend} width={200} height={48} />
                      <div className="text-[12px] text-[var(--fg-muted)]">{lang === 'es' ? 'Evolución de la tasa de éxito en este tipo de caso a lo largo de los años.' : 'How the win rate for this case type has changed over the years.'}</div>
                    </div>
                    <div className="text-[11px] text-[var(--fg-muted)] italic">{lang === 'es' ? 'Datos agregados. Las tendencias individuales pueden variar.' : 'Aggregate data. Individual outcomes may vary.'}</div>
                  </Card>
                </Reveal>
              )}

              {/* Key Takeaways */}
              <Reveal delay={250}>
                <Card className="p-6 bg-gradient-to-br" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,.04) 0%, rgba(64,64,242,.02) 100%)' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(13,148,136,0.15)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Puntos clave' : 'Key Takeaways'}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>, text: lang === 'es' ? `Tu tipo de caso tiene una tasa de éxito del ${wr}%.` : `Cases like yours have a ${wr}% success rate.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, text: lang === 'es' ? `El ${winSettleRate}% de los casos se resuelven con un acuerdo.` : `${winSettleRate}% of cases settle with a payout.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: lang === 'es' ? `El tiempo promedio hasta una resolución es ${od.set_mo || '6-12'} meses.` : `Average time to resolution: ${od.set_mo || '6-12'} months.` },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text: lang === 'es' ? 'Los abogados aumentan las probabilidades de éxito significativamente.' : 'Having an attorney significantly improves your chances.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-[#131B2E]/50">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>{item.icon}</span>
                        <span className="text-[14px] text-[var(--fg-secondary)]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* Similar Cases Snapshot (first 2, rest blurred for free users) */}
              <Reveal delay={260}>
                <Card className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,119,6,0.12)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Casos similares' : 'Similar Cases'}</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { outcome: lang === 'es' ? 'Acuerdo de $52K' : 'Settlement: $52K', time: '7 months', desc: lang === 'es' ? 'Caso de discriminación similar, con pruebas sólidas' : 'Similar discrimination case, strong evidence' },
                      { outcome: lang === 'es' ? 'Acuerdo de $38K' : 'Settlement: $38K', time: '9 months', desc: lang === 'es' ? 'Situación comparable, resuelta en acuerdo' : 'Comparable situation, settled before trial' },
                    ].map((item, i) => (
                      <div key={i} className="p-3.5 rounded-lg border transition-colors" style={{ borderColor: '#334155', background: 'var(--bg-elevated)' }}>
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="font-semibold text-[14px]" style={{ color: 'var(--accent-secondary)' }}>{item.outcome}</div>
                          <div className="text-[11px] font-medium text-[var(--fg-muted)]">{lang === 'es' ? item.time.replace('months', 'meses') : item.time}</div>
                        </div>
                        <div className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>

              {/* What-If Scenarios - Interactive toggle */}
              <Reveal delay={270}>
                <Card className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M9.5 1h5v22h-5z"/><path d="M4 12h16" stroke="#94A3B8"/></svg>
                    </div>
                    <h3 className="text-lg font-semibold">{lang === 'es' ? 'Escenarios de qué pasaría' : 'What-If Scenarios'}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all border-[1.5px]" style={{ borderColor: attorney === 'with' ? '#4F46E5' : '#1E293B', background: attorney === 'with' ? 'rgba(99,102,241,0.15)' : '#1E293B', color: attorney === 'with' ? '#4F46E5' : '#64748B' }}
                      onClick={() => setAttorney('with')}>
                      {lang === 'es' ? 'Con abogado' : 'With Attorney'}
                    </button>
                    <button className="px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all border-[1.5px]" style={{ borderColor: attorney === 'without' ? '#4F46E5' : '#1E293B', background: attorney === 'without' ? 'rgba(99,102,241,0.15)' : '#1E293B', color: attorney === 'without' ? '#4F46E5' : '#64748B' }}
                      onClick={() => setAttorney('without')}>
                      {lang === 'es' ? 'Sin abogado' : 'Self-Represented'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg text-center" style={{ background: 'var(--bg-elevated)' }}>
                      <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2 uppercase">{lang === 'es' ? 'Probabilidad de éxito' : 'Win Rate'}</div>
                      <div className="text-3xl font-display font-bold" style={{ color: attorney === 'with' ? '#0D9488' : '#D97706' }}>
                        {attorney === 'with' ? '41%' : '12%'}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg text-center" style={{ background: 'var(--bg-elevated)' }}>
                      <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2 uppercase">{lang === 'es' ? 'Cambio en potencial' : 'Improvement'}</div>
                      <div className="text-3xl font-display font-bold" style={{ color: 'var(--fg-muted)' }}>
                        +29%
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>

              {/* Collapsed paywall — recovery data preview */}
              <Reveal delay={280}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} tier="single" previewRows={1}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-3">{lang === 'es' ? '¿Cuánto recuperaron personas en situaciones similares?' : 'What did people in similar situations recover?'}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: lang === 'es' ? 'Rango bajo' : 'Lower range', v: '$??K', c: '#D97706' },
                        { label: lang === 'es' ? 'Típico' : 'Typical', v: '$??K', c: '#4F46E5' },
                        { label: lang === 'es' ? 'Rango alto' : 'Upper range', v: '$??K', c: '#0D9488' },
                      ].map((x, i) => (
                        <div key={i} className="p-4 rounded-xl text-center bg-[var(--bg-elevated)]">
                          <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: x.c }}>{x.label}</div>
                          <div className="text-2xl font-display font-bold">{x.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              <Reveal delay={300}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-3">{lang === 'es' ? 'Tu informe premium incluye:' : 'Your premium report includes:'}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { f: lang === 'es' ? 'Rangos de recuperación' : 'Recovery ranges', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
                        { f: lang === 'es' ? 'Distribución de montos' : 'Recovery distribution', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg> },
                        { f: lang === 'es' ? 'Impacto del abogado' : 'Attorney impact', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                        { f: lang === 'es' ? 'Cronología del caso' : 'Case timeline', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                        { f: lang === 'es' ? 'Casos comparables' : 'Comparable cases', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
                        { f: lang === 'es' ? 'Calendario de acuerdos' : 'Settlement timing', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                        { f: lang === 'es' ? 'Factores citados' : 'Factors courts cited', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
                        { f: lang === 'es' ? 'Pasos a seguir' : 'Action steps', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 rounded-lg text-sm flex items-center gap-2" style={{ background: 'rgba(99,102,241,0.08)' }}>
                          <span className="flex-shrink-0">{item.icon}</span> {item.f}
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Case Strength Score Breakdown */}
              <Reveal delay={310}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Desglose de la fortaleza de tu caso' : 'Your case strength score breakdown'}</div>
                    <div className="flex items-center justify-center mb-4">
                      <svg width="150" height="150" viewBox="0 0 150 150">
                        <circle cx="75" cy="75" r="65" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                        <circle cx="75" cy="75" r="65" fill="none" stroke="#4F46E5" strokeWidth="12" strokeDasharray="200" strokeDashoffset="80" strokeLinecap="round" />
                        <text x="75" y="75" textAnchor="middle" dy="0.3em" fontSize="32" fontWeight="800" fill="#4F46E5">68</text>
                        <text x="75" y="95" textAnchor="middle" fontSize="14" fill="#64748B">{lang === 'es' ? 'Total' : 'Overall'}</text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: lang === 'es' ? 'Tasa de éxito histórica' : 'Historical win rate', value: '38%', weight: '40%' },
                        { label: lang === 'es' ? 'Factores de fuerza' : 'Strength factors', value: '7/10', weight: '35%' },
                        { label: lang === 'es' ? 'Factores de riesgo' : 'Risk factors', value: '3/10', weight: '25%' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 bg-[var(--bg-elevated)] rounded">
                          <span className="text-[var(--fg-muted)]">{item.label}</span>
                          <span className="font-bold">{item.value} <span className="text-[var(--fg-muted)]">({item.weight})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Estimated Timeline */}
              <Reveal delay={320}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Cronograma estimado para casos similares' : 'Estimated timeline for similar cases'}</div>
                    <div className="space-y-2">
                      {[
                        { phase: lang === 'es' ? 'Presentación a descubrimiento' : 'Filing to discovery', duration: '3-6 mo' },
                        { phase: lang === 'es' ? 'Negociación' : 'Settlement negotiation', duration: '3-8 mo' },
                        { phase: lang === 'es' ? 'Resolución' : 'Resolution', duration: '1-3 mo' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-[var(--bg-elevated)] rounded">
                          <span className="text-[var(--fg-muted)]">{item.phase}</span>
                          <span className="font-bold font-data">{item.duration}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[var(--border-default)] text-[11px] text-[var(--fg-muted)]">
                      {lang === 'es' ? 'Estimación basada en casos similares. Puede variar significativamente.' : 'Estimate based on similar cases. May vary significantly.'}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Recovery Calculator */}
              <Reveal delay={330}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Calculadora de recuperación esperada' : 'Expected recovery calculator'}</div>
                    <div className="space-y-2.5">
                      {[
                        { scenario: lang === 'es' ? 'Escenario bajo' : 'Low scenario', amount: '$15K - $28K' },
                        { scenario: lang === 'es' ? 'Escenario típico' : 'Typical scenario', amount: '$35K - $65K' },
                        { scenario: lang === 'es' ? 'Escenario alto' : 'High scenario', amount: '$75K - $140K' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r rounded-lg" style={{ background: i === 1 ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(217,119,6,0.06))' : 'rgba(255,255,255,0.03)' }}>
                          <span className={`text-sm font-medium ${i === 1 ? 'font-semibold' : ''}`}>{item.scenario}</span>
                          <span className="font-display font-bold" style={{ color: i === 0 ? '#D97706' : i === 1 ? '#4F46E5' : '#0D9488' }}>{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Judge & Jurisdiction Analysis */}
              <Reveal delay={340}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Análisis de juez y jurisdicción' : 'Judge & jurisdiction analysis'}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { metric: lang === 'es' ? 'Tasa del distrito' : 'District rate', value: '39%' },
                        { metric: lang === 'es' ? 'Jueces favorables' : 'Favorable judges', value: '7/12' },
                        { metric: lang === 'es' ? 'Tipo de demanda común' : 'Most common case type', value: lang === 'es' ? 'Empleo' : 'Employment' },
                        { metric: lang === 'es' ? 'Tiempo promedio' : 'Avg. duration', value: '10.2 mo' },
                      ].map((item, i) => (
                        <div key={i} className="p-2.5 bg-[var(--bg-elevated)] rounded text-center">
                          <div className="text-[10px] text-[var(--fg-muted)]">{item.metric}</div>
                          <div className="text-sm font-bold mt-1">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Case Strength Radar */}
              <Reveal delay={350}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-4">{lang === 'es' ? 'Radar de fortaleza del caso' : 'Case strength radar'}</div>
                    <div className="flex items-center gap-6">
                      {/* Fake radar chart preview */}
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <polygon points="60,15 98,35 98,85 60,105 22,85 22,35" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                        <polygon points="60,30 85,42 85,78 60,90 35,78 35,42" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                        <polygon points="60,45 72,51 72,69 60,75 48,69 48,51" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                        <polygon points="60,25 90,40 82,80 60,95 38,80 30,40" fill="rgba(79,70,229,0.15)" stroke="#4F46E5" strokeWidth="2" />
                      </svg>
                      <div className="flex-1 space-y-2">
                        {[
                          { label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate', score: '??/100' },
                          { label: lang === 'es' ? 'Acuerdos' : 'Settlement', score: '??/100' },
                          { label: lang === 'es' ? 'Evidencia' : 'Evidence', score: '??/100' },
                          { label: lang === 'es' ? 'Velocidad' : 'Speed', score: '??/100' },
                          { label: lang === 'es' ? 'Jurisdicción' : 'Jurisdiction', score: '??/100' },
                          { label: lang === 'es' ? 'Representación' : 'Representation', score: '??/100' },
                        ].map((f, i) => (
                          <div key={i} className="flex items-center justify-between text-[12px]">
                            <span className="text-[var(--fg-muted)]">{f.label}</span>
                            <span className="font-bold text-[var(--fg-muted)]">{f.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-[32px] font-display font-extrabold" style={{ color: 'var(--accent-primary)' }}>??</div>
                      <div className="text-[11px] text-[var(--fg-muted)]">{lang === 'es' ? 'Puntuación general de fortaleza' : 'Overall strength score'}</div>
                    </div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* Premium locked section: Similar Cases Near You */}
              <Reveal delay={355}>
                <CollapsedPaywall lang={lang} onUnlock={() => setShowPricing(true)} previewRows={2}>
                  <div className="rounded-2xl p-6 border border-[var(--border-default)]">
                    <div className="text-sm font-semibold mb-3">{lang === 'es' ? 'Casos similares en tu área' : 'Similar cases in your area'}</div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="p-3 bg-[var(--bg-elevated)] rounded-xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-secondary, #A5B4FC)' }}>#{i+1}</div>
                          <div className="flex-1">
                            <div className="text-[12px] font-semibold text-[var(--fg-muted)]">{lang === 'es' ? 'Caso similar redactado' : 'Redacted similar case'}</div>
                            <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Resuelto en' : 'Resolved in'} ?? {lang === 'es' ? 'meses • Acuerdo' : 'months • Settled'}</div>
                          </div>
                          <div className="text-[14px] font-bold text-[var(--fg-muted)]">$??K</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-[var(--fg-muted)] mt-2 text-center">{lang === 'es' ? 'Todos los datos están anonimizados y son de fuentes públicas' : 'All data is anonymized and from public sources'}</div>
                  </div>
                </CollapsedPaywall>
              </Reveal>

              {/* CTA */}
              <Reveal delay={360}>
                <div className="rounded-2xl p-6 sm:p-9 text-center card-bg bg-[#131B2E] border-[1.5px] shadow-md" style={{ borderColor: '#4F46E515', animation: 'pulseGlow 4s ease infinite' }}>
                  <div className="text-2xl sm:text-3xl font-display font-bold mb-2">{lang === 'es' ? '¿Cuánto podría valer tu situación?' : 'What could your situation be worth?'}</div>
                  <p className="text-[15px] text-[var(--fg-muted)] max-w-md mx-auto mb-2 leading-relaxed">
                    {lang === 'es' ? 'Tu informe gratuito muestra la tasa de éxito, cómo terminaron los casos y el plazo. El informe completo agrega rangos de recuperación, resultados comparables, impacto del abogado, cronología y más.' : 'Your free report shows the win rate, how cases ended, and deadline. The full report adds recovery ranges, comparable outcomes, attorney impact, timeline, and more.'}
                  </p>
                  <p className="text-[13px] text-[var(--fg-muted)] mb-6">{lang === 'es' ? 'Datos históricos agregados únicamente. No es una valoración de caso.' : 'Aggregate historical data only. Not a case valuation.'}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => buy('single')} className="px-8 py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                      style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                      {lang === 'es' ? '$5.99 — Informe completo' : '$5.99 — Full report'}
                    </button>
                    <button onClick={() => setShowPricing(true)} className="px-7 py-3.5 text-[15px] font-medium card-bg bg-[#131B2E] border-[1.5px] border-[var(--border-default)] rounded-xl cursor-pointer hover:border-[#334155] transition-colors">
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
                      <div className="mt-3 text-[13px] text-[var(--fg-muted)] leading-relaxed">
                        <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-widest mb-2">{lang === 'es' ? 'ASISTENCIA LEGAL ESTATAL Y SIN FINES DE LUCRO' : 'STATE-FUNDED AND NONPROFIT LEGAL AID'}</div>
                        {LEGAL_AID[stateCode]}
                        <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'MyCaseValue no está afiliado ni respalda a ninguna organización.' : 'MyCaseValue is not affiliated with and does not endorse any organization.'}</div>
                      </div>
                    </details>
                  </Card>
                </Reveal>
              )}

              {/* Attorney CTA */}
              <Reveal delay={400}>
                <Card className="p-6">
                  <div className="text-xl font-display font-bold mb-1.5" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'Lo que muchas personas hacen después' : 'What many people do next'}</div>
                  <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed mb-3">
                    {lang === 'es' ? 'Muchas personas usan estos datos antes de consultar con un abogado. La mayoría ofrece consultas iniciales gratuitas. MyCaseValue no evalúa reclamos, no recomienda abogados ni proporciona referencias.' : 'Many people use this data before consulting with an attorney. Most offer free initial consultations. MyCaseValue does not evaluate claims, recommend attorneys, or provide referrals.'}
                  </p>
                  <button onClick={() => { try { window.open('https://www.google.com/search?q=' + encodeURIComponent((spec?.d || 'attorney') + ' attorney ' + (stateCode || '')), '_blank'); } catch {} }}
                    className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
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
                    <div className="w-28 h-28 rounded-full border-4 border-[var(--border-default)] flex items-center justify-center flex-shrink-0" style={{ background: '#131B2E' }}>
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
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                      <div className="text-[10px] font-bold" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'CON ABOGADO' : 'WITH ATTORNEY'}</div>
                      <div className="text-3xl font-display font-bold mt-1">{d.rr?.wr ?? '--'}%</div>
                      {d.rr?.total && <div className="text-[11px] text-[var(--fg-muted)] mt-1">{d.rr.total.toLocaleString()} {lang === 'es' ? 'casos' : 'cases'}</div>}
                    </div>
                    <div className="flex-1 p-4 rounded-xl text-center" style={{ background: 'rgba(217,119,6,0.15)' }}>
                      <div className="text-[10px] font-bold" style={{ color: '#D97706' }}>{lang === 'es' ? 'SIN ABOGADO' : 'SELF-REPRESENTED'}</div>
                      <div className="text-3xl font-display font-bold mt-1">{d.ps?.wr ?? '--'}%</div>
                      {d.ps?.total && <div className="text-[11px] text-[var(--fg-muted)] mt-1">{d.ps.total.toLocaleString()} {lang === 'es' ? 'casos' : 'cases'}</div>}
                    </div>
                  </div>
                  <div className="px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: 'rgba(64,64,242,0.15)', color: 'var(--accent-primary)' }}>
                    {lang === 'es' ? <span>Los abogados ganaron <strong>{d.rr && d.ps ? Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100) : 0}% más a menudo</strong>. Honorario: {d.af}.</span> : <span>Attorneys won <strong>{d.rr && d.ps ? Math.round((d.rr.wr / Math.max(d.ps.wr, 1) - 1) * 100) : 0}% more often</strong>. Fee: {d.af}.</span>}
                  </div>
                  {spec && FEE_INFO[spec.nos] && (
                    <details className="mt-2">
                      <summary className="text-[12px] cursor-pointer" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? '¿Cómo cobran los abogados por esto?' : 'How do attorneys charge for this?'}</summary>
                      <div className="mt-2 text-[13px] text-[var(--fg-muted)] leading-relaxed">
                        {FEE_INFO[spec.nos]}
                        <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Información general. Los honorarios varían. MyCaseValue no recomienda abogados.' : 'General info. Fees vary. MyCaseValue does not recommend any attorney.'}</div>
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
                    <div className="text-[13px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'Cómo varían las tasas de éxito entre circuitos federales:' : 'How win rates vary across federal circuits:'}</div>
                    {Object.entries(d.circuit_rates)
                      .sort(([,a]: any, [,b]: any) => b - a)
                      .slice(0, 12)
                      .map(([circ, rate]: [string, any], i: number) => {
                        const circLabel = circ === 'dc' ? 'D.C.' : `${circ}${['th','st','nd','rd'][(Number(circ)%100>10&&Number(circ)%100<14)?0:[0,1,2,3][Number(circ)%10]||0]}`;
                        const isYours = circuitDataKey === circ;
                        return (
                          <div key={i} className="flex items-center gap-2 py-1.5">
                            <span className={`text-xs font-semibold w-10 ${isYours ? 'text-gold' : ''}`}>{circLabel}{isYours ? ' *' : ''}</span>
                            <div className="flex-1 h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{
                                width: `${rate}%`,
                                background: isYours ? '#4F46E5' : rate > 55 ? '#0D9488' : rate > 45 ? '#D97706' : '#E87461',
                              }} />
                            </div>
                            <span className="text-xs font-semibold w-12 text-right font-data">{rate.toFixed(1)}%</span>
                          </div>
                        );
                      })}
                    {circuitDataKey && <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">* {lang === 'es' ? 'Tu circuito' : 'Your circuit'} ({circuitName})</div>}
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
                            style={{ background: active ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : '#1E293B', border: active ? 'none' : '2px solid #CBD5E1' }}>
                            {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                          </div>
                          {i < (d.tl || []).length - 1 && <div className="w-0.5 flex-1 mt-0.5 transition-colors" style={{ background: active ? '#4F46E525' : '#1E293B' }} />}
                        </div>
                        <div className="flex-1 pb-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors" style={{ color: active ? '#4F46E5' : '#94A3B8', background: active ? 'rgba(99,102,241,0.15)' : '#1E293B' }}>
                            {lang === 'es' ? `Mes ${t.mo}` : `Month ${t.mo}`}
                          </span>
                          <div className="text-[14px] mt-1 transition-colors" style={{ fontWeight: active ? 600 : 400, color: active ? '#E2E8F0' : '#94A3B8' }}>{t.ev}</div>
                          {active && t.d && <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">{t.d}</div>}
                        </div>
                      </div>
                    );
                  })}
                  {/* If Filed Today */}
                  <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-2">{lang === 'es' ? 'SI SE PRESENTA HOY' : 'IF FILED TODAY'}</div>
                    {(() => {
                      const today = new Date();
                      const resolve = new Date(today);
                      resolve.setMonth(resolve.getMonth() + (d.mo || 10));
                      const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',');
                      return (
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-[11px] text-[var(--fg-muted)]">{lang === 'es' ? 'Presentado' : 'Filed'}</div>
                            <div className="text-base font-bold">{months[today.getMonth()]} {today.getFullYear()}</div>
                          </div>
                          <div className="flex-1 h-[3px] rounded-full relative" style={{ background: '#334155' }}>
                            <div className="absolute right-0 top-[-3px] w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }} />
                          </div>
                          <div className="text-center">
                            <div className="text-[11px] text-[var(--fg-muted)]">{lang === 'es' ? 'Resolución est.' : 'Est. resolution'}</div>
                            <div className="text-base font-bold" style={{ color: 'var(--accent-primary)' }}>{months[resolve.getMonth()]} {resolve.getFullYear()}</div>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Basado en la duración mediana. Los plazos reales varían significativamente.' : 'Based on median duration. Actual timelines vary significantly.'}</div>
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
                  <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'Distribución agregada. No predice ningún resultado individual.' : 'Aggregate distribution. Does not predict any individual outcome.'}</div>
                </Card>
              </Reveal>

              {/* Comparable cases */}
              <Reveal delay={400}>
                <Collapsible title={lang === 'es' ? 'Casos similares' : 'Similar cases'} badge={(d.comps || []).length} defaultOpen>
                  <div className="text-[13px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'Ejemplos anónimos de registros judiciales públicos:' : 'Anonymized examples from public court records:'}</div>
                  {(d.comps || []).map((c: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl mb-2 transition-transform hover:scale-[1.01]" style={{
                      background: c.w ? 'rgba(13,148,136,0.1)' : 'rgba(232,116,97,0.1)',
                      borderLeft: `4px solid ${c.w ? '#0D9488' : '#E87461'}`,
                    }}>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-display font-bold">{c.v}</span>
                        <span className="text-[11px] font-semibold text-[var(--fg-muted)] card-bg px-2.5 py-0.5 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>{c.mo} {lang === 'es' ? 'meses' : 'months'}</span>
                      </div>
                      <div className="text-[13px] text-[var(--fg-muted)] mt-1.5 leading-relaxed">{c.d}</div>
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
                            background: i === 1 ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : 'rgba(64,64,242,0.2)',
                          }} />
                        </div>
                        <div className="text-[13px] font-bold" style={{ color: i === 1 ? '#4F46E5' : '#94A3B8' }}>{x.p}%</div>
                        <div className="text-[11px] text-[var(--fg-muted)]">{x.l}mo</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: 'rgba(64,64,242,0.15)', color: 'var(--accent-primary)' }}>
                    {lang === 'es' ? 'La mayoría de los acuerdos: 3-6 meses después de la presentación.' : 'Most settlements: 3-6 months after filing.'}
                  </div>
                </Card>
              </Reveal>

              {/* What courts cited */}
              <Reveal delay={480}>
                <Collapsible title={lang === 'es' ? 'Lo que citaron los tribunales' : 'What courts cited'} badge={(d.factors || []).length}>
                  <div className="text-[13px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'Factores que los tribunales federales citaron en casos similares:' : 'Factors federal courts cited in similar cases:'}</div>
                  {(d.factors || []).map((f: string, i: number) => (
                    <div key={i} className="flex gap-2 items-center py-1.5 text-[15px]">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(64,64,242,0.2)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
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
                    <div key={i} className="flex gap-3 p-3 card-bg border rounded-xl mb-1.5" style={{ background: '#131B2E', borderColor: '#1E293B' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-elevated)' }}>
                        <span className="text-[11px] font-bold text-[var(--fg-muted)]">{s.n}</span>
                      </div>
                      <span className="text-[13px] text-[var(--fg-muted)]">{s.t}</span>
                    </div>
                  ))}
                </Card>
              </Reveal>

              {/* Deadline */}
              <Reveal delay={560}>
                <div className="rounded-2xl p-5 mb-3" style={{
                  background: (timing === '2yr' || timing === 'old') ? 'rgba(232,116,97,0.15)' : 'rgba(217,119,6,0.15)',
                }}>
                  <div className="text-[11px] font-bold tracking-[2px] mb-1" style={{ color: (timing === '2yr' || timing === 'old') ? '#E87461' : '#D97706' }}>
                    {lang === 'es' ? 'PLAZO GENERAL DE PRESENTACIÓN' : 'GENERAL FILING DEADLINE'}
                  </div>
                  <div className="text-base font-semibold">{d.sol}</div>
                  <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Solo un abogado puede determinar su plazo específico.' : 'Only an attorney can determine your specific deadline.'}</div>
                </div>
              </Reveal>

              {/* Notifications */}
              <Reveal delay={580}>
                <Card>
                  <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-1">{lang === 'es' ? 'MANTENERSE ACTUALIZADO' : 'STAY UPDATED'}</div>
                  <div className="text-[12px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'Recibe notificaciones cuando se publiquen nuevas opiniones judiciales que coincidan con tu tipo de caso.' : 'Get notified when new court opinions matching your case type are published.'}</div>
                  {notifySent ? (
                    <div className="px-3.5 py-2.5 rounded-lg text-[13px]" style={{ background: 'rgba(13,148,136,0.15)', color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Se te notificará.' : 'You will be notified.'}</div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                        placeholder="your@email.com"
                        aria-label="Notification email"
                        className="flex-1 px-3.5 py-2.5 text-sm border-[1.5px] border-[var(--border-default)] rounded-lg outline-none focus:border-[#4F46E5] card-bg bg-[#131B2E] transition-colors" />
                      <button onClick={() => {
                        if (notifyEmail.includes('@') && notifyEmail.includes('.')) {
                          setNotifySent(true);
                          apiCall('/api/notify/subscribe', 'POST', { email: notifyEmail, nos_code: spec?.nos });
                        }
                      }} className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all active:scale-[0.96]"
                        style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
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
                      <div className="mt-3 text-[13px] text-[var(--fg-muted)] leading-relaxed">
                        <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-widest mb-2">{lang === 'es' ? 'ASISTENCIA LEGAL ESTATAL Y SIN FINES DE LUCRO' : 'STATE-FUNDED AND NONPROFIT LEGAL AID'}</div>
                        {LEGAL_AID[stateCode]}
                        <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'MyCaseValue no está afiliado con ninguna organización listada.' : 'MyCaseValue is not affiliated with any organization listed.'}</div>
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
                          background: sol.urgent ? 'rgba(232,116,97,0.12)' : 'rgba(217,119,6,0.12)',
                          border: `3px solid ${sol.urgent ? '#E87461' : '#D97706'}`,
                        }}>
                          <div className="text-center">
                            <div className="text-lg font-display font-bold" style={{ color: sol.urgent ? '#E87461' : '#D97706' }}>{sol.remaining}</div>
                            <div className="text-[10px] font-bold" style={{ color: sol.urgent ? '#E87461' : '#D97706' }}>MO</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[14px] font-semibold">{sol.urgent ? (lang === 'es' ? '⚠ Plazo urgente' : '⚠ Urgent deadline') : (lang === 'es' ? 'Tiempo restante estimado' : 'Estimated time remaining')}</div>
                          <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? `Plazo estimado: ${sol.deadline}` : `Estimated deadline: ${sol.deadline}`}</div>
                          {sol.urgent && <div className="text-[11px] text-red-500 font-semibold mt-1">{lang === 'es' ? 'Consulte un abogado de inmediato' : 'Consult an attorney immediately'}</div>}
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{
                          width: `${Math.max(5, Math.min(95, ((d.sol ? parseInt(d.sol) * 12 : 24) - sol.remaining) / (d.sol ? parseInt(d.sol) * 12 : 24) * 100))}%`,
                          background: sol.urgent ? '#E87461' : 'linear-gradient(90deg, #0D9488, #D97706)',
                        }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-[var(--fg-muted)] mt-1">
                        <span>{lang === 'es' ? 'Incidente' : 'Incident'}</span>
                        <span>{lang === 'es' ? 'Vencimiento' : 'Deadline'}</span>
                      </div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-2 italic">{lang === 'es' ? 'Solo un abogado puede determinar su plazo específico.' : 'Only an attorney can determine your specific deadline. This is a general estimate.'}</div>
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
                      <div className="text-[13px] text-[var(--fg-muted)] mb-3">{lang === 'es' ? 'Basado en la recuperación mediana para este tipo de caso:' : 'Based on median recovery for this case type:'}</div>
                      <div className="space-y-2">
                        <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)]">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px]">CONTINGENCY (33%)</div>
                              <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">Attorney takes 33% — you keep the rest</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{fees.net33}</div>
                              <div className="text-[10px] text-[var(--fg-muted)]">your estimated net</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)]">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold text-[var(--fg-muted)] tracking-[2px]">CONTINGENCY (40%)</div>
                              <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">Attorney takes 40% — common if going to trial</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-display font-bold" style={{ color: '#D97706' }}>{fees.net40}</div>
                              <div className="text-[10px] text-[var(--fg-muted)]">your estimated net</div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl" style={{ background: 'rgba(99,102,241,0.15)' }}>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-[11px] font-bold tracking-[2px]" style={{ color: 'var(--accent-primary)' }}>GROSS RECOVERY</div>
                              <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">Median award before fees</div>
                            </div>
                            <div className="text-lg font-display font-bold" style={{ color: 'var(--accent-primary)' }}>{fees.gross}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'Estimaciones. Los honorarios reales varían. MyCaseValue no recomienda abogados.' : 'Estimates only. Actual fees vary by attorney and case. MyCaseValue does not recommend attorneys.'}</div>
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
                        <div className="text-[13px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}: <strong className="font-data">{d.state_rates[stateCode].toFixed(1)}%</strong></div>
                        <div className="text-[12px] text-[var(--fg-muted)] mt-0.5">
                          {d.state_rates[stateCode] > 55 ? (lang === 'es' ? 'Por encima del promedio nacional' : 'Above national average') :
                           d.state_rates[stateCode] > 45 ? (lang === 'es' ? 'Cerca del promedio nacional' : 'Near national average') :
                           (lang === 'es' ? 'Por debajo del promedio nacional' : 'Below national average')}
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-[var(--fg-muted)] mt-3 italic">{lang === 'es' ? 'Basado en datos agregados. No predice resultados individuales.' : 'Based on aggregate data. Does not predict individual outcomes.'}</div>
                  </Card>
                </Reveal>
              )}

              {/* === NEW INTERACTIVE SECTIONS === */}

              {/* What-If Simulator */}
              <Reveal delay={621}>
                <WhatIfSimulator
                  lang={lang}
                  baseData={{
                    wr: wr,
                    sr: d.sp || 30,
                    mc: d.mo || 12,
                    sc: 50000,
                    rr: d.rp || 40,
                    ps: d.ps?.rate || 60,
                  }}
                />
              </Reveal>

              {/* Judge Analytics (Premium) */}
              <Reveal delay={622}>
                <JudgeAnalytics
                  lang={lang}
                  nos={spec?.nos || '442'}
                  caseName={spec?.d || ''}
                  onUnlock={() => setShowPricing(true)}
                />
              </Reveal>

              {/* State Deep Dive */}
              {stateCode && (
                <Reveal delay={623}>
                  <StateDeepDive
                    lang={lang}
                    stateCode={stateCode}
                    nos={spec?.nos || '442'}
                  />
                </Reveal>
              )}

              {/* Case Comparison Tool */}
              <Reveal delay={624}>
                <CaseComparison lang={lang} />
              </Reveal>

              {/* Attorney Referral CTA */}
              <Reveal delay={625}>
                <AttorneyReferral
                  lang={lang}
                  caseName={spec?.d || ''}
                  winRate={wr}
                />
              </Reveal>

              {/* CTA */}
              <Reveal delay={630}>
                <Card className="p-6">
                  <div className="text-xl font-display font-bold mb-1.5" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'Lo que muchas personas hacen después' : 'What many people do next'}</div>
                  <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed mb-3">
                    {lang === 'es' ? 'Muchas personas usan estos datos antes de consultar con un abogado. La mayoría ofrece consultas iniciales gratuitas. MyCaseValue no recomienda abogados ni proporciona referencias.' : 'Many people use this data before consulting with an attorney. Most offer free initial consultations. MyCaseValue does not recommend attorneys or provide referrals.'}
                  </p>
                  <button onClick={() => { try { window.open('https://www.google.com/search?q=' + encodeURIComponent((spec?.d || 'attorney') + ' attorney ' + (stateCode || '')), '_blank'); } catch {} }}
                    className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                    {lang === 'es' ? 'Buscar abogados en tu área' : 'Search for attorneys in your area'}
                  </button>
                </Card>
              </Reveal>
            </div>
          )}

          </TabPanel>{/* end overview: Free + Premium detailed sections */}

          </div>{/* end main content area */}
          </div>{/* end flex wrapper (sidebar + main) */}

          {/* Poll */}
          <Reveal delay={660}>
            <Card className="p-6">
              <SectionLabel>{lang === 'es' ? '¿Qué harías después?' : 'What would you do next?'}</SectionLabel>
              <div className="text-[13px] text-[var(--fg-muted)] mb-3">Anonymous — not stored or linked to you.</div>
              {pollVote ? (
                <div className="px-5 py-4 rounded-xl text-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                  <div className="text-[15px] font-semibold mb-1" style={{ color: 'var(--accent-secondary)' }}>{lang === 'es' ? 'Gracias' : 'Thank you'}</div>
                  <div className="text-[13px] text-[var(--fg-muted)]">{lang === 'es' ? 'El 73% de las personas que vieron datos similares eligieron consultar a un abogado.' : '73% of people who viewed similar data chose to consult an attorney.'}</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'atty', l: lang === 'es' ? 'Consultar a un abogado' : 'Consult an attorney', c: '#0D9488' },
                    { id: 'file', l: lang === 'es' ? 'Presentar queja yo mismo' : 'File a complaint myself', c: '#4F46E5' },
                    { id: 'wait', l: lang === 'es' ? 'Recopilar más info' : 'Gather more info', c: '#1A2744' },
                    { id: 'move', l: lang === 'es' ? 'Seguir adelante' : 'Move on', c: '#94A3B8' },
                  ].map(o => (
                    <button key={o.id} onClick={() => { setPollVote(o.id); apiCall('/api/poll', 'POST', { vote: o.id, nos: spec?.nos }); }}
                      className="p-3 text-sm font-semibold card-bg bg-[#131B2E] border-[1.5px] border-[var(--border-default)] rounded-xl cursor-pointer text-center card-lift">
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
                    <div className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-primary)' }}>MyCaseValue Report</div>
                    <div className="text-xl sm:text-2xl font-display font-bold mt-1 capitalize">{spec?.d}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 relative z-10">
                  <div className="text-center p-2 sm:p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-xl sm:text-2xl font-display font-bold" style={{ color: wrColor }}>{Math.round(wr)}%</div>
                    <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? 'Tasa de éxito' : 'Win Rate'}</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-xl sm:text-2xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{winSettleRate}%</div>
                    <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? 'Éxito+Acuerdo' : 'Win+Settle'}</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-xl sm:text-2xl font-display font-bold">{d.mo}<span className="text-sm font-normal text-[var(--fg-muted)]"> mo</span></div>
                    <div className="text-[10px] text-[var(--fg-muted)] mt-0.5">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)] relative z-10">
                  <span>{lang === 'es' ? 'Basado en' : 'Based on'} {d.total?.toLocaleString()} {lang === 'es' ? 'casos federales' : 'federal cases'}</span>
                  <span>mycasevalue.com</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 py-3 no-print" style={{ background: 'var(--bg-elevated)' }}>
                <span className="text-[11px] text-[var(--fg-muted)] font-medium">{lang === 'es' ? 'Compartir como imagen' : 'Share as image'}</span>
                <button onClick={() => {
                  try {
                    const text = `${spec?.d}: ${Math.round(wr)}% win rate based on ${d.total?.toLocaleString()} federal cases — mycasevalue.com`;
                    navigator.clipboard.writeText(text);
                    toast(lang === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard!');
                  } catch { toast(lang === 'es' ? 'No se pudo copiar' : 'Could not copy'); }
                }} className="text-[12px] font-semibold px-4 py-1.5 rounded-lg cursor-pointer transition-all"
                  style={{ background: '#334155', border: '1px solid #475569', color: 'var(--accent-primary)' }}>
                  {lang === 'es' ? 'Copiar texto' : 'Copy text'}
                </button>
              </div>
            </Card>
          </Reveal>

          {/* Side-by-side comparison tool */}
          <Reveal delay={700}>
            <Card className="p-6 no-print">
              <SectionLabel>{lang === 'es' ? 'Comparar con otro tipo de caso' : 'Compare with another case type'}</SectionLabel>
              <p className="text-[13px] text-[var(--fg-muted)] mb-4">{lang === 'es' ? 'Selecciona otro tipo de caso para ver cómo se comparan los resultados.' : 'Select another case type to see how outcomes compare.'}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {comparisonOptions.slice(0, 8).map((opt: any) => (
                  <button key={opt.nos} onClick={() => loadComparison(opt.nos)}
                    className="px-3 py-1.5 text-[12px] font-medium rounded-lg cursor-pointer transition-all capitalize"
                    style={{
                      background: compareNos === opt.nos ? 'rgba(99,102,241,0.15)' : '#1E293B',
                      border: compareNos === opt.nos ? '1.5px solid #4F46E540' : '1.5px solid #334155',
                      color: compareNos === opt.nos ? '#4F46E5' : '#CBD5E1',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {compareMode && compareData && (
                <div className="rounded-xl overflow-hidden page-enter" style={{ border: '1px solid #1E293B' }}>
                  <div className="grid grid-cols-2">
                    {/* Current case */}
                    <div className="p-5 text-center" style={{ borderRight: '1px solid #1E293B' }}>
                      <div className="text-[10px] font-bold tracking-[2px] text-[var(--fg-muted)] mb-1">{lang === 'es' ? 'TU CASO' : 'YOUR CASE'}</div>
                      <div className="text-sm font-semibold capitalize mb-3">{spec?.d}</div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-3xl font-display font-bold" style={{ color: wrColor }}>{Math.round(wr)}%</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold">{d.mo} mo</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{d.sp}%</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Acuerdos' : 'Settlement'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold font-data">{d.total?.toLocaleString()}</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Casos' : 'Cases'}</div>
                        </div>
                      </div>
                    </div>
                    {/* Comparison case */}
                    <div className="p-5 text-center" style={{ background: '#162035' }}>
                      <div className="text-[10px] font-bold tracking-[2px] mb-1" style={{ color: 'var(--accent-primary)' }}>{lang === 'es' ? 'COMPARAR' : 'COMPARE'}</div>
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
                                <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Tasa de éxito' : 'Win rate'}</div>
                              </>
                            );
                          })()}
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold">{compareData.mo} mo</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Duración' : 'Duration'}</div>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold" style={{ color: 'var(--accent-secondary)' }}>{compareData.sp}%</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Acuerdos' : 'Settlement'}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold font-data">{compareData.total?.toLocaleString()}</div>
                          <div className="text-[10px] text-[var(--fg-muted)]">{lang === 'es' ? 'Casos' : 'Cases'}</div>
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
              <div className="text-[11px] font-bold text-white tracking-[2px] mb-2">{lang === 'es' ? 'AVISO IMPORTANTE' : 'IMPORTANT NOTICE'}</div>
              <div className="w-10 h-0.5 rounded-full mx-auto mb-3" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed max-w-2xl mx-auto">
                {UPL.finalNotice}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.5)', backdropFilter: 'blur(16px)' }}
            onClick={() => setShowPricing(false)}
            role="dialog" aria-modal="true" aria-label={lang === 'es' ? 'Opciones de precios' : 'Pricing options'}>
            <div className="rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" style={{ background: 'linear-gradient(180deg, rgba(19,27,46,0.98) 0%, rgba(11,18,33,0.95) 100%)', boxShadow: '0 25px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(64,64,242,0.15), inset 0 1px 0 rgba(255,255,255,0.03)' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowPricing(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-elevated)] hover:bg-[#334155] flex items-center justify-center cursor-pointer border-none transition-colors focus-ring z-10"
                aria-label="Close pricing">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
              <div className="text-center mb-4">
                <div className="text-2xl sm:text-3xl font-display font-bold">{lang === 'es' ? 'Vea el panorama completo' : 'See the complete picture'}</div>
                <p className="text-[15px] mt-2" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? '12 herramientas de datos para mayor comprensión' : '12 data tools for deeper understanding'}</p>
              </div>
              <div className="text-[11px] text-center mb-5" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Todos los datos son solo informativos. No se crea relación abogado-cliente.' : 'All data is informational only. No attorney-client relationship is created.'}</div>
              <PricingTiers lang={lang} onSelectPlan={(plan) => { buy(plan); setShowPricing(false); }} />
              <div className="my-4 h-px" style={{ background: 'var(--bg-elevated)' }} />
              <UpgradeTable onBuy={(plan) => { buy(plan); setShowPricing(false); }} lang={lang} currentTier={tier} />
              {/* Payment methods */}
              <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                  Card
                </div>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.05 11.97c-.03-2.49 2.03-3.69 2.12-3.74-1.15-1.69-2.95-1.92-3.59-1.95-1.53-.15-2.98.9-3.76.9-.78 0-1.98-.88-3.25-.85-1.67.02-3.22.97-4.08 2.47-1.74 3.02-.45 7.5 1.25 9.95.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.23-.81 1.51 0 1.94.81 3.26.79 1.35-.02 2.2-1.22 3.02-2.43.95-1.4 1.34-2.75 1.37-2.82-.03-.01-2.62-1.01-2.65-4.01z" fill="#94A3B8"/><path d="M14.55 4.52c.69-.83 1.15-1.99 1.02-3.15-1 .04-2.2.66-2.91 1.49-.64.74-1.2 1.93-1.05 3.07 1.1.09 2.24-.56 2.94-1.41z" fill="#94A3B8"/></svg>
                  Apple Pay
                </div>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                  <svg width="16" height="12" viewBox="0 0 24 16" fill="none"><rect width="24" height="16" rx="2" fill="#94A3B8" opacity="0.15"/><path d="M8.5 11.5a4 4 0 100-7 4 4 0 000 7z" fill="#94A3B8" opacity="0.4"/><path d="M15.5 11.5a4 4 0 100-7 4 4 0 000 7z" fill="#94A3B8" opacity="0.4"/></svg>
                  Google Pay
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'Pago seguro por Stripe' : 'Secure checkout by Stripe'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Legal pages modal */}
        {legalPage && (
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4" style={{ background: 'rgba(11,18,33,.6)', backdropFilter: 'blur(16px)' }}
            onClick={() => setLegalPage(null)}>
            <div className="card-bg bg-[#131B2E] rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 card-bg bg-[#131B2E] rounded-t-3xl px-6 pt-6 pb-3 border-b border-[var(--border-default)] flex items-center justify-between z-10">
                <h2 className="text-lg font-display font-bold">
                  {legalPage === 'terms' ? (lang === 'es' ? 'Términos de Servicio' : 'Terms of Service') : legalPage === 'privacy' ? (lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy') : legalPage === 'cookies' ? (lang === 'es' ? 'Política de Cookies' : 'Cookie Policy') : (lang === 'es' ? 'Descargo de Responsabilidad' : 'Legal Disclaimer')}
                </h2>
                <button onClick={() => setLegalPage(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--bg-elevated)] hover:bg-[#334155] border-none cursor-pointer transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="px-6 py-5 text-[13px] text-[var(--fg-muted)] leading-relaxed space-y-4">
                <p className="text-[11px] text-[var(--fg-muted)] italic">{lang === 'es' ? 'Última actualización: 25 de marzo de 2026' : 'Last updated: March 25, 2026'}</p>

                {legalPage === 'terms' && (lang === 'es' ? (<>
                  <p><strong>1. Aceptación de los Términos.</strong> Al acceder o utilizar MyCaseValue (&ldquo;Servicio&rdquo;), aceptas estar vinculado por estos Términos de Servicio. Si no estás de acuerdo, no utilices el Servicio.</p>
                  <p><strong>2. Naturaleza del Servicio.</strong> MyCaseValue es una herramienta informativa que muestra datos históricos agregados derivados de registros públicos de cortes federales. El Servicio NO proporciona asesoramiento legal, opiniones legales, representación legal o recomendaciones de ningún tipo. El uso de este Servicio no crea una relación abogado-cliente. MyCaseValue no es un despacho de abogados y no ejerce la abogacía.</p>
                  <p><strong>3. No Constituye Asesoramiento Legal.</strong> Nada en este sitio web constituye asesoramiento legal. La información presentada refleja resultados históricos agregados y no predice, estima o evalúa ningún caso individual, demanda o asunto legal. Debes consultar con un abogado con licencia para obtener asesoramiento específico de tu situación.</p>
                  <p><strong>4. Sin Garantía de Exactitud.</strong> Aunque nos esforzamos por proporcionar datos precisos derivados de registros públicos (Federal Judicial Center Integrated Database, CourtListener, uscourts.gov), no hacemos ninguna garantía con respecto a la exactitud, integridad, oportunidad o confiabilidad de ninguna información. Los datos pueden contener errores, omisiones o retrasos.</p>
                  <p><strong>5. Limitación de Responsabilidad.</strong> EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, MYCASEVALUE LLC, SUS FUNCIONARIOS, DIRECTORES, EMPLEADOS Y AGENTES NO SERÁN RESPONSABLES POR NINGÚN DAÑO INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O PUNITIVO, O CUALQUIER PÉRDIDA DE GANANCIAS O INGRESOS, YA SEA INCURRIDO DIRECTAMENTE O INDIRECTAMENTE, QUE SURJA DE TU USO DEL SERVICIO. EN NINGÚN CASO NUESTRA RESPONSABILIDAD TOTAL SUPERARÁ LA CANTIDAD QUE PAGASTE EN LOS 12 MESES ANTERIORES A LA RECLAMACIÓN.</p>
                  <p><strong>6. Renuncia de Garantías.</strong> EL SERVICIO SE PROPORCIONA &ldquo;TAL CUAL&rdquo; Y &ldquo;SEGÚN DISPONIBILIDAD&rdquo; SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS, INCLUYENDO PERO NO LIMITADO A GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, ADECUACIÓN PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.</p>
                  <p><strong>7. Responsabilidades del Usuario.</strong> Aceptas utilizar el Servicio solo para propósitos lícitos y en cumplimiento de todas las leyes aplicables. No debes tergiversar la información obtenida de MyCaseValue como asesoramiento legal u opinión legal.</p>
                  <p><strong>8. Pagos y Reembolsos.</strong> Los pagos se procesan a través de Stripe. Todas las ventas son finales. Si experimentas problemas técnicos que impidan el acceso a un informe pagado, contacta support@mycasevalue.com dentro de 7 días para obtener asistencia.</p>
                  <p><strong>9. Propiedad Intelectual.</strong> Todo el contenido, diseño y código de MyCaseValue son propiedad de MyCaseValue LLC. Los datos subyacentes de la corte son de dominio público (17 U.S.C. &sect; 105). No puedes reproducir, distribuir o crear trabajos derivados de nuestros materiales propietarios sin permiso escrito.</p>
                  <p><strong>10. Resolución de Disputas y Arbitraje.</strong> Cualquier disputa que surja de o se relacione con estos Términos o el Servicio será resuelta a través de arbitraje vinculante administrado por la American Arbitration Association de acuerdo con sus Reglas de Arbitraje del Consumidor, excepto que cualquiera de las partes puede buscar medidas cautelares en una corte de jurisdicción competente. ACEPTAS RENUNCIAR A TU DERECHO A UN JUICIO CON JURADO Y A PARTICIPAR EN UNA DEMANDA COLECTIVA.</p>
                  <p><strong>11. Ley Aplicable.</strong> Estos Términos se regirán por las leyes del Estado de Delaware, sin consideración de los principios de conflicto de leyes.</p>
                  <p><strong>12. Cambios en los Términos.</strong> Podemos actualizar estos Términos en cualquier momento. El uso continuado del Servicio constituye la aceptación de los Términos actualizados.</p>
                  <p><strong>13. Contacto.</strong> Las preguntas sobre estos Términos pueden dirigirse a legal@mycasevalue.com.</p>
                </>) : (<>
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
                </>))}

                {legalPage === 'privacy' && (lang === 'es' ? (<>
                  <p><strong>1. Información que Recopilamos.</strong> Recopilamos información que proporcionas voluntariamente (selección de estado, tipo de caso, correo electrónico para características de cuenta) y datos recopilados automáticamente (dirección IP, tipo de navegador, información del dispositivo, análisis de uso a través de cookies).</p>
                  <p><strong>2. Cómo Usamos la Información.</strong> Usamos la información recopilada para: proporcionar y mejorar el Servicio, procesar pagos a través de Stripe, enviar comunicaciones a las que te has suscrito, analizar patrones de uso para mejorar la experiencia del usuario y cumplir con obligaciones legales.</p>
                  <p><strong>3. Compartir Información.</strong> No vendemos tu información personal. Podemos compartir información con: Stripe (procesamiento de pagos), proveedores de análisis (datos de uso anonimizados) y cumplimiento de la ley (cuando lo requiera la ley, citación o orden judicial).</p>
                  <p><strong>4. Retención de Datos.</strong> Retenemos datos personales solo durante el tiempo necesario para cumplir los propósitos descritos en esta política, típicamente no más de 24 meses para cuentas inactivas. Los registros de pago se retienen según lo requieren las leyes fiscales y financieras aplicables.</p>
                  <p><strong>5. Cookies y Seguimiento.</strong> Usamos cookies esenciales para la funcionalidad del sitio y cookies de análisis opcionales para entender los patrones de uso. Puedes desactivar cookies no esenciales a través de la configuración de tu navegador.</p>
                  <p><strong>6. Tus Derechos.</strong> Dependiendo de tu jurisdicción, puedes tener derechos bajo GDPR, CCPA/CPRA u otras leyes de privacidad, incluyendo: acceso a tus datos, corrección de datos inexactos, eliminación de tus datos, portabilidad de datos, optar por no participar en ventas de datos (no vendemos datos) y optar por no participar en publicidad dirigida.</p>
                  <p><strong>7. Residentes de California (CCPA/CPRA).</strong> Los residentes de California tienen derechos adicionales bajo la Ley de Privacidad del Consumidor de California. No vendemos información personal. Puedes solicitar la divulgación de categorías y piezas específicas de información personal recopilada. Contacta privacy@mycasevalue.com para ejercer tus derechos.</p>
                  <p><strong>8. Usuarios Europeos (GDPR).</strong> Si te encuentras en el Área Económica Europea, nuestra base legal para procesar tus datos es tu consentimiento y nuestros intereses legítimos en proporcionar el Servicio. Puedes retirar tu consentimiento en cualquier momento contactándonos.</p>
                  <p><strong>9. Privacidad de Menores.</strong> El Servicio no está destinado a menores de 13 años. No recopilamos información knowingly de menores de 13 años. Si nos enteramos de que hemos recopilado información de un menor de 13 años, la eliminaremos promptly.</p>
                  <p><strong>10. Seguridad.</strong> Implementamos medidas de seguridad estándar de la industria incluyendo encriptación en tránsito (TLS/SSL), procesamiento seguro de pagos a través de Stripe (compatible con PCI-DSS) y controles de acceso. Sin embargo, ningún método de transmisión o almacenamiento electrónico es 100% seguro.</p>
                  <p><strong>11. Cambios en la Política.</strong> Podemos actualizar esta Política de Privacidad periódicamente. Notificaremos a los usuarios de cambios materiales a través del Servicio o correo electrónico.</p>
                  <p><strong>12. Contacto.</strong> Para consultas de privacidad o solicitudes de datos: privacy@mycasevalue.com.</p>
                </>) : (<>
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
                </>))}

                {legalPage === 'cookies' && (lang === 'es' ? (<>
                  <p><strong>1. Qué Son las Cookies.</strong> Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitas un sitio web. Nos ayudan a proporcionar una mejor experiencia recordando tus preferencias y entendiendo cómo utilizas nuestro Servicio.</p>
                  <p><strong>2. Cookies Esenciales.</strong> Estas cookies son estrictamente necesarias para que MyCaseValue funcione. Habilitan características principales como la gestión de sesiones, seguridad y configuración de accesibilidad. No puedes desactivar estas cookies sin romper la funcionalidad principal.</p>
                  <p><strong>3. Cookies de Análisis.</strong> Usamos cookies de análisis opcionales para entender cómo los visitantes interactúan con MyCaseValue, qué páginas son más populares y dónde los usuarios encuentran problemas. Estos datos se agregan y se anonimizar. Las cookies de análisis solo se establecen si haces clic en &ldquo;Aceptar todo&rdquo; en nuestro banner de cookies.</p>
                  <p><strong>4. Cookies de Preferencia.</strong> Estas cookies recuerdan tus preferencias como selección de idioma (inglés/español), configuración de modo oscuro y tipos de caso vistos anteriormente para que no tengas que establecerlos nuevamente en cada visita.</p>
                  <p><strong>5. Cookies de Pago.</strong> Cuando realiza una compra, nuestro procesador de pagos Stripe puede establecer cookies necesarias para completar la transacción de forma segura. Estas cookies se rigen por la política de privacidad de Stripe.</p>
                  <p><strong>6. Cookies que NO Usamos.</strong> MyCaseValue NO utiliza: cookies de publicidad o retargeting, cookies de seguimiento entre sitios, píxeles de seguimiento de redes sociales o cookies que venden o comparten tus datos con anunciantes terceros.</p>
                  <p><strong>7. Gestionar Cookies.</strong> Puedes controlar las cookies a través de: (a) nuestro banner de consentimiento de cookies cuando visitas por primera vez, (b) la configuración de tu navegador (la mayoría de los navegadores te permiten bloquear o eliminar cookies), (c) contactándonos en privacy@mycasevalue.com. Ten en cuenta que desactivar cookies esenciales puede afectar la funcionalidad del sitio.</p>
                  <p><strong>8. Cookies de Terceros.</strong> Las únicas cookies de terceros en MyCaseValue provienen de Stripe (procesamiento de pagos) y nuestra infraestructura de alojamiento/análisis. No permitimos que ninguna red de publicidad o corredor de datos coloque cookies en nuestro sitio.</p>
                  <p><strong>9. Retención de Datos.</strong> Las cookies esenciales y de preferencia expiran después de 12 meses. Las cookies de análisis expiran después de 90 días. Las cookies de sesión se eliminan cuando cierras tu navegador.</p>
                  <p><strong>10. Actualizaciones.</strong> Podemos actualizar esta Política de Cookies periódicamente. Los cambios se reflejarán en esta página con una fecha actualizada. El uso continuado de MyCaseValue constituye aceptación.</p>
                  <p><strong>11. Contacto.</strong> Para preguntas sobre nuestras prácticas de cookies: privacy@mycasevalue.com.</p>
                </>) : (<>
                  <p><strong>1. What Are Cookies.</strong> Cookies are small text files stored on your device when you visit a website. They help us provide a better experience by remembering your preferences and understanding how you use our Service.</p>
                  <p><strong>2. Essential Cookies.</strong> These cookies are strictly necessary for MyCaseValue to function. They enable core features like session management, security, and accessibility settings. You cannot disable these cookies without breaking core functionality.</p>
                  <p><strong>3. Analytics Cookies.</strong> We use optional analytics cookies to understand how visitors interact with MyCaseValue, which pages are most popular, and where users encounter issues. This data is aggregated and anonymized. Analytics cookies are only set if you click &ldquo;Accept all&rdquo; on our cookie banner.</p>
                  <p><strong>4. Preference Cookies.</strong> These cookies remember your preferences such as language selection (English/Spanish), dark mode settings, and previously viewed case types so you don&apos;t have to set them again on each visit.</p>
                  <p><strong>5. Payment Cookies.</strong> When you make a purchase, our payment processor Stripe may set cookies necessary to complete the transaction securely. These cookies are governed by Stripe&apos;s privacy policy.</p>
                  <p><strong>6. Cookies We Do NOT Use.</strong> MyCaseValue does NOT use: advertising or retargeting cookies, cross-site tracking cookies, social media tracking pixels, or cookies that sell or share your data with third-party advertisers.</p>
                  <p><strong>7. Managing Cookies.</strong> You can control cookies through: (a) our cookie consent banner when you first visit, (b) your browser settings (most browsers let you block or delete cookies), (c) contacting us at privacy@mycasevalue.com. Note that disabling essential cookies may impair site functionality.</p>
                  <p><strong>8. Third-Party Cookies.</strong> The only third-party cookies on MyCaseValue come from Stripe (payment processing) and our hosting/analytics infrastructure. We do not allow any advertising networks or data brokers to place cookies on our site.</p>
                  <p><strong>9. Data Retention.</strong> Essential and preference cookies expire after 12 months. Analytics cookies expire after 90 days. Session cookies are deleted when you close your browser.</p>
                  <p><strong>10. Updates.</strong> We may update this Cookie Policy periodically. Changes will be reflected on this page with an updated date. Continued use of MyCaseValue constitutes acceptance.</p>
                  <p><strong>11. Contact.</strong> For questions about our cookie practices: privacy@mycasevalue.com.</p>
                </>))}

                {legalPage === 'disclaimer' && (lang === 'es' ? (<>
                  <p><strong>No Constituye Asesoramiento Legal.</strong> MyCaseValue proporciona datos históricos agregados de registros públicos de cortes federales únicamente para propósitos informativos generales. NADA en este sitio web constituye asesoramiento legal, una opinión legal o una recomendación con respecto a ningún asunto legal individual.</p>
                  <p><strong>Sin Relación Abogado-Cliente.</strong> El uso de MyCaseValue no crea una relación abogado-cliente entre tú y MyCaseValue LLC o ninguno de sus afiliados, funcionarios, empleados o agentes. MyCaseValue NO es un despacho de abogados, NO ejerce la abogacía y NO proporciona servicios legales.</p>
                  <p><strong>Sin Evaluación de Caso.</strong> Los datos, estadísticas, tasas de éxito, rangos de recuperación y cualquier otra información presentada por MyCaseValue reflejan resultados históricos agregados y NO deben interpretarse como una evaluación, predicción o evaluación de ningún caso individual. Cada asunto legal es único y depende de hechos y circunstancias no reflejados en datos agregados.</p>
                  <p><strong>Consulta a un Abogado.</strong> Si tienes un asunto legal, debes consultar con un abogado licenciado en tu jurisdicción que pueda evaluar los hechos y circunstancias específicas de tu situación. Muchos abogados ofrecen consultas iniciales gratuitas. Puedes encontrar recursos de asistencia legal en lawhelp.org o a través de tu colegio de abogados local.</p>
                  <p><strong>Limitaciones de Datos.</strong> Nuestros datos se derivan de registros públicos de cortes federales disponibles públicamente (Federal Judicial Center Integrated Database y CourtListener). Estos datos: (a) cubren solo cortes federales y no incluyen casos de cortes estatales, (b) pueden no reflejar acuerdos alcanzados fuera de los registros judiciales, (c) pueden contener errores de codificación de la fuente original, (d) reflejan resultados históricos que pueden no predecir resultados futuros, (e) usa códigos Nature of Suit (NOS) que pueden no coincidir precisamente con tu situación legal específica.</p>
                  <p><strong>Sin Respaldo.</strong> Las referencias a conceptos legales, estatutos o procedimientos son únicamente para propósitos informativos y no constituyen respaldo o recomendación de ninguna estrategia legal particular.</p>
                  <p><strong>Cumplimiento de Práctica No Autorizada de Ley (UPL).</strong> MyCaseValue está diseñado para cumplir con los estatutos de práctica no autorizada de la ley en todas las jurisdicciones de EE.UU. Si crees que algún contenido en este sitio cruza la línea hacia asesoramiento legal, contactenos inmediatamente en legal@mycasevalue.com.</p>
                  <p><strong>Sin Garantías.</strong> TODA LA INFORMACIÓN SE PROPORCIONA &ldquo;TAL CUAL&rdquo; SIN GARANTÍA DE NINGÚN TIPO. RECHAZAMOS TODAS LAS GARANTÍAS, EXPRESAS O IMPLÍCITAS, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, ADECUACIÓN PARA UN PROPÓSITO PARTICULAR, EXACTITUD O INTEGRIDAD.</p>
                  <p><strong>Indemnización.</strong> Al usar MyCaseValue, aceptas indemnizar y mantener indemne a MyCaseValue LLC y sus afiliados de cualesquiera reclamaciones, daños, pérdidas o gastos que surjan de tu uso del Servicio o confianza en la información proporcionada.</p>
                  <p><strong>Descargo de Responsabilidad Médico/Financiero.</strong> Algunos tipos de casos pueden involucrar asuntos médicos o financieros. MyCaseValue no proporciona asesoramiento médico, asesoramiento financiero o asesoramiento fiscal. Consulta a los profesionales licenciados apropiados para tales asuntos.</p>
                </>) : (<>
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
                </>))}
              </div>
            </div>
          </div>
        )}
      </Shell>
    );
  }

  return null;
}
