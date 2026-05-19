import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyAnalytics from "../components/MonthlyAnalytics";
import Transactions from "../components/Transactions";
import BudgetProgress from "../components/BudgetProgress";
import ExportPDF from "../components/ExportPDF";
import AIAssistant from "../components/AIAssistant";
import SettingsPanel from "../components/SettingsPanel";
import LoadingSkeleton from "../components/LoadingSkeleton";

import API from "../api/expenseApi";
import toast from "react-hot-toast";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      toast.success("Transaction Deleted");
      fetchExpenses();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalExpenses = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const highestExpense = expenses
    .filter((item) => item.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="main-content">
        <div className="navbar" id="dashboard">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <div>
            <h1>Finora Dashboard</h1>
            <p>Track your finances smartly</p>
          </div>

          <div className="profile">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
            />
          </div>

          <ExportPDF />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <SummaryCards
              balance={totalBalance}
              income={totalIncome}
              expenses={totalExpenses}
            />

            <AddExpenseForm onExpenseAdded={fetchExpenses} />

            <div id="analytics">
              <ExpenseChart expenses={expenses} />
            </div>

            <MonthlyAnalytics expenses={expenses} />

            <div id="transactions">
              <Transactions
                expenses={expenses}
                onDelete={handleDelete}
                onUpdated={fetchExpenses}
              />
            </div>

            <div className="chart-card">
              <h2>AI Spending Insights</h2>

              <div className="ai-box">
                <p>
                  ✅ Your spending is currently under control.
                  <br />
                  <br />
                  💸 Highest spending category:{" "}
                  {highestExpense?.category || "N/A"} (
                  ₹{highestExpense?.amount || 0})
                  <br />
                  <br />
                  💰 Current savings: ₹{totalBalance}
                </p>
              </div>
            </div>

            <AIAssistant expenses={expenses} />

            <div id="budgets">
              <BudgetProgress expenses={expenses} />
            </div>

            <div id="settings">
              <SettingsPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;