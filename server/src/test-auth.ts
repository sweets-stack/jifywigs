// server/test-auth.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Test query
    const User = mongoose.model('User');
    const count = await User.countDocuments();
    console.log(`📊 Total users in database: ${count}`);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Check:');
    console.log('1. MongoDB Atlas cluster is running');
    console.log('2. IP address is whitelisted in MongoDB Atlas');
    console.log('3. Connection string is correct');
  }
}

testConnection();