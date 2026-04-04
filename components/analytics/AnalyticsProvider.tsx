'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export type EventType = 'page_view' | 'report_generated' | 'share_clicked' | 'search_used';

export interface AnalyticsEvent {
  event: EventType;
  sessionId: string;
  timestamp: number;
  data?: Record<string, any>;
  pathname?: string;
}

export interface AnalyticsContextType {
  trackEvent: (name: EventType, data?: Record<string, any>) => void;
  sessionId: string;
}

/**
 * Create analytics context
 */
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

/**
 * Generate a random UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get or create session ID from sessionStorage
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const storageKey = '__analytics_session_id';
  let sessionId = sessionStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = generateUUID();
    sessionStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
}

/**
 * Check if user has opted out of tracking via Do Not Track
 */
function shouldRespectDoNotTrack(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const dnt = navigator.doNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Send event to analytics API (fire-and-forget)
 */
async function sendAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  // Respect Do Not Track
  if (shouldRespectDoNotTrack()) {
    return;
  }

  try {
    // Fire-and-forget: don't await the response
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch((error) => {
      // Silently fail - don't block user experience
    });
  } catch (error) {
    /* silent */
  }
}

/**
 * AnalyticsProvider component
 * Wraps the application and provides analytics context
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sessionId = useRef<string>('');
  const lastPathnameRef = useRef<string>('');

  // Initialize session ID on mount
  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
  }, []);

  // Track page views when pathname changes
  useEffect(() => {
    if (!sessionId.current || pathname === lastPathnameRef.current) {
      return;
    }

    lastPathnameRef.current = pathname;

    const event: AnalyticsEvent = {
      event: 'page_view',
      sessionId: sessionId.current,
      timestamp: Date.now(),
      pathname,
    };

    sendAnalyticsEvent(event);
  }, [pathname]);

  // Create track event function
  const trackEvent = (name: EventType, data?: Record<string, any>) => {
    if (!sessionId.current) {
      return;
    }

    const event: AnalyticsEvent = {
      event: name,
      sessionId: sessionId.current,
      timestamp: Date.now(),
      data,
      pathname,
    };

    sendAnalyticsEvent(event);
  };

  const value: AnalyticsContextType = {
    trackEvent,
    sessionId: sessionId.current,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to use analytics context
 * Usage: const { trackEvent } = useAnalytics();
 */
export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }

  return context;
}

export default AnalyticsProvider;
