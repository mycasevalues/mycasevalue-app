import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, RateLimitConfig } from '../../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * Request body type for A/B test conversion tracking
 */
interface TrackConversionRequest {
  experimentId: string;
  variant: string;
  event: string;
  metadata?: Record<string, any>;
}

/**
 * Rate limiting configuration
 * Max 100 requests per minute per IP
 */
const RATE_LIMIT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
};

/**
 * Track A/B test conversions (POST /api/ab/track)
 * Records when a user completes a conversion or tracked event in an experiment
 *
 * Rate limited to prevent abuse
 *
 * Request body:
 * {
 *   experimentId: string,
 *   variant: string,
 *   event: string,
 *   metadata?: { ... }
 * }
 */
export async function POST(request: NextRequest) {
  // Rate limiting check
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitKey = `ab-track:${ip}`;

  const rateLimitResult = rateLimit(rateLimitKey, RATE_LIMIT_CONFIG);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const body: TrackConversionRequest = await request.json();

    // Validate required fields
    const { experimentId, variant, event } = body;

    if (!experimentId || !variant || !event) {
      return NextResponse.json(
        { error: 'Missing required fields: experimentId, variant, event' },
        { status: 400 }
      );
    }

    // Validate experiment ID format (alphanumeric + underscore)
    if (!/^[a-z0-9_]+$/.test(experimentId)) {
      return NextResponse.json(
        { error: 'Invalid experimentId format' },
        { status: 400 }
      );
    }

    // Log the conversion event
    const conversionData = {
      timestamp: new Date().toISOString(),
      experimentId,
      variant,
      event,
      metadata: body.metadata || {},
      userAgent: request.headers.get('user-agent'),
      ip,
    };


    // Store in analytics_events table (fire-and-forget)
    try {
      const { getSupabaseAdmin } = await import('../../../../lib/supabase');
      const supabase = getSupabaseAdmin();
      await supabase.from('analytics_events').insert({
        event: `ab_${event}`,
        session_id: experimentId,
        properties: { variant, metadata: body.metadata || {} },
        ip,
        created_at: conversionData.timestamp,
      });
    } catch (dbErr) {
      console.warn('[api/ab/track] DB insert failed:', dbErr instanceof Error ? dbErr.message : dbErr);
    }
    return NextResponse.json(
      {
        success: true,
        message: 'Conversion tracked',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api/ab/track] Error:', error instanceof Error ? error.message : error);
    // Don't leak error details to client
    return NextResponse.json(
      { error: 'Failed to track conversion' },
      { status: 500 }
    );
  }
}
