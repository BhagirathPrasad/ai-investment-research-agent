import { Router } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { body } from 'express-validator'
import User from '../models/User.js'
import { handleValidationErrors } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'

const router = Router()

const createToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'supersecret_fallback_key_123', { expiresIn: '7d' })

router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { fullName, username, email, phone, password, profileImage } = req.body

    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const user = await User.create({ fullName, username, email, phone, password, profileImage })
    const token = createToken(user)

    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
      secure: process.env.NODE_ENV === 'production' 
    })
    res.status(201).json({ user: { id: user._id, fullName: user.fullName, username: user.username, email: user.email, phone: user.phone, profileImage: user.profileImage, role: user.role }, token })
  },
)

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = createToken(user)
    res.cookie('token', token, { 
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
      secure: process.env.NODE_ENV === 'production' 
    })
    res.json({ user: { id: user._id, fullName: user.fullName, username: user.username, email: user.email, phone: user.phone, profileImage: user.profileImage, role: user.role }, token })
  },
)

router.post('/logout', (_req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

router.post('/forgot-password', [body('email').isEmail().withMessage('Valid email is required')], handleValidationErrors, async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: 'No user found with that email' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  user.resetPasswordToken = token
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 15
  await user.save()

  res.json({ message: 'Reset link generated', token })
})

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' })
  }

  user.password = password
  user.resetPasswordToken = null
  user.resetPasswordExpires = null
  await user.save()
  res.json({ message: 'Password updated successfully' })
})

router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user })
})

export default router
