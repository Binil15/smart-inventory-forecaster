import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setError("");
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      onLogin(res.data.role);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.detail || "Invalid credentials");
      } else if (err.request) {
        // Request made but no response
        setError("Cannot connect to server. Please check your connection.");
      } else {
        // Something else happened
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        }}
    >
      <div className="login-glass">
        <h1 className="login-title">Smart Inventory</h1>
        <p className="login-subtitle">Forecasting & Optimisation System</p>

        <form onSubmit={login}>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            ACCESS DASHBOARD
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}

        <p className="login-footer">
          Roles: <b>admin</b> / <b>clerk</b>
        </p>
      </div>
    </div>
  );
}
