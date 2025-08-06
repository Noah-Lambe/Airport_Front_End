import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirportFlights = () => {
    const [view, setView] = useState('arrivals');
    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ARRIVALS_API = 'http://localhost:8080/flights/destination/1';
    const DEPARTURES_API = 'http://localhost:8080/flights/origin/1';

    const FLIGHTS_API = 'http://localhost:8080/flights';

useEffect(() => {
  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(FLIGHTS_API);
      const allFlights = res.data;

      setDepartures(allFlights.filter(flight => flight.originAirport !== null));
      setArrivals(allFlights.filter(flight => flight.destinationAirport !== null));
    } catch (err) {
      setError('Failed to fetch flight data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchFlights();
}, []);


    const flightsToShow = view === 'arrivals' ? arrivals : departures;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th
                        onClick={() => setView('arrivals')}
                                style={{ cursor: 'pointer', backgroundColor: view === 'arrivals' ? '#ccc' : 'transparent' }}
                            >
                                Arrivals
                        </th>
                        <th
                            onClick={() => setView('departures')}
                                style={{ cursor: 'pointer', backgroundColor: view === 'departures' ? '#ccc' : 'transparent' }}
                            >
                                Departures
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {flightsToShow.map((flight) => (
                        <tr key={flight.flightId}>
                            <td>{flight.flightNumber}</td>
                            <td>
                                {view === 'arrivals'
                                    ? flight.originAirport?.name
                                    : flight.destinationAirport?.name}
                            </td>
                            <td>{view === 'arrivals' ? flight.arrivalTime : flight.departureTime}</td>
                            <td>{flight.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AirportFlights;