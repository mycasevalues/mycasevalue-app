import { createServerClient } from '@supabase/ssr';

export async function checkFreeRateLimit(identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  // DEV MODE: All features unlocked — Stripe integration pending
  return { allowed: true, remaining: 999 };
}
