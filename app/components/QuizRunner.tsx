"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  XIcon,
} from "@/app/components/PhosphorIcons";
import { AnimatedThemeToggler } from "@/app/components/AnimatedThemeToggler";
import { Brand } from "@/app/components/SiteShell";
import { gsap, useGSAP } from "@/lib/gsap";
import { sourceDisplayName } from "@/lib/exam-config";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  explanation: string;
}

interface QuizRunnerProps {
  core: "core1" | "core2";
  exam: "220-1201" | "220-1202";
  legacyExam?: "220-1102";
}

const sameAnswers = (left: number[], right: number[]) => {
  const sortedLeft = [...left].sort((a, b) => a - b);
  const sortedRight = [...right].sort((a, b) => a - b);
  return sortedLeft.length === sortedRight.length && sortedLeft.every((answer, index) => answer === sortedRight[index]);
};

export default function QuizRunner({ core, exam, legacyExam }: QuizRunnerProps) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = params.testId as string;
  const source = searchParams.get("source");
  const workspace = useRef<HTMLElement>(null);
  const questionCard = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const path = source
          ? `/questions/${exam}/${source}/test-${testId}.json`
          : `/questions/${legacyExam ?? exam}/${legacyExam ?? exam}_test_${testId}.json`;
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load test ${testId}`);
        const data = (await response.json()) as Question[];
        setQuestions(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    if (testId) void loadQuestions();
  }, [exam, legacyExam, source, testId]);

  const current = questions[currentQuestion];
  const correctAnswers = useMemo(
    () => current?.correctAnswers ?? (current?.correctAnswer !== undefined ? [current.correctAnswer] : []),
    [current]
  );
  const isMultiSelect = correctAnswers.length > 1;
  const isCorrect = submitted && sameAnswers(selectedAnswers, correctAnswers);
  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const backHref = `/tests/${core}`;
  const accent = core === "core1" ? "core1" : "core2";
  const sourceLabel = sourceDisplayName(core, source);

  useGSAP(
    () => {
      if (!questionCard.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(questionCard.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.36, ease: "power2.out", clearProps: "all" });
    },
    { dependencies: [currentQuestion], scope: workspace, revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (!progressBar.current) return;
      gsap.to(progressBar.current, {
        width: `${progress}%`,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.45,
        ease: "power2.out",
      });
    },
    { dependencies: [progress], scope: workspace }
  );

  const { contextSafe } = useGSAP({ scope: workspace });

  const toggleAnswer = contextSafe((answer: number, target?: HTMLElement) => {
    if (submitted) return;
    if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(target, { scale: 0.985 }, { scale: 1, duration: 0.22, ease: "back.out(2)" });
    }
    if (!isMultiSelect) {
      setSelectedAnswers([answer]);
      return;
    }
    setSelectedAnswers((selected) =>
      selected.includes(answer) ? selected.filter((item) => item !== answer) : [...selected, answer]
    );
  });

  const submitAnswer = contextSafe(() => {
    if (!selectedAnswers.length || submitted) return;
    const correct = sameAnswers(selectedAnswers, correctAnswers);
    setSubmitted(true);
    if (correct) {
      setScore((value) => value + 1);
      if (questionCard.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(questionCard.current, { boxShadow: "0 0 0 0 rgba(5,150,105,0)" }, { boxShadow: "0 0 0 4px rgba(5,150,105,.14)", duration: 0.28, yoyo: true, repeat: 1 });
      }
    } else {
      setShowExplanation(true);
      if (questionCard.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(questionCard.current, { x: -5 }, { x: 5, duration: 0.07, repeat: 4, yoyo: true, clearProps: "x" });
      }
    }
  });

  const resetForQuestion = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswers([]);
    setSubmitted(false);
    setShowExplanation(false);
  };

  const finishQuiz = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const time = `${Math.floor(elapsed / 60).toString().padStart(2, "0")}:${(elapsed % 60).toString().padStart(2, "0")}`;
    const results = new URLSearchParams({ score: String(score), total: String(questions.length), time, testId });
    if (source) results.set("source", source);
    router.push(`/tests/${core}/quiz/results?${results.toString()}`);
  };

  const changeQuestion = contextSafe((index: number) => {
    if (!questionCard.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resetForQuestion(index);
      return;
    }
    gsap.to(questionCard.current, { autoAlpha: 0, y: -12, duration: 0.18, ease: "power1.in", onComplete: () => resetForQuestion(index) });
  });

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) changeQuestion(currentQuestion + 1);
    else finishQuiz();
  };

  const previousQuestion = () => {
    if (currentQuestion) changeQuestion(currentQuestion - 1);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app px-4 text-center text-ink">
        <div>
          <div className={cn("mx-auto mb-5 size-11 animate-spin rounded-full border-4 border-panel-strong", core === "core1" ? "border-t-core1" : "border-t-core2")} />
          <p className="mono-label text-xs text-muted">Loading {exam} · Deck {testId}</p>
        </div>
      </div>
    );
  }

  if (error || !current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app px-4 text-center text-ink">
        <div className="max-w-md rounded-3xl border border-line bg-panel p-8 panel-shadow">
          <WarningCircleIcon size={46} className="mx-auto mb-4 text-danger" />
          <p className="mono-label mb-2 text-[10px] text-danger">Question bank unavailable</p>
          <h1 className="mb-2 text-2xl font-bold">We couldn’t load this deck.</h1>
          <p className="mb-6 text-sm leading-6 text-muted">{error ?? "This deck is empty."}</p>
          <Link href={backHref} className="inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white">Return to practice tests</Link>
        </div>
      </div>
    );
  }

  const questionSize = current.question.length > 300 ? "text-lg md:text-xl" : "text-xl md:text-2xl";
  const optionSize = Math.max(...current.options.map((option) => option.length)) > 150 ? "text-sm" : "text-[15px] sm:text-base";

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-app/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href={backHref} className="flex min-w-0 items-center gap-3" aria-label={`Exit to ${core === "core1" ? "Core 1" : "Core 2"} decks`}>
            <Brand compact />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold">{exam} · Deck {testId}</span>
              <span className="mono-label block truncate text-[9px] text-muted">{sourceLabel}</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <span className="mono-label hidden text-[10px] text-muted sm:block">Question {currentQuestion + 1} / {questions.length}</span>
            <AnimatedThemeToggler className="size-9" />
            <Link href={backHref} aria-label="Exit quiz" className="inline-flex size-9 items-center justify-center rounded-xl border border-line bg-panel text-muted transition hover:text-ink"><XIcon size={18} /></Link>
          </div>
        </div>
        <div className="h-1 bg-panel-strong"><div ref={progressBar} className={cn("h-full w-0", accent === "core1" ? "bg-core1" : "bg-core2")} /></div>
      </header>

      <main ref={workspace} className="mx-auto max-w-5xl px-4 pb-36 pt-6 sm:px-6 sm:pb-14 sm:pt-9">
        <div className="mb-4 flex items-center justify-between gap-4 sm:hidden">
          <span className="mono-label text-[10px] text-muted">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="font-mono text-xs font-bold text-ink">{Math.round(progress)}%</span>
        </div>

        <section aria-labelledby="question-heading">
          <div ref={questionCard} className="rounded-3xl border border-line bg-panel p-5 panel-shadow sm:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className={cn("mono-label rounded-full px-3 py-1.5 text-[10px]", accent === "core1" ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2")}>Item {String(currentQuestion + 1).padStart(2, "0")}</span>
              {isMultiSelect ? (
                <p id="selection-instructions" className="rounded-full border border-warning/25 bg-warning-soft px-3 py-1.5 text-xs font-semibold text-warning">Choose exactly {correctAnswers.length} answers</p>
              ) : (
                <p id="selection-instructions" className="text-xs font-medium text-muted">Choose the best answer</p>
              )}
            </div>

            <h1 id="question-heading" className={cn("mb-8 text-balance font-semibold leading-relaxed tracking-tight", questionSize)}>{current.question}</h1>

            <div className="grid gap-3" role="group" aria-describedby="selection-instructions">
              {current.options.map((option, index) => {
                const selected = selectedAnswers.includes(index);
                const correct = correctAnswers.includes(index);
                const wrongSelection = submitted && selected && !correct;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={(event) => toggleAnswer(index, event.currentTarget)}
                    aria-pressed={selected}
                    disabled={submitted}
                    className={cn(
                      "group w-full rounded-2xl border-2 p-4 text-left text-ink transition sm:p-5",
                      !submitted && !selected && "border-line bg-panel-muted hover:border-brand/40 hover:bg-brand-soft/40",
                      !submitted && selected && (accent === "core1" ? "border-core1 bg-core1-soft" : "border-core2 bg-core2-soft"),
                      submitted && correct && "border-success bg-success-soft",
                      wrongSelection && "border-danger bg-danger-soft",
                      submitted && !correct && !selected && "border-line bg-panel-muted opacity-65",
                      optionSize
                    )}
                  >
                    <span className="flex items-start gap-3.5">
                      <span className={cn(
                        "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center border font-mono text-xs font-bold",
                        isMultiSelect ? "rounded-lg" : "rounded-full",
                        !selected && !submitted && "border-line-strong bg-panel text-muted",
                        selected && !submitted && (accent === "core1" ? "border-core1 bg-core1 text-white" : "border-core2 bg-core2 text-white"),
                        submitted && correct && "border-success bg-success text-white",
                        wrongSelection && "border-danger bg-danger text-white"
                      )}>{submitted && correct ? <CheckCircleIcon size={17} weight="fill" /> : String.fromCharCode(65 + index)}</span>
                      <span className="leading-6">{option.replace(/^[A-J]\.\s*/, "")}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {submitted && current.explanation && (
            <aside aria-live="polite" className={cn("mt-5 rounded-2xl border p-5 sm:p-6", isCorrect ? "border-success/25 bg-success-soft" : "border-danger/25 bg-danger-soft")}>
              <div className={cn("mb-2 flex items-center gap-2 font-bold", isCorrect ? "text-success" : "text-danger")}>
                {isCorrect ? <CheckCircleIcon size={21} weight="fill" /> : <WarningCircleIcon size={21} weight="fill" />}
                {isCorrect ? "Correct" : "Review the correct answer"}
              </div>
              <p className="text-sm leading-7 text-ink-soft">{current.explanation}</p>
            </aside>
          )}

          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-app/92 p-4 backdrop-blur-xl sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
              <button type="button" onClick={previousQuestion} disabled={!currentQuestion} className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-35 sm:px-5">
                <CaretLeftIcon size={18} /> <span className="hidden xs:inline">Previous</span>
              </button>
              {!submitted ? (
                <button type="button" onClick={submitAnswer} disabled={!selectedAnswers.length} className={cn("min-w-40 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0", accent === "core1" ? "bg-core1 shadow-cyan-500/15" : "bg-core2 shadow-violet-500/15")}>Check answer</button>
              ) : (
                <button type="button" onClick={nextQuestion} className={cn("inline-flex min-w-40 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5", accent === "core1" ? "bg-core1 shadow-cyan-500/15" : "bg-core2 shadow-violet-500/15")}>{currentQuestion === questions.length - 1 ? "View results" : "Next question"}<CaretRightIcon size={18} /></button>
              )}
            </div>
          </div>
        </section>
      </main>

      {showExplanation && !current.explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-app-deep/75 p-4 backdrop-blur-sm" onClick={() => setShowExplanation(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="incorrect-title" className="max-w-md rounded-3xl border border-line bg-panel p-7 panel-shadow" onClick={(event) => event.stopPropagation()}>
            <WarningCircleIcon size={36} className="mb-3 text-danger" weight="fill" />
            <h2 id="incorrect-title" className="mb-2 text-xl font-bold">Not quite</h2>
            <p className="mb-6 text-sm leading-6 text-muted">The correct answer is {correctAnswers.map((answer) => String.fromCharCode(65 + answer)).join(", ")}. This source does not include an explanation for this item.</p>
            <button type="button" onClick={() => setShowExplanation(false)} className="w-full rounded-xl bg-brand py-3 font-semibold text-white">Continue reviewing</button>
          </div>
        </div>
      )}
    </div>
  );
}
