export default function SettingsPage() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Settings</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-5">
          <p className="text-sm text-cyan-300">Appearance</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Theme</h3>
          <p className="mt-2 text-sm text-slate-400">Switch between light and dark modes for a premium experience.</p>
        </div>
        <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-5">
          <p className="text-sm text-cyan-300">Integrations</p>
          <h3 className="mt-2 text-lg font-semibold text-white">API Settings</h3>
          <p className="mt-2 text-sm text-slate-400">Connect Gemini, OpenAI, or Tavily endpoints from your environment.</p>
        </div>
      </div>
    </div>
  )
}
