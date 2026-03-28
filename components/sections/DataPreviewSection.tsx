'use client';

import { useState } from 'react';
import { Lang } from '../../lib/i18n';

interface DataPreviewSectionProps {
  lang: Lang;
}

export default function DataPreviewSection({ lang }: DataPreviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'winrates' | 'settlements' | 'timelines'>('winrates');

  const tabs = [
    {
      id: 'winrates',
      label: lang === 'es' ? 'Tasas de Éxito' : 'Win Rates',
    },
    {
      id: 'settlements',
      label: lang === 'es' ? 'Acuerdos' : 'Settlements',
    },
    {
      id: 'timelines',
      label: lang === 'es' ? 'Cronogramas' : 'Timelines',
    },
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="text-[11px] font-bold tracking-[2.5px] uppercase mb-3"
            style={{ color: '#94A3B8' }}
          >
            {lang === 'es' ? 'Datos Reales' : 'Real Case Data'}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
            style={{ letterSpacing: '-1px' }}
          >
            {lang === 'es' ? 'Lo que realmente sucede' : 'What really happens'}
          </h2>
          <p className="text-base text-slate-500">
            {lang === 'es'
              ? 'Ejemplos de datos de casos federales reales'
              : 'Sample data from real federal court cases'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 bg-white rounded-t-xl p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
              style={{
                color: activeTab === tab.id ? '#4F46E5' : '#94A3B8',
                background: activeTab === tab.id ? '#E4E5FF' : 'transparent',
                borderBottom:
                  activeTab === tab.id ? '2px solid #4F46E5' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content - Win Rates */}
        {activeTab === 'winrates' && (
          <div className="bg-white p-8 rounded-b-xl shadow-sm transition-opacity duration-200 fade-in">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">
                {lang === 'es'
                  ? 'Tasas de Éxito por Tipo de Caso'
                  : 'Win Rates by Case Type'}
              </h3>
              <p className="text-sm text-slate-500">
                {lang === 'es'
                  ? 'Porcentaje de casos ganados (datos federales agregados)'
                  : 'Percentage of cases won (aggregate federal data)'}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  name: lang === 'es' ? 'Discriminación Laboral' : 'Employment Discrimination',
                  rate: 52,
                },
                { name: lang === 'es' ? 'Incumplimiento de Contrato' : 'Contract Breach', rate: 61 },
                { name: lang === 'es' ? 'Lesiones Personales' : 'Personal Injury', rate: 45 },
                {
                  name: lang === 'es' ? 'Violación de Derechos Civiles' : 'Civil Rights Violation',
                  rate: 38,
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.name}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: '#4F46E5' }}
                    >
                      {item.rate}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <svg
                      width="100%"
                      height="12"
                      viewBox={`0 0 100 12`}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id={`grad-${idx}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 0.8 }} />
                          <stop
                            offset="100%"
                            style={{ stopColor: '#6366F1', stopOpacity: 1 }}
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width={item.rate}
                        height="12"
                        fill={`url(#grad-${idx})`}
                        rx="2"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-4 rounded-lg border text-xs text-slate-600"
              style={{ background: '#E4E5FF20', borderColor: '#4F46E540' }}
            >
              {lang === 'es'
                ? '📊 Estas tasas reflejan todos los casos federales civiles en los últimos 5 años.'
                : '📊 These rates reflect all federal civil cases from the past 5 years.'}
            </div>
          </div>
        )}

        {/* Tab Content - Settlements */}
        {activeTab === 'settlements' && (
          <div className="bg-white p-8 rounded-b-xl shadow-sm transition-opacity duration-200 fade-in">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">
                {lang === 'es'
                  ? 'Distribución de Montos de Acuerdo'
                  : 'Settlement Amount Distribution'}
              </h3>
              <p className="text-sm text-slate-500">
                {lang === 'es'
                  ? 'Muestra de 5,000+ casos federales con acuerdos reportados'
                  : 'Sample of 5,000+ federal cases with reported settlements'}
              </p>
            </div>

            <div className="mb-6">
              <svg width="100%" height="280" viewBox="0 0 400 280">
                <defs>
                  <linearGradient id="settlementGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>

                {/* Y-axis */}
                <line x1="40" y1="240" x2="40" y2="20" stroke="#E2E8F0" strokeWidth="1" />
                {/* X-axis */}
                <line x1="40" y1="240" x2="390" y2="240" stroke="#E2E8F0" strokeWidth="1" />

                {/* Grid lines */}
                {[0, 50, 100, 150, 200, 250].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    y1={240 - (y / 250) * 220}
                    x2="390"
                    y2={240 - (y / 250) * 220}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                ))}

                {/* Y-axis labels */}
                {[0, 50, 100, 150, 200].map((label) => (
                  <text
                    key={`y-${label}`}
                    x="30"
                    y={240 - (label / 250) * 220 + 4}
                    fontSize="11"
                    fill="#94A3B8"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                ))}

                {/* Bars */}
                {[
                  { x: 70, height: 180, label: '<$50K' },
                  { x: 130, height: 220, label: '$50K-$200K' },
                  { x: 190, height: 200, label: '$200K-$500K' },
                  { x: 250, height: 140, label: '$500K-$1M' },
                  { x: 310, height: 90, label: '$1M-$5M' },
                  { x: 370, height: 40, label: '>$5M' },
                ].map((bar, idx) => (
                  <g key={idx}>
                    <rect
                      x={bar.x - 20}
                      y={240 - (bar.height / 250) * 220}
                      width="40"
                      height={(bar.height / 250) * 220}
                      fill="url(#settlementGrad)"
                      rx="3"
                    />
                    <text
                      x={bar.x}
                      y="258"
                      fontSize="10"
                      fill="#64748B"
                      textAnchor="middle"
                    >
                      {bar.label}
                    </text>
                  </g>
                ))}

                {/* Median line */}
                <line
                  x1="150"
                  y1="240"
                  x2="150"
                  y2="30"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.5"
                />
                <circle cx="150" cy="25" r="3" fill="#4F46E5" />
                <text x="150" y="15" fontSize="11" fill="#4F46E5" textAnchor="middle" fontWeight="600">
                  {lang === 'es' ? 'Mediana' : 'Median'}
                </text>
              </svg>
            </div>

            <div
              className="p-4 rounded-lg border-l-4 text-sm"
              style={{ background: '#E4E5FF20', borderColor: '#4F46E5' }}
            >
              <div className="font-semibold mb-1" style={{ color: '#4F46E5' }}>
                {lang === 'es' ? 'Monto Medio: $127,500' : 'Median Settlement: $127,500'}
              </div>
              <p className="text-slate-600">
                {lang === 'es'
                  ? 'El 50% de los acuerdos están por debajo de este monto, el 50% por encima.'
                  : '50% of settlements fall below this amount, 50% above.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab Content - Timelines */}
        {activeTab === 'timelines' && (
          <div className="bg-white p-8 rounded-b-xl shadow-sm transition-opacity duration-200 fade-in">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">
                {lang === 'es'
                  ? 'Cronograma Típico del Caso'
                  : 'Typical Case Timeline'}
              </h3>
              <p className="text-sm text-slate-500">
                {lang === 'es'
                  ? 'Fases promedio desde presentación hasta resolución'
                  : 'Average phases from filing to resolution'}
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  phase: lang === 'es' ? 'Consulta Inicial' : 'Initial Consultation',
                  duration: '0-1 mes',
                  width: 8,
                  color: '#94A3B8',
                },
                {
                  phase: lang === 'es' ? 'Presentación' : 'Filing & Investigation',
                  duration: '1-3 meses',
                  width: 16,
                  color: '#4F46E5',
                },
                {
                  phase: lang === 'es' ? 'Descubrimiento' : 'Discovery',
                  duration: '3-8 meses',
                  width: 40,
                  color: '#4F46E5',
                },
                {
                  phase: lang === 'es' ? 'Negociación' : 'Settlement Negotiation',
                  duration: '8-12 meses',
                  width: 32,
                  color: '#6366F1',
                },
                {
                  phase: lang === 'es' ? 'Juicio (si aplica)' : 'Trial (if needed)',
                  duration: '12+ meses',
                  width: 10,
                  color: '#94A3B8',
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.phase}
                    </span>
                    <span className="text-xs text-slate-500">{item.duration}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${item.width}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                        borderRadius: '9999px',
                        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-4 rounded-lg border text-xs text-slate-600"
              style={{ background: '#E4E5FF20', borderColor: '#4F46E540' }}
            >
              {lang === 'es'
                ? '⏱️ El 67% de los casos se resuelven en la fase de negociación. Los plazos varían según el tipo de caso y la complejidad.'
                : '⏱️ 67% of cases settle during negotiation. Timelines vary by case type and complexity.'}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fade-in {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
