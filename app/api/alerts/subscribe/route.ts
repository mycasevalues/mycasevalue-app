import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface AlertSubscription {
  email: string;
  caseType: string;
  nosCode?: string;
  threshold: 'any_change' | '5_percent' | '10_percent';
  subscribedAt: string;
}

// In-memory storage (for demo purposes)
// In production, this would be stored in a database
const subscriptions: AlertSubscription[] = [];

/**
 * POST /api/alerts/subscribe
 * Subscribe to data change alerts for a case type
 *
 * Request body:
 * {
 *   email: string (required)
 *   caseType: string (required)
 *   nosCode?: string
 *   threshold: 'any_change' | '5_percent' | '10_percent'
 * }
 *
 * Returns:
 * { success: true, subscriptionId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { email, caseType, nosCode, threshold } = body;

    if (!email || !caseType) {
      return NextResponse.json(
        { error: 'Email and caseType are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate threshold
    const validThresholds = ['any_change', '5_percent', '10_percent'];
    if (threshold && !validThresholds.includes(threshold)) {
      return NextResponse.json(
        { error: 'Invalid threshold value' },
        { status: 400 }
      );
    }

    // Check if subscription already exists
    const existingSubscription = subscriptions.find(
      (sub) => sub.email === email && sub.caseType === caseType
    );

    if (existingSubscription) {
      // Update existing subscription
      existingSubscription.threshold = threshold || 'any_change';
      existingSubscription.subscribedAt = new Date().toISOString();
    } else {
      // Create new subscription
      const subscription: AlertSubscription = {
        email,
        caseType,
        nosCode,
        threshold: threshold || 'any_change',
        subscribedAt: new Date().toISOString(),
      };

      subscriptions.push(subscription);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully subscribed to alerts for ${caseType}`,
        email,
        caseType,
        threshold: threshold || 'any_change',
      },
      { status: 200 }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[ALERT_SUBSCRIPTION_ERROR]', errMsg);

    return NextResponse.json(
      {
        error: 'Failed to subscribe to alerts',
        details: errMsg,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/alerts/subscribe
 * List all subscriptions (admin use only)
 */
export async function GET(request: NextRequest) {
  // In production, verify API key or authentication
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    totalSubscriptions: subscriptions.length,
    subscriptions: subscriptions.map((sub) => ({
      email: sub.email,
      caseType: sub.caseType,
      threshold: sub.threshold,
      subscribedAt: sub.subscribedAt,
    })),
  });
}
