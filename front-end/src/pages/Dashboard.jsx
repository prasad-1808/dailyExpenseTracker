// Dashboard.jsx
import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [expenseUpdate, setExpenseUpdate] = useState(0);
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [yearlyExpenses, setYearlyExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/expenses/${userId}`);
      const expenses = response.data;

      // Aggregate data by week, month, year
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

      const weekly = [];
      const monthly = [];
      const yearly = [];

      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        if (expenseDate >= startOfWeek) {
          weekly.push(expense);
        }
        if (expenseDate >= startOfMonth) {
          monthly.push(expense);
        }
        if (expenseDate >= startOfYear) {
          yearly.push(expense);
        }
      });

      setWeeklyExpenses(weekly);
      setMonthlyExpenses(monthly);
      setYearlyExpenses(yearly);
    };

    fetchExpenses();
  }, [expenseUpdate]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card chart-card">
            <h3 className="card-title mb-3">Weekly Expenses</h3>
            <div className="chart-container">
              <BarChart data={weeklyExpenses} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card chart-card">
            <h3 className="card-title mb-3">Monthly Expenses</h3>
            <div className="chart-container">
              <BarChart data={monthlyExpenses} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card chart-card">
            <h3 className="card-title mb-3">Yearly Expenses</h3>
            <div className="chart-container">
              <BarChart data={yearlyExpenses} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card chart-card">
            <h3 className="card-title mb-3">
              Expense Distribution by Category
            </h3>
            <div className="chart-container">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
