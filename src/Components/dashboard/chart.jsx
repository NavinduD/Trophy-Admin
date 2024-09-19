import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Redeem: "300" },
  { month: "Feb", Redeem: "600" },
  { month: "Mar", Redeem: "100" },
  { month: "Apr", Redeem: "400" },
  { month: "May", Redeem: "700" },
  { month: "Jun", Redeem: "300" },
  { month: "Jul", Redeem: "500" },
  { month: "Aug", Redeem: "600" },
  { month: "Sep", Redeem: "200" },
  { month: "Oct", Redeem: "300" },
  { month: "Nov", Redeem: "400" },
  { month: "Dec", Redeem: "600" },
];

const SellerChart = () => {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Redeem"
            stroke="#fa9b46"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerChart;
