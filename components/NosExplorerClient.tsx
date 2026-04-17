'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { fmtK } from '../lib/format';

interface NosRow {
  nos: string;
  label: string;
  category: string;
  categoryLabel: string;
  total: number;
  wr: number;
  sp: number;
  mo: number;
  rngLo: number;
  rngMd: number;
  rngHi: number;
}

type SortField = 'nos' | 'label' | 'total' | 'wr' | 'sp' | 'mo' | 'rngMd';
type SortDir = 'asc' | 'desc';

const wrColor = (wr: number) => wr >= 50 ? 'var(--data-positive, #176438)' : wr >= 35 ? '#C37D16' : 'var(--accent-primary)';

const CATEGORY_COLORS: Record<string, string> = {
  work: 'var(--color-text-primary)', injury: 'var(--accent-primary)', consumer: '#70B5F9', rights: 'var(--accent-primary)',
  money: '#C37D16', housing: 'var(--data-positive, #176438)', medical: 'var(--data-negative, #B01E1E)', family: '#C37D16',
  gov: 'var(--color-text-secondary)', education: '#70B5F9', ip: 'var(--data-positive, #176438)', other: 'var(--color-text-secondary)',
};

export default function NosExplorerClient({ data }: { data: NosRow[] }) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedNos, setExpandedNos] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map(d => d.category)));
    return cats.map(c => ({ id: c, label: data.find(d => d.category === c)?.categoryLabel || c })).sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  const filtered = useMemo(() => {
    let list = [...data];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r => r.label.toLowerCase().includes(q) || r.nos.includes(q) || r.categoryLabel.toLowerCase().includes(q));
    }
    if (catFilter) list = list.filter(r => r.category === catFilter);

    const mult = sortDir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      switch (sortField) {
        case 'nos': return mult * a.nos.localeCompare(b.nos);
        case 'label': return mult * a.label.localeCompare(b.label);
        case 'total': return mult * (a.total - b.total);
        case 'wr': return mult * (a.wr - b.wr);
        case 'sp': return mult * (a.sp - b.sp);
        case 'mo': return mult * (a.mo - b.mo);
        case 'rngMd': return mult * (a.rngMd - b.rngMd);
        default: return 0;
      }
    });
    return list;
  }, [data, search, catFilter, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  }

  const SortArrow = ({ field }: { field: SortField }) => (
    <span style={{ marginLeft: 4, opacity: sortField === field ? 1 : 0.3, fontSize: 10 }}>
      {sortField === field && sortDir === 'asc' ? '▲' : '▼'}
    </span>
  );

  const avgWR = filtered.length ? Math.round(filtered.reduce((s, r) => s + r.wr, 0) / filtered.length) : 0;
  const totalFiltered = filtered.reduce((s, r) => s + r.total, 0);

  return (
    <div>
      <style>{`
        .nos-input:focus { border-color: var(--accent-primary-hover) !important; box-shadow: 0 0 0 3px rgba(0,105,151,0.1) !important; outline: none; }
        .nos-select:focus { border-color: var(--accent-primary-hover) !important; box-shadow: 0 0 0 3px rgba(0,105,151,0.1) !important; outline: none; }
        .nos-th { cursor: pointer; user-select: none; white-space: nowrap; }
        .nos-th:hover { color: var(--accent-primary-hover) !important; }
        .nos-tr:hover { background: var(--color-surface-1) !important; }
        .nos-expand:hover { background: #F0F3F5 !important; }
        @media (max-width: 768px) {
          .nos-table-wrap { overflow-x: auto; }
        }
      `}</style>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'NOS Codes', value: String(filtered.length), color: 'var(--color-text-primary)' },
          { label: 'Total Cases', value: totalFiltered >= 1000000 ? `${(totalFiltered / 1000000).toFixed(1)}M` : `${(totalFiltered / 1000).toFixed(0)}K`, color: 'var(--accent-primary-hover)' },
          { label: 'Avg Win Rate', value: `${avgWR}%`, color: wrColor(avgWR) },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 2, padding: '16px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search NOS codes, labels, categories..."
            className="nos-input"
            style={{
              width: '100%', height: 40, paddingLeft: 36, paddingRight: 12,
              border: '1px solid var(--border-default)', borderRadius: 2, fontFamily: 'var(--font-ui)',
              fontSize: 14, color: 'var(--color-text-primary)', background: 'var(--color-surface-0)',
            }}
          />
        </div>
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="nos-select"
          style={{
            height: 40, padding: '0 32px 0 12px', border: '1px solid var(--border-default)', borderRadius: 2,
            fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--color-text-primary)', background: 'var(--color-surface-0)',
            appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
          }}
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="nos-table-wrap" style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 2, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--accent-primary)' }}>
              <th className="nos-th" onClick={() => toggleSort('nos')} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', width: 70 }}>
                NOS<SortArrow field="nos" />
              </th>
              <th className="nos-th" onClick={() => toggleSort('label')} style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Case Type<SortArrow field="label" />
              </th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#C7D1D8', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Category
              </th>
              <th className="nos-th" onClick={() => toggleSort('total')} style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Cases<SortArrow field="total" />
              </th>
              <th className="nos-th" onClick={() => toggleSort('wr')} style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Win %<SortArrow field="wr" />
              </th>
              <th className="nos-th" onClick={() => toggleSort('sp')} style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Settle %<SortArrow field="sp" />
              </th>
              <th className="nos-th" onClick={() => toggleSort('mo')} style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Duration<SortArrow field="mo" />
              </th>
              <th className="nos-th" onClick={() => toggleSort('rngMd')} style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--color-surface-0)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Median $<SortArrow field="rngMd" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <>
                <tr
                  key={row.nos}
                  className="nos-tr"
                  onClick={() => setExpandedNos(expandedNos === row.nos ? null : row.nos)}
                  style={{ borderBottom: '1px solid #F0F0F0', background: i % 2 === 0 ? 'var(--color-surface-0)' : '#FAFAFA', cursor: 'pointer' }}
                >
                  <td style={{ padding: '8px 16px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-primary-hover)', fontSize: 13 }}>
                    {row.nos}
                  </td>
                  <td style={{ padding: '8px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {row.label}
                  </td>
                  <td style={{ padding: '8px 8px' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 2,
                      background: `${CATEGORY_COLORS[row.category] || 'var(--color-text-secondary)'}15`,
                      color: CATEGORY_COLORS[row.category] || 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                    }}>
                      {row.categoryLabel}
                    </span>
                  </td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {row.total.toLocaleString()}
                  </td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: wrColor(row.wr) }}>
                    {row.wr}%
                  </td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {row.sp}%
                  </td>
                  <td style={{ padding: '8px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {row.mo}mo
                  </td>
                  <td style={{ padding: '8px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    {row.rngMd > 0 ? fmtK(row.rngMd) : '–'}
                  </td>
                </tr>
                {expandedNos === row.nos && (
                  <tr key={`${row.nos}-expand`}>
                    <td colSpan={8} style={{ padding: 0 }}>
                      <div className="nos-expand" style={{ padding: '16px 24px', background: 'var(--color-surface-1)', borderBottom: '2px solid var(--accent-primary-hover)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Recovery Range</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-text-primary)' }}>
                              {fmtK(row.rngLo)} – {fmtK(row.rngMd)} – {fmtK(row.rngHi)}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 2 }}>25th / Median / 75th</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Win Rate</div>
                            <div style={{ height: 8, background: 'var(--bdr, #E2DFD8)', borderRadius: 4, overflow: 'hidden', marginTop: 6 }}>
                              <div style={{ width: `${row.wr}%`, height: '100%', background: wrColor(row.wr), borderRadius: 4 }} />
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 4 }}>Settlement Rate</div>
                            <div style={{ height: 8, background: 'var(--bdr, #E2DFD8)', borderRadius: 4, overflow: 'hidden', marginTop: 6 }}>
                              <div style={{ width: `${row.sp}%`, height: '100%', background: 'var(--accent-primary-hover)', borderRadius: 4 }} />
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link
                              href={`/report/${row.nos}`}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '8px 16px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)',
                                borderRadius: 2, fontSize: 12, fontWeight: 600, textDecoration: 'none',
                                fontFamily: 'var(--font-ui)',
                              }}
                            >
                              View Full Report →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Result count */}
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)' }}>
        Showing {filtered.length} of {data.length} NOS codes · Click any row to expand
      </div>
    </div>
  );
}
