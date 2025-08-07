import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AirportFlights.css';

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
            <th className='tableHeader'>Airline</th>
            <th className='tableHeader'>Flight</th>
            <th className='tableHeader'>Date</th>
            <th className='tableHeader'>Time</th>
            <th className='tableHeader'>{view === 'arrivals' ? 'From' : 'To'}</th>
            <th className='tableHeader'>Status</th>
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
                  <td className='tableElement'>{flight.airline?.airlineName || '—'}</td>
                  <td className='tableElement'>{flight.flightNumber}</td>
                  <td className='tableElement'>{date}</td>
                  <td className='tableElement'>{time}</td>
                  <td className='tableElements'>{view === 'arrivals' ? flight.originAirport?.airportName : flight.destinationAirport?.airportName}</td>
                  <td className='tableElements'>{flight.status}</td>
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
