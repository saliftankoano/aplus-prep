"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ListIcon,
  ShieldIcon,
  XIcon,
} from "@/app/components/PhosphorIcons";
import { AnimatedThemeToggler } from "@/app/components/AnimatedThemeToggler";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tests", label: "Practice tests" },
  { href: "/tests/core1", label: "Core 1" },
  { href: "/tests/core2", label: "Core 2" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl bg-brand text-white shadow-lg shadow-blue-500/20">
        <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
        <ShieldIcon size={20} weight="fill" className="relative" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-base font-bold tracking-tight text-ink">A+ Prep</span>
          <span className="mono-label mt-1 block text-[9px] text-muted">Exam cockpit</span>
        </span>
      )}
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!menu.current || !menuOpen) return;
      gsap.fromTo(menu.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" });
    },
    { dependencies: [menuOpen], scope: menu, revertOnUpdate: true }
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-app/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="A+ Prep home"><Brand /></Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-panel-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          <Link href="/tests" className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition hover:-translate-y-0.5 hover:bg-brand-strong sm:inline-flex">
            Start practicing <ArrowRightIcon size={16} weight="bold" />
          </Link>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-panel text-ink md:hidden">
            {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div ref={menu} id="mobile-navigation" className="border-t border-line bg-panel px-4 py-4 md:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft hover:bg-panel-muted hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-panel/65">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Brand />
        <p className="max-w-lg text-sm leading-6 text-muted">Free, source-labelled CompTIA A+ practice for the current 220-1201 and 220-1202 exams.</p>
        <p className="mono-label text-[10px] text-muted">© {new Date().getFullYear()} A+ Prep</p>
      </div>
    </footer>
  );
}

export function SiteShell({ children, className, footer = true }: { children: React.ReactNode; className?: string; footer?: boolean }) {
  return (
    <div className={cn("min-h-screen bg-app text-ink", className)}>
      <SiteHeader />
      {children}
      {footer && <SiteFooter />}
    </div>
  );
}
