'use client';

import { useState, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface UseSaveToSupabaseReturn {
  save: (tableName: string, data: Record<string, unknown>) => Promise<void>;
  saving: boolean;
  error: string | null;
  saved: boolean;
}

export function useSaveToSupabase(): UseSaveToSupabaseReturn {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const save = useCallback(
    async (tableName: string, data: Record<string, unknown>) => {
      setSaving(true);
      setError(null);
      setSaved(false);

      try {
        // Check auth
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          throw new Error('User must be authenticated to save data');
        }

        // Validate environment variables
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          throw new Error('Supabase configuration is not available');
        }

        // Insert data with user_id
        const { error: insertError } = await supabase.from(tableName).insert([
          {
            ...data,
            user_id: session.user.id,
            created_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          throw new Error(insertError.message);
        }

        setSaved(true);
        setSaving(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving';
        setError(errorMessage);
        setSaving(false);
      }
    },
    [supabase]
  );

  return {
    save,
    saving,
    error,
    saved,
  };
}
