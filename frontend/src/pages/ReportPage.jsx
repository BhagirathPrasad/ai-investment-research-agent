import { motion } from 'framer-motion'
import { FiDownload, FiTrendingUp, FiShield, FiBriefcase, FiBarChart2 } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

export default function ReportPage() {
  const { currentReport } = useAppContext()

  if (!currentReport) {
    return <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-8 text-slate-300">No report available yet. Run a new analysis to generate one.</div>
  }

  const analysis = currentReport.analysis || {}

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-cyan-300">Investment Brief</p>
          <h2 className="text-3xl font-semibold text-white">{currentReport.company}</h2>
          <p className="mt-2 text-slate-400">{analysis.overview || 'AI-generated research summary.'}</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950">
          <FiDownload /> Export PDF
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><FiBriefcase /></div>
            <div>
              <p className="text-sm text-slate-400">Company Overview</p>
              <h3 className="text-xl font-semibold text-white">{analysis.industry || 'Industry insight'}</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['Market Cap', analysis.marketCap || 'N/A'],
              ['Revenue', analysis.revenue || 'N/A'],
              ['Profit', analysis.profit || 'N/A'],
              ['CEO', analysis.ceo || 'N/A'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><FiBarChart2 /></div>
            <div>
              <p className="text-sm text-slate-400">AI Recommendation</p>
              <h3 className="text-xl font-semibold text-white">{currentReport.recommendation}</h3>
            </div>
          </div>
          <div className="mt-6 rounded-[1.3rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-indigo-500/15 p-5">
            <p className="text-sm text-slate-400">Confidence Score</p>
            <p className="mt-2 text-4xl font-semibold text-white">{currentReport.confidence}%</p>
            <p className="mt-3 text-sm text-slate-300">{analysis.summary || 'This report reflects a synthesized assessment of fundamentals, sentiment, and strategic positioning.'}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><FiShield /></div>
            <div>
              <p className="text-sm text-slate-400">SWOT Analysis</p>
              <h3 className="text-xl font-semibold text-white">Strengths & Risks</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <h4 className="font-semibold text-emerald-300">Strengths</h4>
              <p className="mt-2 text-sm text-slate-300">{analysis.strengths || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-rose-300">Weaknesses</h4>
              <p className="mt-2 text-sm text-slate-300">{analysis.weaknesses || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-300">Opportunities</h4>
              <p className="mt-2 text-sm text-slate-300">{analysis.opportunities || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-fuchsia-300">Threats</h4>
              <p className="mt-2 text-sm text-slate-300">{analysis.threats || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><FiTrendingUp /></div>
            <div>
              <p className="text-sm text-slate-400">AI Reasoning</p>
              <h3 className="text-xl font-semibold text-white">Why this recommendation was made</h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-300">{analysis.reasoning || 'The report is being synthesized from financial, news, and market context.'}</p>
        </div>
      </div>
    </motion.div>
  )
}
