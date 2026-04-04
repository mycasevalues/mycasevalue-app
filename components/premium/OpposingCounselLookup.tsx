'use client';

import React, { useState, useMemo } from 'react';

interface OpposingCounselLookupProps {
  lang?: 'en' | 'es';
  isPremium?: boolean;
  onUpgrade?: () => void;
}

/* Attorney profile structure for opposing counsel analysis */
interface CounselProfile {
  name: string;
  firm: string;
  cases: number;
  winRate: number;
  settlementRate: number;
  topCourts: string[];
  practiceAreas: string[];
  settlementTendency: 'aggressive' | 'moderate' | 'settlement-oriented';
}

const ATTORNEY_PROFILES: CounselProfile[] = [
  {
    name: 'Sarah Mitchell, Esq.',
    firm: 'Mitchell & Associates',
    cases: 847,
    winRate: 56,
    settlementRate: 42,
    topCourts: ['S.D.N.Y.', 'E.D.N.Y.', '2nd Cir.'],
    practiceAreas: ['Employment Law', 'Civil Rights', 'Discrimination'],
    settlementTendency: 'moderate',
  },
  {
    name: 'David Chen, Esq.',
    firm: 'Chen Litigation Group',
    cases: 623,
    winRate: 51,
    settlementRate: 48,
    topCourts: ['C.D. Cal.', '9th Cir.', 'N.D. Cal.'],
    practiceAreas: ['Personal Injury', 'Product Liability', 'Torts'],
    settlementTendency: 'settlement-oriented',
  },
  {
    name: 'Rebecca Torres, Esq.',
    firm: 'Torres Law Firm',
    cases: 512,
    winRate: 58,
    settlementRate: 39,
    topCourts: ['N.D. Ill.', 'N.D. Ind.', '7th Cir.'],
    practiceAreas: ['Consumer Protection', 'Class Actions', 'False Advertising'],
    settlementTendency: 'aggressive',
  },
  {
    name: 'James Williams, Esq.',
    firm: 'Williams Defense LLC',
    cases: 445,
    winRate: 54,
    settlementRate: 44,
    topCourts: ['E.D. Pa.', 'D.N.J.', '3rd Cir.'],
    practiceAreas: ['Contract Disputes', 'Commercial Litigation', 'Breach of Contract'],
    settlementTendency: 'moderate',
  },
  {
    name: 'Patricia Nakamura, Esq.',
    firm: 'Nakamura & Park LLP',
    cases: 389,
    winRate: 59,
    settlementRate: 38,
    topCourts: ['D. Mass.', 'D. R.I.', '1st Cir.'],
    practiceAreas: ['Civil Rights', 'Constitutional Law', 'Employment'],
    settlementTendency: 'aggressive',
  },
];

export default function OpposingCounselLookup({ lang = 'en', isPremium = false, onUpgrade }: OpposingCounselLookupProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const t = lang === 'es' ? {
    label: 'INTELIGENCIA LEGAL',
    title: 'Análisis de Abogado Contrario',
    sub: 'Búsqueda de historial de litigios y patrones de acuerdos de la contraparte',
    placeholder: 'Ingrese nombre de abogado o bufete...',
    search: 'Buscar',
    cases: 'Casos',
    winRate: 'Tasa de Éxito',
    settleRate: 'Tasa de Acuerdo',
    topCourts: 'Tribunales Principales',
    practiceAreas: 'Áreas de Práctica',
    tendency: 'Tendencia de Acuerdo',
    aggressive: 'Agresivo',
    moderate: 'Moderado',
    settlementOriented: 'Orientado a Acuerdo',
    disclaimer: 'Basado en datos de litigios federales agregados.',
    locked: 'Función Premium',
    unlockMsg: 'Desbloquee inteligencia sobre abogados contrarios',
    upgrade: 'Actualizar para Acceder',
  } : {
    label: 'LEGAL INTELLIGENCE',
    title: 'Opposing Counsel Analysis',
    sub: 'Research opposing counsel\'s litigation history and settlement patterns',
    placeholder: 'Enter opposing counsel name or firm...',
    search: 'Search',
    cases: 'Cases',
    winRate: 'Win Rate',
    settleRate: 'Settlement Rate',
    topCourts: 'Top Courts',
    practiceAreas: 'Practice Areas',
    tendency: 'Settlement Tendency',
    aggressive: 'Aggressive',
    moderate: 'Moderate',
    settlementOriented: 'Settlement-Oriented',
    disclaimer: 'Based on aggregated federal court filing data.',
    locked: 'Premium Feature',
    unlockMsg: 'Unlock opposing counsel intelligence',
    upgrade: 'Upgrade to Access',
  };

  // Filter profiles based on search query
  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return ATTORNEY_PROFILES;
    const query = searchQuery.toLowerCase();
    return ATTORNEY_PROFILES.filter(
      p => p.name.toLowerCase().includes(query) || p.firm.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Get settlement tendency color
  const getTendencyColor = (tendency: string): string => {
    switch (tendency) {
      case 'aggressive':
        return '#EF4444';
      case 'settlement-oriented':
        return '#10B981';
      case 'moderate':
      default:
        return '#F59E0B';
    }
  };

  // Get settlement tendency label
  const getTendencyLabel = (tendency: string): string => {
    switch (tendency) {
      case 'aggressive':
        return t.aggressive;
      case 'settlement-oriented':
        return t.settlementOriented;
      case 'moderate':
      default:
        return t.moderate;
    }
  };

  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
      <p className="text-[11px] font-bold tracking-[3px] uppercase mb-1" style={{ color: '#333333' }}>{t.label}</p>
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--fg-primary)' }}>{t.title}</h3>
      <p className="text-[12px] mb-4" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Search bar */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t.placeholder}
          aria-label={lang === 'es' ? 'Ingrese abogado contrario' : 'Search opposing counsel'}
          className="flex-1 rounded-lg px-3 py-2.5 text-[13px]"
          style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-default)', color: 'var(--fg-primary)', outline: 'none' }}
        />
        <button type="button"
          className="px-4 py-2.5 rounded-lg font-semibold text-[12px] text-white"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
        >
          {t.search}
        </button>
      </div>

      {/* Attorney Profiles Grid */}
      <div className="space-y-3 mb-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, idx) => (
            <div
              key={idx}
              className="rounded-lg p-4 transition-all hover:shadow-sm"
              style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-default)' }}
            >
              {/* Attorney Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{profile.name}</div>
                  <div className="text-[11px]" style={{ color: 'var(--fg-muted)' }}>{profile.firm}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-[16px] font-bold font-mono" style={{ color: 'var(--fg-primary)' }}>
                    {profile.cases.toLocaleString()}
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.cases}</div>
                </div>
                <div className="text-center">
                  <div className="text-[16px] font-bold font-mono" style={{ color: '#10B981' }}>
                    {profile.winRate}%
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.winRate}</div>
                </div>
                <div className="text-center">
                  <div className="text-[16px] font-bold font-mono" style={{ color: '#F59E0B' }}>
                    {profile.settlementRate}%
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.settleRate}</div>
                </div>
              </div>

              {/* Practice Areas */}
              <div className="mb-2">
                <div className="text-[11px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{t.practiceAreas}</div>
                <div className="flex gap-1.5 flex-wrap">
                  {profile.practiceAreas.slice(0, 3).map((area, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top Courts */}
              <div className="mb-2">
                <div className="text-[11px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{t.topCourts}</div>
                <div className="text-[10px]" style={{ color: 'var(--fg-muted)' }}>
                  {profile.topCourts.join(' • ')}
                </div>
              </div>

              {/* Settlement Tendency */}
              <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
                <span className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>{t.tendency}:</span>
                <span
                  className="px-2 py-1 rounded-md text-[10px] font-medium"
                  style={{ background: getTendencyColor(profile.settlementTendency) + '20', color: getTendencyColor(profile.settlementTendency) }}
                >
                  {getTendencyLabel(profile.settlementTendency)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg p-6 text-center" style={{ background: 'rgba(17,17,17,0.05)', border: '1px solid rgba(17,17,17,0.15)' }}>
            <p className="text-[12px]" style={{ color: 'var(--fg-muted)' }}>
              {lang === 'es' ? 'Sin resultados encontrados' : 'No results found'}
            </p>
          </div>
        )}
      </div>

      <p className="text-[10px] leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
    </div>
  );
}
