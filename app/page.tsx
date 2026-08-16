"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CpuIcon,
  DatabaseIcon,
  GaugeIcon,
  GraduationCapIcon,
  LockKeyIcon,
  MonitorIcon,
  PlayIcon,
  SparkleIcon,
  StackIcon,
} from "@/app/components/PhosphorIcons";
import { MotionReveal } from "@/app/components/MotionReveal";
import { SiteShell } from "@/app/components/SiteShell";

const metrics = [
  ["1,400+", "Practice questions", DatabaseIcon],
  ["50", "Focused decks", StackIcon],
  ["3", "Current source banks", BookOpenIcon],
  ["0", "Sign-ups required", LockKeyIcon],
] as const;

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="cockpit-grid pointer-events-none absolute inset-0 opacity-75" />
          <div className="pointer-events-none absolute -left-32 top-16 size-96 rounded-full bg-core1/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-4 size-96 rounded-full bg-core2/10 blur-3xl" />
          <MotionReveal className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div>
              <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
                <span className="status-dot size-2 rounded-full bg-brand" /> Updated for the 2026 exam series
              </div>
              <h1 data-reveal className="mt-7 max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
                Your focused cockpit for <span className="text-brand">CompTIA A+</span>
              </h1>
              <p data-reveal className="mt-7 max-w-2xl text-balance text-lg leading-8 text-muted sm:text-xl">
                Practice current Core 1 and Core 2 questions in source-labelled decks, check every answer, and build exam confidence one focused session at a time.
              </p>
              <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/tests" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-brand-strong">
                  Enter practice cockpit <ArrowRightIcon size={18} weight="bold" />
                </Link>
                <Link href="#exam-paths" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-panel px-6 py-4 font-semibold text-ink transition hover:-translate-y-0.5 hover:border-line-strong">
                  Compare exam paths
                </Link>
              </div>
              <div data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
                {["Forever free", "No account", "Immediate explanations"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><CheckCircleIcon size={17} weight="fill" className="text-success" />{item}</span>
                ))}
              </div>
            </div>

            <div data-reveal className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-core1/16 to-core2/16 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel/95 p-5 panel-shadow backdrop-blur sm:p-7">
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <div>
                    <p className="mono-label text-[10px] text-muted">Readiness console</p>
                    <p className="mt-2 text-lg font-bold text-ink">Choose today&apos;s focus</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-semibold text-success"><span className="size-1.5 rounded-full bg-success" /> Online</span>
                </div>
                <div className="mt-5 grid gap-4">
                  <CockpitExamCard core="Core 1" code="220-1201" questions="686" decks="23" accent="core1" icon={MonitorIcon} href="/tests/core1" />
                  <CockpitExamCard core="Core 2" code="220-1202" questions="735" decks="27" accent="core2" icon={CpuIcon} href="/tests/core2" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-panel-muted p-4">
                  {["Current", "Source-labelled", "Instant grading"].map((label, index) => (
                    <div key={label} className="text-center">
                      <p className="font-mono text-lg font-bold text-ink">{index === 0 ? "2026" : index === 1 ? "3" : "100%"}</p>
                      <p className="mt-1 text-[10px] leading-4 text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        <MotionReveal scroll className="border-b border-line bg-panel/50">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line px-0 sm:grid-cols-4">
            {metrics.map(([value, label, Icon]) => (
              <div key={label} data-reveal className="bg-app px-5 py-8 text-center sm:py-10">
                <Icon size={21} weight="duotone" className="mx-auto text-brand" />
                <p className="mt-3 font-mono text-2xl font-bold text-ink sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </MotionReveal>

        <section className="border-b border-line bg-app">
          <MotionReveal scroll className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-24">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
                <PlayIcon size={14} weight="fill" /> Product walkthrough
              </span>
              <h2 className="mt-5 text-balance text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">See A+ Prep in action</h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Tour both exam paths, source-labelled decks, answer feedback, results, themes, and the mobile study experience in one focused walkthrough.
              </p>
              <a
                href="https://youtu.be/0BzNk_GXMyA"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-brand transition hover:text-brand-strong"
              >
                Watch on YouTube <ArrowUpRightIcon size={17} weight="bold" />
              </a>
            </div>

            <div data-reveal className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-core1/15 to-core2/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-2 panel-shadow sm:p-3">
                <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-app-deep">
                  <iframe
                    className="size-full"
                    src="https://www.youtube-nocookie.com/embed/0BzNk_GXMyA?rel=0"
                    title="A+ Prep learner walkthrough"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        <section id="exam-paths" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <MotionReveal scroll>
            <div data-reveal className="max-w-2xl">
              <p className="mono-label text-xs font-semibold text-brand">Two exams · one certification</p>
              <h2 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">Choose the core you&apos;re preparing for</h2>
              <p className="mt-5 text-lg leading-8 text-muted">Both pathways use the same focused practice experience while keeping their objectives and source banks distinct.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <ExamPathCard data-reveal core="Core 1" code="220-1201" title="Hardware, networking, and cloud" copy="Build fluency across mobile devices, networking, hardware, virtualization, and technical troubleshooting." domains={["Mobile devices", "Networking", "Hardware", "Cloud & virtualization"]} accent="core1" href="/tests/core1" icon={MonitorIcon} />
              <ExamPathCard data-reveal core="Core 2" code="220-1202" title="Operating systems, security, and operations" copy="Practice operating-system support, security controls, software troubleshooting, and operational procedures." domains={["Operating systems", "Security", "Software troubleshooting", "Operations"]} accent="core2" href="/tests/core2" icon={CpuIcon} />
            </div>
          </MotionReveal>
        </section>

        <section className="border-y border-line bg-panel-muted/70">
          <MotionReveal scroll className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div data-reveal className="text-center">
              <p className="mono-label text-xs font-semibold text-brand">Built for focused repetition</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Less friction. Better review.</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                [GaugeIcon, "Focused sessions", "Thirty-question decks make it easy to fit meaningful practice into a study block."],
                [GraduationCapIcon, "Learn as you answer", "Immediate grading and source explanations turn every miss into a review moment."],
                [SparkleIcon, "Current and transparent", "Exam codes, publisher names, and versions stay visible throughout the experience."],
              ].map(([Icon, title, copy]) => (
                <div key={String(title)} data-reveal className="rounded-3xl border border-line bg-panel p-6 panel-shadow-sm">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Icon size={23} weight="duotone" /></span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{String(copy)}</p>
                </div>
              ))}
            </div>
          </MotionReveal>
        </section>
      </main>
    </SiteShell>
  );
}

function CockpitExamCard({ core, code, questions, decks, accent, icon: Icon, href }: { core: string; code: string; questions: string; decks: string; accent: "core1" | "core2"; icon: typeof MonitorIcon; href: string }) {
  const isCore1 = accent === "core1";
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-2xl border border-line bg-panel-muted p-4 transition hover:-translate-y-0.5 hover:border-line-strong">
      <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl ${isCore1 ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2"}`}><Icon size={25} weight="duotone" /></span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2"><strong className="text-ink">{core}</strong><span className="font-mono text-xs text-muted">{code}</span></span>
        <span className="mt-1 block text-xs text-muted">{questions} questions · {decks} decks</span>
      </span>
      <ArrowUpRightIcon size={18} className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
    </Link>
  );
}

function ExamPathCard({ core, code, title, copy, domains, accent, href, icon: Icon, ...props }: { core: string; code: string; title: string; copy: string; domains: string[]; accent: "core1" | "core2"; href: string; icon: typeof MonitorIcon } & React.HTMLAttributes<HTMLDivElement>) {
  const isCore1 = accent === "core1";
  return (
    <div {...props} className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-7 panel-shadow-sm sm:p-8">
      <div className={`absolute inset-x-0 top-0 h-1 ${isCore1 ? "bg-core1" : "bg-core2"}`} />
      <div className="flex items-start justify-between gap-4">
        <span className={`inline-flex size-13 items-center justify-center rounded-2xl ${isCore1 ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2"}`}><Icon size={28} weight="duotone" /></span>
        <span className="mono-label rounded-full bg-panel-muted px-3 py-1.5 text-[10px] font-bold text-muted">{code}</span>
      </div>
      <p className={`mono-label mt-7 text-[11px] font-bold ${isCore1 ? "text-core1" : "text-core2"}`}>{core}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {domains.map((domain) => <span key={domain} className="rounded-full border border-line bg-panel-muted px-3 py-1.5 text-xs text-ink-soft">{domain}</span>)}
      </div>
      <Link href={href} className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 ${isCore1 ? "bg-core1" : "bg-core2"}`}>Open {core} decks <ArrowRightIcon size={17} weight="bold" /></Link>
    </div>
  );
}
