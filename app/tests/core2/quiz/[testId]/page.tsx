"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Core2Quiz() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [startTime] = useState(Date.now());
  const [shake, setShake] = useState(false);

  // Load questions from JSON file
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/questions/220-1102_test_${testId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load test ${testId}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
        setLoading(false);
      }
    };

    if (testId) {
      loadQuestions();
    }
  }, [testId]);

  // Timer effect - always called, but only runs when conditions are met
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (!loading && questions.length > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            // Time's up, navigate to results
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(timeTaken / 60);
            const seconds = timeTaken % 60;
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            router.push(`/tests/core2/quiz/results?score=${score}&total=${totalQuestions}&time=${timeString}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [loading, questions.length, router, score, startTime]);

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
        <div className="text-white text-xl">No questions found for test {testId}</div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
    } else {
      // Trigger shake animation for wrong answers
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed, navigate to results
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(timeTaken / 60);
      const seconds = timeTaken % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      router.push(`/tests/core2/quiz/results?score=${score}&total=${totalQuestions}&time=${timeString}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
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
                <span className="text-white font-bold text-lg">A+</span>
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
        <div className="bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-700">
          {/* Question Header */}
                      <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-white text-2xl font-medium">Question</span>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M13 16a1 1 0 102 0V8a1 1 0 10-2 0v8z" />
                  </svg>
                </button>
              </div>
              <span className="text-gray-400 text-sm">
                {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="mb-8">
            <p className="text-gray-300 text-lg mb-6">
              Choose an answer
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-6 rounded-xl border-2 text-left font-medium text-lg transition-all duration-200
                    ${selectedAnswer === null
                      ? 'border-gray-600 bg-gray-700/50 text-white hover:border-blue-500 hover:bg-gray-700'
                      : selectedAnswer === index
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-500/20 text-green-300'
                        : `border-red-500 bg-red-500/20 text-red-300 ${shake ? 'animate-shake' : ''}`
                      : index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : 'border-gray-600 bg-gray-700/30 text-gray-400'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Don't Know Option */}
          <div className="text-center mb-8">
            <button className="text-gray-400 hover:text-white transition-colors">
              Don&apos;t know?
            </button>
          </div>

          {/* Result and Explanation */}
          {selectedAnswer !== null && (
            <div className="mb-8">
              {/* Result Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedAnswer === currentQ.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                  </h3>
                  {selectedAnswer === currentQ.correctAnswer && (
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{showExplanation ? 'Hide' : 'Show'} explanation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Explanation - Always show for wrong answers, toggle for correct answers */}
              {(selectedAnswer !== currentQ.correctAnswer || showExplanation) && currentQ.explanation && (
                <div className="p-6 bg-blue-900/30 rounded-2xl border border-blue-700">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-blue-300 font-semibold mb-2">Explanation</h4>
                      <p className="text-blue-200 leading-relaxed">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`
                flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${currentQuestion === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 border border-gray-600 text-white hover:bg-gray-600'
                }
              `}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`
                flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200
                ${selectedAnswer === null
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
