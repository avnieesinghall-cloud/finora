import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function MonthlyAnalytics({ expenses = [] }) {
  const monthlyData = {};

  expenses.forEach((item) => {
    const date = new Date(item.createdAt);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expenses: 0,
        savings: 0,
      };
    }

    if (item.type === "income") {
      monthlyData[month].income += item.amount;
    } else {
      monthlyData[month].expenses += item.amount;
    }

    monthlyData[month].savings =
      monthlyData[month].income - monthlyData[month].expenses;
  });

  const data = Object.values(monthlyData);

  const currentMonth = data[data.length - 1] || {
    income: 0,
    expenses: 0,
    savings: 0,
  };

  const bestMonth = [...data].sort((a, b) => b.savings - a.savings)[0];

  return (
    <div className="chart-card">
      <h2>Monthly Analytics</h2>

      <div className="monthly-summary">
        <div>
          <p>This Month Income</p>
          <h3>₹{currentMonth.income}</h3>
        </div>

        <div>
          <p>This Month Expenses</p>
          <h3>₹{currentMonth.expenses}</h3>
        </div>

        <div>
          <p>This Month Savings</p>
          <h3>₹{currentMonth.savings}</h3>
        </div>
      </div>

      <div className="monthly-charts">
        <div className="monthly-chart-box">
          <h3>Income vs Expenses</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="monthly-chart-box">
          <h3>Savings Trend</h3>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="savings"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="monthly-insight">
        <p>
          🏆 Best savings month:{" "}
          <strong>{bestMonth?.month || "Not enough data yet"}</strong>
        </p>
      </div>
    </div>
  );
}

export default MonthlyAnalytics;