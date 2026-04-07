/**
 * Referral system for MyCaseValue
 * Handles referral code generation, tracking, and rewards
 */

import { getSupabaseAdmin, getSupabase } from './supabase';

/**
 * Supabase schema required:
 *
 * ALTER TABLE auth.users ADD COLUMN referral_code VARCHAR(8) UNIQUE;
 *
 * CREATE TABLE referrals (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   referrer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   activated_at TIMESTAMPTZ,
 *   unique_user_creation BOOLEAN DEFAULT false
 * );
 *
 * CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
 * CREATE INDEX idx_referrals_referred ON referrals(referred_user_id);
 * CREATE INDEX idx_users_referral_code ON auth.users(referral_code);
 */

/**
 * Generate a random alphanumeric referral code (8 characters)
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a unique referral code for a user and store in Supabase
 * Returns the code if successful, null if user already has one or error occurs
 */
export async function createReferralCode(userId: string): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin();

    // Check if user already has a referral code
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', userId)
      .single();

    if (checkError) {
      console.error('Error checking existing referral code:', checkError);
      return null;
    }

    if (existingUser?.referral_code) {
      return existingUser.referral_code;
    }

    // Generate a unique code
    let code: string;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      code = generateReferralCode();
      const { data: existingCode } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', code)
        .single();

      isUnique = !existingCode;
      attempts++;
    }

    if (!isUnique) {
      console.error('Failed to generate unique referral code after 10 attempts');
      return null;
    }

    // Update user with referral code
    const { data, error } = await supabase
      .from('users')
      .update({ referral_code: code })
      .eq('id', userId)
      .select('referral_code')
      .single();

    if (error) {
      console.error('Error saving referral code:', error);
      return null;
    }

    return data?.referral_code || null;
  } catch (err) {
    console.error('Unexpected error in createReferralCode:', err);
    return null;
  }
}

/**
 * Look up a user by their referral code
 * Returns the user ID of the referrer, or null if code not found
 */
export async function lookupReferrer(code: string): Promise<string | null> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('referral_code', code.toUpperCase())
      .single();

    if (error || !data) {
      return null;
    }

    return data.id;
  } catch (err) {
    console.error('Error looking up referrer:', err);
    return null;
  }
}

/**
 * Record a referral relationship
 * Called when a referred user signs up or makes their first purchase
 */
export async function recordReferral(
  referrerId: string,
  referredUserId: string,
  activated: boolean = false
): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from('referrals').insert({
      referrer_id: referrerId,
      referred_user_id: referredUserId,
      activated_at: activated ? new Date().toISOString() : null,
    });

    if (error) {
      console.error('Error recording referral:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in recordReferral:', err);
    return false;
  }
}

/**
 * Get referral statistics for a user
 * Returns count of total referrals and activated referrals
 */
export async function getReferralStats(userId: string): Promise<{
  total: number;
  activated: number;
} | null> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('referrals')
      .select('id, activated_at')
      .eq('referrer_id', userId);

    if (error) {
      console.error('Error getting referral stats:', error);
      return null;
    }

    if (!data) {
      return { total: 0, activated: 0 };
    }

    let activatedCount = 0;
    data.forEach((referral: { id: string; activated_at: string | null }) => {
      if (referral.activated_at) {
        activatedCount++;
      }
    });

    return {
      total: data.length,
      activated: activatedCount,
    };
  } catch (err) {
    console.error('Unexpected error in getReferralStats:', err);
    return null;
  }
}

/**
 * Get detailed referral history for a user
 * Useful for admin dashboard or user profile
 */
export async function getReferralHistory(
  userId: string
): Promise<
  Array<{
    referred_user_id: string;
    created_at: string;
    activated_at: string | null;
  }> | null
> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('referrals')
      .select('referred_user_id, created_at, activated_at')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting referral history:', error);
      return null;
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getReferralHistory:', err);
    return null;
  }
}

/**
 * Activate a referral when the referred user makes their first purchase
 */
export async function activateReferral(referredUserId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('referrals')
      .update({ activated_at: new Date().toISOString() })
      .eq('referred_user_id', referredUserId)
      .is('activated_at', null);

    if (error) {
      console.error('Error activating referral:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in activateReferral:', err);
    return false;
  }
}

/**
 * Verify if a user was referred (get the referrer's ID)
 */
export async function getReferrerForUser(userId: string): Promise<string | null> {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('referrals')
      .select('referrer_id')
      .eq('referred_user_id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data.referrer_id;
  } catch (err) {
    console.error('Error getting referrer for user:', err);
    return null;
  }
}
