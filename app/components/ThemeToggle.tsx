"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/app/components/PhosphorIcons";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <SunIcon size={20} weight="fill" className="text-yellow-400" />
      ) : (
        <MoonIcon size={20} weight="fill" className="text-blue-600" />
      )}
    </button>
  );
}
