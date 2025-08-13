import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../hooks/UserAuthentication";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === "admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="airport-code-bar">
        <p>Airport Code: YYT</p>
      </div>

      <header className="header">
        <Link to="/airport-flights" className="header-link">
          <h1 className="header-title">Farewell Finder</h1>
        </Link>
        <nav>
          {isLoggedIn && (
            <>
              <Link to="/airport-flights" className="nav-link">
                Home
              </Link>
              <Link to="/flight-search" className="nav-link">
                Search Flights
              </Link>
              <Link to="/dashboard" className="nav-link">
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">
                Log In
              </Link>
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
