import React, { useEffect, useState } from "react";
import api from "../api/client";
import FlightCard from "../components/FlightCard";

export default function UserDashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/flights")
      .then((res) => setFlights(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading flights…</p>;
  if (error) return <p>Error loading flights</p>;

  return (
    <div>
      <h1>Your Dashboard</h1>
      <div className="flight-grid">
        {flights.map((f) => (
          <FlightCard key={f.flightId} flight={f} />
        ))}
      </div>
    </div>
  );
}
