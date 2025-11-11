import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = "https://blogs-list-backend2-0.onrender.com/";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("author", blog.author);
    formData.append("adminPassword", "admin123");

    if (image) formData.append("image", image);

    try {
      await axios.put(`${backendURL}/api/blogs/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated!");
      navigate("/blogs");

    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Blog</h1>
      <p>Created: {new Date(blog.createdAt).toLocaleString()}</p>
      <p>Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>

      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          />
        </div>

        <div>
          <p>Current Image:</p>
          <img src={blog.imageUrl} width="200" alt="blog" />
        </div>

        <div>
          <label htmlFor="image">Change Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}