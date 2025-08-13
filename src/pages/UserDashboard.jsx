import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/UserAuthentication";
import api from "../api/client";

function fmt(dt) {
  if (!dt) return "";
  const d = new Date(dt.replace(" ", "T"));
  return d.toLocaleString();
}

export default function UserDashboard() {
  const { currentUser, isLoggedIn } = useAuth();
  const passengerId = currentUser?.passengerId;
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch upcoming flights when user is ready
  useEffect(() => {
    if (!isLoggedIn || !passengerId) return;
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await api.get(`/flights/byPassenger/${passengerId}`);
        if (!cancel) setUpcoming(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancel) setErr(e?.message || "Failed to load flights");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, [isLoggedIn, passengerId]);

  const stats = useMemo(
    () => ({
      totalUpcoming: upcoming.length,
      byStatus: upcoming.reduce((acc, f) => {
        acc[f.status] = (acc[f.status] || 0) + 1;
        return acc;
      }, {}),
    }),
    [upcoming]
  );

  if (!isLoggedIn) {
    return (
      <div className="dash">
        <section className="panel">
          <div className="panel-head">
            <h2>Welcome</h2>
          </div>
          <div className="empty">Please log in to view your dashboard.</div>
        </section>
      </div>
    );
  }

  if (!passengerId) {
    return (
      <div className="dash">
        <section className="panel">
          <div className="panel-head">
            <h2>Account issue</h2>
          </div>
          <div className="empty">
            Your user doesn’t include a <code>passengerId</code>. Make sure your
            <code>/auth/login</code> response includes it and is saved to{" "}
            <code>localStorage.user</code>.
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="dash">
      <header className="dash-header">
        <h1>My Dashboard</h1>
      </header>

      <section className="cards">
        <div className="kpi">
          <div className="kpi-label">Upcoming flights</div>
          <div className="kpi-value">{stats.totalUpcoming}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Statuses</div>
          <div className="kpi-chips">
            {Object.entries(stats.byStatus).map(([s, n]) => (
              <span key={s} className={`chip chip-${s.toLowerCase()}`}>
                {s}: {n}
              </span>
            ))}
            {Object.keys(stats.byStatus).length === 0 && (
              <span className="muted">—</span>
            )}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Upcoming flights</h2>
          <div className="muted">
            {loading
              ? "Loading…"
              : err
              ? `Error: ${err}`
              : `${upcoming.length} total`}
          </div>
        </div>

        {!loading && !err && upcoming.length === 0 && (
          <div className="empty">No upcoming flights for your account.</div>
        )}

        <ul className="flight-list">
          {upcoming.map((f) => (
            <li key={f.flightId} className="flight-card">
              <div className="line top">
                <strong>{f.flightNumber}</strong>
                <span className={`status ${f.status?.toLowerCase()}`}>
                  {f.status}
                </span>
              </div>
              <div className="line">
                {f.originAirport?.airportName || "Origin"} (
                {f.originAirport?.areaCode}) →
                {f.destinationAirport?.airportName || "Destination"} (
                {f.destinationAirport?.areaCode})
              </div>
              <div className="line">
                Departs: {fmt(f.departureTime)} · Arrives: {fmt(f.arrivalTime)}
              </div>
              <div className="line sub">
                Airline:{" "}
                {f.airline?.airlineName ?? `#${f.airline?.airlineId ?? ""}`} ·
                Gate: {f.gate?.gateName}
                {f.gate?.terminal ? ` · ${f.gate.terminal}` : ""} · Aircraft:{" "}
                {f.aircraft?.type}
              </div>
              <div className="actions">
                <a className="btn ghost" href={`/flights/${f.flightId}`}>
                  View details
                </a>

                <button
                  className="btn"
                  onClick={() => alert(`Check-in for ${f.flightNumber}`)}
                >
                  Check in
                </button>

                <button
                  className="btn danger"
                  disabled={cancellingId === f.flightId}
                  onClick={async () => {
                    try {
                      setCancellingId(f.flightId);
                      await api.delete(
                        `/flights/${f.flightId}/passengers/${passengerId}`
                      );
                      setUpcoming((prev) =>
                        prev.filter((x) => x.flightId !== f.flightId)
                      );
                      // Notify other tabs/components
                      localStorage.setItem(
                        "bookings:lastUpdate",
                        String(Date.now())
                      );
                    } catch (e) {
                      alert(
                        `Cancel failed: ${e?.response?.status || ""} ${
                          e?.message || ""
                        }`
                      );
                    } finally {
                      setCancellingId(null);
                    }
                  }}
                >
                  {cancellingId === f.flightId ? "Cancelling…" : "Cancel"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
