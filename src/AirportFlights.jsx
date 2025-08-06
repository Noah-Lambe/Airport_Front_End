import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirportFlights = () => {
  const [view, setView] = useState('arrivals');
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:8080/flights');
        const allFlights = res.data;

        const now = new Date();

        const filteredArrivals = allFlights.filter(flight => {
          return flight.arrivalTime && new Date(flight.arrivalTime) >= now;
        });

        const filteredDepartures = allFlights.filter(flight => {
          return flight.departureTime && new Date(flight.departureTime) >= now;
        });

        setArrivals(filteredArrivals);
        setDepartures(filteredDepartures);

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

  if (loading) return <div>Loading flights...</div>;
  if (error) return <div>{error}</div>;

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
          <tr>
            <th>Airline</th>
            <th>Flight</th>
            <th>Date</th>
            <th>Time</th>
            <th>{view === 'arrivals' ? 'From' : 'To'}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flightsToShow.length === 0 ? (
            <tr>
              <td colSpan="6">No flights to display.</td>
            </tr>
          ) : (
            flightsToShow.map(flight => {
              const dateTime = view === 'arrivals' ? flight.arrivalTime : flight.departureTime;
              const [date = '', time = ''] = dateTime ? dateTime.split('T') : ['', ''];

              return (
                <tr key={flight.flightId}>
                  <td>{flight.airline?.airlineName || '—'}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{view === 'arrivals' ? flight.originAirport?.airportName : flight.destinationAirport?.airportName}</td>
                  <td>{flight.status}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AirportFlights;
