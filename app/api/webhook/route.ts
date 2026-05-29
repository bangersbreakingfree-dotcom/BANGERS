import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid webhook signature';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // TODO:
      // Store member in database:
      // - Stripe customer ID
      // - Stripe subscription ID
      // - email
      // - tier
      // - print size
      // - billing cycle
      // - shipping address
      // - subscription status
      // - next fulfillment quarter
      console.log('Checkout completed:', {
        customer: session.customer,
        subscription: session.subscription,
        email: session.customer_details?.email,
        metadata: session.metadata,
        shipping: session.shipping_details
      });

      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed':
      console.log('Stripe event received:', event.type);
      break;

    default:
      console.log('Unhandled event:', event.type);
  }

  return NextResponse.json({ received: true });
}
