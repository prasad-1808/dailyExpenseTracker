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

const createExpense = async (req, res) => {
  const { userId, category, amount, date } = req.body;

  try {
    const expense = await prisma.expense.create({
      data: {
        userId: userId,
        category: category,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
      },
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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

module.exports = { addExpense, getExpenses, getSummary, getTotalExpenses };
