import { motion } from 'framer-motion'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { FiUsers, FiArrowLeft, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Topbar from '../components/Topbar'

export default function AdminLayout() {
  const { user } = useAuth()

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        
        <aside className="w-full border-b border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FiShield size={20} />
            </div>
            <div>
              <p className="text-sm text-indigo-300">Admin Control</p>
              <h2 className="font-semibold text-white">System Panel</h2>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive ? 'bg-indigo-500/15 text-indigo-300 shadow-lg shadow-indigo-500/10 border border-indigo-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                }`
              }
            >
              <FiUsers size={18} />
              Manage Users
            </NavLink>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition border border-transparent"
            >
              <FiArrowLeft size={18} />
              Back to App
            </NavLink>
          </div>
        </aside>

        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-4 sm:p-6 lg:p-8"
        >
          <Topbar />
          <div className="mt-6">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  )
}
