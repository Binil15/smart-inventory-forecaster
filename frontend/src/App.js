import { useState } from "react";
import Login from "./components/Login";
import AddProductForm from "./components/AddProductForm";
import InventoryTable from "./components/InventoryTable";
import ForecastCard from "./components/ForecastCard";
import EOQCalculator from "./components/EOQCalculator";
import "./Dashboard.css";

function App() {
  const [role, setRole] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  if (!role) {
    return <Login onLogin={(r) => setRole(r)} />;
  if (role) {
  document.body.style.backgroundImage =
    `url(${process.env.PUBLIC_URL}/dashboard-bg.jpg)`;
} else {
  document.body.style.backgroundImage =
    `url(${process.env.PUBLIC_URL}/login-bg.jpg)`;
}
  }

  return (
  <>
    {/* 🔹 FIXED BACKGROUND LAYER */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${process.env.PUBLIC_URL}/dashboard-bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
    />

    {/* 🔹 SCROLLABLE CONTENT LAYER */}
    <div className="dashboard-scroll">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Smart Inventory Forecaster</h1>
          <button onClick={logout}>Logout</button>
        </div>

        <p>
          Logged in as: <b>{role}</b>
        </p>

        <div className="dashboard-grid">
          <div className="card inventory">
            <h2>Inventory Management</h2>
            {role === "admin" && <AddProductForm />}
            <InventoryTable />
          </div>

          <div className="card sma">
            <h2>Demand Forecast (SMA)</h2>
            <ForecastCard />
          </div>

          <div className="card eoq">
            <h2>EOQ Optimisation</h2>
            <EOQCalculator />
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default App;
