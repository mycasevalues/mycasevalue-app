import { create } from 'zustand';

interface UiState {
  /** Nav dropdown open state */
  navDropdownOpen: boolean;
  /** Mobile menu open state */
  mobileMenuOpen: boolean;
  /** Loading states for AI tool calls, keyed by tool name */
  aiLoading: Record<string, boolean>;

  // Actions
  setNavDropdownOpen: (open: boolean) => void;
  toggleNavDropdown: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setAiLoading: (tool: string, loading: boolean) => void;
  clearAllAiLoading: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  navDropdownOpen: false,
  mobileMenuOpen: false,
  aiLoading: {},

  setNavDropdownOpen: (open) => set({ navDropdownOpen: open }),
  toggleNavDropdown: () => set((state) => ({ navDropdownOpen: !state.navDropdownOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  setAiLoading: (tool, loading) =>
    set((state) => ({
      aiLoading: { ...state.aiLoading, [tool]: loading },
    })),

  clearAllAiLoading: () => set({ aiLoading: {} }),
}));
