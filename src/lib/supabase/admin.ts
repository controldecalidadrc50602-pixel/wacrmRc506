import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — only instantiated at runtime, not at build time.
// This prevents Vercel's "Collecting page data" step from crashing
// when SUPABASE_SERVICE_ROLE_KEY is not in the build environment.
let _admin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('Supabase admin env vars are not set');
    }
    _admin = createClient(url, key);
  }
  return _admin;
}

// Proxy so existing `supabaseAdmin.from(...)` calls keep working
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabaseAdmin(), prop, receiver);
  },
});
