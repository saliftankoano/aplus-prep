import type { Metadata } from "next";
import { Suspense } from "react";
import { DeckBrowser } from "@/app/components/DeckBrowser";
import { examConfigs } from "@/lib/exam-config";

export const metadata: Metadata = {
  title: "Core 1 (220-1201) Practice Decks - A+ Prep",
  description: "Practice current CompTIA A+ Core 1 questions from source-labelled and curated decks.",
};

export default function Core1TestsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-app" />}>
      <DeckBrowser config={examConfigs.core1} />
    </Suspense>
  );
}
