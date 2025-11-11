import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const backendURL = "https://heathylifeblogbackend.onrender.com";

export default function Blogs({ currentUser }) {  // ✅ Accept currentUser as prop
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${backendURL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await fetch(`${backendURL}/api/blogs/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword: "admin123" }),
      });

      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="blogs-container">
      <div className="top-row">
        <h1>All Blogs</h1>
        <Link to="/create" className="create-btn">+ Create Blog</Link>
      </div>

      {blogs.map((blog) => (
        <div className="blog-card" key={blog._id}>
          <img src={blog.imageUrl} alt="blog" className="blog-img" />
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <small><b>By:</b> {blog.author}</small>
          <p className="date">Posted on: {new Date(blog.createdAt).toLocaleString()}</p>

          {currentUser?.role === "admin" && (
            <div className="btn-row">
              <button
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="edit-btn"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}