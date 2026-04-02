'use client';

import Script from 'next/script';

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!(window as any).gtag) {
    console.warn('[GA4] gtag not initialized');
    return;
  }

  const eventData: Record<string, any> = {
    event_category: category,
  };

  if (label !== undefined) {
    eventData.event_label = label;
  }

  if (value !== undefined) {
    eventData.value = value;
  }

  (window as any).gtag('event', action, eventData);
}

/**
 * Google Analytics 4 Component
 * Loads GA4 script via next/script with proper configuration
 * Renders nothing if NEXT_PUBLIC_GA_MEASUREMENT_ID is not set (graceful no-op)
 */
export default function GoogleAnalytics(): React.ReactElement | null {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Graceful no-op if measurement ID is not configured
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Load gtag script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      {/* Initialize gtag with GA4 config */}
      <Script
        id="ga-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: true,
              restricted_data_processing: false,
            });
          `,
        }}
      />
    </>
  );
}
