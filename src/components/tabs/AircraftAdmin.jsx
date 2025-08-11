import React, { useEffect, useState } from "react";
import api from "../../api/client";

const AircraftAdmin = () => {
  const [aircraft, setAircraft] = useState([]);
  const [newAircraft, setNewAircraft] = useState({
    type: "",
    numberOfPassengers: "",
    airlineId: "",
    airportIds: ""
  });

  useEffect(() => { fetchAircraft(); }, []);

  const fetchAircraft = async () => {
    const res = await api.get("/aircraft");
    setAircraft(res.data);
  };

  const handleAdd = async () => {
    await api.post("/aircraft", {
      type: newAircraft.type,
      numberOfPassengers: parseInt(newAircraft.numberOfPassengers),
      airline: { airlineId: parseInt(newAircraft.airlineId) },
      airports: newAircraft.airportIds.split(",").map(id => ({ airportId: parseInt(id.trim()) }))
    });
    fetchAircraft();
  };

  const handleDelete = async (id) => {
    await api.delete(`/aircraft/${id}`);
    fetchAircraft();
  };

  return (
    <div>
      <h2>Manage Aircraft</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Type</th><th>Passengers</th><th>Airline</th><th>Airports</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {aircraft.map((a) => (
            <tr key={a.aircraftId}>
              <td>{a.aircraftId}</td>
              <td>{a.type}</td>
              <td>{a.numberOfPassengers}</td>
              <td>{a.airline?.airlineName}</td>
              <td>{a.airports?.map(ap => ap.airportName).join(", ")}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(a.aircraftId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Aircraft</h3>
      <input placeholder="Type" onChange={(e) => setNewAircraft({ ...newAircraft, type: e.target.value })}/>
      <input placeholder="Passengers" onChange={(e) => setNewAircraft({ ...newAircraft, numberOfPassengers: e.target.value })}/>
      <input placeholder="Airline ID" onChange={(e) => setNewAircraft({ ...newAircraft, airlineId: e.target.value })}/>
      <input placeholder="Airport IDs (comma-separated)" onChange={(e) => setNewAircraft({ ...newAircraft, airportIds: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AircraftAdmin;
