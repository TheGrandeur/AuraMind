/**
 * Quiz.jsx
 * Main quiz component that handles fetching questions, displaying them, tracking answers,
 * implementing timers, and navigation to results.
 */

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestionsForDifficulty } from "../utils/api"; // function to fetch questions
import QuestionCard from "../components/QuestionCard"; // single question UI
import ProgressBar from "../components/ProgressBar"; // progress bar UI
import PrimaryButton from "../components/PrimaryButton"; // reusable button component

export default function Quiz() {
  const location = useLocation(); // get state passed from Difficulty page
  const navigate = useNavigate(); // navigate programmatically
  const difficulty = (location.state && location.state.difficulty) || "easy";

  // --- State variables ---
  const [questions, setQuestions] = useState([]); // holds all quiz questions
  const [loading, setLoading] = useState(true); // shows loading state
  const [error, setError] = useState(""); // shows fetch errors
  const [index, setIndex] = useState(0); // current question index
  const [answers, setAnswers] = useState([]); // stores user's answers
  const [selected, setSelected] = useState(null); // currently selected option
  const [locked, setLocked] = useState(false); // disables selection after answering
  const [timeLeft, setTimeLeft] = useState(30); // countdown timer per question
  const timerRef = useRef(null); // reference for interval

  // --- Fetch questions on component mount ---
  useEffect(() => {
    setLoading(true);
    setError("");
    fetchQuestionsForDifficulty(difficulty)
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load questions");
        setLoading(false);
      });
  }, [difficulty]);

  // --- Reset selection, lock state, and timer on question change ---
  useEffect(() => {
    setSelected(null);
    setLocked(false);
    setTimeLeft(30); // reset timer
    if (timerRef.current) clearInterval(timerRef.current); // clear previous timer
    timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000); // start countdown
    return () => clearInterval(timerRef.current); // cleanup on unmount
  }, [index, questions]);

  // --- Auto-lock question if timer reaches zero ---
  useEffect(() => {
    if (timeLeft <= 0) handleLockSelection(null, true);
  }, [timeLeft]);

  // --- Handle user selecting an option ---
  function handleSelect(opt) {
    setSelected(opt);
  }

  // --- Lock the selection, record answer, move to next question or results ---
  function handleLockSelection(opt = null, timedOut = false) {
    const current = questions[index];
    const sel = opt === null ? selected : opt; // if opt null, use current selection
    const record = {
      question: current.question,
      selected: sel,
      correct: current.correct_answer,
      isCorrect: sel === current.correct_answer,
      timedOut: timedOut && sel == null, // true if auto-locked with no selection
    };
    setAnswers((prev) => [...prev, record]);
    setLocked(true); // prevent further changes

    // Move to next question or results after a short delay
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        navigate("/results", { state: { answers: [...answers, record], difficulty } });
      }
    }, 700); // delay allows UI feedback
  }

  // --- Next button handler ---
  function handleNext() {
    if (!selected) return; // prevent moving without selection
    handleLockSelection(selected, false);
  }

  // --- Skip button handler ---
  function handleSkip() {
    handleLockSelection(null, false);
  }

  // --- Previous button handler ---
  function handlePrevious() {
    if (index === 0) return; // can't go before first question
    setIndex((i) => i - 1);
    setAnswers((prev) => prev.slice(0, -1)); // remove last answer
  }

  // --- Finish button handler ---
  function handleFinish() {
    if (!selected) return;
    handleLockSelection(selected, false);
  }

  // --- Loading / Error / Empty states ---
  if (loading) return <div className="bg-white rounded-2xl p-6 shadow">Loading questions…</div>;
  if (error) return <div className="bg-white rounded-2xl p-6 shadow text-red-600">Error: {error}</div>;
  if (!questions.length) return <div className="bg-white rounded-2xl p-6 shadow">No questions found.</div>;

  const current = questions[index]; // current question object

  return (
    <div className="max-w-2xl mx-auto grid gap-6">
      {/* --- Quiz Card --- */}
      <div className="bg-white rounded-2xl p-6 shadow">
        {/* Top info: Difficulty & Timer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Difficulty: <strong className="capitalize">{difficulty}</strong>
          </div>
          <div className="text-sm text-gray-600">
            Time: <strong>{timeLeft}s</strong>
          </div>
        </div>

        {/* Question & Progress */}
        <div className="mt-4">
          <ProgressBar current={index + 1} total={questions.length} />
          <QuestionCard
            question={current.question}
            options={current.options}
            selected={selected}
            onSelect={handleSelect}
            locked={locked}
            correctAnswer={current.correct_answer}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
          {/* Previous Button (Green) */}
          <PrimaryButton
            onClick={handlePrevious}
            disabled={index === 0}
            className="bg-gradient-to-r from-green-500 to-green-600"
          >
            Previous
          </PrimaryButton>

          {/* Skip / Next / Finish Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Skip Button (Red) */}
            <PrimaryButton
              onClick={handleSkip}
              disabled={locked}
              className="bg-gradient-to-r from-red-500 to-red-600"
            >
              Skip
            </PrimaryButton>

            {/* Next or Finish */}
            {index + 1 < questions.length ? (
              <PrimaryButton onClick={handleNext} disabled={!selected}>
                Next
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={handleFinish} disabled={!selected}>
                Finish Quiz
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}