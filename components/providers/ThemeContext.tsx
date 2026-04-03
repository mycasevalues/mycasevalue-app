'use client';
import { createContext, useContext, ReactNode } from 'react';

// PAPER DESIGN SYSTEM — Light mode only, no theme switching
const ThemeContext = createContext({ darkMode: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ darkMode: false }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
