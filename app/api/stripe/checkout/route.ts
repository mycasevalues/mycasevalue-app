import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

const PRICES: Record<string, { amount: number; name: string; description: string; recurring?: boolean }> = {
  single: {
    amount: 599,
    name: 'MyCaseValue — Single Report',
    description: 'One premium report — recovery ranges, attorney impact, case timeline, and detailed analysis.',
    recurring: false,
  },
  unlimited: {
    amount: 999,
    name: 'MyCaseValue — Unlimited Reports',
    description: 'Unlimited one-time access — recovery ranges, judge analytics, state comparisons, and more.',
    recurring: false,
  },
  attorney: {
    amount: 2999,
    name: 'MyCaseValue — Attorney Mode',
    description: 'Unlimited monthly access — recovery ranges, judge analytics, state comparisons, and more.',
    recurring: true,
  },
};

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 20 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

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
    const isRecurring = price.recurring === true;

    // Enable Apple Pay, Google Pay, PayPal, and cards
    // Apple Pay & Google Pay are automatically available via the 'card' method
    // when the customer's device supports them (Stripe handles this natively).
    // PayPal is added as an explicit payment method.
    const paymentMethodTypes: string[] = ['card', 'paypal'];

    const sessionParams: any = {
      mode: isRecurring ? 'subscription' : 'payment',
      payment_method_types: paymentMethodTypes,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: price.name,
              description: price.description,
            },
            unit_amount: price.amount,
            ...(isRecurring && { recurring: { interval: 'month' } }),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/payment-success?plan=${plan}`,
      cancel_url: `${origin}/pricing`,
      metadata: { plan },
    };

    if (email && email.includes('@')) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe Checkout Error]', err?.message || err);

    // If PayPal isn't enabled on the account, fall back to card-only
    if (err?.message?.includes('paypal') || err?.code === 'payment_method_not_available') {
      try {
        const secretKey = process.env.STRIPE_SECRET_KEY!;
        const Stripe = (await import('stripe')).default;
        const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as any });

        const body = await req.clone().json().catch(() => ({}));
        const { plan = 'single', email: em } = body as any;
        const price = PRICES[plan] || PRICES.single;
        const origin = req.headers.get('origin') || 'https://www.mycasevalues.com';
        const isRecurring = price.recurring === true;

        const fallbackParams: any = {
          mode: isRecurring ? 'subscription' : 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: { name: price.name, description: price.description },
                unit_amount: price.amount,
                ...(isRecurring && { recurring: { interval: 'month' } }),
              },
              quantity: 1,
            },
          ],
          success_url: `${origin}/payment-success?plan=${plan}`,
          cancel_url: `${origin}/pricing`,
          metadata: { plan },
        };

        if (em && em.includes('@')) fallbackParams.customer_email = em;

        const session = await stripe.checkout.sessions.create(fallbackParams);
        return NextResponse.json({ url: session.url });
      } catch {
        // ignore fallback error
      }
    }

    return NextResponse.json(
      { error: 'Unable to create checkout session. Please try again.' },
      { status: 500 }
    );
  }
}
