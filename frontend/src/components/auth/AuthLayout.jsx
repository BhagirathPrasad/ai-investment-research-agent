import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.26),_transparent_30%),linear-gradient(135deg,_#020617,_#111827)] p-4 text-slate-100 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid w-full gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-slate-950/80 p-8 lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(34,211,238,0.35),_transparent_40%)]" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">AI Investment Platform</p>
              <h1 className="mt-4 text-3xl font-semibold text-white">Secure research, confident decisions.</h1>
              <p className="mt-3 max-w-md text-sm text-slate-300">Manage your account, save reports, and collaborate with AI-powered analysis in one premium workspace.</p>
            </div>
            <div className="relative rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/50 p-5">
              <p className="text-sm text-slate-400">“Institutional-grade security with a designer experience.”</p>
            </div>
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">Welcome back</p>
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
              </div>
              <Link to="/" className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300">Home</Link>
            </div>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
