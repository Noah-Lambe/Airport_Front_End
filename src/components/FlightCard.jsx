import React from "react";
import api from "../api/client";
import { useAuth } from "../hooks/UserAuthentication";

export default function FlightCard({ flight }) {
  const { currentUser } = useAuth(); // get currentUser via hook

  const handleBook = () => {
    api
      .post(`/flights/${flight.flightId}/addPassenger`, {
        id: currentUser.passengerId,
      })
      .then(() => {
        alert("Booked!");
      })
      .catch(() => {
        alert("Booking failed");
      });
  };

  return (
    <div className="flight-card">
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
    </div>
  );
}
