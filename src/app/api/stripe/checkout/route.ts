import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Determine the account/tenant for this user
    // Assuming single account per user as per 017_account_sharing.sql
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('owner_user_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;
    
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe Price ID not configured' }, { status: 500 });
    }

    const headerList = await headers();
    const origin = headerList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Check if they already have a stripe customer ID in account_subscriptions
    const { data: subscription } = await supabase
      .from('account_subscriptions')
      .select('stripe_customer_id')
      .eq('account_id', account.id)
      .maybeSingle();

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: subscription?.stripe_customer_id || undefined,
      client_reference_id: account.id, // We use this in the webhook to map back to the account
      customer_email: subscription?.stripe_customer_id ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/settings?checkout=success`,
      cancel_url: `${origin}/settings?checkout=canceled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error('Error in Stripe Checkout:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
