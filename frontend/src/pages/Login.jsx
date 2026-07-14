import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
            Welcome back
          </h1>
          <p className="text-sm text-ink-500 mt-1.5">
            Log in to manage your tasks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-4">
          {error && (
            <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5">
              {error}
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mt-1" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
          <p className="text-center text-sm text-ink-500 pt-1">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-600 font-semibold hover:underline" style={{ color: "var(--color-brand-600)" }}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
