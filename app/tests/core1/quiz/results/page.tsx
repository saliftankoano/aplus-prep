"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const totalQuestions = parseInt(searchParams.get("total") || "5");
  const timeTaken = searchParams.get("time") || "00:00";

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're exam-ready! 🎯";
    if (percentage >= 80)
      return "Excellent work! You're very well prepared! ⭐";
    if (percentage >= 70) return "Great job! You're on the right track! 🚀";
    if (percentage >= 60) return "Good effort! Keep practicing to improve! 💪";
    return "Keep studying! Every attempt makes you stronger! 📚";
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return "from-emerald-400 to-green-500";
    if (percentage >= 80) return "from-blue-400 to-indigo-500";
    if (percentage >= 70) return "from-yellow-400 to-orange-500";
    if (percentage >= 60) return "from-orange-400 to-red-500";
    return "from-red-400 to-pink-500";
  };

  const getPerformanceIcon = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "⭐";
    if (percentage >= 70) return "🎯";
    if (percentage >= 60) return "💪";
    return "📚";
  };

  return (
    <div className="min-h-screen bg-[#0a092d]">
      <div className="bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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

            <div className="text-center">
              <div className="text-white font-semibold text-lg">
                Quiz Results
              </div>
              <div className="text-sm text-gray-400">
                CompTIA A+ 220-1201 Core 1
              </div>
            </div>

            <Link
              href="/tests/core1"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-4">{getPerformanceIcon()}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Quiz Complete!
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  {getPerformanceMessage()}
                </p>

                <div className="relative inline-block mb-6">
                  <div
                    className={`w-48 h-48 rounded-full bg-gradient-to-r ${getPerformanceColor()} flex items-center justify-center shadow-2xl`}
                  >
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white">
                        {percentage}%
                      </div>
                      <div className="text-white/80 text-sm">Score</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div
                      className={`w-6 h-6 rounded-full ${
                        isPassing ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="text-2xl font-semibold text-white">
                  {score} out of {totalQuestions} correct
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-500/30">
                <div className="text-blue-300 text-xl">Correct ✅</div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {score}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-500/30">
                <div className="text-red-300 text-xl">Incorrect ❌</div>
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {totalQuestions - score}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-500/30">
                <div className="text-purple-300 text-xl">Time 🕒</div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {timeTaken}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div
              className={`bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border ${
                isPassing
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-red-500/30 bg-red-500/10"
              }`}
            >
              <div className="text-center">
                <div
                  className={`text-6xl mb-4 ${
                    isPassing ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPassing ? "🎉" : "📝"}
                </div>
                <div
                  className={`text-3xl font-bold mb-4 ${
                    isPassing ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPassing ? "PASSED!" : "NEEDS IMPROVEMENT"}
                </div>
                <p
                  className={`text-lg ${
                    isPassing ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {isPassing
                    ? "Congratulations! You're ready for the CompTIA A+ exam."
                    : "Keep studying and try again. You'll get there!"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/tests/core1"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Take Test Again</span>
              </Link>

              <Link
                href="/"
                className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white hover:bg-gray-600/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">💡</div>
                <h3 className="text-xl font-semibold text-yellow-300">
                  Study Tips
                </h3>
              </div>
              <div className="space-y-3 text-yellow-200">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Review explanations for questions you got wrong</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Focus on areas where you scored lower</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Practice with hands-on labs when possible</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Take breaks between study sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizResults() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a092d] flex items-center justify-center">
          <div className="text-white text-xl">Loading results...</div>
        </div>
      }
    >
      <QuizResultsContent />
    </Suspense>
  );
}
