"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "sun" | "moon"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("sun")

  const toggleTheme = () => {
    setTheme(theme === "sun" ? "moon" : "sun")
  }

  useEffect(() => {
    document.documentElement.classList.toggle("moon-mode", theme === "moon")
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
