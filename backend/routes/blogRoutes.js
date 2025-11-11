import express from "express";
import multer from "multer";
import Blog from "../models/Blog.js";
import { storage } from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

// Create blog (anyone)
router.post("/", upload.single("image"), async(req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const blog = new Blog({
            title,
            content,
            author: author || "Anonymous",
            imageUrl: req.file.path,
        });

        await blog.save();
        res.json({ message: "Blog created", blog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create blog" });
    }
});

// Get all blogs
router.get("/", async(req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
});

// Get single blog
router.get("/:id", async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch blog" });
    }
});

// Update blog (admin only)
router.put("/update/:id", upload.single("image"), async(req, res) => {
    try {
        const { adminPassword, title, content, author } = req.body;
        if (adminPassword !== "admin123") return res.status(403).json({ message: "Not allowed" });

        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        blog.title = title;
        blog.content = content;
        blog.author = author;

        if (req.file) blog.imageUrl = req.file.path;

        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
});

// Delete blog (admin only)
router.delete("/delete/:id", async(req, res) => {
    try {
        const { adminPassword } = req.body;
        if (adminPassword !== "admin123") return res.status(403).json({ message: "Not allowed" });

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete blog" });
    }
});

export default router;