const prisma = require("../utils/db");

const addExpense = async (req, res) => {
  let { userId, category, amount, date } = req.body;
  amount = parseFloat(amount);

  try {
    const expense = await prisma.expense.create({
      data: {
        userId,
        category,
        amount,
        date,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMonthlyIncome = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      // select: { monthlyIncome: true },
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ totalIncome: user.monthlyIncome });
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
    });

    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { category, amount, date } = req.body;
  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: parseInt(id, 10) },
      data: { category, amount, date },
    });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const getTotalExpenses = async (req, res) => {
  const { userId } = req.params;
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
    });

    let totalExpense = 0;

    for (let expense of expenses) {
      totalExpense += expense.amount;
    }

    res.status(200).json({ total: totalExpense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSummary = async (req, res) => {
  const { userId } = req.params;
  const { period } = req.query; // 'week' or 'month'

  const startDate = new Date();
  if (period === "week") {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === "month") {
    startDate.setMonth(startDate.getMonth() - 1);
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
    });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({ total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getSummary,
  getTotalExpenses,
  getMonthlyIncome,
  deleteExpense,
  updateExpense,
};
