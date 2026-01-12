import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default function EOQChart({ data, eoq }) {
  return (
    <div
      style={{
        width: "100%",
        height: "260px",
        marginTop: "14px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />

          <XAxis
            dataKey="quantity"
            tick={{ fill: "#e5e7eb", fontSize: 11 }}
          />

          <YAxis
            tick={{ fill: "#e5e7eb", fontSize: 11 }}
          />

          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(99,102,241,0.6)",
              color: "#e5e7eb",
              fontSize: "12px",
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="ordering_cost"
            stroke="#38bdf8"
            strokeWidth={2}
            name="Ordering Cost"
          />

          <Line
            type="monotone"
            dataKey="holding_cost"
            stroke="#22d3ee"
            strokeWidth={2}
            name="Holding Cost"
          />

          <Line
            type="monotone"
            dataKey="total_cost"
            stroke="#a855f7"
            strokeWidth={3}
            name="Total Cost"
          />

          {eoq && (
            <ReferenceLine
              x={eoq}
              stroke="#f8fafc"
              strokeDasharray="5 5"
              label={{ value: "EOQ", fill: "#f8fafc", fontSize: 12 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
