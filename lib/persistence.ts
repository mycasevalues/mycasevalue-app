'use client';

/**
 * Persistence module for MyCaseValue
 * Handles saving/retrieving user data (reports, search history, preferences)
 * Uses Supabase when authenticated, falls back to localStorage
 */

import { getSupabase } from './supabase';

// ────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────

export interface SavedReport {
  id: string;
  category: string;
  district: string;
  viewedAt: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  category?: string;
  searchedAt: string;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  emailNotifications?: boolean;
  savedSearches?: boolean;
  defaultDistrict?: string;
  defaultCaseType?: string;
  [key: string]: any;
}

// ────────────────────────────────────────────────────────────────
// HELPER: Get current user email (client-side)
// ────────────────────────────────────────────────────────────────

async function getCurrentUserEmail(): Promise<string | null> {
  try {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email || null;
  } catch {
    return null;
  }
}

// ────────────────────────────────────────────────────────────────
// LOCALSTORAGE FALLBACK HELPERS
// ────────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  SAVED_REPORTS: 'mcv_saved_reports',
  SEARCH_HISTORY: 'mcv_search_history',
  USER_PREFERENCES: 'mcv_user_preferences',
};

function getLocalReports(): SavedReport[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_REPORTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalReports(reports: SavedReport[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_REPORTS, JSON.stringify(reports));
  } catch {
    // Storage quota exceeded or disabled
  }
}

function getLocalSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalSearchHistory(history: SearchHistoryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
  } catch {
    // Storage quota exceeded or disabled
  }
}

function getLocalPreferences(): UserPreferences {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function setLocalPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
  } catch {
    // Storage quota exceeded or disabled
  }
}

// ────────────────────────────────────────────────────────────────
// REPORTS API
// ────────────────────────────────────────────────────────────────

/**
 * Save a report view for the current user
 * Syncs to Supabase if logged in, otherwise stores locally
 */
export async function saveReport(
  reportData: Omit<SavedReport, 'id' | 'viewedAt'> & { category: string; district?: string }
): Promise<SavedReport | null> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    // Try Supabase first
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('saved_reports')
        .insert({
          user_email: userEmail.toLowerCase(),
          category: reportData.category,
          district: reportData.district || 'national',
          viewed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          category: data.category,
          district: data.district,
          viewedAt: data.viewed_at,
        };
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  const reports = getLocalReports();
  const newReport: SavedReport = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    category: reportData.category,
    district: reportData.district || 'national',
    viewedAt: new Date().toISOString(),
  };

  reports.push(newReport);
  setLocalReports(reports);
  return newReport;
}

/**
 * Retrieve saved reports for the current user
 */
export async function getSavedReports(limit: number = 10): Promise<SavedReport[]> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('saved_reports')
        .select('*')
        .eq('user_email', userEmail.toLowerCase())
        .order('viewed_at', { ascending: false })
        .limit(limit);

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          category: item.category,
          district: item.district,
          viewedAt: item.viewed_at,
        }));
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  return getLocalReports().slice(0, limit);
}

/**
 * Delete a saved report
 */
export async function deleteReport(reportId: string): Promise<boolean> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('saved_reports')
        .delete()
        .eq('id', reportId)
        .eq('user_email', userEmail.toLowerCase());

      if (!error) {
        return true;
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  const reports = getLocalReports().filter(r => r.id !== reportId);
  setLocalReports(reports);
  return true;
}

// ────────────────────────────────────────────────────────────────
// SEARCH HISTORY API
// ────────────────────────────────────────────────────────────────

/**
 * Save a search to user's history
 */
export async function saveSearchHistory(
  query: string,
  category?: string
): Promise<SearchHistoryItem | null> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('search_history')
        .insert({
          user_email: userEmail.toLowerCase(),
          query,
          category: category || null,
          searched_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          query: data.query,
          category: data.category,
          searchedAt: data.searched_at,
        };
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  const history = getLocalSearchHistory();
  const newItem: SearchHistoryItem = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    query,
    category,
    searchedAt: new Date().toISOString(),
  };

  history.unshift(newItem);
  // Keep last 50 searches in localStorage
  setLocalSearchHistory(history.slice(0, 50));
  return newItem;
}

/**
 * Retrieve user's search history
 */
export async function getSearchHistory(limit: number = 20): Promise<SearchHistoryItem[]> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_email', userEmail.toLowerCase())
        .order('searched_at', { ascending: false })
        .limit(limit);

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          query: item.query,
          category: item.category,
          searchedAt: item.searched_at,
        }));
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  return getLocalSearchHistory().slice(0, limit);
}

/**
 * Clear entire search history
 */
export async function clearSearchHistory(): Promise<boolean> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_email', userEmail.toLowerCase());

      if (!error) {
        return true;
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  setLocalSearchHistory([]);
  return true;
}

/**
 * Get unique search queries from history (for autocomplete/suggestions)
 */
export async function getSearchSuggestions(limit: number = 10): Promise<string[]> {
  const history = await getSearchHistory(100);
  const unique = new Map<string, number>();

  history.forEach(item => {
    if (item.query) {
      unique.set(item.query, (unique.get(item.query) || 0) + 1);
    }
  });

  return Array.from(unique.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([query]) => query)
    .slice(0, limit);
}

// ────────────────────────────────────────────────────────────────
// USER PREFERENCES API
// ────────────────────────────────────────────────────────────────

/**
 * Get user preferences
 */
export async function getUserPreferences(): Promise<UserPreferences> {
  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      // Note: preferences aren't stored in Supabase yet, just using localStorage
      // This structure allows for future extension to a preferences table
    } catch {
      // Fall through to localStorage
    }
  }

  // localStorage-only for now (can be extended to Supabase table later)
  return getLocalPreferences();
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  updates: Partial<UserPreferences>
): Promise<UserPreferences> {
  const current = await getUserPreferences();
  const updated = { ...current, ...updates };

  const userEmail = await getCurrentUserEmail();

  if (userEmail) {
    try {
      const supabase = getSupabase();
      // Future: INSERT/UPDATE preferences table
      // await supabase
      //   .from('user_preferences')
      //   .upsert({
      //     user_email: userEmail.toLowerCase(),
      //     preferences: updated,
      //   });
    } catch {
      // Fall through to localStorage
    }
  }

  // Save to localStorage
  setLocalPreferences(updated);
  return updated;
}

/**
 * Set a specific preference value
 */
export async function setPreference<T = any>(key: string, value: T): Promise<void> {
  const current = await getUserPreferences();
  await updateUserPreferences({ ...current, [key]: value });
}

/**
 * Get a specific preference value
 */
export async function getPreference<T = any>(key: string, defaultValue?: T): Promise<T> {
  const prefs = await getUserPreferences();
  return (prefs[key] ?? defaultValue) as T;
}

// ────────────────────────────────────────────────────────────────
// SYNC HELPERS
// ────────────────────────────────────────────────────────────────

/**
 * Sync local data to Supabase (for users who just logged in)
 * This allows offline users to have their localStorage synced when they authenticate
 */
export async function syncLocalDataToSupabase(): Promise<void> {
  const userEmail = await getCurrentUserEmail();
  if (!userEmail) return;

  try {
    const supabase = getSupabase();

    // Sync search history
    const localHistory = getLocalSearchHistory();
    if (localHistory.length > 0) {
      await supabase.from('search_history').insert(
        localHistory.map(item => ({
          user_email: userEmail.toLowerCase(),
          query: item.query,
          category: item.category || null,
          searched_at: item.searchedAt,
        }))
      );
    }

    // Sync saved reports
    const localReports = getLocalReports();
    if (localReports.length > 0) {
      await supabase.from('saved_reports').insert(
        localReports.map(item => ({
          user_email: userEmail.toLowerCase(),
          category: item.category,
          district: item.district,
          viewed_at: item.viewedAt,
        }))
      );
    }

    // Clear local storage after successful sync
    setLocalSearchHistory([]);
    setLocalReports([]);
  } catch (error) {
    console.error('Failed to sync local data to Supabase:', error);
    // Don't clear local data if sync fails
  }
}

/**
 * Check if user has any data in Supabase vs localStorage
 */
export async function hasSupabaseData(): Promise<boolean> {
  const userEmail = await getCurrentUserEmail();
  if (!userEmail) return false;

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('saved_reports')
      .select('id')
      .eq('user_email', userEmail.toLowerCase())
      .limit(1);

    return !!data && data.length > 0;
  } catch {
    return false;
  }
}
