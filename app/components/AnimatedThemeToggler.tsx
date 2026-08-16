"use client";

import { flushSync } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/app/components/PhosphorIcons";
import { cn } from "@/lib/utils";

type ThemeName = "light" | "dark";

export interface AnimatedThemeTogglerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  duration?: number;
  theme?: ThemeName;
  onThemeChange?: (theme: ThemeName) => void;
}

export function AnimatedThemeToggler({
  className,
  duration = 450,
  theme: controlledTheme,
  onThemeChange,
  ...props
}: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeAnimation = useRef<Animation | null>(null);
  const currentTheme = controlledTheme ?? (resolvedTheme as ThemeName | undefined) ?? "light";

  useEffect(() => {
    setMounted(true);
    return () => activeAnimation.current?.cancel();
  }, []);

  const applyTheme = (nextTheme: ThemeName) => {
    if (onThemeChange) onThemeChange(nextTheme);
    else setTheme(nextTheme);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeName = currentTheme === "dark" ? "light" : "dark";
    const button = buttonRef.current;
    const startViewTransition = document.startViewTransition?.bind(document);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!button || reduceMotion || !startViewTransition) {
      applyTheme(nextTheme);
      return;
    }

    const bounds = button.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const from = `circle(0px at ${x}px ${y}px)`;
    const to = `circle(${radius}px at ${x}px ${y}px)`;
    const root = document.documentElement;

    root.dataset.themeTransition = "active";
    root.style.setProperty("--theme-transition-duration", `${duration}ms`);
    root.style.setProperty("--theme-transition-from", from);

    const transition = startViewTransition(() => {
      flushSync(() => applyTheme(nextTheme));
    });

    transition.ready
      .then(() => {
        activeAnimation.current = root.animate(
          { clipPath: [from, to] },
          {
            duration,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => undefined);

    transition.finished.finally(() => {
      activeAnimation.current = null;
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-transition-duration");
      root.style.removeProperty("--theme-transition-from");
    });
  };

  if (!mounted) {
    return <span aria-hidden className={cn("block size-10 rounded-xl border border-line bg-panel-muted", className)} />;
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "group inline-flex size-10 items-center justify-center rounded-xl border border-line bg-panel text-ink-soft shadow-sm transition hover:-translate-y-0.5 hover:border-line-strong hover:text-ink",
        className
      )}
      {...props}
    >
      {currentTheme === "dark" ? (
        <SunIcon size={19} weight="fill" className="text-warning transition-transform group-hover:rotate-12" />
      ) : (
        <MoonIcon size={19} weight="fill" className="text-brand transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
