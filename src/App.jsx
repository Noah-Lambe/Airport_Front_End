import React from "react";
import './App.css';
import AirportFlights from './AirportFlights';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/UserAuthentication';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
//import AdminDashboard from './components/AdminDashboard';
import Header from './partials/Header'

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Route (admin vs user) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {isAdmin ? <AdminDashboard /> : <UserDashboard />}
            </PrivateRoute>
          }
        />

        {/* Airport Flights Route */}
        <Route
          path="/airport-flights"
          element={
            <PrivateRoute>
              <div className="App">
                <AirportFlights />
              </div>
            </PrivateRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

