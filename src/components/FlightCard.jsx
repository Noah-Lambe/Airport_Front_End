import React, { useState } from "react";
import api from "../api/client";
import { useAuth } from "../hooks/UserAuthentication";

export default function FlightCard({ flight, onBooked }) {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");

  const handleBook = async () => {
<<<<<<< Updated upstream
=======
    console.log("Booking payload:", {
      passengerId: currentUser.passengerId,
    });
>>>>>>> Stashed changes
    setError("");
    try {
      const { data: updatedFlight } = await api.post(
        `/flights/${flight.flightId}/addPassenger`,
        { passengerId: currentUser.passengerId }
      );
      onBooked?.(updatedFlight);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="flight-card p-4 border rounded">
      <h2 className="text-xl font-semibold">{flight.flightNumber}</h2>
      <p>
        {flight.originAirport.airportName} →{" "}
        {flight.destinationAirport.airportName}
      </p>
      <p className="text-sm text-gray-600">
        Departs: {new Date(flight.departureTime).toLocaleString()}
        <br />
        Arrives: {new Date(flight.arrivalTime).toLocaleString()}
      </p>

      <button
        onClick={handleBook}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
      >
        Book This Flight
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
