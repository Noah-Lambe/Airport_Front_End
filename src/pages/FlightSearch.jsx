import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/UserAuthentication";
import api from "../api/client";

const API = "http://107.23.204.225:8081";

const airportValue = (a) => a.airportId;
const airportLabel = (a) => {
  const city = a.city?.name ? ` · ${a.city.name}` : "";
  return `${a.airportName}${city} (${a.areaCode})`;
};
const airlineValue = (a) => a.airlineId;
const airlineLabel = (a) => a.airlineName;
const gateValue = (g) => g.gateId;
const gateLabel = (g) => `${g.gateName}${g.terminal ? ` · ${g.terminal}` : ""}`;
const aircraftValue = (a) => a.aircraftId;
const aircraftLabel = (a) =>
  `${a.type}${a.airline?.airlineName ? ` · ${a.airline.airlineName}` : ""}`;

const STATUS = [
  "SCHEDULED",
  "BOARDING",
  "IN_AIR",
  "DELAYED",
  "LANDED",
  "CANCELLED",
];

export default function FlightSearchPage() {
  const [filters, setFilters] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      originAirportId: p.get("originAirportId") || "",
      destinationAirportId: p.get("destinationAirportId") || "",
      airlineId: p.get("airlineId") || "",
      gateId: p.get("gateId") || "",
      aircraftId: p.get("aircraftId") || "",
      status: p.get("status") || "",
      flightNumber: p.get("flightNumber") || "",
      departStart: p.get("departStart") || "",
      departEnd: p.get("departEnd") || "",
      arriveStart: p.get("arriveStart") || "",
      arriveEnd: p.get("arriveEnd") || "",
      page: Number(p.get("page") || 0),
      size: Number(p.get("size") || 10),
      sort: p.get("sort") || "departureTime,asc",
    };
  });

  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [gates, setGates] = useState([]);
  const [aircraft, setAircraft] = useState([]);

  const [data, setData] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingOpts, setLoadingOpts] = useState(true);
  const [optsErr, setOptsErr] = useState("");

  // 🔐 auth for booking
  const { currentUser, isLoggedIn } = useAuth();
  const passengerId = currentUser?.passengerId;
  const [bookingId, setBookingId] = useState(null);
  const [bookMsg, setBookMsg] = useState("");

  // dropdown options
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoadingOpts(true);
        const [ap, al, g, ac] = await Promise.all([
          fetch(`${API}/airport`).then((r) => r.json()),
          fetch(`${API}/airlines`).then((r) => r.json()),
          fetch(`${API}/gates`).then((r) => r.json()),
          fetch(`${API}/aircraft`).then((r) => r.json()),
        ]);
        if (cancel) return;
        setAirports(ap || []);
        setAirlines(al || []);
        setGates(g || []);
        setAircraft(ac || []);
      } catch (e) {
        if (!cancel) setOptsErr(e.message);
      } finally {
        if (!cancel) setLoadingOpts(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) p.set(k, v);
    });
    return p.toString();
  }, [filters]);

  useEffect(() => {
    const url = `${API}/flights/search?${qs}`;
    window.history.replaceState({}, "", `/search?${qs}`);
    setLoading(true);
    setError("");
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [qs]);

  const update = (k, v) => setFilters((prev) => ({ ...prev, [k]: v, page: 0 }));
  const changePage = (next) => setFilters((prev) => ({ ...prev, page: next }));

  return (
    <div className="search-layout">
      <aside className="filter-panel">
        <h2>Find flights</h2>
        {optsErr && (
          <div className="error">Error loading options: {optsErr}</div>
        )}
        {loadingOpts && <div className="muted">Loading dropdowns…</div>}

        <label>
          Origin Airport
          <select
            value={filters.originAirportId}
            onChange={(e) => update("originAirportId", e.target.value)}
            disabled={loadingOpts}
          >
            <option value="">Any</option>
            {airports.map((a) => (
              <option key={airportValue(a)} value={airportValue(a)}>
                {airportLabel(a)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Destination Airport
          <select
            value={filters.destinationAirportId}
            onChange={(e) => update("destinationAirportId", e.target.value)}
            disabled={loadingOpts}
          >
            <option value="">Any</option>
            {airports.map((a) => (
              <option key={airportValue(a)} value={airportValue(a)}>
                {airportLabel(a)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Airline
          <select
            value={filters.airlineId}
            onChange={(e) => update("airlineId", e.target.value)}
            disabled={loadingOpts}
          >
            <option value="">Any</option>
            {airlines.map((a) => (
              <option key={airlineValue(a)} value={airlineValue(a)}>
                {airlineLabel(a)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Gate
          <select
            value={filters.gateId}
            onChange={(e) => update("gateId", e.target.value)}
            disabled={loadingOpts}
          >
            <option value="">Any</option>
            {gates.map((g) => (
              <option key={gateValue(g)} value={gateValue(g)}>
                {gateLabel(g)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Aircraft
          <select
            value={filters.aircraftId}
            onChange={(e) => update("aircraftId", e.target.value)}
            disabled={loadingOpts}
          >
            <option value="">Any</option>
            {aircraft.map((a) => (
              <option key={aircraftValue(a)} value={aircraftValue(a)}>
                {aircraftLabel(a)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">Any</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          Flight number
          <input
            placeholder="e.g. AC123"
            value={filters.flightNumber}
            onChange={(e) => update("flightNumber", e.target.value)}
          />
        </label>

        <div className="row">
          <label>
            Depart start
            <input
              type="datetime-local"
              value={filters.departStart}
              onChange={(e) => update("departStart", e.target.value)}
            />
          </label>
          <label>
            Depart end
            <input
              type="datetime-local"
              value={filters.departEnd}
              onChange={(e) => update("departEnd", e.target.value)}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Arrive start
            <input
              type="datetime-local"
              value={filters.arriveStart}
              onChange={(e) => update("arriveStart", e.target.value)}
            />
          </label>
          <label>
            Arrive end
            <input
              type="datetime-local"
              value={filters.arriveEnd}
              onChange={(e) => update("arriveEnd", e.target.value)}
            />
          </label>
        </div>

        <label>
          Sort
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="departureTime,asc">Departure ↑</option>
            <option value="departureTime,desc">Departure ↓</option>
            <option value="arrivalTime,asc">Arrival ↑</option>
            <option value="arrivalTime,desc">Arrival ↓</option>
            <option value="flightNumber,asc">Flight # ↑</option>
            <option value="flightNumber,desc">Flight # ↓</option>
            <option value="status,asc">Status ↑</option>
            <option value="status,desc">Status ↓</option>
          </select>
        </label>
      </aside>

      <main className="results">
        <header className="results-head">
          <h3>Results</h3>
          <div className="meta">
            {loading
              ? "Loading..."
              : error
              ? `Error: ${error}`
              : `${data.totalElements || 0} flights`}
            {bookMsg ? ` · ${bookMsg}` : ""}
          </div>
        </header>

        {!loading && !error && (data.content?.length ?? 0) === 0 && (
          <div className="empty">No flights match your filters.</div>
        )}

        <ul className="flight-list">
          {data.content?.map((f) => (
            <li key={f.flightId} className="flight-card">
              <div className="line">
                <strong>{f.flightNumber}</strong> · {f.status}
              </div>
              <div className="line">
                {f.originAirport?.airportName || "Origin"} (
                {f.originAirport?.areaCode}) →
                {f.destinationAirport?.airportName || "Destination"} (
                {f.destinationAirport?.areaCode})
              </div>
              <div className="line">
                Departs: {f.departureTime} · Arrives: {f.arrivalTime}
              </div>
              <div className="line">
                Airline:{" "}
                {f.airline?.airlineName ?? `#${f.airline?.airlineId ?? ""}`}
              </div>
              <div className="line">
                Gate: {f.gate?.gateName}
                {f.gate?.terminal ? ` · ${f.gate.terminal}` : ""}
              </div>
              <div className="line">Aircraft: {f.aircraft?.type}</div>

              {/* flight booking */}
              <button
                disabled={
                  !isLoggedIn || !passengerId || bookingId === f.flightId
                }
                onClick={async () => {
                  if (!isLoggedIn || !passengerId) {
                    setBookMsg("Please log in first.");
                    return;
                  }
                  try {
                    setBookingId(f.flightId);
                    setBookMsg("");
                    await api.post(`/flights/${f.flightId}/addPassenger`, {
                      passengerId,
                    });
                    setBookMsg(`Booked ${f.flightNumber}.`);

                    localStorage.setItem(
                      "bookings:lastUpdate",
                      String(Date.now())
                    );
                  } catch (e) {
                    setBookMsg(
                      `Booking failed (${e?.response?.status || "error"})`
                    );
                  } finally {
                    setBookingId(null);
                  }
                }}
              >
                {bookingId === f.flightId ? "Booking…" : "Book Flight"}
              </button>
            </li>
          ))}
        </ul>

        <Pagination
          page={filters.page}
          totalPages={data.totalPages || 0}
          onChange={changePage}
        />
      </main>
    </div>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button
        disabled={page === 0}
        onClick={() => onChange(Math.max(0, page - 1))}
      >
        Prev
      </button>
      <span>
        Page {page + 1} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages - 1}
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
      >
        Next
      </button>
    </div>
  );
}
