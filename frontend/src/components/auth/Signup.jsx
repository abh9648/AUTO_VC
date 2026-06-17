import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react"; // Only use supported components
import "./auth.css";
import logo from "../../assets/logo192.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
const API_URL = "https://auto-vc-yxwu.onrender.com";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/signup`, {
        email,
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-wrapper">
        {/* Logo */}
        <div className="login-logo-container">
          {/* <img className="logo-login" src={logo} alt="Logo" /> */}
        </div>

        {/* Signup Card */}
        <div className="login-box-wrapper">
          {/* Header */}
          <div className="login-heading">
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h1 style={{ fontSize: "2rem", margin: 0, color: "#fff" }}>
                Sign Up
              </h1>
            </div>
          </div>

          {/* Input Fields */}
          <div className="login-box">
            <div>
              <label className="label">Username</label>
              <input
                autoComplete="off"
                id="Username"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Email address</label>
              <input
                autoComplete="off"
                id="Email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                autoComplete="off"
                id="Password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Signup Button */}
            <Button
              variant="primary"
              className="login-btn"
              disabled={loading}
              onClick={handleSignup}
              sx={{ width: "100%", mt: 2 }}
            >
              {loading ? "Loading..." : "Signup"}
            </Button>
          </div>

          {/* Link to Login */}
          <div className="pass-box">
            <p>
              Already have an account? <Link to="/auth">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>);
};

export default Signup;
