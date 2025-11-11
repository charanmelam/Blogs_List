import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // ✅ Add this

const backendURL = "https://blogs-list-backend-zaoz.onrender.com";

export default function CreateBlog() {
  const navigate = useNavigate();  // ✅ Add this

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("Anonymous");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("image", image);

    try {
      await axios.post(`${backendURL}/api/blogs`, formData);

      alert("Blog created!");
      navigate("/blogs");     // ✅ Redirect to frontend, not backend

    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <div className="form-container">
      <center>
        <h1>Create Blog</h1>
      </center>

      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}