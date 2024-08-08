const express = require("express");
const {
  addExpense,
  getExpenses,
  getSummary,
  getTotalExpenses,
  getMonthlyIncome,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/:userId", authMiddleware, getExpenses);
router.get("/summary/:userId", authMiddleware, getSummary);
router.get("/totalExpenses", authMiddleware, getTotalExpenses);
router.get("/monthlyIncome/:userId", authMiddleware, getMonthlyIncome);
router.delete("/:id", authMiddleware, deleteExpense);
router.put("/:id", authMiddleware, updateExpense);

module.exports = router;
