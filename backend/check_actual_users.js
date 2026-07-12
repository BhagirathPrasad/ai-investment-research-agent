import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-research-agent';

mongoose.connect(uri);

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

async function run() {
  const users = await User.find({}).lean();
  console.log(JSON.stringify(users, null, 2));
  mongoose.disconnect();
}
run();
