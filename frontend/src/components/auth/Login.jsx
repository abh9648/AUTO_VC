import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo192.png";
import "./auth.css";
import Navbar from "../Navbar";
const API_URL = "https://auto-vc-yxwu.onrender.com";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
      <div
        className="login-wrapper"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"5px",
          padding: 0,
        }}
      >
        <div className="login-logo-container ">
          {/* <img className="logo-login" src={logo} alt="Logo" /> */}
        </div>

        <div className="login-box-wrapper">
          <div className="login-heading" style={{ textAlign: "center" }}>
            <h1 style={{ color: "white", marginBottom: "20px" }}>Sign In</h1>
          </div>

          <form className="login-box" onSubmit={handleLogin}>
            <div>
              <label className="label">Email address</label>
              <input
                autoComplete="off"
                name="Email"
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
                name="Password"
                id="Password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="pass-box" style={{ textAlign: "center", marginTop: "15px" }}>
            <p>
              New to GitHub?{" "}
              <Link to="/signup" style={{ color: "#58a6ff" }}>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>);
};

export default Login;
