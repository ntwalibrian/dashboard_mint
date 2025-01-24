import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    console.log("Sending username:", username);
    console.log("Sending password:", password);
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8080/verify_user", {
        username,
        password,
      });
      setSuccess(response.data.success);
      if (response.data.success) {
        login(response.data.user, response.data.token);
      }
      console.log("nice being redirected in 3s");
      setTimeout(() => {
        navigate(`/dashboard/marketplace`);
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      setPassword("");
      setUsername("");
    }
  }

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <a href="/" className="mint-logo">
            Mint
          </a>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">
            Please enter your credentials to login
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p className="signup-prompt">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div className="login-image-section">
        {/* You can add your image here */}
      </div>
    </div>
  );
}

export default Login;
