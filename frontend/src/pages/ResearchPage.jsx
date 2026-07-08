import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiCpu, FiLoader, FiSearch } from 'react-icons/fi'
import { analyzeCompany } from '../services/api'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const steps = [
  'Searching Company',
  'Collecting Financial Data',
  'Reading News',
  'Risk Analysis',
  'AI Reasoning',
  'Final Recommendation',
]

export default function ResearchPage() {
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [error, setError] = useState('')
  const { saveReport } = useAppContext()
  const navigate = useNavigate()

  const runAnalysis = async () => {
    if (!companyName.trim()) {
      setError('Please enter a company name before analyzing.')
      return
    }

    setError('')
    setLoading(true)
    setProgress(0)
    setActiveStep(0)

    try {
      const response = await analyzeCompany(companyName)
      const report = {
        id: `${response.company}-${Date.now()}`,
        company: response.company,
        recommendation: response.recommendation,
        confidence: response.confidence,
        analysis: response.analysis,
        createdAt: new Date().toISOString(),
      }
      saveReport(report)
      navigate('/report')
    } catch (err) {
      setError(err?.response?.data?.message || 'We could not analyze that company right now.')
    } finally {
      setLoading(false)
      setProgress(100)
      setActiveStep(steps.length - 1)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
            <FiSearch size={18} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Investment Research</p>
            <h2 className="text-xl font-semibold text-white">Analyze a public company</h2>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <label className="block text-sm text-slate-400">Company Name</label>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="Example: Tesla"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200 outline-none"
          />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <button onClick={runAnalysis} className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" disabled={loading}>
            {loading ? <FiLoader className="animate-spin" /> : <FiCpu />} 
            {loading ? 'Analyzing...' : 'Analyze Company'}
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">AI Workflow</p>
            <h2 className="text-xl font-semibold text-white">Processing the research pipeline</h2>
          </div>
          <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{progress}%</div>
        </div>

        <div className="mt-6 h-2 rounded-full bg-slate-800">
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-6 space-y-3">
          {steps.map((step, index) => {
            const done = index < activeStep || (loading && index <= activeStep)
            const current = index === activeStep && loading
            return (
              <div key={step} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${done ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-slate-950/50 text-slate-300'}`}>
                {done ? <FiCheckCircle /> : <FiArrowRight />}
                <span>{step}</span>
                {current ? <FiLoader className="ml-auto animate-spin" /> : null}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
