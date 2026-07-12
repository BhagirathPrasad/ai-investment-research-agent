import { FiBell, FiMoon, FiSearch, FiSun, FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

export default function Topbar() {
  const { theme, setTheme } = useAppContext()
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
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
        <button className="rounded-2xl border border-white/10 bg-slate-950/60 p-2 text-slate-200">
          <FiBell />
        </button>
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
