import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";
import Expense from "./components/Expense";
import Transactions from "./components/Transactions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App row">
        <div className="col-12 row">
          <div className="">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </div>
          <div className="col-12">
            {/* Main content */}
            <main className="col-md-12 col-lg-12 p-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/expense"
                  element={isLoggedIn ? <Expense /> : <Navigate to="/login" />}
                />
                <Route
                  path="/transactions"
                  element={
                    isLoggedIn ? <Transactions /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/profile"
                  element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
