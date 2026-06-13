import mongoose from "mongoose";
import "dotenv/config";

await mongoose.connect(process.env.DATABASE_URL);
await mongoose.connection.db
  .collection("auths")
  .createIndex({ email: 1 }, { unique: true });
console.log("recreated");
process.exit();
