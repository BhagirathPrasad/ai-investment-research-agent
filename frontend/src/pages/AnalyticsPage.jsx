import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'
import { FiTrendingUp, FiActivity, FiUsers } from 'react-icons/fi'

const areaData = [
  { name: 'Mon', queries: 12 },
  { name: 'Tue', queries: 19 },
  { name: 'Wed', queries: 28 },
  { name: 'Thu', queries: 22 },
  { name: 'Fri', queries: 35 },
  { name: 'Sat', queries: 42 },
  { name: 'Sun', queries: 38 },
]

const barData = [
  { name: 'AI', value: 45 },
  { name: 'Web3', value: 30 },
  { name: 'SaaS', value: 55 },
  { name: 'Finance', value: 25 },
]

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Detailed breakdown of research queries and trends.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total Queries', value: '1,248', icon: FiActivity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Avg Confidence', value: '82%', icon: FiTrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Active Researchers', value: '12', icon: FiUsers, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <h3 className="mb-6 text-lg font-semibold text-white">Weekly Query Volume</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="queries" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorQueries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <h3 className="mb-6 text-lg font-semibold text-white">Top Research Sectors</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                />
                <Bar dataKey="value" fill="#818cf8" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
