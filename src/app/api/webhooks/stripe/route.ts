import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subResponse = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        // Stripe v22+: retrieve() returns the subscription object directly
        const sub = subResponse as unknown as Stripe.Subscription;
        const accountId = session.client_reference_id;

        if (!accountId) {
          throw new Error('No account_id found in client_reference_id');
        }

        const periodEnd = (sub as any).current_period_end;
        const periodStart = (sub as any).current_period_start;

        await supabaseAdmin.from('account_subscriptions').upsert({
          account_id: accountId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: sub.id,
          status: sub.status,
          price_id: sub.items.data[0].price.id,
          current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
          current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
        });
        break;
      }
      
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any;
        
        await supabaseAdmin
          .from('account_subscriptions')
          .update({
            status: sub.status,
            price_id: sub.items.data[0].price.id,
            current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null,
            current_period_start: sub.current_period_start ? new Date(sub.current_period_start * 1000).toISOString() : null,
            cancel_at_period_end: sub.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', sub.id);
        break;
      }
    }
  } catch (error: any) {
    console.error('Webhook processing failed:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }

  return new NextResponse('OK', { status: 200 });
}
