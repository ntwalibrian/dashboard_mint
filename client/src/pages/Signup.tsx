import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agreedToTerms) {
      setError("Please agree to the Terms and Privacy Policy");
      return;
    }

    // Basic validation
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/create_user", {
        fullName,
        email,
        username,
        password,
      });
      setSuccess(response.data.success);
      console.log("Redirecting to login in 3s");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      setPassword("");
      setRepeatPassword("");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-image-section">
        {/* Image will be added via CSS */}
      </div>
      <div className="signup-form-section">
        <div className="signup-form-wrapper">
          <a href="/" className="mint-logo">
            Mint
          </a>
          <h2>Create Account</h2>
          <p className="signup-subtitle">
            Please enter your details to sign up
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
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
            <div className="form-group">
              <label>Repeat Password</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="terms-input"
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the{" "}
                <a href="/terms" className="terms-link">Terms and Conditions</a>
                {" "}and{" "}
                <a href="/privacy" className="terms-link">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p className="login-prompt">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
