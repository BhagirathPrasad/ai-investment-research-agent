import { Router } from 'express'
import { body } from 'express-validator'
import User from '../models/User.js'
import { protect, adminOnly } from '../middleware/auth.js'
import { handleValidationErrors } from '../middleware/validate.js'

const router = Router()

// Get all users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ users })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' })
  }
})

// Update user
router.put(
  '/users/:id',
  protect,
  adminOnly,
  [
    body('fullName').optional().notEmpty().withMessage('Full name cannot be empty'),
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (req.body.fullName) user.fullName = req.body.fullName
      if (req.body.username) user.username = req.body.username
      if (req.body.email) user.email = req.body.email
      if (req.body.role) user.role = req.body.role
      if (req.body.password) user.password = req.body.password

      await user.save()

      const updatedUser = await User.findById(req.params.id).select('-password')
      res.json({ user: updatedUser, message: 'User updated successfully' })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email or Username already exists' })
      }
      res.status(500).json({ message: 'Error updating user' })
    }
  },
)

// Delete user
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' })
  }
})

export default router
