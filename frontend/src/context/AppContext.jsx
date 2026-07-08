import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('ai-research-theme', 'dark')
  const [reports, setReports] = useLocalStorage('ai-research-reports', [])
  const [currentReport, setCurrentReport] = useState(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const saveReport = (report) => {
    const payload = {
      ...report,
      id: report.id ?? `${report.company}-${Date.now()}`,
      createdAt: report.createdAt ?? new Date().toISOString(),
    }

    setReports((prev) => [payload, ...prev.filter((item) => item.id !== payload.id)])
    setCurrentReport(payload)
  }

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((item) => item.id !== id))
    if (currentReport?.id === id) {
      setCurrentReport(null)
    }
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      reports,
      currentReport,
      setCurrentReport,
      saveReport,
      deleteReport,
    }),
    [theme, reports, currentReport],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
