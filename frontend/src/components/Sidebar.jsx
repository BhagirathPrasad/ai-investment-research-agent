import { NavLink } from 'react-router-dom'
import { FiBarChart2, FiFileText, FiFolder, FiHome, FiSettings, FiStar, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: FiHome },
  { label: 'Investment Research', href: '/research', icon: FiStar },
  { label: 'Saved Reports', href: '/saved', icon: FiFolder },
  { label: 'Analytics', href: '/analytics', icon: FiBarChart2 },
  { label: 'Settings', href: '/settings', icon: FiSettings },
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="w-full border-b border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
          <FiStar size={20} />
        </div>
        <div>
          <p className="text-sm text-slate-400">AI Product Lab</p>
          <h2 className="font-semibold text-white">Research Agent</h2>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {links.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive ? 'bg-cyan-500/15 text-cyan-300 shadow-lg shadow-cyan-500/10' : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition mt-4 ${
                isActive ? 'bg-indigo-500/15 text-indigo-300 shadow-lg shadow-indigo-500/10 border border-indigo-500/20' : 'text-indigo-200/70 hover:bg-indigo-500/10 hover:text-indigo-200 border border-transparent'
              }`
            }
          >
            <FiShield size={18} />
            Admin Panel
          </NavLink>
        )}
      </nav>

      <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 p-4">
        <p className="text-sm text-slate-300">Next milestone</p>
        <p className="mt-2 text-lg font-semibold text-white">Deploy to Vercel + Render</p>
      </div>
    </aside>
  )
}
