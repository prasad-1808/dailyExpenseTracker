import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2" to="/">
          Expense Tracker <GiExpense />
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="d-flex justify-content-end w-100 navbar-nav me-auto fs-4">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/expense">
                    Expenses
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/transactions">
                    Transactions
                  </Link>
                </li>
                <li className="nav-item dropdown mx-3">
                  <FaRegUserCircle
                    className="dropdown-toggle nav-item mx-4 fs-2 mt-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul className="dropdown-menu dropdown-menu-end my-3">
                    <li>
                      <center>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </center>
                    </li>
                    <li className="nav-item mx-3">
                      <center>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </center>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
