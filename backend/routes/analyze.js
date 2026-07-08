import { Router } from 'express'
import { analyzeCompanyService } from '../services/analyzeService.js'

const router = Router()

router.post('/analyze', async (req, res, next) => {
  try {
    const { companyName } = req.body

    if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
      return res.status(400).json({ message: 'companyName is required.' })
    }

    const result = await analyzeCompanyService(companyName.trim())
    return res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
