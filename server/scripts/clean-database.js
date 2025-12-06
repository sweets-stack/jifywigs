// scripts/clean-database.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jifywigs_admin:xbtjvt9RwOtoxjk4@jifywigs.nkyabex.mongodb.net/jifywigs?retryWrites=true&w=majority';

async function cleanDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Clear each collection
    for (let collection of collections) {
      await mongoose.connection.db.collection(collection.name).deleteMany({});
      console.log(`✅ Cleared collection: ${collection.name}`);
    }
    
    console.log('\n✅ Database cleaned successfully!');
    console.log('All collections have been emptied.');
    console.log('\n⚠️  Warning: All data has been deleted!');
    console.log('Run "npm run init-db" to repopulate with sample data.');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

cleanDatabase();