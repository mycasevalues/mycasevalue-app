'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep?: number;
  step?: number; // backward compatibility
  labels?: string[];
  lang?: string;
  selections?: {
    category?: string;
    subcategory?: string;
  };
}

type StepConfig = {
  en: string[];
  es: string[];
};

const DEFAULT_STEPS: StepConfig = {
  en: ['Case Type', 'Specifics', 'Details', 'Report'],
  es: ['Tipo de Caso', 'Específicos', 'Detalles', 'Informe'],
};

const COLORS = {
  primary: '#111111',
  text: '#111827',
  muted: '#6B7280',
  bg: '#F9FAFB',
  accentSecondary: '#8B5CF6',
  border: '#D1D5DB',
  lightBg: '#EDE9E3',
};

function mapLegacyStep(oldStep: number): number {
  // Map old step values to new 4-step system:
  // old step 1 → new step 1 (Case Type)
  // old step 1 with subcategory → new step 2 (Specifics)
  // old step 2 → new step 3 (Details)
  // old step 3 → new step 4 (Report)
  if (oldStep <= 1) return 1;
  if (oldStep === 2) return 3;
  if (oldStep >= 3) return 4;
  return oldStep;
}

export function WizardProgress({
  currentStep,
  step,
  labels,
  lang = 'en',
  selections,
}: WizardProgressProps) {
  // Handle backward compatibility
  const activeStep = currentStep !== undefined ? currentStep : (step !== undefined ? mapLegacyStep(step) : 1);

  // Use provided labels if available (backward compat), otherwise use default 4-step labels
  const stepLabels = labels || DEFAULT_STEPS[lang as keyof StepConfig] || DEFAULT_STEPS.en;
  const totalSteps = stepLabels.length;

  // Clamp active step to valid range
  const normalizedStep = Math.max(1, Math.min(activeStep, totalSteps));

  // Build breadcrumb from selections
  const breadcrumbItems: string[] = [];
  if (selections?.category) {
    breadcrumbItems.push(selections.category);
  }
  if (selections?.subcategory) {
    breadcrumbItems.push(selections.subcategory);
  }

  return (
    <div className="mb-8 no-print">
      {/* Main Stepper */}
      <div className="px-2">
        <div className="flex items-center justify-between gap-2">
          {stepLabels.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < normalizedStep;
            const isCurrent = stepNum === normalizedStep;
            const isFuture = stepNum > normalizedStep;

            return (
              <React.Fragment key={stepNum}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      transition-all duration-300 relative
                      ${
                        isCompleted
                          ? 'bg-[#111111] text-white'
                          : isCurrent
                            ? 'text-[#111111]'
                            : 'bg-[#E5E0D8] text-[#9CA3AF]'
                      }
                    `}
                    style={{
                      backgroundColor: isCompleted
                        ? COLORS.primary
                        : isCurrent
                          ? 'transparent'
                          : COLORS.border,
                      color: isCompleted
                        ? 'white'
                        : isCurrent
                          ? COLORS.primary
                          : COLORS.muted,
                      border: isCurrent ? `2px solid ${COLORS.primary}` : 'none',
                      boxShadow:
                        isCurrent
                          ? `0 0 0 4px rgba(17, 17, 17, 0.1), 0 0 0 8px rgba(17, 17, 17, 0.05)`
                          : 'none',
                    }}
                  >
                    {isCompleted ? (
                      <Check size={20} strokeWidth={3} />
                    ) : (
                      <span>{stepNum}</span>
                    )}

                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <div
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{
                          background: `rgba(17, 17, 17, 0.1)`,
                        }}
                      />
                    )}
                  </div>

                  {/* Step Label */}
                  <div
                    className="mt-2 text-center text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    style={{
                      color:
                        stepNum <= normalizedStep
                          ? COLORS.primary
                          : COLORS.muted,
                    }}
                  >
                    {label}
                  </div>
                </div>

                {/* Connector Line */}
                {stepNum < stepLabels.length && (
                  <div
                    className="flex-grow h-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        stepNum < normalizedStep
                          ? COLORS.primary
                          : COLORS.border,
                      minWidth: '24px',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Breadcrumb Selection Summary */}
      {breadcrumbItems.length > 0 && (
        <div className="mt-6 px-2">
          <div className="text-xs font-medium text-[#6B7280] mb-2">
            {lang === 'es' ? 'Selecciones:' : 'Selections:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {breadcrumbItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="text-[#6B7280] text-xs">→</span>
                )}
                <div
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: COLORS.lightBg,
                    color: COLORS.text,
                  }}
                >
                  {item}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WizardProgress;
