import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestionsForDifficulty } from "../utils/api";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import PrimaryButton from "../components/PrimaryButton"; // ✅ add PrimaryButton

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = (location.state && location.state.difficulty) || "easy";

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]); 
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

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

  useEffect(() => {
    setSelected(null);
    setLocked(false);
    setTimeLeft(30);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [index, questions]);

  useEffect(() => {
    if (timeLeft <= 0) handleLockSelection(null, true);
  }, [timeLeft]);

  function handleSelect(opt) {
    setSelected(opt);
  }

  function handleLockSelection(opt = null, timedOut = false) {
    const current = questions[index];
    const sel = opt === null ? selected : opt;
    const record = {
      question: current.question,
      selected: sel,
      correct: current.correct_answer,
      isCorrect: sel === current.correct_answer,
      timedOut: timedOut && sel == null,
    };
    setAnswers((prev) => [...prev, record]);
    setLocked(true);

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
      } else {
        navigate("/results", { state: { answers: [...answers, record], difficulty } });
      }
    }, 700);
  }

  function handleNext() {
    if (!selected) return;
    handleLockSelection(selected, false);
  }

  function handleSkip() {
    handleLockSelection(null, false);
  }

  function handlePrevious() {
    if (index === 0) return;
    setIndex((i) => i - 1);
    setAnswers((prev) => prev.slice(0, -1));
  }

  function handleFinish() {
    if (!selected) return;
    handleLockSelection(selected, false);
  }

  if (loading) return <div className="bg-white rounded-2xl p-6 shadow">Loading questions…</div>;
  if (error) return <div className="bg-white rounded-2xl p-6 shadow text-red-600">Error: {error}</div>;
  if (!questions.length) return <div className="bg-white rounded-2xl p-6 shadow">No questions found.</div>;

  const current = questions[index];

  return (
    <div className="max-w-2xl mx-auto grid gap-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Difficulty: <strong className="capitalize">{difficulty}</strong>
          </div>
          <div className="text-sm text-gray-600">
            Time: <strong>{timeLeft}s</strong>
          </div>
        </div>

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

        <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
          {/* Previous Button (Green Gradient) */}
          <PrimaryButton
            onClick={handlePrevious}
            disabled={index === 0}
            className="bg-gradient-to-r from-green-500 to-green-600"
          >
            Previous
          </PrimaryButton>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Skip Button (Red Gradient) */}
            <PrimaryButton
              onClick={handleSkip}
              disabled={locked}
              className="bg-gradient-to-r from-red-500 to-red-600"
            >
              Skip
            </PrimaryButton>

            {/* Next / Finish Buttons (Blue Gradient Default) */}
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