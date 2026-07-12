import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-investment-research-agent-7a1f.onrender.com',
  withCredentials: true,
  timeout: 60000,
})

export const adminApi = {
  getUsers: () => api.get('/api/admin/users'),
  updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
}
