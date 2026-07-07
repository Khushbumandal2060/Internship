import { useState } from "react";

export default function AuthForm({ mode, onSubmit, error, loading }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {mode === "register" && (
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            autoComplete="name"
            required
          />
        </label>
      )}

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          autoComplete="email"
          required
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          autoComplete={mode === "register" ? "new-password" : "current-password"}
          minLength={mode === "register" ? 8 : undefined}
          required
        />
      </label>

      {mode === "register" && (
        <p className="field-hint">At least 8 characters.</p>
      )}

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
        {loading ? "Please wait…" : mode === "register" ? "Create account" : "Log in"}
      </button>
    </form>
  );
}
