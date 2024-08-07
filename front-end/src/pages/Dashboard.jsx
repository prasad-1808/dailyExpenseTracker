import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!localStorage.getItem("token")) {
  //       navigate("/login");
  //     }
  //     setTimeout(setVerified(true), 5000);
  //   }, []);
  const [expenseUpdate, setExpenseUpdate] = useState(0);
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card p-4 mb-4 shadow-sm">
            <h3 className="card-title mb-3">Add New Expense</h3>
            <ExpenseForm
              expenseUpdate={expenseUpdate}
              setExpenseUpdate={setExpenseUpdate}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 mb-4 shadow-sm">
            <h3 className="card-title mb-3">Expense List</h3>
            <ExpenseList
              expenseUpdate={expenseUpdate}
              setExpenseUpdate={setExpenseUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
