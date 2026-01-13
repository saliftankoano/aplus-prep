"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldIcon,
  XIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  ArrowRightIcon,
} from "@/app/components/PhosphorIcons";
import { ThemeToggle } from "@/app/components/ThemeToggle";

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
    let questionFontSize = "text-xl md:text-2xl";
    let optionFontSize = "text-base";

    // Adjust based on content length
    if (questionLength > 300) {
      questionFontSize = "text-lg md:text-xl";
    }

    if (maxOptionLength > 150) {
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
}: {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  explanation: string;
  selectedAnswer: number;
  correctAnswer: number;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Modal Header */}
        <div
          className={`p-6 border-b ${
            isCorrect
              ? "bg-green-50 border-green-100"
              : "bg-red-50 border-red-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCorrect
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isCorrect ? (
                  <CheckCircleIcon size={24} weight="fill" />
                ) : (
                  <WarningCircleIcon size={24} weight="fill" />
                )}
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isCorrect ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white/50"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <div className="space-y-6">
            {!isCorrect && (
              <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100 text-green-800">
                <span className="font-semibold mr-2">Correct Answer:</span>
                <span className="font-bold">
                  {String.fromCharCode(65 + correctAnswer)}
                </span>
              </div>
            )}

            <div>
              <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <ShieldIcon
                  size={20}
                  className="text-blue-600"
                  weight="duotone"
                />
                Explanation
              </h4>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {explanation || "No explanation available for this question."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
          >
            Continue
            <CaretRightIcon size={16} weight="bold" />
          </button>
        </div>
      </motion.div>
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

  // Calculate dynamic font sizes
  const currentQ = questions[currentQuestion] || { question: "", options: [] };
  const totalQuestions = questions.length;
  const progress =
    questions.length > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const { questionFontSize, optionFontSize } = useDynamicFontSize(
    currentQ.question,
    currentQ.options
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Loading test {testId}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <WarningCircleIcon size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Test
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
    } else {
      setShowExplanationModal(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanationModal(false);
    } else {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/tests/core2" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <ShieldIcon size={20} weight="fill" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              Core 2 Prep
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <ThemeToggle />
            <Link
              href="/tests/core2"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
            >
              <XIcon size={20} />
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full">
          <motion.div
            className="h-full bg-blue-600 dark:bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          >
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-6 transition-colors duration-300">
              <div className="p-8 md:p-10">
                <h2
                  className={`${questionFontSize} font-semibold text-gray-900 dark:text-white leading-relaxed mb-8`}
                >
                  {currentQ.question}
                </h2>

                <div className="grid gap-4">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showResult = selectedAnswer !== null;

                    let buttonStyle =
                      "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
                    let icon = null;

                    if (showResult) {
                      if (isSelected && isCorrect) {
                        buttonStyle =
                          "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100";
                        icon = (
                          <CheckCircleIcon
                            size={24}
                            weight="fill"
                            className="text-green-500 flex-shrink-0"
                          />
                        );
                      } else if (isSelected && !isCorrect) {
                        buttonStyle =
                          "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100";
                        icon = (
                          <WarningCircleIcon
                            size={24}
                            weight="fill"
                            className="text-red-500 flex-shrink-0"
                          />
                        );
                      } else if (isCorrect) {
                        buttonStyle =
                          "border-green-500 bg-green-50/50 dark:bg-green-900/10 text-green-900 dark:text-green-100";
                        icon = (
                          <CheckCircleIcon
                            size={24}
                            weight="fill"
                            className="text-green-500 flex-shrink-0"
                          />
                        );
                      } else {
                        buttonStyle =
                          "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 group ${buttonStyle}`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                              showResult && (isSelected || isCorrect)
                                ? "bg-white/50 dark:bg-black/20"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className={`${optionFontSize} font-medium`}>
                            {option}
                          </span>
                        </div>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestion === 0
                      ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <CaretLeftIcon size={16} weight="bold" />
                  Previous
                </button>

                {selectedAnswer !== null ? (
                  <div className="flex gap-3">
                    {selectedAnswer === currentQ.correctAnswer && (
                      <button
                        onClick={() => setShowExplanationModal(true)}
                        className="px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        Explanation
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      className="px-8 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {currentQuestion === totalQuestions - 1
                        ? "Finish"
                        : "Next"}
                      <ArrowRightIcon size={16} weight="bold" />
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 dark:text-gray-500 font-medium italic">
                    Select an answer to continue
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <ExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        isCorrect={selectedAnswer === currentQ.correctAnswer}
        explanation={currentQ.explanation}
        selectedAnswer={selectedAnswer || 0}
        correctAnswer={currentQ.correctAnswer}
      />
    </div>
  );
}
