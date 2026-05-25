const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prabhat-classes', {
      // MongoDB driver handles these automatically now
    });
    
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error:', err.message);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Disconnected from database');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] Reconnected to database');
    });
    
    return conn;
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error.message);
    // Don't exit process, let the app handle gracefully
    throw error;
  }
};

module.exports = connectDB;
