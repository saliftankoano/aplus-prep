"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Sample questions for Core 2
const questions = [
  {
    id: 1,
    question: "Which of the following is a feature of Windows 10 that allows users to run multiple desktops?",
    options: [
      "A. Virtual Desktop",
      "B. Task View",
      "C. Multiple Monitors",
      "D. Desktop Manager"
    ],
    correctAnswer: 0,
    explanation: "Virtual Desktop is a feature in Windows 10 that allows users to create and manage multiple virtual desktops for better organization of open applications and windows."
  },
  {
    id: 2,
    question: "What is the primary purpose of a firewall?",
    options: [
      "A. To speed up internet connection",
      "B. To block unauthorized network access",
      "C. To encrypt data",
      "D. To compress files"
    ],
    correctAnswer: 1,
    explanation: "A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules, primarily to block unauthorized access."
  },
  {
    id: 3,
    question: "Which command is used to display the current IP configuration in Windows?",
    options: [
      "A. ipconfig",
      "B. ifconfig",
      "C. netstat",
      "D. ping"
    ],
    correctAnswer: 0,
    explanation: "The 'ipconfig' command displays the current IP configuration for all network adapters on a Windows system."
  },
  {
    id: 4,
    question: "What type of malware disguises itself as legitimate software?",
    options: [
      "A. Virus",
      "B. Trojan",
      "C. Worm",
      "D. Spyware"
    ],
    correctAnswer: 1,
    explanation: "A Trojan horse is malware that disguises itself as legitimate software to trick users into installing it."
  },
  {
    id: 5,
    question: "Which file system is most commonly used in modern Windows operating systems?",
    options: [
      "A. FAT32",
      "B. NTFS",
      "C. exFAT",
      "D. HFS+"
    ],
    correctAnswer: 1,
    explanation: "NTFS (New Technology File System) is the primary file system used in modern Windows operating systems due to its advanced features like file permissions and encryption."
  }
];

export default function Core2Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [hintsLeft, setHintsLeft] = useState(4);
  const [startTime] = useState(Date.now());
  const router = useRouter();

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
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
      
      router.push(`/quiz/core2/results?score=${score}&total=${totalQuestions}&time=${timeString}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up, navigate to results
          const timeTaken = Math.floor((Date.now() - startTime) / 1000);
          const minutes = Math.floor(timeTaken / 60);
          const seconds = timeTaken % 60;
          const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          
          router.push(`/quiz/core2/results?score=${score}&total=${totalQuestions}&time=${timeString}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, totalQuestions, startTime, router]);

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
                CompTIA A+ 220-1101 Chapters 1-3
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
              <span className="text-white text-lg font-medium">Term</span>
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
                        : 'border-red-500 bg-red-500/20 text-red-300'
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
              Don't know?
            </button>
          </div>

          {/* Explanation */}
          {selectedAnswer !== null && (
            <div className="mb-8 p-6 bg-blue-900/30 rounded-2xl border border-blue-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                {selectedAnswer === currentQ.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              </h3>
              <p className="text-blue-200">
                {currentQ.explanation}
              </p>
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
