import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, CartesianGrid, Cell, Area, AreaChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiActivity, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

export default function DashboardPage() {
  const { reports } = useAppContext()
  const [stats, setStats] = useState({ totalReports: 0, invested: 0, passed: 0, confidence: 0 })
  
  const [pieData, setPieData] = useState([{ name: 'No Data', value: 1 }])
  const [trendData, setTrendData] = useState([])
  const [sectorData, setSectorData] = useState([])

  useEffect(() => {
    const items = reports || []
    
    const invested = items.filter((report) => report.recommendation === 'INVEST').length
    const passed = items.filter((report) => report.recommendation === 'PASS').length
    
    setStats({
      totalReports: items.length,
      invested,
      passed,
      confidence: items.length ? Math.round(items.reduce((sum, report) => sum + (report.confidence || 0), 0) / items.length) : 0,
    })

    // Calculate Recommendation Mix (Pie)
    if (items.length === 0) {
      setPieData([{ name: 'No Data', value: 1 }])
    } else {
      setPieData([
        { name: 'Invest', value: invested },
        { name: 'Pass', value: passed }
      ])
    }

    // Calculate Sector Distribution (Bar)
    const sCounts = {}
    items.forEach(r => {
      const sector = r.analysis?.industry?.split('/')[0]?.trim() || 'Other'
      sCounts[sector] = (sCounts[sector] || 0) + 1
    })
    setSectorData(Object.keys(sCounts).map(s => ({ sector: s, count: sCounts[s] })))

    // Calculate Confidence Trend (Line - 6 Months)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const tMap = {}
    items.forEach(r => {
      const m = monthNames[new Date(r.createdAt).getMonth()]
      if (!tMap[m]) tMap[m] = { sum: 0, count: 0 }
      tMap[m].sum += r.confidence || 0
      tMap[m].count += 1
    })
    
    const tData = []
    const currMonth = new Date().getMonth()
    for (let i = 5; i >= 0; i--) {
      let mIndex = currMonth - i
      if (mIndex < 0) mIndex += 12
      const mName = monthNames[mIndex]
      tData.push({
        month: mName,
        score: tMap[mName] ? Math.round(tMap[mName].sum / tMap[mName].count) : 0
      })
    }
    setTrendData(tData)
  }, [reports])

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

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recommendation Mix</h3>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">Live</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={2}>
                  {pieData.length === 1 && pieData[0].name === 'No Data' ? (
                    <Cell fill="#334155" />
                  ) : (
                    <>
                      <Cell fill="#22d3ee" stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
                      <Cell fill="#6366f1" stroke="rgba(255,255,255,0.05)" strokeWidth={2} />
                    </>
                  )}
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
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#areaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                  <tr key={item.id} className="border-t border-white/5 bg-slate-950/40 hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{item.company}</td>
                    <td className="px-4 py-3 text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold tracking-wide ${item.recommendation === 'INVEST' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                        {item.recommendation}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full bg-cyan-400" style={{ width: `${item.confidence}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{item.confidence}%</span>
                      </span>
                    </td>
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
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="sector" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="url(#barGradient)" maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
