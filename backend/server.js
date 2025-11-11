import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error:", err));

// API test route
app.get("/", (req, res) => {
    res.send("Backend is running ✅");
});


// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", authRoutes);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));