"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  DatabaseIcon,
  PlayIcon,
  StackIcon,
} from "@/app/components/PhosphorIcons";
import { MotionReveal } from "@/app/components/MotionReveal";
import { SiteShell } from "@/app/components/SiteShell";
import { deckHref, type ExamCollection, type ExamConfig } from "@/lib/exam-config";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function DeckBrowser({ config }: { config: ExamConfig }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedCollection = searchParams.get("collection");
  const initialCollection = config.collections.some((item) => item.slug === requestedCollection)
    ? requestedCollection!
    : config.collections[0].slug;
  const [activeSlug, setActiveSlug] = useState(initialCollection);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCollection = config.collections.find((item) => item.slug === activeSlug) ?? config.collections[0];
  const accentClass = config.accent === "core1" ? "text-core1" : "text-core2";
  const accentBg = config.accent === "core1" ? "bg-core1-soft" : "bg-core2-soft";
  const accentBorder = config.accent === "core1" ? "hover:border-core1/45" : "hover:border-core2/45";

  useEffect(() => {
    if (requestedCollection && config.collections.some((item) => item.slug === requestedCollection)) {
      setActiveSlug(requestedCollection);
    }
  }, [config.collections, requestedCollection]);

  useGSAP(
    () => {
      if (!panelRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(panelRef.current, { y: 10 }, { y: 0, duration: 0.36, ease: "power3.out", clearProps: "transform" });
    },
    { dependencies: [activeSlug], scope: panelRef, revertOnUpdate: true }
  );

  const { contextSafe } = useGSAP();
  const liftCard = contextSafe((element: HTMLElement, active: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(element, { y: active ? -5 : 0, scale: active ? 1.012 : 1, duration: 0.22, ease: "power2.out", overwrite: true });
  });

  const selectCollection = (collection: ExamCollection) => {
    setActiveSlug(collection.slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("collection", collection.slug);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const count = config.collections.length;
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : event.key === "ArrowRight" ? (index + 1) % count : (index - 1 + count) % count;
    const nextCollection = config.collections[nextIndex];
    selectCollection(nextCollection);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="cockpit-grid pointer-events-none absolute inset-0 opacity-70" />
          <MotionReveal className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:py-20 lg:px-8">
            <div data-reveal>
              <p className={cn("mono-label mb-4 text-xs font-semibold", accentClass)}>{config.eyebrow}</p>
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">{config.label} practice decks</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{config.description}</p>
            </div>
            <div data-reveal className="grid grid-cols-2 gap-3 sm:flex">
              <Metric value={config.totalQuestions.toLocaleString()} label="questions" />
              <Metric value={String(config.totalDecks)} label="decks" />
            </div>
          </MotionReveal>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mono-label text-[11px] font-semibold text-brand">Question collections</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Choose your source</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Every deck keeps its source and version visible from selection through results.</p>
            </div>
            <div role="tablist" aria-label={`${config.shortLabel} question collections`} className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-panel-muted p-1.5">
              {config.collections.map((collection, index) => {
                const active = collection.slug === activeSlug;
                return (
                  <button
                    key={collection.slug}
                    ref={(element) => { tabsRef.current[index] = element; }}
                    id={`tab-${collection.slug}`}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${collection.slug}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectCollection(collection)}
                    onKeyDown={(event) => handleTabKey(event, index)}
                    className={cn(
                      "shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                      active ? "bg-panel text-ink shadow-sm" : "text-muted hover:text-ink"
                    )}
                  >
                    {collection.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={panelRef} id={`panel-${activeCollection.slug}`} role="tabpanel" aria-labelledby={`tab-${activeCollection.slug}`} tabIndex={0}>
            <div className="mb-6 grid gap-5 rounded-3xl border border-line bg-panel p-6 panel-shadow-sm md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("mono-label rounded-full px-3 py-1 text-[10px] font-bold", accentBg, accentClass)}>{activeCollection.source}</span>
                  {activeCollection.version && <span className="mono-label text-[10px] text-muted">Version {activeCollection.version}</span>}
                  {activeCollection.legacy && <span className="rounded-full bg-warning-soft px-3 py-1 text-[10px] font-bold text-warning">Legacy review</span>}
                </div>
                <h3 className="mt-4 text-2xl font-bold text-ink">{activeCollection.label}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{activeCollection.description}</p>
              </div>
              <div className="flex gap-5 border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <CollectionStat icon={DatabaseIcon} value={activeCollection.questionCount} label="Questions" />
                <CollectionStat icon={StackIcon} value={activeCollection.decks.length} label="Decks" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeCollection.decks.map((deck) => (
                <Link
                  key={deck.id}
                  href={deckHref(config.core, activeCollection, deck.id)}
                  onMouseEnter={(event) => liftCard(event.currentTarget, true)}
                  onMouseLeave={(event) => liftCard(event.currentTarget, false)}
                  className={cn("group relative flex min-h-52 flex-col overflow-hidden rounded-2xl border border-line bg-panel p-5 panel-shadow-sm transition-colors", accentBorder)}
                >
                  <div className={cn("absolute inset-x-0 top-0 h-0.5", config.accent === "core1" ? "bg-core1" : "bg-core2")} />
                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label text-[10px] font-bold text-muted">Deck {String(deck.id).padStart(2, "0")}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-panel-muted px-2.5 py-1 text-[10px] font-semibold text-muted"><span className="size-1.5 rounded-full bg-success" /> Ready</span>
                  </div>
                  <h4 className="mt-5 text-lg font-bold leading-snug text-ink">{deck.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted">{deck.description}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                    <div>
                      <p className="font-mono text-lg font-bold text-ink">{deck.questions}</p>
                      <p className="text-xs text-muted">questions</p>
                    </div>
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-xl transition group-hover:text-white", accentBg, accentClass, config.accent === "core1" ? "group-hover:bg-core1" : "group-hover:bg-core2")}>
                      <PlayIcon size={17} weight="fill" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <MotionReveal scroll className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div data-reveal className="grid gap-4 rounded-3xl border border-line bg-panel-muted p-6 md:grid-cols-3">
            {[
              [BookOpenIcon, "Exam-sized focus", "Thirty-question decks keep sessions useful without becoming overwhelming."],
              [CheckCircleIcon, "Immediate feedback", "Check each response and review source explanations before moving on."],
              [ArrowUpRightIcon, "Source transparent", "Publisher and version remain visible so you always know what you are practicing."],
            ].map(([Icon, title, copy]) => (
              <div key={String(title)} data-reveal className="rounded-2xl bg-panel p-5">
                <Icon size={22} weight="duotone" className={accentClass} />
                <h3 className="mt-4 font-bold text-ink">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{String(copy)}</p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </main>
    </SiteShell>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-32 rounded-2xl border border-line bg-panel/85 p-4 backdrop-blur panel-shadow-sm">
      <p className="font-mono text-2xl font-bold text-ink">{value}</p>
      <p className="mono-label mt-1 text-[9px] text-muted">{label}</p>
    </div>
  );
}

function CollectionStat({ icon: Icon, value, label }: { icon: typeof DatabaseIcon; value: number; label: string }) {
  return (
    <div>
      <Icon size={18} className="text-brand" />
      <p className="mt-2 font-mono text-xl font-bold text-ink">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
