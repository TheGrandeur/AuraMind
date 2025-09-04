import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Brain, Target, ArrowLeft } from "lucide-react";

export default function Difficulty() {
  const navigate = useNavigate();

  const handleSelect = (level) => {
    navigate("/quiz", { state: { difficulty: level } });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start text-center px-4">
      {/* Top Bar with Back Button */}
      <div className="w-full flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Choose Your Challenge</span>
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
        Select Difficulty Level
      </h1>
      <p className="text-gray-500 mt-2 mb-12">
        Choose your preferred challenge level to begin the quiz
      </p>

      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Easy */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
            <Zap className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Easy</h2>
          <p className="text-sm text-gray-600 mb-6">
            Perfect for beginners – gentle questions to get you started
          </p>
          <button
            onClick={() => handleSelect("easy")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Start Easy Quiz
          </button>
        </div>

        {/* Medium */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-4">
            <Brain className="w-7 h-7 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Medium</h2>
          <p className="text-sm text-gray-600 mb-6">
            Ready for a challenge? Test your knowledge here
          </p>
          <button
            onClick={() => handleSelect("medium")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Start Medium Quiz
          </button>
        </div>

        {/* Hard */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
            <Target className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Hard</h2>
          <p className="text-sm text-gray-600 mb-6">
            Expert level – only for the truly brave!
          </p>
          <button
            onClick={() => handleSelect("hard")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Start Hard Quiz
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-gray-400 text-sm mt-12">
        Each quiz contains 5 carefully selected questions with a 30-second timer per question
      </p>
    </div>
  );
}