import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ExpenseChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((item) => {

    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }

    categoryTotals[item.category] += item.amount;
  });

  const chartData = Object.keys(categoryTotals).map((key) => ({
    category: key,
    amount: categoryTotals[key],
  }));

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#22c55e",
    "#f97316",
  ];

  return (
    <div className="chart-grid">

      {/* BAR CHART */}

      <div className="chart-card">

        <h2>Expense Analytics</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={chartData}>

            <XAxis dataKey="category" />
            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* PIE CHART */}

      <div className="chart-card">

        <h2>Category Breakdown</h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;