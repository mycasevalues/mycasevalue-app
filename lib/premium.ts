/**
 * Premium access management with Supabase persistence
 * Handles grant, revoke, and check operations for premium plans
 * Uses in-memory cache layer for fast reads + Supabase for persistence
 */

import { getSupabaseAdmin } from './supabase';

export type PremiumPlan = 'single' | 'unlimited' | 'attorney';

export interface PremiumSession {
  email: string;
  plan: PremiumPlan;
  grantedAt: number;
  expiresAt: number | null; // null for one-time purchases, timestamp for subscriptions
}

/**
 * In-memory cache for premium access (fast reads)
 * Key: email address (lowercase)
 * Value: PremiumSession
 */
export const premiumStore = new Map<string, PremiumSession>();

/**
 * Check if Supabase is available (wrapped in try/catch for all ops)
 */
function isSupabaseAvailable(): boolean {
  try {
    getSupabaseAdmin();
    return true;
  } catch {
    return false;
  }
}

/**
 * Sync premium session from database into cache
 * Called on cold cache miss to check DB before returning null
 * @param email User email address
 * @returns Premium session if found and active, null otherwise
 */
export async function syncPremiumFromDB(email: string): Promise<PremiumSession | null> {
  const normalizedEmail = email.toLowerCase();

  // Skip if already in cache
  if (premiumStore.has(normalizedEmail)) {
    const session = premiumStore.get(normalizedEmail)!;
    // Check expiration
    if (session.expiresAt && Date.now() > session.expiresAt) {
      premiumStore.delete(normalizedEmail);
      return null;
    }
    return session;
  }

  // Try to fetch from Supabase
  if (!isSupabaseAvailable()) {
    return null;
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('premium_sessions')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    if (error) {
      // No row found is not an error, just return null
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    if (!data) {
      return null;
    }

    // Check if expired
    if (data.expires_at && Date.now() > data.expires_at) {
      return null;
    }

    // Hydrate cache and return
    const session: PremiumSession = {
      email: data.email,
      plan: data.plan,
      grantedAt: data.granted_at,
      expiresAt: data.expires_at,
    };

    premiumStore.set(normalizedEmail, session);
    return session;
  } catch (err: any) {
    console.warn('[premium] syncPremiumFromDB failed:', err.message || err);
    return null;
  }
}

/**
 * Grant premium access to a user
 * Writes to both cache and Supabase
 * @param session Premium session details
 */
export async function grantPremiumAccess(session: PremiumSession): Promise<void> {
  const email = session.email.toLowerCase();
  const normalizedSession: PremiumSession = {
    ...session,
    email,
    grantedAt: session.grantedAt || Date.now(),
  };

  // Update cache immediately for fast reads
  premiumStore.set(email, normalizedSession);

  // Write to Supabase if available
  if (isSupabaseAvailable()) {
    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from('premium_sessions')
        .upsert(
          {
            email,
            plan: normalizedSession.plan,
            granted_at: normalizedSession.grantedAt,
            expires_at: normalizedSession.expiresAt,
          },
          { onConflict: 'email' }
        )
        .throwOnError();
    } catch (err: any) {
      console.error('[premium] grantPremiumAccess DB write failed:', err.message || err);
    }
  }
}

/**
 * Check premium access for a user
 * Checks cache first, returns null if not found
 * Note: Call syncPremiumFromDB before checking if you want DB fallback
 * @param email User email address
 * @returns Premium session if active, null if not found or expired
 */
export function checkPremiumAccess(email: string): PremiumSession | null {
  const normalizedEmail = email.toLowerCase();
  const session = premiumStore.get(normalizedEmail);

  if (!session) {
    return null;
  }

  // Check if subscription has expired
  if (session.expiresAt && Date.now() > session.expiresAt) {
    premiumStore.delete(normalizedEmail);
    return null;
  }

  return session;
}

/**
 * Revoke premium access for a user
 * Removes from cache and Supabase
 * @param email User email address
 */
export async function revokePremiumAccess(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase();

  // Remove from cache
  const existed = premiumStore.has(normalizedEmail);
  premiumStore.delete(normalizedEmail);

  // Remove from Supabase if available
  if (isSupabaseAvailable()) {
    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from('premium_sessions')
        .delete()
        .eq('email', normalizedEmail)
        .throwOnError();
    } catch (err: any) {
      console.error('[premium] revokePremiumAccess DB delete failed:', err.message || err);
    }
  }
}

/**
 * Get all active premium sessions (for debugging/admin purposes)
 * Returns only cache data (does not query DB)
 */
export function getAllPremiumSessions(): PremiumSession[] {
  const now = Date.now();
  const active: PremiumSession[] = [];

  premiumStore.forEach((session, email) => {
    if (!session.expiresAt || now <= session.expiresAt) {
      active.push(session);
    }
  });

  return active;
}

/**
 * Clean up expired sessions (can be called periodically)
 * Removes from cache and optionally from Supabase
 */
export async function cleanupExpiredSessions(): Promise<number> {
  const now = Date.now();
  const toDelete: string[] = [];

  premiumStore.forEach((session, email) => {
    if (session.expiresAt && now > session.expiresAt) {
      toDelete.push(email);
    }
  });

  toDelete.forEach(email => premiumStore.delete(email));

  // Also clean up in Supabase if available
  if (isSupabaseAvailable() && toDelete.length > 0) {
    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from('premium_sessions')
        .delete()
        .lte('expires_at', now)
        .not('expires_at', 'is', null)
        .throwOnError();
    } catch (err: any) {
      console.error('[premium] cleanupExpiredSessions DB delete failed:', err.message || err);
    }
  }

  return toDelete.length;
}
