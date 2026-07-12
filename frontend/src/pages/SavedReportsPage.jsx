import { useAppContext } from '../context/AppContext'
import { FiDownload, FiEye, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function SavedReportsPage() {
  const { reports, deleteReport, setCurrentReport } = useAppContext()
  const navigate = useNavigate()

  const handleViewReport = (report) => {
    setCurrentReport(report)
    navigate('/report')
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-cyan-300">Archive</p>
          <h2 className="text-2xl font-semibold text-white">Saved Reports</h2>
        </div>
        <input placeholder="Search reports" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-200 outline-none sm:w-72" />
      </div>

      <div className="mt-6 grid gap-4">
        {reports.length > 0 ? reports.map((report) => (
          <div key={report.id} className="flex flex-col gap-4 rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">{report.company}</p>
              <p className="mt-1 text-sm text-slate-400">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-sm ${report.recommendation === 'INVEST' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                {report.recommendation}
              </span>
              <button onClick={() => handleViewReport(report)} className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10 transition">
                <FiEye />
              </button>
              <button className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-200">
                <FiDownload />
              </button>
              <button onClick={() => deleteReport(report.id)} className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-2 text-rose-300">
                <FiTrash2 />
              </button>
            </div>
          </div>
        )) : <div className="rounded-[1.3rem] border border-dashed border-white/10 p-8 text-center text-slate-400">No saved reports yet.</div>}
      </div>
    </div>
  )
}
