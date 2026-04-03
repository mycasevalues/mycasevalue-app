import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { grantPremiumAccess, revokePremiumAccess } from '../../../../lib/premium';
import { sendPaymentConfirmation, sendWelcomeEmail } from '../../../../lib/email';

export const dynamic = 'force-dynamic';

// Single Report: 90-day access window
const SINGLE_REPORT_EXPIRY_MS = 90 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // Rate limiting: 100 requests per minute per IP (webhooks can have traffic spikes)
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 100 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secretKey || !webhookSecret) {
      return NextResponse.json({ error: 'Not configured' }, { status: 503 });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' as any });

    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const email = session.customer_email || session.customer_details?.email;
        const plan = session.metadata?.plan || 'single';
        const customerId = session.customer;

        console.error(`[Stripe] Checkout completed: ${plan} for ${email}`);

        if (email) {
          // Grant premium access
          // single = 90-day access window, unlimited & attorney = null (subscription-managed)
          const expiresAt =
            plan === 'single' || plan === 'single_report'
              ? Date.now() + SINGLE_REPORT_EXPIRY_MS
              : null;

          await grantPremiumAccess({
            email,
            plan: plan as 'single' | 'unlimited' | 'attorney',
            grantedAt: Date.now(),
            expiresAt,
            stripeCustomerId: customerId,
          });

          // Send confirmation emails asynchronously (fire and forget)
          const amount = session.amount_total || 0;
          Promise.all([
            sendPaymentConfirmation(email, plan, amount, 'en'),
            sendPaymentConfirmation(email, plan, amount, 'es'),
            sendWelcomeEmail(email, plan, 'en'),
            sendWelcomeEmail(email, plan, 'es'),
          ]).catch(err => {
            console.error('[Stripe Webhook] Email send error:', err?.message || err);
          });
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;
        const metadata = subscription.metadata || {};

        console.error(`[Stripe] Subscription created: ${customerId}`);

        // We need to get the customer email from Stripe
        try {
          const customer = await stripe.customers.retrieve(customerId);
          const email = (customer as any).email;

          if (email) {
            await grantPremiumAccess({
              email,
              plan: 'attorney',
              grantedAt: Date.now(),
              expiresAt: null, // Subscription-managed — revoked on subscription.deleted
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscription.id,
            });

            console.error(`[Stripe] Attorney tier activated for ${email}`);
          }
        } catch (err: any) {
          console.error('[Stripe] Failed to get customer for subscription:', err?.message);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;

        console.error(`[Stripe] Subscription deleted: ${customerId}`);

        // We need to get the customer email from Stripe
        try {
          const customer = await stripe.customers.retrieve(customerId);
          const email = (customer as any).email;

          if (email) {
            await revokePremiumAccess(email);
            console.error(`[Stripe] Attorney tier revoked for ${email}`);
          }
        } catch (err: any) {
          console.error('[Stripe] Failed to get customer for subscription deletion:', err?.message);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        const customerId = invoice.customer;

        console.error(`[Stripe] Payment failed for customer: ${customerId}`);

        // Try to get customer email and log the failure
        try {
          const customer = await stripe.customers.retrieve(customerId);
          const email = (customer as any).email;

          if (email) {
            console.warn(
              `[Stripe] Payment failed for ${email}: ${invoice.reason_code || 'unknown reason'}`
            );
            // In production, could trigger a payment failure email here
          }
        } catch (err: any) {
          console.error('[Stripe] Failed to get customer for payment failure:', err?.message);
        }
        break;
      }

      default:
        console.error(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Stripe Webhook Error]', err?.message || err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}
