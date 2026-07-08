import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit2, FiLock, FiTrash2, FiUser } from 'react-icons/fi'
import { authApi } from '../services/authApi'

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await authApi.getProfile()
        setUser(response.data.user)
      } catch {
        // ignore
      }
    }
    load()
  }, [])

  if (!user) return null

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-2xl font-semibold text-white">
            {user.profileImage ? <img src={user.profileImage} alt={user.fullName} className="h-full w-full rounded-full object-cover" /> : <FiUser />}
          </div>
          <div>
            <p className="text-sm text-cyan-300">Profile</p>
            <h2 className="text-2xl font-semibold text-white">{user.fullName}</h2>
            <p className="text-sm text-slate-400">@{user.username}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"><FiEdit2 /> Edit Profile</button>
          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"><FiLock /> Change Password</button>
          <button className="flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-300"><FiTrash2 /> Delete Account</button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          ['Email', user.email],
          ['Phone', user.phone || 'Not provided'],
          ['Joined', new Date(user.createdAt).toLocaleDateString()],
          ['Role', user.role],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.3rem] border border-white/10 bg-slate-950/50 p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
