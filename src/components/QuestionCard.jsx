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
    <div className="bg-white rounded-2xl p-6 shadow-md fade-in">
      <div className="mb-4 text-gray-700" aria-live="polite">
        <h3 className="text-lg font-semibold mb-1">{question}</h3>
      </div>

      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const showCorrect = locked && opt === correctAnswer;
          const showIncorrect = locked && isSelected && selected !== correctAnswer;

          let base = "text-left rounded-lg px-4 py-3 border";
          let stateClass = "border-gray-200 bg-white hover:shadow-sm";
          if (showCorrect) stateClass = "border-green-400 bg-green-50";
          else if (showIncorrect) stateClass = "border-red-300 bg-red-50";
          else if (isSelected) stateClass = "border-brand-900 bg-brand-900/5";

          return (
            <button
              key={idx}
              onClick={() => !locked && onSelect(opt)}
              disabled={locked}
              className={`${base} ${stateClass} focus:outline-none focus:ring-2 focus:ring-brand-900 transition`}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}