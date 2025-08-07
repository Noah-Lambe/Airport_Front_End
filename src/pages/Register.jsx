import React, { useState } from "react";
import { useAuth } from "../hooks/UserAuthentication";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert("Registration & login successful!");
      navigate("/dashboard");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "auto" }}>
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ marginTop: 8 }}
      />
      <button type="submit" style={{ marginTop: 12 }}>
        Register
      </button>
    </form>
  );
}
