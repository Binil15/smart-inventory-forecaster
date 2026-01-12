import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ForecastCard() {
  const products = useSelector((state) => state.products.items);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [sales, setSales] = useState([]);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    setResult(null);
    setChartData([]);

    const product = products.find(
      (p) => p.id === Number(productId)
    );

    if (product) {
      setSales(product.monthly_sales);
    } else {
      setSales([]);
    }
  };

  const predict = async () => {
    if (sales.length < 3) {
      alert("Not enough sales data for SMA");
      return;
    }

    const res = await api.post("/predict", sales);
    const predicted = res.data.predicted_demand;

    setResult(predicted);

    /* 🔹 Prepare chart data */
    const formatted = sales.map((value, index) => ({
      month: index + 1,
      sales: value,
      sma: predicted, // same SMA value shown across
    }));

    setChartData(formatted);
  };

  return (
    <>
      {/* PRODUCT SELECT */}
      <select
        className="gradient-input"
        value={selectedProductId}
        onChange={handleProductSelect}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* SALES DISPLAY */}
      {sales.length > 0 && (
        <p style={{ fontSize: "13px", marginBottom: "8px" }}>
          Monthly Sales: <b>{sales.join(", ")}</b>
        </p>
      )}

      <button className="primary-btn" onClick={predict}>
        Predict Demand
      </button>

      {/* SMA OUTPUT */}
      {result !== null && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Predicted Demand (SMA): {result}
        </p>
      )}

      {/* 🔹 SMA VISUALIZATION */}
      {chartData.length > 0 && (
        <div style={{ width: "100%", height: 180, marginTop: 14 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#38bdf8"
                strokeWidth={2}
                name="Monthly Sales"
              />

              <Line
                type="monotone"
                dataKey="sma"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                name="SMA"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
