import React, { useEffect, useState } from "react";
import api from "../../api/client";

const AirlinesAdmin = () => {
  const [airlines, setAirlines] = useState([]);
  const [newAirline, setNewAirline] = useState({ airlineName: "" });

  useEffect(() => { fetchAirlines(); }, []);

  const fetchAirlines = async () => {
    const res = await api.get("/airlines");
    setAirlines(res.data);
  };

  const handleAdd = async () => {
    await api.post("/airlines", newAirline);
    fetchAirlines();
  };

  const handleDelete = async (id) => {
    await api.delete(`/airlines/${id}`);
    fetchAirlines();
  };

  return (
    <div>
      <h2>Manage Airlines</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {airlines.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.airlineName}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Airline</h3>
      <input placeholder="Airline Name" onChange={(e) => setNewAirline({ airlineName: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AirlinesAdmin;
