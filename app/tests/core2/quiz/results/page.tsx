"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuizResults() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0");
  const totalQuestions = parseInt(searchParams.get("total") || "5");
  const timeTaken = searchParams.get("time") || "00:00";
  
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent! You're ready for the exam!";
    if (percentage >= 80) return "Great job! You're very well prepared.";
    if (percentage >= 70) return "Good work! You're on the right track.";
    if (percentage >= 60) return "Not bad, but you need more practice.";
    return "You need more study time. Keep practicing!";
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return "from-green-400 to-green-600";
    if (percentage >= 80) return "from-blue-400 to-blue-600";
    if (percentage >= 70) return "from-yellow-400 to-yellow-600";
    if (percentage >= 60) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quiz Complete!
            </h1>
            <p className="text-xl text-gray-600">
              {getPerformanceMessage()}
            </p>
          </div>

          {/* Score Display */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getPerformanceColor()} text-white text-4xl font-bold mb-4`}>
              {percentage}%
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {score} out of {totalQuestions} correct
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{score}</div>
              <div className="text-gray-600">Correct Answers</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{totalQuestions - score}</div>
              <div className="text-gray-600">Incorrect Answers</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{timeTaken}</div>
              <div className="text-gray-600">Time Taken</div>
            </div>
          </div>

          {/* Pass/Fail Status */}
          <div className={`text-center p-6 rounded-2xl mb-8 ${
            isPassing 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className={`text-2xl font-bold mb-2 ${
              isPassing ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPassing ? '🎉 PASSED' : '❌ NEEDS IMPROVEMENT'}
            </div>
            <p className={`text-lg ${
              isPassing ? 'text-green-700' : 'text-red-700'
            }`}>
              {isPassing 
                ? 'Congratulations! You\'re ready for the CompTIA A+ exam.'
                : 'Keep studying and try again. You\'ll get there!'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz/core2"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Take Test Again
            </Link>
            
            <Link
              href="/"
              className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          {/* Study Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Study Tips</h3>
            <div className="space-y-2 text-gray-700">
              <p>• Review the explanations for questions you got wrong</p>
              <p>• Focus on areas where you scored lower</p>
              <p>• Practice with hands-on labs when possible</p>
              <p>• Take breaks between study sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
