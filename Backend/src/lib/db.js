import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(` 🟢 MONGODB_CONNECTED SUCCESSFULLY: ${conn.connection.host}`)
  } catch (error) {
    console.error(` 🔴 Error CONNECTING to MONGODB: ${error}`)
  }
};
