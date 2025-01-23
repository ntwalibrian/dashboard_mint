import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useUser();
  const navigate = useNavigate()

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
      console.log('nice being redirected in 3s')
      setTimeout(() => {
        
        navigate(`/dashboard/marketplace`)
      }, 3000)
      
    } catch (err: any) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
      setPassword("");
      setUsername("");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Login;
