'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getVariant, ExperimentId } from '../../lib/ab-testing';

/**
 * A/B Testing Context Type
 */
interface ABTestContextType {
  getVariant: (experimentId: ExperimentId) => string;
  userId?: string;
}

/**
 * Create A/B testing context
 * Uses cookie-based or in-memory state (no localStorage)
 */
const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

/**
 * Get or create a persistent user ID from cookies
 * This ID persists across sessions for consistent experiment assignment
 */
function getOrCreateUserIdFromCookie(): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookieName = '__ab_user_id';

  // Try to read existing user ID from cookie
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName && value) {
      return decodeURIComponent(value);
    }
  }

  // Generate new user ID
  const newUserId = generateRandomId();

  // Set cookie (expires in 2 years)
  const expiresDate = new Date();
  expiresDate.setFullYear(expiresDate.getFullYear() + 2);
  document.cookie = `${cookieName}=${encodeURIComponent(newUserId)}; path=/; expires=${expiresDate.toUTCString()}; SameSite=Lax`;

  return newUserId;
}

/**
 * Generate a random ID (UUID-like)
 */
function generateRandomId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * A/B Testing Provider Component
 * Wraps the application and provides experiment variants via context
 * Uses cookies for persistent user ID across sessions
 */
export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  // Initialize user ID from cookie on mount (client-side only)
  useEffect(() => {
    const id = getOrCreateUserIdFromCookie();
    setUserId(id);
    setMounted(true);
  }, []);

  // Create getVariant function bound to this user
  const contextGetVariant = (experimentId: ExperimentId): string => {
    return getVariant(experimentId, userId);
  };

  const value: ABTestContextType = {
    getVariant: contextGetVariant,
    userId,
  };

  // Don't render context until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
}

/**
 * Hook to access A/B testing context
 * Returns the variant for a given experiment
 *
 * Usage:
 * const { getVariant } = useABTest();
 * const heroCta = getVariant('hero_cta_text');
 */
export function useABTest(): ABTestContextType {
  const context = useContext(ABTestContext);

  if (!context) {
    throw new Error('useABTest must be used within ABTestProvider');
  }

  return context;
}

/**
 * Convenience hook to get a specific experiment variant
 * Usage: const variant = useExperiment('hero_cta_text');
 */
export function useExperiment(experimentId: ExperimentId): string {
  const { getVariant } = useABTest();
  return getVariant(experimentId);
}

export default ABTestProvider;
