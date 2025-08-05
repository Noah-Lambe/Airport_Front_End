import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirportFlights = () => {
    const [view, setView] = useState('arrivals');
    const []

    const arrivals = [
    { id: 1, flight: 'AA123', from: 'New York' },
    { id: 2, flight: 'BA456', from: 'London' },
    ];

    const departures = [
    { id: 3, flight: 'DL789', to: 'Paris' },
    { id: 4, flight: 'UA321', to: 'Tokyo' },
    ];

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
                        <tr key={flight.id}>
                            <td>{flight.flight}</td>
                            <td>{view === 'arrivals' ? flight.from : flight.to}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AirportFlights;