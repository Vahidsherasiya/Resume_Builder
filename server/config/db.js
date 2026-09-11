import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/enhancv_resume', {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning]: Local MongoDB not active (${error.message}). Using in-memory fallback store.`);
    return false;
  }
};
