export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

export type EventType = 'page_view' | 'report_generated' | 'payment_started' | 'share_clicked' | 'search_used';

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

export interface ErrorResponse {
  error: string;
  message?: string;
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
export async function POST(
  request: NextRequest
): Promise<NextResponse<AnalyticsResponse | ErrorResponse>> {
  // Rate limiting: 100 req/min per IP
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, {
    windowMs: 60000,
    maxRequests: 100,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Rate limit exceeded: 100 requests per minute',
      },
      {
        status: 429,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    // Parse request body
    let payload: AnalyticsEventPayload;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON',
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Validate required fields
    if (!payload.event || typeof payload.event !== 'string') {
      return NextResponse.json(
        {
          error: 'Missing required field',
          message: 'Field "event" is required and must be a string',
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    if (!payload.sessionId || typeof payload.sessionId !== 'string') {
      return NextResponse.json(
        {
          error: 'Missing required field',
          message: 'Field "sessionId" is required and must be a string',
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    if (typeof payload.timestamp !== 'number') {
      return NextResponse.json(
        {
          error: 'Missing required field',
          message: 'Field "timestamp" is required and must be a number',
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Validate event type
    const validEvents: EventType[] = [
      'page_view',
      'report_generated',
      'payment_started',
      'share_clicked',
      'search_used',
    ];

    if (!validEvents.includes(payload.event as EventType)) {
      return NextResponse.json(
        {
          error: 'Invalid event type',
          message: `Event must be one of: ${validEvents.join(', ')}`,
        },
        {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    // Event received (removed console.log for production)

    // TODO: Store event in database here
    // For now, this is just logged to console and can be integrated with:
    // - Supabase (via lib/supabase.ts)
    // - Google Analytics
    // - Mixpanel
    // - Segment
    // - Custom analytics database

    // Return success response with CORS headers
    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'X-RateLimit-Remaining': `${rateLimitResult.remaining}`,
          'Cache-Control': 'no-cache, no-store',
        },
      }
    );
  } catch (error) {
    console.error('[Analytics] Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing the event',
      },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
