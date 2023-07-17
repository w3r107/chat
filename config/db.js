import mongoose from "mongoose";

export const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MONGODB ${conn.connection.host} `);
  } catch (error) {
    console.log(error);
  }
};
