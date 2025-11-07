import './Blog.css';
import { useState } from 'react';

function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);    // state to hold list of blog entries

  const handleSub = (e) => {
    e.preventDefault();

    // create new blog object
    const newBlog = {
      id: Date.now(),    // unique ID
      title: title,
      content: content
    };

    // add to blogs state, using a new array
    setBlogs(prevBlogs => [...prevBlogs, newBlog]);

    // clear input fields for next blog
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={handleSub}>
        <label className='inte'>Title: </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br />
        <label className='inte'>Content: </label>
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Blog;
