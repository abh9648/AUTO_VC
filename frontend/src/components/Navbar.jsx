import React from "react";
import logo from "./../assets/logo192.png";
import { Link } from "react-router-dom";
import "./navbar.css";
// import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <Link to="/" className="logo-area">
          <img src={logo} alt="AutoVC Logo" />
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <input
          className="search"
          type="text"
          placeholder="Type / to search"
        />

        <Link to="/create" className="nav-link">
          Create Repository
        </Link>

        <Link to="/profile" className="nav-link">
          Profile
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;