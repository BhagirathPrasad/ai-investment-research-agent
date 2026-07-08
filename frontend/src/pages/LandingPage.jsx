import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiBarChart2, FiCpu, FiShield, FiStar } from 'react-icons/fi'

const features = [
  {
    title: 'AI Equity Analysis',
    description: 'Generate professional-style investment summaries using large language models and live web research.',
    icon: FiCpu,
  },
  {
    title: 'Instant Signals',
    description: 'Get a concise INVEST or PASS recommendation backed by financial and qualitative analysis.',
    icon: FiBarChart2,
  },
  {
    title: 'Risk-Aware Research',
    description: 'Assess growth, financial health, SWOT, and competitive positioning in one workflow.',
    icon: FiShield,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.26),_transparent_30%),linear-gradient(135deg,_#020617,_#111827)] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-16 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cyan-500/20 p-2 text-cyan-300">
              <FiStar />
            </div>
            <span className="text-sm font-semibold tracking-[0.3em] text-slate-300 uppercase">AI Investment Research Agent</span>
          </div>
          <Link to="/dashboard" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Start Research</Link>
        </header>

        <section className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
              Production-grade AI research for modern investment teams
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Analyze any public company with institutional-grade AI research.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Enter a ticker or company name, and the platform will synthesize financial data, news, risk signals, and competitive positioning into a crisp investment report.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/research" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
                Start Research <FiArrowRight />
              </Link>
              <Link to="/saved" className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-100">View Saved Reports</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-slate-950/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Live workflow</p>
              <div className="mt-6 space-y-3">
                {['Searching company context', 'Collecting financial data', 'Reviewing latest news', 'Generating recommendation'].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">{index + 1}</div>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <motion.div key={title} whileHover={{ y: -4 }} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  )
}
