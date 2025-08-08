import React, { useEffect, useState } from "react";
import api from "../api/client";
import FlightCard from "../components/FlightCard";
import UserBookings from "../components/UserBookings";

export default function UserDashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingsKey, setBookingsKey] = useState(0);

  // load all flights once
  useEffect(() => {
    api
      .get("/flights")
      .then((res) => setFlights(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const triggerRefresh = () => setBookingsKey((k) => k + 1);

  if (loading) return <p>Loading flights…</p>;
  if (error) return <p>Error loading flights</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl mb-4">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {flights.map((f) => (
          <FlightCard key={f.flightId} flight={f} onBooked={triggerRefresh} />
        ))}
      </div>
      <div>
        <UserBookings refreshKey={bookingsKey} />
      </div>
    </div>
  );
}
