// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/UserAuthentication";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
  const { register } = useAuth();
  const navigate = useNavigate();

  // load city list for dropdown
  useEffect(() => {
    api
      .get("/city")
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Failed to load cities", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        username,
        password,
        firstName,
        lastName,
        phoneNumber,
        cityId: Number(cityId),
      });
      alert("Registered & logged in!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: "auto" }}>
      <h2>Sign Up</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", width: "100%", margin: "8px 0" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", width: "100%", margin: "8px 0" }}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{ flex: 1 }}
        />
      </div>

      <input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        style={{ display: "block", width: "100%", margin: "8px 0" }}
      />

      <label style={{ display: "block", margin: "8px 0" }}>
        Your City:
        <select
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginTop: 4 }}
        >
          <option value="" disabled>
            — select your city —
          </option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}, {c.state}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" style={{ marginTop: 12 }}>
        Register
      </button>
    </form>
  );
}
