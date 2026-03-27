import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
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
