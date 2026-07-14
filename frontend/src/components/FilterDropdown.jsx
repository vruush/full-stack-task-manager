import React from "react";

const STATUSES = ["All", "To Do", "In Progress", "Completed"];

export default function FilterDropdown({ value, onChange }) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full p-1 bg-white border"
      style={{ borderColor: "var(--color-paper-200)" }}
      role="tablist"
      aria-label="Filter tasks by status"
    >
      {STATUSES.map((s) => {
        const active = value === s;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(s)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap"
            style={
              active
                ? { backgroundColor: "var(--color-ink-900)", color: "white" }
                : { color: "var(--color-ink-500)" }
            }
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
