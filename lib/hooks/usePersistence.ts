import { useCallback, useEffect, useState } from 'react';
import {
  saveReport,
  getSavedReports,
  deleteReport,
  saveSearchHistory,
  getSearchHistory,
  clearSearchHistory,
  getSearchSuggestions,
  getUserPreferences,
  updateUserPreferences,
  setPreference,
  getPreference,
  syncLocalDataToSupabase,
  hasSupabaseData,
  SavedReport,
  SearchHistoryItem,
  UserPreferences,
} from '../persistence';

/**
 * Custom hook for managing user persistence (reports, search history, preferences)
 * Provides simple async wrappers around persistence functions
 */
export function usePersistence() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ────────────────────────────────────────────────────────────────
  // Reports
  // ────────────────────────────────────────────────────────────────

  const addReport = useCallback(
    async (category: string, district?: string): Promise<SavedReport | null> => {
      setLoading(true);
      setError(null);
      try {
        return await saveReport({ category, district });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to save report';
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchReports = useCallback(
    async (limit?: number): Promise<SavedReport[]> => {
      setLoading(true);
      setError(null);
      try {
        return await getSavedReports(limit);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch reports';
        setError(msg);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeReport = useCallback(async (reportId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      return await deleteReport(reportId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete report';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ────────────────────────────────────────────────────────────────
  // Search History
  // ────────────────────────────────────────────────────────────────

  const addSearchToHistory = useCallback(
    async (query: string, category?: string): Promise<SearchHistoryItem | null> => {
      setLoading(true);
      setError(null);
      try {
        return await saveSearchHistory(query, category);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to save search';
        setError(msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchSearchHistory = useCallback(
    async (limit?: number): Promise<SearchHistoryItem[]> => {
      setLoading(true);
      setError(null);
      try {
        return await getSearchHistory(limit);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch search history';
        setError(msg);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clear = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      return await clearSearchHistory();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to clear history';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSuggestions = useCallback(
    async (limit?: number): Promise<string[]> => {
      setLoading(true);
      setError(null);
      try {
        return await getSearchSuggestions(limit);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch suggestions';
        setError(msg);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ────────────────────────────────────────────────────────────────
  // Preferences
  // ────────────────────────────────────────────────────────────────

  const fetchPreferences = useCallback(
    async (): Promise<UserPreferences> => {
      setLoading(true);
      setError(null);
      try {
        return await getUserPreferences();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch preferences';
        setError(msg);
        return {};
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updatePreferences = useCallback(
    async (updates: Partial<UserPreferences>): Promise<UserPreferences> => {
      setLoading(true);
      setError(null);
      try {
        return await updateUserPreferences(updates);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to update preferences';
        setError(msg);
        return {};
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const setPref = useCallback(
    async <T = any>(key: string, value: T): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        return await setPreference(key, value);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to set preference';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getPref = useCallback(
    async <T = any>(key: string, defaultValue?: T): Promise<T | undefined> => {
      setLoading(true);
      setError(null);
      try {
        return await getPreference<T>(key, defaultValue);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to get preference';
        setError(msg);
        return defaultValue;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ────────────────────────────────────────────────────────────────
  // Sync
  // ────────────────────────────────────────────────────────────────

  const sync = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await syncLocalDataToSupabase();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to sync data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkSupabaseData = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      return await hasSupabaseData();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to check data';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,

    // Reports
    addReport,
    fetchReports,
    removeReport,

    // Search History
    addSearchToHistory,
    fetchSearchHistory,
    clearSearchHistory: clear,
    fetchSuggestions,

    // Preferences
    fetchPreferences,
    updatePreferences,
    setPreference: setPref,
    getPreference: getPref,

    // Sync
    syncToSupabase: sync,
    hasSupabaseData: checkSupabaseData,
  };
}

/**
 * Hook for managing saved reports with automatic state updates
 */
export function useSavedReports(limit: number = 10) {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSavedReports(limit);
      setReports(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch reports';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const add = useCallback(
    async (category: string, district?: string) => {
      try {
        const result = await saveReport({ category, district });
        if (result) {
          setReports(prev => [result, ...prev]);
        }
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to add report';
        setError(msg);
        return null;
      }
    },
    []
  );

  const remove = useCallback(async (reportId: string) => {
    try {
      await deleteReport(reportId);
      setReports(prev => prev.filter(r => r.id !== reportId));
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to remove report';
      setError(msg);
      return false;
    }
  }, []);

  return {
    reports,
    loading,
    error,
    refresh: fetch,
    add,
    remove,
  };
}

/**
 * Hook for managing search history with automatic state updates
 */
export function useSearchHistory(limit: number = 20) {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSearchHistory(limit);
      setHistory(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch search history';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const add = useCallback(async (query: string, category?: string) => {
    try {
      const result = await saveSearchHistory(query, category);
      if (result) {
        setHistory(prev => [result, ...prev]);
      }
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add search';
      setError(msg);
      return null;
    }
  }, []);

  const clear = useCallback(async () => {
    try {
      await clearSearchHistory();
      setHistory([]);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to clear history';
      setError(msg);
      return false;
    }
  }, []);

  return {
    history,
    loading,
    error,
    refresh: fetch,
    add,
    clear,
  };
}

/**
 * Hook for managing user preferences with automatic state updates
 */
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserPreferences();
      setPreferences(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch preferences';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const update = useCallback(async (updates: Partial<UserPreferences>) => {
    try {
      const result = await updateUserPreferences(updates);
      setPreferences(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update preferences';
      setError(msg);
      return preferences;
    }
  }, [preferences]);

  const set = useCallback(async <T = any>(key: string, value: T) => {
    try {
      await setPreference(key, value);
      setPreferences(prev => ({ ...prev, [key]: value }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to set preference';
      setError(msg);
    }
  }, []);

  const get = useCallback(<T = any>(key: string, defaultValue?: T): T | undefined => {
    return (preferences[key] ?? defaultValue) as T;
  }, [preferences]);

  return {
    preferences,
    loading,
    error,
    refresh: fetch,
    update,
    set,
    get,
  };
}
