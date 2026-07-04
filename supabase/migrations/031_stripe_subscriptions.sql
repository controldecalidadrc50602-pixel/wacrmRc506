-- ============================================================
-- 031_stripe_subscriptions.sql — Subscriptions schema
--
-- Maps Stripe Subscriptions to Supabase Accounts
-- ============================================================

CREATE TYPE subscription_status AS ENUM (
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

CREATE TABLE IF NOT EXISTS account_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status subscription_status NOT NULL DEFAULT 'incomplete',
  price_id TEXT,
  quantity INTEGER DEFAULT 1,
  cancel_at_period_end BOOLEAN DEFAULT false,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_account_subscriptions_account_id
  ON account_subscriptions(account_id);

ALTER TABLE account_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own account's subscription
CREATE POLICY "Users can read their account subscriptions"
  ON account_subscriptions FOR SELECT
  USING (is_account_member(account_id, 'viewer'));

-- Only service role can modify subscriptions
CREATE POLICY "Service role manages subscriptions"
  ON account_subscriptions FOR ALL
  USING (false);

DROP TRIGGER IF EXISTS set_updated_at ON account_subscriptions;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON account_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
