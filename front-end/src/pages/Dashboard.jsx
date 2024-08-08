import React, { useEffect, useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [numTransactions, setNumTransactions] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in local storage");

        // Fetch expenses
        const expenseResponse = await api.get(`/expenses/${userId}`);
        if (expenseResponse.status === 404)
          throw new Error("Expenses not found");

        const expenses = expenseResponse.data;
        const totalExpense = expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setTotalExpense(totalExpense);
        setNumTransactions(expenses.length);

        // Fetch income
        const userData = await api.get(`/users/${userId}`); // Ensure this matches
        const monthlyIncome = userData.data.monthlyRevenue;
        if (userData.status === 404) throw new Error("Income data not found");

        setTotalIncome(monthlyIncome);

        // Calculate balance
        setBalance(monthlyIncome - totalExpense);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const InfoCard = ({ title, value }) => (
    <div className="col-md-3 mb-4">
      <div className="card info-card">
        <h3 className="card-title mb-3">{title}</h3>
        <div className="card-body">
          <h4 className="card-value">{loading ? "Loading..." : value}</h4>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <InfoCard title="Total Income" value={`$${totalIncome.toFixed(2)}`} />
        <InfoCard title="Total Expense" value={`$${totalExpense.toFixed(2)}`} />
        <InfoCard title="Transactions" value={numTransactions} />
        <InfoCard title="Balance" value={`$${balance.toFixed(2)}`} />
      </div>
    </div>
  );
};

export default Dashboard;
