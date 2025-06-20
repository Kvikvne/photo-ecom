import mongoose from "mongoose";

export async function connectToMongoDB(): Promise<void> {
  const uri = process.env.MONGO_URI;
  const name = process.env.DB_NAME;

  if (!uri) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  try {
    await mongoose.connect(uri, {
      dbName: name
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export async function disconnectFromMongoDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("MongoDB disconnect error:", error);
    process.exit(1);
  }
}
