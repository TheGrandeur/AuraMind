import React from "react";
import { Link } from "react-router-dom";
import { Brain, Zap, Trophy } from "lucide-react"; // icons from lucide-react

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900">
            Welcome, Vaibhav Gupta
          </h1>
        </div>
      </header>

      {/* Hero Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full mb-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-4">
            <Zap className="w-7 h-7 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Challenge Your Mind,
            <br />
            Farm some Aura Points
          </h2>
          <p className="text-gray-600 mb-6">
            Farm your aura like a pro across multiple difficulty levels.
            <br />
            Track your “unstoppable” progress and flex that highest score aura
            <br />
            "If you can even get there. 😏"
          </p>
          <Link
            to="/difficulty"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Start Quiz Challenge
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {/* Difficulty */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
            <Brain className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Multiple Difficulties
          </h3>
          <p className="text-sm text-gray-600">
            Choose from Easy, Medium, or Hard questions to match your skill level
          </p>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Timed Challenges
          </h3>
          <p className="text-sm text-gray-600">
            30-second timer per question keeps the excitement high
          </p>
        </div>

        {/* High Score */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-3">
            <Trophy className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Track Your Best
          </h3>
          <p className="text-sm text-gray-600">
            Save your highest scores and see detailed results
          </p>
        </div>
      </div>
    </div>
  );
}