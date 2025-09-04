/**
 * Difficulty.jsx
 * Allows the user to select a quiz difficulty level (Easy, Medium, Hard)
 * and navigates to the quiz page with the chosen difficulty.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Brain, Target, ArrowLeft } from "lucide-react"; // icons for UI
import { motion } from "framer-motion"; // animation library
import PrimaryButton from "../components/PrimaryButton";

// Import local JSON files containing questions
import easyData from "../data/easy.json";
import mediumData from "../data/medium.json";
import hardData from "../data/hard.json";

export default function Difficulty() {
  const navigate = useNavigate();

  // Navigate to quiz page with selected difficulty
  const handleSelect = (level) => {
    navigate("/quiz", { state: { difficulty: level } });
  };

  // Count of questions available in each difficulty
  const questionCounts = {
    easy: easyData.results.length,
    medium: mediumData.results.length,
    hard: hardData.results.length,
  };

  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }, // staggered appearance
    }),
  };

  // Framer Motion variant for icon bounce effect
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: [0, 1.2, 1], transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-[80vh] flex flex-col items-center justify-start text-center px-4"
    >
      {/* --- Top Bar with Back Button --- */}
      <div className="w-full flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Choose Your Challenge</span>
        </button>
      </div>

      {/* --- Page Title --- */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-gray-800 mt-2"
      >
        Select Difficulty Level
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-gray-500 mt-2 mb-12"
      >
        Choose your preferred challenge level to begin the quiz
      </motion.p>

      {/* --- Difficulty Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {[
          {
            label: "Easy",
            icon: <Zap className="w-7 h-7 text-green-600" />,
            bg: "bg-green-100",
            count: questionCounts.easy,
            key: "easy",
          },
          {
            label: "Medium",
            icon: <Brain className="w-7 h-7 text-yellow-600" />,
            bg: "bg-yellow-100",
            count: questionCounts.medium,
            key: "medium",
          },
          {
            label: "Hard",
            icon: <Target className="w-7 h-7 text-red-600" />,
            bg: "bg-red-100",
            count: questionCounts.hard,
            key: "hard",
          },
        ].map((card, idx) => (
          <motion.div
            key={card.key}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
          >
            {/* --- Icon with bounce animation --- */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className={`flex items-center justify-center w-14 h-14 rounded-full mb-4 ${card.bg}`}
            >
              {card.icon}
            </motion.div>

            {/* --- Card Title --- */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.label}</h2>

            {/* --- Description with question count --- */}
            <p className="text-sm text-gray-600 mb-6">
              Contains {card.count}{" "}
              {card.label === "Medium"
                ? "challenging"
                : card.label === "Hard"
                ? "expert-level"
                : "beginner-friendly"}{" "}
              questions
            </p>

            {/* --- Start Quiz Button --- */}
            <PrimaryButton onClick={() => handleSelect(card.key)}>
              Start {card.label} Quiz
            </PrimaryButton>
          </motion.div>
        ))}
      </div>

      {/* --- Footer Note --- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-gray-400 text-sm mt-12"
      >
        Each quiz dynamically loads its set of questions from local data
      </motion.p>
    </motion.div>
  );
}