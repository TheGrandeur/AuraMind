/**
 * api.js
 * Handles fetching and normalizing quiz questions based on difficulty.
 * Currently uses local JSON files instead of an external API.
 */

import easyData from "../data/easy.json";   // Easy level questions
import mediumData from "../data/medium.json"; // Medium level questions
import hardData from "../data/hard.json";    // Hard level questions

/**
 * Fetch questions based on the difficulty level.
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Promise<Array>} Normalized array of question objects
 */
export async function fetchQuestionsForDifficulty(difficulty) {
  let questions = [];

  // Select the corresponding dataset based on difficulty
  if (difficulty === "easy") {
    questions = easyData.results;
  } else if (difficulty === "medium") {
    questions = mediumData.results;
  } else if (difficulty === "hard") {
    questions = hardData.results;
  } else {
    throw new Error("Invalid difficulty selected"); // Guard for invalid input
  }

  // Normalize questions: shuffle options to randomize answer order
  const normalized = questions.map((q) => {
    // Combine correct and incorrect answers
    const options = [...q.incorrect_answers, q.correct_answer];

    // Shuffle using Fisher-Yates algorithm
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]]; // Swap elements
    }

    // Return standardized question object
    return {
      question: q.question,
      correct_answer: q.correct_answer,
      options,
    };
  });

  return normalized; // Return shuffled questions
}