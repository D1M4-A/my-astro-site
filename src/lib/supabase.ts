import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Returns an admin Supabase client using the SERVICE_ROLE key.
 * Returns null when env is not configured. Use this on server-side for migrations and trusted operations.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Returns an anon/readonly Supabase client using the ANON key.
 * Use this where you want to call public Supabase endpoints.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
