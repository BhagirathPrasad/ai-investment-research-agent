import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ai-investment-research-agent-7a1f.onrender.com',
  timeout: 120000,
})

export async function analyzeCompany(companyName) {
  const response = await api.post('/api/analyze', { companyName })
  return response.data
}
