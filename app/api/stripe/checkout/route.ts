import { NextRequest, NextResponse } from 'next/server';

const PRICES: Record<string, { amount: number; name: string }> = {
  single: { amount: 599, name: 'MyCaseValue — Single Report' },
  unlimited: { amount: 999, name: 'MyCaseValue — Unlimited Access' },
};

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Payment system is being configured. Please try again later.' },
        { status: 503 }
      );
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as any });

    const body = await req.json();
    const { plan, email } = body;

    if (!plan || !PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
    }

    const price = PRICES[plan];
    const origin = req.headers.get('origin') || 'https://www.mycasevalues.com';

    const sessionParams: any = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: price.name,
              description: plan === 'unlimited'
                ? 'Unlimited premium reports — recovery ranges, judge analytics, state comparisons, and more.'
                : 'One premium report — recovery ranges, attorney impact, case timeline, and detailed analysis.',
            },
            unit_amount: price.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${origin}?canceled=true`,
      metadata: { plan },
    };

    if (email && email.includes('@')) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Error]', err?.message || err);
    return NextResponse.json(
      { error: 'Unable to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
