import dotenv from "dotenv";
dotenv.config();
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]); // ✅ force Google DNS for Node's resolver
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./src/routers/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3030;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://contact-form-project-xi.vercel.app",
    ],
    credentials: true,
  }),
);

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
// app.use(cors);

// ROUTING SECTION
app.use("/api/v1/", authRoutes);

// CONNECTING TO DATABASE
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
