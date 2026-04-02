'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Props {
  lang?: string;
  onComplete: () => void;
}

const steps = [
  {
    title: 'Welcome to MyCaseValue',
    description: 'See real federal court outcomes for cases like yours. 100% free, no account needed.',
    icon: '',
  },
  {
    title: 'Choose Your Situation',
    description: 'Select from 12 categories and 100+ specific case types to get relevant data.',
    icon: '',
  },
  {
    title: 'Get Your Report',
    description: 'See win rates, settlement amounts, timelines, and attorney impact — all from real court records.',
    icon: '',
  },
  {
    title: 'Premium Insights',
    description: 'Unlock judge analytics, state comparisons, and downloadable PDF reports.',
    icon: '',
  },
];

const translations = {
  en: {
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    getStarted: 'Get Started',
  },
  es: {
    next: 'Siguiente',
    previous: 'Anterior',
    skip: 'Omitir',
    getStarted: 'Comenzar',
  },
};

export default function OnboardingTour({ lang = 'en', onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const t = translations[lang as keyof typeof translations] || translations.en;
  const step = steps[currentStep];

  useEffect(() => {
    const tourDone = localStorage.getItem('mcv_tour_done');
    if (tourDone === 'true') {
      onComplete();
    }
  }, [onComplete]);

  if (!isVisible) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    localStorage.setItem('mcv_tour_done', 'true');
    setIsVisible(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(11, 18, 33, 0.85)' }}>
      {/* Close button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 p-2 rounded-lg transition-colors hover:bg-indigo-600"
        style={{ color: '#E2E8F0' }}
        aria-label="Close tour"
      >
        <X size={24} />
      </button>

      {/* Card */}
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl p-8 relative"
        style={{ backgroundColor: '#131B2E', borderColor: '#4F46E5', borderWidth: '1px' }}
      >
        {/* Icon */}
        <div className="text-6xl mb-6 text-center">{step.icon}</div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#E2E8F0' }}>
          {step.title}
        </h2>

        {/* Description */}
        <p className="text-lg mb-8 text-center" style={{ color: '#B0BDD0' }}>
          {step.description}
        </p>

        {/* Step indicators */}
        <div className="flex gap-2 justify-center mb-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className="rounded-full transition-all"
              style={{
                width: index === currentStep ? '32px' : '8px',
                height: '8px',
                backgroundColor: index === currentStep ? '#4F46E5' : '#4F46E5',
                opacity: index === currentStep ? 1 : 0.3,
              }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            style={{
              color: '#E2E8F0',
              borderColor: '#4F46E5',
              borderWidth: '1px',
            }}
          >
            <ChevronLeft size={18} />
            {t.previous}
          </button>

          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              color: '#B0BDD0',
              borderColor: '#4F46E5',
              borderWidth: '1px',
            }}
          >
            {t.skip}
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleGetStarted}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: '#4F46E5',
                color: '#E2E8F0',
              }}
            >
              {t.getStarted}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: '#4F46E5',
                color: '#E2E8F0',
              }}
            >
              {t.next}
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Step counter */}
        <p className="text-center mt-4" style={{ color: '#B0BDD0', fontSize: '14px' }}>
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
