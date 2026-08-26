import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
  } catch {
    console.log('Error connecting to MongoDB');
    process.exit(1);
  }
};
