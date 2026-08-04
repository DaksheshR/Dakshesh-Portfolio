/**
 * Reusable Button component with multiple variants and sizes.
 */

"use client";

import { cn } from "@/utils/helpers";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-500 shadow-sm shadow-primary-600/10 hover:shadow-md hover:shadow-primary-600/20",
  secondary:
    "bg-surface-muted-light dark:bg-surface-elevated-dark text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark hover:border-border-hover-light dark:hover:border-border-hover-dark hover:bg-surface-card-light dark:hover:bg-surface-muted-dark",
  outline:
    "border border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark hover:bg-surface-muted-light dark:hover:bg-surface-elevated-dark hover:border-border-hover-light dark:hover:border-border-hover-dark",
  ghost:
    "text-text-secondary-light dark:text-text-secondary-dark hover:bg-surface-muted-light dark:hover:bg-surface-elevated-dark hover:text-text-primary-light dark:hover:text-text-primary-dark",
  danger:
    "bg-red-600 text-white hover:bg-red-500 shadow-sm shadow-red-600/10",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-6 py-2.5 text-sm rounded-lg gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-surface-dark",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
