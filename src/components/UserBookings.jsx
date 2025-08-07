import React, { useState, useEffect } from "react";
import api from "../api/client";
import { useAuth } from "../hooks/UserAuthentication";

export default function UserBookings() {
  const { currentUser } = useAuth();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Pull the ID out
    const id = currentUser?.passengerId;
    console.log("UserBookings: currentUser =", currentUser);
    console.log("UserBookings: passengerId =", id);

    // If we explicitly know there is no ID (e.g. user never had one),
    // clear loading so we stop spinning
    if (currentUser && id == null) {
      setLoading(false);
      setError("No passenger ID—cannot load bookings.");
      return;
    }

    // Only fire the request when we actually have an ID
    if (id) {
      api
        .get(`/api/flights/byPassenger/${id}`) // adjust `/api` prefix to match your server
        .then((res) => {
          setFlights(res.data);
        })
        .catch((err) => {
          console.error(err);
          setError("Could not load your bookings.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <p>Loading your bookings…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!flights.length) return <p>You have no bookings yet.</p>;

  return (
    <div>
      <h2>Your Booked Flights</h2>
      <ul>
        {flights.map((f) => (
          <li key={f.flightId}>
            {f.flightNumber}: {f.originAirport.airportName} →{" "}
            {f.destinationAirport.airportName}
          </li>
        ))}
      </ul>
    </div>
  );
}
