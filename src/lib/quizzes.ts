/**
 * Placeholder quiz data — shape only. Replace with your own questions.
 */

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const placeholderQuiz: QuizQuestion[] = [
  {
    question: "This is a placeholder question. Which option is correct?",
    options: ["Option A", "Option B (correct)", "Option C", "Option D"],
    answer: 1,
    explanation:
      "This is placeholder explanation text — swap it for your own content.",
  },
  {
    question: "Placeholder question two: pick the right answer.",
    options: ["Option A (correct)", "Option B", "Option C"],
    answer: 0,
    explanation:
      "Another placeholder explanation. Replace all of this with real material.",
  },
];
