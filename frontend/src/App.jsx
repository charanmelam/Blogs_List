import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import About from "./pages/About"; 
import Contact from "./pages/Contact";

export default function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); // ✅ update state instead of page reload
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About</Link> 
        <Link to="/contact">Contact</Link>

        {!currentUser && <Link to="/login">Admin Login</Link>}
        {currentUser?.role === "admin" && (
          <>
            <span className="user-badge">Hi {currentUser.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs currentUser={currentUser} />} />
        <Route path="/create" element={<CreateBlog currentUser={currentUser} />} />
        <Route path="/edit/:id" element={<EditBlog currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}