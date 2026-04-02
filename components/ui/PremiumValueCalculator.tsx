'use client';
import React, { useState, useMemo } from 'react';

interface PremiumValueCalculatorProps {
  lang?: string;
  onUnlock?: () => void;
}

const CASE_DATA: Record<string, { label: string; labelEs: string; avgConsult: number; avgHourly: number; insightValue: number; winBoost: number }> = {
  employment: { label: 'Employment Discrimination', labelEs: 'Discriminación Laboral', avgConsult: 350, avgHourly: 275, insightValue: 2400, winBoost: 12 },
  injury: { label: 'Personal Injury', labelEs: 'Lesiones Personales', avgConsult: 0, avgHourly: 0, insightValue: 3200, winBoost: 15 },
  consumer: { label: 'Consumer Protection', labelEs: 'Protección al Consumidor', avgConsult: 250, avgHourly: 225, insightValue: 1800, winBoost: 9 },
  medical: { label: 'Medical Malpractice', labelEs: 'Negligencia Médica', avgConsult: 500, avgHourly: 350, insightValue: 5600, winBoost: 18 },
  rights: { label: 'Civil Rights', labelEs: 'Derechos Civiles', avgConsult: 300, avgHourly: 250, insightValue: 2100, winBoost: 11 },
  housing: { label: 'Housing', labelEs: 'Vivienda', avgConsult: 200, avgHourly: 200, insightValue: 1500, winBoost: 8 },
};

export default function PremiumValueCalculator({ lang = 'en', onUnlock }: PremiumValueCalculatorProps) {
  const [selectedCase, setSelectedCase] = useState('employment');
  const es = lang === 'es';
  const data = CASE_DATA[selectedCase];

  const savings = useMemo(() => {
    const consultSavings = data.avgConsult > 0 ? data.avgConsult : 0;
    const insightValue = data.insightValue;
    const totalValue = consultSavings + insightValue;
    const roi = Math.round((totalValue / 5.99) * 100) / 100;
    return { consultSavings, insightValue, totalValue, roi };
  }, [data]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(17,17,17,0.08) 0%, rgba(13,148,136,0.05) 50%, rgba(17,17,17,0.1) 100%)',
      border: '1px solid rgba(17,17,17,0.2)',
    }}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #111111, #333333)',
            boxShadow: '0 4px 12px rgba(17,17,17,0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-bold text-[#D1D5DB]">{es ? 'Calculadora de valor' : 'Value Calculator'}</div>
            <div className="text-[11px] text-[#6B7280]">{es ? '¿Cuánto podrías ahorrar?' : 'How much could you save?'}</div>
          </div>
        </div>

        {/* Case type selector */}
        <div className="mb-5">
          <div className="text-[11px] font-semibold text-[#6B7280] mb-2 tracking-wide">{es ? 'TIPO DE CASO' : 'CASE TYPE'}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(CASE_DATA).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedCase(key)}
                className="px-3 py-2 rounded-lg text-[11px] font-medium transition-all border cursor-pointer"
                style={{
                  background: selectedCase === key ? 'linear-gradient(135deg, #111111, #333333)' : 'rgba(255,255,255,0.05)',
                  color: selectedCase === key ? 'white' : '#6B7280',
                  borderColor: selectedCase === key ? '#111111' : '#334155',
                  boxShadow: selectedCase === key ? '0 2px 8px rgba(17,17,17,0.25)' : 'none',
                }}
              >
                {es ? val.labelEs : val.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Value breakdown */}
        <div className="space-y-3 mb-5">
          {savings.consultSavings > 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#E5E7EB' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.15)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#374151]">{es ? 'Ahorro en consulta legal' : 'Legal consultation savings'}</div>
                  <div className="text-[10px] text-[#6B7280]">{es ? 'vs. consulta inicial con abogado' : 'vs. initial attorney consultation'}</div>
                </div>
              </div>
              <div className="text-[15px] font-bold font-mono" style={{ color: '#0D9488' }}>
                ${savings.consultSavings}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#E5E7EB' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(17,17,17,0.15)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="8" width="4" height="13" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#374151]">{es ? 'Valor de los datos de recuperación' : 'Recovery data insight value'}</div>
                <div className="text-[10px] text-[#6B7280]">{es ? 'Conocer los rangos típicos de tu caso' : 'Knowing typical ranges for your case'}</div>
              </div>
            </div>
            <div className="text-[15px] font-bold font-mono" style={{ color: '#333333' }}>
              ${savings.insightValue.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#E5E7EB' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(217,119,6,0.15)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#374151]">{es ? 'Mejora en tasa de éxito' : 'Informed decision advantage'}</div>
                <div className="text-[10px] text-[#6B7280]">{es ? 'Personas informadas toman mejores decisiones' : 'Informed people make better choices'}</div>
              </div>
            </div>
            <div className="text-[15px] font-bold font-mono" style={{ color: '#D97706' }}>
              +{data.winBoost}%
            </div>
          </div>
        </div>

        {/* Total value */}
        <div className="p-4 rounded-xl mb-4" style={{
          background: 'linear-gradient(135deg, rgba(17,17,17,0.12) 0%, rgba(13,148,136,0.08) 100%)',
          border: '1px solid rgba(17,17,17,0.2)',
        }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-semibold text-[#6B7280]">{es ? 'Valor total estimado' : 'Total estimated value'}</span>
            <span className="text-[22px] font-display font-extrabold" style={{ color: '#0D9488', letterSpacing: '-1px' }}>
              ${savings.totalValue.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#6B7280]">{es ? 'Costo premium' : 'Premium cost'}</span>
            <span className="text-[18px] font-display font-bold" style={{ color: '#8B5CF6' }}>$5.99</span>
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(17,17,17,0.15)' }}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#6B7280]">{es ? 'Retorno de inversión' : 'Return on investment'}</span>
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-display font-extrabold" style={{ color: '#5EEAD4' }}>
                  {savings.roi.toLocaleString()}x
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2.5"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onUnlock}
          className="w-full py-3.5 text-[14px] font-semibold text-white rounded-xl cursor-pointer border-none transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #111111, #333333)',
            boxShadow: '0 4px 24px rgba(17,17,17,0.35)',
          }}
        >
          {es ? `Desbloquear por $5.99 (valor de $${savings.totalValue.toLocaleString()})` : `Unlock for $5.99 ($${savings.totalValue.toLocaleString()} value)`}
        </button>
        <div className="text-center mt-2.5 text-[10px] text-[#6B7280]">
          {es ? 'Satisfacción garantizada • Pagos seguros' : 'Satisfaction guaranteed • Secure payment'}
        </div>
      </div>
    </div>
  );
}
