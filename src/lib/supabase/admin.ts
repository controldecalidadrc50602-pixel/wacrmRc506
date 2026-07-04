import { createClient } from '@supabase/supabase-js';

// Admin client for webhooks and background tasks that need to bypass RLS.
// NEVER use this client on the client-side or for user-facing requests.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
