import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'app.theme'
// theme: 'light' | 'dark' | 'system'

const ThemeContext = createContext({ theme: 'system', setTheme: () => {} })

function applyTheme(theme) {
  const root = document.documentElement
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
  root.classList.toggle('dark', isDark)
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('system')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored) setThemeState(stored)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => theme === 'system' && applyTheme('system')
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [theme])

  const setTheme = (t) => setThemeState(t)
  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() { return useContext(ThemeContext) }

export const THEME_OPTIONS = [
  { value: 'system', label: 'Automático' },
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
]
