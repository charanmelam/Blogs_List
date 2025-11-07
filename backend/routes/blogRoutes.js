const express = require("express"); // import express
const Blog = require("../models/Blog.js"); // import Blog model
const router = express.Router(); // create router

router.get("/", async(req, res) => { // GET all blogs
    const blogs = await Blog.find(); // find all blogs from DB
    res.json(blogs); // send blogs as response
});

router.post("/", async(req, res) => { // POST create a blog
    const newBlog = new Blog(req.body); // create blog object from request body
    await newBlog.save(); // save to DB
    res.json({ message: "Blog Created Successfully" });
});

router.put("/:id", async(req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id, // get the id from URL
        req.body, // new data to update
        { new: true } // return updated data instead of old one
    );

    if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updatedBlog);
});

router.delete("/:id", async(req, res) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
});

module.exports = router; // export router