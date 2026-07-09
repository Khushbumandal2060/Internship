import { useEffect, useState } from "react";
import { api } from "./api";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

const TOKEN_KEY = "auth_system_token";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // On load, if we have a stored token, verify it's still valid
  useEffect(() => {
    if (!token) {
      setCheckingSession(false);
      return;
    }
    api
      .me(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      })
      .finally(() => setCheckingSession(false));
  }, [token]);

  const handleAuth = async (form) => {
    setLoading(true);
    setError("");
    try {
      const data = mode === "register" ? await api.register(form) : await api.login(form);
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  if (checkingSession) {
    return (
      <div className="page page--center">
        <p className="page__loading">Checking your sessions…</p>
      </div>
    );
  }

  if (token && user) {
    return (
      <div className="page page--center">
        <Dashboard user={user} token={token} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="page page--center">
      <div className="auth-card">
        <p className="page__eyebrow">Level 3 · User Authentication</p>
        <h1 className="page__title">The Vault</h1>
        <p className="page__subtitle">
          {mode === "register" ? "Create an account to get in." : "Log in to see what's inside."}
        </p>

        <div className="mode-switch">
          <button
            className={mode === "login" ? "mode-switch__btn is-active" : "mode-switch__btn"}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Log in
          </button>
          <button
            className={mode === "register" ? "mode-switch__btn is-active" : "mode-switch__btn"}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <AuthForm mode={mode} onSubmit={handleAuth} error={error} loading={loading} />
      </div>
    </div>
  );
}
