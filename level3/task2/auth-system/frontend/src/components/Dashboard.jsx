import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard({ user, token, onLogout }) {
  const [status, setStatus] = useState("Checking access…");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .dashboard(token)
      .then((data) => {
        if (!cancelled) setStatus(data.message);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="dashboard">
      <div className="dashboard__badge">ACCESS GRANTED</div>
      <h1>Welcome, {user.name}</h1>
      <p className="dashboard__email">{user.email}</p>

      <div className="dashboard__panel">
        <p className="dashboard__label">Protected route response</p>
        {error ? (
          <p className="form-error">{error}</p>
        ) : (
          <p className="dashboard__status">{status}</p>
        )}
      </div>

      <button className="btn btn--ghost" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
