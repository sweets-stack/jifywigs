// update-admin.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://jifywigs_admin:xbtjvt9RwOtoxjk4@jifywigs.nkyabex.mongodb.net/jifywigs';

async function updateAdminRole() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Update the user's role
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@jifywigs.com' },
      { $set: { role: 'admin' } }
    );

    console.log('✅ Update result:', result);

    if (result.modifiedCount > 0) {
      console.log('✅ Successfully updated admin role!');
      
      // Verify the update
      const user = await mongoose.connection.db.collection('users').findOne(
        { email: 'admin@jifywigs.com' }
      );
      console.log('✅ Updated user:', {
        email: user.email,
        role: user.role,
        name: user.name
      });
    } else {
      console.log('⚠️ No user was updated. User might not exist or already has admin role.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

updateAdminRole();