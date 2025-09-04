/**
 * Results.jsx
 * Displays quiz results, high score tracking, and detailed answer breakdown.
 * Confetti animation runs every time the page loads.
 */

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import PrimaryButton from "../components/PrimaryButton";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const answers = state.answers || [];

  const score = useMemo(() => answers.filter((a) => a.isCorrect).length, [answers]);
  const difficulty = state.difficulty || "easy";

  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Trigger confetti on every page load ---
  useEffect(() => {
    setShowConfetti(true); // show confetti every time

    // Update high score in localStorage
    const key = `quiz_highscore_${difficulty}`;
    const existing = Number(localStorage.getItem(key) || 0);
    if (score > existing) {
      localStorage.setItem(key, String(score));
      setHighScore(score);
    } else {
      setHighScore(existing);
    }
  }, [score, difficulty]);

  // Optional: navigation handlers
  function restart() {
    navigate("/quiz", { state: { difficulty } });
  }

  function goHome() {
    navigate("/");
  }

  if (!answers.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl p-6 shadow max-w-md mx-auto mt-12 text-center"
      >
        <h2 className="text-xl font-semibold">No results yet</h2>
        <p className="text-sm text-gray-600">Please take a quiz first.</p>
        <div className="mt-4">
          <PrimaryButton onClick={() => navigate("/difficulty")}>Start Quiz</PrimaryButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-3xl mx-auto grid gap-6 mt-8 relative"
    >
      {/* Confetti animation */}
      {showConfetti && <Confetti numberOfPieces={300} recycle={false} gravity={0.2} />}

      {/* Quiz summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl p-6 shadow text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Your Quiz Result</h2>
        <p className="text-gray-700 mb-3">
          You scored <strong>{score}/{answers.length}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-3">
          High Score ({difficulty}): {highScore}/{answers.length}
        </p>

        <div className="flex items-center justify-center gap-3">
          <PrimaryButton onClick={goHome}>Go to Home</PrimaryButton>
          <PrimaryButton onClick={restart}>Restart Quiz</PrimaryButton>
        </div>
      </motion.div>

      {/* Answer breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Answer Breakdown</h3>
        <div className="space-y-4">
          {answers.map((a, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="p-4 rounded-lg border"
            >
              <div className="mb-2 text-gray-700 font-medium">
                Q{idx + 1}: {a.question}
              </div>
              <div className="text-sm space-y-1">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 + 0.1 }}
                  className={a.isCorrect ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}
                >
                  Your answer: {a.selected ?? "(no answer)"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 + 0.15 }}
                >
                  Correct answer: <span className="font-medium">{a.correct}</span>
                </motion.div>
                {a.timedOut && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 + 0.2 }}
                    className="text-xs text-gray-500"
                  >
                    Auto-locked due to timeout
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}