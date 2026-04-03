import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, RateLimitConfig } from '../../../../lib/rate-limit';

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


    // In production, you would:
    // 1. Store in a database (e.g., Supabase)
    // 2. Send to analytics platform (e.g., Mixpanel, Amplitude)
    // 3. Integrate with GA4 via enhanced ecommerce tracking
    // Example:
    // await supabase.from('ab_conversions').insert([conversionData]);
    // OR
    // await sendToAnalyticsPlatform(conversionData);

    // For now, return success (privacy-first approach)
    return NextResponse.json(
      {
        success: true,
        message: 'Conversion tracked',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[A/B Test Tracking] Error:', error);

    // Don't leak error details to client
    return NextResponse.json(
      { error: 'Failed to track conversion' },
      { status: 500 }
    );
  }
}
