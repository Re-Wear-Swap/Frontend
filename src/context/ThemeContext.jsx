import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const toggleTheme = () => setIsDark(prev => !prev)

  const theme = {
    isDark,
    toggleTheme,
    bg: isDark ? '#0f0a1a' : '#f8f5ff',
    surface: isDark ? '#1a1025' : 'white',
    text: isDark ? 'white' : '#1a0533',
    textMuted: isDark ? '#888' : '#aaa',
    border: isDark ? '#3a2a5a' : '#e9d5ff',
    accent: '#9333ea',
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}
