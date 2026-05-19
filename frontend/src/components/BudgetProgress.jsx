import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function BudgetProgress({ expenses = [] }) {
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(0);

  useEffect(() => {
    const storedBudget = localStorage.getItem("monthlyBudget");

    if (storedBudget) {
      setSavedBudget(Number(storedBudget));
      setBudget(storedBudget);
    }
  }, []);

  const totalSpent = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const remaining = savedBudget - totalSpent;

  const usedPercent =
    savedBudget > 0
      ? Math.min((totalSpent / savedBudget) * 100, 100)
      : 0;

  const handleSaveBudget = (e) => {
    e.preventDefault();

    if (!budget || Number(budget) <= 0) {
      toast.error("Please enter a valid budget");
      return;
    }

    localStorage.setItem("monthlyBudget", budget);
    setSavedBudget(Number(budget));
    toast.success("Budget saved successfully");
  };

  return (
    <div className="budget-card">
      <h2>Monthly Budget</h2>

      <form className="budget-form" onSubmit={handleSaveBudget}>
        <input
          type="number"
          placeholder="Set monthly budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button type="submit">Save Budget</button>
      </form>

      <div className="budget-stats">
        <div>
          <p>Budget</p>
          <h3>₹{savedBudget}</h3>
        </div>

        <div>
          <p>Spent</p>
          <h3>₹{totalSpent}</h3>
        </div>

        <div>
          <p>Remaining</p>
          <h3 className={remaining < 0 ? "red" : "green"}>
            ₹{remaining}
          </h3>
        </div>
      </div>

      <div className="progress">
        <div
          className={remaining < 0 ? "progress-bar danger" : "progress-bar"}
          style={{ width: `${usedPercent}%` }}
        ></div>
      </div>

      <p className="budget-used">
        {Math.round(usedPercent)}% Used
      </p>

      {remaining < 0 && (
        <p className="budget-warning">
          ⚠ Budget limit exceeded by ₹{Math.abs(remaining)}
        </p>
      )}
    </div>
  );
}

export default BudgetProgress;