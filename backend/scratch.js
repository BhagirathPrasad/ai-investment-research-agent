import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = 'mongodb+srv://bhagirath:Qiv5UI7YvPMLJUPE@cluster0.6teewwj.mongodb.net/?appName=Cluster0'

async function check() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    const db = mongoose.connection.db
    const collections = await db.collections()
    for (const c of collections) {
      const count = await c.countDocuments()
      console.log(`Collection ${c.collectionName}: ${count} documents`)
      if (c.collectionName === 'investmentreports') {
        const docs = await c.find().toArray()
        console.log('Reports:', docs)
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
}

check()
