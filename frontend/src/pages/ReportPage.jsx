import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { FiDownload, FiTrendingUp, FiShield, FiBriefcase, FiBarChart2, FiDollarSign, FiAlertCircle, FiCheck, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { useAppContext } from '../context/AppContext'

export default function ReportPage() {
  const { currentReport } = useAppContext()

  if (!currentReport) {
    return <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-8 text-slate-300">No report available yet. Run a new analysis to generate one.</div>
  }

  // Fallback to old format if the report is old, or use new format
  const analysis = currentReport.analysis || {}
  const business = analysis.business || {}
  const financials = analysis.financials || {}
  const ratios = analysis.ratios || {}
  const risks = analysis.risks || {}
  const valuation = analysis.valuation || {}

  // Fallback stock data generator for older saved reports
  let stockData = currentReport.stockData
  if (!stockData) {
    const basePrice = 100 + Math.random() * 400
    const isUp = Math.random() > 0.4
    const changePercent = (Math.random() * 5 * (isUp ? 1 : -1))
    const changeAmount = basePrice * (changePercent / 100)
    const currentPrice = basePrice + changeAmount
    
    const chartData = []
    let currentSimPrice = basePrice
    for (let i = 0; i < 30; i++) {
      currentSimPrice = currentSimPrice + (Math.random() * 4 - 2)
      chartData.push({
        time: `10:${(i * 2).toString().padStart(2, '0')} AM`,
        price: Number(currentSimPrice.toFixed(2))
      })
    }
    chartData.push({ time: 'Now', price: Number(currentPrice.toFixed(2)) })

    stockData = {
      currentPrice: currentPrice.toFixed(2),
      changeAmount: changeAmount.toFixed(2),
      changePercent: changePercent.toFixed(2),
      isUp,
      open: (basePrice - Math.random() * 2).toFixed(2),
      high: (Math.max(basePrice, currentPrice) + Math.random() * 5).toFixed(2),
      low: (Math.min(basePrice, currentPrice) - Math.random() * 5).toFixed(2),
      volume: (10 + Math.random() * 40).toFixed(2) + 'M',
      week52High: (currentPrice * 1.3).toFixed(2),
      chartData
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-cyan-300">Feroldi Investment Framework</p>
          <h2 className="text-3xl font-bold text-white uppercase">{currentReport.company}</h2>
          <p className="mt-2 text-slate-400 max-w-2xl">{analysis.overview || 'AI-generated research summary.'}</p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300 transition">
          <FiDownload /> Export PDF
        </button>
      </div>

      {/* Stock Market Data */}
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">{stockData.currencySymbol || '$'}{stockData.currentPrice}</h1>
            <p className={`mt-2 flex items-center text-lg font-medium ${stockData.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stockData.isUp ? <FiArrowUp className="mr-1" /> : <FiArrowDown className="mr-1" />}
              {stockData.isUp ? '+' : ''}{stockData.changePercent}% 
              ({stockData.isUp ? '+' : '-'}{stockData.currencySymbol || '$'}{Math.abs(stockData.changeAmount).toFixed(2)}) Today
            </p>
          </div>
          <div className="text-sm text-slate-400">
            Closed: Today, 4:00:00 PM UTC-4 • USD
          </div>
        </div>

        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stockData.chartData}>
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={stockData.isUp ? '#34d399' : '#fb7185'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={stockData.isUp ? '#34d399' : '#fb7185'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff' }}
                itemStyle={{ color: stockData.isUp ? '#34d399' : '#fb7185' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={stockData.isUp ? '#34d399' : '#fb7185'} 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorStock)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-sm text-slate-400">Open</p>
            <p className="mt-1 font-semibold text-white">{stockData.currencySymbol || '$'}{stockData.open}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">High</p>
            <p className="mt-1 font-semibold text-white">{stockData.currencySymbol || '$'}{stockData.high}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Low</p>
            <p className="mt-1 font-semibold text-white">{stockData.currencySymbol || '$'}{stockData.low}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Vol</p>
            <p className="mt-1 font-semibold text-white">{stockData.volume}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">52-wk High</p>
            <p className="mt-1 font-semibold text-white">{stockData.currencySymbol || '$'}{stockData.week52High}</p>
          </div>
        </div>
      </div>

      {/* Main Grid 1: Business & AI Decision */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* Business Deep Dive */}
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"><FiBriefcase /></div>
            <div>
              <p className="text-sm text-slate-400">Step 1: Read about the business</p>
              <h3 className="text-xl font-semibold text-white">Business Overview</h3>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-cyan-300">Products & Services</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{business.products || 'Data missing'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-cyan-300">Competitive Advantage</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{business.moat || 'Data missing'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-cyan-300">Industry Trend</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{business.trend || 'Data missing'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-cyan-300">Management</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{business.management || analysis.ceo || 'Data missing'}</p>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl flex flex-col">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-300"><FiBarChart2 /></div>
            <div>
              <p className="text-sm text-slate-400">Final Decision</p>
              <h3 className="text-xl font-semibold text-white">AI Recommendation</h3>
            </div>
          </div>
          <div className={`mt-6 flex-1 flex flex-col justify-center rounded-[1.3rem] border ${currentReport.recommendation === 'INVEST' ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-emerald-900/10' : 'border-rose-500/30 bg-gradient-to-br from-rose-500/20 to-rose-900/10'} p-6 text-center`}>
            <h1 className={`text-5xl font-black tracking-widest ${currentReport.recommendation === 'INVEST' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {currentReport.recommendation}
            </h1>
            <p className="mt-4 text-sm font-medium text-slate-300">Confidence Score: <span className="text-white font-bold">{currentReport.confidence}%</span></p>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>

      </div>

      {/* Grid 2: Financials & Ratios */}
      <div className="grid gap-6 xl:grid-cols-2">
        
        {/* Financial Statements */}
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300"><FiDollarSign /></div>
            <div>
              <p className="text-sm text-slate-400">Step 2: Financial Statements</p>
              <h3 className="text-xl font-semibold text-white">Financial Health</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <h4 className="text-sm font-bold text-slate-200 mb-3 border-b border-white/5 pb-2">Income Statement</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-400">Revenue Growth</p><p className="font-semibold text-white mt-1">{financials.revenueGrowth || analysis.revenue || 'N/A'}</p></div>
                <div><p className="text-xs text-slate-400">Profit Margins</p><p className="font-semibold text-white mt-1">{financials.profitMargins || analysis.profit || 'N/A'}</p></div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <h4 className="text-sm font-bold text-slate-200 mb-3 border-b border-white/5 pb-2">Balance Sheet</h4>
              <div className="grid grid-cols-3 gap-4">
                <div><p className="text-xs text-slate-400">Cash</p><p className="font-semibold text-white mt-1">{financials.cash || 'N/A'}</p></div>
                <div><p className="text-xs text-slate-400">Debt</p><p className="font-semibold text-white mt-1">{financials.debt || 'N/A'}</p></div>
                <div><p className="text-xs text-slate-400">Equity</p><p className="font-semibold text-white mt-1">{financials.equity || 'N/A'}</p></div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <h4 className="text-sm font-bold text-slate-200 mb-3 border-b border-white/5 pb-2">Cashflow Statement</h4>
              <div><p className="text-xs text-slate-400">Free Cash Flow</p><p className="font-semibold text-white mt-1">{financials.freeCashFlow || 'N/A'}</p></div>
            </div>
          </div>
        </div>

        {/* Ratios & Valuation */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-300"><FiTrendingUp /></div>
              <div>
                <p className="text-sm text-slate-400">Step 3: Evaluate</p>
                <h3 className="text-xl font-semibold text-white">Key Ratios</h3>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-sm text-slate-400">ROE (Target &gt;15%)</p>
                  <p className="mt-1 text-2xl font-bold text-white">{ratios.roe || 'N/A'}</p>
                </div>
                {ratios.roePass !== undefined && (
                  <div className={`absolute top-0 right-0 h-full w-2 ${ratios.roePass ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                )}
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-sm text-slate-400">Net Margin (Target &gt;10%)</p>
                  <p className="mt-1 text-2xl font-bold text-white">{ratios.netMargin || 'N/A'}</p>
                </div>
                {ratios.netMarginPass !== undefined && (
                  <div className={`absolute top-0 right-0 h-full w-2 ${ratios.netMarginPass ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-fuchsia-500/10 p-3 text-fuchsia-300"><FiBarChart2 /></div>
              <div>
                <p className="text-sm text-slate-400">Step 5: Valuation</p>
                <h3 className="text-xl font-semibold text-white">Valuation Ratios</h3>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">P/E Ratio</p>
                <p className="mt-1 text-xl font-bold text-white">{valuation.peRatio || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-400">P/FCF Ratio</p>
                <p className="mt-1 text-xl font-bold text-white">{valuation.pfcfRatio || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid 3: Risks */}
      <div className="rounded-[1.5rem] border border-rose-500/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-2xl bg-rose-500/10 p-3 text-rose-300"><FiAlertCircle /></div>
          <div>
            <p className="text-sm text-slate-400">Step 4: Key Risks</p>
            <h3 className="text-xl font-semibold text-white">Risk Evaluation</h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
            <h4 className="font-semibold text-rose-300">Concentration Risk</h4>
            <p className="mt-2 text-sm text-slate-300">{risks.concentration || analysis.weaknesses || 'N/A'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
            <h4 className="font-semibold text-orange-300">Competition Risk</h4>
            <p className="mt-2 text-sm text-slate-300">{risks.competition || analysis.threats || 'N/A'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
            <h4 className="font-semibold text-amber-300">Disruption Risk</h4>
            <p className="mt-2 text-sm text-slate-300">{risks.disruption || 'N/A'}</p>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
