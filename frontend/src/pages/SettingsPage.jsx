import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiEye, FiEyeOff, FiMoon, FiSun, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const [theme, setTheme] = useState('dark')
  const [showKeys, setShowKeys] = useState(false)
  const [apiKeys, setApiKeys] = useState({
    gemini: '',
    openai: '',
    tavily: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  // Load keys from localStorage on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('ai_invest_api_keys')
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys))
      } catch (e) {
        console.error('Failed to parse API keys')
      }
    }
  }, [])

  const handleKeyChange = (provider, value) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }))
  }

  const handleSaveKeys = async () => {
    setIsSaving(true)
    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800))
    localStorage.setItem('ai_invest_api_keys', JSON.stringify(apiKeys))
    setIsSaving(false)
    toast.success('API Settings saved successfully!')
  }

  const handleClearKeys = () => {
    setApiKeys({ gemini: '', openai: '', tavily: '' })
    localStorage.removeItem('ai_invest_api_keys')
    toast.success('API Settings cleared')
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      toast('Light mode is temporarily disabled to preserve the premium aesthetic.', { icon: '🌙', style: { borderRadius: '10px', background: '#1e293b', color: '#fff' } })
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400 text-sm mb-6">Manage your preferences and API integrations.</p>
        
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* APPEARANCE SECTION */}
          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <FiMoon size={16} />
                </span>
                <p className="text-sm font-semibold text-cyan-300 tracking-wide uppercase">Appearance</p>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">Interface Theme</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Switch between light and dark modes for a personalized, premium experience.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <FiMoon className="text-indigo-400" size={20} /> : <FiSun className="text-amber-400" size={20} />}
                <div>
                  <p className="text-white font-medium">Dark Mode Active</p>
                  <p className="text-xs text-slate-400">Recommended for eye comfort</p>
                </div>
              </div>
              
              <button 
                onClick={toggleTheme}
                className="relative inline-flex h-7 w-12 items-center rounded-full bg-cyan-500 transition-colors"
              >
                <span className="translate-x-6 inline-block h-5 w-5 transform rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>

          {/* INTEGRATIONS SECTION */}
          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <span className="font-bold text-sm">API</span>
              </span>
              <p className="text-sm font-semibold text-purple-300 tracking-wide uppercase">Integrations</p>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">API Settings</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Connect your own AI endpoints to bypass rate limits and enable advanced agent features.
            </p>

            <div className="mt-6 space-y-4 flex-1">
              {/* Gemini Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Gemini API Key</label>
                <div className="relative">
                  <input
                    type={showKeys ? 'text' : 'password'}
                    value={apiKeys.gemini}
                    onChange={(e) => handleKeyChange('gemini', e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>
              
              {/* OpenAI Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">OpenAI API Key</label>
                <div className="relative">
                  <input
                    type={showKeys ? 'text' : 'password'}
                    value={apiKeys.openai}
                    onChange={(e) => handleKeyChange('openai', e.target.value)}
                    placeholder="sk-..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
              
              {/* Tavily Input */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tavily Search API Key</label>
                <div className="relative">
                  <input
                    type={showKeys ? 'text' : 'password'}
                    value={apiKeys.tavily}
                    onChange={(e) => handleKeyChange('tavily', e.target.value)}
                    placeholder="tvly-..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                  <button 
                    onClick={() => setShowKeys(!showKeys)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showKeys ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleClearKeys}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
              >
                <FiTrash2 size={14} />
                Clear
              </button>
              <button
                onClick={handleSaveKeys}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-70"
              >
                {isSaving ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <FiSave size={16} />
                )}
                {isSaving ? 'Saving...' : 'Save Keys'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
