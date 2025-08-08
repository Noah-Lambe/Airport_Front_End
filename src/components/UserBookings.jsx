import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../hooks/UserAuthentication";

export default function UserBookings({ refreshKey }) {
  const { currentUser } = useAuth();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = currentUser?.passengerId;
    if (!id) {
      setLoading(false);
      setError("No passenger ID—cannot load bookings.");
      return;
    }

    setLoading(true);
    api
      .get(`/flights/byPassenger/${id}`)
      .then((res) => {
        setFlights(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load your bookings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser, refreshKey]);

  if (loading) return <p>Loading your bookings…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (flights.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div>
      <h2 className="text-2xl mb-2">Your Booked Flights</h2>
      <ul className="list-disc pl-5">
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
