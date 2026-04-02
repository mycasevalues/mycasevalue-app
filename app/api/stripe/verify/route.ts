import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Apply rate limiting: 20 req/min
  const clientIp = getClientIp(req.headers);
  const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 20 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const sessionId = req.nextUrl.searchParams.get('session_id');
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    if (!secretKey) {
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 503 });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as any });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      paid: session.payment_status === 'paid',
      plan: session.metadata?.plan || 'single',
      email: session.customer_email || session.customer_details?.email,
    });
  } catch (err: any) {
    console.error('[Stripe Verify Error]', err?.message || err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
