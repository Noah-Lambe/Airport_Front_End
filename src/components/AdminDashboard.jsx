import React, { useState } from "react";
import FlightsAdmin from "./tabs/FlightsAdmin";
import AirlinesAdmin from "./tabs/AirlinesAdmin";
import AirportsAdmin from "./tabs/AirportsAdmin";
import GatesAdmin from "./tabs/GatesAdmin";
import AircraftAdmin from "./tabs/AircraftAdmin";
import PassengersAdmin from "./tabs/PassengersAdmin";
import CitiesAdmin from "./tabs/CitiesAdmin";

const TABS = [
  { key: "Flights", label: "Flights" },
  { key: "Airlines", label: "Airlines" },
  { key: "Airports", label: "Airports" },
  { key: "Gates", label: "Gates" },
  { key: "Aircraft", label: "Aircraft" },
  { key: "Passengers", label: "Passengers" },
  { key: "Cities", label: "Cities" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Flights");

  const renderTab = () => {
    switch (activeTab) {
      case "Flights":
        return <FlightsAdmin />;
      case "Airlines":
        return <AirlinesAdmin />;
      case "Airports":
        return <AirportsAdmin />;
      case "Gates":
        return <GatesAdmin />;
      case "Aircraft":
        return <AircraftAdmin />;
      case "Passengers":
        return <PassengersAdmin />;
      case "Cities":
        return <CitiesAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-root">
      {/* Section header */}
      <section className="section-hero">
        <div className="section-hero__content">
          <h1 className="section-title">ADMIN DASHBOARD</h1>

          {/* Segmented “pill” controls like Arrivals/Departures */}
          <div className="segmented">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`segmented__btn ${
                  activeTab === t.key ? "is-active" : ""
                }`}
                onClick={() => setActiveTab(t.key)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content card */}
      <main className="content-wrap">
        <div className="card">{renderTab()}</div>
      </main>
    </div>
  );
}
