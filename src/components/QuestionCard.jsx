/**
 * QuestionCard.jsx
 * Displays a single quiz question and its options.
 * Props:
 *   - question: The quiz question string
 *   - options: Array of possible answers
 *   - selected: Currently selected option
 *   - onSelect: Callback function when an option is clicked
 *   - locked: Boolean indicating if selection is locked (after answering)
 *   - correctAnswer: The correct answer string
 */

import React from "react";

export default function QuestionCard({
  question,
  options,
  selected,
  onSelect,
  locked,
  correctAnswer
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md animate-fadeIn">
      {/* --- Question Text --- */}
      <div className="mb-4 text-gray-700" aria-live="polite">
        <h3 className="text-lg font-semibold mb-1">{question}</h3>
      </div>

      {/* --- Options Grid --- */}
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          // Check if this option is currently selected
          const isSelected = selected === opt;

          // Show green if correct and quiz is locked
          const showCorrect = locked && opt === correctAnswer;

          // Show red if selected but incorrect
          const showIncorrect =
            locked && isSelected && selected !== correctAnswer;

          // Base styles for all options
          let base =
            "text-left rounded-lg px-4 py-3 border transition-all duration-200 transform-gpu";

          // Default visual state
          let stateClass = "border-gray-200 bg-white hover:shadow-sm";

          // Override styles based on correctness/selection
          if (showCorrect) stateClass = "border-green-400 bg-green-50";
          else if (showIncorrect) stateClass = "border-red-300 bg-red-50";
          else if (isSelected)
            stateClass = "border-brand-900 bg-brand-900/5";

          // Optional staggered animation delay for appearance
          const animationDelay = `${idx * 40}ms`;

          return (
            <button
              key={idx}
              onClick={() => !locked && onSelect(opt)} // Only selectable if not locked
              disabled={locked} // Prevent click after lock
              aria-pressed={isSelected} // Accessibility: indicates selected state
              style={{ animationDelay }}
              className={`${base} ${stateClass} 
                focus:outline-none focus:ring-2 focus:ring-brand-900 
                active:scale-95 animate-fadeIn`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}