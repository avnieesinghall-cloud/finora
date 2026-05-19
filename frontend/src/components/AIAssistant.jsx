import React, { useState } from "react";

function AIAssistant({ expenses = [] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpenses = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const savings = totalIncome - totalExpenses;

  const highestExpense = expenses
    .filter((item) => item.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  const handleAsk = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setAnswer("Please ask something about your finances.");
      return;
    }

    const q = question.toLowerCase();

    if (q.includes("save") || q.includes("saving")) {
      setAnswer(
        `You currently have savings of ₹${savings}. To save more, reduce spending in ${
          highestExpense?.category || "your highest expense category"
        }, avoid impulse purchases, and set a fixed monthly budget.`
      );
    } else if (q.includes("overspend") || q.includes("highest")) {
      setAnswer(
        highestExpense
          ? `Your highest expense is in ${highestExpense.category}, where you spent ₹${highestExpense.amount}. This is a good category to review first.`
          : "No expense data found yet."
      );
    } else if (q.includes("income")) {
      setAnswer(`Your total income is ₹${totalIncome}.`);
    } else if (q.includes("expense") || q.includes("spend")) {
      setAnswer(`Your total expenses are ₹${totalExpenses}.`);
    } else if (q.includes("balance")) {
      setAnswer(`Your current balance is ₹${savings}.`);
    } else {
      setAnswer(
        `Based on your current data, your income is ₹${totalIncome}, expenses are ₹${totalExpenses}, and savings are ₹${savings}. Your biggest spending area is ${
          highestExpense?.category || "not available yet"
        }.`
      );
    }

    setQuestion("");
  };

  return (
    <div className="chart-card">
      <h2>Finora AI Assistant</h2>

      <form className="ai-assistant-form" onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask: How can I save more money?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit">Ask AI</button>
      </form>

      {answer && (
        <div className="ai-answer">
          <p>{answer}</p>
        </div>
      )}

      <div className="ai-suggestions">
        <button onClick={() => setQuestion("How can I save more money?")}>
          Saving Tips
        </button>

        <button onClick={() => setQuestion("Where am I overspending?")}>
          Overspending
        </button>

        <button onClick={() => setQuestion("What is my balance?")}>
          Balance
        </button>
      </div>
    </div>
  );
}

export default AIAssistant;