import React from "react";

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-3">
      {/* Progress Text */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <div>Question {current} of {total}</div>
        <div>{pct}%</div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-full h-2 shadow-inner">
        <div
          className="bg-brand-900 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}