import React, { useState, useEffect } from "react";

const STATUSES = ["To Do", "In Progress", "Completed"];

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, status });
    if (!editingTask) {
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row flex-wrap gap-3">
      <input
        className="input-field flex-1 min-w-[160px]"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="input-field flex-1 min-w-[160px]"
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="input-field sm:w-40 cursor-pointer"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="submit" className="btn-primary whitespace-nowrap">
          {editingTask ? "Update" : "Add task"}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
