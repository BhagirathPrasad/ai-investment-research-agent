import { useEffect, useState } from 'react'
import { authApi } from '../services/authApi'

export default function ReportsPage() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const response = await authApi.getReports()
        setReports(response.data.reports || [])
      } catch {
        // ignore
      }
    }
    load()
  }, [])

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Saved Reports</h2>
      <div className="mt-6 grid gap-4">
        {reports.length > 0 ? reports.map((report) => (
          <div key={report._id} className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">{report.companyName}</p>
                <p className="text-sm text-slate-400">{new Date(report.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm ${report.recommendation === 'INVEST' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                {report.recommendation}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300">{report.summary}</p>
          </div>
        )) : <div className="rounded-[1.3rem] border border-dashed border-white/10 p-8 text-center text-slate-400">No reports saved yet.</div>}
      </div>
    </div>
  )
}
