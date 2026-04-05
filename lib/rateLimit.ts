/**
 * MyCaseValue — Free-tier rate limiting
 * Checks daily lookup limits for free users using Supabase.
 * Falls back to in-memory tracking if DB is unavailable.
 */

import { getSupabaseAdmin } from './supabase';

const FREE_DAILY_LIMIT = 3;

// In-memory fallback counter (per-process; resets on deploy)
const memoryCounters = new Map<string, { count: number; resetAt: number }>();

/**
 * Check if a free-tier user has remaining daily lookups.
 * Returns { allowed, remaining } based on their daily usage.
 */
export async function checkFreeRateLimit(
  identifier: string
): Promise<{ allowed: boolean; remaining: number }> {
  if (!identifier) {
    return { allowed: true, remaining: FREE_DAILY_LIMIT };
  }

  const key = identifier.toLowerCase().trim();
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  try {
    const supabase = getSupabaseAdmin();

    // Count today's lookups for this user
    const { count, error } = await supabase
      .from('report_logs')
      .select('*', { count: 'exact', head: true })
      .eq('email', key)
      .gte('created_at', todayStart.toISOString());

    if (error) {
      console.warn('[rateLimit] DB query failed, using memory fallback:', error.message);
      return checkMemoryFallback(key, now);
    }

    const used = count ?? 0;
    const remaining = Math.max(0, FREE_DAILY_LIMIT - used);
    return { allowed: remaining > 0, remaining };
  } catch (err) {
    console.warn('[rateLimit] Supabase unavailable, using memory fallback');
    return checkMemoryFallback(key, now);
  }
}

function checkMemoryFallback(
  key: string,
  now: number
): { allowed: boolean; remaining: number } {
  const entry = memoryCounters.get(key);
  const dayMs = 24 * 60 * 60 * 1000;

  if (!entry || now > entry.resetAt) {
    memoryCounters.set(key, { count: 1, resetAt: now + dayMs });
    return { allowed: true, remaining: FREE_DAILY_LIMIT - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, FREE_DAILY_LIMIT - entry.count);
  return { allowed: remaining >= 0, remaining };
}

// Cleanup stale memory entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    memoryCounters.forEach((entry, key) => {
      if (now > entry.resetAt) memoryCounters.delete(key);
    });
  }, 10 * 60 * 1000);
}
