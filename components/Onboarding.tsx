'use client';

import { useEffect, useState } from 'react';

interface OnboardingStep {
  title: string;
  description: string;
  highlightElement?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to MyCaseValue',
    description:
      'Federal court intelligence from public records. Access case outcomes, judge analytics, and settlement data across all 94 federal districts to inform your litigation strategy.',
    highlightElement: undefined,
  },
  {
    title: 'Search Federal Cases',
    description:
      'Use the search bar to find cases by jurisdiction, case type, judge, or legal issue. Precision Analytics lets you build custom searches with specific parameters.',
    highlightElement: 'homepage-search-bar',
  },
  {
    title: 'Explore Case Analytics',
    description:
      'Browse our comprehensive database of federal cases. Win rates, settlement ranges, and case timelines are updated weekly from public federal court records.',
    highlightElement: 'homepage-browse-cards',
  },
  {
    title: 'Get Your Free Report',
    description:
      'Download detailed case analytics reports. Track judicial patterns, settlement trends, and outcomes specific to your practice area and jurisdiction.',
    highlightElement: undefined,
  },
];

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const onboardingComplete = localStorage.getItem('mcv_onboarding_complete');
    if (!onboardingComplete) {
      setIsOpen(true);
    }
  }, [isClient]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('mcv_onboarding_complete', 'true');
    setIsOpen(false);
  };

  if (!isOpen || !isClient) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={handleSkip}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99,
          animation: 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-labelledby="onboarding-title"
        aria-describedby="onboarding-description"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 480,
          background: 'var(--card, #FFFFFF)',
          border: '1px solid var(--bdr, #E2DFD8)',
          borderRadius: 8,
          padding: '32px 24px',
          zIndex: 100,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          animation: 'slideUp 0.4s ease-out',
        }}
      >
        {/* Close button (top right) */}
        <button
          onClick={handleSkip}
          aria-label="Skip onboarding"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text3, #78766C)',
            fontSize: 20,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text1, #18181A)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text3, #78766C)';
          }}
        >
          ×
        </button>

        {/* Step indicator dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 20,
            justifyContent: 'center',
          }}
        >
          {ONBOARDING_STEPS.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: idx <= currentStep ? 'var(--gold, #C4882A)' : 'var(--bdr, #E2DFD8)',
                transition: 'background 0.3s ease',
              }}
              aria-label={`Step ${idx + 1} of ${ONBOARDING_STEPS.length}`}
            />
          ))}
        </div>

        {/* Title */}
        <h2
          id="onboarding-title"
          style={{
            fontFamily: 'var(--font-legal)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text1, #18181A)',
            margin: '0 0 8px',
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </h2>

        {/* Description */}
        <p
          id="onboarding-description"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            color: 'var(--text2, #42403C)',
            lineHeight: 1.6,
            margin: '0 0 24px',
          }}
        >
          {step.description}
        </p>

        {/* Step counter */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text3, #78766C)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 16px',
          }}
        >
          Step {currentStep + 1} of {ONBOARDING_STEPS.length}
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {/* Skip button */}
          <button
            onClick={handleSkip}
            style={{
              flex: 1,
              height: 36,
              padding: '0 12px',
              background: 'transparent',
              color: 'var(--text2, #42403C)',
              border: '1px solid var(--bdr, #E2DFD8)',
              borderRadius: 4,
              fontSize: 13,
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surf, #F6F5F2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {isLastStep ? 'Done' : 'Skip'}
          </button>

          {/* Next/Finish button */}
          <button
            onClick={handleNext}
            style={{
              flex: 1,
              height: 36,
              padding: '0 12px',
              background: 'var(--gold, #C4882A)',
              color: 'var(--card, #FFFFFF)',
              border: 'none',
              borderRadius: 4,
              fontSize: 13,
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#B87A1F';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(196, 136, 42, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--gold, #C4882A)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLastStep ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
