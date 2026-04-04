'use client';

import React, { useState } from 'react';
import { EEOC_DATA, BJS_DATA, EMPLOYMENT_STATS } from '../../lib/verified-stats';

interface StatutoryOutcomesProps {
  lang?: 'en' | 'es';
}

type Statute = 'titleVII' | 'ada' | 'adea' | 'flsa' | 'fmla' | 'section1983';

interface StatuteInfo {
  key: Statute;
  label: string;
  labelEs: string;
  fullName: string;
  fullNameEs: string;
  color: string;
  citation: string;
  protects: string;
  protectsEs: string;
  remedies: string[];
  remediesEs: string[];
  winRate?: number;
  winRateSource?: string;
  medianAward?: number;
  relevantCap?: string;
  keyFact: string;
  keyFactEs: string;
}

const STATUTES: StatuteInfo[] = [
  {
    key: 'titleVII',
    label: 'Title VII',
    labelEs: 'Titulo VII',
    fullName: 'Civil Rights Act of 1964, Title VII',
    fullNameEs: 'Ley de Derechos Civiles de 1964, Titulo VII',
    color: '#333333',
    citation: '42 U.S.C. §§ 2000e et seq.',
    protects: 'Race, color, religion, sex (including pregnancy, sexual orientation, gender identity), national origin',
    protectsEs: 'Raza, color, religion, sexo (incluyendo embarazo, orientacion sexual, identidad de genero), origen nacional',
    remedies: ['Back pay', 'Front pay', 'Compensatory damages', 'Punitive damages (capped)', 'Injunctive relief', 'Attorney fees'],
    remediesEs: ['Salarios atrasados', 'Salarios futuros', 'Danos compensatorios', 'Danos punitivos (con tope)', 'Medidas cautelares', 'Honorarios de abogados'],
    winRate: EMPLOYMENT_STATS.trialWinRate.juryTrial,
    winRateSource: 'Cornell Law School',
    medianAward: BJS_DATA.medianAwards.employmentDiscrimination,
    relevantCap: '$50K–$300K (based on employer size)',
    keyFact: `EEOC received ${EEOC_DATA.chargesByStatute.titleVII.fy2023.toLocaleString()} Title VII charges in FY2023`,
    keyFactEs: `La EEOC recibio ${EEOC_DATA.chargesByStatute.titleVII.fy2023.toLocaleString()} cargos de Titulo VII en AF2023`,
  },
  {
    key: 'ada',
    label: 'ADA',
    labelEs: 'ADA',
    fullName: 'Americans with Disabilities Act',
    fullNameEs: 'Ley de Estadounidenses con Discapacidades',
    color: '#0D9488',
    citation: '42 U.S.C. §§ 12101 et seq.',
    protects: 'Individuals with physical or mental disabilities, record of disability, or regarded as disabled',
    protectsEs: 'Individuos con discapacidades fisicas o mentales, historial de discapacidad, o considerados discapacitados',
    remedies: ['Back pay', 'Front pay', 'Compensatory damages', 'Punitive damages (capped)', 'Reasonable accommodation', 'Attorney fees'],
    remediesEs: ['Salarios atrasados', 'Salarios futuros', 'Danos compensatorios', 'Danos punitivos (con tope)', 'Acomodacion razonable', 'Honorarios de abogados'],
    winRate: 25,
    winRateSource: 'ABA Journal / FJC data',
    relevantCap: '$50K–$300K (based on employer size)',
    keyFact: `ADA charges are the #1 category: ${EEOC_DATA.chargesByStatute.ada.fy2023.toLocaleString()} filed in FY2023`,
    keyFactEs: `Los cargos ADA son la categoria #1: ${EEOC_DATA.chargesByStatute.ada.fy2023.toLocaleString()} presentados en AF2023`,
  },
  {
    key: 'adea',
    label: 'ADEA',
    labelEs: 'ADEA',
    fullName: 'Age Discrimination in Employment Act',
    fullNameEs: 'Ley de Discriminacion por Edad en el Empleo',
    color: '#F59E0B',
    citation: '29 U.S.C. §§ 621 et seq.',
    protects: 'Workers age 40 and older from age-based employment discrimination',
    protectsEs: 'Trabajadores de 40 anos o mas contra discriminacion laboral por edad',
    remedies: ['Back pay', 'Liquidated damages (double back pay for willful violations)', 'Front pay', 'Attorney fees'],
    remediesEs: ['Salarios atrasados', 'Danos liquidados (doble salario atrasado por violaciones deliberadas)', 'Salarios futuros', 'Honorarios de abogados'],
    winRate: 30,
    winRateSource: 'FJC IDB analysis',
    relevantCap: 'No statutory cap on compensatory damages',
    keyFact: `ADEA charges trending down: ${EEOC_DATA.chargesByStatute.adea.fy2023.toLocaleString()} in FY2023 vs ${EEOC_DATA.chargesByStatute.adea.fy2019.toLocaleString()} in FY2019`,
    keyFactEs: `Los cargos ADEA van en descenso: ${EEOC_DATA.chargesByStatute.adea.fy2023.toLocaleString()} en AF2023 vs ${EEOC_DATA.chargesByStatute.adea.fy2019.toLocaleString()} en AF2019`,
  },
  {
    key: 'flsa',
    label: 'FLSA',
    labelEs: 'FLSA',
    fullName: 'Fair Labor Standards Act',
    fullNameEs: 'Ley de Normas Razonables de Trabajo',
    color: '#EF4444',
    citation: '29 U.S.C. §§ 201 et seq.',
    protects: 'All covered employees — minimum wage, overtime pay, recordkeeping, child labor',
    protectsEs: 'Todos los empleados cubiertos — salario minimo, pago de horas extras, mantenimiento de registros, trabajo infantil',
    remedies: ['Unpaid wages', 'Liquidated damages (equal to unpaid wages)', 'Attorney fees', 'Class/collective action', 'Injunctive relief'],
    remediesEs: ['Salarios no pagados', 'Danos liquidados (igual a salarios no pagados)', 'Honorarios de abogados', 'Accion colectiva/de clase', 'Medidas cautelares'],
    winRate: 55,
    winRateSource: 'FJC IDB',
    keyFact: 'FLSA cases are among the most commonly filed federal employment cases',
    keyFactEs: 'Los casos FLSA estan entre los mas comunes en demandas laborales federales',
  },
  {
    key: 'fmla',
    label: 'FMLA',
    labelEs: 'FMLA',
    fullName: 'Family and Medical Leave Act',
    fullNameEs: 'Ley de Licencia Familiar y Medica',
    color: '#A78BFA',
    citation: '29 U.S.C. §§ 2601 et seq.',
    protects: 'Eligible employees: up to 12 weeks unpaid leave for family/medical reasons, with job protection',
    protectsEs: 'Empleados elegibles: hasta 12 semanas de licencia sin pago por razones familiares/medicas, con proteccion laboral',
    remedies: ['Lost wages and benefits', 'Liquidated damages', 'Equitable relief (reinstatement)', 'Attorney fees'],
    remediesEs: ['Salarios y beneficios perdidos', 'Danos liquidados', 'Medida equitativa (reincorporacion)', 'Honorarios de abogados'],
    winRate: 40,
    winRateSource: 'FJC IDB / Published research',
    keyFact: 'Employers with 50+ employees within 75 miles must comply',
    keyFactEs: 'Empleadores con 50+ empleados dentro de 75 millas deben cumplir',
  },
  {
    key: 'section1983',
    label: '§1983',
    labelEs: '§1983',
    fullName: 'Section 1983 — Civil Rights',
    fullNameEs: 'Seccion 1983 — Derechos Civiles',
    color: '#10B981',
    citation: '42 U.S.C. § 1983',
    protects: 'Any person whose constitutional rights are violated by someone acting under color of state law',
    protectsEs: 'Cualquier persona cuyos derechos constitucionales sean violados por alguien actuando bajo autoridad estatal',
    remedies: ['Compensatory damages', 'Punitive damages (no cap against individuals)', 'Injunctive relief', 'Declaratory relief', 'Attorney fees'],
    remediesEs: ['Danos compensatorios', 'Danos punitivos (sin tope contra individuos)', 'Medidas cautelares', 'Sentencia declarativa', 'Honorarios de abogados'],
    winRate: BJS_DATA.plaintiffWinRates.tortJury,
    winRateSource: 'BJS Civil Trial Stats',
    keyFact: 'Most common in police misconduct, prison conditions, and due process claims',
    keyFactEs: 'Mas comun en conducta policial indebida, condiciones carcelarias y reclamos de debido proceso',
  },
];

function fmtDollar(n: number | undefined): string {
  if (!n) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export default function StatutoryOutcomes({ lang = 'en' }: StatutoryOutcomesProps) {
  const [selected, setSelected] = useState<Statute>('titleVII');

  const statute = STATUTES.find(s => s.key === selected)!;

  const t = lang === 'es' ? {
    badge: 'CONOZCA SUS DERECHOS',
    title: 'Resultados por Estatuto Federal',
    sub: 'Datos reales de resultados para cada estatuto principal de empleo y derechos civiles',
    protectedClass: 'Clases Protegidas',
    availableRemedies: 'Remedios Disponibles',
    winRate: 'Tasa de Exito en Juicio',
    medianAward: 'Mediana de Compensacion',
    damageCap: 'Tope de Danos',
    source: 'Fuente',
    keyInsight: 'Dato Clave',
    disclaimer: 'Solo con fines informativos. No es asesoria legal. Consulte a un abogado.',
    atTrial: 'en juicio con jurado',
  } : {
    badge: 'KNOW YOUR RIGHTS',
    title: 'Outcomes by Federal Statute',
    sub: 'Real outcome data for each major employment and civil rights statute',
    protectedClass: 'Protected Classes',
    availableRemedies: 'Available Remedies',
    winRate: 'Trial Win Rate',
    medianAward: 'Median Award',
    damageCap: 'Damage Cap',
    source: 'Source',
    keyInsight: 'Key Insight',
    disclaimer: 'For informational purposes only. Not legal advice. Consult an attorney.',
    atTrial: 'at jury trial',
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)' }}>
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
        style={{ background: 'rgba(17,17,17,0.1)', color: '#333333' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        {t.badge}
      </div>
      <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-1" style={{ color: '#111111', letterSpacing: '-0.5px' }}>
        {t.title}
      </h2>
      <p className="text-sm mb-5" style={{ color: '#6B7280' }}>{t.sub}</p>

      {/* Statute tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUTES.map(s => (
          <button type="button"
            key={s.key}
            onClick={() => setSelected(s.key)}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
            style={{
              background: selected === s.key ? s.color + '20' : 'transparent',
              border: `1px solid ${selected === s.key ? s.color : 'var(--border-default)'}`,
              color: selected === s.key ? s.color : 'var(--fg-subtle)',
            }}
          >
            {lang === 'es' ? s.labelEs : s.label}
          </button>
        ))}
      </div>

      {/* Statute detail card */}
      <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${statute.color}30` }}>
        {/* Name + citation */}
        <div className="mb-4">
          <h3 className="text-base font-bold" style={{ color: statute.color }}>
            {lang === 'es' ? statute.fullNameEs : statute.fullName}
          </h3>
          <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{statute.citation}</p>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {statute.winRate && (
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
              <div className="text-xl font-display font-extrabold" style={{ color: statute.winRate >= 50 ? '#10B981' : statute.winRate >= 30 ? '#F59E0B' : '#EF4444' }}>
                {statute.winRate}%
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{t.winRate}</div>
              <div className="text-[8px]" style={{ color: 'var(--fg-subtle)' }}>{t.atTrial}</div>
            </div>
          )}
          {statute.medianAward && (
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
              <div className="text-xl font-display font-extrabold" style={{ color: '#F59E0B' }}>
                {fmtDollar(statute.medianAward)}
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{t.medianAward}</div>
            </div>
          )}
          {statute.relevantCap && (
            <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-default)' }}>
              <div className="text-sm font-bold" style={{ color: '#111111' }}>
                {statute.relevantCap}
              </div>
              <div className="text-[9px] mt-0.5" style={{ color: 'var(--fg-subtle)' }}>{t.damageCap}</div>
            </div>
          )}
        </div>

        {/* Protected classes */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--fg-subtle)' }}>{t.protectedClass}</div>
          <p className="text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>
            {lang === 'es' ? statute.protectsEs : statute.protects}
          </p>
        </div>

        {/* Remedies */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--fg-subtle)' }}>{t.availableRemedies}</div>
          <div className="flex flex-wrap gap-1.5">
            {(lang === 'es' ? statute.remediesEs : statute.remedies).map((r, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: statute.color + '10', color: statute.color, border: `1px solid ${statute.color}30` }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg p-3" style={{ background: statute.color + '08', border: `1px solid ${statute.color}20` }}>
          <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: statute.color }}>{t.keyInsight}</div>
          <p className="text-[12px]" style={{ color: '#6B7280' }}>
            {lang === 'es' ? statute.keyFactEs : statute.keyFact}
          </p>
        </div>

        {statute.winRateSource && (
          <div className="mt-2 text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.source}: {statute.winRateSource}</div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[9px]" style={{ color: 'var(--fg-subtle)' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
