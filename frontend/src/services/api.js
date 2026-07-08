import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: 120000,
})

export async function analyzeCompany(companyName) {
  const response = await api.post('/api/analyze', { companyName })
  return response.data
}
