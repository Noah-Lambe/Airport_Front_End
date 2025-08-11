import React, { useEffect, useState } from "react";
import api from "../../api/client";

const GatesAdmin = () => {
  const [gates, setGates] = useState([]);
  const [newGate, setNewGate] = useState({
    gateName: "",
    terminal: "",
    airportId: ""
  });

  useEffect(() => { fetchGates(); }, []);

  const fetchGates = async () => {
    const res = await api.get("/gates");
    setGates(res.data);
  };

  const handleAdd = async () => {
    await api.post("/gates", {
      gateName: newGate.gateName,
      terminal: newGate.terminal,
      airport: { airportId: parseInt(newGate.airportId) }
    });
    fetchGates();
  };

  const handleDelete = async (id) => {
    await api.delete(`/gates/${id}`);
    fetchGates();
  };

  return (
    <div>
      <h2>Manage Gates</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Terminal</th><th>Airport</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {gates.map((g) => (
            <tr key={g.gateId}>
              <td>{g.gateId}</td>
              <td>{g.gateName}</td>
              <td>{g.terminal}</td>
              <td>{g.airport?.airportName}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(g.gateId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Gate</h3>
      <input placeholder="Gate Name" onChange={(e) => setNewGate({ ...newGate, gateName: e.target.value })}/>
      <input placeholder="Terminal" onChange={(e) => setNewGate({ ...newGate, terminal: e.target.value })}/>
      <input placeholder="Airport ID" onChange={(e) => setNewGate({ ...newGate, airportId: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default GatesAdmin;
