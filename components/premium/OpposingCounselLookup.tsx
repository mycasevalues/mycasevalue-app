'use client';

import React, { useState } from 'react';

interface OpposingCounselLookupProps {
  lang?: 'en' | 'es';
  isPremium?: boolean;
  onUpgrade?: () => void;
}

/* Sample data structure for opposing counsel analysis */
interface CounselProfile {
  name: string;
  firm: string;
  cases: number;
  winRate: number;
  settlementRate: number;
  avgSettlementMonths: number;
  topCaseTypes: string[];
  recentActivity: string;
}

const SAMPLE_PROFILES: CounselProfile[] = [
  {
    name: 'Sample Attorney Profile',
    firm: 'Example Defense Firm LLP',
    cases: 247,
    winRate: 38,
    settlementRate: 55,
    avgSettlementMonths: 7.2,
    topCaseTypes: ['Employment', 'Civil Rights', 'Contract'],
    recentActivity: '12 cases filed in last 6 months',
  },
];

export default function OpposingCounselLookup({ lang = 'en', isPremium = false, onUpgrade }: OpposingCounselLookupProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const t = lang === 'es' ? {
    label: 'INTELIGENCIA LEGAL',
    title: 'Análisis de Abogado Contrario',
    sub: 'Busque el historial de litigios y patrones de acuerdos de la contraparte',
    placeholder: 'Buscar por nombre de abogado o bufete...',
    search: 'Buscar',
    cases: 'Casos',
    winRate: 'Tasa de Éxito',
    settleRate: 'Tasa de Acuerdo',
    avgTime: 'Tiempo Prom. de Acuerdo',
    topTypes: 'Principales Tipos de Caso',
    recent: 'Actividad Reciente',
    comingSoon: 'Próximamente — Búsqueda en vivo de registros judiciales federales',
    disclaimer: 'Solo con fines informativos. Los datos provienen de registros judiciales públicos.',
    locked: 'Función Premium',
    unlockMsg: 'Desbloquee inteligencia sobre abogados contrarios',
    upgrade: 'Actualizar para Acceder',
    months: 'meses',
  } : {
    label: 'LEGAL INTELLIGENCE',
    title: 'Opposing Counsel Analysis',
    sub: 'Look up opposing counsel\'s litigation history and settlement patterns',
    placeholder: 'Search by attorney name or firm...',
    search: 'Search',
    cases: 'Cases',
    winRate: 'Win Rate',
    settleRate: 'Settlement Rate',
    avgTime: 'Avg Settlement Time',
    topTypes: 'Top Case Types',
    recent: 'Recent Activity',
    comingSoon: 'Coming Soon — Live federal court record search',
    disclaimer: 'For informational purposes only. Data sourced from public court records.',
    locked: 'Premium Feature',
    unlockMsg: 'Unlock opposing counsel intelligence',
    upgrade: 'Upgrade to Access',
    months: 'months',
  };

  if (!isPremium) {
    return (
      <div
        className="rounded-xl p-8 text-center relative overflow-hidden"
        style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.2)' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.03) 0%, rgba(13,148,136,0.03) 100%)' }} />
        <div className="relative">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5" className="mx-auto mb-3" strokeLinecap="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#6366F1' }}>{t.locked}</p>
          <h3 className="text-base font-bold mb-2" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>
          <p className="text-[12px] mb-4" style={{ color: 'var(--fg-muted)' }}>{t.unlockMsg}</p>
          <button
            onClick={onUpgrade}
            className="px-5 py-2 rounded-lg font-semibold text-[12px] text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
          >
            {t.upgrade}
          </button>
        </div>
      </div>
    );
  }

  const profile = SAMPLE_PROFILES[0];

  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
      <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#6366F1' }}>{t.label}</p>
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>
      <p className="text-[12px] mb-4" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Search bar */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t.placeholder}
          aria-label={lang === 'es' ? 'Buscar abogado contrario' : 'Search opposing counsel'}
          className="flex-1 rounded-lg px-3 py-2.5 text-[13px]"
          style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-default)', color: 'var(--fg-primary)', outline: 'none' }}
        />
        <button
          className="px-4 py-2.5 rounded-lg font-semibold text-[12px] text-white"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
        >
          {t.search}
        </button>
      </div>

      {/* Coming Soon Notice */}
      <div className="rounded-lg px-4 py-3 mb-4 text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <span className="text-[12px] font-medium" style={{ color: '#A5B4FC' }}>{t.comingSoon}</span>
      </div>

      {/* Sample Profile Preview */}
      <div className="rounded-lg p-4" style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /></svg>
          </div>
          <div>
            <div className="text-[13px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{profile.name}</div>
            <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>{profile.firm}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {[
            { label: t.cases, value: profile.cases.toString(), color: 'var(--fg-primary)' },
            { label: t.winRate, value: `${profile.winRate}%`, color: '#10B981' },
            { label: t.settleRate, value: `${profile.settlementRate}%`, color: '#F59E0B' },
            { label: t.avgTime, value: `${profile.avgSettlementMonths} ${t.months}`, color: '#6366F1' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[18px] font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-[11px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{t.topTypes}</div>
        <div className="flex gap-1.5 mb-2">
          {profile.topCaseTypes.map((ct, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(99,102,241,0.1)', color: '#A5B4FC' }}>
              {ct}
            </span>
          ))}
        </div>
        <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>{t.recent}: {profile.recentActivity}</div>
      </div>

      <p className="text-[10px] mt-4 leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
    </div>
  );
}
