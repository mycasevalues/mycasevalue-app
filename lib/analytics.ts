/**
 * Server-safe analytics utilities
 * Use in server components and API routes
 */

// Event name constants for consistent tracking across the app
export const EVENTS = {
  REPORT_GENERATED: 'report_generated',
  PREMIUM_PURCHASED: 'premium_purchased',
  CASE_SEARCHED: 'case_searched',
  PREMIUM_UPGRADE_VIEWED: 'premium_upgrade_viewed',
  SHARE_CLICKED: 'share_clicked',
  FILTER_APPLIED: 'filter_applied',
  REPORT_DOWNLOADED: 'report_downloaded',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  ERROR_OCCURRED: 'error_occurred',
  FEATURE_USED: 'feature_used',
  PAGE_VIEWED: 'page_viewed',
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];

/**
 * Track a server-side event
 * In development, logs to console; in production, could send to analytics API
 * @param eventName - The name of the event (use EVENTS constant)
 * @param properties - Event properties and metadata
 */
export function trackServerEvent(
  eventName: EventName,
  properties: Record<string, any> = {}
): void {
  // Fire-and-forget: log to Supabase analytics_events table
  try {
    const { getSupabaseAdmin } = require('./supabase');
    const supabase = getSupabaseAdmin();
    supabase
      .from('analytics_events')
      .insert({
        event: eventName,
        properties,
        created_at: new Date().toISOString(),
      })
      .then(() => {})
      .catch((err: Error) => {
        // Silent failure — analytics should never break the app
        if (process.env.NODE_ENV === 'development') {
          console.warn('[analytics] Failed to track event:', err.message);
        }
      });
  } catch {
    // Supabase not available — skip silently
  }
}

/**
 * Track an error event on the server
 * Useful for monitoring application health
 */
export function trackServerError(
  errorMessage: string,
  errorCode?: string,
  context?: Record<string, any>
): void {
  trackServerEvent(EVENTS.ERROR_OCCURRED, {
    error_message: errorMessage,
    error_code: errorCode,
    ...context,
  });
}

/**
 * Track a feature usage event on the server
 */
export function trackFeatureUsage(
  featureName: string,
  metadata?: Record<string, any>
): void {
  trackServerEvent(EVENTS.FEATURE_USED, {
    feature_name: featureName,
    ...metadata,
  });
}
