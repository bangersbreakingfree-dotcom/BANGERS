import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { BillingCycle, getStripePriceId, Tier } from '@/lib/plans';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tier = body.tier as Tier;
    const billing = body.billing as BillingCycle;
    const email = typeof body.email === 'string' && body.email.length > 0 ? body.email : undefined;

    const { plan, priceId } = getStripePriceId(tier, billing);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      customer_email: email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 999,
              currency: 'usd'
            },
            display_name: 'US Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3
              },
              maximum: {
                unit: 'business_day',
                value: 7
              }
            }
          }
        }
      ],
      automatic_tax: {
        enabled: true
      },
      allow_promotion_codes: true,
      submit_type: 'subscribe',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#membership`,
      metadata: {
        brand: 'BANGERS',
        tier: plan.tier,
        membershipName: plan.name,
        printSize: plan.size,
        billingCycle: plan.billing,
        shipping: 'US only - $9.99'
      },
      subscription_data: {
        metadata: {
          brand: 'BANGERS',
          tier: plan.tier,
          membershipName: plan.name,
          printSize: plan.size,
          billingCycle: plan.billing,
          shipping: 'US only - $9.99'
        },
        description: `${plan.name} BANGERS Membership`
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create checkout session';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
