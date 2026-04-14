'use client';

import { useCallback, useEffect, useRef } from 'react';

type EventType = 'tool_view' | 'tool_use' | 'search' | 'signup' | 'conversion' | 'page_view';

/**
 * Client-side analytics hook.
 * Tracks tool usage, searches, and conversions via /api/analytics.
 * Uses navigator.sendBeacon for non-blocking delivery.
 */
export function useAnalytics() {
  const sessionId = useRef<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    if (typeof window !== 'undefined') {
      let sid = window.sessionStorage?.getItem('mcv_session') || '';
      if (!sid) {
        sid = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        try { window.sessionStorage.setItem('mcv_session', sid); } catch { /* ignore */ }
      }
      sessionId.current = sid;
    }
  }, []);

  const track = useCallback((eventType: EventType, data?: { tool_name?: string; nos_code?: string; metadata?: Record<string, unknown> }) => {
    const payload = JSON.stringify({
      event_type: eventType,
      tool_name: data?.tool_name,
      nos_code: data?.nos_code,
      metadata: data?.metadata,
      session_id: sessionId.current,
    });

    // Use sendBeacon for non-blocking delivery (works even on page unload)
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', payload);
    } else {
      // Fallback to fetch
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => { /* silent fail */ });
    }
  }, []);

  const trackToolView = useCallback((toolName: string) => track('tool_view', { tool_name: toolName }), [track]);
  const trackToolUse = useCallback((toolName: string, nosCode?: string) => track('tool_use', { tool_name: toolName, nos_code: nosCode }), [track]);
  const trackSearch = useCallback((query: string) => track('search', { metadata: { query } }), [track]);
  const trackSignup = useCallback(() => track('signup'), [track]);
  const trackConversion = useCallback((type: string) => track('conversion', { metadata: { type } }), [track]);
  const trackPageView = useCallback((path: string) => track('page_view', { metadata: { path } }), [track]);

  return { track, trackToolView, trackToolUse, trackSearch, trackSignup, trackConversion, trackPageView };
}
