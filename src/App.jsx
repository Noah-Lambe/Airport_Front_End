// src/App.jsx
import React from "react";
import "./styles/App.css";
import AirportFlights from "./AirportFlights";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/UserAuthentication";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
//import AdminDashboard from './components/AdminDashboard';
import Header from "./components/Header";
import FlightSearchPage from "./pages/FlightSearch";
import "./styles/FlightSearch.css";
import "./styles/UserDashboard.css";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/airport-flights" replace />} />

        {/* public routes */}
        <Route path="/airport-flights" element={<AirportFlights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/flight-search" element={<FlightSearchPage />} />
        {/* Jons contact route should go here */}

        {/* Dashboard Route (admin vs user) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {isAdmin ? <AdminDashboard /> : <UserDashboard />}
            </PrivateRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
