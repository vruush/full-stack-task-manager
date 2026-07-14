import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Logo from "../components/Logo";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm animate-rise-in">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size={48} />
          <h1 className="font-display text-3xl font-semibold text-ink-900 mt-4">
            Create your account
          </h1>
          <p className="text-sm text-ink-500 mt-1.5">
            Start organizing your tasks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-4">
          {error && (
            <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
              {success}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide uppercase">
              Username
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1.5 tracking-wide uppercase">
              Password
            </label>
            <input
              className="input-field"
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-1" disabled={loading}>
            {loading ? "Creating account…" : "Sign up"}
          </button>
          <p className="text-center text-sm text-ink-500 pt-1">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: "var(--color-brand-600)" }}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
