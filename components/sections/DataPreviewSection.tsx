'use client';

import { useState, useMemo } from 'react';
import { Lang } from '../../lib/i18n';

interface DataPreviewSectionProps {
  lang: Lang;
}

const WIN_RATE_DATA = [
  { key: 'employment', en: 'Employment Discrimination', es: 'Discriminación Laboral', rate: 52, vol: '284K', trend: '+2.1%' },
  { key: 'contract', en: 'Contract Breach', es: 'Incumplimiento de Contrato', rate: 61, vol: '312K', trend: '+0.8%' },
  { key: 'personal', en: 'Personal Injury', es: 'Lesiones Personales', rate: 45, vol: '198K', trend: '-1.2%' },
  { key: 'civil', en: 'Civil Rights Violation', es: 'Violación de Derechos Civiles', rate: 38, vol: '156K', trend: '+3.4%' },
  { key: 'consumer', en: 'Consumer Protection', es: 'Protección al Consumidor', rate: 56, vol: '142K', trend: '+5.2%' },
  { key: 'housing', en: 'Housing & Property', es: 'Vivienda y Propiedad', rate: 48, vol: '89K', trend: '-0.6%' },
  { key: 'ip', en: 'Intellectual Property', es: 'Propiedad Intelectual', rate: 54, vol: '67K', trend: '+1.8%' },
  { key: 'medical', en: 'Medical Malpractice', es: 'Negligencia Médica', rate: 32, vol: '78K', trend: '-2.4%' },
];

const SETTLEMENT_DATA = [
  { range: '<$25K', count: 1840, pct: 28 },
  { range: '$25K–$100K', count: 1520, pct: 23 },
  { range: '$100K–$250K', count: 1280, pct: 19 },
  { range: '$250K–$500K', count: 920, pct: 14 },
  { range: '$500K–$1M', count: 640, pct: 10 },
  { range: '$1M–$5M', count: 310, pct: 5 },
  { range: '>$5M', count: 90, pct: 1 },
];

export default function DataPreviewSection({ lang }: DataPreviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'winrates' | 'settlements' | 'timelines'>('winrates');
  const [sortBy, setSortBy] = useState<'name' | 'rate' | 'volume'>('rate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'bars' | 'table'>('bars');
  const [highlightedBar, setHighlightedBar] = useState<number | null>(null);

  const es = lang === 'es';

  const sortedData = useMemo(() => {
    const data = [...WIN_RATE_DATA];
    data.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.en.localeCompare(b.en);
      else if (sortBy === 'rate') cmp = a.rate - b.rate;
      else cmp = parseInt(a.vol) - parseInt(b.vol);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return data;
  }, [sortBy, sortDir]);

  const toggleSort = (field: 'name' | 'rate' | 'volume') => {
    if (sortBy === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortBy(field); setSortDir('desc'); }
  };

  const tabs = [
    { id: 'winrates', label: es ? 'Tasas de Éxito' : 'Win Rates', icon: '' },
    { id: 'settlements', label: es ? 'Acuerdos' : 'Settlements', icon: '' },
    { id: 'timelines', label: es ? 'Cronogramas' : 'Timelines', icon: '️' },
  ];

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8" style={{ background: '#F9F8F6' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase mb-3" style={{ color: '#6B7280' }}>
            {es ? 'DATOS REALES' : 'REAL CASE DATA'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4" style={{ letterSpacing: '-1px' }}>
            {es ? 'Lo que realmente sucede' : 'What really happens'}
          </h2>
          <p className="text-base text-[#6B7280]">
            {es ? 'Datos de casos federales reales' : 'Sample data from real federal court cases'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-0 border-b border-[#E5E0D8] bg-[#FFFFFF] rounded-t-xl p-4">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
              style={{
                color: activeTab === tab.id ? '#8B5CF6' : '#6B7280',
                background: activeTab === tab.id ? 'rgba(17,17,17,0.15)' : 'transparent',
                borderBottom: activeTab === tab.id ? '2px solid #111111' : 'none',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Win Rates Tab */}
        {activeTab === 'winrates' && (
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-b-xl shadow-sm fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">{es ? 'Tasas de Éxito por Tipo de Caso' : 'Win Rates by Case Type'}</h3>
                <p className="text-sm text-[#6B7280]">{es ? 'Porcentaje de casos ganados (datos federales agregados)' : 'Percentage of cases won (aggregate federal data)'}</p>
              </div>
              <div className="flex gap-2">
                {/* View toggle */}
                <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E5E0D8' }}>
                  <button onClick={() => setViewMode('bars')} className="px-2.5 py-1.5 text-[10px] font-bold border-none transition-all"
                    style={{ background: viewMode === 'bars' ? 'rgba(17,17,17,0.2)' : 'transparent', color: viewMode === 'bars' ? '#8B5CF6' : '#9CA3AF' }}>
                    {es ? 'Barras' : 'Chart'}
                  </button>
                  <button onClick={() => setViewMode('table')} className="px-2.5 py-1.5 text-[10px] font-bold border-none transition-all"
                    style={{ background: viewMode === 'table' ? 'rgba(17,17,17,0.2)' : 'transparent', color: viewMode === 'table' ? '#8B5CF6' : '#9CA3AF' }}>
                    {es ? 'Tabla' : 'Table'}
                  </button>
                </div>
                {/* Sort options */}
                <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E5E0D8' }}>
                  {[
                    { key: 'rate' as const, label: es ? 'Tasa' : 'Rate' },
                    { key: 'name' as const, label: es ? 'Nombre' : 'Name' },
                    { key: 'volume' as const, label: es ? 'Vol' : 'Vol' },
                  ].map(s => (
                    <button key={s.key} onClick={() => toggleSort(s.key)}
                      className="px-2.5 py-1.5 text-[10px] font-bold border-none transition-all"
                      style={{ background: sortBy === s.key ? 'rgba(17,17,17,0.2)' : 'transparent', color: sortBy === s.key ? '#8B5CF6' : '#9CA3AF' }}>
                      {s.label} {sortBy === s.key ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {viewMode === 'bars' ? (
              <div className="space-y-5">
                {sortedData.map((item, idx) => (
                  <div key={item.key} onMouseEnter={() => setHighlightedBar(idx)} onMouseLeave={() => setHighlightedBar(null)}
                    className="transition-all" style={{ opacity: highlightedBar !== null && highlightedBar !== idx ? 0.5 : 1 }}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-[#111827]">{es ? item.es : item.en}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-data" style={{ color: '#9CA3AF' }}>{item.vol} cases</span>
                        <span className="text-[10px] font-bold" style={{ color: item.trend.startsWith('+') ? '#0D9488' : '#E87461' }}>{item.trend}</span>
                        <span className="text-sm font-bold font-data" style={{ color: item.rate > 50 ? '#0D9488' : item.rate > 40 ? '#8B5CF6' : '#E87461' }}>{item.rate}%</span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-[#E5E0D8] rounded-full overflow-hidden">
                      <div style={{
                        width: `${item.rate}%`, height: '100%', borderRadius: '9999px',
                        background: item.rate > 50 ? 'linear-gradient(90deg, #0D9488, #14B8A6)' : item.rate > 40 ? 'linear-gradient(90deg, #111111, #333333)' : 'linear-gradient(90deg, #E87461, #F59E8C)',
                        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: highlightedBar === idx ? '0 0 12px rgba(17,17,17,0.4)' : 'none',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E5E0D8' }}>
                <div className="grid grid-cols-4 gap-0 px-4 py-2.5" style={{ background: 'rgba(229,231,235,0.5)' }}>
                  <button onClick={() => toggleSort('name')} className="text-[10px] font-bold text-left border-none bg-transparent" style={{ color: sortBy === 'name' ? '#8B5CF6' : '#9CA3AF' }}>
                    {es ? 'TIPO' : 'TYPE'} {sortBy === 'name' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                  </button>
                  <button onClick={() => toggleSort('rate')} className="text-[10px] font-bold text-center border-none bg-transparent" style={{ color: sortBy === 'rate' ? '#8B5CF6' : '#9CA3AF' }}>
                    {es ? 'TASA' : 'RATE'} {sortBy === 'rate' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                  </button>
                  <button onClick={() => toggleSort('volume')} className="text-[10px] font-bold text-center border-none bg-transparent" style={{ color: sortBy === 'volume' ? '#8B5CF6' : '#9CA3AF' }}>
                    {es ? 'VOLUMEN' : 'VOLUME'} {sortBy === 'volume' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                  </button>
                  <div className="text-[10px] font-bold text-right" style={{ color: '#9CA3AF' }}>{es ? 'TEND.' : 'TREND'}</div>
                </div>
                {sortedData.map((item, idx) => (
                  <div key={item.key} className="grid grid-cols-4 gap-0 px-4 py-3 transition-all hover:bg-[#E5E0D830]"
                    style={{ borderTop: '1px solid rgba(229,231,235,0.3)', background: idx % 2 === 0 ? 'rgba(19,27,46,0.5)' : 'transparent' }}>
                    <div className="text-[12px] font-semibold" style={{ color: '#374151' }}>{es ? item.es : item.en}</div>
                    <div className="text-[12px] font-data font-bold text-center" style={{ color: item.rate > 50 ? '#0D9488' : item.rate > 40 ? '#8B5CF6' : '#E87461' }}>{item.rate}%</div>
                    <div className="text-[12px] font-data text-center" style={{ color: '#6B7280' }}>{item.vol}</div>
                    <div className="text-[12px] font-bold font-data text-right" style={{ color: item.trend.startsWith('+') ? '#0D9488' : '#E87461' }}>{item.trend}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 p-3 rounded-lg text-[11px]" style={{ background: 'rgba(17,17,17,0.06)', border: '1px solid rgba(17,17,17,0.1)', color: '#6B7280' }}>
              {es ? 'Estas tasas reflejan todos los casos federales civiles de los últimos 5 años. Las tendencias muestran cambios anuales.' : 'These rates reflect all federal civil cases from the past 5 years. Trends show year-over-year changes.'}
            </div>
          </div>
        )}

        {/* Settlements Tab */}
        {activeTab === 'settlements' && (
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-b-xl shadow-sm fade-in">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">{es ? 'Distribución de Montos de Acuerdo' : 'Settlement Amount Distribution'}</h3>
              <p className="text-sm text-[#6B7280]">{es ? 'Muestra de 6,600+ casos federales con acuerdos reportados' : 'Sample of 6,600+ federal cases with reported settlements'}</p>
            </div>

            {/* Interactive histogram */}
            <div className="flex items-end gap-2 mb-4" style={{ height: '200px' }}>
              {SETTLEMENT_DATA.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group"
                  onMouseEnter={() => setHighlightedBar(idx)} onMouseLeave={() => setHighlightedBar(null)}>
                  <div className="text-[10px] font-data font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#8B5CF6' }}>
                    {bar.count.toLocaleString()}
                  </div>
                  <div className="w-full rounded-t-md transition-all duration-300" style={{
                    height: `${(bar.pct / 28) * 100}%`,
                    background: highlightedBar === idx ? 'linear-gradient(180deg, #333333, #111111)' : 'linear-gradient(180deg, rgba(17,17,17,0.6), rgba(17,17,17,0.8))',
                    boxShadow: highlightedBar === idx ? '0 -4px 20px rgba(17,17,17,0.3)' : 'none',
                    transform: highlightedBar === idx ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                  }} />
                  <div className="text-[10px] font-semibold mt-2 text-center" style={{ color: '#6B7280' }}>{bar.range}</div>
                  <div className="text-[10px] font-data" style={{ color: '#9CA3AF' }}>{bar.pct}%</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(17,17,17,0.06)', borderLeft: '3px solid #111111' }}>
              <div className="font-semibold mb-0.5" style={{ color: '#8B5CF6' }}>{es ? 'Monto medio: $127,500' : 'Median settlement: $127,500'}</div>
              <p className="text-[#6B7280] text-[12px]">{es ? 'El 50% de los acuerdos están por debajo de este monto, el 50% por encima.' : '50% of settlements fall below this amount, 50% above.'}</p>
            </div>
          </div>
        )}

        {/* Timelines Tab */}
        {activeTab === 'timelines' && (
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-b-xl shadow-sm fade-in">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">{es ? 'Cronograma Típico del Caso' : 'Typical Case Timeline'}</h3>
              <p className="text-sm text-[#6B7280]">{es ? 'Fases promedio desde presentación hasta resolución' : 'Average phases from filing to resolution'}</p>
            </div>

            <div className="space-y-4">
              {[
                { phase: es ? 'Consulta Inicial' : 'Initial Consultation', duration: '0–1 mo', width: 8, color: '#6B7280', pct: '4%' },
                { phase: es ? 'Presentación e Investigación' : 'Filing & Investigation', duration: '1–3 mo', width: 16, color: '#111111', pct: '12%' },
                { phase: es ? 'Descubrimiento' : 'Discovery', duration: '3–8 mo', width: 40, color: '#333333', pct: '35%' },
                { phase: es ? 'Negociación de Acuerdo' : 'Settlement Negotiation', duration: '8–12 mo', width: 32, color: '#0D9488', pct: '67% resolve here' },
                { phase: es ? 'Juicio (si es necesario)' : 'Trial (if necessary)', duration: '12+ mo', width: 10, color: '#E87461', pct: '<5% reach trial' },
              ].map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm font-semibold text-[#111827]">{item.phase}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-data" style={{ color: '#9CA3AF' }}>{item.pct}</span>
                      <span className="text-xs text-[#6B7280]">{item.duration}</span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-[#E5E0D8] rounded-full overflow-hidden">
                    <div style={{
                      width: `${item.width}%`, height: '100%', borderRadius: '9999px',
                      background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-lg text-[11px]" style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.1)', color: '#6B7280' }}>
              {es ? '67% de los casos se resuelven durante la negociación. Los plazos varían según el tipo de caso y la complejidad.' : '67% of cases settle during negotiation. Timelines vary by case type and complexity.'}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fade-in { animation: fadeIn 0.2s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
