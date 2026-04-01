'use client';

import { useEffect, useState } from 'react';

const translations = {
  en: {
    searching: 'Searching federal court records...',
    analyzing: 'Analyzing {count} similar cases...',
    comparing: 'Comparing outcomes across districts...',
    calculating: 'Calculating win rates and settlements...',
    ready: 'Your report is ready',
    powered: 'Powered by 5.1M+ federal court records',
  },
  es: {
    searching: 'Buscando registros de cortes federales...',
    analyzing: 'Analizando {count} casos similares...',
    comparing: 'Comparando resultados entre distritos...',
    calculating: 'Calculando tasas de victoria y acuerdos...',
    ready: 'Tu informe está listo',
    powered: 'Impulsado por 5.1M+ registros de cortes federales',
  },
};

interface ReportLoaderProps {
  lang?: string;
  totalCases?: number;
  caseName?: string;
  onComplete: () => void;
}

export default function ReportLoader({
  lang = 'en',
  totalCases = 12500,
  caseName,
  onComplete,
}: ReportLoaderProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [settlementAvg, setSettlementAvg] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Main step progression
  useEffect(() => {
    const steps = [
      { duration: 1000, nextStep: 1 },
      { duration: 1000, nextStep: 2 },
      { duration: 1000, nextStep: 3 },
      { duration: 1000, nextStep: 4 },
      { duration: 1000, nextStep: 5 },
    ];

    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(steps[step].nextStep);
      }, steps[step].duration);

      return () => clearTimeout(timer);
    } else if (step === 5) {
      setShowCheckmark(true);
      const completeTimer = setTimeout(onComplete, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [step, onComplete]);

  // Progress ring animation (0-100% over 5 seconds)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 5000) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Counter animation for case count (step 2)
  useEffect(() => {
    if (step === 2) {
      let current = 0;
      const increment = totalCases / 20;
      const interval = setInterval(() => {
        current += increment;
        if (current >= totalCases) {
          setCount(totalCases);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [step, totalCases]);

  // Win rate animation (step 4)
  useEffect(() => {
    if (step === 4) {
      let current = 0;
      const interval = setInterval(() => {
        current += 2.8;
        if (current >= 78) {
          setWinRate(78);
          clearInterval(interval);
        } else {
          setWinRate(Math.floor(current));
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Settlement average animation (step 4)
  useEffect(() => {
    if (step === 4) {
      let current = 0;
      const target = 385000;
      const increment = target / 25;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setSettlementAvg(target);
          clearInterval(interval);
        } else {
          setSettlementAvg(Math.floor(current));
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [step]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const fadeClass =
    step <= 4 && step > 0 ? 'opacity-100' : 'opacity-0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1221]/95 backdrop-blur-sm">
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <div className="w-full max-w-md px-6">
        {/* Progress Ring */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background ring */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#1E293B"
                strokeWidth="2"
              />
              {/* Progress ring */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-lg font-semibold text-white">
                {Math.floor(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Searching */}
        {step === 1 && (
          <div className={`text-center transition-opacity duration-300 ${fadeClass}`}>
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 border-2 border-[#0D9488] border-t-[#4F46E5] rounded-full animate-spin-slow" />
            </div>
            <p className="font-mono text-[#E2E8F0]">{t.searching}</p>
          </div>
        )}

        {/* Step 2: Analyzing */}
        {step === 2 && (
          <div className={`text-center transition-opacity duration-300 ${fadeClass}`}>
            <div className="mb-4 flex justify-center">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-[#0D9488] rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
            <p className="font-mono text-[#E2E8F0]">
              {t.analyzing.replace('{count}', count.toLocaleString())}
            </p>
          </div>
        )}

        {/* Step 3: Comparing */}
        {step === 3 && (
          <div className={`text-center transition-opacity duration-300 ${fadeClass}`}>
            <div className="mb-4 flex justify-center items-end gap-2 h-16">
              {[40, 65, 85, 55, 92].map((height, i) => (
                <div
                  key={i}
                  className="w-3 bg-[#4F46E5] rounded-t animate-scale-in"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <p className="font-mono text-[#E2E8F0]">{t.comparing}</p>
          </div>
        )}

        {/* Step 4: Calculating */}
        {step === 4 && (
          <div className={`text-center transition-opacity duration-300 ${fadeClass}`}>
            <div className="mb-6 space-y-4">
              <div className="animate-slide-up">
                <p className="text-sm text-[#94A3B8] mb-1">Win Rate</p>
                <p className="font-mono text-2xl font-bold text-[#0D9488]">
                  {winRate}%
                </p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <p className="text-sm text-[#94A3B8] mb-1">Avg Settlement</p>
                <p className="font-mono text-2xl font-bold text-[#4F46E5]">
                  ${(settlementAvg / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
            <p className="font-mono text-[#E2E8F0] text-sm">{t.calculating}</p>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <div className={`text-center transition-opacity duration-300 ${fadeClass}`}>
            <div className="mb-4 flex justify-center">
              {showCheckmark ? (
                <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center animate-scale-in">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 border-2 border-[#0D9488] rounded-full animate-spin-slow" />
              )}
            </div>
            <p className="font-display text-xl font-bold text-white">
              {t.ready}
            </p>
          </div>
        )}

        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="font-mono text-xs text-[#94A3B8]">{t.powered}</p>
        </div>
      </div>
    </div>
  );
}
