import { Router } from 'express'
import { body } from 'express-validator'
import InvestmentReport from '../models/InvestmentReport.js'
import { protect } from '../middleware/auth.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.post(
  '/create',
  protect,
  [
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('recommendation').isIn(['INVEST', 'PASS']).withMessage('Recommendation must be INVEST or PASS'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const report = await InvestmentReport.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json({ report })
  },
)

router.get('/', protect, async (req, res) => {
  const reports = await InvestmentReport.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
  res.json({ reports })
})

router.put('/:id', protect, async (req, res) => {
  const report = await InvestmentReport.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body, { new: true })
  if (!report) return res.status(404).json({ message: 'Report not found' })
  res.json({ report })
})

router.delete('/:id', protect, async (req, res) => {
  const report = await InvestmentReport.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
  if (!report) return res.status(404).json({ message: 'Report not found' })
  res.json({ message: 'Report deleted successfully' })
})

export default router
