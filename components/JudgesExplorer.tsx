'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface JudgeProfile {
  slug: string;
  name: string;
  district: string;
  court: string;
  appointedYear: number;
  appointedBy: string;
  chiefJudge: boolean;
  seniorStatus: boolean;
  stats: {
    plaintiffWinRate: number;
    motionGrantRate: number;
    medianDurationMonths: number;
    totalCases: number;
    settlementRate: number;
  };
  topCaseTypes: { label: string; count: number; winRate: number }[];
  yearlyTrend: { year: number; cases: number; winRate: number }[];
}

type SortField = 'name' | 'winRate' | 'motionGrant' | 'settlement' | 'duration' | 'cases' | 'appointed';
type SortDir = 'asc' | 'desc';

const CIRCUIT_MAP: Record<string, string[]> = {
  '1st': ['D.Mass.', 'D.R.I.', 'D.Me.', 'D.N.H.', 'D.P.R.'],
  '2nd': ['S.D.N.Y.', 'E.D.N.Y.', 'D.Conn.', 'D.Vt.'],
  '3rd': ['E.D.Pa.', 'D.N.J.', 'D.Del.', 'W.D.Pa.'],
  '4th': ['D.Md.', 'E.D.Va.', 'W.D.N.C.', 'D.S.C.'],
  '5th': ['S.D.Tex.', 'N.D.Tex.', 'E.D.La.', 'S.D.Miss.'],
  '6th': ['N.D.Ohio', 'E.D.Mich.', 'M.D.Tenn.', 'W.D.Ky.'],
  '7th': ['N.D.Ill.', 'E.D.Wis.', 'S.D.Ind.'],
  '8th': ['D.Minn.', 'E.D.Mo.', 'E.D.Ark.', 'S.D.Iowa'],
  '9th': ['C.D.Cal.', 'N.D.Cal.', 'W.D.Wash.', 'D.Ariz.', 'D.Nev.'],
  '10th': ['D.Colo.', 'D.Utah', 'W.D.Okla.', 'D.Kan.'],
  '11th': ['S.D.Fla.', 'M.D.Fla.', 'N.D.Ga.', 'N.D.Ala.'],
  'D.C.': ['D.D.C.'],
  'Fed.': ['Fed. Cl.'],
};

function getCircuitForDistrict(district: string): string {
  for (const [circuit, districts] of Object.entries(CIRCUIT_MAP)) {
    if (districts.includes(district)) return circuit;
  }
  return 'Other';
}

const wrColor = (wr: number) => wr >= 50 ? '#07874A' : wr >= 35 ? '#D97706' : '#E8171F';

export default function JudgesExplorer({ judges }: { judges: JudgeProfile[] }) {
  const [search, setSearch] = useState('');
  const [circuitFilter, setCircuitFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'chief' | 'senior' | 'active'>('all');
  const [sortField, setSortField] = useState<SortField>('cases');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [perPage, setPerPage] = useState(24);
  const [page, setPage] = useState(1);

  // Unique districts for filter
  const allDistricts = useMemo(() => Array.from(new Set(judges.map(j => j.district))).sort(), [judges]);
  const circuits = Object.keys(CIRCUIT_MAP);

  // Districts for selected circuit
  const filteredDistricts = useMemo(() => {
    if (!circuitFilter) return allDistricts;
    return CIRCUIT_MAP[circuitFilter] || allDistricts;
  }, [circuitFilter, allDistricts]);

  // Filtered + sorted judges
  const filtered = useMemo(() => {
    let list = [...judges];

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(j =>
        j.name.toLowerCase().includes(q) ||
        j.district.toLowerCase().includes(q) ||
        j.court.toLowerCase().includes(q) ||
        j.appointedBy.toLowerCase().includes(q)
      );
    }

    // Circuit filter
    if (circuitFilter) {
      const districts = CIRCUIT_MAP[circuitFilter] || [];
      list = list.filter(j => districts.includes(j.district));
    }

    // District filter
    if (districtFilter) {
      list = list.filter(j => j.district === districtFilter);
    }

    // Status filter
    if (statusFilter === 'chief') list = list.filter(j => j.chiefJudge);
    else if (statusFilter === 'senior') list = list.filter(j => j.seniorStatus);
    else if (statusFilter === 'active') list = list.filter(j => !j.seniorStatus);

    // Sort
    const mult = sortDir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      switch (sortField) {
        case 'name': return mult * a.name.localeCompare(b.name);
        case 'winRate': return mult * (a.stats.plaintiffWinRate - b.stats.plaintiffWinRate);
        case 'motionGrant': return mult * (a.stats.motionGrantRate - b.stats.motionGrantRate);
        case 'settlement': return mult * (a.stats.settlementRate - b.stats.settlementRate);
        case 'duration': return mult * (a.stats.medianDurationMonths - b.stats.medianDurationMonths);
        case 'cases': return mult * (a.stats.totalCases - b.stats.totalCases);
        case 'appointed': return mult * (a.appointedYear - b.appointedYear);
        default: return 0;
      }
    });

    return list;
  }, [judges, search, circuitFilter, districtFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // Aggregate stats for filtered set
  const avgWR = filtered.length ? Math.round(filtered.reduce((s, j) => s + j.stats.plaintiffWinRate, 0) / filtered.length) : 0;
  const avgMGR = filtered.length ? Math.round(filtered.reduce((s, j) => s + j.stats.motionGrantRate, 0) / filtered.length) : 0;
  const avgDur = filtered.length ? Math.round(filtered.reduce((s, j) => s + j.stats.medianDurationMonths, 0) / filtered.length) : 0;
  const avgSettle = filtered.length ? Math.round(filtered.reduce((s, j) => s + j.stats.settlementRate, 0) / filtered.length) : 0;

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
    setPage(1);
  }

  const SortArrow = ({ field }: { field: SortField }) => (
    <span style={{ marginLeft: 4, opacity: sortField === field ? 1 : 0.3, fontSize: 10 }}>
      {sortField === field && sortDir === 'asc' ? '▲' : '▼'}
    </span>
  );

  return (
    <div>
      <style>{`
        .je-input:focus { border-color: #006997 !important; box-shadow: 0 0 0 3px rgba(0,105,151,0.1) !important; outline: none; }
        .je-select:focus { border-color: #006997 !important; box-shadow: 0 0 0 3px rgba(0,105,151,0.1) !important; outline: none; }
        .je-card:hover { border-color: #006997 !important; box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important; }
        .je-th { cursor: pointer; user-select: none; white-space: nowrap; }
        .je-th:hover { color: #006997 !important; }
        .je-tr:hover { background: #F5F6F7 !important; }
        .je-view-btn { border: 1px solid #D5D8DC; background: #FFFFFF; padding: 6px 12px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.15s; }
        .je-view-btn:hover { background: #F5F6F7; }
        .je-view-btn.active { background: #00172E; color: #FFFFFF; border-color: #00172E; }
        .je-page-btn { border: 1px solid #D5D8DC; background: #FFFFFF; padding: 6px 12px; cursor: pointer; font-size: 13px; font-family: var(--font-mono); min-width: 36px; transition: all 0.15s; }
        .je-page-btn:hover { background: #F5F6F7; border-color: #006997; }
        .je-page-btn.active { background: #00172E; color: #FFFFFF; border-color: #00172E; }
        .je-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        @media (max-width: 768px) {
          .je-filters { flex-direction: column !important; }
          .je-table-wrap { overflow-x: auto; }
        }
      `}</style>

      {/* Filtered Aggregate Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Judges', value: String(filtered.length), color: '#212529' },
          { label: 'Avg Win Rate', value: `${avgWR}%`, color: wrColor(avgWR) },
          { label: 'Avg Motion Grant', value: `${avgMGR}%`, color: '#006997' },
          { label: 'Avg Settlement', value: `${avgSettle}%`, color: '#006997' },
          { label: 'Avg Duration', value: `${avgDur}mo`, color: '#212529' },
        ].map(s => (
          <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: 2, padding: '16px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="je-filters" style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#455A64" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search judges, districts, courts..."
            className="je-input"
            style={{
              width: '100%', height: 40, paddingLeft: 36, paddingRight: 12,
              border: '1px solid #D5D8DC', borderRadius: 2, fontFamily: 'var(--font-body)',
              fontSize: 14, color: '#212529', background: '#FFFFFF',
            }}
          />
        </div>

        {/* Circuit dropdown */}
        <select
          value={circuitFilter}
          onChange={e => { setCircuitFilter(e.target.value); setDistrictFilter(''); setPage(1); }}
          className="je-select"
          style={{
            height: 40, padding: '0 32px 0 12px', border: '1px solid #D5D8DC', borderRadius: 2,
            fontFamily: 'var(--font-body)', fontSize: 13, color: '#212529', background: '#FFFFFF',
            appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
          }}
        >
          <option value="">All Circuits</option>
          {circuits.map(c => <option key={c} value={c}>{c} Circuit</option>)}
        </select>

        {/* District dropdown */}
        <select
          value={districtFilter}
          onChange={e => { setDistrictFilter(e.target.value); setPage(1); }}
          className="je-select"
          style={{
            height: 40, padding: '0 32px 0 12px', border: '1px solid #D5D8DC', borderRadius: 2,
            fontFamily: 'var(--font-body)', fontSize: 13, color: '#212529', background: '#FFFFFF',
            appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
          }}
        >
          <option value="">All Districts</option>
          {filteredDistricts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value as any); setPage(1); }}
          className="je-select"
          style={{
            height: 40, padding: '0 32px 0 12px', border: '1px solid #D5D8DC', borderRadius: 2,
            fontFamily: 'var(--font-body)', fontSize: 13, color: '#212529', background: '#FFFFFF',
            appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
          }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="senior">Senior Status</option>
          <option value="chief">Chief Judges</option>
        </select>

        {/* View toggle */}
        <div style={{ display: 'flex' }}>
          <button className={`je-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} style={{ borderRadius: '2px 0 0 2px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button className={`je-view-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')} style={{ borderRadius: '0 2px 2px 0', borderLeft: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* Sort Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#455A64', fontFamily: 'var(--font-body)' }}>Sort by:</span>
          {([
            ['cases', 'Cases'],
            ['winRate', 'Win Rate'],
            ['motionGrant', 'Motion Grant'],
            ['settlement', 'Settlement'],
            ['duration', 'Duration'],
            ['appointed', 'Appointed'],
            ['name', 'Name'],
          ] as [SortField, string][]).map(([field, label]) => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              style={{
                border: 'none', background: sortField === field ? '#00172E' : '#F5F6F7',
                color: sortField === field ? '#FFFFFF' : '#212529',
                padding: '4px 10px', borderRadius: 2, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s',
              }}
            >
              {label}<SortArrow field={field} />
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#455A64', fontFamily: 'var(--font-body)' }}>
          {filtered.length} judge{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 64, background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: 2 }}>
          <p style={{ fontSize: 15, color: '#455A64', fontFamily: 'var(--font-body)' }}>No judges match your filters.</p>
          <button
            onClick={() => { setSearch(''); setCircuitFilter(''); setDistrictFilter(''); setStatusFilter('all'); setPage(1); }}
            style={{ marginTop: 12, border: 'none', background: '#E8171F', color: '#FFFFFF', padding: '8px 20px', borderRadius: 2, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {paginated.map(judge => {
            const circuit = getCircuitForDistrict(judge.district);
            return (
              <Link
                key={judge.slug}
                href={`/judges/${judge.slug}`}
                className="je-card"
                style={{
                  display: 'block', padding: 20, borderRadius: 2, border: '1px solid #D5D8DC',
                  background: '#FFFFFF', textDecoration: 'none', transition: 'all 0.2s ease',
                }}
              >
                {/* Name + badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#212529', margin: '0 0 2px', fontFamily: 'var(--font-display)' }}>
                      {judge.name}
                    </p>
                    <p style={{ fontSize: 12, color: '#455A64', margin: 0, fontFamily: 'var(--font-body)' }}>
                      {judge.district} · {circuit} Cir.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {judge.chiefJudge && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 2, background: 'rgba(232,23,31,0.08)', color: '#E8171F', textTransform: 'uppercase' }}>Chief</span>
                    )}
                    {judge.seniorStatus && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 2, background: 'rgba(184,110,0,0.08)', color: '#B86E00', textTransform: 'uppercase' }}>Senior</span>
                    )}
                  </div>
                </div>

                {/* Appointed info */}
                <p style={{ fontSize: 11, color: '#455A64', margin: '0 0 12px', fontFamily: 'var(--font-body)' }}>
                  Appointed {judge.appointedYear} · {judge.appointedBy.replace('President ', '')}
                </p>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 4, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: wrColor(judge.stats.plaintiffWinRate) }}>
                      {judge.stats.plaintiffWinRate}%
                    </div>
                    <div style={{ fontSize: 9, color: '#455A64', textTransform: 'uppercase', marginTop: 1 }}>Win</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#006997' }}>
                      {judge.stats.motionGrantRate}%
                    </div>
                    <div style={{ fontSize: 9, color: '#455A64', textTransform: 'uppercase', marginTop: 1 }}>MTD</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#006997' }}>
                      {judge.stats.settlementRate}%
                    </div>
                    <div style={{ fontSize: 9, color: '#455A64', textTransform: 'uppercase', marginTop: 1 }}>Settle</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#212529' }}>
                      {judge.stats.medianDurationMonths}mo
                    </div>
                    <div style={{ fontSize: 9, color: '#455A64', textTransform: 'uppercase', marginTop: 1 }}>Dur.</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: '#212529' }}>
                      {judge.stats.totalCases >= 1000 ? `${(judge.stats.totalCases / 1000).toFixed(1)}K` : judge.stats.totalCases}
                    </div>
                    <div style={{ fontSize: 9, color: '#455A64', textTransform: 'uppercase', marginTop: 1 }}>Cases</div>
                  </div>
                </div>

                {/* Mini win rate bar */}
                <div style={{ marginTop: 12, height: 4, background: '#F5F6F7', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${judge.stats.plaintiffWinRate}%`, height: '100%', background: wrColor(judge.stats.plaintiffWinRate), borderRadius: 2 }} />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="je-table-wrap" style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: 2, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#00172E' }}>
                <th className="je-th" onClick={() => toggleSort('name')} style={{ textAlign: 'left', padding: '12px 16px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Judge<SortArrow field="name" />
                </th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#C7D1D8', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  District
                </th>
                <th className="je-th" onClick={() => toggleSort('winRate')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Win Rate<SortArrow field="winRate" />
                </th>
                <th className="je-th" onClick={() => toggleSort('motionGrant')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  MTD Grant<SortArrow field="motionGrant" />
                </th>
                <th className="je-th" onClick={() => toggleSort('settlement')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Settle %<SortArrow field="settlement" />
                </th>
                <th className="je-th" onClick={() => toggleSort('duration')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Duration<SortArrow field="duration" />
                </th>
                <th className="je-th" onClick={() => toggleSort('cases')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Cases<SortArrow field="cases" />
                </th>
                <th className="je-th" onClick={() => toggleSort('appointed')} style={{ textAlign: 'center', padding: '12px 8px', color: '#FFFFFF', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Apptd.<SortArrow field="appointed" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((judge, i) => (
                <tr key={judge.slug} className="je-tr" style={{ borderBottom: '1px solid #F0F0F0', background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <Link href={`/judges/${judge.slug}`} style={{ color: '#006997', textDecoration: 'none', fontWeight: 600 }}>
                      {judge.name}
                    </Link>
                    <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                      {judge.chiefJudge && <span style={{ fontSize: 9, fontWeight: 700, color: '#E8171F' }}>CHIEF</span>}
                      {judge.seniorStatus && <span style={{ fontSize: 9, fontWeight: 700, color: '#B86E00' }}>SENIOR</span>}
                    </div>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#455A64', fontSize: 12 }}>{judge.district}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: wrColor(judge.stats.plaintiffWinRate) }}>
                    {judge.stats.plaintiffWinRate}%
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#212529' }}>
                    {judge.stats.motionGrantRate}%
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#212529' }}>
                    {judge.stats.settlementRate}%
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#212529' }}>
                    {judge.stats.medianDurationMonths}mo
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#212529' }}>
                    {judge.stats.totalCases >= 1000 ? `${(judge.stats.totalCases / 1000).toFixed(1)}K` : judge.stats.totalCases}
                  </td>
                  <td style={{ padding: '10px 8px', textAlign: 'center', fontSize: 12, color: '#455A64' }}>
                    {judge.appointedYear}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
          <button className="je-page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let p: number;
            if (totalPages <= 7) p = i + 1;
            else if (page <= 4) p = i + 1;
            else if (page >= totalPages - 3) p = totalPages - 6 + i;
            else p = page - 3 + i;
            return (
              <button key={p} className={`je-page-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>
                {p}
              </button>
            );
          })}
          <button className="je-page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          <select
            value={perPage}
            onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="je-select"
            style={{ height: 32, padding: '0 24px 0 8px', border: '1px solid #D5D8DC', borderRadius: 2, fontSize: 12, fontFamily: 'var(--font-body)', background: '#FFFFFF', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', backgroundSize: '14px' }}
          >
            <option value={12}>12/page</option>
            <option value={24}>24/page</option>
            <option value={48}>48/page</option>
            <option value={96}>All</option>
          </select>
        </div>
      )}
    </div>
  );
}
