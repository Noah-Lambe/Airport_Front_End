import React, { useEffect, useState } from "react";
import api from "../../api/client";

const PassengersAdmin = () => {
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cityId: "",
    aircraftIds: ""
  });

  useEffect(() => { fetchPassengers(); }, []);

  const fetchPassengers = async () => {
    const res = await api.get("/passengers");
    setPassengers(res.data);
  };

  const handleAdd = async () => {
    await api.post("/passengers", {
      firstName: newPassenger.firstName,
      lastName: newPassenger.lastName,
      phoneNumber: newPassenger.phoneNumber,
      city: { id: parseInt(newPassenger.cityId) },
      aircraft: newPassenger.aircraftIds.split(",").map(id => ({ aircraftId: parseInt(id.trim()) }))
    });
    fetchPassengers();
  };

  const handleDelete = async (id) => {
    await api.delete(`/passengers/${id}`);
    fetchPassengers();
  };

  return (
    <div>
      <h2>Manage Passengers</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Phone</th><th>City</th><th>Aircraft</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {passengers.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.firstName} {p.lastName}</td>
              <td>{p.phoneNumber}</td>
              <td>{p.city?.name}</td>
              <td>{p.aircraft?.map(ac => ac.type).join(", ")}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Passenger</h3>
      <input placeholder="First Name" onChange={(e) => setNewPassenger({ ...newPassenger, firstName: e.target.value })}/>
      <input placeholder="Last Name" onChange={(e) => setNewPassenger({ ...newPassenger, lastName: e.target.value })}/>
      <input placeholder="Phone Number" onChange={(e) => setNewPassenger({ ...newPassenger, phoneNumber: e.target.value })}/>
      <input placeholder="City ID" onChange={(e) => setNewPassenger({ ...newPassenger, cityId: e.target.value })}/>
      <input placeholder="Aircraft IDs (comma-separated)" onChange={(e) => setNewPassenger({ ...newPassenger, aircraftIds: e.target.value })}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default PassengersAdmin;
