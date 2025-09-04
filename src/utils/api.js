import easyData from "../data/easy.json";
import mediumData from "../data/medium.json";
import hardData from "../data/hard.json";

// ✅ Always load questions from local JSON files
export async function fetchQuestionsForDifficulty(difficulty) {
  let questions = [];

  if (difficulty === "easy") {
    questions = easyData.results;
  } else if (difficulty === "medium") {
    questions = mediumData.results;
  } else if (difficulty === "hard") {
    questions = hardData.results;
  } else {
    throw new Error("Invalid difficulty selected");
  }

  // Normalize (shuffle options, same as API did)
  const normalized = questions.map((q) => {
    const options = [...q.incorrect_answers, q.correct_answer];

    // Shuffle the options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return {
      question: q.question,
      correct_answer: q.correct_answer,
      options,
    };
  });

  return normalized;
}