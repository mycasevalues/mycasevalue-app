import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'es';

interface UserState {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** User email (if signed in) */
  email: string | null;
  /** Display name */
  displayName: string | null;
  /** Language preference */
  language: Language;
  /** Dark mode preference */
  darkMode: boolean;

  // Actions
  setAuth: (authenticated: boolean, email?: string | null, displayName?: string | null) => void;
  clearAuth: () => void;
  setLanguage: (lang: Language) => void;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      email: null,
      displayName: null,
      language: 'en',
      darkMode: false,

      setAuth: (authenticated, email = null, displayName = null) =>
        set({ isAuthenticated: authenticated, email, displayName }),

      clearAuth: () =>
        set({ isAuthenticated: false, email: null, displayName: null }),

      setLanguage: (lang) => set({ language: lang }),

      setDarkMode: (enabled) => set({ darkMode: enabled }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'mcv-user',
      partialize: (state) => ({
        language: state.language,
        darkMode: state.darkMode,
      }),
    }
  )
);
