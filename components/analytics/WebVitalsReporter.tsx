'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Web Vitals Reporter
 *
 * Reports Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP) to our
 * analytics endpoint. Helps monitor real-user performance on production.
 *
 * Only reports poor or needs-improvement metrics to reduce noise.
 */
export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Only report non-good metrics to reduce noise
    if (metric.rating === 'good') return;

    const sessionId = typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('__analytics_session_id') || 'unknown'
      : 'unknown';

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        sessionId,
        timestamp: Date.now(),
        pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
        data: {
          web_vital: metric.name,
          value: Math.round(metric.value),
          rating: metric.rating,
          metric_id: metric.id,
        },
      }),
    }).catch(() => {});
  });

  return null;
}
