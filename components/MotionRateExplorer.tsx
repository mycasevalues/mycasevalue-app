'use client';

import { useState, useMemo } from 'react';
import { getWinRateColor } from '../lib/color-scale';
import {
  getAllMotions,
  getAllCaseTypes,
  getAllCircuits,
  type Motion,
  type MotionCaseTypeData,
} from '../lib/motion-rates';

type SortKey = 'motion' | 'caseType' | 'grantRate' | 'sampleSize';
type SortDir = 'asc' | 'desc';

interface RowData {
  motionType: string;
  caseType: string;
  grantRate: number;
  sampleSize: number;
  motion: Motion;
}

export default function MotionRateExplorer() {
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCircuit, setSelectedCircuit] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('grantRate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const motions = getAllMotions();
  const caseTypes = getAllCaseTypes();
  const circuits = getAllCircuits();

  const tableData = useMemo(() => {
    const rows: RowData[] = [];

    motions.forEach(motion => {
      Object.entries(motion.byCaseType).forEach(([caseType, caseData]) => {
        if (!selectedCaseType || selectedCaseType === caseType) {
          rows.push({
            motionType: motion.type,
            caseType,
            grantRate: caseData.grantRate,
            sampleSize: caseData.sampleSize,
            motion,
          });
        }
      });
    });

    rows.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortKey) {
        case 'motion':
          aVal = a.motionType;
          bVal = b.motionType;
          break;
        case 'caseType':
          aVal = parseInt(a.caseType);
          bVal = parseInt(b.caseType);
          break;
        case 'grantRate':
          aVal = a.grantRate;
          bVal = b.grantRate;
          break;
        case 'sampleSize':
          aVal = a.sampleSize;
          bVal = b.sampleSize;
          break;
      }

      let result = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal;
      } else {
        result = String(aVal).localeCompare(String(bVal));
      }

      return sortDir === 'asc' ? result : -result;
    });

    return rows;
  }, [motions, selectedCaseType, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const toggleExpand = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 20px',
    fontFamily: 'var(--font-ui)',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text1)',
    marginBottom: '8px',
    lineHeight: 1.2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'var(--color-text-muted)',
    marginBottom: '24px',
    lineHeight: 1.5,
  };

  const filterContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: '48px',
    border: '1px solid var(--bdr)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--text1)',
    backgroundColor: 'var(--card, #FFFFFF)',
    fontFamily: 'var(--font-ui)',
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text1)',
  };

  const tableWrapperStyle: React.CSSProperties = {
    overflowX: 'auto',
    borderRadius: '4px',
    border: '1px solid var(--bdr)',
    marginBottom: '32px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'var(--card, #FFFFFF)',
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: 'var(--card)',
    borderBottom: '1px solid var(--bdr)',
  };

  const thStyle: React.CSSProperties = {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text1)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 200ms',
  };

  const tdStyle: React.CSSProperties = {
    padding: '16px 16px',
    fontSize: '14px',
    color: 'var(--text1)',
    borderBottom: '1px solid var(--bdr)',
  };

  const sortIndicatorStyle: React.CSSProperties = {
    marginLeft: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  };

  const expandButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '14px',
    color: 'var(--link)',
    fontWeight: 600,
    transition: 'color 200ms',
  };

  const circuitTableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    backgroundColor: 'var(--card)',
  };

  const circuitTdStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderBottom: '1px solid var(--bdr)',
    color: 'var(--text1)',
  };

  const disclaimerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(234,179,8,0.08)',
    border: '1px solid var(--wrn-bg, #FCD34D)',
    borderRadius: '4px',
    padding: '16px',
    fontSize: '14px',
    color: 'var(--wrn-txt, #7A5800)',
    lineHeight: 1.6,
    marginTop: '32px',
  };

  const nothingFoundStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '32px',
    color: 'var(--color-text-muted)',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Win More Motions with Circuit-Specific Data</h1>
        <p style={subtitleStyle}>
          Track grant/deny rates by motion type and circuit to predict outcomes and refine strategy
        </p>
      </div>

      <div style={filterContainerStyle}>
        <div>
          <label style={labelStyle} htmlFor="case-type-select">
            Filter by Case Type
          </label>
          <select
            id="case-type-select"
            value={selectedCaseType}
            onChange={(e) => setSelectedCaseType(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Case Types</option>
            {caseTypes.map(ct => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="circuit-select">
            Filter by Circuit (for breakdown)
          </label>
          <select
            id="circuit-select"
            value={selectedCircuit}
            onChange={(e) => setSelectedCircuit(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Circuits</option>
            {circuits.map(c => (
              <option key={c} value={c}>
                {c} Circuit
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={tableWrapperStyle}>
        {tableData.length > 0 ? (
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th style={{ ...thStyle, width: '40px' }}></th>
                <th
                  style={thStyle}
                  onClick={() => handleSort('motion')}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                >
                  Motion Type
                  {sortKey === 'motion' && (
                    <span style={sortIndicatorStyle}>
                      {sortDir === 'asc' ? ' \u2191' : ' \u2193'}
                    </span>
                  )}
                </th>
                <th
                  style={thStyle}
                  onClick={() => handleSort('caseType')}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                >
                  Case Type
                  {sortKey === 'caseType' && (
                    <span style={sortIndicatorStyle}>
                      {sortDir === 'asc' ? ' \u2191' : ' \u2193'}
                    </span>
                  )}
                </th>
                <th
                  style={thStyle}
                  onClick={() => handleSort('grantRate')}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                >
                  Grant Rate
                  {sortKey === 'grantRate' && (
                    <span style={sortIndicatorStyle}>
                      {sortDir === 'asc' ? ' \u2191' : ' \u2193'}
                    </span>
                  )}
                </th>
                <th
                  style={thStyle}
                  onClick={() => handleSort('sampleSize')}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                >
                  Sample Size
                  {sortKey === 'sampleSize' && (
                    <span style={sortIndicatorStyle}>
                      {sortDir === 'asc' ? ' \u2191' : ' \u2193'}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => {
                const rowId = `${row.motionType}-${row.caseType}`;
                const isExpanded = expandedRows.has(rowId);
                const caseData = row.motion.byCaseType[row.caseType];
                const colorInfo = getWinRateColor(row.grantRate);

                return (
                  <tbody key={rowId}>
                    <tr style={{ borderBottom: '1px solid var(--bdr)' }}>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <button
                          style={expandButtonStyle}
                          onClick={() => toggleExpand(rowId)}
                          title={isExpanded ? 'Collapse' : 'Expand circuit breakdown'}
                        >
                          {isExpanded ? '\u2212' : '+'}
                        </button>
                      </td>
                      <td style={tdStyle}>{row.motionType}</td>
                      <td style={tdStyle}>{row.caseType}</td>
                      <td
                        style={{
                          ...tdStyle,
                          backgroundColor: colorInfo.bg,
                          borderLeft: `4px solid ${colorInfo.border}`,
                          fontWeight: 600,
                          color: colorInfo.text,
                        }}
                      >
                        {row.grantRate.toFixed(1)}%
                        <span style={{ fontSize: '12px', fontWeight: 400, marginLeft: '6px' }}>
                          ({colorInfo.label})
                        </span>
                      </td>
                      <td style={tdStyle}>{row.sampleSize.toLocaleString()}</td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} style={{ padding: '16px', backgroundColor: 'var(--card)' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 12px 0' }}>
                              Circuit Breakdown
                            </h4>
                            <table style={circuitTableStyle}>
                              <thead>
                                <tr style={{ backgroundColor: 'var(--card)' }}>
                                  <th style={{ ...circuitTdStyle, fontWeight: 600 }}>Circuit</th>
                                  <th style={{ ...circuitTdStyle, fontWeight: 600 }}>Grant Rate</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(caseData.byCircuit).map(([circuit, rate]) => {
                                  const circuitColor = getWinRateColor(rate);
                                  return (
                                    <tr key={circuit}>
                                      <td style={circuitTdStyle}>{circuit}</td>
                                      <td
                                        style={{
                                          ...circuitTdStyle,
                                          backgroundColor: circuitColor.bg,
                                          color: circuitColor.text,
                                          fontWeight: 600,
                                          borderLeft: `3px solid ${circuitColor.border}`,
                                        }}
                                      >
                                        {rate.toFixed(1)}%
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '12px' }}>
                            Sample Size: {caseData.sampleSize.toLocaleString()}
                            {' | '}
                            Avg. Time to Decision: {caseData.avgTimeToDecisionDays} days
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div style={nothingFoundStyle}>
            No motions found for selected filters.
          </div>
        )}
      </div>

      <div style={disclaimerStyle}>
        <strong>Data Sources:</strong> Motion success rates are compiled from federal court
        records (Federal Judicial Center Integrated Database and CourtListener) through 2025.
        Rates represent actual grant/deny decisions and are categorized by motion type, case type
        (Nature of Suit code), and federal circuit. Sample sizes vary by combination. These
        statistics are historical in nature and individual case outcomes depend on specific facts,
        jurisdiction, and judge assignment.
      </div>
    </div>
  );
}
