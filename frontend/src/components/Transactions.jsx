import React, { useState } from "react";
import API from "../api/expenseApi";
import toast from "react-hot-toast";

function Transactions({ expenses = [], onDelete, onUpdated }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      title: item.title,
      amount: item.amount,
      type: item.type,
      category: item.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/expenses/${id}`, {
        title: editForm.title,
        amount: Number(editForm.amount),
        type: editForm.type,
        category: editForm.category,
      });

      toast.success("Transaction Updated");
      setEditingId(null);

      if (onUpdated) {
        onUpdated();
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" ? true : item.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="transactions">
      <div className="transaction-header">
        <h2>Recent Transactions</h2>

        <div className="transaction-controls">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        filteredExpenses.map((item) => (
          <div className="transaction-item" key={item._id}>
            {editingId === item._id ? (
              <>
                <div className="edit-fields">
                  <input
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                  />

                  <select
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>

                  <input
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                  />
                </div>

                <div className="transaction-right">
                  <button className="save-btn" onClick={() => saveEdit(item._id)}>
                    Save
                  </button>

                  <button className="delete-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                </div>

                <div className="transaction-right">
                  <h3 className={item.type === "income" ? "green" : "red"}>
                    {item.type === "income" ? `+₹${item.amount}` : `-₹${item.amount}`}
                  </h3>

                  <button className="edit-btn" onClick={() => startEdit(item)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;