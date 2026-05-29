# BANGERS Subscription Site

A production-ready starter for BANGERS: a premium fine art photography subscription site using Next.js, Tailwind, and Stripe Checkout subscriptions.

## Launch model in this version

- Explorer Edition: 8x10 print — $49 quarterly
- Adventurer Edition: 14x18 print — $69 quarterly
- Collector Edition: 20x24 print — $89 quarterly
- Annual billing is discounted
- US shipping only
- $9.99 fixed shipping per checkout
- No fixed edition limits at launch

## Setup locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Stripe setup

In Stripe, create one Product called:

```text
BANGERS Collector Membership
```

Then create 6 recurring Prices:

```text
Explorer Edition Quarterly: $49 every 3 months
Adventurer Edition Quarterly: $69 every 3 months
Collector Edition Quarterly: $89 every 3 months

Explorer Edition Annual: recommended $176 every year
Adventurer Edition Annual: recommended $248 every year
Collector Edition Annual: recommended $320 every year
```

Those annual prices are roughly 10% off paying quarterly for four shipments.

Copy each Stripe Price ID into `.env.local`.

## Stripe shipping

This app adds a fixed $9.99 US shipping option directly inside the Checkout Session.

## Deploy to Vercel

1. Push this folder to GitHub.
2. In Vercel, import the GitHub repo.
3. Add the environment variables from `.env.example`.
4. Deploy.

Vercel automatically detects Next.js projects and builds them.

## Webhook events to listen for

Start with:

```text
checkout.session.completed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
```

## Important next production step

To fully manage members, add a database such as Supabase and store:

- Stripe customer ID
- Stripe subscription ID
- Email
- Tier
- Print size
- Billing cycle
- Shipping address
- Subscription status
- Next fulfillment quarter
