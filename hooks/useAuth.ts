'use client';

import { useState, useEffect, useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  /**
   * Whether the user has an active Attorney-tier subscription.
   * TODO: Check against a subscriptions table or Stripe metadata
   * once billing is live. Currently checks user_metadata.plan.
   */
  isPremium: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setUser(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (isMounted) {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('[useAuth] Error fetching session:', error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

  /**
   * Derive premium status from user metadata.
   *
   * TODO: Replace with a real subscription check once Stripe is integrated.
   * Options:
   *   1. Query a `subscriptions` table in Supabase
   *   2. Check user_metadata.plan set by a webhook
   *   3. Call a /api/subscription/status endpoint
   *
   * For now we check user_metadata.plan === 'attorney'.
   */
  const isPremium = useMemo(() => {
    if (!user) return false;
    const plan = user.user_metadata?.plan;
    return plan === 'attorney';
  }, [user]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isPremium,
  };
}
