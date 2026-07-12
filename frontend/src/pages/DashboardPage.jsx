import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiActivity, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi'
import { authApi } from '../services/authApi'
import { useAuth } from '../context/AuthContext'

const pieData = [
  { name: 'Invest', value: 74 },
  { name: 'Pass', value: 54 },
]

const trendData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 76 },
  { month: 'Mar', score: 79 },
  { month: 'Apr', score: 81 },
  { month: 'May', score: 84 },
]

const sectorData = [
  { sector: 'AI', count: 31 },
  { sector: 'Energy', count: 18 },
  { sector: 'Fintech', count: 24 },
  { sector: 'Healthcare', count: 20 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({ totalReports: 0, invested: 0, passed: 0, confidence: 0 })

  useEffect(() => {
    const load = async () => {
      try {
        const response = await authApi.getReports()
        const items = response.data.reports || []
        setReports(items)
        setStats({
          totalReports: items.length,
          invested: items.filter((report) => report.recommendation === 'INVEST').length,
          passed: items.filter((report) => report.recommendation === 'PASS').length,
          confidence: items.length ? Math.round(items.reduce((sum, report) => sum + (report.confidenceScore || 0), 0) / items.length) : 0,
        })
      } catch {
        // ignore for now
      }
    }

    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Reports', value: stats.totalReports, icon: FiUsers },
          { label: 'Investment Recommendations', value: stats.invested, icon: FiTrendingUp },
          { label: 'Pass Recommendations', value: stats.passed, icon: FiZap },
          { label: 'Average Confidence', value: `${stats.confidence}%`, icon: FiActivity },
        ].map(({ label, value, icon: Icon }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-2xl bg-cyan-500/10 p-2 text-cyan-300">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recommendation Mix</h3>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">Live</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={2}>
                  <Cell fill="#22d3ee" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Confidence Trend</h3>
            <span className="text-sm text-slate-400">6 month view</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full text-sm text-left text-slate-300">
              <thead className="bg-slate-800/80 text-slate-200">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Recommendation</th>
                  <th className="px-4 py-3">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? reports.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-t border-white/10 bg-slate-950/40">
                    <td className="px-4 py-3">{item.companyName}</td>
                    <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{item.recommendation}</td>
                    <td className="px-4 py-3">{item.confidenceScore}%</td>
                  </tr>
                )) : <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-400">No reports yet — run your first research workflow.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Sector Distribution</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData}>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                <XAxis dataKey="sector" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
