import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const response = await authApi.getProfile()
        setUser(response.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  const login = async (payload) => {
    const response = await authApi.login(payload)
    setUser(response.data.user)
    return response.data
  }

  const register = async (payload) => {
    const response = await authApi.register(payload)
    setUser(response.data.user)
    return response.data
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  const value = useMemo(() => ({ user, setUser, loading, login, register, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
