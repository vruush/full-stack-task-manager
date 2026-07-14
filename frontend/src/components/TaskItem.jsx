import React from "react";

const statusMeta = {
  "To Do": { dot: "#8a93a6", bg: "#eef1f6", text: "#4b5468", border: "#dbe0ea" },
  "In Progress": { dot: "var(--color-amber-500)", bg: "var(--color-amber-50)", text: "var(--color-amber-600)", border: "var(--color-amber-200)" },
  Completed: { dot: "var(--color-brand-500)", bg: "var(--color-brand-50)", text: "var(--color-brand-700)", border: "var(--color-brand-100)" },
};

function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function TaskItem({ task, onEdit, onDelete }) {
  const meta = statusMeta[task.status] || statusMeta["To Do"];
  const date = formatDate(task.created_at);
  const isDone = task.status === "Completed";

  return (
    <div
      className="group card flex items-stretch gap-0 overflow-hidden animate-rise-in"
    >
      <div
        className="w-1.5 shrink-0"
        style={{ backgroundColor: meta.dot }}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0 flex items-start justify-between gap-4 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-semibold truncate ${isDone ? "text-ink-800 " : "text-ink-900"}`}
            >
              {task.title}
            </h4>
            <span
              className="chip"
              style={{ backgroundColor: meta.bg, color: meta.text, borderColor: meta.border }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.dot }} />
              {task.status}
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-ink-500 mt-1 line-clamp-2">{task.description}</p>
          )}
          {date && (
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400 mt-2">
              Added {date}
            </p>
          )}
        </div>

        <div className="flex gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(task)}
            className="btn-ghost !p-2"
            aria-label={`Edit ${task.title}`}
            title="Edit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn-danger-ghost !p-2"
            aria-label={`Delete ${task.title}`}
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
