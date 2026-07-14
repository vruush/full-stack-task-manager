import React, { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterDropdown from "../components/FilterDropdown";
import Logo from "../components/Logo";

const todayLabel = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = filter !== "All" ? { status: filter } : {};
      const res = await api.get("/tasks", { params });
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const fetchAllTasks = useCallback(async () => {
    try {
      const res = await api.get("/tasks");
      setAllTasks(res.data);
    } catch {
      
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks, tasks]);

  const handleAddOrUpdate = async (taskData) => {
    setError("");
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask.id}`, taskData);
        setEditingTask(null);
      } else {
        await api.post("/tasks", taskData);
      }
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
    }
  };

  const total = allTasks.length;
  const done = allTasks.filter((t) => t.status === "Completed").length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen">
      <header
        className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10"
        style={{ borderColor: "var(--color-paper-200)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Logo size={38} />
            <div className="min-w-0">
              <p className="text-xs text-ink-500 leading-none font-mono uppercase tracking-wide">
                Signed in
              </p>
              <p className="font-semibold text-ink-900 leading-tight truncate">
                {user?.username}
              </p>
            </div>
          </div>
          <button onClick={logout} className="btn-secondary shrink-0">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* <div className="mb-8 animate-rise-in">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-400">
            {todayLabel}
          </p>
          <div className="flex items-end justify-between gap-6 mt-1 flex-wrap">
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900">
              Your ledger
            </h1>
            {total > 0 && (
              <div className="flex items-center gap-3">
                <div
                  className="relative h-12 w-12 rounded-full shrink-0"
                  style={{
                    background: `conic-gradient(var(--color-brand-500) ${pct * 3.6}deg, var(--color-paper-200) 0deg)`,
                  }}
                >
                  <div className="absolute inset-1 rounded-full bg-[var(--color-paper-50)] flex items-center justify-center">
                    <span className="text-[11px] font-mono font-medium text-ink-700">
                      {pct}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-ink-500 leading-tight">
                  {done} of {total}
                  <br />
                  complete
                </p>
              </div>
            )}
          </div>
        </div> */}

        {error && (
          <div className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2.5 animate-rise-in">
            {error}
          </div>
        )}

        <div className="card p-5 sm:p-6 mb-8 animate-rise-in">
          <h2 className="text-xs font-semibold text-ink-700 mb-3 tracking-wide uppercase">
            {editingTask ? "Edit task" : "Add a new task"}
          </h2>
          <TaskForm
            onSubmit={handleAddOrUpdate}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </div>

        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="font-display text-xl font-semibold text-ink-900">Your Tasks</h2>
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card p-4 h-[72px] animate-pulse" style={{ backgroundColor: "var(--color-paper-100)" }} />
            ))}
          </div>
        ) : (
          <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
