import React from "react";


export default function Logo({ size = 40 }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl shrink-0"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(155deg, var(--color-brand-500), var(--color-brand-700))",
      }}
    >
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="none">
        <path d="M5 3.5h11a2.5 2.5 0 0 1 2.5 2.5v14.5H7.5A2.5 2.5 0 0 1 5 18V3.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M5 18a2.5 2.5 0 0 1 2.5-2.5h11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8h5.5M9 11.2h5.5" stroke="#E8A13A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
