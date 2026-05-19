import React, { useEffect, useState } from "react";
import API from "../api/expenseApi";

function AIInsights() {
  const [insight, setInsight] = useState("");

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    try {
      const res = await API.get("/expenses");

      const transactions = res.data;

      const totalIncome = transactions
        .filter((item) => item.type === "income")
        .reduce((acc, item) => acc + item.amount, 0);

      const totalExpenses = transactions
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => acc + item.amount, 0);

      const highestExpense = transactions
        .filter((item) => item.type === "expense")
        .sort((a, b) => b.amount - a.amount)[0];

      let message = "";

      if (totalExpenses > totalIncome * 0.7) {
        message +=
          "⚠️ Your expenses are more than 70% of your income. ";
      } else {
        message +=
          "✅ Your spending is currently under control. ";
      }

      if (highestExpense) {
        message += `💸 Highest spending category: ${highestExpense.category} (₹${highestExpense.amount}). `;
      }

      message += `💰 Current savings: ₹${totalIncome - totalExpenses}.`;

      setInsight(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chart-card">
      <h2>AI Spending Insights</h2>

      <div className="ai-box">
        <p>{insight}</p>
      </div>
    </div>
  );
}

export default AIInsights;