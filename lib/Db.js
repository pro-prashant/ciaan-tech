
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
let isConnected = false;

const connectionDb = async () => {
  if (!MONGO_URL) {
    console.log("❌ MONGO_URL is not defined in environment variables.");
    throw new Error("MONGO_URL is not defined");
  }

  if (isConnected || mongoose.connection.readyState >= 1) {
    console.log("ℹ️ MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5-second timeout
    });

    isConnected = true;
    console.log("✅ MongoDB successfully connected.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // ✅ throw to stop execution if DB fails
  }
};

export default connectionDb;
