// Expense.jsx
import React, { useState } from "react";

const Expense = ({ expenseUpdate, setExpenseUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setExpenseUpdate(expenseUpdate + 1); // Example of updating state
    setFormData({ name: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Expense Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Expense
      </button>
    </form>
  );
};

export default Expense;
