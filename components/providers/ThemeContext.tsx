'use client'
import { createContext, useContext, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  darkMode: boolean
  setDarkMode: (d: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  setDarkMode: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Dark-only site — always enforce dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode: true, setDarkMode: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
