import { useState } from "react";
import api from "../services/api";
import EOQChart from "./EOQChart";

export default function EOQCalculator() {
  const [demand, setDemand] = useState("");
  const [orderingCost, setOrderingCost] = useState("");
  const [holdingCost, setHoldingCost] = useState("");
  const [eoq, setEoq] = useState(null);
  const [chartData, setChartData] = useState([]);

  const calculateEOQ = async () => {
    const D = Number(demand);
    const S = Number(orderingCost);
    const H = Number(holdingCost);

    if (D <= 0 || S <= 0 || H <= 0 || isNaN(D) || isNaN(S) || isNaN(H)) {
      alert("Enter valid positive numbers");
      return;
    }

    try {
      const res = await api.post("/eoq", {
        demand: D,
        ordering_cost: S,
        holding_cost: H,
      });

      const eoqValue = Math.round(res.data.eoq);
      setEoq(eoqValue);

      // ---- MULTI-LINE CHART DATA ----
      const data = [];
      const maxQ = eoqValue * 2;

      for (let q = 10; q <= maxQ; q += Math.ceil(maxQ / 25)) {
        const ordering = (D / q) * S;
        const holding = (q / 2) * H;

        data.push({
          quantity: q,
          ordering_cost: Number(ordering.toFixed(2)),
          holding_cost: Number(holding.toFixed(2)),
          total_cost: Number((ordering + holding).toFixed(2)),
        });
      }

      setChartData(data);
    } catch (err) {
      console.error(err);
      alert("EOQ calculation failed");
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <input
        className="gradient-input"
        type="number"
        placeholder="Annual Demand"
        value={demand}
        onChange={(e) => setDemand(e.target.value)}
      />

      <input
        className="gradient-input"
        type="number"
        placeholder="Ordering Cost"
        value={orderingCost}
        onChange={(e) => setOrderingCost(e.target.value)}
      />

      <input
        className="gradient-input"
        type="number"
        placeholder="Holding Cost"
        value={holdingCost}
        onChange={(e) => setHoldingCost(e.target.value)}
      />

      <button className="primary-btn" onClick={calculateEOQ}>
        Calculate EOQ
      </button>
      {eoq && <h3>EOQ = {eoq}</h3>}

      {chartData.length > 0 && (
        <EOQChart data={chartData} eoq={eoq} />
      )}
    </div>
  );
}
