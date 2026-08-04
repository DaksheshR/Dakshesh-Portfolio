/**
 * Badge component for displaying tags, categories, tech stack items.
 */

import { cn } from "@/utils/helpers";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
  secondary: "bg-surface-muted-light dark:bg-surface-elevated-dark text-text-secondary-light dark:text-text-secondary-dark",
  accent: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  outline: "border border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  children,
  variant = "primary",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
