import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiUser, FiSearch, FiX, FiCheck } from 'react-icons/fi'
import { adminApi } from '../services/adminApi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  const loadUsers = async () => {
    try {
      const response = await adminApi.getUsers()
      setUsers(response.data.users)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadUsers()
    }
  }, [currentUser])

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const { _id, fullName, email, role, username, newPassword } = editingUser
      const payload = { fullName, email, role, username }
      if (newPassword) payload.password = newPassword
      await adminApi.updateUser(_id, payload)
      toast.success('User updated successfully')
      setEditingUser(null)
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user')
    }
  }

  const handleDeleteUser = async () => {
    try {
      await adminApi.deleteUser(deletingUser._id)
      toast.success('User deleted successfully')
      setDeletingUser(null)
      loadUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    }
  }

  const filteredUsers = users.filter((u) => 
    (u.fullName || '').toLowerCase().includes(search.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.username || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">Control user roles, update details, or remove accounts.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 backdrop-blur-xl">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-200 outline-none w-full sm:w-48 placeholder-slate-500"
          />
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl overflow-x-auto">
        {loading ? (
          <div className="text-center py-10 text-slate-400">Loading users...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm font-medium text-slate-400">
                <th className="pb-4 font-medium pl-2">User</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Joined</th>
                <th className="pb-4 font-medium text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-300 overflow-hidden border border-cyan-500/20">
                          {u.profileImage ? (
                            <img src={u.profileImage} alt={u.fullName || 'User'} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-sm font-semibold">{(u.fullName || '??').substring(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{u.fullName || 'No Name'}</p>
                          <p className="text-xs text-slate-500">{u.email || 'No Email'}</p>
                          {u.username && <p className="text-xs text-slate-600">@{u.username}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${u.role === 'admin' ? 'border-indigo-400/20 bg-indigo-500/10 text-indigo-300' : 'border-slate-400/20 bg-slate-500/10 text-slate-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingUser({ ...u, newPassword: '' })}
                          className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                          title="Edit User"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeletingUser(u)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
                          title="Delete User"
                          disabled={currentUser._id === u._id} // Prevent deleting self
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Edit User</h3>
                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white transition">
                  <FiX size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={editingUser.fullName}
                    onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Username (Login ID)</label>
                  <input
                    type="text"
                    value={editingUser.username || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={editingUser.newPassword || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, newPassword: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/50 appearance-none"
                    disabled={currentUser._id === editingUser._id} // Prevent demoting self
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-2xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <FiTrash2 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Delete User?</h3>
              <p className="text-slate-400 text-sm mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{deletingUser.fullName}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletingUser(null)}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="flex-1 rounded-2xl bg-rose-500 py-3 text-sm font-semibold text-white hover:bg-rose-400 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
