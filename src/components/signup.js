import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "react-bootstrap";
import { CREATE_USER } from "../utils/mutations";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: formData,
      });
      window.location.replace("/dashboard");
      console.log("User created:", data.createUser);
      // Handle successful signup, e.g., redirect user to login page
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <Form onSubmit={handleSubmit} className="signup-form">
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="signup-button"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        {error && <p className="alert-danger">{error.message}</p>}
      </Form>
    </div>
  );
};

export default SignupForm;
