import { create } from 'zustand';

interface UiState {
  /** Nav dropdown open state */
  navDropdownOpen: boolean;
  /** Mobile menu open state */
  mobileMenuOpen: boolean;
  /** Dark mode enabled */
  darkMode: boolean;
  /** Loading states for AI tool calls, keyed by tool name */
  aiLoading: Record<string, boolean>;

  // Actions
  setNavDropdownOpen: (open: boolean) => void;
  toggleNavDropdown: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;
  setAiLoading: (tool: string, loading: boolean) => void;
  clearAllAiLoading: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  navDropdownOpen: false,
  mobileMenuOpen: false,
  darkMode: false,
  aiLoading: {},

  setNavDropdownOpen: (open) => set({ navDropdownOpen: open }),
  toggleNavDropdown: () => set((state) => ({ navDropdownOpen: !state.navDropdownOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setDarkMode: (enabled) => set({ darkMode: enabled }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  setAiLoading: (tool, loading) =>
    set((state) => ({
      aiLoading: { ...state.aiLoading, [tool]: loading },
    })),

  clearAllAiLoading: () => set({ aiLoading: {} }),
}));
