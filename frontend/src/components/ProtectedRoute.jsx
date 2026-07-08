import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">Loading your workspace...</div>
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
