import React, { useEffect, useState } from "react";
import api from "../../api/client";

const AirportsAdmin = () => {
  const [airports, setAirports] = useState([]);
  const [newAirport, setNewAirport] = useState({
    airportName: "",
    areaCode: "",
    cityId: ""
  });

  useEffect(() => { fetchAirports(); }, []);

  const fetchAirports = async () => {
    const res = await api.get("/airport");
    setAirports(res.data);
  };

  const handleAdd = async () => {
    await api.post(`/airport?cityId=${newAirport.cityId}`, {
      airportName: newAirport.airportName,
      areaCode: newAirport.areaCode
    });
    fetchAirports();
  };

  const handleDelete = async (id) => {
    await api.delete(`/airport/${id}`);
    fetchAirports();
  };

  return (
    <div>
      <h2>Manage Airports</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Area Code</th><th>City</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {airports.map((a) => (
            <tr key={a.airportId}>
              <td>{a.airportId}</td>
              <td>{a.airportName}</td>
              <td>{a.areaCode}</td>
              <td>{a.city?.name}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(a.airportId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Airport</h3>
      <input placeholder="Airport Name" onChange={(e) => setNewAirport({ ...newAirport, airportName: e.target.value })}/>
      <input placeholder="Area Code" onChange={(e) => setNewAirport({ ...newAirport, areaCode: e.target.value })}/>
      <input placeholder="City ID" onChange={(e) => setNewAirport({ ...newAirport, cityId: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AirportsAdmin;
