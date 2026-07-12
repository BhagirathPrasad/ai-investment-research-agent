import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

async function promote() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-research')
  const result = await User.updateMany({}, { role: 'admin' })
  console.log('Promoted users:', result)
  process.exit(0)
}

promote()
