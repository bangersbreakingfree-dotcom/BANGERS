import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerId = body.customerId;

    if (!customerId || typeof customerId !== 'string') {
      return NextResponse.json(
        { error: 'Missing Stripe customer ID.' },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl}/account`
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to open customer portal';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
