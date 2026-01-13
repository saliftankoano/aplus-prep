"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  ShieldIcon, 
  XIcon, 
  TrophyIcon, 
  StarIcon, 
  TargetIcon, 
  BarbellIcon, 
  BooksIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  ClockIcon,
  ArrowCounterClockwiseIcon,
  HouseIcon
} from "@/app/components/PhosphorIcons";

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const totalQuestions = parseInt(searchParams.get("total") || "5");
  const timeTaken = searchParams.get("time") || "00:00";

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're exam-ready!";
    if (percentage >= 80) return "Excellent work! You're very well prepared!";
    if (percentage >= 70) return "Great job! You're on the right track!";
    if (percentage >= 60) return "Good effort! Keep practicing to improve!";
    return "Keep studying! Every attempt makes you stronger!";
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-100";
    if (percentage >= 70) return "text-indigo-600 bg-indigo-50 border-indigo-100";
    if (percentage >= 60) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  const getPerformanceIcon = () => {
    if (percentage >= 90) return <TrophyIcon size={64} weight="duotone" className="text-emerald-500" />;
    if (percentage >= 80) return <StarIcon size={64} weight="duotone" className="text-blue-500" />;
    if (percentage >= 70) return <TargetIcon size={64} weight="duotone" className="text-indigo-500" />;
    if (percentage >= 60) return <BarbellIcon size={64} weight="duotone" className="text-orange-500" />;
    return <BooksIcon size={64} weight="duotone" className="text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/tests/core2" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <ShieldIcon size={20} weight="fill" />
            </div>
            <span className="font-bold text-gray-900">Core 2 Results</span>
          </Link>

          <Link href="/tests/core2" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <XIcon size={20} />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Score & Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="flex justify-center mb-6">
                {getPerformanceIcon()}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quiz Complete!
              </h1>
              <p className="text-gray-600 mb-8 font-medium">
                {getPerformanceMessage()}
              </p>

              <div className="relative inline-flex items-center justify-center mb-8">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    className="text-gray-100"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="88"
                    cx="96"
                    cy="96"
                  />
                  <circle
                    className={`${isPassing ? "text-green-500" : "text-blue-600"} transition-all duration-1000 ease-out`}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="88"
                    cx="96"
                    cy="96"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-bold text-gray-900">{percentage}%</span>
                  <span className="text-gray-500 font-medium text-sm uppercase tracking-wide mt-1">Score</span>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isPassing ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {isPassing ? "PASSED" : "NEEDS IMPROVEMENT"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
                <div className="flex justify-center mb-2">
                  <CheckCircleIcon size={24} weight="fill" className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{score}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Correct</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
                <div className="flex justify-center mb-2">
                  <WarningCircleIcon size={24} weight="fill" className="text-red-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{totalQuestions - score}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Incorrect</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
                <div className="flex justify-center mb-2">
                  <ClockIcon size={24} weight="fill" className="text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{timeTaken}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Tips */}
          <div className="space-y-6">
            <div className={`rounded-3xl p-8 border ${isPassing ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isPassing ? 'text-green-800' : 'text-orange-800'}`}>
                {isPassing ? "Ready for the next challenge?" : "Don't give up!"}
              </h3>
              <p className={`mb-6 ${isPassing ? 'text-green-700' : 'text-orange-700'}`}>
                {isPassing 
                  ? "You've demonstrated a solid understanding of this topic. Consider moving on to the next practice test or reviewing the few questions you missed."
                  : "Review the explanations for the questions you missed. Focusing on your weak areas is the fastest way to improve your score."
                }
              </p>
              
              <div className="space-y-3">
                <Link
                  href="/tests/core2"
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <ArrowCounterClockwiseIcon size={20} weight="bold" />
                  Take Another Test
                </Link>

                <Link
                  href="/"
                  className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <HouseIcon size={20} weight="bold" />
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-lg">💡</span>
                </div>
                <h3 className="text-lg font-bold text-blue-900">Study Tips</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Review explanations for incorrect answers",
                  "Focus on areas where you scored lower",
                  "Practice with hands-on labs when possible",
                  "Take breaks between study sessions"
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function QuizResults() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500 font-medium">Loading results...</div>
        </div>
      }
    >
      <QuizResultsContent />
    </Suspense>
  );
}
