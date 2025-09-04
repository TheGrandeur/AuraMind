/**
 * ProgressBar.jsx
 * Displays a visual progress bar for quizzes.
 * Props:
 *   - current: Current question number
 *   - total: Total number of questions
 */

import React from "react";

export default function ProgressBar({ current, total }) {
  // Calculate percentage completion
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-3">
      {/* --- Progress Text --- */}
      {/* Shows current question / total and the percentage */}
      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <div>Question {current} of {total}</div>
        <div>{pct}%</div>
      </div>

      {/* --- Progress Bar Container --- */}
      {/* White background bar with rounded corners and inner shadow */}
      <div className="bg-white rounded-full h-2 shadow-inner">
        {/* --- Progress Fill --- */}
        {/* Width dynamically set to percentage of completion */}
        {/* Gradient fill with smooth animation */}
        <div
          className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-600 to-indigo-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}