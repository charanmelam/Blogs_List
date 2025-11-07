const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Blog routes BEFORE listen
const blogRoutes = require("../backend/routes/blogRoutes.js");
app.use("/blogs", blogRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});