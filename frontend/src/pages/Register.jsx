import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/expenseApi";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Account Created Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>

        <h1>Create Account</h1>

        <p>Start managing your finances smarter</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Create Account
        </button>

        <Link to="/login">
          Already have an account? Login
        </Link>

      </form>
    </div>
  );
}

export default Register;