import express from "express";
import Expense from "../models/Expense.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   GET USER EXPENSES
========================= */

router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

/* =========================
   ADD EXPENSE
========================= */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category, type } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      type,
      user: req.user.id,
    });

    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add expense",
    });
  }
});

/* =========================
   UPDATE EXPENSE
========================= */

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    expense.title = req.body.title;
    expense.amount = req.body.amount;
    expense.category = req.body.category;
    expense.type = req.body.type;

    const updatedExpense = await expense.save();

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
    });
  }
});

/* =========================
   DELETE EXPENSE
========================= */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.json({
      message: "Expense deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});

export default router;