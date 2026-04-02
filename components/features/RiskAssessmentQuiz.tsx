'use client';

import React, { useState } from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export interface RiskAssessmentQuizProps {
  onClose: () => void;
  onStartAssessment: () => void;
  lang?: string;
}

export function RiskAssessmentQuiz({
  onClose,
  onStartAssessment,
  lang = 'en',
}: RiskAssessmentQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const questions =
    lang === 'es'
      ? [
        '¿Esto sucedió en los últimos 2 años?',
        '¿Tienes documentos o evidencia?',
        '¿Hubo testigos u otras personas afectadas?',
      ]
      : [
        'Did this happen in the last 2 years?',
        'Do you have documents or evidence?',
        'Were there witnesses or others affected?',
      ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const score = (answers.filter(Boolean).length / questions.length) * 100;
  const strengthLabel =
    lang === 'es'
      ? score >= 67
        ? 'Fuerte'
        : score >= 34
          ? 'Moderado'
          : 'Necesita revisión'
      : score >= 67
        ? 'Strong'
        : score >= 34
          ? 'Moderate'
          : 'Needs Review';
  const strengthColor = score >= 67 ? '#0D9488' : score >= 34 ? '#6366F1' : '#E87461';

  if (answers.length === questions.length) {
    return (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[var(--z-modal)]"
        role="dialog"
        aria-labelledby="quiz-results-title"
      >
        <div className="card-bg bg-[#131B2E] rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
          <div className="text-center">
            <div
              className="text-5xl font-display font-bold mb-3"
              id="quiz-results-title"
              style={{ color: strengthColor }}
            >
              {Math.round(score)}
            </div>
            <div className="text-xl font-semibold mb-2" style={{ color: strengthColor }}>
              {strengthLabel}
            </div>
            <p className="text-sm text-[var(--fg-muted)] mb-6">
              {lang === 'es'
                ? 'Basado en tus respuestas, aquí está tu estimación de fortaleza del caso.'
                : "Based on your answers, here's your case strength estimate."}
            </p>
            <button
              onClick={onStartAssessment}
              className="w-full px-6 py-3 text-sm font-semibold text-white rounded-xl cursor-pointer mb-2"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
            >
              {lang === 'es' ? 'Obtener informe completo' : 'Get Full Report'}
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-2 text-sm font-medium card-bg bg-[var(--bg-elevated)] rounded-xl cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors"
            >
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[var(--z-modal)]"
      role="dialog"
      aria-labelledby="quiz-title"
    >
      <div className="card-bg bg-[#131B2E] rounded-3xl shadow-2xl max-w-md p-8 animate-fade-in">
        <div className="mb-6">
          <div className="text-[10px] font-bold text-[var(--fg-muted)] tracking-[2px] mb-3 uppercase">
            {lang === 'es' ? 'EVALUACIÓN RÁPIDA' : 'Quick Assessment'}
          </div>
          <div className="text-2xl font-display font-bold" id="quiz-title">
            {questions[step]}
          </div>
          <div className="mt-4 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
                background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              }}
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={0}
              aria-valuemax={questions.length}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer border-[1.5px] transition-all hover:scale-[1.02]"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--fg-muted)',
              background: '#131B2E',
            }}
          >
            {lang === 'es' ? 'No' : 'No'}
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 px-4 py-3 font-semibold rounded-xl cursor-pointer text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
          >
            {lang === 'es' ? 'Sí' : 'Yes'}
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-3 px-4 py-2 text-sm font-medium text-[var(--fg-muted)] rounded-xl cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors"
        >
          {lang === 'es' ? 'Omitir' : 'Skip'}
        </button>
      </div>
    </div>
  );
}

export default RiskAssessmentQuiz;
