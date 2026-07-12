import dotenv from 'dotenv'

dotenv.config()

export async function analyzeCompanyService(companyName) {
  const isGood = Math.random() > 0.4
  const company = companyName.toUpperCase()

  // Generate realistic mock stock data
  const basePrice = 100 + Math.random() * 400
  const isUp = Math.random() > 0.4
  const changePercent = (Math.random() * 5 * (isUp ? 1 : -1))
  const changeAmount = basePrice * (changePercent / 100)
  const currentPrice = basePrice + changeAmount
  
  // Generate intraday chart data (mocking a day's trading)
  const chartData = []
  let currentSimPrice = basePrice
  for (let i = 0; i < 30; i++) {
    currentSimPrice = currentSimPrice + (Math.random() * 4 - 2)
    chartData.push({
      time: `10:${(i * 2).toString().padStart(2, '0')} AM`,
      price: Number(currentSimPrice.toFixed(2))
    })
  }
  chartData.push({ time: 'Now', price: Number(currentPrice.toFixed(2)) })

  const sample = {
    company: companyName,
    recommendation: isGood ? 'INVEST' : 'PASS',
    confidence: isGood ? (75 + Math.floor(Math.random() * 20)) : (40 + Math.floor(Math.random() * 30)),
    
    // New Stock Data Object
    stockData: {
      currentPrice: currentPrice.toFixed(2),
      changeAmount: changeAmount.toFixed(2),
      changePercent: changePercent.toFixed(2),
      isUp,
      open: (basePrice - Math.random() * 2).toFixed(2),
      high: (Math.max(basePrice, currentPrice) + Math.random() * 5).toFixed(2),
      low: (Math.min(basePrice, currentPrice) - Math.random() * 5).toFixed(2),
      volume: (10 + Math.random() * 40).toFixed(2) + 'M',
      week52High: (currentPrice * 1.3).toFixed(2),
      chartData
    },

    analysis: {
      overview: `${companyName} operates in a rapidly evolving market. Our analysis incorporates the Feroldi framework to evaluate their moat, financial health, and risks.`,
      industry: 'Technology / Consumer',
      marketCap: '$100B+',
      ceo: 'Leadership Team',
      
      // Business details (If you don't know the business)
      business: {
        products: 'High-margin software, enterprise cloud services, and recurring subscriptions.',
        moat: 'Strong network effects and high switching costs create a durable competitive advantage.',
        trend: 'Growing. The total addressable market is expanding by 15% CAGR.',
        management: 'Experienced leadership with a track record of disciplined capital allocation.',
      },

      // Financial Statements
      financials: {
        revenueGrowth: isGood ? '+24% YoY' : '+4% YoY',
        profitMargins: isGood ? '28% (Expanding)' : '9% (Contracting)',
        cash: '$15.2B',
        debt: '$4.1B',
        equity: '$42.5B',
        freeCashFlow: '$8.4B (Cash from Ops - CapEX)',
      },

      // Key Ratios
      ratios: {
        roe: isGood ? '22%' : '12%', // Feroldi target: >15%
        roePass: isGood,
        netMargin: isGood ? '18%' : '7%', // Feroldi target: >10%
        netMarginPass: isGood,
      },

      // Risks
      risks: {
        concentration: 'Low. No single customer accounts for more than 5% of revenue.',
        competition: 'High. Deep-pocketed tech giants are entering adjacent markets.',
        disruption: 'Medium. AI advancements could commoditize lower-tier offerings.',
      },

      // Valuation
      valuation: {
        peRatio: isGood ? '24.5x' : '45.0x',
        pfcfRatio: isGood ? '20.1x' : '55.2x',
      },

      summary: isGood 
        ? 'The company passes all key Feroldi checks: high margins, strong ROE, and reasonable valuation relative to growth.' 
        : 'The company fails key financial ratio checks (ROE/Margins) and carries significant valuation risks.',
      reasoning: 'Synthesized using the Feroldi investment framework, evaluating financials, ratios, risks, and business quality.',
    },
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(sample), 2000)
  })
}
