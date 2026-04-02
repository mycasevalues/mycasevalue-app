'use client';

import React, { useState } from 'react';

interface DataMethodologySectionProps {
  lang?: 'en' | 'es';
}

interface DataSource {
  id: string;
  name: string;
  abbrev: string;
  description: string;
  descriptionEs: string;
  records: string;
  updateFreq: string;
  updateFreqEs: string;
  color: string;
  url: string;
}

const SOURCES: DataSource[] = [
  {
    id: 'fjc',
    name: 'Federal Judicial Center IDB',
    abbrev: 'FJC',
    description: 'The definitive source for federal civil case outcomes. Contains every civil case filed in U.S. district courts since 1970 with disposition, judgment, and timeline data.',
    descriptionEs: 'La fuente definitiva para resultados de casos civiles federales. Contiene cada caso civil presentado en tribunales de distrito de EE.UU. desde 1970.',
    records: '5.1M+ cases',
    updateFreq: 'Quarterly',
    updateFreqEs: 'Trimestral',
    color: '#111111',
    url: 'https://www.fjc.gov/research/idb',
  },
  {
    id: 'pacer',
    name: 'PACER Court Records',
    abbrev: 'PACER',
    description: 'Public Access to Court Electronic Records — the official system for accessing federal court documents, dockets, and filings across all 94 districts.',
    descriptionEs: 'Acceso Público a Registros Electrónicos de Tribunales — el sistema oficial para documentos, expedientes y presentaciones federales en los 94 distritos.',
    records: '1B+ documents',
    updateFreq: 'Daily',
    updateFreqEs: 'Diario',
    color: '#0D9488',
    url: 'https://pacer.uscourts.gov',
  },
  {
    id: 'cl',
    name: 'CourtListener / RECAP',
    abbrev: 'CL',
    description: 'Free Law Project\'s comprehensive legal database with millions of court opinions, oral arguments, and RECAP archive of PACER documents.',
    descriptionEs: 'Base de datos legal completa del Free Law Project con millones de opiniones judiciales, argumentos orales y archivo RECAP de documentos PACER.',
    records: '8M+ opinions',
    updateFreq: 'Daily',
    updateFreqEs: 'Diario',
    color: '#333333',
    url: 'https://www.courtlistener.com',
  },
  {
    id: 'bjs',
    name: 'Bureau of Justice Statistics',
    abbrev: 'BJS',
    description: 'Civil trial outcome statistics including plaintiff win rates, median awards by case type, and bench vs. jury trial comparative data.',
    descriptionEs: 'Estadísticas de resultados de juicios civiles incluyendo tasas de victoria, premios medianos por tipo de caso y datos comparativos de juicios de mesa vs. jurado.',
    records: 'National surveys',
    updateFreq: 'Periodic',
    updateFreqEs: 'Periódico',
    color: '#F59E0B',
    url: 'https://bjs.ojp.gov',
  },
  {
    id: 'eeoc',
    name: 'EEOC Enforcement Data',
    abbrev: 'EEOC',
    description: 'Equal Employment Opportunity Commission charge statistics, monetary recovery data, and enforcement litigation outcomes by statute and fiscal year.',
    descriptionEs: 'Estadísticas de cargos de la EEOC, datos de recuperación monetaria y resultados de litigio de aplicación por estatuto y año fiscal.',
    records: 'FY1997–FY2024',
    updateFreq: 'Annual',
    updateFreqEs: 'Anual',
    color: '#EC4899',
    url: 'https://www.eeoc.gov/data/enforcement-and-litigation-statistics',
  },
  {
    id: 'ao',
    name: 'Administrative Office of U.S. Courts',
    abbrev: 'AO',
    description: 'Federal judiciary statistical tables including caseload data, median disposition times by district, and judicial workload metrics.',
    descriptionEs: 'Tablas estadísticas del poder judicial federal incluyendo datos de carga de casos, tiempos de resolución medianos por distrito y métricas de carga judicial.',
    records: '94 districts',
    updateFreq: 'Annual',
    updateFreqEs: 'Anual',
    color: '#10B981',
    url: 'https://www.uscourts.gov/statistics-reports',
  },
];

const PIPELINE_STEPS = [
  { icon: '⬇', label: 'Ingest', labelEs: 'Ingesta', desc: 'Pull raw data from 6 verified sources', descEs: 'Extracción de datos de 6 fuentes verificadas' },
  { icon: '🔄', label: 'Normalize', labelEs: 'Normalizar', desc: 'Standardize NOS codes, dates, and outcomes', descEs: 'Estandarizar códigos NOS, fechas y resultados' },
  { icon: '', label: 'Validate', labelEs: 'Validar', desc: '94% accuracy in outcome classification', descEs: '94% precisión en clasificación de resultados' },
  { icon: '', label: 'Analyze', labelEs: 'Analizar', desc: 'Compute percentiles, trends, win rates', descEs: 'Calcular percentiles, tendencias, tasas de éxito' },
  { icon: '', label: 'Report', labelEs: 'Informe', desc: 'Generate your case intelligence report', descEs: 'Generar su informe de inteligencia de caso' },
];

export default function DataMethodologySection({ lang = 'en' }: DataMethodologySectionProps) {
  const [activeSource, setActiveSource] = useState<string>('fjc');
  const isEs = lang === 'es';

  const t = isEs ? {
    badge: 'METODOLOGÍA DE DATOS',
    title: 'De fuentes públicas a inteligencia procesable',
    sub: 'Cada estadística rastreada hasta su fuente federal. Sin datos inventados. Sin conjeturas.',
    pipelineTitle: 'Pipeline de Datos',
    sourcesTitle: 'Fuentes Verificadas',
    records: 'Registros',
    updates: 'Actualización',
    viewSource: 'Ver fuente',
    methodologyLink: 'Lea nuestra metodología completa',
  } : {
    badge: 'DATA METHODOLOGY',
    title: 'From public sources to actionable intelligence',
    sub: 'Every statistic traced to its federal source. No made-up data. No guesswork.',
    pipelineTitle: 'Data Pipeline',
    sourcesTitle: 'Verified Sources',
    records: 'Records',
    updates: 'Updates',
    viewSource: 'View source',
    methodologyLink: 'Read our full methodology',
  };

  const active = SOURCES.find(s => s.id === activeSource) || SOURCES[0];

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(13,148,136,0.1)', color: '#0D9488' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5" aria-hidden="true">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          {t.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {t.title}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>
      </div>

      {/* Data Pipeline visualization */}
      <div className="max-w-[520px] mx-auto mb-8">
        <div className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#9CA3AF' }}>
          {t.pipelineTitle}
        </div>
        <div className="flex items-center justify-between">
          {PIPELINE_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-base"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold" style={{ color: '#6B7280' }}>
                  {isEs ? step.labelEs : step.label}
                </span>
                <span className="text-[8px] text-center max-w-[80px] hidden sm:block" style={{ color: '#9CA3AF' }}>
                  {isEs ? step.descEs : step.desc}
                </span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="flex-1 h-px mx-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Source selector + detail */}
      <div className="max-w-[520px] mx-auto">
        <div className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: '#9CA3AF' }}>
          {t.sourcesTitle}
        </div>

        {/* Source tabs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {SOURCES.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSource(s.id)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
              style={{
                background: activeSource === s.id ? `${s.color}20` : 'rgba(255,255,255,0.02)',
                color: activeSource === s.id ? s.color : '#9CA3AF',
                border: `1px solid ${activeSource === s.id ? `${s.color}40` : 'rgba(255,255,255,0.05)'}`,
                cursor: 'pointer',
              }}
            >
              {s.abbrev}
            </button>
          ))}
        </div>

        {/* Active source detail */}
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${active.color}30` }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#374151' }}>{active.name}</h3>
              <div className="flex gap-3 mt-1">
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                  {t.records}: <span style={{ color: active.color }}>{active.records}</span>
                </span>
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                  {t.updates}: <span style={{ color: active.color }}>{isEs ? active.updateFreqEs : active.updateFreq}</span>
                </span>
              </div>
            </div>
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ color: active.color, textDecoration: 'none' }}
            >
              {t.viewSource}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
            {isEs ? active.descriptionEs : active.description}
          </p>
        </div>
      </div>

      {/* Link to full methodology page */}
      <div className="text-center mt-6">
        <a
          href="/methodology"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-80"
          style={{ color: '#0D9488', textDecoration: 'none' }}
        >
          {t.methodologyLink}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14m-7-7l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
