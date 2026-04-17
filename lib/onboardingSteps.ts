/**
 * onboardingSteps.ts — Step definitions for the attorney dashboard tour.
 *
 * Each step targets an element on the /attorney page via CSS selector.
 * Selectors are intentionally generic so they survive minor markup changes.
 */

export interface OnboardingStep {
  /** CSS selector for the element to highlight */
  target: string;
  /** Tooltip title (displayed in serif font) */
  title: string;
  /** Tooltip body (displayed in sans-serif font) */
  description: string;
  /** Preferred tooltip position relative to the target */
  position: 'top' | 'bottom' | 'left' | 'right';
}

const steps: OnboardingStep[] = [
  {
    target: 'header[role="banner"]',
    title: 'Welcome to Attorney Tools',
    description:
      'This is your professional legal intelligence dashboard. Here you will find AI-powered tools built on 5.1M+ verified federal court records. Let us walk you through the key areas.',
    position: 'bottom',
  },
  {
    target: 'header[role="banner"] form',
    title: 'Search & Navigation',
    description:
      'Use the global search bar to find cases, judges, districts, and tools across the platform. Results appear instantly as you type.',
    position: 'bottom',
  },
  {
    target: 'a[href="/attorney/demand-letter"]',
    title: 'Demand Letter Generator',
    description:
      'One of our most popular tools — draft AI-powered demand letters with data-backed settlement figures and legal citations in minutes.',
    position: 'top',
  },
  {
    target: 'a[href="/attorney/case-predictor"]',
    title: 'Premium AI Tools',
    description:
      'Tools like the AI Case Predictor require an authenticated account. Sign in to unlock the full suite of attorney-grade intelligence features.',
    position: 'top',
  },
  {
    target: 'header[role="banner"] > div > div:last-child',
    title: 'Account & Settings',
    description:
      'Access your account settings, view history, manage alerts, and toggle preferences from the top-right navigation area.',
    position: 'bottom',
  },
];

export default steps;
