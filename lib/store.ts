import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface SearchFilters {
  nosCode: string;
  district: string;
  dateRange: { start: string; end: string };
  minSettlement: number;
  maxSettlement: number;
  caseType: string;
  judge: string;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  defaultView: 'grid' | 'list' | 'map';
  favoriteNOSCodes: string[];
  favoriteDistricts: string[];
  recentSearches: string[];
  dashboardLayout: string[];
}

interface AppState {
  // Search
  searchQuery: string;
  searchFilters: SearchFilters;
  searchResults: unknown[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  setSearchResults: (results: unknown[]) => void;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;

  // User preferences
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  addRecentSearch: (query: string) => void;
  toggleFavoriteNOS: (code: string) => void;
  toggleFavoriteDistrict: (district: string) => void;

  // UI State
  sidebarOpen: boolean;
  activeModal: string | null;
  notifications: Array<{ id: string; type: 'info' | 'success' | 'warning' | 'error'; message: string; timestamp: number }>;
  setSidebarOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  addNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
  dismissNotification: (id: string) => void;

  // Comparison
  comparedItems: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
}

const defaultFilters: SearchFilters = {
  nosCode: '',
  district: '',
  dateRange: { start: '', end: '' },
  minSettlement: 0,
  maxSettlement: 0,
  caseType: '',
  judge: '',
};

const defaultPreferences: UserPreferences = {
  theme: 'light',
  defaultView: 'grid',
  favoriteNOSCodes: [],
  favoriteDistricts: [],
  recentSearches: [],
  dashboardLayout: ['stats', 'trends', 'recent', 'favorites'],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Search state
      searchQuery: '',
      searchFilters: defaultFilters,
      searchResults: [],
      isSearching: false,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchFilters: (filters) => set((state) => ({ searchFilters: { ...state.searchFilters, ...filters } })),
      setSearchResults: (results) => set({ searchResults: results }),
      setIsSearching: (searching) => set({ isSearching: searching }),
      clearSearch: () => set({ searchQuery: '', searchFilters: defaultFilters, searchResults: [], isSearching: false }),

      // Preferences
      preferences: defaultPreferences,
      updatePreferences: (prefs) => set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
      addRecentSearch: (query) => set((state) => {
        const recent = [query, ...state.preferences.recentSearches.filter(s => s !== query)].slice(0, 20);
        return { preferences: { ...state.preferences, recentSearches: recent } };
      }),
      toggleFavoriteNOS: (code) => set((state) => {
        const favs = state.preferences.favoriteNOSCodes;
        const updated = favs.includes(code) ? favs.filter(c => c !== code) : [...favs, code];
        return { preferences: { ...state.preferences, favoriteNOSCodes: updated } };
      }),
      toggleFavoriteDistrict: (district) => set((state) => {
        const favs = state.preferences.favoriteDistricts;
        const updated = favs.includes(district) ? favs.filter(d => d !== district) : [...favs, district];
        return { preferences: { ...state.preferences, favoriteDistricts: updated } };
      }),

      // UI
      sidebarOpen: false,
      activeModal: null,
      notifications: [],
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveModal: (modal) => set({ activeModal: modal }),
      addNotification: (type, message) => set((state) => ({
        notifications: [...state.notifications, { id: crypto.randomUUID(), type, message, timestamp: Date.now() }]
      })),
      dismissNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      // Comparison
      comparedItems: [],
      addToComparison: (id) => set((state) => {
        if (state.comparedItems.length >= 4) return state;
        if (state.comparedItems.includes(id)) return state;
        return { comparedItems: [...state.comparedItems, id] };
      }),
      removeFromComparison: (id) => set((state) => ({
        comparedItems: state.comparedItems.filter(i => i !== id)
      })),
      clearComparison: () => set({ comparedItems: [] }),
    }),
    {
      name: 'mycasevalue-storage',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);
