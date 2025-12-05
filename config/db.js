import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load .env explicitly from project root
dotenv.config({ path: path.resolve('./.env') });

console.log("USE_DB:", process.env.USE_DB);
console.log("LOCAL_DB:", process.env.LOCAL_DB);
console.log("ATLAS_DB:", process.env.ATLAS_DB);

export async function connectDB() {
  const db =
    process.env.USE_DB === "local"
      ? process.env.LOCAL_DB
      : process.env.ATLAS_DB;

  if (!db) {
    console.error("DB URI not found. Check your .env file!");
    process.exit(1);
  }

  try {
    await mongoose.connect(db);
    console.log("Connected to:", db);
  } catch (err) {
    console.error("DB connection error", err);
    process.exit(1);
  }
}
