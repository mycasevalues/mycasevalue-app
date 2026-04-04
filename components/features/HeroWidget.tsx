'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Case type options (top 15 most common)
const CASE_TYPES = [
  { value: 'employment_discrimination', label: 'Employment Discrimination', labelEs: 'Discriminación Laboral' },
  { value: 'personal_injury', label: 'Personal Injury', labelEs: 'Lesiones Personales' },
  { value: 'medical_malpractice', label: 'Medical Malpractice', labelEs: 'Negligencia Médica' },
  { value: 'product_liability', label: 'Product Liability', labelEs: 'Responsabilidad del Producto' },
  { value: 'contract_dispute', label: 'Contract Dispute', labelEs: 'Disputa Contractual' },
  { value: 'civil_rights', label: 'Civil Rights', labelEs: 'Derechos Civiles' },
  { value: 'insurance_dispute', label: 'Insurance Dispute', labelEs: 'Disputa de Seguros' },
  { value: 'wage_and_hour', label: 'Wage & Hour', labelEs: 'Salario y Horas' },
  { value: 'auto_accident', label: 'Auto Accident', labelEs: 'Accidente de Auto' },
  { value: 'wrongful_termination', label: 'Wrongful Termination', labelEs: 'Despido Injustificado' },
  { value: 'breach_of_contract', label: 'Breach of Contract', labelEs: 'Incumplimiento de Contrato' },
  { value: 'defamation', label: 'Defamation', labelEs: 'Difamación' },
  { value: 'harassment', label: 'Harassment', labelEs: 'Acoso' },
  { value: 'discrimination', label: 'Discrimination', labelEs: 'Discriminación' },
  { value: 'other', label: 'Other', labelEs: 'Otro' },
];

// Top federal districts
const DISTRICTS = [
  'S.D. California',
  'C.D. California',
  'N.D. California',
  'E.D. Texas',
  'D. Delaware',
  'S.D. New York',
  'C.D. Illinois',
  'D. New Jersey',
  'N.D. Texas',
  'E.D. New York',
  'Other',
];

// Sample preview data (hardcoded for instant display — real data loads from API)
const PREVIEW_DATA: Record<string, { winRate: number; medianSettlement: string; medianDuration: string }> = {
  employment_discrimination: { winRate: 18, medianSettlement: '$45,000', medianDuration: '14.2 months' },
  personal_injury: { winRate: 52, medianSettlement: '$145,000', medianDuration: '18.6 months' },
  medical_malpractice: { winRate: 23, medianSettlement: '$250,000', medianDuration: '24.1 months' },
  product_liability: { winRate: 34, medianSettlement: '$125,500', medianDuration: '22.3 months' },
  contract_dispute: { winRate: 41, medianSettlement: '$87,250', medianDuration: '16.8 months' },
  civil_rights: { winRate: 28, medianSettlement: '$52,000', medianDuration: '17.4 months' },
  insurance_dispute: { winRate: 35, medianSettlement: '$98,750', medianDuration: '13.6 months' },
  wage_and_hour: { winRate: 44, medianSettlement: '$67,500', medianDuration: '12.1 months' },
  auto_accident: { winRate: 58, medianSettlement: '$95,000', medianDuration: '15.2 months' },
  wrongful_termination: { winRate: 22, medianSettlement: '$72,000', medianDuration: '13.9 months' },
  breach_of_contract: { winRate: 39, medianSettlement: '$110,000', medianDuration: '18.4 months' },
  defamation: { winRate: 15, medianSettlement: '$65,000', medianDuration: '21.2 months' },
  harassment: { winRate: 31, medianSettlement: '$58,500', medianDuration: '14.7 months' },
  discrimination: { winRate: 26, medianSettlement: '$48,250', medianDuration: '15.3 months' },
  other: { winRate: 36, medianSettlement: '$85,000', medianDuration: '16.0 months' },
};

interface HeroWidgetProps {
  lang?: 'en' | 'es';
}

export function HeroWidget({ lang = 'en' }: HeroWidgetProps) {
  const [selectedType, setSelectedType] = useState<string>('personal_injury');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('S.D. California');
  const [showPreview, setShowPreview] = useState(false);

  const isEs = lang === 'es';
  const data = PREVIEW_DATA[selectedType] || PREVIEW_DATA.personal_injury;

  const typeLabel = CASE_TYPES.find(t => t.value === selectedType)?.[isEs ? 'labelEs' : 'label'] || 'Personal Injury';

  // Translations
  const t = {
    title: isEs ? 'Ley de tu Caso' : 'Know Your Case',
    subtitle: isEs ? 'Estadísticas instantáneas de casos similares' : 'Instant stats from similar cases',
    caseType: isEs ? 'Tipo de caso' : 'Case type',
    selectType: isEs ? 'Selecciona tipo de caso...' : 'Select case type...',
    district: isEs ? 'Distrito' : 'District',
    selectDistrict: isEs ? 'Selecciona distrito...' : 'Select district...',
    calculate: isEs ? 'Calcular' : 'Calculate',
    winRate: isEs ? 'Tasa de éxito' : 'Win rate',
    medianSettlement: isEs ? 'Acuerdo mediano' : 'Median settlement',
    duration: isEs ? 'Duración mediana' : 'Median duration',
    getReport: isEs ? 'Obtener informe completo →' : 'Get full report →',
    basedOn: isEs ? 'Basado en' : 'Based on',
    casesCited: isEs ? 'casos federales' : 'federal cases',
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E0D8',
        borderRadius: '12px',
        padding: '32px',
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3
          className="text-lg font-bold mb-1"
          style={{
            fontFamily: 'Montserrat, system-ui, sans-serif',
            color: '#111111',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          {t.title}
        </h3>
        <p
          style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            color: '#6B7280',
            fontSize: '14px',
          }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Dropdowns and button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Case type dropdown */}
        <div className="flex-1">
          <label
            htmlFor="case-type-select"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              color: '#374151',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.caseType}
          </label>
          <select
            id="case-type-select"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setShowPreview(true);
            }}
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #E5E0D8',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#111827',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {CASE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {isEs ? t.labelEs : t.label}
              </option>
            ))}
          </select>
        </div>

        {/* District dropdown */}
        <div className="flex-1">
          <label
            htmlFor="district-select"
            className="block text-sm font-semibold mb-2"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              color: '#374151',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t.district}
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setShowPreview(true);
            }}
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #E5E0D8',
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#111827',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Calculate button */}
        <div className="flex items-end">
          <button
            onClick={() => setShowPreview(true)}
            className="w-full sm:w-auto px-6 h-10 font-medium text-white border-none rounded-full cursor-pointer transition-all hover:opacity-90 active:scale-95"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              background: '#111111',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {t.calculate}
          </button>
        </div>
      </div>

      {/* Preview stats (fade/slide animation) */}
      {showPreview && (
        <div
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{
            animation: 'fadeInUp 0.3s ease-out forwards',
          }}
        >
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div
            className="p-5 rounded-lg mb-6 border-t-4"
            style={{
              background: '#F9F7F4',
              borderColor: '#8B5CF6',
              borderTop: '4px solid #8B5CF6',
            }}
          >
            <p
              className="text-sm font-semibold mb-4"
              style={{
                fontFamily: 'Montserrat, system-ui, sans-serif',
                color: '#111827',
                fontSize: '14px',
              }}
            >
              {typeLabel}
              {' '}
              <span style={{ color: '#6B7280', fontWeight: 400 }}>in {selectedDistrict}</span>
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: t.winRate,
                  value: `${data.winRate}%`,
                  icon: '',
                },
                {
                  label: t.medianSettlement,
                  value: data.medianSettlement,
                  icon: '',
                },
                {
                  label: t.duration,
                  value: data.medianDuration,
                  icon: '',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-lg"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E0D8',
                  }}
                >
                  <div
                    className="font-bold mb-1"
                    style={{
                      fontFamily: 'PT Mono, monospace',
                      color: '#8B5CF6',
                      fontSize: '16px',
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      color: '#6B7280',
                      fontSize: '11px',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Get Report link */}
            <Link
              href="/odds"
              className="inline-block text-sm font-semibold transition-all hover:opacity-80"
              style={{
                color: '#8B5CF6',
                fontFamily: 'Roboto, system-ui, sans-serif',
                textDecoration: 'none',
              }}
            >
              {t.getReport}
            </Link>
          </div>

          {/* Data citation */}
          <p
            className="text-xs text-center"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              color: '#9CA3AF',
            }}
          >
            {t.basedOn} 5,100,000+ {t.casesCited}
          </p>
        </div>
      )}
    </div>
  );
}

export default HeroWidget;
