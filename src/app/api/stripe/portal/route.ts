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
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('owner_user_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Check for existing stripe customer ID
    const { data: subscription } = await supabase
      .from('account_subscriptions')
      .select('stripe_customer_id')
      .eq('account_id', account.id)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 });
    }

    const headerList = headers();
    const origin = headerList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/settings`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err: any) {
    console.error('Error in Stripe Portal:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
