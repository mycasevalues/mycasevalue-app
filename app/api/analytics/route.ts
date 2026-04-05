export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { apiHandler, OPTIONS } from '../../../lib/api-middleware';
import { apiSuccess, apiBadRequest } from '../../../lib/api-response';
import { getSupabaseAdmin } from '../../../lib/supabase';

export type EventType = 'page_view' | 'report_generated' | 'payment_started' | 'share_clicked' | 'search_used' | 'error_caught';

export interface AnalyticsEventPayload {
  event: EventType;
  sessionId: string;
  timestamp: number;
  data?: Record<string, any>;
  pathname?: string;
}

export interface AnalyticsResponse {
  ok: boolean;
}

/**
 * POST /api/analytics
 *
 * Receives analytics events from the client and stores them for analysis.
 * This endpoint is designed to be lightweight and fire-and-forget from the client.
 *
 * Request body:
 * {
 *   event: string (required) - event type
 *   sessionId: string (required) - unique session identifier
 *   timestamp: number (required) - unix timestamp
 *   data?: object - optional event-specific data
 *   pathname?: string - optional page path
 * }
 *
 * Response: { ok: true }
 * Rate limit: 100 requests per minute per IP
 */
export const POST = apiHandler(
  {
    rateLimit: { windowMs: 60000, maxRequests: 100 },
    routeName: 'analytics',
  },
  async (request: NextRequest, { log, clientIp }) => {
    // Parse request body
    let payload: AnalyticsEventPayload;

    try {
      payload = await request.json();
    } catch {
      return apiBadRequest('Request body must be valid JSON');
    }

    // Validate required fields
    if (!payload.event || typeof payload.event !== 'string') {
      return apiBadRequest('Field "event" is required and must be a string');
    }

    if (!payload.sessionId || typeof payload.sessionId !== 'string') {
      return apiBadRequest('Field "sessionId" is required and must be a string');
    }

    if (typeof payload.timestamp !== 'number') {
      return apiBadRequest('Field "timestamp" is required and must be a number');
    }

    // Validate event type
    const validEvents: EventType[] = [
      'page_view',
      'report_generated',
      'payment_started',
      'share_clicked',
      'search_used',
      'error_caught',
    ];

    if (!validEvents.includes(payload.event as EventType)) {
      return apiBadRequest(
        `Event must be one of: ${validEvents.join(', ')}`
      );
    }

    // Store event in Supabase (fire-and-forget)
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from('analytics_events').insert({
        event: payload.event,
        session_id: payload.sessionId,
        properties: payload.data || {},
        pathname: payload.pathname || null,
        ip: clientIp,
        created_at: new Date(payload.timestamp).toISOString(),
      });
    } catch (dbErr) {
      // Analytics storage failure should never block the response
      const message = dbErr instanceof Error ? dbErr.message : String(dbErr);
      log.warn('DB insert failed', { error: message });
    }

    // Return success response
    return apiSuccess({ ok: true });
  }
);

// Re-export OPTIONS handler from middleware
export { OPTIONS };
