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
  primary: "bg-primary-500/10 text-primary-400 border border-primary-500/25",
  secondary: "bg-surface-elevated-dark text-text-secondary-dark border border-[#1b2144]",
  accent: "bg-accent-500/10 text-accent-400 border border-accent-500/25",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  outline: "border border-[#1b2144] text-text-secondary-dark",
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
