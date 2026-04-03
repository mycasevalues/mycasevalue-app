import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * In-memory store for subscriptions
 * In production, this should be replaced with a database (e.g., Supabase)
 */
const subscriptions = new Map<string, any>();

interface PushSubscriptionJSON {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

/**
 * POST /api/push/subscribe
 * Accept and store push subscriptions
 * Rate limited to 10 requests per minute per IP
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 10 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const subscription: PushSubscriptionJSON = await req.json();

    // Validate subscription structure
    if (!subscription.endpoint || !subscription.keys?.auth || !subscription.keys?.p256dh) {
      return NextResponse.json(
        { error: 'Invalid subscription format' },
        { status: 400 }
      );
    }

    // Store subscription in-memory
    // In production, store in Supabase or other database
    subscriptions.set(subscription.endpoint, subscription);

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription stored',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[Push API] Failed to store subscription:', err?.message || err);
    return NextResponse.json(
      { error: 'Failed to store subscription' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/push/subscribe
 * Remove a push subscription
 * Rate limited
 */
export async function DELETE(req: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 10 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const subscription: PushSubscriptionJSON = await req.json();

    if (!subscription.endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint in subscription' },
        { status: 400 }
      );
    }

    const wasRemoved = subscriptions.delete(subscription.endpoint);

    if (!wasRemoved) {
      return NextResponse.json(
        { success: false, message: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription removed',
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[Push API] Failed to remove subscription:', err?.message || err);
    return NextResponse.json(
      { error: 'Failed to remove subscription' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/push/subscribe (internal utility)
 * Returns all stored subscriptions (for testing/debugging only)
 * Should be protected in production
 */
export async function GET(req: NextRequest) {
  // Only allow in development or with valid API key
  if (process.env.NODE_ENV === 'production') {
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== process.env.PUSH_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    count: subscriptions.size,
    subscriptions: Array.from(subscriptions.values()),
  });
}
