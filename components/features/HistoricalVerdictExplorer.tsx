'use client';

import React, { useState, useMemo } from 'react';
import FeatureGate from '../ui/FeatureGate';
import { Tier } from '../../lib/access';

/**
 * A single historical verdict record
 */
export interface HistoricalVerdict {
  id: string;
  year: number;
  caseType: string;
  district: string;
  outcome: 'plaintiff_verdict' | 'defendant_verdict' | 'settlement' | 'dismissed';
  amount: number | null;
  duration: number; // days
  judge: string;
}

/**
 * Props for HistoricalVerdictExplorer
 */
export interface HistoricalVerdictExplorerProps {
  verdicts: HistoricalVerdict[];
  caseType: string;
  district: string;
  lang?: 'en' | 'es';
  userTier?: Tier;
}

/**
 * E10 Historical Verdict Explorer
 *
 * Interactive timeline/table showing historical verdicts for a specific case type
 * and district. Users can filter by year range, outcome type, and settlement range.
 *
 * Features:
 * - Filter bar with pills: year range, outcome type toggles, settlement range
 * - Sortable table columns (click header to sort)
 * - Outcome badges: color-coded pills
 * - Timeline visualization: horizontal bar showing verdicts over time
 * - Pagination (10 per page)
 * - Summary stats at top: total verdicts, avg amount, most common outcome
 * - Gated behind 'unlimited' tier
 */
export default function HistoricalVerdictExplorer({
  verdicts,
  caseType,
  district,
  lang = 'en',
  userTier = 'free',
}: HistoricalVerdictExplorerProps) {
  const es = lang === 'es';

  // Text translations
  const text = {
    en: {
      title: 'Historical Verdict Explorer',
      subtitle: `Verdicts for ${caseType} cases in ${district}`,
      filters: 'Filters',
      yearRange: 'Year Range',
      outcomeType: 'Outcome Type',
      settlementRange: 'Settlement Range',
      clear: 'Clear All',
      year: 'Year',
      caseTypeCol: 'Case Type',
      districtCol: 'District',
      outcome: 'Outcome',
      amount: 'Amount',
      duration: 'Duration',
      judge: 'Judge',
      summary: 'Summary',
      totalVerdicts: 'Total Verdicts',
      averageSettlement: 'Average Settlement',
      mostCommonOutcome: 'Most Common Outcome',
      noCases: 'No cases found',
      pagination: 'Results',
      of: 'of',
      // Outcome labels
      plaintiffVerdict: 'Plaintiff Verdict',
      defendantVerdict: 'Defendant Verdict',
      settlement: 'Settlement',
      dismissed: 'Dismissed',
      // Timeline
      timeline: 'Timeline',
      showing: 'Showing',
      toWord: 'to',
      // Filter values
      any: 'Any',
      from: 'From',
      toLabel: 'To',
      days: 'days',
    },
    es: {
      title: 'Explorador de Veredictos Históricos',
      subtitle: `Veredictos de casos ${caseType} en ${district}`,
      filters: 'Filtros',
      yearRange: 'Rango de Años',
      outcomeType: 'Tipo de Resultado',
      settlementRange: 'Rango de Acuerdo',
      clear: 'Limpiar Todo',
      year: 'Año',
      caseTypeCol: 'Tipo de Caso',
      districtCol: 'Distrito',
      outcome: 'Resultado',
      amount: 'Cantidad',
      duration: 'Duración',
      judge: 'Juez',
      summary: 'Resumen',
      totalVerdicts: 'Veredictos Totales',
      averageSettlement: 'Acuerdo Promedio',
      mostCommonOutcome: 'Resultado Más Común',
      noCases: 'No se encontraron casos',
      pagination: 'Resultados',
      of: 'de',
      // Outcome labels
      plaintiffVerdict: 'Veredicto para el Demandante',
      defendantVerdict: 'Veredicto para el Demandado',
      settlement: 'Acuerdo',
      dismissed: 'Desestimado',
      // Timeline
      timeline: 'Cronología',
      showing: 'Mostrando',
      toWord: 'hasta',
      // Filter values
      any: 'Cualquiera',
      from: 'Desde',
      toLabel: 'Hasta',
      days: 'días',
    },
  };

  const t = text[es ? 'es' : 'en'];

  // Filter state
  const [yearMin, setYearMin] = useState<number | null>(null);
  const [yearMax, setYearMax] = useState<number | null>(null);
  const [outcomeFilter, setOutcomeFilter] = useState<
    ('plaintiff_verdict' | 'defendant_verdict' | 'settlement' | 'dismissed')[]
  >([]);
  const [settlementMin, setSettlementMin] = useState<number | null>(null);
  const [settlementMax, setSettlementMax] = useState<number | null>(null);

  // Sort state
  const [sortBy, setSortBy] = useState<'year' | 'amount' | 'duration'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get year range from data
  const yearRange = useMemo(() => {
    if (verdicts.length === 0) return { min: new Date().getFullYear(), max: new Date().getFullYear() };
    const years = verdicts.map((v) => v.year).sort((a, b) => a - b);
    return { min: years[0], max: years[years.length - 1] };
  }, [verdicts]);

  // Get settlement range from data
  const settlementRange = useMemo(() => {
    const settled = verdicts.filter((v) => v.amount !== null).map((v) => v.amount!);
    if (settled.length === 0) return { min: 0, max: 0 };
    return { min: Math.min(...settled), max: Math.max(...settled) };
  }, [verdicts]);

  // Filter verdicts
  const filteredVerdicts = useMemo(() => {
    return verdicts.filter((v) => {
      // Year range
      if (yearMin !== null && v.year < yearMin) return false;
      if (yearMax !== null && v.year > yearMax) return false;

      // Outcome type
      if (outcomeFilter.length > 0 && !outcomeFilter.includes(v.outcome)) return false;

      // Settlement range (only for settlements)
      if (v.amount !== null) {
        if (settlementMin !== null && v.amount < settlementMin) return false;
        if (settlementMax !== null && v.amount > settlementMax) return false;
      }

      return true;
    });
  }, [verdicts, yearMin, yearMax, outcomeFilter, settlementMin, settlementMax]);

  // Sort verdicts
  const sortedVerdicts = useMemo(() => {
    const sorted = [...filteredVerdicts];

    sorted.sort((a, b) => {
      let aVal: number;
      let bVal: number;

      switch (sortBy) {
        case 'year':
          aVal = a.year;
          bVal = b.year;
          break;
        case 'amount':
          aVal = a.amount ?? 0;
          bVal = b.amount ?? 0;
          break;
        case 'duration':
          aVal = a.duration;
          bVal = b.duration;
          break;
        default:
          aVal = a.year;
          bVal = b.year;
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [filteredVerdicts, sortBy, sortOrder]);

  // Paginate
  const totalPages = Math.ceil(sortedVerdicts.length / itemsPerPage);
  const paginatedVerdicts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedVerdicts.slice(start, start + itemsPerPage);
  }, [sortedVerdicts, currentPage]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const settled = filteredVerdicts.filter((v) => v.amount !== null).map((v) => v.amount!);
    const avgAmount = settled.length > 0 ? settled.reduce((a, b) => a + b, 0) / settled.length : 0;

    // Most common outcome
    const outcomeCounts: Record<string, number> = {};
    filteredVerdicts.forEach((v) => {
      outcomeCounts[v.outcome] = (outcomeCounts[v.outcome] ?? 0) + 1;
    });
    const mostCommon = Object.entries(outcomeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'settlement';

    return {
      total: filteredVerdicts.length,
      avgAmount,
      mostCommon: mostCommon as HistoricalVerdict['outcome'],
    };
  }, [filteredVerdicts]);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(es ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get outcome label and color
  const getOutcomeLabel = (outcome: HistoricalVerdict['outcome']): string => {
    switch (outcome) {
      case 'plaintiff_verdict':
        return t.plaintiffVerdict;
      case 'defendant_verdict':
        return t.defendantVerdict;
      case 'settlement':
        return t.settlement;
      case 'dismissed':
        return t.dismissed;
      default:
        return outcome;
    }
  };

  const getOutcomeColor = (outcome: HistoricalVerdict['outcome']): { bg: string; text: string; border: string } => {
    switch (outcome) {
      case 'plaintiff_verdict':
        return { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' };
      case 'defendant_verdict':
        return { bg: '#FEE2E2', text: '#7F1D1D', border: '#FECACA' };
      case 'settlement':
        return { bg: '#DBEAFE', text: '#0C2340', border: '#BFDBFE' };
      case 'dismissed':
        return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
    }
  };

  // Handle sort click
  const handleSortClick = (column: 'year' | 'amount' | 'duration') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Reset filters
  const handleClearFilters = () => {
    setYearMin(null);
    setYearMax(null);
    setOutcomeFilter([]);
    setSettlementMin(null);
    setSettlementMax(null);
    setCurrentPage(1);
  };

  // Toggle outcome filter
  const toggleOutcome = (outcome: HistoricalVerdict['outcome']) => {
    setOutcomeFilter((prev) =>
      prev.includes(outcome) ? prev.filter((o) => o !== outcome) : [...prev, outcome]
    );
    setCurrentPage(1);
  };

  const content = (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E0D8',
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#111111',
            margin: '0 0 4px 0',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          {t.title}
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0,
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Summary Stats */}
      {filteredVerdicts.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
            padding: '16px',
            background: '#F9F8F6',
            borderRadius: '8px',
          }}
        >
          {/* Total Verdicts */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {t.totalVerdicts}
            </p>
            <p
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
                fontFamily: 'Roboto Mono, monospace',
              }}
            >
              {summaryStats.total}
            </p>
          </div>

          {/* Average Settlement */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {t.averageSettlement}
            </p>
            <p
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#111111',
                margin: 0,
                fontFamily: 'Roboto Mono, monospace',
              }}
            >
              {formatCurrency(summaryStats.avgAmount)}
            </p>
          </div>

          {/* Most Common Outcome */}
          <div>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {t.mostCommonOutcome}
            </p>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                margin: 0,
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {getOutcomeLabel(summaryStats.mostCommon)}
            </p>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          background: '#F9F8F6',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#374151',
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {t.filters}
          </h3>
        </div>

        {/* Year Range Filter */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              display: 'block',
              marginBottom: '8px',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {t.yearRange}
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              min={yearRange.min}
              max={yearRange.max}
              value={yearMin ?? ''}
              onChange={(e) => {
                setYearMin(e.target.value === '' ? null : parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              placeholder={yearRange.min.toString()}
              style={{
                padding: '6px 8px',
                fontSize: '13px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                width: '80px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            />
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>–</span>
            <input
              type="number"
              min={yearRange.min}
              max={yearRange.max}
              value={yearMax ?? ''}
              onChange={(e) => {
                setYearMax(e.target.value === '' ? null : parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              placeholder={yearRange.max.toString()}
              style={{
                padding: '6px 8px',
                fontSize: '13px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                width: '80px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            />
          </div>
        </div>

        {/* Outcome Type Filter */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              display: 'block',
              marginBottom: '8px',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {t.outcomeType}
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['plaintiff_verdict', 'defendant_verdict', 'settlement', 'dismissed'] as const).map((outcome) => (
              <button
                key={outcome}
                onClick={() => toggleOutcome(outcome)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: `1px solid ${outcomeFilter.includes(outcome) ? '#8B5CF6' : '#E5E0D8'}`,
                  background: outcomeFilter.includes(outcome) ? '#F3F0FF' : '#FFFFFF',
                  color: outcomeFilter.includes(outcome) ? '#7C3AED' : '#6B7280',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  fontFamily: 'Roboto, system-ui, sans-serif',
                }}
              >
                {getOutcomeLabel(outcome)}
              </button>
            ))}
          </div>
        </div>

        {/* Settlement Range Filter */}
        <div style={{ marginBottom: '12px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              display: 'block',
              marginBottom: '8px',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {t.settlementRange}
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="number"
              value={settlementMin ?? ''}
              onChange={(e) => {
                setSettlementMin(e.target.value === '' ? null : parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              placeholder="$0"
              style={{
                padding: '6px 8px',
                fontSize: '13px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                flex: 1,
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            />
            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>–</span>
            <input
              type="number"
              value={settlementMax ?? ''}
              onChange={(e) => {
                setSettlementMax(e.target.value === '' ? null : parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              placeholder={`$${settlementRange.max}`}
              style={{
                padding: '6px 8px',
                fontSize: '13px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                flex: 1,
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={handleClearFilters}
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          {t.clear}
        </button>
      </div>

      {/* Results table or empty state */}
      {paginatedVerdicts.length === 0 ? (
        <div
          style={{
            padding: '32px',
            textAlign: 'center',
            color: '#9CA3AF',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px' }}>{t.noCases}</p>
        </div>
      ) : (
        <>
          {/* Timeline Visualization */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6B7280',
                margin: '0 0 8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {t.timeline}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '2px',
                height: '24px',
                background: '#F3F4F6',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {sortedVerdicts.map((v) => (
                <div
                  key={v.id}
                  style={{
                    flex: 1,
                    background: '#8B5CF6',
                    opacity: 0.7,
                    transition: 'opacity 200ms ease',
                    cursor: 'default',
                  }}
                />
              ))}
            </div>
            <p
              style={{
                fontSize: '11px',
                color: '#9CA3AF',
                margin: '4px 0 0 0',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              {t.showing} {(currentPage - 1) * itemsPerPage + 1} {t.toWord} {Math.min(currentPage * itemsPerPage, sortedVerdicts.length)} {t.of} {sortedVerdicts.length}
            </p>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
                fontFamily: 'Roboto, system-ui, sans-serif',
              }}
            >
              <thead>
                <tr style={{ background: '#F9F8F6' }}>
                  <th
                    onClick={() => handleSortClick('year')}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#374151',
                      cursor: 'pointer',
                      borderBottom: '1px solid #E5E0D8',
                      userSelect: 'none',
                    }}
                  >
                    {t.year} {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#374151',
                      borderBottom: '1px solid #E5E0D8',
                    }}
                  >
                    {t.caseTypeCol}
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#374151',
                      borderBottom: '1px solid #E5E0D8',
                    }}
                  >
                    {t.outcome}
                  </th>
                  <th
                    onClick={() => handleSortClick('amount')}
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 700,
                      color: '#374151',
                      cursor: 'pointer',
                      borderBottom: '1px solid #E5E0D8',
                      userSelect: 'none',
                    }}
                  >
                    {t.amount} {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    onClick={() => handleSortClick('duration')}
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 700,
                      color: '#374151',
                      cursor: 'pointer',
                      borderBottom: '1px solid #E5E0D8',
                      userSelect: 'none',
                    }}
                  >
                    {t.duration} {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      fontWeight: 700,
                      color: '#374151',
                      borderBottom: '1px solid #E5E0D8',
                    }}
                  >
                    {t.judge}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedVerdicts.map((verdict, idx) => {
                  const colors = getOutcomeColor(verdict.outcome);
                  const isEven = idx % 2 === 0;

                  return (
                    <tr
                      key={verdict.id}
                      style={{
                        background: isEven ? '#F9F8F6' : '#FFFFFF',
                        borderBottom: '1px solid #E5E0D8',
                      }}
                    >
                      <td
                        style={{
                          padding: '12px',
                          fontFamily: 'Roboto Mono, monospace',
                          fontWeight: 600,
                          color: '#111111',
                        }}
                      >
                        {verdict.year}
                      </td>
                      <td style={{ padding: '12px', color: '#374151' }}>{verdict.caseType}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            background: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          {getOutcomeLabel(verdict.outcome)}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '12px',
                          textAlign: 'right',
                          fontFamily: 'Roboto Mono, monospace',
                          color: '#111111',
                          fontWeight: 500,
                        }}
                      >
                        {verdict.amount ? formatCurrency(verdict.amount) : '—'}
                      </td>
                      <td
                        style={{
                          padding: '12px',
                          textAlign: 'right',
                          fontFamily: 'Roboto Mono, monospace',
                          color: '#6B7280',
                        }}
                      >
                        {verdict.duration} {t.days}
                      </td>
                      <td style={{ padding: '12px', color: '#374151' }}>{verdict.judge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: '1px solid #E5E0D8',
                fontSize: '12px',
                color: '#6B7280',
              }}
            >
              <span style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
                {t.pagination}: {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, sortedVerdicts.length)} {t.of}{' '}
                {sortedVerdicts.length}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid #D1D5DB',
                    background: currentPage === 1 ? '#F3F4F6' : '#FFFFFF',
                    color: currentPage === 1 ? '#9CA3AF' : '#374151',
                    borderRadius: '6px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {es ? 'Anterior' : 'Previous'}
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    border: '1px solid #D1D5DB',
                    background: currentPage === totalPages ? '#F3F4F6' : '#FFFFFF',
                    color: currentPage === totalPages ? '#9CA3AF' : '#374151',
                    borderRadius: '6px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: 'Roboto, system-ui, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {es ? 'Siguiente' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Gate behind 'unlimited' tier
  return (
    <FeatureGate userTier={userTier} feature="historical_verdicts" lang={lang}>
      {content}
    </FeatureGate>
  );
}
