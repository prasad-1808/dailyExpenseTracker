import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="card p-4 shadow-sm">
        <h1 className="display-4 mb-4 text-center">
          Welcome to Expense Tracker
        </h1>
        <p className="lead text-center">
          Track your daily expenses easily and efficiently.
        </p>
      </div>
    </div>
  );
};

export default Home;
