import Stripe from 'stripe';

// Lazy singleton — Stripe is only instantiated when first called at runtime,
// NOT at build/import time. This prevents the build from crashing when
// STRIPE_SECRET_KEY is not available in the Vercel build environment.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(key, {
      apiVersion: '2026-06-24.dahlia',
      appInfo: {
        name: 'VCRo Hub',
        version: '1.0.0',
      },
    });
  }
  return _stripe;
}

// Keep a named export for backward compat, but as a getter-based proxy
// so existing `stripe.xyz` calls still work without refactoring every file.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  },
});
