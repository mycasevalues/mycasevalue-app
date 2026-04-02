'use client';

import React, { useState, useEffect } from 'react';

interface DataSource {
  name: string;
  status: 'live' | 'synced' | 'stale';
  lastSync?: string;
}

interface DataFreshnessProps {
  lastUpdated?: string;
  totalCases?: number;
  sources?: DataSource[];
  lang?: 'en' | 'es';
  compact?: boolean;
}

const DEFAULT_SOURCES: DataSource[] = [
  { name: 'Federal Judicial Center IDB', status: 'synced', lastSync: '2026-03-15' },
  { name: 'CourtListener API', status: 'live' },
  { name: 'PACER Records', status: 'synced', lastSync: '2026-03-10' },
];

const TRANSLATIONS = {
  en: {
    dataUpdated: 'Data updated',
    cases: 'cases',
    dataPipelineStatus: 'Data Pipeline Status',
    howWeCollectData: 'How we collect data',
    lastSync: 'Last sync',
    dataSource: 'Data source',
    status: 'Status',
    live: 'Live',
    synced: 'Synced',
    stale: 'Stale',
    totalCases: 'Total Cases',
    justNow: 'just now',
  },
  es: {
    dataUpdated: 'Datos actualizados',
    cases: 'casos',
    dataPipelineStatus: 'Estado de la canalización de datos',
    howWeCollectData: 'Cómo recopilamos datos',
    lastSync: 'Última sincronización',
    dataSource: 'Fuente de datos',
    status: 'Estado',
    live: 'En directo',
    synced: 'Sincronizado',
    stale: 'Obsoleto',
    totalCases: 'Casos totales',
    justNow: 'hace poco',
  },
};

const formatDate = (dateString: string, lang: string = 'en'): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return lang === 'es' ? 'Hoy' : 'Today';
  if (isYesterday) return lang === 'es' ? 'Ayer' : 'Yesterday';

  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString(locale, options);
};

const formatCaseNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

const getOverallStatus = (sources: DataSource[]): 'live' | 'synced' | 'stale' => {
  if (sources.some((s) => s.status === 'live')) return 'live';
  if (sources.some((s) => s.status === 'stale')) return 'stale';
  return 'synced';
};

const getStatusDotColor = (status: 'live' | 'synced' | 'stale'): string => {
  switch (status) {
    case 'live':
      return '#5EEAD4';
    case 'synced':
      return '#10B981';
    case 'stale':
      return '#FBBF24';
  }
};

export default function DataFreshness({
  lastUpdated = '2026-03-15',
  totalCases = 4100000,
  sources = DEFAULT_SOURCES,
  lang = 'en',
  compact = false,
}: DataFreshnessProps) {
  const t = TRANSLATIONS[lang];
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const overallStatus = getOverallStatus(sources);

  useEffect(() => {
    let current = 0;
    const target = totalCases;
    const increment = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplayCount(current);
    }, 20);
    return () => clearInterval(interval);
  }, [totalCases]);

  const formattedDate = formatDate(lastUpdated, lang);
  const formattedCases = formatCaseNumber(totalCases);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded text-sm" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#10B981' }}
          />
          <span style={{ color: '#111827' }}>
            {t.dataUpdated} {formattedDate} · <span className="font-mono">{formatCaseNumber(displayCount)}</span>
            <span style={{ color: '#6B7280' }}>
              {' '}
              {t.cases}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-lg border overflow-hidden"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E0D8' }}
    >
      <button type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse data pipeline status' : 'Expand data pipeline status'}
        className="w-full px-4 py-4 flex items-center justify-between hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              overallStatus === 'live' ? 'animate-pulse' : ''
            }`}
            style={{ backgroundColor: getStatusDotColor(overallStatus) }}
          />
          <div className="text-left">
            <div style={{ color: '#111827' }} className="font-medium">
              {t.dataPipelineStatus}
            </div>
            <div style={{ color: '#6B7280' }} className="text-sm">
              {lang === 'es' ? 'Última actualización' : 'Last updated'} {formattedDate}
            </div>
          </div>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: '#6B7280' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isExpanded && (
        <div
          className="border-t px-4 py-4 space-y-4"
          style={{ borderColor: '#E5E0D8' }}
        >
          <div className="space-y-3">
            {sources.map((source, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid #E5E0D8' }}>
                <div className="flex-1">
                  <div style={{ color: '#111827' }} className="text-sm font-medium">
                    {source.name}
                  </div>
                  {source.lastSync && (
                    <div style={{ color: '#6B7280' }} className="text-xs mt-1">
                      {t.lastSync}: {formatDate(source.lastSync, lang)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {source.status === 'live' && (
                    <div role="status" aria-label={`${source.name}: ${t.live}`} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: '#0F766E', color: '#5EEAD4' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                      {t.live}
                    </div>
                  )}
                  {source.status === 'synced' && (
                    <div role="status" aria-label={`${source.name}: ${t.synced}`} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: '#064E3B', color: '#10B981' }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t.synced}
                    </div>
                  )}
                  {source.status === 'stale' && (
                    <div role="status" aria-label={`${source.name}: ${t.stale}`} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: '#78350F', color: '#FBBF24' }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t.stale}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div
              className="p-4 rounded"
              style={{ backgroundColor: '#E5E0D8' }}
            >
              <div style={{ color: '#111827' }} className="font-semibold text-sm mb-2">
                {t.totalCases}
              </div>
              <div style={{ color: '#5EEAD4' }} className="text-3xl font-bold font-mono">
                {formatCaseNumber(displayCount)}
              </div>
            </div>
          </div>

          <details className="pt-2">
            <summary
              className="cursor-pointer flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: '#111111' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 000 2h6a1 1 0 000-2H8zm0 3a1 1 0 000 2h3a1 1 0 000-2H8z" clipRule="evenodd" />
              </svg>
              {t.howWeCollectData}
            </summary>
            <div
              className="mt-3 p-3 rounded text-sm leading-relaxed space-y-2"
              style={{ backgroundColor: '#E5E0D8', color: '#6B7280' }}
            >
              {lang === 'es' ? (
                <>
                  <p>
                    Agregamos datos de tres fuentes principales: la Base de Datos Integrada (IDB) del Centro
                    Judicial Federal para registros históricos completos, la API de CourtListener para
                    actualizaciones en tiempo real, y registros de PACER para documentos detallados de casos.
                  </p>
                  <p>
                    Los datos se sincronizan y validan continuamente para garantizar su precisión. Las fuentes
                    en vivo se actualizan automáticamente, mientras que las fuentes sincronizadas se actualizan
                    diariamente. Todos los datos se deduplicán y cruzan para evitar conteos dobles.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We aggregate case data from three primary sources: the Federal Judicial Center&apos;s
                    Integrated Database (IDB) for comprehensive historical records, the CourtListener API
                    for real-time updates on filed cases, and PACER records for detailed case documents
                    and filings.
                  </p>
                  <p>
                    Data is continuously synchronized and validated to ensure accuracy. Live sources update
                    automatically, while synced sources are refreshed daily. All data is deduplicated and
                    cross-referenced to prevent double-counting.
                  </p>
                </>
              )}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
