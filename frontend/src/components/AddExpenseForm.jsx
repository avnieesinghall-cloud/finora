import React, { useState } from "react";
import API from "../api/expenseApi";

import toast from "react-hot-toast";

function AddExpenseForm({ onExpenseAdded }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/expenses", {
        title,
        amount: Number(amount),
        type,
        category,
      });

      toast.success("Transaction Added");

      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("");

      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (error) {

      console.log(
        "ADD EXPENSE ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Error adding expense"
      );
    }
  };

  return (
    <div className="chart-card">
      <h2>Add Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="expense-form"
      >

        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">
          Add Transaction
        </button>

      </form>
    </div>
  );
}

export default AddExpenseForm;