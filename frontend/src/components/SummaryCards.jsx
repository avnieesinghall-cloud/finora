import React, { useEffect, useState } from "react";
import API from "../api/expenseApi";

function SummaryCards({ refresh }) {
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, [refresh]);

  const fetchSummary = async () => {
    try {
      const res = await API.get("/expenses");

      const transactions = res.data;

      const income = transactions
        .filter((item) => item.type === "income")
        .reduce((acc, item) => acc + item.amount, 0);

      const expenses = transactions
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => acc + item.amount, 0);

      setSummary({
        income,
        expenses,
        balance: income - expenses,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cards">
      <div className="card">
        <h3>Total Balance</h3>
        <h1>₹{summary.balance}</h1>
      </div>

      <div className="card">
        <h3>Income</h3>
        <h1>₹{summary.income}</h1>
      </div>

      <div className="card">
        <h3>Expenses</h3>
        <h1>₹{summary.expenses}</h1>
      </div>
    </div>
  );
}

export default SummaryCards;