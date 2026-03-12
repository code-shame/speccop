import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

// Keep stripe as a getter for backward compat
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
    checksPerMonth: 10,
    features: [
      "10 compliance checks/month",
      "GitHub integration",
      "Linear integration",
      "PR comments",
    ],
  },
  PRO: {
    name: "Pro",
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    checksPerMonth: Infinity,
    features: [
      "Unlimited compliance checks",
      "GitHub integration",
      "Linear + Jira integration",
      "PR comments",
      "Email notifications",
    ],
  },
  TEAM: {
    name: "Team",
    price: 59,
    priceId: process.env.STRIPE_TEAM_PRICE_ID ?? "",
    checksPerMonth: Infinity,
    features: [
      "Everything in Pro",
      "Merge blocking",
      "Full check history",
      "Team leaderboard",
      "Custom score threshold",
      "Priority support",
    ],
  },
} as const;

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  plan: "PRO" | "TEAM",
  returnUrl: string
): Promise<string> {
  const priceId = PLANS[plan].priceId;
  if (!priceId) throw new Error(`No Stripe price ID configured for ${plan}`);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: userEmail,
    metadata: { userId, plan },
    success_url: `${returnUrl}?upgraded=true`,
    cancel_url: `${returnUrl}?cancelled=true`,
  });

  return session.url!;
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}
