'use client';

import React, { useState, useMemo } from 'react';
import { SITS, OUTCOME_DATA } from '../../lib/data';

interface CaseComparisonProps {
  lang?: 'en' | 'es';
}

interface SelectedCase {
  label: string;
  nos: string;
}

type MetricKey = 'winRate' | 'settlementRate' | 'duration' | 'recovery' | 'attorneyImpact';

const CaseComparison: React.FC<CaseComparisonProps> = ({ lang = 'en' }) => {
  const [selectedCases, setSelectedCases] = useState<(SelectedCase | null)[]>([null, null, null]);

  const labels = {
    en: {
      title: 'Compare Case Types',
      subtitle: 'Analyze metrics side by side',
      selectCase: 'Select case type',
      winRate: 'Win Rate',
      settlementRate: 'Settlement Rate',
      medianDuration: 'Median Duration',
      typicalRecovery: 'Typical Recovery',
      attorneyImpact: 'Attorney Impact',
      noData: 'No data',
      bestValue: 'Best value',
      months: 'months',
      unknown: 'Unknown'
    },
    es: {
      title: 'Comparar Tipos de Casos',
      subtitle: 'Analiza métricas lado a lado',
      selectCase: 'Seleccionar tipo de caso',
      winRate: 'Tasa de Ganancia',
      settlementRate: 'Tasa de Transacción',
      medianDuration: 'Duración Mediana',
      typicalRecovery: 'Recuperación Típica',
      attorneyImpact: 'Impacto del Abogado',
      noData: 'Sin datos',
      bestValue: 'Mejor valor',
      months: 'meses',
      unknown: 'Desconocido'
    }
  };

  const t = labels[lang || 'en'];

  // Flatten all case options
  const allCaseOptions = useMemo(() => {
    return SITS.flatMap(category =>
      (category.opts || []).map(opt => ({
        label: opt.label,
        nos: opt.nos,
        categoryId: category.id
      }))
    );
  }, []);

  // Get outcome data for a case
  const getOutcomeData = (nos: string) => {
    return OUTCOME_DATA[nos] || OUTCOME_DATA._default || {};
  };

  // Calculate metrics for a case
  const getMetrics = (nos: string) => {
    const data = getOutcomeData(nos);
    const winRate = data.trial_win ? ((data.trial_win / (data.trial_win + data.trial_loss || 1)) * 100).toFixed(1) : null;
    const settlementRate = data.fav_set ? parseFloat(data.fav_set).toFixed(1) : null;
    const duration = data.set_mo ? data.set_mo : null;
    const recovery = data.trial_med ? data.trial_med : null;

    return { winRate, settlementRate, duration, recovery };
  };

  // Get best value for each metric
  const getBestValues = () => {
    const active = selectedCases.filter((c): c is SelectedCase => c !== null);
    if (active.length === 0) return {};

    const best: Record<MetricKey, string | null> = {
      winRate: null,
      settlementRate: null,
      duration: null,
      recovery: null,
      attorneyImpact: null
    };

    const winRates = active.map((c, i) => ({ i, v: parseFloat(getMetrics(c.nos).winRate || '0') }));
    if (winRates.some(w => w.v > 0)) best.winRate = active[winRates.reduce((a, b) => a.v > b.v ? a : b).i].nos;

    const settleRates = active.map((c, i) => ({ i, v: parseFloat(getMetrics(c.nos).settlementRate || '0') }));
    if (settleRates.some(s => s.v > 0)) best.settlementRate = active[settleRates.reduce((a, b) => a.v > b.v ? a : b).i].nos;

    const durations = active.map((c, i) => ({ i, v: getMetrics(c.nos).duration || 999 }));
    if (durations.some(d => d.v < 999)) best.duration = active[durations.reduce((a, b) => a.v < b.v ? a : b).i].nos;

    return best;
  };

  const bestValues = getBestValues();
  const activeCount = selectedCases.filter(c => c !== null).length;

  return (
    <div style={{ backgroundColor: '#0B1221', minHeight: '100vh' }} className="p-6 md:p-8">
      <style>{`
        /* Fonts loaded globally via styles/fonts.css */

        .case-comparison-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .metric-card {
          background: linear-gradient(135deg, #131B2E 0%, #1a2847 100%);
          border: 1px solid #1E293B;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .metric-card:hover {
          border-color: #4F46E5;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.15);
        }

        .selector-card {
          background: #131B2E;
          border: 2px solid #1E293B;
          border-radius: 10px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .selector-card:hover {
          border-color: #4F46E5;
        }

        .bar-container {
          background: rgba(79, 70, 229, 0.08);
          border-radius: 6px;
          height: 32px;
          overflow: hidden;
          position: relative;
          margin-top: 8px;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #4F46E5 0%, #6366F1 100%);
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .bar-fill.best {
          background: linear-gradient(90deg, #0D9488 0%, #14B8A6 100%);
          box-shadow: 0 0 12px rgba(13, 148, 136, 0.3);
        }

        select {
          background: #0B1221;
          color: #E2E8F0;
          border: 2px solid #1E293B;
          border-radius: 8px;
          padding: 10px 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          transition: all 0.2s;
          cursor: pointer;
          width: 100%;
        }

        select:hover {
          border-color: #4F46E5;
        }

        select:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 12px rgba(79, 70, 229, 0.2);
        }

        select option {
          background: #131B2E;
          color: #E2E8F0;
        }

        .section-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #E2E8F0;
          margin-bottom: 24px;
        }

        .metric-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 16px;
          color: #E2E8F0;
        }

        .no-selection {
          color: #64748B;
          font-size: 13px;
          padding: 24px 16px;
          text-align: center;
        }
      `}</style>

      <div className="max-w-7xl mx-auto case-comparison-fade-in">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 className="section-title">{t.title}</h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '24px' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Case Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[0, 1, 2].map(index => (
            <div key={index} className="selector-card">
              <label style={{ display: 'block', color: '#64748B', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t.selectCase} {index + 1}
              </label>
              <select
                value={selectedCases[index]?.nos || ''}
                onChange={(e) => {
                  const selected = allCaseOptions.find(opt => opt.nos === e.target.value);
                  const newCases = [...selectedCases];
                  newCases[index] = selected ? { label: selected.label, nos: selected.nos } : null;
                  setSelectedCases(newCases);
                }}
              >
                <option value="">{t.selectCase}</option>
                {allCaseOptions.map(opt => (
                  <option key={`${opt.nos}-${opt.label}`} value={opt.nos}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {activeCount > 0 ? (
          <div style={{ display: 'grid', gap: '24px' }}>
            {[
              { key: 'winRate' as MetricKey, label: t.winRate, format: (v: string | null) => v ? `${v}%` : t.noData },
              { key: 'settlementRate' as MetricKey, label: t.settlementRate, format: (v: string | null) => v ? `${v}%` : t.noData },
              { key: 'duration' as MetricKey, label: t.medianDuration, format: (v: string | null) => v ? `${v} ${t.months}` : t.noData },
              { key: 'recovery' as MetricKey, label: t.typicalRecovery, format: (v: string | null) => v || t.noData }
            ].map(metric => (
              <div key={metric.key} className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${activeCount}, 1fr)`, gap: '16px', marginTop: '16px' }}>
                  {selectedCases.map((caseItem, idx) => {
                    if (!caseItem) return null;
                    const metrics = getMetrics(caseItem.nos);
                    const value = metrics[metric.key as keyof typeof metrics];
                    const isBest = bestValues[metric.key] === caseItem.nos;
                    const numValue = metric.key === 'recovery' ? 0 : parseFloat((value as string) || '0');
                    const maxValue = selectedCases
                      .filter((c): c is SelectedCase => c !== null)
                      .reduce((max, c) => {
                        const m = getMetrics(c.nos);
                        const v = metric.key === 'recovery' ? 0 : parseFloat((m[metric.key as keyof typeof m] as string) || '0');
                        return Math.max(max, v);
                      }, 0) || 100;
                    const percentage = maxValue > 0 ? (numValue / maxValue) * 100 : 0;

                    return (
                      <div key={idx}>
                        <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '8px' }}>
                          {caseItem.label}
                        </div>
                        <div className="metric-value">{metric.format(value as string | null)}</div>
                        {metric.key !== 'recovery' && (
                          <div className="bar-container">
                            <div
                              className={`bar-fill ${isBest ? 'best' : ''}`}
                              style={{ width: `${percentage}%` }}
                            >
                              {isBest && percentage > 15 && <span>✓</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="metric-card">
            <div className="no-selection">
              {t.selectCase}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseComparison;
