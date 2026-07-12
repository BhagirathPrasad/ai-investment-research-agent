import { FiBell, FiMoon, FiSearch, FiSun, FiLogOut, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Topbar() {
  const { theme, setTheme } = useAppContext()
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative z-50 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-300">
          <FiSearch />
        </div>
        <input
          placeholder="Search company or report"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-200 outline-none sm:w-72"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-2xl border border-white/10 bg-slate-950/60 p-2 text-slate-200"
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        <div className="relative z-50" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-2 text-slate-200 relative hover:bg-white/5 transition"
          >
            <FiBell />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-3 w-80 rounded-[1.5rem] border border-white/10 bg-slate-900/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 transition">Mark all as read</button>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition cursor-pointer">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      <FiCheckCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">Analysis Complete</p>
                      <p className="mt-0.5 text-xs text-slate-400">Your AI report for OpenAI is ready.</p>
                      <p className="mt-1 text-[10px] text-slate-500">10m ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition cursor-pointer">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                      <FiInfo size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">System Update</p>
                      <p className="mt-0.5 text-xs text-slate-400">New sector analysis models deployed.</p>
                      <p className="mt-1 text-[10px] text-slate-500">2h ago</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-xl bg-white/5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 transition">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Link to="/profile" className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 transition hover:bg-cyan-500/20">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 font-semibold text-white overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.fullName} className="h-full w-full object-cover" />
            ) : (
              user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'AK'
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user?.fullName || 'A. Kumar'}</p>
            <p className="text-xs text-slate-400">Research Lead</p>
          </div>
        </Link>
        <button
          onClick={logout}
          className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20 transition"
          title="Logout"
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  )
}
