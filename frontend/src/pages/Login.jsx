import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL = "https://blogs-list-backend2-0.onrender.com/";

export default function Login({ setCurrentUser }) {  // ✅ Accept setCurrentUser from App
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/api/users/login`, {
        email,
        password,
      });

      // Save user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      // Update App state immediately
      setCurrentUser(res.data.user);

      alert("Admin login successful!");
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <center>
        <h2>Admin Login</h2><br />
      </center>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}