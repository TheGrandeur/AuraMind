import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Brain } from "lucide-react"; // Icon used in header/logo
import Home from "./pages/Home";        // Home page component
import Difficulty from "./pages/Difficulty"; // Difficulty selection page
import Quiz from "./pages/Quiz";        // Quiz page
import Results from "./pages/Results";  // Results page

// Header component: displayed on all pages
function Header() {
  return (
    <header className="bg-gradient-to-r from-red-700 to-indigo-800 text-white shadow">
      {/* Container with max width and horizontal padding */}
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-center">
        {/* Logo linking to Home */}
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="w-7 h-7 text-purple-200" /> {/* Brain icon */}
          <span className="text-4xl font-bold tracking-wide">AuraMind</span> {/* App name */}
        </Link>
      </div>
    </header>
  );
}

// Main App component
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header is always visible */}
      <Header />

      {/* Main content area */}
      <main className="flex-1 py-8 bg-red-100">
        <div className="max-w-5xl mx-auto px-4">
          {/* Define application routes */}
          <Routes>
            <Route path="/" element={<Home />} />               {/* Home page */}
            <Route path="/difficulty" element={<Difficulty />} /> {/* Difficulty selection */}
            <Route path="/quiz" element={<Quiz />} />           {/* Quiz page */}
            <Route path="/results" element={<Results />} />     {/* Results page */}
          </Routes>
        </div>
      </main>

      {/* Footer: always visible */}
      <footer className="text-center text-xl bg-gradient-to-r from-red-700 to-indigo-800 text-white shadow">
        Built with ❤️ • Vaibhav Gupta
      </footer>
    </div>
  );
}