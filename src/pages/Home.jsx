/**
 * Home.jsx
 * The landing page for the Aura Farmer Quiz app.
 * Displays a welcome header, hero section, and feature highlights.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Brain, Zap, Trophy } from "lucide-react"; // icons for feature cards
import { motion } from "framer-motion"; // animation library
import PrimaryButton from "../components/PrimaryButton"; // reusable button component

export default function Home() {
  // Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 16 }, // initial hidden state
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }, // staggered appearance
    }),
  };

  // Framer Motion variants for icon pop/bounce effect
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
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
    >
      {/* --- Header Section --- */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900">
            Welcome, Aura Farmer
          </h1>
        </div>
      </motion.header>

      {/* --- Hero Card Section --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full mb-12"
      >
        <div className="flex flex-col items-center">
          {/* Icon with bounce animation */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-4"
          >
            <Zap className="w-7 h-7 text-purple-600" />
          </motion.div>

          {/* Hero Title */}
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Challenge Your Mind,
            <br />
            Farm some Aura Points
          </motion.h2>

          {/* Hero Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            Farm your aura like a pro across multiple difficulty levels.
            <br />
            Track your “unstoppable” progress and flex that highest score aura
            <br />
            "If you can even get there. 😏"
          </motion.p>

          {/* Start Quiz Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Link to="/difficulty">
              <PrimaryButton>Start Quiz Challenge</PrimaryButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* --- Feature Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {[
          {
            title: "Multiple Difficulties",
            text: "Choose from Easy, Medium, or Hard questions to match your skill level",
            icon: <Brain className="w-6 h-6 text-green-600" />,
            bg: "bg-green-100",
          },
          {
            title: "Timed Challenges",
            text: "30-second timer per question keeps the excitement high",
            icon: <Zap className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-100",
          },
          {
            title: "Track Your Best",
            text: "Save your highest scores and see detailed results",
            icon: <Trophy className="w-6 h-6 text-yellow-600" />,
            bg: "bg-yellow-100",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
          >
            {/* Card Icon with bounce animation */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 ${card.bg}`}
            >
              {card.icon}
            </motion.div>

            {/* Card Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h3>

            {/* Card Description */}
            <p className="text-sm text-gray-600">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}