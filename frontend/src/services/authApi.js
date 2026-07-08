import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
  timeout: 120000,
})

export const authApi = {
  login: (payload) => api.post('/api/auth/login', payload),
  register: (payload) => api.post('/api/auth/register', payload),
  logout: () => api.post('/api/auth/logout'),
  forgotPassword: (payload) => api.post('/api/auth/forgot-password', payload),
  resetPassword: (payload) => api.post('/api/auth/reset-password', payload),
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (payload) => api.put('/api/user/profile', payload),
  changePassword: (payload) => api.put('/api/user/change-password', payload),
  deleteAccount: () => api.delete('/api/user/delete'),
  getReports: () => api.get('/api/report'),
  createReport: (payload) => api.post('/api/report/create', payload),
  updateReport: (id, payload) => api.put(`/api/report/${id}`, payload),
  deleteReport: (id) => api.delete(`/api/report/${id}`),
}

export default api
