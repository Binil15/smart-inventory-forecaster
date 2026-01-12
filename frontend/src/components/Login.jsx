import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      onLogin(res.data.role);
    } catch {
      setError("Invalid credentials");
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

        <button className="login-btn" onClick={login}>
          ACCESS DASHBOARD
        </button>

        {error && <p className="login-error">{error}</p>}

        <p className="login-footer">
          Roles: <b>admin</b> / <b>clerk</b>
        </p>
      </div>
    </div>
  );
}
