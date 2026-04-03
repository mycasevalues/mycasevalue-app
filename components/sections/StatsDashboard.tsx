'use client';

import React, { useState } from 'react';
import { BJS_DATA, EMPLOYMENT_STATS, AO_DATA, EEOC_DATA, FJC_DATA } from '../../lib/verified-stats';

interface StatsDashboardProps {
  lang?: 'en' | 'es';
}

type Tab = 'winRates' | 'settlements' | 'timelines' | 'eeoc';

function fmt(n: number, prefix = '$'): string {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(0)}K`;
  return `${prefix}${n.toLocaleString()}`;
}

export default function StatsDashboard({ lang = 'en' }: StatsDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('winRates');

  const t = lang === 'es' ? {
    badge: 'PANEL DE DATOS',
    title: 'Estadisticas de Resultados en Tribunales Federales',
    sub: 'Datos verificados de fuentes judiciales federales oficiales',
    tabs: {
      winRates: 'Tasas de Exito',
      settlements: 'Acuerdos',
      timelines: 'Tiempos',
      eeoc: 'EEOC',
    },
    plaintiffWin: 'Exito del Demandante',
    defendantWin: 'Exito del Demandado',
    bench: 'Juicio ante Juez',
    jury: 'Juicio con Jurado',
    median: 'Mediana',
    source: 'Fuente',
    months: 'meses',
    district: 'Distrito',
    filings: 'demandas/año',
    chargesFiled: 'Cargos Presentados',
    recovery: 'Recuperacion',
    disclaimer: 'Solo con fines informativos. No es asesoria legal.',
  } : {
    badge: 'DATA DASHBOARD',
    title: 'Federal Court Outcome Statistics',
    sub: 'Verified data from official federal judicial sources',
    tabs: {
      winRates: 'Win Rates',
      settlements: 'Settlements',
      timelines: 'Timelines',
      eeoc: 'EEOC',
    },
    plaintiffWin: 'Plaintiff Win',
    defendantWin: 'Defendant Win',
    bench: 'Bench Trial',
    jury: 'Jury Trial',
    median: 'Median',
    source: 'Source',
    months: 'months',
    district: 'District',
    filings: 'filings/yr',
    chargesFiled: 'Charges Filed',
    recovery: 'Recovery',
    disclaimer: 'For informational purposes only. Not legal advice.',
  };

  const TABS: { key: Tab; label: string; color: string }[] = [
    { key: 'winRates', label: t.tabs.winRates, color: '#10B981' },
    { key: 'settlements', label: t.tabs.settlements, color: '#F59E0B' },
    { key: 'timelines', label: t.tabs.timelines, color: '#333333' },
    { key: 'eeoc', label: t.tabs.eeoc, color: '#EF4444' },
  ];

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--fg-muted)' }}>{t.sub}</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.5)' }}>
        {TABS.map(tab => (
          <button type="button"
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              background: activeTab === tab.key ? tab.color + '20' : 'transparent',
              color: activeTab === tab.key ? tab.color : 'var(--fg-subtle)',
              border: activeTab === tab.key ? `1px solid ${tab.color}40` : '1px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[300px]">
        {/* WIN RATES */}
        {activeTab === 'winRates' && (
          <div className="space-y-3">
            {[
              { label: lang === 'es' ? 'Todos los Civiles' : 'All Civil Cases', bench: BJS_DATA.plaintiffWinRates.benchTrials, jury: BJS_DATA.plaintiffWinRates.juryTrials },
              { label: lang === 'es' ? 'Contratos' : 'Contract', bench: BJS_DATA.plaintiffWinRates.contractBench, jury: BJS_DATA.plaintiffWinRates.contractJury },
              { label: lang === 'es' ? 'Agravio (Torts)' : 'Tort', bench: BJS_DATA.plaintiffWinRates.tortBench, jury: BJS_DATA.plaintiffWinRates.tortJury },
              { label: lang === 'es' ? 'Discriminacion Laboral' : 'Employment Discrimination', bench: EMPLOYMENT_STATS.trialWinRate.benchTrial, jury: EMPLOYMENT_STATS.trialWinRate.juryTrial },
              { label: lang === 'es' ? 'Vehiculos de Motor' : 'Motor Vehicle', bench: null, jury: BJS_DATA.plaintiffWinRates.motorVehicleJury },
              { label: lang === 'es' ? 'Negligencia Medica' : 'Medical Malpractice', bench: null, jury: BJS_DATA.plaintiffWinRates.medicalMalpracticeJury },
              { label: lang === 'es' ? 'Responsabilidad de Producto' : 'Product Liability', bench: null, jury: BJS_DATA.plaintiffWinRates.productLiabilityJury },
              { label: lang === 'es' ? 'Responsabilidad de Instalaciones' : 'Premises Liability', bench: null, jury: BJS_DATA.plaintiffWinRates.premisesLiabilityJury },
            ].map((row, i) => (
              <div key={i} className="rounded-lg p-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-default)' }}>
                <div className="text-[12px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{row.label}</div>
                <div className="flex items-center gap-3">
                  {row.bench !== null && (
                    <div className="text-center">
                      <div className="text-[14px] font-bold font-mono" style={{ color: '#0D9488' }}>{row.bench}%</div>
                      <div className="text-[8px]" style={{ color: 'var(--fg-subtle)' }}>{t.bench}</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-[14px] font-bold font-mono" style={{ color: '#10B981' }}>{row.jury}%</div>
                    <div className="text-[8px]" style={{ color: 'var(--fg-subtle)' }}>{t.jury}</div>
                  </div>
                  {/* Mini bar */}
                  <div className="w-16 h-3 rounded-full overflow-hidden hidden sm:block" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full rounded-full" style={{ width: `${row.jury}%`, background: row.jury >= 50 ? '#10B981' : row.jury >= 30 ? '#F59E0B' : '#EF4444' }} />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[9px] mt-2" style={{ color: 'var(--fg-subtle)' }}>{t.source}: BJS Civil Trial Stats 2005, Cornell Law School</p>
          </div>
        )}

        {/* SETTLEMENTS */}
        {activeTab === 'settlements' && (
          <div className="space-y-3">
            {Object.entries(FJC_DATA.settlementPercentiles).map(([key, data]) => {
              const labels: Record<string, string> = {
                employmentDiscrimination: lang === 'es' ? 'Discriminacion Laboral' : 'Employment Discrimination',
                civilRights1983: lang === 'es' ? 'Derechos Civiles (§1983)' : 'Civil Rights (§1983)',
                personalInjuryMV: lang === 'es' ? 'Lesion Personal (Vehiculo)' : 'Personal Injury (Motor Vehicle)',
                medicalMalpractice: lang === 'es' ? 'Negligencia Medica' : 'Medical Malpractice',
                productLiability: lang === 'es' ? 'Responsabilidad de Producto' : 'Product Liability',
                premisesLiability: lang === 'es' ? 'Responsabilidad de Instalaciones' : 'Premises Liability',
                contractDispute: lang === 'es' ? 'Disputa Contractual' : 'Contract Dispute',
                wrongfulTermination: lang === 'es' ? 'Despido Injustificado' : 'Wrongful Termination',
              };
              return (
                <div key={key} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-default)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--fg-primary)' }}>{labels[key] || key}</div>
                    <div className="text-[13px] font-bold font-mono" style={{ color: '#F59E0B' }}>
                      {t.median}: {fmt(data.p50 * 1000)}
                    </div>
                  </div>
                  {/* Percentile bar */}
                  <div className="relative h-6 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {/* p10-p90 range */}
                    <div className="absolute h-full rounded-full" style={{
                      left: `${(data.p10 / data.p90) * 100}%`,
                      width: `${((data.p90 - data.p10) / data.p90) * 100}%`,
                      background: 'linear-gradient(90deg, #EF4444, #F59E0B, #10B981)',
                      opacity: 0.3,
                    }} />
                    {/* p25-p75 range */}
                    <div className="absolute h-full rounded-full" style={{
                      left: `${(data.p25 / data.p90) * 100}%`,
                      width: `${((data.p75 - data.p25) / data.p90) * 100}%`,
                      background: 'linear-gradient(90deg, #F59E0B, #10B981)',
                      opacity: 0.5,
                    }} />
                    {/* p50 marker */}
                    <div className="absolute top-0 bottom-0 w-0.5" style={{
                      left: `${(data.p50 / data.p90) * 100}%`,
                      background: '#fff',
                    }} />
                  </div>
                  {/* Labels */}
                  <div className="flex justify-between mt-1">
                    <span className="text-[8px] font-mono" style={{ color: 'var(--fg-subtle)' }}>p10: {fmt(data.p10 * 1000)}</span>
                    <span className="text-[8px] font-mono" style={{ color: 'var(--fg-subtle)' }}>p25: {fmt(data.p25 * 1000)}</span>
                    <span className="text-[8px] font-mono" style={{ color: 'var(--fg-subtle)' }}>p75: {fmt(data.p75 * 1000)}</span>
                    <span className="text-[8px] font-mono" style={{ color: 'var(--fg-subtle)' }}>p90: {fmt(data.p90 * 1000)}</span>
                  </div>
                </div>
              );
            })}
            <p className="text-[9px] mt-2" style={{ color: 'var(--fg-subtle)' }}>{t.source}: {FJC_DATA.source}</p>
          </div>
        )}

        {/* TIMELINES */}
        {activeTab === 'timelines' && (
          <div>
            <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(17,17,17,0.05)', border: '1px solid rgba(17,17,17,0.15)' }}>
              <div className="text-center">
                <div className="text-3xl font-display font-extrabold" style={{ color: '#333333' }}>{AO_DATA.medianDispositionMonths}</div>
                <div className="text-[11px] mt-1" style={{ color: 'var(--fg-muted)' }}>
                  {lang === 'es' ? 'Mediana nacional de meses a resolucion' : 'National median months to disposition'}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {Object.entries(AO_DATA.districtTimelines)
                .sort(([, a], [, b]) => a.medianMonths - b.medianMonths)
                .map(([district, data]) => (
                  <div key={district} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-default)' }}>
                    <div className="text-[11px] font-semibold w-24 flex-shrink-0" style={{ color: 'var(--fg-primary)' }}>{district}</div>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full transition-all" style={{
                        width: `${(data.medianMonths / 14) * 100}%`,
                        background: data.medianMonths < 7.5 ? '#10B981' : data.medianMonths < 9.5 ? '#F59E0B' : '#EF4444',
                      }} />
                    </div>
                    <div className="text-[12px] font-mono font-bold w-12 text-right" style={{
                      color: data.medianMonths < 7.5 ? '#10B981' : data.medianMonths < 9.5 ? '#F59E0B' : '#EF4444',
                    }}>
                      {data.medianMonths}mo
                    </div>
                    <div className="text-[9px] w-16 text-right hidden sm:block" style={{ color: 'var(--fg-subtle)' }}>
                      {data.annualFilings.toLocaleString()} {t.filings}
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-[9px] mt-3" style={{ color: 'var(--fg-subtle)' }}>{t.source}: {AO_DATA.source}</p>
          </div>
        )}

        {/* EEOC */}
        {activeTab === 'eeoc' && (
          <div>
            {/* Top stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-default)' }}>
                <div className="text-lg font-display font-extrabold" style={{ color: '#10B981' }}>{fmt(EEOC_DATA.totalMonetaryRecovery)}</div>
                <div className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.recovery} FY2024</div>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-default)' }}>
                <div className="text-lg font-display font-extrabold" style={{ color: '#333333' }}>{EEOC_DATA.newChargesReceived.toLocaleString()}</div>
                <div className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.chargesFiled} FY2024</div>
              </div>
              <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid var(--border-default)' }}>
                <div className="text-lg font-display font-extrabold" style={{ color: '#F59E0B' }}>{EEOC_DATA.litigationSuccessRate}%</div>
                <div className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{lang === 'es' ? 'Exito en Litigio' : 'Litigation Success'}</div>
              </div>
            </div>

            {/* Charges by statute */}
            <div className="space-y-2">
              {[
                { label: 'ADA', fy23: EEOC_DATA.chargesByStatute.ada.fy2023, fy22: EEOC_DATA.chargesByStatute.ada.fy2022, color: '#F59E0B' },
                { label: 'Title VII', fy23: EEOC_DATA.chargesByStatute.titleVII.fy2023, fy22: EEOC_DATA.chargesByStatute.titleVII.fy2022, color: '#333333' },
                { label: 'ADEA', fy23: EEOC_DATA.chargesByStatute.adea.fy2023, fy22: EEOC_DATA.chargesByStatute.adea.fy2022, color: '#0D9488' },
                { label: 'EPA', fy23: EEOC_DATA.chargesByStatute.epa.fy2023, fy22: EEOC_DATA.chargesByStatute.epa.fy2022, color: '#EF4444' },
                { label: 'GINA', fy23: EEOC_DATA.chargesByStatute.gina.fy2023, fy22: EEOC_DATA.chargesByStatute.gina.fy2022, color: '#A78BFA' },
              ].map((row) => {
                const change = ((row.fy23 - row.fy22) / row.fy22 * 100).toFixed(1);
                const isUp = row.fy23 > row.fy22;
                return (
                  <div key={row.label} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-default)' }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.color }} />
                    <div className="text-[12px] font-semibold w-20" style={{ color: 'var(--fg-primary)' }}>{row.label}</div>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full" style={{ width: `${(row.fy23 / 30000) * 100}%`, background: row.color }} />
                    </div>
                    <div className="text-[12px] font-mono font-bold w-14 text-right" style={{ color: row.color }}>
                      {(row.fy23 / 1000).toFixed(1)}K
                    </div>
                    <div className="text-[10px] font-mono w-14 text-right" style={{ color: isUp ? '#10B981' : '#EF4444' }}>
                      {isUp ? '+' : ''}{change}%
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] mt-3" style={{ color: 'var(--fg-subtle)' }}>{t.source}: {EEOC_DATA.source}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
