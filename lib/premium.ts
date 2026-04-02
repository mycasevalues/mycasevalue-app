/**
 * Premium access management
 * Handles grant, revoke, and check operations for premium plans
 * Uses in-memory storage (production would use a database)
 */

export type PremiumPlan = 'single' | 'unlimited' | 'attorney';

export interface PremiumSession {
  email: string;
  plan: PremiumPlan;
  grantedAt: number;
  expiresAt: number | null; // null for one-time purchases, timestamp for subscriptions
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

/**
 * In-memory store for premium access
 * Key: email address (lowercase)
 * Value: PremiumSession
 */
export const premiumStore = new Map<string, PremiumSession>();

/**
 * Grant premium access to a user
 * @param session Premium session details
 */
export function grantPremiumAccess(session: PremiumSession): void {
  const email = session.email.toLowerCase();
  premiumStore.set(email, {
    ...session,
    email: session.email.toLowerCase(),
    grantedAt: session.grantedAt || Date.now(),
  });
  console.log(
    `[Premium] Access granted: ${email} | Plan: ${session.plan} | Expires: ${
      session.expiresAt ? new Date(session.expiresAt).toISOString() : 'never'
    }`
  );
}

/**
 * Check premium access for a user
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
    console.log(`[Premium] Access expired: ${normalizedEmail}`);
    premiumStore.delete(normalizedEmail);
    return null;
  }

  return session;
}

/**
 * Revoke premium access for a user
 * @param email User email address
 */
export function revokePremiumAccess(email: string): void {
  const normalizedEmail = email.toLowerCase();
  const existed = premiumStore.has(normalizedEmail);
  premiumStore.delete(normalizedEmail);
  if (existed) {
    console.log(`[Premium] Access revoked: ${normalizedEmail}`);
  }
}

/**
 * Get all active premium sessions (for debugging/admin purposes)
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
 */
export function cleanupExpiredSessions(): number {
  const now = Date.now();
  const toDelete: string[] = [];

  premiumStore.forEach((session, email) => {
    if (session.expiresAt && now > session.expiresAt) {
      toDelete.push(email);
    }
  });

  toDelete.forEach(email => premiumStore.delete(email));

  if (toDelete.length > 0) {
    console.log(`[Premium] Cleaned up ${toDelete.length} expired sessions`);
  }

  return toDelete.length;
}
