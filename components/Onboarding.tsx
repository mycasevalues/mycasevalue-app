'use client';

/**
 * Onboarding.tsx — Step-by-step tooltip tour for first-time attorney dashboard users.
 *
 * Features:
 * - State-machine pattern: array of steps with current index
 * - Positioned tooltip with pointer arrow near the target element
 * - Semi-transparent backdrop with spotlight cutout around the target
 * - Step counter, Back/Next buttons, Skip tour link
 * - Stores completion in localStorage (mcv-onboarding-complete)
 * - Only renders for authenticated users who have not completed the tour
 *
 * Design tokens:
 *   --chrome-bg: #1B2D45, --gold: #C4882A, --surf: #F6F5F2
 *   --bdr: #E2DFD8, --card: #FFFFFF, --font-legal, --font-ui
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import steps from '@/lib/onboardingSteps';

/* ── Geometry helpers ── */

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TOOLTIP_GAP = 12;
const SPOTLIGHT_PADDING = 6;
const ARROW_SIZE = 8;
const TOOLTIP_WIDTH = 340;

function getTargetRect(selector: string): Rect | null {
  try {
    const el = document.querySelector(selector);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
      height: r.height,
    };
  } catch {
    return null;
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

/* ── Tooltip position calculator ── */

interface TooltipPos {
  top: number;
  left: number;
  arrowStyle: React.CSSProperties;
}

function computeTooltipPos(
  target: Rect,
  position: 'top' | 'bottom' | 'left' | 'right',
  tooltipHeight: number,
): TooltipPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scrollY = window.scrollY;

  let resolved = position;

  // Viewport-relative target bounds
  const targetViewTop = target.top - scrollY;
  const targetViewBottom = targetViewTop + target.height;

  // Flip if not enough room
  if (resolved === 'bottom' && targetViewBottom + TOOLTIP_GAP + tooltipHeight > vh) {
    resolved = 'top';
  } else if (resolved === 'top' && targetViewTop - TOOLTIP_GAP - tooltipHeight < 0) {
    resolved = 'bottom';
  } else if (resolved === 'left' && target.left - TOOLTIP_GAP - TOOLTIP_WIDTH < 0) {
    resolved = 'right';
  } else if (resolved === 'right' && target.left + target.width + TOOLTIP_GAP + TOOLTIP_WIDTH > vw) {
    resolved = 'left';
  }

  let top = 0;
  let left = 0;
  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };

  const centerX = target.left + target.width / 2;
  const centerY = target.top + target.height / 2;

  switch (resolved) {
    case 'bottom':
      top = target.top + target.height + TOOLTIP_GAP;
      left = clamp(centerX - TOOLTIP_WIDTH / 2, 8, vw - TOOLTIP_WIDTH - 8);
      arrowStyle.top = -ARROW_SIZE;
      arrowStyle.left = clamp(centerX - left - ARROW_SIZE, 16, TOOLTIP_WIDTH - 32);
      arrowStyle.borderWidth = `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`;
      arrowStyle.borderColor = 'transparent transparent #FFFFFF transparent';
      break;
    case 'top':
      top = target.top - TOOLTIP_GAP - tooltipHeight;
      left = clamp(centerX - TOOLTIP_WIDTH / 2, 8, vw - TOOLTIP_WIDTH - 8);
      arrowStyle.bottom = -ARROW_SIZE;
      arrowStyle.left = clamp(centerX - left - ARROW_SIZE, 16, TOOLTIP_WIDTH - 32);
      arrowStyle.borderWidth = `${ARROW_SIZE}px ${ARROW_SIZE}px 0 ${ARROW_SIZE}px`;
      arrowStyle.borderColor = '#FFFFFF transparent transparent transparent';
      break;
    case 'left':
      top = clamp(centerY - tooltipHeight / 2, scrollY + 8, scrollY + vh - tooltipHeight - 8);
      left = target.left - TOOLTIP_GAP - TOOLTIP_WIDTH;
      arrowStyle.right = -ARROW_SIZE;
      arrowStyle.top = clamp(centerY - top - ARROW_SIZE, 16, tooltipHeight - 32);
      arrowStyle.borderWidth = `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`;
      arrowStyle.borderColor = 'transparent transparent transparent #FFFFFF';
      break;
    case 'right':
      top = clamp(centerY - tooltipHeight / 2, scrollY + 8, scrollY + vh - tooltipHeight - 8);
      left = target.left + target.width + TOOLTIP_GAP;
      arrowStyle.left = -ARROW_SIZE;
      arrowStyle.top = clamp(centerY - top - ARROW_SIZE, 16, tooltipHeight - 32);
      arrowStyle.borderWidth = `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`;
      arrowStyle.borderColor = 'transparent #FFFFFF transparent transparent';
      break;
  }

  return { top, left, arrowStyle };
}

/* ── SVG Backdrop with spotlight cutout ── */

function Backdrop({ target, onClick }: { target: Rect | null; onClick: () => void }) {
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      setDims({
        w: Math.max(document.documentElement.scrollWidth, window.innerWidth),
        h: Math.max(document.documentElement.scrollHeight, window.innerHeight),
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const pad = SPOTLIGHT_PADDING;
  const r = 4;

  return (
    <svg
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: dims.w,
        height: dims.h,
        pointerEvents: 'auto',
      }}
      aria-hidden="true"
    >
      <defs>
        <mask id="onboarding-spotlight-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {target && (
            <rect
              x={target.left - pad}
              y={target.top - pad}
              width={target.width + pad * 2}
              height={target.height + pad * 2}
              rx={r}
              ry={r}
              fill="black"
            />
          )}
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="rgba(0,0,0,0.48)"
        mask="url(#onboarding-spotlight-mask)"
      />
    </svg>
  );
}

/* ── Main Onboarding Component ── */

export default function Onboarding() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { showOnboarding, completeTour } = useOnboarding(isAuthenticated);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipHeight, setTooltipHeight] = useState(200);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];

  /* ── Measure target element ── */
  const measureTarget = useCallback(() => {
    if (!step) return;
    const rect = getTargetRect(step.target);
    setTargetRect(rect);
  }, [step]);

  useEffect(() => {
    if (!showOnboarding) return;
    measureTarget();

    const onResize = () => measureTarget();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [showOnboarding, currentStep, measureTarget]);

  /* ── Measure tooltip height after render ── */
  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  }, [currentStep, showOnboarding]);

  /* ── Scroll target into view ── */
  useEffect(() => {
    if (!showOnboarding || !step) return;
    const el = document.querySelector(step.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Re-measure after scroll animation settles
      const timer = setTimeout(measureTarget, 400);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding, currentStep, step, measureTarget]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (!showOnboarding) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeTour();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          setCurrentStep((s) => s + 1);
        } else {
          completeTour();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStep > 0) {
          setCurrentStep((s) => s - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showOnboarding, currentStep, completeTour]);

  /* ── Don't render while loading, if not authed, or tour is done ── */
  if (authLoading || !showOnboarding || !step) return null;

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const tooltipPos = targetRect
    ? computeTooltipPos(targetRect, step.position, tooltipHeight)
    : null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9997,
        overflow: 'auto',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Onboarding tour: step ${currentStep + 1} of ${steps.length}`}
    >
      {/* Backdrop overlay with spotlight cutout */}
      <Backdrop target={targetRect} onClick={completeTour} />

      {/* Tooltip */}
      {tooltipPos && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: TOOLTIP_WIDTH,
            backgroundColor: 'var(--card, #FFFFFF)',
            border: '1px solid var(--bdr, #E2DFD8)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            zIndex: 9999,
            pointerEvents: 'auto',
            overflow: 'visible',
          }}
        >
          {/* Arrow */}
          <div style={tooltipPos.arrowStyle} />

          {/* Gold accent bar */}
          <div
            style={{
              height: 3,
              backgroundColor: 'var(--gold, #C4882A)',
              borderRadius: '4px 4px 0 0',
            }}
          />

          {/* Content */}
          <div style={{ padding: '16px 20px 12px' }}>
            {/* Step counter */}
            <div
              style={{
                fontSize: 12,
                fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                color: 'var(--gold, #C4882A)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 6,
              }}
            >
              Step {currentStep + 1} of {steps.length}
            </div>

            {/* Title */}
            <h3
              style={{
                margin: '0 0 8px',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-legal, 'Libre Baskerville', serif)",
                color: 'var(--text1, #333333)',
                lineHeight: 1.3,
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                color: 'var(--text2, #42403C)',
                lineHeight: 1.55,
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Footer: navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 20px 14px',
              gap: 8,
            }}
          >
            {/* Skip tour link */}
            <button
              onClick={completeTour}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                fontSize: 12,
                fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                color: 'var(--text2, #42403C)',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}
              aria-label="Skip the onboarding tour"
            >
              Skip tour
            </button>

            <div style={{ display: 'flex', gap: 8 }}>
              {/* Back button — hidden on first step */}
              {!isFirst && (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 14,
                    fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                    fontWeight: 600,
                    color: 'var(--text1, #333333)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--bdr, #E2DFD8)',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                  aria-label="Go to previous step"
                >
                  Back
                </button>
              )}

              {/* Next / Finish button */}
              <button
                onClick={() => {
                  if (isLast) {
                    completeTour();
                  } else {
                    setCurrentStep((s) => s + 1);
                  }
                }}
                style={{
                  padding: '6px 18px',
                  fontSize: 14,
                  fontFamily: "var(--font-ui, 'Source Sans 3', sans-serif)",
                  fontWeight: 600,
                  color: '#FFFFFF',
                  backgroundColor: 'var(--gold, #C4882A)',
                  border: 'none',
                  borderRadius: 2,
                  cursor: 'pointer',
                }}
                aria-label={isLast ? 'Finish the tour' : 'Go to next step'}
              >
                {isLast ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>

          {/* Step indicator dots */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              paddingBottom: 12,
            }}
          >
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentStep ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor:
                    i === currentStep
                      ? 'var(--gold, #C4882A)'
                      : 'var(--bdr, #E2DFD8)',
                  transition: 'width 200ms ease, background-color 200ms ease',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
