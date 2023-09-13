import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations"; // Import your LOGIN_USER mutation query

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email: email, password: password },
      });

      // Handle successful login, e.g., store token and redirect user
      console.log("Login successful:", data.login.token);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex-center">
      <div className="form-container">
        <h2>Login</h2>
        <p>Login with your email address and password.</p>

        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            name="email" // Ensure the name attribute matches your mutation arguments
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            name="password" // Ensure the name attribute matches your mutation arguments
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          {error && (
            <p className="form-error">
              Error: {error.message} {/* Display the error message */}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
