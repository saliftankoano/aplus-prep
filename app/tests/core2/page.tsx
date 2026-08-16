import type { Metadata } from "next";
import { Suspense } from "react";
import { DeckBrowser } from "@/app/components/DeckBrowser";
import { examConfigs } from "@/lib/exam-config";

export const metadata: Metadata = {
  title: "Core 2 (220-1202) Practice Decks - A+ Prep",
  description: "Practice current CompTIA A+ Core 2 questions from Dump, Sure, and legacy decks.",
};

export default function Core2TestsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-app" />}>
      <DeckBrowser config={examConfigs.core2} />
    </Suspense>
  );
}
