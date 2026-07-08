import { FiBell, FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

export default function Topbar() {
  const { theme, setTheme } = useAppContext()

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
        <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 font-semibold">
            AK
          </div>
          <div>
            <p className="text-sm font-medium text-white">A. Kumar</p>
            <p className="text-xs text-slate-400">Research Lead</p>
          </div>
        </div>
      </div>
    </div>
  )
}
