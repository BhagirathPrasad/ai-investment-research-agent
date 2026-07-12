import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

async function createAdmin() {
  try {
    await mongoose.connect('mongodb+srv://bhagirath:Qiv5UI7YvPMLJUPE@cluster0.6teewwj.mongodb.net/?appName=Cluster0')
    const existing = await User.findOne({ email: 'admin@ai-invest.com' })
    if (!existing) {
      await User.create({
        fullName: 'System Admin',
        username: 'admin',
        email: 'admin@ai-invest.com',
        phone: '1234567890',
        password: 'adminpassword123',
        role: 'admin'
      })
      console.log('Admin created')
    } else {
      existing.role = 'admin'
      existing.password = 'adminpassword123'
      await existing.save()
      console.log('Admin updated')
    }
  } catch (error) {
    console.error(error)
  }
  process.exit(0)
}

createAdmin()
