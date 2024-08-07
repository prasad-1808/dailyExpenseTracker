import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="row">
      <div className="col-12">
        <center>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              Expense Tracker
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {isLoggedIn && (
              <div>
                <ul className="nav flex-row">
                  <li className="nav-item mb-2">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link className="nav-link" to="/expense">
                      Expenses
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link className="nav-link" to="/transactions">
                      Transactions
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </center>
      </div>
    </div>
  );
};

export default Navbar;
