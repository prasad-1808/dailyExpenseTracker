import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiAcademicCap, HiOutlineUserCircle } from "react-icons/hi2";
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
                <li className="nav-item mx-3">
                  <Link className="nav-link" to="/profile">
                    {/* <HiOutlineUserCircle className="profile-icon" /> */}
                    Profile
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
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
