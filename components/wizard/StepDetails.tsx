'use client';

import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { WizardProgress } from '../ui/WizardProgress';
import { Select } from '../ui/SelectDropdown';
import { StepDetailsProps } from './WizardTypes';

export function StepDetails({
  lang,
  t,
  toast,
  go,
  stateCode,
  setStateCode,
  timing,
  setTiming,
  amount,
  setAmount,
  attorney,
  setAttorney,
  othersAffected,
  setOthersAffected,
  classSize,
  setClassSize,
  consent,
  setConsent,
  startLoad,
  STATES,
  TIMING_OPTS,
  AMOUNT_OPTS,
  ATTORNEY_OPTS,
  darkMode,
}: StepDetailsProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleGenerateReport = () => {
    if (!timing || !attorney || !consent) {
      setSubmitted(true);
      return;
    }
    startLoad();
  };

  return (
    <div className="max-w-xl mx-auto py-6 wizard-step-enter">
      <WizardProgress step={3} lang={lang} labels={[t.wiz_situation, t.wiz_specifics || (lang === 'es' ? 'Específicos' : 'Specifics'), t.wiz_details, t.wiz_report]} />
      <BackButton go={go} lang={lang} />
      <Reveal>
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">{t.your_details}</h2>
        <div className="space-y-4">
          <div>
            <label id="label-state" className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿En qué estado estás?' : 'What state are you in?'}</label>
            <Select value={stateCode} options={STATES} onChange={setStateCode} placeholder={lang === 'es' ? 'Selecciona tu estado...' : 'Select your state...'} dark={darkMode} lang={lang} labelledBy="label-state" />
            <div className="text-[11px] text-[var(--fg-muted)] mt-1 px-1">{lang === 'es' ? 'Esto nos ayuda a mostrarte resultados específicos de tu área.' : 'This helps us show you results specific to your area.'}</div>
          </div>
          <div>
            <label id="label-timing" className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Cuándo ocurrió esto?' : 'When did this happen?'} <span className="text-coral">*</span></label>
            <Select value={timing} options={lang === 'es' ? [
              { id: 'now', label: 'Ocurriendo ahora (en curso)' },
              { id: 'recent', label: 'En los últimos 6 meses' },
              { id: '2yr', label: 'Hace 6 meses a 2 años' },
              { id: 'old', label: 'Hace más de 2 años' },
            ] : [
              { id: 'now', label: 'Happening now (ongoing)' },
              { id: 'recent', label: 'Within the last 6 months' },
              { id: '2yr', label: '6 months to 2 years ago' },
              { id: 'old', label: 'More than 2 years ago' },
            ]} onChange={setTiming} dark={darkMode} lang={lang} labelledBy="label-timing" />
            {submitted && !timing && <div className="text-red-500 text-sm mt-1">{lang === 'es' ? 'Este campo es obligatorio' : 'This field is required'}</div>}
          </div>
          {timing && (
            <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed animate-fade-in" style={{
              background: timing === 'recent' ? 'rgba(13,148,136,0.15)' : (timing === '2yr' || timing === 'old') ? 'rgba(232,116,97,0.12)' : 'rgba(17,17,17,0.08)',
              color: timing === 'recent' ? '#0D9488' : (timing === '2yr' || timing === 'old') ? '#DC2626' : '#8B5CF6',
            }}>
              {lang === 'es' ? (
                timing === 'recent' ? 'Buenas noticias — las personas que actuaron dentro de 6 meses históricamente tuvieron mejores resultados.'
                : timing === 'now' ? 'Como esto sigue ocurriendo, actuar pronto ayuda a preservar tus opciones y evidencia.'
                : (timing === '2yr' || timing === 'old') ? '⚠ Importante: Podrías estar quedándote sin tiempo. Hay plazos legales que podrían afectar tu caso — habla con un abogado pronto.'
                : 'Actuar antes generalmente te da más opciones.'
              ) : (
                timing === 'recent' ? 'Good news — people who took action within 6 months historically had better outcomes.'
                : timing === 'now' ? 'Since this is still happening, acting soon helps preserve your options and evidence.'
                : (timing === '2yr' || timing === 'old') ? '⚠ Important: You may be running out of time. There are legal deadlines that could affect your case — speak with a lawyer soon.'
                : 'Taking action sooner generally gives you more options.'
              )}
            </div>
          )}
          {timing && (<>
          <div className="animate-fade-in">
            <label id="label-amount" className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Cuánto dinero está involucrado?' : 'How much money is involved?'}</label>
            <Select value={amount} options={AMOUNT_OPTS} onChange={setAmount} dark={darkMode} lang={lang} labelledBy="label-amount" />
            <div className="text-[11px] text-[var(--fg-muted)] mt-1 px-1">{lang === 'es' ? 'Selecciona "No estoy seguro" si no lo sabes — estimaremos basándonos en casos similares.' : 'Select "Not sure" if you don\'t know — we\'ll estimate based on similar cases.'}</div>
          </div>
          <div className="animate-fade-in">
            <label id="label-attorney" className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Tienes abogado?' : 'Do you have a lawyer?'} <span className="text-coral">*</span></label>
            <Select value={attorney} options={ATTORNEY_OPTS} onChange={setAttorney} dark={darkMode} lang={lang} labelledBy="label-attorney" />
            {submitted && !attorney && <div className="text-red-500 text-sm mt-1">{lang === 'es' ? 'Este campo es obligatorio' : 'This field is required'}</div>}
          </div>
          <div className="animate-fade-in">
            <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Hay otros afectados por el mismo problema?' : 'Are others affected by the same issue?'}</label>
            <Select value={othersAffected} options={lang === 'es' ? [
              { id: '', label: 'Seleccionar...' },
              { id: 'no', label: 'No, solo yo' },
              { id: 'few', label: 'Sí, algunas personas' },
              { id: 'many', label: 'Sí, muchas personas (40+)' },
            ] : [
              { id: '', label: 'Select...' },
              { id: 'no', label: 'No, just me' },
              { id: 'few', label: 'Yes, a few people' },
              { id: 'many', label: 'Yes, many people (40+)' },
            ]} onChange={setOthersAffected} dark={darkMode} lang={lang} />
          </div>
          {othersAffected === 'many' && (
            <>
              <div>
                <label className="text-sm font-semibold block mb-1.5">{lang === 'es' ? '¿Aproximadamente cuántos?' : 'Approximately how many?'}</label>
                <Select value={classSize} options={lang === 'es' ? [
                  { id: '', label: 'Seleccionar...' },
                  { id: '40-100', label: '40 – 100 personas' },
                  { id: '100-500', label: '100 – 500 personas' },
                  { id: '500+', label: '500+ personas' },
                  { id: 'unsure', label: 'No estoy seguro' },
                ] : [
                  { id: '', label: 'Select...' },
                  { id: '40-100', label: '40 – 100 people' },
                  { id: '100-500', label: '100 – 500 people' },
                  { id: '500+', label: '500+ people' },
                  { id: 'unsure', label: 'Not sure' },
                ]} onChange={setClassSize} dark={darkMode} lang={lang} />
              </div>
              {classSize && (
                <div className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed" style={{ background: 'rgba(17,17,17,0.08)', color: 'var(--fg-muted)' }}>
                  {lang === 'es'
                    ? 'Las acciones colectivas federales bajo la Regla 23 generalmente requieren suficientes individuos afectados para que las demandas individuales sean impracticables. Históricamente, los casos con 40+ individuos afectados han cumplido este umbral.'
                    : 'Federal class actions under Rule 23 generally require enough affected individuals that individual lawsuits would be impractical. Historically, cases with 40+ affected individuals have met this threshold.'}
                </div>
              )}
            </>
          )}
          </>)}
        </div>
        {/* Consent */}
        <div className="mt-6 p-4 rounded-2xl" style={{ background: 'rgba(17,17,17,0.04)', border: '1px solid rgba(17,17,17,0.12)' }}>
          <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mb-3">
            {lang === 'es'
              ? 'Estás a punto de ver datos reales de registros judiciales federales. Estos datos muestran lo que le sucedió a otras personas — no predicen lo que te sucederá a ti. Solo un abogado con licencia puede evaluar tus hechos específicos.'
              : 'You are about to see real data from federal court records. This data shows what happened to other people — it does not predict what will happen to you. Only a licensed attorney can evaluate your specific facts.'}
          </p>
          <label className="flex gap-3 items-start cursor-pointer text-[14px]" role="checkbox" aria-checked={consent} tabIndex={0} onClick={() => setConsent(!consent)} onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setConsent(!consent); } }}>
            <div className="w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all" aria-hidden="true"
              style={{ borderColor: consent ? '#111111' : '#E5E0D8', background: consent ? 'linear-gradient(135deg, #111111, #333333)' : 'transparent' }}>
              {consent && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <span className="leading-relaxed text-[var(--fg-muted)]">{lang === 'es'
              ? 'Entiendo que estos son datos históricos, no evalúan mi situación, y no se crea ninguna relación abogado-cliente.'
              : 'I understand this is historical data only and no attorney-client relationship is created.'}</span>
          </label>
          {submitted && !consent && <div className="text-red-500 text-sm mt-3">{lang === 'es' ? 'Este campo es obligatorio' : 'This field is required'}</div>}
        </div>
        <button type="button" onClick={handleGenerateReport}
          className="w-full mt-5 py-4.5 text-[16px] font-semibold text-white border-none rounded-2xl cursor-pointer transition-all active:scale-[0.98] hover:scale-[1.01]"
          style={{ background: (timing && attorney && consent) ? 'linear-gradient(135deg, #111111, #333333)' : '#E5E0D8', color: (timing && attorney && consent) ? '#fff' : '#6B7280', boxShadow: (timing && attorney && consent) ? '0 4px 20px rgba(17,17,17,.3)' : 'none', padding: '18px', animation: submitted && (!timing || !attorney || !consent) ? 'shake 0.5s ease-in-out' : 'none' }}>
          {lang === 'es' ? 'Generar informe →' : 'Generate report →'}
        </button>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </Reveal>
    </div>
  );
}

function BackButton({ go, lang }: { go: (step: number) => void; lang: string }) {
  return (
    <button type="button" onClick={() => go(2)} className="text-sm bg-transparent border-none cursor-pointer mb-4 flex items-center gap-1.5 transition-all hover:gap-2.5 group" style={{ color: 'var(--fg-muted)' }} aria-label={lang === 'es' ? 'Volver' : 'Go back'}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-0.5"><polyline points="15 18 9 12 15 6" /></svg>
      {lang === 'es' ? 'Volver' : 'Back'}
    </button>
  );
}
