export type Tier = 'explorer' | 'adventurer' | 'collector';
export type BillingCycle = 'quarterly' | 'annual';

export type Plan = {
  tier: Tier;
  name: string;
  size: string;
  billing: BillingCycle;
  amount: string;
  amountCents: number;
  cadence: string;
  description: string;
  priceEnv: string;
};

export const planGroups = [
  {
    tier: 'explorer' as Tier,
    name: 'Explorer Edition',
    size: '8x10',
    quarterly: '$49',
    annual: '$176',
    description: 'The easiest way to start collecting exclusive BANGERS prints.'
  },
  {
    tier: 'adventurer' as Tier,
    name: 'Adventurer Edition',
    size: '14x18',
    quarterly: '$69',
    annual: '$248',
    description: 'The balanced premium size for collectors who want a real statement piece.'
  },
  {
    tier: 'collector' as Tier,
    name: 'Collector Edition',
    size: '20x24',
    quarterly: '$89',
    annual: '$320',
    description: 'The largest launch tier for a true wall-art collector experience.'
  }
];

export const plans: Plan[] = [
  {
    tier: 'explorer',
    name: 'Explorer Edition',
    size: '8x10',
    billing: 'quarterly',
    amount: '$49',
    amountCents: 4900,
    cadence: 'every 3 months',
    description: 'The easiest way to start collecting exclusive BANGERS prints.',
    priceEnv: 'STRIPE_PRICE_EXPLORER_QUARTERLY'
  },
  {
    tier: 'explorer',
    name: 'Explorer Edition',
    size: '8x10',
    billing: 'annual',
    amount: '$176',
    amountCents: 17600,
    cadence: 'per year',
    description: 'Annual Explorer membership with a launch discount.',
    priceEnv: 'STRIPE_PRICE_EXPLORER_ANNUAL'
  },
  {
    tier: 'adventurer',
    name: 'Adventurer Edition',
    size: '14x18',
    billing: 'quarterly',
    amount: '$69',
    amountCents: 6900,
    cadence: 'every 3 months',
    description: 'The balanced premium size for collectors who want a real statement piece.',
    priceEnv: 'STRIPE_PRICE_ADVENTURER_QUARTERLY'
  },
  {
    tier: 'adventurer',
    name: 'Adventurer Edition',
    size: '14x18',
    billing: 'annual',
    amount: '$248',
    amountCents: 24800,
    cadence: 'per year',
    description: 'Annual Adventurer membership with a launch discount.',
    priceEnv: 'STRIPE_PRICE_ADVENTURER_ANNUAL'
  },
  {
    tier: 'collector',
    name: 'Collector Edition',
    size: '20x24',
    billing: 'quarterly',
    amount: '$89',
    amountCents: 8900,
    cadence: 'every 3 months',
    description: 'The largest launch tier for a true wall-art collector experience.',
    priceEnv: 'STRIPE_PRICE_COLLECTOR_QUARTERLY'
  },
  {
    tier: 'collector',
    name: 'Collector Edition',
    size: '20x24',
    billing: 'annual',
    amount: '$320',
    amountCents: 32000,
    cadence: 'per year',
    description: 'Annual Collector membership with a launch discount.',
    priceEnv: 'STRIPE_PRICE_COLLECTOR_ANNUAL'
  }
];

export function getStripePriceId(tier: Tier, billing: BillingCycle) {
  const plan = plans.find((item) => item.tier === tier && item.billing === billing);

  if (!plan) {
    throw new Error('Invalid membership option');
  }

  const priceId = process.env[plan.priceEnv];

  if (!priceId || priceId.includes('replace_me')) {
    throw new Error(`Missing Stripe Price ID for ${plan.name} ${plan.billing}. Set ${plan.priceEnv}.`);
  }

  return { plan, priceId };
}
