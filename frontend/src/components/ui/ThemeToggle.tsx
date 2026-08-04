/**
 * Theme toggle button — switches between light and dark mode.
 */

"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-surface-muted-light dark:hover:bg-surface-elevated-dark transition-all duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <svg
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "light"
            ? "text-text-secondary-light rotate-0 scale-100 opacity-100"
            : "text-text-muted-dark rotate-90 scale-0 opacity-0 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon */}
      <svg
        className={`w-4 h-4 transition-all duration-300 ${
          theme === "dark"
            ? "text-text-secondary-dark rotate-0 scale-100 opacity-100"
            : "text-text-muted-light -rotate-90 scale-0 opacity-0 absolute"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
