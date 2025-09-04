import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const answers = state.answers || [];

  // compute score
  const score = useMemo(() => answers.filter(a => a.isCorrect).length, [answers]);

  // localStorage for high score
  useEffect(() => {
    const key = `quiz_highscore_${state.difficulty || "easy"}`;
    const existing = Number(localStorage.getItem(key) || 0);
    if (score > existing) localStorage.setItem(key, String(score));
  }, [score, state.difficulty]);

  const highScore = Number(localStorage.getItem(`quiz_highscore_${state.difficulty || "easy"}`) || 0);

  function restart() {
    // restart same difficulty
    navigate("/quiz", { state: { difficulty: state.difficulty || "easy" } });
  }

  function goHome() {
    navigate("/");
  }

  if (!answers.length) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold">No results yet</h2>
        <p className="text-sm text-gray-600">Please take a quiz first.</p>
        <div className="mt-4">
          <button onClick={() => navigate("/difficulty")} className="px-4 py-2 rounded-lg bg-brand-900 text-white">Start Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-6">
      <div className="bg-white rounded-2xl p-6 shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Results</h2>
        <p className="text-gray-700 mb-3">You scored <strong>{score}/{answers.length}</strong></p>
        <p className="text-sm text-gray-500 mb-3">High Score ({state.difficulty || "easy"}): {highScore}/{answers.length}</p>

        <div className="flex items-center justify-center gap-3">
          <button onClick={goHome} className="px-4 py-2 rounded-lg border">Go to Home</button>
          <button onClick={restart} className="px-4 py-2 rounded-lg bg-brand-900 text-white">Restart Quiz</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Answer Breakdown</h3>
        <div className="space-y-4">
          {answers.map((a, idx) => (
            <div key={idx} className="p-4 rounded-lg border">
              <div className="mb-2 text-gray-700 font-medium">Q{idx + 1}: {a.question}</div>
              <div className="text-sm">
                <div>
                  Your answer:{" "}
                  <span className={a.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {a.selected ?? "(no answer)"}
                  </span>
                </div>
                <div>Correct answer: <span className="font-medium">{a.correct}</span></div>
                {a.timedOut && <div className="text-xs text-gray-500">Auto-locked due to timeout</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}