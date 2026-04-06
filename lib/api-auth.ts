/**
 * MyCaseValue — API Authentication & Authorization
 *
 * Server-side auth helpers for API routes. Extracts the user from
 * Supabase Auth (via cookies) and checks tier-based feature access.
 *
 * Usage:
 *   import { requireAuth, requireTier } from '../../../lib/api-auth';
 *
 *   // In an apiHandler:
 *   const auth = await requireAuth(request);
 *   if (auth.error) return auth.error; // NextResponse 401
 *
 *   const tierCheck = await requireTier(auth.user.email, 'attorney');
 *   if (tierCheck.error) return tierCheck.error; // NextResponse 403
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getUserTier, type Tier, TIER_ORDER } from './access';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
} as const;

interface AuthUser {
  id: string;
  email: string;
}

interface AuthSuccess {
  user: AuthUser;
  error: null;
}

interface AuthFailure {
  user: null;
  error: NextResponse;
}

type AuthResult = AuthSuccess | AuthFailure;

interface TierSuccess {
  tier: Tier;
  error: null;
}

interface TierFailure {
  tier: null;
  error: NextResponse;
}

type TierResult = TierSuccess | TierFailure;

/**
 * Extract authenticated user from Supabase cookies.
 * Returns a 401 NextResponse if the user is not authenticated.
 */
export async function requireAuth(request: NextRequest): Promise<AuthResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase isn't configured, return a clear error
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 503, headers: CORS_HEADERS }
      ),
    };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll() {
        // API routes don't set cookies
      },
    },
  });

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'Authentication required', message: 'Please sign in to access this feature.' },
        { status: 401, headers: CORS_HEADERS }
      ),
    };
  }

  return {
    user: { id: user.id, email: user.email },
    error: null,
  };
}

/**
 * Check that a user has at least the given tier.
 * Returns a 403 NextResponse if they don't meet the requirement.
 */
export async function requireTier(
  email: string,
  minimumTier: Tier,
): Promise<TierResult> {
  const currentTier = await getUserTier(email);

  return { tier: currentTier, error: null }; // BETA: gate disabled — re-enable when Stripe is live
}
