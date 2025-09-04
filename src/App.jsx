import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Brain } from "lucide-react"; // icon for logo
import Home from "./pages/Home";
import Difficulty from "./pages/Difficulty";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-700 to-indigo-800 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-center">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="w-7 h-7 text-purple-200" />
          <span className="text-4xl font-bold tracking-wide">AuraMind</span>
        </Link>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 bg-red-100">
        <div className="max-w-5xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/difficulty" element={<Difficulty />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center text-xl bg-gradient-to-r from-red-700 to-indigo-800 text-white shadow">
        Built with ❤️ • Vaibhav Gupta
      </footer>
    </div>
  );
}