'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'mcv-onboarding-complete';

export interface UseOnboardingReturn {
  /** Whether the onboarding tour should be displayed */
  showOnboarding: boolean;
  /** Programmatically start (or restart) the tour */
  startTour: () => void;
  /** Mark the tour as completed and hide it */
  completeTour: () => void;
  /** Clear the completion flag so the tour can show again */
  resetTour: () => void;
}

/**
 * useOnboarding — controls onboarding tour visibility via localStorage.
 *
 * The tour shows automatically for users who have not completed it.
 * Pass `isAuthenticated` to gate visibility behind auth state.
 */
export function useOnboarding(isAuthenticated: boolean): UseOnboardingReturn {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowOnboarding(false);
      return;
    }
    try {
      const completed = localStorage.getItem(STORAGE_KEY);
      if (completed !== 'true') {
        setShowOnboarding(true);
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, [isAuthenticated]);

  const startTour = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
    setShowOnboarding(true);
  }, []);

  const completeTour = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // noop
    }
    setShowOnboarding(false);
  }, []);

  const resetTour = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
    setShowOnboarding(false);
  }, []);

  return { showOnboarding, startTour, completeTour, resetTour };
}
