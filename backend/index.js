import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import analyzeRouter from './routes/analyze.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import reportRouter from './routes/report.js'
import adminRouter from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'AI Investment Research Agent API is running.' })
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/report', reportRouter)
app.use('/api/admin', adminRouter)
app.use('/api', analyzeRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
})

await connectDB()
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
})
