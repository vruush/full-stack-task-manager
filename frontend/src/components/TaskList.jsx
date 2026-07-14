import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="card p-10 text-center animate-rise-in">
        <div
          className="mx-auto mb-3 h-11 w-11 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "var(--color-paper-100)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-500)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <p className="font-display text-lg text-ink-900">Nothing here yet</p>
        <p className="text-sm text-ink-500 mt-1">Add your first task above to start the ledger.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
