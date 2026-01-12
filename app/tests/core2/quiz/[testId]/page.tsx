"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Custom hook to calculate dynamic font sizes
const useDynamicFontSize = (question: string, options: string[]) => {
  return useMemo(() => {
    const questionLength = question.length;
    const maxOptionLength = Math.max(...options.map((opt) => opt.length));

    // Base font sizes
    let questionFontSize = "text-2xl md:text-3xl";
    let optionFontSize = "text-lg";

    // Adjust based on content length
    if (questionLength > 300) {
      questionFontSize = "text-xl md:text-2xl";
    }
    if (questionLength > 500) {
      questionFontSize = "text-lg md:text-xl";
    }
    if (questionLength > 700) {
      questionFontSize = "text-base md:text-lg";
    }

    if (maxOptionLength > 150) {
      optionFontSize = "text-base";
    }
    if (maxOptionLength > 200) {
      optionFontSize = "text-sm";
    }

    return { questionFontSize, optionFontSize };
  }, [question, options]);
};

// Explanation Modal Component
const ExplanationModal = ({
  isOpen,
  onClose,
  isCorrect,
  explanation,
  selectedAnswer,
  correctAnswer,
  questionFontSize,
}: {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  explanation: string;
  selectedAnswer: number;
  correctAnswer: number;
  questionFontSize: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCorrect
                    ? "bg-green-500/20 border border-green-500"
                    : "bg-red-500/20 border border-red-500"
                }`}
              >
                <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-gray-400 text-base">
                  {isCorrect ? "Great job!" : "Let's review the explanation"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Answer Summary */}
            <div className="bg-gray-700/50 rounded-2xl p-6">
              <h4 className="text-gray-300 font-semibold mb-4 text-lg">
                Your Answer
              </h4>
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold ${
                    selectedAnswer === correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {String.fromCharCode(65 + selectedAnswer)}
                </div>
                <span className="text-white text-lg">
                  {isCorrect ? "Correct answer" : "Incorrect answer"}
                </span>
              </div>
            </div>

            {/* Explanation - Improved readability */}
            <div className="bg-gray-700/80 rounded-2xl p-8 border border-gray-600">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-4 text-xl">
                    Explanation
                  </h4>
                  <p
                    className={`text-gray-200 leading-relaxed ${questionFontSize}`}
                  >
                    {explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Core2Quiz() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [shake, setShake] = useState(false);

  // Load questions from JSON file
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/questions/220-1102/220-1102_test_${testId}.json`
        );
        if (!response.ok) {
          throw new Error(`Failed to load test ${testId}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load questions"
        );
        setLoading(false);
      }
    };

    if (testId) {
      loadQuestions();
    }
  }, [testId]);

  // Calculate dynamic font sizes - always call hook with safe defaults
  const currentQ = questions[currentQuestion] || { question: "", options: [] };
  const totalQuestions = questions.length;
  const progress =
    questions.length > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  // Calculate dynamic font sizes
  const { questionFontSize, optionFontSize } = useDynamicFontSize(
    currentQ.question,
    currentQ.options
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading test {testId}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">
          No questions found for test {testId}
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
      // Don't show modal for correct answers - user must click to see explanation
    } else {
      // Trigger shake animation for wrong answers
      setShake(true);
      setTimeout(() => setShake(false), 500);
      // Automatically show explanation for wrong answers
      setShowExplanationModal(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanationModal(false);
    } else {
      // Quiz completed, navigate to results
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(timeTaken / 60);
      const seconds = timeTaken % 60;
      const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

      router.push(
        `/tests/core2/quiz/results?score=${score}&total=${totalQuestions}&time=${timeString}`
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanationModal(false);
    }
  };

  const closeExplanationModal = () => {
    setShowExplanationModal(false);
  };

  const showExplanation = () => {
    setShowExplanationModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0a092d]">
      {/* Header */}
      <div className="bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/tests" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
                    clipRule="evenodd"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </Link>

            {/* Center - Question Counter and Test Name */}
            <div className="text-center">
              <div className="text-white font-semibold text-lg">
                {currentQuestion + 1} / {totalQuestions}
              </div>
              <div className="text-sm text-gray-400">
                CompTIA A+ 220-1102 Core 2
              </div>
            </div>

            {/* Close Button */}
            <Link
              href="/tests/core2"
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Quiz Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-700 max-h-[85vh] overflow-y-auto quiz-card-scrollbar">
          {/* Question Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-white text-2xl font-medium">Question</span>
              <button className="p-1 text-gray-400 hover:text-white transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M13 16a1 1 0 102 0V8a1 1 0 10-2 0v8z"
                  />
                </svg>
              </button>
            </div>
            <span className="text-gray-400 text-sm">
              {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2
              className={`${questionFontSize} font-medium text-white mb-6 leading-relaxed`}
            >
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="mb-8">
            <p className="text-gray-300 text-lg mb-6">Choose an answer</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-6 rounded-xl border-2 text-left font-medium ${optionFontSize} transition-all duration-200
                    ${
                      selectedAnswer === null
                        ? "border-gray-600 bg-gray-700/50 text-white hover:border-blue-500 hover:bg-gray-700"
                        : selectedAnswer === index
                        ? index === currentQ.correctAnswer
                          ? "border-green-500 bg-green-500/20 text-green-300"
                          : `border-red-500 bg-red-500/20 text-red-300 ${
                              shake ? "animate-shake" : ""
                            }`
                        : index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-500/20 text-green-300"
                        : "border-gray-600 bg-gray-700/30 text-gray-400"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Result and Explanation Button - Only show for correct answers */}
          {selectedAnswer !== null &&
            selectedAnswer === currentQ.correctAnswer && (
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-green-400">
                      ✅ Correct!
                    </span>
                  </div>
                  <button
                    onClick={showExplanation}
                    className="flex items-center space-x-2 text-blue-400 hover:cursor-pointer hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-500/10"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>See explanation</span>
                  </button>
                </div>
              </div>
            )}

          {/* Result for wrong answers - No explanation button needed */}
          {selectedAnswer !== null &&
            selectedAnswer !== currentQ.correctAnswer && (
              <div className="text-center mb-8">
                <span className="text-lg font-semibold text-red-400">
                  ❌ Incorrect
                </span>
              </div>
            )}

          {/* Don't Know Option - Only show when no answer selected */}
          {selectedAnswer === null && (
            <div className="text-center mb-8">
              <button className="text-gray-400 hover:text-white transition-colors">
                Don&apos;t know?
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`
                flex hover:cursor-pointer items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${
                  currentQuestion === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 border border-gray-600 text-white hover:bg-gray-600"
                }
              `}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`
                flex hover:cursor-pointer items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${
                  selectedAnswer === null
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
              `}
            >
              {currentQuestion === totalQuestions - 1 ? "Finish" : "Next"}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      <ExplanationModal
        isOpen={showExplanationModal}
        onClose={closeExplanationModal}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        explanation={currentQ.explanation}
        selectedAnswer={selectedAnswer || 0}
        correctAnswer={currentQ.correctAnswer}
        questionFontSize={questionFontSize}
      />
    </div>
  );
}
