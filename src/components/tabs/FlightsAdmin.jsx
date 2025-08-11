import React, { useEffect, useState } from "react";
import api from "../../api/client";

const FlightsAdmin = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    status: "",
    departureTime: "",
    arrivalTime: "",
    originAirportId: "",
    destinationAirportId: "",
    aircraftId: "",
    gateId: "",
    airlineId: "",
  });

  useEffect(() => { fetchFlights(); }, []);

  const fetchFlights = async () => {
    const res = await api.get("/flights");
    setFlights(res.data);
  };

  const handleAddFlight = async () => {
    await api.post("/flights", newFlight);
    fetchFlights();
  };

  const handleDelete = async (id) => {
    await api.delete(`/flights/${id}`);
    fetchFlights();
  };

  return (
    <div>
      <h2>Manage Flights</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Flight Number</th><th>Status</th><th>Departure</th><th>Arrival</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.flightNumber}</td>
              <td>{f.status}</td>
              <td>{f.departureTime}</td>
              <td>{f.arrivalTime}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Flight</h3>
      <input placeholder="Flight Number" onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}/>
      <input placeholder="Status" onChange={(e) => setNewFlight({ ...newFlight, status: e.target.value })}/>
      <input type="datetime-local" onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })}/>
      <input type="datetime-local" onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })}/>
      <input placeholder="Origin Airport ID" onChange={(e) => setNewFlight({ ...newFlight, originAirportId: e.target.value })}/>
      <input placeholder="Destination Airport ID" onChange={(e) => setNewFlight({ ...newFlight, destinationAirportId: e.target.value })}/>
      <input placeholder="Aircraft ID" onChange={(e) => setNewFlight({ ...newFlight, aircraftId: e.target.value })}/>
      <input placeholder="Gate ID" onChange={(e) => setNewFlight({ ...newFlight, gateId: e.target.value })}/>
      <input placeholder="Airline ID" onChange={(e) => setNewFlight({ ...newFlight, airlineId: e.target.value })}/>
      <button onClick={handleAddFlight}>Add Flight</button>
    </div>
  );
};

export default FlightsAdmin;
