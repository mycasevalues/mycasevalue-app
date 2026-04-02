'use client';

import React, { useState, useMemo } from 'react';
import { VERIFIED_VERDICTS, VerifiedVerdict } from '../../lib/verified-stats';

interface ComparableCaseFinderProps {
  lang?: 'en' | 'es';
}

type SortKey = 'amount' | 'year' | 'caseType' | 'district';

function fmtAmount(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

const OUTCOME_COLORS: Record<string, string> = {
  'Jury Verdict': '#10B981',
  'Bench Verdict': '#0D9488',
  'Settlement': '#F59E0B',
  'Class Settlement': '#6366F1',
};

export default function ComparableCaseFinder({ lang = 'en' }: ComparableCaseFinderProps) {
  const [sortKey, setSortKey] = useState<SortKey>('amount');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const t = lang === 'es' ? {
    badge: 'CASOS COMPARABLES',
    title: 'Buscador de Veredictos y Acuerdos',
    sub: 'Resultados verificados de registros judiciales federales publicos',
    caseName: 'Caso',
    district: 'Distrito',
    amount: 'Monto',
    type: 'Tipo',
    outcome: 'Resultado',
    year: 'Año',
    source: 'Fuente',
    allTypes: 'Todos los tipos',
    sortBy: 'Ordenar por:',
    disclaimer: 'Todos los veredictos verificados de registros publicos. No es asesoria legal.',
    viewSource: 'Ver fuente',
  } : {
    badge: 'COMPARABLE CASES',
    title: 'Verdict & Settlement Finder',
    sub: 'Verified outcomes from public federal court records',
    caseName: 'Case',
    district: 'District',
    amount: 'Amount',
    type: 'Type',
    outcome: 'Outcome',
    year: 'Year',
    source: 'Source',
    allTypes: 'All types',
    sortBy: 'Sort by:',
    disclaimer: 'All verdicts verified from public records. Not legal advice.',
    viewSource: 'View source',
  };

  // Get unique case types
  const caseTypes = useMemo(() => {
    const types = new Set<string>();
    VERIFIED_VERDICTS.forEach(v => types.add(v.caseType));
    return Array.from(types).sort();
  }, []);

  // Filter and sort
  const sorted = useMemo(() => {
    let list = [...VERIFIED_VERDICTS];
    if (filterType !== 'all') list = list.filter(v => v.caseType === filterType);
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'amount': cmp = a.amount - b.amount; break;
        case 'year': cmp = a.year - b.year; break;
        case 'caseType': cmp = a.caseType.localeCompare(b.caseType); break;
        case 'district': cmp = a.district.localeCompare(b.district); break;
      }
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [sortKey, sortAsc, filterType]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  }

  const SortIcon = ({ active, asc }: { active: boolean; asc: boolean }) => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? '#6366F1' : '#8B95A5'} strokeWidth="2.5" style={{ display: 'inline-block', marginLeft: 2 }}>
      <path d={asc ? 'M12 19V5M5 12l7-7 7 7' : 'M12 5v14M5 12l7 7 7-7'} />
    </svg>
  );

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          aria-label={lang === 'es' ? 'Filtrar por tipo de caso' : 'Filter by case type'}
          className="rounded-lg px-3 py-2 text-[12px]"
          style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-default)', color: 'var(--fg-primary)', outline: 'none' }}
        >
          <option value="all">{t.allTypes}</option>
          {caseTypes.map(ct => <option key={ct} value={ct}>{ct}</option>)}
        </select>
        <span className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>
          {sorted.length} {lang === 'es' ? 'resultados' : 'results'}
        </span>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-default)' }}>
        <table className="w-full text-[12px]" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(15,23,42,0.6)' }}>
              <th className="text-left px-3 py-2.5 font-semibold" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }}>{t.caseName}</th>
              <th className="text-left px-3 py-2.5 font-semibold cursor-pointer select-none" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }} onClick={() => toggleSort('district')}>
                {t.district} <SortIcon active={sortKey === 'district'} asc={sortAsc} />
              </th>
              <th className="text-left px-3 py-2.5 font-semibold cursor-pointer select-none" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }} onClick={() => toggleSort('caseType')}>
                {t.type} <SortIcon active={sortKey === 'caseType'} asc={sortAsc} />
              </th>
              <th className="text-right px-3 py-2.5 font-semibold cursor-pointer select-none" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }} onClick={() => toggleSort('amount')}>
                {t.amount} <SortIcon active={sortKey === 'amount'} asc={sortAsc} />
              </th>
              <th className="text-left px-3 py-2.5 font-semibold" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }}>{t.outcome}</th>
              <th className="text-center px-3 py-2.5 font-semibold cursor-pointer select-none" style={{ color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border-default)' }} onClick={() => toggleSort('year')}>
                {t.year} <SortIcon active={sortKey === 'year'} asc={sortAsc} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v, i) => (
              <tr key={i} className="transition-colors" style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(15,23,42,0.3)' }}>
                <td className="px-3 py-2.5" style={{ color: 'var(--fg-primary)', borderBottom: '1px solid var(--border-default)' }}>
                  <div className="font-semibold">{v.caseName}</div>
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{v.source}</div>
                </td>
                <td className="px-3 py-2.5 font-mono text-[11px]" style={{ color: 'var(--fg-muted)', borderBottom: '1px solid var(--border-default)' }}>{v.district}</td>
                <td className="px-3 py-2.5" style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(99,102,241,0.1)', color: '#A5B4FC' }}>
                    {v.caseType}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-mono font-bold" style={{ color: '#10B981', borderBottom: '1px solid var(--border-default)' }}>
                  {fmtAmount(v.amount)}
                </td>
                <td className="px-3 py-2.5" style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: (OUTCOME_COLORS[v.outcome] || '#8B95A5') + '15', color: OUTCOME_COLORS[v.outcome] || '#8B95A5' }}>
                    {v.outcome}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center font-mono" style={{ color: 'var(--fg-muted)', borderBottom: '1px solid var(--border-default)' }}>{v.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {sorted.map((v, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid var(--border-default)' }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[13px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{v.caseName}</div>
                <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{v.district} &middot; {v.year}</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-bold font-mono" style={{ color: '#10B981' }}>{fmtAmount(v.amount)}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(99,102,241,0.1)', color: '#A5B4FC' }}>{v.caseType}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: (OUTCOME_COLORS[v.outcome] || '#8B95A5') + '15', color: OUTCOME_COLORS[v.outcome] || '#8B95A5' }}>{v.outcome}</span>
            </div>
            <div className="text-[9px] mt-2" style={{ color: 'var(--fg-subtle)' }}>{t.source}: {v.source}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
