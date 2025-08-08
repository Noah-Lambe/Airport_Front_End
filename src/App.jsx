// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/UserAuthentication";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
<<<<<<< Updated upstream
=======
// import AdminDashboard from "./components/AdminDashboard";
import Header from "./components/Header";
>>>>>>> Stashed changes

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
<<<<<<< Updated upstream
=======
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ROLE_ADMIN";

>>>>>>> Stashed changes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/airport-flights" replace />} />

        {/* public routes */}
        <Route path="/airport-flights" element={<AirportFlights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< Updated upstream
=======

        {/* protected dashboard */}
>>>>>>> Stashed changes
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
<<<<<<< Updated upstream
=======

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}
