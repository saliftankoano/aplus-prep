"use client";

import { Suspense, useMemo, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowCounterClockwiseIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  HouseIcon,
  TargetIcon,
  WarningCircleIcon,
  XIcon,
} from "@/app/components/PhosphorIcons";
import { AnimatedThemeToggler } from "@/app/components/AnimatedThemeToggler";
import { Brand } from "@/app/components/SiteShell";
import { collectionForSource, deckHref, examConfigs, type CoreKey } from "@/lib/exam-config";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function ResultsContent({ core }: { core: CoreKey }) {
  const searchParams = useSearchParams();
  const config = examConfigs[core];
  const source = searchParams.get("source");
  const testId = Number.parseInt(searchParams.get("testId") ?? "", 10);
  const score = Math.max(0, Number.parseInt(searchParams.get("score") ?? "0", 10) || 0);
  const total = Math.max(1, Number.parseInt(searchParams.get("total") ?? "5", 10) || 5);
  const time = searchParams.get("time") ?? "00:00";
  const percentage = Math.min(100, Math.round((score / total) * 100));
  const isPassing = percentage >= 70;
  const collection = collectionForSource(core, source);
  const ring = useRef<SVGCircleElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLElement>(null);
  const circumference = 2 * Math.PI * 82;
  const targetOffset = circumference * (1 - percentage / 100);

  const actions = useMemo(() => {
    const validDeck = Number.isFinite(testId) && collection.decks.some((deck) => deck.id === testId);
    const nextDeck = validDeck ? collection.decks.find((deck) => deck.id === testId + 1) : undefined;
    return {
      retry: validDeck ? deckHref(core, collection, testId) : `/tests/${core}?collection=${collection.slug}`,
      next: nextDeck ? deckHref(core, collection, nextDeck.id) : `/tests/${core}?collection=${collection.slug}`,
      nextLabel: nextDeck ? `Continue to deck ${nextDeck.id}` : "Browse this collection",
    };
  }, [collection, core, testId]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (ring.current) {
        gsap.fromTo(ring.current, { strokeDashoffset: circumference }, { strokeDashoffset: targetOffset, duration: reduceMotion ? 0 : 1.05, ease: "power3.out" });
      }
      if (number.current) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: percentage,
          duration: reduceMotion ? 0 : 0.95,
          ease: "power3.out",
          onUpdate: () => {
            if (number.current) number.current.textContent = `${Math.round(counter.value)}%`;
          },
        });
      }
      if (!reduceMotion && content.current) {
        gsap.fromTo("[data-result-reveal]", { y: 12, scale: 0.997 }, { y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "power2.out", clearProps: "transform" });
      }
    },
    { scope: content }
  );

  const message = percentage >= 90
    ? "Excellent control of this deck."
    : percentage >= 70
      ? "Solid result—keep building consistency."
      : percentage >= 50
        ? "You’re close. Review the misses and retry."
        : "Use this attempt as a map for your next review.";

  return (
    <div className="min-h-screen bg-app text-ink">
      <header className="border-b border-line bg-app/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href={`/tests/${core}`} className="flex items-center gap-3">
            <Brand compact />
            <span>
              <span className="block text-sm font-bold">{config.shortLabel} results</span>
              <span className="mono-label block text-[9px] text-muted">{config.code} · {collection.label}</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler className="size-9" />
            <Link href={`/tests/${core}?collection=${collection.slug}`} aria-label="Close results" className="inline-flex size-9 items-center justify-center rounded-xl border border-line bg-panel text-muted hover:text-ink"><XIcon size={18} /></Link>
          </div>
        </div>
      </header>

      <main ref={content} className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <section data-result-reveal className="rounded-[2rem] border border-line bg-panel p-6 text-center panel-shadow sm:p-9">
            <span className={cn("mono-label inline-flex rounded-full px-3 py-1.5 text-[10px]", core === "core1" ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2")}>Deck complete</span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{message}</h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">Your score reflects this practice deck only. Use the explanations and another attempt to turn recognition into recall.</p>

            <div className="relative mx-auto mt-7 inline-flex size-48 items-center justify-center">
              <svg className="size-48 -rotate-90" viewBox="0 0 192 192" aria-hidden="true">
                <circle cx="96" cy="96" r="82" fill="none" stroke="var(--panel-strong)" strokeWidth="12" />
                <circle ref={ring} cx="96" cy="96" r="82" fill="none" stroke={isPassing ? "var(--success)" : "var(--warning)"} strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span ref={number} className="font-mono text-5xl font-bold tracking-tight">{percentage}%</span>
                <span className="mono-label mt-1 text-[10px] text-muted">Score</span>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <span className={cn("mono-label rounded-full border px-4 py-2 text-[10px] font-bold", isPassing ? "border-success/25 bg-success-soft text-success" : "border-warning/25 bg-warning-soft text-warning")}>{isPassing ? "Practice target met" : "Keep reviewing"}</span>
            </div>
          </section>

          <div className="grid gap-6">
            <section data-result-reveal className="grid grid-cols-3 gap-2 sm:gap-4" aria-label="Attempt statistics">
              {[
                { label: "Correct", value: score, Icon: CheckCircleIcon, color: "text-success" },
                { label: "Missed", value: Math.max(0, total - score), Icon: WarningCircleIcon, color: "text-danger" },
                { label: "Time", value: time, Icon: ClockIcon, color: "text-brand" },
              ].map(({ label, value, Icon, color }) => (
                <div key={label} className="rounded-2xl border border-line bg-panel p-3 text-center panel-shadow-sm sm:p-5">
                  <Icon size={22} weight="fill" className={cn("mx-auto mb-2", color)} />
                  <div className="font-mono text-lg font-bold sm:text-2xl">{value}</div>
                  <div className="mono-label mt-1 text-[8px] text-muted sm:text-[9px]">{label}</div>
                </div>
              ))}
            </section>

            <section data-result-reveal className="rounded-3xl border border-line bg-panel p-6 panel-shadow-sm sm:p-8">
              <div className="mb-5 flex items-start gap-3">
                <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-xl", core === "core1" ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2")}><TargetIcon size={22} weight="duotone" /></span>
                <div>
                  <p className="mono-label text-[9px] text-muted">Recommended next move</p>
                  <h2 className="mt-1 text-xl font-bold">Keep the momentum</h2>
                </div>
              </div>
              <p className="mb-6 text-sm leading-6 text-muted">{isPassing ? "Move forward, then revisit this source later for spaced repetition." : "Retry while the explanations are fresh, then move to the next deck when you clear the practice target."}</p>
              <div className="grid gap-3">
                <Link href={actions.next} className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white", core === "core1" ? "bg-core1" : "bg-core2")}>{actions.nextLabel}<ArrowRightIcon size={18} /></Link>
                <Link href={actions.retry} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel-muted px-5 py-3.5 text-sm font-semibold text-ink"><ArrowCounterClockwiseIcon size={18} />Retry this deck</Link>
                <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-muted hover:text-ink"><HouseIcon size={18} />Back to home</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export function QuizResults({ core }: { core: CoreKey }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-app font-mono text-xs text-muted">Loading results…</div>}>
      <ResultsContent core={core} />
    </Suspense>
  );
}
