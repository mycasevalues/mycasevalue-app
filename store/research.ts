import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentSearch {
  query: string;
  nosCode?: string;
  district?: string;
  timestamp: number;
}

interface ResearchState {
  /** Currently selected NOS code (e.g. "442") */
  currentCaseType: string | null;
  /** Currently selected district code (e.g. "SDNY") */
  currentDistrict: string | null;
  /** Last 10 searches */
  recentSearches: RecentSearch[];
  /** Up to 3 NOS codes selected for comparison */
  comparisonSelections: string[];
  /** Saved report IDs for quick access */
  savedReportIds: string[];

  // Actions
  setCaseType: (code: string | null) => void;
  setDistrict: (code: string | null) => void;
  addRecentSearch: (search: Omit<RecentSearch, 'timestamp'>) => void;
  clearRecentSearches: () => void;
  toggleComparison: (nosCode: string) => void;
  clearComparisons: () => void;
  saveReport: (id: string) => void;
  removeReport: (id: string) => void;
}

export const useResearchStore = create<ResearchState>()(
  persist(
    (set) => ({
      currentCaseType: null,
      currentDistrict: null,
      recentSearches: [],
      comparisonSelections: [],
      savedReportIds: [],

      setCaseType: (code) => set({ currentCaseType: code }),
      setDistrict: (code) => set({ currentDistrict: code }),

      addRecentSearch: (search) =>
        set((state) => {
          const entry: RecentSearch = { ...search, timestamp: Date.now() };
          const filtered = state.recentSearches.filter(
            (s) => s.query !== search.query || s.nosCode !== search.nosCode
          );
          return { recentSearches: [entry, ...filtered].slice(0, 10) };
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),

      toggleComparison: (nosCode) =>
        set((state) => {
          const exists = state.comparisonSelections.includes(nosCode);
          if (exists) {
            return { comparisonSelections: state.comparisonSelections.filter((c) => c !== nosCode) };
          }
          if (state.comparisonSelections.length >= 3) return state;
          return { comparisonSelections: [...state.comparisonSelections, nosCode] };
        }),

      clearComparisons: () => set({ comparisonSelections: [] }),

      saveReport: (id) =>
        set((state) => ({
          savedReportIds: state.savedReportIds.includes(id)
            ? state.savedReportIds
            : [...state.savedReportIds, id],
        })),

      removeReport: (id) =>
        set((state) => ({
          savedReportIds: state.savedReportIds.filter((r) => r !== id),
        })),
    }),
    {
      name: 'mcv-research',
    }
  )
);
