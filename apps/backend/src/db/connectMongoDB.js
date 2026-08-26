import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch {
    console.log('Error connecting to MongoDB');
    process.exit(1);
  }
};
