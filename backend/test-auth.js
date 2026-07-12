import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-research-agent');
  
  // Clear user if exists
  await User.deleteOne({ email: 'test@example.com' });

  // 1. Create a user
  const user = new User({
    fullName: 'Test User',
    username: 'testuser123',
    email: 'test@example.com',
    password: 'password123'
  });
  
  console.log('Password before save:', user.password);
  await user.save();
  console.log('Password after save:', user.password);

  // 2. Fetch user
  const fetchedUser = await User.findOne({ email: 'test@example.com' }).select('+password');
  console.log('Fetched user password:', fetchedUser.password);

  // 3. Compare password
  const isMatch = await fetchedUser.comparePassword('password123');
  console.log('Password match:', isMatch);
  
  await mongoose.disconnect();
}

test().catch(console.error);
