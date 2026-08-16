"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, CpuIcon, MonitorIcon } from "@/app/components/PhosphorIcons";
import { MotionReveal } from "@/app/components/MotionReveal";
import { SiteShell } from "@/app/components/SiteShell";
import { examConfigs } from "@/lib/exam-config";

export default function TestsPage() {
  return (
    <SiteShell>
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="cockpit-grid pointer-events-none absolute inset-0 opacity-70" />
          <MotionReveal className="relative mx-auto max-w-7xl px-4 py-18 text-center sm:px-6 sm:py-24 lg:px-8">
            <p data-reveal className="mono-label text-xs font-semibold text-brand">Practice control center</p>
            <h1 data-reveal className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-bold tracking-[-0.045em] text-ink sm:text-6xl">Choose your CompTIA A+ exam path</h1>
            <p data-reveal className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-8 text-muted">Select the current core exam you are preparing for. Each path keeps its objectives, sources, and deck progress clear.</p>
          </MotionReveal>
        </section>

        <MotionReveal className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <CorePanel data-reveal config={examConfigs.core1} href="/tests/core1" icon={MonitorIcon} />
          <CorePanel data-reveal config={examConfigs.core2} href="/tests/core2" icon={CpuIcon} />
        </MotionReveal>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-3xl border border-line bg-panel-muted p-5 sm:grid-cols-3 sm:p-6">
            {[
              ["Current codes", "220-1201 and 220-1202"],
              ["Source transparent", "Dump, Sure, and curated banks"],
              ["Focused format", "Up to 30 questions per deck"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl bg-panel p-5">
                <CheckCircleIcon size={20} weight="fill" className="text-success" />
                <p className="mt-3 font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function CorePanel({ config, href, icon: Icon, ...props }: { config: typeof examConfigs.core1; href: string; icon: typeof MonitorIcon } & React.HTMLAttributes<HTMLElement>) {
  const isCore1 = config.core === "core1";
  return (
    <article {...props} className="group relative overflow-hidden rounded-[2rem] border border-line bg-panel p-7 panel-shadow transition hover:border-line-strong sm:p-9">
      <div className={`absolute inset-x-0 top-0 h-1 ${isCore1 ? "bg-core1" : "bg-core2"}`} />
      <div className="flex items-start justify-between gap-5">
        <span className={`inline-flex size-14 items-center justify-center rounded-2xl ${isCore1 ? "bg-core1-soft text-core1" : "bg-core2-soft text-core2"}`}><Icon size={30} weight="duotone" /></span>
        <div className="text-right">
          <p className="font-mono text-2xl font-bold text-ink">{config.totalQuestions}</p>
          <p className="mono-label mt-1 text-[9px] text-muted">questions</p>
        </div>
      </div>
      <p className={`mono-label mt-8 text-[11px] font-bold ${isCore1 ? "text-core1" : "text-core2"}`}>{config.code}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">{config.shortLabel}</h2>
      <p className="mt-4 min-h-14 text-sm leading-6 text-muted sm:text-base">{config.description}</p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {config.domains.slice(0, 4).map((domain) => (
          <li key={domain} className="flex items-center gap-2 text-sm text-ink-soft"><span className={`size-1.5 rounded-full ${isCore1 ? "bg-core1" : "bg-core2"}`} />{domain}</li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="text-sm text-muted"><strong className="font-mono text-ink">{config.totalDecks}</strong> focused decks</span>
        <Link href={href} className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 ${isCore1 ? "bg-core1" : "bg-core2"}`}>View decks <ArrowRightIcon size={16} weight="bold" /></Link>
      </div>
    </article>
  );
}
