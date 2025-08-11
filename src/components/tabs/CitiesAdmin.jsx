import React, { useEffect, useState } from "react";
import api from "../../api/client";

const CitiesAdmin = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState({
    name: "",
    state: "",
    population: ""
  });

  useEffect(() => { fetchCities(); }, []);

  const fetchCities = async () => {
    const res = await api.get("/city");
    setCities(res.data);
  };

  const handleAdd = async () => {
    await api.post("/city", {
      name: newCity.name,
      state: newCity.state,
      population: parseInt(newCity.population)
    });
    fetchCities();
  };

  const handleDelete = async (id) => {
    await api.delete(`/city/${id}`);
    fetchCities();
  };

  return (
    <div>
      <h2>Manage Cities</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>State</th><th>Population</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.state}</td>
              <td>{c.population}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add City</h3>
      <input placeholder="Name" onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}/>
      <input placeholder="State" onChange={(e) => setNewCity({ ...newCity, state: e.target.value })}/>
      <input placeholder="Population" onChange={(e) => setNewCity({ ...newCity, population: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default CitiesAdmin;
