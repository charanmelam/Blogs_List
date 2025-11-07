const mongoose = require("mongoose"); // import mongoose

const blogSchema = new mongoose.Schema( // create schema (blueprint)
    {
        title: { type: String, required: true },
        content: { type: String, required: true }, // blog content
        author: String, // blog author
        image: String // image URL
    }, { timestamps: true } // auto createdAt + updatedAt
);

module.exports = mongoose.model("Blog", blogSchema); // export model