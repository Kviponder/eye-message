import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations.js"; // Your mutation query

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      // Handle successful login, e.g., store token and redirect user
      console.log("Login successful:", data.login.token);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex-center">
      <h2>Login</h2>
      <p>Login with your email address and password.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          {error && <p className="form-error">Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
