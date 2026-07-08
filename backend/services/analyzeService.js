import dotenv from 'dotenv'

dotenv.config()

export async function analyzeCompanyService(companyName) {
  const sample = {
    company: companyName,
    recommendation: Math.random() > 0.5 ? 'INVEST' : 'PASS',
    confidence: 78 + Math.floor(Math.random() * 16),
    analysis: {
      overview: `${companyName} operates in a dynamic market with strong competitive positioning and evolving growth opportunities.`,
      industry: 'Technology / Consumer / Industrial',
      marketCap: '$100B+',
      revenue: '$10B+',
      profit: '$1B+',
      ceo: 'Leadership Team',
      strengths: 'Strong brand, healthy margin trajectory, and product differentiation.',
      weaknesses: 'Exposure to cyclical demand and pricing pressure in select segments.',
      opportunities: 'Expansion into adjacent markets and AI-led productivity gains.',
      threats: 'Increased competition, regulation, and macroeconomic volatility.',
      financialHealth: 'Solid',
      riskScore: 'Medium',
      growthScore: 'High',
      summary: 'The company presents a balanced risk-reward profile with favorable long-term prospects.',
      reasoning: 'This recommendation blends current financial performance, macro risks, and strategic positioning into a concise analyst-style conclusion.',
    },
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(sample), 1400)
  })
}
