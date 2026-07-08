import { Router } from 'express'
import { body } from 'express-validator'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

router.get('/profile', protect, async (req, res) => {
  res.json({ user: req.user })
})

router.put(
  '/profile',
  protect,
  [
    body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
    body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('phone').optional().isString(),
  ],
  handleValidationErrors,
  async (req, res) => {
    const updates = { ...req.body }
    delete updates.email
    delete updates.password

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
    res.json({ user })
  },
)

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()
    res.json({ message: 'Password updated successfully' })
  },
)

router.delete('/delete', protect, async (req, res) => {
  await User.findByIdAndDelete(req.user._id)
  res.clearCookie('token')
  res.json({ message: 'Account deleted successfully' })
})

export default router
