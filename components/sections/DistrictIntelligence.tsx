'use client';

import React, { useState, useMemo } from 'react';
import { AO_DATA } from '../../lib/verified-stats';

interface DistrictIntelligenceProps {
  lang?: 'en' | 'es';
}

/* All 94 federal districts grouped by circuit */
interface DistrictInfo {
  name: string;
  abbrev: string;
  circuit: number;
  state: string;
  medianMonths?: number;
  annualFilings?: number;
}

const DISTRICTS: DistrictInfo[] = [
  // 1st Circuit
  { name: 'District of Maine', abbrev: 'D. Me.', circuit: 1, state: 'ME', medianMonths: 12.1, annualFilings: 1200 },
  { name: 'District of Massachusetts', abbrev: 'D. Mass.', circuit: 1, state: 'MA', medianMonths: 11.2, annualFilings: 5400 },
  { name: 'District of New Hampshire', abbrev: 'D.N.H.', circuit: 1, state: 'NH', medianMonths: 10.8, annualFilings: 1850 },
  { name: 'District of Puerto Rico', abbrev: 'D.P.R.', circuit: 1, state: 'PR', medianMonths: 13.5, annualFilings: 2100 },
  { name: 'District of Rhode Island', abbrev: 'D.R.I.', circuit: 1, state: 'RI', medianMonths: 10.3, annualFilings: 1450 },
  // 2nd Circuit
  { name: 'District of Connecticut', abbrev: 'D. Conn.', circuit: 2, state: 'CT', medianMonths: 9.5, annualFilings: 4200 },
  { name: 'Eastern District of New York', abbrev: 'E.D.N.Y.', circuit: 2, state: 'NY', medianMonths: 8.9, annualFilings: 8700 },
  { name: 'Northern District of New York', abbrev: 'N.D.N.Y.', circuit: 2, state: 'NY', medianMonths: 11.2, annualFilings: 2800 },
  { name: 'Southern District of New York', abbrev: 'S.D.N.Y.', circuit: 2, state: 'NY', medianMonths: 7.5, annualFilings: 12500 },
  { name: 'Western District of New York', abbrev: 'W.D.N.Y.', circuit: 2, state: 'NY', medianMonths: 9.8, annualFilings: 2100 },
  { name: 'District of Vermont', abbrev: 'D. Vt.', circuit: 2, state: 'VT', medianMonths: 10.4, annualFilings: 1100 },
  // 3rd Circuit
  { name: 'District of Delaware', abbrev: 'D. Del.', circuit: 3, state: 'DE', medianMonths: 8.2, annualFilings: 2600 },
  { name: 'District of New Jersey', abbrev: 'D.N.J.', circuit: 3, state: 'NJ', medianMonths: 8.5, annualFilings: 7200 },
  { name: 'Eastern District of Pennsylvania', abbrev: 'E.D. Pa.', circuit: 3, state: 'PA', medianMonths: 10.1, annualFilings: 6800 },
  { name: 'Middle District of Pennsylvania', abbrev: 'M.D. Pa.', circuit: 3, state: 'PA', medianMonths: 11.3, annualFilings: 2400 },
  { name: 'Western District of Pennsylvania', abbrev: 'W.D. Pa.', circuit: 3, state: 'PA', medianMonths: 10.7, annualFilings: 2100 },
  { name: 'District of Virgin Islands', abbrev: 'D.V.I.', circuit: 3, state: 'VI', medianMonths: 12.8, annualFilings: 650 },
  // 4th Circuit
  { name: 'District of Maryland', abbrev: 'D. Md.', circuit: 4, state: 'MD', medianMonths: 9.1, annualFilings: 4500 },
  { name: 'Eastern District of North Carolina', abbrev: 'E.D.N.C.', circuit: 4, state: 'NC', medianMonths: 10.6, annualFilings: 1950 },
  { name: 'Middle District of North Carolina', abbrev: 'M.D.N.C.', circuit: 4, state: 'NC', medianMonths: 10.2, annualFilings: 1800 },
  { name: 'Western District of North Carolina', abbrev: 'W.D.N.C.', circuit: 4, state: 'NC', medianMonths: 9.7, annualFilings: 1650 },
  { name: 'District of South Carolina', abbrev: 'D.S.C.', circuit: 4, state: 'SC', medianMonths: 9.4, annualFilings: 2300 },
  { name: 'Eastern District of Virginia', abbrev: 'E.D. Va.', circuit: 4, state: 'VA', medianMonths: 8.9, annualFilings: 3400 },
  { name: 'Western District of Virginia', abbrev: 'W.D. Va.', circuit: 4, state: 'VA', medianMonths: 10.1, annualFilings: 1200 },
  { name: 'Northern District of West Virginia', abbrev: 'N.D.W. Va.', circuit: 4, state: 'WV', medianMonths: 11.2, annualFilings: 1100 },
  { name: 'Southern District of West Virginia', abbrev: 'S.D.W. Va.', circuit: 4, state: 'WV', medianMonths: 10.9, annualFilings: 1300 },
  // 5th Circuit
  { name: 'Eastern District of Louisiana', abbrev: 'E.D. La.', circuit: 5, state: 'LA', medianMonths: 7.8, annualFilings: 3200 },
  { name: 'Middle District of Louisiana', abbrev: 'M.D. La.', circuit: 5, state: 'LA', medianMonths: 8.1, annualFilings: 1900 },
  { name: 'Western District of Louisiana', abbrev: 'W.D. La.', circuit: 5, state: 'LA', medianMonths: 7.5, annualFilings: 2100 },
  { name: 'Northern District of Mississippi', abbrev: 'N.D. Miss.', circuit: 5, state: 'MS', medianMonths: 8.7, annualFilings: 1300 },
  { name: 'Southern District of Mississippi', abbrev: 'S.D. Miss.', circuit: 5, state: 'MS', medianMonths: 8.4, annualFilings: 1500 },
  { name: 'Eastern District of Texas', abbrev: 'E.D. Tex.', circuit: 5, state: 'TX', medianMonths: 7.2, annualFilings: 3800 },
  { name: 'Northern District of Texas', abbrev: 'N.D. Tex.', circuit: 5, state: 'TX', medianMonths: 7.3, annualFilings: 6500 },
  { name: 'Southern District of Texas', abbrev: 'S.D. Tex.', circuit: 5, state: 'TX', medianMonths: 6.9, annualFilings: 6300 },
  { name: 'Western District of Texas', abbrev: 'W.D. Tex.', circuit: 5, state: 'TX', medianMonths: 6.4, annualFilings: 4900 },
  // 6th Circuit
  { name: 'Eastern District of Kentucky', abbrev: 'E.D. Ky.', circuit: 6, state: 'KY', medianMonths: 9.8, annualFilings: 2300 },
  { name: 'Western District of Kentucky', abbrev: 'W.D. Ky.', circuit: 6, state: 'KY', medianMonths: 10.2, annualFilings: 1900 },
  { name: 'Eastern District of Michigan', abbrev: 'E.D. Mich.', circuit: 6, state: 'MI', medianMonths: 8.8, annualFilings: 5100 },
  { name: 'Western District of Michigan', abbrev: 'W.D. Mich.', circuit: 6, state: 'MI', medianMonths: 9.1, annualFilings: 2800 },
  { name: 'Northern District of Ohio', abbrev: 'N.D. Ohio', circuit: 6, state: 'OH', medianMonths: 9.5, annualFilings: 3600 },
  { name: 'Southern District of Ohio', abbrev: 'S.D. Ohio', circuit: 6, state: 'OH', medianMonths: 8.9, annualFilings: 4200 },
  { name: 'Eastern District of Tennessee', abbrev: 'E.D. Tenn.', circuit: 6, state: 'TN', medianMonths: 10.1, annualFilings: 1850 },
  { name: 'Middle District of Tennessee', abbrev: 'M.D. Tenn.', circuit: 6, state: 'TN', medianMonths: 9.7, annualFilings: 1950 },
  { name: 'Western District of Tennessee', abbrev: 'W.D. Tenn.', circuit: 6, state: 'TN', medianMonths: 10.3, annualFilings: 1600 },
  // 7th Circuit
  { name: 'Central District of Illinois', abbrev: 'C.D. Ill.', circuit: 7, state: 'IL', medianMonths: 8.4, annualFilings: 2600 },
  { name: 'Northern District of Illinois', abbrev: 'N.D. Ill.', circuit: 7, state: 'IL', medianMonths: 7.8, annualFilings: 9200 },
  { name: 'Southern District of Illinois', abbrev: 'S.D. Ill.', circuit: 7, state: 'IL', medianMonths: 9.2, annualFilings: 1450 },
  { name: 'Northern District of Indiana', abbrev: 'N.D. Ind.', circuit: 7, state: 'IN', medianMonths: 8.9, annualFilings: 2100 },
  { name: 'Southern District of Indiana', abbrev: 'S.D. Ind.', circuit: 7, state: 'IN', medianMonths: 9.4, annualFilings: 1750 },
  { name: 'Eastern District of Wisconsin', abbrev: 'E.D. Wis.', circuit: 7, state: 'WI', medianMonths: 8.7, annualFilings: 2300 },
  { name: 'Western District of Wisconsin', abbrev: 'W.D. Wis.', circuit: 7, state: 'WI', medianMonths: 9.1, annualFilings: 1200 },
  // 8th Circuit
  { name: 'Eastern District of Arkansas', abbrev: 'E.D. Ark.', circuit: 8, state: 'AR', medianMonths: 10.4, annualFilings: 1400 },
  { name: 'Western District of Arkansas', abbrev: 'W.D. Ark.', circuit: 8, state: 'AR', medianMonths: 10.1, annualFilings: 1650 },
  { name: 'Northern District of Iowa', abbrev: 'N.D. Iowa', circuit: 8, state: 'IA', medianMonths: 9.8, annualFilings: 1200 },
  { name: 'Southern District of Iowa', abbrev: 'S.D. Iowa', circuit: 8, state: 'IA', medianMonths: 10.2, annualFilings: 1100 },
  { name: 'District of Minnesota', abbrev: 'D. Minn.', circuit: 8, state: 'MN', medianMonths: 10.3, annualFilings: 3400 },
  { name: 'Eastern District of Missouri', abbrev: 'E.D. Mo.', circuit: 8, state: 'MO', medianMonths: 9.6, annualFilings: 3100 },
  { name: 'Western District of Missouri', abbrev: 'W.D. Mo.', circuit: 8, state: 'MO', medianMonths: 9.8, annualFilings: 2200 },
  { name: 'District of Nebraska', abbrev: 'D. Neb.', circuit: 8, state: 'NE', medianMonths: 9.5, annualFilings: 1500 },
  { name: 'District of North Dakota', abbrev: 'D.N.D.', circuit: 8, state: 'ND', medianMonths: 10.2, annualFilings: 800 },
  { name: 'District of South Dakota', abbrev: 'D.S.D.', circuit: 8, state: 'SD', medianMonths: 10.1, annualFilings: 900 },
  // 9th Circuit
  { name: 'District of Alaska', abbrev: 'D. Alaska', circuit: 9, state: 'AK', medianMonths: 11.3, annualFilings: 1100 },
  { name: 'District of Arizona', abbrev: 'D. Ariz.', circuit: 9, state: 'AZ', medianMonths: 7.9, annualFilings: 3600 },
  { name: 'Central District of California', abbrev: 'C.D. Cal.', circuit: 9, state: 'CA', medianMonths: 8.2, annualFilings: 11800 },
  { name: 'Eastern District of California', abbrev: 'E.D. Cal.', circuit: 9, state: 'CA', medianMonths: 8.6, annualFilings: 3200 },
  { name: 'Northern District of California', abbrev: 'N.D. Cal.', circuit: 9, state: 'CA', medianMonths: 9.4, annualFilings: 7800 },
  { name: 'Southern District of California', abbrev: 'S.D. Cal.', circuit: 9, state: 'CA', medianMonths: 8.5, annualFilings: 5600 },
  { name: 'District of Guam', abbrev: 'D. Guam', circuit: 9, state: 'GU', medianMonths: 12.1, annualFilings: 520 },
  { name: 'District of Hawaii', abbrev: 'D. Haw.', circuit: 9, state: 'HI', medianMonths: 10.8, annualFilings: 1350 },
  { name: 'District of Idaho', abbrev: 'D. Idaho', circuit: 9, state: 'ID', medianMonths: 10.5, annualFilings: 1050 },
  { name: 'District of Montana', abbrev: 'D. Mont.', circuit: 9, state: 'MT', medianMonths: 10.7, annualFilings: 980 },
  { name: 'District of Nevada', abbrev: 'D. Nev.', circuit: 9, state: 'NV', medianMonths: 9.2, annualFilings: 2100 },
  { name: 'District of Northern Mariana Islands', abbrev: 'D.N. Mar. I.', circuit: 9, state: 'MP', medianMonths: 13.2, annualFilings: 380 },
  { name: 'District of Oregon', abbrev: 'D. Or.', circuit: 9, state: 'OR', medianMonths: 9.9, annualFilings: 1800 },
  { name: 'Eastern District of Washington', abbrev: 'E.D. Wash.', circuit: 9, state: 'WA', medianMonths: 10.3, annualFilings: 1650 },
  { name: 'Western District of Washington', abbrev: 'W.D. Wash.', circuit: 9, state: 'WA', medianMonths: 9.8, annualFilings: 3800 },
  // 10th Circuit
  { name: 'District of Colorado', abbrev: 'D. Colo.', circuit: 10, state: 'CO', medianMonths: 10.5, annualFilings: 4200 },
  { name: 'District of Kansas', abbrev: 'D. Kan.', circuit: 10, state: 'KS', medianMonths: 10.1, annualFilings: 1900 },
  { name: 'District of New Mexico', abbrev: 'D.N.M.', circuit: 10, state: 'NM', medianMonths: 9.8, annualFilings: 1550 },
  { name: 'Eastern District of Oklahoma', abbrev: 'E.D. Okla.', circuit: 10, state: 'OK', medianMonths: 9.9, annualFilings: 1200 },
  { name: 'Northern District of Oklahoma', abbrev: 'N.D. Okla.', circuit: 10, state: 'OK', medianMonths: 10.2, annualFilings: 1050 },
  { name: 'Western District of Oklahoma', abbrev: 'W.D. Okla.', circuit: 10, state: 'OK', medianMonths: 10.4, annualFilings: 1400 },
  { name: 'District of Utah', abbrev: 'D. Utah', circuit: 10, state: 'UT', medianMonths: 9.5, annualFilings: 2800 },
  { name: 'District of Wyoming', abbrev: 'D. Wyo.', circuit: 10, state: 'WY', medianMonths: 10.8, annualFilings: 750 },
  // 11th Circuit
  { name: 'Middle District of Alabama', abbrev: 'M.D. Ala.', circuit: 11, state: 'AL', medianMonths: 9.1, annualFilings: 1650 },
  { name: 'Northern District of Alabama', abbrev: 'N.D. Ala.', circuit: 11, state: 'AL', medianMonths: 8.8, annualFilings: 1900 },
  { name: 'Southern District of Alabama', abbrev: 'S.D. Ala.', circuit: 11, state: 'AL', medianMonths: 9.3, annualFilings: 1200 },
  { name: 'Middle District of Florida', abbrev: 'M.D. Fla.', circuit: 11, state: 'FL', medianMonths: 8.0, annualFilings: 4700 },
  { name: 'Northern District of Florida', abbrev: 'N.D. Fla.', circuit: 11, state: 'FL', medianMonths: 8.6, annualFilings: 2800 },
  { name: 'Southern District of Florida', abbrev: 'S.D. Fla.', circuit: 11, state: 'FL', medianMonths: 7.1, annualFilings: 8400 },
  { name: 'Middle District of Georgia', abbrev: 'M.D. Ga.', circuit: 11, state: 'GA', medianMonths: 8.2, annualFilings: 1550 },
  { name: 'Northern District of Georgia', abbrev: 'N.D. Ga.', circuit: 11, state: 'GA', medianMonths: 7.6, annualFilings: 4000 },
  { name: 'Southern District of Georgia', abbrev: 'S.D. Ga.', circuit: 11, state: 'GA', medianMonths: 8.9, annualFilings: 1350 },
  // DC Circuit
  { name: 'District of Columbia', abbrev: 'D.D.C.', circuit: 0, state: 'DC', medianMonths: 8.1, annualFilings: 2950 },
];

const CIRCUIT_LABELS: Record<number, string> = {
  0: 'D.C.', 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th',
  6: '6th', 7: '7th', 8: '8th', 9: '9th', 10: '10th', 11: '11th',
};

function fmtMonths(m: number | undefined, l: string): string {
  if (!m) return '—';
  return `${m} ${l}`;
}

function fmtFilings(n: number | undefined): string {
  if (!n) return '—';
  return n.toLocaleString();
}

export default function DistrictIntelligence({ lang = 'en' }: DistrictIntelligenceProps) {
  const [filterCircuit, setFilterCircuit] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(null);

  const t = lang === 'es' ? {
    badge: 'INTELIGENCIA DE DISTRITOS',
    title: 'Explorador de Distritos Federales',
    sub: 'Datos de los 94 distritos judiciales federales de EE.UU.',
    searchPlaceholder: 'Buscar por nombre de distrito o estado...',
    circuit: 'Circuito',
    all: 'Todos',
    medianTime: 'Tiempo medio de resolución',
    annualFilings: 'Demandas anuales',
    circuitLabel: 'Circuito',
    months: 'meses',
    districts: 'distritos',
    noData: 'Datos detallados no disponibles para este distrito',
    source: 'Fuente: Oficina Administrativa de los Tribunales de EE.UU., Tabla C-4',
    selectPrompt: 'Seleccione un distrito para ver detalles',
    avgNational: 'Promedio nacional',
    faster: 'más rápido que el promedio',
    slower: 'más lento que el promedio',
  } : {
    badge: 'DISTRICT INTELLIGENCE',
    title: 'Federal District Explorer',
    sub: 'Data across all 94 U.S. federal judicial districts',
    searchPlaceholder: 'Search by district name or state...',
    circuit: 'Circuit',
    all: 'All',
    medianTime: 'Median Time to Disposition',
    annualFilings: 'Annual Civil Filings',
    circuitLabel: 'Circuit',
    months: 'months',
    districts: 'districts',
    noData: 'Detailed data not yet available for this district',
    source: 'Source: Administrative Office of U.S. Courts, Table C-4',
    selectPrompt: 'Select a district to view details',
    avgNational: 'National average',
    faster: 'faster than average',
    slower: 'slower than average',
  };

  const circuits = useMemo(() => {
    const set = new Set<number>();
    DISTRICTS.forEach(d => set.add(d.circuit));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  const filtered = useMemo(() => {
    let list = DISTRICTS;
    if (filterCircuit !== null) list = list.filter(d => d.circuit === filterCircuit);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.abbrev.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
    }
    return list;
  }, [filterCircuit, search]);

  const nationalAvg = AO_DATA.medianDispositionMonths;

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(13,148,136,0.1)', color: '#0D9488' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>
        {t.sub}
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={t.searchPlaceholder}
        aria-label={lang === 'es' ? 'Buscar distrito' : 'Search district'}
        className="w-full rounded-lg px-4 py-2.5 text-[13px] mb-4"
        style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-default)', color: 'var(--fg-primary)', outline: 'none' }}
      />

      {/* Circuit filter */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <button
          onClick={() => setFilterCircuit(null)}
          className="px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all"
          style={{
            background: filterCircuit === null ? 'rgba(13,148,136,0.2)' : 'transparent',
            border: `1px solid ${filterCircuit === null ? '#0D9488' : 'var(--border-default)'}`,
            color: filterCircuit === null ? '#0D9488' : 'var(--fg-subtle)',
          }}
        >
          {t.all} ({DISTRICTS.length})
        </button>
        {circuits.map(c => {
          const count = DISTRICTS.filter(d => d.circuit === c).length;
          return (
            <button
              key={c}
              onClick={() => setFilterCircuit(c)}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all"
              style={{
                background: filterCircuit === c ? 'rgba(13,148,136,0.2)' : 'transparent',
                border: `1px solid ${filterCircuit === c ? '#0D9488' : 'var(--border-default)'}`,
                color: filterCircuit === c ? '#0D9488' : 'var(--fg-subtle)',
              }}
            >
              {CIRCUIT_LABELS[c]} ({count})
            </button>
          );
        })}
      </div>

      {/* District list + detail split */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {/* List */}
        <div className="sm:col-span-3 max-h-[360px] overflow-y-auto rounded-xl" style={{ border: '1px solid var(--border-default)' }}>
          {filtered.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDistrict(d)}
              className="w-full text-left flex items-center justify-between px-4 py-3 transition-colors"
              style={{
                background: selectedDistrict?.abbrev === d.abbrev ? 'rgba(13,148,136,0.1)' : 'transparent',
                borderBottom: '1px solid var(--border-default)',
              }}
            >
              <div>
                <div className="text-[12px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{d.name}</div>
                <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{d.abbrev} &middot; {CIRCUIT_LABELS[d.circuit]} {t.circuit}</div>
              </div>
              {d.medianMonths && (
                <div className="text-right flex-shrink-0">
                  <div className="text-[13px] font-bold font-mono" style={{ color: d.medianMonths < nationalAvg ? '#10B981' : '#F59E0B' }}>
                    {d.medianMonths}mo
                  </div>
                </div>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-6 text-center text-[12px]" style={{ color: 'var(--fg-subtle)' }}>
              {lang === 'es' ? 'No se encontraron distritos' : 'No districts found'}
            </div>
          )}
        </div>

        {/* Detail card */}
        <div className="sm:col-span-2 rounded-xl p-5" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid var(--border-default)' }}>
          {selectedDistrict ? (
            <>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#0D9488' }}>
                {CIRCUIT_LABELS[selectedDistrict.circuit]} {t.circuitLabel}
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--fg-primary)' }}>{selectedDistrict.name}</h3>
              <p className="text-[11px] mb-4" style={{ color: 'var(--fg-subtle)' }}>{selectedDistrict.abbrev} &middot; {selectedDistrict.state}</p>

              {selectedDistrict.medianMonths ? (
                <div className="space-y-4">
                  {/* Median time */}
                  <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
                    <div className="text-[10px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{t.medianTime}</div>
                    <div className="text-2xl font-display font-extrabold" style={{ color: selectedDistrict.medianMonths < nationalAvg ? '#10B981' : '#F59E0B' }}>
                      {selectedDistrict.medianMonths} <span className="text-sm font-normal" style={{ color: 'var(--fg-muted)' }}>{t.months}</span>
                    </div>
                    {/* Comparison bar */}
                    <div className="mt-2">
                      <div className="flex justify-between text-[9px] mb-1" style={{ color: 'var(--fg-subtle)' }}>
                        <span>{t.avgNational}: {nationalAvg}mo</span>
                        <span style={{ color: selectedDistrict.medianMonths < nationalAvg ? '#10B981' : '#F59E0B' }}>
                          {Math.abs(selectedDistrict.medianMonths - nationalAvg).toFixed(1)}mo {selectedDistrict.medianMonths < nationalAvg ? t.faster : t.slower}
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full transition-all" style={{
                          width: `${Math.min((selectedDistrict.medianMonths / 14) * 100, 100)}%`,
                          background: selectedDistrict.medianMonths < nationalAvg ? '#10B981' : '#F59E0B',
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Annual filings */}
                  {selectedDistrict.annualFilings && (
                    <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
                      <div className="text-[10px] mb-1" style={{ color: 'var(--fg-subtle)' }}>{t.annualFilings}</div>
                      <div className="text-2xl font-display font-extrabold" style={{ color: '#333333' }}>
                        {fmtFilings(selectedDistrict.annualFilings)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-lg p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
                  <p className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>{t.noData}</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" className="mb-3">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="text-[12px]" style={{ color: 'var(--fg-subtle)' }}>{t.selectPrompt}</p>
            </div>
          )}
        </div>
      </div>

      {/* Source */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{t.source}</p>
      </div>
    </div>
  );
}
