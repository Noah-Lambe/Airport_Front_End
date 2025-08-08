import React, { useState } from "react";
import api from "../api/client";
import { useAuth } from "../hooks/UserAuthentication";

export default function FlightCard({ flight, onBooked }) {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");

  const handleBook = async () => {
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
    <div>
      <h2>{flight.flightNumber}</h2>
      <p>
        {flight.originAirport.airportName} →{" "}
        {flight.destinationAirport.airportName}
      </p>
      <p>
        Departs: {new Date(flight.departureTime).toLocaleString()}
        <br />
        Arrives: {new Date(flight.arrivalTime).toLocaleString()}
      </p>

      <button onClick={handleBook}>Book This Flight</button>

      {error && <p>{error}</p>}
    </div>
  );
}
