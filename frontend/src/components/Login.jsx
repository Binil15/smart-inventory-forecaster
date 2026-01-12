import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      console.log("Attempting login to:", process.env.REACT_APP_API_URL || "https://smart-inventory-forecaster.onrender.com/api");
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      onLogin(res.data.role);
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      console.error("Error request:", err.request);
      console.error("Error response:", err.response);
      
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError("Request timeout - Server took too long to respond. Render free tier may be spinning up. Please try again.");
      } else if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError("Network error - Cannot reach server. Check your internet connection and verify the backend URL.");
      } else if (err.response) {
        // Server responded with error
        setError(err.response.data?.detail || `Server error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. The backend may be down or unreachable.");
      } else {
        // Something else happened
        setError(`Error: ${err.message || "An unexpected error occurred. Please try again."}`);
      }
    } finally {
      setLoading(false);
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

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "CONNECTING..." : "ACCESS DASHBOARD"}
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
